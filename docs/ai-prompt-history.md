# AI Prompt History

## Session: Database stack decision + Step 1 planning

**Date:** 2026-07-14

### Prompt 1 — Technical Lead planning request

> Role: Technical Lead preparing implementation plan.
> Task: Review folder structure and Common Technical Requirements from Requirements doc.
> Step 1: Database preparation plan. Follow .cursor skills/rules. Caveman style. Preserve prompt history in existing .md files.

**Outcome:** Reviewed empty `backend/`, `frontend/`, `database/` folders. Mapped Requirements entities (User, Ticket, Comment) and Common Technical Requirements (persistence, migrations, seeds, env example).

---

### Prompt 2 — PostgreSQL vs MongoDB

> Suggest if PostgreSQL or MongoDB which one will be better and why?

**Decision:** PostgreSQL.

**Rationale (caveman):**
- Three linked tables. FKs natural in SQL.
- Status filter + keyword search = indexes + ILIKE. Easy in Postgres.
- Migrations + seed scripts = exercise requirement. Prisma fits.
- State machine lives in backend. DB stores enum only.
- MongoDB = more app-level integrity work. No gain here.

---

### Prompt 3 — Stack lock + plan

> Use Postgres + Prisma and start with planning.

**Decision:** PostgreSQL 16 + Prisma ORM. All DB artifacts in `database/` folder.

**Plan approved.** Implementation started Step 1.

---

### Prompt 4 — Execute Step 1

> Implement the plan as specified. Do NOT edit the plan file. Complete all todos.

**Action:** Scaffold `database/` package, schema, migrations, seeds, Docker, docs.

---

## Session: Step 2 backend planning

**Date:** 2026-07-14

### Prompt 5 — Database troubleshooting

> P1000 authentication failed, Docker not running, inline comment paste issues.

**Outcome:** Docker Postgres moved to port 5433. Added `db:setup`, `db:preflight`, preflight guards. User started Docker successfully.

---

### Prompt 6 — Step 2 backend plan (human approval required)

> Database is now up and running. Create plan for backend wiring referencing Requirements.
> Wire backend to @prisma/client, repository layer, state machine service, API routes.
> Guardrails: Do not directly create the plan. Review must be made by human — approve then execute.
> Add prompt history and planned documents inside md files.

**Decision:** Plan documented in repo. **No code written yet.** Waiting for **APPROVED**.

**Stack chosen:**
- Node.js 20 + Express + TypeScript
- Zod validation middleware
- Prisma from `database/` workspace
- Vitest + Supertest for integration tests

**Key design calls:**
- Separate `PATCH /tickets/:id/status` for state machine
- Repository pattern — no Prisma in routes
- State machine as pure service module
- `422` for invalid transitions
- `GET /api/users` read-only for assignee picker (no user CRUD in Core)

**Docs updated:**
- `docs/design.md` — backend API design section
- `docs/architecture.md` — backend folder structure + sequence diagram
- `tool-specifics/cursor-workflow/spec.md` — API contract
- `tool-specifics/cursor-workflow/tasks.md` — Step 2 checklist
- `tool-specifics/cursor-workflow/acceptance-criteria.md` — done definition
- `tool-specifics/cursor-workflow/cursor-rules-or-instructions.md` — workflow rules

**Next action after approval:** Implement Step 2 per `tasks.md` section 2.1–2.8.

---

### Prompt 7 — Step 2 approved + implemented

> APPROVED

**Action:** Full backend implemented. 21 tests passing.

**Delivered:**
- Express API on port 3001
- Repository layer (user, ticket, comment)
- State machine service with unit tests
- Zod validation middleware
- Integration tests for all transitions
- `backend/README.md`

---

## Session: Step 2 verification + Step 3 planning

**Date:** 2026-07-14

### Prompt 8 — cURL API verification

> Provide cURL commands to verify all APIs.

**Action:** Full cURL guide with ID setup, all endpoints, error cases, verify script.

---

### Prompt 9 — Test/build troubleshooting

> Vitest ESM error, tsc comment paste issues, crypto.getRandomValues on Node 16.

**Fixes:** `vitest.config.mjs`, Node 20 check script, `.nvmrc`, README warnings about inline comments.

---

### Prompt 10 — APIs verified, plan Step 3 frontend

> APIs verified working. Plan Step 3 — React frontend wired to API.
> Review Requirements for frontend needs.
> Guardrails: plan only, human review before implement. Caveman style.
> Document in md files. Keep prompt history.

**Decision:** Plan documented. **No frontend code yet.** Waiting for **APPROVED**.

**Stack chosen:**
- React 18 + Vite + TypeScript
- react-router-dom v6
- Context + custom hooks (no Redux)
- Vitest + React Testing Library
- native fetch API client

**Key design calls:**
- 3 routes: list, create, detail
- `ActingUserSelect` for seeded user (no auth)
- `StatusActions` mirrors backend state machine — show valid buttons only
- `ErrorAlert` for 422/500, field errors for 400
- RTL tests for StatusActions + TicketForm

**Docs updated:**
- `docs/design.md` — frontend section
- `docs/architecture.md` — frontend layer + sequence diagram
- `tool-specifics/cursor-workflow/project-context.md` — filled
- `tool-specifics/cursor-workflow/spec.md` — frontend contract
- `tool-specifics/cursor-workflow/tasks.md` — Step 3 checklist
- `tool-specifics/cursor-workflow/acceptance-criteria.md` — UI done definition
- `tool-specifics/cursor-workflow/cursor-rules-or-instructions.md` — Step 3 workflow

**Next action after approval:** Implement Step 3 per `tasks.md` section 3.1–3.10.

---

### Prompt 11 — Step 3 approved + implemented

> APPROVED

**Action:** Full React frontend implemented. 9 tests passing. Build OK.

**Delivered:**
- React 19 + Vite + TypeScript SPA
- 3 routes: list, create, detail
- Acting user selector (no auth)
- StatusActions mirrors state machine
- Search + status filter
- ErrorAlert for API errors
- RTL tests
- `frontend/README.md`

---

### Prompt 12 — Step 4 submission artifacts + screening

> Work on next steps of adding details in tool-workflow.md, reflection, PR description (Step 4 submission artifacts). Also polish things if needed. Screen with /code-refactorer and /context-aware-bug-hunter. Guardrails: don't change anything major; require human approval before changing code.

**Action:** Wrote Step 4 artifacts. Ran full-app screening. No major code changes — findings documented for approval.

**Delivered:**
- `tool-workflow.md` — Part A AI workflow (11 sections)
- `docs/reflcetion.md` — honest reflection + trade-offs
- `PR_DESCRIPTION.md` — summary, test plan, known limitations
- `docs/debugging.md` — resolved issues + open screening items
- Updated `tasks.md`, `project-context.md`, `README.md`

**Screening verdict (no fixes applied):**
- Critical edge case: status update TOCTOU race (backend)
- High UX: CommentForm clears before API success
- High UX: useTicket refetch nulls ticket on network error
- Medium: stale fetch races, P2025 → 500
- Minor: DRY suggestions (asyncHandler, shared state machine)

**Next action (optional, needs approval):** Fix items in `docs/debugging.md` § Open issues.

