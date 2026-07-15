# Support Ticket Management System

AI-assisted full-stack exercise — Support Ticket Management System.

## For reviewers — AI workflow evidence

**Start here:** [`SUBMISSION.md`](SUBMISSION.md) — root index (maps every Requirements item to a file)

| Root pointer (reviewer lookup) | Full document |
|--------------------------------|---------------|
| [`SUBMISSION.md`](SUBMISSION.md) | [`docs/SUBMISSION.md`](docs/SUBMISSION.md) |
| [`prompt-history.md`](prompt-history.md) | [`docs/ai-prompt-history.md`](docs/ai-prompt-history.md) |
| [`requirement-analysis.md`](requirement-analysis.md) | [`docs/requirement-analysis.md`](docs/requirement-analysis.md) |
| [`reflection.md`](reflection.md) | [`docs/reflection.md`](docs/reflection.md) |
| [`SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) | [`docs/SUBMISSION-FORM-ANSWERS.md`](docs/SUBMISSION-FORM-ANSWERS.md) |
| [`tool-workflow.md`](tool-workflow.md) | Part A — in place at root |
| [`PR_DESCRIPTION.md`](PR_DESCRIPTION.md) | PR summary — in place at root |
| [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) | Cursor artifacts (Requirements line 156) |

**Primary AI tool:** Cursor | **Pattern:** plan → human **APPROVED** → implement → append prompt history

## Project structure

```
support-ticket-ai/
├── backend/          # Node.js API (Step 2)
├── frontend/         # React app (Step 3)
├── database/         # PostgreSQL + Prisma (Step 1) ← start here
├── docs/             # Lifecycle artifacts
└── tool-specific/    # Cursor workflow docs (Requirements line 156)
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

### Root pointers (reviewer lookup)

- [`SUBMISSION.md`](SUBMISSION.md) — artifact index
- [`prompt-history.md`](prompt-history.md) — full AI prompt log
- [`requirement-analysis.md`](requirement-analysis.md)
- [`reflection.md`](reflection.md)
- [`SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md)

### Full documents

- [Requirements](Requirements) — project spec
- [`docs/SUBMISSION.md`](docs/SUBMISSION.md) — detailed index
- [`docs/ai-prompt-history.md`](docs/ai-prompt-history.md)
- [`tool-workflow.md`](tool-workflow.md) — AI workflow (Part A)
- [`docs/design.md`](docs/design.md) — schema design
- [`docs/architecture.md`](docs/architecture.md) — system architecture
- [`docs/testing.md`](docs/testing.md) — test strategy
- [`docs/debugging.md`](docs/debugging.md) — issues resolved + fixes
- [`docs/reflection.md`](docs/reflection.md)
- [`PR_DESCRIPTION.md`](PR_DESCRIPTION.md) — PR summary + test plan
- [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) — Cursor spec, tasks, acceptance criteria
