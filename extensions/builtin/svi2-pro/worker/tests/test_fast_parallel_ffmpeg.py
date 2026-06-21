"""ffmpeg `-threads` gating for fast-parallel (#4) — pure command-list checks.

When ``fast_parallel`` is on the pipeline passes ``ffmpeg_threads=THREADS`` and
every ffmpeg invocation gains ``-threads N``. When off, ``ffmpeg_threads`` is
``None`` and the flag is omitted (today's behavior).
"""

from svi2_video_worker.interpolate import (
    _assemble_cmd,
    _extract_cmd,
    _threads_flag,
    build_minterpolate_cmd,
)


def test_threads_flag_present_when_count_given():
    assert _threads_flag(4) == ["-threads", "4"]


def test_threads_flag_absent_when_none_or_zero():
    assert _threads_flag(None) == []
    assert _threads_flag(0) == []


def test_minterpolate_includes_threads_when_on():
    cmd = build_minterpolate_cmd("a.mp4", "b.mp4", 24, ffmpeg_threads=4)
    assert "-threads" in cmd
    assert cmd[cmd.index("-threads") + 1] == "4"
    # the flag precedes the input so it applies globally
    assert cmd.index("-threads") < cmd.index("-i")


def test_minterpolate_omits_threads_when_off():
    cmd = build_minterpolate_cmd("a.mp4", "b.mp4", 24)
    assert "-threads" not in cmd


def test_assemble_cmd_threads_gating():
    on = _assemble_cmd("p/%06d.png", "o.mp4", 32, 48, ffmpeg_threads=8)
    assert "-threads" in on and on[on.index("-threads") + 1] == "8"
    off = _assemble_cmd("p/%06d.png", "o.mp4", 32, 48)
    assert "-threads" not in off


def test_extract_cmd_threads_gating():
    on = _extract_cmd("src.mp4", "p/%06d.png", 2)
    assert on[:2] == ["ffmpeg", "-y"]
    assert "-threads" in on and on[on.index("-threads") + 1] == "2"
    off = _extract_cmd("src.mp4", "p/%06d.png")
    assert "-threads" not in off


def test_encode_png_dir_cmd_threads_via_threads_flag():
    from svi2_video_worker.ffmpeg_io import _threads_flag as ff_threads_flag

    assert ff_threads_flag(6) == ["-threads", "6"]
    assert ff_threads_flag(None) == []
