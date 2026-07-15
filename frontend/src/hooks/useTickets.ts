import { useCallback, useEffect, useRef, useState } from 'react';
import { ticketsApi } from '../api/ticketsApi';
import type { Ticket, TicketListFilters } from '../types/ticket';
import { getErrorMessage } from '../types/api';
import { isAbortError } from '../utils/isAbortError';

interface UseTicketsResult {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useTickets(filters: TicketListFilters): UseTicketsResult {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const loadTickets = useCallback(
    async (signal?: AbortSignal): Promise<void> => {
      const requestId = ++requestIdRef.current;

      try {
        setIsLoading(true);
        setError(null);
        const data = await ticketsApi.list(filters, signal);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setTickets(data);
      } catch (err) {
        if (isAbortError(err) || requestId !== requestIdRef.current) {
          return;
        }
        setError(getErrorMessage(err));
        setTickets((current) => (current.length > 0 ? current : []));
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    [filters.status, filters.search],
  );

  const refetch = useCallback(async (): Promise<void> => {
    await loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    const controller = new AbortController();
    void loadTickets(controller.signal);

    return () => {
      controller.abort();
      requestIdRef.current += 1;
    };
  }, [loadTickets]);

  return { tickets, isLoading, error, refetch };
}
