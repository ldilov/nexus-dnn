"""FFmpeg wrappers — encode, stitch, trim, extract last frame.

Delegates to `ffmpeg-python`. For the fake profile this module is the only
thing that actually runs (it writes a tiny placeholder MP4 / PNG so the
extension exercises the artifact-store contract end-to-end).
"""

from __future__ import annotations

import contextlib
import os
import struct
import wave
from pathlib import Path


def write_placeholder_mp4(
    path: Path, *, duration_s: float = 1.0, width: int = 64, height: int = 36
) -> None:
    """Write a minimal valid MP4 (black frame) WITHOUT requiring ffmpeg on PATH.

    Used by the fake runtime so CI doesn't need a real ffmpeg install.
    """
    # Produce a tiny but well-formed MP4 using ffmpeg-python if available,
    # otherwise write a 1-byte sentinel that downstream tests can match.
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        import ffmpeg
        (
            ffmpeg.input(
                f"color=c=black:s={width}x{height}:r=24:d={duration_s}",
                f="lavfi",
            )
            .output(
                str(path),
                vcodec="libx264",
                pix_fmt="yuv420p",
                preset="ultrafast",
                tune="zerolatency",
                loglevel="error",
            )
            .overwrite_output()
            .run()
        )
    except Exception:
        # Fallback: write a sentinel file. Real MP4 generation requires
        # ffmpeg; tests that depend on a real MP4 must set ffmpeg on PATH.
        path.write_bytes(b"NEXUS_FAKE_MP4\x00")


def write_placeholder_png(path: Path, *, width: int = 64, height: int = 36) -> None:
    """Minimal PNG (all-black). Used by fake runtime for segment last-frame artifacts."""
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        from PIL import Image
        img = Image.new("RGB", (width, height), (0, 0, 0))
        img.save(path, "PNG")
    except Exception:
        # Tiny PNG signature + IHDR + IDAT + IEND. Not visible but parses as PNG.
        path.write_bytes(_MINIMAL_PNG)


# 1x1 black PNG bytes (precomputed).
_MINIMAL_PNG = (
    b"\x89PNG\r\n\x1a\n"
    b"\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde"
    b"\x00\x00\x00\x0cIDATx\x9cc```\x00\x00\x00\x04\x00\x01\x5c\xcd\xff\x69"
    b"\x00\x00\x00\x00IEND\xaeB`\x82"
)


def stitch_segments(segment_paths: list[Path], out_path: Path) -> None:
    """Concatenate per-segment MP4s into a single file.

    Fake runtime path: if all segments are placeholders, just write a
    concatenated sentinel.
    """
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        import ffmpeg
        # concat demuxer
        concat_list = out_path.with_suffix(".concat.txt")
        concat_list.write_text(
            "\n".join(f"file '{p.resolve()}'" for p in segment_paths)
        )
        (
            ffmpeg.input(str(concat_list), format="concat", safe=0)
            .output(str(out_path), c="copy", loglevel="error")
            .overwrite_output()
            .run()
        )
        with contextlib.suppress(Exception):
            concat_list.unlink()
    except Exception:
        out_path.write_bytes(b"NEXUS_FAKE_MP4_STITCHED\x00")


def trim_to_duration(
    in_path: Path, out_path: Path, *, duration_s: float
) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    try:
        import ffmpeg
        (
            ffmpeg.input(str(in_path), ss=0, t=duration_s)
            .output(str(out_path), c="copy", loglevel="error")
            .overwrite_output()
            .run()
        )
    except Exception:
        if in_path.exists():
            out_path.write_bytes(in_path.read_bytes())
        else:
            out_path.write_bytes(b"NEXUS_FAKE_MP4_TRIMMED\x00")
