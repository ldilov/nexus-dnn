"""Stage-B smoke: LTX-2 19B image-to-video single clip, coherence-checked.

Spec 048 P1 gate. Drives the shipped `pipeline_ltx2` functions
end-to-end with the ltxv2-distilled-q4 profile (768x512, 105 frames,
16 fps base, 8 steps, guidance 1.0):

  input image -> i2v keyframe condition -> 105-frame clip
  -> esrgan 720p upscale -> RIFE 16->32 fps -> final MP4

The input image is `NEXUS_LTXV2_SMOKE_IMAGE` when set, else a synthetic
gradient. Extracts first/mid/last frames as PNGs and computes a cheap
per-frame spatial-smoothness heuristic: pure-noise frames have near-zero
neighbour correlation, coherent content does not.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_RUNTIME=rtx50-ltx2-gguf \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv2-render.py

Exit 0 = PASS / 1 = FAIL / 2 = prereqs-missing.
Final tag line: STAGE_B_RESULT: PASS|FAIL
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
    """Mean abs horizontal-neighbour delta. Pure noise ~0.3-0.5;
    coherent imagery ~< 0.08."""
    import numpy as np

    a = np.asarray(frame.convert("L"), dtype=np.float32) / 255.0
    return float(np.mean(np.abs(a[:, 1:] - a[:, :-1])))


def _make_input_image(width: int, height: int, path: Path):
    """Build a deterministic synthetic input image when none is supplied."""
    import numpy as np
    from PIL import Image

    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    r = (xx / width * 220 + 20).astype(np.uint8)
    g = (yy / height * 200 + 30).astype(np.uint8)
    b = ((xx + yy) / (width + height) * 180 + 40).astype(np.uint8)
    img = Image.fromarray(np.dstack([r, g, b]))
    img.save(path)
    return img


def _probe_dims(mp4: Path) -> tuple[int, int, float]:
    """Return (width, height, fps) of an MP4 via ffmpeg.probe."""
    import ffmpeg  # type: ignore

    info = ffmpeg.probe(str(mp4))
    stream = next(
        s for s in info["streams"] if s.get("codec_type") == "video"
    )
    num, den = (stream.get("r_frame_rate") or "0/1").split("/")
    fps = float(num) / float(den) if float(den) else 0.0
    return int(stream["width"]), int(stream["height"]), fps


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.setdefault("NEXUS_VIDEO_LTX23_RUNTIME", "rtx50-ltx2-gguf")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv2_smoke"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltx2 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    paths = mod._resolve_paths()
    missing = []
    if not paths.transformer_gguf.is_file():
        missing.append(f"transformer GGUF: {paths.transformer_gguf}")
    if not paths.connector.is_file():
        missing.append(f"embeddings connector: {paths.connector}")
    if not (paths.base_dir / "tokenizer").is_dir():
        missing.append(f"Gemma tokenizer tree: {paths.base_dir}/tokenizer")
    if not paths.video_vae.is_file():
        missing.append(f"video VAE: {paths.video_vae}")
    if not (paths.gemma_dir / "gemma-3-12b-it-Q4_K_S.gguf").is_file():
        missing.append(
            f"Gemma-3-12B GGUF: {paths.gemma_dir}/gemma-3-12b-it-Q4_K_S.gguf"
        )
    if missing:
        print("FAIL: required model files not staged:")
        for m in missing:
            print(f"  {m}")
        return 2

    geometry = mod._resolve_geometry({})
    W, H = geometry["width"], geometry["height"]
    NF, BASE_FPS = geometry["num_frames"], geometry["frame_rate"]
    OUT_FPS = geometry["output_fps"]
    samp = mod._resolve_sampling({})
    print(f"ltxv2 geometry: {geometry}")
    print(f"ltxv2 sampling: {samp}")

    prompt = (
        "a calm ocean horizon at sunrise, gentle rolling waves, "
        "warm golden light, cinematic, photorealistic"
    )
    logger = _Log()

    # Input image — operator-supplied or synthetic.
    img_env = os.environ.get("NEXUS_LTXV2_SMOKE_IMAGE", "").strip()
    img_path = outdir / "input.png"
    if img_env and Path(img_env).is_file():
        from PIL import Image

        Image.open(img_env).convert("RGB").resize((W, H)).save(img_path)
        print(f"i2v input image: {img_env}")
    else:
        _make_input_image(W, H, img_path)
        print(f"i2v input image: synthetic gradient -> {img_path}")

    torch.cuda.reset_peak_memory_stats()
    t0 = time.perf_counter()

    try:
        embeds = mod._encode_prompt_with_gemma(
            paths, prompt, mod._DEF_NEGATIVE_PROMPT,
            samp["guidance_scale"], logger,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _encode_prompt_with_gemma: {e}")
        traceback.print_exc()
        return 1
    print(f"OK  Gemma encode + unload  {time.perf_counter()-t0:.1f}s")

    # i2v keyframe encode — must precede the transformer load.
    t_kf = time.perf_counter()
    try:
        keyframe = mod.encode_keyframe(
            paths, str(img_path), geometry,
            mod._DEF_KEYFRAME_STRENGTH, logger,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL encode_keyframe: {e}")
        traceback.print_exc()
        return 1
    if keyframe is None:
        print("FAIL: encode_keyframe returned None for a supplied image")
        return 1
    print(f"OK  i2v keyframe encode  {time.perf_counter()-t_kf:.1f}s")

    t1 = time.perf_counter()
    try:
        stack = mod._build_native_stack(logger)
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _build_native_stack: {e}")
        traceback.print_exc()
        return 1
    print(f"OK  native stack assembled  {time.perf_counter()-t1:.1f}s")

    t2 = time.perf_counter()
    try:
        frames = mod._generate_single(
            stack, embeds, geometry, samp, 1234, paths, None, logger,
            None, [keyframe],
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _generate_single: {e}")
        traceback.print_exc()
        return 1

    flist = list(frames)
    peak = torch.cuda.max_memory_allocated() / 1024**3
    print(
        f"OK  _generate_single (i2v)  {time.perf_counter()-t2:.0f}s  "
        f"{len(flist)} frames  peak={peak:.2f}GiB"
    )

    base_mp4 = outdir / "clip_base.mp4"
    try:
        mod._write_frames_as_mp4(flist, base_mp4, BASE_FPS)
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _write_frames_as_mp4: {e}")
        traceback.print_exc()
        return 1

    if abs(len(flist) - NF) > 1:
        print(f"FAIL: expected {NF} frames, got {len(flist)}")
        return 1
    if base_mp4.stat().st_size < 100_000:
        print(f"FAIL: base MP4 suspiciously small ({base_mp4.stat().st_size}B)")
        return 1

    # Post-render tail: esrgan 720p upscale + RIFE 16->32 fps. Fail-soft —
    # a missing binary leaves the prior file; we report what landed.
    final_mp4 = mod.post_render_tail(
        base_mp4, outdir, {"upscale_mode": "esrgan"}, geometry, logger
    )
    try:
        fw, fh, ffps = _probe_dims(Path(final_mp4))
        print(f"final MP4: {fw}x{fh} @ {ffps:.1f}fps  ({final_mp4})")
        upscaled = fw >= 1280 and fh >= 720
        interpolated = ffps >= OUT_FPS - 1
        print(
            f"  upscale 720p: {'OK' if upscaled else 'not applied'}  |  "
            f"RIFE {OUT_FPS}fps: {'OK' if interpolated else 'not applied'}"
        )
    except Exception as e:  # noqa: BLE001
        print(f"  (ffprobe of final MP4 failed: {e})")

    idxs = {"first": 0, "mid": len(flist) // 2, "last": len(flist) - 1}
    scores = {}
    for tag, ix in idxs.items():
        flist[ix].save(outdir / f"clip_{tag}.png")
        scores[tag] = round(_noise_score(flist[ix]), 4)
    mean_ns = sum(scores.values()) / len(scores)
    coherent = mean_ns < 0.12

    print(
        f"clip: {len(flist)}f  {time.perf_counter()-t0:.0f}s total  "
        f"peak={peak:.2f}GiB  noise={scores} -> "
        f"{'COHERENT' if coherent else 'LOOKS LIKE NOISE'}"
    )
    print(f"FRAMES SAVED IN: {outdir}  (inspect clip_first/mid/last.png)")
    print(
        "STAGE_B_RESULT:",
        "PASS (i2v clip coherent)" if coherent
        else "FAIL (output still looks like noise — check pipeline recipe)",
    )
    return 0 if coherent else 1


if __name__ == "__main__":
    sys.exit(main())
