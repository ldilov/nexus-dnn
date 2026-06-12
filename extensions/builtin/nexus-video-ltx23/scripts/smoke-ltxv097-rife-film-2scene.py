from __future__ import annotations

import gc
import os
import sys
import time
import traceback
from pathlib import Path

_USAGE = """\
smoke-ltxv097-rife-film-2scene — operator-gated real-GPU E2E

Renders N scenes x S seconds (default 3 x 9s, >=2 distinct scenes),
FILM motion-aware seam at every boundary, then stitches and runs the
RIFE FPS interpolation (ncnn wheel -> ffmpeg minterpolate fallback)
to produce a final mp4 at the interpolated frame rate. Frame PNGs,
per-boundary deltas, and the probed final fps make the verdict
eye-readable, not a single heuristic.

RUN (worker venv; its editable .pth resolves ltx_video_worker from
the MAIN repo, NOT this worktree — sync changes to main or point the
.pth at the worktree before trusting a GPU run). No headless host
needed; this drives the pipeline in-process on CUDA directly.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \\
  PYTHONPATH=<ext>/worker/src \\
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-rife-film-2scene.py

Env knobs:
  NEXUS_RFE_SCENES (3)  NEXUS_RFE_SECONDS (9)  NEXUS_RFE_FPS (24)
  NEXUS_RFE_OUTFPS (2x FPS)  NEXUS_RFE_W (512)  NEXUS_RFE_H (320)
  NEXUS_RFE_UPSCALE (1)  NEXUS_RFE_SEAM (film)  NEXUS_RFE_SEGFRAMES (97)
FILM auto-stage is forced on (Apache-2.0 incl. weights) unless the
operator pre-sets NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE.

Exit: 0 PASS, 1 FAIL/REVIEW, 2 prerequisite missing.
"""

SCENES = [
    "a lone red kayak on a misty alpine lake at dawn, still water, "
    "pine-covered slopes, soft volumetric light, cinematic",
    "the same kayak now gliding forward, paddler stroking, ripples "
    "spreading, the mist thinning as the sun rises, cinematic",
    "a bustling night market street, neon signs, steam from food "
    "stalls, crowds moving, reflections on wet asphalt, cinematic",
]
NEG = "low quality, worst quality, deformed, blurry, jittery, noise"


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _int(env: str, d: int) -> int:
    try:
        return int(os.environ.get(env, str(d)))
    except ValueError:
        return d


def _boundary_delta(prev_last, cur_first) -> float:
    import numpy as np

    x = np.asarray(
        prev_last.convert("RGB").resize((128, 128)), dtype=np.float32
    )
    y = np.asarray(
        cur_first.convert("RGB").resize((128, 128)), dtype=np.float32
    )
    return float(np.mean(np.abs(x - y)) / 255.0)


def _probe_fps(path: Path) -> float:
    import ffmpeg

    probe = ffmpeg.probe(str(path))
    vid = next(s for s in probe["streams"] if s["codec_type"] == "video")
    num, den = (vid.get("r_frame_rate") or "0/1").split("/")
    return float(num) / float(den or "1")


