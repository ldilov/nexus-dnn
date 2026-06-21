from pathlib import Path

import pytest

from svi2_video_worker.interpolate import (
    build_minterpolate_cmd,
    build_rife_cmd,
    interpolate_video,
    resolve_rife_method,
    rife_factor_for_fps,
    target_frame_count,
)


def test_target_frame_count():
    assert target_frame_count(81, 2) == 161
    assert target_frame_count(81, 1) == 81
    assert target_frame_count(0, 4) == 0


def test_target_frame_count_rejects_bad_factor():
    with pytest.raises(ValueError):
        target_frame_count(10, 0)


def test_rife_factor_power_of_two_ceiling():
    assert rife_factor_for_fps(16, 24) == 2   # ratio 1.5 -> 2x
    assert rife_factor_for_fps(16, 32) == 2   # ratio 2.0 -> 2x
    assert rife_factor_for_fps(16, 48) == 4   # ratio 3.0 -> 4x
    assert rife_factor_for_fps(16, 64) == 4
    assert rife_factor_for_fps(24, 24) == 1   # no upscale
    assert rife_factor_for_fps(16, 12) == 1


def test_build_minterpolate_cmd():
    cmd = build_minterpolate_cmd("a.mp4", "b.mp4", 24)
    joined = " ".join(cmd)
    assert "minterpolate=fps=24" in joined
    assert "+faststart" in cmd
    assert cmd[0] == "ffmpeg"


def test_build_rife_cmd():
    cmd = build_rife_cmd("/opt/rife", "in", "out", 161, model="rife-v4")
    assert "/opt/rife" in cmd[0]
    assert "-n" in cmd and "161" in cmd
    assert "-m" in cmd and "rife-v4" in cmd


def test_interpolate_noop_when_target_not_higher():
    out = interpolate_video("src.mp4", "out.mp4", src_fps=24, target_fps=16, runner=lambda c: None)
    assert out == Path("src.mp4")  # unchanged


def test_interpolate_ffmpeg_runs_minterpolate():
    calls = []
    out = interpolate_video(
        "src.mp4", "out.mp4", src_fps=16, target_fps=24, method="ffmpeg", runner=lambda c: calls.append(c)
    )
    assert out == Path("out.mp4")
    assert len(calls) == 1
    assert "minterpolate=fps=24" in " ".join(calls[0])


def test_interpolate_rife_ncnn_requires_bin():
    with pytest.raises(ValueError, match="rife_bin"):
        interpolate_video("src.mp4", "out.mp4", src_fps=16, target_fps=48, method="rife_ncnn", runner=lambda c: None)


def test_interpolate_rife_ncnn_pipeline(tmp_path):
    calls = []
    out = interpolate_video(
        "src.mp4", str(tmp_path / "out.mp4"), src_fps=16, target_fps=48, method="rife_ncnn",
        rife_bin="/opt/rife", src_frame_count=81, runner=lambda c: calls.append(c),
    )
    assert out == tmp_path / "out.mp4"
    # extract, rife, reassemble
    assert len(calls) == 3
    assert any("%06d.png" in " ".join(c) for c in calls)  # extract
    rife_call = calls[1]
    # factor 4 (16->48), out_count = (81-1)*4+1 = 321
    assert "/opt/rife" in rife_call[0] and "321" in rife_call
    assert any("fps=48" in " ".join(c) for c in calls)  # final resample to exact target


def test_interpolate_rife_torch_uses_injected_backend():
    seen = {}

    def fake_backend(src, out, *, src_fps, target_fps, weights_path, device, **kwargs):
        seen.update(
            src=str(src), out=str(out), src_fps=src_fps, target_fps=target_fps,
            device=device, **kwargs,
        )
        return Path(out)

    out = interpolate_video(
        "src.mp4", "out.mp4", src_fps=16, target_fps=48, method="rife_torch", torch_backend=fake_backend
    )
    assert out == Path("out.mp4")
    assert seen["src_fps"] == 16 and seen["target_fps"] == 48
    # backend receives the off-path defaults (no -threads, per-pair RIFE)
    assert seen["fast_parallel"] is False
    assert seen["ffmpeg_threads"] is None


def test_interpolate_unknown_method():
    with pytest.raises(ValueError, match="unknown"):
        interpolate_video("a.mp4", "b.mp4", src_fps=16, target_fps=24, method="bogus", runner=lambda c: None)


def test_resolve_rife_method():
    assert resolve_rife_method("ffmpeg") == "ffmpeg"
    assert resolve_rife_method("rife_torch") == "rife_torch"
    # generic "rife" with no cuda + no bin -> ffmpeg fallback (never crashes)
    assert resolve_rife_method("rife", device="cpu") == "ffmpeg"
    assert resolve_rife_method("rife", device="cpu", rife_bin="/opt/rife") == "rife_ncnn"
