"""Advanced-motion quality gate — GPU smoke.

Renders a HARD motion scenario (tracking camera + subject locomotion
+ foreground parallax — the case a weak prompt or over-anchored
conditioning collapses into near-static) and runs the motion gate
(ltx_video_worker.motion). Prints every metric + the verdict and
writes frames so the numbers can be eyeballed against the video.

Use the printed values to (re)calibrate the motion.py thresholds on a
verified-good render — they are starting points, not magic constants
(seeded diffusion is still driver/version-variant).

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_LTXV097_GGUF=<...-Q4_K_M.gguf> \
  PYTHONPATH=<ext>/worker/src <venv>/python.exe \
      scripts/smoke-ltxv097-motion-gate.py
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
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_motion_gate"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker.motion import (  # type: ignore
            assess_motion,
            motion_metrics,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    W, H, NF, FPS = 768, 512, 49, 24
    samp = mod._sampling_params({"num_inference_steps": 25})

    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
    except Exception as e:  # noqa: BLE001
        print(f"FAIL build: {e}")
        traceback.print_exc()
        return 2
    print(f"OK pipeline {time.perf_counter()-t0:.1f}s")

    neg = "low quality, worst quality, blurry, deformed, static, frozen"
    # Deliberately motion-dense: lateral tracking camera + subject
    # locomotion + a near foreground element for parallax.
    prompt = (
        "a galloping black horse races left-to-right across an open "
        "prairie, camera tracks alongside at speed, tall grass and a "
        "wooden fence sweep past in the near foreground, dust kicked "
        "up behind the hooves, dynamic continuous motion, cinematic"
    )

    scenarios = [("hard_motion", prompt)]
    overall = 0
    for name, p in scenarios:
        t1 = time.perf_counter()
        try:
            frames = list(
                mod._generate_segment(
                    pipe, None, p, neg, W, H, NF, 7, samp, None
                )
            )
        except Exception as e:  # noqa: BLE001
            print(f"FAIL generate {name}: {e}")
            traceback.print_exc()
            return 2
        peak = torch.cuda.max_memory_allocated() / 1024**3
        m = motion_metrics(frames, with_flow=True)
        v = assess_motion(m)
        mod._write_frames_as_mp4(frames, outdir / f"{name}.mp4", base_fps=FPS)
        for tag, ix in {"first": 0, "mid": len(frames) // 2,
                        "last": len(frames) - 1}.items():
            frames[ix].save(outdir / f"{name}_{tag}.png")
        print(
            f"{name}: {len(frames)}f {time.perf_counter()-t1:.0f}s "
            f"peak={peak:.2f}GiB"
        )
        print(
            f"  metrics: mean_delta={m['mean_delta']:.5f} "
            f"min_delta={m['min_delta']:.5f} max_delta={m['max_delta']:.5f} "
            f"std={m['std_delta']:.5f} frozen_pairs={m['frozen_pairs']} "
            f"flow_mean={m['flow_mean']}"
        )
        print(f"  VERDICT={v['verdict']}  reasons={v['reasons']}")
        if v["verdict"] == "fail":
            overall = 1
        import gc

        del frames
        gc.collect()
        torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()

    print(f"FRAMES IN: {outdir}  (eyeball *_first/mid/last.png vs metrics)")
    print(f"MOTION_GATE_DONE verdict_fail={overall}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
