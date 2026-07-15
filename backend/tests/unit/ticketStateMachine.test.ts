import { TicketStatus } from 'database';
import { describe, expect, it } from 'vitest';
import { assertTransition, canTransition, getValidTransitions } from '../../src/services/ticketStateMachine.js';

describe('ticketStateMachine', () => {
  describe('canTransition', () => {
    it('allows OPEN to IN_PROGRESS', () => {
      expect(canTransition(TicketStatus.OPEN, TicketStatus.IN_PROGRESS)).toBe(true);
    });

    it('allows OPEN to CANCELLED', () => {
      expect(canTransition(TicketStatus.OPEN, TicketStatus.CANCELLED)).toBe(true);
    });

    it('allows IN_PROGRESS to RESOLVED', () => {
      expect(canTransition(TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED)).toBe(true);
    });

    it('allows IN_PROGRESS to CANCELLED', () => {
      expect(canTransition(TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED)).toBe(true);
    });

    it('allows RESOLVED to CLOSED', () => {
      expect(canTransition(TicketStatus.RESOLVED, TicketStatus.CLOSED)).toBe(true);
    });

    it('rejects OPEN to RESOLVED', () => {
      expect(canTransition(TicketStatus.OPEN, TicketStatus.RESOLVED)).toBe(false);
    });

    it('rejects CLOSED to any status', () => {
      expect(getValidTransitions(TicketStatus.CLOSED)).toEqual([]);
      expect(canTransition(TicketStatus.CLOSED, TicketStatus.OPEN)).toBe(false);
    });

    it('rejects CANCELLED to any status', () => {
      expect(getValidTransitions(TicketStatus.CANCELLED)).toEqual([]);
      expect(canTransition(TicketStatus.CANCELLED, TicketStatus.OPEN)).toBe(false);
    });

    it('rejects same status transition', () => {
      expect(canTransition(TicketStatus.OPEN, TicketStatus.OPEN)).toBe(false);
    });
  });

  describe('assertTransition', () => {
    it('does not throw for valid transition', () => {
      expect(() => assertTransition(TicketStatus.OPEN, TicketStatus.IN_PROGRESS)).not.toThrow();
    });

    it('throws for invalid transition', () => {
      expect(() => assertTransition(TicketStatus.RESOLVED, TicketStatus.OPEN)).toThrow(
        'Cannot transition from RESOLVED to OPEN',
      );
    });
  });
});
