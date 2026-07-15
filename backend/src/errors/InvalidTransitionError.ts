import { TicketStatus } from 'database';
import { AppError } from './AppError.js';

export class InvalidTransitionError extends AppError {
  constructor(from: TicketStatus, to: TicketStatus) {
    super(`Cannot transition from ${from} to ${to}`, 422, 'INVALID_TRANSITION');
  }
}
