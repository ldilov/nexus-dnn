# Feature Specification: Neo-Terminal Desktop Shell

**Feature Branch**: `042-neo-terminal-shell`
**Created**: 2026-05-08
**Status**: Draft
**Input**: User description: *brainstorm session 2026-05-08 — see `docs/brainstorms/2026-05-08-terminal-on-steroids-lattice.md` for the full thinking. The user wants nexus-dnn's worker/runtime/installer surfaces — currently terminal-feeling — redesigned as a custom desktop GUI that simulates a terminal aesthetic but is fully graphical underneath. Aesthetic register: Modern neo-terminal (Bloomberg-dense, Kinetic Observatory motion, modern phosphor-glow block cursor, inset phosphor on active surfaces). The Spectral Graphite design system from spec 037 stays; this feature extends it.*

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Native desktop app shell with always-on host (Priority: P1)

A user installs nexus-dnn as a native desktop application. The app appears in the OS dock/taskbar with a custom titlebar themed as a terminal prompt path. Closing the window leaves the host running in the system tray, so models stay loaded, leases stay warm, and dependency installs continue to completion. Re-opening the window resumes exactly where the user left off.

**Why this priority**: The shell is the precondition for every other affordance in this feature. Without a desktop app, there is no system-tray, no custom chrome, no IPC-based event flow — the app remains a browser tab and the rest of the spec is impossible.

**Independent Test**: Launch the desktop app from the OS application launcher. Verify (a) the app appears with a custom titlebar showing a prompt-style breadcrumb, (b) the app shows up in the OS app switcher / dock, (c) closing the window does not kill the host process — confirm a model loaded before close remains loaded after re-open, (d) the system-tray icon is present and offers "Open Window" / "Quit" actions.

**Acceptance Scenarios**:

1. **Given** the desktop app is installed, **When** the user launches it from the OS launcher, **Then** a window opens with a custom titlebar styled as `~/nexus-dnn $` and the existing app surfaces render inside it.
2. **Given** a model is loaded into a runtime, **When** the user closes the window via the close button, **Then** the host process continues running, the system-tray icon remains, and re-opening the window shows the same model still loaded with no reconnection delay perceptible to the user.
3. **Given** the system tray icon is present, **When** the user right-clicks it, **Then** they see at minimum "Open Window" and "Quit nexus-dnn" actions, and "Quit" actually shuts the host down cleanly.
4. **Given** the dev environment, **When** a developer runs the headless backend without the desktop wrapper, **Then** the existing HTTP/SSE surfaces still work for browser-based development.

---

### User Story 2 — Model-load Lattice as the proof point (Priority: P1)

When a user loads a GGUF model, instead of a one-line progress bar they see a 2D Lattice: rows are transformer layers, columns are tensor groups (embed / attn / ffn / norm / kv-cache). Each cell lights up as that tensor loads. A sweep cursor marks the loader's current position. Failures appear as spatial shapes the user learns to read at a glance: an OOM is a single red cell, a CPU offload is an amber column, a quantization mismatch is a horizontal red row. A Ladder Slider on the edge lets the user switch the same data between four projections — Bytes, Tensors, Phases, Story — so beginners can stay at "Story" while debuggers slide down to "Tensors".

**Why this priority**: This is the visible proof that the architecture works. The Lattice motivates the underlying event protocol, the Block primitive, the aesthetic tokens, and the worker scraper. Without it, those substrates have nothing to render.

**Independent Test**: Load a known 70-layer GGUF (e.g., Llama-3-8B Q4_K_M) and observe the Lattice fill cell-by-cell over the load period. Trigger a deliberate failure (request more GPU layers than VRAM permits) and verify a single red cell appears at the failing layer's tensor group within 500ms of the worker error. Slide the Ladder from Tensors → Phases → Story and verify the same load is comprehensible at each rung. After load completes, click any cell and verify a side drawer opens with that tensor's metadata (name, shape, dtype, bytes, GPU/CPU placement, GGUF byte offset).

**Acceptance Scenarios**:

