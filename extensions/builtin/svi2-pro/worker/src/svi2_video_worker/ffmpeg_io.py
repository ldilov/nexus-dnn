import subprocess
import tempfile
from pathlib import Path
from typing import Sequence

from PIL import Image


def frames_to_mp4(
    frames: Sequence[Image.Image], out_path: Path, *, fps: int = 15, quality: int = 7
) -> Path:
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = Path(tmpdir)

        for i, frame in enumerate(frames):
            frame_path = tmpdir / f"{i:06d}.png"
            frame.save(frame_path)

        crf = max(1, min(51, round(51 - quality * 5)))

        cmd = [
            "ffmpeg",
            "-y",
            "-nostdin",
            "-nostats",
            "-loglevel",
            "error",
            "-framerate",
            str(fps),
            "-i",
            str(tmpdir / "%06d.png"),
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "-crf",
            str(crf),
            "-movflags",
            "+faststart",
            str(out_path),
        ]

        # -nostats/-loglevel error keep ffmpeg's stderr tiny: a chatty progress
        # stream fills the OS pipe and deadlocks ffmpeg when it is launched
        # through a wrapper shim that does not drain stderr (observed with the
        # chocolatey ffmpeg shim + capture_output). stdin is closed so ffmpeg
        # never blocks waiting on an overwrite prompt.
        try:
            subprocess.run(
                cmd, check=True, stdin=subprocess.DEVNULL, capture_output=True
            )
        except subprocess.CalledProcessError as exc:
            raise RuntimeError(f"ffmpeg failed: {exc.stderr.decode(errors='replace')}") from exc

    return out_path
