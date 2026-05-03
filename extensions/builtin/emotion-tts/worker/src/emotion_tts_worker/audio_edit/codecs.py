from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf

DECODE_VIA_FFMPEG_EXTS = {".mp3", ".opus", ".aac", ".m4a", ".ogg"}
ENCODE_CODEC_BY_EXT: dict[str, tuple[str, list[str]]] = {
    ".mp3": ("libmp3lame", []),
    ".opus": ("libopus", []),
    ".aac": ("aac", []),
    ".m4a": ("aac", []),
    ".ogg": ("libvorbis", []),
}


def decode_source(source_abs: Path) -> tuple[np.ndarray, int]:
    """Decode the source artifact to a float32 PCM array. Returns (samples, sr)."""

    if not source_abs.exists():
        raise ValueError(f"source artifact missing: {source_abs}")
    ext = source_abs.suffix.lower()
    if ext in DECODE_VIA_FFMPEG_EXTS:
        return _ffmpeg_decode(source_abs)
    samples, sr = sf.read(str(source_abs), dtype="float32", always_2d=False)
    return samples, sr


def encode_output(samples: np.ndarray, sr: int, output_abs: Path) -> None:
    """Write the edited samples to ``output_abs`` honoring the destination format."""

    output_abs.parent.mkdir(parents=True, exist_ok=True)
    ext = output_abs.suffix.lower()
    if ext in {"", ".wav"}:
        sf.write(str(output_abs), samples, sr, subtype="FLOAT")
        return
    if ext == ".flac":
        sf.write(str(output_abs), samples, sr, subtype="PCM_24")
        return
    codec_spec = ENCODE_CODEC_BY_EXT.get(ext)
    if codec_spec is None:
        raise ValueError(f"unsupported output format: {ext!r}")
    if not shutil.which("ffmpeg"):
        raise RuntimeError(f"ffmpeg required to encode {ext} but not on PATH")
    codec, extra = codec_spec
    with tempfile.TemporaryDirectory(prefix="audio-edit-encode-") as td:
        wav_path = Path(td) / "intermediate.wav"
        sf.write(str(wav_path), samples, sr, subtype="FLOAT")
        cmd = [
            "ffmpeg",
            "-y",
            "-loglevel",
            "error",
            "-i",
            str(wav_path),
            "-c:a",
            codec,
            *extra,
            str(output_abs),
        ]
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode != 0:
            raise RuntimeError(
                f"ffmpeg encode to {ext} failed: {result.stderr.decode('utf-8', errors='replace')}"
            )


def _ffmpeg_decode(source_abs: Path) -> tuple[np.ndarray, int]:
    with tempfile.TemporaryDirectory(prefix="audio-edit-decode-") as td:
        wav_path = Path(td) / "decoded.wav"
        cmd = [
            "ffmpeg",
            "-y",
            "-loglevel",
            "error",
            "-i",
            str(source_abs),
            "-c:a",
            "pcm_f32le",
            str(wav_path),
        ]
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode != 0:
            raise RuntimeError(
                f"ffmpeg decode failed for {source_abs.name}: {result.stderr.decode('utf-8', errors='replace')}"
            )
        samples, sr = sf.read(str(wav_path), dtype="float32", always_2d=False)
        return samples.astype(np.float32, copy=False), sr
