import type { Prisma } from 'database';
import { prisma } from '../lib/prisma.js';

const commentSelect = {
  id: true,
  ticketId: true,
  message: true,
  createdAt: true,
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  },
} satisfies Prisma.CommentSelect;

export interface CreateCommentData {
  ticketId: string;
  message: string;
  createdById: string;
}

export type CommentWithAuthor = Prisma.CommentGetPayload<{ select: typeof commentSelect }>;

export class CommentRepository {
  async create(data: CreateCommentData): Promise<CommentWithAuthor> {
    return prisma.comment.create({
      data: {
        ticketId: data.ticketId,
        message: data.message,
        createdById: data.createdById,
      },
      select: commentSelect,
    });
  }
}

export const commentRepository = new CommentRepository();
