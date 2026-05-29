import subprocess
import tempfile
from pathlib import Path
from typing import Sequence

from PIL import Image


def frames_to_mp4(
    frames: Sequence[Image.Image], out_path: Path, *, fps: int = 15, quality: int = 7
) -> Path:
    """
    Assemble PIL frames into an MP4 file via ffmpeg.

    Args:
        frames: Sequence of PIL.Image objects (RGB mode).
        out_path: Output MP4 file path.
        fps: Frames per second (default 15).
        quality: Quality 1..10 (mapped to ffmpeg -crf; higher is better).

    Returns:
        The output path (as Path object).
    """
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = Path(tmpdir)

        # Write frames as zero-padded PNG files.
        for i, frame in enumerate(frames):
            frame_path = tmpdir / f"{i:06d}.png"
            frame.save(frame_path)

        # Map quality (1..10) to crf (51..1, inverted).
        # Higher quality => lower crf => better output.
        crf = max(1, min(51, round(51 - quality * 5)))

        # Construct ffmpeg command.
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

        # Run ffmpeg.
        subprocess.run(cmd, check=True, capture_output=True)

    return out_path
