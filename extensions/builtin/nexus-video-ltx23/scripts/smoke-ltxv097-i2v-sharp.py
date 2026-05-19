from __future__ import annotations

import gc
import os
import sys
import time
import traceback
from pathlib import Path

_USAGE = """\
smoke-ltxv097-i2v-sharp — operator-gated real-GPU i2v sharpness probe

Image-to-video from a seed reference image (AR cover-cropped, C1) on
the LTX-Video 0.9.7 GGUF path: native gen at NEXUS_I2V_W x NEXUS_I2V_H
(default 1024x576 — exact 16:9, /32, >= the 960x540 minimum; any
override is snapped to a multiple of 32 as LTX requires), Q4_K_M, LOW
base_fps
(fps restored later by RIFE/FILM — a VRAM lever), aggressive VAE
tiling, model offload, NO transformer-refine upscale (kills the spill
driver). Then Real-ESRGAN ncnn 4x -> exact downscale to the target
(default 1920x1080, C2) and RIFE+FILM fps interpolation.

PROBE GOAL: does native-res gen fit WITHOUT WDDM/shared-VRAM spill?
Per-segment peak + reserved are printed; reserved > ~15 GiB flags a
spill. Ladder NEXUS_I2V_W/H upward across runs until it spills.

RUN (worker venv; .pth resolves ltx_video_worker from the MAIN repo):
  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \\
  PYTHONPATH=<ext>/worker/src \\
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-i2v-sharp.py

Env knobs:
  NEXUS_I2V_W (1024) NEXUS_I2V_H (576) NEXUS_I2V_FPS (16)
  NEXUS_I2V_OUTFPS (2x FPS) NEXUS_I2V_SCENES (3) NEXUS_I2V_SECONDS (2.7)
  NEXUS_I2V_TARGET_W (1920) NEXUS_I2V_TARGET_H (1080)
  NEXUS_I2V_QUANT (ltxv-13b-0.9.7-dev-Q4_K_M.gguf)
  NEXUS_I2V_SEED (scripts/_assets/i2v-possession-seed.jpg)

Exit: 0 PASS, 1 FAIL/REVIEW, 2 prerequisite missing.
"""

# Demonic-possession arc (fictional). Scene 0 is conditioned on the
# seed image; 1/2 continue from the prior tail toward the rain-collapse
# terminal reference.
CHARACTER = (
    "a young nun in a black habit and white wimple, pale gaunt face, "
    "dark intense eyes"
)
STYLE = (
    "dark gothic horror, candlelit cathedral, volumetric god-rays, "
    "desaturated cold palette, film grain, cinematic 35mm, dramatic "
    "chiaroscuro, photorealistic"
)
NEG = (
    "cartoon, anime, deformed, extra limbs, watermark, text, "
    "low quality, blurry, oversaturated"
)
SCENES = [
    "she slowly turns to face the camera, her gentle smile stretching "
    "unnaturally wide, eyes going black, candle flames bending toward "
    "her, robed onlookers recoiling in the shadows",
    "her head snaps violently backward, body convulsing and lifting "
    "off the floor, the wimple whipping in a sourceless wind, candles "
    "snuffing out one by one, embers swirling",
    "she crashes onto the wet cathedral floor under a sudden indoor "
    "downpour, back arching impossibly, mouth open in a soundless "
    "scream, camera slowly pulling back through the vast gothic nave",
]


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


def _snap32(x: int) -> int:
    # LTX requires gen width/height divisible by 32. Round to nearest,
    # floor at 32, so every ladder rung is a valid model resolution.
    return max(32, int(round(x / 32.0)) * 32)


def _probe_fps(path: Path) -> float:
    import ffmpeg

    p = ffmpeg.probe(str(path))
    v = next(s for s in p["streams"] if s["codec_type"] == "video")
    n, d = (v.get("r_frame_rate") or "0/1").split("/")
    return float(n) / float(d or "1")


