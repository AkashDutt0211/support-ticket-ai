# Spec — Support Ticket Management System

## Database contract (Step 1) — complete

### Stack

- **Engine:** PostgreSQL 16
- **ORM:** Prisma
- **Local runtime:** Docker Compose (port 5433)
- **Package location:** `database/`

### Entities

**User** (seeded only)
- `id`, `name`, `email`, `role`

**Ticket**
- `id`, `title`, `description`, `priority`, `status`
- `assignedTo`, `createdBy`, `createdAt`, `updatedAt`

**Comment**
- `id`, `ticketId`, `message`, `createdBy`, `createdAt`

---

## Backend API contract (Step 2) — complete

### Stack

- **Runtime:** Node.js 20+
- **Framework:** Express + TypeScript
- **Validation:** Zod middleware
- **ORM access:** Prisma via `database/` package
- **Package location:** `backend/`

### Prisma wiring

- npm workspace: root `package.json` workspaces `["database", "backend"]`
- `backend` depends on `database` via `"database": "file:../database"`
- Single `PrismaClient` in `backend/src/lib/prisma.ts`
- `DATABASE_URL` in `backend/.env` (same value as `database/.env`)
- Startup validates required env vars

### API base path

`/api`

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Liveness + DB ping |
| GET | `/users` | List seeded users (assignee dropdown) |
| GET | `/tickets` | List tickets; query: `status`, `search` |
| GET | `/tickets/:id` | Ticket detail + comments |
| POST | `/tickets` | Create ticket |
| PATCH | `/tickets/:id` | Update fields (not status) |
| PATCH | `/tickets/:id/status` | State machine transition |
| POST | `/tickets/:id/comments` | Add comment |

### Request/response shape

**Success:**
```json
{ "data": { } }
```

**Validation error (400):**
```json
{ "errors": [{ "code": "REQUIRED", "message": "Title is required", "field": "title" }] }
```

**Business rule error (422):**
```json
{ "error": { "code": "INVALID_TRANSITION", "message": "Cannot transition from CLOSED to IN_PROGRESS" } }
```

**Not found (404):**
```json
{ "error": { "code": "NOT_FOUND", "message": "Ticket not found" } }
```

### Create ticket body

```json
{
  "title": "string (1-200)",
  "description": "string (min 1)",
  "priority": "LOW | MEDIUM | HIGH | CRITICAL",
  "createdById": "uuid",
  "assignedToId": "uuid | null"
}
```

### Update ticket body (PATCH — no status)

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "priority": "enum (optional)",
  "assignedToId": "uuid | null (optional)"
}
```

### Status transition body

```json
{ "status": "IN_PROGRESS" }
```

### Add comment body

```json
{
  "message": "string (min 1)",
  "createdById": "uuid"
}
```

### State machine rules

```
OPEN         -> IN_PROGRESS
IN_PROGRESS  -> RESOLVED
RESOLVED     -> CLOSED
OPEN         -> CANCELLED
IN_PROGRESS  -> CANCELLED
```

- `CLOSED` and `CANCELLED` are terminal — no outbound transitions
- Invalid transition → `422 INVALID_TRANSITION`
- Status change only via `PATCH /tickets/:id/status` — not via general PATCH

### Search & filter

- `GET /tickets?status=OPEN` — exact status match
- `GET /tickets?search=login` — case-insensitive ILIKE on title + description
- Both params combinable

### Out of scope (Step 2)

- Auth middleware
- User create/update/delete
- Pagination, sort (Stretch)
- OpenAPI/Swagger (Stretch)

### Approval

Implemented 2026-07-14. 21 tests passing.

---

## Frontend contract (Step 3) — planned

### Stack

- **Framework:** React 18 + Vite + TypeScript
- **Router:** react-router-dom v6
- **Tests:** Vitest + React Testing Library
- **Package location:** `frontend/`

### Environment

```
VITE_API_URL=http://localhost:3001/api
```

### Routes

| Path | Component |
|------|-----------|
| `/` | TicketListPage |
| `/tickets/new` | CreateTicketPage |
| `/tickets/:id` | TicketDetailPage |

### API calls (maps to backend)

| UI action | API call |
|-----------|----------|
| Load users | `GET /users` |
| Load tickets | `GET /tickets?status=&search=` |
| Load detail | `GET /tickets/:id` |
| Create | `POST /tickets` |
| Update fields | `PATCH /tickets/:id` |
| Change status | `PATCH /tickets/:id/status` |
| Add comment | `POST /tickets/:id/comments` |

### Acting user (no auth)

Header dropdown. Seeded users only.  
Stored in `localStorage`. Used as `createdById` on create + comment.

### Status UI rules

- Show button only for valid next status
- Label map: `IN_PROGRESS` → "In Progress", etc.
- On 422: show server error in banner
- Terminal states: hide status buttons

### Error display contract

| Code | UI |
|------|-----|
| 400 | Field errors under inputs |
| 404 | Not found message + back link |
| 422 | `ErrorAlert` banner |
| 500 / network | Generic error banner |

### Test contract (Core)

- `StatusActions` — correct buttons per status
- `TicketForm` — client validation blocks bad submit
- `ErrorAlert` — renders API error message

### Out of scope (Core)

- Auth, user CRUD, pagination, priority filter, E2E

### Approval

Implemented 2026-07-14. 9 frontend tests passing.
