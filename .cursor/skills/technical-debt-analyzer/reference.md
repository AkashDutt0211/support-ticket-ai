# Technical Debt — Extended Reference

## Core validation checklist

**Code quality** — single responsibility; clear naming; consistent errors; dead code removed.

**Complexity** — hotspots; nesting/god objects; conditional explosion candidates.

**Duplication** — copy-paste; near-duplicate utils; divergent implementations of same concept.

**Testing** — critical path coverage; behavior not implementation tests; edge/regression gaps.

**Documentation** — public APIs and invariants; stale README/runbooks; triaged TODO/FIXME.

**Drift** — inconsistent patterns; leaky abstractions; tangled deps (deep review → architecture-reviewer).

**Refactors** — safe extractions; incremental migration; prioritize blocking/high-churn debt.

## Common code smells

- Long method / god class / feature envy
- Primitive obsession; data clumps
- Switch statements duplicated across modules
- Speculative generality (unused abstractions)
- Shotgun surgery; divergent change

## Duplication signals

- Copy-paste with tiny variations
- Parallel inheritance hierarchies
- Multiple date/string/money formatters
- Repeated validation logic at every boundary

## Complexity metrics (qualitative)

- Files > 500 lines without clear module split
- Functions with many branches or parameters
- Cyclomatic complexity hotspots in change-prone areas
- Deep package cycles

## Testing debt

- No tests on bug-fix-heavy modules
- Integration tests absent for external boundaries
- Flaky tests ignored in CI
- Mocks asserting implementation details

## Documentation debt

- Undocumented env vars and feature flags
- Stale architecture diagrams
- Missing ADR for major past decisions
- Runbooks not updated after incidents

## Refactor patterns (safe increments)

- Extract function/module; introduce seam for testing
- Strangler fig for legacy subsystem replacement
- Branch by abstraction before large migration
- Boy scout rule scoped to touched files

## Prioritization heuristics

- **Impact × frequency** — how often is this code changed or breaks?
- **Risk of change** — blast radius of refactor; need characterization tests first
- **Coupling** — debt that blocks multiple teams ranks higher

## Anti-patterns in debt response

- Big-bang rewrite without migration path
- Refactoring unrelated code in feature PRs without scope
- Deleting tests to green CI
- Ignoring debt in on-call hot paths
