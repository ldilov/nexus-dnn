# Implementation Plan: Backend Runtime Hardening

**Branch**: `012-runtime-hardening` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)

## Summary

Close the seven CRITICAL/HIGH gaps surfaced by `/speckit.analyze` over spec 011. Wire the migration runner into host startup, enforce extension-enable runtime-dependency resolution, default-deny host-governed launch flags with typed opt-in, expose a WebSocket bridge for `BackendEvent`, emit the four missing FR-016 lifecycle events, implement drain-then-uninstall, and assert the zero-extension-deps invariant in CI.

Technical approach: each gap maps to a small surface area. Migration wiring is a 5-line addition to `nexus-core::app::run` plus startup-order discipline. Enable-time resolution lives in the extension registry's enable path and reuses `installs_store::resolve_dependency` (already implemented in spec 011 T055). Host-governed default-deny extends `validate_spawn_request` with a third classification arm and adds `HostPolicy::gate_host_governed`. The WS bridge mirrors `nexus-api::ws::events_ws` over the existing `BroadcastPublisher::subscribe` API. Missing events are added at the existing state-transition sites in `install_pipeline`, `validator`, and the new uninstall handler. Drain-then-uninstall is the long-standing T098 task plus `process_withdrawn` emission. The verification script is a 30-line shell wrapping `cargo metadata` + `grep`.

## Technical Context

**Language/Version**: Rust (stable, 2024 edition); TypeScript 5.7 (strict, no frontend changes this spec); shell for the verification script.
**Primary Dependencies** (net-new vs. spec 011): None. `axum::extract::ws` is already used in `nexus-api::ws`. `tokio::broadcast` already in workspace.
**Storage**: No new migrations. Typed host-setting opt-ins extend the existing `runtime_settings` JSON column.
**Testing**: `cargo test` with new integration tests under `crates/nexus-backend-runtimes/tests/` and `crates/nexus-api/tests/`. WebSocket tests use `tokio_tungstenite` (already a dev-dep transitively via `axum`).
**Target Platform**: Linux/macOS/Windows desktop.
**Project Type**: Web application (Option 2 structure unchanged).
**Performance Goals**: Migration < 100ms on a 10-row legacy table. Enable-time resolution < 50ms (single SQL query). WS event delivery < 100ms broadcast latency.
**Constraints**: Migration MUST run before HTTP bind. WS endpoint MUST handle subscriber lag without dropping the connection. Drain MUST cap at 10 seconds per lease.
**Scale/Scope**: Up to ~5 live leases × ~10 WS subscribers per host. Catalog: ~20 host-governed flags per family at P1.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Note |
|-----------|--------|------|
| I. Ecosystem-First | ✅ | Reuses `axum::extract::ws`, `tokio::broadcast`, existing `installs_store::resolve_dependency`. Zero new workspace deps. |
| II. SOLID & Pure Functions | ✅ | `HostPolicy::gate_host_governed` is a pure function; uninstall flow is decomposed into `drain_leases` + `remove_binary` + `delete_row`. |
| III. Modularity & Method Size | ✅ | Each handler stays under 25 lines; uninstall is decomposed into named helpers. WS handler mirrors `events_ws` shape (proven small). |
| IV. Self-Documenting Code | ✅ | No inline comments. `///` on new public items: `HostGovernedDenied`, `RuntimeDependencyResolution`, the WS endpoint. |
| V. Extendability via Adapter Contracts | ✅ | New host-governed flag classification is data-driven (catalog-derived). Adding flags is a JSON edit, not a code change. |
| VI. Test-First Verification | ✅ | RED tests authored alongside impl per the spec 011 deviation pattern (mock infra reused: `DelayedHealthServer`). Coverage target 80%+. |
| VII. Memory & Type Safety | ✅ | New error variants typed via `thiserror`. No `unsafe`. WS handler uses `tokio::select!` with cancel-safe arms. |
| VIII. Living Documentation | ✅ | `crates/nexus-backend-runtimes/README.md` extended with §"Host-governed flags" + §"Event subscription model". Root `README.md` adds spec 012 link. |
| IX. Git-Flow Branching | ✅ | Branch `012-runtime-hardening` off clean `main`. Each commit green-building. |
| X. Parallelism-First | ✅ | Drain runs per-lease in parallel via `futures::future::join_all`. WS subscribers each get their own task. |

