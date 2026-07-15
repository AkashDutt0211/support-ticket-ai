import { TicketPriority, TicketStatus } from 'database';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors/NotFoundError.js';

vi.mock('../../src/repositories/ticketRepository.js', () => ({
  ticketRepository: {
    findMany: vi.fn(),
    findById: vi.fn(),
    findStatusById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

vi.mock('../../src/repositories/userRepository.js', () => ({
  userRepository: {
    findById: vi.fn(),
  },
}));

import { ticketRepository } from '../../src/repositories/ticketRepository.js';
import { userRepository } from '../../src/repositories/userRepository.js';
import { ticketService } from '../../src/services/ticketService.js';

const ticketDetail = {
  id: 'ticket-1',
  title: 'Test',
  description: 'Desc',
  priority: TicketPriority.MEDIUM,
  status: TicketStatus.OPEN,
  assignedToId: null,
  createdById: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  assignedTo: null,
  createdBy: { id: 'user-1', name: 'Alice', email: 'a@x.com', role: 'AGENT' as const },
  comments: [],
};

describe('ticketService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getTicketById throws NotFoundError when ticket is missing', async () => {
    vi.mocked(ticketRepository.findById).mockResolvedValue(null);

    await expect(ticketService.getTicketById('missing')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('createTicket validates createdBy user exists', async () => {
    vi.mocked(userRepository.findById).mockResolvedValue(null);

    await expect(
      ticketService.createTicket({
        title: 'New',
        description: 'Desc',
        priority: TicketPriority.LOW,
        createdById: 'missing-user',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('createTicket validates assignee when provided', async () => {
    vi.mocked(userRepository.findById)
      .mockResolvedValueOnce({ id: 'user-1', name: 'A', email: 'a@x.com', role: 'AGENT' })
      .mockResolvedValueOnce(null);

    await expect(
      ticketService.createTicket({
        title: 'New',
        description: 'Desc',
        priority: TicketPriority.LOW,
        createdById: 'user-1',
        assignedToId: 'missing-assignee',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('createTicket persists when users exist', async () => {
    vi.mocked(userRepository.findById).mockResolvedValue({
      id: 'user-1',
      name: 'Alice',
      email: 'a@x.com',
      role: 'AGENT',
    });
    vi.mocked(ticketRepository.create).mockResolvedValue(ticketDetail);

    const result = await ticketService.createTicket({
      title: 'New',
      description: 'Desc',
      priority: TicketPriority.LOW,
      createdById: 'user-1',
    });

    expect(result.id).toBe('ticket-1');
    expect(ticketRepository.create).toHaveBeenCalled();
  });

  it('updateTicketStatus throws INVALID_TRANSITION when atomic update races', async () => {
    vi.mocked(ticketRepository.findStatusById)
      .mockResolvedValueOnce({ id: 'ticket-1', status: TicketStatus.OPEN })
      .mockResolvedValueOnce({ id: 'ticket-1', status: TicketStatus.CANCELLED });
    vi.mocked(ticketRepository.updateStatus).mockResolvedValue(null);

    await expect(
      ticketService.updateTicketStatus('ticket-1', TicketStatus.IN_PROGRESS),
    ).rejects.toMatchObject({
      code: 'INVALID_TRANSITION',
      statusCode: 422,
    });
  });

  it('updateTicketStatus returns updated ticket on success', async () => {
    vi.mocked(ticketRepository.findStatusById).mockResolvedValue({
      id: 'ticket-1',
      status: TicketStatus.OPEN,
    });
    vi.mocked(ticketRepository.updateStatus).mockResolvedValue({
      ...ticketDetail,
      status: TicketStatus.IN_PROGRESS,
    });

    const result = await ticketService.updateTicketStatus('ticket-1', TicketStatus.IN_PROGRESS);

    expect(result.status).toBe(TicketStatus.IN_PROGRESS);
  });
});
