import { Link } from 'react-router-dom';
import type { Ticket } from '../../types/ticket';
import { PriorityBadge, StatusBadge } from './TicketBadges';

interface TicketListProps {
  tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <Link to={`/tickets/${ticket.id}`} className="ticket-list-item">
            <div className="ticket-list-item-header">
              <strong>{ticket.title}</strong>
              <div className="badge-row">
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>
            <p className="ticket-list-description">{ticket.description}</p>
            <p className="muted">
              Created by {ticket.createdBy.name}
              {ticket.assignedTo ? ` · Assigned to ${ticket.assignedTo.name}` : ' · Unassigned'}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
