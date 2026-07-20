# Review Fixes

Issues found during Step 4 AI-assisted screening (`/context-aware-bug-hunter`). Fixed after human approval (Prompt 13).

---

## Fix 1 — Status TOCTOU race

### Problem

Two concurrent status updates could both read the same `from` status and both succeed.

### Fix

Atomic `updateMany WHERE id = ? AND status = expected` in `ticketRepository.updateStatus()`.

### Files

- [`backend/src/repositories/ticketRepository.ts`](backend/src/repositories/ticketRepository.ts)
- [`backend/src/services/ticketService.ts`](backend/src/services/ticketService.ts)
- [`backend/tests/unit/ticketService.test.ts`](backend/tests/unit/ticketService.test.ts)

---

## Fix 2 — CommentForm clears before API success

### Problem

Form cleared optimistically; failed API call lost user input.

### Fix

`await onSubmit()` before clearing; rethrow on error.

### Files

- [`frontend/src/components/comments/CommentForm.tsx`](frontend/src/components/comments/CommentForm.tsx)
- [`frontend/tests/components/CommentForm.test.tsx`](frontend/tests/components/CommentForm.test.tsx)

---

## Fix 3 — useTicket refetch nulls ticket on error

### Problem

Failed refetch set ticket to `null`, wiping visible data.

### Fix

Preserve existing ticket state on fetch error.

### Files

- [`frontend/src/hooks/useTicket.ts`](frontend/src/hooks/useTicket.ts)

---

## Fix 4 — Stale fetch races

### Problem

Rapid search/filter changes could apply out-of-order responses.

### Fix

`AbortController`, request-id guard, `useDebouncedValue` (300ms).

### Files

- [`frontend/src/hooks/useTickets.ts`](frontend/src/hooks/useTickets.ts)
- [`frontend/src/hooks/useDebouncedValue.ts`](frontend/src/hooks/useDebouncedValue.ts)

---

## Fix 5 — Prisma P2025 → 500

### Problem

Record-not-found Prisma error returned 500 instead of 404.

### Fix

Map `P2025` to `NotFoundError` in error handler.

### Files

- [`backend/src/middleware/errorHandler.ts`](backend/src/middleware/errorHandler.ts)
- [`backend/tests/unit/errorHandler.test.ts`](backend/tests/unit/errorHandler.test.ts)
