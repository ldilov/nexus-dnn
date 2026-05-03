# Feature Specification: EmotionTTS Recipe Studio

**Feature Branch**: `038-emotiontts-recipe-studio`
**Created**: 2026-05-03
**Status**: Draft
**Input**: User description: "EmotionTTS UI redesign + voice/audio editing functionality enhancement — current recipe screen layout is cramped and unclear, audio editing capabilities are nearly absent. Reference design assets at C:\Users\lazar\Downloads\NexuDNN.zip. Spec must drive both visual restyle (extending Spectral Graphite from spec 037) AND new functional capabilities (per-utterance audio edits, voice asset waveform manipulation, advanced emotion control surfaces)."

## Overview

Spec 037 extended the Spectral Graphite design system across the host shell and gave EmotionTTS a token-bridge so its surfaces inherit canonical design tokens. The actual EmotionTTS recipe screen, however, was only superficially restyled — its layout, information architecture, and feature set still reflect the pre-Spectral-Graphite era. The screen reads as cramped, the radar chart and its side surfaces clip on common laptop widths, and the rich audio-editing capabilities the worker landed in spec 036 (`audio_edit/` subpackage, edit-chain endpoints, audit log) are entirely invisible to the operator. Per-utterance fine control after a generation is only available through manual JSON edits to mappings.

This feature replaces the EmotionTTS recipe screen with a deliberate, editorial **Recipe Studio** surface that:

1. Adopts the reference design's vertical-stacked section anatomy (Script → Parsed dialogue → Cast → Emotion → Performance → Recent runs) so each surface breathes full-width and the radar chart never clips.
2. Surfaces the spec 036 audio-editing pipeline as a first-class per-utterance and per-voice-asset workflow — waveform display, transport controls, loop region, trim/normalize/fade/gain operations, edit-chain history, undo/redo, with non-destructive cache-key-aware re-execution.
3. Adds advanced emotion control: interactive 8-axis radar drag, axis chips with live values, dominant-axis readout, save-current-as-preset composer, custom preset library with deletion, Qwen prompt → vector mapping, alpha global mix.
4. Repairs responsiveness — content reflows cleanly at 320 / 768 / 1024 / 1440 / 1920 viewport widths with no clipping of labels, radar axes, or override hint text.

The visual language is bound to the spec 037 token contract — no new accent palette, no new density scale, no new typography. The reference design (`NexuDNN.zip`) is the structural and compositional source of truth; production token names from spec 037 supersede any literal CSS values in the reference.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Recipe Studio renders without clipping at every viewport (Priority: P1)

An operator opens an EmotionTTS deployment's recipe screen on any common viewport (320 / 768 / 1024 / 1440 / 1920 px wide). Every section's content — script editor, parsed-dialogue rows, cast cards, radar chart with its 8 axis labels, emotion chips, performance sliders, pre-flight diagnostics, recent-run rows — remains fully visible and operable. No labels are clipped (e.g., "rprised" instead of "surprised"), no overlay text overflows its container, no panel falls below its minimum readable width.

**Why this priority**: This is the loudest current defect. The screen is unusable at common laptop widths today; users see clipped labels and cut-off panels in the very first screenshot they take. Without this, no other improvement registers as quality.

**Independent Test**: Open the EmotionTTS recipe screen at each of the five viewport widths in the redesigned shell, take a screenshot of each, and verify (a) all axis labels are fully visible on the radar; (b) the per-line override hint box does not overflow; (c) the script editor and emotion radar do not stack into less than the minimum readable column width; (d) deployment header chips do not wrap unintelligibly.

**Acceptance Scenarios**:

1. **Given** a deployment recipe is loaded at 1024 px viewport width, **When** the Emotion section is in `vector` mode, **Then** all 8 radar axis labels (`happy`, `angry`, `sad`, `afraid`, `disgusted`, `melancholic`, `surprised`, `calm`) render in full without clipping or truncation.
2. **Given** the recipe is loaded at 1440 px width, **When** the operator scrolls to the Performance section, **Then** the three performance sliders (`Intensity`, `Pace`, `Pitch`) display their current values + units (`%`, `×`, `st`) without overlap.
3. **Given** the recipe is loaded at 768 px (tablet) width, **When** sections that were side-by-side at desktop reflow to vertical, **Then** the script editor remains at least 480 px tall and never collapses to a single line.
4. **Given** the recipe is loaded at 320 px width, **When** the operator interacts with the radar chart, **Then** the chart shrinks proportionally without overlapping its side readout (which moves below the chart at this breakpoint), and drag interactions still work via touch.

---

### User Story 2 — Per-utterance audio editing surface (Priority: P1)

After a batch generation completes, the operator wants to fine-tune one specific utterance — trim a leading silence, normalize loudness, apply a fade-out, or shift gain by 2 dB — without re-running the whole batch. The Recipe Studio (or the run-detail view it links to) shows each utterance as a card with a waveform, transport controls, and an edit-chain panel. The operator builds an ordered chain of declarative edits (each with parameters), previews the result via cached re-execution, accepts the chain, and downloads the edited WAV. The chain is serialised, persisted, and reusable; running the same chain on a different utterance is one click.

**Why this priority**: The spec 036 worker pipeline already implements every operation (`trim`, `crop`, `gain`, `normalize`, `fade_in`, `fade_out`, `silence_pad`, `silence_strip`, `pitch_shift`, `tempo`) plus the audit log — but none of it is reachable from the UI today. The capability gap is the user's primary complaint ("almost no voice/audio modifications"). Without this, the spec 036 backend remains dead code from the operator's perspective.

**Independent Test**: After a successful batch run, the operator opens any utterance, applies a `trim 0.0..2.4s` then a `normalize -16 LUFS` then a `fade_out 200ms` chain, previews the result (cached after first run), and downloads the edited WAV. The exported file's loudness (LUFS), duration, and waveform shape match the chain semantics. The chain JSON is visible and copy-pasteable.

**Acceptance Scenarios**:

