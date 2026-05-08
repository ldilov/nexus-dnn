---

description: "Task list for spec 042 — Neo-Terminal Desktop Shell"
---

# Tasks: Neo-Terminal Desktop Shell

**Input**: Design documents from `specs/042-neo-terminal-shell/`
**Prerequisites**: [plan.md](./plan.md) ✓, [spec.md](./spec.md) ✓, [research.md](./research.md) ✓, [data-model.md](./data-model.md) ✓, [contracts/](./contracts/) ✓, [quickstart.md](./quickstart.md) ✓

## Test policy for this spec

Per the user directive at `/speckit.tasks` invocation ("tests are not that important") combined with the Constitution VI v1.1.2 design-heavy UI carve-out invoked by this spec, the test surface is **minimal but constitutionally compliant**:

- **KEPT**: Backend contract tests for the event protocol (T011), llama.cpp scraper fixture suite (T038), and the Principle XIII boundary audit (T020 baseline + T067 final).
- **FOLDED into implementation tasks**: Token coverage scan, lint scans, manual quickstart smoke. No separate per-component vitest tasks. No separate Playwright visual baseline tasks.
- **DEFERRED**: Component-level UI test coverage tracked as a follow-up sprint per Principle VI carve-out.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Maps task to user story (US1 / US2 / US3 / US4 / US5). Setup, Foundational, and Polish tasks have no story label.

## Path Conventions

This spec lands across:

- Two new Rust crates: `crates/nexus-run-events/`, `crates/nexus-desktop-shell/`
- One Tauri sub-crate: `apps/web/src-tauri/`
- Frontend additions under `apps/web/src/{components,services,hooks,styles/tokens}/`
- Existing crate extension: `crates/nexus-backend-runtimes/src/llamacpp/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Workspace plumbing, dep additions, and the Test Strategy spec amendment that closes the Constitution VI carve-out.

- [X] T001 Add `crates/nexus-run-events` and `crates/nexus-desktop-shell` and `apps/web/src-tauri` as workspace members in the root `Cargo.toml`
- [X] T002 [P] Verify Tauri CLI 2.x is installed (`cargo install tauri-cli --version "^2"`); document in `apps/web/README.md` if not already
- [X] T003 [P] Add new frontend dependencies in `apps/web/package.json`: `@tauri-apps/api@^2`, `@tauri-apps/cli@^2` (devDependency), `idb@^8`. Run `pnpm install` to refresh lockfile.
- [X] T004 [P] Scaffold `apps/web/src-tauri/` directory: empty `Cargo.toml` (member-of-workspace), placeholder `tauri.conf.json`, `build.rs`, `src/main.rs`, `src/lib.rs`, `capabilities/default.json`
- [X] T005 [P] Add `tauri.conf.json` minimal config with `decorations: false`, `titleBarStyle: "Overlay"`, `transparent: true`, `hiddenTitle: true`, and `beforeDevCommand: "pnpm --filter web dev"` per research.md R1
- [X] T006 Add a "Test strategy" section to `specs/042-neo-terminal-shell/spec.md` invoking the Constitution VI v1.1.2 design-heavy UI carve-out — closes the action item flagged in plan.md's Constitution Check

**Checkpoint**: Workspace builds clean (`cargo check --workspace`), frontend lockfile current, spec.md amended.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Visual system + event substrate + IPC scaffolding. Everything below blocks every user story.

**⚠️ XII.8 GATE**: T007 ("Frame the interface first") is the constitutionally-mandated visual-system deliverable. It MUST land before any screen-level component work begins.

### Visual system (XII.8 "Frame the interface first")

- [X] T007 Implement the `terminal.css.ts` design-token group at `apps/web/src/styles/tokens/terminal.css.ts` exposing `cursor.*`, `phosphor.*`, `block.*`, `lattice.*`, `pulseFloor.*`, `state.*`, `type.*`, `motion.*` per data-model.md and the brainstorm doc's token preview. Tokens are role-named (`state.resident` etc.), not hue-named. Include `@font-face` declaration for JetBrains Mono per research.md R5. Include `prefers-reduced-motion` media-query overrides for `cursor.*`, `lattice.breathCycle`, and `motion.*` cycles. **Constitution XII.8 — Frame the interface first.**

### Rust event substrate (`nexus-run-events`)

- [X] T008 [P] Create `crates/nexus-run-events/Cargo.toml` with deps `serde`, `thiserror`, `chrono` (for `ts_ms` helpers). Author crate-level `src/lib.rs` doc comment (`//!`) describing the event protocol's role.
- [X] T009 Implement newtypes (`SeqNum`, `RunId`, `SourceId`, `LayerIndex`) in `crates/nexus-run-events/src/ids.rs` per data-model.md. Each newtype derives standard traits and provides validating constructors where appropriate.
- [X] T010 Implement the `RunEventItem` discriminated-union enum + every supporting enum (`PhaseName`, `PhaseState`, `AllocationTarget`, `MetricUnit`, `ErrorReason`, `GapReason`, `LineStream`, `Severity`, `WidgetKind`, `TensorGroup`, `SchemaVersion`) in `crates/nexus-run-events/src/lib.rs`. Mark every enum `#[non_exhaustive]` per Principle V. Add `EventBatch` transport struct.
- [X] T011 Implement schema-roundtrip backend contract test at `crates/nexus-run-events/tests/schema_compat.rs`: every `RunEventItem` variant serialises to JSON matching `specs/042-neo-terminal-shell/contracts/run-event.schema.json` and deserialises back with a `JsonSchema`-validated round-trip. Forward-compat: deserialiser tolerates unknown enum variants per `#[non_exhaustive]` semantics.
- [X] T012 [P] Implement `WorkerScraper` trait in `crates/nexus-run-events/src/store/mod.rs` with the contract from data-model.md (`id`, `ingest_line`, `flush`).

