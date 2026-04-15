# Feature Specification: Host-Managed Model Store

**Feature Branch**: `017-host-managed-model-store`
**Created**: 2026-04-15
**Status**: Draft
**Input**: Replicate the host-managed runtime pattern (specs 011–015) for models. Move model weights out of per-extension ownership into a host-managed store with shared install records, VRAM/load-slot leases, centralized download concurrency, and canonical provenance metadata. Keep a private-model escape hatch for bespoke per-extension formats (LoRA adapters, tokenizer overrides).

## Executive Summary

Backend runtimes (llama.cpp, TensorRT, vLLM, …) are host-managed since spec 011. Models are not. Today every extension that needs a GGUF or an HF repo is responsible for: downloading it, storing it somewhere under its own directory, tracking its checksum, declaring VRAM, and coordinating concurrent loads with other extensions that may be using the same weights. This causes:

- Duplicate on-disk copies of the same model across extensions.
- No cross-extension VRAM coordination — two extensions can simultaneously load a 13B Q4 model and OOM the GPU.
- Inconsistent download behavior (no shared resume, no shared retry policy, no shared progress reporting).
- License/provenance metadata lives wherever each extension decided to put it, making audit impossible.
- Manifest `model_dependencies` have no resolver — extensions can declare what they want but the host cannot enforce or satisfy those requirements.

Spec 017 extends the runtime-host pattern to models. API-level DTOs (`InstallModelRequestDto`, `InstalledModelDto`, `ModelInstallTaskDto`, `ModelLimitsDto`) already exist in `nexus-api` and are the contract anchor — they become backed by a real host-owned store.

## Clarifications

### Session 2026-04-15

- Q: Should the sidebar-menu UI work land inside spec 017, or does 017 only record the intent while the UI ships in a downstream spec? → A: Record intent only — Backend Runtimes and Models are host-controlled top-level sidebar entries in the host app (distinct menus, not extension-scoped views); the frontend work is a downstream spec that consumes 017's HTTP surface.

## Architectural Intent

### Core principles applied

- **Ecosystem-First (Principle I)**: reuse `sqlx`, `sha2`, `tokio::sync::Semaphore`, `semver`, and existing `nexus-huggingface` for HF resolution. No bespoke download pool or checksum machinery.
- **Linguistic-Modular-Units (Appendix A)**: new `models_store` module alongside the existing (to-be-renamed) `runtime_installs_store`. Each module owns one domain.
- **DRY (Principle II)**: resolver shape mirrors `check_runtime_dependencies`; install-migration shape mirrors `migrate_from_legacy`; lease-table shape mirrors `host_runtime_leases`.
- **POLA (Principle II)**: an extension declaring `model_dependencies` gets a resolved install handle, never a "this dir exists, figure it out yourself" answer.
- **Exhaustive matches / typed errors (Appendix B)**: `ModelStoreError` is an enum with no catch-all; `http_status_for` gains arms.
- **Single Source of Truth**: one `host_model_installs` row per unique `(family, version, quantization, variant)` tuple. Extensions reference it by `install_id`; they do not own it.

### Non-goals

- **Not** refactoring `nexus-huggingface` itself. Spec 017 consumes it; internal HF-client redesign is out of scope.
- **Not** touching the runtime-host path. `host_runtime_installs` / `host_runtime_leases` are untouched beyond the rename of the owning module (US2).
- **Not** implementing a GUI for model-store administration. HTTP surface only; UI consumption is a downstream spec. Per the 2026-04-15 clarification, that downstream spec will render **Backend Runtimes** and **Models** as two **distinct top-level sidebar entries in the host app** — both host-controlled (not owned by any extension). Spec 017's deliverables MUST be sufficient for that downstream UI without schema or DTO changes; see FR-524.
- **Not** building a cross-host model cache / CDN. The store is node-local.
- **Not** changing the existing API DTOs (`InstallModelRequestDto` etc.). They are the contract; this spec wires them to a real backend.

### Deferred decisions

- Whether `models_store` graduates to its own crate (`nexus-models`) is deferred to spec 018+ pending the LOC-and-dependency audit in Phase B (US1). Default for v1: new module inside `nexus-backend-runtimes`, with module boundaries drawn so a future crate extraction is mechanical.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — `host_model_installs` table + `models_store` module (Priority: P1)

As a host operator, I want model installs tracked in a host-owned SQLite table, not scattered across extension directories, so that duplicate models collapse to one install and provenance is auditable.

**Independent Test**: `cargo test -p nexus-backend-runtimes models_store::` passes. Seeding two extensions that both declare the same `(llama-cpp-gguf, llama-3-8b-instruct, Q4_K_M)` results in **one** row in `host_model_installs` and two references (via leases or dependency edges).

**Acceptance Scenarios**:

