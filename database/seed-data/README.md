# Seed Data

Sample users, tickets, and comments for local development and demos.

| File | Purpose |
|------|---------|
| [`seed.ts`](seed.ts) | Main seed runner (invoked by `npm run db:seed`) |
| [`seed-data.ts`](seed-data.ts) | Seed data definitions (tested by unit tests) |

Files are symlinks to `database/prisma/seed.ts` and `database/prisma/seed-data.ts` — single source of truth, exposed here per Requirements `database/seed-data` layout.

## Seed counts

- 4 users (AGENT, ADMIN, REQUESTER roles)
- 8 tickets (covers all status values)
- 7 comments

## Run seeds

```bash
cd database
npm run db:seed
# or full setup:
npm run db:setup
```
