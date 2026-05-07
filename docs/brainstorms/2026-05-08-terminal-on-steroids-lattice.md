# Brainstorm — Terminal-on-Steroids GUI for nexus-dnn

**Date:** 2026-05-08
**Mode:** Multi-AI (Claude + Codex via shared-runtime plugin)
**Session entry:** `/octo:brainstorm "lets brainstorm current when run the app it runs within terminal but for the sake of better styling do u think we can design our own custom gui which simulates terminal but is on steroids"`
**Target:** A nexus-dnn surface (worker/runtime/installer streams currently terminal-bound)
**Vibe:** All four — cinematic + interactive widgets + spatial/canvas + live/ambient

---

## ⚠ AMENDMENT (2026-05-08, post-brainstorm clarification)

User clarification: **the GUI is a desktop app simulating a terminal — not a real PTY-backed terminal.** Terminal is a *theme*; the substrate is fully graphical. Aesthetic register: **Modern neo-terminal** (Warp / Posting / Arc command-bar / Linear / Raycast) — mono primary, spectral accents, glassmorphism for floats, **no box-drawing characters**.

### What this kills (good)

- **No xterm.js, no ANSI parser, no `FD=3` sideband.** The Codex "compat lane" pillar was solving a problem we don't have. There's no PTY to be compatible with — we own every worker, we control every IPC packet.
- **No "raw terminal drawer" fallback.** Rosetta Lane survives, but as another graphical view, not a real terminal escape hatch.
- **No tension between ops grep-ability and rich UI.** Plain text logs to a file for ops can stay completely separate, with zero impact on the desktop app's protocol. Two independent surfaces.

### The new atom: **the Block**

Replaces both *line* (terminal's wrong atom) AND *page* (web's wrong atom for streaming/ops apps). What Warp got right and nobody's copied properly.

- Self-contained, collapsible, pinnable, share-as-link
- **Prompt-style header**: `$ run llama3-8b --layers 67 --kv-reuse` — clickable to copy as CLI command
- Hosts one structured event stream + zero-or-more inline widgets (the Lattice is just a widget that lives inside a `model load` Block)
- Stacks vertically by default (preserves terminal mental model); pops to split panes on demand (Ableton Session view)
- Each Block gets a 4-char mnemonic for `⌘K` addressability
- Collapses to one-line summary: `$ load llama3-8b — 67/70 GPU + 3 CPU — 4.2 GB VRAM`

### Modern neo-terminal inhabits Spectral Graphite

- **Breadcrumbs become prompts**: `~/runs/2026-05-08/llama3-8b $` at the top of every page. Directly evokes terminal cwd; doubles as filesystem mental model.
- **`⌘K` is the primary nav, not a power-user secret** — *the* way to move. Bloomberg's `<GO>` graduates from deferred to first-class.
- **One cursor at a time**: blinking block-cursor primitive is the focal animation. Indicates active panel / focused stream / live tail. Every other motion is dimmer than the cursor — cockpit principle enforced by hierarchy.
- **No box-drawing characters anywhere.** Panels delineated by spacing + subtle background tint + top-edge spectral glow on focus. This separates *modern* neo-terminal from Charm/Bubbletea retro.
- **Spectral accents = syntax-highlighting** for severity, phase, lease-state, runtime hues. Pulse-Floor reads as a syntax-highlighted telemetry stream.

### Lattice + Ladder under this aesthetic

- Cells: graphite-fade pending, spectral-violet resident, spectral-amber cpu-offload, spectral-red error. **No grid lines.** Spacing + background tint delineates.
- Sweep cursor = the same blinking-cursor primitive used app-wide. Reused, not bespoke.
- Ladder detents: `01 BYTES / 02 TENSORS / 03 PHASES / 04 STORY` (mono numerals — Spectral Graphite section-numbering idiom from spec 037).
- The Lattice is itself a Block.

### Tauri shell — the obvious move

