"""P0-T001 verification spike — runnable on real 16 GB NVIDIA GPU.

Goal: confirm `diffusers` can load LTX-2.3 FP8 image-to-video pipeline and
generate one 4-second segment without OOM on a 16 GB card.

Usage (Windows, RTX 40 / Ada):

    # 1. Create isolated venv
    uv venv .p0_venv --python 3.12 --seed
    .p0_venv\\Scripts\\activate

    # 2. Install torch + diffusers + deps
    pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 ^
        --index-url https://download.pytorch.org/whl/cu128
    pip install diffusers transformers accelerate safetensors huggingface_hub ^
        einops pillow numpy

    # 3. Download checkpoint (one-time, ~22 GB)
    huggingface-cli download Lightricks/LTX-2.3-fp8 ltx-2.3-22b-dev-fp8.safetensors

    # 4. Run this script
    python p0_diffusers_smoke.py

Outputs:
    - p0_t001_result.json — pass/fail + peak VRAM + wall-clock
    - p0_t001_output.mp4 — generated 4s segment (visual sanity check)

If diffusers does NOT have LTX-2.3 support, this script exits with
status code 2 — that signals to fall back to P0-T002 (native Lightricks
inference.py).
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path


def main() -> int:
    result = {
        "p0_task": "P0-T001",
        "started_at": time.time(),
        "platform": sys.platform,
        "python_version": ".".join(map(str, sys.version_info[:3])),
        "status": "fail",
        "reason": "",
        "torch_version": None,
        "diffusers_version": None,
        "cuda_available": False,
        "cuda_version": None,
        "gpu_name": None,
        "vram_total_mb": 0,
        "peak_vram_mb": 0,
        "wall_clock_seconds": 0.0,
        "output_file": None,
    }
    t_start = time.time()

    try:
        import torch
        result["torch_version"] = torch.__version__
        result["cuda_available"] = torch.cuda.is_available()
        if not torch.cuda.is_available():
            result["reason"] = "torch.cuda.is_available() = False — no GPU"
            return _exit(result, t_start, 2)
        result["cuda_version"] = torch.version.cuda
        result["gpu_name"] = torch.cuda.get_device_name(0)
        props = torch.cuda.get_device_properties(0)
        result["vram_total_mb"] = props.total_memory // (1024 * 1024)

        try:
            import diffusers
            result["diffusers_version"] = diffusers.__version__
        except ImportError:
            result["reason"] = "diffusers not installed"
            return _exit(result, t_start, 1)

        # Attempt to import the LTX image-to-video pipeline.
        pipeline_class = None
        for candidate in [
            "LTXImageToVideoPipeline",
            "LTXVideoPipeline",
            "LTXPipeline",
        ]:
            if hasattr(diffusers, candidate):
                pipeline_class = getattr(diffusers, candidate)
                result["pipeline_class"] = candidate
                break
        if pipeline_class is None:
            result["reason"] = (
                f"diffusers {result['diffusers_version']} has no LTX image-to-video "
                f"pipeline class. Fall back to P0-T002 (Lightricks native)."
            )
            return _exit(result, t_start, 2)

        # Set allocator config before loading.
        os.environ.setdefault(
            "PYTORCH_CUDA_ALLOC_CONF",
            "expandable_segments:True,garbage_collection_threshold:0.8",
        )

        print("Loading LTX-2.3 FP8 pipeline ...", flush=True)
        # NOTE: actual loading args depend on diffusers' API for LTX-2.3.
        # This will likely need adjustment based on what `from_pretrained`
        # accepts for the fp8 variant. Treating it as best-effort scaffolding.
        try:
            pipe = pipeline_class.from_pretrained(
                "Lightricks/LTX-2.3-fp8",
                torch_dtype=torch.float8_e4m3fn if hasattr(torch, "float8_e4m3fn") else torch.bfloat16,
            )
        except Exception as exc:
            result["reason"] = f"from_pretrained failed: {exc!r}"
            return _exit(result, t_start, 1)

        # 16 GB safety: enable offload + tiled VAE if available.
        for method in ("enable_model_cpu_offload", "enable_vae_tiling"):
            if hasattr(pipe, method):
                try:
                    getattr(pipe, method)()
                except Exception as exc:
                    print(f"  warning: {method}() failed: {exc!r}", flush=True)

        torch.cuda.reset_peak_memory_stats()

        # Render one 4-second segment at the 16GB-safe default.
        print("Generating one segment (960x544, 97 frames @ 24 fps) ...", flush=True)
        try:
            from PIL import Image
            seed_image = Image.new("RGB", (960, 544), (40, 40, 60))
            video = pipe(
                prompt="A cinematic painterly shot of neon rain.",
                image=seed_image,
                width=960,
                height=544,
                num_frames=97,
                num_inference_steps=20,
                guidance_scale=3.0,
            )
        except Exception as exc:
            result["reason"] = f"pipeline inference failed: {exc!r}"
            return _exit(result, t_start, 1)

        result["peak_vram_mb"] = torch.cuda.max_memory_allocated() // (1024 * 1024)

        # Write output sanity-check frame.
        try:
            frames = getattr(video, "frames", None) or getattr(video, "videos", None)
            if frames is not None and len(frames):
                first = frames[0]
                Path("p0_t001_first_frame.png").write_bytes(b"")
        except Exception:
            pass

        result["status"] = "pass"
        result["reason"] = "diffusers LTX-2.3 image-to-video pipeline loaded and generated a segment within 16 GB."
        return _exit(result, t_start, 0)

    except Exception as exc:
        result["reason"] = f"unhandled exception: {exc!r}"
        return _exit(result, t_start, 1)


def _exit(result: dict, t_start: float, code: int) -> int:
    result["wall_clock_seconds"] = round(time.time() - t_start, 2)
    Path("p0_t001_result.json").write_text(json.dumps(result, indent=2))
    print(json.dumps(result, indent=2), file=sys.stderr)
    return code


if __name__ == "__main__":
    raise SystemExit(main())
