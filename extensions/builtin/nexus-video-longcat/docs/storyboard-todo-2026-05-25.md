# Storyboard Next-Up TODO (deferred from council pick)
## Captured 2026-05-25 after `800f771`

User picked 4 backlog items (S1-1/S1-2/S1-3, S1-8, S2-1, S2-6) but asked to address 7 questions FIRST. Answers below + sequencing.

## 7-question audit (answered against code, not memory)

1. **RTX upscale used in last smoke?** No. Fixture lacked `rtx_upscale_scale`, smoke ran without `--upscale`. Module `upscale_rtx.py` exists (NVIDIA Maxine VFX SDK, VideoSuperRes 2/3/4×). Output was 768×512 native after i2v auto-bucket.
2. **RIFE on top?** Not in worker. Memory note 2026-05-19 from LTX work: "RIFE not cleanly stageable." Skip for now. RTX upscale first, RIFE port is M-effort separate spec.
3. **Refine steps?** Tunable via `refinement_steps`. Validator clamps 1..10 per-scene; top-level dataclass default 12. Refinement LoRA designed for detail/720p pass; higher steps cost ~+12s/step with diminishing returns past ~12.
4. **LLM prompt breakdown?** Not implemented. Rejected from v1 design (SOTA review). Deterministic heuristic compiler is S2-1 in backlog. Operator hand-authors scenes today.
5. **Working profile snapshot saved?** PARTIAL. `manifest.yaml` + `backends/rtx50-fp8/versions.yaml` declare deps but NO captured run snapshot. Need lock manifest below.
6. **Resolution ladder?** No. Profile = single height/width. i2v auto-buckets to anchor aspect. Need RESOLUTION_PRESETS table.
7. **Lower partial offload?** Already exposable via `block_swap_count` per-profile + per-render override + CLI `--swap`. Testable. Future UI = "VRAM budget" slider.

---

## Tasks to land BEFORE the council-picked Sprint 1+2 items

### T0 — Reproducibility lock (Q5 fix)
**File**: `extensions/builtin/nexus-video-longcat/docs/working-profile-2026-05-25.md` (NEW)

Capture in one document:
- Worker: `nexus-video-longcat-worker` HEAD `800f771`
- Profile: `rtx50-fp8` (not `-distill` — distill via per-scene `use_distill=true`)
- torch 2.12.0+cu132, cuda runtime
- GPU: NVIDIA GeForce RTX 5070 Ti, 15.92 GiB VRAM, driver 570.65+
- Model artefacts (sha256 + commit pin):
  - `Kijai/LongCat-Video_comfy/LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors`
  - `Kijai/LongCat-Video_comfy/LongCat_distill_lora_alpha64_bf16.safetensors`
  - `Kijai/LongCat-Video_comfy/LongCat_refinement_lora_rank128_bf16.safetensors`
  - `meituan-longcat/LongCat-Video/vae/` (AutoencoderKLWan)
  - `google/umt5-xxl/` (text encoder)
- Render config: `--offload-mode partial --swap 46 --image nun.jpg --scenes-json storyboard_v6_locked.json`
- Output mp4 sha256 of `1779725370554.mp4` (compute now)
- Validator output (warnings + normalized scenes) captured verbatim
- `uv.lock` snapshot ref (commit pin)
- pyproject extras installed: `diffusers, rtx` (no `flash_attn` on Windows)

Effort: S. Writes one markdown + computes sha256s. Pure documentation.

### T1 — Run A: RTX upscale 2x on current fixture (low risk)
**Command**:
```
NEXUS_HOST_DATA_DIR=D:/longcat_install uv run --extra diffusers --extra rtx python ../scripts/gpu_smoke.py \
  --mode i2v --image D:/longcat_install/smoke/nun.jpg \
  --scenes-json D:/longcat_install/smoke/storyboard_v6_locked.json \
  --adain-factor 0.15 --offload-mode partial --swap 46 \
  --upscale 2 --upscale-quality HIGH
```
- Expected wall: ~19 min render + ~30s upscale = ~20 min
- Expected output: 1536×1024 h264, ~7-9 MB, 10.54s @ 24fps
- Validates: RTX VFX SDK path post-multiscene chain, no OOM, no GPU stream race vs LoRA detach
- Falls back to un-upscaled mp4 on RTX failure (already in pipeline_longcat.py:888-905)

Effort: S (run + ffprobe verify).

### T2 — Run B: refinement enabled + upscale 2x
**Fixture change**: copy `storyboard_v6_locked.json` → `storyboard_v6_refined.json`, add `apply_refinement=true, refinement_steps=12, refinement_guidance=3.5` at TOP LEVEL of payload (not per-scene — applies to all).

**Command**:
```
... same as T1 ... --refine --refine-steps 12 --refine-guidance 3.5 --upscale 2
```
- Expected wall: 19 min render + ~7 min refine + 30s upscale = ~27 min
- Validates: per-scene refinement + RTX upscale stacking + dual-LoRA hot-swap (distill↔refine)
- Reads on quality: priority #1 (melt/deform reduction) + texture sharpness

Effort: S (run + visual eyeball).

