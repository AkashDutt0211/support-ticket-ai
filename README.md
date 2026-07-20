# Support Ticket Management System

AI-assisted full-stack exercise — Support Ticket Management System.

## For reviewers — start here

| Artifact | File |
|----------|------|
| Candidate info | [`candidate-info.md`](candidate-info.md) |
| Requirement analysis | [`requirements-analysis.md`](requirements-analysis.md) |
| Acceptance criteria | [`acceptance-criteria.md`](acceptance-criteria.md) |
| Implementation plan | [`implementation-plan.md`](implementation-plan.md) |
| Design | [`design-notes.md`](design-notes.md), [`data-model.md`](data-model.md), [`api-contract.md`](api-contract.md), [`ui-flow.md`](ui-flow.md) |
| AI workflow (Part A) | [`tool-workflow.md`](tool-workflow.md) |
| Prompt history | [`ai-prompts/`](ai-prompts/) |
| Testing | [`test-strategy.md`](test-strategy.md), [`test-results.md`](test-results.md) |
| Debugging & review | [`debugging-notes.md`](debugging-notes.md), [`code-review-notes.md`](code-review-notes.md), [`review-fixes.md`](review-fixes.md) |
| Reflection & summary | [`reflection.md`](reflection.md), [`final-ai-usage-summary.md`](final-ai-usage-summary.md) |
| PR description | [`pr-description.md`](pr-description.md) |
| Cursor workflow | [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) |

**Primary AI tool:** Cursor | **Pattern:** plan → human **APPROVED** → implement

## Project structure

```
support-ticket-ai/
├── src/                 # Application source (symlinks → package src/)
│   ├── backend/         → backend/src/
│   ├── frontend/        → frontend/src/
│   └── database/        → database/src/
├── tests/               # Automated tests (symlinks → package tests/)
│   ├── backend/         → backend/tests/
│   ├── frontend/        → frontend/tests/
│   └── database/        → database/tests/
├── database/
│   ├── schema-or-migrations/  → prisma schema + migrations
│   └── seed-data/             → seed.ts, seed-data.ts
├── backend/             # Node.js API (Step 2)
├── frontend/            # React app (Step 3)
├── ai-prompts/          # Prompt history by activity
└── tool-specific/cursor-workflow/
```

Lifecycle markdown files (`requirements-analysis.md`, `design-notes.md`, etc.) live at repo root — see reviewer table above.

## Quick start — Database

See **[database/README.md](database/README.md)** and **[database/setup-notes.md](database/setup-notes.md)**.

```bash
cd database
nvm use 20
cp .env.example .env
npm run db:setup
```

## Quick start — Backend

See **[backend/README.md](backend/README.md)**.

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

See **[frontend/README.md](frontend/README.md)**.

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

All lifecycle artifacts at **repo root** per [`Requirements`](Requirements) repository structure.

- [Requirements](Requirements) — project spec
- [`SUBMISSION.md`](SUBMISSION.md) — detailed artifact index (helper)
- [`SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) — mirrors online form
