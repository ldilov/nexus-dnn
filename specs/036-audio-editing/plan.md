# Implementation Plan: EmotionTTS Audio Editing

**Branch**: `036-audio-editing` | **Date**: 2026-04-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/036-audio-editing/spec.md`

## Summary

Add a declarative audio-editing capability to the EmotionTTS extension covering voice
assets and per-utterance run output. Operations: `trim`, `crop`, `normalize`,
`speed`, `fade_in`, `fade_out`, `mute`. Each parent row (`ext_emotion_tts__voice_assets`
or `ext_emotion_tts__utterances`) gains a nullable `edit_chain_json` column; chains are
opaque to the host and carry stable per-op ids. A deterministic chain digest feeds the
synthesis cache key (so edits invalidate stale cache rows) and the new
`ext_emotion_tts__audio_edit_log` audit table. Two new worker RPC methods (`audio.edit`,
`audio.edit.preview`) execute every transform inside the existing IndexTTS-2 venv via
`ffmpeg-python` + `soundfile` + `pyloudnorm` (already shipped). Six new HTTP routes
mount under `/api/v1/extensions/nexus.audio.emotiontts/...`. The mapping editor's voice
asset sidebar gains a waveform editor; the run detail view gains a per-segment inline
editor. Zero host-crate edits, zero host migrations, zero new top-level routes.

## Technical Context

**Language/Version**:
- Rust 1.84 (workspace MSRV) for the extension crate `emotion-tts-extension`.
- Python 3.11–3.12 for the IndexTTS-2 worker (`extensions/builtin/emotion-tts/worker/`).
- TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the extension's Vite-bundled UI.

**Primary Dependencies**:
- Rust: `axum 0.8`, `sqlx 0.8` (SQLite, runtime-tokio), `serde`, `serde_json`,
  `sha2`, `hex`, `tokio`, `tracing`, `thiserror`, `chrono`, `nexus-extension`,
  `nexus-backend-runtimes`, `nexus-artifact`. **No new Rust crates.**
- Python (worker): `ffmpeg-python>=0.2`, `soundfile>=0.12`, `pyloudnorm>=0.1.1`,
  `numpy>=1.26,<2.0`. All already declared in `worker/pyproject.toml`. **No new
  Python deps.**
- Frontend: `react@19`, `react-router@7` (data mode), `swr@2`, `motion@12`,
  `@vanilla-extract/css`, `sonner@2`, `zod@3`. **One new optional frontend
  primitive**: a small in-house waveform component built on the Web Audio API and
  HTML Canvas — no new npm dependency. `wavesurfer.js` is the discoverable
  alternative if FR-033/FR-037 prove painful, evaluated in Phase 0 research.

**Storage**: SQLite via `nexus-storage`. Three additive migrations, all
extension-owned under `extensions/builtin/emotion-tts/storage/migrations/`:
- `015_voice_asset_edit_chain.sql` — adds `edit_chain_json TEXT` (nullable) to
  `ext_emotion_tts__voice_assets`.
- `016_utterance_edit_chain.sql` — adds `edit_chain_json TEXT` (nullable) to
  `ext_emotion_tts__utterances`.
- `017_audio_edit_log.sql` — creates `ext_emotion_tts__audio_edit_log` (audit trail).

No host migrations. No FK constraint crosses the host/extension boundary.

**Testing**:
- Rust: `cargo test -p emotion-tts-extension` for unit + integration; the existing
  `tests/http_contract_*` suite for HTTP contract; `tests/boundary_test.rs` for
  XIII compliance; new `tests/audio_edit_*` files for cache-key invalidation, chain
  digest determinism, audit-log sequencing.
- Worker: `pytest` under `worker/tests/` for the audio-edit pipeline (sample-accurate
  trim, ±5-cent pitch preservation, LUFS error bands).
- Frontend: vanilla-extract type checks via `pnpm tsc --noEmit`, Vitest for any
  component logic, plus a Playwright "interaction test" for FR-033/FR-035 (drag
  accuracy + keyboard nudge), and the design-heavy carve-out (Principle VI) for the
  waveform visualisation specifically. Backend contract tests remain mandatory.

**Target Platform**: Same as parent — Windows 11 / Linux / macOS host with the
EmotionTTS extension activated. Browser: evergreen Chromium / Firefox / Safari.

**Project Type**: Extension subproject (Rust shim + Python worker + Vite-bundled
UI) under `extensions/builtin/emotion-tts/`.

**Performance Goals**:
- Voice asset edit on a ≤ 5-minute source: ≤ 5 s wall-clock from Apply click to UI
  update (SC-002).
- Per-utterance edit: ≥ 95% wall-clock saving vs full re-synthesis (SC-006).
- Waveform drag → numeric label update at ≥ 30 FPS during drag (FR-034).

**Constraints**:
- Sample-accurate trim within ±1 ms, including for compressed inputs that require
  decode → edit → re-encode (FR-026 / SC-009).
- Pitch preservation within ±5 cents on speed change (FR-027).
- Edit chain capped at 32 ops (FR-006).
- Min trimmed duration: 100 ms (Edge Cases).
- Speed range: `[0.5×, 2.0×]` (FR-004).
- 100% cross-deployment isolation: 404 (not 403) on every new endpoint (FR-016 /
  SC-008).

**Scale/Scope**:
- ~7 new Rust source files (domain `audio_edit.rs`, audit repo, voice-asset edit
  router, run-utterance edit router, audit router, RPC params, worker RPC client
  glue), ~3 new migrations, ~2 new test files, ~3 new worker Python files (audio
  edit pipeline + tests + RPC handler), ~6 new frontend files (audio edit panel +
  waveform component + audit panel + per-segment editor + service client + view
  styles).
- Net new public HTTP surface: 6 routes (3 voice-asset, 1 utterance, 1 audit, 1
  preview).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Status | Notes |
|---|-----------|--------|-------|
| I | Ecosystem-First | PASS | Reuses `ffmpeg-python`, `soundfile`, `pyloudnorm`, `numpy` already in worker venv. No new Python or Rust deps. Waveform UI evaluates `wavesurfer.js` in Phase 0 against an in-house Canvas component before committing — research output drives the choice. |
| II | SOLID + Pure Functions | PASS | `domain::audio_edit` is a pure typed-record module (op enum + serde). I/O confined to repo + RPC + worker. CQS preserved: `apply_chain` mutates and returns the new artifact ref; preview is query-only. |
| III | Modularity, ≤25-line methods, ≤800-line files | PASS | New files are deliberately small: `audio_edit.rs` ~150 lines, `audit_log_repo.rs` ~120 lines, `audio_edit.py` ~250 lines split into per-op handlers. Each route handler stays under 80 lines via helpers. |
| IV | Self-Documenting Code (NO inline comments) | PASS | New code carries module-level `///` docs only. Names: `EditOp::Trim { start_ms, end_ms }`, `ChainDigest`, `AuditEntry`. Worker uses module docstrings. |
| V | Extendability via Adapter Contracts | PASS | New op modes (`fade_in`, `fade_out`, `mute`, etc.) extend the chain via additive enum variants with `#[serde(tag = "mode")]` + `#[serde(rename_all = "snake_case")]`; chain JSON deserializer is forward-compatible (host treats the JSON as opaque blob). Worker RPC method pair (`audio.edit`, `audio.edit.preview`) is added through the existing `BackendClient::call`. |
| VI | Test-First Verification | PASS | RED tests authored before each handler: chain-digest determinism, cache-key invalidation, audit-log sequencing, sample-accurate trim, pitch-preservation tolerance. Design-heavy carve-out invoked **only** for the waveform visualisation (FR-036/FR-037 markers); all FR-026 / FR-029 / FR-031 contracts ship with code. Test strategy section recorded below. |
| VII | Memory & Type Safety | PASS | No `unsafe`. `unsafe_code = "forbid"` already set on the extension crate. Newtypes for `OperationId`, `ChainDigest`, `AuditEntryId`. Errors via `thiserror` (`EmotionTtsError`). All edits validated at boundaries (`?deploymentId=` query, op param ranges). |
| VIII | Living Documentation | PASS | Updates: `extensions/builtin/emotion-tts/README.md`, `docs/api/openapi.yaml`, `docs/api/API.md`, plus per-spec `quickstart.md`. |
| IX | Git-Flow + Bisectable | PASS | Branch already `036-audio-editing`. Plan/tasks land in conventional commits. |
| X | Parallelism-First | PASS | Worker edit RPCs go through the existing `LeaseProvider` lease — same serialization as synthesis. No new parallel runtime introduced (Assumption: worker stays single-threaded for edits). Frontend test parallelism via Vitest + Playwright workers. |
| XI | Rust Idioms & Anti-Pattern Registry | PASS | Newtypes (`ChainDigest`, `OperationId`); `#[non_exhaustive]` on `EditOp`; declarative iterator chains for op-replay; `Drop` on the preview-temp-file guard; `&str`/`&Path` for borrowed args. No `unwrap`, no clone-as-borrow-shortcut. |
| XII | Web Frontend Architecture | PASS | New screen lives at `views/mapping_editor/components/audio_edit_panel.tsx` (presentational) consumed by the existing `mapping_editor.view.tsx`. All `fetch` calls go through `services/voice_assets_client.ts` (extended) + new `services/audio_edit_client.ts`. Styling via vanilla-extract sibling files. Motion via `motion/react` for handle drag feedback. Loaders updated in route objects; no `useEffect → fetch → setState` introduced. |
| XIII | Host ↔ Extension Boundary (NON-NEGOTIABLE) | PASS | All code under `extensions/builtin/emotion-tts/`. Zero host crate touches. Routes mount under `/api/v1/extensions/nexus.audio.emotiontts/*`. Extension-owned tables retain the `ext_emotion_tts__` prefix. The boundary audit script (already in the extension) gains coverage for the new tables — automated CI gate per XIII.7. The host's audit pipeline stays untouched (Assumption confirmed). |

