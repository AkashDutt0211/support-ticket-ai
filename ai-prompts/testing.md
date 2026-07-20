# Prompt History — Testing

**Tool:** Cursor | **Activity:** Test strategy, test generation, validation

---

## Mandatory Core tier — state machine integration tests

Prompt 6 (backend plan) specified Vitest + Supertest against real Postgres for all valid/invalid transitions.

**Delivered:** `backend/tests/integration/tickets.integration.test.ts`

---

## Test expansion (post-Core)

Added unit tests across all packages — **114 total**:

| Package | Tests |
|---------|-------|
| database | 16 (migration, seed-data, enums) |
| backend | 57 (unit + integration) |
| frontend | 41 (components, hooks, api) |

---

## Prompt 9 — Test environment failures

User pasted Vitest errors (ESM, Node 16 crypto).

**AI fix:** `vitest.config.mjs`, `.nvmrc`, `check-node.mjs`  
**Validated:** All test suites pass on Node 20

---

## Validation prompts used

```
Run all test suites and update docs.
Provide cURL commands to verify all APIs.
```

**Results:** [`test-results.md`](../test-results.md) | **Strategy:** [`test-strategy.md`](../test-strategy.md)

**Full archive:** [`_full-archive.md`](_full-archive.md)
