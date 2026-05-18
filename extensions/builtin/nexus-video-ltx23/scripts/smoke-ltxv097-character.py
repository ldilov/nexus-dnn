"""Character 2-scene continuation test — the REAL quality question.

Water is the easy case. This renders a STRUCTURED subject (an anime
character) across a 2-scene continuation and writes frames as PNGs so
they can actually be eyeballed:
  scene1: establish the character (text->video)
  scene2: continuation conditioned on scene1's LAST frame
          (same character, new action)

Judge: (a) is the character well-formed (face/hands/anatomy, not
melted), (b) is scene2_first ~= scene1_last (seamless seam), (c) does
the character identity/style survive into scene2.

Q4_K_M via env override (fits 16 GB with conditioning headroom — Q6
conditioned scene spilled to shared mem). Modest 49 frames / 25 steps
for a fast answer.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_LTXV097_GGUF=<...>/ltxv-13b-0.9.7-dev-Q4_K_M.gguf \
  PYTHONPATH=<ext>/worker/src <venv>/python.exe scripts/smoke-ltxv097-character.py
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


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_char"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    W, H, NF, FPS = 768, 512, 49, 24
    samp = mod._sampling_params({"num_inference_steps": 25})
    print("samp:", samp, "| gguf:",
          os.environ.get("NEXUS_VIDEO_LTX23_LTXV097_GGUF", "(default)"))

    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
    except Exception as e:  # noqa: BLE001
        print(f"FAIL build: {e}")
        traceback.print_exc()
        return 2
    print(f"OK pipeline built {time.perf_counter()-t0:.1f}s")

    neg = ("low quality, worst quality, deformed, distorted, "
           "disfigured, extra limbs, fused fingers, bad anatomy, "
           "mutated hands, blurry")
    scenes = [
        ("anime1", None,
         "anime style, a young woman with long silver hair and bright "
         "blue eyes in a red bomber jacket walks forward through a "
         "rain-soaked neon Tokyo alley at night, hair and jacket sway, "
         "camera slowly tracks with her, flickering neon reflections, "
         "dynamic motion, cel shaded studio anime, sharp lineart"),
        ("anime2", "CONT",
         "anime style, the same silver-haired woman in the red bomber "
         "jacket keeps walking then turns her head toward the camera "
         "and smiles, same rain-soaked neon Tokyo alley, camera keeps "
         "tracking, fluid continuous motion, same cel shaded style"),
    ]
    last = None
    for name, mode, prompt in scenes:
        cond = last if mode == "CONT" else None
        t1 = time.perf_counter()
        try:
            frames = mod._generate_segment(
                pipe, cond, prompt, neg, W, H, NF, 7, samp, None
            )
        except Exception as e:  # noqa: BLE001
            print(f"FAIL generate {name}: {e}")
            traceback.print_exc()
            return 2
        fl = list(frames)
        peak = torch.cuda.max_memory_allocated() / 1024**3
        mp4 = outdir / f"{name}.mp4"
        mod._write_frames_as_mp4(fl, mp4, base_fps=FPS)
        for tag, ix in {"first": 0, "mid": len(fl) // 2,
                        "last": len(fl) - 1}.items():
            fl[ix].save(outdir / f"{name}_{tag}.png")
        import numpy as np
        a = np.asarray(fl[0].convert("L"), np.float32) / 255.0
        b = np.asarray(fl[-1].convert("L"), np.float32) / 255.0
        motion = float(np.mean(np.abs(a - b)))
        # VIDEO TAIL (not a single still) → next scene's condition.
        tail_n = max(1, min(samp["condition_tail_frames"], len(fl)))
        last = fl[-tail_n:]
        print(f"{name}: {len(fl)}f {time.perf_counter()-t1:.0f}s "
              f"peak={peak:.2f}GiB motion(first..last)={motion:.4f} "
              f"{'STATIC' if motion < 0.02 else 'MOVES' if motion > 0.05 else 'slight'}"
              f" tail={tail_n} -> {mp4}")
        import gc
        del frames, fl
        gc.collect()
        torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()

    try:
        from ltx_video_worker.ffmpeg_io import stitch_segments
        stitch_segments([outdir / "anime1.mp4", outdir / "anime2.mp4"],
                        outdir / "anime_continuation.mp4")
    except Exception as e:  # noqa: BLE001
        print("stitch note:", e)
    print(f"FRAMES IN: {outdir}  (inspect anime1_*.png, anime2_*.png)")
    print("CHAR_TEST_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