**Gate result**: PASS on all 13 principles. No Complexity Tracking entries required.

### Test strategy (Principle VI carve-out — waveform visualisation only)

The waveform-rendering surface (FR-033 through FR-038) is a design-heavy UI surface
where pixel-accurate component tests have a high rewrite cost during design
iteration. Following the v1.1.2 carve-out, the visualisation ships with:

- **Mandatory**: a Playwright interaction test asserting drag-accuracy and
  keyboard-nudge precision (FR-033, FR-035, SC-011).
- **Mandatory**: backend contract tests for every new endpoint
  (`tests/http_contract_audio_edit_*.rs`).
- **Mandatory**: worker pytest cases for sample-accurate trim, pitch-preservation
  tolerance, LUFS measurement.
- **Deferred to a follow-up sprint**: per-component Vitest snapshot tests for the
  waveform overlay shapes (mute bar, fade gradient, dimmed-trim region — FR-036).

All other UI changes (operation list, history panel, audit panel, Apply/Preview/Reset
buttons) ship with vitest coverage as normal.

## Project Structure

### Documentation (this feature)

```text
specs/036-audio-editing/
├── plan.md              # This file (/speckit.plan output)
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── openapi-audio-edit.yaml
│   ├── rpc-audio-edit.md
│   └── boundary-audit.md
└── tasks.md             # Phase 2 output (NOT created here)
```

