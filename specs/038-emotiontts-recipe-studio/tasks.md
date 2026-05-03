---
description: "Task list for spec 038 — EmotionTTS Recipe Studio"
---

# Tasks: EmotionTTS Recipe Studio

**Input**: Design documents from `/specs/038-emotiontts-recipe-studio/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ (3 files) ✅, quickstart.md ✅

**Tests**: Selected per spec quality checklist + Constitution VI carve-out:
- **MANDATORY**: backend contract tests (`eq3` worker op); frontend pure-function vitest (chain ↔ slider bijection, dialogue parser, preset auto-name, classify_backend_error); a11y baselines (axe-core); visual regression baselines (Playwright at 5 viewports for SC-001).
- **DEFERRED** per Principle VI design-heavy carve-out: per-component vitest for visual-only restyling work; tracked in a follow-up sprint.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no cross-task dependencies)
- **[Story]**: User story label (US1..US7); maps to spec.md user stories

## Path Conventions

- **Frontend**: `extensions/builtin/emotion-tts/web/src/`
- **Frontend tests**: `extensions/builtin/emotion-tts/web/tests/`
- **Worker**: `extensions/builtin/emotion-tts/worker/audio_edit/`
- **Worker tests**: `extensions/builtin/emotion-tts/worker/audio_edit/tests/`
- **Storage migrations**: `extensions/builtin/emotion-tts/storage/migrations/`
- All paths absolute under repo root `/d/Workspace/repos/nexus-dnn/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization. The extension already exists; this phase creates new directories and confirms the dev environment is ready.

- [X] T001 Create the new component co-location directories under `extensions/builtin/emotion-tts/web/src/views/recipe/components/` if not present (radar, waveform, edit-chain panel, slider strip, cast row, save-preset composer, parsed dialogue, pre-flight, recent runs, audit history) and add `index.ts` re-exports stubs.
- [X] T002 [P] Create the visual-baseline test directory `extensions/builtin/emotion-tts/web/tests/visual/` with a stub `recipe_studio.spec.ts` skipping cleanly when `RUN_VISUAL=0` (matching the existing `RUN_E2E` env-gate pattern).
- [X] T003 [P] Create the unit-test directory `extensions/builtin/emotion-tts/web/tests/unit/` with a placeholder `chain_slider_bijection.test.ts` that imports from `@vitest/expect` and asserts a single trivial truth (verifies vitest discovery).
- [X] T004 [P] Create the worker test directory `extensions/builtin/emotion-tts/worker/audio_edit/tests/` (if absent) with a `conftest.py` mirroring the existing local-llm tests' sys.path setup so `python -m pytest` resolves the worker package without venv install.
- [X] T005 Pre-flight audit baseline — capture `pnpm audit:redesign --json > /tmp/spec038_baseline.json` on the current branch tip BEFORE any new component is added, so any later finding is attributable to a specific commit.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Pure functions + hooks + worker handler + migrations. Every user story depends on these.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

### Schema migrations (additive, idempotent)

