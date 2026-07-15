import { NotFoundError } from '../errors/NotFoundError.js';
import { commentRepository, type CommentWithAuthor } from '../repositories/commentRepository.js';
import { ticketRepository } from '../repositories/ticketRepository.js';
import { userRepository } from '../repositories/userRepository.js';

export interface CreateCommentInput {
  ticketId: string;
  message: string;
  createdById: string;
}

export class CommentService {
  async addComment(input: CreateCommentInput): Promise<CommentWithAuthor> {
    const ticket = await ticketRepository.findById(input.ticketId);
    if (!ticket) {
      throw new NotFoundError('Ticket', input.ticketId);
    }

    const user = await userRepository.findById(input.createdById);
    if (!user) {
      throw new NotFoundError('User', input.createdById);
    }

    return commentRepository.create(input);
  }
}

export const commentService = new CommentService();
