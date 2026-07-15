# Pull Request — Support Ticket Management System (Core)

## Summary

Implements the **mandatory Core** of the Support Ticket Management System — a full-stack AI-assisted exercise with lifecycle artifacts.

- **PostgreSQL + Prisma** database with migrations, seeds, Docker setup
- **Express + TypeScript** REST API with ticket state machine enforcement
- **React + Vite** frontend wired to API — list, create, detail, search, filter, comments
- **30 automated tests** (21 backend + 9 frontend)
- Full **AI workflow documentation** — prompt history, design, testing, reflection

## Stack

| Layer | Technology |
|-------|------------|
| Database | PostgreSQL 16, Prisma, Docker (port 5433) |
| Backend | Node 20, Express, Zod, Vitest + Supertest |
| Frontend | React 19, Vite, TypeScript, RTL + Vitest |
| Monorepo | npm workspaces: `database`, `backend`, `frontend` |

## What's included

### Part B — Application (Core)

- [x] Create, list, view, update tickets
- [x] Status transitions via enforced state machine
- [x] Comments on tickets
- [x] Keyword search + status filter
- [x] Input validation (Zod backend, forms frontend)
- [x] Meaningful error states (400/404/422/500)
- [x] Seeded users + acting-user selector (no auth — per Core spec)

### Part A + C — Lifecycle artifacts

- [x] [`tool-workflow.md`](tool-workflow.md) — AI workflow (Part A)
- [x] [`docs/ai-prompt-history.md`](docs/ai-prompt-history.md) — full prompt log
- [x] [`docs/design.md`](docs/design.md) + [`docs/architecture.md`](docs/architecture.md)
- [x] [`docs/testing.md`](docs/testing.md) + [`docs/debugging.md`](docs/debugging.md)
- [x] [`docs/reflcetion.md`](docs/reflcetion.md) — reflection
- [x] [`tool-specifics/cursor-workflow/`](tool-specifics/cursor-workflow/) — Cursor artifacts

## API endpoints

```
GET    /api/health
GET    /api/users
GET    /api/tickets?status=&search=
GET    /api/tickets/:id
POST   /api/tickets
PATCH  /api/tickets/:id
PATCH  /api/tickets/:id/status
POST   /api/tickets/:id/comments
```

## State machine

```
OPEN         → IN_PROGRESS, CANCELLED
IN_PROGRESS  → RESOLVED, CANCELLED
RESOLVED     → CLOSED
CLOSED       → (terminal)
CANCELLED    → (terminal)
```

Backend rejects invalid transitions with `422 INVALID_TRANSITION`. Frontend shows only valid action buttons.

## How to run

```bash
nvm use 20
npm install

# Database
cd database && cp .env.example .env && npm run db:setup

# Backend (terminal 1)
cd backend && cp .env.example .env && npm run dev

# Frontend (terminal 2)
cd frontend && cp .env.example .env && npm run dev
```

- API: http://localhost:3001/api
- UI: http://localhost:5173

## Test plan

- [x] `cd database && npm run db:verify` (with Docker running)
- [x] `cd backend && npm test` — 21 pass
- [x] Frontend tests — 11 pass
- [x] Backend unit tests — 12 pass (integration needs Docker on 5433)
- [x] `cd frontend && npm run build` — production build OK
- [x] Manual: create ticket → search → filter → transition status → add comment
- [x] Manual: invalid transition on CLOSED ticket shows error banner
- [x] cURL verification of all endpoints

## Known limitations (Core — intentional)

- No authentication (Stretch)
- Client sends `createdById` — acting user dropdown for demo
- State machine duplicated in FE + BE (synced, documented)
- No pagination / priority filter (Stretch)

## Post-review items — RESOLVED

All five screening items from [`docs/debugging.md`](docs/debugging.md) were fixed:

1. Atomic status update (`updateMany` + expected status)
2. CommentForm clears only on success
3. `useTicket` preserves data on refetch failure
4. AbortController + debounced search
5. Prisma P2025 → 404

## AI workflow note

Built with **Cursor** using spec-driven flow: plan documented → human **APPROVED** → implement. Full traceability in `docs/ai-prompt-history.md`.