1. **Given** a batch run completed with at least one utterance, **When** the operator opens the run detail and clicks an utterance card, **Then** a waveform panel appears showing the utterance's audio with transport controls (play/pause, skip prev/next, rewind, loop region) and a 0-indexed scrub timeline.
2. **Given** an utterance with no edits, **When** the operator adds a `trim` operation with `start=0.10s, end=2.40s`, **Then** the waveform updates to show the trimmed region, the duration readout updates, and a new edit-chain row is appended showing `01 / TRIM 0.10 → 2.40`.
3. **Given** an edit chain with two operations, **When** the operator removes the first operation, **Then** the chain re-orders, the cache key changes, and the second operation re-executes on the original (untrimmed) audio.
4. **Given** an edit chain with results cached, **When** the operator re-opens the same utterance hours later, **Then** the chain loads from persistence, the waveform preview is served from cache (no re-execution), and the edit history is intact.
5. **Given** a chain that produces an output, **When** the operator clicks `Download WAV`, **Then** the browser downloads a file whose audio matches the chain's deterministic output (verified by content hash match against the cached preview).
6. **Given** the operator wants to undo a recently-added operation, **When** the operator clicks `Undo` on the edit chain, **Then** the most recent operation is removed (not soft-deleted — fully removed) and the chain re-executes accordingly.

---

### User Story 3 — Cast voice mapping inline in the recipe screen (Priority: P1)

The operator authors the script and immediately sees which characters need a voice mapping, with unmapped characters surfaced in tertiary (magma) accent. Each character row shows: a colored avatar derived from a deterministic per-character color, the line count, and the currently mapped voice (either a reference-audio file from the library or a built-in preset voice). Clicking a character expands an inline assignment surface — a drag-and-drop tile for new audio + a grid of preset voices + the character library — without navigating away to a separate "Mappings" page. Once all characters are mapped, the pre-flight diagnostic flips to green.

**Why this priority**: The current screen pushes mapping to a separate page (the "Mappings" button in the deployment header). Operators must context-switch, lose visual awareness of the script + cast relationship, and toggle between two surfaces just to assign Bob to a voice. Inlining this restores the editorial cohesion the reference design demonstrates and removes a major friction point in the canonical authoring flow.

**Independent Test**: An operator pastes a script with three characters (`Bob`, `Alice`, `Narrator`), sees the parsed dialogue + cast section render in a single scroll, clicks each unmapped character, assigns either an uploaded reference audio or a preset voice without leaving the recipe screen, and watches the unmapped-count chip transition from `3 unmapped` (tertiary) to `all mapped` (acid-green).

**Acceptance Scenarios**:

1. **Given** a script with three characters and zero mappings, **When** the recipe screen first renders, **Then** the cast section shows three rows, each with a `no voice mapped` empty state, and the diagnostic banner displays `3 unmapped` in tertiary accent.
2. **Given** an unmapped character row, **When** the operator clicks the row, **Then** an inline assignment surface expands below the row showing (a) a drop-target tile for new audio + the character library + a grid of preset voices, **without** navigating to a separate page.
3. **Given** the operator drops an audio file onto the character's drop tile, **When** the upload completes, **Then** the row updates to show the file name + audio metadata (duration, sample rate, channels), and the unmapped count decrements by one.
4. **Given** every character is mapped, **When** the diagnostic banner re-evaluates, **Then** it shows `all mapped` with an acid-green chip and the Generate action becomes enabled with no warnings.

---

### User Story 4 — Advanced emotion control via radar drag + presets + Qwen prompt (Priority: P2)

The operator drags a node on the 8-axis emotion radar to set the emotion vector visually. Axis chips alongside the radar show live values, the dominant axis is named, and the vector magnitude is displayed in monospace. The operator can save the current vector as a custom preset (auto-named from the dominant axes), browse built-in and custom preset libraries, delete custom presets, switch to `Qwen` mode and type a free-text prompt that maps to a vector, or switch to `Audio reference` mode where the per-character mapping editor wires the reference (the global panel only toggles the mode). An `Alpha · global mix` slider mixes the global vector against per-line `[Char|emotion_vector:...]` overrides; per-line overrides are documented to bypass alpha.

**Why this priority**: The current Emotion section shows a static radar with no interaction, no axis-level read-out, no save-preset composer, and an isolated per-line override hint. The user can't meaningfully shape emotion from the recipe screen — they must either accept the default or write override syntax inline. Adding interactive radar + preset library + Qwen prompt makes EmotionTTS feel like a creative tool rather than a configuration form. P2 rather than P1 because basic generation works without it; this elevates the experience.

**Independent Test**: An operator drags the radar to set `happy=0.62, surprised=0.34, calm=0.18`, sees the dominant axis named "happy" with magnitude `‖v‖ = 0.71`, names the preset "Friendly Teen", saves it, switches to Qwen mode, types "exhausted but trying to stay upbeat", clicks Map-to-vector, sees the radar update, and switches back to Vector mode and selects the "Friendly Teen" preset they just saved.

**Acceptance Scenarios**:

1. **Given** the Emotion section is in `vector` mode, **When** the operator drags a node on the radar, **Then** the corresponding axis chip's value updates in real time and the dominant-axis readout updates to the highest-magnitude axis.
2. **Given** the operator has set a non-zero vector, **When** the operator clicks `Save current as preset`, **Then** the preset is added to the custom library with a deterministic auto-name (top one or two axes, capitalised), persists across reloads, and is selectable thereafter.
3. **Given** a custom preset exists, **When** the operator clicks the delete glyph next to the preset, **Then** the preset is removed from the library after confirmation; deletion is irreversible.
4. **Given** the operator is in `qwen` mode and has typed a prompt, **When** the operator clicks `Map to vector`, **Then** the system computes a vector, sets the radar to that vector, and switches the Emotion section back to `vector` mode for further tuning.
5. **Given** the operator is in `audio` mode, **When** the operator views the panel, **Then** an explanatory empty-state explains that emotion comes from the per-character mapping (no radar, no Qwen prompt) and points to the cast section.
6. **Given** any mode and any vector, **When** the operator adjusts the `Alpha · global mix` slider, **Then** the displayed value updates immediately and a hint clarifies that per-line `[Char|...]` overrides bypass alpha.