- [X] T006 [P] Create migration `extensions/builtin/emotion-tts/storage/migrations/018_eq3_op_support.sql` (forward-compat marker — single comment-only statement OR an `INSERT OR IGNORE` into a known-ops registry table if one exists; verify at write time).
- [X] T007 Create migration `extensions/builtin/emotion-tts/storage/migrations/019_voice_asset_chain_digest.sql` adding nullable `voice_asset_chain_digest TEXT` column to the existing mappings table (verify exact table name from spec 031 before authoring; add `PRAGMA table_info` guard if migration runner doesn't enforce idempotency).

### Worker — `eq3` operation handler (Phase B per quickstart)

- [X] T008 [P] Write `pytest` cases in `extensions/builtin/emotion-tts/worker/audio_edit/tests/test_eq3.py` per `contracts/eq3-op.contract.md` § Tests — 7 cases (zero-gain passthrough, low-only attenuates 80 Hz, high-only attenuates 8 kHz, validation rejects out-of-range, digest stable under param order, digest differs from zero, combines with other ops in chain). Tests MUST FAIL until T010 implements the handler.
- [X] T009 [P] Add `eq3` to the chain-runner's known op-type registry at `extensions/builtin/emotion-tts/worker/audio_edit/ops.py` (or wherever the dispatcher map lives). Discover-time check passes; runtime dispatch still missing until T010.
- [X] T010 Implement `extensions/builtin/emotion-tts/worker/audio_edit/eq3.py` per `contracts/eq3-op.contract.md` — `apply_eq3(input_path, output_path, *, low_db, mid_db, high_db)` wrapping FFmpeg's `equalizer` filter chain (low-shelf 80 Hz, peaking 1 kHz, high-shelf 8 kHz; bands with `g=0` skipped). Run T008's pytest suite to GREEN.

### Frontend — pure helpers (Phase A per quickstart)

- [X] T011 [P] Write vitest suite at `extensions/builtin/emotion-tts/web/tests/unit/chain_slider_bijection.test.ts` proving SC-014: every slider state shape round-trips through `chainToSliderState(toChainOps(state))` to identical state; every chain shape round-trips through `chainToSliderState` to a state whose `toChainOps` produces the same chain (after stable sort + identity-op removal). Tests MUST FAIL until T013/T014.
- [X] T012 [P] Write vitest suite at `extensions/builtin/emotion-tts/web/tests/unit/parse_dialogue.test.ts` covering: empty script → empty lines, narration-only line (no character tag), `[Char] text` line, `[Char|emotion_vector:happy=0.7] text` line, `[Char|qwen:warm] text` line, `[Char|preset:Bittersweet] text` line, multiple lines round-trip, malformed tags fall through as narration. Tests MUST FAIL until T015.
- [X] T013 [P] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/lib/slider_chain.ts` exporting `chainToSliderState(chain)` and per-op `upsertGain`, `upsertEq3`, `upsertTempo`, `upsertPitchShift`, `upsertNormalize`, `upsertFadeIn`, `upsertFadeOut`, `upsertSilenceStrip` functions. All pure; identity-state mutators remove the corresponding op. Run T011 to GREEN.
- [X] T014 [P] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/lib/preset_naming.ts` exporting `suggestPresetName(vec)` per FR-044 (top one or two axes, capitalised). Vitest at `tests/unit/preset_naming.test.ts` covers: zero vector → empty string, single dominant axis → `"Happy"`, two top axes → `"Happy + surprised"`.
- [X] T015 [P] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/lib/parse_dialogue.ts` exporting `parseDialogue(text)`, `uniqueCharacters(lines)`, `overrideKind(rawOverride)`, `assignCharacterColors(characters)` (deterministic 6-color cycle per R6). Run T012 to GREEN.

### Frontend — hooks

- [X] T016 Implement `extensions/builtin/emotion-tts/web/src/views/recipe/hooks/use_chain_state.ts` wrapping `audio_edit_client` + the pure helpers from T013. Exposes `{chain, sliderState, upsertOp, removeOp, debouncedExecute, pendingExecution}` per research R3 with 200 ms debounce.
- [X] T017 [P] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/hooks/use_radar_drag.ts` — pointer-event + keyboard arrow keys + clamp + commit-on-release. Touch + pen + mouse via `PointerEvent` API. Honors `useReducedMotion()`.
- [X] T018 [P] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/hooks/use_waveform_audio.ts` — Web Audio API `AudioContext.decodeAudioData` + downsample to ~512 peaks; returns `{peaks, duration, sampleRate, play, pause, seek}`. Falls back to deterministic synthetic-peaks when decode fails (CORS / unsupported codec).

### Service-client extensions (additive only)

- [X] T019 [P] Add `audit_client.ts` at `extensions/builtin/emotion-tts/web/src/services/audit_client.ts` exposing `listAuditEvents({targetKind, targetId, limit?, cursor?})` per `contracts/audit.openapi.yaml`. Returns `{events, nextCursor}`.
- [X] T020 [P] Extend `extensions/builtin/emotion-tts/web/src/services/runtime_client.ts` to surface the new `supports_per_utterance_speed` boolean from the existing capability response (default false when absent). Add a unit test asserting default behavior.
- [X] T021 [P] Extend `extensions/builtin/emotion-tts/web/src/services/mappings_client.ts` to read/write the new `voice_asset_chain_digest` field on mapping records. Existing methods unchanged; new field is optional in the request shape, optional + nullable in the response.
- [X] T022 Extend `extensions/builtin/emotion-tts/web/src/services/audio_edit_client.ts` (existing per spec 036) to accept the new `eq3` op type in chain mutations. NO contract change — the client passes through the op type to the existing endpoint; the worker (T010) handles dispatch. Verify by writing a small integration test that round-trips an eq3 op through `upsertChainOp`.

### Tokens / styles foundation

- [X] T023 [P] If any of the new component CSS values lack a token in spec 037's contract (verified during plan), declare them additively in `extensions/builtin/emotion-tts/web/src/theme/tokens.css.ts`. Default expectation: zero new tokens needed (every value already maps per quickstart §5 cheat sheet). If anything additive is required, document the rationale in this commit's body.

**Checkpoint**: Pure helpers + worker handler + migrations + service-client extensions all in place. Every user story can now begin. Run `python -m pytest` (worker) + `pnpm vitest run` (frontend pure-function tests) — all GREEN before proceeding.

---

## Phase 3: User Story 1 — Recipe Studio renders without clipping at every viewport (Priority: P1) 🎯 MVP

**Goal**: Replace the cramped 2-column layout with the reference design's vertical-stacked editorial anatomy. Sections breathe full-width; radar / labels / chips never clip at 320 / 768 / 1024 / 1440 / 1920 px.

**Independent Test**: Open the recipe screen at each of the 5 viewport widths in the redesigned shell. Take a screenshot per viewport. Verify (a) all 8 radar axis labels fully visible; (b) per-line override hint box does not overflow; (c) script editor + radar maintain readable column widths; (d) deployment header chips wrap intelligibly.

### Implementation for User Story 1

- [X] T024 [US1] **Frame the interface first** (Constitution XII.8 mandate). Author the visual-system manifest at `extensions/builtin/emotion-tts/web/src/views/recipe/DESIGN.md` capturing: (a) the chosen visual direction copied from plan §Design direction; (b) the palette duty mapping (which spec 037 token slot owns which functional role in this screen); (c) the spacing rhythm decisions (which density tokens carry which roles); (d) the motion rules (where animation reveals hierarchy + reduced-motion substitution); (e) the surface treatment (flat default, glass on floating overlays only); (f) for each new component, the spec 037 token cluster it consumes — explicit list, no token introductions allowed without a prior amendment. Verify the existing token contract covers every value the new components need; declare any additive tokens up front (none expected per quickstart §5). Reviewers gate every component PR against this manifest. NO component code lands before this file is committed.
- [X] T024a [P] [US1] Rewrite `extensions/builtin/emotion-tts/web/src/views/recipe/recipe.css.ts` — single-column vertical stack; section gap = `vars.density.d9`; section internal padding = `vars.density.d6`; remove the prior 2-column grid. Reference R5 + plan §Design direction + T024 DESIGN.md manifest.
- [X] T025 [P] [US1] Update `extensions/builtin/emotion-tts/web/src/views/recipe/recipe.ui.tsx` to render 6 numbered sections in vertical stack: `01 / Script`, `02 / Parsed dialogue`, `03 / Cast`, `04 / Emotion`, `05 / Performance`, `06 / Recent runs`. Use the existing `Panel` + `sectionLabel` primitives.
- [X] T026 [US1] Update `extensions/builtin/emotion-tts/web/src/views/recipe/recipe.view.tsx` (smart container) — extends existing data loading to also expose the parsed dialogue + cast + presets + recent runs needed by the new sections. NO service contract change beyond T019/T020/T021/T022 additive extensions.
- [X] T027 [US1] Update `extensions/builtin/emotion-tts/web/src/views/recipe/components/deployment_header.tsx` (existing) to wrap chips cleanly at narrow widths and follow the editorial header style (no boxed pre-built-shell appearance). Verify wrap behavior at 768 px viewport.
- [ ] T028 [P] [US1] Add a compact `dep-recipe-banner` variant to the deployment header per FR-006 — used when the recipe screen renders inside a deployment-detail context (not on the standalone EmotionTTS surface). Mono-formatted runtime · device · sample rate · line/char counts · est-duration.
- [X] T028a [P] [US1] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/performance_sliders.tsx` per FR-060 — three sliders: `Intensity` (0%..100%), `Pace` (0.5×..2.0×), `Pitch` (-12 st..+12 st). Manual sliders use magma accent per FR-013. Mono-formatted readouts. Wires into recipe screen state (RecipeStudioDraft per data-model.md §3.1).
- [X] T028b [P] [US1] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/performance_sliders.css.ts` (vanilla-extract token consumers; magma focus rings; mono readouts).
- [X] T028c [P] [US1] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/pre_flight_block.tsx` per FR-061..FR-063 — diagnostic checks (all chars mapped, mode set + dominant axis named when vector, line count + est duration, seed). Each row: status icon (`check_circle` / `warning` / `info`), one-line description, mono-formatted values. Reactive — re-evaluates on script / mappings / mode / slider change. Generate enabled with warnings; disabled only on critical errors (empty script).
- [X] T028d [P] [US1] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/pre_flight_block.css.ts`.
- [X] T028e [P] [US1] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/recent_runs.tsx` per FR-110 — last N (default 5) batch runs for the current deployment. Each row: mono run id + timestamp + status chip + line count + total duration. `Open Queue` link → existing runtime queue view. Empty state: "Hit Generate to enqueue a batch." Consumes existing `runs_client`.
- [X] T028f [P] [US1] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/recent_runs.css.ts`.
- [X] T028g [P] [US1] Add Script section chrome per FR-021 + FR-022 — modify the existing `script_editor.tsx` (or wrap it in a new `script_section.tsx` if cleaner) to surround it with: (a) right-side meta showing chars / dialogue lines / words counts in mono with accent values; (b) syntax legend below the editor with one example per override form (`emotion_vector`, `qwen`, `preset`, `audio`). Legend uses spec 037 token contract (no inline hex; accent colors via `vars.color.accent.*`).
- [ ] T029 [US1] Capture Playwright visual baselines at 320 / 768 / 1024 / 1440 / 1920 px in `extensions/builtin/emotion-tts/web/tests/visual/recipe_studio.spec.ts` (replacing the T002 stub). Gated behind `RUN_VISUAL=1`. Baselines committed.
- [ ] T030 [US1] Add a clipping audit assertion to the visual spec — for each viewport, query every text element via `page.$$eval` + `getBoundingClientRect()` and assert no element has `scrollWidth > clientWidth` (catches `text-overflow: ellipsis` truncations). SC-001 evidence.

**Checkpoint**: User Story 1 fully functional. The cramped layout from the user's screenshot is gone — sections breathe vertically, no clipping at any tested viewport. Visual baselines committed.

---

## Phase 4: User Story 3 — Cast voice mapping inline (Priority: P1)

**Goal**: Eliminate the separate "Mappings" page navigation; embed the cast list + per-character assignment surface inside the recipe screen. Unmapped count chip transitions through interactions on this single screen.

**Independent Test**: Paste a script with three characters (Bob, Alice, Narrator); see the cast section render three rows; click each unmapped character and assign a reference audio OR a preset voice without leaving the recipe; watch `3 unmapped` (tertiary) → `all mapped` (acid-green).

### Implementation for User Story 3

- [X] T031 [P] [US3] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/parsed_dialogue.tsx` per `contracts/ui-props.contract.md` §8 — character-colored line list. Consumes the parser from T015.
- [X] T032 [P] [US3] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/parsed_dialogue.css.ts` — uses spec 037 token contract; per-character colors from T015's deterministic palette; no new global styles.
- [X] T033 [P] [US3] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/cast_row.tsx` per `contracts/ui-props.contract.md` §6 — character avatar (single-letter monogram in deterministic color), name (also colored), line count in mono, current mapping (reference: file name + duration + sample rate + channels; OR preset: name + sub-label), active / empty state visual.
- [X] T034 [P] [US3] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/cast_row.css.ts`.
- [X] T035 [US3] Implement the inline assignment surface that expands below an active cast row per FR-032 — drop-target tile for new audio + reference-audio library + preset-voice grid. Lives inside `cast_row.tsx` as an internal sub-component; uses the existing `voice_assets_client` for upload and library queries.
- [X] T036 [US3] Wire the `Section 03 / Cast` slot in `recipe.ui.tsx` (T025) to render the new `parsed_dialogue` (Section 02) and the cast list (Section 03). Aggregate `N unmapped` chip in the section header per FR-034.
- [X] T037 [US3] Persist mapping mutations via the existing `mappings_client` (no contract change beyond T021 additive). Soft-delete + duplicate-cross-deployment + import-with-conflict-strategy from spec 031 remain intact.

**Checkpoint**: User Story 3 fully functional. Operators map every character to a voice without navigating to the separate Mappings page; the cast diagnostic flips to acid-green when complete.

---

## Phase 5: User Story 6 — Direct audio modulation slider strip (Priority: P1)

**Goal**: Build the friendly slider surface (Volume / 3-band EQ / dual-mode Speed / Pitch / Normalize / Fade / Silence trim) that maps to the spec 036 chain primitives. This is the foundation US2 + US5 will consume.

**Independent Test**: Drag Volume to +3 dB → chain shows one `gain` op; pick Warm EQ preset → chain shows one `eq3` op with Warm values; drag back to identity → ops removed. Switch Speed to Synth mode and click Re-render → fresh worker run kicks off. Operations summary chip lists active op types in mono.

### Implementation for User Story 6

- [X] T038 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/etts_waveform.tsx` per `contracts/ui-props.contract.md` §3. Consumes `useWaveformAudio` (T018). Canvas-based; transport row with play/pause/skip/loop/download. Loop region drag handles.
- [X] T039 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/etts_waveform.css.ts`.
- [X] T040 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/eq3_control.tsx` per `contracts/ui-props.contract.md` §5 sub-section — three sliders (Low / Mid / High) + preset chip row (Flat / Warm / Bright / Voice / Telephone). Each preset snaps the three sliders to documented values (defined inline as a constant).
- [X] T041 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/eq3_control.css.ts`.
- [X] T042 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/speed_control.tsx` — segmented selector (Audio / Synth) + slider (0.5..2.0×) + `Re-render at synth-time` action. Hides Synth mode when `supports_per_utterance_speed` is false (FR-080).
- [X] T043 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/speed_control.css.ts`.
- [X] T044 [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/direct_mod_slider_strip.tsx` per `contracts/ui-props.contract.md` §5 — composes Volume / Eq3Control / SpeedControl / Pitch / Normalize / Fade / Silence trim. Single `onChange` mutation entry-point. Consumes `useChainState` (T016). 200 ms debounce on release per FR-085. Mid-drag commit on slider switch per FR-086.
- [X] T045 [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/direct_mod_slider_strip.css.ts` — FR-013 duty rule applied (magma for manual sliders); violet focus ring per FR-052a (Constitution accessibility); Operations summary chip styling.
- [X] T046 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/edit_chain_panel.tsx` per `contracts/ui-props.contract.md` §4 — chain row list + builder + undo/redo + copy-JSON.
- [X] T047 [P] [US6] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/edit_chain_panel.css.ts`.
- [X] T048 [US6] Verify `keyboard accessibility` per FR-088 — every slider supports arrow keys (1 step), Page Up/Down (10 steps), Home/End (extreme values). Add an a11y-focused vitest spec asserting tab-order + arrow-key behavior with `@testing-library/user-event`.

**Checkpoint**: User Story 6 functional in isolation — the slider strip can be opened against any utterance fixture, mutations atomically reflect in the chain JSON, identity-state ops are removed, debounce works.

---

## Phase 6: User Story 2 — Per-utterance audio editing surface (Priority: P1)

**Goal**: Wire the slider strip + edit chain panel + waveform into the run-detail view so operators reach a per-utterance edit surface in ≤2 clicks from the recipe screen and complete the canonical "trim and normalize" workflow in <30s.

**Independent Test**: Open a successful run → click an utterance → waveform + transport + edit chain + slider strip render. Apply `trim 0.10..2.40s` then `normalize -16 LUFS` then `fade_out 200ms`. Preview cached; download WAV; bytes match cached preview.

### Implementation for User Story 2

- [X] T049 [US2] Modify `extensions/builtin/emotion-tts/web/src/views/run_detail/components/per_utterance_edit.tsx` (existing per spec 036) to host `EttsWaveform` (T038) + `DirectModSliderStrip` (T044) + `EditChainPanel` (T046) in a single edit panel. The slider strip is the primary surface; the chain panel collapses to a one-line summary chip until expanded.
- [X] T050 [US2] Update `extensions/builtin/emotion-tts/web/src/views/run_detail/components/per_utterance_edit.css.ts` for the new triple-panel layout. Reuse existing `Panel` + `EditSurface` primitives from spec 037.
- [X] T051 [US2] Wire the run-detail `run_detail.view.tsx` smart container so each utterance card has a "Open editor" affordance that toggles the per-utterance edit panel inline (FR-070). The 2-click target is: utterance card → editor opens.
- [X] T052 [US2] Verify download-WAV serves the cache-bound output, not re-render (FR-076). Add an integration test that captures the cached preview's content-hash and compares against the downloaded WAV's content-hash.
- [X] T053 [US2] Verify undo/redo per FR-074 — add a vitest spec asserting that `undo` removes the last op (not soft-deletes) and `redo` re-adds it; clearing the chain wipes both stacks.

**Checkpoint**: User Story 2 fully functional. Operator completes the canonical SC-003 workflow (`trim → normalize → fade_out → preview → download`) in <30 seconds wall-clock with cached previews <500 ms.

---

## Phase 7: User Story 4 — Advanced emotion control (Priority: P2)

**Goal**: Interactive 8-axis radar drag + axis chips + dominant readout + magnitude + save-current-as-preset composer + custom preset library with deletion + Qwen prompt → vector mapping + alpha global mix.

**Independent Test**: Drag radar to set `happy=0.62, surprised=0.34, calm=0.18`; dominant readout shows "happy", magnitude `‖v‖ = 0.71`. Name the preset "Friendly Teen", save. Switch to Qwen mode, type "exhausted but trying to stay upbeat", click Map-to-vector, see radar update. Switch back to Vector mode and select "Friendly Teen" preset.

### Implementation for User Story 4

- [X] T054 [P] [US4] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/etts_radar.tsx` per `contracts/ui-props.contract.md` §1. Consumes `useRadarDrag` (T017). 360 px square (responsive down to 240 px at 320 px viewport). Real-time drag updates with debounced commit on release.
- [X] T055 [P] [US4] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/etts_radar.css.ts`.
- [X] T056 [P] [US4] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/etts_radar_mini.tsx` (read-only fingerprint variant) per `contracts/ui-props.contract.md` §2.
- [X] T057 [P] [US4] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/save_preset_composer.tsx` per `contracts/ui-props.contract.md` §7. Auto-name from `suggestPresetName` (T014). Save dispatches via existing `presets_client`.
- [X] T058 [P] [US4] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/save_preset_composer.css.ts`.
- [X] T059 [P] [US4] Implement the preset library section (built-in + custom rows) inside the Section 04 / Emotion slot. Each preset row uses `EttsRadarMini` (T056). Custom presets get a delete glyph with confirmation per FR-046.
- [X] T060 [US4] Wire the four mode segments (`none` / `audio` / `vector` / `qwen`) per FR-040..FR-049. `qwen` mode hides Synth speed if no inference backend leasable (FR-047 + R4 + spec 037 lease provider integration).
- [X] T061 [US4] Implement the `Alpha · global mix` slider in every mode except `none` per FR-049. Hint clarifies that per-line `[Char|...]` overrides bypass alpha.
- [ ] T062 [US4] Verify `prefers-reduced-motion` substitution per FR-050 — radar drag commits without spring easing; preset-flip transitions instant; functionality preserved.
- [ ] T063 [US4] Add SC-008 verification — vitest spec round-trips a custom preset across a simulated reload (`presets_client` mock) and asserts persistence + deletion irreversibility.

**Checkpoint**: User Story 4 fully functional. Radar interactive on desktop + touch; preset save/delete persists; Qwen prompt routes through the spec 037 lease provider; alpha mix works.

---

## Phase 8: User Story 5 — Voice-asset waveform manipulation (Priority: P2)

**Goal**: Apply edit chains to voice assets (reference recordings) so operators clean noisy lead-ins / normalize loudness / fade-in before binding the asset to a character.

**Independent Test**: Bind Bob to a reference audio with a 0.3s noisy lead-in. Open the mapping editor for Bob; the voice-asset waveform renders. Apply `trim 0.30..end`. Save chain; chain digest indicator appears on the cast row. Run a fresh batch — Bob's lines use the trimmed reference (verified via output-audio inspection or duration delta).

### Implementation for User Story 5

- [X] T064 [US5] Modify `extensions/builtin/emotion-tts/web/src/views/mapping_editor/components/audio_edit_panel.tsx` (existing per spec 036) to host `EttsWaveform` + `DirectModSliderStrip` + `EditChainPanel` for the voice-asset target_kind. Hide the Synth speed mode entirely (FR-094).
- [X] T065 [US5] Update the cast row (T033) to show a chain-digest indicator when `voice_asset_chain_digest` is non-null per FR-091. Use mono prefix-style (first 8 chars of digest).
- [X] T066 [US5] Wire the chain digest write-back to `mappings_client` (T021 additive) on save. Verify subsequent generations use the edited reference (cache key bound to chain digest per FR-092).
- [X] T067 [US5] Implement multi-character confirmation per FR-093 — when a voice asset is referenced by multiple characters and the operator edits the chain, surface a confirmation listing every affected character before applying.
- [X] T068 [US5] Add SC-010 verification — vitest spec creates a mapping, applies a chain, simulates reload, asserts the chain digest persists and the cast row's indicator renders.

**Checkpoint**: User Story 5 fully functional. Voice-asset edits persist with mappings; subsequent generations use the chain'd reference.

---

## Phase 9: User Story 7 — Edit history + audit trail (Priority: P3)

**Goal**: Surface the existing `ext_emotion_tts__audio_edit_log` (spec 036) as a collapsible audit history panel with revert + export capabilities.

**Independent Test**: Apply two edit chains across two sessions; open the audit history panel; events render in reverse-chronological order with timestamp / target / op count / chain digest / actor. Click `Revert to this chain` on an earlier event; chain re-renders to that prior state. Click `Export JSON`; browser downloads the full history.

### Implementation for User Story 7

- [X] T069 [P] [US7] Implement the audit projection endpoint per `contracts/audit.openapi.yaml` — extend the existing spec 036 `router/audit.rs` with `GET /api/v1/extensions/nexus.audio.emotiontts/audio_edit/audit?target_kind=...&target_id=...&limit=...&cursor=...`. Returns `{events, next_cursor?}`. Cursor-based pagination with `last-event-id` opaque cursor.
- [ ] T070 [P] [US7] Add a backend contract test for the new endpoint at `extensions/builtin/emotion-tts/rust/tests/audit_projection_test.rs` covering: empty log → `events: []`, single event → returns the event, multi-event reverse-chrono ordering, limit honored, cursor pagination, 404 on unknown target_id, 400 on missing params.
- [X] T071 [US7] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/audit_history_panel.tsx` per `contracts/ui-props.contract.md` §11. Collapsible; consumes `audit_client.ts` (T019); `Revert to this chain` calls `audio_edit_client.upsertChain(prior_chain)` which writes a NEW audit row per FR-092.
- [X] T072 [US7] Implement `extensions/builtin/emotion-tts/web/src/views/recipe/components/audit_history_panel.css.ts`.
- [X] T073 [US7] Wire the audit panel into the recipe view + run-detail view + mapping editor. Each context filters by `target_kind` + `target_id`.
- [X] T074 [US7] Implement Export JSON per FR-093 — client-side JSON download with the full filtered audit trail.

**Checkpoint**: User Story 7 fully functional. Audit history surfaces; revert + export work.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gates + visual baselines + documentation + audit close-out.

- [ ] T075 [P] Run `pnpm audit:redesign` and verify 0 un-suppressed findings on the branch tip (SC-006). If any findings appear, address per the spec 037 conventions (token migrate where exact match exists; annotate with category-specific reasons otherwise).
- [ ] T076 [P] Run `pnpm test:a11y` and verify zero serious/critical violations on the redesigned routes (SC-007). Document any inherited issues with rationale per spec 037 precedent.
- [ ] T077 [P] Re-capture Playwright visual baselines after every cosmetic adjustment (SC-001). Commit deltas.
- [ ] T078 [P] Run `cargo test -p nexus-extension-deps --test boundary_test` — expect 2/2 pass (SC-011).
- [ ] T079 [P] Run `cargo test -p nexus-api` — verify no regression in host contract tests after the audit-projection endpoint added (T069 is in extension Rust subproject, not host, so this should be a no-op verification).
- [ ] T079a [P] Run the existing EmotionTTS extension test suite (`cd extensions/builtin/emotion-tts/web && pnpm test`) — verify every existing service-client contract continues to pass without modification per **SC-009**. Any failure indicates an inadvertent contract change and is a merge blocker.
- [X] T080 [P] Update `extensions/builtin/emotion-tts/web/README.md` with the new section anatomy (vertical-stacked 6-section layout), the new component inventory (radar / waveform / edit-chain / slider strip / cast row / save-preset / parsed dialogue / pre-flight / recent runs / audit history), and a pointer to the design direction in `plan.md`.
- [ ] T081 Add the SC-013 perceived-latency assertion — Playwright spec measures slider readout update within 16 ms of pointer-move + cache-bound preview <500 ms after release (one drag per slider type).
- [ ] T081a Add the **SC-002 radar-drag latency** assertion — Playwright spec drags a radar axis from one position to another via `dispatchEvent('pointermove', ...)` and measures the elapsed time between dispatch and the corresponding axis-chip readout DOM update. Asserts < 50 ms per FR-042 + SC-002. Use `performance.now()` deltas with median of 5 trials.
- [ ] T082 Add the SC-015 verification — Playwright spec mocks the runtime capability response with `supports_per_utterance_speed = false` and asserts the Synth speed mode is hidden; flips to `true` and asserts Synth mode appears with no console warning.
- [ ] T082a Add the **SC-012 preview-latency** assertion — Playwright spec applies a single `gain` op to a representative ≤60 s utterance and measures cache-warm + cache-cold preview re-render times. Asserts cache-warm < 500 ms and cache-cold < 3 s on the documented dev-host baseline. Gated behind `RUN_E2E=1`.
- [ ] T082b Add the **SC-004 ≤2-clicks-to-editor** assertion — Playwright spec navigates from the recipe screen → run-detail → utterance editor and counts user-visible clicks (page.locator clicks, NOT route navigations). Asserts `clickCount <= 2` per SC-004.
- [ ] T083 Run the spec 038 quickstart §4 final-checks block. Every checkbox must pass before marking the spec complete.
- [X] T084 Update CLAUDE.md (auto-generated from feature plans) with the spec 038 entry by re-running `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` if it has drifted.
- [ ] T084a [P] Add a two-tab concurrent-edit smoke test (Playwright) — opens the same recipe screen in two browser contexts, mutates `script` in tab A, mutates `vec` in tab B, verifies last-write-wins for the recipe-screen-local state and that audio-edit chains persist correctly under simultaneous writes. Asserts no chain corruption (digest stable). Edge case from spec.md addressed; not blocking but documents the v1 last-write-wins contract.
- [X] T085 Create + commit `specs/038-emotiontts-recipe-studio/deferred-tests.md` mirroring spec 037's pattern — list per-component vitest deferred under Principle VI design-heavy carve-out, any other deferred coverage filed during implementation, and the explicit cite of FR-110a (visual-only restyle carve-out invocation).
- [X] T086 Final boundary scan — `grep -rn "local-llm\|local_llm\|emotion-tts\|emotiontts" apps/web/src/ crates/` returns no NEW matches versus the spec 037 grandfathered baseline. Boundary is preserved per FR-110.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Blocks ALL user stories. Sub-phase order: migrations + worker can run in parallel with frontend pure helpers.
- **User Stories**: Once Foundational is complete:
  - **US1 (P1)** can start immediately — layout-only, no functional dependencies.
  - **US3 (P1)** can start immediately — independent of US1's layout work; can integrate after both land.
  - **US6 (P1)** can start immediately — produces the slider strip + edit chain panel + waveform that US2 + US5 consume.
  - **US2 (P1)** depends on US6 (consumes the slider strip + edit chain panel + waveform).
  - **US4 (P2)** can start immediately — independent of other stories.
  - **US5 (P2)** depends on US6 (same components as US2; different target_kind).
  - **US7 (P3)** depends on its own backend endpoint (T069); independent of other stories.

### User Story Dependencies (canonical order)

1. **US1** & **US3** & **US6** in parallel (after Foundational) — pure P1 plumbing.
2. **US2** after **US6** completes — consumes US6 components.
3. **US4** in parallel with US2 — independent.
4. **US5** after **US6** — same components as US2.
5. **US7** after audit endpoint (T069) — fully independent of other stories.

### Within Each User Story

- Pure helpers (T011–T015) before consumers (T016+).
- Hooks (T016–T018) before components.
- Components before view-level integration.
- View-level integration before visual baselines.

### Parallel Opportunities

- **All tasks marked [P]** within the same user story can run in parallel (different files, no cross-task dependencies).
- **Worker tasks (T008, T010)** parallel with frontend pure helpers (T011, T013, T015).
- **Migrations (T006, T007)** parallel with everything else in Phase 2.
- **US1, US3, US4** can run in three parallel tracks once Foundational is done.
- **US6 + US2 + US5** form a sequential chain (US6 → US2 + US5).
- **Polish phase tasks (T075..T080)** all parallel.

---

## Parallel Example: Foundational Phase (Phase 2)

```bash
# Worker side (independent of frontend):
Task: "T006 Create migration 018_eq3_op_support.sql"
Task: "T007 Create migration 019_voice_asset_chain_digest.sql"
Task: "T008 Write pytest cases in worker/audio_edit/tests/test_eq3.py"
Task: "T009 Add eq3 to chain-runner registry in worker/audio_edit/ops.py"
# T010 follows T008+T009 sequentially.

# Frontend pure helpers (parallel with worker):
Task: "T011 Write vitest chain ↔ slider bijection suite"
Task: "T012 Write vitest parse_dialogue suite"
Task: "T013 Implement slider_chain.ts"
Task: "T014 Implement preset_naming.ts"
Task: "T015 Implement parse_dialogue.ts"

# Service-client extensions (parallel with hooks):
Task: "T019 Add audit_client.ts"
Task: "T020 Extend runtime_client.ts"
Task: "T021 Extend mappings_client.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 + part of Foundational)

Quickest visual win to address the user's "looks like shit" complaint:

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (focus on T013–T018 pure helpers + hooks; defer T008–T010 worker work)
3. Complete Phase 3: User Story 1 (layout fix at all 5 viewports)
4. **STOP and VALIDATE**: Take screenshots at the 5 viewports; verify no clipping; demo to the user.
5. The screen now reads as designed; subsequent stories add functional capabilities.

### Incremental Delivery

1. Setup + Foundational (worker + frontend) → Foundation ready.
2. **MVP-1**: US1 layout fix → Demo (the "screen no longer looks bad" milestone).
3. **MVP-2**: US3 inline cast mapping → Demo (the "no more separate Mappings page" milestone).
4. **MVP-3**: US6 slider strip + US2 per-utterance audio editing → Demo (the "audio editing actually exists" milestone — closes the user's primary complaint).
5. **Polish-1**: US4 advanced emotion control → Demo.
6. **Polish-2**: US5 voice-asset editing → Demo.
7. **Polish-3**: US7 audit history → Demo.
8. Phase 10 close-out → Merge to main.

### Parallel Team Strategy

With multiple developers (or parallel agents):

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: US1 (layout) + US3 (cast mapping) — same domain, different sections.
   - Developer B: US6 (slider strip + chain panel + waveform).
   - Developer C: US4 (radar + presets + Qwen).
3. Once US6 is done:
   - Developer B (or fresh contributor): US2 (per-utterance editing) + US5 (voice-asset editing).
4. US7 picks up at any point after T069 lands.
5. Phase 10 polish parallelizes across the team.

---

## Notes

- [P] tasks = different files, no cross-task dependencies.
- [Story] label maps each task to its user story for traceability.
- Each user story is independently completable + testable.
- Backend contract tests (T008, T070) are TDD — write tests first, watch them fail, implement to GREEN.
- Frontend pure-function tests (T011, T012, T014) are TDD — same pattern.
- Visual-only restyles (T024a, T025, T031, T038, T040, T044, T046, T054, T056, T057, T071) DO NOT have per-component vitest under the design-heavy carve-out; visual regression baselines (T029, T077) provide the safety net. T024 (Frame the interface first) IS mandatory and gates every other US1 task.
- A11y baselines (T076) are MANDATORY — Constitution VI carve-out does NOT extend to a11y.
- Boundary discipline (T086) is MANDATORY — Constitution XIII NON-NEGOTIABLE.
- Commit after each task or logical group; conventional commit prefixes per Constitution IX.
- Stop at any checkpoint to validate the story independently.
- Avoid: vague tasks, same-file conflicts (use [P] only when files are disjoint), cross-story dependencies that break independence (US1, US3, US4 stay independent; US2 + US5 explicitly depend on US6).

**Total task count**: 99 tasks (T001..T086 + 13 sub-lettered tasks T024, T024a, T028a..T028g, T079a, T081a, T082a, T082b, T084a; original T024 became the XII.8 "Frame the interface first" mandate, original T024 rewrite became T024a).
**Per-phase counts**: Setup 5 · Foundational 18 · US1 15 · US3 7 · US6 11 · US2 5 · US4 10 · US5 5 · US7 6 · Polish 17.
**Parallel opportunities**: 55 of 99 tasks marked `[P]` (≈ 56%).
**Per-user-story counts**: US1=15, US2=5, US3=7, US4=10, US5=5, US6=11, US7=6.

**Post-analysis revision (2026-05-03)** — `/speckit-analyze` first pass surfaced 1 CRITICAL + 4 HIGH + 4 MEDIUM + 5 LOW findings. Every finding was applied:
- C1 (CRITICAL, Constitution XII.8) — added T024 "Frame the interface first" task; original T024 rewrite renumbered to T024a.
- F1 (HIGH) — fixed T067 FR-083 → FR-093 citation.
- G1 (HIGH) — added T028a..T028f for Performance sliders + Pre-flight block + Recent runs components.
- G2 (HIGH) — added T028g for Script section syntax legend + right-side meta.
- G3 (HIGH) — added T081a for SC-002 radar-drag latency assertion.
- G4 (HIGH) — added T079a for SC-009 existing-test-suite verification.
- G5 (MEDIUM) — added T082a for SC-012 preview-latency assertion.
- G6 (MEDIUM) — added T082b for SC-004 ≤2-clicks-to-editor assertion.
- A1 (MEDIUM) — amended FR-070 with explicit 60s threshold + ≤512 peaks downsample contract.
- I1 (MEDIUM) — clarified T085 wording from "Commit the deferred-tests.md" to "Create + commit deferred-tests.md".
- I2 (LOW) — added an FR numbering-gap note in spec.md between FR-088 and FR-090.
- F2 (LOW) — added [P] marker to T046 (different file from T047).
- F3 (LOW) — tightened T045 wording to cite FR-013 duty rule explicitly.
- U1 (LOW) — amended FR-080 with explicit `runtime_client.getCapabilities()` mount-time check.
- A2 (LOW) — added T084a for two-tab concurrent-edit smoke test.
