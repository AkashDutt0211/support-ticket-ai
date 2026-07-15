import { TicketStatus } from 'database';
import { InvalidTransitionError } from '../errors/InvalidTransitionError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import {
  ticketRepository,
  type CreateTicketData,
  type TicketDetail,
  type TicketListFilters,
  type TicketListItem,
  type UpdateTicketData,
} from '../repositories/ticketRepository.js';
import { userRepository } from '../repositories/userRepository.js';
import { assertTransition } from './ticketStateMachine.js';

export class TicketService {
  async listTickets(filters: TicketListFilters): Promise<TicketListItem[]> {
    return ticketRepository.findMany(filters);
  }

  async getTicketById(id: string): Promise<TicketDetail> {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError('Ticket', id);
    }
    return ticket;
  }

  async createTicket(data: CreateTicketData): Promise<TicketDetail> {
    await this.assertUserExists(data.createdById);
    if (data.assignedToId) {
      await this.assertUserExists(data.assignedToId);
    }
    return ticketRepository.create(data);
  }

  async updateTicket(id: string, data: UpdateTicketData): Promise<TicketDetail> {
    await this.getTicketById(id);
    if (data.assignedToId) {
      await this.assertUserExists(data.assignedToId);
    }
    return ticketRepository.update(id, data);
  }

  async updateTicketStatus(id: string, status: TicketStatus): Promise<TicketDetail> {
    const ticket = await ticketRepository.findStatusById(id);
    if (!ticket) {
      throw new NotFoundError('Ticket', id);
    }

    const expectedStatus = ticket.status;
    assertTransition(expectedStatus, status);

    const updated = await ticketRepository.updateStatus(id, expectedStatus, status);
    if (updated) {
      return updated;
    }

    const current = await ticketRepository.findStatusById(id);
    if (!current) {
      throw new NotFoundError('Ticket', id);
    }

    throw new InvalidTransitionError(current.status, status);
  }

  private async assertUserExists(userId: string): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User', userId);
    }
  }
}

export const ticketService = new TicketService();
