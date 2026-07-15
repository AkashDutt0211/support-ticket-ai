# AI Prompt History — Support Ticket Management System

> **This is the full prompt log** required by [`Requirements`](../Requirements) (line 82: "Full prompt history").  
> It includes **verbatim user prompts**, AI outputs (summarized), **human corrections**, iteration chains, and traceability to code/docs.  
> **Reviewer quick path:** [`docs/SUBMISSION.md`](SUBMISSION.md) maps every requirement to a file.

**Tool:** Cursor (Agent mode, Plan mode, custom commands)  
**Pattern:** `@Requirements` + workflow docs → plan → human **APPROVED** → implement → append history

---

## How context was set (every session)

Each prompt attached persistent project context:

```
@Requirements                          ← source of truth
@tool-specifics/cursor-workflow/       ← spec, tasks, acceptance criteria
.cursor/rules/                         ← enforced coding standards
docs/design.md, docs/architecture.md   ← prior design decisions
```

**Guardrails used repeatedly:**
- "Plan only — human review before implement"
- "Reply APPROVED before code"
- "Caveman style" (short direct plans)
- "Preserve prompt history in .md files"
- "Follow .cursor skills and rules"

---

## Session 1 — Database stack + Step 1

**Date:** 2026-07-14

### Prompt 1 — Technical Lead planning (verbatim)

```
Role: Your role would be as a Technical Lead who is preparing the implementation plan 
for the given documentation.
Task: Go through the created folder structure that is already created and then do through 
the "Common Technical Requirements" which are provided in the document - @Requirements.
Step 1: Should be providing the steps for preparing the Database. Give me step by step 
plan of what will be created.
Guardrails: Follow the skills and rules mentioned in .Cursor folder and use caveman style.
Preserve the prompt history in the .md files which are already created.
```

**Context provided:** `@Requirements`, empty `database/`, `backend/`, `frontend/` folders, `.cursor/rules/`, feature-architect skill.

**AI output:** Reviewed folder structure. Mapped entities (User, Ticket, Comment). Proposed PostgreSQL + Prisma plan. Asked human to choose DB stack.

**Human action:** Asked follow-up before locking stack.

**Docs updated:** `docs/ai-prompt-history.md` (this file), `docs/design.md`, `docs/architecture.md`

---

### Prompt 2 — Stack decision (verbatim)

```
suggest if PostgreSQL or MongoDB which one will be better and why ?
```

**AI output:** Recommended PostgreSQL — relational FKs, status filter + ILIKE search, Prisma migrations fit exercise requirements. MongoDB would need more app-level integrity work.

**Human decision:** Accepted PostgreSQL recommendation.

**Traceability:** Decision recorded in [`docs/requirement-analysis.md`](requirement-analysis.md) §7.

---

### Prompt 3 — Lock stack + plan (verbatim)

```
Use Postgres + Prisma and start with planning
```

**AI output:** Full Step 1 plan — schema, migrations, Docker, seeds, env example. Plan mode document created. **No code yet.**

**Human action:** Reviewed plan → approved via next prompt.

---

### Prompt 4 — Implement Step 1 (verbatim)

```
Step 1: Database Preparation Plan (PostgreSQL + Prisma)
Implement the plan as specified, it is attached for your reference. 
Do NOT edit the plan file itself.
To-do's from the plan have already been created. Do not create them again. 
Mark them as in_progress as you work, starting with the first one. 
Don't stop until you have completed all the to-dos.
```

**AI output:** Implemented full `database/` package.

**Delivered:**
- `database/prisma/schema.prisma` — User, Ticket, Comment + enums
- `database/prisma/migrations/20250714100000_init/`
- `database/prisma/seed.ts` — 4 users, 8 tickets, 7 comments
- `database/docker-compose.yml` — PostgreSQL on port **5433**
- `database/scripts/setup.sh`, `preflight.sh`, `verify.sh`

**Validation:** `npm run db:setup`, `npm run db:verify`

---

## Session 2 — Backend API (Step 2)

**Date:** 2026-07-14

### Prompt 5 — Environment troubleshooting (verbatim)

User hit P1000 Prisma auth error. Pasted terminal output showing Docker not running and local Postgres on 5432 conflicting.

**AI diagnosis:** Docker down → Prisma hit wrong Postgres. Port 5432 conflict with local install.

