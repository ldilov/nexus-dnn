# Tasks: Runtimes Modularization

**Input**: Design documents from `/specs/015-runtimes-modularization/`
**Prerequisites**: spec.md, plan.md; recommend landing spec 014 first (independent, but cleaner)
**Tests**: existing `nexus-backend-runtimes` + `nexus-api` suites are the safety net (Principle VI(b) refactor exception). Three new tests added for warn-log, SpawnMode dispatch, and RuntimeFamily canonicalization.

## Sequencing invariant

Per Principle IX. Recommended order: US5 (RuntimeFamily) → US4 (installs_store split) → US1 (spawn split, file moves only) → US3 (SpawnMode) → US2 (method splits) → US6 (InstallCtx) → US7 (error propagation).

---

## Phase 1: Baseline

- [ ] T401 Capture baseline: `cargo test -p nexus-backend-runtimes -p nexus-api --tests 2>&1 | tee /tmp/015-baseline.txt`. Record counts.

---

## Phase 2: US5 — `RuntimeFamily` centralization (P2, foundation)

### Tests (write first — RED)

- [ ] T410 [P] [US5] Unit test in `crates/nexus-backend-runtimes/src/family.rs`: `RuntimeFamily::canonical("llama.cpp")` → `Some(LlamaCpp)`, `"llamacpp"` → same, `"vllm"` → `None`. `as_str(&LlamaCpp)` → `"llama.cpp"`.

### Implementation

- [ ] T411 [US5] Create `crates/nexus-backend-runtimes/src/family.rs`: `#[non_exhaustive] pub enum RuntimeFamily { LlamaCpp }` + `canonical`, `as_str`, `is_alias_of` + `#[cfg(test)] mod tests`.
- [ ] T412 [US5] Add `pub mod family;` + `pub use family::RuntimeFamily;` to `lib.rs`.
- [ ] T413 [P] [US5] Migrate `compatibility.rs::pair_allowed` to `RuntimeFamily::canonical(backend).map(|f| f == RuntimeFamily::LlamaCpp)`.
- [ ] T414 [P] [US5] Migrate `installs_store` family match arms to `RuntimeFamily::as_str`.
- [ ] T415 [P] [US5] Migrate `spawn.rs::row_to_install_manifest` family branches.
- [ ] T416 [P] [US5] Migrate `nexus-api/src/handlers/backends.rs::parameter_catalog` family match.
- [ ] T417 [P] [US5] Migrate `parameter_catalog.rs` internal family dispatch.

### Verification

- [ ] T418 [US5] Grep: `grep -rn '"llama\.cpp"\|"llamacpp"' crates/nexus-backend-runtimes/src/ crates/nexus-api/src/ | grep -v family.rs | grep -v '#\[cfg(test)\]'` returns zero hits.

---

## Phase 3: US4 — `installs_store.rs` split (P2)

- [ ] T420 [US4] Create `crates/nexus-backend-runtimes/src/installs_store/` directory; move `installs_store.rs` → `installs_store/mod.rs`.
- [ ] T421 [P] [US4] Extract `migration.rs` (migrate_from_legacy, migrated_guard_tripped, legacy_table_exists, build_binary_paths_json helper).
- [ ] T422 [P] [US4] Extract `relocation.rs` (relocate_legacy_binaries, rewrite_binary_paths).
- [ ] T423 [P] [US4] Extract `resolution.rs` (resolve_dependency, version_satisfies).
- [ ] T424 [US4] `mod.rs` retains `RuntimeInstallRow`, `storage` error helper, `load_by_id`, `list_all`, `hydrate_on_start`, `delete_row`, `remove_binary_directory`, `list_dependents`.

### Verification

- [ ] T425 [US4] `cargo test -p nexus-backend-runtimes --test migration_startup` GREEN; every submodule ≤ 250 LOC.

---

## Phase 4: US1 — `spawn.rs` split (P1, file moves only)

- [ ] T430 Create `crates/nexus-backend-runtimes/src/spawn/` directory; move `spawn.rs` → `spawn/mod.rs`.
- [ ] T431 [P] [US1] Extract `port.rs` (PortAllocator, PortLease, RuntimeBindMode + PortLease Drop impl).
- [ ] T432 [P] [US1] Extract `supervise.rs` (supervise_real, SupervisorCtx, drain_stream).
- [ ] T433 [P] [US1] Extract `host_env.rs` (build_host_env, load_host_governed_injections, HOST_GOVERNED_INJECTABLE_FLAGS).
- [ ] T434 [US1] `mod.rs` keeps: Spawner struct, SpawnRuntimeRequest/Response, LeaseHandle, validate_spawn_request, http_status_for, impl Spawner (both modes in one block for now; split in Phase 5).

### Verification

- [ ] T435 [US1] `cargo test -p nexus-backend-runtimes -p nexus-api --tests` GREEN; every submodule ≤ 400 LOC.

---

## Phase 5: US3 — `SpawnMode` enum (P1)

### Tests (write first — RED)

- [ ] T440 [P] [US3] Unit test `spawn::mode_dispatch_exhaustive`: construct stub Spawner, call `spawn`, assert stub path; construct real Spawner with mock pool+adapters, assert real path chosen.

### Implementation

