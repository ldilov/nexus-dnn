# Phase 0 Research — EmotionTTS Audio Editing

Decisions and the alternatives considered. Each entry resolves a concrete unknown
flagged in `plan.md` § Technical Context. No `NEEDS CLARIFICATION` items remain
after this phase.

---

## R1 — Waveform component: in-house Canvas vs ecosystem package

**Decision**: Build a small in-house Canvas + Web Audio API component
(`waveform_canvas.tsx`). Keep `wavesurfer.js` as a documented fallback if FR-033 /
FR-035 / FR-037 cannot be met within ~2 days of build time.

**Rationale**:
- `wavesurfer.js` (8.x) is feature-rich but adds ~70 KB gzipped to the bundle and
  brings its own theme tokens, colliding with the Spectral-Graphite vanilla-extract
  contract (Principle XII.5). Theming around it is awkward.
- The features we actually need are minimal: peak-cache rendering, two draggable
  handles, a vertical playhead, and overlay regions for mute / fade / trim. Each is
  ~50 lines of Canvas code. Total in-house budget: ~250 lines including peaks
  computation.
- Web Audio API's `decodeAudioData` returns sample peaks for free; `OfflineAudioContext`
  decodes any browser-supported codec.
- Principle I (Ecosystem-First) tolerates a hand-rolled solution when the ecosystem
  package exceeds the requirement and breaks adjacent contracts. We document the
  evaluation here so reviewers see the tradeoff was deliberate.

**Alternatives considered**:
- `wavesurfer.js@8` — most popular, plugin-rich, but theme conflict + bundle weight.
- `peaks.js` (BBC) — heavy, opinionated, drops the Web Audio context to Konva.js
  (another canvas runtime); two competing render layers in the same view.
- `react-audio-visualize` — render-only, no interaction surface; can't satisfy
  FR-033 / FR-037.
- Custom SVG instead of Canvas — clean for ≤ 1k samples, but 5-minute audio at 44.1
  kHz produces 13M samples. Even with peak-bucketing (1k buckets), redraws on drag
  thrash the DOM. Canvas is the right tool.

**Exit criterion**: If after 2 days of build the waveform fails FR-033 or FR-035,
swap in `wavesurfer.js` and absorb the bundle hit. Recorded as a follow-up task.

---

## R2 — Sample-accurate trim on compressed sources

**Decision**: Decode → edit → re-encode for compressed inputs (mp3, opus, m4a, aac).
WAV/FLAC inputs may use `soundfile.SoundFile.seek` for direct sample-level slicing.
The dispatch is detected from the source codec (probed via `audio_probe.py`,
existing module).

