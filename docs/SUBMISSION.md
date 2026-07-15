# Submission Index — Support Ticket Management System

**Purpose:** Detailed index — maps every item from [`Requirements`](../Requirements) to a file in this repository.  
**Reviewer entry point:** [`SUBMISSION.md`](../SUBMISSION.md) at repo root.

---

## Part A — AI Workflow Foundation (20%)

| Requirements asks for | File | Status |
|----------------------|------|--------|
| `tool-workflow.md` at repo root | [`tool-workflow.md`](../tool-workflow.md) | ✅ Complete — all 11 sections |
| How context is provided | [`tool-workflow.md` §2](../tool-workflow.md) + [`tool-specific/cursor-workflow/project-context.md`](../tool-specific/cursor-workflow/project-context.md) | ✅ |
| Requirement analysis via AI | [`docs/requirement-analysis.md`](requirement-analysis.md) | ✅ |
| Planning & design via AI | [`docs/design.md`](design.md), [`docs/architecture.md`](architecture.md) | ✅ |
| **Full prompt history** | [`docs/ai-prompt-history.md`](ai-prompt-history.md) | ✅ — verbatim prompts + iterations |
| Prompt iteration & corrections | [`docs/ai-prompt-history.md` § Iteration log](ai-prompt-history.md#iteration-log-ai-mistakes--human-corrections) | ✅ |
| Testing approach | [`docs/testing.md`](testing.md) | ✅ |
| Debugging evidence | [`docs/debugging.md`](debugging.md) | ✅ |
| Reflection | [`docs/reflection.md`](reflection.md) | ✅ |
| **Submission form answers** | [`docs/SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) | ✅ — mirrors online form for cross-check |
| PR description | [`PR_DESCRIPTION.md`](../PR_DESCRIPTION.md) | ✅ |

---

## Cursor tool-specific artifacts (Requirements line 156)

| Required file | Path | Status |
|---------------|------|--------|
| `project-context.md` | [`tool-specific/cursor-workflow/project-context.md`](../tool-specific/cursor-workflow/project-context.md) | ✅ |
| `spec.md` | [`tool-specific/cursor-workflow/spec.md`](../tool-specific/cursor-workflow/spec.md) | ✅ |
| `tasks.md` | [`tool-specific/cursor-workflow/tasks.md`](../tool-specific/cursor-workflow/tasks.md) | ✅ |
| `acceptance-criteria.md` | [`tool-specific/cursor-workflow/acceptance-criteria.md`](../tool-specific/cursor-workflow/acceptance-criteria.md) | ✅ |
| `cursor-rules-or-instructions.md` | [`tool-specific/cursor-workflow/cursor-rules-or-instructions.md`](../tool-specific/cursor-workflow/cursor-rules-or-instructions.md) | ✅ |

**Persistent rules (reusable context):** [`.cursor/rules/`](../.cursor/rules/) — 12 rule files enforced during codegen.

---

## Part B — Full-Stack Mini Project (60%)

| Requirement | Evidence |
|-------------|----------|
| Frontend application | [`frontend/`](../frontend/) — React 19 + Vite |
| Backend API | [`backend/`](../backend/) — Express on port 3001 |
| Database persistence | [`database/`](../database/) — PostgreSQL 16 + Prisma |
| Migrations | [`database/prisma/migrations/`](../database/prisma/migrations/) |
| Seed data | [`database/prisma/seed.ts`](../database/prisma/seed.ts) |
| Input validation | Zod in `backend/src/validators/`, forms in frontend |
| Error handling | `backend/src/middleware/errorHandler.ts`, `ErrorAlert` UI |
| Search / filter | `GET /api/tickets?search&status`, `TicketFilters` |
| State machine tests | [`backend/tests/integration/tickets.integration.test.ts`](../backend/tests/integration/tickets.integration.test.ts) |
| README setup | [`README.md`](../README.md) + per-package READMEs |

---

## Traceability: spec → prompt → code

| Step | Spec | Prompt session | Implementation |
|------|------|----------------|----------------|
| 1 Database | [`spec.md`](../tool-specific/cursor-workflow/spec.md) | [Prompt history § Session 1](ai-prompt-history.md#session-1--database-stack--step-1) | `database/` |
| 2 Backend | [`spec.md`](../tool-specific/cursor-workflow/spec.md) | [Prompt history § Session 2](ai-prompt-history.md#session-2--backend-api-step-2) | `backend/` |
| 3 Frontend | [`spec.md`](../tool-specific/cursor-workflow/spec.md) | [Prompt history § Session 3](ai-prompt-history.md#session-3--frontend-step-3) | `frontend/` |
| 4 Artifacts + review fixes | [`tasks.md`](../tool-specific/cursor-workflow/tasks.md) | [Prompt history § Sessions 4–5](ai-prompt-history.md#session-4--submission-artifacts--screening) | `docs/`, `tool-workflow.md` |

---

## How to verify AI usage (quick reviewer path)

1. Read [`tool-workflow.md`](../tool-workflow.md) — Part A narrative (5 min)
2. Read [`docs/ai-prompt-history.md`](ai-prompt-history.md) — full prompt log with iterations (10 min)
3. Read [`docs/requirement-analysis.md`](requirement-analysis.md) — requirement breakdown before coding (5 min)
4. Compare [`tool-specific/cursor-workflow/spec.md`](../tool-specific/cursor-workflow/spec.md) to actual API in `backend/src/routes/`
5. Check human **APPROVED** gates in prompt history before each implementation step

---

## Workflow pattern used

```
@Requirements + @tool-specific/cursor-workflow/
        ↓
   AI drafts plan in docs (no code)
        ↓
   Human reviews → replies "APPROVED"
        ↓
   AI implements + tests
        ↓
   Prompt appended to docs/ai-prompt-history.md
```

This pattern is documented in [`cursor-rules-or-instructions.md`](../tool-specific/cursor-workflow/cursor-rules-or-instructions.md).
