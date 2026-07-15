import { useCallback, useEffect, useRef, useState } from 'react';
import { ticketsApi } from '../api/ticketsApi';
import type { Ticket } from '../types/ticket';
import { getErrorMessage } from '../types/api';
import { isAbortError } from '../utils/isAbortError';

interface UseTicketResult {
  ticket: Ticket | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTicket(ticketId: string | undefined): UseTicketResult {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const loadTicket = useCallback(
    async (signal?: AbortSignal): Promise<void> => {
      if (!ticketId) {
        setTicket(null);
        setIsLoading(false);
        setError('Ticket id is missing');
        return;
      }

      const requestId = ++requestIdRef.current;

      try {
        setIsLoading(true);
        setError(null);
        const data = await ticketsApi.getById(ticketId, signal);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setTicket(data);
      } catch (err) {
        if (isAbortError(err) || requestId !== requestIdRef.current) {
          return;
        }
        setError(getErrorMessage(err));
        setTicket((current) => current);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [ticketId],
  );

  const refetch = useCallback(async (): Promise<void> => {
    await loadTicket();
  }, [loadTicket]);

  useEffect(() => {
    const controller = new AbortController();
    void loadTicket(controller.signal);

    return () => {
      controller.abort();
      requestIdRef.current += 1;
    };
  }, [loadTicket]);

  return { ticket, isLoading, error, refetch };
}
