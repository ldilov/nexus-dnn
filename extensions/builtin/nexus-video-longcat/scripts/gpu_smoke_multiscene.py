"""Real-GPU smoke for multiprompt multiscene render.

Drives the `render()` entry point with a fixed two-scene storyboard
(different prompts, same anchor) and asserts:
  - render completes within wall-time budget
  - peak VRAM stays under budget
  - output MP4 frame count matches sum(scene.duration_seconds * 24)
  - in `--repro` mode, two back-to-back runs produce byte-identical output

The scene composition is deterministic on purpose — fixed seed, fixed
prompts, fixed AdaIN factor — so the repro check is a real assertion
against the per-scene seed plumbing (`_build_scene_generator` with the
cuda.sync fence on line 1331 of pipeline_longcat.py).

Usage:
    cd extensions/builtin/nexus-video-longcat/worker
    uv run --extra diffusers python ../scripts/gpu_smoke_multiscene.py
    uv run --extra diffusers python ../scripts/gpu_smoke_multiscene.py --repro

Exit codes:
    0  ok
    1  unexpected exception
    2  VRAM OOM or budget breach
    3  missing weights
    4  contract assertion failed (frame count, repro mismatch, wall exceeded)
"""

from __future__ import annotations

import argparse
import hashlib
import logging
import os
import sys
import time
import traceback
from pathlib import Path


_DEFAULT_WALL_BUDGET_S = 240.0
_DEFAULT_VRAM_BUDGET_GIB = 14.0
_DEFAULT_SEED = 1357911
_DEFAULT_HEIGHT = 480
_DEFAULT_WIDTH = 832
_FPS = 24
_OVERLAP_FRAMES = 13
_ADAIN_FACTOR = 0.2

_SCENES = [
    {
        "prompt": "a sleek black cat steps onto a sunlit stone path in a tranquil japanese garden, soft morning light, slow camera dolly forward",
        "duration_seconds": 4.0,
    },
    {
        "prompt": "the same black cat reaches a koi pond at the end of the path, looks down at the rippling water, gentle cinematic pan",
        "duration_seconds": 4.0,
    },
]


def _file_sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _build_request(scene_factory, request_cls, seed: int, height: int, width: int):
    scenes = [
        scene_factory(
            prompt=sc["prompt"],
            duration_seconds=sc["duration_seconds"],
            overlap_frames=_OVERLAP_FRAMES,
            adain_factor=_ADAIN_FACTOR,
        )
        for sc in _SCENES
    ]
    return request_cls(
        mode="t2v",
        prompt=_SCENES[0]["prompt"],
        negative_prompt="blurry, low quality, distorted",
        height=height,
        width=width,
        num_frames=49,
        num_inference_steps=16,
        guidance_scale=1.0,
        use_distill=True,
        seed=seed,
        offload_kv_cache=True,
        offload_mode="partial",
        block_swap_count=46,
        scenes=scenes,
        adain_factor=_ADAIN_FACTOR,
        continuation_overlap_frames=_OVERLAP_FRAMES,
    )


