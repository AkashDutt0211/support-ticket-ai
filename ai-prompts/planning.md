# Prompt History — Planning

**Tool:** Cursor | **Activity:** Requirement analysis, stack decisions, step planning

For each prompt: prompt text → AI response summary → accepted / changed / rejected.

---

## Context setting (every session)

```
@Requirements
@tool-specific/cursor-workflow/
.cursor/rules/
design-notes.md, data-model.md
```

**Guardrails:** Plan only — human review before implement. Reply APPROVED before code.

---

## Prompt 1 — Technical Lead planning (verbatim)

```
Role: Your role would be as a Technical Lead who is preparing the implementation plan 
for the given documentation.
Task: Go through the created folder structure... Step 1: Database plan.
Guardrails: Follow .Cursor skills/rules. Caveman style. Preserve prompt history.
```

**AI output:** Mapped User/Ticket/Comment entities. Proposed PostgreSQL + Prisma.  
**Accepted:** Entity model, step-by-step DB plan  
**Changed:** —  
**Rejected:** Starting code before plan review

---

## Prompt 2 — Stack decision (verbatim)

```
suggest if PostgreSQL or MongoDB which one will be better and why ?
```

**AI output:** Recommended PostgreSQL (FKs, ILIKE search, migrations).  
**Accepted:** PostgreSQL  
**Rejected:** MongoDB

---

## Prompt 3 — Lock stack + plan (verbatim)

```
Use Postgres + Prisma and start with planning
```

**AI output:** Full Step 1 plan — schema, Docker, seeds. No code.  
**Accepted:** Plan document  
**Human gate:** Review before Prompt 4

---

## Prompt 6 — Backend plan (key parts)

```
Database is now up. Create backend plan referencing Requirements.
Guardrails: plan only, human approve then execute.
```

**AI output:** Repository pattern, separate status endpoint, 422 for invalid transitions.  
**Accepted:** All design decisions in spec.md  
**Human gate:** APPROVED required (Prompt 7)

---

## Prompt 10 — Frontend plan (key parts)

```
APIs verified. Plan Step 3 React frontend. Plan only. Caveman style.
```

**AI output:** 3 routes, ActingUserSelect, StatusActions, RTL tests.  
**Accepted:** spec.md, tasks.md updates  
**Human gate:** APPROVED required (Prompt 11)

**Full archive:** [`_full-archive.md`](_full-archive.md) | **Implementation prompts:** [`implementation.md`](implementation.md)
