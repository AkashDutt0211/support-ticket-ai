import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { commentService } from '../services/commentService.js';
import { ticketService } from '../services/ticketService.js';
import { createCommentBodySchema } from '../validators/commentValidators.js';
import {
  createTicketBodySchema,
  listTicketsQuerySchema,
  ticketIdParamSchema,
  updateTicketBodySchema,
  updateTicketStatusBodySchema,
} from '../validators/ticketValidators.js';

export const ticketsRouter = Router();

ticketsRouter.get('/', validate(listTicketsQuerySchema, 'query'), async (req, res, next) => {
  try {
    const tickets = await ticketService.listTickets(req.query);
    res.status(200).json({ data: tickets });
  } catch (err) {
    next(err);
  }
});

ticketsRouter.get('/:id', validate(ticketIdParamSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const ticket = await ticketService.getTicketById(id);
    res.status(200).json({ data: ticket });
  } catch (err) {
    next(err);
  }
});

ticketsRouter.post('/', validate(createTicketBodySchema), async (req, res, next) => {
  try {
    const ticket = await ticketService.createTicket(req.body);
    res.status(201).json({ data: ticket });
  } catch (err) {
    next(err);
  }
});

ticketsRouter.patch('/:id', validate(ticketIdParamSchema, 'params'), validate(updateTicketBodySchema), async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const ticket = await ticketService.updateTicket(id, req.body);
    res.status(200).json({ data: ticket });
  } catch (err) {
    next(err);
  }
});

ticketsRouter.patch(
  '/:id/status',
  validate(ticketIdParamSchema, 'params'),
  validate(updateTicketStatusBodySchema),
  async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const ticket = await ticketService.updateTicketStatus(id, req.body.status);
      res.status(200).json({ data: ticket });
    } catch (err) {
      next(err);
    }
  },
);

ticketsRouter.post(
  '/:id/comments',
  validate(ticketIdParamSchema, 'params'),
  validate(createCommentBodySchema),
  async (req, res, next) => {
    try {
      const { id } = req.params as { id: string };
      const comment = await commentService.addComment({
        ticketId: id,
        message: req.body.message,
        createdById: req.body.createdById,
      });
      res.status(201).json({ data: comment });
    } catch (err) {
      next(err);
    }
  },
);
