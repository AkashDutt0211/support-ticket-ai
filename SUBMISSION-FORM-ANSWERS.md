# Submission Form Answers — Support Ticket Management System

**Purpose:** Mirror the online participation form answers **inside the repository** so reviewers can cross-check claims against code.  
**Instructions:** Copy these answers into the official submission form when submitting. Keep this file updated if form answers change.

**Related:** [`SUBMISSION.md`](SUBMISSION.md) (artifact index) · [`ai-prompt-history.md`](ai-prompt-history.md) (full prompt log)

---

## Form metadata

| Field | Answer |
|-------|--------|
| **Project option** | Support Ticket Management System (Backend-heavy / full-stack Core) |
| **Primary AI tool** | Cursor (Agent mode + Plan mode + custom commands) |
| **Repository** | This repo — see [`README.md`](README.md) for setup |

---

## Q1. How did you understand the requirements before coding?

I read [`Requirements`](Requirements) end-to-end and separated **Core** (mandatory) from **Stretch** (optional). The exercise weights lifecycle artifacts heavily — prompt history and design docs matter as much as the app.

**Core scope I committed to:**
- Three entities: User (seeded), Ticket, Comment
- Ticket lifecycle state machine — the hardest judgment piece
- Keyword search + status filter
- Backend validation + meaningful UI errors
- Integration tests proving valid/invalid transitions
- No authentication (explicitly optional in Requirements §88)

**What I deliberately skipped (Stretch):** auth, user CRUD UI, pagination, OpenAPI, CI.

