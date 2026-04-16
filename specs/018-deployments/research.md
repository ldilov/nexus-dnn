# Phase 0 — Research: Deployments

**Feature**: 018-deployments | **Date**: 2026-04-15
**Status**: all clarifications resolved; no `[NEEDS CLARIFICATION]` remains.

The five spec-level ambiguities were closed in `/speckit.clarify` (see `spec.md` → Clarifications → Session 2026-04-15). This document records the research that backs each decision plus the handful of plan-level tech choices introduced by the plan.

---

## R-01 — Migration ownership under the crate split (Q1)

- **Decision**: All SQL migrations stay centralized in `nexus-storage` (`crates/nexus-storage/src/sqlite/migrations.rs` + `crates/nexus-storage/migrations/*.sql` + `crates/nexus-storage/queries/**`). Extracted crates (`nexus-deployments`, `nexus-models-store`, `nexus-provenance`) consume the `nexus-storage` DB API and carry no migration directories.
- **Rationale**:
  - Existing migration runner is already a single linear function (`run_migrations(pool)`) with numbered files. Distributing ownership would require a contribution trait and startup ordering, both new machinery with no payoff.
  - SQLite schema history is workspace-wide; cross-crate numbering collisions are avoided trivially when one crate owns the sequence.
  - Matches how `extensions`, `workflows`, `recipes`, `runs`, `runtime_installs`, `runtime_settings` already live today.
- **Alternatives considered**:
  - *Distributed migrations per crate*: rejected — ordering fragility, `cargo check -p <crate>` would need to replay a different migration subset; see Q1 option B.
  - *Hybrid (central 001–010, distributed 100+)*: rejected — adds cognitive split for no clear gain; see Q1 option C.

## R-02 — `workspace_id` scope (Q2)

- **Decision**: `workspace_id TEXT NULL` on `deployments`; no `workspaces` table; no enforced FK; v1 callers pass `NULL`.
- **Rationale**: forward-compat column lets a later workspaces feature land non-breakingly; avoids introducing a half-specified entity here.
- **Alternatives considered**:
  - Minimal `workspaces` table now — rejected (out-of-scope product decision).
  - Drop the column — rejected (future feature would need a schema migration anyway).

## R-03 — Hashing (Q3) — SHA-256 over RFC 8785 JCS

- **Decision**: All deployment-scoped hashes (`effective_workflow_hash`, every `deployment_snapshots.payload_hash`, parameter/runtime/model binding payload hashes) are `SHA-256(jcs_canonicalize(value))`, stored lowercase hex.
- **Rationale**:
  - Repo already standardizes on SHA-256 (`nexus-artifact`, models-store blobs/download, `nexus-backend-runtimes/checksum.rs`). Keeping the algorithm uniform simplifies verification helpers.
  - RFC 8785 JCS is the only serialization standard that defines sorted keys, insignificant-whitespace rules, string NFC-normalization, and canonical JSON number form. Ad-hoc "sorted keys + no whitespace" leaves string/number edge cases undefined and breaks cross-platform determinism.
- **Library choice**: `json-canon` (crates.io) — pure-Rust RFC 8785 implementation, stable API, no unsafe. Alternative `serde_jcs` is comparable; `json-canon` chosen for a slightly more conservative dependency surface. Either is an acceptable swap if a workspace policy prefers.
- **Alternatives considered**:
  - Ad-hoc canonical JSON (Q3 option B) — rejected for determinism reasons above.
  - BLAKE3 + JCS (Q3 option C) — faster but diverges from the rest of the repo's SHA-256 usage.

## R-04 — Crate extraction granularity (Q4)

- **Decision**: Three new crates: `nexus-models-store`, `nexus-deployments`, `nexus-provenance`. Observability stays as a `nexus-core::observability` module. `nexus-backend-runtimes` retains only runtime-adapter orchestration + traits.
- **Rationale**:
  - Mirrors the responsibility clusters already visible in the R-series commits (models-store, deployments/bindings, provenance/licensing).
  - Each new crate has a clear public surface and non-trivial internal logic — avoids the "N crates each with 50 LOC" anti-pattern.
  - Observability is mostly re-exports of `tracing` plus thin wrappers; extracting it would create a crate whose only purpose is to forward.
- **Alternatives considered**:
  - Coarse (2 crates) — leaves provenance/licensing inside models-store, which has its own growth trajectory (HF metadata, SPDX license resolution). Rejected.
  - Fine (5 crates incl. `nexus-observability`, `nexus-runtime-registry`) — rejected for over-fragmentation, see above.

## R-05 — Revision retention (Q5)

- **Decision**: Keep all revisions indefinitely in v1. Run-referenced revisions are undeletable by API; delete returns a blocking diagnostic.
- **Rationale**: revisions are the audit/restore surface; storage cost is small (normalized JSON + hashes). Pruning is a future feature and can land without schema change.
- **Alternatives considered**: per-deployment cap (B) and time-based archival (C) — both add policy surface before anyone has hit the problem.

