import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, ValidationApiError } from '../../src/types/api';
import { apiRequest } from '../../src/api/client';

describe('apiRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns data on successful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ id: '1', title: 'Ticket' }] }),
      }),
    );

    const result = await apiRequest<[{ id: string; title: string }]>('/tickets');
    expect(result).toEqual([{ id: '1', title: 'Ticket' }]);
  });

  it('throws ApiError for structured error response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({
          error: { code: 'INVALID_TRANSITION', message: 'Cannot transition' },
        }),
      }),
    );

    await expect(apiRequest('/tickets/1/status', { method: 'PATCH', body: { status: 'CLOSED' } }))
      .rejects.toMatchObject({
        statusCode: 422,
        code: 'INVALID_TRANSITION',
        message: 'Cannot transition',
      });
  });

  it('throws ValidationApiError for 400 validation payload', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          errors: [{ code: 'INVALID', message: 'Required', field: 'title' }],
        }),
      }),
    );

    await expect(
      apiRequest('/tickets', { method: 'POST', body: { title: '' } }),
    ).rejects.toBeInstanceOf(ValidationApiError);
  });

  it('throws NETWORK_ERROR when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    await expect(apiRequest('/tickets')).rejects.toMatchObject({
      code: 'NETWORK_ERROR',
      statusCode: 0,
    });
  });

  it('passes AbortSignal to fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: null }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const controller = new AbortController();
    await apiRequest('/tickets/1', { signal: controller.signal });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/tickets/1'),
      expect.objectContaining({ signal: controller.signal }),
    );
  });

  it('throws REQUEST_FAILED for unknown error shape', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => null,
      }),
    );

    await expect(apiRequest('/tickets')).rejects.toBeInstanceOf(ApiError);
  });
});
