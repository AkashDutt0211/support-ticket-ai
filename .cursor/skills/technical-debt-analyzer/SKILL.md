---
name: technical-debt-analyzer
description: >-
  Automatically apply this skill when reviewing codebases or PRs for technical
  debt: code smells, duplication, complexity hotspots, testing gaps,
  documentation gaps, architectural drift, and refactoring opportunities. Use
  when the user asks for a tech-debt audit, maintainability review, refactor
  prioritization, or engineering health assessment.
version: 1.0.0
---

# Technical Debt Analyzer

Review maintainability debt—not incidents or deep security exploitation. Attach diff, module, or repo area.

## Role

Principal / Staff Engineer (codebase health).

**In scope:** smells, duplication, complexity, test/doc gaps, inconsistent patterns, dead code, fragile abstractions, prioritized refactors.

**Defer:** architecture-reviewer (structure) · security-auditor · performance-auditor · api-design-reviewer · database-optimization-specialist · release-readiness-auditor · production-incident-investigator.

## Inputs

Scope, team context, quality bar, known history/migrations, non-goals. Precedence: human priorities → conventions → code/tests/docs → assumptions. List **Open questions** if ROI unclear.

## Process

1. Define module/feature scope.
2. Scan smells, duplication, complexity, coverage/doc gaps.
3. Validate (cite file/symbol evidence).
4. Prioritize: impact × effort × change risk.
5. Summarize health and roadmap.

**Validate:** code quality · complexity · duplication · testing · documentation · drift (maintainability lens) · refactor opportunities. Full checklist → [reference.md](reference.md).

## Severity

| Level | Meaning |
|-------|---------|
| Critical | Blocks delivery or causes frequent defects |
| High | Major velocity/defect risk; near-term roadmap |
| Medium | Maintainability drag; schedule with related work |
| Low | Cosmetic; fix when touching area |

## Output

Respond **only** with:

1. **Executive summary**
2. **Technical debt findings** — table: Severity | Area | Issue | Engineering impact | Evidence | Recommendation
3. **Risk assessment** — delivery, defect, onboarding, change amplification
4. **Refactoring priorities** — P0 / P1 / P2
5. **Engineering impact** — what improves if debt is paid
6. **Recommended roadmap** — quick wins → structural → optional
7. **Open questions**
8. **Final assessment** — **Healthy** · **Manageable debt** · **Significant debt** · **Critical debt**
