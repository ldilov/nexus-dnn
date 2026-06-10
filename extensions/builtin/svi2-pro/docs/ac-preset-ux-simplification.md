# Acceptance Criteria — svi2-pro Preset UX Simplification

Status: IMPLEMENTED 2026-06-10 (ralph-loop iteration 1). Every criterion is testable; the loop is done
only when ALL boxes hold simultaneously and all quality gates pass.

Scope: `extensions/builtin/svi2-pro/` (worker + web + rust + data/schemas) plus ONE generic host
change (model-store installed DTO). Host ↔ extension boundary rules apply — zero `svi2`/`wan`
literals in host code.

---

## A. Preset catalog metadata (data/render_presets.json + schema + worker)

- [x] A1. Each preset object supports two new OPTIONAL boolean fields: `legacy` and `hidden`.
      Absent = false. The presets JSON is the single source of truth — the web app MUST NOT
      hardcode legacy/hidden preset-id lists.
- [x] A2. These presets are marked `"legacy": true`: `natural-reference`, `natural-rife48`,
      `forced-motion-24`, `natural-reference-lowvram`, `natural-rife48-lowvram`,
      `forced-motion-24-lowvram`, `chained-single-prompt-lowvram`.
- [x] A3. These presets are marked `"hidden": true` (folded into the resolution selector, §D):
      `svi-canonical-704`, `svi-canonical-640`. They stay in the JSON (params remain the
      canonical step-down reference) but never render as gallery cards.
- [x] A4. `flf2v-morph-lowvram` stays visible (NOT legacy, NOT hidden).
- [x] A5. `svi-canonical` stays first and is the default-selected preset.
- [x] A6. Worker preset tests (`test_render_presets.py`, `test_preset_contract.py`,
      `test_presets_validate_against_schema.py`) updated: they assert the new fields are
      well-formed (boolean when present) and that exactly the ids in A2/A3 carry the flags.
- [x] A7. Web `PresetSummary` type gains `legacy?: boolean; hidden?: boolean`.

## B. Canonical defaults: 85 frames per segment @ 16 fps

- [x] B1. `svi-canonical`, `svi-canonical-704`, `svi-canonical-640` all change
      `frames_per_clip` 69 → **85** (4n+1 holds: 85 = 4·21+1). All other canonical params
      unchanged (`fps: 16`, `num_overlap_frame: 5`, `interpolate_fps: 48`,
      `interpolate_method: "rife"`, `pixel_re_encode: false`, `stitch_mode: "trim"`, etc.).
- [x] B2. `num_clips` in those three presets changes 5 → **6** (default length 30 s, §C math).
- [x] B3. `fields.ts` defaults follow: `frames_per_clip` default 85, `num_clips` default 6.
      Help text updated (no stale "69 @ 5 clips ≈ 20s" copy anywhere).
- [x] B4. Preset `notes`/`description` strings updated where they reference 69/5-clip/20.3 s math.
      New stitched math: frames = 85 + (n−1)·(85−5) = 85 + 80(n−1); 6 clips → 485 f @ 16 fps
      ≈ 30.3 s native, RIFE-interpolated to 48 fps.
- [x] B5. Worker validation accepts the new defaults unchanged (85 within existing 4n+1 + max
      bounds); a pytest asserts `svi-canonical` params pass `validate_render_params` verbatim.

## C. Duration-first length control (web)

- [x] C1. New core-tier control **"Length"** replaces `num_clips` + `frames_per_clip` in the
      "Basics" tier. Options: 10 s, 20 s, 30 s (default), 60 s, 120 s, plus **Custom seconds**
      numeric input (1–600).
- [x] C2. Derivation (pure function, unit-tested):
      `targetFrames = durationSeconds * fps`;
      `numClips = max(1, ceil((targetFrames - framesPerClip) / (framesPerClip - numOverlapFrame)) + 1)`
      using the CURRENT `frames_per_clip`/`fps`/`num_overlap_frame` param values (defaults
      85/16/5). Selecting a length writes the derived `num_clips` into params;
      `frames_per_clip` stays at its param value.
      Reference points (85/16/5): 30 s → 6 clips (485 f ≈ 30.3 s); 60 s → 12 clips
      (965 f ≈ 60.3 s). Derived duration must always be ≥ requested duration.
- [x] C3. A live summary line renders under the control:
      `"{numClips} × {framesPerClip} frames @ {fps} fps → {actual}s native (RIFE → {interpolateFps} fps)"`
      (RIFE suffix only when `interpolate_fps > 0`). Values recompute on any dependent change.
- [x] C4. `num_clips` and `frames_per_clip` remain directly editable but move to the collapsed
      "Coherence (canonical mechanics)" advanced tier. Manually editing either switches the
      Length control to "Custom" state showing the resulting seconds (two-way sync, no loops).
- [x] C5. Default state on first load (no user edits): Length = 30 s, 6×85 @ 16 fps.
- [x] C6. Unit tests cover: each preset length option → expected clip count; custom seconds;
      manual num_clips edit flips selector to Custom; fps/frames_per_clip change recomputes.

## D. Resolution selector: 3 native steps (web)

- [x] D1. New core-tier control **"Generation resolution"** with exactly 3 radio options sourced
      from the canonical family params (NOT duplicated literals — read from the presets catalog
      entries `svi-canonical` / `svi-canonical-704` / `svi-canonical-640`):
      • **832×480 — native (SVI 2.0 Pro 480p training budget)** [default]
      • **704×400 — one step down** (badge: off-distribution)
      • **640×368 — two steps down** (badge: off-distribution)
      All same aspect ratio family (26:15), all /16-divisible.
