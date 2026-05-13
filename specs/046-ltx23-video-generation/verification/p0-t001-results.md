# P0-T001 — First Real LTX-2.3 Render Spike

**Date**: 2026-05-13
**Hardware**: NVIDIA GeForce RTX 5070 Ti, 16 GB VRAM, compute capability 12.0 (Blackwell)
**Driver**: 596.49
**OS**: Windows 11 Pro
**Outcome**: ❌ first real render did **not** complete; ✅ precise diagnosis captured + 3 of 4 root causes fixed
**Branch**: `claude/unruffled-perlman-dd12e1`
**Lead commit**: `5d53ef8` (`fix(046): real-GPU enablement — CUDA wheels + LTX2 pipeline + runtime venv`)

## Environment captured

| Component | Version |
|---|---|
| Python (runtime venv) | 3.11.13 |
| torch | 2.11.0+cu128 |
| CUDA (compiled-against) | 12.8 |
| `torch.cuda.is_available()` | True |
| `torch.cuda.get_device_name(0)` | NVIDIA GeForce RTX 5070 Ti |
| `torch.cuda.get_device_capability(0)` | (12, 0) — Blackwell sm_120 |
| diffusers | 0.37.1 |
| transformers | 5.8.1 |
| accelerate | 1.13.0 |
| safetensors | 0.7.0 |
| huggingface_hub | 1.14.0 |
| einops | 0.8.2 |

## Issues encountered + dispositions

### 1. ❌→✅ uv resolved `torch==2.11.0+cpu` by default

**Symptom**: `import torch; torch.cuda.is_available() → False` immediately after `uv sync --extra diffusers`. The CPU wheel was selected from PyPI's default torch package because the worker's pyproject didn't pin a source.

**Root cause**: PyPI ships only the CPU torch wheel; CUDA wheels live on PyTorch's own index. uv's default resolver picked CPU.

**Fix**: Added `[tool.uv.sources]` + `[[tool.uv.index]] name=pytorch-cu128 url=https://download.pytorch.org/whl/cu128 explicit=true` to `worker/pyproject.toml` so torch/torchvision/torchaudio route through the cu128 index. uv.lock regenerated. torch resolved to `2.11.0+cu128` with sm_120 kernels.

### 2. ❌→✅ Worker subprocess imported from wrong venv

**Symptom**: After `uv sync --extra diffusers` from the host's unified install RPC, the worker's `from huggingface_hub import snapshot_download` failed with `ModuleNotFoundError: No module named 'huggingface_hub'`.

**Root cause**: The worker runs from `<NEXUS_HOST_DATA_DIR>/extensions/nexus.video.ltx23/runtime/packages/.venv/`, but `uv sync` in `worker/` defaults to syncing `worker/.venv/` (the in-repo dev venv). Two different venvs.

**Fix**: `_default_uv_sync_runner` in `installer.py` now sets `UV_PROJECT_ENVIRONMENT=<runtime venv path>` before exec'ing uv. Path derived from `NEXUS_HOST_DATA_DIR` env (always set by the host's `LtxLeaseFactory::LaunchSpec`). Emits an `info:` progress line documenting the chosen venv path. When `NEXUS_HOST_DATA_DIR` is unset (test mode) the in-repo dev venv is still synced as before.

### 3. ❌→✅ Wrong pipeline class for LTX-2.3 weights

**Symptom**: Originally would have been "diffusers can't find model_index.json" — our `_ensure_pipeline_loaded` used `LTXImageToVideoPipeline` (LTX **v1**) for an LTX **2.3** repo.

**Root cause**: diffusers 0.37+ ships separate classes for the two model families:
- `LTXImageToVideoPipeline` — LTX v1
- `LTX2ImageToVideoPipeline` — LTX 2.x (matches Lightricks/LTX-2.3-* weights)

**Fix**: `_ensure_pipeline_loaded` imports `LTX2ImageToVideoPipeline` first, falls back to v1 only if the v2 symbol is missing (older diffusers). Logs the selected class for observability.

### 4. ❌→✅ Pipeline load blocked the JSON-RPC reply (30 s timeout)

**Symptom**: Live render returned `render.start rejected by worker: timed out` after exactly 30 s. The host's `lease.send_rpc` has a fixed 30 s timeout; the worker's `render_start` handler was calling `_ensure_pipeline_loaded` SYNCHRONOUSLY before replying — which on a cold cache takes minutes for a 22B fp8 model.

**Root cause**: Architectural — `render_start` returned `{run_id, status: "started"}` AFTER the model finished loading. Reply path coupled to the heavy work.

**Fix**: Moved the pipeline load into a background task. `render_start` now spawns `_load_then_render(...)` and replies immediately. Inside the task, `_ensure_pipeline_loaded` runs via `asyncio.to_thread` (sync work off the event loop), emitting `ltx.video.progress{phase:"loading_model"}` then `{phase:"rendering"}` notifications before calling the existing `_render_loop`. The Rust runner consumes notifications and updates DB status correctly.

### 5. ⏳ BLOCKER — `Lightricks/LTX-2.3-fp8` is transformer-weights only, not a diffusers-format repo

**Symptom (final)**: `LTX2ImageToVideoPipeline.from_pretrained(<snapshot-dir>)` failed with:
```
OSError: Error no file named model_index.json found in directory
  C:\Users\lazar\.nexus\models\Lightricks\LTX-2.3-fp8.
```

