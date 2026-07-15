import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundError } from '../../src/errors/NotFoundError.js';

vi.mock('../../src/repositories/commentRepository.js', () => ({
  commentRepository: {
    create: vi.fn(),
  },
}));

vi.mock('../../src/repositories/ticketRepository.js', () => ({
  ticketRepository: {
    findById: vi.fn(),
  },
}));

vi.mock('../../src/repositories/userRepository.js', () => ({
  userRepository: {
    findById: vi.fn(),
  },
}));

import { commentRepository } from '../../src/repositories/commentRepository.js';
import { ticketRepository } from '../../src/repositories/ticketRepository.js';
import { userRepository } from '../../src/repositories/userRepository.js';
import { commentService } from '../../src/services/commentService.js';

const comment = {
  id: 'comment-1',
  message: 'Note',
  createdAt: new Date(),
  createdBy: { id: 'user-1', name: 'Alice', email: 'a@x.com', role: 'AGENT' as const },
};

describe('commentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws NotFoundError when ticket does not exist', async () => {
    vi.mocked(ticketRepository.findById).mockResolvedValue(null);

    await expect(
      commentService.addComment({
        ticketId: 'missing',
        message: 'Hello',
        createdById: 'user-1',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws NotFoundError when user does not exist', async () => {
    vi.mocked(ticketRepository.findById).mockResolvedValue({
      id: 'ticket-1',
      title: 'T',
      description: 'D',
      priority: 'MEDIUM',
      status: 'OPEN',
      assignedToId: null,
      createdById: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedTo: null,
      createdBy: { id: 'user-1', name: 'A', email: 'a@x.com', role: 'AGENT' },
      comments: [],
    });
    vi.mocked(userRepository.findById).mockResolvedValue(null);

    await expect(
      commentService.addComment({
        ticketId: 'ticket-1',
        message: 'Hello',
        createdById: 'missing-user',
      }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('creates comment when ticket and user exist', async () => {
    vi.mocked(ticketRepository.findById).mockResolvedValue({
      id: 'ticket-1',
      title: 'T',
      description: 'D',
      priority: 'MEDIUM',
      status: 'OPEN',
      assignedToId: null,
      createdById: 'user-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedTo: null,
      createdBy: { id: 'user-1', name: 'A', email: 'a@x.com', role: 'AGENT' },
      comments: [],
    });
    vi.mocked(userRepository.findById).mockResolvedValue({
      id: 'user-1',
      name: 'Alice',
      email: 'a@x.com',
      role: 'AGENT',
    });
    vi.mocked(commentRepository.create).mockResolvedValue(comment);

    const result = await commentService.addComment({
      ticketId: 'ticket-1',
      message: 'Note',
      createdById: 'user-1',
    });

    expect(result.message).toBe('Note');
    expect(commentRepository.create).toHaveBeenCalledWith({
      ticketId: 'ticket-1',
      message: 'Note',
      createdById: 'user-1',
    });
  });
});
