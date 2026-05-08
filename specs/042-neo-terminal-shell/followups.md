# Spec 042 — Follow-up sprint tracker

Per **Constitution VI v1.1.2 design-heavy UI carve-out** (invoked in `spec.md` and authored in `tasks.md` T006), spec 042 ships with a deliberately minimal test surface. Backend contract tests for the event protocol and llama.cpp scraper, plus the Principle XIII boundary audit, are the constitutionally-required correctness gates. The deferred coverage below is **non-optional** — it must be scheduled as a follow-up sprint, not abandoned.

Status legend:

- `[ ]` not started
- `[~]` in flight
- `[X]` done

Owner placeholder is `unassigned` until the follow-up sprint is staffed.

## Per-component vitest coverage

- [ ] **Block primitive** — owner: `unassigned`. Render-pass tests for prompt-header keyboard shortcut, mnemonic chip emission to host, sparkline path generation under empty / partial / full data, focus glow toggle on `:focus-visible`. Source: `apps/web/src/components/blocks/`.
- [ ] **Cursor singleton** — owner: `unassigned`. Tests for the singleton invariant (`<= 1 [data-cursor]` element), pulse-rate selection by activity level, focus-follow against the global focus context, reduced-motion amplitude path. Source: `apps/web/src/components/cursor/`.
- [ ] **Lattice cells** — owner: `unassigned`. Tests for the `(layer, group)` reduce step, cell phase transitions through the five-stage pipeline, error / cpu_offloaded handling, breath-animation suspension under `prefers-reduced-motion`. Source: `apps/web/src/components/runtime/model_load_lattice/lattice.ui.tsx` + `apps/web/src/services/derived/lattice_state.ts`.
- [ ] **Pulse-Floor traces** — owner: `unassigned`. Tests for the anomaly state machine (quiet → elevated → anomaly → unavailable), threshold tuning per metric, fade-back timing, unavailable-trace dimming + tooltip. Source: pending Phase 5 landing at `apps/web/src/components/pulse_floor/`.
- [ ] **Inspector drawer** — owner: `unassigned`. Tests for tab switching, Edit-tab patch submission, error-status surfacing on `cmd_runtime_tuning_patch` rejection, glass-overlay z-index. Source: `apps/web/src/components/runtime/model_load_lattice/inspector_drawer.tsx`.
- [ ] **Ladder slider** — owner: `unassigned`. Tests for the four-detent control, keyboard 1/2/3/4 selection, default detent = `phases`, `motion/react` spring transition. Source: `apps/web/src/components/runtime/model_load_lattice/ladder.tsx`.

## Playwright visual baseline

- [ ] **Lattice happy path** — owner: `unassigned`. Baseline screenshots at 375 / 768 / 1440 widths covering pristine / loading-mid-sweep / post-load-with-breath states. Source storybook entry: `apps/web/src/views/_dev/lattice_storybook.tsx` (T071).
- [ ] **Lattice failure modes** — owner: `unassigned`. Baselines for VRAM OOM red point, n-cpu-moe amber column, full-row error, partial trio, `Gap` markers. One screenshot per shape, three viewports each.

## Cross-browser desktop matrix

- [ ] **macOS** — owner: `unassigned`. Verify titlebar overlay + traffic-light reservation, `RunEvent::ExitRequested` intercept on dock-quit, retina pixel-density on Lattice cells.
- [ ] **Windows** — owner: `unassigned`. Verify NSIS + MSI bundle, WebView2 fallback when missing, native window controls on the custom titlebar.
- [ ] **Linux** — owner: `unassigned`. Verify AppImage + deb bundles. Verify the FR-003 degraded tray fallback on bare Sway / minimal Wayland sessions where AppIndicator3 is absent.

## Backend follow-ups

- [ ] **Real GPU/NVML/Metal probing** in `cmd_pulse_floor_metrics_subscribe` — owner: `unassigned`. Spec 042 ships the broker-only scaffold; live NVML on Windows/Linux + Metal on macOS + SYCL on supported platforms must replace the broker stubs before a public release. Source: `crates/nexus-desktop-shell/src/ipc/pulse_floor.rs`.
- [ ] **Real in-process axum embedding** via `nexus-api` dep in `nexus-desktop-shell` — owner: `unassigned`. The current shell binds a fixed-port stub; the merge target is an in-process axum server bound on `127.0.0.1:0` whose port is exposed to the frontend via `cmd_host_port`. Source: `crates/nexus-desktop-shell/src/lib.rs::run`.
- [ ] **Real distinct tray icons per anomaly state** — owner: `unassigned`. Phase 3 ships a tooltip-only state surface; the merge target swaps to PNG variants (idle / loading / anomaly / error) loaded from `apps/web/src-tauri/icons/` per `cmd_tray_set_state` call. Source: `crates/nexus-desktop-shell/src/ipc/tray.rs`.
- [ ] **Cold tier query path** — owner: `unassigned`. Frontend store currently materialises only the hot ring buffer. The cold tier (broker-side, persisted, queryable per `(run_id, ts_range)`) is sketched in `services/run_events_warm.ts` as the IndexedDB warm shelf — the real cold tier is host-side and must back `cmd_run_events_query_window` once the scraper landings stabilize.

## UX tuning follow-ups

- [ ] **Pulse-Floor anomaly threshold tuning** per real workloads — owner: `unassigned`. Defaults shipped at `vram warn=0.85, alarm=0.92`, `ram 0.80/0.92`, `leases warn=spike >2σ, alarm=spike >3σ`, `tok/s collapse <30%`. These need real-workload calibration once telemetry from the staffed sprint accumulates. Source: `apps/web/src/components/pulse_floor/pulse_floor.tsx` (pending Phase 5 landing).
- [ ] **Linux system-tray fallback policy verification** per distro — owner: `unassigned`. FR-003 declares a degraded tier; the actual matrix (KDE Plasma ✓, GNOME Shell + AppIndicator extension ✓, Sway ✗, Hyprland ✗, …) must be enumerated and documented in `apps/web/src-tauri/README.md` after first user contact.

## Out-of-scope follow-up specs (not just sprint work)

- [ ] **Spec 043+ — Production-headless Linux deployment** — owner: `unassigned`. Spec 042's dual-transport architecture (Tauri Channel + axum HTTP/SSE) already supports headless deployment in dev / localhost-trust scenarios via `cargo run -p nexus-api` + browser tab. Production hardening — `Dockerfile`, `systemd` unit, `--bind 0.0.0.0` non-localhost flag, auth gate (token / OIDC / mTLS — TBD), TLS termination guidance (nginx / Caddy / Cloudflare), audit logging, configuration via env vars — needs its own spec via `/speckit-specify`. Does not require revisiting any of spec 042's architecture; builds on top.

## Sequencing

1. **Sprint A (testing)**: Per-component vitest + Playwright visual baseline. Unblocks regression coverage on the Lattice/Block/Cursor primitives. ~5 dev-days.
2. **Sprint B (backend)**: Real GPU probing, in-process axum, distinct tray icons, cold tier. Unblocks ship-readiness for the desktop bundles. ~7 dev-days.
3. **Sprint C (UX tuning)**: Anomaly threshold calibration + Linux distro matrix. Best done after telemetry from real users accumulates. ~3 dev-days.

The sprint must be tracked in the workspace planner regardless of when it's scheduled — Constitution VI carve-out treats the deferral as a debt commitment, not a discount.
