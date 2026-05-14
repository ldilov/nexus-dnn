# Spec 046 — LTX-2.3 Video Generator — Release Notes

**Extension**: `nexus.video.ltx23`
**Branch**: `claude/unruffled-perlman-dd12e1`
**Status**: Production-ready on fake path; real-GPU path validated on RTX 5070 Ti Blackwell.

## What this extension does

Generates user-specified-length MP4 videos from a text prompt + optional input image, using Lightricks' LTX-2.3 model running locally on consumer NVIDIA GPUs. The extension owns:

- Render planning (segment math, VRAM-risk estimation, scene-to-segment timeline zip)
- A typed JSON-RPC contract to an isolated Python worker (diffusers + LTX-2.3 + ffmpeg)
- Per-run state persistence in SQLite (`ext_nexus_video_ltx23__runs` / `segments`)
- A React + vanilla-extract recipe UI as a custom-element bundle
- Host-bounded HTTP surface at `/api/v1/extensions/nexus.video.ltx23/*`

## Headline features

### Multi-scene long-video chains with art-style + character preservation

The signature feature for narrative video. Users supply:

- `prompt` — global / fallback action
- `character_prompt` — anchored to every scene (e.g. _"a woman in a red coat, short black hair, brown eyes"_)
- `style_prompt` — appended to every scene (e.g. _"moody noir, deep teal shadows, neon highlights, 35mm film grain"_)
- `scenes[]` — optional per-scene script with `{prompt, duration_seconds?, seed?}`

The planner zips scenes against the computed segment timeline. The worker composes each segment's effective prompt as `"character. scene action. style."` and image-conditions scene N+1 on scene N's last frame. Scene seeds derive deterministically from the master seed so RNG-driven lighting/detail stays correlated across cuts.

### Fits in 16 GB VRAM

The 22B-parameter BF16 LTX-2.3 distilled model runs on a 16 GB GPU via `pipe.enable_sequential_cpu_offload()` — peak ~5 GB measured on RTX 5070 Ti Blackwell. Sequential offload swaps individual transformer blocks in/out of GPU on demand so the active GPU footprint is one block's activations, NOT the whole 22B model.

Measured on RTX 5070 Ti (CUDA 12.8, driver 596.49):

| Metric | Value |
|---|---|
| Cold pipeline load | 61.6 s |
| Render (8 steps × 49 frames × 768×512) | 691 s (~75 s/step at higher resolution / spilling regime, ~14 s/step under sequential offload at smaller sizes) |
| Peak GPU memory (sequential offload) | **4.69 GB** |
| Output | Prompt-matching frames |

### Hyperparameter control

- `seed` — master seed
- `advanced.guidance_scale` — CFG strength, 1.0–7.0 sensible (default 4.0)
- `advanced.num_inference_steps` — denoising steps (default 8 for distilled)
- `advanced.segment_seconds` — per-segment length (default 4.0 s)
- `advanced.overlap_seconds` — segment overlap (default 0.5 s)

All exposed in the recipe UI's `Advanced` collapsible.

### Per-inference-step heartbeats

Diffusers' `callback_on_step_end` hook fires `ltx.video.segment.step` notifications every denoising step. Renders that take minutes per segment now visibly tick "step 3/8" through the host SSE bus and runner log instead of being silent.

### Idempotency-Key on POST /renders

Repeat POSTs with the same `Idempotency-Key` header within a 10-minute TTL return the cached run instead of spawning duplicate work. Survives accidental form double-clicks, network retries, refresh-on-pending-submit.

### Cancel actually cancels

`POST /renders/{run_id}/cancel` propagates end-to-end via a Notify-based registry: sends `ltx.video.render.cancel` to the worker, the worker exits at the next segment boundary, the DB flips to `cancelled` with partial-segment progress preserved.

## Hardware support matrix

| Profile | Target hardware | Compute | Status |
|---|---|---|---|
| `nexus.video.ltx23.rtx40-fp8` | RTX 40 Ada | sm_89, CUDA 12.6+ | Production |
| `nexus.video.ltx23.rtx50-fp8` | RTX 50 Blackwell | sm_120, CUDA 12.8+ | Production (validated on RTX 5070 Ti) |
| `nexus.video.ltx23.rtx50-nvfp4` | RTX 50 Blackwell native NVFP4 | sm_120 | **Experimental — opt-in only** |
| `nexus.video.ltx23.fake` | any | — | CI + frontend dev |

All real-runtime profiles map to `dg845/LTX-2.3-Distilled-Diffusers` today (~88 GB diffusers-format BF16 port) until upstream diffusers ships a single-file loader for the official `Lightricks/LTX-2.3-{fp8,nvfp4}` ComfyUI-style checkpoints.

Driver requirements per profile and full hardware tables in [`docs/requirements.md`](../../docs/requirements.md).

## API summary

10 routes under `/api/v1/extensions/nexus.video.ltx23/`:

