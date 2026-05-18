"""Controlled motion-tuning experiment for LTX-Video 0.9.7.

Observation: BOTH unconditioned scene 1 AND conditioned scene 2 came
out near-static. Two independent levers:
  (1) base motion  = prompt motion language + guidance_scale
  (2) cont. motion = condition_strength + image_cond_noise_scale

4 generations (Q4, 49f, 20 steps for speed), objective motion metric
= mean |first-last| grayscale delta (static ~<0.02; real motion
~>0.05), plus first/mid/last PNGs to eyeball:

  A scene1  static-ish prompt, guidance 3      (old baseline ref)
  B scene1  motion-rich prompt, guidance 6     (base-motion test)
  C scene2  cond on B.last, strength 1.0, icns 0.025  (old over-anchor)
  D scene2  cond on B.last, strength 0.7, icns 0.15 + motion prompt
            (NEW baseline)
"""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _motion(f0, f1) -> float:
    import numpy as np
    a = np.asarray(f0.convert("L"), np.float32) / 255.0
    b = np.asarray(f1.convert("L"), np.float32) / 255.0
    return float(np.mean(np.abs(a - b)))


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    out = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_motion"
    out.mkdir(parents=True, exist_ok=True)
    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}"); traceback.print_exc(); return 2

    W, H, NF = 768, 512, 49
    STATIC_P = ("anime style, a young woman with long silver hair, blue "
                "eyes, red bomber jacket, standing in a neon Tokyo alley "
                "at night, cel shaded")
    MOTION_P = ("anime style, a young woman with long silver hair and "
                "blue eyes in a red bomber jacket walks forward through "
                "a rain-soaked neon Tokyo alley at night, her hair and "
                "jacket sway, camera slowly tracks with her, flickering "
                "neon reflections, dynamic motion, cel shaded anime")
    CONT_P = ("anime style, the same silver-haired woman in the red "
              "bomber jacket turns her head toward the camera and "
              "smiles, then keeps walking, same neon alley, same style, "
              "fluid motion, cel shaded")
    NEG = ("low quality, worst quality, deformed, distorted, extra "
           "limbs, fused fingers, bad anatomy, blurry, static, still")

    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
    except Exception as e:  # noqa: BLE001
        print(f"FAIL build: {e}"); traceback.print_exc(); return 2
    print(f"OK pipeline {time.perf_counter()-t0:.1f}s")

    import gc

    def gen(tag, prompt, cond, sp_over):
        sp = mod._sampling_params({"num_inference_steps": 20, **sp_over})
        t = time.perf_counter()
        fr = list(mod._generate_segment(
            pipe, cond, prompt, NEG, W, H, NF, 7, sp, None))
        mp4 = out / f"{tag}.mp4"
        mod._write_frames_as_mp4(fr, mp4, base_fps=24)
        for nm, ix in {"first": 0, "mid": len(fr)//2,
                       "last": len(fr)-1}.items():
            fr[ix].save(out / f"{tag}_{nm}.png")
        m = _motion(fr[0], fr[-1])
        last = fr[-1]
        print(f"{tag}: {time.perf_counter()-t:.0f}s motion(first..last)="
              f"{m:.4f}  {'STATIC' if m < 0.02 else 'MOVES' if m > 0.05 else 'slight'}"
              f"  sp={{cs:{sp['condition_strength']},icns:{sp['image_cond_noise_scale']},g:{sp['guidance_scale']}}}")
        del fr
        gc.collect(); torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()
        return last

    try:
        gen("A_s1_static_g3", STATIC_P, None,
            {"guidance_scale": 3.0})
        b_last = gen("B_s1_motion_g6", MOTION_P, None,
                     {"guidance_scale": 6.0})
        gen("C_s2_oldanchor", CONT_P, b_last,
            {"guidance_scale": 3.0, "condition_strength": 1.0,
             "image_cond_noise_scale": 0.025})
        gen("D_s2_newbaseline", CONT_P, b_last,
            {"guidance_scale": 6.0, "condition_strength": 0.7,
             "image_cond_noise_scale": 0.15})
    except Exception as e:  # noqa: BLE001
        print(f"FAIL during matrix: {e}"); traceback.print_exc(); return 2

    print(f"FRAMES IN: {out}")
    print("MOTION_TUNE_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
