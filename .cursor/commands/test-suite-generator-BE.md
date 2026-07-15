Act as a **Staff/Principal Backend Engineer** specializing in **Node.js test architecture**. Analyze the bound artifact and produce a **production-grade, runnable unit test suite** with strong edge-case and failure-path coverage for APIs, workers, data layers, and related backend logic.

### 0) Artifact binding (do this first; max 2 lines)

Identify the **primary artifact** using the **first available** source:

1. Host-provided / pasted code for this task
2. Current editor selection
3. `@File` / `@Folder` / attached paths
4. Active editor buffer **only if** §0.1 classifies it as in-scope code

Write one line: `Primary artifact: <path | "selection" | "pasted block"> — <language/stack if clear>`.

If no valid source artifact (per §0.1), output only: (1) what is missing, (2) three concrete actions (paste snippet / select code / `@path`), then **stop**. Do not analyze this command text itself.

Do not spend more than one short sentence on lower-priority inputs that were absent.

#### 0.1) What counts as code under test

Treat as **in scope**: typical backend implementation sources (e.g. `.ts`, `.js`, `.mjs`, `.cjs`), API handlers, middleware, workers, services, repositories, queue consumers, and `.json` only when clearly runtime or test config—not prose.

Treat markdown prompts, commands, skills, rules, or templates as **NOT** default scope unless the user explicitly `@`'d them.

If the active file is in the “NOT default” category and was not `@`'d, follow the stop path in §0.

### 1) Scope & objectives

- **In scope:** Node.js-oriented stacks—HTTP APIs, middleware, persistence, messaging, caching, workers. Adjust framework names to match the repo.
- Maximize **behavioral** coverage with minimal redundant tests; focus on business logic, failure paths, reliability, and data integrity.
- Produce **maintainable**, **deterministic** tests; **minimize mocking**; output **directly runnable** tests (or clearly scoped stubs with documented gaps).
- If inputs are incomplete, record assumptions under **Missing testability concerns**.

### 2) Framework & tooling

- **Detect first:** infer test runner, assertion style, and conventions from `package.json`, config files, and existing tests.
- **Reuse** declared dependencies; do not add libraries unless the repo has no test stack.
- **If no stack exists**, choose the smallest appropriate set (e.g. Jest/Vitest, Supertest for HTTP, Nock or equivalent, Sinon or built-in mocks, Testcontainers only when justified).
- One clear rationale per new dependency; avoid sprawl.

### 3) Pre-write analysis

**Discover** (as applicable): business rules and validations; external integrations (HTTP, queues, SDKs); data flows and transformations; failure paths and compensating actions; retry/resilience/idempotency; concurrency and ordering; caching (TTL, invalidation); security-sensitive behavior (authZ, input handling).

**Locate layers:** services/domain, controllers/handlers, middleware, repositories, event/queue consumers, caching.

**Infer:** required mocks (external IO, clock, randomness, network); setup/teardown (DB, containers, env); data contracts (schemas, DTOs).

**Prioritize:** critical branches, high-risk scenarios, regression-prone logic—drive **what** to test first, not only happy paths.

### 4) Coverage checklist

Cover **when present** in the code under test; skip with a one-line rationale only if truly inapplicable.

- **Logic & validation:** happy paths, rule validation, transforms, state transitions; null/missing/invalid types, empty values, boundaries, malformed payloads.
- **Errors & resilience:** thrown/mapped errors, external failures (4xx/5xx, network), unexpected responses, timeouts, retry exhaustion.
- **HTTP (handlers/controllers):** success responses, validation failures, authN/authZ failures, malformed requests, rate limiting if implemented.
- **Persistence (repositories):** success paths, driver/query failures, missing records, duplicates/conflicts, transaction failures.
- **Async & concurrency:** resolution/rejection, parallel handlers, race-sensitive ordering, retry logic.
- **Caching:** hits/misses, invalidation, stale reads when defined.
- **Integrations:** timeouts, retries, circuit breaker behavior, malformed/partial responses.
- **Layer notes — services:** business rules, dependency failures, retry/circuit behavior. **Middleware:** auth, error propagation. **Regression:** hidden branches, defaults, fallbacks, historically fragile areas.

### 5) Test design standards

- **Behavioral** assertions (observable outcomes, not implementation trivia).
- **Table-driven** tests for repetitive cases (Jest/Vitest `each` or equivalent).
- Centralize setup; avoid copy-pasted arrange blocks.
- **Mock at boundaries:** external systems and non-deterministic deps—not internal business rules unless unavoidable.
- **Deterministic:** fixed time, controlled randomness, isolated state.
- **Naming:** `should <expected_behavior> when <condition>` (or team convention).

### 6) Deliverables & rules

Produce:

1. **Complete runnable test file(s)** (or clearly marked TODO blocks only where blocked, with reason).
2. **Coverage summary:** modules/behaviors covered; notable gaps.
3. **Missing testability concerns:** tight coupling, untestable globals, missing seams—suggest the **smallest safe refactor** if code cannot be tested as-is.

**Do not:** ship pseudo-code as runnable tests; narrate obvious implementation detail; rewrite production code except minimal testability changes called out separately.

- Do not analyze this command markdown as the system under test.
