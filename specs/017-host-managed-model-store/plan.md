# Implementation Plan: Host-Managed Model Store

**Branch**: `017-host-managed-model-store` | **Spec**: [spec.md](./spec.md)

## Summary

Extend the host-managed runtime pattern (specs 011–015) to models. Add `host_model_installs` + `host_model_leases` tables. Add a new `models_store` module to `nexus-backend-runtimes` mirroring the shape of (the soon-to-be-renamed) `runtime_installs_store`. Wire the existing `nexus-api` model DTOs to the new store. Introduce a manifest `model_dependencies` block and a `check_model_dependencies` resolver with a <100ms P95 budget. Keep a `private_model` escape hatch on the same table for bespoke per-extension formats (LoRA adapters, tokenizer overrides). Pick a canonical on-disk layout (manifest-of-files). Centralize download concurrency + resumability. Make license/provenance a first-class column set.

## Technical Context

**Language/Version**: Rust 2024 edition
**Primary Dependencies** (all already in the workspace):
- `sqlx` — schema + queries, same dialect as runtime store.
- `sha2` — per-file SHA-256 + Merkle root.
- `tokio::sync::Semaphore` — download concurrency cap.
- `nexus-huggingface` — HF repo resolution + metadata (consumed as-is, not modified).
- `serde` / `serde_json` — `files.json` manifest + JSON blob column.
- `thiserror` — `ModelStoreError`.
- `tracing` — structured logs for download/verify/lease paths.

No new workspace crates in v1. `nexus-models` graduation is deferred pending Phase B audit.

**Testing**: new integration tests in `crates/nexus-backend-runtimes/tests/` (model lifecycle, resolver latency, lease budget, dedup) + new contract tests in `crates/nexus-api/tests/` (HTTP surface).
**Target Platform**: unchanged.
**Project Type**: library addition + schema migration + API wiring. No UI changes.
**Performance Goals**: <100ms P95 resolver (SC-502); download concurrency cap default 2 (FR-510); `Range`-aware resume.
**Constraints**:
- Spec 016 (extension + API modularization) is a prerequisite — clean submodule boundaries in `nexus-api/src/handlers/backends/` are a precondition for adding `host_models.rs` without re-introducing file-size violations.
- Spec 015 (runtimes modularization) established `installs_store/` — rename to `runtime_installs_store/` (US2) lands before `models_store/` is added.
- Existing API DTOs MUST remain source-compatible (FR-518).
- Zero destructive schema change to `host_runtime_installs` / `host_runtime_leases`.

**Scale/Scope**: ~8 new submodules (~1800–2400 LOC), two new tables, one rename, two new endpoints, one manifest block, one resolver.

## Constitution Check

| Principle | Status | Note |
|---|---|---|
| I. Ecosystem-First | PASS | `sqlx`, `sha2`, `tokio::sync::Semaphore`, `semver`, `nexus-huggingface` — no new bespoke machinery |
| II. SOLID & classical | PASS | DRY (schema mirror of runtime store), POLA (resolver returns `install_id`, not "a dir path"), SRP (each submodule one domain) |
| III. Modularity | PASS | Every new file ≤ 350 LOC per FR-505 / SC-503 |
| IV. Self-Doc code | PASS | Module `//!` docs on every new submodule; no human-facing noise in code |
| V. Extendability | PASS | `source_kind` is a string column + closed Rust enum; adding new sources means adding an enum variant + a handler, not a schema change |
| VI. Test-First | PASS | US1/3/5/6/7/8/10 all have contract tests (SC-506..508); resolver latency (SC-502) is a bench test written before the resolver impl |
| VII. Memory/Type Safety | PASS | `ModelStoreError` exhaustive; no `let _ = fut.await` (SC-510); `FilesManifest` typed, not a raw JSON blob in Rust |
| VIII. Living Docs | PASS | Crate READMEs updated in Phase J; root README "Recent Changes" linked to spec 017 |
| IX. Bisectable History | PASS | Per-phase commits; rename shim lives for one-minor-version, removed in Phase J |
| X. Parallelism-First | PASS | Schema (Phase C) and API wiring (Phase H) are disjoint from resolver (Phase F); can land as independent PRs if desired |
| XI. Idiom Registry | PASS | `private_model` flag chosen over duplicate-table anti-pattern (Single-Choice); `files.json` manifest chosen over ambiguous folder-only layout; exhaustive match on `ModelStoreError` |

## Project Structure

### Source Code (after merge)

