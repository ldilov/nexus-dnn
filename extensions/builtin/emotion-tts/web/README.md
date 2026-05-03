# EmotionTTS — Web Bundle

Frontend for the EmotionTTS Nexus extension. Mounts under the host's generic
`/extensions/:layoutId` route as a custom element (`<emotion-tts-app>`).

## Recipe Studio anatomy (spec 038)

The Recipe Studio surface uses a **vertical-stacked editorial layout** at every
viewport (320 / 768 / 1024 / 1440 / 1920 px). Sections separate via tonal
surface shifts, not 1px dividers. Composition is asymmetric — radar canvas
LEFT, axis chips RIGHT in the Emotion section; cast cards in a single column
(not 3-up grid).

```
EmotionTTS · Recipe Studio (deployment header — runtime + chips + meta)
│
├── 01 / Script
│   └── Script editor + chars/lines/words mono meta + syntax legend (5 forms)
│
├── 02 / Parsed dialogue
│   └── Character-colored line list with per-line override badges
│
├── 03 / Cast
│   ├── Aggregated chip — "All N mapped" / "K of N unmapped"
│   └── Single-column rows (CastRow)
│       ├── Avatar + name (character color)
│       ├── Mapping summary (asset name + duration + sample rate, OR preset name)
│       ├── Chain digest indicator (when present)
│       └── Mapped/Unmapped status chip
│       └── (active) → drop-zone + reference library + preset grid
│
├── 04 / Emotion (split body — radar LEFT, controls RIGHT)
│   ├── EttsRadar (interactive 8-axis drag) + axis chips + dominant readout + magnitude
│   └── Mode segmented (none / audio_ref / vector / qwen)
│       ├── (vector mode) → SavePresetComposer + PresetLibrary + alpha slider
│       └── (qwen mode)   → Qwen prompt textarea + alpha slider
│
├── 05 / Performance
│   ├── PerformanceSliders (Intensity / Pace / Pitch — magma)
│   ├── DirectModSliderStrip (Volume / EQ3 / Speed / Pitch / Normalize / Fade / Silence trim)
│   ├── PreFlightBlock (script + cast + emotion + performance diagnostics)
│   ├── GenerationSettingsPanel (legacy)
│   └── RunPanel (Generate)
│
└── 06 / Recent runs
    └── Last 5 runs (mono id + status + time + kind) + Open queue link
```

## Component inventory

### New in spec 038 (under `src/views/recipe/components/`)

| Component | Purpose |
|---|---|
| `etts_radar.tsx` | Interactive 8-axis emotion radar (drag + keyboard). |
| `etts_radar.tsx#EttsRadarMini` | Read-only fingerprint thumbnail for preset cards. |
| `etts_waveform.tsx` | Web Audio + canvas waveform with transport controls. |
| `eq3_control.tsx` | 3-band parametric EQ with preset chips (flat/warm/bright/voice/telephone). |
| `speed_control.tsx` | Dual-mode segmented (Audio/Synth) + slider + re-render action. |
| `direct_mod_slider_strip.tsx` | Composes Volume / EQ3 / Speed / Pitch / Normalize / Fade / Silence trim. |
| `edit_chain_panel.tsx` | Chain row list + builder + undo/redo + copy-JSON. |
| `cast_row.tsx` | Inline cast row with expandable assignment surface. |
| `cast_row.tsx#CastSection` | Aggregated chip + cast-row list wrapper. |
| `save_preset_composer.tsx` | Auto-name composer for current vector. |
| `save_preset_composer.tsx#PresetLibrary` | Preset shelf with EttsRadarMini fingerprints. |
| `parsed_dialogue.tsx` | Character-colored dialogue line list with override badges. |
| `performance_sliders.tsx` | Intensity/Pace/Pitch high-level sliders. |
| `pre_flight_block.tsx` | Diagnostic checks (script/cast/emotion/performance). |
| `recent_runs.tsx` | Last-N runs list. |
| `emotion_studio.tsx` | Composes EttsRadar + SavePresetComposer + PresetLibrary + Qwen + alpha. |

### Pure helpers (under `src/views/recipe/lib/`)

| Helper | Purpose |
|---|---|
| `slider_chain.ts` | Bidirectional bijection between `DirectModSliderState` and `EditChain`. |
| `parse_dialogue.ts` | Dialogue parser + override classification + character color assignment. |
| `preset_naming.ts` | Auto-suggest preset name + dominant axis + magnitude + clamp + blend. |

### Hooks (under `src/views/recipe/hooks/`)

| Hook | Purpose |
|---|---|
| `use_chain_state.ts` | Chain state with debounced commit (200 ms) + undo/redo (32 ops). |
| `use_radar_drag.ts` | Pointer + keyboard radar interaction with clamp + commit-on-release. |
| `use_waveform_audio.ts` | Web Audio API decode + downsample to 512 peaks. |

## Design direction

See `src/views/recipe/DESIGN.md` for the complete visual manifest:
visual direction (Editorial / Spectral Graphite — "Kinetic Observatory"),
palette duty mapping (FR-013), typography pairing, spacing rhythm, motion rules,
surface treatment, and per-component token consumption table.

## Service-client extensions

Spec 038 added these contract-additive fields:

- `audio_edit_client.ts` — new op modes: `gain`, `eq3`, `pitch_shift`, `silence_strip` with bound constants. No new endpoint.
- `mappings_client.ts` — `CharacterMapping.voiceAssetChainDigest` (optional, nullable).
- `runtime_client.ts` — `supportsPerUtteranceSpeed(handshake)` helper reading the existing capabilities array.
- `audit_client.ts` — new thin facade over the existing `fetchAuditLog` exposing `listAuditEvents()` per spec 038 contract.

## Dev workflow

```bash
# Type-check
pnpm tsc --noEmit

# Pure-function tests (vitest)
pnpm vitest run

# Build
pnpm vite build

# Worker tests (from worker/ subfolder, with .venv active)
cd ../worker && .venv/Scripts/python -m pytest tests/test_audio_edit_*.py -v
```

## Storage migrations

Spec 038 adds two migrations under `../storage/migrations/`:

- `022_eq3_op_support.sql` — forward-compat marker for `eq3` mode in the audit log.
- `023_voice_asset_chain_digest.sql` — adds nullable `voice_asset_chain_digest` column to `ext_emotion_tts__character_mappings`.

The numbering deviates from spec 038 plan (`018`/`019`) because slots 018-021 were already occupied by prior specs. See migration headers for context.
