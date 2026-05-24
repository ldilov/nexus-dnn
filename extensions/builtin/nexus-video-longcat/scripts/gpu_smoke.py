"""Real-GPU smoke for the LongCat-Video render path.

Runs a single 12-step distill t2v at 480x832 / 49 frames with partial
offload (swap=40) and KV-cache offload. The goal is a minimum-cost path
that exercises:
  - Kijai FP8 _KJ safetensors load via load_longcat_dit_from_safetensors
  - build_dit + split-QKV patches on real DiT geometry
  - UMT5-XXL text encoder + Wan 2.1 VAE on real GPU
  - FlowMatchEulerDiscreteScheduler distill schedule
  - generate_t2v end-to-end → MP4 via ffmpeg_io.write_video_frames

Usage:
    cd extensions/builtin/nexus-video-longcat/worker
    uv run --extra diffusers python ../scripts/gpu_smoke.py

Exit codes:
    0 ok
    1 unexpected exception (traceback to stderr)
    2 VRAM OOM
    3 missing weights
"""

from __future__ import annotations

import argparse
import logging
import os
import sys
import time
import traceback
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", default="t2v", choices=["t2v", "i2v"])
    parser.add_argument("--image", default=None, help="image path for --mode i2v")
    parser.add_argument("--height", type=int, default=480)
    parser.add_argument("--width", type=int, default=832)
    parser.add_argument("--num-frames", type=int, default=49)
    # Default 16 = LongCat distill training step count (paper Sec. 4.2).
    # Running below 16 with the distill LoRA produces bursty / random
    # speed-ups in motion because the FlowMatchEuler timestep allocation
    # is compressed beyond the LoRA's training distribution.
    parser.add_argument("--steps", type=int, default=16)
    parser.add_argument("--guidance", type=float, default=1.0)
    parser.add_argument("--distill", action="store_true", default=True)
    parser.add_argument("--no-distill", dest="distill", action="store_false")
    parser.add_argument("--swap", type=int, default=46)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--prompt", default=None)
    parser.add_argument(
        "--refine",
        action="store_true",
        help="Apply refinement LoRA + generate_refine pass on the draft",
    )
    parser.add_argument(
        "--refine-steps", type=int, default=12,
        help="num_inference_steps for the refinement pass",
    )
    parser.add_argument(
        "--refine-guidance", type=float, default=1.0,
        help="guidance_scale for the refinement pass",
    )
    parser.add_argument(
        "--refine-temporal",
        dest="refine_spatial_only",
        action="store_false",
        default=True,
        help="Double frame count via temporal interp during refinement. "
             "Default off — keeps frame count, only spatial upscale. "
             "Enable only on cards with >=24GiB or for small draft sizes.",
    )
    parser.add_argument(
        "--target-seconds", type=float, default=None,
        help="Native long-video via chained generate_vc. Implies "
             "target_frames=ceil(target_seconds*24). Overrides single-clip output.",
    )
    parser.add_argument(
        "--continuation-overlap", type=int, default=13,
        help="Frames of overlap between continuation clips. Must satisfy "
             "(n-1) %% vae_temporal_scale == 0 (4 for LongCat).",
    )
    parser.add_argument(
        "--scenes-json", default=None,
        help="Path to JSON file with multi-scene composition. Format: "
             '[{"prompt": "...", "duration_seconds": 4.0, '
             '"overlap_frames": 13, "enhance_hf": null}, ...]. '
             "Mutually exclusive with --target-seconds.",
    )
    parser.add_argument(
        "--quality-preset",
        choices=["distill", "balanced", "reference"],
        default=None,
        help=(
            "One-shot quality preset. Sets distill/steps/guidance to a known "
            "operating point unless those flags were passed explicitly.\n"
            "  distill   = use_distill=True,  steps=16, guidance=1.0  (fast, default)\n"
            "  balanced  = use_distill=False, steps=20, guidance=3.5  (mid, ~1.7x wall)\n"
            "  reference = use_distill=False, steps=30, guidance=4.0  (best, ~2.5x wall)"
        ),
    )
    args = parser.parse_args()

    # Apply quality preset BEFORE argparse defaults dominate. argparse
    # cannot tell user-supplied from default-supplied, so the preset only
    # overrides when the user left the flag at its known default value.
    _DEFAULT_STEPS = 16
    _DEFAULT_GUIDANCE = 1.0
    if args.quality_preset == "distill":
        if args.steps == _DEFAULT_STEPS:
            args.steps = 16
        if args.guidance == _DEFAULT_GUIDANCE:
            args.guidance = 1.0
        # distill defaults True via add_argument; nothing to flip.
    elif args.quality_preset == "balanced":
        if args.steps == _DEFAULT_STEPS:
            args.steps = 20
        if args.guidance == _DEFAULT_GUIDANCE:
            args.guidance = 3.5
        args.distill = False
    elif args.quality_preset == "reference":
        if args.steps == _DEFAULT_STEPS:
            args.steps = 30
        if args.guidance == _DEFAULT_GUIDANCE:
            args.guidance = 4.0
        args.distill = False

    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(name)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
        stream=sys.stderr,
    )
    log = logging.getLogger("longcat-smoke")

    host_data_dir = os.environ.get(
        "NEXUS_HOST_DATA_DIR", "D:/longcat_install"
    )
    os.environ["NEXUS_HOST_DATA_DIR"] = host_data_dir
    log.info("NEXUS_HOST_DATA_DIR=%s", host_data_dir)

    output_dir = Path(host_data_dir) / "smoke"
    output_dir.mkdir(parents=True, exist_ok=True)

    if "src" not in sys.path:
        sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "worker" / "src"))

    try:
        import torch
        log.info("torch=%s cuda=%s", torch.__version__, torch.cuda.is_available())
        if not torch.cuda.is_available():
            log.error("CUDA not available; smoke requires a GPU.")
            return 1
        log.info("device=%s vram=%.2f GiB", torch.cuda.get_device_name(0),
                 torch.cuda.get_device_properties(0).total_memory / 1024**3)
    except ImportError as e:
        log.error("torch import failed: %s", e)
        return 1

    try:
        from longcat_video_worker.pipeline_longcat import (
            LongCatRenderRequest,
            Scene,
            render,
        )
    except ImportError as e:
        log.error("worker import failed: %s", e)
        traceback.print_exc()
        return 1

    scenes_value = None
    if args.scenes_json:
        import json as _json

        scenes_path = Path(args.scenes_json)
        if not scenes_path.is_file():
            log.error("scenes JSON not found: %s", scenes_path)
            return 2
        with scenes_path.open("r", encoding="utf-8") as fh:
            raw = _json.load(fh)
        scenes_value = [
            Scene(
                prompt=item["prompt"],
                duration_seconds=float(item["duration_seconds"]),
                overlap_frames=int(item.get("overlap_frames", 13)),
                enhance_hf=item.get("enhance_hf"),
            )
            for item in raw
        ]
        log.info("loaded %d scenes from %s", len(scenes_value), scenes_path)

    if args.mode == "i2v" and not args.image:
        log.error("--mode i2v requires --image <path>")
        return 2
    if args.mode == "i2v" and not Path(args.image).is_file():
        log.error("image path does not exist: %s", args.image)
        return 2

    default_prompt = (
        "a black cat walks along a sunny stone path in a tranquil japanese garden, "
        "cinematic lighting, soft shadows"
        if args.mode == "t2v"
        else "the scene continues with gentle natural motion, cinematic camera drift"
    )
    request = LongCatRenderRequest(
        mode=args.mode,
        prompt=args.prompt or default_prompt,
        negative_prompt="blurry, low quality, distorted",
        image_path=args.image,
        height=args.height,
        width=args.width,
        num_frames=args.num_frames,
        num_inference_steps=args.steps,
        guidance_scale=args.guidance,
        use_distill=args.distill,
        seed=args.seed,
        max_sequence_length=256,
        offload_kv_cache=True,
        apply_refinement=args.refine,
        refinement_steps=args.refine_steps,
        refinement_guidance=args.refine_guidance,
        refinement_spatial_only=args.refine_spatial_only,
        target_frames=(
            int(round(args.target_seconds * 24))
            if args.target_seconds is not None
            else None
        ),
        continuation_overlap_frames=args.continuation_overlap,
        scenes=scenes_value,
    )
    log.info("request: %r", request)

    t0 = time.monotonic()
    try:
        out_path = render(
            request,
            output_dir=output_dir,
            host_data_dir=host_data_dir,
            offload_mode="partial",
            block_swap_count=args.swap,
        )
    except RuntimeError as e:
        msg = str(e)
        if "out of memory" in msg.lower() or "cuda" in msg.lower():
            log.error("VRAM OOM: %s", e)
            return 2
        log.error("RuntimeError: %s", e)
        traceback.print_exc()
        return 1
    except FileNotFoundError as e:
        log.error("missing weights: %s", e)
        return 3
    except Exception as e:  # noqa: BLE001
        log.error("unexpected exception: %s", e)
        traceback.print_exc()
        return 1

    dt = time.monotonic() - t0
    size_mb = out_path.stat().st_size / 1024 / 1024 if out_path.exists() else 0
    log.info("DONE: %s (%.2f MB, %.1f s)", out_path, size_mb, dt)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