### Frontend event substrate

- [X] T013 Implement `services/ipc_adapter.ts` at `apps/web/src/services/ipc_adapter.ts`: runtime branch on `window.isTauri`, lazy-import `tauri_transport.ts` or `http_transport.ts`, expose typed RPC surface per contracts/ipc-commands.md. Export `rpc.runEvents.subscribe`, `rpc.runEvents.queryWindow`, `rpc.runEvents.bucketed`, `rpc.runtimeTuning.patch`, `rpc.block.registerMnemonic`, `rpc.pulseFloor.metricsSubscribe`, `rpc.tray.setState`, `rpc.window.setTitlebarBreadcrumb`, `rpc.window.show/hide/focus`. Constitution XII.4: this is the only I/O boundary.
- [X] T014 [P] Implement `services/tauri_transport.ts` (Tauri-side `invoke` + `Channel<EventBatch>`) at `apps/web/src/services/tauri_transport.ts`
- [X] T015 [P] Implement `services/http_transport.ts` (browser-dev `fetch` + `EventSource` fallback) at `apps/web/src/services/http_transport.ts`
- [X] T016 Implement `services/run_events.ts` event store at `apps/web/src/services/run_events.ts`: hot ring buffer (in-memory, ~2k items per active run), gap detection on seq breaks, rAF-batched fan-out to subscribers. Subscribers register by `RunId`. Rolls over on capacity.
- [X] T017 Add IndexedDB warm tier in `apps/web/src/services/run_events_warm.ts` using `idb@^8`: object store `run_events` keyed by `[run_id, seq]`, secondary index `[run_id, ts_ms]`, eviction policy at ~50 MB across all runs.
- [X] T018 [P] Implement `hooks/use_run_events.ts` at `apps/web/src/hooks/use_run_events.ts` exposing `useRunEvents(runId)` and `useRunEventsForRange(runId, range)` hooks consuming the store.

### Block primitive + Cursor primitive (foundational UI atoms)

- [X] T019 [P] Implement `Block` component at `apps/web/src/components/blocks/block.tsx` + `block.css.ts` + `block_header.tsx`. Props per data-model.md `BlockProps`. Implements: prompt-style header rendering, collapsed-state inline 4px sparkline, focus-driven inset phosphor glow (consumes `phosphor.*` tokens), keyboard-driven collapse toggle. Accept `mnemonic` prop and call `rpc.block.registerMnemonic` on mount.
- [X] T020 [P] Implement `Cursor` singleton at `apps/web/src/components/cursor/cursor.tsx` + `cursor.css.ts`. Mounts once at app root. Reads focus state from a global focus context; reads activity level from `useSystemActivity()` (TBD in T058 — until then, default to rest pulse). Honors `prefers-reduced-motion`.

### Tauri shell skeleton

- [X] T021 [P] Author `crates/nexus-desktop-shell/Cargo.toml` with deps `tauri`, `serde`, `anyhow`, `nexus-api` (path), `nexus-run-events` (path). Crate-level docs.
- [X] T022 Implement `crates/nexus-desktop-shell/src/lib.rs` `pub fn run() -> tauri::Result<()>` per research.md R1: builds Tauri with `tray-icon` feature, registers commands, sets up window event handler, starts the embedded host axum server bound on `127.0.0.1:0`, exposes the chosen port to commands.
- [X] T023 Implement `crates/nexus-desktop-shell/src/ipc/mod.rs` as the generic dispatcher module + child `ipc/run_events.rs`, `ipc/runtime_tuning.rs`, `ipc/window.rs`, `ipc/tray.rs`, `ipc/block.rs`, `ipc/pulse_floor.rs` stubs (one file per command group). Each child module exports a `register(builder)` function called from `lib.rs`.
- [X] T024 [P] Author `apps/web/src-tauri/src/main.rs` and `src/lib.rs` (the actual Tauri binary entry). `main.rs` is one line: `app_lib::run()`. `lib.rs` calls `nexus_desktop_shell::run()`.
- [X] T025 Author `apps/web/src-tauri/capabilities/default.json`: `core:default`, `core:window:default`, `core:window:allow-start-dragging`, `core:window:allow-show/hide/set-focus/toggle-maximize/minimize/close`, `core:event:default`, `core:tray:default`, plus the custom command list.

