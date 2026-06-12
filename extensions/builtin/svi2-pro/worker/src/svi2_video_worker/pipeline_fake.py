"""No-GPU fake render pipeline for offline E2E + protocol verification.

Drives the same render_params contract as the real pipeline, emits the same
progress notifications (so the UI progress + DAG views verify offline), and
writes a deterministic synthetic MP4 plus a render_report.json of the real
shape. Zero torch, zero real weights, zero GPU.
"""
from __future__ import annotations

import hashlib
import subprocess
import threading
from pathlib import Path
from typing import Any, Callable

from .render_report import write_render_report
from .resolution import resolution_warning
from .rpc import Notifications

_FAKE_PEAK_VRAM_BYTES = 0
_CLIP_COLORS = ("0x141414", "0x1a1a1a", "0x202020", "0x161616", "0x1c1c1c")


def _clip_color(clip_idx: int) -> str:
    return _CLIP_COLORS[clip_idx % len(_CLIP_COLORS)]


def _stitched_frame_count(num_clips: int, frames_per_clip: int, num_overlap_frame: int) -> int:
    if num_clips <= 0:
        return 0
    return frames_per_clip + (num_clips - 1) * (frames_per_clip - num_overlap_frame)


def _write_synthetic_mp4(
    output_path: Path,
    *,
    width: int,
    height: int,
    total_frames: int,
    fps: int,
    color: str,
) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    duration = max(total_frames / float(fps), 1.0 / float(fps))
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"color=c={color}:s={width}x{height}:d={duration}:r={fps}",
        "-pix_fmt", "yuv420p",
        str(output_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return output_path


def _write_synthetic_seed(seed_path: Path, *, width: int, height: int) -> Path:
    seed_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"color=c=0x1a1a1a:s={width}x{height}:d=1",
        "-frames:v", "1",
        str(seed_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return seed_path


def generate_t2v_seed_clip(validated: dict[str, Any], seed_dst: Path) -> Path:
    """Fake text-to-video seed clip. The real pipeline generates clip 0 with the
    Wan2.2-T2V experts and uses its last frame as the i2v anchor; the fake writes
    a synthetic stand-in frame so the t2v path runs fully offline. Module-level
    so tests can observe/patch the seed-clip generation.
    """
    return _write_synthetic_seed(seed_dst, width=validated["width"], height=validated["height"])


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


async def render_fake_e2e(
    params: dict[str, Any],
    emit: Callable[[str, dict[str, Any]], Any],
    cancel_event: threading.Event | None = None,
) -> dict[str, Any]:
    from .pipeline_svi2 import (
        RenderCancelled,
        needs_seed_clip,
        resolve_models_dir,
        seed_origin,
        validate_render_params,
    )

    validated = validate_render_params(params or {})
    if not validated.get("models_dir"):
        validated["models_dir"] = str(resolve_models_dir())

    if needs_seed_clip(validated):
        out = Path(validated["output_path"])
        seed_dst = out.parent / f"{out.stem}_seed.png"
        generate_t2v_seed_clip(validated, seed_dst)

    num_clips: int = validated["num_clips"]
    frames_per_clip: int = validated["frames_per_clip"]
    num_overlap_frame: int = validated["num_overlap_frame"]
    num_inference_steps: int = validated["num_inference_steps"]
    width: int = validated["width"]
    height: int = validated["height"]
    fps: int = validated["fps"]
    interpolate_fps: int = validated["interpolate_fps"]
    output_path = Path(validated["output_path"])

    res_warning = validated.get("resolution_warning") or resolution_warning(width, height)

    total_frames = _stitched_frame_count(num_clips, frames_per_clip, num_overlap_frame)
    total_steps = max(num_clips * num_inference_steps, 1)
    completed_steps = 0

    await emit(Notifications.PROGRESS, {
        "phase": "start",
        "progress": 0.0,
        "num_clips": num_clips,
        "total_steps": total_steps,
        "profile": "fake",
        "resolution_warning": res_warning,
    })

    for clip_idx in range(num_clips):
        await emit(Notifications.CLIP_STARTED, {
            "clip_index": clip_idx,
            "num_clips": num_clips,
            "frames_per_clip": frames_per_clip,
        })
        for step_idx in range(num_inference_steps):
            if cancel_event is not None and cancel_event.is_set():
                raise RenderCancelled()
            completed_steps += 1
            progress = completed_steps / total_steps
            await emit(Notifications.CLIP_STEP, {
                "clip_index": clip_idx,
                "step": step_idx,
                "steps": num_inference_steps,
                "progress": round(progress, 4),
            })
            await emit(Notifications.PROGRESS, {
                "phase": "denoise",
                "progress": round(progress, 4),
                "clip_index": clip_idx,
                "num_clips": num_clips,
                "step": step_idx,
                "steps": num_inference_steps,
            })
        await emit(Notifications.MEMORY_STATS, {
            "clip_index": clip_idx,
            "peak_vram_bytes": _FAKE_PEAK_VRAM_BYTES,
            "free_vram_bytes": 0,
            "device": "cpu",
        })
        await emit(Notifications.CLIP_COMPLETED, {
            "clip_index": clip_idx,
            "num_clips": num_clips,
        })

    video_path = _write_synthetic_mp4(
        output_path,
        width=width,
        height=height,
        total_frames=total_frames,
        fps=fps,
        color=_clip_color(num_clips - 1),
    )

    final_fps = interpolate_fps if interpolate_fps and interpolate_fps > fps else fps
    sha256 = _sha256(video_path)
    duration_seconds = round(total_frames / float(fps), 3) if fps else 0.0

    report_data = {
        "profile": "fake",
        "output_path": str(video_path),
        "base_output_path": str(video_path),
        "sha256": sha256,
        "mode": validated["mode"],
        "seed_origin": seed_origin(validated),
        "seed_value": validated.get("seed"),
        "last_image_path": validated.get("last_image_path"),
        "num_clips": num_clips,
        "frames": total_frames,
        "frames_per_clip": frames_per_clip,
        "width": width,
        "height": height,
        "fps": fps,
        "interpolated_fps": final_fps if final_fps > fps else 0,
        "final_fps": final_fps,
        "duration_seconds": duration_seconds,
        "interpolate_method": validated["interpolate_method"],
        "interpolate_engine": "",
        "stitch_mode": validated["stitch_mode"],
        "pixel_re_encode": validated["pixel_re_encode"],
        "peak_vram_bytes": _FAKE_PEAK_VRAM_BYTES,
        "resolution_warning": res_warning,
        "model_audit": {},
    }
    write_render_report(output_path.parent, report_data)

    await emit(Notifications.ARTIFACT_CREATED, {
        "role": "video.render",
        "output_path": str(video_path),
        "sha256": sha256,
        "mime_type": "video/mp4",
    })
    result = {
        "status": "ok",
        "profile": "fake",
        "output_path": str(video_path),
        "frames": total_frames,
        "duration_seconds": duration_seconds,
        "final_fps": final_fps,
        "peak_vram_bytes": _FAKE_PEAK_VRAM_BYTES,
        "sha256": sha256,
        "resolution_warning": res_warning,
        "render_report": report_data,
    }
    await emit(Notifications.DONE, {
        "output_path": str(video_path),
        "frames": total_frames,
        "sha256": sha256,
        "profile": "fake",
    })
    return result


def render_fake(
    output_path: Path,
    *,
    width: int = 480,
    height: int = 832,
    duration_seconds: float = 1.0,
    fps: int = 15,
    color: str = "0x1a1a1a",
) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"color=c={color}:s={width}x{height}:d={duration_seconds}:r={fps}",
        "-pix_fmt", "yuv420p",
        str(output_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return output_path


def register_fake_handlers(worker: Any) -> None:
    from .pipeline_svi2 import RenderCancelled

    cancel_event = threading.Event()

    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        cancel_event.clear()

        async def _emit(method: str, payload: dict[str, Any]) -> None:
            await worker.emit_notification(method, payload)

        try:
            return await render_fake_e2e(params or {}, _emit, cancel_event=cancel_event)
        except RenderCancelled:
            return {"status": "cancelled", "profile": "fake"}

    async def _render_cancel(_params: Any) -> dict[str, Any]:
        cancel_event.set()
        return {"cancelled": True}

    worker.register("svi2.video.render.start", _render_start)
    worker.register("svi2.video.render.cancel", _render_cancel)


__all__ = [
    "render_fake",
    "render_fake_e2e",
    "register_fake_handlers",
]
