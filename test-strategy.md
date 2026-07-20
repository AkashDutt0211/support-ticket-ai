# Test Strategy

## Test Scope

Core mandatory tier: **state-machine integration tests** proving valid transitions succeed and invalid transitions are rejected. Extended with unit and component tests across all packages (114 total).

## Unit Tests

| Package | Command | Unit tests | Integration tests | Total |
|---------|---------|------------|-------------------|-------|
| `database/` | `npm test` | 16 | — | **16** |
| `backend/` | `npm test` | 45 | 12 | **57** |
| `frontend/` | `npm test` | 41 | — | **41** |

**Grand total: 114 automated tests** (requires Node 20, Docker for backend integration)

---

## Step 1: Database

```bash
cd database && nvm use 20 && npm test
```

**16 unit tests** — no database connection required:

| Suite | Tests | Covers |
|-------|-------|--------|
| `migration.test.ts` | 6 | SQL schema: tables, enums, indexes, FKs, OPEN default |
| `seed-data.test.ts` | 7 | Seed integrity: counts, FK refs, status coverage, search keyword |
| `enums.test.ts` | 3 | Prisma enum values match Core requirements |

Verify DB with Docker:
```bash
npm run db:verify
```

---

## Step 2: Backend

```bash
cd backend && nvm use 20 && npm test
```

**57 tests** (45 unit + 12 integration):

| Suite | Tests | Covers |
|-------|-------|--------|
| `ticketStateMachine.test.ts` | 11 | Valid/invalid transitions |
| `ticketService.test.ts` | 6 | CRUD, not-found, atomic status race |
| `commentService.test.ts` | 3 | Ticket/user validation, create |
| `errorHandler.test.ts` | 6 | 400/404/422/500, P2025 mapping |
| `validate.test.ts` | 4 | Zod middleware body/query/params |
| `ticketValidators.test.ts` | 12 | Request schema edge cases |
| `commentValidators.test.ts` | 3 | Comment payload validation |
| `tickets.integration.test.ts` | 12 | API + real Postgres, state machine |

Integration tests require Docker Postgres on port 5433.

---

## Step 3: Frontend

```bash
cd frontend && nvm use 20 && npm test
```

**41 unit tests:**

| Suite | Tests | Covers |
|-------|-------|--------|
| `client.test.ts` | 6 | API success, errors, validation, network, abort |
| `ticketsApi.test.ts` | 3 | Query building, status endpoint |
| `api.test.ts` | 5 | Error message helpers |
| `useTicket.test.tsx` | 3 | Load, missing id, preserve on refetch fail |
| `useDebouncedValue.test.tsx` | 3 | Debounce timing, cleanup |
| `ticketStateMachine.test.ts` | 2 | FE transition utils |
| `isAbortError.test.ts` | 3 | Abort detection |
| `StatusActions.test.tsx` | 3 | Valid buttons per status |
| `TicketForm.test.tsx` | 2 | Validation, submit |
| `CommentForm.test.tsx` | 2 | Retain on fail, clear on success |
| `TicketFilters.test.tsx` | 3 | Search/filter interactions |
| `TicketBadges.test.tsx` | 4 | Status/priority labels |
| `ErrorAlert.test.tsx` | 2 | Render, dismiss |

Build:
```bash
cd frontend && npm run build
```

---

## Full stack manual check

1. `cd database && npm run db:up`
2. `cd backend && npm run dev`
3. `cd frontend && npm run dev`
4. Open http://localhost:5173
5. Create ticket, search, filter, change status, add comment
6. Try invalid transition on CLOSED ticket — see error banner

---

## Run all tests

```bash
nvm use 20
cd database && npm test
cd ../backend && npm test   # needs Docker
cd ../frontend && npm test
```

---

## Component Tests

Frontend RTL tests for `StatusActions`, `TicketForm`, `CommentForm`, `TicketFilters`, `ErrorAlert` — see `frontend/tests/components/`.

## API / Integration Tests

`backend/tests/integration/tickets.integration.test.ts` — all valid/invalid state transitions against real PostgreSQL.

## Edge Case Tests

- Atomic status update race (`ticketService.test.ts`)
- CommentForm retains input on API failure
- P2025 → 404 mapping (`errorHandler.test.ts`)
- Refetch preserves ticket on error (`useTicket.test.tsx`)

## Tests Not Covered (and why)

| Gap | Why |
|-----|-----|
| E2E (Playwright/Cypress) | Stretch — Core uses integration + component tests |
| Auth flow tests | Auth not implemented (optional Stretch) |
| Pagination/sort tests | Stretch features not built |
| Load/performance tests | Out of exercise scope |

Results: [`test-results.md`](test-results.md)
