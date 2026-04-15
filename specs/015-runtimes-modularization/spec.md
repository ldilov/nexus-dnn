# Feature Specification: Backend Runtimes Modularization

**Feature Branch**: `015-runtimes-modularization`
**Created**: 2026-04-15
**Status**: Draft
**Input**: Close Principle III, V, and VII gaps flagged by `/rust-review` in `nexus-backend-runtimes`. Split `spawn.rs` (1071 LOC) and `installs_store.rs` (771 LOC) into cohesive submodules, shrink `Spawner::spawn` (143 LOC) and `spawn_real` (183 LOC), centralize the `"llama.cpp"` family string (parallel-registry violation), replace the implicit dual-mode `Spawner` with an explicit `SpawnMode` enum, fix the `reqwest::Client::new()` fallback and several minor silenced-error sites.

## Executive Summary

`nexus-backend-runtimes` has five review findings that compound each other:

1. **spawn.rs 1071 LOC** with two 100+ LOC methods (`spawn`, `spawn_real`) and free-standing helpers.
2. **installs_store.rs 771 LOC** mixing migration, relocation, and resolution.
3. **Parallel "llama.cpp" registry** — the family string is matched in 6 sites across 5 files (Single-Choice violation).
4. **Dual-mode `Spawner`** — `self.pool.is_some() && self.adapters.is_some()` branch is an enum-in-disguise.
5. **Silent `reqwest::Client::new()` fallback** on builder failure; silent `unwrap_or_default()` in `migrate_from_legacy`'s JSON construction; silent `let _ = query_as(...)` in archive enumeration.

## Architectural Intent

### Core principles applied

- **Single-Choice (Appendix A)**: one `RuntimeFamily` newtype module owns the exhaustive family registry. All match arms delegate.
- **Linguistic-Modular-Units (Appendix A)**: `spawn/port.rs`, `spawn/real.rs`, `spawn/stub.rs`, `spawn/supervise.rs` each name a distinct runtime-spawn concern.
- **POLA (Principle II)**: `Spawner` mode is explicit via `SpawnMode` enum, not an implicit `Option` combination.
- **No silenced errors (Principle VII)**: every `.await` that returns `Result` propagates or logs.

### Non-goals

- The `Spawner` public API (`spawn`, `shutdown`, `lease_state`, etc.) stays stable — downstream crates see no diff.
- No new family adapters. Only the registry centralization.
- The `install_pipeline::run_inner` 9-arg function is tolerated via `#[allow(clippy::too_many_arguments)]` in Phase 1 (spec 013) with a planned `InstallCtx` refactor here.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — spawn.rs splits into five focused submodules (Priority: P1)

As a maintainer debugging a spawn issue, I open `spawn/real.rs` and see only the real-fork spawn + supervisor setup — not 1000 unrelated lines.

**Independent Test**: After the split, `wc -l crates/nexus-backend-runtimes/src/spawn/*.rs` all ≤ 400 LOC. `cargo test -p nexus-backend-runtimes` passes unchanged.

**Acceptance Scenarios**:

1. **Given** the split, **When** `spawn/mod.rs` is read, **Then** it contains only the `Spawner` struct, `SpawnMode` enum, public constructors, and the public orchestrator methods that dispatch to submodules.
2. **Given** `spawn/supervise.rs`, **Then** it owns `supervise_real`, `SupervisorCtx`, `drain_stream`.
3. **Given** `spawn/port.rs`, **Then** it owns `PortAllocator`, `PortLease`, `RuntimeBindMode`.
4. **Given** `spawn/host_env.rs`, **Then** it owns `build_host_env` + host-governed injection logic (`load_host_governed_injections`, `HOST_GOVERNED_INJECTABLE_FLAGS`).

### User Story 2 — `Spawner::spawn` and `spawn_real` drop below 25 LOC each (Priority: P1)

As a reviewer of a future change to the real-fork path, I see `spawn_real` as a 5-step orchestrator calling named helpers, not a 183-line monolith.

**Independent Test**: After the method splits, `spawn` ≤ 25 LOC, `spawn_real` ≤ 25 LOC. Each helper (`build_test_lease`, `spawn_supervisor_task`, `validate_install_row`, `fork_child`, `insert_lease_row`) is ≤ 40 LOC and named after its responsibility.

**Acceptance Scenarios**:

1. **Given** `spawn`, **When** read, **Then** it reads as `validate → build_test_lease → spawn_supervisor_task → assemble response` with no nested match/loop logic.
2. **Given** `spawn_real`, **When** read, **Then** it reads as `validate_install_row → resolve adapter → fork_child → insert_lease_row → supervise_real` with no inline SQL or serde construction beyond `?`-propagated helper calls.

### User Story 3 — Explicit `SpawnMode` enum replaces the dual-mode `Option` pair (Priority: P1)

As a reader of `Spawner`, I see at type-level whether a given instance spawns stubs or real children — no runtime introspection of `Option::is_some`.

