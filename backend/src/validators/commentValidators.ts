import { z } from 'zod';

export const createCommentBodySchema = z.object({
  message: z.string().trim().min(1),
  createdById: z.string().uuid(),
});

export type CreateCommentBody = z.infer<typeof createCommentBodySchema>;
