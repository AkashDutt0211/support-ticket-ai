import { Prisma, TicketPriority, TicketStatus, type Ticket } from 'database';
import { prisma } from '../lib/prisma.js';

const userSummarySelect = {
  id: true,
  name: true,
  email: true,
  role: true,
} satisfies Prisma.UserSelect;

const ticketListSelect = {
  id: true,
  title: true,
  description: true,
  priority: true,
  status: true,
  assignedToId: true,
  createdById: true,
  createdAt: true,
  updatedAt: true,
  assignedTo: { select: userSummarySelect },
  createdBy: { select: userSummarySelect },
} satisfies Prisma.TicketSelect;

const ticketDetailSelect = {
  ...ticketListSelect,
  comments: {
    select: {
      id: true,
      message: true,
      createdAt: true,
      createdBy: { select: userSummarySelect },
    },
    orderBy: { createdAt: 'asc' as const },
  },
} satisfies Prisma.TicketSelect;

export interface TicketListFilters {
  status?: TicketStatus;
  search?: string;
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: TicketPriority;
  createdById: string;
  assignedToId?: string | null;
}

export interface UpdateTicketData {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  assignedToId?: string | null;
}

export type TicketListItem = Prisma.TicketGetPayload<{ select: typeof ticketListSelect }>;
export type TicketDetail = Prisma.TicketGetPayload<{ select: typeof ticketDetailSelect }>;

export class TicketRepository {
  async findMany(filters: TicketListFilters = {}): Promise<TicketListItem[]> {
    const { status, search } = filters;
    const searchTerm = search?.trim();

    const where: Prisma.TicketWhereInput = {
      ...(status ? { status } : {}),
      ...(searchTerm
        ? {
            OR: [
              { title: { contains: searchTerm, mode: 'insensitive' } },
              { description: { contains: searchTerm, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    return prisma.ticket.findMany({
      where,
      select: ticketListSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<TicketDetail | null> {
    return prisma.ticket.findUnique({
      where: { id },
      select: ticketDetailSelect,
    });
  }

  async findStatusById(id: string): Promise<Pick<Ticket, 'id' | 'status'> | null> {
    return prisma.ticket.findUnique({
      where: { id },
      select: { id: true, status: true },
    });
  }

  async create(data: CreateTicketData): Promise<TicketDetail> {
    return prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        createdById: data.createdById,
        assignedToId: data.assignedToId ?? null,
      },
      select: ticketDetailSelect,
    });
  }

  async update(id: string, data: UpdateTicketData): Promise<TicketDetail> {
    return prisma.ticket.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.priority !== undefined ? { priority: data.priority } : {}),
        ...(data.assignedToId !== undefined ? { assignedToId: data.assignedToId } : {}),
      },
      select: ticketDetailSelect,
    });
  }

  async updateStatus(
    id: string,
    expectedStatus: TicketStatus,
    status: TicketStatus,
  ): Promise<TicketDetail | null> {
    const result = await prisma.ticket.updateMany({
      where: { id, status: expectedStatus },
      data: { status },
    });

    if (result.count === 0) {
      return null;
    }

    return prisma.ticket.findUnique({
      where: { id },
      select: ticketDetailSelect,
    });
  }
}

export const ticketRepository = new TicketRepository();
