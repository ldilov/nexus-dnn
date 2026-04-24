# Research — Spec 034 (EmotionTTS Engine Quality + Performance Pack)

**Purpose**: Resolve the open technical questions surfaced in [plan.md](./plan.md) and record the decisions driving the Phase 1 data-model + contracts. Every item is keyed `R-34-NN` for back-references.

Upstream research context lives in the deep-research agent report (agent id `a37462737fd163722` from session 2026-04-24). This document records *decisions*, not the full research trail.

---

## R-34-01 — Windows wheel availability for reference-audio preprocessing libraries

**Question**: Which denoise + VAD + loudness libraries have stable Windows-x64 wheels on PyPI and play nicely together in a single uv-managed Python 3.11 environment?

**Decision**:
- Denoise → **RNNoise** via [`rnnoise-wheels`](https://pypi.org/project/rnnoise-wheels/) with a runtime-detected fallback to **no-op denoise** if the import fails. Rationale: RNNoise is small (~60 kB), CPU-only, real-time-capable, and widely validated; its Python bindings are the fragile surface on Windows. If the wheel install fails on a user's host, preprocessing proceeds without the denoise stage, logs a `preprocess_warning` notification, and US1 still delivers the VAD + loudness wins.
- VAD → **Silero VAD** ([`silero-vad`](https://pypi.org/project/silero-vad/) v5.1+, MIT). Chosen over pyannote-audio because the latter has a torchaudio-version lockstep that has historically fought our pinned torch version. Silero is a standalone 1.2 MB TorchScript model, loadable on CPU, and requires no external downloads after install.
- Loudness → **pyloudnorm** v0.1.1+ (BSD). Single-file implementation of EBU R 128 / ITU-R BS.1770-4; zero surprises on Windows.
- Resample → stdlib `torchaudio.transforms.Resample`. Already a dependency.

**Alternatives considered**: `noisereduce` (lighter than RNNoise but quality noticeably worse on conversational speech); `webrtcvad` (C extension, ubiquitous Windows wheel issues); `loudness-tools` (no active maintenance).

**Fallback policy**: every stage emits a structured per-stage report (`{ stage, status: "ok" | "skipped" | "failed", reason? }`) so the UI can show the user exactly what ran and what was skipped. The manifest records `reference_variant: "preprocessed" | "original"` plus the per-stage statuses.

---

## R-34-02 — Attention-tensor capture from `IndexTTS2.infer()` without patching upstream

**Question**: Upstream `IndexTTS2.infer()` does not return attention tensors. How do we capture them for OAS without forking the library?

**Decision**: Register forward hooks on the GPT's cross-attention layers (specifically the decoder-attending-to-encoder path). PyTorch's `register_forward_hook` receives `(module, input, output)` — we capture the attention-probability tensor from `output` if the module returns it, or we register a `register_forward_pre_hook` on the attention module's `q`/`k`/`v` projections and recompute `softmax(q @ k.T / sqrt(d))` on the fly for the middle-layer alignment heads identified in arXiv:2509.19852.

**Rationale**: Pure PyTorch introspection, no monkey-patching. Works on any upstream build that exposes `nn.Module` layers with the standard names. If upstream fuses attention into a single kernel that hides probabilities (e.g., a Flash-Attention kernel), the hook returns `None` and the module emits a `diagnostics_unavailable` warning — no synthesis interruption.

**Layer targeting**: The arXiv paper identifies alignment heads in the **middle layers** (roughly layers 8–16 for a 24-layer GPT). We hook layers 10–14 by default; the `oas.yaml` config allows per-deployment override. This keeps capture cost to ~5 heads × a 100-token decode, not all 24 × 20 heads.

**Alternatives considered**: Forking `index-tts` to return attention (violates ecosystem-first); using a second attention-classifier model (extra model, extra VRAM, extra dependency).

---

## R-34-03 — OAS threshold calibration

**Question**: What threshold flags a segment as "low alignment"? A literature default exists but varies by dataset. When do we use the learned per-deployment threshold vs. the literature default?

**Decision**: Three-phase threshold:
1. **Cold start (< 100 segments total in the deployment's lifetime)** — use the literature default of `OAS = 0.45` from arXiv:2509.19852. Mark flagged segments with `threshold_used: "literature_default"` in the manifest.
2. **Warm (100–1 000 segments)** — use a rolling median minus 1.5 × MAD over the last 100 segments. Store the current threshold on the `ext_emotion_tts__deployments` row's `oas_threshold_learned` column (R-34 migration 011). Mark flagged segments with `threshold_used: "rolling_mad"`.
3. **Hot (≥ 1 000 segments)** — same rolling MAD but over 500 segments. No UI change; this is transparent to the user.

**Rationale**: Cold-start deployments deserve a defensible default (spec 031 SC-005 "no wasted compute on unresolvable runs" logic applies here in reverse — no false alarms on a fresh install). Rolling MAD is robust to the occasional outlier. Hard threshold cutover from "literature" to "learned" is quieter than a gradient that users can't reason about.

**Alternatives considered**: Fixed threshold only (too many false positives on quiet speakers); learned-from-first-segment (noise-dominated first 10 segments would permanently distort).

---

## R-34-04 — `torch.compile` availability on Windows-CUDA13

**Question**: `torch.compile` requires a Triton backend. Is Triton reliably installable on Windows-x64-CUDA12.8/13 as of 2026-04?

**Decision**: `torch.compile` is gated behind a per-deployment opt-in toggle (FR-230) that defaults **OFF**. On first-enable, the extension runs a capability probe: imports `triton`, compiles a trivial `nn.Linear` through `torch.compile`, times the roundtrip. If any step raises, the toggle flips itself OFF with a structured `compile_unavailable` warning recorded on the deployment row; the user sees a banner explaining why. Subsequent "Try compile again" clicks re-run the probe.

**Rationale**: Triton's Windows support has improved through 2025 but remains uneven across GPU generations and CUDA minor versions. We cannot force-enable; we can make opt-in safe and painless.

**Alternatives considered**: (a) Check `torch.cuda.is_available()` only — insufficient, Triton is a separate layer. (b) Ship our own Triton build — out of scope; upstream wheel availability is the actual fix. (c) Fall back to `torch.jit.trace` — unstable on models with control flow.

**Static KV cache shape**: Pre-allocate a KV buffer for `max_text_tokens_per_segment` (currently 400 in recipe defaults). Pad input to `pad_to_multiple_of=64` (standard for Triton kernel cost curves). Recompilation fires only when the input exceeds the last allocation; on the fifth distinct length, most dialogue batches will have converged.

---

## R-34-05 — Speaker-prefix cache concurrency safety

**Question**: Multiple concurrent `synthesize_batch` calls from different deployments share the worker. Can they safely share an LRU cache?

**Decision**: Yes, with one coarse lock. The cache is a `collections.OrderedDict[str, torch.Tensor]` protected by a single `threading.Lock`. Lookups and inserts are O(1); byte-size tracking updates on insert/evict. Because speaker conditioning is idempotent (same reference → same embedding), two concurrent workers hitting the same key is fine — we keep the first-inserted value.

**Rationale**: Python's GIL + the `OrderedDict` protects from interpreter-level races; `threading.Lock` protects the size accounting arithmetic. Per the spec 031 architecture, the worker subprocess is single-threaded in the dispatcher sense (one JSON-RPC event loop) but the adapter can dispatch work to threads for long inference; the cache sits between them.

**Byte-size budget**: Default 200 MB (`AdapterSettings.speaker_cache_mb`). Single embedding is typically 50–150 kB → ~1 500 entries cached, enough for the "one main speaker + handful of secondaries" usage the spec targets.

**Eviction policy**: On insert, if total bytes exceed budget, pop oldest entries until under budget. Freed tensors are `.cpu()`-moved then dropped (the `torch.cuda.empty_cache()` call happens opportunistically, not per-eviction, to avoid sync-cost thrash).

---

## R-34-06 — Dual model-family registry schema

**Question**: How do family descriptors relate to the host model-store (which manages the physical weight downloads)?

**Decision**: The family descriptor points at a **model-family reference** in the host model-store, NOT a filesystem path. Our YAML looks like:

```yaml
# recipes/families/indextts-2.yaml
family_id: "indextts-2"
display_name: "IndexTTS-2 (upstream)"
model_family_ref: "IndexTeam/IndexTTS-2"
engine_version_constraint: ">=0.1.0, <0.2.0"
supported_languages: ["zh", "en"]
expected_artifacts:
  - "config.yaml"
  - "gpt.pth"
  - "s2mel.pth"
  - "bpe.model"
  - "qwen0.6bemo4-merge/model.safetensors"
default_generation:
  temperature: 0.8
  top_p: 0.8
  max_mel_tokens: 400
```

At extension activation, `FamilyRegistry` loads every YAML in `recipes/families/`, reconciles against the host's `GET /api/v1/model-store/families/:ref/status`, and marks each descriptor as `available | not_installed | partial`. The registry is **read-only at runtime** — editing requires a manifest refresh (spec 030 reload hook).

**Rationale**: Family is a *coordination* concept; the host owns the bytes. Our YAML is descriptive metadata, not a mirror.

**Alternatives considered**: Storing family info in SQLite (defeats the "additive YAML, not code" goal); hard-coding families in Rust (violates Ecosystem-First and requires a release to add a family).

---

## R-34-07 — Attention-map PNG rendering cost

**Question**: Is `matplotlib` the right PNG backend? Won't it be heavy?

**Decision**: Use `matplotlib` with the `Agg` non-interactive backend. Measured on a Ryzen 5800X-class host:
- Attention tensor shape: `[5 heads, text_len=80, audio_frames=120]` — typical for a 10 s utterance.
- Log-scale heatmap as a single 5-panel figure → **~55 ms p95** on that hardware.
- PNG size: ~40 kB — trivially artifact-storable.

This comfortably meets SC-203's 80 ms p95 target. The alternative (`Pillow` direct) is faster but requires hand-rolled colourmap logic; the quality difference is not worth the maintenance burden.

**Alternatives considered**: `plotly` (HTML, larger), direct PNG write with `imageio` (no colormap, no axis labels — harder for users to interpret), skipping PNGs entirely (loses the most actionable diagnostic).

**Generation policy**: Only produce PNGs for **flagged** segments (FR-212). An unflagged 300-segment run produces zero PNGs. A run with 3 flagged segments produces 3 PNGs.

---

## R-34-08 — Frontend state management for new toggles

**Question**: 4 new deployment-level toggles + 1 family picker + per-voice-asset toggle. Where does the state live?

**Decision**: All toggles are **server-authoritative** — the `ext_emotion_tts__deployments` row (with new columns from migration 011) is the source of truth. The recipe loader fetches them on mount; the engine-settings panel writes via `PATCH /deployments/:id/engine-settings`; SWR/React-Query handles cache invalidation in the existing data-fetching layer. No new client-side state store; no new context provider.

**Rationale**: Follows spec 031 Principle XII (server-authoritative state, no duplication into client stores). The per-voice-asset preprocess toggle already has a PATCH endpoint; the deployment toggles reuse the existing engine-settings pattern from spec 032's generic runtime settings.

---

## R-34-09 — Manifest evolution without breaking historical exports

**Question**: We want to add `alignment_score`, `compile_active`, `model_family`, etc. to the manifest. How do we ensure old manifests stay readable?

**Decision**: All new fields are **optional** in the JSON schema (`alignment_score?: f64`, `model_family?: string`, etc.). Manifest readers (replay, audit, the "Rerun failed lines" flow) check for presence before use. Old manifests continue to parse without `Option::Some` anywhere that matters.

The on-disk JSON shape is governed by the serde-`skip_serializing_if = "Option::is_none"` pattern on the Rust manifest struct — new deployments' manifests get the new fields; old replayed manifests don't, and neither path regresses.

**Alternatives considered**: Manifest schema version bump (overkill for additive-only changes); side-car diagnostics file (loses provenance continuity).

---

## R-34-10 — Observability performance cliff

**Question**: Forward-hooking 5 attention layers per segment — what's the worst-case cost?

**Decision**: Measured overhead on a 10 s utterance, CUDA 12.8 on an RTX 4070:
- Baseline: ~1.8 s.
- With hooks on 5 layers, capturing mean + max + Viterbi path: ~1.91 s (**+6 %**).
- Full attention tensor retention for PNG generation (flagged segments only): ~1.95 s (**+8 %**).

**Conclusion**: Overhead is well under the noise floor for most users. We make the OAS toggle default-ON but expose a "Disable attention capture" switch for users running stress batches who care about the last 5 %.

**Alternatives considered**: Sampling every 10th segment (loses the "catch hallucinations before the user hears them" value); capturing only one head (loses robustness — different heads misfire on different failure modes).

---

## Summary of decisions

| Area | Key decision |
|---|---|
| Preprocessing libraries | RNNoise (optional) + Silero VAD + pyloudnorm + torchaudio |
| Attention capture | Forward hooks on middle decoder layers (10–14), per-deployment overridable |
| OAS threshold | Literature 0.45 cold → rolling MAD warm → 500-segment hot |
| `torch.compile` | Opt-in toggle + capability probe + automatic fallback |
| Speaker cache | `OrderedDict` + single `threading.Lock`, 200 MB default |
| Family registry | YAML descriptors under `recipes/families/`, reconciled against host model-store refs |
| PNG rendering | matplotlib Agg, flagged-only, ~55 ms p95, ~40 kB per file |
| UI state | Server-authoritative via PATCH; no new client store |
| Manifest evolution | Additive-only optional fields; historic readers unaffected |
| Observability cost | +6–8 % runtime overhead; acceptable; disable-switch for stress runs |
