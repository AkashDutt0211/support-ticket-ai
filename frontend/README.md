# Frontend — Support Ticket Management System

React + Vite + TypeScript UI for support tickets.

## Prerequisites

- Node.js **20+** (`nvm use 20` — see `.nvmrc`)
- Backend API running on port **3001**
- Database running with seed data

## Setup

```bash
nvm use 20
cp .env.example .env
npm install
```

## Run (with backend)

Terminal 1 — backend:
```bash
cd backend && nvm use 20 && npm run dev
```

Terminal 2 — frontend:
```bash
cd frontend && nvm use 20 && npm run dev
```

Open **http://localhost:5173**

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm test` | Component tests (RTL) |

Run one command per line. No inline `# comments`.

## Features

- Ticket list with keyword search + status filter
- Create ticket
- Ticket detail — edit fields, change status, add comments
- Acting user selector (seeded users, no auth)
- Status buttons show valid transitions only
- Error banners for API failures (400/404/422)

## Environment

```
VITE_API_URL=http://localhost:3001/api
```

## Tests

9 tests — StatusActions, TicketForm, ErrorAlert, state machine utils.

```bash
npm test
```