**Result**: PASS. No principle conflicts.

## Project Structure

### Documentation (this feature)

```text
specs/012-runtime-hardening/
├── plan.md                                            # This file
├── spec.md
├── tasks.md                                           # generated next
└── contracts/
    ├── host_backends_events_ws.http
    ├── host_backends_uninstall.http
    └── extension_enable_runtime_dep_unmet.http
```

### Source Code touched

```text
crates/
├── nexus-core/src/
│   └── app.rs                                         # T201: wire migration into startup, before HTTP bind
├── nexus-backend-runtimes/src/
│   ├── installs_store.rs                              # T202: idempotency guard, T217: drain helper
│   ├── reserved_policy.rs                             # T210: HostPolicy::gate_host_governed (T078 spec 011 reborn)
│   ├── settings.rs                                    # T211: typed host-setting opt-in shapes
│   ├── spawn.rs                                       # T210 wiring + T220 process_withdrawn emission
│   ├── validator.rs                                   # T215: emit `unavailable` on transition
│   ├── llamacpp/install_pipeline.rs                   # T214: emit `installed` / `repaired`
│   └── events.rs                                      # T213: ProcessWithdrawn variant + new event topics
├── nexus-extension/src/
│   └── registry.rs                                    # T204: enable-time runtime_dependency resolution
├── nexus-api/src/
│   ├── handlers/backends.rs                           # T218: drain-then-uninstall handler (T098 reborn)
│   ├── handlers/backend_events_ws.rs                  # T222: NEW WS handler (mirrors ws::events_ws shape)
│   ├── router.rs                                      # T223: register /api/v1/backends/events
│   └── lib.rs                                         # T222: AppState exposes BackendEvent publisher
└── tests/
    ├── nexus-backend-runtimes/tests/migration_startup.rs        # T203 (FR-101 + FR-102)
    ├── nexus-backend-runtimes/tests/host_governed_default_deny.rs # T212 (FR-107..FR-110)
    ├── nexus-backend-runtimes/tests/lifecycle_events.rs         # T216 (FR-115..FR-117)
    ├── nexus-extension/tests/runtime_dep_resolution.rs          # T205 (FR-104..FR-106)
    ├── nexus-api/tests/uninstall_drain.rs                       # T219 (FR-118..FR-120)
    └── nexus-api/tests/backend_events_ws.rs                     # T224 (FR-111..FR-114)

scripts/
└── verify-spec-011.sh                                 # T225 (FR-121, FR-122)
```

**Structure Decision**: Small, surgical changes to existing files; one new handler file (`backend_events_ws.rs`); one new shell script. No new crates.

## Approach Per User Story

### US1 — Migration startup wiring (P1)

**Approach**:
1. Locate the startup sequence in `nexus-core::app::run`. Find the line where the HTTP server begins listening (typically `axum::Server::bind(...).await`).
2. Before that line, add `runtime_migration::run_startup_migrations(&pool, &data_dir).await?` calling `migrate_from_legacy` → `relocate_legacy_binaries` → `hydrate_on_start` in order.
3. Add a one-shot idempotency guard inside `migrate_from_legacy`: if `ext_local_llm_runtime_installs_migrated_008` exists AND `host_runtime_installs` is non-empty, no-op.
4. Failures bubble up as `anyhow::Error` and panic the host startup (preferred over silent corruption — operator sees the error and can recover).

**Automated verification**: `tests/migration_startup.rs::startup_runs_migration_before_bind` — start a host with a seeded legacy DB and a binary at the old path; assert `host_runtime_installs` is populated and the binary is at the new path before the test client makes its first request.

### US2 — Extension-enable runtime dependency resolution (P1)

