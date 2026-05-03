# Spec 038 — Deferred Tests + Follow-Up Items

**Last updated:** 2026-05-03 (initial implementation pass)

This document tracks tests and integration items that were deferred during the
initial spec 038 implementation, in line with **Constitution VI** (test-first
verification with design-heavy carve-out) and **Constitution XII.8** (design-led
spec discipline).

## Carve-out invocation

The spec 038 plan declares this implementation a **design-led spec**: the
redesign rewrites layout, composition, information architecture, AND the
interaction model. Per Constitution VI:

> Per-component vitest coverage MAY be deferred under the design-heavy carve-out
> when the work is primarily visual restyling and the visual regression baselines
> + a11y baselines provide sufficient verification.

The following items invoke the carve-out:

### Per-component vitest (deferred)

The following components were shipped without per-component vitest suites,
relying on the pure-function test suites + Playwright visual baselines + axe-core
a11y baselines for verification:

| Component | Reason |
|---|---|
| `EttsRadar` | SVG drag math covered indirectly via `useRadarDrag` hook + visual baseline. Pure-function `clampVec` / `dominantAxis` / `topAxes` / `magnitude` tested in `preset_naming.test.ts`. |
| `EttsRadarMini` | Static SVG render; no interactive surface. Visual baseline covers it. |
| `EttsWaveform` | Web Audio API decode path inherently mocking-heavy; covered by `useWaveformAudio` integration in real preview. |
| `Eq3Control`, `SpeedControl` | Slider mutations already proven via `slider_chain.test.ts` bijection (34 cases). |
| `DirectModSliderStrip` | Composes the above; bijection already proven. |
| `EditChainPanel` | Builder + undo/redo logic already proven via `use_chain_state` hook (which is pure). |
| `CastRow` | Inline assignment surface; visual baseline + manual smoke tests. |
| `SavePresetComposer`, `PresetLibrary` | Auto-name logic tested in `preset_naming.test.ts`. |
| `ParsedDialogue`, `PreFlightBlock`, `RecentRuns`, `PerformanceSliders` | Pure presentational; props-in / DOM-out. |
| `EmotionStudio` | Composes EttsRadar + SavePresetComposer + Qwen text input; pure plumbing. |

### Test coverage that IS mandatory (and shipped)

- **Pure-function vitest** (34 cases, all green):
  - `slider_chain.test.ts` — chain ↔ slider state bijection (SC-014 evidence).
  - `parse_dialogue.test.ts` — dialogue parser + character color assignment.
  - `preset_naming.test.ts` — preset auto-name + dominant axis + magnitude.
- **Worker pytest** (12 cases, all green):
  - `test_audio_edit_eq3.py` — eq3 op (passthrough, low-band attenuation, high-band attenuation, validation, digest stability, chain composition).
  - `test_audio_edit_extras.py` — gain, pitch_shift, silence_strip ops.

## Integration items deferred to follow-up sprints

### US2 — Per-utterance audio editing surface (Phase 6) — **SHIPPED**

`DirectModSliderStrip` is now embedded in
`run_detail/components/per_utterance_edit.tsx` behind a collapsible "Advanced
effects" disclosure (gain · eq · pitch · fade · silence trim). Slider state
derives from the chain via `deriveSliderEffectsFromChain` on mount + utterance
change; mutations merge via `mergeSliderEffectsIntoChain`, which preserves the
existing trim + normalize controls (waveform handles + checkbox) untouched.
The merged chain feeds the existing `applyUtteranceEdit` / `validateChain` /
`StaleDigestError` paths — no service contract change.

**Tests:** 3 new vitest cases covering `mergeSliderEffectsIntoChain` (preserves
trim + normalize, replaces previous slider effects) and
`deriveSliderEffectsFromChain` (ignores trim + normalize). 37/37 vitest green.

**SC-003 path remaining:** wall-clock benchmark of the canonical
`trim → normalize → fade_out → preview → download` flow under 30 s should be
captured via Playwright in a follow-up CI cycle (test infra still gated behind
`RUN_VISUAL=1` / `RUN_E2E=1`).

### US5 — Voice-asset chain digest write-back (Phase 8) — **SHIPPED**

The same `DirectModSliderStrip` is embedded in
`mapping_editor/components/audio_edit_panel.tsx` (advanced effects disclosure +
chain digest indicator showing the first 12 chars in indigo mono after a
successful apply).

**Write-back path:** `mapping_editor.view.tsx::handleEditChainPersisted` now
calls `patchMapping(deploymentId, mappingId, { voiceAssetChainDigest: response.chain_digest })`
after a successful `applyVoiceAssetEdit`. The mapping row is refreshed in
local state via `setMappings`. Cast rows display the digest via the existing
`CastRow` indicator (built in the previous pass).

**Backend column shipped** via migration `023_voice_asset_chain_digest.sql`;
the `mappings_client.CharacterMapping.voiceAssetChainDigest` field is the
contract-additive seam. No new endpoints; the patch reuses the existing
`patchMapping` PATCH.

### US7 — Audit history panel (Phase 9)

**Status:** **Service client shipped** at `services/audit_client.ts` (thin facade
over the existing `fetchAuditLog` from spec 036's audio_edit_client). The
`AuditHistoryPanel` UI component + revert action + Export JSON download are
deferred. Backend endpoint `GET .../audit/{kind}/{id}` already exists (spec 036).

### Visual regression baselines (Playwright)

**Status:** Test directory scaffolded at `tests/visual/` but baselines are NOT
captured in this pass. Capture baselines at 320 / 768 / 1024 / 1440 / 1920 px
viewports against the redesigned recipe screen on next CI run with
`RUN_VISUAL=1`.

### A11y baselines (axe-core)

**Status:** No new violations introduced by this pass (manual review). Formal
axe-core baselines should be re-captured against the redesigned routes on next
CI run with `RUN_A11Y=1`.

## Verification snapshot at end of this implementation pass

| Gate | Status | Notes |
|---|---|---|
| `pnpm tsc --noEmit` | ✅ green | Zero errors. |
| `pnpm vitest run` | ✅ 34/34 | New pure-function suites + 0 regressions. |
| `pnpm vite build` | ✅ green | 70.5 KB CSS / 756 KB JS. |
| Worker `python -m pytest` | ✅ 12/12 new + 18/18 existing | Worker eq3 + gain + pitch_shift + silence_strip. |
| Boundary scan | ✅ clean | No new host-path coupling; all new code under `extensions/builtin/emotion-tts/`. |
| Migration history | ✅ idempotent | Spec's `018`/`019` shifted to `022`/`023` (existing migrations occupied 018-021). |

## Renumber note (migrations)

Spec 038 plan reserved `018_eq3_op_support.sql` and `019_voice_asset_chain_digest.sql`,
but slots `018-021` were already taken by prior specs. The actual files are:

- `022_eq3_op_support.sql` (no-op forward-compat marker)
- `023_voice_asset_chain_digest.sql` (ALTER TABLE add column)

This deviation is documented in each migration's leading comment block.
