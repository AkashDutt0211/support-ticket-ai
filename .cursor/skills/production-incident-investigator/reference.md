# Production Incident Investigation — Extended Reference

## Core investigation checklist

**Symptoms** — user-visible impact; SLO/error budget; bounded scope (service/tenant/region).

**Timeline** — start from metrics not report time; correlate deploys/config/traffic; record mitigations with UTC timestamps.

**Root cause** — trigger; mechanism; primary cause vs contributing factors (capacity, guardrails, alerts).

**Evidence** — claims tied to logs/metrics/traces; ruled-out hypotheses noted.

**Recovery** — safe reversible mitigation; verification metrics; data repair if needed.

**Prevention** — detection gaps; long-term fixes with owners.

## First 15 minutes

- Confirm user impact scope (region, tenant, feature) vs internal-only noise
- Identify incident commander / comms owner if org uses formal roles
- Stabilize: rollback, scale, disable flag, or circuit-break dependency—one change at a time
- Preserve evidence: note exact UTC times before logs rotate or deploy overwrites

## Timeline reconstruction

- Align clocks: use UTC in tables; correlate deploy CI timestamps with metric shifts
- Layer signals: synthetic → edge → app → DB → dependency (narrow blast radius)
- Distinguish **detection time** vs **start time** (error may predate alert)
- Record every mitigation and whether it helped (avoid false “resolved”)

## Cascading failures

- Retry storms amplifying load on failing dependency
- Thread/connection pool exhaustion after slow downstream
- Cache stampede after TTL expiry or cold start
- Circuit breaker open causing secondary failures in callers
- Autoscale lag vs traffic step function
- DNS/config propagation delay across regions

## Dependency & infrastructure incidents

- Third-party API outage or rate-limit change
- Certificate expiry, TLS mismatch, or clock skew
- Load balancer health check misconfiguration
- Disk full, inode exhaustion, or OOM killer on nodes
- Network partition or security group change
- Message queue backlog growth and consumer stall

## Data incidents

- Incorrect migration or backfill corrupting rows
- Dual-write inconsistency between primary store and cache/search index
- Idempotency key collision causing duplicate charges or records
- Replication lag serving stale reads after write
- Accidental delete/truncate; need PITR or backup restore scope

## Deploy & config rollbacks

- Roll back application before schema if migration is forward-only
- Feature flag off faster than full deploy when available
- Config-only rollback (env vars, rate limits) vs artifact rollback
- Verify rollback: error rate, latency, saturation—not only “deploy succeeded”
- Document partial rollback state (mixed versions across replicas)

## Useful queries (adapt to stack)

- Error rate by endpoint/service vs baseline same day last week
- Latency p95/p99 split by dependency span in traces
- Saturation: CPU, memory, connections, queue depth, DB `active_connections`
- Deploy markers overlaid on metric charts
- Log pattern count for new stack trace or error code since T0

## Communication

- Status: impact, scope, workaround, next update time—no root cause until evidenced
- Separate **customer messaging** from **technical RCA** draft
- Track action items with owners before incident closes

## Post-incident follow-up

- Blameless postmortem: timeline, root cause, contributing factors, action items
- Action items: detection (alert), prevention (code/config), process (runbook)
- Verify fixes with regression test or game day where appropriate

## Anti-patterns to flag

- Declaring root cause from single log line without corroboration
- Multiple simultaneous mitigations with no isolation of effect
- Fixing symptoms (restart) without understanding mechanism
- Closing incident before error budget / user impact actually recovered
- Skipping timeline because “we already rolled back”