**Iteration 1 — AI suggested:** Use port 5433, add `db:setup` and preflight checks.

**Human action:** Started Docker, ran `npm run db:setup` — resolved.

**Also hit:** Inline `# comments` in pasted shell commands broke `tsc`/`vitest`.

**Iteration 2 — AI fix:** README warnings — one command per line, no inline comments.

**Traceability:** [`docs/debugging.md`](debugging.md) § Resolved

---

### Prompt 6 — Backend plan (verbatim, paraphrased key parts)

```
Database is now up and running. Create plan for backend wiring referencing Requirements.
Wire backend to @prisma/client, repository layer, state machine service, API routes.
Guardrails: Do not directly create the plan. Review must be made by human — approve then execute.
Add prompt history and planned documents inside md files.
```

**Context provided:** `@Requirements`, `database/` schema, `.cursor/rules/api-design.mdc`, `api-validation.mdc`

**AI output — key design decisions (human reviewed before code):**

| Decision | Why |
|----------|-----|
| Node 20 + Express + TypeScript + Zod | Matches stack rules |
| Repository pattern | No Prisma in routes — `.cursor/rules` |
| Separate `PATCH /tickets/:id/status` | State machine isolated from field updates |
| `422 INVALID_TRANSITION` | Distinct error for state machine violations |
| `GET /api/users` read-only | Assignee picker — no user CRUD in Core |
| Vitest + Supertest integration tests | Mandatory state machine test tier |

**Docs updated before code:**
- `tool-specifics/cursor-workflow/spec.md` — API contract
- `tool-specifics/cursor-workflow/tasks.md` — Step 2 checklist
- `docs/design.md` — backend section
- `docs/architecture.md` — sequence diagrams

**Human gate:** Waiting for **APPROVED** — no backend code written.

---

### Prompt 7 — APPROVED (verbatim)

```
APPROVED
```

**AI output:** Full backend implemented.

**Delivered:** `backend/src/` — routes, services, repositories, validators, error handler. 21 tests.

**Validation:** `npm test`, cURL verification of all 8 endpoints.

---

### Prompt 8 — API verification (verbatim)

```
Provide cURL commands to verify all APIs.
```

**AI output:** Full cURL guide with variable setup, all endpoints, error cases.

**Human action:** Ran commands — confirmed APIs working.

---

### Prompt 9 — Test/build failures (verbatim, summarized)

User pasted Vitest errors:
- `ERR_REQUIRE_ESM` — vitest config CJS/ESM conflict
- `crypto.getRandomValues is not a function` — Node 16

**Iteration chain:**

| Attempt | Problem | Fix |
|---------|---------|-----|
| 1 | `vitest.config.ts` ESM error | Renamed to `vitest.config.mjs` |
| 2 | Node 16 missing Web Crypto | Added `.nvmrc` + `scripts/check-node.mjs` |
| 3 | User on Node 16 by default | Documented `nvm use 20` in all READMEs |

**Human correction:** AI initially didn't flag Node version requirement early enough — added explicit check script.

---

## Session 3 — Frontend (Step 3)

**Date:** 2026-07-14

### Prompt 10 — Frontend plan (verbatim, key parts)

```
APIs verified working. Plan Step 3 — React frontend wired to API.
Review Requirements for frontend needs.
Guardrails: plan only, human review before implement. Caveman style.
Document in md files. Keep prompt history.
```

**AI output — key design decisions:**

| Decision | Why |
|----------|-----|
| React 19 + Vite + TypeScript | Modern stack, fast dev |
| 3 routes: `/`, `/tickets/new`, `/tickets/:id` | Maps to Core features |
| ActingUserSelect (no auth) | Core allows seeded users only |
| StatusActions mirrors state machine | Show valid buttons only |
| Fetch in hooks, not components | `.cursor/rules/react-component-design.mdc` |
| RTL tests for StatusActions + TicketForm | Mandatory meaningful tests |

**Docs updated:** `spec.md`, `tasks.md`, `acceptance-criteria.md`, `project-context.md`

**Human gate:** Waiting for **APPROVED**.

---

### Prompt 11 — APPROVED (verbatim)

```
APPROVED
```

**AI output:** Full React frontend. 9 tests. Build OK.

