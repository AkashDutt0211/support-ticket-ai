import { describe, expect, it } from 'vitest';
import { isAbortError } from '../../src/utils/isAbortError';

describe('isAbortError', () => {
  it('returns true for AbortError DOMException', () => {
    const err = new DOMException('Aborted', 'AbortError');
    expect(isAbortError(err)).toBe(true);
  });

  it('returns false for generic errors', () => {
    expect(isAbortError(new Error('fail'))).toBe(false);
  });

  it('returns false for non-error values', () => {
    expect(isAbortError('abort')).toBe(false);
  });
});
