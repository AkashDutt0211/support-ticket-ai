import { describe, expect, it } from 'vitest';
import { canTransition, getValidTransitions } from '../../src/utils/ticketStateMachine';

describe('ticketStateMachine utils', () => {
  it('returns valid transitions for OPEN', () => {
    expect(getValidTransitions('OPEN')).toEqual(['IN_PROGRESS', 'CANCELLED']);
  });

  it('rejects invalid transition', () => {
    expect(canTransition('RESOLVED', 'OPEN')).toBe(false);
  });
});
