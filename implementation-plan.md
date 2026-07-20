# Implementation Plan

## Overview

Build Support Ticket Management System Core in four phases: database → backend API → React frontend → lifecycle artifacts. Spec-driven workflow with human **APPROVED** gates before each implementation phase.

## Task Breakdown

| Phase | Scope | Location | Status |
|-------|-------|----------|--------|
| 1 | PostgreSQL schema, migrations, Docker, seeds | `database/` | ✅ Done |
| 2 | Express API, state machine, validation, integration tests | `backend/` | ✅ Done |
| 3 | React SPA — list, create, detail, search, filter, comments | `frontend/` | ✅ Done |
| 4 | Workflow docs, prompt history, reflection, PR description | Repo root | ✅ Done |
| 5 | Code review fixes (5 screening issues) | BE + FE | ✅ Done |

Detailed checklists: [`tool-specific/cursor-workflow/tasks.md`](tool-specific/cursor-workflow/tasks.md)

## Milestones

1. **M1 — Data layer:** Prisma schema matches Requirements entities; seed data; `db:setup` works from README
2. **M2 — API layer:** All Core endpoints; state machine enforced; mandatory integration tests pass
3. **M3 — UI layer:** All Core user flows; error states; acting-user selector
4. **M4 — Submission:** All lifecycle artifacts + prompt history grouped by activity

## AI Usage Plan

| Activity | AI role | Human role |
|----------|---------|------------|
| Requirement analysis | Break down Requirements, map Core vs Stretch | Validate scope before coding |
| Design | Draft schema, API contract, UI flow in docs | Review spec.md; reply APPROVED |
| Implementation | Generate code per approved spec | Run tests; verify endpoints |
| Testing | Test scaffolding, edge cases | Confirm coverage meets Core tier |
| Debugging | Diagnose terminal errors from pasted output | Verify fix locally |
| Code review | `/code-refactorer`, `/context-aware-bug-hunter` | Approve fixes before merge |
| Documentation | Draft artifacts from templates | Edit for accuracy and honesty |

## Risks

| Risk | Impact |
|------|--------|
| Local Postgres port conflict (5432) | Setup failures |
| Node version mismatch (16 vs 20) | Vitest/crypto errors |
| AI coding before approval | Scope drift |
| Duplicated state machine (BE + FE) | Future drift |

## Mitigation

- Docker Postgres on port **5433** + `db:preflight` script
- `.nvmrc` + `check-node.mjs` on all test scripts
- Explicit APPROVED gate documented in `cursor-rules-or-instructions.md`
- Mirror state machine in frontend utils; integration tests as source of truth