---

### User Story 5 — Voice-asset waveform manipulation in mapping editor (Priority: P2)

When mapping a character to a reference audio (uploaded or library), the operator wants to trim and clean the reference itself before binding it — strip a noisy first half-second, apply a normalization, optionally apply a tiny fade-in. The voice-asset waveform is editable using the same edit-chain primitives as per-utterance editing, but the chain is bound to the voice asset and persisted to the mappings store. Subsequent runs use the edited reference automatically.

**Why this priority**: Voice assets are often raw recordings or library files that have artefacts (cough, mic-bump, leading silence). Without an in-product way to clean them, operators either accept the noise or pre-process externally and re-upload — both bad. This reuses the same audio-editing surface from US2, applied to a different scope (voice-asset chain, not utterance chain). P2 because it's an enhancement of the cast-mapping flow, not a blocker for the canonical generate-a-batch path.

**Independent Test**: An operator binds Bob to a reference audio that has a 0.3s noisy lead-in. The mapping editor's voice-asset waveform shows the noisy lead-in. The operator applies `trim 0.30..end` to the voice asset, saves the chain, and runs a fresh generation. Bob's lines now use the trimmed reference (verified by audio inspection of the run output).

**Acceptance Scenarios**:

1. **Given** a character is mapped to a reference audio, **When** the operator opens the mapping editor for that character, **Then** the voice asset's waveform displays alongside the same edit-chain panel used for utterance editing.
2. **Given** the operator applies edits to a voice-asset chain, **When** the operator saves the chain, **Then** the chain persists with the mapping, and a chain-digest indicator shows on the cast row.
3. **Given** a voice-asset chain is in effect, **When** a new batch is generated, **Then** the worker uses the edited reference (cache key bound to the chain digest), not the raw file.

---

### User Story 6 — Direct audio modulation via slider strip (Priority: P1)

The operator wants to make routine post-generation tweaks — bump volume, warm up the bass, slow the speech down a touch, fade out the tail — without learning the spec 036 chain JSON shape. A direct-modulation slider strip at the top of the per-utterance edit panel exposes the canonical adjustments as labeled sliders: **Volume** (dB), a **3-band EQ** (Low / Mid / High in dB with one-click presets like Warm / Bright / Voice / Telephone), **Speed** (with a mode selector for Audio time-stretch vs IndexTTS synth-time re-render), **Pitch** (semitones), **Normalize** (Off / Peak / Loudness), **Fade in / Fade out** (seconds + curve type), and **Silence trim**. Each slider mutates the underlying chain atomically — moving a slider to its identity value removes the corresponding op; moving it off identity adds or updates the op. The chain JSON view stays available for power users; the slider strip is the daily-driver UI.

**Why this priority**: This is the user's stated complaint distilled — "almost no voice/audio modifications are available". Even with US2's edit-chain infrastructure, an operator who has to "Add operation → choose `gain` → input dB value → confirm" 10 times a session will give up. The slider strip turns the existing chain primitives into a control surface comparable to a desktop audio editor's quick-access strip. P1 because it's the operator-facing payoff; the chain backend (US2) is plumbing that this surface is the visible result of.

**Independent Test**: An operator opens an utterance, drags the Volume slider to +3 dB, picks the `Warm` EQ preset, drags the Speed slider to 0.92× (Audio mode), enables Fade Out at 250 ms, hits Save. The resulting cached preview reflects all four modifications; the chain JSON view shows exactly four ops (`gain`, `eq3`, `tempo`, `fade_out`); the `Operations` summary chip lists those four with their parameters. Switching Speed to Synth mode and clicking `Re-render at synth-time` triggers a fresh worker run that re-synthesises the utterance at the new speed, replacing the `tempo` op with the recipe `speed` parameter at synthesis time.

**Acceptance Scenarios**:

1. **Given** an utterance with no edits, **When** the operator drags the Volume slider from 0 dB to +3 dB and releases, **Then** within 200 ms a `gain { db: 3.0 }` operation appears in the chain, the cached preview re-renders, and the slider readout shows `+3.0 dB` in mono.
2. **Given** the Volume slider is at +3 dB, **When** the operator drags it back to 0 dB and releases, **Then** the `gain` operation is removed from the chain (not set to 0 — fully removed), the cache key changes, and the audio preview matches the original.
3. **Given** the EQ control, **When** the operator clicks the `Warm` preset chip, **Then** the three EQ band sliders snap to documented `Warm` values (e.g., Low +3, Mid 0, High -1.5), an `eq3` op is upserted with those values, and the `eq3Preset` state is set to `warm`.
4. **Given** the Speed control is in `Audio` mode at 0.92×, **When** the operator switches to `Synth` mode, **Then** the slider value is preserved (0.92×) but the chain's `tempo` op is removed; a banner above the slider warns that the new value applies on next re-render only.
5. **Given** the operator is in Synth speed mode at 0.92×, **When** the operator clicks `Re-render at synth-time`, **Then** a worker run kicks off for this single utterance with `speed=0.92` passed at synthesis; on success, the new utterance audio replaces the panel's source and the slider returns to 1.00× Audio default (the synth re-render is now the new source).
6. **Given** the upstream backend reports `supports_per_utterance_speed=false` at handshake, **When** the operator opens the speed control, **Then** the mode selector hides the `Synth` option entirely and shows only `Audio` mode with no warning — the surface degrades quietly to the supported subset.
7. **Given** a slider mid-drag, **When** the operator continues dragging without releasing, **Then** no chain re-execution fires; on release, a 200 ms debounce waits for further input before committing.
8. **Given** the operator switches from the Volume slider mid-drag to the EQ Mid slider, **When** the new slider is touched, **Then** the Volume slider's last value commits to the chain immediately (debounce window short-circuits).

---

### User Story 7 — Edit history + audit trail (Priority: P3)

Every audio edit (per-utterance or per-voice-asset) is logged to the existing `ext_emotion_tts__audio_edit_log` table (spec 036). The Recipe Studio surfaces this audit history in a collapsible panel — operators see who changed what, when, and can revert to any prior chain state. The history persists across sessions and is exportable as a JSON document for review or replay.