1. **Given** an empty `host_model_installs` table, **When** `install_model(request)` is called with a new `(family, version, quantization)` tuple, **Then** one row is inserted with `state = 'downloading'` → `'ready'`, and the on-disk layout is `$host_model_root/<family>/<version>/<quantization>/<variant>/`.
2. **Given** an existing `ready` install for `(family, version, quantization)`, **When** a second `install_model` call arrives with the same tuple, **Then** the existing row is returned; no duplicate row, no duplicate download.
3. **Given** a `downloading` install, **When** a second `install_model` call for the same tuple arrives, **Then** the second caller waits for the in-flight install (shared `oneshot::Receiver` or install-state poll) rather than starting a parallel download.

### User Story 2 — `installs_store` renamed to `runtime_installs_store` (Priority: P1)

As a maintainer reading `nexus-backend-runtimes`, I should not have to guess whether `installs_store` refers to runtimes or models once both exist.

**Independent Test**: `grep -R "installs_store" crates/nexus-backend-runtimes/src/` returns only the new `runtime_installs_store` name and the new `models_store` name. Re-export shims in `lib.rs` preserve the old public path (`pub use runtime_installs_store as installs_store`) for one minor version to keep `nexus-api` green during the transition; the shim is deleted at the end of Phase J.

**Acceptance Scenarios**:

1. **Given** the rename, **When** `cargo check -p nexus-api` runs, **Then** it passes without edits. Downstream callers compile via the shim.
2. **Given** the shim deletion at Phase J, **When** `cargo check --workspace` runs, **Then** every remaining `installs_store::*` call site has been migrated to `runtime_installs_store::*`.

### User Story 3 — `host_model_leases` table + VRAM/load-slot coordination (Priority: P1)

As an extension author loading a model, I should acquire a lease that reserves a VRAM budget on the target device, and release it on drop, so two extensions cannot silently OOM the GPU.

**Independent Test**: Seed two extensions with a simulated GPU of 12GB VRAM and two 8GB model leases. The second `acquire_lease` call returns `ModelStoreError::InsufficientResources { requested, available }`, not a panic, not an OOM.

**Acceptance Scenarios**:

1. **Given** `host_model_leases (lease_id PK, install_id FK, extension_id, device, vram_reserved_bytes, acquired_at, released_at NULL)`, **When** `acquire_lease(install_id, extension_id, device, vram_bytes)` is called, **Then** a row is inserted with `released_at = NULL` if the device has budget; the call fails otherwise.
2. **Given** an active lease, **When** `release_lease(lease_id)` is called, **Then** `released_at` is set; a subsequent `list_active_leases(device)` query omits it.
3. **Given** an extension's install being uninstalled, **When** active leases exist on it, **Then** `uninstall_model` returns `ModelStoreError::LeasedByExtensions { extensions: [..] }` — the same block-with-reason pattern as runtime uninstall (FR-411 in spec 016 is the mental model).

### User Story 4 — Manifest `model_dependencies` block (Priority: P1)

As an extension author, I declare which model(s) I need in `extension.yaml` and the host resolves them, downloads if needed, and gives me an `install_id`.

**Independent Test**: An extension manifest containing a valid `model_dependencies` block parses into typed `Vec<ModelDependency>`; an invalid one returns `ExtensionError::ManifestParse { path, detail }`.

**Manifest schema** (canonical):

```yaml
model_dependencies:
  - family: llama-cpp-gguf            # required, string
    version: llama-3-8b-instruct      # required, string (free-form identifier, human-readable)
    revision: 5f0b02c75b...           # REQUIRED by default — HF commit SHA or direct-URL content hash.
                                      # Pins the exact bytes. Omitting is only legal when
                                      # `allow_unpinned: true` is set on the dep (see US12).
    min_params: 7B                    # optional, parsed as a parameter-count threshold
    quantization: Q4_K_M              # optional, typed Quantization (see Key Entities); absent = "any"
    variant: default                  # optional, string; defaults to "default"
    required: true                    # optional bool; default true. If false, missing is non-fatal.
    allow_unpinned: false             # optional bool; default false. Setting to true allows omitting
                                      # `revision` and accepts silent upstream drift — warn-logged.
```

**Acceptance Scenarios**:

1. **Given** a manifest with one `required: true` dependency and an empty `host_model_installs`, **When** the extension activates, **Then** the host triggers an install and activation blocks on `state = 'ready'` (OR fails loudly with a clear error if the source is unreachable).
2. **Given** a manifest with one `required: false` dependency, **When** no matching install exists and auto-install is disabled (policy), **Then** activation succeeds and `ModelResolution::Unresolved { dependency }` is returned to the extension runtime for it to handle.
3. **Given** `min_params: 7B`, **When** only a 3B install exists for the `family`/`version` tuple, **Then** `check_model_dependencies` reports the 3B install as non-matching and either triggers an install of a matching variant or returns a resolution error.

