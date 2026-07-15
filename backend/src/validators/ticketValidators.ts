import { TicketPriority, TicketStatus } from 'database';
import { z } from 'zod';

const uuidSchema = z.string().uuid();

export const listTicketsQuerySchema = z.object({
  status: z.nativeEnum(TicketStatus).optional(),
  search: z.string().trim().min(1).optional(),
});

export const ticketIdParamSchema = z.object({
  id: uuidSchema,
});

export const createTicketBodySchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1),
  priority: z.nativeEnum(TicketPriority),
  createdById: uuidSchema,
  assignedToId: uuidSchema.nullable().optional(),
});

export const updateTicketBodySchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().min(1).optional(),
    priority: z.nativeEnum(TicketPriority).optional(),
    assignedToId: uuidSchema.nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export const updateTicketStatusBodySchema = z.object({
  status: z.nativeEnum(TicketStatus),
});

export type ListTicketsQuery = z.infer<typeof listTicketsQuerySchema>;
export type CreateTicketBody = z.infer<typeof createTicketBodySchema>;
export type UpdateTicketBody = z.infer<typeof updateTicketBodySchema>;
export type UpdateTicketStatusBody = z.infer<typeof updateTicketStatusBodySchema>;
