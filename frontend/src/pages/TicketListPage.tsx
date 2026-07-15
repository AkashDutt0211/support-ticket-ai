import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorAlert } from '../components/common/ErrorAlert';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { TicketFilters, type TicketFilterValues } from '../components/tickets/TicketFilters';
import { TicketList } from '../components/tickets/TicketList';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useTickets } from '../hooks/useTickets';

export function TicketListPage() {
  const [filters, setFilters] = useState<TicketFilterValues>({ search: '', status: '' });
  const debouncedSearch = useDebouncedValue(filters.search, 300);

  const apiFilters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      status: filters.status || undefined,
    }),
    [debouncedSearch, filters.status],
  );

  const { tickets, isLoading, error } = useTickets(apiFilters);

  return (
    <section className="page">
      <div className="page-header">
        <h1>Tickets</h1>
        <Link to="/tickets/new" className="btn btn-primary">
          Create ticket
        </Link>
      </div>

      <TicketFilters values={filters} onChange={setFilters} />

      {error ? <ErrorAlert message={error} /> : null}
      {isLoading ? <LoadingSpinner label="Loading tickets..." /> : null}

      {!isLoading && !error && tickets.length === 0 ? (
        <EmptyState title="No tickets found" description="Try changing filters or create a new ticket." />
      ) : null}

      {!isLoading && tickets.length > 0 ? <TicketList tickets={tickets} /> : null}
    </section>
  );
}
