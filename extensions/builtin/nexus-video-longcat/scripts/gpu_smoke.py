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

import logging
import os
import sys
import time
import traceback
from pathlib import Path


def main() -> int:
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
            render,
        )
    except ImportError as e:
        log.error("worker import failed: %s", e)
        traceback.print_exc()
        return 1

    request = LongCatRenderRequest(
        mode="t2v",
        prompt="a black cat walks along a sunny stone path in a tranquil japanese garden, cinematic lighting, soft shadows",
        negative_prompt="blurry, low quality, distorted",
        height=480,
        width=832,
        num_frames=49,
        num_inference_steps=12,
        guidance_scale=1.0,
        use_distill=True,
        seed=42,
        max_sequence_length=256,
        offload_kv_cache=True,
    )
    log.info("request: %r", request)

    t0 = time.monotonic()
    try:
        out_path = render(
            request,
            output_dir=output_dir,
            host_data_dir=host_data_dir,
            offload_mode="partial",
            block_swap_count=46,
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
