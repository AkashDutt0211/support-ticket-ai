export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED'
  | 'CANCELLED';

export type UserRole = 'AGENT' | 'ADMIN' | 'REQUESTER';

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Comment {
  id: string;
  message: string;
  createdAt: string;
  createdBy: UserSummary;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedToId: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: UserSummary | null;
  createdBy: UserSummary;
  comments?: Comment[];
}

export interface CreateTicketInput {
  title: string;
  description: string;
  priority: TicketPriority;
  createdById: string;
  assignedToId?: string | null;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  assignedToId?: string | null;
}

export interface TicketListFilters {
  status?: TicketStatus;
  search?: string;
}