**Why this priority**: The audit table exists; surfacing it is a small UX add. P3 because it's a power-user feature for review/compliance, not part of the canonical authoring flow. Useful but not critical for the first version.

**Independent Test**: An operator applies two edit chains across two sessions, opens the audit history panel, sees both events in chronological order with user, timestamp, target, and chain digest, exports the history as JSON, and reverts the second chain to restore the first chain's state.

**Acceptance Scenarios**:

1. **Given** the operator has applied at least one edit chain, **When** the operator opens the audit history panel, **Then** events render in reverse-chronological order with timestamp, target id (utterance or voice-asset), operation count, and chain digest.
2. **Given** the audit history shows a prior chain, **When** the operator clicks `Revert to this chain`, **Then** the current chain is replaced by the prior chain, a new audit event is logged, and the waveform re-renders.
3. **Given** the operator wants to export the history, **When** the operator clicks `Export JSON`, **Then** the browser downloads a JSON file with the full audit trail for the current run / voice-asset.

---

### Edge Cases

- What happens when the operator drags a radar node beyond the outer ring? The value clamps to `1.0`; the chip shows `1.00` in monospace; no NaN, no overflow.
- What happens when an utterance's waveform exceeds 60 seconds? The waveform downsamples to fit the canvas (visual-only); transport controls remain accurate to the source duration; the playhead position is computed from the source, not the visual.
- What happens when an edit chain contains an operation whose parameters become invalid after a prior op (e.g., `trim end=10.0s` after the audio has been cropped to 5.0s)? The chain validates eagerly; the offending operation surfaces an inline error with the specific reason (`end > clip duration`); generate is gated until resolved.
- What happens when a voice asset is referenced by multiple characters and the operator edits the asset's chain? The edit applies once at the asset level; all characters using that asset get the edited reference on the next generation; the operator is warned if more than one character is affected before confirming.
- What happens at the 320 px viewport width when the radar is in vector mode? The radar reduces to ~240 px, the side readout moves below the chart, and the axis chips wrap to a single column; drag interactions still work via touch.
- What happens when Qwen mode is selected but no inference backend is leasable? The Qwen prompt input remains visible but the `Map to vector` button is disabled with a hover hint pointing to Backends; this matches the empty-state behavior of the Module Draft AI suggestion stream from spec 037.
- What happens when an operator deletes a custom preset that's currently active? The active preset clears (radar stays at its current vector); a transient toast confirms the deletion.
- What happens when two browser tabs are editing the same recipe screen simultaneously? Last-write-wins for the recipe-screen-local state (script, vector, mode); audio edit chains persist via the existing per-utterance storage, so the second tab's mutations land on the existing chain — surfacing of conflict resolution beyond last-write-wins is out of scope for v1.
- What happens when the operator's browser doesn't support the Web Audio API? The transport controls and waveform-scrub fall back to a static waveform with a download-to-play CTA; per-utterance edit chains still apply server-side, viewable via the worker-rendered preview thumbnail.

## Requirements *(mandatory)*

### Functional Requirements — Layout & Responsiveness

- **FR-001**: The Recipe Studio MUST adopt the reference design's vertical-stacked section anatomy: every section (Script, Parsed dialogue, Cast, Emotion, Performance, Recent runs) occupies the full content width and stacks vertically; the screen scrolls as a single column. The current 2-column layout is retired.
- **FR-002**: Sections MUST be numbered (`01 / Script`, `02 / Parsed dialogue`, ..., `06 / Recent runs`) using the canonical mono-section-label primitive established in spec 037.
- **FR-003**: At 320 px viewport width, all interactive elements MUST remain operable; the radar shrinks to its minimum size (~240 px); axis chips wrap; transport controls remain hit-target-sized at the documented 44 × 44 px (or density-equivalent) minimum.
- **FR-004**: At 768 / 1024 / 1440 / 1920 px viewport widths, content MUST flow without clipping; no axis labels are truncated, no override-hint boxes overflow, no slider value readouts collide with their labels.
- **FR-005**: The recipe screen's deployment header MUST keep working (status chip, runtime, uptime, VRAM, Stop / Restart / Mappings actions) but in the Spectral Graphite editorial header style — no boxed pre-built-shell appearance; chips wrap cleanly at narrow widths.
- **FR-006**: When the EmotionTTS extension renders inside a deployment detail (recipe-mode), the page hero is replaced by a compact `dep-recipe-banner` mirroring the reference's compact diagnostic strip (runtime · device · sample rate · line count · char count · unmapped count · estimated duration). The full hero is reserved for the standalone EmotionTTS surface.

### Functional Requirements — Visual Tokens

- **FR-010**: All color usage MUST flow through the Spectral Graphite canonical token contract from spec 037 (`vars.color.accent.primary|secondary|tertiary|cyan`, `vars.color.text.{primary,secondary,muted}`, `vars.color.bg.{app,canvas,panel,elevated,hover,lowest,bright}`, `vars.color.success.base`, `vars.color.warning.base`, `vars.color.error.base`). No new accent palette is introduced.
- **FR-011**: All spacing MUST use the density tokens (`vars.density.d1..d9`) or the inset/gap semantic tokens from the spec 037 contract. Hardcoded `\d+px` values are forbidden outside the documented allow-list (`1` hairlines, `64` for fixed shell rails) and component-spec-fixed values explicitly annotated `// audit-allow: px — <reason>`.
- **FR-012**: All technical alphanumerics — IDs, durations, sample rates, axis values, chain digests, deployment ids, file names, byte counts — MUST render in `vars.font.code` (JetBrains Mono).
- **FR-013**: Indigo (`vars.color.accent.secondary`) is reserved for AI / Qwen / automated emotion features. Magma (`vars.color.accent.tertiary`) is reserved for manual sliders, manual prompts, and write-actions (Generate, Save Preset, Apply Edit). Violet (`vars.color.accent.primary`) is reserved for selection / focus / active state.
- **FR-014**: Status colors — `live`/`ready` / mapped = `vars.color.success.base` (acid-green); `error` / unmapped count > 0 = `vars.color.warning.base` or `vars.color.error.base` per state; never as backgrounds, only as chip dots and small accents.

