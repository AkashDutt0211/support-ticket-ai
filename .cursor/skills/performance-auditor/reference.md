# Performance Review — Extended Reference

## Core validation checklist

**Algorithms** — complexity fits input size; no accidental O(n²)+ in hot paths; structures match access patterns.

**Memory** — no unbounded buffers/caches; stream large payloads; pooling only if profiled.

**CPU** — heavy work off critical path; no redundant parse/validate; parallelism without churn.

**I/O & network** — minimize N+1 round-trips; batch/pipeline; timeouts/backpressure; reasonable payloads.

**DB (app layer)** — flag suspicious ORM; no unbounded queries; short transaction scope.

**Caching** — keys/TTL/invalidation; stampede risk; miss load acceptable.

**Concurrency** — lock contention; bounded pools/connections/FDs/goroutines.

## Web & API servers

- Sync blocking I/O on request threads
- Unbounded in-memory request/response buffering
- JSON/XML serialization of large graphs on hot paths
- Missing HTTP keep-alive or connection pool exhaustion

## Frontend / mobile (when in scope)

- Main-thread blocking; layout thrashing
- Unvirtualized long lists; excessive re-renders
- Large bundle or image payloads without lazy load

## Batch & background jobs

- Single-threaded bottlenecks on partitionable work
- Missing checkpointing for long jobs
- Retry storms without jitter or circuit breakers

## Caching patterns

- Cache-aside vs read-through vs write-through fit
- TTL too long (staleness) vs too short (churn)
- Local vs distributed cache consistency

## Concurrency

- Lock convoys; coarse-grained locks on hot structures
- False sharing and unnecessary synchronization
- Unbounded worker pools under load spikes

## Measurement guidance

- Profile before optimizing; compare p50 vs p95 vs p99
- Load test with realistic payload and concurrency
- Watch GC pauses, allocation rate, and syscall count

## Anti-patterns to flag

- Premature optimization without evidence
- Micro-benchmarks that don't reflect production paths
- Caching everything with no invalidation strategy
- Parallelism that increases total CPU due to overhead