### User Story 5 — `check_model_dependencies` resolver with <100ms P95 budget (Priority: P1)

As the extension registry's hot path, dependency resolution must not stall activation.

**Independent Test**: With 50 installs and a manifest declaring 5 dependencies, `check_model_dependencies` returns in < 100ms P95 over 1000 invocations on reference hardware. Mirrors SC-102 in spec 011.

**Acceptance Scenarios**:

1. **Given** 50 installs and a 5-dep manifest, **When** the resolver runs 1000 times, **Then** P95 latency < 100ms.
2. **Given** one dependency with no matching install, **When** the resolver runs, **Then** it returns `ModelResolutionReport { matched: [...], missing: [dep], unsatisfiable: [] }` without throwing.
3. **Given** a dependency with two candidate installs, **When** the resolver runs, **Then** the tie-breaker is documented and deterministic: prefer (a) `quantization` exact match > prefix match > any; (b) higher `min_params` up to the declared ceiling; (c) most recent `created_at`.

### User Story 6 — Private-model escape hatch (Priority: P2)

As an extension author shipping a bespoke LoRA adapter or custom tokenizer that is not a general-purpose reusable model, I should not have to pollute the host-shared catalog to distribute it.

**Decision**: Use a `private_model: true` flag on `host_model_installs` rows rather than a second table (`ext_model_installs`). Rationale:

- **Single-table query** for `list_installed_models` (no UNION, no per-call-site branch).
- **Lease table is agnostic** — one FK relationship, not two.
- **Reuse of migration and checksum machinery** — private installs get the same download concurrency, SHA-256 validation, and provenance tracking.
- **Auditable** — the host can still see everything on disk; `private_model = true` is just a visibility filter in `list_installed_models` when called from a different extension's context.

**Rejected alternative**: a separate `ext_model_installs` table. Duplicates schema (state, checksum, timestamps), splits the lease FK into two branches, and forces every resolver callsite to query both.

**Acceptance Scenarios**:

1. **Given** an extension installs a model with `private_model = true` and `owner_extension_id = <self>`, **When** another extension calls `list_installed_models`, **Then** the private row is omitted from the response.
2. **Given** a `private_model = true` row, **When** the owning extension is uninstalled, **Then** the private install is automatically scheduled for deletion (after active leases released); shared installs are **not** auto-deleted when an extension uninstalls.
3. **Given** a `private_model = true` row, **When** a different extension declares a matching `model_dependencies` entry, **Then** the resolver does NOT match it; the dependency resolves against public rows only.

### User Story 7 — HF-repo canonical layout (Priority: P2)

As an extension that declares a Hugging Face dependency, I should receive a deterministic on-disk layout so I can construct file paths without probing.

**Decision**: **Manifest-of-files** layout. Each install has a `files.json` manifest listing `[{ relative_path, size_bytes, sha256 }]`. Single-file GGUF installs have a single-entry manifest. Multi-file HF repos (safetensors shards + config + tokenizer) have one entry per file. LoRA adapters with an accompanying tokenizer override have one entry per file.

**Rejected alternatives**:

- **Folder-only (mirror HF repo tree)**: ambiguous for single-file GGUFs and makes checksum scope fuzzy.
- **Single-file only**: excludes safetensors-shard models and LoRAs entirely.

**Canonical on-disk layout**:

```
$host_model_root/
└── <family>/
    └── <version>/
        └── <quantization>/
            └── <variant>/
                ├── files.json            # manifest
                ├── <file1>               # e.g. model.gguf, or pytorch_model-00001-of-00005.safetensors
                ├── <file2>
                └── ...
```

**Acceptance Scenarios**:

1. **Given** an HF repo with 5 safetensors shards + `config.json` + tokenizer, **When** installed, **Then** `files.json` has 7 entries with per-file SHA-256 and the files live under the canonical layout.
2. **Given** a single-file GGUF URL, **When** installed, **Then** `files.json` has one entry pointing at `model.gguf` (or the original filename if meaningful).
3. **Given** a corrupted file after install, **When** the next lease acquire calls `verify_install`, **Then** the discrepancy is detected and the install transitions to `state = 'corrupt'`.

### User Story 8 — Central download concurrency (Priority: P2)

As the host, I cap concurrent downloads at a configurable limit (default 2) so an extension burst doesn't saturate network or disk IOPS, and failed downloads resume instead of restarting from zero.

**Independent Test**: Spawn 10 install requests concurrently with the cap set to 2. At any instant, `list_install_tasks` shows at most 2 with `state = 'downloading'`; the rest are `state = 'queued'`.

**Acceptance Scenarios**:

