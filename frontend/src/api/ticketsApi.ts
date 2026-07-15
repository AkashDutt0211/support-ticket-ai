import type {
  CreateTicketInput,
  Ticket,
  TicketListFilters,
  TicketStatus,
  UpdateTicketInput,
  UserSummary,
} from '../types/ticket';
import { apiRequest } from './client';

function buildQuery(filters: TicketListFilters): string {
  const params = new URLSearchParams();
  if (filters.status) {
    params.set('status', filters.status);
  }
  if (filters.search?.trim()) {
    params.set('search', filters.search.trim());
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

export const ticketsApi = {
  list(filters: TicketListFilters = {}, signal?: AbortSignal): Promise<Ticket[]> {
    return apiRequest<Ticket[]>(`/tickets${buildQuery(filters)}`, { signal });
  },

  getById(id: string, signal?: AbortSignal): Promise<Ticket> {
    return apiRequest<Ticket>(`/tickets/${id}`, { signal });
  },

  create(input: CreateTicketInput): Promise<Ticket> {
    return apiRequest<Ticket>('/tickets', { method: 'POST', body: input });
  },

  update(id: string, input: UpdateTicketInput): Promise<Ticket> {
    return apiRequest<Ticket>(`/tickets/${id}`, { method: 'PATCH', body: input });
  },

  updateStatus(id: string, status: TicketStatus): Promise<Ticket> {
    return apiRequest<Ticket>(`/tickets/${id}/status`, { method: 'PATCH', body: { status } });
  },

  addComment(id: string, message: string, createdById: string): Promise<unknown> {
    return apiRequest(`/tickets/${id}/comments`, {
      method: 'POST',
      body: { message, createdById },
    });
  },
};

export const usersApi = {
  list(): Promise<UserSummary[]> {
    return apiRequest<UserSummary[]>('/users');
  },
};