### Functional Requirements — Script Editor

- **FR-020**: The Script section MUST display a syntax-highlighted dialogue editor that visually marks `[Character]`, `[Character|emotion_vector:...]`, `[Character|qwen:...]`, `[Character|preset:...]`, and `[Character|audio:...]` tags with semantically distinct accent colors.
- **FR-021**: The Script section MUST show a syntax legend below the editor with one example for each override form (`emotion_vector`, `qwen`, `preset`, `audio`).
- **FR-022**: The Script section's right-side meta MUST show character count, dialogue line count, and word count in mono with accent values.
- **FR-023**: The Parsed dialogue section MUST display every parsed line in order with: zero-padded mono index (`01`, `02`, …), character pill colored with the deterministic per-character color (or `narration` neutral pill for orphan lines), the line text in the body type, and a right-aligned override badge (`VECTOR`, `QWEN`, `PRESET`, `AUDIO`, or `OVERRIDE`) when applicable.

### Functional Requirements — Cast Mapping (inline)

- **FR-030**: The Cast section MUST list every unique character parsed from the script in a single column of cast cards.
- **FR-031**: Each cast card MUST show the character avatar (single-letter monogram in the deterministic per-character color), name (also colored), line count in mono, current mapping (reference audio: file name + duration + sample rate + channels; OR preset voice: name + sub-label), and an active/empty state visual.
- **FR-032**: Clicking a cast card MUST expand an inline assignment surface below the row containing: a drop-target tile for new audio uploads, the existing reference audio library (rendered as tiles with deterministic seeded waveform thumbnails), and a grid of preset voices.
- **FR-033**: Mapping changes (assigning, replacing, clearing a voice) MUST persist via the existing `mappings_client` service (no service contract change). Soft-delete, duplicate-cross-deployment, and import-with-conflict-strategy behaviors from spec 031 remain intact.
- **FR-034**: An aggregate diagnostic chip MUST render in the Cast section header: `all mapped` (acid-green) when no characters are unmapped, otherwise `N unmapped` (tertiary).

### Functional Requirements — Emotion Control

- **FR-040**: The Emotion section MUST offer four mutually exclusive modes: `none` (no conditioning), `audio` (per-character reference), `vector` (8-axis radar), `qwen` (LLM-mapped). Mode selection is a segmented control in the section header.
- **FR-041**: In `vector` mode, the Emotion section MUST render an interactive 8-axis radar chart at minimum 360 × 360 px (responsive down to 240 × 240 px at 320 px viewport) with axis labels (`happy`, `angry`, `sad`, `afraid`, `disgusted`, `melancholic`, `surprised`, `calm`) clockwise from top.
- **FR-042**: Radar drag MUST update the corresponding axis value in real time; values clamp to `[0.0, 1.0]`; values < 0.05 are treated as zero by downstream rendering.
- **FR-043**: A side readout MUST display the dominant axis name and the vector magnitude `‖v‖` in mono. Axis chips MUST list every axis with a small bar showing its current value and the value in mono; clicking an axis chip toggles between zero and 0.5 for that axis.
- **FR-044**: A `Save current as preset` composer MUST be visible whenever the vector has at least one non-zero axis. The composer auto-names the preset from the top one or two axes; the operator can override the name. Saving adds to the custom preset library and persists across reloads.
- **FR-045**: A `Built-in` preset library MUST always be visible; a `Custom` library renders only when at least one custom preset exists. Each preset row shows a mini-radar visualisation of its vector and the preset name.
- **FR-046**: Custom presets MUST be deletable via an inline icon button with a confirmation. Deletion is irreversible.
- **FR-047**: In `qwen` mode, a free-text prompt input + `Map to vector` action MUST be available. The action calls a backend that returns a vector; on success, the radar updates and the section switches back to `vector` mode automatically.
- **FR-048**: In `audio` mode, the section MUST render an explanatory empty state pointing the operator to the Cast section's per-character reference assignment; no radar, no Qwen prompt is shown in this mode.
- **FR-049**: An `Alpha · global mix` slider MUST be visible in every mode (except `none`); a hint explains that per-line `[Char|...]` overrides bypass alpha.
- **FR-050**: When `prefers-reduced-motion` is set, the radar's drag-driven animations and any preset-flip transitions MUST collapse to instant state changes; functionality is preserved.

### Functional Requirements — Performance Sliders + Pre-flight

- **FR-060**: The Performance section MUST surface three sliders: `Intensity` (0%..100%), `Pace` (0.5×..2.0×), `Pitch` (-12 st..+12 st). Manual sliders are colored magma per the duty rule (FR-013).
- **FR-061**: A pre-flight diagnostic block MUST list checks for: (a) all characters mapped; (b) emotion mode set and dominant axis named when `vector`; (c) line count + estimated duration; (d) seed value. Each row displays a status icon (check_circle, warning, info), a one-line description, and mono-formatted values.
- **FR-062**: The pre-flight block MUST update reactively as the operator changes the script, mappings, mode, or sliders; no manual refresh.
- **FR-063**: The Generate action MUST remain enabled even when warnings are present (the diagnostic does not block); critical-state errors (e.g., script empty) disable the button.

### Functional Requirements — Audio Editing (per-utterance)

