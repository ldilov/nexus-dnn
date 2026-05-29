# svi2-pro — Session Checkpoint (2026-05-30)

**Branch:** `main` (worktree `.claude/worktrees/nostalgic-cohen-42c496`). **17 commits ahead of origin/main, UNPUSHED.**
**Status:** Full SVI 2.0 Pro i2v worker BUILT + loads correctly on GPU. **BLOCKER: VRAM piles up across the denoise loop → OOM-kill mid-render on 16 GB.** A real render has never completed.

---

## What works (verified on the RTX 5070 Ti, 16 GB)
- Extension `nexus.video.svi2-pro` complete: manifest, Model Foundry (`backends/rtx50-fp8/versions.yaml`), installer, fake + rtx50-fp8 profiles, fp8 loader, runtime LoRA, expert router, SVI cross-clip chain, vendored Wan2.2 DiT + Wan VAE + UMT5, pipeline wiring, block-swap, GPU smoke + spike scripts. 69 offline tests green.
- **Weights downloaded** at `D:\svi2_models\` (43 GB, all 7 artifacts present + correct).
- **fp8 key overlap 100%** + **SVI LoRA hit-rate 100%** (spike verified, after `has_image_input=False`).
- Models load clean, no OOM at load (meta-device fix killed the 56 GB dense-fp32 alloc).
- Render reaches the denoise loop + runs (last run 242 s before dying).

## Ref images
`D:\longcat_install\inputs\nun_possession.jpg.jpg` (ref / first frame), `nun_aftermath.jpg.jpg`. Prompts: `extensions/builtin/svi2-pro/data/demonic_nun_prompts.txt` (4-clip possession escalation).

## Run command (operator)
```
cd extensions/builtin/svi2-pro/worker
PYTHONPATH=src .venv/Scripts/python.exe ../scripts/gpu_smoke.py \
  --models-dir D:/svi2_models --ref-image "D:/longcat_install/inputs/nun_possession.jpg.jpg" \
  --num-clips 4 --output D:/longcat_install/svi2_nun.mp4
```
(use the venv python directly, NOT `uv run` — it re-syncs + strips torch. Spike: `../scripts/spike_fp8_audit.py --models-dir D:/svi2_models --blocks-to-swap N`.)

---

## THE BLOCKER: VRAM creeps up over the render → OOM-kill
Symptom: GPU VRAM climbs across denoise steps/clips, spills to shared, then the worker process is OOM-killed (no error line — stdout just closes; smoke reports "output mp4 missing"). Behavior persisted through every mitigation below.

### Bugs already fixed this session (commit order)
1. `af0491a` HF-subpath model resolution + LoRA PEFT `.default` adapter key parsing.
2. `has_image_input=False` (Wan2.2 A14B has NO CLIP image cross-attn) → fp8 overlap 84%→100%.
3. `1c1487d` meta-device fp8 load → no 56 GB dense fp32 alloc (fixed load-time RAM OOM).
4. `345b1f1`/`5cda24a` Kijai-style block-swap, default **40** (all blocks streamed, ~1 resident).
5. `ef5fc1e` Wan**2.1** VAE (16-ch latent) not Wan2.2 VAE (48-ch).
6. `0791bd7`/`6da51a3` VAE+T5+latent all bf16 on device (fixed cpu/cuda + Float/BFloat16 mismatches).
7. `1e2eda6` tiled VAE encode/decode.
8. `d5946da` `no_grad` + `requires_grad_(False)` on DiT/VAE/T5 + `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True`.

**None stopped the creep.** block-swap 20/36/40 all eventually spill/OOM.

### KEY INSIGHT — the reference proves 16 GB is enough
`https://github.com/wallen0322/ComfyUI-Wan22FMLF` → `example_workflows/SVI pro.json` generates **340 s** SVI Pro video on 16 GB. Its config:
- **Native ComfyUI** UNETLoader (`fp8_e4m3fn_scaled`), **NO explicit block_swap** — relies on ComfyUI's automatic model offload between nodes.
- **LightX2V 4-step distill** model (`..._lightx2v_4step_...`) + **6 sampler steps**, euler/simple. (We use the raw SVI LoRA + **50 steps**.)
- 480×832, 81 frames/window, overlap 4, 3 cascaded `WanAdvancedI2V` SVI-mode nodes.

So the algorithm fits flat. **Our hand-rolled loop leaks.** We do 50 steps × 4 clips × 2 (CFG) ≈ 400 forwards, each streaming 40 blocks — huge surface for fragmentation/leak.

---

## UPDATE 2026-05-30 (session 2) — root-caused + targeted fix shipped (UNVERIFIED on GPU)

**Two parallel subagents (our code + Wan2GP/`mmgp` reference) converged on the cause.**

ROOT CAUSE — allocator fragmentation in the block-swap forward (`wan22/dit.py:428-455`):
- `blocks_to_swap=40 == num_layers=40` → **all 40 blocks** stream CPU→GPU→CPU on **every** forward (~400 forwards = ~16k swaps each way).
- Offload was `block.to(cpu, non_blocking=True)` and **no `torch.cuda.empty_cache()` anywhere in the forward or the denoise step** → freed segments never returned to the allocator → `reserved` creeps across steps → spills to shared → OOM. Within-clip, not across-clip.
- RULED OUT: attention (flash_attn 2.8.3 IS engaged — no 131k² matrix), autograd (correctly `no_grad`), cross-clip carryover (correctly `.detach()`/CPU PIL). Caveat: silent SDPA fallback if `flash` extra missing = a separate OOM cliff (not current symptom).

