# TypeScript typings from sample data (org playbook)

**Purpose:** Define how to turn a JSON payload, fixture, or representative object into **strict, production-ready TypeScript** types and interfaces—whether a human writes them, an assistant suggests them, or an IDE-integrated tool generates them.

**Scope:** API contracts, client/server boundaries, fixtures, and mock data. Intent: **accurate modeling**, **strong structural inference**, **no unsafe escape hatches**, and **contract-grade** definitions.

---

## 1. Inputs (provide one or more)

Use the best available source, in this priority order:

1. **Pasted JSON or JavaScript object literal** in the task description or attached file.
2. **Fixture or sample file** (e.g. `*.json`, `*.fixture.ts`, recorded API response) referenced by path or pasted excerpt.
3. **Repository context** when only paths are given: read the indicated file(s) or directory contents that contain representative payloads.

**Placeholder for operators:** attach or paste sample data where your workflow allows (ticket, doc, chat, PR description, snippet file).

---

## 2. Objective

From the provided data, produce TypeScript that satisfies:

- Accurate type modeling of the sample.
- Strong inference of structure (shapes visible in types).
- **Zero** use of `any`, `unknown`, or a generic untyped `object` as a stand-in for real structure.
- Definitions suitable as **API-contract** or module boundary types.

---

## 3. Engineering rules (apply strictly)

### 3.1 Strict typing

- Do **not** use `any`, `unknown`, or a bare generic `object` to represent known fields.
- Prefer explicit, fully defined types; every field should be strongly typed.

### 3.2 Dynamic keys

If keys look dynamic (UUIDs, hashes, timestamps, opaque IDs, arbitrary strings):

- Do **not** hardcode each key as a separate property name.
- Use `Record<string, T>` or an appropriate index signature with a well-typed value type.

### 3.3 Arrays and polymorphism

If an array mixes multiple object shapes:

- Look for discriminator fields (`type`, `role`, `status`, `kind`, etc.).
- Prefer **discriminated unions** over large optional-field blobs.
- Avoid marking everything optional unless the sample truly varies that way.

### 3.4 Casing normalization

- Normalize API-style names (**snake_case** / **kebab-case**) to **camelCase** in TypeScript.
- Preserve traceability: add a JSDoc line for the wire name, e.g. `/** API: created_at */`.

### 3.5 Inference heuristics

- ISO-like date strings → `Date | string` (or stricter if your codebase standard says otherwise—state the choice).
- Enumerated string values seen in the sample → **string literal unions** (e.g. `'PENDING' | 'SUCCESS'`).
- Stay strict; do not widen to `string` or `number` when literals are justified by the sample.

### 3.6 Modularity

- Extract nested objects into **named, reusable** interfaces or type aliases.
- Use **PascalCase** for type/interface names.
- Keep nesting shallow enough for reuse and reviewability.

---

## 4. Required deliverables

### 4.1 Generated TypeScript

- Complete, **copy-paste-ready** TypeScript (not pseudo-code or partial sketches).
- Safe to import into a real module; use `readonly` on properties where immutability matches usage.
- No placeholders like `// TODO: fill in` for fields that are present in the sample.

### 4.2 Design notes (brief)

Explain non-obvious choices:

- Dynamic key handling.
- Discriminated unions vs alternatives.
- Casing / rename mapping.
- Any inference calls (e.g. date unions, literal widening avoided).

### 4.3 Verification checklist

End with a short checklist covering:

- Nullable / optional assumptions vs the sample.
- Patterns inferred from few examples (risk of overfitting).
- Possible **mismatch with the real backend** if the sample is incomplete.
- Fields that **must be validated** against the authoritative API spec or OpenAPI/schema.

---

## 5. How teams can use this

- **Internal wiki / design doc:** Link this playbook; attach one canonical sample response per endpoint or resource.
- **IDE assistants:** Paste this file or a link plus the JSON/fixture; any tool that follows instructions can align to the same bar.
- **Code review:** Use sections 3–4 as a rubric for generated or hand-written types.
- **CI / codegen:** Human or automated generators should implement the same rules where machine-readable schemas are unavailable.

---

## Version note

When the authoritative API changes, update the **sample payload** and regenerate or adjust types; treat this document as the **process and quality bar**, not the source of truth for field names (that remains the backend contract or schema).
