# Acceptance Criteria

## Core

- [x] User can create a ticket via the UI
- [x] User can view all tickets from the database
- [x] User can open a ticket detail view
- [x] User can update ticket fields and reassign
- [x] User can add comments
- [x] Status changes only through valid transitions; invalid ones are rejected (backend + UI)
- [x] Keyword search and status filter work
- [x] Data remains available after restart (Docker volume + PostgreSQL)
- [x] Seeded users available for assignee / acting-user selection (no user CRUD UI)

## Validation

- [x] Required fields validated at backend (Zod)
- [x] Invalid enum values rejected (priority, status)
- [x] Title length enforced (max 200)
- [x] Client-side validation before submit (forms)
- [x] No secrets committed — `.env.example` only

## Error Handling

- [x] 400 validation errors shown in UI (field-level where applicable)
- [x] 404 for missing ticket/user
- [x] 422 for invalid status transitions with clear message
- [x] 500 / network errors show generic user-friendly banner
- [x] No stack traces exposed to client

## Testing

- [x] State-machine integration tests — valid transitions succeed, invalid rejected
- [x] Unit tests for state machine pure functions
- [x] Unit + component tests for frontend status UI and forms
- [x] **114 total automated tests** across database, backend, frontend

## Documentation

- [x] README setup instructions (root + per-package)
- [x] Full prompt history under `ai-prompts/`
- [x] Requirement analysis, design notes, test strategy, debugging notes, reflection
- [x] PR description and Cursor workflow artifacts in `tool-specific/cursor-workflow/`
