# Project Context — Support Ticket Management System

## What this is

AI-assisted full-stack exercise. Support ticket app. Lifecycle artifacts matter as much as code.

## Current state (2026-07-14)

| Step | Status | Location |
|------|--------|----------|
| 1 Database | Done | `database/` |
| 2 Backend API | Done | `backend/` — port 3001 |
| 3 Frontend | Done | `frontend/` — port 5173 |
| 4 Submission artifacts | Done | `tool-workflow.md`, `PR_DESCRIPTION.md`, `docs/` |

## Stack

| Layer | Tech |
|-------|------|
| DB | PostgreSQL 16 + Prisma (Docker port 5433) |
| API | Node 20 + Express + TypeScript + Zod |
| UI | React 19 + Vite + TypeScript | Done |

## Core business rules

- Tickets have lifecycle: OPEN → IN_PROGRESS → RESOLVED → CLOSED (or CANCELLED from OPEN/IN_PROGRESS)
- Backend enforces state machine. Frontend must mirror it in UI.
- No auth in Core. User picks "acting user" from seeded list.
- Search by keyword. Filter by status.

## API base

`http://localhost:3001/api`

## Key docs

- [`Requirements`](../../Requirements) — source of truth
- [`SUBMISSION.md`](../../SUBMISSION.md) — **reviewer entry point (root)**
- [`prompt-history.md`](../../prompt-history.md) — prompt log pointer (root)
- [`docs/ai-prompt-history.md`](../../docs/ai-prompt-history.md) — full prompt log
- [`docs/SUBMISSION.md`](../../docs/SUBMISSION.md) — detailed artifact index
- [`tool-workflow.md`](../../tool-workflow.md) — Part A AI workflow
- [`spec.md`](spec.md) — contracts
- [`tasks.md`](tasks.md) — checklists
- [`acceptance-criteria.md`](acceptance-criteria.md) — done definition
- [`docs/requirement-analysis.md`](../../docs/requirement-analysis.md) — requirement breakdown
- [`docs/design.md`](../../docs/design.md) — technical design
- [`docs/architecture.md`](../../docs/architecture.md) — system layout

## Workflow rule

Plan → human review → **APPROVED** → implement. No code before approval.