1. **Given** a user requests a GGUF model load, **When** the worker begins streaming load progress, **Then** the Lattice widget appears as a Block in the runtime view, cells transition from pending → loading → ready as the loader advances, and a sweep cursor visibly marks the current head.
2. **Given** the load encounters an OOM at a specific layer, **When** the worker emits the failure, **Then** the offending cell turns red with an inset phosphor glow, downstream cells flash amber for ~2 frames before going dark, and a side panel offers the suggested action (e.g., reduce GPU layers).
3. **Given** the load uses CPU-offloaded MoE layers, **When** the load completes, **Then** the FFN column shows amber cells exactly at the offloaded layers and green cells at the GPU-resident layers, making the offload pattern self-evident.
4. **Given** the Lattice is displayed, **When** the user presses keyboard `1`, `2`, `3`, or `4`, **Then** the projection switches between Bytes, Tensors, Phases, Story rungs respectively, and the same data is rendered in the new form within one frame.
5. **Given** the model has finished loading, **When** the user clicks a tensor cell, **Then** an inspector drawer opens showing the cell's metadata, and an "Edit" tab allows reassigning that layer's GPU/CPU placement and previewing the resulting VRAM headroom before applying.
6. **Given** the user collapses the model-load Block, **When** the Block is in collapsed state, **Then** a one-line summary remains visible (e.g., `$ load llama3-8b — 67/70 GPU + 3 CPU — 4.2 GB VRAM`) with an inline 4px sparkline of inference activity.

---

### User Story 3 — Pulse-Floor ambient telemetry band (Priority: P2)

A 4px-tall translucent band runs along the bottom of every page in the desktop app. It carries four stacked traces — VRAM, RAM, active leases, and tokens-per-second — drawn as syntax-highlighted spectral colors. During healthy operation the band is dark and quiet, glanceable but ignorable. When any tracked metric crosses an anomaly threshold (e.g., VRAM > 92%, lease churn high, tok/s collapse), the band's relevant trace brightens dramatically with phosphor glow, becoming the brightest thing on screen. The band is present on every page so that "is the system as a whole okay?" is answerable from anywhere without opening a status panel.

**Why this priority**: Highest leverage-to-effort in the feature. ~20 lines of frontend code plus a single SWR subscription buys app-wide ambient awareness and replaces the need for a "system status" page. It's also the brand carrier — the thing that makes every surface feel like a cockpit.

**Independent Test**: Open any page in the app. Run a workload that drives VRAM above 92% and verify the corresponding Pulse-Floor trace brightens within 1 second and stays bright until VRAM drops back. Stop the workload and verify the trace fades back to its quiet state. Navigate between three different pages during the anomaly and verify the Pulse-Floor remains visible and consistent across all pages.

**Acceptance Scenarios**:

1. **Given** the desktop app is running and the user is on any page, **When** the user looks at the bottom edge of the window, **Then** a 4px-tall band with four stacked translucent traces is visible.
2. **Given** all tracked metrics are within healthy thresholds, **When** the user looks at the Pulse-Floor, **Then** the traces are dim, motion is gentle, and no trace dominates visually.
3. **Given** VRAM utilization crosses the anomaly threshold, **When** the metric exceeds the threshold for at least 1 second, **Then** the VRAM trace brightens with phosphor glow on its leading edge and remains the most prominent visual element on screen until the metric recovers.
4. **Given** the user navigates between pages while an anomaly is active, **When** any page is rendered, **Then** the Pulse-Floor remains visually consistent and the anomaly indication persists across navigation.

---

### User Story 4 — Single phosphor-glow block cursor as eye-anchor (Priority: P2)

Across the entire app, exactly one block-shaped cursor is visible at any time. It sits in the focused Block (or in the active input field), pulses gently rather than blinking — its opacity breathes between roughly 70% and 100% — and carries a soft inset phosphor glow in a spectral accent. Its pulse rate encodes system load: ~1Hz when the system is at rest, ~2Hz when inference is in flight, ~3Hz during a model load. The cursor functions as the user's eye-anchor and as a passive system gauge in one primitive.

**Why this priority**: The cursor is the aesthetic's identity-carrier and the cockpit-principle's purest expression — a single piece of continuous motion that always encodes real data. Cheap to ship, but defines the feel of the entire app.

**Independent Test**: Focus a Block by clicking it and verify a single block cursor appears within that Block. Click a different Block and verify the cursor moves there (still exactly one cursor on screen). Trigger a generation and measure the cursor's pulse rate — it should approximately double from rest. Trigger a model load and verify the rate roughly triples.

**Acceptance Scenarios**:

