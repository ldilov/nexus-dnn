"""Seam A/B — renders ONE 2-scene continuation, then treats the
scene-2/scene-1 boundary three ways so the results can be eyeballed:

  none          — current hard ffmpeg concat (baseline seam)
  overlap_blend  — trim re-rendered overlap + Reinhard colour match +
                   linear bridge (default; no model)
  film          — same, but FILM motion-aware bridge (Apache-2.0;
                   needs NEXUS_VIDEO_LTX23_FILM_MODEL or it falls back
                   to the linear bridge and says so)

Each variant writes a stitched mp4 + the boundary frames
(prev_last / bridge* / cur_first) as PNG. Decide "higher quality" by
LOOKING at the boundary PNGs, not a metric.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_LTXV097_GGUF=<...>/ltxv-13b-0.9.7-dev-Q4_K_M.gguf \
  PYTHONPATH=<ext>/worker/src <venv>/python.exe scripts/smoke-ltxv097-seam.py
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
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_seam"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker import seam as seam_mod  # type: ignore
        from ltx_video_worker.ffmpeg_io import stitch_segments  # type: ignore
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

    neg = ("low quality, worst quality, deformed, distorted, "
           "bad anatomy, blurry")
    p1 = ("a weathered fisherman in a yellow raincoat hauls a net on a "
          "rocking wooden boat at dawn, camera tracks the boat, choppy "
          "grey sea, wind-driven spray, cinematic, sharp detail")
    p2 = ("the same fisherman in the yellow raincoat ties off the net "
          "and turns to look at the horizon, same rocking boat and grey "
          "sea, camera keeps tracking, continuous motion, same look")

    try:
        s1 = list(mod._generate_segment(pipe, None, p1, neg, W, H, NF, 7, samp, None))
        tail_n = max(1, min(samp["condition_tail_frames"], len(s1)))
        prev_tail = s1[-tail_n:]
        s2 = list(mod._generate_segment(pipe, prev_tail, p2, neg, W, H, NF, 7, samp, None))
    except Exception as e:  # noqa: BLE001
        print(f"FAIL generate: {e}")
        traceback.print_exc()
        return 2
    peak = torch.cuda.max_memory_allocated() / 1024**3
    print(f"rendered s1={len(s1)}f s2={len(s2)}f peak={peak:.2f}GiB "
          f"tail={tail_n}")

    s1_mp4 = outdir / "scene1.mp4"
    mod._write_frames_as_mp4(s1, s1_mp4, base_fps=FPS)
    s1[-1].save(outdir / "prev_last.png")
    s2[0].save(outdir / "raw_cur_first.png")

    for method in ("none", "overlap_blend", "film", "rife"):
        params = seam_mod.seam_params({"interpolation": method}, None)
        treated = seam_mod.apply_seam(prev_tail, list(s2), params, _Log())
        tag = method
        s2_mp4 = outdir / f"scene2_{tag}.mp4"
        mod._write_frames_as_mp4(treated, s2_mp4, base_fps=FPS)
        treated[0].save(outdir / f"{tag}_cur_first.png")
        mid = len(treated) // 8 or 1
        for i in range(min(mid, 6)):
            treated[i].save(outdir / f"{tag}_t{i:02d}.png")
        stitched = outdir / f"continuation_{tag}.mp4"
        try:
            stitch_segments([s1_mp4, s2_mp4], stitched)
        except Exception as e:  # noqa: BLE001
            print(f"  stitch {tag} note: {e}")
        print(f"{tag}: in={len(s2)}f out={len(treated)}f -> {stitched.name}")

    print(f"FRAMES IN: {outdir}")
    print("  compare prev_last.png  vs  {none,overlap_blend,film}_cur_first.png")
    print("SEAM_AB_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
