# Support Ticket Management System

AI-assisted full-stack exercise — Support Ticket Management System.

## For reviewers — AI workflow evidence

**Start here:** [`docs/SUBMISSION.md`](docs/SUBMISSION.md) — maps every Requirements item to a repo file.

| Required artifact | Location |
|-------------------|----------|
| **Full prompt history** | [`docs/ai-prompt-history.md`](docs/ai-prompt-history.md) |
| **AI workflow (Part A)** | [`tool-workflow.md`](tool-workflow.md) |
| Requirement analysis | [`docs/requirement-analysis.md`](docs/requirement-analysis.md) |
| Cursor workflow context | [`tool-specifics/cursor-workflow/`](tool-specifics/cursor-workflow/) |
| Design + architecture | [`docs/design.md`](docs/design.md), [`docs/architecture.md`](docs/architecture.md) |
| Testing + debugging | [`docs/testing.md`](docs/testing.md), [`docs/debugging.md`](docs/debugging.md) |
| Reflection | [`docs/reflection.md`](docs/reflection.md) |
| **Submission form answers** | [`docs/SUBMISSION-FORM-ANSWERS.md`](docs/SUBMISSION-FORM-ANSWERS.md) |
| Submission index | [`docs/SUBMISSION.md`](docs/SUBMISSION.md) |
| PR description | [`PR_DESCRIPTION.md`](PR_DESCRIPTION.md) |

**Primary AI tool:** Cursor | **Pattern:** plan → human **APPROVED** → implement → append prompt history

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

- [**Submission index (reviewers start here)**](docs/SUBMISSION.md) — maps Requirements → repo files
- [**Submission form answers**](docs/SUBMISSION-FORM-ANSWERS.md) — mirrors online form for reviewer cross-check
- [Requirements](Requirements) — project spec
- [**AI prompt history**](docs/ai-prompt-history.md) — full prompt log with iterations
- [**AI workflow (Part A)**](tool-workflow.md)
- [Requirement analysis](docs/requirement-analysis.md)
- [docs/design.md](docs/design.md) — schema design
- [docs/architecture.md](docs/architecture.md) — system architecture
- [docs/testing.md](docs/testing.md) — test strategy
- [docs/debugging.md](docs/debugging.md) — issues resolved + fixes
- [docs/reflection.md](docs/reflection.md) — reflection
- [PR_DESCRIPTION.md](PR_DESCRIPTION.md) — PR summary + test plan
- [tool-specifics/cursor-workflow/](tool-specifics/cursor-workflow/) — Cursor spec, tasks, acceptance criteria