1. **Given** the app is open with no specific focus, **When** the user observes the screen, **Then** at most one block cursor is visible and it is in the most-recently-focused Block or input.
2. **Given** the user clicks a different Block, **When** focus shifts, **Then** the previous cursor disappears and a new one appears in the newly-focused Block within the same frame.
3. **Given** the system is at rest, **When** the user observes the cursor, **Then** its opacity oscillates between roughly 70% and 100% with a cycle length of approximately 1 second, and the cursor never reaches zero opacity (no hard blink).
4. **Given** an inference stream is active, **When** the user observes the cursor, **Then** the pulse rate is approximately 2× the at-rest rate.
5. **Given** the user has accessibility setting `prefers-reduced-motion` enabled, **When** the cursor renders, **Then** the pulse cycle slows to roughly half rate and amplitude reduces, but the load-encoding behavior remains so the cursor still functions as a gauge.

---

### User Story 5 — Bloomberg-dense Kinetic Observatory aesthetic tokens (Priority: P3)

A new layer of design tokens captures the four locked aesthetic axes (Bloomberg-dense spacing, Kinetic Observatory motion, modern block phosphor cursor, inset-only phosphor glow) and is consumed by the Lattice, the Pulse-Floor, the cursor primitive, and Block headers. The token names are role-based (e.g., `state.resident`, `state.cpu-offload`) so they remain stable as the underlying spectral palette evolves. Existing Spectral Graphite primitives stay as the base layer; this is a semantic layer on top.

**Why this priority**: Once the tokens exist, every future surface (TTS synth pipeline, dep installer, scope capture, etc.) inherits the aesthetic for free. The tokens compound. But they do not deliver user value alone — they are infrastructure that supports user-visible work.

**Independent Test**: Render the Lattice in Storybook (or a dev-only route) with the new token layer applied. Visually verify cell breathing (Kinetic Observatory), inset phosphor on the sweep cursor (no outer halo), 4px gaps (Bloomberg density), and role-correct cell colors (resident = spectral-violet, cpu-offload = amber, error = red). Toggle a single token (e.g., `lattice.breathCycle` from 2000ms to 4000ms) and verify the change cascades to all consuming components.

**Acceptance Scenarios**:

1. **Given** the new token layer is loaded, **When** the Lattice renders, **Then** all cells, the sweep cursor, the breathing pulse, and the cell gaps derive from named tokens (no hard-coded values in component CSS).
2. **Given** a developer needs to tune the cursor pulse rate, **When** they change a single token in the terminal token file, **Then** every cursor instance app-wide adopts the new rate without component changes.
3. **Given** the four state colors (pending / resident / cpu-offload / error / loading), **When** any consumer renders a state, **Then** the color comes from `state.*` tokens (role names), not from `spectral.*` tokens (palette names) directly.

---

### Edge Cases

