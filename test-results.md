# Test Results

**Last run:** 2026-07-14 | **Node:** 20.x | **Docker:** required for backend integration tests

## Summary

| Package | Command | Unit | Integration | Total | Status |
|---------|---------|------|-------------|-------|--------|
| `database/` | `npm test` | 16 | — | **16** | ✅ Pass |
| `backend/` | `npm test` | 45 | 12 | **57** | ✅ Pass |
| `frontend/` | `npm test` | 41 | — | **41** | ✅ Pass |

**Grand total: 114 automated tests**

## State machine integration tests (mandatory Core tier)

File: [`backend/tests/integration/tickets.integration.test.ts`](backend/tests/integration/tickets.integration.test.ts)

| Scenario | Expected | Result |
|----------|----------|--------|
| OPEN → IN_PROGRESS | 200 | ✅ |
| IN_PROGRESS → RESOLVED | 200 | ✅ |
| RESOLVED → CLOSED | 200 | ✅ |
| OPEN → CANCELLED | 200 | ✅ |
| IN_PROGRESS → CANCELLED | 200 | ✅ |
| Invalid transitions (e.g. CLOSED → OPEN) | 422 | ✅ |
| Atomic status update (race) | 409/422 | ✅ |

## How to reproduce

```bash
nvm use 20
cd database && npm test
cd ../backend && npm test    # requires Docker on 5433
cd ../frontend && npm test
```

## Notes

- Backend integration tests need `docker compose up` in `database/`
- All packages use `vitest.config.mjs` + Node 20 preflight check
