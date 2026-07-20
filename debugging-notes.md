# Debugging Notes

## Issue 1 — P1000 Authentication failed

### Problem

Prisma `P1000` on migrate/seed.

### How I Investigated

Pasted terminal output; checked which Postgres instance Prisma connected to.

### How AI Helped

Diagnosed Docker not running; port 5432 conflict with local Postgres.

### What I Validated

Started Docker, ran `npm run db:setup` on port 5433.

### Final Fix

`database/docker-compose.yml` port 5433, `db:preflight` script.

---

## Issue 2 — Vitest startup errors

### Problem

`ERR_REQUIRE_ESM`, `crypto.getRandomValues is not a function`.

### How I Investigated

Pasted Vitest stack trace; checked Node version.

### How AI Helped

Identified CJS/ESM config conflict and Node 16 missing Web Crypto.

### What I Validated

`nvm use 20`, renamed config to `.mjs`.

### Final Fix

`vitest.config.mjs`, `check-node.mjs`, `.nvmrc`.

---

## Issue 3 — npm commands with inline comments

### Problem

Shell passed `#` and comment text as args to tsc/vitest.

### How AI Helped

Explained shell parsing of inline comments.

### Final Fix

README warnings — one command per line.

---

## Issue 4 — Screening bugs (5 items) — RESOLVED

See [`review-fixes.md`](review-fixes.md) for full details.

---

## Resolved during development (detail)

### P1000 — Authentication failed for `ticket_user`

| | |
|---|---|
| **Symptom** | Prisma `P1000` on migrate/seed |
| **Root cause** | Docker not running. Prisma hit local Postgres on 5432 — wrong credentials |
| **Fix** | Docker Postgres on port **5433**. `db:setup` script. Preflight check |
| **Files** | `database/docker-compose.yml`, `database/scripts/setup.sh` |

### Vitest startup errors

| | |
|---|---|
| **Symptom** | `ERR_REQUIRE_ESM`, `crypto.getRandomValues is not a function` |
| **Root cause** | `vitest.config.ts` CJS/ESM conflict; Node 16 missing Web Crypto |
| **Fix** | `vitest.config.mjs` + crypto polyfill + `scripts/check-node.mjs` + `.nvmrc` |
| **Files** | `backend/vitest.config.mjs`, `frontend/vitest.config.mjs` |

### npm commands with inline comments

| | |
|---|---|
| **Symptom** | `tsc` tried to compile `#`, `TypeScript`, `compile` as files |
| **Root cause** | Pasted `npm test # run tests` — shell/npm passed comment as args |
| **Fix** | README warning: one command per line, no `# comments` |
| **Prevention** | Document in all READMEs |

---

## Open issues — screening Step 4 (2026-07-14) — RESOLVED

All five items below were fixed after human approval.

### 1. Critical — Status update TOCTOU race (backend) — FIXED

**Fix:** `updateMany` with `WHERE id AND status = expected`. If `count === 0`, re-read current status and throw `INVALID_TRANSITION`.

**Files:** `ticketRepository.ts`, `ticketService.ts`

---

### 2. High — Comment text cleared before API success (frontend) — FIXED

**Fix:** `onSubmit` returns `Promise<void>`. Form awaits success before `setMessage('')`. Re-throw on failure so text is preserved.

**Files:** `CommentForm.tsx`, `TicketDetailPage.tsx`

---

### 3. High — refetch clears ticket after successful mutation (frontend) — FIXED

**Fix:** On fetch error, `setTicket((current) => current)` preserves existing data instead of nulling.

**Files:** `useTicket.ts`

---

### 4. Medium — Stale fetch race in hooks (frontend) — FIXED

**Fix:** `AbortController` on unmount + request-id guard. Search debounced 300ms via `useDebouncedValue`.

**Files:** `useTicket.ts`, `useTickets.ts`, `client.ts`, `ticketsApi.ts`, `TicketListPage.tsx`

---

### 5. Medium — Prisma P2025 → 500 instead of 404 (backend) — FIXED

**Fix:** Map `PrismaClientKnownRequestError` code `P2025` to `404 NOT_FOUND` in `errorHandler`.

**Files:** `errorHandler.ts`

---

## Previously open (archived)

## Minor polish suggestions (code-refactorer)

Safe to batch in small PR after approval:

| Area | Suggestion |
|------|------------|
| `backend/src/routes/*.ts` | Extract `asyncHandler` to reduce try/catch boilerplate |
| `backend/src/repositories/*` | Share `userSummarySelect` constant |
| FE + BE | Shared state machine module (drift prevention) |
| `frontend/src/api/ticketsApi.ts` | Type `addComment` return as `Comment` |
| `backend/src/middleware/errorHandler.ts` | Log unexpected 500s server-side |

---

## Major — by design for Core (Stretch territory)

| Item | Note |
|------|------|
| No authentication | Per Requirements — Stretch |
| Client-trusted `createdById` | Acting user dropdown — demo pattern |
| Open `GET /api/users` | Needed for assignee picker |

Do not "fix" without product decision — these are documented trade-offs.

---

## Debugging commands reference

```bash
# Node version
nvm use 20

# Database
cd database && npm run db:preflight && npm run db:studio

# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# API health
curl http://localhost:3001/api/health

# Backend logs
cd backend && npm run dev
```
