# Testing — Support Ticket Management System

## Step 1: Database — complete

See `database/README.md` — `npm run db:verify`

## Step 2: Backend — complete

```bash
cd backend && nvm use 20 && npm test
```

21 tests — state machine unit + API integration.

## Step 3: Frontend — complete

```bash
cd frontend && nvm use 20 && npm test
```

9 tests:

| Suite | Tests | Covers |
|-------|-------|--------|
| `StatusActions.test.tsx` | 3 | Valid buttons per status, onTransition |
| `TicketForm.test.tsx` | 2 | Client validation, submit |
| `ErrorAlert.test.tsx` | 2 | Render + dismiss |
| `ticketStateMachine.test.ts` | 2 | Transition map utils |

Build:
```bash
cd frontend && npm run build
```

## Full stack manual check

1. `cd database && npm run db:up`
2. `cd backend && npm run dev`
3. `cd frontend && npm run dev`
4. Open http://localhost:5173
5. Create ticket, search, filter, change status, add comment
6. Try invalid transition on CLOSED ticket — see error banner
