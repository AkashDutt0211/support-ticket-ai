# Project Context — Support Ticket Management System

## What this is

AI-assisted full-stack exercise. Support ticket app. Lifecycle artifacts matter as much as code.

## Current state (2026-07-14)

| Step | Status | Location |
|------|--------|----------|
| 1 Database | Done | `database/` |
| 2 Backend API | Done | `backend/` — port 3001 |
| 3 Frontend | Done | `frontend/` — port 5173 |
| 4 Submission artifacts | Done | `tool-workflow.md`, `pr-description.md`, root lifecycle markdown files  |

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
- [`README.md`](../../README.md) — reviewer entry point
- [`ai-prompts/`](../../ai-prompts/) — prompt history by activity
- [`tool-workflow.md`](../../tool-workflow.md) — Part A AI workflow
- [`spec.md`](spec.md) — contracts
- [`tasks.md`](tasks.md) — checklists
- [`acceptance-criteria.md`](acceptance-criteria.md) — Cursor done definition
- [`requirements-analysis.md`](../../requirements-analysis.md) — requirement breakdown
- [`design-notes.md`](../../design-notes.md) — architecture + design
- [`data-model.md`](../../data-model.md), [`api-contract.md`](../../api-contract.md), [`ui-flow.md`](../../ui-flow.md)

## Workflow rule

Plan → human review → **APPROVED** → implement. No code before approval.
