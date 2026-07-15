# Database — Support Ticket Management System

PostgreSQL 16 + Prisma. Local dev via Docker.

## Prerequisites

- Node.js **18.18+**
- Docker Desktop (or Docker Engine + Compose)

```bash
nvm use 20
```

## Setup

**Important:** Run each command separately. Do NOT paste inline comments (text after `#`).

You are already in the `database/` folder. Do not run `cd database` again.

1. Open **Docker Desktop** and wait until it is fully running.

2. Run these one at a time:

```bash
nvm use 20
cp .env.example .env
npm install
npm run db:setup
```

`db:setup` does everything: start container, migrate, seed.

### Or step by step

```bash
nvm use 20
cp .env.example .env
npm install
npm run db:up
npm run db:migrate
npm run db:seed
```

Uses port **5433** (avoids conflict with local Postgres on 5432).

**Peek data (optional):**
```bash
npm run db:studio
```

**Stop Postgres:**
```bash
npm run db:down
```

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run db:up` | Start Postgres container |
| `npm run db:setup` | Full setup: up + migrate + seed |
| `npm run db:down` | Stop Postgres container |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Load sample data |
| `npm run db:reset` | Wipe DB, re-run migrations + seed (dev only) |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:generate` | Regenerate Prisma client |

## Seed data

**Users:** Alice (AGENT), Bob (ADMIN), Carol (REQUESTER), Dave (AGENT)

**Tickets:** 8 total — all statuses covered (OPEN, IN_PROGRESS, RESOLVED, CLOSED, CANCELLED)

**Comments:** 7 across 6 tickets

## Persistence

Data stored in Docker volume `postgres_data`. Survives container restart.

Verify:
```bash
npm run db:up
# query in Studio or psql — data still there
```

## Port conflict

Docker Postgres runs on **5433** by default (local Postgres often uses 5432).

If 5433 is taken, edit `docker-compose.yml` and update `DATABASE_URL` in `.env`.

## Troubleshooting

**P1000 Authentication failed for `ticket_user`**

Usually means Docker is not running and Prisma hit local Postgres on 5432 instead.

Fix (run one command per line, no comments):

```bash
cp .env.example .env
npm run db:setup
```

**Container not healthy**
```bash
docker compose logs postgres
```

**Reset everything**
```bash
npm run db:reset
```

**Fresh volume**
```bash
docker compose down -v
npm run db:up
npm run db:migrate
npm run db:seed
```

## Tests

```bash
npm test
```

16 unit tests — migration SQL structure, seed data integrity, Prisma enums. No Docker required.

## Verify setup

```bash
npm run db:verify
```

Static checks always run. If Docker is up, also runs migrate, seed, and persistence check.
