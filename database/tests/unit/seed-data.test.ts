import { TicketStatus, UserRole } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import {
  EXPECTED_SEED_COUNTS,
  seedComments,
  seedTickets,
  seedUsers,
} from '../../prisma/seed-data.js';

describe('seed data integrity', () => {
  it('has expected record counts for Core demo', () => {
    expect(EXPECTED_SEED_COUNTS.users).toBe(4);
    expect(EXPECTED_SEED_COUNTS.tickets).toBe(8);
    expect(EXPECTED_SEED_COUNTS.comments).toBe(7);
  });

  it('uses unique user emails', () => {
    const emails = seedUsers.map((user) => user.email);
    expect(new Set(emails).size).toBe(emails.length);
  });

  it('references only seeded user emails in tickets', () => {
    const userEmails = new Set(seedUsers.map((user) => user.email));

    for (const ticket of seedTickets) {
      expect(userEmails.has(ticket.createdByEmail)).toBe(true);
      if (ticket.assignedToEmail) {
        expect(userEmails.has(ticket.assignedToEmail)).toBe(true);
      }
    }
  });

  it('references valid ticket titles and user emails in comments', () => {
    const ticketTitles = new Set(seedTickets.map((ticket) => ticket.title));
    const userEmails = new Set(seedUsers.map((user) => user.email));

    for (const comment of seedComments) {
      expect(ticketTitles.has(comment.ticketTitle)).toBe(true);
      expect(userEmails.has(comment.createdByEmail)).toBe(true);
      expect(comment.message.trim().length).toBeGreaterThan(0);
    }
  });

  it('covers each Core ticket status in seed tickets', () => {
    const statuses = new Set(seedTickets.map((ticket) => ticket.status));
    const required: TicketStatus[] = [
      TicketStatus.OPEN,
      TicketStatus.IN_PROGRESS,
      TicketStatus.RESOLVED,
      TicketStatus.CLOSED,
      TicketStatus.CANCELLED,
    ];

    for (const status of required) {
      expect(statuses.has(status)).toBe(true);
    }
  });

  it('includes at least one ticket with login keyword for search demos', () => {
    const hasLoginKeyword = seedTickets.some(
      (ticket) =>
        ticket.title.toLowerCase().includes('login') ||
        ticket.description.toLowerCase().includes('login'),
    );
    expect(hasLoginKeyword).toBe(true);
  });

  it('assigns valid user roles', () => {
    const roles = new Set(seedUsers.map((user) => user.role));
    expect(roles.has(UserRole.AGENT)).toBe(true);
    expect(roles.has(UserRole.ADMIN)).toBe(true);
    expect(roles.has(UserRole.REQUESTER)).toBe(true);
  });
});