- Existing host crates expose IPC commands directly to the frontend; drop axum HTTP for desktop build (keep for headless/dev). Frontend `fetch('/api/...')` → `invoke('cmd_...')` — one adapter swap.
- Worker IPC simplifies to local sockets / Tauri channels. No localhost binding, no SSE keepalive complexity.
- **System-tray presence** unlocks always-on host: deps installed, leases warm, models pre-loaded, no window required. Web app can't do this without a separate daemon.
- Custom titlebar with prompt-style breadcrumb. Traffic-light buttons or custom close affordance.
- ~1-2 days to wrap. Hard work (React app, design system, IPC contract) already done.

### Sections below now read with this lens

- The **substrate** section (RunEventItem schema, hot/warm/cold store, `seq` numbers, `gap` events) is **kept entirely** — those concerns survive the desktop reframe.
- The **`NEXUS_EVENT_FD=3` sideband** + **ANSI compat lane** + **xterm.js drawer** subsections are **superseded** — not needed once we own both ends of every worker pipe.
- Everything about **Lattice / Ladder / Pulse-Floor / Scope Capture / failure-mode visualization / idle-state inspector** is **kept verbatim** — these were always graphical primitives, never terminal primitives.
- The **scraper** section is still relevant: llama.cpp's stderr is the one stream we *don't* own end-to-end (binary upstream), so scraping its existing format remains the cheap path.

---

## ⚠ AMENDMENT II — Aesthetic specification (2026-05-08)

Within Modern neo-terminal, four axes locked:

| Axis | Choice |
|---|---|
| Density | **Bloomberg-dense** — 4px spacing base, every pixel earns its keep |
| Motion temperament | **Kinetic Observatory** — continuous gentle motion as design language |
| Cursor personality | **Modern block with phosphor inner glow** — pulses (no blink), always-on |
| Surface texture | **Phosphor glow on active** — inset only, never outer halo |

### One-sentence characterization

**A dense Bloomberg-coded operations console living underneath a continuous, breathing layer of ambient telemetry, with a single phosphor-glowing block cursor as the eye-anchor — terminal heritage in the rhythm, Kinetic Observatory in the atmosphere.**

### Tensions and how they resolve

**Bloomberg-dense vs Kinetic Observatory.** Bloomberg is traditionally static (refresh-on-event, no ambient motion). Resolution: **motion lives in peripheral layers; primary content stays discrete.** Block headers, log lines, Lattice cell states are dense and step-snapped. Continuous motion reserved for Pulse-Floor, header sparklines, cursor pulse, persistence-fade transitions. **Atmosphere moves; content commits.**

**Kinetic Observatory vs cockpit principle.** The cockpit principle forbids decorative animation. Resolution: **all continuous motion encodes real data.** Cursor pulse rate maps to system activity. Sparklines reflect actual metrics. Pulse-Floor is real telemetry. The "observatory" is observing *something*; it's never wallpaper. **This is the rule that keeps the aesthetic out of pretty-museum territory.**

**Bloomberg-dense vs phosphor glow.** Outer halos eat pixels. Resolution: **inset glow only**, 1-2px inner radius, ~30% opacity. Glow lives inside the boundary, never bleeds outward.

### Per-surface rules

**Block**
- Inactive: 4px padding, flat graphite, mono header, no glow, no border
- Active: inner phosphor glow (spectral-violet, 2px inset, fade-in ~150ms)
- Collapsed: one-line `$ ...` summary with 4px inline sparkline of primary metric (tok/s, MB/s, layer count) — Pulse-Floor pattern miniaturized into the header. Block stack reads as a stack of *living* prompts.
- Each Block has a 4-char `⌘K` mnemonic + a "color identity" (its assigned spectral accent for glow + sparkline)

**Lattice**
- 12-14px cells, 4px gaps. Fits 70×5 in compact space.
- Resident cells: spectral-violet, **continuous breathing pulse** ~2s cycle, ±10% opacity (the model is "alive" while loaded)
- Sweep cursor: phosphor glow on actively-loading cell, fades to resident-state over 600ms
- **Pulse rate of resident cells modulates with inference activity** — cells breathe faster during generation, slow at idle. The Lattice is a heartbeat monitor for the model.

**Cursor**
- Modern block, spectral-accent inner glow, ~1Hz pulse (opacity 70%↔100%, never zero — no blink, only breath)
- One cursor active at a time across the entire app — owned by focused Block, or by `⌘K` when invoked
- **Pulse rate encodes system load:** 1Hz at rest, 2Hz under generation, 3Hz during model load. The cursor is itself a system gauge.

