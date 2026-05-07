# Implementation Plan: Neo-Terminal Desktop Shell

**Branch**: `042-neo-terminal-shell` | **Date**: 2026-05-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/042-neo-terminal-shell/spec.md`

## Summary

Wrap nexus-dnn as a native desktop application with system-tray-resident host. Introduce a **Block** as the new UI atom (replacing both terminal *line* and web *page*) and a versioned `RunEventItem` event substrate consumed by a tiered hot/warm/cold frontend store. Deliver the **Lattice + Ladder Slider** as the visible proof point — a 2D layer × tensor-group grid for model loading with four abstraction projections (Bytes / Tensors / Phases / Story) and a post-load tensor-browsing inspector. Add cross-app affordances (4px Pulse-Floor ambient telemetry, single phosphor-glow block cursor as eye-anchor) and the semantic token layer that powers them. Surfaces inhabit a **Modern neo-terminal** aesthetic — Bloomberg-dense composition, Kinetic Observatory motion, inset-only phosphor glow — extending Spec 037's Spectral Graphite system without replacing it.

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV) for host crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend.
**Primary Dependencies**: NEW — `tauri@^2` + `@tauri-apps/api@^2` (desktop wrapper), `idb@^8` (IndexedDB warm tier for event store). EXISTING — `axum`, `serde`, `sqlx`, `tracing` on the Rust side; `react-router@^7`, `swr@^2.4` (live polling only), `@vanilla-extract/css@^1.17`, `motion@^12` (`motion/react` import path), `sonner@^2`, `@xyflow/react@^12`. No other new workspace dependencies.
**Storage**: SQLite via `nexus-storage` for the cold tier (existing — no new tables, no new migrations). Browser `IndexedDB` for the warm tier (per-run event windows). In-memory ring buffers for the hot tier (last ~2,000 items per active run).
**Testing**: `cargo test` for Rust crates; `vitest` for frontend unit + hook tests; `playwright` for visual baseline + interaction tests against the desktop window.
**Target Platform**: macOS, Windows (primary); Linux via Tauri abstraction with documented degraded behavior for system-tray support that depends on the desktop environment.
**Project Type**: Desktop application with Rust host + React frontend, packaged as a Tauri app; headless-host mode preserved for browser-based development.
**Performance Goals**: ≥58 fps under 1,000 RunEvents/sec replay (verified by recorded high-volume model-load trace); window restore on re-open in <200ms; user-visible anomaly recognition in <3s via Pulse-Floor.
**Constraints**: Continuous animation MUST stop within 200ms of window minimise/hide (constitution X-aware battery discipline + cockpit-principle data-only motion); `prefers-reduced-motion` and `prefers-contrast` honored; keyboard reach for every interactive element introduced by this feature.
**Scale/Scope**: Single-user desktop app; one Tauri shell crate, two Rust additions (event types + scraper extension), six new frontend component groups (Block, Lattice, Ladder, Inspector, PulseFloor, Cursor), one new design-token file, one new IPC adapter.

## Design direction *(REQUIRED per Constitution XII.8 — design-led spec)*

**`frontend-design` skill invoked**: 2026-05-08 by Claude Code (skill output drives this subsection; see Reference design citation below).

**Visual direction**: **Modern neo-terminal** — a Bloomberg-coded operations console living underneath a continuous, breathing layer of ambient telemetry, with a single phosphor-glowing block cursor as the eye-anchor. Terminal heritage in the rhythm; Kinetic Observatory in the atmosphere. **Single direction, executed cleanly** — no retro CRT phosphor green, no Charm-style box-drawing, no luxury softness. The aesthetic register sits with Warp / Posting / Arc command bar / Linear / Raycast — operationally dense, modernly typeset, deliberately terminal-coded without being PTY-bound.

**Typography pairing**:

- **Mono primary** at 12-13px for log streams, Block headers, Lattice labels, prompt breadcrumbs (Bloomberg territory). Candidate face: Berkeley Mono (warm, distinctive — paid) → JetBrains Mono (free, broad fallback) → Commit Mono (free, modern alternative). Selection deferred to research.md and tuned during implementation.
- **Sans pairing** for eyebrows + page titles only, drawn from the existing Spectral Graphite sans face (no new sans introduced).
- **Single weight policy on mono**; weight contrast comes from sans-vs-mono not weight-vs-weight.
- **Italic reserved as a semantic role** — "system commentary" only (State-Echo banner, error explanations, suggestions). Never decorative italic. This makes italic a meaning-carrying signal rather than a typographic flourish.

**Palette duty mapping**: Existing Spectral Graphite primitive colors stay as the base layer; this feature adds a **semantic state layer** on top. Role assignments:

- `state.pending` = graphite-fade (dim background tint) — "not yet"
- `state.allocating` = spectral-violet at 50% saturation — "claiming"
- `state.loading` = spectral-violet at 70% saturation — "in flight"
- `state.resident` = spectral-violet at 100% saturation — "ready"
- `state.cpuOffload` = spectral-amber — "deliberately not on GPU"
- `state.error` = spectral-red — "failed, attention required"
- `state.activeGlow` = spectral-violet inset (1-2px, 30% opacity) — "this surface has focus"
- `state.anomaly` = trace-specific brighten + phosphor leading-edge — "system in distress"

The semantic layer hides spectral palette names from consumers — Lattice cells reference `state.resident` not `--spectral-violet` directly, so palette evolution does not break consumers.

**Spacing rhythm + layout logic**: 4px base unit (Bloomberg-dense). Block padding 4px, gap-stack 4px between Blocks, gap-inline 8px within header rows, header height 24px. **Dense within Blocks; breathing between Blocks** — the rhythm contrast carries the reading flow. The Lattice itself is even denser: 12-14px cells with 4px gaps fits 70 layers × 5 tensor groups in a compact frame.

Composition stance: **Block stack as primary**, asymmetric Block headers (command on the left — `$ load llama3-8b --layers 67` — evidence on the right — status pill, duration, mnemonic, sparkline, collapse toggle). Asymmetry reads as "verb on left, evidence on right" — terminal-coded. Whitespace breathes between Blocks but never within them. The Lattice + Inspector use **overlap as depth** — the inspector drawer slides over the Lattice when a cell is clicked, creating a layered specimen-lifted-up feel consistent with the existing Spectral Graphite glassmorphism rule.

**Motion rules**: Two layers, governed by the cockpit principle that **every continuous motion encodes real data**:

- *Discrete content (step-snapped, no animation):* Block headers, log lines, Lattice cell state transitions on completion, Ladder rung switches, Block collapse height. These commit instantly; motion is reserved for state *during transition*, not the result.
- *Ambient peripheral (continuous):* Pulse-Floor traces, header sparklines, cursor pulse, persistence-fade trails on Lattice cells after load completion (~600ms). Each is data-driven: cursor pulse rate = system load (1Hz rest / 2Hz inference / 3Hz model-load), Pulse-Floor brightness = anomaly state, sparklines = current metric, persistence trails = recent past as oscilloscope ghost.

**One memorable moment**: the Lattice load. A 70-layer model loading cell-by-cell with a phosphor sweep cursor, persistence trails fading behind, cells settling into resident state with breathing pulses. This is the moment users will screenshot. It is the visual analog of Bret Victor's abstraction-ladder demos — same data, multiple projections, scrubbable.

**`prefers-reduced-motion` substitution**: Cursor pulse continues (its rate carries information; disabling removes data). Amplitude reduces; cycle slows. Lattice cell breathing suspended; cells go to static resident color. Pulse-Floor traces still update on data change but without continuous animation between updates. Block collapse animations skip the height tween; collapse is instant.

**Surface treatment**: **Flat by default. No box-drawing characters. No grid lines. No 1px sectioning borders.** Active surfaces get inset phosphor glow only — 1-2px inner radius, ~30% opacity, never outer halo. Glassmorphism reserved for floating overlays (Inspector drawer, Tooltip, the existing spec 037 `frontend-design`-governed floats). Top-edge spectral glow on focused panels replaces border without being bordered. Density is preserved by refusing outer halos and refusing ASCII box affectations.

**Reference design citation**: [docs/brainstorms/2026-05-08-terminal-on-steroids-lattice.md](../../docs/brainstorms/2026-05-08-terminal-on-steroids-lattice.md) is the structural source of truth, including the starter token preview (vanilla-extract sketch). Per XII.8, **literal token values from the preview (e.g., `pulseRest: "1000ms"`) are starting points translated to production tokens during implementation, never copied verbatim**. Designer tuning at implementation time supersedes the preview values.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Status | Notes |
|---|---|---|---|
| I | Ecosystem-First | **PASS** | Tauri 2.x is mature; `idb` is the canonical IndexedDB wrapper. No hand-rolled equivalents. |
| II | SOLID, Pure Functions, Classical Design | **PASS** | Block primitive composes via props (CRP). Event store separates queries from commands (CQS). Newtypes for `SeqNum`, `RunId`, `LayerIndex`, `TensorGroup`. |
| III | Modularity, Method Size, Small Crates | **PASS** | Two new small Rust crates (`nexus-run-events`, `nexus-desktop-shell`); existing `nexus-backend-runtimes` extended with the scraper additions. Frontend folders ≤ 800 LOC each. |
| IV | Self-Documenting Code (NON-NEGOTIABLE) | **PASS** | No inline comments. Module + item docstrings only on public surface. |
| V | Extendability via Adapter Contracts | **PASS** | `RunEventItem` is `#[non_exhaustive]` versioned. Block primitive is generic — any future stream surface (TTS, dep installer, scope capture) consumes it via the same props contract. Scraper trait `WorkerScraper` allows new workers without Lattice changes. |
| VI | Test-First Verification | **PASS-with-note** | Backend contract tests for `RunEventItem` schema, scraper, and IPC commands written first. Visual surfaces (Lattice, Pulse-Floor, cursor) invoke the v1.1.2 design-heavy carve-out — Playwright visual baselines + ESLint scans + token-coverage tests substitute for per-component vitest during the design-iteration window. Test strategy section to be added to spec.md before `/speckit.tasks`. |
| VII | Memory & Type Safety | **PASS** | Newtypes enforced. `thiserror` for crate errors. RAII for the desktop shell's tray handle and IPC channel. No `unsafe` expected. |
| VIII | Living Documentation | **PASS** | New crates ship `README.md`. Root `README.md` updated to mention `nexus-run-events`, `nexus-desktop-shell`, the Block primitive, and the desktop launch path. |
| IX | Git-Flow Branching | **PASS** | Branch `042-neo-terminal-shell` already created from main lineage. Conventional commit prefixes used. |
| X | Parallelism-First | **PASS** | Event ingestion is rAF-batched; multiple Lattice instances supported concurrently; scraper runs in `tokio::spawn` task; Pulse-Floor metric subscriptions are independent. |
| XI | Rust Idioms & Anti-Pattern Registry | **PASS** | `#[non_exhaustive]` on `RunEvent` enum, builder for `LatticeConfig`, newtypes for IDs, `thiserror` for errors. No primitive obsession. |
| XII | Web Frontend Architecture | **PASS** | Smart/dumb split (`<lattice>.view.tsx` + `<lattice>.ui.tsx`). React Router v7 data mode. `services/` is the only I/O boundary (IPC adapter lives there). vanilla-extract for all styling. `motion/react` for animations. |
| XII.8 | Design discipline for design-led specs | **PASS** | `frontend-design` skill invoked above; Design direction subsection populated; "Frame the interface first" task scheduled for top of phase 1 in `tasks.md` (to be generated by `/speckit.tasks`); reference design cited; reviewer quality gate committed. |
| XIII | Host ↔ Extension Boundary (NON-NEGOTIABLE) | **PASS** | The Lattice and scraper operate on the **llama.cpp generic backend runtime** (host territory per spec 032), not the `nexus.local-llm` extension. Block primitive is generic; mnemonic strings are caller-supplied per XIII.5. New crates contain no extension-id literals. The desktop shell exposes only generic surfaces (`/api/host/*`, `/api/v1/extensions/{ext_id}/{*rest}`). Runtime tuning Edit tab in the Lattice inspector emits patches against host-owned `RuntimeTuning` (spec 039 territory), not extension-owned settings. |

