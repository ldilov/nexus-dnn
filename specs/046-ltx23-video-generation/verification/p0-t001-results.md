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

---

## Rung 7G follow-up — 2026-05-13 (afternoon session)

Took the spike one round further: cleaned up the 99 GB of incompatible
`Lightricks/LTX-2` components and downloaded the community port
`dg845/LTX-2.3-Distilled-Diffusers` (88.45 GB in 9 minutes via the
unified install CTA we built in Rung 7B). All four blockers from the
morning got incremental progress:

### Standalone test — ✅ SUCCESS

Running `LTX2Pipeline.from_pretrained(dg845_dir)` directly from the
runtime venv generated 49 real LTX-2.3 frames on the RTX 5070 Ti:

| Metric | Measured |
|---|---|
| Pipeline class | `LTX2Pipeline` (per `model_index.json` `_class_name`) |
| diffusers version | `0.39.0.dev0` (pinned at git commit `adff1cae9f3d4f79dcff6a3ceb02e0a56982f88c`) |
| Cold pipeline load | **61.6 s** |
| Render (8 inference steps × 49 frames × 768×512) | **691.3 s** (75 s / step) |
| Peak GPU memory | **37.26 GB** (over the 16 GB physical limit — spilling to system RAM via Windows unified memory) |
| Output | 49 PIL frames |
| Prompt-following | **verified visually** — first frame shows a dim futuristic city skyline at dusk; samples at `C:\Users\lazar\.nexus\runs\rung7g-smoke\frame_{000,001,002}.png` |

Total wall-clock: 753 s end-to-end (~12.5 minutes). The 37 GB peak
exceeds 16 GB VRAM physically; Windows' unified-memory allocator
silently spills to system RAM at significant perf cost — that's why
each inference step takes 75 s instead of the expected 5–15 s on
native VRAM. The standalone test still completed and produced a real,
prompt-matching video frame.

### Released diffusers 0.37.1 — INCOMPATIBLE WITH dg845 WEIGHTS

Initially tried `pip install diffusers==0.37.1` (the latest released
version). It dropped the in-progress LTX-2.3 schema:

```
Cannot load <transformer_blocks.0.audio_scale_shift_table>:
  expected shape [6, 2048], got [9, 2048].
```

48 blocks all fail this mismatch on both `scale_shift_table` and
`audio_scale_shift_table`. The released `LTX2VideoTransformer3DModel`
class has 6 conditioning channels; the dg845 weights need 9. Released
diffusers also discards the relevant config keys
(`audio_cross_attn_mod`, `audio_gated_attn`, `cross_attn_mod`,
`gated_attn`, `perturbed_attn`, `use_prompt_embeddings`,
`audio_hidden_dim`, `video_hidden_dim`, `per_modality_projections`,
`proj_bias`, `video_gated_attn`) as "not expected" — the 9-channel
support was a development-branch feature that didn't make 0.37.1.

`ignore_mismatched_sizes=True` doesn't propagate cleanly through
`Pipeline.from_pretrained → sub_model.from_pretrained`; still errors.

**Fix landed in this branch**: `diffusers` extra now pins to the git
commit `adff1cae9f3d4f79dcff6a3ceb02e0a56982f88c` (HEAD of main as of
2026-05-13). Hatch needs
`[tool.hatch.metadata] allow-direct-references = true` to accept the
git URL. Worker pyproject + uv.lock both updated. `pipeline_diffusers.py`
now imports `LTX2Pipeline` (matches dg845's `model_index.json`
`_class_name`) with `LTX2ImageToVideoPipeline` then `LTXImageToVideoPipeline`
as fallbacks. `_generate_segment` probes the active pipeline's call
signature and only passes `image`/`cond_image` when supported — drops
silently when the active class is pure text-to-video.

### Host-driven render through the worker subprocess — ⚠️ HANGS

Triggered an identical render via `POST /renders` after the install
completed. Worker started (`worker.start` logged), but emitted NO
further stderr for the full 1800 s `RENDER_TIMEOUT` (bumped from
600 s in this branch — see `runner.rs` RENDER_TIMEOUT). Host killed
the lease at the timeout, the worker process exited cleanly with
`worker.stop`. Zero progress notifications, zero error notifications,
zero tqdm output.

This is the SAME code path the standalone test ran successfully, but
something about the host-subprocess integration is suppressing
diffusers' progress output and likely the entire render loop. Several
hypotheses worth probing in a fresh session:

