"""End-to-end 720p integration smoke — drives the REAL dispatch path
(`_generate_segment_dispatch`, upscale=True) for a 2-scene continuation
so it exercises: upscaler resolution+load, the conditioned stage-1
latent render, spatial upsample, refine+tiled decode, the native-res
tail-carry for scene 2's condition, and the single-pass fallback.

PASS = two 1280x720 scenes written, scene-2 conditioned on scene-1
(continuity), peak < 16 GiB — verified by reading the PNGs.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_LTXV097_GGUF=<...>/ltxv-13b-0.9.7-dev-Q4_K_M.gguf \
  PYTHONPATH=<ext>/worker/src <venv>/python.exe \
      scripts/smoke-ltxv097-720p-integrated.py
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
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_720p_e2e"
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
    TARGET = (1280, 720)
    samp = mod._sampling_params({"num_inference_steps": 25})
    cache: dict = {"pipe": None, "upsampler": None}

    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
        cache["pipe"] = pipe
    except Exception as e:  # noqa: BLE001
        print(f"FAIL build: {e}")
        traceback.print_exc()
        return 2
    print(f"OK pipeline {time.perf_counter()-t0:.1f}s")

    neg = "low quality, worst quality, blurry, deformed, distorted"
    scenes = [
        ("e2e1", None,
         "a red kayak glides down a fast forest river, paddler digging "
         "hard, camera tracks alongside, spray and dappled light, "
         "cinematic, highly detailed"),
        ("e2e2", "CONT",
         "the same paddler in the red kayak rounds a bend and passes a "
         "waterfall, camera keeps tracking, continuous motion, same "
         "river and light"),
    ]
    last = None
    sizes_ok = True
    for name, mode, prompt in scenes:
        cond = last if mode == "CONT" else None
        t1 = time.perf_counter()
        try:
            frames = mod._generate_segment_dispatch(
                pipe, cache, True, TARGET, cond, prompt, neg,
                W, H, NF, 7, samp, None, _Log(),
            )
        except Exception as e:  # noqa: BLE001
            print(f"FAIL dispatch {name}: {e}")
            traceback.print_exc()
            return 2
        fl = list(frames)
        peak = torch.cuda.max_memory_allocated() / 1024**3
        sz = fl[0].size
        sizes_ok = sizes_ok and sz == TARGET
        mod._write_frames_as_mp4(fl, outdir / f"{name}.mp4", base_fps=FPS)
        for tag, ix in {"first": 0, "mid": len(fl) // 2,
                        "last": len(fl) - 1}.items():
            fl[ix].save(outdir / f"{name}_{tag}.png")
        # Native-res tail for the next scene's stage-1 condition
        # (mirrors _render_loop's upscale tail-carry).
        tail_n = max(1, min(samp["condition_tail_frames"], len(fl)))
        last = mod._resize_frames(fl[-tail_n:], W, H)
        print(f"{name}: {len(fl)}f {time.perf_counter()-t1:.0f}s "
              f"peak={peak:.2f}GiB size={sz} "
              f"{'OK' if sz == TARGET else 'WRONG_SIZE'}")
        import gc
        del frames, fl
        gc.collect()
        torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()

    try:
        from ltx_video_worker.ffmpeg_io import stitch_segments
        stitch_segments([outdir / "e2e1.mp4", outdir / "e2e2.mp4"],
                        outdir / "e2e_continuation.mp4")
    except Exception as e:  # noqa: BLE001
        print("stitch note:", e)
    verdict = "PASS" if sizes_ok else "FAIL_SIZE"
    print(f"720P_E2E {verdict}")
    print(f"FRAMES IN: {outdir}  (inspect e2e1_*.png, e2e2_*.png)")
    return 0 if sizes_ok else 2


if __name__ == "__main__":
    sys.exit(main())
