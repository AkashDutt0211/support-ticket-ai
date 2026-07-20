# Tests Layout

Root `tests/` satisfies the Requirements repository structure. Package tests live in `backend/tests/`, `frontend/tests/`, and `database/tests/`; **symlinks** at `tests/<package>/` point to those directories.

| Symlink | Canonical path | Command | Count |
|---------|----------------|---------|-------|
| [`tests/backend/`](backend/) | `backend/tests/` | `cd backend && npm test` | 57 |
| [`tests/frontend/`](frontend/) | `frontend/tests/` | `cd frontend && npm test` | 41 |
| [`tests/database/`](database/) | `database/tests/` | `cd database && npm test` | 16 |

**Total: 114 tests**

## Test tiers

| Tier | Location | Core requirement |
|------|----------|------------------|
| Integration (state machine) | `tests/backend/integration/tickets.integration.test.ts` | ✅ Mandatory |
| Unit (state machine pure fn) | `tests/backend/unit/ticketStateMachine.test.ts` | ✅ |
| Unit + component | `tests/frontend/`, `tests/backend/unit/` | Stretch evidence |

## Run all

```bash
nvm use 20
cd database && npm test
cd ../backend && npm test   # needs Docker
cd ../frontend && npm test
```

Results: [`test-results.md`](../test-results.md) | Strategy: [`test-strategy.md`](../test-strategy.md)
