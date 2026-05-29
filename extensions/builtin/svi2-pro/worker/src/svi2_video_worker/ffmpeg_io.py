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
            "-framerate",
            str(fps),
            "-i",
            str(tmpdir / "%06d.png"),
            "-pix_fmt",
            "yuv420p",
            "-crf",
            str(crf),
            str(out_path),
        ]

        try:
            subprocess.run(cmd, check=True, capture_output=True)
        except subprocess.CalledProcessError as exc:
            raise RuntimeError(f"ffmpeg failed: {exc.stderr.decode(errors='replace')}") from exc

    return out_path