WHY Wan2GP fits flat in 16GB (it runs the SAME models): it hand-rolls nothing — delegates all weight residency to **`mmgp`** (`offload.profile(pipe, profile=LowRAM_LowVRAM)`), streaming blocks through **reusable pinned-memory staging buffers + async prefetch**; forces sage/flash attention; int8/fp8 weights; tiled+temporal-chunked VAE decode; `gc.collect()+empty_cache()` at every boundary; default **4-step + guidance=1.0** distill preset (1 forward/step).

FIX SHIPPED (targeted, low-risk — "swap fix first" path chosen):
- `dit.py:295` `use_non_blocking = False` → D2H offload synchronous, GPU frees deterministically before next block's H2D.
- `pipeline_svi2.py` `_denoise_clip`: `del noise_pred*` + `torch.cuda.empty_cache()` after **every** denoise step (matches Wan2GP boundary discipline) — returns churned segments, stops the `reserved` creep.
- Instrumentation: `vram.py` `snapshot()` + env-gated `log_vram()`; per-step + per-clip traces wired. **Gate: `SVI2_VRAM_TRACE=1`.**
- Tests: 68/69 worker pytest pass; the 1 failure (`test_run_render_end_to_end_with_fakes`, bf16-vs-fp32 dtype) is **pre-existing** (fails on clean HEAD), unrelated, flagged for separate fix.

OPERATOR — run on the RTX 5070 Ti and read the trace:
```
cd extensions/builtin/svi2-pro/worker
SVI2_VRAM_TRACE=1 PYTHONPATH=src .venv/Scripts/python.exe ../scripts/gpu_smoke.py \
  --models-dir D:/svi2_models --ref-image "D:/longcat_install/inputs/nun_possession.jpg.jpg" \
  --num-clips 4 --output D:/longcat_install/svi2_nun.mp4 2>&1 | tee svi2_vram_trace.log
```
READ: `[vram] clip step N` lines. If `reserved` now stays ~flat across steps → fragmentation fixed (render should complete). If `reserved` still climbs step-over-step → fragmentation persists → escalate to **mmgp adoption** or the **LightX2V 4-step distill** path (next-highest leverage; both already scoped above).

---

## NEXT SESSION — diagnose then fix (priority order)
1. **Instrument per-step VRAM.** Log `torch.cuda.memory_allocated()/reserved()` every denoise step + per clip in `_run_render`/`_denoise_clip`. Determine: does it climb WITHIN one clip (per-step leak/fragmentation) or only ACROSS clips (per-clip leak)? This pinpoints the cause — do this FIRST.
2. **Verify flash_attn is actually engaged on the real forward.** Seq len = f·h·w = 21·104·60 = **131,040 tokens** → if attention falls back to SDPA-materialized (not flash), the O(n²) attention matrix alone is tens of GB = instant spill. Confirm `attention_backend.scaled_attention` takes the flash path (q.is_cuda, bf16) in the real DiT forward — add a one-time log. If not flash, that's the whole bug.
3. **Suspect the block-swap `.to()` per step.** Repeated `block.to(cuda)`/`block.to(cpu)` across 400 steps may fragment or fail to free. Consider: keep blocks pinned-memory on CPU, prefetch, and `torch.cuda.empty_cache()` strategically; OR cache the on-GPU block and only swap when tier changes.
4. **Cut the work surface — adopt the reference's distill path:** add the **LightX2V 4-step LoRA** (stack with SVI LoRA) → **6 steps** instead of 50. 8× fewer forwards = 8× less leak/fragmentation surface + 8× faster. This is likely the single highest-leverage change (matches the proven workflow). Kijai `Wan2_1/2_2` lightx2v 4-step LoRAs are on HF.
5. **Lower per-clip cost if still tight:** `frames_per_clip` 81→49, or fall back to native ComfyUI memory management.
6. Decode-time spike: tiled VAE is on; confirm the decode of 81 frames isn't the OOM moment (the instrumentation will show).

## Files / where things live
- Pipeline: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/pipeline_svi2.py` (`_run_render`, `_denoise_clip`, `_build_models`, `_WAN22_A14B_CONFIG`, block-swap default 40).
- DiT + block_swap: `worker/src/svi2_video_worker/wan22/dit.py` (`WanModel.block_swap`, forward streaming loop).
- VAE: `wan22/vae_model.py` + wrapper `vae.py` (tiled, bf16, no_grad). T5: `wan22/text_encoder_model.py` + `text_encoder.py`.
- fp8 loader + meta load: `fp8_loader.py` (`load_expert_meta`, `ScaledFP8Linear`, `bridge_kj_keys`). LoRA: `lora.py`.
- Spike: `scripts/spike_fp8_audit.py` (--blocks-to-swap). Smoke: `scripts/gpu_smoke.py` (NOTE: does NOT expose --blocks-to-swap; uses pipeline default 40).
- Reference workflows: Kijai `ComfyUI-WanVideoWrapper` (block_swap at `wanvideo/modules/model.py:2037`,`:3205`), wallen0322 `ComfyUI-Wan22FMLF` SVI pro.json. SVI repo zip: `C:\Users\lazar\AppData\Local\Temp\svi-research\Stable-Video-Infinity-svi_wan22`.

## Design docs
`docs/research/2026-05-29-svi2-pro-{requirements,design,vendor-trace}.md`, `docs/research/plans/2026-05-29-svi2-pro-plan.md`.
