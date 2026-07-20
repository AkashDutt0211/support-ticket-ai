# Database Setup Notes

**Engine:** PostgreSQL 16 via Docker  
**Port:** 5433 (avoids conflict with local Postgres on 5432)  
**ORM:** Prisma

## Prerequisites

- Node.js 20 (`nvm use 20`)
- Docker Desktop running

## Quick setup

```bash
cd database
nvm use 20
cp .env.example .env
npm install
npm run db:setup
```

`db:setup` starts container, runs migrations, seeds data.

## Environment

```
DATABASE_URL="postgresql://ticket_user:changeme@localhost:5433/support_tickets?schema=public"
```

## Verify

```bash
npm run db:verify
npm run db:studio   # optional GUI
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| P1000 auth error | Start Docker; confirm port 5433 |
| Port 5432 conflict | Use Docker on 5433 (default in this project) |
| Node crypto error | `nvm use 20` |

Full reference: [`database/README.md`](README.md)