- [x] D2. Selecting an option writes `width`/`height` into params. The existing off-budget
      resolution warning still fires for the two step-down options (worker behaviour unchanged).
- [x] D3. Raw `width`/`height` number fields move to an advanced tier; manual edits flip the
      selector to a "Custom" state (shown as a 4th, non-default state — not a preset option).
- [x] D4. Gallery no longer shows `svi-canonical-704` / `svi-canonical-640` cards (hidden via A3);
      their behaviour is fully reachable through this selector.
- [x] D5. Unit tests: option click → params; custom edit → Custom state; default = 832×480.

## E. Legacy presets hidden behind disclosure (web)

- [x] E1. Gallery default view renders ONLY non-legacy, non-hidden presets (post-A flags:
      `svi-canonical` + `flf2v-morph-lowvram`).
- [x] E2. A disclosure control labelled `Show legacy presets (N)` (N = legacy count, computed)
      sits below the visible cards; clicking expands the legacy cards in-place with their
      existing badges; label flips to `Hide legacy presets`. Collapsed by default on every load
      (no persistence required).
- [x] E3. Keyboard navigation (arrow/Home/End radiogroup behaviour) works across the visible
      set in both collapsed and expanded states; expanding does not steal focus.
- [x] E4. If a legacy preset is currently selected and the list collapses, the selected card
      remains visible (selection is never hidden).
- [x] E5. Default selection on first load is `svi-canonical` AND its params are actually applied:
      fix the store so that when no `initialPreset` is supplied, the canonical preset's params
      are applied once the catalog loads (today `presetId` is set to canonical but params stay
      at field defaults — after B/C they must converge; an explicit test pins catalog-applied
      params === store params on first load, before any user edit).
- [x] E6. Unit tests: collapsed default, count label, expand/uncollapse, E4 sticky-selection,
      E5 default-application.

## F. Wan2.2 base-model substitution (host generic + extension)

- [x] F1. HOST (generic, boundary-clean): `InstalledArtifactDto` in
      `crates/nexus-api/src/handlers/model_store/installed.rs` gains
      `install_path: Option<String>` — the absolute path of the installed artifact file
      (`<sink_root>/<job_id>/<filename>`), populated by the host install map (which owns the
      layout). No extension-specific logic, no new routes. Rust unit test asserts the path is
      present and absolute for an installed row. Boundary grep stays clean
      (`grep -rn "svi2\|wan2" crates/nexus-api/src/handlers/model_store/` → zero hits).
- [x] F2. EXTENSION WEB: new "Base model (Wan2.2-I2V)" select. First option (default):
      `Wan2.2-I2V-A14B fp8 (Kijai, bundled)` → no overrides sent. Remaining options come from
      `GET /api/v1/model-store/installed`, filtered EXTENSION-SIDE: group rows by `family_id`;
      a family qualifies as a candidate when it has ≥2 files whose `filename`s match
      /wan[\s._-]?2[._]2/i AND /i2v/i, with one matching /high/i and one matching /low/i, and
      `install_path` present, format `safetensors` or `gguf`. Filtering logic is a pure,
      unit-tested function.
- [x] F3. Selecting a candidate writes `dit_high_path`/`dit_low_path` (absolute `install_path`s)
      into render params; selecting the bundled default removes both keys.
- [x] F4. Worker contract: `dit_high_path` + `dit_low_path` added to
      `schemas/svi2_render_params.schema.json` (type string, optional) and accepted by
      `validate_render_params` (must exist as files at render time on the real pipeline; the
      fake pipeline ignores them). `RenderParams` TS type gains both optional fields.
      Pytest: params with overrides validate; pipeline_svi2 wiring test asserts overrides win
      over `models_dir` resolution (already implemented at pipeline_svi2.py:262-265 — pin it).
- [x] F5. The chosen substitution persists as an extension setting (existing settings storage +
      settings router) so new renders default to it; "bundled" is the reset value. Settings
      round-trip test updated.
- [x] F6. When the model-store endpoint fails or returns no qualifying family, the select shows
      only the bundled option (no error toast storm; single inline hint).

## G. Quality gates (ALL must pass)

- [x] G1. Worker: `cd extensions/builtin/svi2-pro/worker && uv run pytest` (or project-standard
      invocation) — green, including all updated preset/schema/contract tests.
- [x] G2. Web: `pnpm -C extensions/builtin/svi2-pro/web typecheck && pnpm -C extensions/builtin/svi2-pro/web test`
      (tsc + vitest) — green.
- [x] G3. Rust: `cargo test -p svi2-pro-extension` — green; plus host crate test for F1
      (`cargo test -p nexus-api model_store` or equivalent scoped run).
- [x] G4. Rebuild committed web bundle: `pnpm -C extensions/builtin/svi2-pro/web build` and the
      refreshed `web/dist/svi2-pro.{js,css}` included in the change set.
- [x] G5. Boundary check: `grep -rn "svi2\|svi-canonical\|wan2" crates/nexus-api/src crates/nexus-models-store/src apps/web/src` → zero NEW hits attributable to this change.
- [x] G6. No new lint violations: `pnpm -C extensions/builtin/svi2-pro/web lint` (biome) and
      `cargo clippy -p svi2-pro-extension` clean.

## Non-goals

- No GPU render verification (params-level only).
- No new host routes; no host knowledge of Wan/SVI semantics.
- No changes to legacy preset params themselves.
- No persistence of gallery expand/collapse state.
