# Cursor Rules & Instructions — Support Ticket Management System

## Persistent context

- **Requirements:** [`Requirements`](../../Requirements) — source of truth
- **Spec:** [`spec.md`](spec.md) — contracts per step
- **Tasks:** [`tasks.md`](tasks.md) — checklist
- **Acceptance:** [`acceptance-criteria.md`](acceptance-criteria.md) — done definition
- **Project context:** [`project-context.md`](project-context.md) — current state
- **Prompt history:** [`docs/ai-prompt-history.md`](../../docs/ai-prompt-history.md) — full log
- **Submission index:** [`docs/SUBMISSION.md`](../../docs/SUBMISSION.md) — reviewer map

## Workflow rules

1. **Spec before code** — update docs, get human approval, then implement
2. **Append prompt history** — every session → `docs/ai-prompt-history.md` with verbatim prompts
3. **Follow `.cursor/rules/`** — all applicable rules per layer
4. **Caveman style** in plans — short, direct sentences
5. **Document iterations** — when AI is wrong, record correction in prompt history § Iteration log

## Prompt iteration examples (evidence for reviewers)

### Example 1 — Stack decision

```
User:  suggest if PostgreSQL or MongoDB which one will be better and why?
AI:    Recommended PostgreSQL (relational FKs, search, migrations)
User:  Use Postgres + Prisma and start with planning
```

### Example 2 — Human approval gate

```
User:  Create backend plan. Do NOT write code. Wait for approval.
AI:    Updated spec.md, tasks.md, design.md — plan only
User:  APPROVED
AI:    Implemented backend/
```

### Example 3 — Debugging iteration

```
User:  [pastes P1000 Prisma error]
AI:    Docker not running; port 5432 conflict
AI:    Fixed: port 5433, db:setup, preflight script
User:  [confirms Docker up, db:setup works]
```

### Example 4 — AI mistake correction

```
AI:    Generated npm commands with # inline comments
User:  [pastes tsc error trying to compile "#" as file]
AI:    README warning: one command per line, no shell comments
```

Full log: [`docs/ai-prompt-history.md`](../../docs/ai-prompt-history.md)

## Layer rules

### Backend (Step 2 — done)

- Repository pattern — no Prisma in routes
- State machine in service — not in DB
- Zod at boundary
- Atomic status update — `updateMany WHERE status = expected`

### Frontend (Step 3 — done)

- Fetch in hooks/api — not in presentational components
- State machine in pure utils — mirror backend
- Controlled forms — React state owns inputs
- Show only valid status buttons
- Meaningful error UI for 400/404/422/500
- AbortController + debounced search in hooks
- RTL tests for StatusActions + forms

## Stacks

| Step | Stack | Status |
|------|-------|--------|
| 1 DB | PostgreSQL + Prisma | Done |
| 2 API | Node 20 + Express + TS + Zod | Done |
| 3 UI | React 19 + Vite + TS + RTL | Done |
| 4 Artifacts | docs + tool-workflow.md | Done |

## Run locally

```bash
# Terminal 1 — database (if not running)
cd database && nvm use 20 && npm run db:up

# Terminal 2 — backend
cd backend && nvm use 20 && npm run dev

# Terminal 3 — frontend
cd frontend && nvm use 20 && npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/api`

## Out of scope (Core)

- Authentication / JWT
- User CRUD UI
- Pagination, priority filter, E2E
- Swagger (Stretch)
