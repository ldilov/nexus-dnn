# Tasks: Backend Runtime Hardening

**Input**: Design documents from `/specs/012-runtime-hardening/`
**Prerequisites**: spec.md, plan.md
**Tests**: Spec mandates automated verification per acceptance scenario; constitution principle VI permits tests-alongside when mock infra needs constructing (most do not — `DelayedHealthServer` from spec 011 is reused).

**Organization**: Tasks grouped by user story. US1–US4 are P1; US5–US7 are P2. Each story is independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable — different files, no dependencies on other incomplete tasks in the same phase
- **[Story]**: US1–US7 or no label for Setup/Polish

## Sequencing invariant

Per constitution principle IX, every commit MUST leave the workspace green-building. The order below produces a bisectable history: US1 lands first (highest risk), US7 lands last (asserts the invariants the rest depend on).

---

## Phase 1: Setup

- [ ] T200 [P] Create `specs/012-runtime-hardening/contracts/` files: `host_backends_events_ws.http`, `host_backends_uninstall.http`, `extension_enable_runtime_dep_unmet.http`. Use spec 011 contracts as template.

---

## Phase 2: US1 — Migration startup wiring (P1)

**Story goal**: `migrate_from_legacy` + `relocate_legacy_binaries` + `hydrate_on_start` invoked by `nexus-core::app::run` BEFORE the HTTP server binds. Idempotent across restarts.

**Independent test criteria**: Seed legacy DB + binary at old path → start host → migrated row visible + binary at new path BEFORE first API request lands.

### Tests (write first — RED)

- [ ] T201 [P] [US1] Integration test `crates/nexus-backend-runtimes/tests/migration_startup.rs::startup_runs_migration_before_bind` — boot a test app via `nexus-core::app::build_test_app`, seed legacy fixture, assert state visible before first request.
- [ ] T202 [P] [US1] Integration test `tests/migration_startup.rs::idempotent_across_restarts` — boot twice with same DB; row count stable; no errors logged.

### Implementation

- [ ] T203 [US1] Add `runtime_migration::run_startup_migrations(pool, data_dir) -> Result<()>` in `crates/nexus-backend-runtimes/src/lib.rs` chaining `migrate_from_legacy` → `relocate_legacy_binaries` → `hydrate_on_start`.
- [ ] T204 [US1] Add idempotency guard inside `installs_store::migrate_from_legacy`: if `ext_local_llm_runtime_installs_migrated_008` exists AND `host_runtime_installs` non-empty, no-op.
- [ ] T205 [US1] In `crates/nexus-core/src/app.rs::run`, call `nexus_backend_runtimes::run_startup_migrations(&pool, &data_dir).await?` BEFORE the `axum::Server::bind(...)` line. Failures bubble as `anyhow::Error`.
- [ ] T205b [US1] Add `tracing::error!(family, phase, error = %e, "startup migration failed")` at every fail site inside `migrate_from_legacy`, `relocate_legacy_binaries`, `hydrate_on_start`. Add unit test using `tracing_test::traced_test` that captures the structured event. Implements FR-103.
- [ ] T206 [US1] Verify US1: `cargo test -p nexus-backend-runtimes --test migration_startup` GREEN; manually confirm with a hand-seeded SQLite that startup runs migration.

---

## Phase 3: US2 — Extension-enable runtime dependency resolution (P1)

**Story goal**: Enabling an extension whose `runtime_dependencies` cannot be satisfied by `host_runtime_installs` returns 400 `RUNTIME_DEPENDENCY_UNMET`; conflicting ranges within one manifest return 400 `RUNTIME_DEPENDENCY_CONFLICT`.

### Tests (write first — RED)

- [ ] T210 [P] [US2] Integration test `crates/nexus-extension/tests/runtime_dep_resolution.rs::unsatisfiable_dependency_blocks_enable` — synthetic extension with `family: llama.cpp, version: ">=b9999"`; only `b4970` installed; assert 400 RUNTIME_DEPENDENCY_UNMET with `dependents` list. **Latency assertion (SC-102)**: bracket the enable call with `tokio::time::Instant::now()`; assert elapsed < 100ms.
- [ ] T211 [P] [US2] Integration test `tests/runtime_dep_resolution.rs::satisfiable_dependency_enables_cleanly` — same harness with version `">=b4000"`; assert 200.
- [ ] T212 [P] [US2] Integration test `tests/runtime_dep_resolution.rs::conflicting_ranges_rejected_before_resolver` — manifest declares `[{family: llama.cpp, version: ">=b5000"}, {family: llama.cpp, version: "<b4500"}]`; assert 400 RUNTIME_DEPENDENCY_CONFLICT.
- [ ] T213 [P] [US2] Integration test `tests/runtime_dep_resolution.rs::no_runtime_deps_field_skips_resolver` — manifest with no `runtime_dependencies`; assert 200.

