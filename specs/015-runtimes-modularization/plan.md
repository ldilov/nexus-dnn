# Implementation Plan: Runtimes Modularization

**Branch**: `015-runtimes-modularization` | **Spec**: [spec.md](./spec.md)

## Summary

Split `spawn.rs` (1071 LOC) and `installs_store.rs` (771 LOC) into cohesive submodules; shrink `Spawner::spawn`/`spawn_real`; replace dual-mode `Option` pair with `SpawnMode` enum; centralize family string registry in `RuntimeFamily`; group `run_inner` args into `InstallCtx`; fix three silenced-error sites.

## Technical Context

**Language/Version**: Rust 2024 edition
**Primary Dependencies**: tokio, sqlx, reqwest (existing); no new deps
**Testing**: existing `nexus-backend-runtimes` + `nexus-api` test suites (both green at baseline)
**Target Platform**: unchanged
**Project Type**: library refactor + small behavior fixes
**Performance Goals**: unchanged
**Constraints**: Depends on spec 014 landing first (no hard dep, but workspace is cleaner that way). Zero public API changes to `Spawner` / `installs_store`. Bisectable commits.
**Scale/Scope**: ~1900 LOC of moves + ~12 small logic changes (SpawnMode, RuntimeFamily, InstallCtx, error propagation)

## Constitution Check

| Principle | Status | Note |
|---|---|---|
| I. Ecosystem-First | PASS | No new deps |
| II. SOLID & classical | PASS | Single-Choice (family registry), CQS, POLA (SpawnMode) |
| III. Modularity | PASS | Every new file ≤ 400 LOC per FR-302; spawn/spawn_real ≤ 25 LOC per FR-303 |
| IV. Self-Doc code | PASS | Module-level `//!` per submodule |
| V. Extendability | PASS-with-note | RuntimeFamily enum `#[non_exhaustive]` per Appendix C |
| VI. Test-First | PASS-with-note | Refactor relies on existing suite per VI(b); 2 new tests for warn-log + exhaustive-match |
| VII. Memory/Type Safety | PASS | FR-312/FR-313/FR-314 remove silenced errors; SpawnMode eliminates implicit nullable state |
| VIII. Living Docs | PASS | Crate README §"Family registry" + §"Spawn modes" added |
| IX. Bisectable History | PASS | Per-phase commits, each green |
| X. Parallelism-First | PASS | spawn-split and installs_store-split are file-disjoint |
| XI. Idiom Registry | PASS | SpawnMode (enum state machine, Appendix B); RuntimeFamily (newtype, Appendix C); InstallCtx groups args to obey method-arg soft limit |

## Project Structure

### Source Code (after merge)

```
crates/nexus-backend-runtimes/src/
├── lib.rs
├── error.rs
├── family.rs               # NEW: RuntimeFamily enum + canonical() + as_str()
├── adapter.rs
├── channel.rs
├── checksum.rs
├── compatibility.rs        # now uses RuntimeFamily
├── detect.rs
├── diagnostics.rs
├── events.rs
├── manifest/
├── reserved_policy.rs
├── resolver.rs
├── settings.rs
├── settings_store.rs
├── state.rs
├── llamacpp/
│   ├── mod.rs
│   ├── install_pipeline.rs # run_inner takes &InstallCtx
│   ├── install_ctx.rs      # NEW: InstallCtx struct
│   ├── installs_store.rs   # existing, unchanged
│   └── probe.rs
├── installs_store/
│   ├── mod.rs
│   ├── migration.rs        # migrate_from_legacy + build_binary_paths_json
│   ├── relocation.rs
│   └── resolution.rs
└── spawn/
    ├── mod.rs              # Spawner struct + SpawnMode enum + public API
    ├── port.rs             # PortAllocator, PortLease, RuntimeBindMode
    ├── stub.rs             # stub-mode spawn (build_test_lease, spawn_supervisor_task)
    ├── real.rs             # real-mode spawn (validate_install_row, fork_child, insert_lease_row)
    ├── supervise.rs        # supervise_real, SupervisorCtx, drain_stream
    └── host_env.rs         # build_host_env, load_host_governed_injections, HOST_GOVERNED_INJECTABLE_FLAGS
```

## Complexity Tracking

- `SpawnMode` introduction is a light net-positive: eliminates two `Option` checks, adds one enum match. No complexity added.
- `RuntimeFamily` adds ~60 LOC for the enum + helpers but removes ~40 LOC of duplicated match arms across 6 sites.
- `InstallCtx` is a pure mechanical arg grouping.
- `SpawnMode` keeps `publisher: SharedPublisher` on the `Spawner` struct (NOT inside `SpawnMode::Real` / `SpawnMode::Stub`) — both modes publish through the same broadcast, so a single owner avoids the dual-publisher confusion flagged by analyze-pass M7. The mode enum carries only the fields that genuinely differ between stub and real (`pool` and `adapters` exist only in `Real`; `port_allocator` exists in both but with the same type, so it lives in both variants for clarity rather than on the struct).

## Implementation Sequencing

1. **Phase A**: Introduce `RuntimeFamily` in `family.rs`. Migrate call sites one file at a time (parallel-safe).
2. **Phase B**: `installs_store/` split + `build_binary_paths_json` helper.
3. **Phase C**: `spawn/` split. First pass moves code with zero logic changes.
4. **Phase D**: Introduce `SpawnMode`; refactor `Spawner` internals.
5. **Phase E**: Shrink `Spawner::spawn` and `spawn_real` via named helpers.
6. **Phase F**: `InstallCtx` grouping for `run_inner`; remove `#[allow]`.
7. **Phase G**: Error propagation in `supervise_real` (reqwest client, dedup_preserve_order).
8. **Phase H**: Verification (tests, clippy, fmt, README).

Each phase is a green-building commit.
