# EmotionTTS Extension (spec 031)

Deployable Nexus extension that turns multi-character dialogue scripts into per-utterance audio artifacts plus a ZIP bundle, driven by the upstream **IndexTTS-2** model running in a host-managed Python subprocess over JSON-RPC/stdio.

## Architecture

```
  ┌─────────────────────────────────────────────────────────┐
  │ Host (Rust, nexus-api / nexus-backend-runtimes)         │
  │  • Generic backend-runtime catalog (spec 032)           │
  │  • Generic /extensions/:layoutId dispatcher (spec 030)  │
  │  • Model store, artifact store, lease manager           │
  └─────────────────────────────────────────────────────────┘
             │ ExtensionRouterProvider │ BackendRuntimeLease
             ▼                         ▼
  ┌────────────────────────┐  ┌──────────────────────────────┐
  │ rust/                  │  │ worker/                       │
  │  • Router provider     │  │  • IndexTTS-2 adapter         │
  │  • Storage repos       │  │  • NDJSON RPC loop            │
  │  • Operators (7)       │  │  • Cooperative cancel         │
  │  • Backend client      │  │  • ffmpeg post-process        │
  │  • Queue / resume      │  │                               │
  └────────────────────────┘  └──────────────────────────────┘
             │                           │
             ▼                           ▼
  ┌────────────────────────┐  ┌──────────────────────────────┐
  │ storage/migrations/    │  │ backends/indextts/            │
  │  • ext_emotion_tts__*  │  │  • backend-runtime.yaml       │
  │  • 8 tables            │  │  • versions.yaml (asset pins) │
  └────────────────────────┘  └──────────────────────────────┘
             ▲
             │
  ┌────────────────────────┐
  │ web/                   │
  │  • recipe view         │
  │  • emotion radar       │
  │  • run panel           │
  └────────────────────────┘
```

## Project layout

| Path                        | Owned by      | Purpose                                                   |
| --------------------------- | ------------- | --------------------------------------------------------- |
| `manifest.yaml`             | extension     | Identity, capabilities, storage namespace, runtime contrib |
| `rust/`                     | extension     | Router provider, storage repos, operators, backend client |
| `worker/`                   | extension     | Python IndexTTS-2 synthesis worker (stdio JSON-RPC)       |
| `storage/migrations/`       | extension     | SQLite DDL for `ext_emotion_tts__*` tables                |
| `backends/indextts/`        | extension     | Runtime descriptor + per-platform asset pins              |
| `web/`                      | extension     | React/Vite bundle loaded by the generic extension shell   |
| `recipes/`, `workflows/`, `operators/` | extension | YAML contribution files                        |
| `scripts/audit-boundary.*`  | extension     | Per-extension boundary audit (parity with host audit)     |

## Dev onramp

See [quickstart.md](../../../specs/031-emotiontts-extension/quickstart.md) for the 10-minute onramp.

Short version:

```bash
# 1. Rust crate (builds standalone; not a workspace member)
cd rust && cargo check

# 2. Python worker (uv only; upstream forbids pip/conda)
cd ../worker && uv sync --all-extras

# 3. Frontend bundle
cd ../web && pnpm install && pnpm build

# 4. Boundary audit (Windows)
powershell -ExecutionPolicy Bypass -File ../scripts/audit-boundary.ps1
# or Linux/CI
bash ../scripts/audit-boundary.sh
```

## Host prerequisites

Spec 032 ships everything this extension consumes:

- `RuntimeFamily::Python` variant in the host catalog.
- `BackendRuntimeLease` trait (stdio transport) acquired via `POST /api/v1/backend-runtime-installs/:id/start`.
- Generic backend-runtime catalog: `GET /api/v1/backend-runtimes`, `POST /:id/install`.
- Generic `/extensions/:layoutId` frontend dispatcher (spec 030).

## Audio Editing (Spec 036)

Non-destructive edit chains attached to voice assets and run-output utterances. Source audio is preserved; every chain renders a derived artifact via `HostArtifactStore`, keyed on a SHA-256 digest of the canonical chain JSON.

### Capabilities

