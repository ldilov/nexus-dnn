# nexus-tui — Improvements & UI/UX Brainstorm (Spec 044 follow-up)

**Date**: 2026-05-11
**Branch**: `044-tui-streaming-console`
**Status**: Spec 044 at 92% (120/131); pushed to origin
**Method**: `/octo:brainstorm` — two rounds, three providers (Codex / Sonnet / Opus)

---

## TL;DR

Two rounds of multi-AI brainstorming surfaced 30+ ideas across capabilities (R1) and UI/UX (R2). A 3-week initiative ships the highest-leverage subset:

- **Week 1 — Foundation**: `TermCaps` probing, `SpectralTheme` tokens + `cargo xtask theme-audit`, `MotionController` with quiet-by-default budget
- **Week 2 — Surface polish**: Luminance laddering, microcopy table, hover-whisper status line, severity shape glyphs + `--no-glyphs` fallback
- **Week 3 — Compositional UX**: Verbosity Slider (`Ctrl+±`), Spotlight (`f`-key), Result-aware FilterIndicator, ambient cheatsheet first-run

A separate ~3-week stream (parallel-runnable) ships the **Unified History Substrate + Echo/Suggestion channel** for incident workflow. MCP server mode was discussed and explicitly deferred.

---

## Round 1 — Capability Brainstorm

### 🔴 Codex picks (technical feasibility)

| Idea | Files | Effort | Crates |
|---|---|---|---|
| Disk-Backed Time-Travel Spool | `stream/spool.rs` (`EventSpool`/`SpoolSegment`/`SpoolCursor`) | 7–10h | `memmap2`, `zstd`, `crc32fast` |
| Indexed Filter Engine | `stream/index.rs` (`SourceIndex`/`CorrelationIndex`) | 5–7h | `regex-automata`, `rustc-hash`, `roaring` |
| Incident Digest Mode | `inspector/incidents.rs` (`IncidentCluster`/`IncidentDigest`) | 6–8h | `hdrhistogram`, `rustc-hash` |
| Adaptive Folding | `stream/folding.rs` (`FoldKey`/`FoldWindow`/`FoldDecision`) | 4–6h | `xxhash-rust`, `unicode-width` |
| Trace Waterfall Inspector | `inspector/trace.rs` (`TraceContextExtractor`/`TraceWaterfall`) | 5–8h | `opentelemetry`, `unicode-width` |
| Hot-Reloaded Operator Profiles | `repl/profile.rs` (`OperatorProfile`/`ProfileWatcher`) | 4–6h | `notify`, `toml_edit`, `serde` |

### 🟡 Sonnet picks (lateral / ecosystem)

| Idea | Surface | Why |
|---|---|---|
| `BOOKMARK` | `~/.nexus-tui/bookmarks.jsonl` + `b` keystroke in `/inspect` | Session-persistent named contexts |
| `NU_PLUGIN` | `nu_plugin_nexus_tui` msgpack binary | Stop embedding query logic; let nu own analytics |
| `OSC-133 Prompt Marks` | 4 escape sequences around reedline prompt | Free shell-integration in iTerm/WezTerm/Ghostty |
| `DIFFGRAM` | Press `d` on event → right-panel field diff vs prior same-source | Surfaces "what changed" without query language |
| `MCP_SERVER` mode | `nexus-tui --mcp` | **DROPPED** by user — not pursuing |

### 🔵 Opus picks (pattern spotting / paradox hunting)

1. **Stage / Board primitive** — saveable layouts (`/stage save triage`); resolves drawer-vs-feed silent competition
2. **Snapshot ⇆ Replay symmetry** — `nexus-tui --replay file.jsonl`; closes the snapshot loop with Codex's spool
3. **Echo channel — events as commands** — `NexusEvent::Suggestion { command, reason, confidence }`; one-keystroke acceptance
4. **Operator-as-event-source** — `/note <text>` injects synthetic event into ring buffer; visual landmarks in scrollback
5. **WASM-pluggable heuristics** — wasmtime-loaded `.wasm` modules subscribed to event windows; aligns with Principle V

### R1 Cross-perspective synthesis

**Convergence**: All three providers surfaced "make the buffer queryable as structured data" (Codex: Indexed Filter Engine, Sonnet: nu plugin, Opus: stage system); all three surfaced "persistence beyond hot RAM" (Codex: spool, Sonnet: bookmarks, Opus: replay).