### Source Code (repository root, scoped to spec 036)

```text
extensions/builtin/emotion-tts/
├── rust/
│   ├── src/
│   │   ├── domain/
│   │   │   ├── audio_edit.rs          # NEW — typed EditOp enum, EditChain, ChainDigest
│   │   │   ├── cache_key.rs           # CHANGED — include chain digest in canonical input
│   │   │   └── mod.rs                 # CHANGED — re-export new module
│   │   ├── storage/
│   │   │   ├── voice_assets_repo.rs   # CHANGED — read/write edit_chain_json
│   │   │   ├── utterances_repo.rs     # CHANGED — read/write edit_chain_json
│   │   │   ├── audit_log_repo.rs      # NEW — append + query audit entries
│   │   │   └── mod.rs                 # CHANGED — re-export
│   │   ├── router/
│   │   │   ├── voice_assets.rs        # CHANGED — add edit/preview/clear routes
│   │   │   ├── runs.rs                # CHANGED — add per-utterance edit route
│   │   │   ├── audit.rs               # NEW — GET audit log by target id
│   │   │   ├── mod.rs                 # CHANGED — mount new sub-router
│   │   │   └── guard.rs               # unchanged — reused
│   │   ├── backend_client/
│   │   │   ├── params.rs              # CHANGED — AudioEditParams + AudioEditPreviewParams
│   │   │   └── rpc.rs                 # CHANGED — new method names
│   │   ├── dispatcher/
│   │   │   └── prepare.rs             # CHANGED — resolve derived artifact for synth
│   │   └── lib.rs                     # CHANGED — wire new router
│   └── tests/
│       ├── audio_edit_chain_digest_test.rs            # NEW
│       ├── audio_edit_cache_key_invalidation_test.rs  # NEW
│       ├── audio_edit_audit_log_sequence_test.rs      # NEW
│       ├── http_contract_audio_edit_test.rs           # NEW
│       └── boundary_test.rs                           # CHANGED — assert new tables/routes are extension-scoped
├── storage/
│   └── migrations/
│       ├── 015_voice_asset_edit_chain.sql   # NEW
│       ├── 016_utterance_edit_chain.sql     # NEW
│       └── 017_audio_edit_log.sql           # NEW
├── worker/
│   ├── src/emotion_tts_worker/
│   │   ├── audio_edit.py              # NEW — pipeline (decode → edit → re-encode)
│   │   ├── handlers.py                # CHANGED — register audio.edit + audio.edit.preview
│   │   └── audio_probe.py             # unchanged
│   └── tests/
│       ├── test_audio_edit_trim_accuracy.py     # NEW
│       ├── test_audio_edit_speed_pitch.py       # NEW
│       └── test_audio_edit_normalize_lufs.py    # NEW
└── web/
    └── src/
        ├── views/mapping_editor/
        │   ├── components/
        │   │   ├── audio_edit_panel.tsx           # NEW — main editor surface
        │   │   ├── audio_edit_panel.css.ts        # NEW
        │   │   ├── waveform_canvas.tsx            # NEW — Web Audio + Canvas render
        │   │   ├── waveform_canvas.css.ts         # NEW
        │   │   ├── edit_chain_list.tsx            # NEW — ordered op list with Remove
        │   │   ├── audit_history_panel.tsx       # NEW — read-only log
        │   │   └── per_utterance_edit.tsx        # NEW — run detail inline editor
        │   └── mapping_editor.view.tsx            # CHANGED — open editor on selection
        └── services/
            └── audio_edit_client.ts               # NEW — typed fetch wrappers
```