**Pulse-Floor**
- 4px tall along bottom of every page, 4 stacked translucent traces (VRAM / RAM / leases / tok/s)
- Phosphor glow on each trace's active leading edge
- Continuous (Kinetic Observatory) but data-driven (cockpit principle)
- Dark-and-slow during health; becomes the brightest thing on screen during anomaly

**Typography**
- Mono ~12-13px for log streams, Block headers, Lattice labels (Bloomberg territory). Candidates: **Berkeley Mono** (warm, distinctive — paid), **JetBrains Mono** (safer, free, broad), **Commit Mono** (modern, free)
- Sans pairing only for eyebrows / page titles (matches existing Spectral Graphite dual typography)
- Single weight policy on mono
- Italic reserved for "system commentary" (State-Echo banner, error explanations, suggestions)

### Out of scope (firmly)

- Scanlines, CRT bow distortion, retro phosphor green
- Box-drawing ASCII characters as separators
- Soft pastels, large decorative illustrations, emojis
- Sounds (not asked for; not proposed)
- Outer glow halos (density would die)
- Multiple cursors on screen at once

---

## Starter token set (vanilla-extract preview)

These are *new* tokens this aesthetic needs that Spectral Graphite doesn't already have. Sketch only — names/values to be tuned during spec drafting.

```ts
// apps/web/src/styles/tokens/terminal.css.ts (new file)

import { createGlobalTheme } from "@vanilla-extract/css";

export const terminal = createGlobalTheme(":root", {
  cursor: {
    pulseRest:    "1000ms",   // at-rest breath cycle
    pulseActive:  "500ms",    // during generation
    pulseLoad:    "333ms",    // during model load
    opacityMin:   "0.70",
    opacityMax:   "1.00",
    glowColor:    "var(--spectral-violet)",
    glowRadius:   "2px",
    glowOpacity:  "0.30",
  },

  phosphor: {
    insetRadius:  "2px",
    insetOpacity: "0.30",
    fadeIn:       "150ms",
    fadeOut:      "300ms",
  },

  block: {
    paddingDense: "4px",      // Bloomberg-dense base
    paddingHead:  "6px 8px",
    gapStack:     "4px",      // between blocks
    gapInline:    "8px",      // within header row
    headerHeight: "24px",
    sparklineH:   "4px",
  },

  lattice: {
    cellSize:        "13px",
    cellGap:         "4px",
    breathCycle:     "2000ms",
    breathAmplitude: "0.10",  // ±10% opacity
    sweepFade:       "600ms",
    insetGlow:       "var(--phosphor-inset-radius) var(--spectral-violet)",
  },

  pulseFloor: {
    height:        "4px",
    traceCount:    "4",       // VRAM / RAM / leases / tok/s
    traceOpacity:  "0.45",
    leadingGlow:   "0.70",    // phosphor on the leading edge
    anomalyBoost:  "1.80",    // multiplier when system is in distress
  },

  state: {
    pending:     "var(--graphite-500)",        // dim
    resident:    "var(--spectral-violet)",     // primary "ready"
    loading:     "var(--spectral-violet-700)", // mid-saturation during load
    cpuOffload:  "var(--spectral-amber)",
    error:       "var(--spectral-red)",
    activeGlow:  "var(--spectral-violet)",
  },

  type: {
    mono:        "Berkeley Mono, JetBrains Mono, Menlo, monospace",
    monoStream:  "12px",       // log streams, Lattice labels
    monoHeader:  "13px",       // Block headers, prompt breadcrumbs
    monoCompact: "11px",       // sparkline labels, mnemonics
    italicRole:  "system-commentary", // semantic, not visual — reserved use
  },

  motion: {
    snapTransition: "120ms",   // discrete state changes (cell loaded, block focused)
    ambientSlow:    "2000ms",  // resident-cell breath
    ambientFast:    "500ms",   // active sparkline updates
    persistFade:    "600ms",   // oscilloscope-trail fade
  },
});
```

### Component-level CSS rules these tokens drive

