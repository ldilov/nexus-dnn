# Implementation Plan: Extension + API Modularization

**Branch**: `016-extension-api-modularization` | **Spec**: [spec.md](./spec.md)

## Summary

Split `nexus-extension/src/registry.rs` (1069 LOC) and `nexus-api/src/handlers/backends.rs` (845 LOC). Replace custom 155-LOC `VersionInterval` with `semver::VersionReq` + a dedicated `LlamaCppBuildReq` helper for non-semver build numbers. Dedupe the two scanner functions. Resolve the `discover_and_activate` POLA violation. Fix N+1 in `list_host_runtimes`. Make `http_status_for` exhaustive. Log `remove_binary_directory` failures.

## Technical Context

**Language/Version**: Rust 2024 edition
**Primary Dependencies**: `semver` (already a workspace dep), no new crates
**Testing**: `nexus-extension` + `nexus-api` suites (green at baseline)
**Target Platform**: unchanged
**Project Type**: library + handler refactor
**Performance Goals**: measurable N+1 elimination in `list_host_runtimes`; all other changes are perf-neutral
**Constraints**: depends on spec 015's `installs_store/` split (optional but cleaner). Zero public HTTP API changes.
**Scale/Scope**: ~1900 LOC of moves + one ecosystem-first replacement + one query optimization

## Constitution Check

| Principle | Status | Note |
|---|---|---|
| I. Ecosystem-First | PASS | `semver::VersionReq` replaces 155-LOC custom impl (US2/FR-403) |
| II. SOLID & classical | PASS | DRY (US3), POLA (US4), CQS (process_extension name) |
| III. Modularity | PASS | Every new file ≤ 350 / 300 LOC per FR-402 / FR-405 |
| IV. Self-Doc code | PASS | Module `//!` docs per new submodule |
| V. Extendability | PASS | No trait surface change; `LlamaCppBuildReq` is a concrete helper, not a trait |
| VI. Test-First | PASS-with-note | Refactor leans on existing suite; new tests added for US4 (discover_and_activate), US7 (N+1), US8 (exhaustive match, warn log) |
| VII. Memory/Type Safety | PASS | US8 removes silent `let _ =`; exhaustive match surfaces new error variants |
| VIII. Living Docs | PASS | Crate READMEs updated; root README gets a "Recent Changes" line |
| IX. Bisectable History | PASS | Per-phase commits |
| X. Parallelism-First | PASS | `registry/` and `backends/` splits are fully disjoint |
| XI. Idiom Registry | PASS | No new anti-patterns introduced; custom interval code removed (Single-Choice cleanup) |

## Project Structure

### Source Code (after merge)

```
crates/nexus-extension/src/registry/
├── mod.rs                  # InMemoryExtensionRegistry struct + trait impl + top-level public methods
├── types.rs                # DiscoveryReport, ExtensionStatus, LayoutFile, ActivatedExtension, RegistryState
├── scanner.rs              # scan_dir_with<F> + scan_extensions_dir + scan_builtin_dir + process_extension + process_builtin_extension + rebuild_operator_entries + activate_extension_inner
├── loaders.rs              # load_operators, load_recipes, load_ui_contributions, load_layouts, yaml_to_json_value(_for_operator)
├── storage_validation.rs   # validate_storage_contribution, validate_storage_sql_files
└── version_conflict.rs     # detect_intra_manifest_conflicts + LlamaCppBuildReq helper

crates/nexus-api/src/handlers/backends/
├── mod.rs                  # shared helpers (registry, map_error, unwired, impl_status_str, ulid_lite) + re-exports
├── catalog.rs              # list, detail + BackendSummary/BackendListResponse/BackendSummaryChips
├── lifecycle.rs            # install, validate, repair
├── settings.rs             # get_settings, put_settings
├── observability.rs        # logs, diagnostics + LogQuery/LogsResponse/DiagnosticsResponse
├── host_runtimes.rs        # list_host_runtimes (batched), parameter_catalog + HostRuntimeInstallView/HostRuntimesResponse
└── lease.rs                # create_lease, release_lease, uninstall_runtime, LeaseBody, LeaseEnvelope, UninstallQuery, spawn_error_response, collect_uninstall_blockers, block_if_dependents, drain_leases, + the 3 new helpers (validate_install_for_lease, build_spawn_request, stub_lease)
```

## Complexity Tracking

- Replacing `VersionInterval` with `semver::VersionReq` + `LlamaCppBuildReq` is a net reduction (~155 LOC deleted, ~80 LOC added).
- N+1 fix is a net simplification (loop + per-install query → one JOINed query).

## Implementation Sequencing

1. **Phase A — Baseline**.
2. **Phase B — `registry/` split (file moves only)**, no logic changes.
3. **Phase C — `VersionInterval` → `semver::VersionReq` + `LlamaCppBuildReq`** in `version_conflict.rs`.
4. **Phase D — Scanner DRY** (extract `scan_dir_with`).
5. **Phase E — `discover_and_activate` fix** (choose and justify the branch).
6. **Phase F — `backends/` split**, no logic changes.
7. **Phase G — `create_lease` helper extraction**.
8. **Phase H — N+1 fix** (new `list_all_with_dependents`).
9. **Phase I — Exhaustive `http_status_for` + warn-log on `remove_binary_directory`**.
10. **Phase J — Verification**: tests, clippy, fmt, READMEs.

Each phase is a green-building commit.
