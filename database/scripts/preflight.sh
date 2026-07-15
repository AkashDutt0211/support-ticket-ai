#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if ! docker info >/dev/null 2>&1; then
  echo "ERROR: Docker is not running."
  echo "Start Docker Desktop, then run: npm run db:up"
  exit 1
fi

if ! docker compose ps --status running 2>/dev/null | grep -q postgres; then
  echo "ERROR: Postgres container is not running."
  echo "Run: npm run db:up"
  exit 1
fi

if ! docker compose exec -T postgres pg_isready -U ticket_user -d support_tickets >/dev/null 2>&1; then
  echo "ERROR: Postgres container is up but not ready yet."
  echo "Wait a few seconds, then retry."
  exit 1
fi

echo "Postgres ready (Docker on port 5433)"