1. **Given** a `tokio::sync::Semaphore(permits = host.model_download_concurrency)` guarding `download_and_verify`, **When** 10 installs are requested, **Then** the semaphore serializes them to 2-at-a-time.
2. **Given** a download interrupted by process restart (or network flap), **When** the install resumes, **Then** the already-downloaded byte prefix is reused via HTTP `Range` request (when supported by the source) and a full re-download is NOT required.
3. **Given** `files.json` with per-file SHA-256, **When** a file is verified post-download, **Then** a mismatch fails the install with `ModelStoreError::ChecksumMismatch { file, expected, actual }` and the partial files are not left as `ready`.

### User Story 9 — Provenance and license metadata (Priority: P2)

As a compliance reviewer, I need to know where every model came from and under what license, from one place.

**Independent Test**: `SELECT install_id, source_url, license_spdx, license_url, sha256_root FROM host_model_installs WHERE state = 'ready'` returns a non-null license for every install except explicitly `license_spdx = 'UNKNOWN'` ones, which must have a `provenance_note` set.

**Acceptance Scenarios**:

1. **Given** an HF-sourced install, **When** the HF metadata is fetched, **Then** `license_spdx` and `license_url` are populated from the model card; if neither is discoverable, `license_spdx = 'UNKNOWN'` and `provenance_note` is populated with the fallback detail.
2. **Given** a direct-URL install, **When** the user provides `license_spdx` in the install request, **Then** it is persisted verbatim; otherwise the install defaults to `UNKNOWN` with a warn-log.
3. **Given** the `GET /api/v1/host-models` endpoint, **When** called, **Then** each entry in the response includes `license_spdx`, `license_url`, `source_url`, `source_kind` (one of `huggingface | direct_url | local_import | bundled`), and `sha256_root`.

### User Story 10a — Typed `Quantization` enum (Priority: P1)

As a resolver author, I need quantization comparisons that understand families (Q4_K_M ∈ Q4_K_*, NVFP4 vs MXFP4 are distinct 4-bit float formats, F16 and BF16 are not interchangeable), so the tie-breaker in US5.3 produces correct matches instead of string-accidents.

**Decision**: `Quantization` is a closed Rust enum with an `Other(String)` escape hatch for unknown formats. Supported variants at v1:

- **Integer K-quant (GGUF)**: `Q2_K`, `Q3_K_S`, `Q3_K_M`, `Q3_K_L`, `Q4_K_S`, `Q4_K_M`, `Q5_K_S`, `Q5_K_M`, `Q6_K`, `Q8_0`.
- **Legacy GGUF integer**: `Q4_0`, `Q4_1`, `Q5_0`, `Q5_1`.
- **Weight-only GPTQ/AWQ**: `GPTQ4`, `GPTQ8`, `AWQ4`, `AWQ8`.
- **Float**: `F16`, `BF16`, `F32`.
- **Sub-byte float (NVIDIA / OCP)**: `NVFP4` (NVIDIA Blackwell 4-bit float), `MXFP4` (OCP Microscaling 4-bit float), `MXFP6`, `MXFP8`, `FP8_E4M3`, `FP8_E5M2`.
- **Escape**: `Other(String)` — accepted but excluded from family-aware tie-breaking.

**Acceptance Scenarios**:

1. **Given** a dep `quantization: Q4_K_M` and installs `{Q4_K_S, Q4_K_M, Q5_K_M}`, **When** the resolver runs, **Then** `Q4_K_M` wins (exact > family).
2. **Given** a dep `quantization: NVFP4` and an install `quantization: MXFP4`, **When** the resolver runs, **Then** they do NOT match (different 4-bit float schemes — not interchangeable on hardware).
3. **Given** an unknown string `quantization: Q42_FOO` in the manifest, **When** parsed, **Then** it deserializes to `Quantization::Other("Q42_FOO")` with a warn-log, and the resolver treats it as exact-match-only (no family semantics).

### User Story 10b — Content-addressed blob storage (Priority: P2)

As a host storing multiple models that share files (same tokenizer across quants, common safetensors shards across families), I want identical bytes stored once on disk.

**Decision**: files are written to `$host_model_root/blobs/<sha256[0:2]>/<sha256>`; the canonical `<family>/<version>/<quantization>/<variant>/` tree contains hardlinks (preferred) or symlinks (fallback on filesystems without hardlink support across mount boundaries) into the blob store. `files.json` continues to describe logical paths; the blob layer is an implementation detail below it.

**Acceptance Scenarios**:

