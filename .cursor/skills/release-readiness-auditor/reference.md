# Release Readiness — Extended Reference

## Core validation checklist

**Functional** — acceptance criteria met or waived; edge/error paths; kill switches for risky paths.

**Testing** — CI green; risk-appropriate coverage; manual QA where needed; load/soak if capacity-sensitive.

**Security** — proportionate review; auth/permission changes checked; no unmitigated Critical CVEs.

**Observability** — metrics/logs/traces on new paths; alerts/dashboards; no sensitive log leakage.

**Rollback/migration** — tested rollback; backward-compatible migrations; reversible config; backup for one-way transforms.

**Documentation** — user/API docs; on-call runbook; clear ownership/escalation.

**Ops** — deploy order; capacity plan; comms for visible changes; phased rollout if high blast radius.

## Pre-flight gates

- Requirements traceability: each acceptance criterion linked to test or demo evidence
- CI green on merge commit intended for release tag (not stale branch)
- No open Critical/High defects unless explicitly waived with owner sign-off
- Dependency and license changes reviewed if supply chain policy applies
- Rollback owner identified and available during deploy window

## Migrations

- Backward-compatible schema (expand) before code that depends on new shape
- Long-running migration: batched, monitored, with pause/resume plan
- Lock risk assessed (`ACCESS EXCLUSIVE` vs `CONCURRENTLY`)
- Data backfill progress metric; estimated completion before full traffic
- Down migration or forward-fix path if deploy fails mid-flight
- Replica lag threshold during migration; pause if exceeded

## Feature flags & gradual rollout

- Kill switch for new behavior without full redeploy
- Flag default safe for existing users (off or control variant)
- Percentage rollout plan: 1% → 10% → 50% → 100% with metric gates
- Flag evaluation logged for debugging wrong-variant reports
- Cleanup ticket to remove flag after stable GA period

## Multi-region & multi-tenant

- Deploy order across regions (primary first or low-traffic canary region)
- Config drift between regions checked (feature flags, limits, secrets version)
- Tenant-specific enablement documented if not global launch
- Cross-region dependency (global DB, CDN, DNS) failure modes noted
- Data residency or compliance constraints satisfied for exposed features

## Observability readiness

- Golden signals on new paths: latency, traffic, errors, saturation
- Dashboard linked in runbook; on-call can find it under incident stress
- Alerts: symptom-based (SLO burn) not only cause-based (CPU)
- Log volume estimate; no debug logging left at trace in production default
- Synthetic or smoke check covering critical user journey post-deploy

## Security & compliance sign-off

- Proportionate security review completed (full audit for high-risk surfaces)
- Secrets rotation if new credentials introduced
- Audit log events for sensitive actions if feature is admin/financial
- Pen test or compliance exceptions documented if applicable

## Rollback & forward-fix decision tree

- **Rollback** when: widespread errors, data corruption risk, SLO breach
- **Forward-fix** when: rollback worse (irreversible migration), fix is small and verified
- **Flag off** when: isolated feature surface, rest of release is sound
- Always define rollback verification metrics and max time to decide

## Documentation & support

- Customer-facing changelog and API docs published or scheduled with deploy
- Internal runbook: architecture sketch, flags, metrics, escalation
- Support/macros updated if user-visible behavior or errors change
- Known limitations and workarounds communicated to CS/sales if needed

## Anti-patterns to flag

- “Ship Friday” without on-call coverage or rollback plan
- Big-bang deploy of schema + code + config with no canary
- Missing alerts because “we’ll watch the dashboard manually”
- Tests only on happy path; no failure-mode or rollback test
- Release notes copy-pasted from PR titles without user impact summary
- GO based on local testing only for infra-sensitive change