**Independent Test**: `Spawner` has a `mode: SpawnMode` field; `SpawnMode::Stub { port_allocator }` and `SpawnMode::Real { pool, adapters, port_allocator, broadcast }` are explicit. `Spawner::new(publisher)` returns stub mode; `Spawner::with_pool(pool, adapters, publisher)` returns real mode.

**Acceptance Scenarios**:

1. **Given** a stub `Spawner`, **When** `spawn` is called, **Then** dispatch matches `SpawnMode::Stub`.
2. **Given** a real `Spawner`, **When** `spawn` is called, **Then** dispatch matches `SpawnMode::Real` and forks a child.
3. **Given** the matches on `SpawnMode` across `spawn`, `shutdown`, and `list_live_leases_for_install`, **Then** all three are exhaustive — adding a new mode variant is a compile error at every site (per FR-305).

### User Story 4 — `installs_store.rs` splits into lifecycle-stage submodules (Priority: P2)

As a maintainer adding a new runtime family that needs custom migration, I edit `installs_store/migration.rs`, not a 771-LOC mixed-concerns file.

**Independent Test**: `installs_store/` contains `mod.rs`, `migration.rs`, `relocation.rs`, `resolution.rs`. Each ≤ 250 LOC. `cargo test -p nexus-backend-runtimes --test migration_startup` passes unchanged.

**Acceptance Scenarios**:

1. **Given** the split, **When** `migration.rs` is read, **Then** it contains `migrate_from_legacy`, `migrated_guard_tripped`, `legacy_table_exists`, and the new `build_binary_paths_json` helper.
2. **Given** `relocation.rs`, **Then** it contains `relocate_legacy_binaries` + `rewrite_binary_paths`.
3. **Given** `resolution.rs`, **Then** it contains `resolve_dependency` + `version_satisfies`.

### User Story 5 — `RuntimeFamily` newtype centralizes the family-string registry (Priority: P2)

As a maintainer adding a `vllm` backend runtime, I add one line to `src/family.rs::FAMILIES` and every call site across `spawn.rs`, `compatibility.rs`, `installs_store.rs`, `backends.rs`, `parameter_catalog.rs` automatically routes correctly.

**Independent Test**: After the change, grep for `"llama.cpp"` returns matches only in `src/family.rs` (definition) and test files. Every branch on family in production code goes through `RuntimeFamily::canonical(&str) -> Option<RuntimeFamily>` or `RuntimeFamily::as_str(&self) -> &'static str`.

**Acceptance Scenarios**:

1. **Given** `RuntimeFamily::canonical("llama.cpp")`, **When** called, **Then** returns `Some(RuntimeFamily::LlamaCpp)`.
2. **Given** `RuntimeFamily::canonical("llamacpp")`, **When** called, **Then** returns `Some(RuntimeFamily::LlamaCpp)` (alias preserved).
3. **Given** a new enum variant `RuntimeFamily::VLlm` added, **Then** the workspace fails to compile until every match in the registry handles it.

### User Story 6 — `install_pipeline::run_inner` args group into `InstallCtx` (Priority: P2)

As a future caller, I pass one `InstallCtx { manifest, machine, request, runtimes_root, pool, publisher, cancel, task_id }` struct to `run_inner`, eliminating the 9-arg signature and the `#[allow(too_many_arguments)]`.

**Independent Test**: `run_inner` takes 2 arguments (`&InstallCtx`, `progress_fn: F`). The `#[allow]` is removed. All callers compile.

**Acceptance Scenarios**:

1. **Given** `InstallCtx`, **When** `run_inner` is called, **Then** the signature is `run_inner(&ctx, progress_fn)`.
2. **Given** `cargo clippy`, **When** run, **Then** no `too_many_arguments` warning anywhere in `nexus-backend-runtimes`.

### User Story 7 — Silenced errors in migration + supervisor cleaned (Priority: P2)

As an operator, migration failures and HTTP-client construction failures surface in logs instead of silently degrading.

**Acceptance Scenarios**:

1. **Given** `build_binary_paths_json` in `migration.rs`, **When** `serde_json::to_string` fails, **Then** the error propagates as `BackendRuntimeError`.
2. **Given** `supervise_real`, **When** `reqwest::Client::builder().build()` fails, **Then** the failure is logged via `tracing::warn!` and the task exits cleanly rather than constructing a fallback client silently.

## Edge Cases

- The `SpawnMode` refactor must keep `Spawner::new` (stub) and `Spawner::with_pool` (real) source-compatible for existing callers.
- `RuntimeFamily` canonicalization must preserve the `"llama.cpp"` ↔ `"llamacpp"` alias on the read side. Wire serialization uses the canonical form `"llama.cpp"`.
- `dedup_preserve_order` signature change (owned → borrowed) is a single-call-site change inside spawn.rs.

## Requirements *(mandatory)*

### Functional Requirements

#### spawn.rs split

