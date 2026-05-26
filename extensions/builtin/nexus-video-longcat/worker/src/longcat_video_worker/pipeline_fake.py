"""No-GPU fake pipeline for CI handshake + protocol tests.

Writes a deterministic single-color MP4 via ffmpeg so the host
render contract exercises end-to-end without GPU dependencies.
"""

from __future__ import annotations

import subprocess
from pathlib import Path
from typing import Any


def render_fake(
    output_path: Path,
    *,
    width: int = 832,
    height: int = 480,
    duration_seconds: float = 1.0,
    fps: int = 24,
    color: str = "0x1a1a1a",
) -> Path:
    """Generate a flat-color MP4 at ``output_path``.

    Args:
        output_path: Target .mp4 path.
        width: Frame width.
        height: Frame height.
        duration_seconds: Video duration.
        fps: Frames per second.
        color: ffmpeg-style color string.

    Returns:
        The ``output_path`` after a successful ffmpeg invocation.
    """

    output_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg",
        "-y",
        "-f", "lavfi",
        "-i", f"color=c={color}:s={width}x{height}:d={duration_seconds}:r={fps}",
        "-pix_fmt", "yuv420p",
        str(output_path),
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    return output_path


def register_fake_handlers(worker: Any) -> None:
    """Register fake-profile RPC handlers on ``worker``.

    Wires the ``longcat.video.render.start`` method to ``render_fake``
    so CI / handshake tests can exercise the full JSON-RPC contract
    without GPU dependencies.
    """

    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        out = Path(params.get("output_path", "out.mp4"))
        render_fake(
            out,
            width=int(params.get("width", 832)),
            height=int(params.get("height", 480)),
            duration_seconds=float(params.get("duration_seconds", 1.0)),
            fps=int(params.get("fps", 24)),
        )
        return {"status": "ok", "output_path": str(out), "profile": "fake"}

    async def _plan_expand(params: dict[str, Any]) -> dict[str, Any]:
        import asyncio
        from .plan_llm import default_lease_client, expand_prompt
        from .compile_storyboard import StoryboardCompileError
        use_llm = bool(params.get("use_llm", False))
        lease_client = default_lease_client() if use_llm else None
        try:
            result = await asyncio.to_thread(
                expand_prompt,
                prompt=str(params.get("prompt", "")),
                duration_seconds=float(params.get("duration_seconds", 0.0)),
                scene_count=int(params.get("scene_count", 1)),
                style_hint=params.get("style_hint"),
                seed=int(params.get("seed", 42)),
                use_llm=use_llm,
                lease_client=lease_client,
            )
            return result.to_dict()
        except StoryboardCompileError as exc:
            return {"status": "error", "code": -32108, **exc.to_error_payload()}

    async def _plan_validate(params: dict[str, Any]) -> dict[str, Any]:
        from .plan_validate import validate_plan
        return validate_plan(params or {})

    worker.register("longcat.video.render.start", _render_start)
    worker.register("longcat.video.plan.expand", _plan_expand)
    worker.register("longcat.video.plan.validate", _plan_validate)