def _probe_frame_count(mp4_path: Path) -> int:
    import subprocess

    cmd = [
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-count_frames",
        "-show_entries", "stream=nb_read_frames",
        "-of", "default=nokey=1:noprint_wrappers=1",
        str(mp4_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return int(result.stdout.strip())


def _expected_frames(scenes: list[dict], fps: int, overlap: int) -> int:
    per_scene = [int(round(sc["duration_seconds"] * fps)) for sc in scenes]
    total = per_scene[0]
    for n in per_scene[1:]:
        total += n - overlap
    return total


def _run_one(args, log, output_dir: Path, host_data_dir: str, suffix: str) -> tuple[Path, float, float]:
    import torch

    from longcat_video_worker.pipeline_longcat import (
        LongCatRenderRequest,
        Scene,
        render,
    )

    request = _build_request(Scene, LongCatRenderRequest, args.seed, args.height, args.width)
    torch.cuda.reset_peak_memory_stats()
    t0 = time.monotonic()
    out_path = render(
        request,
        output_dir=output_dir,
        host_data_dir=host_data_dir,
        offload_mode="partial",
        block_swap_count=46,
        strict_scene_errors=True,
    )
    dt = time.monotonic() - t0
    peak_gib = torch.cuda.max_memory_allocated() / 1024**3
    log.info("run[%s]: %s (%.2f s, peak %.2f GiB)", suffix, out_path, dt, peak_gib)
    return out_path, dt, peak_gib


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", type=int, default=_DEFAULT_SEED)
    parser.add_argument("--height", type=int, default=_DEFAULT_HEIGHT)
    parser.add_argument("--width", type=int, default=_DEFAULT_WIDTH)
    parser.add_argument(
        "--repro",
        action="store_true",
        help="Run twice and assert byte-identical MP4 output (reproducibility check)",
    )
    parser.add_argument(
        "--wall-budget",
        type=float,
        default=_DEFAULT_WALL_BUDGET_S,
        help="Per-run wall-time budget in seconds (default 240s for 8s @ 480p distill on RTX 5070 Ti)",
    )
    parser.add_argument(
        "--vram-budget",
        type=float,
        default=_DEFAULT_VRAM_BUDGET_GIB,
        help="Peak-VRAM budget in GiB (default 14.0 for 16 GiB cards)",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(name)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
        stream=sys.stderr,
    )
    log = logging.getLogger("longcat-multiscene-smoke")

    host_data_dir = os.environ.get("NEXUS_HOST_DATA_DIR", "D:/longcat_install")
    os.environ["NEXUS_HOST_DATA_DIR"] = host_data_dir
    output_dir = Path(host_data_dir) / "smoke_multiscene"
    output_dir.mkdir(parents=True, exist_ok=True)

    if "src" not in sys.path:
        sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "worker" / "src"))

    try:
        import torch  # noqa: F401
        if not torch.cuda.is_available():
            log.error("CUDA not available; smoke requires a GPU.")
            return 1
        log.info(
            "device=%s vram=%.2f GiB",
            torch.cuda.get_device_name(0),
            torch.cuda.get_device_properties(0).total_memory / 1024**3,
        )
    except ImportError as e:
        log.error("torch import failed: %s", e)
        return 1

    expected = _expected_frames(_SCENES, _FPS, _OVERLAP_FRAMES)
    log.info(
        "config: scenes=%d seed=%d size=%dx%d expected_frames=%d wall_budget=%.0fs vram_budget=%.1fGiB repro=%s",
        len(_SCENES), args.seed, args.width, args.height, expected,
        args.wall_budget, args.vram_budget, args.repro,
    )

    runs: list[tuple[Path, float, float]] = []
    try:
        runs.append(_run_one(args, log, output_dir, host_data_dir, suffix="a"))
        if args.repro:
            runs.append(_run_one(args, log, output_dir, host_data_dir, suffix="b"))
    except RuntimeError as e:
        msg = str(e)
        if "out of memory" in msg.lower():
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

    for suffix, (out_path, dt, peak) in zip(("a", "b"), runs):
        if dt > args.wall_budget:
            log.error("run[%s] wall=%.1fs exceeded budget=%.1fs", suffix, dt, args.wall_budget)
            return 4
        if peak > args.vram_budget:
            log.error("run[%s] peak VRAM=%.2f GiB exceeded budget=%.2f GiB", suffix, peak, args.vram_budget)
            return 2

    try:
        actual = _probe_frame_count(runs[0][0])
    except Exception as e:  # noqa: BLE001
        log.error("ffprobe frame-count failed: %s", e)
        return 4
    if actual != expected:
        log.error("frame count mismatch: expected=%d actual=%d", expected, actual)
        return 4
    log.info("frame count OK: %d", actual)

    if args.repro:
        h_a = _file_sha256(runs[0][0])
        h_b = _file_sha256(runs[1][0])
        log.info("sha256[a]=%s", h_a)
        log.info("sha256[b]=%s", h_b)
        if h_a != h_b:
            log.error("REPRODUCIBILITY FAIL: byte-level diff between identical-seed runs")
            return 4
        log.info("repro OK: byte-identical across two runs at seed=%d", args.seed)

    log.info("PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
