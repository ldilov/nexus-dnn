import shutil
import pytest
from pathlib import Path
from svi2_video_worker.pipeline_fake import render_fake

pytestmark = pytest.mark.skipif(
    shutil.which("ffmpeg") is None, reason="ffmpeg not installed"
)


def test_render_fake_writes_mp4(tmp_path: Path):
    out = tmp_path / "fake.mp4"
    render_fake(out, width=480, height=832, duration_seconds=0.5, fps=15)
    assert out.exists() and out.stat().st_size > 0