**Delivered:** `frontend/src/` — pages, components, hooks, API client, state machine utils.

---

## Session 4 — Submission artifacts + screening

**Date:** 2026-07-14

### Prompt 12 — Step 4 artifacts (verbatim)

```
Work on next steps of adding details in tool-workflow.md, reflection, PR description 
(Step 4 submission artifacts). Also polish things if needed. 
See for any possible miss or any possible bug make use of /code-refactorer for screening 
the whole app and /context-aware-bug-hunter for screening through any possible bugs.
Guardrails: Dont change anything major. Provide refactoring solution for something which 
is extreme major. Require human approval before changing anything
```

**AI output:**
- Wrote `tool-workflow.md` (Part A — 11 sections)
- Wrote `docs/reflection.md`, `PR_DESCRIPTION.md`, `docs/debugging.md`
- Ran `/code-refactorer` + `/context-aware-bug-hunter` — documented 5 issues, no code changes without approval

**Human gate:** Issues documented for approval before fix.

---

## Session 5 — Bug fixes (post-screening)

**Date:** 2026-07-14

### Prompt 13 — Fix all 5 issues (verbatim)

```
Solve all the 5 issues reported and also first show which fix needs to be applied 
and why is it needed.
```

**AI output:** Explained each fix, then implemented:

| # | Issue | Fix |
|---|-------|-----|
| 1 | Status TOCTOU race | Atomic `updateMany WHERE status = expected` |
| 2 | CommentForm clears before API success | `await onSubmit()` before clear |
| 3 | Refetch nulls ticket on error | Preserve existing data on fetch failure |
| 4 | Stale fetch races | AbortController + debounce + request-id guard |
| 5 | Prisma P2025 → 500 | Map to 404 in errorHandler |

**Tests added:** `CommentForm.test.tsx`, `ticketService.test.ts`, integration tests for 404 + atomic update.

---

## Iteration log — AI mistakes & human corrections

This section shows **iteration beyond first output** — a key reviewer criterion.

### Iteration A — Database port conflict

| Step | What happened |
|------|---------------|
| AI first output | Standard Docker Postgres on 5432 |
| Problem | User had local Postgres on 5432 — P1000 auth errors |
| Human input | Pasted Prisma error output |
| AI correction | Moved to port 5433, added `db:preflight` and `db:setup` |
| Evidence | `database/docker-compose.yml`, `docs/debugging.md` |

### Iteration B — APPROVED gate (Steps 2 & 3)

| Step | What happened |
|------|---------------|
| AI tendency | Start coding immediately after plan |
| Human guardrail | "Review must be made by human — approve then execute" |
| Human action | Said "APPROVED" only after reviewing spec.md + tasks.md |
| Result | No code drift; spec matches implementation |

### Iteration C — Shell comment paste

| Step | What happened |
|------|---------------|
| AI output | cURL/npm commands with `# comment` suffix |
| Problem | Shell passed `#`, `TypeScript` as args to tsc |
| Human input | Pasted broken terminal output |
| AI correction | README warnings; commands without inline comments |

### Iteration D — Node version

| Step | What happened |
|------|---------------|
| AI first output | Vitest config without Node version check |
| Problem | Node 16 — `crypto.getRandomValues` missing |
| AI correction | `.nvmrc`, `check-node.mjs` preflight on all test scripts |

### Iteration E — Bug screening → fixes

| Step | What happened |
|------|---------------|
| AI first output | App marked "complete" at Step 4 |
| Human action | Ran `/context-aware-bug-hunter` command |
| AI finding | 5 issues (TOCTOU, CommentForm, refetch, stale fetch, P2025) |
| Human action | "Solve all 5 issues" |
| AI fix | Minimal safe patches + regression tests |

### Iteration F — AI design decisions challenged by human

| AI suggestion | Human decision |
|---------------|----------------|
| MongoDB viable | Rejected — chose PostgreSQL after comparison prompt |
| Auth in Core | Skipped — Requirements say optional |
| Single PATCH for all ticket updates | Rejected — separate status endpoint for state machine |
| Redux for state | Rejected — Context + hooks sufficient for Core |

---

## AI-assisted design decisions (traceability)