- [ ] T441 [US3] Define `pub enum SpawnMode { Stub { port_allocator: Arc<RwLock<PortAllocator>> }, Real { pool: SqlitePool, adapters: Arc<AdapterRegistry>, port_allocator: Arc<RwLock<PortAllocator>>, broadcast: Arc<BroadcastPublisher> } }` in `spawn/mod.rs`.
- [ ] T442 [US3] Replace `Spawner` fields `pool: Option<_>`, `adapters: Option<_>`, `port_allocator: Arc<_>` with `mode: SpawnMode`.
- [ ] T443 [US3] Rewrite `Spawner::new(publisher)` to construct `SpawnMode::Stub`. `Spawner::with_pool(pool, adapters, publisher)` constructs `SpawnMode::Real`.
- [ ] T444 [US3] Rewrite `Spawner::spawn` body as `match self.mode { Stub => self.spawn_stub(req).await, Real => self.spawn_real(req).await }`.
- [ ] T445 [US3] Extract `spawn_stub` into `spawn/stub.rs` with an inherent `impl Spawner` block.
- [ ] T446 [US3] Extract `spawn_real` into `spawn/real.rs` with an inherent `impl Spawner` block (method split done in Phase 6).

### Verification

- [ ] T447 [US3] `cargo test --workspace` GREEN; match is exhaustive (removing a variant produces a compile error).

---

## Phase 6: US2 — Method splits in `spawn.rs` (P1)

- [ ] T450 [US2] In `spawn/stub.rs`, extract `build_test_lease(request, port, bind_host) -> (RuntimeLease, RuntimeChannelDescriptor)` and `spawn_supervisor_task(publisher, lease_arc, shutdown, lease_id, family, bind_host, port) -> JoinHandle<()>`. `spawn_stub` ≤ 25 LOC.
- [ ] T451 [US2] In `spawn/real.rs`, extract `validate_install_row(row, family) -> BackendRuntimeResult<()>`, `fork_child(cmd, port_allocator, port) -> BackendRuntimeResult<Child>`, `insert_lease_row(pool, lease_id, row, request, pid, port, descriptor, now) -> BackendRuntimeResult<()>`. `spawn_real` ≤ 25 LOC.

### Verification

- [ ] T452 [US2] Method body line counts ≤ 25; `cargo test` GREEN.

---

## Phase 7: US6 — `InstallCtx` arg grouping (P2)

### Tests (write first — RED)

- [ ] T460 [US6] Test: `clippy::too_many_arguments` lint MUST produce zero findings for `nexus-backend-runtimes` (run `cargo clippy -p nexus-backend-runtimes -- -D warnings` at end).

### Implementation

- [ ] T461 [US6] Create `crates/nexus-backend-runtimes/src/llamacpp/install_ctx.rs` with `pub struct InstallCtx<'a> { pub manifest: &'a VersionManifest, pub machine: &'a MachineDescriptor, pub request: InstallRequest, pub runtimes_root: &'a Utf8PathBuf, pub pool: &'a SqlitePool, pub publisher: SharedPublisher, pub cancel: CancellationToken, pub task_id: String }`.
- [ ] T462 [US6] Change `run_inner<F>` signature to `run_inner<F>(ctx: &InstallCtx<'_>, progress_fn: F)`; update caller in `install_pipeline::run`.
- [ ] T463 [US6] Remove the `#[allow(clippy::too_many_arguments)]` attribute introduced in spec 013.

---

## Phase 8: US7 — Error propagation (P2)

### Tests (write first — RED)

- [ ] T470 [P] [US7] Unit test in `spawn/supervise.rs`: inject a failing reqwest builder (via stub trait or env manipulation); assert `tracing::warn!` captured via `tracing_test::traced_test`; assert supervisor task exits within 1s without constructing a fallback client.

### Implementation

- [ ] T471 [US7] Replace `reqwest::Client::builder().timeout(...).build().unwrap_or_else(|_| reqwest::Client::new())` in `supervise_real` with `match builder.build() { Ok(c) => c, Err(e) => { tracing::warn!(error = %e, "reqwest client builder failed"); return; } }`.
- [ ] T472 [US7] Replace the same pattern at the second reqwest builder site (spawn.rs:762 per original review).
- [ ] T473 [US7] In `installs_store/migration.rs::build_binary_paths_json`, return `Result<String, BackendRuntimeError>` with `serde_json::to_string(...).map_err(|e| BackendRuntimeError::Internal(format!("serialize binary_paths: {e}")))?`.
- [ ] T474 [US7] In `spawn/mod.rs::dedup_preserve_order`, change signature to `fn dedup_preserve_order(items: &[String]) -> Vec<String>` using `BTreeSet<&str>` for the dedup set and `item.clone()` only on first occurrence.

### Verification

- [ ] T475 [US7] Workspace test count matches baseline + 3 (T410 + T440 + T470).

---

## Phase 9: Polish

- [ ] T480 [P] Update `crates/nexus-backend-runtimes/README.md` with new module layout, `RuntimeFamily` usage, `SpawnMode` dispatch, and `InstallCtx`.
- [ ] T481 [P] Update root `README.md` "Recent Changes" to link spec 015.
- [ ] T482 Final: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings`, `cargo test --workspace`, SC-305 grep zero hits.

---

## Dependencies

```text
Phase 1 (baseline) ──► Phase 2 (RuntimeFamily) ──► Phase 3 (installs_store split)
                                                         │
                                                         ▼
                                                   Phase 4 (spawn moves)
                                                         │
                                                         ▼
                                                   Phase 5 (SpawnMode enum)
                                                         │
                                                         ▼
                                                   Phase 6 (method splits) ── Phase 7 (InstallCtx) ── Phase 8 (err propagation) ──► Phase 9 (polish)
```

## Task Summary

- **Total tasks**: 42 (T401–T482)
- **Parallel opportunities**: 14 `[P]` tasks distributed across file-disjoint phases