1. **Given** two installs whose `files.json` entries include a byte-identical `tokenizer.json` (same sha256), **When** both are installed, **Then** exactly one file exists under `blobs/` and both install trees link to it.
2. **Given** a blob no longer referenced by any install (after all referencing installs transition to `reclaimed`), **When** `gc_blobs` runs, **Then** the unreferenced blob is removed.
3. **Given** a filesystem that does not support hardlinks at the target path, **When** an install materializes, **Then** it falls back to symlinks and logs a warn; correctness is preserved, disk savings are unchanged.

### User Story 10c — Dry-run resolver endpoint (Priority: P2)

As a frontend showing an extension's install preview, I want to know "what will be downloaded, how much disk, how much VRAM" before the user clicks Install.

**Decision**: `POST /api/v1/host-models/resolve` accepts a `ResolveRequestDto { dependencies: Vec<ModelDependency> }` and returns a `ResolveReportDto { matched: [...], missing: [{dep, estimated_bytes, source_url}], unsatisfiable: [...], total_download_bytes, total_disk_bytes_after, estimated_vram_bytes_peak }`. The endpoint MUST NOT mutate state (no rows inserted, no downloads enqueued).

**Acceptance Scenarios**:

1. **Given** a manifest whose deps are all already `ready`, **When** `/resolve` is POSTed, **Then** `missing: []` and `total_download_bytes: 0`.
2. **Given** a dep with no local match but resolvable on HF, **When** `/resolve` is POSTed, **Then** `missing[0].estimated_bytes` is populated from the HF metadata head/probe, and `host_model_installs` row-count is unchanged before and after the call.
3. **Given** a dep that is unsatisfiable (e.g. HF repo returns 404), **When** `/resolve` is POSTed, **Then** it appears under `unsatisfiable` with a typed `UnsatisfiableReason`, not `missing`.

### User Story 10 — Exhaustive `ModelStoreError` mapping (Priority: P2)

As an API handler, I must map every error variant to a distinct HTTP status; adding a new variant must break the build until I handle it.

**Acceptance Scenarios**:

1. **Given** `ModelStoreError` is defined with `#[non_exhaustive]` **not** set internally, **When** `http_status_for_model_error` is written as an exhaustive match (no `_ =>` arm), **Then** adding a new variant produces a compile error.
2. **Given** each variant, **When** triggered via an integration test, **Then** the HTTP response has the expected status + stable error code (e.g. `CHECKSUM_MISMATCH`, `INSUFFICIENT_VRAM`, `INSTALL_NOT_FOUND`, `LEASED_BY_EXTENSIONS`, `SOURCE_UNREACHABLE`).

### User Story 12 — Revision pinning by default (Priority: P1)

As a compliance reviewer, I need every install to be traceable to an immutable upstream revision so that "the llama-3-8b-instruct we shipped" means exactly one sequence of bytes forever.

**Decision**: `revision` is REQUIRED on every `model_dependencies` entry unless `allow_unpinned: true` is explicitly set. For `source_kind = huggingface`, `revision` is the git commit SHA on the HF repo. For `source_kind = direct_url`, `revision` is the expected `sha256_root` (tamper-evident pin). For `source_kind = local_import | bundled`, `revision` is the `sha256_root` computed at ingest time.

**Rationale**: HF tags and branches (e.g. `main`) are mutable; an unpinned `version: llama-3-8b-instruct` can silently change bytes across redeployments. Pinning default-on trades a small authoring cost for reproducible deployments.

**Acceptance Scenarios**:

1. **Given** a manifest dep without `revision` and without `allow_unpinned: true`, **When** the manifest parses, **Then** `ExtensionError::ManifestParse { detail: "revision required; set allow_unpinned: true to opt out" }` is returned.
2. **Given** a manifest dep with `revision: abc123...` and an HF repo whose current `main` SHA is `def456...`, **When** the install runs, **Then** `abc123...` is fetched (not `main`), and the resulting `host_model_installs.source_revision = 'abc123...'`.
3. **Given** a manifest dep with `allow_unpinned: true`, **When** the install runs, **Then** the current upstream revision is resolved at install time, pinned into `source_revision`, and a warn-log records the unpinned authoring.
4. **Given** two manifests declaring the same `(family, version, quantization)` but different `revision` values, **When** both extensions activate, **Then** two distinct `host_model_installs` rows exist (different `sha256_root`) — the unique index includes `sha256_root`, not just the tuple.

## Edge Cases