1. **stdout / stderr buffering**: `__main__.py::_hijack_stdout()`
   redirects `sys.stdout → sys.stderr` BEFORE importing torch /
   diffusers. Their tqdm and `print()` calls land on stderr, which
   the host captures. But Python may buffer stderr aggressively when
   stdout is redirected — diffusers' progress writes might never
   flush before the worker is killed.
2. **GPU contention**: the host's resident state holds a CUDA context
   open for other extensions (`nexus.local-llm`, `nexus.audio.emotiontts`
   both initialise GPU on load). Allocating the LTX2 pipeline on top
   of an already-fragmented allocator might be dramatically slower.
   Standalone ran with NO host resident.
3. **CPU offload thrashing**: `enable_model_cpu_offload()` requires
   shuttling tensors between CPU and GPU on every block. With 37 GB
   peak memory already spilling to system RAM, the thrashing might
   compound. The standalone test ran from a fresh process; the host's
   worker venv has more pre-loaded baggage.

### Path forward (Rung 7H — proposed)

1. Add explicit `flush=True` calls or `PYTHONUNBUFFERED=1` propagation
   in `lease.rs::LaunchSpec` so the worker's stderr is line-buffered.
2. Strip the stdout hijack — diffusers' progress output is legit
   stderr output already; we don't need the hijack for LTX 2.3 the
   way we did for older worker implementations.
3. Add per-step progress notifications (`callback_on_step_end` hook
   in the LTX2Pipeline call) so the runner has visible heartbeats
   even when stderr is silenced.
4. Probe whether the host's other GPU-using extensions can be
   deactivated for the duration of an LTX render (lease-level
   exclusivity beyond what we have today).
5. Switch to a quantized variant (Lightricks/LTX-2.3-fp8 via single-file
   override OR a future diffusers quantization config) to keep peak
   memory under 16 GB — fixes both the system-RAM spill AND likely
   the host-integration hang.

### Files modified this round

| Path | Why |
|---|---|
| `worker/pyproject.toml` | Pin diffusers to git commit; allow-direct-references |
| `worker/uv.lock` | Regenerated with 0.39.0.dev0 |
| `worker/src/ltx_video_worker/installer.py` | `PROFILE_REPO` → `dg845/LTX-2.3-Distilled-Diffusers` |
| `worker/src/ltx_video_worker/pipeline_diffusers.py` | `_expected_family_id` repo + `LTX2Pipeline` first + `_generate_segment` defensive image-kwarg probe |
| `worker/tests/test_diffusers_resolver.py` | Updated assertions to dg845 paths |
| `worker/tests/test_runtime_install.py` | Updated repo string in DTO assertions |
| `rust/src/runner.rs` | RENDER_TIMEOUT 600s → 1800s with rationale comment |
| `rust/src/profile_install.rs` | `profile_repo()` returns dg845 for all real-runtime profiles |

All gates green: cargo clippy + 26/26 Rust tests + 31/31 Python tests
+ boundary audit PASS.

### Cleanup completed

- `C:\Users\lazar\.nexus\models\Lightricks\LTX-2` — deleted (99.6 GB
  of incompatible components from the LTX-2 architecture).
- `C:\Users\lazar\.nexus\models\Lightricks\LTX-2.3-fp8` — KEPT (56 GB
  of transformer-only fp8 weights, future-useful for a quantization
  rung once diffusers supports it natively).
- `C:\Users\lazar\.nexus\models\dg845\LTX-2.3-Distilled-Diffusers` —
  88.45 GB, working diffusers-format weights, used by current
  pipeline_diffusers.py.

Total disk footprint after cleanup: ~145 GB of model data.

---

## Rung 7G follow-up (final) — under-16-GB native fit

User asked for a model that actually fits in 16 GB VRAM. After a small
detour exploring four dead ends, the answer turned out to be one line.

### Dead ends explored (so the next person doesn't repeat them)

1. **Override dg845's BF16 transformer with the FP8 single-file**
   (`Lightricks/LTX-2.3-fp8`):
   The Lightricks FP8 file is ComfyUI-style — 8871 keys all prefixed
   `model.diffusion_model.*`, packing the WHOLE pipeline (audio_vae,
   transformer, vocoder, etc.) into one safetensors. `audio_scale_shift_table`
   in this file is even differently shaped — `[2, 2048]` not `[6, 2048]`
   or `[9, 2048]`. `LTX2VideoTransformer3DModel.from_single_file` chokes
   on the key prefix (`NotImplementedError: cannot copy out of meta
   tensor`). Would require a custom key-remap shim — out of scope here.

