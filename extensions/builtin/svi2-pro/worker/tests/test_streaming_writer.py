import gc
import shutil
from pathlib import Path

import pytest

Image = pytest.importorskip("PIL.Image")

import svi2_video_worker.ffmpeg_io as ffmpeg_io
from svi2_video_worker.ffmpeg_io import StreamingFrameWriter


def _img():
    return Image.new("RGB", (4, 4), (10, 20, 30))


def test_context_manager_cleans_tmpdir_on_exception():
    captured: dict = {}
    with pytest.raises(RuntimeError):
        with StreamingFrameWriter() as w:
            w.write(_img())
            captured["dir"] = w._dir
            assert captured["dir"].exists()
            raise RuntimeError("render crashed before finalize")
    assert not captured["dir"].exists()          # stranded frames cleaned up


def test_weakref_backstop_cleans_tmpdir_when_abandoned():
    w = StreamingFrameWriter()
    w.write(_img())
    d = w._dir
    assert d.exists()
    del w
    gc.collect()
    assert not d.exists()                          # GC backstop removes orphan dir


def test_finalize_success_cleans_tmpdir(tmp_path: Path, monkeypatch):
    def _fake_encode(tmpdir, out_path, fps, quality, ffmpeg_threads=None):
        Path(out_path).write_bytes(b"mp4")
        return Path(out_path)

    monkeypatch.setattr(ffmpeg_io, "_encode_png_dir", _fake_encode)
    w = StreamingFrameWriter()
    w.write(_img())
    d = w._dir
    out = w.finalize(tmp_path / "v.mp4")
    assert out.exists()
    assert not d.exists()                          # success drops the frames


def test_finalize_preserves_frames_on_encode_failure(tmp_path: Path, monkeypatch):
    def _boom(tmpdir, out_path, fps, quality, ffmpeg_threads=None):
        raise RuntimeError("ffmpeg missing")

    monkeypatch.setattr(ffmpeg_io, "_encode_png_dir", _boom)
    w = StreamingFrameWriter()
    w.write(_img())
    w.write(_img())
    d = w._dir
    with pytest.raises(RuntimeError, match="ffmpeg missing"):
        w.finalize(tmp_path / "v.mp4")
    assert d.exists()                              # frames preserved for recovery
    assert len(list(d.glob("*.png"))) == 2
    # abandoning after a preserved failure must NOT delete the recovery dir
    del w
    gc.collect()
    assert d.exists()
    shutil.rmtree(d, ignore_errors=True)


def test_double_finalize_and_close_are_safe(tmp_path: Path, monkeypatch):
    monkeypatch.setattr(
        ffmpeg_io,
        "_encode_png_dir",
        lambda t, o, f, q, ffmpeg_threads=None: (Path(o).write_bytes(b"m"), Path(o))[1],
    )
    w = StreamingFrameWriter()
    w.write(_img())
    w.finalize(tmp_path / "v.mp4")
    w.close()                                      # idempotent, no raise
    w.close()