- **Concurrent identical installs**: resolved by US1 scenario 3 — second caller waits on the in-flight download, not a duplicate download.
- **Partial downloads across process restarts**: resume via `Range` (US8.2); if the source does not support ranges, the install resumes from zero but logs a warn so operators can notice.
- **Non-semver `version` strings**: `version` is free-form; ordering tie-breakers in US5.3 are `created_at`-based, not semver-based. The resolver does NOT try to parse `version` as semver; extensions that want semver semantics can declare constraints via the accepted variant list (future spec) — out of scope here.
- **Private install orphaned after extension uninstall**: private installs are scheduled for deletion (not immediately deleted) so any in-flight leases can drain. After a configurable grace period (`host.private_model_reclaim_grace`, default 24h) with no active leases, the files are removed and the row transitions to `state = 'reclaimed'`.
- **Private-model flag + `model_dependencies`**: resolver MUST NOT match private installs owned by a different extension (US6.3). A private install owned by `ext-A` is invisible to `ext-B`'s resolver even if `(family, version, quantization)` match.
- **License = UNKNOWN**: allowed with a `provenance_note`; never silently defaulted. A warn-log is emitted on install.

## Requirements *(mandatory)*

### Functional Requirements

#### Data model

- **FR-501**: `host_model_installs` table MUST be added with columns: `install_id TEXT PRIMARY KEY`, `family TEXT NOT NULL`, `version TEXT NOT NULL`, `quantization TEXT`, `variant TEXT NOT NULL DEFAULT 'default'`, `install_root TEXT NOT NULL`, `files_manifest TEXT NOT NULL` (JSON blob of `files.json`), `sha256_root TEXT NOT NULL` (Merkle root over the sorted per-file hashes; also serves as the content-address identity of the install), `source_revision TEXT NOT NULL` (HF commit SHA for `huggingface`; `sha256_root` for other sources — see US12), `state TEXT NOT NULL` (one of `queued | downloading | verifying | ready | corrupt | reclaimed | failed`), `last_failure_category TEXT`, `source_kind TEXT NOT NULL` (one of `huggingface | direct_url | local_import | bundled`), `source_url TEXT`, `license_spdx TEXT`, `license_url TEXT`, `provenance_note TEXT`, `private_model INTEGER NOT NULL DEFAULT 0`, `owner_extension_id TEXT` (NULL iff `private_model = 0`; set iff `private_model = 1`), `created_at TEXT NOT NULL`, `updated_at TEXT NOT NULL`. Unique index on `(family, version, quantization, variant, sha256_root, private_model, COALESCE(owner_extension_id, ''))` — distinct `revision`s produce distinct rows (US12.4).
- **FR-502**: `host_model_leases` table MUST be added with columns: `lease_id TEXT PRIMARY KEY`, `install_id TEXT NOT NULL REFERENCES host_model_installs(install_id)`, `extension_id TEXT NOT NULL`, `device TEXT NOT NULL` (e.g. `cpu`, `cuda:0`), `vram_reserved_bytes INTEGER NOT NULL DEFAULT 0`, `acquired_at TEXT NOT NULL`, `released_at TEXT`. Index on `(device, released_at)` for active-lease scans.
- **FR-503**: Schema migrations MUST be additive; no destructive change to `host_runtime_installs` or `host_runtime_leases`.

#### Module layout

- **FR-504**: `crates/nexus-backend-runtimes/src/installs_store/` MUST be renamed to `runtime_installs_store/`. A re-export shim `pub use runtime_installs_store as installs_store;` in `lib.rs` preserves the old path for one minor version; it is deleted in Phase J.
- **FR-505**: `crates/nexus-backend-runtimes/src/models_store/` MUST be added with submodules: `mod.rs` (public API), `schema.rs` (table DDL), `install.rs` (`install_model`, `uninstall_model`, dedup, private-flag handling), `download.rs` (semaphore-guarded download + `Range`-aware resume + checksum verification), `blobs.rs` (content-addressed blob store under `$root/blobs/<sha[0:2]>/<sha>`, hardlink/symlink materialization, `gc_blobs`; US10b), `quantization.rs` (typed `Quantization` enum incl. NVFP4/MXFP4; US10a), `leases.rs` (`acquire_lease`, `release_lease`, `list_active_leases`, VRAM accounting), `resolver.rs` (`check_model_dependencies`, tie-breaker, `resolve_dry_run` for US10c), `provenance.rs` (license + source metadata helpers), `errors.rs` (`ModelStoreError`). Every submodule ≤ 350 LOC (Principle III).
- **FR-506**: `ModelDependency` type MUST live in `nexus-extension::manifest` (parsed from YAML) and be `serde::Deserialize`-able from the schema in US4. `ManifestParse` error (existing) is reused for malformed blocks.

#### Install lifecycle