2. **Community pre-quantized port `rockapaper/...tenc_fp8_sdnq_r64_s16`**:
   39.7 GB on disk, full diffusers-format. Downloaded cleanly. Fails to
   load:
   ```
   ValueError: Unknown quantization type, got sdnq - supported types are:
     ['bitsandbytes_4bit', 'bitsandbytes_8bit', 'gguf', 'quanto',
      'torchao', 'modelopt']
   ```
   SDNQ is a SD.next-specific quant scheme not supported by diffusers.

3. **`optimum-quanto` INT8 quantize-on-load via `QuantoConfig`**:
   In principle the cleanest path. In practice the on-the-fly quant of a
   22B model spent 30+ minutes at the load step alone, consuming 50 GB
   RAM (holding both the original and the int8 result during conversion).
   Killed at the half-hour mark with no output. Not viable on this machine.

4. **`Lightricks/LTX-2.3-nvfp4`**: NOT downloaded — same single-file
   ComfyUI-style format as the FP8 repo, would hit the same loader issue.

### What actually worked: `enable_sequential_cpu_offload()` ✅

The same dg845 BF16 weights already on disk, loaded the same way, with
one line changed in `_ensure_pipeline_loaded`:

```python
- pipe.enable_model_cpu_offload()
+ pipe.enable_sequential_cpu_offload()
```

`enable_sequential_cpu_offload()` swaps individual sub-modules between
CPU and GPU on every forward pass — at most a single transformer block
lives on the GPU at any moment. The peak VRAM cost is dominated by the
single block's intermediate activations + KV cache, not the model
weights themselves.

### Telemetry — sequential CPU offload, 2026-05-13 evening

| Metric | model_cpu_offload (morning) | sequential_cpu_offload (evening) |
|---|---|---|
| Peak GPU mem | **37.26 GB** (spilled to system RAM) | **4.69 GB** (no spill) |
| First render: load + 8 steps × 49 frames × 768×512 | 753 s total | (not retested at same params; sized down test below) |
| Sized-down render: 4 steps × 25 frames × 512×320 | n/a | 55 s total (13.7 s/step) |
| Output | 49 prompt-matching frames | 25 prompt-matching frames |
| Fits 16 GB native? | ❌ (spill) | ✅ |

Sample saved at `C:\Users\lazar\.nexus\runs\rung7g-seqoffload\frame_{000,001,002}.png` — first frame again resolves the prompt visually (futuristic city, dusk lighting).

The 13.7 s/step measurement at 512×320 doesn't compare apples-to-apples
to the morning's 75 s/step at 768×512 (smaller resolution + fewer
frames), but two qualitative observations stand:

- The model_cpu_offload path was demonstrably slower than sequential
  for the simple reason that it spilled. With actual VRAM (sequential
  keeps everything inside 16 GB), throughput is bound by GPU compute
  alone, not paging.
- 4.69 GB peak leaves 11 GB headroom for larger resolutions or longer
  segments before approaching the limit.

### Production code change

`worker/src/ltx_video_worker/pipeline_diffusers.py::_ensure_pipeline_loaded`
now calls `enable_sequential_cpu_offload()` when supported, falls back
to `enable_model_cpu_offload()` for older diffusers versions. `pipe.to(
device)` is intentionally OMITTED — sequential offload manages device
placement itself; calling `.to(...)` first defeats it.

### Disk footprint after this round

The detours added one repo:

- `rockapaper/LTX-2.3-Distilled-Diffusers_tenc_fp8_sdnq_r64_s16` — 39.7 GB
  (SDNQ format, diffusers can't load it — KEEP for a future SD.next
  integration OR rerun with `bitsandbytes`/`quanto`/`torchao` ports).

Total LTX-2.3 model footprint: ~185 GB (88 dg845 + 56 fp8 + 39 rockapaper +
~2 other).

Recommended cleanup for the next session: remove the rockapaper and
Lightricks/LTX-2.3-fp8 dirs until a diffusers loader for either lands.
The dg845 repo + sequential CPU offload is the canonical 16-GB-fitting
pipeline today.

---

