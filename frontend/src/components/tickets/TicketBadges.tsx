import type { TicketPriority, TicketStatus } from '../../types/ticket';
import { PRIORITY_LABELS, STATUS_LABELS } from '../../utils/ticketStateMachine';

interface StatusBadgeProps {
  status: TicketStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge badge-status badge-status-${status.toLowerCase()}`}>{STATUS_LABELS[status]}</span>;
}

interface PriorityBadgeProps {
  priority: TicketPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span className={`badge badge-priority badge-priority-${priority.toLowerCase()}`}>
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
