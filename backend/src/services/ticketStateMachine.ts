import { TicketStatus } from 'database';
import { InvalidTransitionError } from '../errors/InvalidTransitionError.js';

const VALID_TRANSITIONS: Record<TicketStatus, readonly TicketStatus[]> = {
  OPEN: [TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED],
  IN_PROGRESS: [TicketStatus.RESOLVED, TicketStatus.CANCELLED],
  RESOLVED: [TicketStatus.CLOSED],
  CLOSED: [],
  CANCELLED: [],
};

export function canTransition(from: TicketStatus, to: TicketStatus): boolean {
  if (from === to) {
    return false;
  }
  return VALID_TRANSITIONS[from].includes(to);
}

export function assertTransition(from: TicketStatus, to: TicketStatus): void {
  if (!canTransition(from, to)) {
    throw new InvalidTransitionError(from, to);
  }
}

export function getValidTransitions(from: TicketStatus): readonly TicketStatus[] {
  return VALID_TRANSITIONS[from];
}
