import { TicketPriority, TicketStatus } from 'database';
import { describe, expect, it } from 'vitest';
import {
  createTicketBodySchema,
  listTicketsQuerySchema,
  ticketIdParamSchema,
  updateTicketBodySchema,
  updateTicketStatusBodySchema,
} from '../../src/validators/ticketValidators.js';

const validUuid = '00000000-0000-0000-0000-000000000001';

describe('ticketValidators', () => {
  describe('listTicketsQuerySchema', () => {
    it('accepts empty query', () => {
      expect(listTicketsQuerySchema.parse({})).toEqual({});
    });

    it('accepts status and search filters', () => {
      expect(
        listTicketsQuerySchema.parse({ status: TicketStatus.OPEN, search: 'login' }),
      ).toEqual({ status: TicketStatus.OPEN, search: 'login' });
    });

    it('rejects blank search string', () => {
      expect(() => listTicketsQuerySchema.parse({ search: '   ' })).toThrow();
    });
  });

  describe('ticketIdParamSchema', () => {
    it('accepts valid uuid', () => {
      expect(ticketIdParamSchema.parse({ id: validUuid })).toEqual({ id: validUuid });
    });

    it('rejects invalid uuid', () => {
      expect(() => ticketIdParamSchema.parse({ id: 'not-a-uuid' })).toThrow();
    });
  });

  describe('createTicketBodySchema', () => {
    it('accepts valid create payload', () => {
      const result = createTicketBodySchema.parse({
        title: 'New ticket',
        description: 'Details',
        priority: TicketPriority.HIGH,
        createdById: validUuid,
        assignedToId: null,
      });

      expect(result.title).toBe('New ticket');
      expect(result.assignedToId).toBeNull();
    });

    it('rejects empty title', () => {
      expect(() =>
        createTicketBodySchema.parse({
          title: '   ',
          description: 'Details',
          priority: TicketPriority.LOW,
          createdById: validUuid,
        }),
      ).toThrow();
    });

    it('rejects title over 200 characters', () => {
      expect(() =>
        createTicketBodySchema.parse({
          title: 'a'.repeat(201),
          description: 'Details',
          priority: TicketPriority.LOW,
          createdById: validUuid,
        }),
      ).toThrow();
    });
  });

  describe('updateTicketBodySchema', () => {
    it('accepts partial update', () => {
      expect(updateTicketBodySchema.parse({ title: 'Updated' })).toEqual({ title: 'Updated' });
    });

    it('rejects empty patch object', () => {
      expect(() => updateTicketBodySchema.parse({})).toThrow(/At least one field/);
    });
  });

  describe('updateTicketStatusBodySchema', () => {
    it('accepts valid status', () => {
      expect(updateTicketStatusBodySchema.parse({ status: TicketStatus.CLOSED })).toEqual({
        status: TicketStatus.CLOSED,
      });
    });

    it('rejects invalid status value', () => {
      expect(() => updateTicketStatusBodySchema.parse({ status: 'DONE' })).toThrow();
    });
  });
});
