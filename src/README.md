# Source Code Layout

Root `src/` satisfies the Requirements repository structure. Package source lives in `backend/src/`, `frontend/src/`, and `database/src/`; **symlinks** at `src/<package>/` point to those directories so reviewers can browse all application code from one place.

| Symlink | Canonical path | Description |
|---------|----------------|-------------|
| [`src/backend/`](backend/) | `backend/src/` | Express API — routes, services, repositories |
| [`src/frontend/`](frontend/) | `frontend/src/` | React SPA — pages, components, hooks |
| [`src/database/`](database/) | `database/src/` | Prisma client re-exports |

## Backend (`src/backend/`)

```
routes/       # HTTP handlers
services/     # Business logic + state machine
repositories/ # Prisma queries
validators/   # Zod schemas
middleware/   # Validation + error handling
errors/       # Typed error classes
```

## Frontend (`src/frontend/`)

```
pages/        # Route-level views
components/   # UI components
hooks/        # Data fetching
api/          # HTTP client
utils/        # State machine mirror
```

**Note:** npm workspaces still run from `backend/`, `frontend/`, and `database/` package roots. Symlinks are for structure and navigation only.
