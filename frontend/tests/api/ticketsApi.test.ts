import { afterEach, describe, expect, it, vi } from 'vitest';
import { ticketsApi } from '../../src/api/ticketsApi';

describe('ticketsApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('list builds query string for filters', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await ticketsApi.list({ status: 'OPEN', search: 'login' });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/tickets\?status=OPEN&search=login$/),
      expect.any(Object),
    );
  });

  it('list omits query when filters are empty', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await ticketsApi.list({});

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(/\/tickets$/),
      expect.any(Object),
    );
  });

  it('updateStatus sends PATCH to status endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { id: '1', status: 'CLOSED' } }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await ticketsApi.updateStatus('ticket-1', 'CLOSED');

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/tickets/ticket-1/status'),
      expect.objectContaining({ method: 'PATCH' }),
    );
  });
});