- **Worker crashes mid-load.** The Lattice freezes in its last known state; the worker's last-emitted event seq is preserved; a synthetic `gap` event marks the missing tail; the inspector drawer for any cell still works against the partial metadata. The user is offered "Retry" and "View partial logs" actions.
- **Worker emits a malformed or unknown line that the scraper cannot parse.** The scraper emits a `kind: "scraper_unknown"` event capturing the raw line. The Lattice does not crash. The unknown event is queryable later for pattern updates.
- **Event transport drops a batch.** The frontend detects the seq gap, emits a synthetic `kind: "gap"` event, and visually marks the affected cell range with a "?" indicator instead of silently rendering stale state.
- **Window resized very small (e.g., 800×600).** The Lattice reflows: cells stay 12-14px minimum, scroll container appears if needed; the Pulse-Floor stays full-width 4px; Block headers wrap their inline sparkline below the prompt text rather than truncating.
- **Multiple model loads in flight at the same time.** Each load gets its own Lattice Block. The Pulse-Floor aggregates total VRAM. The cursor pulse rate reflects the highest-activity load.
- **GPU info unavailable to the desktop sandbox** (e.g., user's host has no NVML/Metal access). Pulse-Floor degrades gracefully: traces it cannot populate are visually dimmed with a tooltip explanation; the rest continue to function.
- **`prefers-reduced-motion` is set at the OS level.** The cursor still pulses (because pulse rate encodes load — disabling it removes information) but with reduced amplitude. Lattice cell breathing is suspended; cells go to a static resident color. Pulse-Floor traces still update on data change but without continuous animation between updates.
- **Model has fewer than 10 layers or more than 200 layers.** Cell size auto-scales: small models render larger cells (more legible per-cell), huge models render smaller cells (still fit in the Block).
- **User pipes stdout to a file for ops debugging.** Workers continue to emit human-readable text logs to stdout regardless of the desktop app's IPC layer; ops grep workflows are unaffected.
- **llama.cpp's stderr format changes in a future upstream release.** The scraper's unknown-line tracking surfaces the drift via telemetry; the Lattice continues rendering known events; recovery is a scraper-pattern update with no upstream patch.

## Requirements *(mandatory)*

### Functional Requirements

#### Desktop shell (US1)

- **FR-001**: System MUST ship as a native desktop application with a window distinct from any web browser.
- **FR-002**: The desktop application MUST present a custom titlebar that displays a prompt-style breadcrumb of the current location (e.g., `~/nexus-dnn/runs/<run-id> $`).
- **FR-003**: System MUST register a system-tray (or platform-equivalent) presence with at minimum "Open Window" and "Quit" actions.
- **FR-004**: When the application window is closed, the host process MUST continue running so that loaded models, warm leases, and in-flight installs survive window close.
- **FR-005**: When the user quits via the system-tray "Quit" action, the host MUST shut down cleanly, releasing GPU memory and persisting any in-progress state.
- **FR-006**: The frontend MUST communicate with the host via local IPC when running as a desktop app, and via the existing remote-access surfaces when running headless for development.
- **FR-007**: A developer MUST be able to run the host in headless mode (no desktop wrapper) and reach all existing surfaces from a browser, preserving the current dev workflow.

#### Event substrate (cross-cutting, primarily US2)

- **FR-010**: Workers MUST emit operations data as structured events conforming to a versioned schema `nexus.run-event.v1` with at minimum the fields `{ schema, kind, seq, ts, source }` and a discriminated `kind` (line | phase | metric | artifact | widget | error | gap).
- **FR-011**: Each event MUST carry a worker-side monotonic sequence number (`seq`) so that ordering survives bursty stdout and clock collisions.
- **FR-012**: The frontend MUST maintain an event store with three tiers: in-memory hot (most recent ~2,000 items per run), browser-local warm (window of current run history), and on-disk cold (persisted log archive).
- **FR-013**: When the frontend detects a gap in the seq sequence, it MUST emit a synthetic `kind: "gap"` event covering the missing range and visually mark affected UI elements as uncertain rather than silently rendering stale state.
- **FR-014**: Incoming event traffic MUST be coalesced into animation-frame batches before causing renders, so that ≥1,000 events/sec does not cause UI jank.
- **FR-015**: The schema MUST include a versioning field on every event so future incompatible changes do not silently corrupt stored data.

#### llama.cpp scraper (US2 dependency)

- **FR-020**: System MUST scrape llama.cpp's existing stderr output and translate recognised lines (tensor allocation, KV-cache init, buffer reservations, layer offload notices) into structured events conforming to FR-010.
- **FR-021**: When the scraper encounters a line it does not recognise, it MUST emit a `kind: "scraper_unknown"` event capturing the raw line and continue parsing — never fatal, never silent.
- **FR-022**: The scraper MUST NOT require any patches to upstream llama.cpp source.

#### Model-load Lattice (US2)

- **FR-030**: The model-load surface MUST render layers × tensor-groups as a 2D grid, with cell state derived from the structured event stream defined in FR-010.
- **FR-031**: Cells MUST visually distinguish at minimum the states {pending, allocating, loading, ready, error, cpu-offloaded} via color and intensity.
- **FR-032**: A sweep cursor MUST mark the loader's current head; cells immediately after a load completion MUST exhibit a brief persistence-fade trail (~600ms) before settling to resident appearance.
- **FR-033**: The Lattice MUST offer a Ladder control with four detents — Bytes, Tensors, Phases, Story — where the same underlying event stream is rendered in four progressively-abstracted forms, switchable by keyboard shortcut (`1`-`4`) or click.
- **FR-034**: The default detent on first display MUST be Phases (the broadest-audience rung).
- **FR-035**: After load completion, the same widget MUST switch to inspector mode where clicking any cell opens a side drawer showing that tensor's metadata (name, shape, dtype, bytes, current GPU/CPU placement, GGUF byte offset).
- **FR-036**: The inspector MUST include an Edit tab that allows reassigning a layer's GPU/CPU placement, previews the resulting VRAM headroom, and applies the change by re-issuing a runtime tuning patch and reloading the model.
- **FR-037**: Failure modes MUST render as distinguishable spatial shapes: single-point (OOM at a specific cell), full-column (CPU-offload pattern), full-row (quantization mismatch across all layers at one tensor group), file-byte-range (corrupt download — visible only in Bytes rung).
- **FR-038**: The Lattice MUST be presented as a Block with prompt-style header, collapsible to a one-line summary that includes an inline 4px sparkline of inference activity.

#### Block primitive (introduced by US2, reusable thereafter)

- **FR-040**: Block surfaces MUST be self-contained, collapsible, share-as-link, and each MUST carry a 4-character mnemonic for command-palette addressability.
- **FR-041**: A Block's header MUST include a prompt-style summary of the operation (e.g., `$ load llama3-8b --layers 67`) that is clickable to copy as a shell-style command string.
- **FR-042**: Blocks MUST stack vertically by default and MUST be poppable into split-pane layouts on user request without losing focus state.
- **FR-043**: When a Block is collapsed, its header MUST still convey current state via a one-line summary plus an inline 4px sparkline of its primary metric.

#### Pulse-Floor (US3)

- **FR-050**: A 4px-tall ambient telemetry band MUST be rendered at the bottom edge of every primary page in the desktop app.
- **FR-051**: The Pulse-Floor MUST contain at minimum four stacked traces tied to system metrics: VRAM utilization, RAM utilization, active runtime leases, and current tokens-per-second.
- **FR-052**: During healthy operation, Pulse-Floor traces MUST be visually quiet — low brightness, low motion amplitude — so they do not steal attention.
- **FR-053**: When any tracked metric crosses its anomaly threshold and remains above for at least 1 second, the corresponding trace MUST brighten with phosphor glow on its leading edge and become the most visually prominent element on screen until the metric recovers.
- **FR-054**: The Pulse-Floor MUST persist across page navigation; the user MUST NOT see it disappear or reset when moving between Blocks or routes.
- **FR-055**: When a metric source is unavailable to the host (e.g., GPU sensor inaccessible), the corresponding trace MUST render as visibly dimmed with a tooltip explanation rather than disappearing entirely.

#### Cursor primitive (US4)

- **FR-060**: The application MUST display at most one block-shaped cursor at any time across all visible surfaces.
- **FR-061**: The cursor MUST animate by opacity pulse — oscillating between roughly 70% and 100% — never reaching zero, so it breathes rather than blinks.
- **FR-062**: The cursor's pulse cycle length MUST encode system activity at three nominal levels: rest (~1 Hz), inference active (~2 Hz), model load active (~3 Hz).
- **FR-063**: The cursor MUST follow focus — clicking a different Block transfers the cursor to that Block within one frame; only one cursor is ever visible.
- **FR-064**: When `prefers-reduced-motion` is set, the cursor MUST reduce pulse amplitude and slow the cycle but MUST continue to encode load via cycle length, because the encoding carries information.

#### Aesthetic tokens (US5)

- **FR-070**: A new design-token group MUST capture cursor pulse rates, phosphor inset radius/opacity/fade, Block density spacing, Lattice cell sizes and breath cycle, Pulse-Floor trace dimensions, and motion durations (snap, ambient-slow, ambient-fast, persist-fade).
- **FR-071**: Semantic state colors (`state.pending`, `state.resident`, `state.loading`, `state.cpuOffload`, `state.error`, `state.activeGlow`) MUST exist as role-named tokens layered above the existing Spectral Graphite spectral-color primitives, so consumers reference roles not hues.
- **FR-072**: All consumers introduced by this feature (Lattice, Pulse-Floor, cursor, Block primitive) MUST derive every visual quantity from these named tokens — no hard-coded color, spacing, duration, or radius values in component CSS.

#### Cross-cutting

- **FR-080**: All worker-emitted text logs MUST continue to be available to ops via existing stdout/stderr pipelines unchanged; the structured event stream is additive, never replaces text logs.
- **FR-081**: The desktop app MUST respect OS accessibility settings (`prefers-reduced-motion`, `prefers-contrast`) and MUST stop continuous animation when the window is hidden or minimised.
- **FR-082**: Keyboard navigation MUST reach every interactive element introduced by this feature (Lattice cells, Ladder rungs, inspector drawer, Block collapse toggle, Pulse-Floor anomaly hover).

### Key Entities

- **RunEvent**: A versioned, sequence-numbered structured record emitted by a worker about its operations. Carries `{ schema, kind, seq, ts, source, payload }` where `kind` is one of {line, phase, metric, artifact, widget, error, gap}. Stored in tiered hot/warm/cold layers.
- **Block**: The new UI atom. Contains one structured event stream, has a prompt-style header, a 4-char mnemonic, a collapsed state with inline sparkline, and pin/share/split-pane operations.
- **Lattice Cell**: A coordinate `(layer_index, tensor_group)` with state {pending, allocating, loading, ready, error, cpu-offloaded}, derived from RunEvent stream filtered to the current model-load run.
- **Pulse-Floor Trace**: One channel of ambient telemetry (e.g., `vram.utilization`) rendered as a translucent band along the bottom of the window. Carries normal-vs-anomaly visual state.
- **Cursor**: A singleton across the whole app. Owns the pulse cycle and color, follows focus, and reads system activity to choose its pulse rate.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: When loading a 70-layer GGUF that triggers a VRAM-OOM at a specific layer, a user can identify the failing layer by visual position in the Lattice within 5 seconds of the failure, without reading any log lines.
- **SC-002**: After closing the application window with a model loaded, re-opening the window restores the same model in less than 200ms with no perceived "reconnection" delay.
- **SC-003**: A user new to the application can answer "is the system healthy?" by glance only — no clicks, no panel-opening — from any page in the app, within 2 seconds.
- **SC-004**: When a user initiates a CPU-offloaded MoE load, the offload pattern (which layers are on CPU vs GPU) is visible at a glance without numerical reading — i.e., 100% of test users correctly identify "the offloaded ones are at the bottom" or equivalent on first sight.
- **SC-005**: Time-to-recognize a "system in trouble" anomaly (e.g., VRAM > 92%) reduces from minutes (reading scrolling logs) to under 3 seconds (Pulse-Floor anomaly state).
- **SC-006**: For at least one surface (model-load), the user-visible navigation paradigm is Block-based rather than page-based — verified by the presence of prompt-style breadcrumbs, collapsible Block stack, and 4-char mnemonics.
- **SC-007**: Continuous animation in the application stops within 200ms of the window being minimised or hidden, verified by render-frame telemetry.
- **SC-008**: Frontend can ingest at least 1,000 RunEvents per second without UI jank (measured by ≥58 fps at the renderer) — verified by replay of a recorded high-volume model-load trace.
- **SC-009**: For every interactive element introduced by this feature, a keyboard-only user can reach and operate it without mouse — verified by tab-traversal test of Lattice, Ladder, inspector, Block collapse, and Pulse-Floor anomaly hover.
- **SC-010**: When a developer changes a single aesthetic token (e.g., `cursor.pulseRest`), every consuming component picks up the new value on next render without component-level edits.

## Assumptions

- The Spectral Graphite design system shipped in spec 037 remains the base layer; this feature extends it with a semantic-token overlay rather than replacing it.
- Tauri 2.x (or equivalent) is the desktop wrapper; the existing React 19 + vanilla-extract frontend is reused as-is, with `fetch('/api/...')` swapped to `invoke('cmd_...')` per existing IPC adapter pattern.
- Workers continue to emit human-readable text to stdout/stderr unchanged; the structured event stream is additive on a separate channel (Tauri command channel or local socket) so ops grep workflows are unaffected.
- The first migrated worker is llama.cpp via stderr-scraping (Stage 1, no upstream patches). Other worker types (TTS synth, dependency installer, GGUF probe) stay on existing surfaces during this spec and migrate in follow-up specs.
- The Block primitive is introduced by the Lattice surface; existing application surfaces continue to use their current layout primitives during this spec — there is no app-wide page-to-Block refactor.
- The ⌘K command palette is delivered by spec 041 (host-search-palette); this feature inherits 041's palette and adds Block mnemonics to its search index, but does not reimplement the palette.
- System-tray presence on macOS and Windows is in scope; Linux varies by desktop environment and is delivered via the desktop wrapper's abstraction with documented degraded behavior where the platform lacks the affordance.
- Anomaly thresholds for Pulse-Floor traces (e.g., "VRAM > 92%") are configurable defaults; the exact values can be tuned during implementation without spec change.
- This spec does not deliver Scope Capture (auto-error-recording oscilloscope), cinematic milestone cards, mnemonic-only navigation, or sound design — these are explicitly deferred to follow-up specs once the substrate is in place.

## Dependencies

- **Spec 037 — Spectral Graphite Redesign** (DONE): provides the base design system, dual typography, glassmorphism for floats, and the no-borders rule that this feature inherits.
- **Spec 041 — Host Search Palette** (in progress): provides the ⌘K command palette into which Block mnemonics register.
- **Spec 039 — llama.cpp Throughput Tier-1** (in progress): provides the runtime tuning fields surfaced by the Lattice idle-state Edit tab; the scraper introduced here parses the same stderr surface that 039 instruments.

## Test strategy

This spec invokes the **Constitution VI v1.1.2 design-heavy UI carve-out** (recorded in `.specify/memory/constitution.md`). Several user stories — US2 (Lattice), US3 (Pulse-Floor), US4 (Cursor), US5 (Aesthetic tokens) — are predominantly visual integration with no new business logic invariants beyond those already covered by backend contract tests. Per the carve-out:

**Mandatory test surface (in scope, must ship with the implementation)**:

- **Backend contract tests for the event protocol** — `crates/nexus-run-events/tests/schema_compat.rs` covering every `RunEventItem` variant against the JSON schema in `contracts/run-event.schema.json`. Round-trip + forward-compat (unknown enum variant tolerance per `#[non_exhaustive]`).
- **llama.cpp scraper fixture suite** — `crates/nexus-backend-runtimes/tests/llamacpp_scraper_fixtures/` with eight real captured stderr fixtures (happy path, mixed offload, MoE, OOM, cancelled, corrupt, hybrid Mamba, ROCm variant) and their expected `RunEventItem[]` JSON outputs. **This is the primary correctness safety net for spec 042 — the regex+state-machine scraper is where the real invariants live.**
- **Boundary audit** — `crates/nexus-run-events/scripts/boundary_audit.sh` greps the new crates for any extension-id literals; PASS state is a Principle XIII merge gate per Appendix G/H.
- **Quality gates** — `cargo fmt --all`, `cargo clippy --workspace --all-targets -- -D warnings` (no new warnings on touched code), `cargo test --workspace` green, `pnpm tsc --noEmit` green, `pnpm build` green, `pnpm scan:theme` / `scan:terminology` / `scan:cdn` / `scan:noop` clean.

**Deferred test surface (carve-out invocation, tracked as follow-up)**:

- **Per-component vitest** for Block, Cursor, Lattice cells, Pulse-Floor traces, Inspector drawer, Ladder slider — deferred because these surfaces will iterate substantially during the design-iteration window. Per-component vitest written against an iterating UI is high-rewrite-cost without proportional invariant value.
- **Playwright visual baseline** for the Lattice happy-path + each failure mode rendering, plus the Pulse-Floor anomaly state. Visual regression harness wiring exists from spec 037; the new baselines are deferred to the follow-up sprint.
- **Cross-browser desktop matrix** (Tauri on macOS, Windows, Linux) — desktop quickstart smoke (T034 / T057 / T079) covers the active development OS; full cross-platform matrix tests deferred.

**Visual safety net during the deferral window**:

- **Manual quickstart smoke** at three checkpoints (per-phase T034 + T057 + final T079).
- **CI scanners** continue to enforce token discipline, terminology consistency, no remote CDN, no no-op handlers.
- **The token-coverage scan** added as part of US5 (T069/T070) catches any hardcoded color/spacing/duration leak in the new component tree.

**Follow-up tracking**: A `specs/042-neo-terminal-shell/followups.md` (created in T081) lists every deferred test as an explicit follow-up sprint commitment. The carve-out is not free — the deferred coverage MUST be tracked, even if not implemented in this spec's window.

**Cite**: Constitution VI v1.1.2 design-heavy UI carve-out (`.specify/memory/constitution.md` line ~273); first invocation spec 019 (`specs/019-extension-modules/spec.md` § Test strategy).
