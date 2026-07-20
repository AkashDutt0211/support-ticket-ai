# Reflection

## What I Built

Full-stack Core app in 4 steps: database → backend API → React frontend → lifecycle artifacts (114 tests).

## How I Used AI (across the lifecycle)

Plan → APPROVED → implement for each phase. AI drafted specs and code; I ran tests, verified cURL, approved bug fixes. See [`ai-prompts/`](ai-prompts/) and [`tool-workflow.md`](tool-workflow.md).

## What AI Helped With Most

Scaffolding (Prisma, Express routes, React components), requirement breakdown, terminal error diagnosis, test boilerplate.

## What AI Got Wrong

- Initially used port 5432 (conflict with local Postgres)
- Vitest config without Node version check
- Marked app "complete" before bug-hunter screening
- cURL commands with inline `#` comments

## How I Validated AI Output

Ran all test suites, manual cURL verification, `/context-aware-bug-hunter` screening, human APPROVED gates before major code.

## What I Would Improve Next

- Shared state machine package (avoid BE/FE drift)
- Auth if moving beyond exercise
- CI workflow (Stretch)
- OpenAPI documentation (Stretch)

## Reusable Workflow (prompts, rules, specs, templates)

- `.cursor/rules/` + `tool-specific/cursor-workflow/`
- Prompt templates in [`ai-prompts/documentation.md`](ai-prompts/documentation.md)
- APPROVED gate pattern in `cursor-rules-or-instructions.md`

---

## What I built (detail)

Full-stack Core app in 4 steps:

1. **Database** — PostgreSQL + Prisma, Docker, seeds
2. **Backend** — Express API, state machine, 21 tests
3. **Frontend** — React SPA, search/filter, status UI, 9 tests
4. **Artifacts** — docs, prompt history, workflow, this reflection

---

## What went well

**Spec-driven AI workflow worked.** Plan → human APPROVED → implement stopped scope creep. Each step had clear done criteria in `acceptance-criteria.md`.

**State machine as judgment piece.** Hardest Core requirement. Split status endpoint from field updates. Backend enforces. Frontend shows valid buttons only. Integration tests prove it.

**Persistence of context.** `.cursor/rules/` + `tool-specific/cursor-workflow/` meant AI did not forget patterns between sessions.

**Debugging was visible.** Docker/Node/Vitest issues documented in `debugging-notes.md` and `ai-prompts/debugging.md` — not hidden.

---

## What was hard

**Local environment friction.** Docker not running. Node 16 default. Port 5432 conflict with local Postgres. Took iteration — not AI's fault, but ate time.

**Duplicated logic.** State machine exists in backend AND frontend. Works today. Drift risk tomorrow. Would extract shared package in real project.

**No auth by design.** Acting user dropdown is fine for exercise. Feels wrong for production — client sends `createdById`. Documented as known limitation.

---

## AI strengths I used

- Fast scaffolding (Prisma schema, Express routes, React components)
- Requirement → plan → task breakdown
- Terminal error diagnosis (P1000, Vitest ESM, Node version)
- cURL command generation for API verification
- Test boilerplate for state machine

---

## AI weaknesses I caught

- Sometimes pasted commands with `# comments` break shell
- Would over-implement without APPROVED gate
- Duplicated state machine without flagging shared-module need early
- Did not catch `CommentForm` clearing text before API success until bug hunt

**Lesson:** AI generates fast. Human must review edge cases and run real tests.

---

## Trade-offs I accept (Core scope)

| Decision | Why | Cost |
|----------|-----|------|
| No auth | Requirements — Stretch only | Client-trusted user id |
| Duplicated state machine | Speed, no shared package yet | Drift risk |
| No search debounce | ~~Simple implementation~~ | Fixed — 300ms debounce in Step 5 |
| Plain CSS | No design system overhead | Basic look |
| Acting user in localStorage | Demo simplicity | Not production auth pattern |

---

## If I had more time (Stretch)

- Auth + protected routes
- Shared `packages/shared` for state machine + types
- Optimistic concurrency on status update (`WHERE status = expected`)
- Search debounce + request abort in hooks
- E2E tests (Playwright)
- OpenAPI docs
- CI workflow

---

## Screening results (Step 4)

Ran `/code-refactorer` and `/context-aware-bug-hunter` on full app.

**Verdict:** Core complete and demo-ready. No show-stopper for submission.

**Fix later (human approval needed):** All five items **fixed** — see [`debugging-notes.md`](debugging-notes.md).

---

## Growth areas for me

1. **Ask for shared modules earlier** when same logic appears in FE + BE
2. **Run bug-hunter before calling step "done"** — would have caught CommentForm issue
3. **Environment checklist** upfront: Node 20, Docker, ports — save debug time
4. **Deeper frontend tests** for hook race conditions

---

## Honest self-assessment

I understand the system I built — not copy-paste. I can explain:
- Why status has its own endpoint
- Why Postgres over MongoDB
- What happens on invalid transition (422)
- Where acting user id flows

The lifecycle artifacts (prompt history, design, testing, reflection) are the point of the exercise. Code is the vehicle.

**Ready for submission:** Yes, Core complete with artifacts.
