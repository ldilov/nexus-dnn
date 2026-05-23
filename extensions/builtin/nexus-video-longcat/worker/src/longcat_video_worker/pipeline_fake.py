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

    worker.register("longcat.video.render.start", _render_start)
