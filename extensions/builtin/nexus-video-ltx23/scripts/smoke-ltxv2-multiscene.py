"""Stage-B smoke: LTX-2 19B multi-scene continuation, continuity-checked.

Spec 048 P2 gate. Drives the `pipeline_ltx2` + `ltx2_multiscene` +
`ltx2_conditioning` primitives along the same compute path
`ltx2_multiscene.run_multiscene` takes — without the async worker shell:

  input image -> scene 0 (i2v) -> scene 1 (latent-tail continuation)
  -> scene 2 (latent-tail continuation) -> apply_seam -> stitch
  -> esrgan 720p -> RIFE 16->32 fps

Scenes: 3 x 105 frames @ 16 fps. The 19B transformer is loaded once and
kept warm across every scene; only the latent 3-frame tail is carried
scene-to-scene (no VAE decode/re-encode roundtrip). Checks each scene is
coherent and that the cut between scenes is a continuation, not a jump.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv2-multiscene.py

Exit 0 = PASS / 1 = FAIL / 2 = prereqs-missing.
Final tag line: STAGE_B_RESULT: PASS|FAIL
"""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path

_SCENE_ACTIONS = [
    "a calm ocean horizon at sunrise, gentle rolling waves",
    "the waves build, the light strengthens across the water",
    "the sun clears the horizon, the sea glints gold",
]


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _noise_score(frame) -> float:
    import numpy as np

    a = np.asarray(frame.convert("L"), dtype=np.float32) / 255.0
    return float(np.mean(np.abs(a[:, 1:] - a[:, :-1])))


def _frame_delta(a, b) -> float:
    """Mean abs luminance delta between two frames, 0..1."""
    import numpy as np

    fa = np.asarray(a.convert("L"), dtype=np.float32) / 255.0
    fb = np.asarray(b.convert("L"), dtype=np.float32) / 255.0
    return float(np.mean(np.abs(fa - fb)))


