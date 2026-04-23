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
endpoints, tables, or business logic. Two audit scripts gate this:

```bash
bash extensions/builtin/local-llm/scripts/audit-boundary.sh
powershell -ExecutionPolicy Bypass -File scripts/audit-runtime-boundary.ps1
```

Exit code 0 (PASS) is required from both. The first script greps the
host scan paths for `local-llm`-shaped literals; the second (added in
spec 032) enforces the broader "no extension-id literals in any host
file under `crates/nexus-*/` or `apps/web/src/`" invariant with an
explicit exclusion file at `scripts/boundary-exclusions.yaml`.

When a new extension-contributing spec lands that needs a new
exclusion, follow the policy documented at
[`scripts/boundary-exclusions.md`](scripts/boundary-exclusions.md). New
extension-specific literals in net-new host code are always a merge
blocker — refactor the design instead.

**CI gate**: every PR that touches `crates/nexus-*/`, `apps/web/src/`,
`migrations/`, or `scripts/audit-runtime-boundary.ps1` itself MUST run
both audit scripts. The GitHub Actions workflow under
`.github/workflows/boundary-audit.yml` (owned by spec 032 T101) blocks
the merge button on a non-zero exit.

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
