# Backend — Support Ticket Management System

Node.js + Express + TypeScript API for support tickets.

## Prerequisites

- Node.js **20+** (`nvm use 20` — see `.nvmrc`)
- Docker Postgres running (`cd ../database && npm run db:setup`)

## Setup

```bash
nvm use 20
cp .env.example .env
```

Copy `DATABASE_URL` from `database/.env` if needed (port **5433**).

From repo root:

```bash
npm install
cd database && npm run db:generate
cd ../backend
npm run dev
```

API runs at **http://localhost:3001**

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run compiled server |
| `npm test` | Unit + integration tests |

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health + DB ping |
| GET | `/api/users` | List seeded users |
| GET | `/api/tickets` | List (`?status`, `?search`) |
| GET | `/api/tickets/:id` | Ticket detail |
| POST | `/api/tickets` | Create ticket |
| PATCH | `/api/tickets/:id` | Update fields |
| PATCH | `/api/tickets/:id/status` | Status transition |
| POST | `/api/tickets/:id/comments` | Add comment |

## State machine

```
OPEN         -> IN_PROGRESS, CANCELLED
IN_PROGRESS  -> RESOLVED, CANCELLED
RESOLVED     -> CLOSED
CLOSED       -> (terminal)
CANCELLED    -> (terminal)
```

Invalid transition returns `422` with `INVALID_TRANSITION`.

## Tests

Requires running Postgres with seed data:

```bash
npm test
npm run build
```

Run one command per line. Do not paste `# comments` on the same line — the shell may pass them as arguments.

- **Unit:** `tests/unit/ticketStateMachine.test.ts`
- **Integration:** `tests/integration/tickets.integration.test.ts` — all valid/invalid transitions
