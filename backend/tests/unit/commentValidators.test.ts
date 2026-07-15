import { describe, expect, it } from 'vitest';
import { createCommentBodySchema } from '../../src/validators/commentValidators.js';

const validUuid = '00000000-0000-0000-0000-000000000001';

describe('commentValidators', () => {
  describe('createCommentBodySchema', () => {
    it('accepts valid comment payload', () => {
      expect(
        createCommentBodySchema.parse({
          message: 'Looks good',
          createdById: validUuid,
        }),
      ).toEqual({ message: 'Looks good', createdById: validUuid });
    });

    it('rejects empty message', () => {
      expect(() =>
        createCommentBodySchema.parse({
          message: '   ',
          createdById: validUuid,
        }),
      ).toThrow();
    });

    it('rejects invalid createdById', () => {
      expect(() =>
        createCommentBodySchema.parse({
          message: 'Hello',
          createdById: 'bad-id',
        }),
      ).toThrow();
    });
  });
});