- **FR-070**: After a successful run, opening any utterance MUST display a waveform panel showing the utterance's audio with: a chip indicating utterance id, sample rate, bit depth; transport controls (play / pause, skip prev/next, rewind, loop region toggle); a 0-indexed scrubbable timeline; a download-WAV action.
- **FR-071**: Clicking on the waveform's loop region MUST start a loop selection; dragging the region's edges resizes the loop. Looping is persisted per utterance for the current session and replayed on demand.
- **FR-072**: An `Edit chain` panel below the waveform MUST list every operation in the current chain in zero-padded mono index order with: operation name, parameters, an inline edit affordance, and a remove affordance.
- **FR-073**: Adding an operation MUST open an inline operation builder (per-op-type form) that validates parameters before adding to the chain. The chain re-executes after each accepted edit; the waveform re-renders from the new output; the new output's bytes are cached by the chain digest (SHA-256 over canonical chain JSON, per spec 036).
- **FR-074**: The operator MUST be able to `undo` (remove last operation) and `redo` (re-add the last removed operation) from the panel header. Undo / redo history is per-utterance and per-session; clearing the chain wipes both stacks.
- **FR-075**: The operator MUST be able to rename an edit chain (display label only) and copy the chain JSON to clipboard for review or replay.
- **FR-076**: Downloading the edited WAV MUST serve the cache-bound output, not re-render. The downloaded file's bytes match the cached preview byte-for-byte.
- **FR-077**: Supported operations MUST include the spec 036 set: `trim`, `crop`, `gain`, `normalize` (LUFS-anchored), `fade_in`, `fade_out`, `silence_pad`, `silence_strip`, `pitch_shift`, `tempo`. Each op has typed parameters and an inline error surface for invalid combinations.

### Functional Requirements — Direct Audio Modulation Controls

These are *first-class slider controls* exposed at the top of the per-utterance edit panel — not buried inside an "Add operation" menu. Each slider mutates a corresponding entry in the edit chain, but the operator interacts with the slider, not the chain row. Sliders default to their identity value; non-identity values append/update the matching chain operation atomically.

- **FR-078**: The per-utterance edit panel MUST expose a **Volume slider** (-24 dB .. +12 dB, step 0.1 dB, identity 0 dB) that maps to a `gain` operation on the chain. Setting the slider to 0 dB removes the gain op from the chain; setting it to a non-zero value upserts the gain op with the matching value. The slider readout shows the current dB value in mono with a `+` sign for positive gain.
- **FR-079**: The per-utterance edit panel MUST expose a **Bass / EQ control** with three frequency-band sliders (`Low` < 250 Hz, `Mid` 250 Hz–4 kHz, `High` > 4 kHz), each -12 dB .. +12 dB, identity 0 dB. The control maps to a new `eq3` operation (3-band parametric EQ) on the chain. Identity-only state removes the op; any non-zero band upserts. The control surfaces a single-line preset row (`Flat`, `Warm`, `Bright`, `Voice`, `Telephone`) that snaps the three sliders to documented values.
- **FR-080**: The per-utterance edit panel MUST expose a **Speed control** with a two-mode segmented selector:
  - `Audio` (default after generation) — maps to the spec 036 `tempo` operation (time-stretch without pitch change), range 0.5× .. 2.0×, step 0.05×, identity 1.0×. Updates after generation; cache-bound.
  - `Synth (re-render)` — maps to the recipe-level `speed` parameter exposed on synthesis (existing IndexTTS speed parameter, see Performance section FR-060). Selecting this mode does NOT re-render immediately; instead, the operator confirms with a `Re-render at synth-time` action that re-runs the utterance via the existing run pipeline at the new speed. The Audio mode is preferred when (a) re-render cost would exceed cache hit cost, or (b) the upstream IndexTTS backend doesn't expose a per-utterance speed parameter.
  The mode selector remembers per-utterance state.
- **FR-081**: A **Pitch slider** (-12 st .. +12 st, step 1, identity 0) MUST be exposed at the panel level mirroring the Performance section's pitch slider but scoped to the single utterance. Maps to the spec 036 `pitch_shift` operation; identity removes the op.
- **FR-082**: A **Normalize button** with three modes — `Off` (no op), `Peak` (peak-normalize to -1 dBFS), `Loudness` (LUFS-anchored, default -16 LUFS for spoken content) — MUST be exposed. Mode selection upserts a single `normalize` op; switching modes replaces the op atomically.
- **FR-083**: A **Fade In / Fade Out** dual control MUST allow specifying fade-in duration (0..2.0 s) and fade-out duration (0..2.0 s) independently. Non-zero values upsert `fade_in` / `fade_out` ops; zero removes them. Curves default to `linear`; an inline expandable detail allows selecting `equal_power`, `logarithmic`, or `s_curve` per fade.
- **FR-084**: A **Silence trim toggle** MUST allow enabling silence stripping (head, tail, or both) at a configurable threshold (default -45 dBFS). Mapping = `silence_strip` op.
- **FR-085**: When a slider is mid-drag, the chain MUST debounce re-execution by 200 ms after the operator releases the slider; intermediate values do NOT trigger preview re-render. The waveform shows a "pending re-render" hairline state during the debounce.
- **FR-086**: When the operator switches from one operator-driven slider to another (e.g., Volume slider → Bass Mid slider), the previous slider's value commits immediately to the chain even if the debounce window has not elapsed; this prevents lost intermediate state.
- **FR-087**: The slider panel MUST show a small `Operations` summary chip listing every active op type (`gain`, `eq3`, `tempo`, `pitch_shift`, `normalize`, `fade_in`, `fade_out`, `silence_strip`, `trim`, `crop`) with their current parameters in mono — this is the surface bridge between the friendly slider UI and the underlying chain JSON.
- **FR-088**: All sliders MUST be keyboard-accessible: arrow keys step the slider by one step, Page Up / Page Down by 10 steps, Home / End to identity / extreme. Slider focus indicators use the spec 037 violet (primary) accent ring.

### Functional Requirements — Audio Editing (voice asset)

- **FR-090**: When a character is mapped to a reference audio, the mapping editor MUST display the voice-asset waveform alongside an edit-chain panel using the same operation set as per-utterance editing — including the same direct-modulation slider surface (Volume, EQ, Speed-audio mode, Pitch, Normalize, Fade, Silence trim).
- **FR-091**: A voice-asset chain MUST persist with the mapping (existing mapping persistence via `mappings_client`; no service contract change beyond an additive chain-digest field on the mapping record).
- **FR-092**: Subsequent batch generations MUST use the edited reference audio (worker derives the input from the chain digest); the cache layer treats the edited reference as a distinct input from the raw asset.
- **FR-093**: When a voice asset is referenced by multiple characters, editing the asset's chain MUST surface a confirmation listing every affected character before applying.
- **FR-094**: The voice-asset edit panel MUST NOT expose the `Synth (re-render)` mode of the speed control (FR-080) — voice-asset edits are post-recording transformations of an already-recorded reference; pre-synth speed is a recipe-level concern, not a reference-asset concern.

