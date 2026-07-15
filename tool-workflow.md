# AI Workflow — Support Ticket Management System

**Part A submission** | Tool: **Cursor** | Project: Support Ticket Management System

---

## 1. Primary AI tool used

**Cursor** (Agent mode + Plan mode + custom commands/skills)

Why Cursor for this exercise:
- Persistent project context via `.cursor/rules/` and `tool-specifics/cursor-workflow/`
- Spec-driven flow: plan → human **APPROVED** → implement
- Full prompt history in `docs/ai-prompt-history.md`
- Integrated terminal for Docker, tests, API verification

---

## 2. How I provide project context

| Artifact | Purpose |
|----------|---------|
| [`docs/SUBMISSION.md`](docs/SUBMISSION.md) | **Reviewer index** — maps Requirements → repo files |
| [`Requirements`](Requirements) | Source of truth — always `@` referenced |
| [`tool-specifics/cursor-workflow/project-context.md`](tool-specifics/cursor-workflow/project-context.md) | Current stack + state snapshot |
| [`tool-specifics/cursor-workflow/spec.md`](tool-specifics/cursor-workflow/spec.md) | API/UI contracts per step |
| [`tool-specifics/cursor-workflow/tasks.md`](tool-specifics/cursor-workflow/tasks.md) | Checklist — what's done / next |
| [`.cursor/rules/`](.cursor/rules/) | Enforced standards (TS, API, DB, React, security) |
| [`.cursor/skills/feature-architect/`](.cursor/skills/feature-architect/) | Plan before build |
| [`docs/design.md`](docs/design.md) + [`docs/architecture.md`](docs/architecture.md) | Technical design |

**Pattern:** Each step started with `@Requirements` + folder context. No vague "build an app" prompts.

---

## 3. Requirement analysis

**How AI was used:**
- Read `Requirements` Common Technical Requirements + Support Ticket entities
- Mapped Core vs Stretch (auth optional, state machine mandatory)
- Compared PostgreSQL vs MongoDB — chose Postgres for relational model
- Broke work into Step 1 (DB) → Step 2 (API) → Step 3 (UI) → Step 4 (artifacts)

**Output:** [`docs/requirement-analysis.md`](docs/requirement-analysis.md) — full requirement breakdown before coding.

**Human judgment:** Locked stack after AI recommendation. Approved each step before code.

---

## 4. Planning and design

**Workflow:**
1. AI drafts plan in markdown (caveman style — short, direct)
2. Updates `spec.md`, `tasks.md`, `acceptance-criteria.md`, `design.md`
3. Human reviews → replies **APPROVED**
4. Only then implementation starts

**Examples:**
- Step 1: Postgres + Prisma, Docker port 5433
- Step 2: Repository layer, separate status endpoint, Zod validation
- Step 3: 3 routes, ActingUserSelect, StatusActions mirrors state machine

**Plan mode** used for Step 1 DB plan. Steps 2–3 used doc-based plans per Cursor workflow expectations.

---

## 5. Code generation

**How:**
- Incremental by layer: schema → repos → services → routes → UI components
- AI generated code; human verified via tests + cURL + browser
- Followed existing `.cursor/rules/` — no `any`, repository pattern, Zod at boundary

**Iteration examples:**
- Docker not running → added `db:setup`, preflight, port 5433
- Vitest ESM errors → `vitest.config.mjs` + Node 20 check
- Inline shell comments breaking npm → README warnings

**Not copy-paste blind:** State machine rules understood and tested on both BE and FE.

---

## 6. How I validate AI-generated code

| Method | When |
|--------|------|
| `npm test` | After backend + frontend changes |
| `npm run build` | TypeScript compile check |
| `npm run db:verify` / `db:setup` | Database layer |
| cURL scripts | All 8 API endpoints |
| Manual UI walkthrough | Create, search, filter, status, comments |
| Code review commands | `/code-refactorer`, `/context-aware-bug-hunter` for Step 4 |

**Rule:** AI output is a draft until tests pass and human spot-checks critical paths (state machine).

---

## 7. Testing

**Backend (21 tests):**
- Unit: state machine transitions
- Integration: API + real Postgres — valid/invalid transitions, search/filter

**Frontend (9 tests):**
- RTL: StatusActions buttons per status
- RTL: TicketForm validation
- RTL: ErrorAlert render/dismiss
- Unit: state machine utils

**Docs:** [`docs/testing.md`](docs/testing.md)

**AI role:** Test structure suggested by AI; assertions reviewed for real behavior not implementation details.

---

## 8. Debugging

**Issues hit and fixed with AI:**

| Issue | Root cause | Fix |
|-------|------------|-----|
| P1000 auth error | Docker down, local Postgres on 5432 | Port 5433, `db:setup`, preflight |
| Vitest ERR_REQUIRE_ESM | CJS/ESM config conflict | `vitest.config.mjs` |
| `crypto.getRandomValues` | Node 16 default | `.nvmrc` + Node 20 check |
| npm `# comment` paste | Shell passed args to tsc/vitest | README: one command per line |

**Open issues:** All five screening items fixed — see [`docs/debugging.md`](docs/debugging.md).

**AI role:** Paste terminal output → AI diagnoses → human applies fix → re-run.

---

## 9. Code review

**Methods:**
- `.cursor/rules/` act as automatic review guardrails
- `/code-refactorer` — minor polish suggestions
- `/context-aware-bug-hunter` — production bug screening
- Human review at each **APPROVED** gate

**Findings summary:** Five issues found in screening — all fixed with regression tests. See [`docs/debugging.md`](docs/debugging.md).

---

## 10. What I avoid sharing with AI

- Real passwords, API keys, tokens
- Production database URLs
- Company-internal secrets or PII
- `.env` file contents (only structure via `.env.example`)

**Safe to share:** Requirements doc, schema design, error messages, test output, folder structure.

---

## 11. Reuse in a real project

This workflow scales to production teams:

1. **Persistent context** — `project-context.md` + rules in repo, not chat-only
2. **Spec → approve → build** — prevents vibe-coding drift
3. **Prompt history** — audit trail for decisions (`docs/ai-prompt-history.md`)
4. **Layered delivery** — DB → API → UI with tests at each step
5. **Human gates** — AI proposes, human approves architecture and security
6. **Validate everything** — tests + manual checks before merge
7. **Document debugging** — future you (and reviewers) learn from incidents

**Would add in production:** CI pipeline, auth, shared packages for duplicated logic, structured logging.

---

## Traceability

| Requirement | Evidence |
|-------------|----------|
| Frontend + Backend + DB | `frontend/`, `backend/`, `database/` |
| Migrations + seeds | `database/prisma/migrations/`, `seed.ts` |
| Validation + errors | Zod backend, forms + ErrorAlert frontend |
| Search/filter | `GET /tickets?search&status`, TicketFilters UI |
| State machine tests | `backend/tests/integration/tickets.integration.test.ts` |
| Prompt history | [`docs/ai-prompt-history.md`](docs/ai-prompt-history.md) — verbatim prompts + iterations |
| Submission index | [`docs/SUBMISSION.md`](docs/SUBMISSION.md) — reviewer checklist |
| Requirement analysis | [`docs/requirement-analysis.md`](docs/requirement-analysis.md) |
| Cursor workflow artifacts | `tool-specifics/cursor-workflow/` |
