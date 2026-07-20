# Schema & Migrations

Canonical location for database schema and versioned migrations.

| Artifact | Path |
|----------|------|
| Prisma schema | [`schema.prisma`](schema.prisma) → `database/prisma/schema.prisma` |
| SQL migrations | [`migrations/`](migrations/) → `database/prisma/migrations/` |

## Apply migrations

```bash
cd database
npm run db:migrate
```

## Create new migration (if extending)

```bash
cd database
npx prisma migrate dev --name <description>
```
