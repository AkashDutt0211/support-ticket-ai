# API Contract

Base path: `/api` | Backend: `http://localhost:3001`

## Requirements ↔ wire format

The Requirements entity model uses relation names (`assignedTo`, `createdBy`). The API maps them as follows — **no semantic deviation**:

| Requirements field | Request body (write) | Response (read) |
|--------------------|----------------------|-----------------|
| `assignedTo` | `assignedToId` (UUID or null) | `assignedTo` object `{ id, name, email, role }` + `assignedToId` |
| `createdBy` | `createdById` (UUID) | `createdBy` object `{ id, name, email, role }` + `createdById` |
| `status` | `status` on `PATCH /tickets/:id/status` only | `status` enum string |

Status values use enum constants (`OPEN`, `IN_PROGRESS`, …) in JSON; the UI displays Requirements labels ("Open", "In Progress", …) via `STATUS_LABELS` in `frontend/src/utils/ticketStateMachine.ts`.

---

## Endpoint: Health check

**Method:** GET  
**Path:** `/health`  
**Purpose:** Liveness + database connectivity

### Response

```json
{ "status": "ok", "database": "connected" }
```

---

## Endpoint: List users

**Method:** GET  
**Path:** `/users`  
**Purpose:** Seeded users for assignee / acting-user picker

### Response

```json
{ "data": [{ "id": "uuid", "name": "string", "email": "string", "role": "AGENT" }] }
```

---

## Endpoint: List tickets

**Method:** GET  
**Path:** `/tickets`  
**Purpose:** List with optional search and status filter

### Request (query)

| Param | Type | Purpose |
|-------|------|---------|
| `status` | enum | Exact status match |
| `search` | string | ILIKE on title + description |

### Response

```json
{ "data": [{ "id": "uuid", "title": "string", "status": "OPEN", "...": "..." }] }
```

### Validation Rules

- `status` must be valid `TicketStatus` enum if provided

### Error Responses

- 400 — invalid query params

---

## Endpoint: Get ticket

**Method:** GET  
**Path:** `/tickets/:id`  
**Purpose:** Ticket detail with comments

### Response

```json
{ "data": { "id": "uuid", "comments": [{ "id": "uuid", "message": "string" }] } }
```

### Error Responses

- 404 — ticket not found

---

## Endpoint: Create ticket

**Method:** POST  
**Path:** `/tickets`

### Request

```json
{
  "title": "string (1-200)",
  "description": "string (min 1)",
  "priority": "LOW | MEDIUM | HIGH | CRITICAL",
  "createdById": "uuid",
  "assignedToId": "uuid | null"
}
```

### Validation Rules

- `title`, `description`, `priority`, `createdById` required
- `assignedToId` optional; must reference existing user if set
- `createdById` must reference existing user

### Error Responses

- 400 — validation errors array
- 404 — user not found

---

## Endpoint: Update ticket fields

**Method:** PATCH  
**Path:** `/tickets/:id`  
**Purpose:** Update title, description, priority, assignee — **not status**

### Request

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "priority": "enum (optional)",
  "assignedToId": "uuid | null (optional)"
}
```

### Error Responses

- 400, 404

---

## Endpoint: Change ticket status

**Method:** PATCH  
**Path:** `/tickets/:id/status`  
**Purpose:** State machine transition only

### Request

```json
{ "status": "IN_PROGRESS" }
```

### Validation Rules

- Transition must be valid per state machine (see [`data-model.md`](data-model.md))

### Error Responses

- 404 — ticket not found
- 422 — `{ "error": { "code": "INVALID_TRANSITION", "message": "..." } }`

---

## Endpoint: Add comment

**Method:** POST  
**Path:** `/tickets/:id/comments`

### Request

```json
{
  "message": "string (min 1)",
  "createdById": "uuid"
}
```

### Error Responses

- 400, 404

---

**Implementation:** [`backend/src/routes/tickets.ts`](backend/src/routes/tickets.ts)  
**Detailed spec:** [`tool-specific/cursor-workflow/spec.md`](tool-specific/cursor-workflow/spec.md)
