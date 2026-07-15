# Database Optimization — Extended Reference

## Core validation checklist

**Schema** — appropriate keys; normalization trade-offs; column types; indexed filter columns (tenant, soft-delete).

**Indexes** — support WHERE/JOIN/ORDER BY/FK on hot paths; no redundant indexes; composite order; partial/covering where useful.

**Queries** — no unjustified full scans; narrow SELECT; ORM N+1; keyset pagination over large offsets.

**Joins/aggregations** — sargable predicates; no cartesian products; materialize heavy reads; indexed GROUP BY.

**Transactions** — minimal scope; right isolation; deadlock/retry; hot-row lock risk.

**Connections** — pool sizing; no leaks; parameterized statements.

**Growth/ops** — archival/partition/shard path; online-safe migrations; replica lag for heavy readers.

## PostgreSQL

- Use `EXPLAIN (ANALYZE, BUFFERS)` for hot queries; watch seq scans on large tables
- Prefer B-tree for equality/range; GIN/GiST for full-text, JSONB, arrays, geo
- Partial indexes for filtered subsets (`WHERE deleted_at IS NULL`)
- Covering indexes (`INCLUDE`) to avoid heap fetches on index-only scans
- `CREATE INDEX CONCURRENTLY` for online index adds; monitor invalid indexes
- Keyset pagination (`WHERE id > $cursor ORDER BY id LIMIT n`) over large offsets
- Avoid long transactions holding row locks; watch `pg_locks` and `idle in transaction`
- Connection pooling (PgBouncer); statement timeout and `lock_timeout` set
- Vacuum/autovacuum health; bloat on heavily updated tables
- Read replicas: replication lag, routing read-your-writes sensitive queries to primary

## MySQL / MariaDB

- `EXPLAIN` / `EXPLAIN ANALYZE` (8.0+) for access type and rows examined
- InnoDB: clustered PK choice affects secondary index size and insert patterns
- Composite index left-prefix rule; avoid redundant indexes on column subsets
- `LIMIT` with high offset costly; use keyset on indexed sort column
- Transaction isolation (`REPEATABLE READ` gap locks); keep transactions short
- Buffer pool hit ratio; slow query log for patterns above threshold

## SQLite (embedded / edge)

- WAL mode for concurrent readers; busy timeout configured
- Appropriate indexes on FK and filter columns; `ANALYZE` after bulk load
- Batch writes in transactions; avoid per-row commits in loops

## NoSQL (MongoDB, DynamoDB, etc.)

- Query patterns drive schema; avoid unbounded collection scans
- Compound indexes match filter + sort order; covered projections where supported
- Shard/partition key aligned with access pattern; hot shard risk
- TTL indexes for ephemeral data; document size growth and index cardinality
- Consistency level vs latency trade-offs on reads/writes

## ORM & query builders

- N+1 from lazy loading: eager load, joins, or batch `IN` queries
- `SELECT *` and wide entity graphs in list endpoints
- Implicit casts preventing index use (e.g. string column compared as number)
- Pagination implemented as `OFFSET` in ORM without override
- Raw SQL bypassing parameterization (security → security-auditor)

## Migrations

- Expand/contract: add column → dual-write → backfill → switch reads → drop old
- Backfills in batches with sleep to avoid lock storms and replication lag
- Non-null + default on large tables: add nullable → backfill → enforce NOT NULL
- Index create online; drop unused indexes after usage verification
- Reversible down migrations tested; destructive changes require backup/snapshot plan

## Anti-patterns to flag

- Unindexed foreign keys and filter columns on high-traffic tables
- Functions on indexed columns in WHERE (`WHERE YEAR(created_at) = 2024`)
- Leading wildcard `LIKE '%foo'` without trigram/full-text strategy
- `COUNT(*)` on huge tables for UI pagination totals every request
- Serializable isolation everywhere “to be safe”
- Storing large blobs in row; hot rows wider than cache line efficiency
- Missing connection pool limits exhausting DB `max_connections`
