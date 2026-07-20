# Code Review Notes

## AI-Assisted Review Summary

**Date:** 2026-07-14  
**Commands used:** `/code-refactorer`, `/context-aware-bug-hunter`  
**Scope:** Full application (backend, frontend, database)

AI screening identified **5 issues** — none were auto-fixed; human approval required before changes (per guardrails in Prompt 12).

## My Review Observations

| Area | Finding |
|------|---------|
| State machine | Correct transitions; separate status endpoint is clean |
| Validation | Zod at boundary; good error shapes |
| Frontend | StatusActions correctly mirrors backend |
| Duplication | State machine duplicated BE + FE — acceptable for Core, drift risk noted |
| Auth | Acting-user dropdown by design — documented limitation |
| Tests | Integration tests cover mandatory tier; later expanded to 114 total |

## Changes Made After Review

See [`review-fixes.md`](review-fixes.md) — all 5 screening issues fixed after human approved Prompt 13.

## Suggestions Rejected (and why)

| AI / review suggestion | Decision |
|------------------------|----------|
| Add authentication in Core | Rejected — Requirements §88: auth is optional Stretch |
| Merge status into general PATCH | Rejected — isolates state machine enforcement |
| Redux for frontend state | Rejected — Context + hooks sufficient for Core scope |
| MongoDB instead of PostgreSQL | Rejected — relational model fits ticket lifecycle better |