**Approach**:
1. In `nexus-extension::registry::enable_extension`, after manifest validation but before flipping the `enabled` flag, call `installs_store::resolve_dependency` (spec 011 T055, already implemented) for each `runtime_dependencies` entry.
2. On `Err(DependencyUnmet { .. })`, return a structured `EnableError::RuntimeDependencyUnmet { family, version_req, install_panel_url: "/backends" }`.
3. On conflicting dependencies within the same manifest (e.g., two ranges for the same family that don't intersect), return `EnableError::RuntimeDependencyConflict { family, ranges: [..] }` BEFORE calling the resolver.
4. Map both errors to HTTP 400 in the enable handler.

**Automated verification**: `tests/runtime_dep_resolution.rs` table-driven — (a) unsatisfiable → 400 RUNTIME_DEPENDENCY_UNMET, (b) satisfiable → 200, (c) conflicting ranges → 400 RUNTIME_DEPENDENCY_CONFLICT, (d) no `runtime_dependencies` field → 200.

### US3 — Host-governed default-deny (P1)

**Approach**:
1. Extend `ParameterPolicy` matcher in `validate_spawn_request` (`spawn.rs::validate_args` + `validate_env`): when classification is `HostGoverned`, return `BackendRuntimeError::HostGovernedDenied { flag }`.
2. Add `HostPolicy::gate_host_governed(flag, settings) -> HostPolicyDecision { Inject(value) | Deny }` in `reserved_policy.rs`. Called by Spawner BEFORE `validate_spawn_request` so typed opt-ins inject without triggering the deny path.
3. Extend `RuntimeSettings` JSON (no schema migration; existing column is JSON) with optional fields for each host-governed flag (`api_key`, `tls_cert_path`, `tls_key_path`, `media_path`, `tools_enabled`, `mcp_proxy_enabled`).
4. Inject step happens after env build but before `Command::envs()`.
5. Every denial: `tracing::warn!(extension_id, family, flag, "host_governed_denied")`.

**Automated verification**: `tests/host_governed_default_deny.rs` table-driven — for each host-governed flag in the catalog, assert raw passthrough returns 422 and typed opt-in causes injection.

### US4 — BackendEvent WS bridge (P1)

**Approach**:
1. New handler `backend_events_ws.rs`: mirrors `nexus-api::ws::events_ws` exactly but subscribes to `state.backend_event_bus.subscribe()` (a new `Arc<BroadcastPublisher>` field on `AppState` exposing the SAME publisher the Spawner uses — not a fresh one).
2. Filter parameters: `?family=llama.cpp&runtime_install_id=ri_xxx`. Empty filter = all events.
3. `tokio::broadcast::error::RecvError::Lagged(N)` → send `{ type: "lagged", missed: N }` frame, continue.
4. Closed channel → break loop, close socket.
5. Register route in `router.rs`: `GET /api/v1/backends/events` mapped to `backend_events_ws`.

**Automated verification**: `tests/backend_events_ws.rs` — (a) connect, publish event, assert receive within 100ms; (b) two subscribers, both receive; (c) family filter mismatches drop events; (d) lagged subscriber receives warning frame, stays connected.

### US5 — Missing FR-016 events (P2)

**Approach**:
1. Add `BackendEvent::ProcessWithdrawn` variant to `events.rs` (or use the existing `BackendEvent::new("process.withdrawn", ...)` topic-string pattern — pick whichever is consistent with existing code).
2. `install_pipeline::run` final phase: emit `installed` event with the new `runtime_install_id`.
3. `LlamaCppAdapter::repair` on success: emit `repaired`.
4. `validator.rs::reconcile`: when transitioning `Installed → NeedsRepair`, emit `unavailable`.
5. Uninstall handler force path: when terminating each lease, emit `process_withdrawn` (distinct from `process.exited` which fires for clean exits).

**Automated verification**: `tests/lifecycle_events.rs` — for each of the four events, exercise the code path and assert the event appears on the bus subscription within 500ms.

### US6 — Drain-then-uninstall (P2)

**Approach**:
1. `DELETE /api/v1/backends/{installId}` handler in `backends.rs` — query string `?force=bool` (default false).
2. Step 1: `installs_store::list_dependents(install_id)` → if non-empty AND `!force` → 409 `RUNTIME_IN_USE` with `{ dependents: Vec<ExtensionId>, hint: "retry with ?force=true" }`.
3. Step 2 (force path): `Spawner::list_live_leases_for_install(install_id)` → for each, `Spawner::shutdown(lease_id)` with 10s timeout, emit `process_withdrawn`. Use `futures::future::join_all` for parallelism.
4. Step 3: `installs_store::remove_binary_directory(install_root)` (best-effort; logs on failure).
5. Step 4: `installs_store::delete_row(install_id)` → 204.

**Automated verification**: `tests/uninstall_drain.rs` — (a) no dependents → 204; (b) live lease + no force → 409; (c) live lease + force → 204 within 12s; (d) post-uninstall spawn against same install → 404.

### US7 — Verification script (P2)

**Approach**:
1. `scripts/verify-spec-011.sh` — bash; `set -euo pipefail`.
2. Check 1: `! grep -E "^(extension-|local-llm)" crates/nexus-backend-runtimes/Cargo.toml` (no extension dep entries).
3. Check 2: `cargo metadata --no-deps --format-version=1 | jq '.packages[] | select(.name=="nexus-backend-runtimes") | .dependencies[].name' | grep -E "^(extension-|local-llm)" && exit 1 || true`.
4. Check 3: `cargo check --workspace --quiet`.
5. Add reference to script in `crates/nexus-backend-runtimes/README.md` §"CI checks".

**Automated verification**: shell test that the script exits 0 on the clean tree and non-zero when a fake extension dep edge is introduced (test creates a temporary commit, runs script, asserts non-zero, reverts).

## Complexity Tracking

| Violation / trade-off | Why needed | Simpler alternative rejected because |
|---|---|---|
| Sharing the SAME `BroadcastPublisher` Arc between `Spawner` and `AppState` (rather than passing events through a second hop) | Without shared identity, events published by Spawner do not reach WS subscribers — the entire feature is broken. | A second forwarding bus (subscribe in app.rs, re-publish to a frontend bus) was considered; rejected because (a) doubles broadcast latency, (b) doubles memory, (c) complicates lag accounting. Direct shared Arc is the obvious and correct choice. |
| Running migration synchronously during startup (blocks HTTP bind by up to 100ms on a 10-row table) | An async migration runner racing the HTTP server creates a window where a request can hit the API before the data is in place. | Background migration was considered; rejected because the data race window is the exact failure mode SC-009 forbids. |
| Force-uninstall has a 10-second per-lease cap | A misbehaving lease cannot be allowed to indefinitely block uninstall. | Unbounded wait was considered; rejected — operator UX requires the operation to complete. SIGKILL after grace is the standard pattern. |

## Phase 0 — Research Topics

1. **Startup hook point**: confirm where in `nexus-core::app::run` the HTTP server binds and where to insert the migration call. (Likely just before `axum::Server::bind(...)`.)
2. **WebSocket auth**: should `/api/v1/backends/events` require an extension-id header like the lease endpoints, or is anonymous subscribe acceptable for read-only events? Default: anonymous-readable; sensitive payloads (api keys etc.) are NEVER in event payloads.
3. **`process_withdrawn` vs `process.exited`**: confirm semantic split with reviewer — withdrawn = host pulled rug; exited = clean child exit. Both must coexist.
4. **Typed opt-in storage**: extending `runtime_settings` JSON column shape — confirm no schema migration needed.

## Re-evaluation after Phase 1

Constitution check re-passes. Migration startup wiring is the only commit that changes the host startup sequence and therefore carries the highest risk; it lands first in its own commit so bisects on later commits don't confuse migration regressions with feature regressions.

**Result**: PASS. Proceed to `/speckit.tasks` next.

## Implementation Sequencing

1. **US1 (migration wiring)** lands first as its own commit — highest risk, smallest diff (~10 lines + test).
2. **US3 (host-governed default-deny)** + **US2 (enable-time resolution)** land in parallel PRs — different files.
3. **US4 (WS bridge)** + **US5 (missing events)** land in parallel — WS handler new file, event emissions are at existing transition sites.
4. **US6 (drain-then-uninstall)** lands after US5 because it consumes `process_withdrawn`.
5. **US7 (verification script)** lands last; it asserts the invariant the rest of this spec depends on.

MVP scope: US1 + US2 + US3 + US4 (the four P1 stories) — closes every CRITICAL/HIGH gap from the analysis.