**Investigation**:
```bash
$ ls C:\Users\lazar\.nexus\models\Lightricks\LTX-2.3-fp8\
.gitattributes
.nexus-install-complete  (our sentinel)
README.md
ltx-2.3-22b-dev-fp8.safetensors        # 27.8 GB
ltx-2.3-22b-distilled-fp8.safetensors  # 28.2 GB
```

The repo contains **only** two FP8-quantized transformer safetensors files. No `model_index.json`, no `vae/`, no `text_encoder/`, no `tokenizer/`, no `scheduler/`. `from_pretrained` requires the full diffusers multi-folder layout.

Tried `LTX2ImageToVideoPipeline.from_single_file(<fp8-path>)` — diffusers auto-fetched 12 small config files from the Hub but failed at:
```
SingleFileComponentError: Failed to load T5EncoderModel. Weights for this component
appear to be missing in the checkpoint.
Please load the component before passing it in as an argument to `from_single_file`.

  text_encoder = T5EncoderModel.from_pretrained('...')
  pipe = LTX2ImageToVideoPipeline.from_single_file(<checkpoint path>, text_encoder=text_encoder)
```

So the fp8 file contains the transformer ONLY — the T5 text encoder, VAE, and scheduler must come from somewhere else.

**HF org survey** (`Lightricks/`):
- `Lightricks/LTX-2.3` — 13 files, **no** `model_index.json` (config-only repo)
- `Lightricks/LTX-2` — 69 files, **has** `model_index.json` + full sub-folders:
  - `transformer/`, `vae/`, `text_encoder/`, `tokenizer/`, `scheduler/`,
  - plus LTX-2-specific: `audio_vae/`, `latent_upsampler/`, `vocoder/`, `connectors/`
- `Lightricks/LTX-2.3-fp8`, `Lightricks/LTX-2.3-nvfp4` — transformer-only quantized variants
- Several `Lightricks/LTX-2.3-22b-IC-LoRA-*` — LoRA control adapters (out of scope)

**Path forward (Rung 7G — proposed)**:
1. Installer downloads `Lightricks/LTX-2` with `allow_patterns` filtering out the BF16 transformer (~44 GB) — we already have an FP8 version. Keep `audio_vae/`, `latent_upsampler/`, `vocoder/`, `text_encoder/` (~9 GB T5-XXL), `tokenizer/`, `scheduler/`, `vae/`, `connectors/`. Estimated size: ~10–12 GB.
2. Installer ALSO downloads the chosen quantized variant (already working today — `Lightricks/LTX-2.3-fp8` or `Lightricks/LTX-2.3-nvfp4`).
3. `_ensure_pipeline_loaded` chains the two:
   ```python
   from diffusers import LTX2VideoTransformer3DModel, LTX2ImageToVideoPipeline
   transformer = LTX2VideoTransformer3DModel.from_single_file(
       fp8_safetensors_path, torch_dtype=torch.bfloat16, local_files_only=True,
   )
   pipe = LTX2ImageToVideoPipeline.from_pretrained(
       ltx2_base_dir,                  # the small components from Lightricks/LTX-2
       transformer=transformer,        # quantized override
       torch_dtype=torch.bfloat16,
       local_files_only=True,
   )
   ```
4. Profile install endpoint extends to track BOTH downloads:
   - Phase `downloading_base` for Lightricks/LTX-2 (with allow_patterns)
   - Phase `downloading_quantized` for the fp8/nvfp4 variant
5. Sentinel only written once both are complete.

This is a focused Rung 7G — not a redesign. Roughly: 50 lines of installer.py + 40 lines of pipeline_diffusers.py + maybe 2 new unit tests. The Rust side requires no changes.

## What the unified install flow proved out (independent of the load failure)

Even without a completed render, this spike validated:

- ✅ uv-driven CUDA torch installation reaches the runtime venv successfully when `UV_PROJECT_ENVIRONMENT` is set.
- ✅ `huggingface_hub.snapshot_download` correctly downloaded 56 GB (the FP8 dev + distilled variants in this case) inside the unified install flow.
- ✅ Progress notifications (78 packages resolved, individual torch/diffusers/transformers download lines) appear in `recent_progress` ring buffer.
- ✅ Boundary audit clean — no host-path leakage despite the heavy real-GPU work.
- ✅ `phase` indicator transitions correctly: `starting → resolving_deps → downloading_weights → done`.
- ✅ `.nexus-install-complete` sentinel written atomically after the snapshot lands.
- ✅ Async pipeline load makes `render.start` reply within milliseconds (no more 30s timeout regardless of cold-cache cost).

## Files modified this spike

- `extensions/builtin/nexus-video-ltx23/worker/pyproject.toml` — `[tool.uv.sources]` + pytorch-cu128 index
- `extensions/builtin/nexus-video-ltx23/worker/uv.lock` — regenerated with `+cu128` torch wheels
- `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/installer.py` — `UV_PROJECT_ENVIRONMENT=<runtime venv>`
- `extensions/builtin/nexus-video-ltx23/worker/src/ltx_video_worker/pipeline_diffusers.py` — LTX2 pipeline class + async `_load_then_render` wrapper

## Telemetry not yet captured

| Metric | Status |
|---|---|
| Wall-clock per segment | pending Rung 7G fix |
| Peak VRAM allocated | pending Rung 7G fix |
| `num_alloc_retries` | pending Rung 7G fix |
| `frag_ratio` after multi-segment | pending Rung 7G fix |
| First-load time (cold) | pending Rung 7G fix |
| Second-load time (warm) | pending Rung 7G fix |

Capture template: emitted by `_emit_memory_stats` in `pipeline_diffusers.py` via the existing `runtime.memory_stats` notification. Will land in DB rows once render runs to completion.