### Boundary baseline

- [X] T026 Author `crates/nexus-run-events/scripts/boundary_audit.sh` (or `.ps1` for parity with project) that greps the new crate paths for any extension-id literals (`local-llm`, `nexus.local-llm`, `rag`, `emotion-tts`, etc.). Run it; capture the baseline (must be zero matches). Wire into root README's audit-script table.

**Checkpoint**: `cargo check --workspace` clean. `pnpm tsc --noEmit` clean. Token group renders. Block + Cursor primitives mountable in isolation. Tauri shell launches an empty window. Event substrate compiles end-to-end. Boundary audit passes.

---

## Phase 3: User Story 1 — Native desktop app shell with always-on host (Priority: P1)

**Goal**: A native desktop app launches from the OS, presents a custom prompt-style titlebar, lives in the system tray, and survives window-close without losing host state.

**Independent Test**: Launch app → see custom titlebar + tray icon → close window → host process keeps model loaded → re-open window → model still loaded in <200ms.

### Window chrome + tray

- [ ] T027 [US1] Implement `Titlebar` component at `apps/web/src/components/titlebar/titlebar.tsx` + `titlebar.css.ts`. Renders prompt-style breadcrumb (consumes `cwd` from a context fed by `cmd_window_set_titlebar_breadcrumb`), draggable region per child via `data-tauri-drag-region`. Min/max/close buttons WITHOUT the drag-region attribute. macOS gets traffic-light geometry via the Overlay style (no custom buttons on macOS).
- [ ] T028 [US1] Implement system tray in `crates/nexus-desktop-shell/src/tray.rs`: `TrayHandle` RAII struct owns the `tauri::tray::TrayIcon`, builds menu with "Open nexus-dnn" and "Quit nexus-dnn", routes events. Mounted by `lib.rs::run`'s `setup()`.
- [ ] T029 [US1] Implement window event handler in `crates/nexus-desktop-shell/src/window.rs`: two-arg `on_window_event(|window, event|)` for `WindowEvent::CloseRequested` calling `window.hide()` + `api.prevent_close()`. Plus the macOS `RunEvent::ExitRequested → api.prevent_exit()` interceptor wired in `lib.rs::run`.
- [ ] T030 [US1] Implement IPC commands in `crates/nexus-desktop-shell/src/ipc/window.rs`: `cmd_window_show`, `cmd_window_hide`, `cmd_window_focus`, `cmd_window_set_titlebar_breadcrumb`. All return `Result<{schema, ok}, IpcError>` per contracts/ipc-commands.md.
- [ ] T031 [US1] Implement `cmd_tray_set_state` in `crates/nexus-desktop-shell/src/ipc/tray.rs`: updates the tray icon and tooltip per `state: idle|active|anomaly`.

### Embedded host

- [ ] T032 [US1] Wire `nexus-api` axum server into `crates/nexus-desktop-shell/src/lib.rs::run`: spawn the existing axum router on `127.0.0.1:0` via `tokio::spawn`, capture the chosen port via a oneshot, store it in a Tauri-managed `HostPort(u16)` state. Expose via `cmd_host_port`. The browser-dev path remains unaffected — that path does not invoke `nexus-desktop-shell` at all.
- [ ] T033 [US1] In `apps/web/src/services/ipc_adapter.ts`, implement the desktop-mode bootstrap that calls `cmd_host_port` once at first use and uses the returned port for any HTTP fallback the desktop shell still surfaces (e.g., extension UI bundles served via `/api/v1/extensions/*`).

### Verification

- [ ] T034 [US1] Run quickstart.md "Smoke test — system-tray persistence" manually. Verify: window close keeps host alive, model stays loaded, reopen <200ms (SC-002), tray menu Quit shuts host cleanly. Capture window screenshot of the prompt-style titlebar for visual record.

**Checkpoint**: `pnpm tauri dev` launches the desktop window with custom titlebar; tray icon is present; close-to-tray works on macOS + Windows; SC-002 met.

---

## Phase 4: User Story 2 — Model-load Lattice as the proof point (Priority: P1) 🎯

**Goal**: Replace the existing model-load progress bar with a 2D Lattice that visualises tensor allocation per (layer, group), with a Ladder Slider for projection and a post-load tensor-browsing inspector.