```ts
// Block, focused state
selectors: {
  '&[data-focused="true"]': {
    boxShadow: `inset 0 0 0 ${vars.phosphor.insetRadius} color-mix(
      in oklch,
      ${vars.state.activeGlow} ${vars.phosphor.insetOpacity},
      transparent
    )`,
    transition: `box-shadow ${vars.phosphor.fadeIn} ease-out`,
  },
}

// Lattice cell, resident state with breathing pulse
'@keyframes': {
  latticeBreath: {
    '0%, 100%': { opacity: 1.0 },
    '50%':      { opacity: `calc(1 - ${vars.lattice.breathAmplitude})` },
  },
}

// Cursor primitive (single component, pulse rate as a CSS var consumed from JS)
.cursor {
  width: 0.6em; height: 1em;
  background: var(--spectral-violet);
  box-shadow: inset 0 0 var(--cursor-glow-radius) var(--spectral-violet);
  animation: cursorBreath var(--cursor-pulse-rate, ${vars.cursor.pulseRest}) ease-in-out infinite;
}
```

### Token-naming convention note

These tokens deliberately use **role names** (`pending`, `resident`, `cpuOffload`) not **color names** (`violet`, `amber`, `red`). The spectral-color tokens stay in the Spectral Graphite primitive layer; the terminal aesthetic adds a **semantic layer on top**. This keeps the Lattice retargetable if Spectral Graphite ever shifts hue policy.

---

## Hidden Thesis

**Stop redesigning "the terminal." Build a cockpit where the terminal is a drawer, not the floor.**

Every fancy-terminal attempt (Warp, Hyper, Charm, k9s, btop, Codespaces) decorates the line buffer instead of dissolving it. **The line is the wrong atom.** Logs aren't a stream — they're an emergent narrative of state transitions, and 99% of "lines" are a flat projection of a richer underlying graph.

The right substrate is a **structured event protocol** + **virtualized event store**. On top of that substrate, the cinematic / spatial / ambient ideas become 2-3 days of frontend work each. Without it, they're impossible.

---

## Multi-Perspective Analysis

### Provider Contributions

| Provider | Key Contribution | Unique Insight |
|---|---|---|
| 🔴 Codex | Implementation tactics: `RunEventItem` discriminated union, `NEXUS_EVENT_FD=3` sideband, hot/warm/cold tiered store, `@xyflow/react` run map, ANSI as compat metadata only | The `FD=3` trick — workers emit human-readable stdout + machine JSONL on FD 3, so `2> worker.log` still works for ops. The single most elegant idea in either response. |
| 🔵 Claude | Pattern dissection: line-as-wrong-atom, five paradoxes (linearity-trap, density-vs-legibility, illustration-as-noise, trust-gap, replayability), non-terminal contrast mining (Ableton, Bret Victor, Bloomberg, oscilloscopes, MRI consoles) | The cockpit-with-terminal-as-drawer framing keeps the team out of "prettier xterm" mode. Identifies 5 "organs" of the dead terminal that each want a different home in a GUI. |

### Convergence — both voices independently arrived at:

| Concept | Codex name | Claude name |
|---|---|---|
| Structured events as substrate | `RunEventItem` discriminated union | "dissolve the line" |
| Spatial / graph overview | `@xyflow` run map | Minimap + Lattice |
| Inline rich rows | widget registry | log-as-narrative |
| Raw text as fallback only | xterm.js compat drawer | Rosetta Lane |
| Ambient telemetry that earns its motion | HUD with `prefers-reduced-motion` | Pulse-Floor + cockpit principle |
| Cinematic milestones | milestone cards | "5 acts of model load" |

Neither voice was prompted with the other's frame. They agree on the substrate.

### Divergence

**Codex-only (tactical depth):**
- `NEXUS_EVENT_FD=3` sideband — preserves pipe-to-file ergonomics
- Hot/warm/cold tiered store with synthetic `kind: "gap"` on dropped events (WS backpressure)
- Schema versioning (`nexus.run-event.v1`) + monotonic `seq` numbers
- Coalesce WS messages into rAF batches
- Aggressive `flush=True` for Python workers