**Rationale**:
- Container-level cuts on mp3 (frame-aligned) yield ±26 ms boundary errors at 44.1
  kHz — outside FR-026's 1 ms tolerance. Spec edge-case explicitly accepts the
  performance hit (Assumptions: "edits on 5-minute compressed files take ~2s
  instead of ~50ms").
- Decode pipeline: `ffmpeg-python` to PCM `s16le` → `numpy` array → apply ops →
  `soundfile.write` → optional re-encode through ffmpeg if the user wants source
  format preserved.
- The worker already invokes ffmpeg via `ffmpeg-python` for voice preprocessing
  (Spec 034 FR-200), so the binary is on PATH and the import surface is proven.

**Alternatives considered**:
- ffmpeg `-c:a copy` with stream-aligned segments — fast but inaccurate.
- `pydub` — wraps ffmpeg but uses tempfile dance per op; performance worse than
  direct array transforms.
- Force WAV uploads only — breaks UX; users routinely have mp3/opus recordings.

---

## R3 — Pitch-preserving speed change algorithm

**Decision**: ffmpeg `atempo` filter, chained for ranges outside `[0.5×, 2.0×]`.
Spec hard-caps the user-visible range at `[0.5×, 2.0×]` (FR-004) so chaining is
not exercised in v1; the implementation supports it for forward compatibility.

**Rationale**:
- `atempo` uses the WSOLA family — pitch-preserving within ±5 cents (FR-027). The
  existing run-level `speedFactor` with `speedMode: preserve_pitch` already uses
  this filter — same convention extends to the per-asset / per-utterance edit.
- ffmpeg native: no new dependency, no new tuning knobs.

**Alternatives considered**:
- `librosa.effects.time_stretch` (phase vocoder) — higher quality but slower,
  NumPy-bound, drops sample-rate metadata; would require a re-encode round-trip.
- `pyrubberband` — best quality, requires the `rubberband-cli` system binary.
  Spec 035 dep installer would have to ship it; too much new install surface for
  a feature we get from ffmpeg already.
- Naïve `soxr` resampling — pitch shifts with rate, explicitly disallowed by
  FR-027.

---

## R4 — LUFS normalize default target

**Decision**: `-16 LUFS` integrated, configurable per operation. This matches the
upstream voice-preprocessing default already wired by Spec 034
(`worker/src/emotion_tts_worker/preprocess.py::DEFAULT_LUFS_TARGET`).

**Rationale**:
- Streaming-platform conventions cluster around `-14 LUFS` (Spotify, Apple Music)
  and `-16 LUFS` (YouTube, podcast guideline). For TTS reference audio used as
  speaker prompt, `-16` keeps headroom and avoids clipping when the synthesizer
  applies its own per-frame gain shaping.
- Spec 034's preprocessing already lands voice assets near `-16` LUFS by default.
  Matching the explicit edit operation default keeps "preprocess + edit" composable
  without surprise gain stairs.

**Alternatives considered**:
- `-23 LUFS` (EBU R128 broadcast) — too quiet for prompt audio; downstream synth
  amplifies and reveals noise floor.
- `-14 LUFS` (Spotify) — louder, but adds clipping risk when source already had
  high-pass shaping.

---

## R5 — Chain digest hash function

**Decision**: `SHA-256` over the canonical JSON of the `EditChain`. The canonical
form sorts top-level fields alphabetically, preserves the operation array order
(order is semantic), uses `serde_json::to_string` with `serde_json::ser::PrettyFormatter`
disabled, and emits `\n` line endings. The digest is the hex-encoded 32-byte hash.

**Rationale**:
- `sha2` is already a workspace dependency; adding nothing new.
- 32-byte digest fits comfortably in a `TEXT` column (64 hex chars) and produces
  no cache-key collision risk in practice.
- Mirrors the `ContentHash` shape already used by `cache_key.rs` — reviewers and
  agents already recognise the convention.
- The deterministic-canonical-form rule is necessary because two op chains that
  serialize to the same _logical_ JSON but differ in whitespace MUST produce the
  same digest (FR-006a).

**Alternatives considered**:
- `xxh3` (fast, 16-byte) — not in the workspace yet, and we don't need fast; this
  hash is computed once per Apply.
- `BLAKE3` — same reasoning as xxh3.
- Hashing the serialized binary form directly via `bincode` — couples on-disk form
  to wire format; less debuggable.

---

## R6 — Edit chain JSON shape (host opacity)

**Decision**: Store the chain as a JSON document with the shape:

```json
{
  "version": 1,
  "ops": [
    { "id": "01HX...ULID", "mode": "trim", "start_ms": 4000, "end_ms": 52000 },
    { "id": "01HX...ULID", "mode": "normalize", "target_lufs": -16.0 }
  ]
}
```

`version` lets the extension evolve the schema without a migration. `id` is a ULID
(already in the extension's dependency set). `mode` discriminates op types via
`#[serde(tag = "mode")]`.

**Rationale**:
- ULIDs are time-orderable and globally unique without a coordination service —
  ideal for client-generated op ids during drag-build (FR-005a).
- The `version` field scopes future migrations to extension-internal logic and is
  invisible to the host (FR-001, Assumption: "Edit chain JSON is opaque to the
  host").
- `tag = "mode"` keeps every op self-describing.

**Alternatives considered**:
- UUIDv7 — equivalent properties; ULID is already in the crate.
- Positional ops (no ids) — fails FR-005a (Remove must work across reorders).
- Versioning by separate column — defeats opacity to host.

---

## R7 — Audit log retention strategy

**Decision**: Append-only, no purge job in v1. The table is small (one row per
state change; expected < 100 rows per asset over a feature lifetime). Soft-deleting
or archiving is unnecessary at expected scale.

**Rationale**:
- FR-029 + FR-030 require entries to survive chain clears and asset deletes.
  Hard-deleting the parent does not cascade into the audit table (no FK).
- Storage cost is trivial: each row is ~250 bytes; even 100k entries fits in
  ~25 MB.
- A cleanup task for compliance retention is a future-spec concern (auth must land
  first to make sense of "who edited what").

**Alternatives considered**:
- Soft-delete via `deleted_at` column — adds complexity for no current benefit.
- TTL-indexed pruning — premature optimisation.

---

## R8 — Worker concurrency for audio edits

**Decision**: Edits flow through the existing `LeaseProvider` lease. No parallel
edit channel introduced.

**Rationale**:
- The IndexTTS-2 model occupies VRAM whether or not a synthesis is in flight; an
  audio-edit RPC that runs alongside synth would compete for CPU and stdin/stdout
  framing. Lease serialization keeps the wire protocol predictable.
- Spec assumption: "If contention becomes a UX issue, add a queue indicator before
  adding a parallel runtime." Edge-case handling: UI shows a "queued — N seconds"
  indicator (already a pattern in the existing run UI).

**Alternatives considered**:
- Spawn a separate audio-edit worker venv — doubles install size + dep installer
  burden; out of scope per Spec assumption.
- Off-thread Python via `asyncio` inside the existing worker — no benefit while
  the main loop is GIL-bound on numpy + ffmpeg subprocess waits.

---

## Summary of resolved unknowns

| Topic | Decision |
|-------|----------|
| Waveform component | In-house Canvas + Web Audio (wavesurfer.js fallback) |
| Trim accuracy on compressed input | Decode → edit → re-encode |
| Speed algorithm | ffmpeg `atempo` (chained if needed) |
| LUFS default target | `-16 LUFS` integrated, configurable per op |
| Chain digest hash | SHA-256 over canonical JSON |
| Chain JSON shape | `{version, ops:[{id, mode, ...}]}` with ULID ids and `tag="mode"` |
| Audit retention | Append-only, no purge in v1 |
| Worker concurrency | Single lease (existing `LeaseProvider`) |

No remaining `NEEDS CLARIFICATION` items. Phase 1 design proceeds.
