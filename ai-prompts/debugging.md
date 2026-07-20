# Prompt History — Debugging

**Tool:** Cursor | **Activity:** Error diagnosis from pasted terminal output

Format: Problem → Investigation → AI help → Human validation → Fix

---

## Issue 1 — P1000 Authentication failed

### Problem

Prisma `P1000` on migrate/seed.

### How I Investigated

Pasted full terminal output to Cursor.

### How AI Helped

Diagnosed Docker not running; local Postgres on 5432 wrong credentials.

### What I Validated

Started Docker, ran `npm run db:setup` — resolved.

### Final Fix

Port **5433** in `docker-compose.yml`, `db:preflight` script.

---

## Issue 2 — Vitest ESM / Node 16

### Problem

`ERR_REQUIRE_ESM`, `crypto.getRandomValues is not a function`

### How AI Helped

Renamed config to `.mjs`; added Node 20 preflight.

### Final Fix

`vitest.config.mjs`, `check-node.mjs`, `.nvmrc`

---

## Issue 3 — Shell comment paste

### Problem

`npm test # comment` passed `#` as arg to tsc.

### Final Fix

README warnings — one command per line.

---

**Full details:** [`debugging-notes.md`](../debugging-notes.md)  
**Full archive:** [`_full-archive.md`](_full-archive.md)