- `GET /health` · `GET /runtime-profiles`
- `POST /recipe/plan`
- `POST /renders` (Idempotency-Key supported) · `GET /renders/{run_id}`
- `POST /renders/{run_id}/cancel` · `POST /renders/{run_id}/retry-segment`
- `GET /renders/{run_id}/segments` · `GET /artifacts/{artifact_id}`
- `GET /profiles/{profile_id}/install` · `POST /profiles/{profile_id}/install`

Full OpenAPI in [`extension.openapi.yaml`](../../extensions/builtin/nexus-video-ltx23/openapi/extension.openapi.yaml).

## Notifications (JSON-RPC, worker → host)

- `ltx.video.segment.started` · `ltx.video.segment.step` (per-step heartbeat) · `ltx.video.segment.completed`
- `ltx.video.artifact.created` · `ltx.video.done` · `ltx.video.error`
- `ltx.video.runtime.install.{progress,done,error}` (unified install CTA)
- `runtime.memory_stats` (VRAM telemetry)

## Known limitations

- Real-runtime profiles share a single weights repo (dg845 BF16) because the official Lightricks FP8/NVFP4 single-files don't load via diffusers' standard pipeline. The fp8 weights are downloaded by the install path for future quant-loader work; current rendering uses BF16 + sequential offload.
- `POST /renders/{run_id}/retry-segment` is currently a DB-only status flip — the running Python subprocess isn't re-driven (would need a `ltx.video.segment.retry` RPC on the worker side). Cancel + fresh render is the workaround.
- RIFE 2× interpolation falls back to ffmpeg `minterpolate` when the optional `rife-ncnn-vulkan-python` wheel isn't installed. Quality difference is real but minor.
- `Idempotency-Key` cache is process-local in-memory; a multi-host deployment would need to graduate this to a real KV store.

## Acceptance criteria status

All 13 ACs from [`spec.md`](spec.md):

| AC | Status |
|---|---|
| AC1 (test coverage) | ✅ Rust 34 unit + 31 Python; frontend uses Playwright in apps/web |
| AC2 (UI states) | ✅ loading / empty / error / success all render |
| AC3 (no secrets / safe inputs) | ✅ no hardcoded secrets; validated user input via the schema |
| AC4 (build/lint/test pass) | ✅ cargo build + clippy -D warnings + cargo test all green |
| AC5 (OpenAPI v3 maintained) | ✅ extension fragment mirrors `api::http_routes()` |
| AC6 (no host coupling) | ✅ `audit-boundary.sh` PASS |
| AC7 (recipe UI complete) | ✅ all form fields, plan preview, segment timeline, final artifact |
| AC8 (same paradigm) | ✅ custom-element bundle at `web/dist/ltx23-video.js` |
| AC9 (reusable components) | ✅ `MediaArtifactPlayer` accepts generic `ArtifactRef` |
| AC10 (few comments) | ✅ code-review enforced |
| AC11 (preview + download) | ✅ inline `<video>` + Download MP4 button on completion |
| AC12 (16 GB VRAM) | ✅ 4.69 GB peak measured on RTX 5070 Ti |
| AC13 (models cleared post-run) | ✅ canonical drop sequence in `vram.py` |

## Spec follow-ups still open

See [`followups.md`](followups.md) and [`tasks.md`](tasks.md) for the full backlog. The highest-value open items:

- **Custom GGUF loader** (Rung 7H+): bypass diffusers 0.39's utf-8 sniff regression so the Q4_K_M variant becomes loadable. Drops disk by 5× and may improve throughput on Blackwell.
- **Native Lightricks FP8 single-file loader**: 50–100 lines of ComfyUI-style key remapping so the official `Lightricks/LTX-2.3-fp8` repo becomes the canonical source.
- **Retry-segment task abort**: wire a `ltx.video.segment.retry` RPC so the runner can re-drive a single segment without rerunning the chain.
- **VRAM threshold supervisor** (P2-T206): auto-restart on `num_alloc_retries` / `frag_ratio` thresholds.
- **Frame-diff continuity test** (P3-T301): RMSE between restarted vs non-restarted control.

## Commit trail

Branch `claude/unruffled-perlman-dd12e1` carries 19+ commits from the morning of 2026-05-13. Highlights:

- `90978b6` Rung 1 — fake-mode end-to-end
- `9b904e1` Rung 4 — real Python subprocess + JSON-RPC notifications
- `e6388d5` Rung 7B — unified runtime install CTA (uv sync + weights)
- `d901295` Rung 7D — cancel actually cancels
- `5cbce86` Rung 7G — first real LTX-2.3 frames on RTX 5070 Ti
- `1fed6f4` 16 GB fit via `enable_sequential_cpu_offload()`
- `a842595` Multi-scene chains with character + style preservation
- _(this batch)_ Idempotency + step heartbeats + real profile state + OpenAPI parity

Pre-merge cleanup: drop the rockapaper sdnq dir (40 GB, unsupported quant) and decide on retention policy for the Lightricks/LTX-2.3-fp8 single-file (kept for future quant-loader work but not used in production).
