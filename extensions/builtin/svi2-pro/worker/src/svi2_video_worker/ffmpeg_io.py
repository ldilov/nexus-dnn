import logging
import shutil
import subprocess
import tempfile
import weakref
from pathlib import Path
from typing import Sequence

from PIL import Image

_log = logging.getLogger(__name__)


def _cleanup_dir(path: Path) -> None:
    shutil.rmtree(path, ignore_errors=True)


def _encode_png_dir(tmpdir: Path, out_path: Path, fps: int, quality: int) -> Path:
    out_path = Path(out_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    crf = max(1, min(51, round(51 - quality * 5)))
    cmd = [
        "ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
        "-framerate", str(fps),
        "-i", str(tmpdir / "%06d.png"),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", str(crf),
        "-movflags", "+faststart",
        str(out_path),
    ]
    # -nostats/-loglevel error keep ffmpeg's stderr tiny: a chatty progress
    # stream fills the OS pipe and deadlocks ffmpeg when it is launched through a
    # wrapper shim that does not drain stderr (observed with the chocolatey ffmpeg
    # shim + capture_output). stdin is closed so ffmpeg never blocks on a prompt.
    try:
        subprocess.run(cmd, check=True, stdin=subprocess.DEVNULL, capture_output=True)
    except subprocess.CalledProcessError as exc:
        raise RuntimeError(f"ffmpeg failed: {exc.stderr.decode(errors='replace')}") from exc
    return out_path


def frames_to_mp4(
    frames: Sequence[Image.Image], out_path: Path, *, fps: int = 15, quality: int = 7
) -> Path:
    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = Path(tmpdir)
        for i, frame in enumerate(frames):
            frame.save(tmpdir / f"{i:06d}.png")
        return _encode_png_dir(tmpdir, out_path, fps, quality)


class StreamingFrameWriter:
    # Writes frames to disk PNGs as they are produced (O(1) RAM in video length),
    # then muxes the sequence to mp4 on finalize. Lets the render stream clips of
    # unbounded count without accumulating every decoded frame in host RAM.
    def __init__(self) -> None:
        self._dir = Path(tempfile.mkdtemp(prefix="svi2_stream_"))
        self._n = 0
        # Backstop: if the writer is abandoned (render loop raises before
        # finalize, or the caller forgets it) the temp dir of PNGs is removed
        # when the object is collected, instead of stranding gigabytes on disk.
        self._finalizer = weakref.finalize(self, _cleanup_dir, self._dir)

    def __enter__(self) -> "StreamingFrameWriter":
        return self

    def __exit__(self, exc_type, exc, tb) -> bool:
        self.close()
        return False

    def close(self) -> None:
        # Deterministic cleanup of stranded frames. Idempotent and a no-op once
        # finalize() has already disposed of (or deliberately preserved) the dir.
        self._finalizer()

    def write(self, frame: Image.Image) -> None:
        frame.save(self._dir / f"{self._n:06d}.png")
        self._n += 1

    def write_many(self, frames: Sequence[Image.Image]) -> None:
        for f in frames:
            self.write(f)

    @property
    def count(self) -> int:
        return self._n

    def finalize(self, out_path: Path, *, fps: int = 15, quality: int = 7) -> Path:
        try:
            result = _encode_png_dir(self._dir, out_path, fps, quality)
        except Exception:
            # Mux failed (e.g. ffmpeg missing). Preserve the frames so a
            # multi-hour render is recoverable, and cancel the cleanup backstop
            # so neither close() nor GC wipes them.
            self._finalizer.detach()
            _log.error("mux failed; preserved %d frame(s) at %s", self._n, self._dir)
            raise
        self._finalizer()  # success: drop the frames
        return result
