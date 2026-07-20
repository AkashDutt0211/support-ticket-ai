# Prompt History — Code Review

**Tool:** Cursor | **Commands:** `/code-refactorer`, `/context-aware-bug-hunter`

---

## Prompt 12 — Screening (verbatim)

```
Work on Step 4 artifacts (tool-workflow, reflection, PR description).
Screen with /code-refactorer and /context-aware-bug-hunter.
Guardrails: Don't change anything major without human approval.
```

**AI output:**
- Wrote lifecycle artifacts
- Documented **5 issues** — no code changes without approval

**Accepted:** Documentation of findings  
**Rejected:** Auto-fixing without approval

---

## Prompt 13 — Apply fixes (verbatim)

```
Solve all 5 issues. First show which fix and why.
```

**AI output:** Minimal patches + regression tests for all 5 issues.

**See:** [`code-review-notes.md`](../code-review-notes.md), [`review-fixes.md`](../review-fixes.md)

---

## Iteration E — Screening → fixes

| Step | What happened |
|------|---------------|
| AI marked app "complete" | Human ran bug-hunter |
| 5 issues found | Human approved fixes |
| Fixes applied | Tests added |

**Full archive:** [`_full-archive.md`](_full-archive.md)