**Evidence in repo:**
- [`requirement-analysis.md`](requirement-analysis.md) — full breakdown written **before** implementation
- [`tool-specific/cursor-workflow/acceptance-criteria.md`](tool-specific/cursor-workflow/acceptance-criteria.md) — done definition per step
- Prompt that started analysis: [`ai-prompt-history.md` § Prompt 1](ai-prompt-history.md#prompt-1--technical-lead-planning-verbatim)

---

## Q2. How did you use AI across the software development lifecycle?

| Phase | How AI was used | Evidence |
|-------|-----------------|----------|
| **Requirement analysis** | AI read `@Requirements`, compared Postgres vs MongoDB, mapped Core vs Stretch | [`requirement-analysis.md`](requirement-analysis.md), [Prompt 2](ai-prompt-history.md#prompt-2--stack-decision-verbatim) |
| **Planning / design** | AI drafted plans in docs; **no code until human APPROVED** | [`spec.md`](tool-specific/cursor-workflow/spec.md), [`design.md`](design.md), [Prompt 6](ai-prompt-history.md#prompt-6--backend-plan-verbatim-paraphrased-key-parts) |
| **Code generation** | Layer-by-layer: schema → repos → services → routes → UI | `database/`, `backend/`, `frontend/` |
| **Validation** | `npm test`, `npm run build`, cURL, manual UI walkthrough | [`testing.md`](testing.md), [`PR_DESCRIPTION.md`](PR_DESCRIPTION.md) |
| **Debugging** | Pasted terminal errors; AI diagnosed; human verified fix | [`debugging.md`](debugging.md), [Iteration A–E](ai-prompt-history.md#iteration-log-ai-mistakes--human-corrections) |
| **Code review** | `/code-refactorer` + `/context-aware-bug-hunter` commands; `.cursor/rules/` | [Prompt 12–13](ai-prompt-history.md#session-4--submission-artifacts--screening) |
| **Documentation** | Prompt history appended every session; reflection honest about trade-offs | This file, [`reflection.md`](reflection.md), [`tool-workflow.md`](tool-workflow.md) |

**Workflow pattern:** `@Requirements` + workflow docs → AI plans → I reply **APPROVED** → AI implements → append prompt history.

---

## Q3. What are your key design and code decisions? Why?

### 1. PostgreSQL + Prisma (not MongoDB)

Relational FKs (Ticket → User, Comment → Ticket), status filter + ILIKE search, migration scripts fit exercise requirements.

- **Decision doc:** [`requirement-analysis.md` §7](requirement-analysis.md#7-database-choice-ai-recommendation--human-approval)
- **Schema:** [`database/prisma/schema.prisma`](database/prisma/schema.prisma)

### 2. Separate status endpoint (state machine isolation)

`PATCH /tickets/:id` updates fields only. `PATCH /tickets/:id/status` handles transitions. Prevents accidental status change via field update.

- **Spec:** [`spec.md`](tool-specific/cursor-workflow/spec.md)
- **Route:** [`backend/src/routes/tickets.ts`](backend/src/routes/tickets.ts)
- **Service:** [`backend/src/services/ticketService.ts`](backend/src/services/ticketService.ts)

### 3. State machine enforced in backend; mirrored in frontend UI

Backend throws `422 INVALID_TRANSITION`. Frontend `StatusActions` shows only valid buttons.

- **Backend rules:** [`backend/src/services/ticketStateMachine.ts`](backend/src/services/ticketStateMachine.ts)
- **Frontend mirror:** [`frontend/src/utils/ticketStateMachine.ts`](frontend/src/utils/ticketStateMachine.ts)
- **UI:** [`frontend/src/components/tickets/StatusActions.tsx`](frontend/src/components/tickets/StatusActions.tsx)
- **Tests:** [`backend/tests/integration/tickets.integration.test.ts`](backend/tests/integration/tickets.integration.test.ts)

### 4. Repository pattern — no Prisma in routes

Keeps routes thin; testable service layer.

- **Example:** [`backend/src/repositories/ticketRepository.ts`](backend/src/repositories/ticketRepository.ts)

### 5. Acting user selector instead of auth (Core scope)

Requirements allow skipping auth. Seeded users + `GET /api/users` + header dropdown for demo.

- **UI:** [`frontend/src/components/layout/ActingUserSelect.tsx`](frontend/src/components/layout/ActingUserSelect.tsx)

### 6. Atomic status update (post-review fix)

After bug screening, status update uses `updateMany WHERE status = expected` to prevent TOCTOU race.

- **Fix doc:** [`debugging.md` §1](debugging.md#1-critical--status-update-toctou-race-backend--fixed)
- **Code:** [`ticketRepository.ts`](backend/src/repositories/ticketRepository.ts) `updateStatus()`

---

## Q4. Describe your testing approach.

**Backend (24 tests):**
- **Unit:** state machine pure functions — [`ticketStateMachine.test.ts`](backend/tests/unit/ticketStateMachine.test.ts)
- **Unit:** service race handling — [`ticketService.test.ts`](backend/tests/unit/ticketService.test.ts)
- **Integration:** all valid/invalid transitions against real Postgres — [`tickets.integration.test.ts`](backend/tests/integration/tickets.integration.test.ts)

**Frontend (11 tests):**
- RTL: `StatusActions` buttons per status, `TicketForm` validation, `CommentForm` retain-on-failure, `ErrorAlert`
- Unit: frontend state machine utils

**How I ran tests:** Node 20 (`nvm use 20`), Docker for integration tests, `npm test` per package.

**Evidence:** [`testing.md`](testing.md)

---

## Q5. Describe your debugging approach. Give an example where AI was wrong and you corrected it.

**Approach:** Paste terminal output → AI diagnoses → apply smallest fix → document in `debugging.md` → re-run tests.

### Example 1 — Docker / P1000 (AI helped diagnose)

| | |
|---|---|
| **Symptom** | `P1000 Authentication failed` on Prisma migrate |
| **AI diagnosis** | Docker not running; local Postgres on 5432 conflict |
| **Fix** | Port 5433, `db:setup`, preflight script |
| **Evidence** | [`debugging.md`](debugging.md), [Iteration A](ai-prompt-history.md#iteration-a--database-port-conflict) |

### Example 2 — Shell comments breaking npm (AI mistake → human caught)

| | |
|---|---|
| **AI mistake** | Generated commands like `npm test # run tests` |
| **Symptom** | `tsc` tried to compile `#` as a filename |
| **Human correction** | Flagged error; README updated — one command per line |
| **Evidence** | [Iteration C](ai-prompt-history.md#iteration-c--shell-comment-paste), [`debugging.md`](debugging.md) |

### Example 3 — Bug screening found 5 issues AI missed at "done"

| | |
|---|---|
| **Trigger** | Ran `/context-aware-bug-hunter` at Step 4 |
| **AI missed** | TOCTOU race, CommentForm clearing early, refetch nulling ticket |
| **Fix** | All 5 fixed with regression tests after human approval |
| **Evidence** | [Prompt 13](ai-prompt-history.md#prompt-13--fix-all-5-issues-verbatim), [`debugging.md`](debugging.md) |

**Commit / file pointers for AI mistake fixes:**
- Main implementation: commit `bad0e89` (`Support Ticket Management System (Core)`)
- Post-review bug fixes: see current `backend/src/repositories/ticketRepository.ts`, `frontend/src/components/comments/CommentForm.tsx`, `frontend/src/hooks/useTicket.ts` (documented in [`debugging.md`](debugging.md); commit after re-submission)

---

## Q6. Point to specific repository locations the reviewer should check.

| Claim | Where to verify |
|-------|-----------------|
| Full prompt history | [`ai-prompt-history.md`](ai-prompt-history.md) |
| AI workflow (Part A) | [`tool-workflow.md`](tool-workflow.md) |
| Requirement analysis | [`requirement-analysis.md`](requirement-analysis.md) |
| Human APPROVED before backend code | [Prompt 6 → 7](ai-prompt-history.md#prompt-7--approved-verbatim) |
| Human APPROVED before frontend code | [Prompt 10 → 11](ai-prompt-history.md#prompt-11--approved-verbatim) |
| State machine rejected by API | `backend/tests/integration/tickets.integration.test.ts` — "rejects OPEN to RESOLVED with 422" |
| Search + filter works | `GET /api/tickets?search&status` + `frontend/src/pages/TicketListPage.tsx` |
| Cursor persistent context | [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) + [`.cursor/rules/`](.cursor/rules/) |
| Honest reflection / trade-offs | [`reflection.md`](reflection.md) |

---

## Q7. What would you improve if you had more time?

1. **Shared state machine package** — FE and BE duplicate rules today; extract to `packages/shared`
2. **Authentication** — Stretch item; would add JWT + protected routes
3. **E2E tests** — Playwright for full user flows
4. **Earlier bug screening** — run `/context-aware-bug-hunter` before marking step done
5. **Finer-grained commits** — most work is in `bad0e89`; would commit per step for clearer traceability

See also: [`reflection.md` § If I had more time](reflection.md#if-i-had-more-time-stretch)

---

## Q8. How do you provide context to the AI tool?

Every session I attach:
- `@Requirements` — source of truth
- `@tool-specific/cursor-workflow/` — spec, tasks, acceptance criteria
- `.cursor/rules/` — enforced standards (TS, API, DB, React, security)

Persistent docs updated before each step: `spec.md`, `tasks.md`, `project-context.md`, `design.md`.

**Evidence:** [`tool-workflow.md` §2](tool-workflow.md), [`cursor-rules-or-instructions.md`](tool-specific/cursor-workflow/cursor-rules-or-instructions.md)

---

## Q9. What information do you avoid sharing with AI?

- Real passwords, API keys, tokens
- Production database URLs
- `.env` file contents (only `.env.example` structure)

**Evidence:** [`tool-workflow.md` §10](tool-workflow.md)

---

## Q10. In your own words — do you understand and own this solution?

Yes. I can explain without reading notes:
- Why status has its own endpoint (state machine isolation)
- Why Postgres over MongoDB (relational model + search)
- What happens on invalid transition (422 from backend, error banner in UI)
- Where acting user id flows (header selector → API `createdById`)
- What I would not ship to production as-is (no auth, client-trusted user id)

The code is AI-assisted, not AI-owned. I reviewed every plan before **APPROVED**, ran tests, caught AI mistakes (shell comments, missed edge-case bugs), and documented trade-offs honestly.

**Evidence:** [`reflection.md`](reflection.md), [`ai-prompt-history.md` § Iteration log](ai-prompt-history.md#iteration-log-ai-mistakes--human-corrections)

---

## Cross-check map (reviewer quick reference)

```
Form claim                    → Repo proof
─────────────────────────────────────────────────────────
"I used spec-driven workflow" → spec.md + APPROVED in prompt history
"I tested state machine"      → tickets.integration.test.ts
"I debugged with AI"          → debugging.md + iteration log
"I chose PostgreSQL"          → requirement-analysis.md §7
"I understand trade-offs"     → reflection.md
"Prompt history exists"       → ai-prompt-history.md (455 lines)
```
