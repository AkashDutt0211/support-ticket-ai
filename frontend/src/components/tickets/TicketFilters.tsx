import type { TicketStatus } from '../../types/ticket';
import { STATUS_LABELS } from '../../utils/ticketStateMachine';

export interface TicketFilterValues {
  search: string;
  status: TicketStatus | '';
}

interface TicketFiltersProps {
  values: TicketFilterValues;
  onChange: (values: TicketFilterValues) => void;
}

export function TicketFilters({ values, onChange }: TicketFiltersProps) {
  return (
    <div className="ticket-filters">
      <div className="form-field">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          placeholder="Keyword in title or description"
          value={values.search}
          onChange={(e) => onChange({ ...values, search: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={values.status}
          onChange={(e) =>
            onChange({ ...values, status: e.target.value as TicketStatus | '' })
          }
        >
          <option value="">All statuses</option>
          {(Object.keys(STATUS_LABELS) as TicketStatus[]).map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