### Implementation

- [ ] T214 [US2] Add `EnableError::{RuntimeDependencyUnmet, RuntimeDependencyConflict}` variants in `crates/nexus-extension/src/error.rs` (or wherever EnableError lives — locate in `nexus-extension::registry`).
- [ ] T215 [US2] Add intra-manifest conflict pre-check in `nexus-extension::registry::enable_extension` (or whichever fn flips `enabled`): detect overlapping/disjoint version ranges per family BEFORE calling resolver.
- [ ] T216 [US2] Wire `installs_store::resolve_dependency` (spec 011 T055) into the enable path: for each `runtime_dependencies` entry, resolve; on `Err(DependencyUnmet)` return `EnableError::RuntimeDependencyUnmet`.
- [ ] T217 [US2] In `crates/nexus-api/src/handlers/extensions.rs` (enable handler), map both new errors to HTTP 400 with structured envelopes per `contracts/extension_enable_runtime_dep_unmet.http`.
- [ ] T218 [US2] Verify US2: `cargo test -p nexus-extension --test runtime_dep_resolution` GREEN.

---

## Phase 4: US3 — Host-governed default-deny (P1)

**Story goal**: Raw passthrough of host-governed flags via spawn `args`/`env` is rejected with 422 `HOST_GOVERNED_DENIED`; typed host-setting opt-in injects the same flag.

### Tests (write first — RED)

- [ ] T220 [P] [US3] Integration test `crates/nexus-backend-runtimes/tests/host_governed_default_deny.rs::table_driven_denial` — for each host-governed flag in the catalog (`--api-key`, `--ssl-cert-file`, `--ssl-key-file`, `--media-path`, `--tools`, `--mcp-proxy`, etc.), assert raw arg returns 422 HOST_GOVERNED_DENIED naming the flag. **Latency assertion (SC-103)**: bracket each `validate_spawn_request` call; assert elapsed < 50ms. **Catalog precondition**: assert the parameter catalog contains ≥ 5 entries classified `host-governed`; if not, T223 also patches the catalog JSON.
- [ ] T221 [P] [US3] Integration test `tests/host_governed_default_deny.rs::typed_opt_in_injects_flag` — set `RuntimeSettings::api_key = Some("secret")`, spawn without raw arg, assert child argv contains `--api-key secret`.
- [ ] T222 [P] [US3] Integration test `tests/host_governed_default_deny.rs::denial_emits_warn_log` — capture `tracing` events, assert warn-level event with `extension_id`, `family`, `flag` fields.

### Implementation

- [ ] T223 [US3] Add `BackendRuntimeError::HostGovernedDenied { flag: String }` variant in `crates/nexus-backend-runtimes/src/error.rs`.
- [ ] T224 [US3] Extend `validate_args` and `validate_env` in `reserved_policy.rs` (or wherever they live) to return `HostGovernedDenied` when classification is `HostGoverned`. Adjust catalog policy classifications if needed so the existing `host-governed` tier flows here, NOT into pass-through.
- [ ] T225 [US3] Implement `HostPolicy::gate_host_governed(flag, settings) -> HostPolicyDecision` in `reserved_policy.rs`: returns `Inject(value)` when typed setting is set, `Deny` otherwise.
- [ ] T226 [US3] Extend `RuntimeSettings` JSON shape (no schema migration) with optional fields: `api_key`, `tls_cert_path`, `tls_key_path`, `media_path`, `tools_enabled`, `mcp_proxy_enabled`. Update `RuntimeSettings::llamacpp_defaults()` to set them all `None`/`false`.
- [ ] T227 [US3] Wire `HostPolicy::gate_host_governed` into `Spawner::spawn_real` BEFORE `validate_spawn_request`: for each host-governed flag with a typed opt-in, inject into `host_env`/argv; the gated flags then never trigger the validate-deny path.
- [ ] T228 [US3] Add `tracing::warn!` at the denial site in `validate_args`/`validate_env` (or in the central error-mapping function in spawn.rs).
- [ ] T229 [US3] Map `HostGovernedDenied` to HTTP 422 with code `HOST_GOVERNED_DENIED` in `http_status_for`.
- [ ] T230 [US3] Verify US3: `cargo test -p nexus-backend-runtimes --test host_governed_default_deny` GREEN.

