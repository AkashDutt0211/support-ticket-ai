# Prompt History — Design

**Tool:** Cursor | **Activity:** Architecture, API contract, data model, UI flow

---

## Design decisions from planning prompts

| Decision | Prompt | Spec | Code |
|----------|--------|------|------|
| PostgreSQL + Prisma | 2, 3 | `data-model.md` | `database/prisma/schema.prisma` |
| Port 5433 | 5 | `debugging-notes.md` | `database/docker-compose.yml` |
| Separate status endpoint | 6 | `api-contract.md` | `backend/src/routes/tickets.ts` |
| 422 INVALID_TRANSITION | 6 | `api-contract.md` | `InvalidTransitionError.ts` |
| Acting user selector | 10 | `ui-flow.md` | `ActingUserSelect.tsx` |
| StatusActions mirror SM | 10 | `ui-flow.md` | `StatusActions.tsx` |

---

## Iteration F — AI suggestions challenged

| AI suggestion | Human decision |
|---------------|----------------|
| MongoDB viable | Rejected — PostgreSQL |
| Auth in Core | Skipped — optional per Requirements |
| Single PATCH for all updates | Rejected — separate status endpoint |
| Redux for state | Rejected — Context + hooks |

---

## Docs produced by design prompts

- [`design-notes.md`](../design-notes.md)
- [`data-model.md`](../data-model.md)
- [`api-contract.md`](../api-contract.md)
- [`ui-flow.md`](../ui-flow.md)
- [`tool-specific/cursor-workflow/spec.md`](../tool-specific/cursor-workflow/spec.md)

**Full archive:** [`_full-archive.md`](_full-archive.md)
