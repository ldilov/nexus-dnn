# Tasks: Host-Managed Model Store

**Input**: Design documents from `/specs/017-host-managed-model-store/`
**Prerequisites**: spec.md, plan.md. Hard deps: spec 015 (runtimes modularization) landed, spec 016 (extension + API modularization) landed. The `backends/` submodule split from 016 is required before adding `host_models.rs` without re-violating file-size limits.
**Tests**: contract tests are authored RED in Phase A and turn GREEN across Phases D–I per the mapping in `plan.md` → Contracts Directory.

## Sequencing invariant

Per Principle IX. Recommended order:
US2 (rename) → US1 (schema + install/download) → US3 (leases) → US5 (resolver) → US4 + US6 (manifest + private flag) → US7 (layout tests) → US8 (download concurrency hardening) → US9 (provenance) → US10 (exhaustive errors) → Polish.

Phases C, H, and I can execute concurrently after their data deps land (see plan.md Phase J).

---

## Phase 1: Baseline

- [ ] T601 Capture baseline: `cargo test --workspace` → record pass count per test binary. Commit the baseline snapshot to the PR description.
- [ ] T602 Author contract-test skeletons (RED):
  - `crates/nexus-backend-runtimes/tests/model_install_dedup.rs` (SC-506)
  - `crates/nexus-backend-runtimes/tests/model_lease_budget.rs` (SC-507)
  - `crates/nexus-backend-runtimes/tests/model_uninstall_blocked_by_lease.rs` (SC-508)
  - `crates/nexus-backend-runtimes/tests/model_resolver_latency.rs` (SC-502)
  - `crates/nexus-api/tests/host_models_contract.rs` (FR-515, FR-519)

---

## Phase 2: US2 — `installs_store` → `runtime_installs_store` rename (P1)

- [ ] T610 [US2] Rename directory `crates/nexus-backend-runtimes/src/installs_store/` → `runtime_installs_store/`. Update `mod` declaration in `lib.rs`.
- [ ] T611 [US2] Add re-export shim to `crates/nexus-backend-runtimes/src/lib.rs`: `pub use runtime_installs_store as installs_store;` (removed in T690 at Phase 10).
- [ ] T612 [US2] Update internal path references inside `runtime_installs_store/` submodules (`migration.rs`, `relocation.rs`, `resolution.rs`) that referred to `crate::installs_store::*` → `crate::runtime_installs_store::*`.
- [ ] T613 [US2] Verify: `cargo check -p nexus-api -p nexus-backend-runtimes --tests` GREEN without edits in `nexus-api` (shim carries callers).

---

## Phase 3: US1 — Schema (P1)

### Tests (write first — RED)

- [ ] T620 [P] [US1] Migration test in `crates/nexus-backend-runtimes/tests/model_store_schema.rs`: applies the new migration against an empty DB and against a DB populated from pre-017 runtime-only schema; asserts both reach the SC-501 target shape.
- [ ] T621 [P] [US1] Unique-index test: inserting two rows with the same `(family, version, quantization, variant, private_model, COALESCE(owner_extension_id, ''))` tuple fails; changing `private_model` to 1 + setting `owner_extension_id` allows the second row.

### Implementation

- [ ] T622 [US1] Author `crates/nexus-backend-runtimes/src/models_store/schema.rs` with:
  - `CREATE TABLE host_model_installs (...)` per FR-501.
  - `CREATE TABLE host_model_leases (...)` per FR-502.
  - `CREATE UNIQUE INDEX host_model_installs_identity` on `(family, version, quantization, variant, private_model, COALESCE(owner_extension_id, ''))`.
  - `CREATE INDEX host_model_leases_active` on `(device, released_at)`.
- [ ] T623 [US1] Register the migration with the existing `nexus-backend-runtimes` migration runner (same path that runs `host_runtime_installs`).

### Verification

- [ ] T624 [US1] T620/T621 GREEN. Migration is idempotent: re-running against a populated DB is a no-op.

---

## Phase 4: US1 — `models_store::install` + `download` (P1)

### Tests (write first — RED)

- [ ] T630 [P] [US1] Unit test in `install.rs`: `install_model` for a new tuple inserts a row with `state = 'queued'` then transitions to `'ready'` after the mocked download completes.
- [ ] T631 [P] [US1] Unit test: `install_model` for an existing `ready` tuple returns the existing row (no new insert).
- [ ] T632 [P] [US1] Unit test: `install_model` called twice concurrently for the same new tuple results in exactly one row + one download invocation (second caller waits on the in-flight future).
- [ ] T633 [P] [US1] Unit test: `download_and_verify` with a corrupted file returns `ModelStoreError::ChecksumMismatch { file, expected, actual }`; the row transitions to `state = 'failed'` (not `ready`).
- [ ] T634 [P] [US1] Unit test: `download_and_verify` resumes via HTTP `Range` when a partial prefix exists and the mock source advertises `Accept-Ranges: bytes`.