---

## Phase 5: US4 — BackendEvent WebSocket bridge (P1)

**Story goal**: `GET /api/v1/backends/events` is a WebSocket endpoint that streams every `BackendEvent` to subscribers in real time.

### Tests (write first — RED)

- [ ] T240 [P] [US4] Integration test `crates/nexus-api/tests/backend_events_ws.rs::subscriber_receives_published_event` — connect WS via `tokio_tungstenite`, publish `BackendEvent` via the test app's exposed publisher, assert receive within 100ms.
- [ ] T241 [P] [US4] Integration test `tests/backend_events_ws.rs::two_subscribers_both_receive` — two concurrent WS connections, one publish, both receive.
- [ ] T242 [P] [US4] Integration test `tests/backend_events_ws.rs::family_filter_drops_mismatches` — connect with `?family=llama.cpp`, publish event with `family=tensorrt`, assert subscriber receives nothing within 200ms timeout.
- [ ] T242b [P] [US4] Integration test `tests/backend_events_ws.rs::install_id_filter_drops_mismatches` — connect with `?runtime_install_id=ri_a`, publish event with `runtime_install_id=ri_b`, assert subscriber receives nothing within 200ms. Implements the second half of FR-112.
- [ ] T243 [P] [US4] Integration test `tests/backend_events_ws.rs::lagged_subscriber_gets_warning_frame` — small broadcast capacity, fire many events fast, assert subscriber receives `{ type: "lagged", missed: N }` and connection stays open.

### Implementation

- [ ] T244 [US4] Add `pub backend_event_bus: Arc<BroadcastPublisher>` field to `nexus-api::AppState`.
- [ ] T245 [US4] In `nexus-core::app::run` (or wherever `Spawner::with_pool` is constructed), construct ONE `Arc<BroadcastPublisher>`, hand it to `Spawner` AND store on `AppState`. Same Arc, not a fresh instance.
- [ ] T246 [US4] Create `crates/nexus-api/src/handlers/backend_events_ws.rs` mirroring the shape of `nexus-api::ws::events_ws`: `WebSocketUpgrade::on_upgrade` → loop over `subscription.recv().await` → handle `Ok(event)` (filter + serialize + send), `Err(Lagged(n))` (send lagged frame, continue), `Err(Closed)` (break).
- [ ] T247 [US4] Add filter struct `BackendEventFilter { family: Option<String>, runtime_install_id: Option<String> }` parsed via `Query`; `matches_filter(&event, &filter)` helper.
- [ ] T248 [US4] Register route in `crates/nexus-api/src/router.rs`: `.route("/api/v1/backends/events", get(backend_events_ws::backend_events_ws))`.
- [ ] T249 [US4] Verify US4: `cargo test -p nexus-api --test backend_events_ws` GREEN.

---

## Phase 6: US5 — Missing FR-016 lifecycle events (P2)

**Story goal**: The four currently-missing event variants (`installed`, `repaired`, `unavailable`, `process_withdrawn`) are emitted by their respective code paths and observable via the WS bridge from US4.

### Tests (write first — RED)

- [ ] T260 [P] [US5] Integration test `crates/nexus-backend-runtimes/tests/lifecycle_events.rs::installed_emitted_on_install_completion` — run install pipeline against fixture; assert `installed` event observed on bus subscription.
- [ ] T261 [P] [US5] Integration test `tests/lifecycle_events.rs::repaired_emitted_after_repair` — trigger repair via adapter; assert `repaired` event.
- [ ] T262 [P] [US5] Integration test `tests/lifecycle_events.rs::unavailable_emitted_on_validator_transition` — validator marks `Installed → NeedsRepair`; assert `unavailable` event.
- [ ] T263 [P] [US5] Integration test `tests/lifecycle_events.rs::process_withdrawn_distinct_from_exited` — force-uninstall while live lease; assert `process_withdrawn` (not `process.exited`) fires.

### Implementation

- [ ] T264 [US5] Emit `BackendEvent::new("install.completed", family, ...)` at the end of `LlamaCppAdapter::install` (or in `install_pipeline::run` final phase).
- [ ] T265 [US5] Emit `BackendEvent::new("install.repaired", family, ...)` at the end of successful `LlamaCppAdapter::repair`.
- [ ] T266 [US5] Emit `BackendEvent::new("install.unavailable", family, ...)` in `validator::reconcile` when transitioning to `NeedsRepair`.
- [ ] T267 [US5] Emit `BackendEvent::new("process.withdrawn", family, ...)` in the uninstall handler's drain path (US6 territory but the emit site lives here).
- [ ] T268 [US5] Verify US5: `cargo test -p nexus-backend-runtimes --test lifecycle_events` GREEN; the four events all visible via WS subscription.

