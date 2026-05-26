# T2 smoke result — refine + RTX upscale 2x
## 2026-05-25 evening

## Outcome
- **PASS** end-to-end
- Output: `D:\longcat_install\smoke\1779731290464.mp4`
- sha256: `5370c6e80cee33cc3acc1ea7b12b14c8fdcd96d97ce522e4864b497f27064e07`

## Container
- h264, 2432×1536, 24/1 fps
- 253 frames, 10.541667 s
- 7,366,199 bytes (7.02 MB)

## Wall time
- 67 min 23 s total (4043 s)
- Breakdown per scene: ~5:48 distill denoise + ~7:10 refinement (12-step at refinement res 1216×768) + LoRA detach/reattach overhead ≈ 13 min/scene
- 3 scenes × 13 min = 39 min compute
- RTX upscale post: 4 s
- Model load + LoRA + checkpoint shards + first-step warmup: ~28 min
- Wall is 3.6× the v6 baseline (1779725370554.mp4) which was 18.9 min

## Resolution pipeline
- i2v auto-bucket from `nun.jpg` aspect: 480×832 request → 768×512 actual at scene-loop entry
- Refinement pass bumps to 1216×768 (refinement-LoRA generate_refine path is res-aware)
- RTX VFX SDK 2x post: 1216×768 → 2432×1536

## AdaIN
- Anchor captured from scene-1 REFINED tail (not draft): mean `[81.49, 80.96, 76.19]` std `[35.82, 31.12, 30.63]`
- Scene 2: pre `[88.0, 89.5, 87.0]` → post `[87.0, 88.5, 85.4]` (factor 0.15)
- Scene 3: pre `[103.6, 102.4, 94.1]` → post `[100.3, 99.1, 91.3]` (factor 0.15)
- Cumulative drift caught and damped at every boundary

## Distill ↔ refinement LoRA hot-swap
Each scene detached distill LoRA to CPU before loading refinement LoRA (rank 128 alpha 128), ran 12-step refine, re-attached distill LoRA to cuda for next scene's draft denoise. Three full swap cycles, no NaN, no OOM.

## VRAM
- 15.92 GiB total
- Partial offload mode + swap=46 (per profile rtx50-fp8 + smoke args)
- No spill warning, no OOM. Memory note from 2026-05-24 said refine at 720p spilled past 16 GiB but our refinement res was 1216×768 (< 720p tier), so spill avoided.

## What changed vs v6 baseline
- Fixture: `storyboard_v6_refined.json` = exact copy of `storyboard_v6_locked.json`. CLI flags drove the delta.
- CLI flags added: `--refine --refine-steps 12 --refine-guidance 3.5 --upscale 2 --upscale-quality HIGH --force-refine-with-upscale`
- `force-refine-with-upscale` opt-in bypasses the "skip refine when upscale on" default safety gate. Memory note warned this can spill at 720p, but our 1216×768 refine res fit within 16 GiB.

## Quality assessment

Pending operator visual inspection. Hypothesis (capture in `docs/quality-delta-v5-vs-v6.md`):

- If T2 (1779731290464.mp4) shows visibly cleaner texture + sharper edges vs v6 baseline (1779725370554.mp4) → refinement-LoRA path is the standard recommendation for production storyboards (at 67 min wall cost).
- If T2 shows mode-collapse / texture-converged-to-shared-look across all 3 scenes → confirms council critic warning C4 (refine converges scenes to shared texture). Mitigation: per-scene refinement-guidance variation.
- If T2 + upscale 2x produces no visible improvement vs v6 + manual upscale separately → fold upscale into a post-mux ffmpeg step, skip the in-pipeline RTX call.

## Recommendation pending visual review

- **If T2 wins on quality**: add a "production" preset to `gpu_smoke.py --quality-preset production` that bundles `--refine --refine-steps 12 --refine-guidance 3.5 --upscale 2 --force-refine-with-upscale`.
- **If T2 is too slow for the gain**: ship `--upscale 2` alone as the standard (T1), refinement stays opt-in.

## Notes for next smoke

- T3 (swap=44) untouched — defer until VRAM headroom matters (refinement+upscale at 720p draft).
- T1 (upscale 2x without refine) untouched — would clarify whether the quality jump in T2 is from refinement or from upscale alone.
- Operator can A/B v6 baseline mp4 vs T2 mp4 side-by-side to assess.

## Reproduce

```bash
cd D:/Workspace/repos/nexus-dnn/extensions/builtin/nexus-video-longcat/worker
NEXUS_HOST_DATA_DIR=D:/longcat_install \
  uv run --extra diffusers --extra rtx python ../scripts/gpu_smoke.py \
    --mode i2v \
    --image D:/longcat_install/smoke/nun.jpg \
    --scenes-json D:/longcat_install/smoke/storyboard_v6_refined.json \
    --adain-factor 0.15 \
    --offload-mode partial --swap 46 \
    --refine --refine-steps 12 --refine-guidance 3.5 \
    --upscale 2 --upscale-quality HIGH \
    --force-refine-with-upscale
```

Repo state at the time: HEAD `6c3f057` on origin/main, worker pytest 218/218 green.
