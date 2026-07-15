# Support Ticket Management System

AI-assisted full-stack exercise — Support Ticket Management System.

## For reviewers — AI workflow evidence

**Start here:** [`SUBMISSION.md`](SUBMISSION.md) — maps every Requirements item to a file at repo root.

| Artifact | File |
|----------|------|
| Submission index | [`SUBMISSION.md`](SUBMISSION.md) |
| Full prompt history | [`ai-prompt-history.md`](ai-prompt-history.md) |
| Requirement analysis | [`requirement-analysis.md`](requirement-analysis.md) |
| Design & architecture | [`design.md`](design.md), [`architecture.md`](architecture.md) |
| Testing & debugging | [`testing.md`](testing.md), [`debugging.md`](debugging.md) |
| Reflection | [`reflection.md`](reflection.md) |
| Form answers (cross-check) | [`SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) |
| AI workflow (Part A) | [`tool-workflow.md`](tool-workflow.md) |
| PR summary | [`PR_DESCRIPTION.md`](PR_DESCRIPTION.md) |
| Cursor workflow | [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) |

**Primary AI tool:** Cursor | **Pattern:** plan → human **APPROVED** → implement → append prompt history

## Project structure

```
support-ticket-ai/
├── database/         # PostgreSQL + Prisma (Step 1) ← start here
├── backend/          # Node.js API (Step 2)
├── frontend/         # React app (Step 3)
├── tool-specific/    # Cursor workflow docs (Requirements line 156)
├── SUBMISSION.md     # Reviewer index — start here
├── ai-prompt-history.md
├── tool-workflow.md
├── requirement-analysis.md, design.md, architecture.md
├── testing.md, debugging.md, reflection.md
└── PR_DESCRIPTION.md, SUBMISSION-FORM-ANSWERS.md
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

All lifecycle artifacts live at **repo root** (no `docs/` folder):

- [Requirements](Requirements) — project spec
- [`SUBMISSION.md`](SUBMISSION.md) — reviewer index
- [`ai-prompt-history.md`](ai-prompt-history.md) — full prompt log with iterations
- [`tool-workflow.md`](tool-workflow.md) — AI workflow (Part A)
- [`requirement-analysis.md`](requirement-analysis.md)
- [`design.md`](design.md) — schema design
- [`architecture.md`](architecture.md) — system architecture
- [`testing.md`](testing.md) — test strategy
- [`debugging.md`](debugging.md) — issues resolved + fixes
- [`reflection.md`](reflection.md)
- [`SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) — mirrors online submission form
- [`PR_DESCRIPTION.md`](PR_DESCRIPTION.md) — PR summary + test plan
- [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) — Cursor spec, tasks, acceptance criteria
