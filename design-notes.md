# Design Notes

## Architecture Overview (frontend, backend, database)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Frontend   │────▶│   Backend    │────▶│  PostgreSQL 16  │
│  React/Vite │     │  Express/TS  │     │  via Prisma     │
└─────────────┘     └──────────────┘     └─────────────────┘
```

Monorepo npm workspaces: `database`, `backend`, `frontend`.

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Database | `database/` | Schema, migrations, seeds, Docker |
| Backend | `backend/src/` | Routes → services → repositories |
| Frontend | `frontend/src/` | Pages, components, hooks, API client |

## Frontend Design

- React 19 + Vite + TypeScript
- 3 routes: list, create, detail
- `ActingUserSelect` for seeded-user identity (no auth)
- `StatusActions` mirrors backend state machine
- Fetch in hooks; thin presentational components
- See [`ui-flow.md`](ui-flow.md)

## Backend Design

- Express + Zod validation middleware
- Repository pattern — no Prisma in routes
- Separate `PATCH /tickets/:id/status` for state machine isolation
- Central `errorHandler` maps typed errors to HTTP codes
- See [`api-contract.md`](api-contract.md)

## Database Design

- PostgreSQL 16 in Docker (port 5433)
- Prisma ORM with versioned migrations
- Indexes on `status`, FKs, `created_at` for list/filter
- Keyword search via `ILIKE` on title + description
- See [`data-model.md`](data-model.md)

## Validation Strategy

- **Backend:** Zod schemas at API boundary (required fields, enums, lengths)
- **Frontend:** Client-side validation before submit; backend remains source of truth
- **State machine:** Pure function module; `assertTransition` throws `InvalidTransitionError` → 422

## Error Handling Strategy

| Error | HTTP | Shape |
|-------|------|-------|
| Zod validation | 400 | `{ errors: [...] }` |
| Not found | 404 | `{ error: { code, message } }` |
| Invalid transition | 422 | `INVALID_TRANSITION` |
| Unknown | 500 | Generic message — no stack trace |

## Testing Strategy Link

See [`test-strategy.md`](test-strategy.md) — 114 automated tests across all packages.

**Prior detailed design docs** (merged here): formerly `design.md` and `architecture.md`.