### Implementation

- [ ] T635 [US1] Author `models_store/errors.rs` with `ModelStoreError` (FR-516) — `thiserror::Error` enum, no `#[non_exhaustive]`.
- [ ] T636 [US1] Author `models_store/install.rs`:
  - `install_model(request: InstallModelRequest) -> BackendRuntimeResult<InstalledModelDto>` — identity hash, `BEGIN IMMEDIATE` + `INSERT ... ON CONFLICT DO NOTHING RETURNING`, spawn `download_and_verify` if newly inserted.
  - `uninstall_model(install_id) -> BackendRuntimeResult<()>` — returns `LeasedByExtensions` when active leases exist; deletes row + files otherwise.
  - In-flight-download dedup via a `DashMap<IdentityKey, Shared<...>>` (or `tokio::sync::broadcast`-per-tuple) so concurrent callers share one download.
- [ ] T637 [US1] Author `models_store/download.rs`:
  - Semaphore `Arc<Semaphore>` with permit count = `host.model_download_concurrency` (default 2).
  - `Range`-aware resume path + full-re-download fallback with warn-log (FR-510).
  - Per-file SHA-256 streaming verify during download; Merkle root over sorted file hashes → `sha256_root` column.
  - Emit `files.json` manifest into `$install_root/files.json` after verify.

### Verification

- [ ] T638 [US1] T630–T634 GREEN. `model_install_dedup.rs` contract test (T602) GREEN (SC-506).

---

## Phase 5: US3 — `models_store::leases` (P1)

### Tests (write first — RED)

- [ ] T640 [P] [US3] Unit test: `acquire_lease` on a 12GB device with 12GB already reserved returns `InsufficientResources { device, requested, available }` (SC-507 shape).
- [ ] T641 [P] [US3] Unit test: `acquire_lease` → `release_lease` round-trip; `list_active_leases(device)` reflects the state correctly at each step.
- [ ] T642 [P] [US3] Unit test: `uninstall_model` with an active lease returns `LeasedByExtensions { extensions }` listing the lessee extensions (SC-508).

### Implementation

- [ ] T643 [US3] Author `models_store/leases.rs`:
  - `acquire_lease(install_id, extension_id, device, vram_reserved_bytes) -> BackendRuntimeResult<ModelLease>` — sums `vram_reserved_bytes` over active leases on `device`, compares to the device budget (pulled from host config or a pluggable `DeviceBudgetProvider`), inserts or errors.
  - `release_lease(lease_id) -> BackendRuntimeResult<()>` — sets `released_at = now()`.
  - `list_active_leases(device) -> BackendRuntimeResult<Vec<ModelLease>>` — single query, `released_at IS NULL`.

### Verification

- [ ] T644 [US3] T640–T642 GREEN. `model_lease_budget.rs` + `model_uninstall_blocked_by_lease.rs` contract tests GREEN.

---

## Phase 6: US5 — `models_store::resolver` (P1)

### Tests (write first — RED)

- [ ] T650 [P] [US5] Unit test: `check_model_dependencies` with 5 deps + 50 installs returns the correct partition `{ matched, missing, unsatisfiable }`; each `ModelDependency` appears in exactly one vec.
- [ ] T651 [P] [US5] Unit test: tie-breaker determinism — with two candidates differing only in `quantization` match quality, the exact match wins; with ties, `created_at DESC` wins.
- [ ] T652 [P] [US5] Unit test: `min_params: 7B` + only a 3B install → reported as unsatisfiable with `UnsatisfiableReason::ParameterCountTooLow`.
- [ ] T653 [US5] Latency bench in `model_resolver_latency.rs` (T602): 1000 invocations with 50 installs + 5-dep manifest; assert P95 < 100ms (SC-502).

### Implementation

- [ ] T654 [US5] Author `models_store/resolver.rs`:
  - `check_model_dependencies(deps: &[ModelDependency], pool: &SqlitePool, ctx: ResolutionContext) -> BackendRuntimeResult<ModelResolutionReport>`.
  - Single `SELECT` over `host_model_installs WHERE state = 'ready' AND (private_model = 0 OR owner_extension_id = $ctx_ext)` + in-Rust filter/sort. Avoid N+1 by pulling candidate set once.
  - Tie-breaker per FR-512.

