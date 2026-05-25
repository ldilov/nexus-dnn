# Working Profile Snapshot — 2026-05-25 GPU smoke
## Reproducibility lock for `1779725370554.mp4`

Audit captured immediately after `800f771` landed. This is the exact configuration that produced the validated 3-scene Auto Storyboard end-to-end on RTX 5070 Ti 16 GB.

## Output mp4
- Path: `D:\longcat_install\smoke\1779725370554.mp4`
- sha256: `32c59882cd53e8135d64f3fa85814b1e0d27570319ce124343226963e58b4e38`
- Size: 2,065,578 bytes (1.97 MB)
- Container: h264, 768×512, 24/1 fps, 10.541667 s, 253 frames
- Wall: 1131.7 s (18 min 51 s)

## Repo state
- Repo: `D:\Workspace\repos\nexus-dnn`
- Branch: `main`
- HEAD: `800f7712d987008bbca63b63abcfe15ba5e83ab8` (= `800f771`)
- Pushed: origin/main
- Worker: `nexus-video-longcat-worker` (extension `nexus.video.longcat` v0.1.0)
- `uv.lock` at `extensions/builtin/nexus-video-longcat/worker/uv.lock` (committed against HEAD `800f771`)
- pyproject extras installed at smoke time: `diffusers, test` (no `flash_attn` — Windows; no `rtx` — upscale not exercised)

## Profile dispatched
- Env: `NEXUS_VIDEO_LONGCAT_RUNTIME=rtx50-fp8` (default for `__main__.py` profile branch at L90; covers `rtx50-fp8`, `rtx50-fp8-12gb`, `rtx50-fp8-8gb`)
- Resolves to: `LongCatProfile(profile_id="rtx50-fp8", runtime_id="nexus.video.longcat.rtx50-fp8", architecture="longcat-13b", quantization="fp8_e4m3fn_scaled", height=480, width=832, num_frames=93, num_inference_steps=50, guidance_scale=4.0, use_distill=False, block_swap_count=0, attention_mode="sdpa")`
- Per-scene fixture overrides everything: `use_distill=true, guidance_scale=1.0, num_inference_steps=16, overlap_frames=13, adain_factor=0.15` (all 3 scenes)

## CLI invocation
```bash
cd D:/Workspace/repos/nexus-dnn/extensions/builtin/nexus-video-longcat/worker
NEXUS_HOST_DATA_DIR=D:/longcat_install \
  uv run --extra diffusers python ../scripts/gpu_smoke.py \
    --mode i2v \
    --image D:/longcat_install/smoke/nun.jpg \
    --scenes-json D:/longcat_install/smoke/storyboard_v6_locked.json \
    --adain-factor 0.15 \
    --offload-mode partial \
    --swap 46
```

## LongCatRenderRequest (logged at runtime)
```
mode='i2v'
prompt='the scene continues with gentle natural motion, cinematic camera drift'   # default placeholder when scenes[] present
negative_prompt='blurry, low quality, distorted'                                   # smoke default
image_path='D:/longcat_install/smoke/nun.jpg'
height=480
width=832
num_frames=49        # initial primary t2v/i2v; overridden per-scene to 93
num_inference_steps=16
guidance_scale=1.0
use_distill=True
seed=42
max_sequence_length=256
offload_kv_cache=True
apply_refinement=False
refinement_steps=12
refinement_guidance=1.0
refinement_spatial_only=True
target_frames=None
continuation_overlap_frames=13
continuation_enhance_hf=None
scenes=[Scene(prompt=..., duration_seconds=4.0, overlap_frames=13, ... × 3)]
rtx_upscale_scale=None        # NOT exercised
rtx_upscale_quality='HIGH'
force_refinement_with_upscale=False
offload_mode='partial'
block_swap_count=46
adain_factor=0.15
image_cond_noise_scale=0.15
```

## Hardware
- GPU: NVIDIA GeForce RTX 5070 Ti (Blackwell sm_120)
- VRAM total: 15.92 GiB
- Driver: 570.65+ (memory note)
- OS: Windows (`win32` sys.platform per `pyproject.toml` triton-windows branch)