**Claude-only (conceptual):**
- **Ladder Slider** (Bret Victor) — user-controlled abstraction rung
- **Mnemonic address bar** (Bloomberg `<GO>`) — speed of address
- **State-Echo banner** — current intent in plain English every render frame
- **Scope Capture** — every error auto-freezes a debuggable artifact
- **Pulse-Floor** — 4px ambient band as brand identity

---

## Five Concept Names Worth Keeping

1. **The Stream-to-Scene Seam** — the boundary where flat log lines transition into structured visual entities
2. **Telemetry Aurora** — peripheral motion reflecting health without demanding attention
3. **Log-as-Narrative** (vs Log-as-Trace) — acts/characters/reversals instead of mechanical exhaust
4. **The Rosetta Lane** — side-by-side raw text scrolling lock-step with structured visuals (solves trust gap)
5. **State-Echo** — surfacing current *intent* every render frame, not just on log emission

---

## Architecture Spine (the substrate everything else stands on)

### Event protocol

Worker emits versioned, seq-numbered structured events:

```ts
type RunEventItem =
  | { kind: "line";     id; ts; seq; source; stream; severity; ansi?; text; spans?: Span[] }
  | { kind: "phase";    id; ts; seq; phase; state; progress?; summary? }
  | { kind: "metric";   id; ts; seq; name; value; unit; window? }
  | { kind: "artifact"; id; ts; seq; path; mime; preview?: PreviewRef }
  | { kind: "widget";   id; ts; seq; widget: "download"|"kv_cache"|"token_rate"|"file_tree"|"lattice"; props }
  | { kind: "gap";      id; ts; seq; from_seq; to_seq; reason };
```

`{ schema: "nexus.run-event.v1", seq, ... }`. Monotonic `seq` (worker-side counter) — wall-clock collides under bursty stdout.

### Transport (the elegance hinge)

Three tiers, in priority order:
- **Best:** human stdout/stderr + structured JSONL on FD 3 via `NEXUS_EVENT_FD=3`. `2> worker.log` still works.
- **Good:** JSONL on stderr with RS prefix `\x1eNEXUS\t{...}`. Plain redirect captures both.
- **Acceptable:** plain JSONL where every record includes `"message"` so `jq -r .message` stays tolerable.

Never require Nexus-only decoder to understand a failure log. One event per line. Python workers use aggressive `flush=True` (or downloads look frozen).

### Frontend store

Hot/warm/cold:
- **Hot**: in-memory ring, last ~2k visible items
- **Warm**: IndexedDB window for current run history
- **Cold**: persisted raw logs/artifacts on disk, range-fetched

Coalesce WS into rAF batches. `@tanstack/react-virtual` with stable IDs and dynamic measurement. Synthetic `kind: "gap"` on dropped events — **never silently lie about state**.

---

## Five Surface Ideas (ranked by leverage)

### 1. The Lattice (model-load proof point) — DEEPEST DIVE

A 2D grid where the model load reveals itself spatially.

```
                   embed   attn    ffn     norm    kv-cache
        layer 0    ████    ████    ████    ████    ████      ← ready (full saturation)
        layer 2    ████    ████    ░░░░    ░░░░    ░░░░      ← sweep cursor here
        layer 67   ░░░░    ▒▒▒▒    ▒▒▒▒    ░░░░    ░░░░      ← amber: CPU-offloaded (spec 039)
        layer 68   ░░░░    XXXX    ░░░░    ░░░░    ░░░░      ← red: VRAM OOM
```

- **Y axis**: layer index (0..N-1) + 3 aux rows (vocab/embed/output)
- **X axis**: tensor groups `{embed, attn, ffn, norm, cache}`
- **Cell state**: `pending | allocating | loading | ready | error | cpu-offloaded`
- **Sweep cursor** at the loader's head; **persistence trail** fades behind (oscilloscope steal)
- **Pulse-Floor inside the widget**: translucent vertical fill = `bytes_loaded / total_bytes`
- **Idle state = same widget, sweep removed**: becomes a tensor-browsing inspector

### 2. Ladder Slider (Bret Victor) — same data, four projections