**Top-3 R1 picks**:
1. **Unified History Substrate** = Codex's `EventSpool` + Opus's replay mode. Three tiers (hot ring → warm mmap → cold replay), one schema, one renderer path.
2. **Echo/Suggestion + Incident Digest** (Opus + Codex). Heuristics become prescriptive, not just descriptive.
3. *(MCP mode dropped per user direction)*

---

## Round 2 — UI/UX Brainstorm

### 🔵 Opus initial UI/UX pass

11 ideas, ranked by impact ÷ effort:

| Idea | Build | Impact |
|---|---|---|
| Result-aware FilterIndicator | 2h | High |
| Shape semantics for severity (glyph in front of color) | 1h | Med |
| Spotlight (`f` key, progressive filter from selection) | 4h | High |
| Stacked severity sparkline | 3h | High |
| Slash preview (resolved consequence below prompt) | 4h | Med |
| Density modes (`Ctrl+D` cycles compact/comfortable/prose) | 6h | High |
| Hover trails (dim-trail previous N events in same correlation) | 6h | High |
| Minimap (right-edge severity ribbon, click-to-jump) | 8h | Med |
| DVR Dwell mode (paused = scrubber + time-jump UX) | 12h | Very high |
| Operator notes (`/note` as visual yellow stripes in feed) | 4h | High |
| Cinema mode (`Ctrl+F` full-screen, oversized severity glyphs) | 4h | Med |

### 🔴 Codex UI/UX technical layer

1. **Motion subsystem** — `render/motion.rs::MotionClock { frame, tick_ms: 16, reduced_motion }` driven from runtime redraw loop (single owner). `trait Animatable`. Frame-count tokens: row-flash `8f`, scrubber `14f`, chip pulse `10f`, hover fade `6f`, fatal pulse `24f`. Pulses change *intensity*, not width.
2. **Terminal capability detection** — `term_caps.rs::TermCaps { truecolor, osc52, osc7, kitty_graphics, sixel, braille, cursor_rgb, tmux_passthrough, slow_link }`. Ship: OSC-52 copy, true-color gradients (sparkline/pressure_meter/timeline), braille sub-cell. Defer Kitty/Sixel.
3. **Theme tokens** — `theme/tokens.rs::SpectralTheme { severity, surfaces, accents, chrome, motion }` + `theme/loader.rs` reading `~/.config/nexus-tui/theme.toml`. `ContrastReport` computes WCAG AA, **hard-errors on severity text below 4.5:1**. `ThemeRuntime { theme, caps }` downgrades RGB→ANSI.
4. **Docking layout** — `layout/dock.rs::{DockTree, DockZone::{Top,Bottom,Left,Right,Center,Overlay}, DrawerState { expanded, collapsed_size, preferred_size, priority }}`. Solves silent drawer row-auction.
5. **Frame buffer + dirty-row tracking** — `render/frame_buffer.rs::FrameBuffer { width, height, previous, current, dirty_rows: BitVec }`. Cell-diff then emit single-`MoveTo` styled runs. SSH/tmux cap 20–30 fps; Windows Terminal 60 fps.

### 🟡 Sonnet UI/UX human-factors layer

1. **Ambient cheatsheet** — first-run 4-line `DarkGray` ghost block in status-ribbon, fades line-by-line on keypress. Action = dismiss. Sentinel at `~/.config/nexus-tui/seen_hints`.
2. **Microcopy table** —

| Touch point | Replacement |
|---|---|
| Empty filter result | `Nothing matched — try /filter level:warn or widen the time range` |
| SSE reconnect | `Stream interrupted — reconnecting (attempt 2/5)` |
| Long snapshot | `Snapshotting 4,821 events… (this takes a moment for large feeds)` |
| Filter parse error | `Unrecognised field "lvl" — did you mean level:?` |
| Successful yank | `Copied 12 lines — paste anywhere` |

3. **A11y** — `--no-glyphs` (NVDA reads "black up-pointing triangle" worse than `[ERROR]`); `narrow_layout` branch at `terminal_width < 82`; auto high-contrast detect via missing `$COLORTERM`; `--no-mouse` with `?` overlay listing keyboard equivalents.
4. **Power-user calibration** — `KeymapEditMode` enum (`Vi`/`Emacs`/Helix-flavoured); `strings.toml` externalised microcopy (RTL via `strings.ar.toml`); `terminal_compat="vscode"` auto-detect via `$TERM_PROGRAM=vscode`.
5. **Luminance laddering** — zone bands every 5 logical rows, ERROR rows get spectral-red `▌` in column 0 (border-substitute), correlation depth as 2-space indent ladder, operator notes as yellow background on glyph cell only, weight (not size) as primary typographic axis.

