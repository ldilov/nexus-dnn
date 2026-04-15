# Implementation Plan: Storage Modularization

**Branch**: `014-storage-modularization` | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/014-storage-modularization/spec.md`

## Summary

Split two oversized files (`sqlite.rs` 1128 LOC, `storage_manager.rs` 1111 LOC) into cohesive domain submodules, shrink oversized methods, fix silenced errors, add a builder. Zero API diff for downstream crates.

## Technical Context

**Language/Version**: Rust 2024 edition
**Primary Dependencies**: sqlx (existing), no new deps
**Testing**: `cargo test -p nexus-storage` + workspace integration suite (currently 280 passing)
**Target Platform**: same workspace
**Project Type**: library refactor (zero downstream API change)
**Performance Goals**: same (this is a reorg, not an optimization)
**Constraints**: Zero breaking changes to `Database` trait or `StorageManager` public surface. Bisectable commits.
**Scale/Scope**: ~2200 LOC of moves + ~8 small logic changes (error propagation, builder)

## Constitution Check

| Principle | Status | Note |
|---|---|---|
| I. Ecosystem-First | PASS | No new deps; this is a reorg |
| II. SOLID & classical | PASS | DRY (migration helper), CQS intact, Builder pattern (Appendix B) for `StorageManager` |
| III. Modularity | PASS-with-note | Every new file ≤ 400 LOC per FR-203/FR-207; the `impl Database for SqliteDatabase` trait block stays as one delegating block in `sqlite/mod.rs` |
| IV. Self-Doc code | PASS | No new comments; module-level `//!` allowed for each new submodule |
| V. Extendability | PASS | No trait surface change; future ISP split of `Database` documented as non-goal |
| VI. Test-First | PASS-with-note | Refactor relies on existing test suite per VI(b) exception — no new tests required for code moves; new tests added for journal warn-log and builder |
| VII. Memory/Type Safety | PASS | Fixes silenced errors (FR-209, FR-210); no new `unwrap`/`expect` |
| VIII. Living Docs | PASS | Crate `README.md` updated to document new submodule layout |
| IX. Bisectable History | PASS | Each phase in tasks.md is a green-building commit |
| X. Parallelism-First | PASS | Sub-commits for `sqlite/` and `manager/` splits are file-disjoint and can land in either order |
| XI. Idiom Registry | PASS | Appendix B Builder pattern adopted; Appendix D silenced-errors removed |

## Project Structure

### Documentation (this feature)

```
specs/014-storage-modularization/
├── spec.md              # feature specification
├── plan.md              # this file
├── tasks.md             # task breakdown
└── contracts/           # (empty — no new external APIs)
```

### Source Code (after merge)

```
crates/nexus-storage/src/
├── lib.rs
├── database.rs
├── error.rs
├── records.rs
├── row_mapping.rs
├── sqlite/
│   ├── mod.rs              # SqliteDatabase struct + impl Database (thin delegates)
│   ├── migrations.rs       # run_migrations + execute_migration_statements
│   ├── extensions.rs
│   ├── operators.rs
│   ├── workflows.rs
│   ├── runs.rs
│   ├── artifacts.rs
│   ├── content.rs          # recipes + ui_contributions
│   └── namespaces.rs       # namespace + migration_record + object + operation + archive tables
└── manager/
    ├── mod.rs              # StorageManager struct, constructors delegating to builder
    ├── builder.rs          # StorageManagerBuilder
    ├── journal.rs          # journal_start, journal_complete (with tracing::warn!)
    ├── reservation.rs      # reserve_namespace
    ├── apply.rs            # apply_plan, apply_single_migration, insert_migration_and_objects
    ├── uninstall/
    │   ├── mod.rs          # uninstall_namespace (policy dispatch)
    │   ├── retain.rs
    │   ├── drop.rs
    │   └── archive.rs      # uninstall_archive_then_drop with propagated errors
    ├── verify.rs           # verify_namespace
    └── types.rs            # UninstallReport, IntegrityReport, ApplyReport, MigrationInput, ObjectInput
```

## Complexity Tracking

None. This is a refactor without added complexity; net line count expected to be flat ± 5%.

## Implementation Sequencing

1. **Phase 1 — Safety net**: run `cargo test -p nexus-storage` and capture baseline test count.
2. **Phase 2 — `sqlite/` split**: move trait impl methods into domain submodules as thin inherent impls; trait impl becomes delegation.
3. **Phase 3 — `execute_migration_statements` helper**: dedupe the 8 migration loops.
4. **Phase 4 — `manager/` split**: move `StorageManager` impl methods into submodules.
5. **Phase 5 — Method splits**: `apply_plan` → `apply_single_migration` + `insert_migration_and_objects`.
6. **Phase 6 — Error propagation**: fix `uninstall_archive_then_drop` and `journal_complete`.
7. **Phase 7 — Builder**: introduce `StorageManagerBuilder`, deprecate `with_*` constructors.
8. **Phase 8 — Verification**: rerun workspace tests, clippy, fmt; update crate README.

Each phase is a green-building commit per Principle IX.