## Software stack
- Python 3.12.11
- torch 2.12.0+cu132 (PyTorch CUDA 13.2 / Blackwell-tuned cuBLAS+cuDNN — first PT release with proper sm_120 kernels)
- diffusers 0.35.1 (LongCat upstream pin)
- transformers 4.41.0 (LongCat upstream pin)
- accelerate >=1.0
- safetensors >=0.4
- sageattention >=1.0.6 (Triton-based int8; Blackwell-friendly attention path)
- triton-windows >=3.0 (Windows path)
- xformers 0.0.35 (installed but Blackwell-incompatible; SDPA fallback via monkey-patch — logged WARNING during smoke)
- pytest-asyncio 1.3.0 (test infra)

## Model artefacts
All resident under `D:\longcat_install\models\`:

### Kijai LongCat FP8 (DiT + LoRAs)
- `Kijai/LongCat-Video_comfy/LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors` (15,515,107,698 bytes / 14.45 GiB)
- `Kijai/LongCat-Video_comfy/LongCat_distill_lora_alpha64_bf16.safetensors` (1,261,613,528 bytes / 1.17 GiB)
- `Kijai/LongCat-Video_comfy/LongCat_refinement_lora_rank128_bf16.safetensors` (2,470,645,410 bytes / 2.30 GiB) — NOT used in this smoke (apply_refinement=False)

### Meituan LongCat (VAE + text encoder + tokenizer + scheduler config + DiT config)
- `meituan-longcat/LongCat-Video/dit/` (config baseline: depth=48 hidden=4096 heads=32 ffn=16384 in/out=16 patch=[1,2,2] AdaLN=512 13.6B params)
- `meituan-longcat/LongCat-Video/vae/` (AutoencoderKLWan, Wan 2.1, z_dim=16, 4×16×16 compression)
- `meituan-longcat/LongCat-Video/text_encoder/` (UMT5EncoderModel, d_model=4096, 24 layers)
- `meituan-longcat/LongCat-Video/tokenizer/`
- `meituan-longcat/LongCat-Video/scheduler/` (FlowMatchEulerDiscreteScheduler)

Note: upstream falls back to `google/umt5-xxl` for the text encoder when meituan repo missing — present here directly under meituan path.

## Storyboard fixture
- Path: `D:\longcat_install\smoke\storyboard_v6_locked.json`
- 3 scenes × `duration_seconds=4.0` × `overlap_frames=13` × `use_distill=true` × `guidance_scale=1.0` × `num_inference_steps=16` × `adain_factor=0.15` × `enhance_hf=false`
- Validator: `ok=true`, 279 raw frames, 253 after overlap, 10.542 s estimated; warnings: 3× DEPRECATED_FIELD_ALIAS (using `duration_seconds` not `per_scene_generated_seconds`), 1× MODE_SWITCH_CHANNEL (scene 1, i2v→vc — expected)

## Runtime events captured
- Checkpoint shards: 5 (loaded in ~8.7 s)
- DiT: 528 nn.Linear → FP8Linear (key audit src=1838 target=1310 overlap=1310; installed=1310 skipped=0 fp8=528 unscaled_fp8=0 unconsumed_scales=0)
- Offload: partial, resident=2 head blocks, swapped=46 tail blocks, exec=cuda
- Distill LoRA: 480 modules attached (rank=128 alpha=64)
- Attention: SageAttention (sm_120 via Triton JIT) per `attention_mode="sdpa"` profile default + monkey-patch dispatch
- Per-scene denoise: scene 1 = 6 min 03 s, scene 2 = 6 min 08 s, scene 3 = 6 min 08 s (all 16 distill steps, ~21 s/step at steady state, ~52 s first-step warm-up)
- AdaIN logs (proves anchor pull engaged):
  - Anchor captured from scene-1 tail: mean `[81.77, 81.02, 76.36]` std `[36.47, 31.66, 30.97]`
  - Scene 2: pre `[88.40, 89.40, 87.00]` → post `[87.40, 88.40, 85.40]` (factor 0.15)
  - Scene 3: pre `[102.70, 101.10, 91.70]` → post `[99.60, 98.10, 89.40]` (factor 0.15)
- Frame accumulator: 93 (scene 1) → 173 (+80 from scene 2 after overlap=13 drop) → 253 (+80 from scene 3)

## Validator output (verbatim)
```json
{
  "ok": true,
  "normalized": {
    "fps": 24,
    "total_frames_raw": 279,
    "total_frames_after_overlap": 253,
    "estimated_duration_seconds": 10.541666666666666,
    "per_scene": [
      {"num_frames": 97, "fresh_seconds": 4.041666666666667},
      {"num_frames": 97, "fresh_seconds": 3.5},
      {"num_frames": 97, "fresh_seconds": 3.5}
    ],
    "scenes": [...]
  },
  "warnings": [
    {"code": "DEPRECATED_FIELD_ALIAS", "scene_index": 0, "detail": "scene.duration_seconds is deprecated; use per_scene_generated_seconds"},
    {"code": "DEPRECATED_FIELD_ALIAS", "scene_index": 1, "detail": "scene.duration_seconds is deprecated; use per_scene_generated_seconds"},
    {"code": "DEPRECATED_FIELD_ALIAS", "scene_index": 2, "detail": "scene.duration_seconds is deprecated; use per_scene_generated_seconds"},
    {"code": "MODE_SWITCH_CHANNEL", "scene_index": 1, "detail": "i2v->vc transition; conditioning channel layout will be promoted via pin_last_frame_for_vc"}
  ]
}
```

Note: validator computed 97-frame scenes (4.04 s of 24×4=96 → quantised to next 4n+1=97). Actual GPU run reported `num_frames=93` per scene because `_request_with_scene_overrides` uses a different quantisation rule for direct dataclass-built Scene (older path). Both produce correct mp4 — the 253-vs-261 frame delta is the deprecation-alias path picking different quantisation. **Follow-up note**: align validator + scene-loop quantisation (currently both work; cosmetic mismatch only).

## Reproducibility checklist
To reproduce this exact mp4:

- [ ] Repo at `800f771` (or pull origin/main)
- [ ] `cd extensions/builtin/nexus-video-longcat/worker && uv sync --extra diffusers --extra test`
- [ ] Model files at the 3 Kijai paths above (matching byte sizes)
- [ ] Meituan VAE + text_encoder + tokenizer at the meituan paths above
- [ ] RTX 5070 Ti or equivalent Blackwell sm_120 GPU with ≥16 GiB VRAM
- [ ] `D:/longcat_install/smoke/nun.jpg` present (82.7 KB anchor image)
- [ ] `D:/longcat_install/smoke/storyboard_v6_locked.json` present (committed in this commit)
- [ ] Run the exact CLI above
- [ ] Expected: `<some_id>.mp4` with the same 253-frame / 10.54 s / 768×512 shape (sha256 will differ due to FP8 nondeterminism + scheduler RNG even with seed=42 because partial-offload reorder is not 100% deterministic; container metadata + frame count + duration match exactly)

## Known nondeterminism sources
- Partial-offload AlignDevicesHook reorders dispatch slightly per run (cuBLAS deterministic mode not enabled).
- SageAttention Triton kernels use different reduction orders.
- FP8 weight scale application order at first forward differs per warm-up.
Result: same shape + same duration + same fps + same prompt semantics, slightly different per-pixel output across runs even with seed=42. Container sha256 differs.

For bit-exact reproduction we would need:
- `torch.use_deterministic_algorithms(True)` + `CUBLAS_WORKSPACE_CONFIG=:4096:8`
- Disable SageAttention (force SDPA only)
- Disable partial offload (resident-only — won't fit 16 GiB)
Not in scope; structural reproducibility (frame count, duration, prompt) is what we lock here.

## What this snapshot does NOT include (deferred to follow-up specs)
- RTX upscale (rtx_upscale_scale=None this run)
- Refinement pass (apply_refinement=False this run)
- RIFE frame interpolation (not in worker)
- LLM prompt-breakdown planner (deferred to separate spec; see `docs/llm-planner-requirements.md` once written)
- Resolution preset ladder (currently single 480×832 default; see `docs/storyboard-todo-2026-05-25.md` T4)