---

## R-06 — Append-only idempotent migrations

- **Decision**: `011_deployments.sql` is authored in the project's existing idempotent style. The migration runner in `nexus-storage::sqlite::migrations` already splits on `;` and swallows duplicate-column errors when requested, so `ALTER TABLE … ADD COLUMN` statements re-apply safely.
- **Rationale**: constitution §Architectural Constraints → "Migrations are append-only and numbered. Migrations MUST be idempotent."
- **Implementation note**: call site in `run_migrations` uses `execute_migration_statements(pool, include_str!(".../011_deployments.sql"), true)` with `ignore_duplicate_column=true` so the additive `ALTER TABLE` blocks on `workflows`, `recipes`, `runs`, runtime-install/settings tables are re-entrant.

## R-07 — Export/import package format

- **Decision**: Export is a single JSON document with an envelope:
  ```
  {
    "package_version": 1,
    "deployment": { /* full deployment row */ },
    "revisions": [ /* selected revision(s) with nested snapshots/bindings/parameters */ ],
    "source_links": [...],
    "tags": [...],
    "integrity": { "hash_algo": "sha256-jcs-rfc8785", "digest": "<hex>" }
  }
  ```
- **Rationale**:
  - Single JSON file is easy to diff, sign, and inspect. No raw secrets per SI-05; runtime/extension binaries are never embedded (the export writer refuses any field whose value matches a secret pattern list, backing SC-009).
  - `integrity.digest` is computed the same way as internal hashes (SHA-256 / JCS), so verification reuses the same helper.
- **Alternatives considered**: zip-with-manifest — overkill for v1, no binary payloads to bundle.
- **Import**: strict schema-validated load. Missing extension/runtime/model → deployment lands `degraded`/`stale`; never auto-installs (FR-016, SC-008).

## R-08 — HTTP surface dependencies

- **Decision**: §21 endpoints are handled in `nexus-api` under a new `handlers/deployments/` module; they call into `nexus-deployments`' service layer. `nexus-api` gains a dependency on `nexus-deployments`; `nexus-deployments` does not gain a dependency on `nexus-api`.
- **Rationale**: keeps the transport layer thin; services stay HTTP-agnostic and directly testable.

## R-09 — Dependency graph enforcement (SC-005, SC-006)

- **Decision**: add a workspace-level test `crates/nexus-api/tests/workspace_crate_graph.rs` that shells out to `cargo metadata --format-version 1` and asserts:
  - `nexus-backend-runtimes` has no dependency on `nexus-models-store`, `nexus-deployments`, or `nexus-provenance`.
  - `nexus-deployments` has dependencies on `nexus-storage`, `nexus-models-store`, `nexus-provenance`, but NOT on `nexus-backend-runtimes`.
  - `nexus-models-store` has a dependency on `nexus-storage` but not on `nexus-backend-runtimes` or `nexus-deployments`.
- **Rationale**: these are structural invariants; a unit test is the cheapest way to keep them true as the workspace evolves. `cargo metadata` is the canonical source; no third-party crate needed.
- **Alternatives considered**: `cargo-deny` — heavier and would require a separate config file; rejected in favor of a focused in-repo test. `cargo-deny` may still be added later for advisory/license checks without conflicting with this test.

## R-10 — Test strategy

- **Decision**:
  - Unit tests per crate (hash determinism, overlay normalization, restore-mode selection, compatibility classification).
  - Integration tests in `nexus-api/tests/` (HTTP contract per endpoint; multi-instance; import without auto-install; execute attribution).
  - Regression tests (`nexus-deployments/tests/save_no_source_mutation.rs`) enforce SC-001.
  - SC-002 is covered by `hash_determinism.rs` in `nexus-deployments/tests/`.
  - SC-005/SC-006 are covered by `workspace_crate_graph.rs`.
- **Rationale**: mirrors existing test placement in the workspace (R-series PRs landed tests adjacent to the code under test + HTTP contract tests in `nexus-api/tests/`).

---

## Dependencies added to the workspace

| Crate | Purpose | Scope | Alternative | Justification |
|---|---|---|---|---|
| `json-canon` | RFC 8785 JCS canonicalization for hashing | `nexus-deployments` | `serde_jcs` | pure Rust, no unsafe, narrow surface (Principle I: adopt proven crate instead of hand-rolling) |

No other new workspace dependencies. `sha2`, `sqlx`, `serde`, `serde_json`, `thiserror`, `anyhow`, `axum`, `tokio`, `tracing`, `uuid`, `rstest`, `mockall`, `tokio-test` are already present.

## Outstanding

None. Ready for Phase 1.