### Functional Requirements — Audit History

- **FR-100**: A collapsible audit history panel MUST list every audio-edit event for the current run + for the recipe's voice assets in reverse-chronological order, sourced from `ext_emotion_tts__audio_edit_log` (spec 036).
- **FR-101**: Each audit row MUST show: timestamp (mono), target type (utterance / voice-asset), target id (mono), operation count, chain digest (mono prefix), and the actor (if available; otherwise `local`).
- **FR-102**: The operator MUST be able to `Revert to this chain` from any historical row; reverting creates a new audit event (it does not erase history).
- **FR-103**: The operator MUST be able to `Export JSON` for the full history of the current run / voice-asset.

### Functional Requirements — Recent Runs

- **FR-110**: The Recent runs section MUST list the last N (default 5) batch runs for the current deployment with: run id (mono), timestamp, status, line count, total duration; an `Open Queue` link navigates to the runtime queue view; an empty state with `Hit Generate to enqueue a batch` displays when no runs exist.

### Functional Requirements — Boundary + Token Discipline

- **FR-120**: The redesign MUST preserve the host ↔ extension boundary established in spec 037: no new extension-id literals leak into host paths; the EmotionTTS code remains entirely under `extensions/builtin/emotion-tts/`. The `pnpm audit:redesign` script reports zero un-suppressed findings on this branch tip.
- **FR-121**: The redesign MUST NOT alter any service-client contract (`http`, `deployments_client`, `workflows_client`, `mappings_client`, `presets_client`, `voice_assets_client`, `runs_client`, `runtime_client`, `exports_client`) beyond the documented additive extensions for the new `eq3` worker op (FR-079) and the chain-digest field on mapping records (FR-091). Edit-chain endpoints landed in spec 036 are consumed as-is for all overlapping operations.
- **FR-122**: Every existing EmotionTTS visual primitive (Banner, Panel, EmptyState, sectionLabel, StatusPill, Button, EditSurface) from spec 037 T066b MUST be reused; new component additions are limited to the radar, waveform, edit-chain panel, cast row, save-preset composer, direct-audio-modulation slider strip, and any small decorative atoms required by the reference design.

### Key Entities

- **Recipe Studio screen state**: `script` (string), `mode` (`none|audio|vector|qwen`), `vec` (8-axis dictionary), `alpha` (number), `qwenPrompt` (string), `activePreset` (preset id or null), `intensity` (number), `speed` (number, recipe-level; consumed by IndexTTS during synthesis), `pitch` (integer semitones, recipe-level), `seed` (integer). Persisted to sessionStorage as a draft envelope; cleared on successful Generate.
- **Emotion preset**: `id` (string), `name` (string), `kind` (`builtin|custom`), `vec` (8-axis dictionary), `author` (optional), `created_at`. Custom presets persist via the existing `presets_client` service.
- **Edit chain**: `target_kind` (`utterance|voice_asset`), `target_id` (string), `operations` (ordered list of typed ops with parameters), `digest` (SHA-256 of canonical chain JSON, set by worker), `created_at`, `updated_at`. Persists via the spec 036 audio-edit endpoints. Cache key = digest.
- **Audio operation**: `type` (one of `trim|crop|gain|normalize|fade_in|fade_out|silence_pad|silence_strip|pitch_shift|tempo|eq3`), `params` (typed by op), `id` (uuid for stable diff in the panel). The `eq3` type is new in this spec and requires an additive worker-side handler (see Assumptions).
- **Direct-modulation slider state**: per-utterance and per-voice-asset, the bound state of the slider strip — `volumeDb` (number), `eq3Low` / `eq3Mid` / `eq3High` (numbers, dB), `eq3Preset` (`flat|warm|bright|voice|telephone|custom`), `speedMode` (`audio|synth`), `speedValue` (number, ratio), `pitchSt` (integer), `normalizeMode` (`off|peak|loudness`), `fadeInS` (number), `fadeOutS` (number), `fadeInCurve` / `fadeOutCurve` (`linear|equal_power|logarithmic|s_curve`), `silenceTrimEnabled` (boolean), `silenceThresholdDb` (number). Derived from the chain on load; mutating a slider upserts the matching op into the chain.
- **Audit event**: `id`, `target_kind`, `target_id`, `chain_digest`, `op_count`, `actor`, `at`. Read-only projection of `ext_emotion_tts__audio_edit_log`.
- **Cast mapping**: `character_name`, `mapping_kind` (`reference|preset`), `reference_id` (when `reference`) + optional `voice_asset_chain_digest`, OR `preset_voice_id` (when `preset`). Persists via `mappings_client`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At each of the five test viewport widths (320 / 768 / 1024 / 1440 / 1920 px), every section's content fits within its container with **zero clipped labels** and **zero text overflow**, verified by Playwright visual baseline screenshots and an explicit clipping audit (every chip / label / chart-label is fully inside its bounding box).
- **SC-002**: The radar chart is drag-interactive on desktop and touch-interactive on mobile; a representative drag from one axis to another updates the corresponding axis value in **under 50 ms** of pointer-move, measured against a deterministic test harness.
- **SC-003**: An operator can complete the canonical "trim and normalize one utterance" workflow (open run → click utterance → add `trim` → add `normalize` → preview → download) in **under 30 seconds** of wall-clock time, including cached re-execution of preview at <500 ms per chain step.
- **SC-004**: After Generate, the operator reaches a per-utterance edit surface in **at most two clicks** from the recipe screen.
- **SC-005**: An operator can complete the canonical "map all characters to voices" workflow without leaving the recipe screen; the unmapped count chip transitions from `N unmapped` to `all mapped` purely through interactions on this single screen.
- **SC-006**: The `pnpm audit:redesign` script reports **zero un-suppressed findings** on the spec 038 branch tip — including the redesigned EmotionTTS surfaces.
- **SC-007**: The redesigned EmotionTTS internal routes pass `axe-core` at the documented `data-density="cozy"` × `data-accent="primary"` × `data-card="flat"` baseline with **zero serious or critical violations**, including the new audio-editing surfaces.
- **SC-008**: A custom emotion preset created in one session persists across reload; deleting a custom preset removes it permanently and is reflected immediately in the preset library UI.
- **SC-009**: Every existing EmotionTTS service-client contract continues to pass its existing test suite without modification (`mappings_client`, `presets_client`, `voice_assets_client`, `runs_client`, `runtime_client`, `exports_client`, plus the spec 036 audio-edit endpoints). No service contract change is introduced by this feature.
- **SC-010**: An edit chain applied to a voice asset persists across reloads, is reflected on the cast row by a chain-digest indicator, and is consumed by the next batch generation (verified by output-audio inspection — the edited reference is in effect, not the raw asset).
- **SC-011**: The host ↔ extension boundary audit (`pnpm audit:redesign --only=boundary` + `cargo test -p nexus-extension-deps --test boundary_test`) reports **zero new violations** introduced by this feature.
- **SC-012**: Per-utterance preview re-execution after a chain change completes in **under 500 ms warm-cache** (cached output streamed back) and **under 3 seconds cold** (worker re-renders) for representative ≤ 60-second utterances on the documented dev-host baseline.
- **SC-013**: Direct-modulation slider interactions feel immediate — the slider readout updates within **16 ms** of pointer-move (one frame at 60 Hz); the cache-bound preview re-renders within **500 ms** of slider release for a single op change on a ≤ 60-second utterance.
- **SC-014**: Slider state and chain JSON are bijective: opening an utterance with an existing chain populates the slider strip such that every op-bearing slider reflects its op's current parameter; conversely, mutating any slider produces an op the chain JSON view shows verbatim, with no hidden state. Switching to chain-JSON view and back via the `Operations` summary preserves all slider values.
- **SC-015**: When the upstream IndexTTS backend reports `supports_per_utterance_speed=false`, the Speed control's `Synth` mode is hidden and **no error or warning** is shown — the UI silently degrades to Audio-only mode without confusing the operator.

