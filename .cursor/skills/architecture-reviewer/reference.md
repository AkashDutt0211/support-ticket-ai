# Architecture Review — Extended Reference

## Core validation checklist

**Boundaries & ownership** — clear ownership; bounded contexts; identifiable data source of truth.

**Layering & dependencies** — layer separation; dependency direction inward; no forbidden cycles; loose coupling / high cohesion.

**Design quality** — appropriate patterns; justified abstractions; cross-cutting concerns in right layer; config isolated.

**Data, state & communication** — deliberate state placement; sync/async fit; workflow-level failure handling (timeouts, retries, idempotency).

**Evolution & ops** — extensible without wide ripples; migration/flag path; real not speculative reuse; bottleneck class understood.

**Risks** — likelihood and blast radius; drift from documented standards.

## Monolith / modular monolith

- Package dependency graph acyclic?
- Domain logic free of framework imports?
- Shared kernel size justified?

## Microservices / distributed

- Service granularity matches team boundaries?
- No shared DB anti-pattern?
- Saga/outbox/event ordering considered?
- Distributed transactions avoided or explicitly designed?

## Frontend / client architecture

- State colocation vs global store justified?
- Smart/dumb component boundaries?
- Side effects isolated (data fetching, routing)?

## Event-driven

- Idempotent consumers?
- Schema evolution strategy?
- Dead-letter and replay path?

## Anti-patterns to flag

- Shotgun surgery, divergent change, circular module imports
- Anemic domain model with logic in controllers/handlers
- Infrastructure leaking into domain
- Speculative generality (unused abstraction layers)