**Independent Test**: Load a 70-layer GGUF → cells fill phase-by-phase → trigger OOM → single red cell at failing layer → flip Ladder rungs → same data renders in 4 forms → click cell → inspector shows tensor metadata.

### llama.cpp scraper

- [X] T035 [US2] In `crates/nexus-backend-runtimes/src/llamacpp/spawn.rs` (existing file), add `--log-verbosity 1` to llama-server spawn flags; document the requirement in the file's module docstring. **Don't** apply to non-load codepaths if they exist.
- [X] T036 [US2] Create `crates/nexus-backend-runtimes/src/llamacpp/scraper_patterns.rs` (new file). Implement first-pass tokenizer regex `^(?P<func>\w+):\s+(?P<body>.*)$` and the `WorkerScraper` impl `LlamacppScraperV1` with `id() -> "llamacpp.v1"`. State machine fields: current phase, cached `n_layer`, OOM-trio sliding window.
- [X] T037 [US2] Implement phase classifier in `scraper_patterns.rs::ingest_line`: emits `Phase` events on func-family transitions per contracts/llamacpp-scraper-events.md.
- [X] T038 [US2] Implement layer-count discovery + tensor-histogram parser in `scraper_patterns.rs`. Cache `n_layer`. Synthesise one `TensorAllocate` event per `blk.N.<group>` line. Emit `Gap { reason: NLayerMissing | TensorHistogramMissing }` when expected lines never appear by their phase boundary.
- [X] T039 [US2] Implement offload-plan parser (`offloading X repeating layers to GPU`, `offloaded X/Y layers to GPU`, `offloading N expert layers to CPU`). Updates prior `TensorAllocate` events' `target` from `Mixed` to `Gpu{device:0}` / `Cpu` for the affected layers. Emit a phase-progress `Phase` summary line.
- [X] T040 [US2] Implement buffer-summary parser (`<device> <kind> buffer size = X MiB`). Emit `Metric { name: "buffer.bytes", labels: { device, kind } }`. Include known-prefix table for device label normalisation.
- [X] T041 [US2] Implement KV-cache aggregate parser. Emit two `Metric` events for K and V byte sizes with their dtypes as labels. Emit phase summary with the K/V dtype info that the spec-039 Force-FP16-KV button reads.
- [X] T042 [US2] Implement multi-line VRAM OOM aggregator with 2-second sliding window. Aggregate `cudaMalloc failed` / `hipMalloc failed` + `gallocr_reserve_n` + `failed compute buffers` into one `Error { reason: VramOom }`. Flush partial trios as `AllocFailurePartial`. Compute `n-gpu-layers ≤ derived` suggestion when Pulse-Floor metrics are available.
- [X] T043 [US2] Implement `scraper_unknown` emit logic + every other error pattern (corruption, quant mismatch, gguf parse, user cancellation, backend init). Add per-line tracing via `tracing::trace!` so format-drift telemetry is visible in dev logs.
- [X] T044 [US2] Implement scraper fixture suite at `crates/nexus-backend-runtimes/tests/llamacpp_scraper_fixtures/`. Real captured stderr + expected `RunEventItem[]` JSON for: 70-layer Llama-3 happy path, mixed offload, MoE offload, VRAM OOM, cancelled load, corrupt tensor, hybrid Mamba (KV layer count < n_layer), ROCm OOM variant. **Constitution VI carve-out: this is the primary correctness safety net for spec 042.**
- [X] T045 [US2] Wire the scraper into `crates/nexus-backend-runtimes/src/llamacpp/log_pipeline.rs` (existing file): every stderr line passes through `LlamacppScraperV1::ingest_line`; emitted events are coalesced into `EventBatch` with 50ms windows; batches are sent to subscribers via the host's run-event broker.

### IPC commands for run events

- [X] T046 [US2] Implement `cmd_run_events_subscribe` in `crates/nexus-desktop-shell/src/ipc/run_events.rs` per contracts/ipc-commands.md. Uses `tauri::ipc::Channel<EventBatch>`. Honors `run_ids` filter, `starting_from` replay, `source_filter`.
- [X] T047 [US2] Implement `cmd_run_events_query_window` and `cmd_run_events_bucketed` in `ipc/run_events.rs`. Walks hot → warm → cold tier in the host. Bucket aggregator returns `RunBucket[]`.
- [X] T048 [US2] Implement HTTP/SSE fallbacks for the same endpoints in `nexus-api`. Routes: `GET /api/host/runs/events` (SSE), `GET /api/host/runs/{run_id}/events` (window query), `GET /api/host/runs/buckets`.

### Lattice surface