### Verification

- [ ] T655 [US5] T650–T653 GREEN. SC-502 latency target met on reference hardware; record the median + P95 + max in the PR description.

---

## Phase 7: US4 + US6 — Manifest block + private-model flag (P1/P2)

### Tests (write first — RED)

- [ ] T660 [P] [US4] Unit test in `nexus-extension::manifest`: a valid `model_dependencies` YAML block parses into `Vec<ModelDependency>` with all fields populated.
- [ ] T661 [P] [US4] Unit test: invalid YAML (e.g. `min_params: "notanumber"`) returns `ExtensionError::ManifestParse { path, detail }`.
- [ ] T662 [P] [US6] Integration test: extension A installs a private model; extension B's resolver does NOT match it even when `(family, version, quantization)` are identical.
- [ ] T663 [P] [US6] Integration test: uninstalling extension A schedules its private install for deletion; after the grace period with no active leases, the row transitions to `state = 'reclaimed'` and the files are removed.

### Implementation

- [ ] T664 [US4] Author `crates/nexus-extension/src/manifest/model_dependencies.rs`:
  - `struct ModelDependency { family, version, min_params: Option<ParamCount>, quantization: Option<String>, variant: Option<String>, required: bool }`.
  - `struct ParamCount(u64)` with `FromStr` for `"7B"`/`"13B"`/`"70B"`.
  - `serde::Deserialize` wiring; error path reuses `ExtensionError::ManifestParse`.
- [ ] T665 [US4] Wire extension-activation path: on activation, call `check_model_dependencies` for declared deps; `required: true` missing/unsatisfiable aborts activation with a clear error; `required: false` returns `ModelResolution::Unresolved` to the runtime (US4.2).
- [ ] T666 [US6] Implement `private_model = 1` path in `install_model`: when `request.private = true`, set `owner_extension_id = request.ext_id`; enforce the unique-index tuple includes `owner_extension_id` (already per FR-501).
- [ ] T667 [US6] Implement reclaim scheduler (`private_model_reclaim_grace`, default 24h) — a single background task per `nexus-backend-runtimes` instance that scans for reclaim-eligible private rows once per grace-period tick.

### Verification

- [ ] T668 [US4/US6] T660–T663 GREEN. Extension activation with a valid `model_dependencies` block completes end-to-end against a seeded `host_model_installs`.

---

## Phase 8: US7 + US8 — Layout + download concurrency hardening (P2)

### Tests (write first — RED)

- [ ] T670 [P] [US7] Integration test: install an HF repo with 5 safetensors shards + `config.json` + tokenizer → `files.json` has 7 entries with per-file SHA-256, files live under canonical layout (US7.1).
- [ ] T671 [P] [US7] Integration test: install a single-file GGUF → `files.json` has one entry (US7.2).
- [ ] T672 [P] [US7] Integration test: corrupt a file post-install + call `verify_install` → row transitions to `state = 'corrupt'` (US7.3).
- [ ] T673 [P] [US8] Integration test: spawn 10 concurrent installs against a mock source; at any instant, `list_install_tasks` has ≤ 2 rows with `state = 'downloading'` (US8.1).

### Implementation

- [ ] T674 [US7] Add `verify_install(install_id) -> BackendRuntimeResult<()>` to `models_store/mod.rs`; called opportunistically on lease acquire (US7.3).
- [ ] T675 [US8] Expose `host.model_download_concurrency` config key + plumb into the semaphore at `models_store` init.

### Verification

- [ ] T676 [US7/US8] T670–T673 GREEN.

---

## Phase 9: US9 + US10 — Provenance + exhaustive errors (P2)

### Tests (write first — RED)

- [ ] T680 [P] [US9] Unit test: HF-sourced install populates `license_spdx` + `license_url` from the model card when available (US9.1). Mock `nexus-huggingface` client.
- [ ] T681 [P] [US9] Unit test: direct-URL install with user-supplied `license_spdx` persists it verbatim (US9.2).
- [ ] T682 [P] [US9] Unit test: missing license resolves to `license_spdx = 'UNKNOWN'` + non-empty `provenance_note` (US9, edge case).
- [ ] T683 [P] [US10] Unit test: `http_status_for_model_error` is exhaustive — adding a new `ModelStoreError::Foo` variant produces a compile error (FR-517). Enforced by rustc, not a runtime assertion.
- [ ] T684 [P] [US10] Unit test: each variant maps to a distinct `(StatusCode, code: &'static str)` pair per FR-517.

### Implementation

