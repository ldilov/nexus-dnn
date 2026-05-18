"""Stage-B smoke: REAL 2-scene continuation, coherence-checked.

Drives the shipped `pipeline_ltxv097` functions end-to-end with the
corrected recipe (0.9.7-dev base, LTXConditionPipeline, decode params,
baseline 30 steps):

  scene 1: text->video (768x512, 97 frames)
  scene 2: continuation conditioned on scene 1's LAST frame
           (conditions=[LTXVideoCondition(image=last, frame_index=0)])

Then it does NOT just trust "valid mp4" — it extracts first/mid/last
frames of each scene, writes them as PNGs for eyeballing, AND computes
a cheap noise heuristic (per-frame spatial smoothness): pure-noise
frames have near-zero neighbour correlation; real content does not.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-render.py
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


def _noise_score(frame) -> float:
    """Mean abs horizontal-neighbour delta, normalised 0..1. Pure noise
    ~> 0.3-0.5; coherent imagery ~> < 0.08 (lots of smooth regions)."""
    import numpy as np

    a = np.asarray(frame.convert("L"), dtype=np.float32) / 255.0
    return float(np.mean(np.abs(a[:, 1:] - a[:, :-1])))


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_smoke"
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

    W, H, NF, FPS = 768, 512, 97, 24  # native res, 8k+1 frames, ~4s
    samp = mod._sampling_params({})   # documented baseline (30 steps…)
    print("baseline samp:", samp)

    torch.cuda.reset_peak_memory_stats()
    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _build_ltxv097_pipeline: {e}")
        traceback.print_exc()
        return 2
    print(f"OK pipeline built {time.perf_counter()-t0:.1f}s")

    scenes = [
        ("scene1", None,
         "a calm ocean horizon at sunrise, gentle rolling waves, "
         "warm golden light, cinematic, photorealistic"),
        ("scene2", "CONT",
         "the same ocean, the sun now higher and brighter, a lone "
         "sailboat drifting into view from the right, cinematic"),
    ]
    neg = "low quality, worst quality, deformed, blurry, jittery, noise"
    last_frame = None
    verdicts = []
    for name, mode, prompt in scenes:
        cond_img = last_frame if mode == "CONT" else None
        t1 = time.perf_counter()
        try:
            frames = mod._generate_segment(
                pipe, cond_img, prompt, neg, W, H, NF, 1234, samp, None
            )
        except Exception as e:  # noqa: BLE001
            print(f"FAIL _generate_segment {name}: {e}")
            traceback.print_exc()
            return 2
        flist = list(frames)
        peak = torch.cuda.max_memory_allocated() / 1024**3
        mp4 = outdir / f"{name}.mp4"
        mod._write_frames_as_mp4(flist, mp4, base_fps=FPS)
        # sample frames + noise heuristic
        idxs = {"first": 0, "mid": len(flist) // 2, "last": len(flist) - 1}
        scores = {}
        for tag, ix in idxs.items():
            flist[ix].save(outdir / f"{name}_{tag}.png")
            scores[tag] = round(_noise_score(flist[ix]), 4)
        mean_ns = sum(scores.values()) / len(scores)
        coherent = mean_ns < 0.12  # noise ~>0.3; content ~<0.08
        verdicts.append(coherent)
        last_frame = flist[-1]
        print(f"{name}: {len(flist)}f {time.perf_counter()-t1:.0f}s "
              f"peak={peak:.2f}GiB noise={scores} -> "
              f"{'COHERENT' if coherent else 'LOOKS LIKE NOISE'}  "
              f"mp4={mp4} ({mp4.stat().st_size}B)")
        # Aggressive inter-scene VRAM free before the conditioned
        # scene 2 (drop this scene's GPU-derived tensors, reset the
        # allocator peak so each scene's peak is reported in isolation).
        import gc
        del frames, flist
        gc.collect()
        torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()

    # stitch the two scenes
    final = outdir / "continuation.mp4"
    try:
        mod._write_frames_as_mp4  # noqa: B018 (presence check)
        from ltx_video_worker.ffmpeg_io import stitch_segments
        stitch_segments(
            [outdir / "scene1.mp4", outdir / "scene2.mp4"], final
        )
        print(f"stitched 2-scene continuation -> {final} "
              f"({final.stat().st_size}B)")
    except Exception as e:  # noqa: BLE001
        print(f"stitch note: {e}")

    ok = all(verdicts)
    print(f"FRAMES SAVED IN: {outdir}  (inspect *_first/mid/last.png)")
    print("STAGE_B_RESULT:", "PASS (both scenes coherent)" if ok
          else "FAIL (output still looks like noise — recipe not fixed)")
    return 0 if ok else 2


if __name__ == "__main__":
    sys.exit(main())