- **FR-507**: `install_model(request) -> BackendRuntimeResult<InstalledModelDto>` MUST: (1) compute the unique tuple key, (2) insert-or-return-existing atomically via `INSERT ... ON CONFLICT DO NOTHING RETURNING` or a `SELECT ... FOR UPDATE`-equivalent pattern (SQLite's `BEGIN IMMEDIATE`), (3) enqueue the download if the row is newly-inserted, (4) return the row.
- **FR-508**: `uninstall_model(install_id) -> BackendRuntimeResult<()>` MUST return `ModelStoreError::LeasedByExtensions { extensions }` when active leases exist (US3.3).
- **FR-509**: Private installs (US6) MUST use `private_model = 1` and `owner_extension_id = <ext-id>` on `host_model_installs`. No separate table.
- **FR-510**: Download concurrency MUST be capped by a `tokio::sync::Semaphore` whose permit count is configurable via host config `host.model_download_concurrency` (default 2). Resumability MUST use HTTP `Range` when `source_kind in {huggingface, direct_url}` and the source advertises `Accept-Ranges: bytes`; absence of range support falls back to full re-download + warn-log.

#### Resolver

- **FR-511**: `check_model_dependencies(deps: &[ModelDependency], pool: &SqlitePool, ctx: ResolutionContext) -> BackendRuntimeResult<ModelResolutionReport>` MUST return in <100ms P95 over 1000 invocations with 50 installs + 5 deps on reference hardware (SC-502). The report MUST expose `matched`, `missing`, and `unsatisfiable` as three disjoint `Vec`s.
- **FR-512**: Tie-breaker (US5.3) MUST be: (1) quantization match (exact > prefix > any), (2) `min_params` ceiling fit, (3) `created_at DESC`. Deterministic; no randomness.
- **FR-513**: The resolver MUST NOT match private installs owned by a different extension than the caller's `ResolutionContext::extension_id`.

#### Provenance

- **FR-514**: Every `ready` install MUST have `license_spdx` populated; the literal value `UNKNOWN` is permitted only when `provenance_note` is non-empty.
- **FR-515**: `GET /api/v1/host-models` response MUST include `license_spdx`, `license_url`, `source_url`, `source_kind`, `sha256_root` per entry. (DTO already exists; wire the new fields into it.)

#### Error taxonomy

- **FR-516**: `ModelStoreError` MUST be a `thiserror::Error` enum with at minimum: `InstallNotFound { install_id }`, `LeasedByExtensions { extensions }`, `ChecksumMismatch { file, expected, actual }`, `InsufficientResources { device, requested, available }`, `SourceUnreachable { source, detail }`, `ManifestInvalid { detail }`, `Storage(sqlx::Error)`, `Io(std::io::Error)`. No `#[non_exhaustive]` inside the crate; exhaustive matches required on all handlers.
- **FR-517**: `http_status_for_model_error(&ModelStoreError) -> (StatusCode, &'static str)` MUST be exhaustive (no `_ =>` arm), mirroring `http_status_for` in spec 016 FR-412.

#### API surface

- **FR-518**: Existing DTOs (`InstallModelRequestDto`, `InstalledModelDto`, `ModelInstallTaskDto`, `ModelLimitsDto`) MUST remain source-compatible; field additions are allowed, removals/renames are not.
- **FR-519**: A new endpoint `POST /api/v1/host-models/{install_id}/leases` and its companion `DELETE /api/v1/host-models/leases/{lease_id}` MUST be added, mirroring the runtime-lease endpoints.
- **FR-520**: A new endpoint `POST /api/v1/host-models/resolve` (US10c) MUST accept `ResolveRequestDto` and return `ResolveReportDto` without mutating any table or filesystem state. Verified by asserting row-count and blob-count invariants before/after the call.
- **FR-521**: `Quantization` (US10a) MUST be a closed Rust enum with the variants listed in US10a plus `Other(String)`. `serde` deserialization is case-insensitive for known variants; unknown strings deserialize to `Other` and emit a warn-log on manifest parse.
- **FR-522**: `ModelDependency::revision` (US12) MUST be `Option<String>`. Manifest parse MUST reject `None` unless `allow_unpinned: true` is set; installed rows always have `source_revision` populated (resolved at install time when unpinned).
- **FR-523**: Content-addressed storage (US10b) MUST place downloaded files under `$host_model_root/blobs/<sha256[0:2]>/<sha256>` and materialize the per-install tree via hardlink; symlink is a documented fallback. A `gc_blobs` routine MUST remove blobs not referenced by any non-`reclaimed` install.
- **FR-524**: The HTTP surface MUST be sufficient for a downstream host-app UI to render **Backend Runtimes** and **Models** as two separate top-level sidebar menus, both scoped to the host (not to any extension). Concretely: (a) list endpoints for runtimes (`GET /api/v1/host-runtimes`) and models (`GET /api/v1/host-models`) return rows with no required extension-scope filter; (b) the `owner_extension_id` / `private_model` fields on a model row are visibility hints for private-install filtering (US6.1), not an ownership signal that would relegate the entry to an extension-scoped view; (c) no new DTOs or schema changes are required for the downstream UI spec to render two distinct menus.

### Key Entities

- **`ModelDependency`** (new, `nexus-extension::manifest`): `{ family, version, revision: Option<String>, allow_unpinned: bool, min_params: Option<ParamCount>, quantization: Option<Quantization>, variant: Option<String>, required: bool }`. Parse rejects `revision = None` when `allow_unpinned = false` (US12).
- **`Quantization`** (new, `nexus-backend-runtimes::models_store::quantization`, re-exported from `nexus-extension::manifest`): closed enum with K-quant (`Q2_K`..`Q8_0`), legacy (`Q4_0`..`Q5_1`), weight-only (`GPTQ4`, `GPTQ8`, `AWQ4`, `AWQ8`), float (`F16`, `BF16`, `F32`), sub-byte float (`NVFP4`, `MXFP4`, `MXFP6`, `MXFP8`, `FP8_E4M3`, `FP8_E5M2`), and `Other(String)`. Implements family-match semantics used by the resolver tie-breaker.
- **`ParamCount`** (new, `nexus-extension::manifest`): typed parse of strings like `"7B"`, `"13B"`, `"70B"` into `u64` parameter counts. Rejects ambiguous input with `ExtensionError::ManifestParse`.
- **`ModelResolutionReport`** (new, `nexus-backend-runtimes::models_store::resolver`): `{ matched: Vec<(ModelDependency, InstalledModelRow)>, missing: Vec<ModelDependency>, unsatisfiable: Vec<(ModelDependency, UnsatisfiableReason)> }`.
- **`InstalledModelRow`** (new, `nexus-backend-runtimes::models_store`): Rust-side mirror of `host_model_installs`; `InstalledModelDto` projects from it.
- **`ModelLease`** (new, `nexus-backend-runtimes::models_store::leases`): active-lease row.
- **`FilesManifest`** (new, `nexus-backend-runtimes::models_store`): `Vec<FileEntry>` where `FileEntry = { relative_path, size_bytes, sha256 }`; serialized into `host_model_installs.files_manifest` JSON column.

## Success Criteria *(mandatory)*

- **SC-501**: `host_model_installs` and `host_model_leases` tables exist with the FR-501/FR-502 schema; `cargo sqlx prepare` (if applicable) passes; migrations apply cleanly against an empty DB and against a DB populated from pre-017 runtime-only schema.
- **SC-502**: `check_model_dependencies` P95 latency < 100ms over 1000 invocations with 50 installs + 5-dep manifest. Measured via a bench test in `crates/nexus-backend-runtimes/tests/model_resolver_latency.rs`.
- **SC-503**: Every file in `crates/nexus-backend-runtimes/src/models_store/` ≤ 350 LOC.
- **SC-504**: `grep -R "installs_store" crates/nexus-backend-runtimes/src/ crates/nexus-api/src/` returns only `runtime_installs_store` / `models_store` references after Phase J (shim removed).
- **SC-505**: `cargo test --workspace` green. `cargo clippy --workspace --all-targets -- -D warnings` clean.
- **SC-506**: Contract test: install the same `(family, version, quantization)` from two extensions concurrently → exactly one row, one on-disk copy, one download. Asserts byte-identity of the on-disk blob across the two `InstalledModelDto` responses.
- **SC-507**: Contract test: lease budget exhaustion on a simulated 12GB GPU with two 8GB installs → second `acquire_lease` returns `InsufficientResources`, not panic, not OOM.
- **SC-508**: Contract test: uninstall blocked by active lease → `LeasedByExtensions { extensions }` returned verbatim.
- **SC-509**: License coverage: `SELECT COUNT(*) FROM host_model_installs WHERE state = 'ready' AND (license_spdx IS NULL OR (license_spdx = 'UNKNOWN' AND (provenance_note IS NULL OR provenance_note = '')))` = 0.
- **SC-510**: No silent errors: grep for `let _ =.*\.await` in `crates/nexus-backend-runtimes/src/models_store/` returns zero hits outside tests.
- **SC-511**: Content-addressed dedup (US10b): installing two rows that share a byte-identical `tokenizer.json` results in exactly one blob file under `$host_model_root/blobs/`; `gc_blobs` after both are `reclaimed` removes it.
- **SC-512**: Revision pinning (US12): `SELECT COUNT(*) FROM host_model_installs WHERE source_revision IS NULL OR source_revision = ''` returns 0 in any post-install state.
- **SC-513**: Dry-run (US10c): contract test asserts `(count(host_model_installs), count(blobs/**))` is unchanged across a `/resolve` call with previously-unknown dependencies.
- **SC-514**: Quantization (US10a): unit tests cover (a) Q4_K_M exact beats Q4_K_S family-match beats Q5_K_M no-match, (b) NVFP4 ≠ MXFP4, (c) `Other("Q42_FOO")` round-trips through serde without panic and participates in exact-match only.
