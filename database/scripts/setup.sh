#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

wait_for_docker() {
  for i in $(seq 1 45); do
    if docker info >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done
  return 1
}

echo "==> Step 1: Check Docker"
if ! docker info >/dev/null 2>&1; then
  echo "Docker not running. Trying to open Docker Desktop..."
  if [[ "$(uname)" == "Darwin" ]]; then
    open -a Docker 2>/dev/null || true
  fi
  echo "Waiting for Docker to start (up to 90s)..."
  if ! wait_for_docker; then
    echo ""
    echo "Docker still not ready."
    echo ""
    echo "Manual fix:"
    echo "  1. Open Docker Desktop from Applications"
    echo "  2. Wait until menu bar whale icon is steady"
    echo "  3. Run: docker ps"
    echo "  4. Run: npm run db:setup"
    echo ""
    exit 1
  fi
  echo "Docker is ready."
fi

echo "==> Step 2: Ensure .env exists"
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

echo "==> Step 3: Start Postgres container"
docker compose up -d

echo "==> Step 4: Wait for Postgres ready"
for i in $(seq 1 30); do
  if docker compose exec -T postgres pg_isready -U ticket_user -d support_tickets >/dev/null 2>&1; then
    echo "Postgres ready on port 5433"
    break
  fi
  if [ "$i" -eq 30 ]; then
    echo "Postgres did not become ready in time"
    docker compose logs postgres
    exit 1
  fi
  sleep 2
done

echo "==> Step 5: Run migrations"
npx prisma migrate deploy

echo "==> Step 6: Seed data"
npx prisma db seed

echo ""
echo "Done. Users, tickets, comments loaded."
echo "Optional: npm run db:studio"
