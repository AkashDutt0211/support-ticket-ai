import { describe, expect, it } from 'vitest';
import {
  ApiError,
  ValidationApiError,
  getErrorMessage,
  getFieldErrors,
} from '../../src/types/api';

describe('api error helpers', () => {
  describe('getErrorMessage', () => {
    it('returns ApiError message', () => {
      const err = new ApiError('Not found', 404, 'NOT_FOUND');
      expect(getErrorMessage(err)).toBe('Not found');
    });

    it('returns generic Error message', () => {
      expect(getErrorMessage(new Error('boom'))).toBe('boom');
    });

    it('returns fallback for unknown values', () => {
      expect(getErrorMessage('nope')).toBe('An unexpected error occurred');
    });
  });

  describe('getFieldErrors', () => {
    it('maps validation issues by field', () => {
      const err = new ValidationApiError([
        { code: 'INVALID', message: 'Required', field: 'title' },
        { code: 'INVALID', message: 'Too short', field: 'description' },
      ]);

      expect(getFieldErrors(err)).toEqual({
        title: 'Required',
        description: 'Too short',
      });
    });

    it('returns empty object for non-validation errors', () => {
      expect(getFieldErrors(new ApiError('fail', 500, 'INTERNAL'))).toEqual({});
    });
  });
});
