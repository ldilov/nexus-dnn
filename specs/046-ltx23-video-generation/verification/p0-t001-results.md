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

**Path forward — first attempt (Lightricks/LTX-2 + fp8 transformer override) — REJECTED**:

First hypothesis was to download `Lightricks/LTX-2` small components and override the transformer with the FP8 single file:

```python
transformer = LTX2VideoTransformer3DModel.from_single_file(
    fp8_safetensors_path,
    config='Lightricks/LTX-2/transformer/config.json',
    torch_dtype=torch.bfloat16,
)
```

Tried 2026-05-13. **Architectural mismatch across all 48 transformer blocks**:
```
size mismatch for transformer_blocks.{0..47}.scale_shift_table:
  checkpoint shape [9, 4096] vs current model shape [6, 4096]
size mismatch for transformer_blocks.{0..47}.audio_scale_shift_table:
  checkpoint shape [9, 2048] vs current model shape [6, 2048]
```

LTX-2.3 is structurally different from LTX-2 — 9 conditioning channels vs 6 in every block's normalization tables. `ignore_mismatched_sizes=True` would re-randomise every single one of those tables, destroying the model. So `Lightricks/LTX-2`'s transformer config is **not** a valid pairing for the LTX-2.3-fp8 weights, even with the transformer-override pattern.

Also: `Lightricks/LTX-2`'s small components ended up at **99.6 GB** on disk (not 10–12 GB as estimated) — the text_encoder alone is 12 shards × 4.5 GB ≈ 54 GB plus an additional 11-shard `model-*.safetensors` set. LTX-2 has a much larger encoder stack than expected.

This download path is a dead end and was cleaned up — the 99.6 GB of `Lightricks/LTX-2` components are NOT useful for the LTX-2.3 chain. Recommend removing `C:\Users\lazar\.nexus\models\Lightricks\LTX-2\` before any further work.

**Path forward — second attempt (community-ported diffusers-format LTX-2.3 repo) — RECOMMENDED for Rung 7G**:

A search of HF surfaced multiple community ports of LTX-2.3 into diffusers-format:

| Repo | Size | Status |
|---|---|---|
| `dg845/LTX-2.3-Diffusers` | ~94 GB | full BF16 LTX-2.3, 4034 downloads, has `model_index.json` |
| `dg845/LTX-2.3-Distilled-Diffusers` | **~88 GB** | distilled BF16, 735 downloads, has `model_index.json` |
| `CalamitousFelicitousness/LTX-2.3-distilled-Diffusers` | ? | 45 downloads |
| `FastVideo/LTX-2.3-Distilled-Diffusers` | ? | 0 downloads |

`dg845/LTX-2.3-Distilled-Diffusers` is the recommended target: distilled (8 inference steps default), 88 GB, the most-downloaded standalone diffusers port. It has the right `transformer/config.json` matching the LTX-2.3 architecture (9 conditioning channels), plus all sibling components (T5 text encoder, VAE, scheduler, tokenizer). Standard `from_pretrained` should Just Work.

**Steps for Rung 7G**:
1. Update `installer.py`'s `PROFILE_REPO` map to use `dg845/LTX-2.3-Distilled-Diffusers` (or make it a per-profile choice between `dg845/...` BF16 and the FP8 single-file). Optionally retain `Lightricks/LTX-2.3-fp8` as a fallback override for VRAM-constrained users.
2. Profile install downloads ~88 GB; sentinel + DTO unchanged.
3. `_ensure_pipeline_loaded` becomes:
   ```python
   pipe = LTX2ImageToVideoPipeline.from_pretrained(
       model_dir,                      # dg845/LTX-2.3-Distilled-Diffusers snapshot
       torch_dtype=torch.bfloat16,
       local_files_only=True,
   )
   ```
   No transformer-override needed — the repo already has matching weights.
4. Drop the FP8 single-file path from `pipeline_diffusers.py::_ensure_pipeline_loaded` (move it to a separate `pipeline_diffusers_fp8.py` for the future fp8 quant work).

**Or — third attempt (NOT yet investigated)**: upstream diffusers may add LTX2.3-specific configs in a later release that lets `Lightricks/LTX-2.3-fp8` load via `from_single_file` without a base repo. Check diffusers >= 0.38 release notes when those land. Until then, route through the community port.

Disk implication for the next session: ~88 GB additional download. Total LTX-2.3 footprint will be ~140 GB after cleanup (88 GB diffusers port + 56 GB optional fp8 single-file kept as a quant override).

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