def main() -> int:
    print(_USAGE)
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.setdefault("NEXUS_VIDEO_LTX23_FILM_AUTOSTAGE", "1")

    # Default 1024x576: exact 16:9, both /32, >= the operator-stated
    # 960x540 minimum. Any override is snapped to /32 (LTX requirement).
    W = _snap32(_int("NEXUS_I2V_W", 1024))
    H = _snap32(_int("NEXUS_I2V_H", 576))
    fps = _int("NEXUS_I2V_FPS", 16)
    out_fps = _int("NEXUS_I2V_OUTFPS", fps * 2)
    n_scenes = max(1, _int("NEXUS_I2V_SCENES", 3))
    secs = float(os.environ.get("NEXUS_I2V_SECONDS", "2.7"))
    tw = _int("NEXUS_I2V_TARGET_W", 1920)
    th = _int("NEXUS_I2V_TARGET_H", 1080)
    quant = os.environ.get(
        "NEXUS_I2V_QUANT", "ltxv-13b-0.9.7-dev-Q4_K_M.gguf"
    )
    here = Path(__file__).resolve().parent
    seed_path = os.environ.get(
        "NEXUS_I2V_SEED", str(here / "_assets" / "i2v-possession-seed.jpg")
    )
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_i2v_sharp"
    segdir = outdir / "segments"
    segdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import esrgan_upscale as eu  # type: ignore
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker.fps_interp import try_interpolate
        from ltx_video_worker.ffmpeg_io import stitch_segments
        from ltx_video_worker.seam import apply_seam, seam_params
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2
    if not Path(seed_path).is_file():
        print(f"FAIL: seed image not found: {seed_path}")
        return 2

    log = _Log()
    seam = seam_params({}, "film")
    nf = max(17, int(round(secs * fps)))
    print(
        f"i2v seed={Path(seed_path).name} native={W}x{H} fps={fps}->{out_fps} "
        f"scenes={n_scenes} seg_frames={nf} quant={quant} "
        f"target={tw}x{th} (gen=native-only, post=ESRGAN+RIFE/FILM)"
    )

    seed_img = mod._load_input_image(seed_path, W, H)  # C1 cover-crop
    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline(
        os.environ.get("NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model"),
        log,
        model_id=quant,
        vae_tiling=mod._resolve_vae_tiling({"vae_tiling": "aggressive"}),
    )
    print(f"pipeline built {time.perf_counter() - t0:.0f}s")
    samp = mod._sampling_params({})
    cache: dict = {}

    prev_seam_tail = None
    cond: object = seed_img
    seg_paths: list[Path] = []
    worst_resv = 0.0
    for si in range(n_scenes):
        prompt = f"{CHARACTER}. {SCENES[si % len(SCENES)]}. {STYLE}"
        seed = 4000 + si * 17
        t = time.perf_counter()
        torch.cuda.reset_peak_memory_stats()
        try:
            fr = list(
                mod._generate_segment_dispatch(
                    pipe, cache, False, None, cond, prompt, NEG,
                    W, H, nf, seed, samp, None, log, "two_pass",
                )
            )
        except Exception as e:  # noqa: BLE001
            print(f"FAIL scene{si}: {e}")
            traceback.print_exc()
            return 1
        fr = apply_seam(prev_seam_tail, fr, seam, log)
        peak = torch.cuda.max_memory_allocated() / 1024**3
        resv = torch.cuda.max_memory_reserved() / 1024**3
        worst_resv = max(worst_resv, resv)
        spill = "  <-- SPILL RISK" if resv > 15.0 else ""
        tag = f"s{si}"
        for k, ix in {"first": 0, "mid": len(fr) // 2, "last": len(fr) - 1}.items():
            fr[ix].save(outdir / f"{tag}_{k}.png")
        seg_path = segdir / f"{len(seg_paths):03d}.mp4"
        mod._write_frames_as_mp4(fr, seg_path, base_fps=fps)
        seg_paths.append(seg_path)
        print(
            f"  {tag}: {len(fr)}f {time.perf_counter() - t:.0f}s "
            f"peak={peak:.2f} resv={resv:.2f} dims={fr[0].size}{spill}"
        )
        tcount = max(1, min(samp["condition_tail_frames"], len(fr)))
        prev_seam_tail = fr[-tcount:]
        cond = fr[-tcount:]
        del fr
        gc.collect()
        torch.cuda.empty_cache()

    if not seg_paths:
        print("FAIL: no segments")
        return 1

    stitched = outdir / "stitched.mp4"
    upscaled = outdir / "upscaled.mp4"
    final = outdir / "final.mp4"
    stitch_segments(seg_paths, stitched)
    sr_ok = eu.try_upscale(stitched, upscaled, tw, th, log)
    sr_src = upscaled if sr_ok else stitched
    interp_ok = try_interpolate(sr_src, final, fps, out_fps, log)
    out = final if interp_ok else sr_src
    out_w, out_h = (tw, th) if sr_ok else (W, H)
    final_fps = _probe_fps(out)

    print("\n== i2v SHARPNESS PROBE ==")
    print(f"  segments={len(seg_paths)} native={W}x{H} quant={quant}")
    print(f"  worst reserved={worst_resv:.2f} GiB "
          f"({'NO spill — fits' if worst_resv <= 15.0 else 'SPILL — too high'})")
    print(f"  esrgan ok={sr_ok} -> {out_w}x{out_h}")
    print(f"  interp ok={interp_ok} final_fps={final_fps:.2f} target={out_fps}")
    print(f"  final: {out}")
    print(f"  frames: {outdir}")
    verdict = worst_resv <= 15.0 and len(seg_paths) == n_scenes
    print("I2V_SHARP_RESULT:", "PASS" if verdict else "FAIL/REVIEW")
    return 0 if verdict else 1


if __name__ == "__main__":
    sys.exit(main())
