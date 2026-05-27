"""Real-GPU smoke for soft-transition boundary handling.

Renders a 3-scene storyboard twice at the SAME seed: once with all
``hard_cut`` transitions (legacy hard-pin path) and once with a single
``soft`` transition between scene 0 and scene 1. After each render the
rendered MP4 is decoded and the ``transition_break_score`` is computed
at every boundary index. The smoke asserts that the soft-transition
run produces a STRICTLY LOWER break_score at the soft boundary than
the corresponding boundary in the hard-pin run.

Telemetry: each run's boundary scores + transition descriptors are
merged into the existing render_report.json under that run's
output directory.

Usage:
    cd extensions/builtin/nexus-video-longcat/worker
    uv run --extra diffusers python ../scripts/gpu_smoke_boundary_soft_pin.py

Exit codes:
    0  ok (soft boundary score < hard boundary score)
    1  unexpected exception
    2  VRAM OOM or budget breach
    3  missing weights
    4  contract assertion failed (frame count, wall exceeded, soft >= hard)
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import subprocess
import sys
import time
import traceback
from pathlib import Path

_DEFAULT_WALL_BUDGET_S = 600.0
_DEFAULT_VRAM_BUDGET_GIB = 15.0
_DEFAULT_SEED = 1357911
_DEFAULT_HEIGHT = 480
_DEFAULT_WIDTH = 832
_FPS = 24
_OVERLAP_FRAMES = 13
_ADAIN_FACTOR = 0.2
_BOUNDARY_JITTER_PX = 0.35
_BOUNDARY_GRAIN_SIGMA = 0.02

_SCENES = [
    {
        "prompt": "a black cat steps onto a sunlit stone path in a tranquil japanese garden, soft morning light, slow camera dolly forward",
        "duration_seconds": 3.0,
    },
    {
        "prompt": "the same black cat reaches a koi pond at the end of the path, gentle cinematic pan toward the water",
        "duration_seconds": 3.0,
    },
    {
        "prompt": "the same black cat looks down at the rippling koi pond, slow zoom on its face, dappled light reflecting off the water",
        "duration_seconds": 3.0,
    },
]

_BRIDGE_TEXT = "the camera continues forward as the stone path meets the koi pond"


def _expected_frames(scenes: list[dict], fps: int, overlap: int) -> int:
    per_scene = [int(round(sc["duration_seconds"] * fps)) for sc in scenes]
    total = per_scene[0]
    for n in per_scene[1:]:
        total += n - overlap
    return total


def _probe_frame_count(mp4_path: Path) -> int:
    cmd = [
        "ffprobe", "-v", "error",
        "-select_streams", "v:0",
        "-count_frames",
        "-show_entries", "stream=nb_read_frames",
        "-of", "default=nokey=1:noprint_wrappers=1",
        str(mp4_path),
    ]
    return int(subprocess.run(cmd, capture_output=True, text=True, check=True).stdout.strip())


def _decode_mp4_to_array(mp4_path: Path, height: int, width: int):
    import numpy as np

    cmd = [
        "ffmpeg", "-v", "error",
        "-i", str(mp4_path),
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-",
    ]
    result = subprocess.run(cmd, capture_output=True, check=True)
    raw = result.stdout
    bytes_per_frame = height * width * 3
    n_frames = len(raw) // bytes_per_frame
    arr = np.frombuffer(raw, dtype=np.uint8)
    return arr[: n_frames * bytes_per_frame].reshape(n_frames, height, width, 3).copy()


def _build_transitions(use_soft: bool) -> list:
    from longcat_video_worker.pipeline_longcat import Transition

    return [
        Transition(
            from_scene=0,
            to_scene=1,
            type="soft" if use_soft else "hard_cut",
            bridge_text=_BRIDGE_TEXT if use_soft else None,
            ramp_frames=8,
        ),
        Transition(from_scene=1, to_scene=2, type="hard_cut"),
    ]


def _build_request(seed: int, height: int, width: int, use_soft: bool):
    from longcat_video_worker.pipeline_longcat import (
        LongCatRenderRequest,
        Scene,
    )

    scenes = [
        Scene(
            prompt=sc["prompt"],
            duration_seconds=sc["duration_seconds"],
            overlap_frames=_OVERLAP_FRAMES,
            adain_factor=_ADAIN_FACTOR,
        )
        for sc in _SCENES
    ]
    return LongCatRenderRequest(
        mode="t2v",
        prompt=_SCENES[0]["prompt"],
        negative_prompt="blurry, low quality, distorted",
        height=height,
        width=width,
        num_frames=int(round(_SCENES[0]["duration_seconds"] * _FPS)),
        num_inference_steps=16,
        guidance_scale=1.0,
        use_distill=True,
        seed=seed,
        offload_kv_cache=True,
        offload_mode="partial",
        block_swap_count=46,
        scenes=scenes,
        transitions=_build_transitions(use_soft),
        adain_factor=_ADAIN_FACTOR,
        continuation_overlap_frames=_OVERLAP_FRAMES,
        boundary_jitter_px=_BOUNDARY_JITTER_PX if use_soft else 0.0,
        boundary_grain_sigma=_BOUNDARY_GRAIN_SIGMA if use_soft else 0.0,
        image_cond_noise_scale=0.15,
    )


def _run_one(args, log, output_dir, host_data_dir, suffix, use_soft):
    import torch

    from longcat_video_worker.pipeline_longcat import render

    request = _build_request(args.seed, args.height, args.width, use_soft)
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
    log.info("run[%s soft=%s]: %s (%.2f s, peak %.2f GiB)", suffix, use_soft, out_path, dt, peak_gib)
    return out_path, dt, peak_gib


def _score_run(out_path: Path, args, log) -> dict:
    from longcat_video_worker.boundary_telemetry import (
        boundary_frame_indices,
        compute_boundary_break_scores,
        merge_scores_into_report,
        summarize_scores,
    )

    per_scene_num_frames = [int(round(sc["duration_seconds"] * _FPS)) for sc in _SCENES]
    per_scene_overlap = [0] + [_OVERLAP_FRAMES] * (len(_SCENES) - 1)
    boundaries = boundary_frame_indices(per_scene_num_frames, per_scene_overlap)
    frames = _decode_mp4_to_array(out_path, args.height, args.width)
    scores = compute_boundary_break_scores(frames, boundaries)
    summary = summarize_scores(scores)
    log.info("scores[%s]: boundaries=%s summary=%s", out_path.name, scores, summary)
    report_path = out_path.with_suffix("").parent / f"{out_path.stem}.render_report.json"
    merged = merge_scores_into_report(report_path, scores)
    log.info("scores merged into %s: %s", report_path, merged)
    return {"boundaries": boundaries, "scores": scores, "summary": summary}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", type=int, default=_DEFAULT_SEED)
    parser.add_argument("--height", type=int, default=_DEFAULT_HEIGHT)
    parser.add_argument("--width", type=int, default=_DEFAULT_WIDTH)
    parser.add_argument("--wall-budget", type=float, default=_DEFAULT_WALL_BUDGET_S)
    parser.add_argument("--vram-budget", type=float, default=_DEFAULT_VRAM_BUDGET_GIB)
    parser.add_argument(
        "--skip-assert",
        action="store_true",
        help="Compute and merge scores but skip the soft<hard assertion (operator debug mode)",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(name)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
        stream=sys.stderr,
    )
    log = logging.getLogger("longcat-soft-pin-smoke")

    host_data_dir = os.environ.get("NEXUS_HOST_DATA_DIR", "D:/longcat_install")
    os.environ["NEXUS_HOST_DATA_DIR"] = host_data_dir
    output_dir = Path(host_data_dir) / "smoke_boundary_soft_pin"
    output_dir.mkdir(parents=True, exist_ok=True)

    if "src" not in sys.path:
        sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "worker" / "src"))

    try:
        import torch
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
        "config: scenes=%d seed=%d size=%dx%d expected_frames=%d wall_budget=%.0fs vram_budget=%.1fGiB",
        len(_SCENES), args.seed, args.width, args.height, expected,
        args.wall_budget, args.vram_budget,
    )

    runs: list[tuple[str, Path, float, float, bool]] = []
    try:
        path_hard, dt_hard, peak_hard = _run_one(args, log, output_dir, host_data_dir, "hard", use_soft=False)
        runs.append(("hard", path_hard, dt_hard, peak_hard, False))
        path_soft, dt_soft, peak_soft = _run_one(args, log, output_dir, host_data_dir, "soft", use_soft=True)
        runs.append(("soft", path_soft, dt_soft, peak_soft, True))
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

    for label, out_path, dt, peak, _use_soft in runs:
        if dt > args.wall_budget:
            log.error("run[%s] wall=%.1fs exceeded budget=%.1fs", label, dt, args.wall_budget)
            return 4
        if peak > args.vram_budget:
            log.error("run[%s] peak VRAM=%.2f GiB exceeded budget=%.2f GiB", label, peak, args.vram_budget)
            return 2

    for label, out_path, _dt, _peak, _use_soft in runs:
        try:
            actual = _probe_frame_count(out_path)
        except subprocess.CalledProcessError as e:
            log.error("ffprobe failed for %s: %s", out_path, e)
            return 4
        if actual != expected:
            log.error("run[%s] frame count mismatch: expected=%d actual=%d", label, expected, actual)
            return 4

    score_results: dict[str, dict] = {}
    for label, out_path, _dt, _peak, _use_soft in runs:
        try:
            score_results[label] = _score_run(out_path, args, log)
        except subprocess.CalledProcessError as e:
            log.error("ffmpeg decode failed for %s: %s", out_path, e)
            return 4
        except Exception as e:  # noqa: BLE001
            log.error("scoring failed for %s: %s", out_path, e)
            traceback.print_exc()
            return 1

    if args.skip_assert:
        log.info("PASS (skip-assert)")
        return 0

    # The soft boundary is the FIRST entry in boundary_frame_indices for both
    # runs (we only flip transition[0] to soft). Compare break_score at that
    # boundary across the two runs.
    if not score_results["hard"]["scores"] or not score_results["soft"]["scores"]:
        log.error("no boundary scores produced; cannot assert")
        return 4
    hard_score = score_results["hard"]["scores"][0]["break_score"]
    soft_score = score_results["soft"]["scores"][0]["break_score"]
    log.info("boundary[0] break_score: hard=%.4f soft=%.4f", hard_score, soft_score)
    if not soft_score < hard_score:
        log.error(
            "CONTRACT FAIL: soft break_score=%.4f is NOT < hard=%.4f",
            soft_score, hard_score,
        )
        return 4
    log.info("PASS: soft=%.4f < hard=%.4f", soft_score, hard_score)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
