"""Realistic multi-scene viability proof: N scenes x ~S seconds,
continuation-conditioned, seam-treated at every boundary, optional
low-res native -> 720p upscale. Frame PNGs + per-boundary coherence
deltas written so the verdict is read by eye, never a heuristic alone.

The load-bearing question: does realistic multi-scene LTX continuation
stay coherent at realistic length, and does the low-res->720p path
hold? Seam = overlap_blend by default (proven, no model). If a FILM
TorchScript is staged (NEXUS_VIDEO_LTX23_FILM_MODEL or the convention
path) set NEXUS_MSV_SEAM=film to A/B the motion-aware bridge.

Env knobs (bounded defaults to keep the GPU run tractable):
  NEXUS_MSV_SCENES (3)  NEXUS_MSV_SECONDS (6)  NEXUS_MSV_FPS (24)
  NEXUS_MSV_W (512) NEXUS_MSV_H (320)  NEXUS_MSV_UPSCALE (1)
  NEXUS_MSV_SEAM (overlap_blend)  NEXUS_MSV_SEGFRAMES (97)

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-multiscene-viability.py
"""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path

SCENES = [
    "a lone red kayak on a misty alpine lake at dawn, still water, "
    "pine-covered slopes, soft volumetric light, cinematic",
    "the same kayak now gliding forward, paddler stroking, ripples "
    "spreading, the mist thinning as the sun rises, cinematic",
    "the kayak reaching a wooden jetty, a small cabin behind it, warm "
    "morning light on the planks, gentle wake settling, cinematic",
]
NEG = "low quality, worst quality, deformed, blurry, jittery, noise"


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _noise(frame) -> float:
    import numpy as np

    a = np.asarray(frame.convert("L"), dtype=np.float32) / 255.0
    return float(np.mean(np.abs(a[:, 1:] - a[:, :-1])))


def _boundary_delta(prev_last, cur_first) -> float:
    import numpy as np

    x = np.asarray(prev_last.convert("RGB").resize((128, 128)), dtype=np.float32)
    y = np.asarray(cur_first.convert("RGB").resize((128, 128)), dtype=np.float32)
    return float(np.mean(np.abs(x - y)) / 255.0)


def _int(env: str, d: int) -> int:
    try:
        return int(os.environ.get(env, str(d)))
    except ValueError:
        return d


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    n_scenes = max(2, _int("NEXUS_MSV_SCENES", 3))
    seconds = max(2, _int("NEXUS_MSV_SECONDS", 6))
    fps = _int("NEXUS_MSV_FPS", 24)
    W, H = _int("NEXUS_MSV_W", 512), _int("NEXUS_MSV_H", 320)
    seg_frames = _int("NEXUS_MSV_SEGFRAMES", 97)
    upscale = os.environ.get("NEXUS_MSV_UPSCALE", "1") not in ("0", "")
    seam_method = os.environ.get("NEXUS_MSV_SEAM", "overlap_blend")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_multiscene"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker.seam import apply_seam, seam_params
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    seam = seam_params({}, seam_method)
    target = (1280, 720) if upscale else None
    frames_per_scene = max(seg_frames, seconds * fps)
    log = _Log()
    print(
        f"scenes={n_scenes} sec/scene={seconds} fps={fps} native={W}x{H} "
        f"seg={seg_frames} frames/scene~{frames_per_scene} "
        f"upscale={'720p' if upscale else 'native'} seam={seam.get('method')}"
    )
    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline("model", log)
    print(f"pipeline built {time.perf_counter()-t0:.0f}s")
    samp = mod._sampling_params({})
    cache: dict = {}

    tail = None
    boundary_deltas: list[tuple[str, float]] = []
    prev_last = None
    scene_noise: list[float] = []
    for si in range(n_scenes):
        remaining = frames_per_scene
        seg_in_scene = 0
        while remaining > 0:
            nf = min(seg_frames, remaining)
            if nf < 17:
                break
            seed = 1000 + si * 17 + seg_in_scene
            t = time.perf_counter()
            try:
                fr = list(
                    mod._generate_segment_dispatch(
                        pipe, cache, upscale, target, tail,
                        SCENES[si % len(SCENES)], NEG, W, H, nf, seed,
                        samp, None, log, "decoupled" if upscale else "two_pass",
                    )
                )
            except Exception as e:  # noqa: BLE001
                print(f"FAIL scene{si} seg{seg_in_scene}: {e}")
                traceback.print_exc()
                return 2
            fr = apply_seam(prev_last if prev_last else None, fr, seam, log)
            peak = torch.cuda.max_memory_allocated() / 1024**3
            tag = f"s{si}_g{seg_in_scene}"
            if prev_last is not None:
                d = _boundary_delta(prev_last, fr[0])
                boundary_deltas.append((tag, round(d, 4)))
            for k, ix in {
                "first": 0, "mid": len(fr) // 2, "last": len(fr) - 1
            }.items():
                fr[ix].save(outdir / f"{tag}_{k}.png")
            ns = sum(_noise(fr[i]) for i in (0, len(fr) // 2, -1)) / 3
            scene_noise.append(round(ns, 4))
            print(
                f"  {tag}: {len(fr)}f {time.perf_counter()-t:.0f}s "
                f"peak={peak:.2f} noise={ns:.4f} "
                f"dims={fr[0].size}"
            )
            prev_last = fr[-1]
            tcount = max(1, min(samp["condition_tail_frames"], len(fr)))
            tail = fr[-tcount:]
            if upscale:
                tail = mod._resize_frames(tail, W, H)
            remaining -= nf
            seg_in_scene += 1
            import gc

            del fr
            gc.collect()
            torch.cuda.empty_cache()
            torch.cuda.reset_peak_memory_stats()

    coherent = all(0.0 < d < 0.18 for _, d in boundary_deltas)
    noise_ok = all(n < 0.13 for n in scene_noise)
    print("\n== MULTI-SCENE VIABILITY ==")
    print(f"  boundary deltas (lower=more continuous): {boundary_deltas}")
    print(f"  per-seg noise (content<0.08, noise~0.3): {scene_noise}")
    print(f"  boundary continuity OK (<0.18): {coherent}")
    print(f"  content (not noise) OK (<0.13): {noise_ok}")
    print(f"  FRAMES: {outdir} (read s*_first/mid/last.png across scenes)")
    print(
        "MULTISCENE_RESULT:",
        "PASS" if (coherent and noise_ok) else "FAIL/REVIEW",
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
