# Candidate Information

Name: Akash Dutt / Role: Associate Tech Lead / Primary Technology Stack: React, Node.js, TypeScript, PostgreSQL

Primary AI Tool Used: **Cursor** / Project Option Selected: **Support Ticket Management System (Core)**

Assessment Start Date: 2026-07-14 / Submission Date: 15/07/2026

## Project Summary

AI-assisted full-stack Support Ticket Management System — mandatory Core scope with lifecycle artifacts demonstrating requirement analysis, spec-driven development, testing, debugging, code review, and reflection.

## Tools Used

| Tool | Purpose |
|------|---------|
| Cursor (Agent + Plan mode) | Planning, implementation, debugging, review commands |
| `.cursor/rules/` | Persistent coding standards |
| `tool-specific/cursor-workflow/` | Spec, tasks, acceptance criteria |
| PostgreSQL 16 + Prisma | Database persistence |
| Vitest + Supertest + RTL | Automated tests |

## Setup Summary

1. `cd database && nvm use 20 && cp .env.example .env && npm run db:setup`
2. `cd backend && cp .env.example .env && npm run dev` → http://localhost:3001
3. `cd frontend && cp .env.example .env && npm run dev` → http://localhost:5173

Full instructions: [`README.md`](README.md)
