# Security Review — Extended Reference

## Core validation checklist

**Authentication** — protected routes; session/token lifecycle; sound credential handling; MFA for high-risk ops.

**Authorization** — server-side checks every sensitive op; ownership/tenancy; privilege escalation paths; gated admin/debug.

**Input/output** — validate at boundaries; context-appropriate encoding; safe uploads; safe deserialization/templates.

**Injection** — SQL/command/LDAP/template prevented; no eval/unsafe deserialization; GraphQL depth/cost limits.

**Secrets** — no hardcoded secrets; secure stores; not in logs/errors; scoped rotatable tokens.

**Crypto** — strong algorithms; TLS with validation; CSPRNG where needed.

**Sensitive data** — minimize PII; mask logs; safe errors; safe cache headers.

**Dependencies** — known CVEs; lockfiles; CI secrets not in artifacts.

**Config** — CORS/CSP/HSTS; no debug in prod paths; rate limits on auth/expensive ops.

## OWASP-aligned categories

- **Broken access control** — IDOR, missing function-level checks, path traversal
- **Cryptographic failures** — weak algorithms, hardcoded keys, cleartext storage
- **Injection** — SQL, OS, LDAP, template, header injection
- **Insecure design** — missing rate limits, trust boundary violations
- **Security misconfiguration** — default creds, verbose errors, open admin ports
- **Vulnerable components** — outdated libs, typosquatting, unpinned deps
- **Auth failures** — weak session, credential stuffing surface, JWT misconfig
- **Integrity failures** — unsigned updates, CI/CD pipeline trust
- **Logging failures** — no audit trail for sensitive actions; secrets in logs
- **SSRF** — user-controlled URLs fetching internal resources

## Cloud & IaC

- Overly permissive IAM roles and security groups
- Public S3/blob buckets; world-readable secrets stores
- Metadata service exposure from workloads
- Secrets in Terraform state or environment variables in images

## API & web specifics

- CSRF on state-changing browser requests
- Mass assignment on object updates
- Open redirects and host header attacks
- GraphQL introspection and batching abuse in production

## Mobile & client

- Sensitive data in local storage without protection
- Certificate pinning bypass in debug builds shipping to prod
- Deep links handling auth tokens insecurely

## Anti-patterns to flag

- Security by obscurity; client-side-only validation
- `disable_ssl_verification` or `InsecureSkipVerify`
- Logging full request bodies containing passwords or tokens
- Generic error messages in dev copied to production without sanitization
