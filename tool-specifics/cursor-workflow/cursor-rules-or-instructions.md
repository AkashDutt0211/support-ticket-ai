# Cursor Rules & Instructions — Support Ticket Management System

## Persistent context

- **Requirements:** [`Requirements`](../../Requirements) — source of truth
- **Spec:** [`spec.md`](spec.md) — contracts per step
- **Tasks:** [`tasks.md`](tasks.md) — checklist
- **Acceptance:** [`acceptance-criteria.md`](acceptance-criteria.md) — done definition
- **Project context:** [`project-context.md`](project-context.md) — current state

## Workflow rules

1. **Spec before code** — update docs, get human approval, then implement
2. **Append prompt history** — every session → `docs/ai-prompt-history.md`
3. **Follow `.cursor/rules/`** — all applicable rules per layer
4. **Caveman style** in plans — short, direct sentences

### Backend rules (Step 2 — done)

- Repository pattern — no Prisma in routes
- State machine in service — not in DB
- Zod at boundary

### Frontend rules (Step 3 — planned)

- Fetch in hooks/api — not in presentational components
- State machine in pure utils — mirror backend
- Controlled forms — React state owns inputs
- Show only valid status buttons
- Meaningful error UI for 400/404/422/500
- RTL tests for StatusActions + forms
- Follow `react-component-design.mdc`, `ts-standards.mdc`

## Stacks

| Step | Stack | Status |
|------|-------|--------|
| 1 DB | PostgreSQL + Prisma | Done |
| 2 API | Node 20 + Express + TS + Zod | Done |
| 3 UI | React 19 + Vite + TS + RTL | **Done** |

## Run locally (after Step 3)

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

## Step 3 approval

Plan in docs. **No code until APPROVED.**

## Out of scope (Core)

- Authentication / JWT
- User CRUD UI
- Pagination, priority filter, E2E
- Swagger (Stretch)