---

## Phase 7: US6 — Drain-then-uninstall flow (P2)

**Story goal**: `DELETE /api/v1/backends/{installId}` defaults to `?force=false` returning 409 with dependent list when leases exist; with `?force=true` it drains live leases, fires `process_withdrawn`, removes binaries, deletes the row.

### Tests (write first — RED)

- [ ] T270 [P] [US6] Integration test `crates/nexus-api/tests/uninstall_drain.rs::no_dependents_204` — install + no leases; DELETE returns 204; row gone; binary dir gone.
- [ ] T271 [P] [US6] Integration test `tests/uninstall_drain.rs::live_lease_no_force_409` — install + 1 live lease; DELETE without `?force=true` → 409 `RUNTIME_IN_USE` with dependent list.
- [ ] T272 [P] [US6] Integration test `tests/uninstall_drain.rs::live_lease_force_drains_within_12s` — same setup; DELETE `?force=true`; assert returns 204 within 12s; lease terminated; `process_withdrawn` event observed.
- [ ] T273 [P] [US6] Integration test `tests/uninstall_drain.rs::post_uninstall_spawn_returns_404` — uninstall + retry spawn against same install_id → 404 FAMILY_UNAVAILABLE.

### Implementation

- [ ] T274 [US6] Add `Spawner::list_live_leases_for_install(install_id) -> Vec<LeaseId>` in `spawn.rs` (queries `live_leases` map; for pool-mode, also queries DB for un-released leases).
- [ ] T275 [US6] Implement `DELETE /api/v1/backends/{installId}` handler in `crates/nexus-api/src/handlers/backends.rs`: extract `?force=bool`, call `installs_store::list_dependents`, branch on force flag.
- [ ] T276 [US6] In the force path, call `Spawner::shutdown(lease_id)` for each live lease in parallel via `futures::future::join_all`.
- [ ] T276b [US6] **Implement the missing 10s grace** in `Spawner::shutdown` (`crates/nexus-backend-runtimes/src/spawn.rs:471`). Current impl does immediate `JoinHandle::abort()`. Replace with: `notify_waiters()` → for real-fork mode, send `Child::start_kill()` (SIGTERM-equivalent) → wait on `child.wait()` with `tokio::time::timeout(Duration::from_secs(10), ...)` → on timeout, `child.kill().await`. For test-mode (no child), keep the existing abort path. Required by FR-120 and SC-106; the previous claim that "10s cap exists" was incorrect.
- [ ] T277 [US6] Implement `installs_store::remove_binary_directory(install_root) -> Result<()>` — `tokio::fs::remove_dir_all`; log on failure but proceed.
- [ ] T278 [US6] Implement `installs_store::delete_row(install_id) -> Result<()>` — DELETE with state_log append.
- [ ] T279 [US6] Register the DELETE route in `router.rs`.
- [ ] T280 [US6] Verify US6: `cargo test -p nexus-api --test uninstall_drain` GREEN.

---

## Phase 8: US7 — Verification script (P2)

**Story goal**: `scripts/verify-spec-011.sh` asserts the zero-extension-deps invariant and exits non-zero on regressions.

### Tests (write first — RED)

- [ ] T290 [P] [US7] Shell test `scripts/test_verify-spec-011.sh` — invoke the script on the clean tree, assert exit 0; modify `Cargo.toml` to add a fake extension dep, re-invoke, assert non-zero; revert.

### Implementation

- [ ] T291 [US7] Author `scripts/verify-spec-011.sh`: bash; `set -euo pipefail`; checks (a) no `extension-*`/`local-llm-*` line in `nexus-backend-runtimes/Cargo.toml`; (b) `cargo metadata` shows no edges; (c) `cargo check --workspace`.
- [ ] T292 [US7] Add reference to script in `crates/nexus-backend-runtimes/README.md` §"CI checks".
- [ ] T293 [US7] Verify US7: `bash scripts/verify-spec-011.sh` exits 0; `bash scripts/test_verify-spec-011.sh` passes.

---

## Phase 9: Polish

