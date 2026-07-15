#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Prisma schema validate"
npx prisma validate

echo "==> Typecheck seed script"
npx tsc --noEmit -p tsconfig.json

echo "==> Migration files present"
test -f prisma/migrations/20250714100000_init/migration.sql
test -f prisma/migrations/migration_lock.toml

echo "==> Generate Prisma client"
npx prisma generate

if docker info >/dev/null 2>&1; then
  echo "==> Docker available — running live checks"
  docker compose up -d
  for i in $(seq 1 30); do
    if docker compose exec -T postgres pg_isready -U ticket_user -d support_tickets >/dev/null 2>&1; then
      echo "Postgres ready"
      break
    fi
    sleep 2
  done
  npx prisma migrate deploy
  npm run db:seed

  TICKET_COUNT=$(docker compose exec -T postgres psql -U ticket_user -d support_tickets -tAc "SELECT COUNT(*) FROM tickets;")
  echo "Ticket count: ${TICKET_COUNT}"

  docker compose restart postgres
  sleep 5
  TICKET_COUNT_AFTER=$(docker compose exec -T postgres psql -U ticket_user -d support_tickets -tAc "SELECT COUNT(*) FROM tickets;")
  echo "Ticket count after restart: ${TICKET_COUNT_AFTER}"

  if [ "${TICKET_COUNT}" != "${TICKET_COUNT_AFTER}" ] || [ "${TICKET_COUNT}" -lt 1 ]; then
    echo "Persistence check failed"
    exit 1
  fi

  echo "==> Live checks passed"
else
  echo "==> Docker not running — static checks only (start Docker and re-run for live verify)"
fi

echo "All checks passed"