```
crates/nexus-backend-runtimes/src/
├── runtime_installs_store/            # renamed from installs_store/ (US2)
│   ├── mod.rs
│   ├── migration.rs
│   ├── relocation.rs
│   └── resolution.rs
├── models_store/                       # NEW (US1)
│   ├── mod.rs                          # public API surface: install_model, uninstall_model, list_installed_models, acquire_lease, release_lease, check_model_dependencies
│   ├── schema.rs                       # DDL for host_model_installs + host_model_leases; migrations
│   ├── install.rs                      # install_model, uninstall_model, dedup, private-flag handling
│   ├── download.rs                     # Semaphore-guarded download + Range-aware resume + per-file SHA-256 verify
│   ├── leases.rs                       # acquire_lease, release_lease, list_active_leases, VRAM accounting
│   ├── resolver.rs                     # check_model_dependencies + tie-breaker (US5)
│   ├── provenance.rs                   # license + source metadata helpers; HF model-card lookup
│   └── errors.rs                       # ModelStoreError
└── lib.rs                              # re-export shim: pub use runtime_installs_store as installs_store; (removed in Phase J)

crates/nexus-extension/src/manifest/
├── ... (existing)
└── model_dependencies.rs               # NEW — ModelDependency, ParamCount, YAML parse

crates/nexus-api/src/handlers/backends/
├── ... (existing from spec 016)
└── host_models.rs                      # NEW — list_host_models, install_model, uninstall_model, create_model_lease, release_model_lease
```

### Canonical on-disk layout (per US7 decision)

```
$host_model_root/
└── <family>/
    └── <version>/
        └── <quantization>/
            └── <variant>/
                ├── files.json
                ├── <file1>
                └── ...
```

## Complexity Tracking

- **Net add** ~2000 LOC across `models_store/` + `manifest/model_dependencies.rs` + `handlers/backends/host_models.rs`.
- **Net zero** runtime-store rename (LOC identical; only module path changes; one-minor-version shim).
- **No new workspace crate**. Module boundaries drawn so a future extraction to `nexus-models` is a mechanical move (all cross-crate imports go through `mod.rs`).
- **No removal of existing surface area** — additive across the board.

## Contracts Directory

New contract tests live under `specs/017-host-managed-model-store/contracts/` (Phase A), consumed by:
- `crates/nexus-backend-runtimes/tests/model_install_dedup.rs` (SC-506)
- `crates/nexus-backend-runtimes/tests/model_lease_budget.rs` (SC-507)
- `crates/nexus-backend-runtimes/tests/model_uninstall_blocked_by_lease.rs` (SC-508)
- `crates/nexus-backend-runtimes/tests/model_resolver_latency.rs` (SC-502)
- `crates/nexus-api/tests/host_models_contract.rs` (FR-515 / FR-519 wire-format)

## Implementation Sequencing

1. **Phase A — Baseline + contracts**. Capture baseline `cargo test --workspace`. Author the contract-test skeletons (RED) in the listed files. No production code yet.
2. **Phase B — Crate-vs-module audit**. Confirm `models_store/` lives inside `nexus-backend-runtimes` (v1). Record the module boundary decision in the PR so a future `nexus-models` extraction is mechanical.
3. **Phase C — Schema + rename**. Add `host_model_installs` + `host_model_leases` migrations (FR-501/502). Rename `installs_store/` → `runtime_installs_store/` + add shim (US2). Green `cargo check --workspace`.
4. **Phase D — `models_store::install` + `download`**. Implement `install_model`, `uninstall_model`, dedup via unique index, semaphore-capped download with `Range`-aware resume, per-file SHA-256 verify, `files.json` manifest emit. Contract tests SC-506, SC-508 go GREEN.
5. **Phase E — `models_store::leases`**. Implement `acquire_lease`, `release_lease`, VRAM accounting, lease-blocks-uninstall path. Contract test SC-507 goes GREEN.
6. **Phase F — `models_store::resolver`**. Implement `check_model_dependencies` + tie-breaker (FR-511/512/513). Private-model visibility filter (US6.3). Latency bench goes GREEN (SC-502).
7. **Phase G — Manifest plumbing**. Add `ModelDependency` + `ParamCount` in `nexus-extension::manifest`; wire parse path + `ExtensionError::ManifestParse` reuse. Extension activation calls resolver.
8. **Phase H — API wiring**. Add `handlers/backends/host_models.rs` backed by `models_store`. Wire existing DTOs + add license/provenance fields (FR-515). Add lease endpoints (FR-519). Contract test `host_models_contract.rs` goes GREEN.
9. **Phase I — Provenance + exhaustive errors**. Populate `license_spdx` / `license_url` / `provenance_note` from HF card when source is `huggingface`; carry user-supplied license for `direct_url`. Implement exhaustive `http_status_for_model_error` (FR-517). License-coverage query (SC-509) returns 0.
10. **Phase J — Shim removal + docs**. Delete the `pub use runtime_installs_store as installs_store` shim. Migrate any remaining `installs_store::*` call sites. Update `nexus-backend-runtimes/README.md` (new §"Model store"), `nexus-api/README.md` (new §"Host-model endpoints"), root README "Recent Changes". Final `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`, SC-503/504/510 grep checks.

Each phase is a green-building commit. Phases C, H, and I are candidates for concurrent PRs (Principle X); Phases D→E→F→G are sequenced by data-flow dependency.
