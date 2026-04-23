# Session Checkpoint — Spec 032 Implementation

**Last updated**: 2026-04-24 (session 15 — code-complete apart from external-cost data)
**Branch**: `main`
**Last commit**: `f1835ca feat(spec-032): T096 + T097 extract short-circuit + cached phase chip`
**Status**: **120 of 122 tasks `[X]` + 2 `[~]` + 0 `[ ]`** in tasks.md. All code + test work finished. `main` is **11 commits ahead of origin**.

---

## TL;DR for the next session

Spec 032 is code-complete. Two `[~]` (in-progress) items remain; both are external-cost data gaps that cannot be closed inside the agent:

1. **T111 — stamp real python-build-standalone SHA-256 pins.** Architecture landed in `family_python::builtin_assets::REGISTRY` (empty const slice) + fallback in `FamilyPythonHandler::new()`. Human needs to (a) pick a python-build-standalone release, (b) download the `install_only.tar.gz` for Windows-x64 + Linux-x64, (c) verify sha256 against upstream `SHA256SUMS`, (d) commit the `(target_triple, url, sha256, size)` rows.
2. **T108 — real `smoke-proof.json`.** Harness at `scripts/smoke-spec-032.ps1` is ready; operator runs it against a clean Windows host with the test-echo-runtime extension activated and commits the output as `specs/032-backend-runtime-catalog/smoke-proof.json`.

Also external-cost (not spec-blocking): `pnpm install` + `pnpm test:smoke` + `pnpm test:a11y` against a live host, and `git push` to origin (11 commits pending).

Everything authorable from `/speckit.tasks` through `/speckit.implement` is done.

---

## What landed session 15 (2026-04-24)

### Retry cache closure + tasks.md bookkeeping sweep (f1835ca)

- **T095 (download cache) + T096 (extract short-circuit) + T097 (cached chip)** all closed. Full chain:
  - `InstallCtx::phase_cached: bool` — orchestrator clears at each phase entry, reads after body, stamps `payload: { cached: true }` via new `PhaseEvent::completed_cached` helper.
  - `download.rs` sets flag when partial-path archive OR `{download_cache}/archives/<sha>.bin` already has matching bytes.
  - `extract.rs` writes `.extract-complete` sentinel containing the asset sha; subsequent runs read it and skip re-extract.
  - `complete_phase` removes the sentinel before atomic rename so it doesn't leak into `install_path`.
  - Frontend `pipeline_progress.tsx` renders a `cache` pill (new `cachedChip` vanilla-extract class) next to any phase whose `payload.cached === true`.
- **New test** `cached_phases_stamp_payload_on_second_run` — double-runs the pipeline against a pre-populated partial_path + sentinel + shared download_cache; asserts both download + extract `completed` events carry `{ cached: true }`.
- **tasks.md bookkeeping sweep** — 29 stale `[ ]` → `[X]` with "Landed as …" notes; T108 + T111 marked `[~]` to distinguish external-cost data gaps from code gaps. Status now mirrors reality (120 `[X]`, 2 `[~]`, 0 `[ ]`).

### Cumulative landing per session (sessions 1–15)

The spec 032 work stretched across 15 sessions: foundation → family_python → multi-family pipeline → catalog HTTP → install pipeline → lease lifecycle → UI polish → tests → security review → docs → CI gate → retry cache. See `git log --oneline --grep=spec-032` for the per-commit trail.

---

## What landed session 10 (2026-04-23)

### T059-T062 — embedded-Python family handler (4 tasks)

