# API Design Review — Extended Reference

## Core validation checklist

**Modeling & naming** — domain nouns/verbs; consistent casing/pluralization; stable opaque IDs.

**Endpoints** — correct HTTP/RPC semantics; predictable paths; filter/sort/search; bulk partial-failure; async for long work.

**Contracts** — explicit schemas; boundary validation; consistent responses; null/omit rules; standard date/money/enum formats.

**Versioning** — explicit strategy; additive preferred; deprecation/sunset; no silent breaking defaults.

**Pagination** — lists paginate; cursor vs offset fit; limits and navigation documented.

**Errors** — correct status codes; stable machine-readable errors; retry guidance; distinct auth/rate-limit codes.

**Idempotency** — keys on costly POST; PUT/PATCH/ETag concurrency; idempotent DELETE.

**API security** — authn/authz per operation; tenancy boundaries; rate limits; minimal PII in lists.

**Docs** — schema sync with code; examples and error catalog; changelog for consumer-visible changes.

## REST / HTTP

- Resources over actions; use sub-resources and link relations before custom verbs
- `GET` safe and cacheable; `PUT` full replace; `PATCH` partial with defined merge semantics
- Prefer `201` + `Location` on create; `204` when no body; `409` for conflicts; `422` for semantic validation
- Use `ETag` / `If-Match` for optimistic concurrency where updates race
- `Cache-Control`, `ETag`, and conditional requests for read-heavy resources
- HATEOAS or stable link patterns only when clients benefit—avoid decorative hypermedia

## GraphQL

- Schema types map to domain concepts; avoid exposing raw persistence shapes
- Input types separate from output types; mutations named as verbs with clear payloads
- Pagination: cursor-based (`connections` / `edges`) for large lists
- N+1 and depth/complexity limits; cost analysis for expensive fields
- Error shape: partial data + `errors` array; extensions for codes without leaking internals
- Deprecation via `@deprecated` with reason and replacement field

## gRPC / Protobuf

- Package and service naming consistent; `rpc` names verb-noun or domain-standard
- Field numbers never reused; reserved ranges for deleted fields
- `oneof`, `optional`, and `repeated` semantics documented for clients
- Breaking vs non-breaking wire changes understood (`json_name`, enum aliases)
- Deadlines, retries, and idempotent retry policy documented per RPC
- `google.api.http` annotations align HTTP gateways with native gRPC semantics

## OpenAPI / AsyncAPI

- Spec version matches tooling; `operationId` stable for codegen
- Reusable `components/schemas`; shared error and pagination models
- Security schemes declared per operation; scopes documented
- Examples for success and common error responses
- AsyncAPI: channels, bindings, and schema evolution for event contracts

## Webhooks & async callbacks

- Signing secret or mTLS; timestamp + replay protection
- Delivery retries with exponential backoff; idempotent handler contract
- Event type versioning; payload schema registry or changelog
- Subscription lifecycle (create, rotate secret, disable) exposed in API

## Multi-tenancy & authz at the API edge

- Tenant ID in path, header, or claim—one consistent pattern
- List/search scoped to caller's tenant; no cross-tenant identifiers in responses
- Admin vs user operations separated in surface area or scopes

## Anti-patterns to flag

- Chatty APIs requiring many round-trips for one user action
- Inconsistent error JSON per endpoint
- Exposing internal IDs or implementation details (DB keys, queue names)
- `200 OK` with `{ "success": false }` instead of proper status codes
- Unbounded `limit` or unindexed filter combinations on list endpoints
- Breaking field renames without version bump or dual-write period
- Undocumented enum values or silent enum expansion breaking clients
