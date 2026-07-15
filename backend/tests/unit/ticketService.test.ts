import { TicketStatus } from 'database';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../src/repositories/ticketRepository.js', () => ({
  ticketRepository: {
    findStatusById: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

vi.mock('../../src/repositories/userRepository.js', () => ({
  userRepository: {
    findById: vi.fn(),
  },
}));

import { ticketRepository } from '../../src/repositories/ticketRepository.js';
import { ticketService } from '../../src/services/ticketService.js';

describe('ticketService.updateTicketStatus', () => {
  it('throws INVALID_TRANSITION when atomic update races with another change', async () => {
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
});
