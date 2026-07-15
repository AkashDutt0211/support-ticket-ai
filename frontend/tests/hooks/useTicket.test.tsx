import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ticketsApi } from '../../src/api/ticketsApi';
import { useTicket } from '../../src/hooks/useTicket';

vi.mock('../../src/api/ticketsApi', () => ({
  ticketsApi: {
    getById: vi.fn(),
  },
}));

const sampleTicket = {
  id: 'ticket-1',
  title: 'Login issue',
  description: 'Cannot login',
  priority: 'HIGH' as const,
  status: 'OPEN' as const,
  assignedToId: null,
  createdById: 'user-1',
  createdAt: '2026-07-14T00:00:00.000Z',
  updatedAt: '2026-07-14T00:00:00.000Z',
  assignedTo: null,
  createdBy: { id: 'user-1', name: 'Alice', email: 'a@x.com', role: 'AGENT' as const },
  comments: [],
};

describe('useTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads ticket on mount', async () => {
    vi.mocked(ticketsApi.getById).mockResolvedValue(sampleTicket);

    const { result } = renderHook(() => useTicket('ticket-1'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.ticket).toEqual(sampleTicket);
    expect(result.current.error).toBeNull();
  });

  it('sets error when ticket id is missing', async () => {
    const { result } = renderHook(() => useTicket(undefined));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.ticket).toBeNull();
    expect(result.current.error).toBe('Ticket id is missing');
  });

  it('preserves existing ticket when refetch fails', async () => {
    vi.mocked(ticketsApi.getById)
      .mockResolvedValueOnce(sampleTicket)
      .mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useTicket('ticket-1'));

    await waitFor(() => {
      expect(result.current.ticket).toEqual(sampleTicket);
    });

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });

    expect(result.current.ticket).toEqual(sampleTicket);
  });
});
