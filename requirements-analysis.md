# Requirement Analysis

**Date:** 2026-07-14  
**Method:** AI-assisted analysis of [`Requirements`](Requirements), validated by human before implementation.  
**Prompt:** Session 1 — see [`ai-prompts/planning.md`](ai-prompts/planning.md).

## Selected Project Option

**Support Ticket Management System** (Backend-heavy) — Core mandatory scope.

## My Understanding (in your own words)

A small internal support ticket app where users create, update, comment on, search, and progress tickets through a **defined status state machine**. The exercise values lifecycle artifacts (prompt history, design, testing, reflection) as much as the working app. Authentication is optional; seeded users suffice for Core.

## Functional Requirements

(See §3 Core vs Stretch below for detailed mapping.)

## Non-Functional Requirements

- Data persists across restart (PostgreSQL + Docker volume)
- Backend validates all input; meaningful UI error states
- No secrets in repository
- README setup instructions that work from clean clone
- Full prompt history grouped by activity under `ai-prompts/`

## Assumptions

- Acting-user dropdown acceptable instead of auth (Requirements §88)
- Monorepo (`database/`, `backend/`, `frontend/`) satisfies frontend + backend + DB requirements; root `src/` and `tests/` use symlinks to package directories per Requirements §163
- `database/seed-data/` exposes seed scripts via symlinks to `prisma/seed.ts` and `prisma/seed-data.ts`
- API uses `*Id` suffix on write payloads (`createdById`, `assignedToId`); responses include nested `createdBy` / `assignedTo` objects matching Requirements entity names
- Status stored as enums (`OPEN`, `IN_PROGRESS`, …); UI shows Requirements labels ("Open", "In Progress", …)
- Port 5433 for Docker Postgres to avoid local 5432 conflict
- Node 20 for Vitest/crypto compatibility

## Clarifications (questions for a product owner)

- None blocking — Requirements are explicit for Core scope
- Stretch items (auth, pagination, OpenAPI) deferred intentionally

## Edge Cases

| Case | Handling |
|------|----------|
| Unassigned ticket | `assignedToId` nullable |
| Invalid status transition | Backend 422; frontend hides invalid buttons |
| Concurrent status update | Atomic `updateMany WHERE status = expected` |
| Missing ticket/user | 404 |
| Empty search | Returns all tickets (no filter) |
| Terminal status (CLOSED/CANCELLED) | No outbound transitions |

---

## 1. Exercise goals (what the feedback actually measures)

From Requirements §1 and §5:

| Goal | Weight | What it means for this project |
|------|--------|-------------------------------|
| Part A — AI Workflow | 20% | Show context-setting, prompting, iteration, validation — not just codegen |
| Part B — Full-stack app | 60% | Working Core app as vehicle for lifecycle evidence |
| Part C — Reflection + submission | 20% | Honest ownership, trade-offs, growth areas |

**Key insight:** "The lifecycle artifacts are the point" (Requirements line 85). Core app is intentionally small; prompt history, design docs, and reflection matter as much as code.

---

## 2. Project choice

**Selected:** Support Ticket Management System (Backend-heavy option)

**Why:**
- Relational data model (User, Ticket, Comment) — good DB design exercise
- State machine is the "signature judgment piece" (Requirements line 118)
- Maps cleanly to REST API + React UI
- Integration tests for transitions are a clear mandatory test tier

---

## 3. Core vs Stretch scope

### Core (mandatory — built)

| Requirement | Analysis | Decision |
|-------------|----------|----------|
| User entity (seeded only) | No user CRUD UI in Core | Seed 4 users; `GET /api/users` for assignee picker |
| Ticket CRUD | Full create/list/view/update | Standard REST + React pages |
| Status state machine | Hardest part — backend must reject invalid | Separate `PATCH /status` endpoint; 422 on invalid |
| Comments | Nested under ticket | `POST /tickets/:id/comments` |
| Search + status filter | One filter capability minimum | `?search=` + `?status=` on list endpoint |
| Validation | Backend rejects invalid input | Zod at API boundary |
| Error states in UI | Meaningful messages | `ErrorAlert`, field errors for 400 |
| Persistence | Data survives restart | PostgreSQL in Docker |
| Tests | State machine integration tests | Vitest + Supertest against real DB |
| No secrets in repo | Security baseline | `.env.example` only, `.gitignore` for `.env` |

### Stretch (optional — not built)

