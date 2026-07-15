import type { Prisma, User } from 'database';
import { prisma } from '../lib/prisma.js';

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
} satisfies Prisma.UserSelect;

export type UserSummary = Pick<User, 'id' | 'name' | 'email' | 'role'>;

export class UserRepository {
  async findAll(): Promise<UserSummary[]> {
    return prisma.user.findMany({
      select: userSelect,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<UserSummary | null> {
    return prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }
}

export const userRepository = new UserRepository();