- **US1** — Voice asset trim + normalize. Drag waveform handles, toggle loudness target, Apply.
- **US2** — Per-utterance edit on completed runs. Hover-to-reveal Edit button per segment row; export ZIP marked stale on apply.
- **US3** — Preview before apply. Materialise + stream bytes from a temp file (RAII-cleaned even on dropped HTTP connections); `Cache-Control: no-store`.
- **US4** — Edit chain inspection + per-op remove + in-session undo stack.
- **US5** — Audit trail per asset/utterance. Reverse-chronological log; entries survive target deletion (FR-030).

### Op set

`trim`, `crop`, `normalize` (LUFS target), `speed` (pitch-preserving via ffmpeg `atempo` — research.md R3, FR-027 ≤ ±5 cents), `fade_in`, `fade_out`, `mute`. Chain capped at 32 ops.

### Edit chain shape

```jsonc
{
  "version": 1,
  "ops": [
    { "id": "01HX...", "mode": "trim",      "start_ms": 1000, "end_ms": 52000 },
    { "id": "01HX...", "mode": "normalize", "target_lufs": -16.0 },
    { "id": "01HX...", "mode": "speed",     "factor": 1.1 }
  ]
}
```

Each op id is a ULID. The chain is hashed as canonical JSON to produce `ChainDigest` (SHA-256 hex), which feeds the synthesis cache key — chain change shifts the cache key (SC-003), chain clear restores the original (SC-004).

### Worker dependencies

Already shipped in `worker/pyproject.toml`:

- `ffmpeg-python` — decode + `atempo` time-stretch
- `soundfile` — encode (WAV / FLAC; MP3 via ffmpeg)
- `pyloudnorm` — ITU-R BS.1770 integrated loudness measurement
- `numpy` — sample-level transforms

No new deps. Pipeline lives at `worker/src/emotion_tts_worker/audio_edit/` (`pipeline.py`, `ops.py`, `codecs.py`, `digest.py`, `validation.py`).

### Routes

All under the generic dispatcher mount `/api/v1/extensions/nexus.audio.emotiontts/`:

- `POST   voice-assets/{id}/edit?deploymentId=...` — apply chain
- `DELETE voice-assets/{id}/edit?deploymentId=...` — clear chain
- `POST   voice-assets/{id}/edit/preview?deploymentId=...` — stream preview bytes
- `POST   deployments/{dep}/runs/{run}/utterances/{utt}/edit` — per-utterance edit
- `GET    audit/{voice_asset|utterance}/{id}?deploymentId=...&limit=` — audit history

See [`docs/api/API.md` — EmotionTTS audio editing](../../../docs/api/API.md#audio-editing-spec-036) for the full request/response contract and [`specs/036-audio-editing/contracts/openapi-audio-edit.yaml`](../../../specs/036-audio-editing/contracts/openapi-audio-edit.yaml) for the canonical schema.

### Storage

| Migration | Adds |
| --------- | ---- |
| 015 | `voice_assets.edit_chain_json` (nullable TEXT). |
| 016 | `utterances.edit_chain_json` (nullable TEXT). |
| 017 | `ext_emotion_tts__audio_edit_log` (audit trail; soft FKs so rows survive target deletion). |

### Boundary audit

Spec 036 lands entirely under `extensions/builtin/emotion-tts/`. The new identifiers (`ext_emotion_tts__audio_edit_log`, `audio.edit`, `audio.edit.preview`) are guarded by [`scripts/audit-boundary.sh`](scripts/audit-boundary.sh) / `.ps1` and asserted in [`rust/tests/boundary_test.rs`](rust/tests/boundary_test.rs). See [`specs/036-audio-editing/contracts/boundary-audit.md`](../../../specs/036-audio-editing/contracts/boundary-audit.md).

## Constitutional discipline

- **Principle XIII** — every file lives under this directory. Zero extension-id literals in `crates/` or `apps/web/src/`. `scripts/audit-boundary.*` enforces.
- **Principle IV** — no inline comments. Doc-comments on public APIs only.
- **Principle VI (design-heavy carve-out)** — recipe UI defers per-component tests to a post-v1 hardening sprint (see [research.md R-08](../../../specs/031-emotiontts-extension/research.md)).

## References

- Spec folder: [specs/031-emotiontts-extension/](../../../specs/031-emotiontts-extension/)
- Upstream: <https://github.com/index-tts/index-tts>
- Model: <https://huggingface.co/IndexTeam/IndexTTS-2>