| Decision | Prompt # | Spec location | Code location |
|----------|----------|---------------|---------------|
| PostgreSQL + Prisma | 2, 3 | `requirement-analysis.md` §7 | `database/prisma/schema.prisma` |
| Port 5433 | 5 | `debugging.md` | `database/docker-compose.yml` |
| Separate status endpoint | 6 | `spec.md` | `backend/src/routes/tickets.ts` |
| 422 for invalid transition | 6 | `spec.md` | `backend/src/errors/InvalidTransitionError.ts` |
| Acting user selector | 10 | `spec.md` | `frontend/src/components/layout/ActingUserSelect.tsx` |
| StatusActions mirror SM | 10 | `spec.md` | `frontend/src/components/tickets/StatusActions.tsx` |
| Atomic status update | 13 | `debugging.md` | `backend/src/repositories/ticketRepository.ts` |

---

## Prompt templates reused (reusable workflow)

### Template 1 — Plan before build

```
Review @Requirements and @tool-specifics/cursor-workflow/spec.md.
Create plan for [STEP]. Do NOT write code.
Update spec.md, tasks.md, acceptance-criteria.md, design.md.
Caveman style. Append to docs/ai-prompt-history.md.
Wait for APPROVED.
```

### Template 2 — Implement after approval

```
APPROVED
Implement per tasks.md section [X]. Run tests. Update prompt history.
```

### Template 3 — Debug with evidence

```
[Paste terminal error output]
Diagnose root cause. Smallest safe fix. Document in docs/debugging.md.
```

### Template 4 — Code review command

```
Screen with /code-refactorer and /context-aware-bug-hunter.
Document findings. No major changes without approval.
```

These templates are reusable in real projects — see [`tool-workflow.md`](../tool-workflow.md) §11.

---

## Session index

| Session | Focus | Prompts | Code changed |
|---------|-------|---------|--------------|
| 1 | Database | 1–4 | `database/` |
| 2 | Backend | 5–9 | `backend/` |
| 3 | Frontend | 10–11 | `frontend/` |
| 4 | Artifacts + screening | 12 | `docs/`, `tool-workflow.md` |
| 5 | Bug fixes | 13 | BE + FE patches |

**Total documented prompts:** 13  
**Human approval gates:** 3 (Step 1 plan implicit, Step 2 explicit, Step 3 explicit)

---

## Session 6 — Re-review prep (prompt history visibility)

**Date:** 2026-07-15

### Prompt 14 — Review feedback: missing prompt history (verbatim)

```
The review of this app is done and it's stated that the prompt history isn't provided 
and "AI Workflow and Prompting — 8/25 Insufficient evidence; no prompt history provided."
Review: Prompt history missing — No prompt log, context docs, or tool-workflow.md found 
in repository; cannot verify AI usage.
Go through @Requirements docs and see where fixes or prompting has to be added so that 
this can be reviewed again.
```

**Root cause analysis:**
- Files existed in repo but were not discoverable enough for reviewer
- `docs/requirement-analysis.md` was **empty** (explicit Requirements gap)
- `docs/ai-prompt-history.md` was summary-level, not "full" with verbatim prompts + iterations
- README did not surface lifecycle artifacts prominently

**Fixes applied:**
- Created [`docs/SUBMISSION.md`](SUBMISSION.md) — reviewer checklist mapping every Requirements item to a file
- Filled [`docs/requirement-analysis.md`](requirement-analysis.md) — full breakdown
- Expanded [`docs/ai-prompt-history.md`](ai-prompt-history.md) — verbatim prompts, iteration log, traceability table, reusable templates
- Updated README with **"For reviewers"** section at top
- Updated `cursor-rules-or-instructions.md` with prompt iteration examples
- Fixed broken `reflcetion.md` link → `reflection.md`

**Action required:** Commit and push these changes so reviewers see them on remote.

---

## Session 7 — Form answers in repository

**Date:** 2026-07-15

### Prompt 15 — Missing submission form answers (verbatim)

```
There is one other review to the app which is:
No form answers visible: Submission form responses not included in repository; 
cannot cross-check claims against code. Find possible fixes.
```

**Root cause:** Part C answers were submitted only via external online form — not mirrored in repo. Reviewer could not cross-check narrative claims against code.

**Fix:** Created [`docs/SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) — 10 questions with specific file/commit pointers. Linked from README and SUBMISSION.md.