| Rung | Audience | Render |
|---|---|---|
| **Bytes** | "is the disk slow / is the file corrupt?" | GGUF as horizontal band, file offset cursor, tensor boundaries |
| **Tensors** | "where exactly is VRAM going?" | The Lattice |
| **Phases** | "how far in?" | 5-act timeline: discover → header → tokenizer → tensors → kv-reserve → warmup → ready |
| **Story** | demo viewer | State-Echo banner: *"Loading attention K/V for layers 60–70 — 1.2 GB VRAM remaining"* |

Keyboard `1-4` jumps rungs. Default detent = **Phases** (the fattest part of the audience curve).

### 3. Pulse-Floor (highest leverage-to-effort)

4px translucent band along the bottom of every page in the app. Stacked translucent waveforms: VRAM, RAM, active leases, tok/s. Dark and slow during health, brightest thing on screen during distress. **~20 LOC + 1 SWR subscription.** Replaces the need for any "system status" page. Makes the entire app feel like a cockpit.

### 4. Scope Capture (oscilloscope trigger mode)

Every cancellation/error freezes a 5s window of stdout/stderr/telemetry/lease-state into a scrubbable card. Pin favorites, diff against successful runs. Turns errors into a learning corpus and the perfect bug report attachment. Near-free given the seq-numbered hot store.

### 5. Mnemonic Address Bar (Bloomberg `<GO>`)

Persistent 4-char field, top-right. `LLMA` `<GO>` → llama.cpp lattice. `TTSV` → TTS voices. `LEAS` → lease panel. Restores terminal-class navigation speed *over* a non-terminal UI. Defer until ≥6 panels worth navigating to.

---

## Lattice — Failure-Mode Visualization

The widget's diagnostic power = each failure class has a distinct shape:

| Failure | Shape | Side panel |
|---|---|---|
| **VRAM OOM** | one red cell + downstream amber flash | OOM tensor metadata + suggested action *"Try `n-gpu-layers ≤ 67` or `n-cpu-moe 1`"* |
| **Spec-039 `n-cpu-moe`** | amber column at FFN group, offloaded layers only | "did the offload do what I asked?" answered by shape alone |
| **Slow disk / mmap pressure** | sweep cursor stalls, persistence trail darkens, Pulse-Floor flatlines | three independent visual cues, robust against any one being missed |
| **Checksum / corrupt download** | red cell + Bytes rung marks the byte range red | actionable: *"Tensor at offset 0x4A2B1000 failed CRC — re-download"* |
| **Quantization mismatch** | entire row of red across all layers at one tensor group | unmistakable horizontal stripe — users learn "row of red = quant problem" within one occurrence |

Failures that can't be coordinate-pinned go to a small "Pre-Lattice" status row above the grid, deliberately separated.

---

## Lattice — Idle-State Inspector

After `model.load.phase: ready`, same widget, sweep removed, cells go to resident saturation. Pulse-Floor switches from "bytes/sec loading" to "tokens/sec generating". **One widget, two lifecycles.**

Cell click → right-side drawer, three tabs:
- **Tensor**: name, shape, dtype, bytes, GGUF offset, gpu|cpu placement
- **KV**: cache cells only — sequence count, reserved tokens, cache-reuse hit rate (spec 039)
- **Edit**: per-layer placement override; drag cell from GPU → CPU column → preview new VRAM headroom → Apply emits `RuntimeTuning` patch + reload

The **Edit tab is the hidden killer feature**: spec 039 currently lets you set `n-cpu-moe` at load time only; the inspector turns the Lattice into a direct-manipulation editor of layer placement.

---

## Worker Event Scraper (zero upstream patches)

`crates/nexus-backend-runtimes/src/llamacpp/log_pipeline.rs`. Compiled regexes + small state machine over llama.cpp's existing stable stderr:

```
llm_load_tensors: offloading 67 repeating layers to GPU   → emit phase + n-gpu-layers
llm_load_tensors:   CUDA0 buffer size = XXX MiB           → emit metric.vram_reserved
llm_load_tensors: tensor 'blk.23.attn_q.weight' (...)     → emit tensor.allocate { layer:23, group:"attn.q" }
llama_kv_cache_init: layer N: ...                          → emit kv_reserve
```

Coalesce per rAF: ≤1 event of any `kind` per `seq` window; >50 `tensor.allocate` events in one interval merge to `tensor.allocate.batch { layer_range, group, count }` (saves IndexedDB from quadratic growth on big models).

