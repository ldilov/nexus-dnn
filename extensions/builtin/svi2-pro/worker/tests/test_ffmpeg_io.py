import shutil
import pytest
from pathlib import Path

pytestmark = pytest.mark.skipif(
    shutil.which("ffmpeg") is None, reason="ffmpeg not installed"
)
Image = pytest.importorskip("PIL.Image")
from svi2_video_worker.ffmpeg_io import frames_to_mp4


def test_frames_to_mp4(tmp_path: Path):
    frames = [Image.new("RGB", (480, 832), (i, i, i)) for i in range(10)]
    out = tmp_path / "v.mp4"
    frames_to_mp4(frames, out, fps=15)
    assert out.exists() and out.stat().st_size > 0