### 🔵 Opus paradox-hunting pass

1. **Quiet-by-default motion budget** — `MotionController` arbitrates: at most ONE active animation per frame. Fatal-stripe pulse is the only non-static pixel when it fires. Motion is the exception, not the rule.
2. **Quiet-by-default refresh rate** — 0 fps when nothing changed; cap at 30 fps even on local terminal. Save cycles for motion quality.
3. **Hover-whisper discoverability** — every interactive element whispers keystrokes into the status-ribbon on mouse-hover. Replaces cheatsheet modals.
4. **`cargo xtask theme-audit`** — ship BEFORE the theme struct; grep for hard-coded `Color::*` literals, print deficit list, CI fails on growth. Audit is what makes a theme system real.
5. **5-axis hierarchy budget** — `render/AXES.md` declares which of {color, weight, indent, glyph, background} each renderer claims. PR-reject italic/underline outside hover-state.
6. **Verbosity Slider** — `Ctrl+Plus`/`Ctrl+Minus` cycles 0–4 bundling (density × drawer-set × hint-visibility × motion-budget). Replaces 6 toggles with one dial.

### R2 Cross-perspective synthesis

| Theme | 🔴 Codex | 🟡 Sonnet | 🔵 Opus |
|---|---|---|---|
| Theme as system | `SpectralTheme` + `ContrastReport` | High-contrast palette substitution | `xtask theme-audit` migration |
| Capability awareness | `TermCaps` probing | `$TERM_PROGRAM` auto-detect | (validation lens) |
| Motion as constraint | `MotionClock` + reduced-motion | (not addressed) | Quiet-by-default budget, 1-at-a-time |
| Hierarchy in monospace | (not addressed) | Luminance laddering + `▌` + indent | 5-axis declaration as PR-gate |
| Onboarding | (not addressed) | Ambient cheatsheet + microcopy | Hover-whisper affordances |

**Keystone**: Theme system is the linchpin. Codex defines the struct, Sonnet defines the palettes/contrast modes, Opus defines the audit. Without all three: dead struct.

---

## Unified Plan — Three-Week Initiative

### Track A — UI/UX Polish (3 weeks, sequential)

#### Week 1 — Foundation (engine-level)

- `crates/nexus-tui/src/term_caps.rs` — capability probing
- `crates/nexus-tui/src/theme/tokens.rs` — `SpectralTheme` struct
- `crates/nexus-tui/src/theme/loader.rs` — TOML loader + `ContrastReport` WCAG gate
- `xtask/src/theme_audit.rs` — grep deficit auditor + CI hook
- `crates/nexus-tui/src/render/motion.rs` — `MotionClock` + `MotionController` (single-animation arbiter)
- Migrate existing hard-coded colors in `event_line.rs`, `gutter.rs`, `status_ribbon.rs`, `sparkline.rs`, `pressure_meter.rs`, `timeline.rs` to theme tokens

#### Week 2 — Surface polish (visual + textual)

- Severity shape glyphs (`✸ ● ▲ ·`) + `--no-glyphs` flag (Sonnet a11y)
- Luminance laddering pass (Sonnet) — zone bands, ERROR `▌` column-0, indent ladder
- Microcopy table (5 rewrites + sentinel file infra)
- `render/status_ribbon.rs` hover-whisper line — bottom-of-screen single-line affordance hints
- Result-aware FilterIndicator — `47/213 visible · 166 hidden (89% info, 11% warn)`
- True-color gradients via `TermCaps::truecolor` (sparkline, pressure_meter, timeline)
- Braille sub-cell sparkline density

#### Week 3 — Compositional UX

- `Ctrl+±` Verbosity Slider — single dial bundling (density × drawers × hints × motion budget)
- `f`-key Spotlight — progressive filter overlay from selected event
- `Ctrl+D` Density modes cycle (compact/comfortable/prose) as the building block of the Verbosity Slider
- Ambient cheatsheet first-run (Sonnet) — ghost-fade onboarding
- DVR Dwell mode prototype — `/pause` → scrubber + time-jump (only if Week 2 finishes ahead)

### Track B — Capability (3 weeks, can run parallel after Track A Week 1)

#### Phase 1 — Spool foundation

- `crates/nexus-tui/src/stream/spool.rs` — `SpoolWriter`/`SpoolReader` with mmap+zstd segments
- `crates/nexus-tui/src/stream/history.rs` — `trait HistorySource` unified iterator
- Inherits the same `Redactor` instance as the tracing-bridge
- CLI flags: `--spool-dir`, `--spool-max-size`

