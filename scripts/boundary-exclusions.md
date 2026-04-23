# Boundary-exclusions policy

`scripts/audit-runtime-boundary.ps1` enforces Principle XIII (Host ↔ Extension Boundary) by greping every file under `crates/nexus-*/` and `apps/web/src/` for extension-id string literals. Any match fails the build unless it matches an entry in `scripts/boundary-exclusions.yaml`.

This document explains **when** an exclusion is legitimate, **what** shape it takes, and **how** new extension-contributing specs append to the list.

## When to add an exclusion

Add an entry only when ALL of the following hold:

1. **The file is grandfathered host code predating the boundary rule.** New extension-id literals in net-new host code are never acceptable — refactor the design, don't exclude it.
2. **The coupling is genuine technical debt tracked by a follow-up spec.** Cite the follow-up spec number (e.g. "spec 033 will migrate this") in the exclusion entry's rationale.
3. **The literal is an extension identifier, not a family or runtime name.** `llama.cpp` / `llamacpp` are `RuntimeFamily` canonical strings, NOT extension ids — those never need exclusion.

## Exclusion file format

`scripts/boundary-exclusions.yaml` is a single YAML document:

```yaml
grandfathered_paths:
  - crates/nexus-local-llm-worker/**
  - crates/nexus-backend-runtimes/src/llamacpp/**
  - apps/web/src/views/backends/**
  - apps/web/src/components/layout/chat_panel.tsx

known_literals:
  - local-llm
  - local_llm
```

`grandfathered_paths` are glob patterns (relative to repo root) that the audit walks past without grepping. `known_literals` are the string values the audit recognises as extension ids when deciding whether a match is noteworthy.

## Adding an extension-contributing spec

Most new extension specs do NOT need an exclusion. If your spec contributes runtime code that lives entirely under `extensions/builtin/<ext-id>/` plus host-owned tables with `ext_<slug>__` prefixes plus routes under `/api/v1/extensions/:ext-id/*`, nothing touches host paths and no exclusion is needed.

Example: spec 032 is host-only (the generic catalog) and contributes NO extension id, so `known_literals` is unchanged.

A spec DOES need an exclusion when it ships a builtin extension that the host must know about at boot time (e.g. bundled local-llm) AND the bootstrap wiring lives in host code. In that case:

1. Add the extension id to `known_literals` — **document why** in a comment next to the entry.
2. Add the file paths that carry the literal to `grandfathered_paths` with a `# FIXME(spec-NNN)` comment.
3. File a follow-up spec to migrate the coupling out, per the grandfathering-is-debt rule.

Example entry:

```yaml
known_literals:
  - local-llm
  - local_llm  # FIXME(spec-033): migrated away once llamacpp becomes an extension
```

## Running the audit

```
powershell -ExecutionPolicy Bypass -File scripts/audit-runtime-boundary.ps1
```

Exit code 0 = clean. Exit code 1 + structured output = violation. The CI gate configured in `CONTRIBUTING.md` runs this on every PR touching `crates/nexus-*` or `apps/web/src/`.

## Reference

- Principle XIII in `.specify/memory/constitution.md`.
- Project-local rule: `.claude/rules/host-extension-boundary.md` — per-file do/don't matrix.
- Spec that introduced the audit: [specs/032-backend-runtime-catalog/research.md](../specs/032-backend-runtime-catalog/research.md) R-10.