- **FR-301**: `spawn.rs` MUST be replaced by `spawn/mod.rs` + submodules `port`, `stub`, `real`, `supervise`, `host_env`.
- **FR-302**: Every submodule MUST be ≤ 400 LOC.
- **FR-303**: `Spawner::spawn`, `Spawner::spawn_real`, and every extracted helper (`build_test_lease`, `spawn_supervisor_task`, `validate_install_row`, `fork_child`, `insert_lease_row`) MUST each be ≤ **25 LOC** (Constitution Principle III SHOULD soft limit, applied uniformly per analyze-pass H4). The previous 40-LOC budget for helpers is removed. Documented exceptions: `tokio::select!` state machines and exhaustive `match self.mode` arms — each such exception MUST be flagged in the PR description with a one-line justification per Principle III's state-machine carve-out.

#### SpawnMode

- **FR-304**: `Spawner` MUST carry an explicit `SpawnMode` enum with `Stub { port_allocator: Arc<RwLock<PortAllocator>> }` and `Real { pool: SqlitePool, adapters: Arc<AdapterRegistry>, port_allocator: Arc<RwLock<PortAllocator>> }` variants. The `publisher: SharedPublisher` field MUST stay on the `Spawner` struct (not inside `SpawnMode`) because both modes publish events through the same broadcast (per analyze-pass M7 — single ownership avoids dual-publisher confusion).
- **FR-305**: Every method on `Spawner` that branches on mode MUST use `match self.mode`, exhaustively. Required match sites: `spawn`, `shutdown`, `list_live_leases_for_install`, plus any future method that reads `pool` or `adapters`. Adding a new `SpawnMode` variant MUST produce a compile error at every such site (per analyze-pass M10).
- **FR-306**: `Spawner::new(publisher)` MUST construct `SpawnMode::Stub` and remain source-compatible. `Spawner::with_pool(pool, adapters, publisher)` MUST construct `SpawnMode::Real` and remain source-compatible.

#### installs_store.rs split

- **FR-307**: `installs_store.rs` MUST be replaced by `installs_store/mod.rs` + `migration.rs`, `relocation.rs`, `resolution.rs`.
- **FR-308**: Every submodule MUST be ≤ 250 LOC.

#### RuntimeFamily centralization

- **FR-309**: A new module `crates/nexus-backend-runtimes/src/family.rs` MUST expose `RuntimeFamily` enum + `canonical(&str) -> Option<RuntimeFamily>` + `as_str(&self) -> &'static str` + `is_alias_of(&str) -> bool`.
- **FR-310**: Every production match on family strings MUST delegate to `RuntimeFamily`. Raw `"llama.cpp"` / `"llamacpp"` literals MUST NOT appear outside `family.rs` and `#[cfg(test)]` code.

#### InstallCtx

- **FR-311**: `install_pipeline::run_inner` MUST take `&InstallCtx` instead of 8 scalar args. The `#[allow(too_many_arguments)]` MUST be removed.

#### Error propagation

- **FR-312**: `build_binary_paths_json` helper MUST be extracted from `migrate_from_legacy`; the helper returns `Result<String, BackendRuntimeError>` and callers propagate via `?`.
- **FR-313**: `supervise_real` MUST NOT use `unwrap_or_else(|_| reqwest::Client::new())` — the failing builder path MUST log `tracing::warn!` with the error and exit the supervisor task cleanly.
- **FR-314**: `dedup_preserve_order` MUST accept `&[String]` and return `Vec<String>`, eliminating the per-element clone via `BTreeSet<&str>`.

### Key Entities

- **RuntimeFamily**: enum with `LlamaCpp` (and future variants); `canonical`, `as_str`, `is_alias_of`.
- **SpawnMode**: enum `Stub { port_allocator: Arc<RwLock<PortAllocator>> }` | `Real { pool: SqlitePool, adapters: Arc<AdapterRegistry>, port_allocator: Arc<RwLock<PortAllocator>> }`. Publisher stays on `Spawner` per FR-304.
- **InstallCtx**: struct grouping the 8 `run_inner` args.

## Success Criteria *(mandatory)*

- **SC-301**: No file under `crates/nexus-backend-runtimes/src/spawn/*.rs` or `installs_store/*.rs` exceeds 400 LOC.
- **SC-302**: `Spawner::spawn` and `Spawner::spawn_real` are ≤ 25 LOC each (body only).
- **SC-303**: `cargo test -p nexus-backend-runtimes --tests` count matches baseline ± 0.
- **SC-304**: `cargo clippy --workspace --all-targets -- -D warnings` clean.
- **SC-305**: Grep for `"llama.cpp"` / `"llamacpp"` returns hits only in `family.rs` + `#[cfg(test)]` code.
- **SC-306**: Zero `#[allow(clippy::too_many_arguments)]` in production code after US6.
- **SC-307**: No `unwrap_or_default` / `unwrap_or_else(|_| Client::new())` / `let _ =` on `Result`s in `nexus-backend-runtimes/src/**` outside tests.
