import { TicketPriority, TicketStatus, UserRole } from '@prisma/client';
import { describe, expect, it } from 'vitest';

describe('Prisma generated enums', () => {
  it('exposes all Core ticket statuses', () => {
    expect(Object.values(TicketStatus)).toEqual([
      'OPEN',
      'IN_PROGRESS',
      'RESOLVED',
      'CLOSED',
      'CANCELLED',
    ]);
  });

  it('exposes all ticket priorities', () => {
    expect(Object.values(TicketPriority)).toEqual(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
  });

  it('exposes all user roles', () => {
    expect(Object.values(UserRole)).toEqual(['AGENT', 'ADMIN', 'REQUESTER']);
  });
});
