# Acceptance Criteria — Support Ticket Management System

## Step 1: Database — complete

## Step 2: Backend API — complete

---

## Step 3: React Frontend — complete

### From Requirements Core Acceptance Criteria (UI slice)

- [x] User can create a ticket via the UI
- [x] User can view all tickets from the database
- [x] User can open a ticket detail view
- [x] User can update ticket fields and reassign
- [x] User can add comments
- [x] Status changes only through valid transitions in UI
- [x] Invalid transitions show clear error (422 from API)
- [x] Keyword search works in UI
- [x] Status filter works in UI
- [x] Meaningful error states for 400/404/422/500/network

### Pages & navigation

- [x] `/` — ticket list with search + status filter
- [x] `/tickets/new` — create form
- [x] `/tickets/:id` — detail, edit, status, comments
- [x] Acting user selector in header

### State machine UI

- [x] OPEN shows: In Progress, Cancelled
- [x] IN_PROGRESS shows: Resolved, Cancelled
- [x] RESOLVED shows: Closed
- [x] CLOSED / CANCELLED show no transition buttons
- [x] 422 shows user-friendly error banner

### API integration

- [x] All API endpoints used correctly
- [x] `VITE_API_URL` in `.env.example`
- [x] CORS works with backend on 3001

### Tests (Core)

- [x] StatusActions component tests pass
- [x] TicketForm validation test passes
- [x] 9 tests pass on Node 20

### Architecture

- [x] Fetch in hooks/api — not in presentational components
- [x] State machine in pure utils
- [x] TypeScript strict — no `any`

---

## Step 4: Submission artifacts — complete

- [x] `tool-workflow.md` — Part A AI workflow
- [x] `SUBMISSION-FORM-ANSWERS.md` — online form answers in repo
- [x] `requirement-analysis.md` — full requirement breakdown
- [x] `ai-prompt-history.md` — verbatim prompts + iteration log
- [x] `reflection.md` — reflection
- [x] `PR_DESCRIPTION.md` — PR summary + test plan
- [x] `debugging.md` — resolved + screening fixes
- [x] Full-app screening + 5 bug fixes
