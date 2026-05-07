# Quickstart: Neo-Terminal Desktop Shell (Spec 042)

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-05-08

This guide walks a developer from a clean checkout to a running desktop build with the Lattice rendering against a live llama.cpp model load. Read [research.md](./research.md) and [plan.md](./plan.md) first if you need context on the architectural decisions.

---

## Prerequisites

- **Rust 1.84+** (workspace MSRV)
- **Node ≥ 20**
- **pnpm 9+**
- **Tauri CLI 2.x** — `cargo install tauri-cli --version "^2"`
- **OS-specific**: macOS Xcode CLT; Windows MSVC build tools + WebView2 runtime; Linux `webkit2gtk-4.1-dev` + `libayatana-appindicator3-dev` (for system tray on supported desktops).
- **At least one GGUF model file** for the Lattice smoke test (Llama-3-8B-Instruct Q4_K_M is the canonical test model used by the fixtures).

## One-time setup

```bash
git clone <repo>
cd nexus-dnn
git checkout 042-neo-terminal-shell

pnpm install                    # apps/web deps including idb, motion, etc.
cargo fetch --workspace         # primes the Rust dep graph
```

Tauri CLI works from `apps/web/` only (per R1 — workspace gotcha):

```bash
cd apps/web
pnpm tauri --version            # confirms CLI is reachable; should print 2.x
```

## Two run modes

### Mode A — Browser dev (no Tauri shell)

Use this when iterating on frontend code that does not depend on the desktop wrapper. Identical to the existing nexus-dnn dev workflow.

```bash
# Terminal 1 — host
cargo run -p nexus-api

# Terminal 2 — frontend (browser)
cd apps/web
pnpm dev
# open http://localhost:5173 in any browser
```

The `services/ipc_adapter.ts` adapter detects `window.isTauri === undefined` and routes commands through `fetch()` and streams through `EventSource`. The Lattice, Pulse-Floor, and Block primitives all render. The system-tray and custom-titlebar features (US1) are not exercised in this mode.

### Mode B — Desktop dev (Tauri shell)

Use this when working on the Tauri integration, custom titlebar, system tray, or the embedded-host wiring.

```bash
# Single terminal — Tauri spawns Vite + the host together
cd apps/web
pnpm tauri dev
```

What happens:

- `pnpm tauri dev` invokes the `beforeDevCommand` from `tauri.conf.json` (`pnpm --filter web dev`), which starts Vite on port 5173.
- Tauri builds the `apps/web/src-tauri` crate (depends on `nexus-desktop-shell` + `nexus-api`).
- The compiled binary launches; the Tauri window opens at the custom titlebar; the system-tray icon appears.
- The embedded host binds axum on `127.0.0.1:0` (random port) and exposes the chosen port to the frontend via the `cmd_host_port` command. The frontend's adapter detects `window.isTauri === true` and routes through `invoke()` and `Channel<EventBatch>` instead of HTTP/SSE.

