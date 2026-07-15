import { config } from 'dotenv';
import { resolve } from 'node:path';
import { TicketPriority, TicketStatus } from 'database';
import request from 'supertest';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app.js';
import { prisma } from '../../src/lib/prisma.js';

config({ path: resolve(__dirname, '../../.env') });

const app = createApp();

interface UserSummary {
  id: string;
}

interface TicketSummary {
  id: string;
  status: TicketStatus;
}

const createdTicketIds: string[] = [];

beforeAll(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  if (createdTicketIds.length > 0) {
    await prisma.comment.deleteMany({
      where: { ticketId: { in: createdTicketIds } },
    });
    await prisma.ticket.deleteMany({
      where: { id: { in: createdTicketIds } },
    });
    createdTicketIds.length = 0;
  }
});

async function getSeededUser(): Promise<UserSummary> {
  const response = await request(app).get('/api/users');
  expect(response.status).toBe(200);
  const users = response.body.data as UserSummary[];
  expect(users.length).toBeGreaterThan(0);
  return users[0];
}

async function createOpenTicket(userId: string): Promise<TicketSummary> {
  const response = await request(app).post('/api/tickets').send({
    title: `Test ticket ${Date.now()}`,
    description: 'Integration test ticket',
    priority: TicketPriority.MEDIUM,
    createdById: userId,
  });
  expect(response.status).toBe(201);
  createdTicketIds.push(response.body.data.id);
  return response.body.data as TicketSummary;
}

async function transitionTicket(ticketId: string, status: TicketStatus) {
  return request(app).patch(`/api/tickets/${ticketId}/status`).send({ status });
}

describe('Ticket status transitions API', () => {
  it('transitions OPEN to IN_PROGRESS', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);

    const response = await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(TicketStatus.IN_PROGRESS);
  });

  it('transitions IN_PROGRESS to RESOLVED', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);
    await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);

    const response = await transitionTicket(ticket.id, TicketStatus.RESOLVED);
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(TicketStatus.RESOLVED);
  });

  it('transitions RESOLVED to CLOSED', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);
    await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);
    await transitionTicket(ticket.id, TicketStatus.RESOLVED);

    const response = await transitionTicket(ticket.id, TicketStatus.CLOSED);
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(TicketStatus.CLOSED);
  });

  it('transitions OPEN to CANCELLED', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);

    const response = await transitionTicket(ticket.id, TicketStatus.CANCELLED);
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(TicketStatus.CANCELLED);
  });

  it('transitions IN_PROGRESS to CANCELLED', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);
    await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);

    const response = await transitionTicket(ticket.id, TicketStatus.CANCELLED);
    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe(TicketStatus.CANCELLED);
  });

  it('rejects OPEN to RESOLVED with 422', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);

    const response = await transitionTicket(ticket.id, TicketStatus.RESOLVED);
    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe('INVALID_TRANSITION');
  });

  it('rejects CLOSED to IN_PROGRESS with 422', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);
    await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);
    await transitionTicket(ticket.id, TicketStatus.RESOLVED);
    await transitionTicket(ticket.id, TicketStatus.CLOSED);

    const response = await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);
    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe('INVALID_TRANSITION');
  });

  it('rejects CANCELLED to IN_PROGRESS with 422', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);
    await transitionTicket(ticket.id, TicketStatus.CANCELLED);

    const response = await transitionTicket(ticket.id, TicketStatus.IN_PROGRESS);
    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe('INVALID_TRANSITION');
  });

  it('returns 404 when updating non-existent ticket', async () => {
    const response = await request(app)
      .patch('/api/tickets/00000000-0000-0000-0000-000000000000')
      .send({ title: 'Updated title' });

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe('NOT_FOUND');
  });

  it('updateStatus returns null when expected status does not match', async () => {
    const user = await getSeededUser();
    const ticket = await createOpenTicket(user.id);

    await prisma.ticket.update({
      where: { id: ticket.id },
      data: { status: TicketStatus.CANCELLED },
    });

    const { ticketRepository } = await import('../../src/repositories/ticketRepository.js');
    const result = await ticketRepository.updateStatus(
      ticket.id,
      TicketStatus.OPEN,
      TicketStatus.IN_PROGRESS,
    );

    expect(result).toBeNull();
  });
});

describe('Ticket list filters API', () => {
  it('filters tickets by status', async () => {
    const response = await request(app).get('/api/tickets').query({ status: TicketStatus.OPEN });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    for (const ticket of response.body.data) {
      expect(ticket.status).toBe(TicketStatus.OPEN);
    }
  });

  it('searches tickets by keyword', async () => {
    const response = await request(app).get('/api/tickets').query({ search: 'login' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
