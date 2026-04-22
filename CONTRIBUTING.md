# Contributing to nexus-dnn

This document is the canonical contributor checklist. The full
engineering principles live in `.specify/memory/constitution.md`; the
file-path discipline for the host↔extension boundary lives in
`.claude/rules/host-extension-boundary.md`.

## Pre-merge gates

Every PR that touches host crates MUST pass the following before merge:

### 1. Workspace builds and tests are green

```bash
cargo check --workspace
cargo test --workspace
```

Each commit MUST leave the workspace green-building so `git bisect` is
useful (constitution Principle IX).

### 2. Frontend type-check + tests + scans

```bash
pnpm -F apps/web tsc --noEmit
pnpm -F apps/web test
pnpm -F apps/web run scan:theme
pnpm -F apps/web run scan:terminology
pnpm -F apps/web run scan:cdn
```

### 3. Boundary audit (constitution Principle XIII, NON-NEGOTIABLE)

The host MUST NOT contain extension-specific identifiers, types,
endpoints, tables, or business logic. The audit script gates this:

```bash
bash extensions/builtin/local-llm/scripts/audit-boundary.sh
```

Exit code 0 (PASS) is required. The script greps the host scan paths
(`crates/`, `apps/web/src/views/`, `migrations/`) for extension-id
literals and reports any unallowed match. The allowlist inside the
script documents every legitimate exception (backend-family names, the
permitted XIII.3 startup-wiring seam, generated DTOs, the test-file
carve-out, and the explicitly-grandfathered frontend coupling listed in
the project rule file).

When a new extension lands, it MUST add its own
`extensions/builtin/<ext-id>/scripts/audit-boundary.sh` (or extend the
existing script's pattern set) and wire it to CI per Principle XIII.7.

### 4. Conventional commit prefix

Use the standard prefixes: `feat`, `fix`, `refactor`, `docs`, `chore`,
`test`, `perf`, `ci`. Branch off `main` as `NNN-feature-slug`. Merges to
`main` use `--no-ff`. Force-push to `main` is forbidden.

### 5. Spec-driven workflow for non-trivial changes

Features flow through:
`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` →
`/speckit.analyze` → `/speckit.implement`.

Skipping `analyze` is permitted for trivial bug fixes only.

## What to do when the boundary audit fails

1. **Read the failure line** — the script prints the exact file + line
   that contains an extension-id literal.
2. **Decide which is true**:
   - The reference is genuine new coupling → fix it (move the code into
     the extension subproject, parameterize the constant, or use the
     generic dispatcher contract).
   - The reference is legitimate (a doc string, a generated DTO) → add
     the file to the allowlist in `audit-boundary.sh` with a comment
     explaining why.
3. **Never** add new extension-specific content to a host file because
   "it already has some there" — that compounds existing debt and is a
   merge blocker per XIII.6.

## See also

- `.specify/memory/constitution.md` — engineering principles (the
  canonical governance document)
- `.claude/rules/host-extension-boundary.md` — file-path discipline for
  the host↔extension boundary (operational checklist for Principle XIII)
- `crates/nexus-api/src/extension_router/README.md` — how the generic
  dispatcher works
- `crates/nexus-extension/README.md` — the
  `ExtensionRouterProvider` adapter contract