### T3 — Run C: swap=44 + upscale 2x (perf headroom test)
Same as T1 but `--swap 44`. Tests whether lower offload fits 16 GB during multiscene + upscale. Compare peak VRAM vs T1 baseline.

Effort: S.

### T4 — Resolution ladder spec
**File**: `extensions/builtin/nexus-video-longcat/worker/src/longcat_video_worker/resolution_presets.py` (NEW)

```python
from __future__ import annotations
from typing import NamedTuple

class ResolutionPreset(NamedTuple):
    name: str
    height: int
    width: int
    num_frames: int
    notes: str

PRESETS: tuple[ResolutionPreset, ...] = (
    ResolutionPreset("fast",       384, 672,  49, "Iteration preset; ~3min wall RTX 5070 Ti"),
    ResolutionPreset("standard",   480, 832,  93, "Current GPU-validated baseline; ~6min/scene"),
    ResolutionPreset("high",       576, 1024, 93, "Native 576p; ~9min/scene; needs swap=48"),
    ResolutionPreset("max-native", 720, 1280, 93, "Native 720p before upscale; requires refinement LoRA at 12 GiB+ headroom"),
)
```

Add validator check: warn if scene declares height/width that doesn't match a preset (suggest nearest).

Add CLI flag: `--resolution-preset {fast,standard,high,max-native}` on gpu_smoke.py that sets height/width.

Add docs note: "For 1080p+, render at standard or high, then `--upscale 2` (RTX VFX). For 1440p, `--upscale 3`."

Effort: S+S (module + CLI flag + 4 unit tests).

### T5 — LLM-planner requirements doc (Q4 follow-up, defer impl)
**File**: `extensions/builtin/nexus-video-longcat/docs/llm-planner-requirements.md` (NEW)

Capture for FUTURE spec (DO NOT implement yet — S2-1 deterministic compiler ships first):
- **Goal**: ONE user prompt → multiscene scenes[] JSON with character continuity + per-scene action delta + style anchor.
- **Constraints**:
  - CPU-only, no VRAM contention with LongCat worker.
  - <5s latency budget (spawn-and-exit process, not long-lived).
  - Local-only, no API calls (offline-capable).
  - Output MUST round-trip through `plan.validate` clean (0 errors, ≤2 warnings).
  - Falls back to deterministic regex compiler (S2-1) on LLM failure/timeout.
- **Candidates**: Llama-3.2-3B-Q4 (~1.8 GB RAM, 25-40 tok/s CPU), SmolLM2-1.7B-Q4, Phi-3-mini-3.8B-Q4.
- **Interface**: `plan_llm.py` exposes `expand_prompt(prompt, duration, scene_count, style_hint) -> dict`.
- **Prompt template**: structured JSON output mode (llama.cpp `json_schema` sampler), few-shot examples in repo, deterministic seed.
- **Acceptance**: blind A/B (deterministic compiler vs LLM expansion) shows ≥30% improvement in subjective scene coherence on 20-prompt benchmark.
- **NOT in scope yet**: scene retry on LLM hallucination, multi-turn dialog, cross-language.

Effort: S (one document, no code).

### T6 — Capture v5 vs v6 quality delta (Q3 follow-up)
Compare last smoke `1779725370554.mp4` (v6 all-distill, no refine, no upscale) against prior `1779666421064.mp4` (v5 mixed-distill, no refine). Eyeball: does all-distill reduce melt/deform vs mixed? If yes, lock in all-distill as canonical recommendation in `docs/storyboard.md`.

Effort: S (visual comparison, write 2-paragraph note).

---

## Then proceed to council-picked items

After T0-T6 (≈1 day):

- **S1-1/S1-2/S1-3** — Wire scene-loop into PROGRESS/SEGMENT/MEMORY/ADAIN_STATS notifications.
- **S1-8** — `docs/storyboard.md` priority→knob map (becomes home for T4 resolution guidance + T6 distill recommendation).
- **S2-1** — `compile_storyboard.py` deterministic compiler (one prompt → scenes JSON, regex + heuristic, no LLM).
- **S2-6** — `fast-preview` profile (uses T4's "fast" preset).

Sequencing: T0+T4+T6 first (zero-cost docs), then T1 (cheapest GPU smoke), evaluate visual quality, then T2/T3 in parallel if T1 looks good. Then unlock the 4 council items.

---

## Sequencing rationale

- **T0 first** because reproducibility-lock takes <30 min and unblocks every later smoke (sha256-comparable runs).
- **T4 + T6 before T1** because they're docs/config — zero GPU time.
- **T1 (RTX upscale 2x)** is the cheapest quality lever — leverages already-validated VFX path, end-to-end test of multiscene + upscale stacking.
- **T2 (refine + upscale)** only if T1 quality is insufficient — biggest wall time hit (+27 min).
- **T3 (swap=44)** validates VRAM headroom for future stacking (refine + upscale + maybe higher-res preset).
- **T5 (LLM planner requirements)** captures the design surface NOW so the deterministic S2-1 compiler doesn't paint into a corner; LLM impl deferred to separate spec.

Total time for T0-T6: ≈1 day (mostly GPU smoke waits, ~60 min of typing).