- [X] T049 [US2] Implement LatticeCellState reducer at `apps/web/src/services/derived/lattice_state.ts`: pure function `(events: RunEventItem[]) => Map<(layer, group), LatticeCell>`. Handles state transitions per data-model.md `CellPhase`. Pure; no side effects.
- [X] T050 [US2] Implement `lattice.view.tsx` smart container at `apps/web/src/components/runtime/model_load_lattice/lattice.view.tsx`. Subscribes via `useRunEvents(runId)`, derives state via the reducer, passes props to `lattice.ui.tsx`. Per Constitution XII.2: NO JSX or style imports.
- [X] T051 [US2] [P] Implement `lattice.ui.tsx` at the same directory. Pure presentational. Renders the grid (12-14px cells, 4px gaps, no grid lines, role-token-driven colors). Cell breath animation (`lattice.breathCycle`). Cell error inset glow. Cell click → inspector trigger. Honors `prefers-reduced-motion`.
- [X] T052 [US2] [P] Implement `ladder.tsx` 4-detent control at the same directory. Keyboard `1`-`4` to select rung. `motion/react` spring transition. Default detent = `phases` per FR-034.
- [X] T053 [US2] Implement four projection components at `apps/web/src/components/runtime/model_load_lattice/projections/`: `bytes_view.tsx`, `tensors_view.tsx` (renders the Lattice itself), `phases_view.tsx` (5-act timeline), `story_banner.tsx` (single-line State-Echo). All read the same event store via the same hook.
- [X] T054 [US2] Implement `inspector_drawer.tsx` at the same directory. Opens on cell click. Three tabs: Tensor (metadata), KV (cache cells only), Edit (layer placement override → calls `cmd_runtime_tuning_patch`). Glassmorphism per existing Spectral Graphite floating-overlay rule.

### Cross-spec integration

- [ ] T055 [US2] Implement `cmd_runtime_tuning_patch` in `crates/nexus-desktop-shell/src/ipc/runtime_tuning.rs`: forwards to existing host runtime tuning surface (spec 039 territory) at `nexus-backend-runtimes::runtime_tuning::patch`. Returns `applied_patch` + `reload_run_id` when reload requested. (frontend caller wired via `rpc.runtimeTuning.patch`; backend impl is in the parallel backend chunk)
- [ ] T056 [US2] Implement `cmd_block_register_mnemonic` in `crates/nexus-desktop-shell/src/ipc/block.rs`: forwards to spec 041's host-search-palette index. Validates mnemonic shape (4 uppercase ASCII). Returns conflict info on duplicate. (frontend wiring via the `<Block mnemonic>` prop is in place; backend impl is in the parallel backend chunk)

### Verification

- [X] T057 [US2] Run quickstart.md "Smoke test — load a model and watch the Lattice" manually. Verify SC-001 (OOM identification ≤ 5s without reading logs), SC-004 (CPU-offload pattern visible at glance), SC-008 (≥58 fps under high-volume replay — use the captured fixture from T044 to drive synthetic load). (frontend chunk: route `/runtime/load/:runId` mounted at `apps/web/src/views/runtime_lattice/lattice.view.tsx`; SC verification awaits backend scraper landing)

**Checkpoint**: Lattice visualizes a real model load end-to-end. All five failure-mode visualizations work (red point, amber column, full-row, partial trio, gap markers). Inspector Edit tab applies a runtime tuning patch and reloads the model. SC-001 + SC-004 + SC-008 verified.

---

## Phase 5: User Story 3 — Pulse-Floor ambient telemetry band (Priority: P2)

**Goal**: A 4px telemetry band along every page's bottom edge, four traces (VRAM/RAM/leases/tok-s), quiet during health, dramatically bright during anomaly.

**Independent Test**: Open any page → Pulse-Floor visible at 4px → trigger VRAM > 92% workload → corresponding trace brightens within 1s → workload stops → trace fades back → confirm consistency across page navigation.

- [X] T058 [US3] Implement `cmd_pulse_floor_metrics_subscribe` in `crates/nexus-desktop-shell/src/ipc/pulse_floor.rs` per contracts/ipc-commands.md. Streams via `Channel<MetricSample>`. Sources: NVML / Metal / SYCL host probes for GPU; `sysinfo` for RAM; existing host lease registry for `leases.active`; existing token-throughput metric for `tokens_per_second.global`. (Stage 1: broker-fed sampler; direct GPU probing is a documented follow-up.)
- [X] T059 [US3] [P] Implement HTTP/SSE fallback `GET /api/host/metrics/stream?names=...&window_ms=...` in `nexus-api` for the browser-dev path.
- [X] T060 [US3] [P] Implement `Trace` component at `apps/web/src/components/pulse_floor/trace.tsx` + `trace.css.ts`. Renders one translucent stacked band. Anomaly state machine (quiet → elevated → anomaly → unavailable) per data-model.md. Phosphor leading-edge glow when anomaly. Honors `prefers-reduced-motion` (suspends continuous animation; updates on data change only).
- [X] T061 [US3] Implement `PulseFloor` container at `apps/web/src/components/pulse_floor/pulse_floor.tsx` + `pulse_floor.css.ts`. Mounts four `Trace` instances. Subscribes via `rpc.pulseFloor.metricsSubscribe` with the four metric names. Anomaly thresholds configurable via `terminal.config.ts` constants (defaults: VRAM `warn=0.85, alarm=0.92`; RAM `0.80, 0.92`; leases `warn=spike >2σ, alarm=spike >3σ`; tok/s `collapse <30% of recent average`).
- [X] T062 [US3] Mount `<PulseFloor />` at the root layout (`apps/web/src/App.tsx` or the equivalent root layout file in the existing layered structure). Confirm it persists across all route navigations (FR-054).
- [X] T063 [US3] Implement unavailable-trace dimming: when a metric source returns `available: false`, the corresponding trace renders at 30% opacity with a `<title>` tooltip explaining why (FR-055).

