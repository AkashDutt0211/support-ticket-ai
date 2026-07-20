# Submission Index — Support Ticket Management System

**Purpose:** Reviewer helper — maps [`Requirements`](Requirements) items to files.  
**Primary entry:** [`README.md`](README.md) reviewer table.

---

## Required repository structure (Requirements §151–174)

| Required file/folder | Path | Status |
|---------------------|------|--------|
| README.md | [`README.md`](README.md) | ✅ |
| candidate-info.md | [`candidate-info.md`](candidate-info.md) | ✅ |
| tool-workflow.md | [`tool-workflow.md`](tool-workflow.md) | ✅ |
| requirements-analysis.md | [`requirements-analysis.md`](requirements-analysis.md) | ✅ |
| acceptance-criteria.md | [`acceptance-criteria.md`](acceptance-criteria.md) | ✅ |
| implementation-plan.md | [`implementation-plan.md`](implementation-plan.md) | ✅ |
| design-notes.md | [`design-notes.md`](design-notes.md) | ✅ |
| api-contract.md | [`api-contract.md`](api-contract.md) | ✅ |
| data-model.md | [`data-model.md`](data-model.md) | ✅ |
| ui-flow.md | [`ui-flow.md`](ui-flow.md) | ✅ |
| test-strategy.md | [`test-strategy.md`](test-strategy.md) | ✅ |
| src/ | [`src/`](src/) | ✅ — symlinks to package `src/` dirs |
| tests/ | [`tests/`](tests/) | ✅ — symlinks to package `tests/` dirs |
| database/ | [`database/`](database/) | ✅ |
| database/schema-or-migrations | [`database/schema-or-migrations/`](database/schema-or-migrations/) | ✅ |
| database/seed-data | [`database/seed-data/`](database/seed-data/) | ✅ — `seed.ts`, `seed-data.ts` present |
| database/setup-notes.md | [`database/setup-notes.md`](database/setup-notes.md) | ✅ |
| test-results.md | [`test-results.md`](test-results.md) | ✅ |
| debugging-notes.md | [`debugging-notes.md`](debugging-notes.md) | ✅ |
| code-review-notes.md | [`code-review-notes.md`](code-review-notes.md) | ✅ |
| review-fixes.md | [`review-fixes.md`](review-fixes.md) | ✅ |
| pr-description.md | [`pr-description.md`](pr-description.md) | ✅ |
| reflection.md | [`reflection.md`](reflection.md) | ✅ |
| final-ai-usage-summary.md | [`final-ai-usage-summary.md`](final-ai-usage-summary.md) | ✅ |
| ai-prompts/ | [`ai-prompts/`](ai-prompts/) | ✅ |
| tool-specific/cursor-workflow/ | [`tool-specific/cursor-workflow/`](tool-specific/cursor-workflow/) | ✅ |

---

## Part A — AI Workflow Foundation (20%)

| Requirements asks for | File | Status |
|----------------------|------|--------|
| `tool-workflow.md` | [`tool-workflow.md`](tool-workflow.md) | ✅ |
| Context provision | [`tool-workflow.md` §2](tool-workflow.md) + [`project-context.md`](tool-specific/cursor-workflow/project-context.md) | ✅ |
| Requirement analysis | [`requirements-analysis.md`](requirements-analysis.md) | ✅ |
| Planning & design | [`design-notes.md`](design-notes.md), [`implementation-plan.md`](implementation-plan.md) | ✅ |
| **Full prompt history** | [`ai-prompts/`](ai-prompts/) | ✅ |
| Testing approach | [`test-strategy.md`](test-strategy.md) | ✅ |
| Debugging evidence | [`debugging-notes.md`](debugging-notes.md) | ✅ |
| Reflection | [`reflection.md`](reflection.md) | ✅ |
| PR description | [`pr-description.md`](pr-description.md) | ✅ |

---

## Cursor tool-specific (Requirements line 260)

| File | Path | Status |
|------|------|--------|
| project-context.md | [`tool-specific/cursor-workflow/project-context.md`](tool-specific/cursor-workflow/project-context.md) | ✅ |
| spec.md | [`tool-specific/cursor-workflow/spec.md`](tool-specific/cursor-workflow/spec.md) | ✅ |
| tasks.md | [`tool-specific/cursor-workflow/tasks.md`](tool-specific/cursor-workflow/tasks.md) | ✅ |
| acceptance-criteria.md | [`tool-specific/cursor-workflow/acceptance-criteria.md`](tool-specific/cursor-workflow/acceptance-criteria.md) | ✅ |
| cursor-rules-or-instructions.md | [`tool-specific/cursor-workflow/cursor-rules-or-instructions.md`](tool-specific/cursor-workflow/cursor-rules-or-instructions.md) | ✅ |

---

## Part B — Application (60%)

| Requirement | Evidence |
|-------------|----------|
| Frontend | [`frontend/`](frontend/) |
| Backend API | [`backend/`](backend/) |
| Database | [`database/`](database/) |
| State machine tests | [`backend/tests/integration/tickets.integration.test.ts`](backend/tests/integration/tickets.integration.test.ts) |
| 114 automated tests | [`test-results.md`](test-results.md) |

---

## Helper artifacts (not in Requirements template)

- [`SUBMISSION-FORM-ANSWERS.md`](SUBMISSION-FORM-ANSWERS.md) — mirrors online form
- [`ai-prompt-history.md`](ai-prompt-history.md) — index to `ai-prompts/`
