import type { TicketStatus } from '../../types/ticket';
import { getValidTransitions, STATUS_LABELS } from '../../utils/ticketStateMachine';

interface StatusActionsProps {
  currentStatus: TicketStatus;
  isSubmitting: boolean;
  onTransition: (status: TicketStatus) => void;
}

export function StatusActions({ currentStatus, isSubmitting, onTransition }: StatusActionsProps) {
  const nextStatuses = getValidTransitions(currentStatus);

  if (nextStatuses.length === 0) {
    return <p className="muted">No further status changes available.</p>;
  }

  return (
    <div className="status-actions">
      <h3>Change status</h3>
      <div className="button-row">
        {nextStatuses.map((status) => (
          <button
            key={status}
            type="button"
            className="btn btn-secondary"
            disabled={isSubmitting}
            onClick={() => onTransition(status)}
          >
            {STATUS_LABELS[status]}
          </button>
        ))}
      </div>
    </div>
  );
}