**Gate decision**: PASS. No violations require Complexity Tracking entries. Note item VI (design-heavy carve-out) flagged for spec amendment to add the test-strategy section.

## Project Structure

### Documentation (this feature)

```text
specs/042-neo-terminal-shell/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/           ← Phase 1 output
│   ├── run-event.schema.json        # RunEventItem v1 schema
│   ├── ipc-commands.md              # Tauri command surface
│   └── llamacpp-scraper-events.md   # documented event mapping for llama.cpp lines
├── checklists/
│   └── requirements.md  ← already exists (from /speckit.specify)
├── spec.md              ← already exists
└── tasks.md             ← Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
crates/
├── nexus-run-events/                       ← NEW crate
│   ├── Cargo.toml
│   ├── README.md
│   └── src/
│       ├── lib.rs                          # RunEventItem enum, SeqNum newtype, GapTracker
│       ├── schema.rs                       # versioned schema constants
│       ├── ids.rs                          # RunId, SourceId, LayerIndex, TensorGroup newtypes
│       ├── store/
│       │   ├── mod.rs                      # WorkerScraper trait
│       │   └── seq.rs                      # monotonic counter + persistence
│       └── tests/
│           └── schema_compat.rs            # v1 round-trip + forward-compat
├── nexus-desktop-shell/                    ← NEW crate (Tauri-side wiring)
│   ├── Cargo.toml
│   ├── README.md
│   └── src/
│       ├── lib.rs                          # Tauri command registration
│       ├── ipc/
│       │   ├── mod.rs                      # generic command dispatcher
│       │   ├── run_events.rs               # subscribe / replay event commands
│       │   └── runtime_tuning.rs           # forward inspector Edit-tab patches
│       ├── tray.rs                         # system tray RAII handle
│       └── window.rs                       # custom titlebar wiring
├── nexus-backend-runtimes/                 ← EXISTING crate, extended
│   └── src/llamacpp/
│       ├── log_pipeline.rs                 # extended: scrape → RunEventItem
│       └── scraper_patterns.rs             ← NEW module (regex set + state machine)
└── nexus-storage/                          ← unchanged

apps/
├── web/
│   ├── src-tauri/                          ← NEW Tauri sub-crate (entry point binary)
│   │   ├── Cargo.toml
│   │   ├── tauri.conf.json
│   │   ├── build.rs
│   │   └── src/
│   │       └── main.rs                     # depends on nexus-desktop-shell + nexus-core
│   ├── src/
│   │   ├── components/
│   │   │   ├── blocks/                     ← NEW
│   │   │   │   ├── block.tsx               # generic Block primitive (.ui-style — pure props)
│   │   │   │   ├── block.css.ts
│   │   │   │   └── block_header.tsx
│   │   │   ├── cursor/                     ← NEW
│   │   │   │   ├── cursor.tsx              # phosphor singleton, listens to focus + activity
│   │   │   │   └── cursor.css.ts
│   │   │   ├── pulse_floor/                ← NEW
│   │   │   │   ├── pulse_floor.tsx
│   │   │   │   ├── pulse_floor.css.ts
│   │   │   │   └── trace.tsx               # one trace per metric
│   │   │   └── runtime/
│   │   │       └── model_load_lattice/     ← NEW
│   │   │           ├── lattice.view.tsx    # smart container
│   │   │           ├── lattice.ui.tsx      # markup + cell render
│   │   │           ├── lattice.css.ts
│   │   │           ├── ladder.tsx          # 4-detent slider
│   │   │           ├── projections/
│   │   │           │   ├── bytes_view.tsx
│   │   │           │   ├── tensors_view.tsx
│   │   │           │   ├── phases_view.tsx
│   │   │           │   └── story_banner.tsx
│   │   │           └── inspector_drawer.tsx
│   │   ├── services/
│   │   │   ├── ipc_adapter.ts              ← NEW (fetch ↔ invoke switch)
│   │   │   └── run_events.ts               ← NEW (subscribe to event stream + tiered store)
│   │   ├── hooks/
│   │   │   └── use_run_events.ts           ← NEW
│   │   ├── styles/
│   │   │   └── tokens/
│   │   │       └── terminal.css.ts         ← NEW (cursor / phosphor / block / lattice / pulseFloor / state)
│   │   └── views/
│   │       └── (existing layouts; minor edits to host the Pulse-Floor at root layout level)
│   └── package.json                        ← + tauri-cli, @tauri-apps/api, idb
└── (no other apps changed)

extensions/
└── (unchanged — no extension touched by this spec)

docs/
├── brainstorms/
│   └── 2026-05-08-terminal-on-steroids-lattice.md   ← reference design (existing)
└── architecture.md                                   ← updated to mention desktop shell + Block primitive

migrations/                                            ← unchanged (no new tables)
```

**Structure Decision**: Two new small Rust crates (`nexus-run-events`, `nexus-desktop-shell`) keep the new domain logic out of the existing `nexus-core` and `nexus-api` crates per Principle III (Prefer Small Crates). The Tauri entry-point binary lives at the conventional `apps/web/src-tauri/` path so the existing Vite dev workflow continues unchanged. Frontend additions follow the Principle XII layered structure: services for I/O, components for cross-screen primitives, runtime/model_load_lattice as a screen-scoped composite. The semantic-state token group (`terminal.css.ts`) sits in `styles/tokens/` as a new file alongside the existing Spectral Graphite tokens — additive, never overwriting.

## Complexity Tracking

> No Constitution-Check failures. No entries required.
