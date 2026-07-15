import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const migrationPath = resolve(
  __dirname,
  '../../prisma/migrations/20250714100000_init/migration.sql',
);

describe('init migration SQL', () => {
  const sql = readFileSync(migrationPath, 'utf8');

  it('creates required tables', () => {
    expect(sql).toContain('CREATE TABLE "users"');
    expect(sql).toContain('CREATE TABLE "tickets"');
    expect(sql).toContain('CREATE TABLE "comments"');
  });

  it('defines required enums for Core state machine', () => {
    expect(sql).toContain(`CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'CANCELLED')`);
    expect(sql).toContain(`CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')`);
    expect(sql).toContain(`CREATE TYPE "UserRole" AS ENUM ('AGENT', 'ADMIN', 'REQUESTER')`);
  });

  it('enforces unique user email', () => {
    expect(sql).toContain('CREATE UNIQUE INDEX "users_email_key"');
  });

  it('indexes ticket status for filter queries', () => {
    expect(sql).toContain('CREATE INDEX "tickets_status_idx"');
    expect(sql).toContain('CREATE INDEX "tickets_created_at_idx"');
  });

  it('defines foreign keys with cascade on comment delete', () => {
    expect(sql).toContain('FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE CASCADE');
    expect(sql).toContain('FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT');
  });

  it('defaults new tickets to OPEN status', () => {
    expect(sql).toContain('"status" "TicketStatus" NOT NULL DEFAULT \'OPEN\'');
  });
});