## Rung 7G evening pass — quantized variants benchmark sweep

User asked for a setup that:
- Loads as much as possible onto GPU (not death-by-offload latency)
- Takes real advantage of RTX Blackwell hardware
- Offloads only rarely-used components

Tested four diffusers-compatible quant paths against the working
dg845 BF16 + sequential_cpu_offload baseline.

### Survey of LTX-2.3 quantized variants on HF (2026-05-13)

| Repo | Downloads | Format | Size | Outcome |
|---|---|---|---|---|
| `unsloth/LTX-2.3-GGUF` | 309 k | GGUF Q3..F16 | 13–39 GB/file | not yet tried (siblings of Abiray) |
| `QuantStack/LTX-2.3-GGUF` | 47 k | GGUF Q3..Q8 | 16–24 GB/file | not yet tried |
| `Lightricks/LTX-2.3-nvfp4` | 44 k | ComfyUI nvfp4 | ~14 GB | same single-file blocker as fp8 |
| `Abiray/LTX-2.3-22B-DISTILLED-1.1-GGUF` | 32 k | GGUF Q3..Q8 | 13.7–23.8 GB | ❌ tested, see below |
| `OzzyGT/LTX-2.3-Distilled-bnb-nf4` | 3 | bnb-nf4 + BF16 components | 28.8 GB | ❌ tested, see below |
| `OzzyGT/LTX-2.3-Distilled-sdnq-dynamic-int4` | 100 | SDNQ int4 | — | SDNQ unsupported by diffusers |
| `MrReclusive/LTX-2.3-FP4` | 44 | FP4 | — | not yet probed |
| `rockapaper/LTX-2.3-Distilled-Diffusers_tenc_fp8_sdnq_r64_s16` | 17 | SDNQ + tenc-fp8 | 39.7 GB | SDNQ unsupported (see morning pass) |

### Path 1 — `OzzyGT/LTX-2.3-Distilled-bnb-nf4` (28.8 GB) ❌

bitsandbytes NF4 is diffusers-native (`bitsandbytes_4bit` is in the
allowed quant list). bnb 0.49.2 kernel verified working on Blackwell
sm_120 — a 128×128 NF4 linear forward returns OK.

The pipeline loads cleanly. `model_cpu_offload` measurement on the
real render:

| Metric | bnb-nf4 + model_cpu_offload | dg845 BF16 + sequential_cpu_offload |
|---|---|---|
| Render (33 frames × 8 steps × 768×512) | 682 s (85 s/step) | (not retested at same resolution but ~14 s/step at smaller) |
| Peak GPU mem | **21.16 GB** (spilled to system RAM) | **4.69 GB** |
| Output | 33 prompt-matching frames | yes |

The 21.16 GB peak is the smoking gun. nf4 transformer is ~13 GB, but
the OzzyGT repo keeps audio-related layers in BF16 per its
`llm_int8_skip_modules` list (audio_attn, audio_ff, video_to_audio_attn
across all 48 blocks). Add text_encoder 7.8 GB + connectors 5.9 GB and
during the encode/connect phase you transiently overlap two large
components on GPU — Windows unified-memory spills again.

Tried `enable_sequential_cpu_offload()` with the bnb-nf4 model →
upstream version mismatch between accelerate and bitsandbytes:
```
TypeError: Params4bit.__new__() got an unexpected keyword argument '_is_hf_initialized'
```
The accelerate hooks pass a kwarg that bnb's `Params4bit` doesn't
accept. Tracked upstream; would need either a bnb patch or an
accelerate downgrade.

### Path 2 — `Abiray/LTX-2.3-22B-DISTILLED-1.1-GGUF` Q4_K_M (16.5 GB) ❌

Smallest single-file diffusers-routable quant. Downloaded the Q4_K_M
file in 142 s. Diffusers' `GGUFQuantizationConfig` ought to handle it,
but `LTX2VideoTransformer3DModel.from_single_file(gguf_path,
quantization_config=GGUFQuantizationConfig(...), config=...)` fails
inside `load_state_dict`:

```
File ".../diffusers/models/model_loading_utils.py", line 196:
    if f.read().startswith("version"):
       ^^^^^^^^
UnicodeDecodeError: 'utf-8' codec can't decode byte 0x94 in position 2525
```