#### Phase 2 — Replay & time-travel

- `crates/nexus-tui/src/stream/replay.rs` — file reader
- `nexus-tui --replay file.jsonl` mode
- `/replay 14:00..14:05` slash command rehydrating spool window into side-buffer
- `--speed 0x/1x/4x` flag for replay mode

#### Phase 3 — Echo / Suggestion channel

- `NexusEvent::Suggestion { id, command, reason, confidence, expires_at, source_event_ids, cluster }` variant
- `crates/nexus-tui/src/inspector/suggestions.rs` — generators + dedup + expiry
- `crates/nexus-tui/src/inspector/incidents.rs` — Codex's `IncidentCluster` + `IncidentDigest`
- `render/suggestion_line.rs` + `render/suggestion_panel.rs`
- Generators: burst detector, repeated-correlation, unhandled-fatal
- Loop hazard guard: suggestions don't generate further suggestions

### Defer (explicit list)

- **MCP server mode** — dropped by user
- **Docking layout system** — high cost, low immediate UX delta vs. Verbosity Slider
- **Helix keymap personalities** — power-user niche; revisit if requested
- **Kitty/Sixel graphics** — no demonstrated need
- **WASM-pluggable heuristics** — wait until Echo/Suggestion has 6+ months of usage data
- **NU plugin** — wait until snapshot schema is fully stable (post Track B)
- **Stage / Board layout primitive** — superseded by Verbosity Slider in immediate roadmap
- **Hot-reloaded Operator Profiles** — wait until theme system + verbosity dial both ship

### Honourable mentions — slot opportunistically

- OSC-133 prompt marks (1h, free WezTerm/iTerm/Ghostty integration)
- OSC-52 clipboard copy of event IDs / correlation URLs / snapshot paths (gated by `TermCaps::osc52`)
- `/note <text>` operator-as-event-source (~30 LOC; visual yellow-stripe landmarks)
- Hover trails (mouse-hover an event → dim-trail prior N in same correlation)
- Slash preview (resolved-consequence preview below prompt during tab-complete)

---

## Risks & Sharp Edges

- **Windows mmap segment rotation** — zstd is block-mode, not append-stream. Rotate-then-compress with atomic rename (reuse existing `/snapshot` code path).
- **Redaction at the spool boundary** — never write a raw `tracing` event to disk; inherit the bridge's allowlist.
- **Schema versioning** — `NexusEvent` will evolve. Reader uses `#[serde(other)]` for unknown variants and emits a `tui_self::warn` event on skip.
- **Theme migration is mechanical but tedious** — the audit must run BEFORE the tokens land, or the tokens become aspirational. Treat the audit deficit list as the source of truth for migration progress.
- **Verbosity Slider preset design** — must be intentional, not "just hide stuff." Each level (0–4) should correspond to a recognizable mental state ("screen-share / scrollback / working / debug").
- **Motion budget enforcement** — `MotionController` needs a hard cap or it degenerates back to per-widget timers. Single-active-animation rule must be unit-tested.
- **A11y verification** — WCAG AA luminance gate is the only mechanical guard; manual screen-reader testing (NVDA + Windows Terminal) belongs in Week 2 acceptance.

---

## What "done" looks like

After 6 weeks (3 wk Track A + 3 wk Track B, parallel after week 1):

- nexus-tui has a real theme system anyone can fork to `~/.config/nexus-tui/theme.toml`
- Color-blind users get full signal via shape glyphs + `--no-glyphs` fallback
- First-run is graceful, microcopy is honest, every interactive element whispers its keystroke
- Motion is rare and meaningful — when something pulses, it matters
- The Verbosity Slider lets a user dial from "incident war-room" to "screen-share demo" with one chord
- Snapshots are shippable diagnostic artefacts that replay through the same renderer
- Heuristics produce *suggestions*, not just descriptions — one keystroke runs the recommended command
- WCAG AA contrast is mechanically enforced; CI fails on regressions

---

## Hand-off

Next workflow: `/octo:embrace` — Double Diamond (Research → Define → Develop → Deliver) on the unified scope above. Embrace will:
- **Discover**: validate the assumptions in this brainstorm against the actual codebase (e.g., does `MotionController` conflict with existing render order? are there hidden hard-coded colors the audit will miss?)
- **Define**: tighten this plan into a spec (likely Spec 045)
- **Develop**: implement Track A Week 1 foundation first
- **Deliver**: verify with cargo + manual smoke + screen-share demo
