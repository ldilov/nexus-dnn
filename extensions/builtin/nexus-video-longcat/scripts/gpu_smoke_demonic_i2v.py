"""Operator smoke: LLM-planned multiscene i2v demonic possession render.

End-to-end pipeline exercise:
  Phase 1 — plan.expand with a long thematic prompt; uses HttpLeaseClient
            via NEXUS_HOST_PORT when set (else deterministic fallback).
  Phase 2 — render() with mode=i2v + image_path + scenes derived from
            Phase 1 output. 2 scenes by default, distill profile, RTX
            5070 Ti budgets.

Emits a JSON report capturing both phases (latencies, compiler,
warnings, output MP4 metadata, peak VRAM, SHA-256). Report goes to
stdout unless --report-out is set.

Usage:
    cd extensions/builtin/nexus-video-longcat/worker
    uv run --extra diffusers python ../scripts/gpu_smoke_demonic_i2v.py \\
        --image D:/inputs/nun.jpg

    # Dry-run (skip GPU render, exercise Phase 1 only):
    uv run python ../scripts/gpu_smoke_demonic_i2v.py --image any.jpg --dry-run

Exit codes:
    0  ok
    1  unexpected exception
    2  VRAM OOM or budget breach
    3  missing weights or image
    4  contract assertion failed (plan empty, frame count, wall exceeded)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import sys
import time
import traceback
from dataclasses import asdict
from pathlib import Path
from typing import Any


_DEFAULT_WALL_BUDGET_S = 360.0
_DEFAULT_VRAM_BUDGET_GIB = 14.5
_DEFAULT_SEED = 666
_DEFAULT_HEIGHT = 480
_DEFAULT_WIDTH = 832
_FPS = 24

_DEFAULT_PROMPT = (
    "A young nun in a black-and-white habit kneels alone in a candlelit cathedral. "
    "Her body convulses as an unseen presence wrenches her spine backward — head "
    "tilting at an unnatural angle, eyes rolling white. Wax-yellow candle flames "
    "snap sideways in a wind that should not exist. The marble floor cracks "
    "beneath her knees in a spreading sigil. Stained glass windows behind her bleed "
    "shadow inward as the chapel pews vibrate then splinter outward in a slow "
    "concussive ring. Camera pushes in slowly through the rising dust, holding on "
    "the contorted face as her mouth opens far too wide and a chorus of low voices "
    "rasps a Latin invocation. Cinematic dread, volumetric god-rays through smoke, "
    "deep teal shadows, blood-orange candle highlights, 35mm anamorphic, slow "
    "horror pacing."
)


def _file_sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _probe_frame_count(mp4_path: Path) -> int:
    import subprocess
    cmd = [
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-count_frames", "-show_entries", "stream=nb_read_frames",
        "-of", "default=nokey=1:noprint_wrappers=1", str(mp4_path),
    ]
    out = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return int(out.stdout.strip())


def _expected_frame_count(scenes_dicts: list[dict[str, Any]], overlap: int) -> int:
    per = [int(round(float(s.get("per_scene_generated_seconds", s.get("duration_seconds", 4.0))) * _FPS)) for s in scenes_dicts]
    if not per:
        return 0
    total = per[0]
    for n in per[1:]:
        total += n - overlap
    return total


def _scene_from_dict(raw: dict[str, Any], default_overlap: int):
    from longcat_video_worker.pipeline_longcat import Scene
    duration = raw.get("per_scene_generated_seconds")
    if duration is None:
        duration = raw.get("duration_seconds", 4.0)
    duration = float(duration)
    return Scene(
        prompt=str(raw["prompt"]),
        duration_seconds=duration,
        overlap_frames=int(raw.get("overlap_frames", default_overlap)),
        adain_factor=raw.get("adain_factor"),
        per_scene_generated_seconds=duration,
        motion_intensity=str(raw.get("motion_intensity", "dynamic")),
    )


def _run_plan_expand(args, log) -> dict[str, Any]:
    from longcat_video_worker.plan_llm import (
        LeaseUnavailableError,
        default_lease_client,
        expand_prompt,
    )

    lease_client = default_lease_client() if args.use_llm else None
    lease_class = type(lease_client).__name__ if lease_client else "None"
    log.info("phase1: lease_client=%s use_llm=%s", lease_class, args.use_llm)

    t0 = time.monotonic()
    try:
        result = expand_prompt(
            prompt=args.prompt,
            duration_seconds=float(args.scene_seconds * args.scenes),
            scene_count=args.scenes,
            style_hint=args.style_hint,
            seed=args.seed,
            use_llm=args.use_llm,
            lease_client=lease_client,
        )
    except LeaseUnavailableError as e:
        log.warning("phase1: lease unavailable: %s", e)
        raise
    dt = time.monotonic() - t0

    payload = result.to_dict()
    payload["latency_s"] = round(dt, 3)
    payload["lease_client_class"] = lease_class
    log.info(
        "phase1: compiler=%s scenes=%d warnings=%d latency=%.2fs",
        payload.get("compiler"), len(payload.get("scenes", [])),
        len(payload.get("warnings", [])), dt,
    )
    return payload


def _run_render(args, log, scenes_dicts: list[dict[str, Any]], output_dir: Path, host_data_dir: str) -> dict[str, Any]:
    import torch
    from longcat_video_worker.pipeline_longcat import LongCatRenderRequest, render

    scenes = [_scene_from_dict(s, default_overlap=args.continuation_overlap) for s in scenes_dicts]
    request = LongCatRenderRequest(
        mode="i2v",
        prompt=scenes[0].prompt,
        negative_prompt="blurry, low quality, distorted, deformed, watermark, text",
        image_path=str(args.image),
        height=args.height,
        width=args.width,
        num_frames=int(round(args.scene_seconds * _FPS)) + 1,
        num_inference_steps=16,
        guidance_scale=1.0,
        use_distill=True,
        seed=args.seed,
        offload_kv_cache=True,
        offload_mode="partial",
        block_swap_count=46,
        scenes=scenes,
        adain_factor=0.2,
        continuation_overlap_frames=args.continuation_overlap,
    )

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

    try:
        actual_frames = _probe_frame_count(out_path)
    except Exception as e:  # noqa: BLE001
        log.warning("ffprobe frame count failed: %s", e)
        actual_frames = -1

    sha = _file_sha256(out_path)
    size_mb = out_path.stat().st_size / 1024 / 1024
    log.info("phase2: wall=%.1fs peak=%.2fGiB frames=%d size=%.2fMB", dt, peak_gib, actual_frames, size_mb)

    return {
        "wall_s": round(dt, 2),
        "peak_vram_gib": round(peak_gib, 3),
        "output_path": str(out_path),
        "output_size_mb": round(size_mb, 3),
        "output_sha256": sha,
        "actual_frame_count": actual_frames,
        "expected_frame_count": _expected_frame_count(scenes_dicts, args.continuation_overlap),
        "scenes_rendered": [
            {"prompt": s.prompt[:120], "duration_s": s.duration_seconds, "adain_factor": s.adain_factor}
            for s in scenes
        ],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--image", required=True, help="i2v conditioning image path")
    parser.add_argument("--prompt", default=_DEFAULT_PROMPT, help="planner input (long thematic prompt)")
    parser.add_argument("--style-hint", default="cinematic horror, slow dread, candlelit chiaroscuro")
    parser.add_argument("--scenes", type=int, default=2)
    parser.add_argument("--scene-seconds", type=float, default=4.0)
    parser.add_argument("--seed", type=int, default=_DEFAULT_SEED)
    parser.add_argument("--height", type=int, default=_DEFAULT_HEIGHT)
    parser.add_argument("--width", type=int, default=_DEFAULT_WIDTH)
    parser.add_argument("--continuation-overlap", type=int, default=13)
    parser.add_argument("--use-llm", action="store_true", default=True,
                        help="enable HttpLeaseClient via NEXUS_HOST_PORT (default on; graceful fallback if unavailable)")
    parser.add_argument("--no-llm", dest="use_llm", action="store_false")
    parser.add_argument("--dry-run", action="store_true", help="Phase 1 only; skip GPU render")
    parser.add_argument("--wall-budget", type=float, default=_DEFAULT_WALL_BUDGET_S)
    parser.add_argument("--vram-budget", type=float, default=_DEFAULT_VRAM_BUDGET_GIB)
    parser.add_argument("--report-out", default=None, help="write JSON report here; default stdout")
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(name)s %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
        stream=sys.stderr,
    )
    log = logging.getLogger("longcat-demonic-smoke")

    host_data_dir = os.environ.get("NEXUS_HOST_DATA_DIR", "D:/longcat_install")
    os.environ["NEXUS_HOST_DATA_DIR"] = host_data_dir
    output_dir = Path(host_data_dir) / "smoke_demonic"
    output_dir.mkdir(parents=True, exist_ok=True)

    if "src" not in sys.path:
        sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "worker" / "src"))

    image_path = Path(args.image)
    if not image_path.is_file() and not args.dry_run:
        log.error("image not found: %s", image_path)
        return 3

    report: dict[str, Any] = {
        "schema": "longcat.smoke.demonic_i2v.v1",
        "started_at": time.time(),
        "config": {
            "image": str(image_path),
            "prompt_chars": len(args.prompt),
            "scenes_requested": args.scenes,
            "scene_seconds": args.scene_seconds,
            "seed": args.seed,
            "use_llm": args.use_llm,
            "dry_run": args.dry_run,
            "size": f"{args.width}x{args.height}",
            "nexus_host_port": os.environ.get("NEXUS_HOST_PORT"),
        },
        "phase1_plan_expand": None,
        "phase2_render": None,
        "asserts": {},
        "verdict": "unknown",
    }

    # ---- Phase 1 ---------------------------------------------------------
    try:
        phase1 = _run_plan_expand(args, log)
    except Exception as e:  # noqa: BLE001
        log.error("phase1 failed: %s", e)
        traceback.print_exc()
        report["phase1_plan_expand"] = {"error": str(e), "type": type(e).__name__}
        report["verdict"] = "fail_phase1"
        _emit_report(args, report)
        return 1

    report["phase1_plan_expand"] = phase1
    scenes_dicts = phase1.get("scenes") or []
    report["asserts"]["plan_returned_scenes"] = len(scenes_dicts) >= args.scenes
    report["asserts"]["plan_compiler_valid"] = phase1.get("compiler") in {"llm", "llm_fallback_deterministic", "deterministic"}

    if len(scenes_dicts) < args.scenes:
        log.error("phase1 returned %d scenes; expected >= %d", len(scenes_dicts), args.scenes)
        report["verdict"] = "fail_plan_short"
        _emit_report(args, report)
        return 4

    if args.dry_run:
        log.info("dry-run: skipping Phase 2")
        report["verdict"] = "pass_dry_run"
        _emit_report(args, report)
        return 0

    # ---- Phase 2 ---------------------------------------------------------
    try:
        import torch  # noqa: F401
        if not torch.cuda.is_available():
            log.error("CUDA not available; phase 2 requires a GPU")
            report["verdict"] = "fail_no_cuda"
            _emit_report(args, report)
            return 1
        report["device"] = {
            "name": torch.cuda.get_device_name(0),
            "total_vram_gib": round(torch.cuda.get_device_properties(0).total_memory / 1024**3, 2),
        }
    except ImportError as e:
        log.error("torch import failed: %s", e)
        report["verdict"] = "fail_no_torch"
        _emit_report(args, report)
        return 1

    try:
        phase2 = _run_render(args, log, scenes_dicts, output_dir, host_data_dir)
    except RuntimeError as e:
        msg = str(e)
        if "out of memory" in msg.lower():
            log.error("VRAM OOM: %s", e)
            report["verdict"] = "fail_oom"
            report["phase2_render"] = {"error": str(e), "type": "OOM"}
            _emit_report(args, report)
            return 2
        log.error("RuntimeError: %s", e)
        traceback.print_exc()
        report["phase2_render"] = {"error": str(e), "type": "RuntimeError"}
        report["verdict"] = "fail_runtime"
        _emit_report(args, report)
        return 1
    except FileNotFoundError as e:
        log.error("missing weights: %s", e)
        report["phase2_render"] = {"error": str(e), "type": "FileNotFoundError"}
        report["verdict"] = "fail_weights"
        _emit_report(args, report)
        return 3
    except Exception as e:  # noqa: BLE001
        log.error("unexpected: %s", e)
        traceback.print_exc()
        report["phase2_render"] = {"error": str(e), "type": type(e).__name__}
        report["verdict"] = "fail_unexpected"
        _emit_report(args, report)
        return 1

    report["phase2_render"] = phase2
    report["asserts"]["wall_within_budget"] = phase2["wall_s"] <= args.wall_budget
    report["asserts"]["vram_within_budget"] = phase2["peak_vram_gib"] <= args.vram_budget
    report["asserts"]["output_nonempty"] = phase2["output_size_mb"] > 0.05
    report["asserts"]["frame_count_matches"] = (
        phase2["actual_frame_count"] >= 0
        and abs(phase2["actual_frame_count"] - phase2["expected_frame_count"]) <= 2
    )

    all_pass = all(report["asserts"].values())
    report["verdict"] = "pass" if all_pass else "fail_asserts"
    report["finished_at"] = time.time()
    report["total_wall_s"] = round(report["finished_at"] - report["started_at"], 2)

    _emit_report(args, report)
    return 0 if all_pass else 4


def _emit_report(args, report: dict[str, Any]) -> None:
    payload = json.dumps(report, indent=2, default=str)
    if args.report_out:
        Path(args.report_out).write_text(payload, encoding="utf-8")
        print(f"[report] written to {args.report_out}", file=sys.stderr)
    else:
        print(payload)


if __name__ == "__main__":
    raise SystemExit(main())