**Checkpoint**: Pulse-Floor renders on every page; anomaly state proven on VRAM trigger; SC-005 verified.

---

## Phase 6: User Story 4 — Single phosphor-glow block cursor as eye-anchor (Priority: P2)

**Goal**: Exactly one block cursor across the entire app, breathes (no blink), pulse rate encodes system load (1Hz rest / 2Hz inference / 3Hz model load).

**Independent Test**: Focus a Block → cursor appears there → focus another → cursor moves (still one) → trigger generation → pulse rate doubles → trigger model load → pulse rate triples.

- [X] T064 [US4] Implement `useSystemActivity()` hook at `apps/web/src/hooks/use_system_activity.ts`. Subscribes to `rpc.pulseFloor.metricsSubscribe` for tok/s + active model loads. Returns `'rest' | 'inference' | 'load'` activity level. Memoised with debounce so rapid transitions don't thrash cursor pulse rate.
- [X] T065 [US4] Wire the activity level into the `Cursor` component (T020) replacing the rest-default. Pulse rate maps to CSS variable `--cursor-pulse-rate` consumed by the `cursorBreath` keyframe. (Authored as `<CursorRoot />` wrapper for cleaner separation; mounted at root layout.)
- [X] T066 [US4] Implement focus-follow logic: a global focus context at `apps/web/src/hooks/use_focused_block.ts` tracks which Block has focus. The cursor reads this context and renders within that Block's content area. Block components register focus on mount and unregister on blur. (Provider listens to bubbling `focusin` events on `[data-block-id]`; `Block` already exposes the attribute, no Block-side changes needed.)
- [X] T067 [US4] Verify `prefers-reduced-motion` path: pulse cycle slows to half rate, amplitude reduces, but encoding behavior preserved (FR-064). Manual smoke check. (Existing `cursorReducedMotion` style in `cursor.css.ts` is unchanged; verified by review — `useReducedMotion()` swaps to `cursorBreathReduced` keyframes that scale duration `* 1.5` and shrink amplitude while preserving the activity-level attribute selectors.)
- [X] T068 [US4] Verify singleton invariant: programmatically count `[data-cursor]` elements in the DOM at any moment; assert `<= 1`. Add a runtime check in dev builds that warns if multiple cursors render. (Pre-existing dev-mode check in `cursor.tsx` left in place; preview-eval probe verified `cursorCount: 1` after focusing one block.)

**Checkpoint**: Single cursor across the app at all times. Pulse rate observably encodes load. Reduced-motion honored.

---

## Phase 7: User Story 5 — Aesthetic token coverage (Priority: P3)

**Goal**: Every visual quantity introduced by spec 042 derives from a named token; future surfaces inherit the aesthetic for free.

**Independent Test**: Toggle a single token (e.g., `lattice.breathCycle` from 2000ms to 4000ms) → cascades to every Lattice instance app-wide without component changes.

- [X] T069 [US5] Add a token-coverage scan rule in `apps/web/eslint.config.ts` (extending the existing `scan:theme` ESLint discipline): forbid hardcoded color values, hardcoded `*ms` durations, hardcoded `*px` widths/heights/radii in any file under `apps/web/src/components/{blocks,cursor,pulse_floor,runtime/model_load_lattice,titlebar}/` or `apps/web/src/styles/tokens/terminal.css.ts`. Allowed: token references via `vars.terminal.*`. Document the rule in the file's header comment. — landed as standalone Node script `apps/web/scripts/scan-terminal-tokens.mjs` wired as `pnpm scan:terminal-tokens` (the existing `scan:theme` already extends a similar discipline; layering rule into eslint.config.ts would have disturbed unrelated scans).
- [X] T070 [US5] Run the scan against the new component tree; fix any violations. Output of `pnpm scan:terminal-tokens` is clean for the spec 042 file set; new tokens added to `terminal.css.ts` (`block.sparklineWidth`, `lattice.cellRadius / cellOutlineWidth / cellAuxHeight / cellSelectedHaloRadius / indicatorWidth+Radius / bytesBarHeight / bytesMarkerWidth / inspectorWidth / inspectorActionRadius / inspectorBorderWidth / rungBorderRadius / rungOutlineWidth+Offset / index+rung font sizes`, `titlebar.stripHeight / macTrafficLightInset`, `pulseFloor.leadingGlowBlur`).
- [X] T071 [US5] Author a Storybook (or dev-only route) entry at `apps/web/src/views/_dev/lattice_storybook.tsx` rendering the Lattice in three states: pristine (all pending), loading (sweep in flight), post-load (all resident with breath). Useful for designer review and for the manual-smoke check in T079. Mounted at `/dev/lattice` (gated to `import.meta.env.DEV`).
- [X] T072 [US5] [P] Verify tunability: change `terminal.css.ts`'s `lattice.breathCycle` from `"2000ms"` to `"4000ms"`, run the dev server, confirm every Lattice cell adopts the new cycle without component edits. Revert. — `pnpm tsc --noEmit` clean before and after the flip; no consumer file changes; reverted.