- [ ] T299 [P] Update `crates/nexus-backend-runtimes/README.md` §"Host-governed flags" + §"Event subscription model" + §"CI checks".
- [ ] T300 [P] Update root `README.md` "Recent Changes" to link spec 012.
- [ ] T301 Final verification: `cargo fmt --check`, `cargo clippy --workspace --all-targets -- -D warnings` (zero new warnings), `cargo test --workspace` (all green, no unauthorized ignores), `bash scripts/verify-spec-011.sh`.
- [ ] T302 Split commits per plan §Implementation Sequencing: one commit per US, in order US1 → US3 + US2 (parallel) → US4 + US5 (parallel) → US6 → US7 → polish.

---

## Dependencies

```text
Phase 1 (Setup) ──► Phase 2 (US1)
                         │
                  ┌──────┴──────┐
                  ▼             ▼
            Phase 3 (US2)  Phase 4 (US3)
                  │             │
                  └─────┬───────┘
                        ▼
                  ┌─────┴────────┐
                  ▼              ▼
            Phase 5 (US4)   Phase 6 (US5)
                  │              │
                  └──────┬───────┘
                         ▼
                   Phase 7 (US6) ──► Phase 8 (US7) ──► Phase 9 (Polish)
```

US1 lands first because migration startup wiring carries the highest risk and the smallest diff. US6 depends on US5 because it consumes `process_withdrawn`. US7 lands after the rest because it asserts the invariants the rest depend on.

Story-level independence:

- **US2 / US3**: independent of each other once US1 lands; touch different files.
- **US4 / US5**: US5 events flow through US4's WS bridge but the emit sites are in different modules.
- **US6**: depends on US5 for `process_withdrawn` emission.
- **US7**: independent verification; runs against final state.

## Parallel Execution Examples

**Within Phase 3 (US2) test phase** — four agents in parallel after T214 lands:

```text
Agent A → T210 (unsatisfiable)
Agent B → T211 (satisfiable)
Agent C → T212 (conflicting ranges)
Agent D → T213 (no field)
```

**Within Phase 4 (US3) test phase** — three agents in parallel:

```text
Agent A → T220 (table-driven denial)
Agent B → T221 (typed opt-in injection)
Agent C → T222 (warn log assertion)
```

**Cross-story parallelism after US1**: US2 implementation (T214–T217), US3 implementation (T223–T229), US4 implementation (T244–T248), US5 emission sites (T264–T267) can proceed concurrently because they touch different modules.

## Implementation Strategy

MVP cut: **US1 + US2 + US3 + US4** (all four P1 stories). That closes every CRITICAL/HIGH gap from the spec 011 analysis. US5/US6/US7 ride in a follow-up.

Recommended execution:

1. **Land US1** as a single commit — the highest-risk change with the smallest diff (~10 lines + 2 tests).
2. **Land US2 + US3 in parallel PRs** — different files, no overlap.
3. **Land US4 + US5 in parallel** — WS handler is a new file; event emissions are at existing transition sites.
4. **Land US6** — consumes US5's `process_withdrawn`.
5. **Land US7** — asserts the invariants the rest depend on.
6. **Polish + final verification** — last sweep.

Each phase is a green-building commit per constitution principle IX.

---

## Task Summary

- **Total tasks**: 42 (T200–T302 including T205b, T242b, T276b after `/speckit.analyze` v2 fixes)
- **Setup**: 1 (T200)
- **US1 (P1, migration startup)**: 7 (T201–T206 + T205b) — 2 tests, 5 impl
- **US2 (P1, enable resolution)**: 9 (T210–T218) — 4 tests + latency assertion on T210 (SC-102), 5 impl
- **US3 (P1, host-governed deny)**: 11 (T220–T230) — 3 tests + latency assertion on T220 (SC-103) + catalog precondition, 8 impl
- **US4 (P1, WS bridge)**: 11 (T240–T249 + T242b) — 5 tests, 6 impl
- **US5 (P2, missing events)**: 9 (T260–T268) — 4 tests, 5 impl
- **US6 (P2, drain-uninstall)**: 12 (T270–T280 + T276b) — 4 tests, 8 impl
- **US7 (P2, verify script)**: 4 (T290–T293) — 1 test, 3 impl
- **Polish**: 4 (T299–T302)

- **Parallel opportunities**: 19+ tasks marked `[P]`
- **MVP scope**: US1 + US2 + US3 + US4 = 38 tasks
- **Format validation**: all tasks use `- [ ] Tnnn [P?] [USx?] Description with file path` ✅