- [ ] T685 [US9] Author `models_store/provenance.rs`:
  - `fetch_hf_metadata(repo_id) -> BackendRuntimeResult<HfModelMetadata>` — thin wrapper over `nexus-huggingface`.
  - `resolve_license(source_kind, request, hf_metadata) -> LicenseInfo` with fallback to `UNKNOWN` + required `provenance_note`.
- [ ] T686 [US9] Extend `InstalledModelDto` serializer to include `license_spdx`, `license_url`, `source_url`, `source_kind`, `sha256_root` (FR-515, FR-518 — additive).
- [ ] T687 [US10] Author `handlers/backends/host_models.rs::http_status_for_model_error` as an exhaustive match over `ModelStoreError`; arms:
  - `InstallNotFound` → 404, `MODEL_INSTALL_NOT_FOUND`
  - `LeasedByExtensions` → 409, `MODEL_LEASED_BY_EXTENSIONS`
  - `ChecksumMismatch` → 422, `MODEL_CHECKSUM_MISMATCH`
  - `InsufficientResources` → 409, `MODEL_INSUFFICIENT_VRAM`
  - `SourceUnreachable` → 502, `MODEL_SOURCE_UNREACHABLE`
  - `ManifestInvalid` → 400, `MODEL_MANIFEST_INVALID`
  - `Storage` → 500, `STORAGE_ERROR`
  - `Io` → 500, `IO_ERROR`
- [ ] T688 [US9/US10] Author `handlers/backends/host_models.rs`:
  - `GET /api/v1/host-models` → `list_host_models` (single query, respects `private_model` visibility).
  - `POST /api/v1/host-models` → `install_model` (consumes existing `InstallModelRequestDto`).
  - `DELETE /api/v1/host-models/{install_id}` → `uninstall_model`.
  - `POST /api/v1/host-models/{install_id}/leases` + `DELETE /api/v1/host-models/leases/{lease_id}` (FR-519).

### Verification

- [ ] T689 [US9/US10] T680–T684 GREEN; `host_models_contract.rs` (T602) GREEN (FR-515 + FR-519 wire-format). License-coverage query `SELECT COUNT(*) FROM host_model_installs WHERE state = 'ready' AND (license_spdx IS NULL OR (license_spdx = 'UNKNOWN' AND (provenance_note IS NULL OR provenance_note = '')))` returns 0 (SC-509).

---

## Phase 10: Polish

- [ ] T690 Remove the `pub use runtime_installs_store as installs_store;` shim from `lib.rs`. Migrate any remaining `installs_store::*` call sites — `cargo check --workspace` surfaces them.
- [ ] T691 [P] Update `crates/nexus-backend-runtimes/README.md` with new §"Model store" covering schema, resolver, leases, download concurrency, private-model flag.
- [ ] T692 [P] Update `crates/nexus-api/README.md` with new §"Host-model endpoints".
- [ ] T693 [P] Update `crates/nexus-extension/README.md` §"Manifest reference" with the `model_dependencies` schema.
- [ ] T694 [P] Update root `README.md` "Recent Changes" to link spec 017.
- [ ] T695 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`. SC-503 (≤350 LOC per submodule), SC-504 (grep for `installs_store` outside `runtime_installs_store` and `models_store` returns zero), SC-510 (grep for silent `let _ =.*\.await` in `models_store/` returns zero outside tests).

---

## Dependencies

```text
Phase 1 (baseline + RED contracts)
        │
        ▼
Phase 2 (rename installs_store → runtime_installs_store)
        │
        ▼
Phase 3 (schema + migrations) ────► Phase 4 (install + download) ──► Phase 5 (leases) ──► Phase 6 (resolver)
                                                                                                │
                                                                                                ▼
                                                                                       Phase 7 (manifest + private flag)
                                                                                                │
                                                                                                ▼
                                                                                       Phase 8 (layout + concurrency hardening)
                                                                                                │
                                                                                                ▼
                                                                                       Phase 9 (provenance + exhaustive errors + API wiring)
                                                                                                │
                                                                                                ▼
                                                                                       Phase 10 (shim removal + docs)
```

Phases 3, 8, and 9 are candidates for concurrent PRs (Principle X) once their data deps land — see plan.md → Implementation Sequencing.

## Task Summary

- **Total tasks**: ~50 (T601–T695)
- **Parallel opportunities**: ~20 `[P]` tasks (RED-test authoring, independent submodule extractions, README updates)
- **MVP (P1 only)**: Phases 2–6 = US1 + US2 + US3 + US4 + US5 (~32 tasks). P2 (US6–US10) adds private-model escape hatch, HF layout tests, download hardening, provenance, and exhaustive error mapping.
