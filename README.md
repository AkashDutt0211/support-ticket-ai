# Support Ticket Management System

AI-assisted full-stack exercise — Support Ticket Management System.

## Project structure

```
support-ticket-ai/
├── backend/          # Node.js API (Step 2)
├── frontend/         # React app (Step 3)
├── database/         # PostgreSQL + Prisma (Step 1) ← start here
├── docs/             # Lifecycle artifacts
└── tool-specifics/   # Cursor workflow docs
```

## Quick start — Database

See **[database/README.md](database/README.md)** for full setup.

```bash
cd database
nvm use 20
cp .env.example .env
npm run db:setup
```

## Quick start — Backend

See **[backend/README.md](backend/README.md)** for full setup.

```bash
nvm use 20
npm install
cd database && npm run db:generate
cd ../backend
cp .env.example .env
npm run dev
```

API: **http://localhost:3001**

## Quick start — Frontend

See **[frontend/README.md](frontend/README.md)** for full setup.

```bash
nvm use 20
npm install
cd frontend
cp .env.example .env
npm run dev
```

UI: **http://localhost:5173**

## Stack

| Layer | Tech |
|-------|------|
| Database | PostgreSQL 16 |
| ORM | Prisma |
| Backend | Node.js + Express + TypeScript |
| Frontend | React 19 + Vite + TypeScript |

## Documentation

- [Requirements](Requirements) — project spec
- [docs/design.md](docs/design.md) — schema design
- [docs/architecture.md](docs/architecture.md) — system architecture
- [docs/testing.md](docs/testing.md) — test strategy
- [docs/debugging.md](docs/debugging.md) — issues resolved + open items
- [docs/reflcetion.md](docs/reflcetion.md) — reflection
- [docs/ai-prompt-history.md](docs/ai-prompt-history.md) — AI prompt log
- [tool-workflow.md](tool-workflow.md) — AI workflow (Part A)
- [PR_DESCRIPTION.md](PR_DESCRIPTION.md) — PR summary + test plan
