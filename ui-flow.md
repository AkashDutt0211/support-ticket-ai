# UI Flow

## Acting user (no auth — Core)

1. User selects acting identity from header dropdown (seeded users)
2. Selection stored in `localStorage`
3. Used as `createdById` on ticket create and comment submit

## Primary flows

### List tickets

```
/ → TicketListPage
  → load tickets (GET /tickets?status&search)
  → TicketFilters: keyword search + status dropdown
  → click row → /tickets/:id
  → "New ticket" → /tickets/new
```

### Create ticket

```
/tickets/new → CreateTicketPage
  → TicketForm: title, description, priority, assignee
  → client validation → POST /tickets
  → success → redirect to /tickets/:id
  → 400 → field errors
```

### Ticket detail

```
/tickets/:id → TicketDetailPage
  → load ticket + comments (GET /tickets/:id)
  → edit fields → PATCH /tickets/:id
  → StatusActions: only valid next statuses shown
    → PATCH /tickets/:id/status
    → 422 → ErrorAlert banner
  → CommentForm → POST /tickets/:id/comments
```

## Routes

| Path | Page | Purpose |
|------|------|---------|
| `/` | TicketListPage | List + search + filter |
| `/tickets/new` | CreateTicketPage | Create form |
| `/tickets/:id` | TicketDetailPage | View/edit, status, comments |

## Status UI rules

| Current status | Buttons shown |
|----------------|---------------|
| OPEN | In Progress, Cancelled |
| IN_PROGRESS | Resolved, Cancelled |
| RESOLVED | Closed |
| CLOSED / CANCELLED | None (terminal) |

## Error display

| HTTP | UI behavior |
|------|-------------|
| 400 | Field errors under inputs |
| 404 | Not found message + back link |
| 422 | Error banner (invalid transition) |
| 500 / network | Generic error banner |

**Implementation:** [`frontend/src/pages/`](frontend/src/pages/), [`frontend/src/components/`](frontend/src/components/)