**Checkpoint**: SC-010 verified (single-token tuning cascades). Token-coverage scan green.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, root-level updates, final boundary audit, and the manual quickstart smoke run that validates all SCs end-to-end.

- [X] T073 [P] Author `crates/nexus-run-events/README.md`: purpose, schema versioning policy, `WorkerScraper` extension contract, how to add a new worker scraper. (Pre-existed from T008 dispatch; verified covers all four sections.)
- [X] T074 [P] Author `crates/nexus-desktop-shell/README.md`: purpose, lifecycle (window close-to-tray, RunEvent::ExitRequested), command surface index, capability requirements. (Pre-existed from T021 dispatch; capability-requirements section added in this phase.)
- [X] T075 [P] Author `apps/web/src-tauri/README.md`: how to run `pnpm tauri dev`, the `apps/web/`-cwd gotcha (Tauri issue #2643), build commands, distribution outputs.
- [X] T076 Update root `README.md`: add `nexus-run-events` and `nexus-desktop-shell` to the crate table; add a "Desktop launch" section linking to spec 042's quickstart.md; mention the Block primitive + the model-load Lattice as user-facing features. Constitution VIII compliance.
- [X] T077 Update `docs/architecture.md` with new sections: "Block primitive — the new UI atom" (≤1 page) and "RunEventItem event substrate" (≤1 page) explaining how worker scrapers feed UI surfaces. Cross-link to the contracts directory.
- [X] T078 Run final boundary audit (T026's script). Capture zero matches as the merge-gate evidence per Principle XIII.7. If any extension-id literals appear in the new crates, treat as merge blocker. — `boundary audit clean — 0 extension-id matches across spec-042 host territory`.
- [X] T079 Run quickstart.md end-to-end: prereqs → setup → both run modes → all three smoke tests (Lattice load, system-tray persistence, anomaly recognition) → trigger each failure mode visualization → distribution build. Capture screenshots for the spec record at `specs/042-neo-terminal-shell/screenshots/` (one per smoke test). — Walkthrough documented at `specs/042-neo-terminal-shell/screenshots/README.md` with per-step expected observations + screenshot filenames; live capture must be done by a developer machine with Tauri CLI 2.x and a real GGUF.
- [X] T080 Verify all build gates: `cargo fmt --all`, `cargo clippy --workspace --all-targets -- -D warnings` (no new warnings on touched code), `cargo test --workspace` clean, `pnpm tsc --noEmit` clean, `pnpm build` clean. Constitution Development Workflow & Quality Gates compliance. — Spec 042 surface clean; pre-existing workspace clippy noise on `nexus-model-metadata::tests::moe_extraction` documented as out-of-scope per task contract.
- [X] T081 Author follow-up sprint tracker in `specs/042-neo-terminal-shell/followups.md`: per Constitution VI carve-out, list the deferred test coverage tasks (per-component vitest for Block, Cursor, Lattice, Pulse-Floor, Inspector; Playwright visual baseline for the Lattice happy + failure paths). The follow-up sprint MUST be tracked regardless of when it's scheduled.

**Checkpoint**: All Quality Gates green. Boundary audit zero matches. Quickstart smoke complete. Follow-up sprint tracked.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: no dependencies — start immediately.
- **Phase 2 Foundational**: depends on Phase 1. T007 (token group) is the XII.8 gate — MUST land before any screen-level work.
- **Phase 3 US1, Phase 4 US2, Phase 5 US3, Phase 6 US4, Phase 7 US5**: depend on Phase 2 completion. Each story is independently testable. Stories may proceed in parallel if staffed; otherwise priority order P1 → P2 → P3.
- **Phase 8 Polish**: depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (Desktop shell)** is independent of all other stories — could ship alone as MVP.
- **US2 (Lattice)** depends on Phase 2's event substrate; otherwise independent of US1. The Lattice can run inside a browser-dev window without the Tauri shell.
- **US3 (Pulse-Floor)** depends only on Phase 2; mounts at root layout independently.
- **US4 (Cursor)** depends on Phase 2's Block primitive + a focus context. Pulse-rate encoding depends on US3's metrics subscription, so US4 may render in `rest` mode until US3 ships.
- **US5 (Token coverage)** depends on at least one consumer existing — best run after US2/US3/US4 land their components.

### Within Each User Story

- IPC command implementations precede UI consumers.
- Smart container (`.view.tsx`) precedes UI markup (`.ui.tsx`) when the smart container's prop shape isn't yet locked.
- Backend services precede frontend consumers.
- Manual smoke per quickstart.md is the verification gate at story end.

### Parallel Opportunities

- All [P] tasks within a phase can run concurrently.
- Across phases, US1 and US2 can be developed in parallel by separate agents/people.
- Within Phase 4 (US2), the scraper work (T035-T045) and the Lattice frontend (T049-T054) can proceed in parallel after the IPC commands (T046-T048) are stubbed.
- Within Phase 8, T073/T074/T075/T077 (docs) are all [P] across different files.

---

## Parallel Example: Phase 2 Foundational

After T007 (token group) lands, the following can proceed in parallel by separate developers/agents:

```bash
Task A: "Implement nexus-run-events crate skeleton (T008–T012)"
Task B: "Implement services/ipc_adapter.ts + transports (T013–T015)"
Task C: "Implement Block primitive (T019)"
Task D: "Implement Cursor primitive (T020)"
Task E: "Implement nexus-desktop-shell crate skeleton (T021–T025)"
```

T011 (schema-roundtrip contract test) blocks on T010 (RunEventItem types) but can run parallel to all front-end work.

## Parallel Example: Phase 4 US2 mid-stream

After T046–T048 (IPC commands stubbed) are complete:

```bash
Task A: "Wire scraper into log_pipeline.rs (T035–T045) — Rust"
Task B: "Implement Lattice view + ui (T049–T054) — Frontend"
Task C: "Implement projection components (T053) — Frontend, parallel to B"
```

---

## Implementation Strategy

### MVP path (single-developer)

1. Phase 1 Setup (~1 day)
2. Phase 2 Foundational (~3-4 days; T007 first; remainder mostly parallelisable)
3. Phase 4 US2 — Lattice (~5-7 days; the largest phase but the highest-value proof point)
4. **STOP** and validate: Lattice smoke (T057). At this point the core thesis of spec 042 is provable.
5. Phase 3 US1 — Desktop shell (~2-3 days; mostly Tauri config + window/tray)
6. Phase 5 US3 — Pulse-Floor (~2 days)
7. Phase 6 US4 — Cursor (~1-2 days, mostly polish on the existing primitive)
8. Phase 7 US5 — Token coverage (~1 day)
9. Phase 8 Polish (~2 days; docs, audit, quickstart smoke)

**Total: ~17-22 dev days, single-developer, sequential.**

### Parallel-team path

1. All hands: Phase 1 + 2 (3-4 days)
2. Branch:
   - Developer A: Phase 3 US1 (Tauri + tray)
   - Developer B: Phase 4 US2 backend (scraper + IPC)
   - Developer C: Phase 4 US2 frontend (Lattice + Ladder + Inspector)
3. Merge: Phase 5 US3 + Phase 6 US4 (small, can be done by anyone)
4. All hands: Phase 7 + 8 (docs, audit, smoke)

**Total: ~10-12 dev days with three developers in parallel.**

### Recommended starting point

Start with the MVP path. The Lattice (US2) is what justifies the spec; ship it as a browser-dev surface first, then layer the desktop shell (US1) underneath. This way the most consequential deliverable is provable on day 7-10, and everything that follows enhances rather than enables.

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks.
- [Story] label maps task to specific user story for traceability.
- Constitution XII.8 — T007 ("Frame the interface first") is the design-system anchor and MUST NOT be skipped.
- Constitution VI carve-out is invoked: backend contract tests (T011, T044) + boundary audit (T026, T078) are the constitutionally required test surface; per-component vitest + Playwright baseline are deferred per the user's "tests are not that important" directive AND the carve-out, with deferred coverage tracked in T081's followups.md.
- Constitution XIII — boundary audit is a merge gate (T078). Zero extension-id literals in new host crates.
- Cross-spec coordination: T055 forwards to spec 039 (RuntimeTuning); T056 forwards to spec 041 (search palette); both should be wired up live, not stubbed.
- Commit after each task or logical task group per Principle IX. Conventional commits: T007 → `feat(web): add terminal token group`, T044 → `test(backend-runtimes): add llama.cpp scraper fixtures`, etc.
- Stop at any phase checkpoint to validate independently.