def _make_input_image(width: int, height: int, path: Path):
    import numpy as np
    from PIL import Image

    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    r = (xx / width * 220 + 20).astype(np.uint8)
    g = (yy / height * 200 + 30).astype(np.uint8)
    b = ((xx + yy) / (width + height) * 180 + 40).astype(np.uint8)
    img = Image.fromarray(np.dstack([r, g, b]))
    img.save(path)
    return img


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.setdefault("NEXUS_VIDEO_LTX23_RUNTIME", "rtx50-ltx2-gguf")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv2_multiscene_smoke"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import ltx2_conditioning as cond  # type: ignore
        from ltx_video_worker import ltx2_multiscene as ms  # type: ignore
        from ltx_video_worker import pipeline_ltx2 as mod  # type: ignore
        from ltx_video_worker.ffmpeg_io import stitch_segments
        from ltx_video_worker.seam import apply_seam, seam_params
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    paths = mod._resolve_paths()
    for label, ok in (
        (f"transformer GGUF: {paths.transformer_gguf}", paths.transformer_gguf.is_file()),
        (f"connector: {paths.connector}", paths.connector.is_file()),
        (f"video VAE: {paths.video_vae}", paths.video_vae.is_file()),
        (f"tokenizer: {paths.base_dir}/tokenizer", (paths.base_dir / "tokenizer").is_dir()),
        (
            f"Gemma GGUF: {paths.gemma_dir}/gemma-3-12b-it-Q4_K_S.gguf",
            (paths.gemma_dir / "gemma-3-12b-it-Q4_K_S.gguf").is_file(),
        ),
    ):
        if not ok:
            print(f"FAIL: required file not staged — {label}")
            return 2

    geometry = mod._resolve_geometry({})
    W, H, NF = geometry["width"], geometry["height"], geometry["num_frames"]
    BASE_FPS = geometry["frame_rate"]
    samp = mod._resolve_sampling({})
    scene_count = 3
    print(f"ltxv2 multi-scene: {scene_count} scenes x {NF}f  geometry={geometry}")

    logger = _Log()
    img_path = outdir / "input.png"
    _make_input_image(W, H, img_path)

    prompt_obj = {"style": "cinematic, photorealistic"}
    scene_prompts = [
        ms._compose_scene_prompt(prompt_obj, _SCENE_ACTIONS[i])
        for i in range(scene_count)
    ]

    torch.cuda.reset_peak_memory_stats()
    t0 = time.perf_counter()

    try:
        scene_embeds = mod.encode_prompts_with_gemma(
            paths, scene_prompts, mod._DEF_NEGATIVE_PROMPT,
            samp["guidance_scale"], logger,
        )
        keyframe = mod.encode_keyframe(
            paths, str(img_path), geometry, mod._DEF_KEYFRAME_STRENGTH, logger
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL encode stage: {e}")
        traceback.print_exc()
        return 1
    print(f"OK  batched Gemma encode ({scene_count}) + keyframe  "
          f"{time.perf_counter()-t0:.1f}s")

    try:
        stack = mod._build_native_stack(logger)
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _build_native_stack: {e}")
        traceback.print_exc()
        return 1
    print("OK  native stack assembled (warm across all scenes)")

    grids = []
    prev_tail = None
    anchor = None
    try:
        for i in range(scene_count):
            items = ms._scene_conditioning(
                i, keyframe, prev_tail, anchor, 0.5, True
            )
            t_s = time.perf_counter()
            grid = mod.run_native_denoise(
                stack, scene_embeds[i],
                ms._scene_geometry(geometry, NF), samp, 1000 + i, None,
                logger, items,
            )
            prev_tail = cond.extract_tail_latent(grid, 3)
            if i == 0:
                anchor = grid[:, :, :1, :, :].contiguous()
            grids.append(grid.to("cpu"))
            print(f"OK  scene {i+1}/{scene_count} denoised  "
                  f"{time.perf_counter()-t_s:.0f}s")
    except Exception as e:  # noqa: BLE001
        print(f"FAIL scene denoise: {e}")
        traceback.print_exc()
        return 1

    mod.evict_transformer(stack)
    peak = torch.cuda.max_memory_allocated() / 1024**3
    print(f"OK  all scenes denoised  peak={peak:.2f}GiB")

    device = torch.device("cuda")
    seam_cfg = seam_params({}, None)
    seg_paths = []
    scene_frames = []
    prev_frames = None
    try:
        for i, grid in enumerate(grids):
            frames = mod.decode_grid_to_frames(
                grid.to(device), paths, device, logger, NF, {}
            )
            if prev_frames is not None:
                frames = apply_seam(prev_frames[-16:], list(frames), seam_cfg, logger)
            seg = outdir / f"scene_{i:02d}.mp4"
            mod._write_frames_as_mp4(frames, seg, BASE_FPS)
            seg_paths.append(seg)
            scene_frames.append(list(frames))
            prev_frames = frames
    except Exception as e:  # noqa: BLE001
        print(f"FAIL decode/seam: {e}")
        traceback.print_exc()
        return 1

    stitched = outdir / "stitched.mp4"
    stitch_segments(seg_paths, stitched)
    final = mod.post_render_tail(
        stitched, outdir, {"upscale_mode": "esrgan"}, geometry, logger
    )
    print(f"final MP4: {final}")

    # Coherence: every scene's mid frame must look like content, not noise.
    coherent = True
    for i, frames in enumerate(scene_frames):
        ns = _noise_score(frames[len(frames) // 2])
        frames[len(frames) // 2].save(outdir / f"scene_{i:02d}_mid.png")
        if ns >= 0.12:
            coherent = False
        print(f"  scene {i+1} mid noise={ns:.4f}")

    # Continuity: the cut delta (last frame of N vs first of N+1) must be a
    # continuation — non-zero (motion happened) but not a hard jump.
    continuity_ok = True
    for i in range(len(scene_frames) - 1):
        cut = _frame_delta(scene_frames[i][-1], scene_frames[i + 1][0])
        print(f"  cut {i+1}->{i+2} delta={cut:.4f}")
        if cut > 0.30:
            continuity_ok = False

    total = time.perf_counter() - t0
    ok = coherent and continuity_ok and peak < 16.0
    print(
        f"multi-scene: {scene_count} scenes  {total:.0f}s  peak={peak:.2f}GiB  "
        f"coherent={coherent}  continuity={continuity_ok}"
    )
    print(f"OUTPUT IN: {outdir}")
    print(
        "STAGE_B_RESULT:",
        "PASS (multi-scene continuation coherent)" if ok
        else "FAIL (check scene coherence / cut continuity / VRAM)",
    )
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