def main() -> int:
    print(_USAGE)
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.setdefault("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")

    n_scenes = max(2, _int("NEXUS_RFE_SCENES", 3))
    seconds = max(2, _int("NEXUS_RFE_SECONDS", 9))
    fps = _int("NEXUS_RFE_FPS", 24)
    out_fps = _int("NEXUS_RFE_OUTFPS", fps * 2)
    W, H = _int("NEXUS_RFE_W", 512), _int("NEXUS_RFE_H", 320)
    seg_frames = _int("NEXUS_RFE_SEGFRAMES", 97)
    upscale = os.environ.get("NEXUS_RFE_UPSCALE", "1") not in ("0", "")
    seam_method = os.environ.get("NEXUS_RFE_SEAM", "film")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_rife_film_e2e"
    segdir = outdir / "segments"
    segdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker import seam as seam_mod  # type: ignore
        from ltx_video_worker import fps_interp as fi  # type: ignore
        from ltx_video_worker.ffmpeg_io import stitch_segments
        from ltx_video_worker.fps_interp import try_interpolate
        from ltx_video_worker.seam import apply_seam, seam_params
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    try:
        import ffmpeg  # type: ignore  # noqa: F401
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: ffmpeg-python unavailable: {e}")
        return 2

    seam = seam_params({}, seam_method)
    target = (1280, 720) if upscale else None
    frames_per_scene = max(seg_frames, seconds * fps)
    log = _Log()
    print(
        f"scenes={n_scenes} sec/scene={seconds} fps={fps}->{out_fps} "
        f"native={W}x{H} seg={seg_frames} "
        f"upscale={'720p' if upscale else 'native'} "
        f"seam={seam.get('method')}"
    )

    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline("model", log)
    print(f"pipeline built {time.perf_counter() - t0:.0f}s")
    samp = mod._sampling_params({})
    cache: dict = {}

    tail = None
    prev_last = None
    prev_seam_tail = None
    boundary_deltas: list[tuple[str, float]] = []
    seg_paths: list[Path] = []
    seen_prompts: list[str] = []

    for si in range(n_scenes):
        remaining = frames_per_scene
        seg_in_scene = 0
        while remaining > 0:
            nf = min(seg_frames, remaining)
            if nf < 17:
                break
            prompt = SCENES[si % len(SCENES)]
            seen_prompts.append(prompt)
            seed = 1000 + si * 17 + seg_in_scene
            t = time.perf_counter()
            try:
                fr = list(
                    mod._generate_segment_dispatch(
                        pipe, cache, upscale, target, tail,
                        prompt, NEG, W, H, nf, seed, samp, None, log,
                        "decoupled" if upscale else "two_pass",
                    )
                )
            except Exception as e:  # noqa: BLE001
                print(f"FAIL scene{si} seg{seg_in_scene}: {e}")
                traceback.print_exc()
                return 1
            fr = apply_seam(prev_seam_tail, fr, seam, log)
            peak = torch.cuda.max_memory_allocated() / 1024**3
            tag = f"s{si}_g{seg_in_scene}"
            if prev_last is not None:
                boundary_deltas.append(
                    (tag, round(_boundary_delta(prev_last, fr[0]), 4))
                )
            for k, ix in {
                "first": 0, "mid": len(fr) // 2, "last": len(fr) - 1
            }.items():
                fr[ix].save(outdir / f"{tag}_{k}.png")
            seg_path = segdir / f"{len(seg_paths):03d}.mp4"
            mod._write_frames_as_mp4(fr, seg_path, base_fps=fps)
            seg_paths.append(seg_path)
            print(
                f"  {tag}: {len(fr)}f {time.perf_counter() - t:.0f}s "
                f"peak={peak:.2f} dims={fr[0].size}"
            )
            prev_last = fr[-1]
            tcount = max(1, min(samp["condition_tail_frames"], len(fr)))
            prev_seam_tail = fr[-tcount:]
            tail = fr[-tcount:]
            if upscale:
                tail = mod._resize_frames(tail, W, H)
            remaining -= nf
            seg_in_scene += 1
            del fr
            gc.collect()
            torch.cuda.empty_cache()
            torch.cuda.reset_peak_memory_stats()

    if len(seg_paths) < 2:
        print("FAIL: fewer than 2 segments rendered")
        return 1

    stitched = outdir / "stitched.mp4"
    interpolated = outdir / "interpolated.mp4"
    stitch_segments(seg_paths, stitched)
    interp_ok = try_interpolate(stitched, interpolated, fps, out_fps, log)
    final = interpolated if interp_ok else stitched
    final_fps = _probe_fps(final)
    rife_bin = fi._resolve_rife_binary(log)
    rife_ready = rife_bin is not None

    film_slot = seam_mod._MODEL_CACHE.get("film") or {}
    film_loaded = film_slot.get("model") is not None
    distinct = sorted(set(seen_prompts))
    coherent = all(0.0 < d < 0.18 for _, d in boundary_deltas)
    fps_ok = interp_ok and abs(final_fps - out_fps) < 1.5

    print("\n== RIFE + FILM 2-SCENE E2E ==")
    print(f"  segments={len(seg_paths)} scenes(distinct)={len(distinct)}")
    print(f"  boundary deltas (<0.18 = continuous): {boundary_deltas}")
    print(f"  seam method requested={seam_method} FILM_loaded={film_loaded}")
    print(
        f"  interp ok={interp_ok} via="
        f"{'rife-ncnn' if rife_ready and interp_ok else ('ffmpeg' if interp_ok else 'none')} "
        f"rife_bin={rife_bin[0] if rife_ready else None} "
        f"final_fps={final_fps:.2f} target={out_fps}"
    )
    print(f"  final: {final}")
    print(f"  frames: {outdir}")
    verdict = (
        len(distinct) >= 2 and coherent and fps_ok and len(seg_paths) >= 2
    )
    print("RIFE_FILM_E2E_RESULT:", "PASS" if verdict else "FAIL/REVIEW")
    return 0 if verdict else 1


if __name__ == "__main__":
    sys.exit(main())
