"""Fake LTX render pipeline — no torch, no GPU, no model weights.

Emits deterministic JSON-RPC notifications matching the real runtime
contract. Writes tiny placeholder MP4 / PNG artifacts per segment + final.
Supports cancellation. Used for:
  - CI tests of the Rust extension worker without GPU
  - frontend dev with full progress UI
  - extension contract testing
"""

from __future__ import annotations

import asyncio
import json
import os
import uuid
from pathlib import Path
from typing import Any

from . import __version__
from .ffmpeg_io import (
    stitch_segments,
    trim_to_duration,
    write_placeholder_mp4,
    write_placeholder_png,
)
from .planning_validate import validate_plan
from .rpc import ErrorCodes, Methods, Notifications
from .vram import evict_models, memory_stats


class FakeRunState:
    def __init__(self, run_id: str, workdir: Path, plan: dict[str, Any]):
        self.run_id = run_id
        self.workdir = workdir
        self.plan = plan
        self.cancelled = False
        self.generation_count = 0


def register_fake_handlers(worker) -> None:
    state: dict[str, FakeRunState] = {}
    emit_delay_ms = int(os.environ.get("NEXUS_VIDEO_LTX23_FAKE_DELAY_MS", "50"))
    fail_at = int(
        os.environ.get("NEXUS_VIDEO_LTX23_FAKE_FAILURE_SEGMENT_INDEX", "-1")
    )

    async def models_list(_params):
        return {
            "models": [
                {"id": "fake-ltx-2.3", "available": True, "size_mb": 0},
            ]
        }

    async def plan_validate(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        return validate_plan(params.get("plan", params), profile="fake")

    async def render_start(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("request_id") or f"run_{uuid.uuid4().hex[:12]}"
        plan = params.get("video") or params.get("plan") or {}
        workdir_str = params.get("workdir")
        workdir = Path(workdir_str) if workdir_str else Path.cwd() / "fake_workdir" / run_id
        workdir.mkdir(parents=True, exist_ok=True)

        rs = FakeRunState(run_id=run_id, workdir=workdir, plan=plan)
        state[run_id] = rs

        # Launch the async render task (fire-and-forget).
        asyncio.create_task(_render_loop(worker, rs, emit_delay_ms, fail_at))
        return {"run_id": run_id, "status": "started"}

    async def render_cancel(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("run_id") or params.get("request_id")
        rs = state.get(run_id)
        if rs is None:
            raise ValueError(f"unknown run: {run_id}")
        rs.cancelled = True
        return {"run_id": run_id, "cancel_requested": True}

    worker.register(Methods.MODELS_LIST, models_list)
    worker.register(Methods.PLAN_VALIDATE, plan_validate)
    worker.register(Methods.RENDER_START, render_start)
    worker.register(Methods.RENDER_CANCEL, render_cancel)


async def _render_loop(
    worker, rs: FakeRunState, emit_delay_ms: int, fail_at: int
) -> None:
    plan = rs.plan
    segment_count = int(
        plan.get("segment_count")
        or len(plan.get("segments", []))
        or _default_segment_count(plan)
    )
    width = int(plan.get("width", 960))
    height = int(plan.get("height", 544))
    duration = float(plan.get("requested_duration_seconds", plan.get("duration_seconds", 10)))

    segment_paths: list[Path] = []

    for i in range(segment_count):
        if rs.cancelled:
            await worker.emit_notification(
                Notifications.ERROR,
                {
                    "run_id": rs.run_id,
                    "code": ErrorCodes.RENDER_CANCELLED,
                    "message": "render cancelled by user",
                },
            )
            return

        if fail_at == i:
            await worker.emit_notification(
                Notifications.ERROR,
                {
                    "run_id": rs.run_id,
                    "segment_index": i,
                    "code": ErrorCodes.RENDER_FAILED,
                    "message": "deterministic fake-runtime failure (test fixture)",
                },
            )
            return

        await worker.emit_notification(
            Notifications.SEGMENT_STARTED,
            {
                "run_id": rs.run_id,
                "segment_index": i,
                "segment_count": segment_count,
            },
        )

        await asyncio.sleep(emit_delay_ms / 1000.0)

        seg_path = rs.workdir / "segments" / f"{i:03d}" / "raw.mp4"
        last_frame = rs.workdir / "segments" / f"{i:03d}" / "last_frame.png"
        write_placeholder_mp4(seg_path, duration_s=4.0, width=width, height=height)
        write_placeholder_png(last_frame, width=width, height=height)
        segment_paths.append(seg_path)

        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": i,
                "kind": "raw_video",
                "path": str(seg_path),
                "mime": "video/mp4",
            },
        )
        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": i,
                "kind": "last_frame",
                "path": str(last_frame),
                "mime": "image/png",
            },
        )

        rs.generation_count += 1
        await worker.emit_notification(
            Notifications.SEGMENT_COMPLETED,
            {
                "run_id": rs.run_id,
                "segment_index": i,
                "segment_count": segment_count,
            },
        )
        await worker.emit_notification(
            Notifications.MEMORY_STATS,
            {"run_id": rs.run_id, "segment_index": i,
             **memory_stats(rs.generation_count)},
        )
        await worker.emit_notification(
            Notifications.PROGRESS,
            {
                "run_id": rs.run_id,
                "overall_percent": ((i + 1) / segment_count) * 100,
                "current_segment_index": i,
                "segment_count": segment_count,
                "message": f"Generated segment {i + 1} of {segment_count}",
            },
        )

    # Stitch + trim
    final_path = rs.workdir / "final" / "final.mp4"
    stitched_path = rs.workdir / "final" / "stitched.mp4"
    stitch_segments(segment_paths, stitched_path)
    trim_to_duration(stitched_path, final_path, duration_s=duration)

    # AC13 — clear models from VRAM before declaring done. No-op in fake mode.
    evict_models(rs)

    await worker.emit_notification(
        Notifications.ARTIFACT_CREATED,
        {
            "run_id": rs.run_id,
            "kind": "final_video",
            "path": str(final_path),
            "mime": "video/mp4",
            "duration_seconds": duration,
        },
    )
    await worker.emit_notification(
        Notifications.DONE,
        {
            "run_id": rs.run_id,
            "final_path": str(final_path),
            "duration_seconds": duration,
            "segment_count": segment_count,
        },
    )


def _default_segment_count(plan: dict[str, Any]) -> int:
    """Compute default segment count when caller didn't supply one."""
    duration = float(plan.get("requested_duration_seconds", plan.get("duration_seconds", 10)))
    seg_seconds = float(plan.get("segment_seconds", 4.0))
    overlap = float(plan.get("overlap_seconds", 0.5))
    stride = max(0.1, seg_seconds - overlap)
    import math
    if duration <= seg_seconds:
        return 1
    return 1 + math.ceil((duration - seg_seconds) / stride)