Schema-version every event. Worker-side `seq` counter (not wall-clock). On dropped events emit `kind: "gap"` and grey out affected cells with a "?" — never silently lie. Detect format drift: emit `kind: "scraper_unknown" { line }` so we can grep telemetry later and update patterns proactively.

**Net: ~150 LOC, zero upstream patches, future-proof against llama.cpp churn.**

---

## Six Worker Events Drive Everything

```rust
model.load.begin     { run_id, gguf_path, layers, bytes, backend, kv_plan }
model.load.phase     { phase: header|tokenizer|tensors|kv_reserve|warmup|ready }
model.load.tensor.allocate { layer, group, bytes, target: gpu|cpu }
model.load.tensor.ready    { layer, group, t_ms }
model.load.error     { layer?, group?, kind: oom|io|checksum, message }
model.load.metric    { vram_used, ram_used, bw_mbps }   // ~10Hz, rAF-batched
```

All six are `RunEventItem` instances. Six events → entire Lattice + Ladder + idle inspector + failure-mode visualizations.

---

## Implementation Slice (estimate)

```
apps/web/src/components/runtime/model_load_lattice/
├── lattice.tsx              ~150 LOC, vanilla-extract grid
├── lattice.css.ts           cell states + sweep + persistence fade
├── ladder.tsx               4-detent vertical slider, motion/react spring
├── projections/
│   ├── bytes_view.tsx       (Stage 2 — niche audience)
│   ├── tensors_view.tsx     ← the Lattice itself
│   ├── phases_view.tsx      5-act timeline (Pill row + progress)
│   └── story_banner.tsx     single-line State-Echo
└── inspector_drawer.tsx     idle-state cell click → tensor metadata + Edit tab
```

Worker side:
```
crates/nexus-backend-runtimes/src/llamacpp/log_pipeline.rs   augment scraper
crates/nexus-backend-runtimes/src/events.rs                  new event variants
```

**~2 days for substrate + Tensors + Phases + Story rungs (the 80% audience).** Bytes rung deferred. Once shipped, every other long-running operation in the app (TTS synth, dep installer, GGUF probe, archive extract) inherits the pattern by analogy.

---

## Cross-Provider Patterns

- **Both voices independently identified the line as the wrong atom.** Strong signal — this is the move.
- **Both voices independently picked spatial/canvas overview as a primary surface.** xyflow + Lattice converge on the same idea.
- **Both voices independently insisted on a raw-text fallback being always available.** Trust gap is real.
- **Codex deepens the protocol; Claude deepens the perceptual experience.** Use both — protocol without aesthetic = ugly cockpit; aesthetic without protocol = pretty terminal skin. The combination is the unlock.

---

## Open Questions / Carve-Outs

1. **Worker-protocol churn** — forcing TTS / dep installer / scanner to emit structured events is a cross-cutting refactor. Mitigation: stage 1 stderr-scrape (Lattice prototype), stage 2 first-class instrumentation per-worker as each is touched.
2. **Density loss** — Lattice is 6× the screen real estate of a progress bar. Earned back by Ladder Slider (user-controlled rung) and idle-state reuse.
3. **Trust gap** — every visualization is a translation, and translations lie. Mitigation: Rosetta Lane (raw text always one click away), `kind: "gap"` events make drops visible, `kind: "scraper_unknown"` makes drift visible.
4. **Cinematic noise vs signal** — cockpit principle: every glowing pixel must change during anomaly. Audit motion against this rule before shipping.

---

## Next Steps

- [ ] Convert to `/speckit-specify` draft for a new feature spec (Lattice + Ladder + 6-event protocol + log_pipeline scraper extension)
- [ ] Identify which existing spec (likely 039 or a new 042) this aligns with
- [ ] Decide on Stage 1 audience: model-load only? Or also TTS synth as a parallel proof point?
- [ ] Designer review: does Spectral Graphite have a CSS token for "amber attention" state, or do we add one?

---

*Generated via `/octo:brainstorm` Team mode, 2026-05-08. Codex (technical feasibility) + Claude (pattern spotter / synthesis).*