## Assumptions

- The Spectral Graphite design system from spec 037 is the canonical visual language and is **not** revised by this feature; any new tokens required (radar canvas dimensions, waveform palette, slider track colors) extend the existing contract additively rather than replacing it.
- The reference design `NexuDNN.zip` (`screens/emotion-tts.jsx`, `styles/screens.css`, `styles/tokens.css`, `uploads/design.txt`) is the structural source of truth; literal CSS values in the reference are translated to spec 037 production tokens, not copied verbatim.
- The spec 036 audio-editing backend (`audio_edit/` subpackage in the worker, `router/{audio_edit,utterance_edit,audit}.rs` routes, `ext_emotion_tts__audio_edit_log` table) is in place and consumed as-is for every operation it already supports (`trim`, `crop`, `gain`, `normalize`, `fade_in`, `fade_out`, `silence_pad`, `silence_strip`, `pitch_shift`, `tempo`).
- **One new worker operation is introduced by this feature**: `eq3` (3-band parametric EQ — Low / Mid / High, each in dB). The worker-side implementation lives in the existing `audio_edit/` subpackage as an additive handler; the chain JSON shape is the same as other ops (`{type: "eq3", params: {low_db: number, mid_db: number, high_db: number}}`); the cache-digest computation is unchanged. This is the only backend addition for spec 038.
- **Speed control has dual semantics**:
  - **Audio mode** maps to the existing `tempo` operation in the spec 036 chain — applies post-recording, cache-bound, available for both utterance edits and voice-asset edits.
  - **Synth mode** maps to the existing recipe-level `speed` parameter consumed by IndexTTS at generation time — only applicable per-utterance (not voice-asset), gated behind explicit `Re-render at synth-time` action because it triggers a full pipeline re-execution.
  IndexTTS's per-utterance speed parameter MAY NOT be supported by all upstream backends; when not supported, Synth mode is hidden and only Audio mode is offered. The detection happens at backend handshake (existing `runtime_client` capability discovery extended with a `supports_per_utterance_speed` flag — additive, default `false`).
- The existing service clients under `extensions/builtin/emotion-tts/web/src/services/` cover every data fetch the redesigned screen needs; if a new fetch is required (e.g., audit-history projection), a small additive method on an existing client is preferred over a new client.
- Qwen prompt → vector mapping is an existing capability provided by the host's `LeaseBackedStreamProvider` (spec 037 Phase A) bound to a participating worker (spec 037 Phase B). When no participating worker has a Ready lease, the `Map to vector` action surfaces the documented empty-state CTA pointing at Backends.
- The `presets_client` already supports CRUD on emotion presets; if the underlying schema lacks a `kind` (`builtin|custom`) discriminator, we add it as an additive non-nullable column with a default of `custom` for existing rows (one new migration). Built-in presets are seeded in code, not in the database.
- Per-utterance audio edits exist within the scope of one run; cross-run chain reuse is out of scope for v1 (operator can copy a chain JSON to clipboard and paste into another run).
- Concurrent multi-tab editing of the same recipe screen falls back to last-write-wins; conflict-resolution UI is explicitly out of scope.
- The audit-history panel reads `ext_emotion_tts__audio_edit_log` directly via an additive read-only endpoint on the worker; write access remains gated to the existing audio-edit endpoints.
- Every existing EmotionTTS Playwright test that asserts "section X is rendered" continues to pass after the layout migration; tests that asserted specific 2-column DOM positions are updated to assert the new vertical-stacked anatomy. Visual-regression baselines are recaptured for the redesigned surfaces.
- Mobile (≤ 768 px) is in scope for layout reflow but **not** for new-feature touch optimisation beyond what reflow naturally provides; advanced gestures (pinch-zoom on waveform, multi-touch radar drag) are out of scope for v1.