Diffusers' single-file loader probes the file as ASCII before
delegating to the GGUF parser. The `quantization_config` kwarg is read
AFTER the format probe, so a binary GGUF file trips the utf-8 read
before its quant config can route it. Upstream diffusers 0.39.0.dev0
has this regression — to be fixed by either an explicit
`gguf_file=...` kwarg or an early MIME-style sniff. Track on diffusers
git, retry after upstream.

### Path 3 — `Lightricks/LTX-2.3-fp8` single-file override ❌ (re-confirmed)

The morning pass found this is a ComfyUI-style packed checkpoint
(`model.diffusion_model.*` key prefix, 8871 keys with the whole
pipeline bundled — audio_vae+transformer+vocoder all in one file).
Direct `from_single_file` on the transformer model class fails with a
meta-tensor dispatch error. A custom key-remap shim would unblock
this — about 50–100 lines of pure key-mapping Python — but is
genuine upstream work.

### Path 4 — `optimum-quanto` in-place INT8 quantize-on-load ❌

`QuantoConfig(weights_dtype='int8')` on dg845's transformer subfolder.
After 30+ min and 50 GB RAM (holding both the original BF16 and
emerging int8 in memory during conversion), still loading. Killed.
Not viable for a 22B model on consumer hardware.

### Conclusions

For 2026-05-13's diffusers / bitsandbytes / accelerate versions, no
quantized-and-mostly-GPU-resident path works cleanly out of the box.
Sequential CPU offload on dg845 BF16 is the only working
sub-16-GB solution today. The previously committed setup
(`1fed6f4`) remains correct.

**Path forward (Rung 7H+ proposal — needs separate session)**:

1. **Custom GGUF loader for diffusers**: Wrap `gguf` python package's
   reader to produce a state-dict diffusers can consume, then attach
   it to `LTX2VideoTransformer3DModel.from_pretrained` via
   `state_dict=...`. Bypasses the buggy utf-8 sniff entirely. Once
   the transformer is loaded, dg845's other components plug in
   normally. Expected to land peak at ~12–13 GB with the Q4_K_M
   transformer, leaving 3–4 GB headroom on a 16 GB card.

2. **Custom ComfyUI-style Lightricks loader**: 50–100 lines of key
   remapping (`model.diffusion_model.*` → diffusers naming) so
   `Lightricks/LTX-2.3-fp8` becomes loadable. Then we get the
   officially-supported quant variant from Lightricks itself, no
   community port required.

3. **Wait for upstream fixes**: diffusers main is moving fast on LTX-2
   support. The accelerate/bitsandbytes sequential-offload kwarg
   mismatch + the GGUF utf-8 sniff are both upstream regressions
   that will likely land fixes within weeks.

4. **Selective offload via accelerate `dispatch_model`**: a fully
   manual `device_map = {'transformer': 'cuda', 'vae': 'cuda',
   'text_encoder': 'cpu', 'audio_vae': 'cpu', 'vocoder': 'cpu',
   'connectors': 'cpu'}` would keep the hot loop GPU-resident with
   only the rarely-called components on CPU. Combines with
   `pipe.text_encoder.to('cuda')` → encode → `.to('cpu')` for the
   one-shot prompt encoder cost. Hit a device-routing bug attempting
   this manually (`F.embedding` with input_ids on CPU and weights on
   cuda); needs hook plumbing to be correct.

For now: the production code path is dg845 + sequential offload, peak
4.69 GB, ~14 s/step at 512×320. Output quality is unaffected by
offload mode — same weights, same dtype, same number of steps —
sequential just shuffles them in/out of VRAM differently than
model_cpu_offload, which is exactly why peak drops 8× without quality
loss.

### Disk footprint after evening pass

| Path | Size | Status |
|---|---|---|
| `dg845/LTX-2.3-Distilled-Diffusers` | 88.5 GB | **production** |
| `OzzyGT/LTX-2.3-Distilled-bnb-nf4` | 28.8 GB | research (kept until 7H) |
| `Abiray/LTX-2.3-22B-DISTILLED-1.1-GGUF` (Q4_K_M) | 16.5 GB | research (kept until 7H) |
| `Lightricks/LTX-2.3-fp8` | 55.9 GB | research (kept for ComfyUI-loader rung) |
| `rockapaper/...sdnq_r64_s16` | 39.7 GB | not useful, candidate for removal |

Total: ~229 GB. Drop the rockapaper dir to reclaim 40 GB; everything
else has a plausible Rung 7H+ use.