| Item | Why deferred |
|------|--------------|
| Authentication | Explicitly optional in Requirements §88 |
| User CRUD | Stretch only |
| Pagination, priority filter, sorting | Stretch |
| OpenAPI / Swagger | Stretch |
| CI / Docker for full stack | Partial — DB Docker only |

---

## 4. Common Technical Requirements mapping

| Requirement (Requirements §71–83) | How we satisfy it |
|--------------------------------|-------------------|
| Frontend application | `frontend/` — React 19 + Vite |
| Backend API | `backend/` — Express + TypeScript |
| Database persistence | PostgreSQL 16 via Prisma |
| Migration scripts | `database/prisma/migrations/20250714100000_init/` |
| Seed / sample data | `database/prisma/seed.ts` — 4 users, 8 tickets, 7 comments |
| Input validation | Zod validators + React form validation |
| Error handling | Central `errorHandler`, typed errors, UI banners |
| Search or filter | Keyword search + status filter |
| Meaningful test tier | 24 backend + 11 frontend tests |
| README setup instructions | Root + per-package READMEs |
| **Full prompt history** | `ai-prompt-history.md` |
| All lifecycle artifacts in repo | root lifecycle markdown, `tool-workflow.md`, `tool-specific/cursor-workflow/` |

---

## 5. Entity model (from Requirements §96–105)

```
User
  id, name, email, role (AGENT | ADMIN | REQUESTER)

Ticket
  id, title, description, priority, status,
  assignedTo → User, createdBy → User,
  createdAt, updatedAt

Comment
  id, ticketId → Ticket, message, createdBy → User, createdAt
```

**Relationships:**
- Ticket belongs to User (createdBy) — required
- Ticket optionally assigned to User (assignedTo)
- Comment belongs to Ticket and User

---

## 6. State machine (signature judgment piece)

Requirements §118–125:

```
OPEN         → IN_PROGRESS, CANCELLED
IN_PROGRESS  → RESOLVED, CANCELLED
RESOLVED     → CLOSED
CLOSED       → (terminal)
CANCELLED    → (terminal)
```

**Design decisions (human + AI):**

| Decision | Rationale |
|----------|-----------|
| Enforce in backend service, not DB trigger | Business logic belongs in app layer; DB stores enum |
| Separate status endpoint | Prevents accidental status change via field PATCH |
| Mirror in frontend UI | Show only valid transition buttons — UX matches rules |
| Return 422 for invalid transition | Distinct from 400 validation / 404 not found |
| Integration tests for every path | Mandatory test tier — proves rules work end-to-end |

---

## 7. Database choice (AI recommendation → human approval)

**Prompt:** "PostgreSQL or MongoDB — which is better and why?"

**AI recommendation:** PostgreSQL

**Human decision:** Approved PostgreSQL + Prisma

| Factor | PostgreSQL | MongoDB |
|--------|------------|---------|
| FK relationships | Native | App-level only |
| Status filter + search | Indexed columns + ILIKE | Possible but more work |
| Migrations requirement | Prisma migrate fits exercise | Less natural fit |
| State machine | Lives in backend either way | Same |

See prompt history Prompt 2 for full AI reasoning.

---

## 8. Acceptance criteria checklist (Core §138–149)

- [x] Create ticket via UI
- [x] View all tickets from database
- [x] Ticket detail view
- [x] Update fields and reassign
- [x] Add comments
- [x] Valid transitions only; invalid rejected
- [x] Keyword search + status filter
- [x] Data survives restart
- [x] Backend validation
- [x] No secrets committed
- [x] State machine integration tests pass

Tracked in [`tool-specific/cursor-workflow/acceptance-criteria.md`](tool-specific/cursor-workflow/acceptance-criteria.md).

---

## 9. Risks identified before coding

| Risk | Mitigation |
|------|------------|
| AI over-implements without scope control | Plan → **APPROVED** → implement gate |
| State machine drift FE/BE | Same rules in both; tests on both sides |
| Local env issues (Docker, Node version) | Documented in `debugging-notes.md`; preflight scripts |
| Shallow prompt history | Append to `ai-prompt-history.md` every session |
| No auth but client sends userId | Documented trade-off; acting-user selector for demo |

---

## 10. Out of scope (explicit)

- Login / JWT / protected routes
- User management UI
- Pagination
- Production deployment
- E2E browser tests (unit + integration only)
