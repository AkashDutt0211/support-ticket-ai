import { TicketPriority, TicketStatus, UserRole } from '@prisma/client';

export interface SeedUser {
  name: string;
  email: string;
  role: UserRole;
}

export interface SeedTicket {
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdByEmail: string;
  assignedToEmail?: string;
}

export interface SeedComment {
  ticketTitle: string;
  message: string;
  createdByEmail: string;
}

export const seedUsers: SeedUser[] = [
  { name: 'Alice Agent', email: 'alice@company.com', role: UserRole.AGENT },
  { name: 'Bob Admin', email: 'bob@company.com', role: UserRole.ADMIN },
  { name: 'Carol Requester', email: 'carol@company.com', role: UserRole.REQUESTER },
  { name: 'Dave Agent', email: 'dave@company.com', role: UserRole.AGENT },
];

export const seedTickets: SeedTicket[] = [
  {
    title: 'Cannot login to dashboard',
    description: 'User reports login page spins forever after entering credentials. Browser: Chrome 124.',
    priority: TicketPriority.HIGH,
    status: TicketStatus.OPEN,
    createdByEmail: 'carol@company.com',
    assignedToEmail: 'alice@company.com',
  },
  {
    title: 'Request new API key',
    description: 'Need API key for staging integration testing. Team: Platform.',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.OPEN,
    createdByEmail: 'carol@company.com',
  },
  {
    title: 'Email notifications delayed',
    description: 'Support alerts arriving 30+ minutes late. Affects SLA tracking.',
    priority: TicketPriority.HIGH,
    status: TicketStatus.IN_PROGRESS,
    createdByEmail: 'bob@company.com',
    assignedToEmail: 'dave@company.com',
  },
  {
    title: 'Export report timeout',
    description: 'Monthly report export fails after 60 seconds. Dataset ~50k rows.',
    priority: TicketPriority.CRITICAL,
    status: TicketStatus.IN_PROGRESS,
    createdByEmail: 'carol@company.com',
    assignedToEmail: 'alice@company.com',
  },
  {
    title: 'Password reset link expired',
    description: 'Reset link valid only 5 minutes. Users miss window. Request 24h expiry.',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.RESOLVED,
    createdByEmail: 'carol@company.com',
    assignedToEmail: 'dave@company.com',
  },
  {
    title: 'Mobile layout broken on iOS',
    description: 'Ticket list overlaps header on iPhone 14. Fixed in release 2.1.',
    priority: TicketPriority.LOW,
    status: TicketStatus.CLOSED,
    createdByEmail: 'bob@company.com',
    assignedToEmail: 'alice@company.com',
  },
  {
    title: 'Duplicate charge on invoice',
    description: 'Customer billed twice for March subscription. Refund requested.',
    priority: TicketPriority.HIGH,
    status: TicketStatus.CANCELLED,
    createdByEmail: 'carol@company.com',
    assignedToEmail: 'dave@company.com',
  },
  {
    title: 'Feature request: dark mode',
    description: 'Users want dark theme for support portal. Deprioritized this quarter.',
    priority: TicketPriority.LOW,
    status: TicketStatus.CANCELLED,
    createdByEmail: 'bob@company.com',
  },
];

export const seedComments: SeedComment[] = [
  {
    ticketTitle: 'Cannot login to dashboard',
    message: 'Reproduced on Chrome. Checking auth service logs.',
    createdByEmail: 'alice@company.com',
  },
  {
    ticketTitle: 'Cannot login to dashboard',
    message: 'Found stale session cookie. Clearing cache fixes it temporarily.',
    createdByEmail: 'alice@company.com',
  },
  {
    ticketTitle: 'Email notifications delayed',
    message: 'Queue backlog detected. Scaling workers now.',
    createdByEmail: 'dave@company.com',
  },
  {
    ticketTitle: 'Export report timeout',
    message: 'Testing chunked export approach. ETA 2 days.',
    createdByEmail: 'alice@company.com',
  },
  {
    ticketTitle: 'Password reset link expired',
    message: 'Extended token TTL to 24h. Deployed to staging.',
    createdByEmail: 'dave@company.com',
  },
  {
    ticketTitle: 'Mobile layout broken on iOS',
    message: 'Verified fix in 2.1. Closing ticket.',
    createdByEmail: 'alice@company.com',
  },
  {
    ticketTitle: 'Duplicate charge on invoice',
    message: 'Customer withdrew request after manual refund.',
    createdByEmail: 'bob@company.com',
  },
];

export const EXPECTED_SEED_COUNTS = {
  users: seedUsers.length,
  tickets: seedTickets.length,
  comments: seedComments.length,
} as const;