**Structure Decision**: Single-extension subproject layout. Every change lives under
`extensions/builtin/emotion-tts/` per Principle XIII. Migration files extend the
extension-owned `storage/migrations/` chain. Worker code extends the existing
IndexTTS-2 venv. Frontend changes extend the existing `mapping_editor` view per
Principle XII (smart/dumb split preserved — `mapping_editor.view.tsx` consumes the
new presentational components).

## Complexity Tracking

> No principle violations require justification. Two minor judgement calls
> documented for future-spec visibility:

| Item | Decision | Rationale |
|------|----------|-----------|
| Per-utterance edit ships in same spec as voice-asset edit | Both included | The data-model and worker pipeline are 95% shared; splitting would duplicate the migration + RPC plumbing. Per-utterance UI surface is the only incremental cost. Independent test confirms each can land separately. |
| Three migrations instead of one combined | Three separate files | Keeps each migration single-purpose and reversible-on-paper. Migration runner's idempotency contract is per-file; combining forces a re-run on partial failure. |

## Phase 0 → Phase 1 Outputs

- [research.md](./research.md) — Phase 0 decisions (5 topics: waveform library
  choice, ffmpeg trim accuracy strategy, atempo chain for out-of-range speed, LUFS
  target default, chain digest hash function).
- [data-model.md](./data-model.md) — Entities: `EditOp`, `EditChain`, `ChainDigest`,
  `AuditEntry`, plus migration-shape tables.
- [contracts/openapi-audio-edit.yaml](./contracts/openapi-audio-edit.yaml) — REST
  surface for the 6 new endpoints.
- [contracts/rpc-audio-edit.md](./contracts/rpc-audio-edit.md) — Worker JSON-RPC
  method definitions (`audio.edit`, `audio.edit.preview`) + error code mapping.
- [contracts/boundary-audit.md](./contracts/boundary-audit.md) — Updated audit-script
  expectations for spec 036.
- [quickstart.md](./quickstart.md) — End-to-end run-through (upload → edit → preview
  → apply → run synth → verify cache-miss → inspect audit log).

After Phase 1 the agent context file is updated via
`.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`.