**First build takes ~3-5 minutes** (Tauri's CLI builds the entire host workspace). Subsequent rebuilds are incremental (~10-30 seconds for Rust changes; <1 second for frontend HMR).

## Smoke test — load a model and watch the Lattice

With the desktop running:

1. Open the runtime view (route `/runtime`).
2. Click **Load model** in the model picker.
3. Select a GGUF (e.g., `Llama-3-8B-Instruct-Q4_K_M.gguf`).
4. The Lattice Block appears with prompt-style header `$ load llama3-8b --layers 33 --kv-cache f16` (numbers vary by model).
5. The cells transition through `pending → discovered → assigned → reserved → ready` as the scraper consumes llama.cpp's stderr.
6. The phosphor block cursor (US4) sits in the Block; pulse rate increases from ~1Hz to ~3Hz during load.
7. After load completes, click any cell — an inspector drawer slides in showing `{ tensor_name, dtype, bytes, target, gguf_offset }`.
8. Press `1` / `2` / `3` / `4` to switch the Ladder rung. Verify the same data renders correctly at each rung.
9. The Pulse-Floor at the bottom of the window shows VRAM/RAM/leases/tok-s traces. After load, the VRAM trace should sit at `model_buffer + kv_buffer + compute_buffer` divided by total VRAM.

## Smoke test — system-tray persistence

1. With a model loaded, click the window's close button (the custom one in the top-right).
2. The window disappears; the system-tray icon stays present.
3. Verify the host process is still running (the model is still loaded — this is the entire point of US1).
4. Right-click the tray icon → **Open nexus-dnn**. The window reappears with the same model still loaded; transition is <200ms (SC-002).
5. Right-click → **Quit nexus-dnn**. The host shuts down cleanly; the tray icon disappears.

## Smoke test — anomaly recognition

1. With the desktop running, load a model that nearly fills your VRAM.
2. Initiate inference at high context (e.g., 4096-token prompt).
3. Watch the Pulse-Floor's VRAM trace — within 1 second of crossing the 92% threshold, it should brighten dramatically with phosphor leading-edge glow (FR-053).
4. Stop the inference; the trace fades back to its quiet state within ~3 seconds.

## Triggering specific failure-mode visualizations

These exercise FR-031 / FR-037 — the spatial failure shapes the Lattice exists to make legible.

**VRAM OOM (red point):** load a GGUF with `--n-gpu-layers 999` on a model that does not fit GPU. Expect a single red cell at the offending layer's tensor group.

**CPU offload (amber column):** load with `--n-cpu-moe 1` (a spec 039 flag — set via the model picker's runtime tuning sliders). Expect amber FFN cells at the trailing layers.

**Cancelled load:** start a load and immediately click **Cancel**. Expect cells frozen in their last state with a `Gap` indicator.

**Verbose-off fallback:** if `--log-verbosity 1` is removed from the spawn flags (don't do this in production), the histogram is gated off and the Lattice shows estimated bytes per cell. The "?" indicator is visible on every cell because exact bytes are unknown.

## Build for distribution

```bash
cd apps/web
pnpm tauri build
```

Outputs platform-specific bundles to `target/release/bundle/`:

- macOS: `.dmg` and `.app`
- Windows: `.exe` (NSIS) and `.msi`
- Linux: `.AppImage`, `.deb`

System-tray support on Linux requires the desktop environment to support `libayatana-appindicator3` — KDE Plasma + GNOME Shell with the AppIndicator extension work; bare Sway / minimal Wayland sessions do not. Documented as a degraded-behaviour tier per FR-003.

## Common pitfalls

- **`pnpm tauri dev` fails with "Cargo.lock not found":** you ran the CLI from the workspace root. Always `cd apps/web` first (Tauri issue [#2643](https://github.com/tauri-apps/tauri/issues/2643)).
- **Custom titlebar is not draggable:** check that every passive child element carries `data-tauri-drag-region`. The attribute does not inherit (R1).
- **Buttons inside the titlebar swallow drags AND don't click:** they have `data-tauri-drag-region` set. Remove it from interactive elements.
- **Window re-opens but the host has lost state:** the close handler did not call `api.prevent_close()`, or `RunEvent::ExitRequested` is not intercepted on macOS (dock-quit kills the process). See `crates/nexus-desktop-shell/src/lib.rs::run`.
- **Lattice shows estimated bytes for every cell:** llama.cpp is being spawned without `--log-verbosity 1`. Check `crates/nexus-backend-runtimes/src/llamacpp/spawn.rs`.
- **`scraper_unknown` events appearing for routine load output:** llama.cpp version drift. Check the regex set in `crates/nexus-backend-runtimes/src/llamacpp/scraper_patterns.rs` against the latest llama.cpp. Update patterns; never anchor on literal function-name prefixes.

## Debugging the IPC layer

When events are not arriving in the frontend:

1. Open DevTools (Tauri menu → Toggle Devtools, or `Cmd-Opt-I`).
2. In the Console, check `window.__nexus_ipc_telemetry__` (a debug global exposed by `services/ipc_adapter.ts` in dev builds) — it shows the last 100 batches received and the gap detector state.
3. On the Rust side, set `RUST_LOG=nexus_run_events=debug,nexus_desktop_shell=debug,nexus_backend_runtimes::llamacpp=trace` for verbose scraper output.
4. If batches are arriving but the Lattice doesn't update, the derived state reducer (`apps/web/src/services/derived/lattice_state.ts`) is dropping events. Add a breakpoint or `console.log` at the `(layer, group)` reduce step.

## Where things live

| Concern | File / directory |
|---|---|
| Tauri window/tray bootstrap | `crates/nexus-desktop-shell/src/lib.rs` |
| IPC commands | `crates/nexus-desktop-shell/src/ipc/` |
| RunEventItem types | `crates/nexus-run-events/src/lib.rs` |
| llama.cpp scraper | `crates/nexus-backend-runtimes/src/llamacpp/scraper_patterns.rs` |
| llama.cpp spawn flags | `crates/nexus-backend-runtimes/src/llamacpp/spawn.rs` |
| Frontend IPC adapter | `apps/web/src/services/ipc_adapter.ts` |
| Event store (hot/warm/cold) | `apps/web/src/services/run_events.ts` |
| Block primitive | `apps/web/src/components/blocks/` |
| Lattice + Ladder | `apps/web/src/components/runtime/model_load_lattice/` |
| Pulse-Floor | `apps/web/src/components/pulse_floor/` |
| Cursor singleton | `apps/web/src/components/cursor/` |
| Aesthetic tokens | `apps/web/src/styles/tokens/terminal.css.ts` |
| Tauri config | `apps/web/src-tauri/tauri.conf.json` |
| Tauri capabilities | `apps/web/src-tauri/capabilities/default.json` |

## Test commands

```bash
# Rust contract tests for the event protocol
cargo test -p nexus-run-events

# llama.cpp scraper fixtures (replay real captures)
cargo test -p nexus-backend-runtimes --test llamacpp_scraper_fixtures

# Frontend unit + hook tests
pnpm --filter web test

# Visual baseline (Playwright) — runs against `pnpm tauri dev` in headless mode
pnpm --filter web test:visual
```

Per the design-heavy carve-out (Constitution VI v1.1.2, raised by XII.8), visual surfaces (Lattice cells, Pulse-Floor anomaly state, cursor pulse rates) are covered by Playwright visual baselines + the `scan:theme` / `scan:terminology` ESLint scans rather than per-component vitest. Backend contract tests (event schema, scraper fixtures, IPC commands) remain mandatory and are the primary correctness safety net.

## Next steps

After this guide works end-to-end, the next development steps are tracked in `tasks.md` (generated by `/speckit.tasks` against this plan). The first task per Constitution XII.8 is "Frame the interface first" — landing the new `terminal.css.ts` token group and the Block + Cursor primitives as a token-coverage smoke before any screen-level work begins.