| Task | Where |
|---|---|
| T059 | `crates/nexus-backend-runtimes/src/family_python/handler.rs` — `FamilyPythonHandler` impl of `RuntimeFamilyHandler`. Asset override + `UvInvocation` override both injectable; `spawn_launch_spec` points at `{install_path}/python/python.exe` (Windows) or `{install_path}/python/bin/python3` (Unix). Delegates `bootstrap_runtime → install_deps → validate_env` to sibling modules. |
| T060 | `family_python/bootstrap.rs` — download (file:// + http(s)) → verify SHA-256 → extract into `{partial_path}/python/`. Retry short-circuits on matching checksum of a cached archive under `{download_cache}/embedded_python/`. Idempotent noop when the interpreter already exists. Tar.gz + zip both supported via `spawn_blocking`. `strip_outer` peels the archive's conventional top-level `python/` so paths don't nest. |
| T061 | `family_python/uv_install.rs` — spawns `uv sync --all-extras` inside `{partial_path}/worker/` pinned to the embedded interpreter (`UV_PYTHON` env). Windows skips `--extra deepspeed` per upstream guidance; `UvInvocation.deepspeed_extra_on_windows` opts in. uv stderr truncated to 2 KB and mapped to `DependencyInstallFailed`. |
| T062 | `family_python/validate.rs` — probes the embedded python with `import sys; print(sys.version)`; empty stdout or non-zero exit → `PythonBootstrapFailed`. Absolutises any relative `InstallCtx.entrypoint_path` against `install_path` (post-rename target) so lease-acquire resolves it after the final `complete` phase. |
| T064b patch | `nexus-api::handlers::backend_runtimes::pipeline_runner::register_default_handlers` now takes `python_asset: Option<PythonAsset>` so production hosts pin an embedded-Python distribution without code changes. `nexus-core::app` passes `None` for now — production follow-up stamps real URLs + SHAs. |
| Tests | 20 new lib unit tests (archive-kind inference, strip_outer component handling, cache-filename convention, sync_args platform matrix, uv-stderr UTF-8 truncation, entrypoint absolutisation, launch_spec shape, handler config surface). 6 new integration tests in `tests/family_python_bootstrap_test.rs` — tar.gz extract roundtrip, already-present short-circuit, missing-asset error, checksum-mismatch error, real system-python validate probe (confirms absolutisation), handler-family report. |

### Validation snapshot (end of session 10)

```
cargo check --workspace                                  → clean
cargo clippy -p nexus-backend-runtimes --lib             → clean
cargo clippy -p nexus-backend-runtimes --test family_python_bootstrap_test → clean

cargo test -p nexus-backend-runtimes:
  lib                              118 (was 98 → +20 family_python)
  family_python_bootstrap_test      6 NEW
  (all 13 other integration binaries green, unchanged)

cargo test -p nexus-api:
  backend_runtimes_contract_test   18
  install_spawn_test                5
  lease_lifecycle_test             13

powershell scripts/audit-runtime-boundary.ps1            → BOUNDARY AUDIT PASSED
```

---

## What landed this session (2026-04-23)

### Phase 3 — US1 complete (T029–T046, 18 tasks)

| Task | Where |
|---|---|
| T031, T034 | `crates/nexus-extension/src/backend_runtime_contribution/{mod,schema}.rs` — `BackendRuntimeContribution` validator + 10 unit tests covering id regex, family aliases, transport, path traversal, duplicates within manifest, display-name overrun |
| T033 | `crates/nexus-extension/src/manifest.rs` — `BackendRuntimeContribution` struct + `backend_runtimes: Vec<…>` field on `ExtensionManifest` (default empty for backward compat) |
| T035 | `crates/nexus-extension/src/validation.rs::validate_backend_runtimes` |
| T036, T037, T038 | `crates/nexus-api/src/handlers/backend_runtimes/registration.rs` — host-side bridge with `compute_contribution_checksum` (SHA-256 canonical), `register_contributions`, `deactivate_contributions`, `abandon_contributions` (cascades to installs). 4 inline unit tests |
| T029, T030, T032 | `crates/nexus-api/tests/backend_runtimes_contract_test.rs` — 11 contract+cascade tests (filters, schema, 200/400/404, idempotency, drift, cross-extension dedup, abandon cascade) |
| T039, T040 | `crates/nexus-api/src/handlers/backend_runtimes/{list,get,dto}.rs` |
| T041 | `extensions/builtin/test-echo-runtime/manifest.yaml` |
| T042 | `extensions/builtin/test-echo-runtime/backends/echo/{backend-runtime,versions}.yaml` (asset zip placeholder — real bytes are a follow-up build-script task) |
| T043 | `extensions/builtin/test-echo-runtime/worker/{pyproject.toml, src/echo_worker/main.py}` — JSON-RPC stdio loop with `handshake/health/shutdown/echo` |
| T044 | `apps/web/src/services/backend_runtimes_client.ts` — typed SWR fetcher, list+get+groupByExtension |
| T045, T046 | `apps/web/src/views/backend-runtimes/{backend_runtimes.{view,ui,css}.tsx,components/runtime_card.tsx}` — placed in sibling path `backend-runtimes/` (new) so the legacy `views/backends/` is untouched. Route `/backend-runtimes` registered in `routes.tsx`. SWR 10 s revalidate, group-by-source-extension, status-aware badges, capability + role pills |

### Phase 4 — partial US2 (T047, T048, T058, T063, T064, T065, T067 — 7 tasks of 24)

| Task | Where |
|---|---|
| T047 | `backend_runtimes_contract_test.rs` extended — 7 install/get/retry tests (202+schema, 404, 409 unavailable, 409 in-flight, get 200+404, retry only on `failed`+state flip) |
| T048 | `crates/nexus-backend-runtimes/tests/generic_pipeline_test.rs` — 4 tests (10-phase order, cancellation at boundary, atomic rename, install-path collision) |
| T058 | `install_pipeline.rs::complete_phase` — atomic `.partial → install_path` rename via `tokio::fs::rename`, rejects collisions with `InstallPathCollision`, creates parent dir if missing |
| T063 | `family_native/handler.rs::FamilyNativeHandler` — no-op family handler used to drive end-to-end pipeline tests; maps to `RuntimeFamily::LlamaCpp` until a `Native` variant is added |
| T064 | `crates/nexus-api/src/handlers/backend_runtimes/install.rs` — `POST /install` with full validation, in-flight duplicate detection, install-row creation. Pipeline spawn deferred (response `pipeline_status: "queued"`) |
| T065 | `installs_get.rs` — `GET /api/v1/backend-runtime-installs/:install_id` with full `InstallDto` |
| T067 | `installs_retry.rs` — `POST /api/v1/backend-runtime-installs/:install_id/retry`, only `failed` is retryable |

### Migration wiring + frontend route

- `crates/nexus-storage/src/sqlite/migrations.rs` — migrations 016–019 now applied at host boot (previously only in test helper)
- `apps/web/src/routes.tsx` — `/backend-runtimes` route registered
- Frontend route verified live in browser preview (page renders, error path is clean, fetch hits the right URL)

### Validation snapshot (end of session)

```
cargo check --workspace                                  → clean
cargo clippy -p nexus-backend-runtimes --lib             → clean (0 warnings)

cargo test -p nexus-backend-runtimes (13 binaries):
  lib                              98 (90 + 8 version_manifest)
  channel_llamacpp                  2
  crash_recovery_test               3
  generic_pipeline_test             8 (was 4 — added 4 failure-injection + 1 retry)
  generic_repos_test               19
  host_governed_default_deny        3
  lifecycle_events                  3 (+2 ignored)
  matchmaker_test                   6
  migration_startup                 3
  ndjson_framer_test                9
  release_scanner_contract          4
  test_echo_install_test            1 (NEW — real-asset e2e)

cargo test -p nexus-extension --lib   → 118 (10 contribution validation)
cargo test -p nexus-api --test backend_runtimes_contract_test → 18/18

powershell scripts/audit-runtime-boundary.ps1            → BOUNDARY AUDIT PASSED
preview verify (/backend-runtimes route)                 → renders, error state shown cleanly
```

### Session 9 add-ons (2026-04-23, this run — Uninstall + Restart HTTP + Frontend install flow)

| Task | Where |
|---|---|
| T087a | `installs_delete.rs::DELETE /install/:id` — 204 on clean flip to `abandoned`; 409 `install_has_live_leases` when `LeaseManager::live_count_for_install > 0`; 404 on unknown; 400 on invalid ULID. Wired on the same route as `GET /install/:id` via `.get(...).delete(...)`. |
| T083 | `installs_restart.rs::POST /install/:id/restart` — drains live leases, re-acquires a fresh lease (`preview_session` owner), returns `{new_lease_id, state, pid, stopped_leases}`. |
| Tests | `lease_lifecycle_test.rs` grew from 8 → 13 tests: uninstall 204/409/404 + restart with-and-without-prior-lease. |
| T068 | `apps/web/src/views/backend-runtimes/components/install_modal.tsx` — release/platform/accelerator input form, platform auto-detect, submit via `startInstall`, surfaces error envelope. |
| T069 | `components/pipeline_progress.tsx` — SSE consumer via native `EventSource`, ten-phase vertical stepper (queued/running/completed/failed with elapsed ms), failure-detail collapsible, terminal button gated on the `done` frame. |
| T070 | `runtime_card.tsx` Install button (renders only when `implementation_status === "available"`). `backend_runtimes.view.tsx` state machine transitions `idle → picking → running → idle`, refetches SWR on terminal. |
| Services | `backend_runtimes_client.ts` extended with `startInstall`, `getInstall`, `retryInstall`, `uninstallInstall`, `startLease`, `stopLeases`, `restartInstall`, `PhaseEvent` + `PHASE_ORDER`, `subscribeInstallProgress` (native EventSource wrapper). |
| CSS | `backend_runtimes.css.ts` gained action buttons, primary/danger variants, modal backdrop+panel+field styles, stepper row variants (active/done/failed). |
| Browser verify | `/backend-runtimes` route renders cleanly (no console errors); Install button click opens modal with correct fields via the `dialog` a11y snapshot. |

### Session 8 add-ons (2026-04-23, lease lifecycle HTTP + drain cascade)

| Task | Where |
|---|---|
| T080a | `generic/leases/manager.rs::LeaseManager` — Mutex-guarded HashMap of `(RuntimeLeaseId → {Arc<StdioLease>, RuntimeInstallId})`. API: `register`, `get`, `release`, `release_all_for_install`, `release_all_for_installs`, `live_count_for_install`, `live_count`. Wired into `AppState.lease_manager: Arc<LeaseManager>` + `nexus-core::app.rs` boot + test harness default. |
| T080 | `registration.rs::deactivate_contributions_with_drain(catalog, installs, manager, source_ext)` — resolves every install for every contributed runtime, drains all live leases via manager, flips catalog rows to `unavailable`. Returns drained count. |
| T081 | `installs_start.rs::POST /install/:id/start` — validates install → resolves catalog family → calls `acquire_lease` → registers handle in `LeaseManager`. Returns `{lease_id, state, pid}`. 400/404/409 taxonomy. Owner defaults to `preview_session`. |
| T082 | `installs_stop.rs::POST /install/:id/stop` — delegates to `LeaseManager::release_all_for_install`. Returns `{draining_leases}`. Idempotent. |
| T085 | `leases_list.rs::GET /backend-runtime-leases` — parameterised SQL query with conditional filters (`runtime_install_id`, `owner_kind`, `state`, `live_only` default true). Also `leases_get.rs::GET /:lease_id`. |
| T086 | `leases_delete.rs::DELETE /:lease_id` — 204 via `LeaseManager` fast path + persistence reconcile; 409 on terminal row; 404 on unknown; orphan-row recovery flips non-terminal rows without a live handle to `released`. |
| Tests | `tests/lease_lifecycle_test.rs` — 8 tests covering start/stop/list/get/delete/drain end-to-end against the real test-echo Python worker. All 16 backend-runtimes test binaries + 3 relevant nexus-api test binaries green (18 + 5 + 8 = 31 API-level tests). Boundary audit clean. |

### Session 7 add-ons (2026-04-23)

| Task | Where |
|---|---|
| T076 | `generic/leases/stdio_lease.rs` — `StdioLease` struct with internal writer + reader + stderr-forwarder tasks. `tokio::process::Command` with `kill_on_drop(true)`, stdin/stdout/stderr piped. Writer task owns ChildStdin and serialises outbound frames. Reader task drains frames via the existing framer, dispatches responses to `Matchmaker`, notifications to `NotificationFanout`, logs malformed lines. Stderr forwarder emits `tracing::info!` per line. State machine via `Arc<Mutex<LeaseState>>`. Configurable per-request timeout + `DEFAULT_RPC_TIMEOUT = 30s` + `SHUTDOWN_GRACE = 5s` module consts. `send_rpc_with_timeout(method, params, timeout)` helper for tests. |
| T077 | Release teardown — best-effort `shutdown` RPC (1 s cap) + close writer channel + `child.wait()` with 5 s grace + SIGKILL fallback. Fails any still-pending RPCs with `MatchmakerFailure::Cancelled`. Idempotent (second call is a no-op — state already `Released`). Post-release RPCs fail fast with `RuntimeUnavailable`. |
| T078 | `generic/leases/handshake.rs` — `HANDSHAKE_TIMEOUT = 60s` + `HOST_PROTOCOL_VERSION = "1.0"` module consts. `do_handshake` sends the handshake RPC under `tokio::time::timeout(HANDSHAKE_TIMEOUT, …)`, decodes `HandshakeInfo { protocol_version, worker_version, accepts_methods, notification_methods }`, rejects protocol-version mismatches as `LeaseError::Internal`. |
| T079 | `generic/leases/acquire.rs::acquire_lease` — validates install is `Validated`, looks up family handler via `FamilyHandlerRegistry`, builds launch spec, inserts lease row in `starting`, spawns StdioLease, runs handshake, flips lease row `starting → ready` + stamps PID. Handshake failure → release subprocess + `record_failed` with `HandshakeFailed` category. `AcquireOptions { owner_kind, owner_ref }` carries caller identity. |
| T071 | `tests/lease_roundtrip_test.rs` — full handshake + echo roundtrip against the real `extensions/builtin/test-echo-runtime/worker/src/echo_worker/main.py`. Verifies `accepts_methods` contains `"echo"`, echo response roundtrips verbatim, notifications channel is subscribable, release flips state to `Released`, post-release RPCs fail fast with `RuntimeUnavailable`. Also covers idempotent release. |
| T072 | `lease_roundtrip_test.rs` — unknown method returns `LeaseError::Rpc { code: -32601, message contains "method not found" }`. Separate slow-worker python stub that reads+sleeps never responds; `send_rpc_with_timeout(300ms)` fires `LeaseError::Timeout`. |
| T073 | `lease_roundtrip_test.rs` — crashy-worker python stub that reads one line then `sys.exit(1)`; pending RPC surfaces `LeaseError::WorkerCrashed` (or `Timeout` if reader task hasn't noticed yet — tolerated). |
| T079 tests | `tests/lease_acquire_test.rs` — 3 tests: full `acquire_lease` happy path end-to-end via repos + `PythonViaPathHandler` (test-only `RuntimeFamilyHandler` that spawns via system python; `FamilyPythonHandler` with embedded Python is still deferred to T059-T062). Plus `RuntimeUnavailable` paths for non-Validated install + missing family handler. |

### Session 6 add-ons (2026-04-23)

| Task | Where |
|---|---|
| T064b | `AppState` gained `family_handlers: FamilyHandlerRegistry` + `pipeline_events: Arc<broadcast::Sender<PhaseEvent>>` (cap `PIPELINE_EVENT_CAPACITY = 1024`). Wired in `nexus-core::app.rs` + test harness `common/mod.rs`. `nexus-api/src/handlers/backend_runtimes/pipeline_runner.rs` owns `spawn_pipeline` + `drive` + `register_default_handlers` + `is_terminal_event`. `POST /install` now dispatches to `spawn_pipeline` when `extensions_dir` is configured; response `pipeline_status` is `"running"` / `"unwired"`. |
| T066 | `installs_progress.rs` — axum SSE stream subscribing to `state.pipeline_events`, filters by install_id, emits `event: phase` frames per PhaseEvent, terminal `event: done` with `{install_id, terminal}`, 15 s keep-alive via `KeepAlive::new().interval(...).text("heartbeat")`. Lagged subscribers log + continue. |
| Fix | `pipeline_runner::drive` sets `ctx.extension_root = manifest_path.parent()` — file:// URLs in version manifests are conventionally relative to the manifest file, not the extension root. |
| Tests | `tests/install_spawn_test.rs` (5 tests): `install_spawns_pipeline_and_transitions_to_validated` exercises the real test-echo extension end-to-end (catalog register → POST /install → tokio spawn → pipeline runs → install row flips to `validated` with artifact_hash + validated_at); `install_records_failure_when_family_handler_is_missing` verifies `runtime_not_installed` failure path; `progress_stream_emits_phase_events_and_terminates_with_done` drains the broadcast and confirms 10+10 phase events + terminal; 2 contract checks (content-type + invalid ULID 400). |
| Fix | Existing contract test `install_returns_202_with_runtime_install_id` relaxed to accept `pipeline_status: "unwired"` (test harness doesn't wire `extensions_dir`). |
| Deps | `nexus-api` gained `async-trait = "0.1"` + `tokio-stream = { ..., features = ["sync"] }` for the SSE broadcast stream. |

### Session 5 add-ons (2026-04-23)

| Task | Where |
|---|---|
| T051 | `generic/version_manifest.rs` (releases/targets/asset model + `parse_yaml` + `resolve` with file:// canonicalisation + path-traversal rejection) — 8 unit tests; `generic/phases/resolve.rs` |
| T052 | `generic/phases/download.rs` — file:// (tokio::fs::copy) + http(s) (reqwest) + retry short-circuit by hash |
| T053 | `generic/phases/verify.rs` — streaming SHA-256 |
| T054 | `generic/phases/extract.rs` — zip/tar/tar.gz dispatch on URL extension; `spawn_blocking` for sync archive crates; zip-slip prevention via `enclosed_name` |
| T048 expansion | 4 new failure-injection tests + 1 retry-short-circuit test in `tests/generic_pipeline_test.rs` (now 8 total) |
| Real test-echo asset | `extensions/builtin/test-echo-runtime/backends/echo/assets/echo_worker.zip` (3500 bytes, real sha256) + updated `versions.yaml` |
| T049 | failure-injection covered inline in T048's expanded test file |
| Real-asset e2e | `tests/test_echo_install_test.rs` — runs the actual test-echo extension's `versions.yaml` + zip through the full 10-phase pipeline |
| Orchestrator dispatch | `install_pipeline.rs` now routes to `crate::generic::phases::*` instead of inline Ok-stubs |
| InstallCtx | added `extension_root: Option<PathBuf>`, `resolved_asset: Option<ResolvedAsset>`, `downloaded_archive: Option<PathBuf>` |

### Design decisions made during implementation

1. **Registration bridge lives host-side** (`crates/nexus-api/src/handlers/backend_runtimes/registration.rs`), not in `nexus-extension`. Reason: keeps `nexus-extension` free of the `nexus-backend-runtimes` dependency per Principle XIII boundary. The extension crate only validates structure; the bridge maps to `CatalogEntry` + computes `ContributionChecksum`.
2. **`BackendRuntimeContribution` uses plain Strings** for `family` / `transport` / `runtime_id` rather than the newtypes from `nexus-backend-runtimes`. Same boundary reason. Domain-type validation happens at registration time in the bridge.
3. **Frontend view at `/backend-runtimes`** sits at a sibling path under `apps/web/src/views/backend-runtimes/` rather than overwriting the legacy `views/backends/`. Migration of the legacy llama.cpp adapter UI is its own deferred refactor.
4. **`POST /install` defers the pipeline spawn**. The handler creates the install row but doesn't launch the orchestrator because the `FamilyHandlerRegistry` isn't yet wired into `AppState`. The 202 response carries `pipeline_status: "queued"` so clients can detect this; T064b should wire registry + spawn together when the real generic phases land.
5. **`FamilyNativeHandler.family() = RuntimeFamily::LlamaCpp`** — in-place stand-in until a `RuntimeFamily::Native` variant is added in a future spec. The orchestrator + tests only key on the trait, so this is functionally fine.
6. **Migrations 016–019 wired into prod runner** (`nexus_storage/sqlite/migrations.rs`). The test helper `make_runtime_pool` in `crates/nexus-backend-runtimes/tests/common/mod.rs` could now be replaced by the prod runner; left as-is for fast in-memory test setup that doesn't need the rest of the host schema.
7. **Test-echo asset zip is placeholder** — the version-manifest carries `sha256: 0…0` and `size: 0`. Real bytes wait until the download/verify/extract phases (T052–T054) are implemented; an `asset_build.sh` will then produce the zip from `worker/` and stamp the actual hash.
8. **Browser-preview verification of `/backend-runtimes`** confirmed the view renders cleanly and the SWR fetch targets the correct URL. The 500 response observed comes from a stale (or absent) host process on `:3000` — every existing `/api/v1/*` endpoint also returns 500 in the dev environment, so this is environmental, not a regression.

---

## Next session — exact pickup

### High-leverage next tasks (T051–T057, T059–T062, T066, T064b)

1. **T051** `generic/phases/resolve.rs` — parse extension's `version_manifest.yaml`, select matching `(release, platform, accelerator_profile)`, populate `ResolvedAsset { url, checksum, size }`.
2. **T052** `generic/phases/download.rs` — streaming download to `.partial/archive.bin`, retry short-circuit by hash.
3. **T053** `generic/phases/verify.rs` — SHA-256 vs `ResolvedAsset.checksum`.
4. **T054** `generic/phases/extract.rs` — zip/tar into `.partial/`.
5. **T059–T062** family_python handler — embedded Python download + uv install + python --version probe.
6. **T064b** Wire `FamilyHandlerRegistry` into `AppState`, spawn the pipeline from `POST /install`.
7. **T066** `installs_progress.rs` — SSE stream of `PhaseEvent` per install_id.

### Lower-priority follow-ups

- T049, T050 — failure + cancel injection tests (need real phases first)
- T068–T070 — frontend install modal + pipeline progress stepper
- T071–T079 — US3 lease acquire + JSON-RPC round-trip end-to-end
- T087 — final merge gate

---

## Gotchas for the next session

- **The legacy `views/backends/` path remains untouched.** New work goes under `views/backend-runtimes/`. If a future migration consolidates them, the route at `/backends` needs careful rename planning — there are existing operator workflows pointing at it.
- **Family-handler registry doesn't exist yet.** When you wire it into `AppState`, register both `FamilyNativeHandler` (for native-binary runtimes like llama.cpp) and the new `FamilyPythonHandler` (T059) at boot. The registry struct is already implemented in `generic/family_handler.rs`.
- **Test-echo asset zip needs to be built before T052+ tests can run end-to-end.** Either write a build script that generates `echo_worker.zip` at test fixture-setup time, or commit a hand-built zip to the repo (small ~few KB).
- **`InstallRecord::install_path` is a `String`, not a `PathBuf`.** When the pipeline reads it for atomic rename, it converts via `PathBuf::from`. Keep that asymmetry in mind.
- **Boundary audit is fast — run after every file added under `crates/nexus-*` or `apps/web/src/`:**
  ```powershell
  powershell -ExecutionPolicy Bypass -File scripts/audit-runtime-boundary.ps1
  ```
- **Uncommitted drift on `BroadcastPublisher` → `BackendEventBus`** still hasn't landed. Clean to commit alongside this session's work.

---

## Commit & PR suggestion

```
feat(spec-032): Phase 3 + partial Phase 4 — manifest contribution + catalog HTTP + UI + install API

- Manifest BackendRuntimeContribution struct + schema validation (10 unit tests)
- Host-side registration bridge with SHA-256 ContributionChecksum + cascades
- HTTP catalog: GET /backend-runtimes (filters), GET /:id, POST /:id/install,
  GET /backend-runtime-installs/:id, POST /:id/retry (18 contract tests)
- Backend-runtimes Backends page at /backend-runtimes (SWR + group-by-extension)
- test-echo-runtime synthetic extension (manifest + worker + version manifest)
- Pipeline complete-phase atomic .partial → install rename + collision rejection
- FamilyNativeHandler (no-op) for end-to-end pipeline tests (4 new tests)
- Migrations 016-019 wired into prod runner

Tasks T029–T046 (Phase 3) + T047, T048, T058, T063, T064, T065, T067 (Phase 4).
51 of 112 marked [X]. Phase 3 shippable.
```
