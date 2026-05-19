from __future__ import annotations

import sys
import types
from pathlib import Path
from typing import Any

import pytest

from ltx_video_worker import fps_interp as fi


# --- fake rife module helpers ----------------------------------------------


class _FakeRifeIdentity:
    """Returns img0 as the interpolated midpoint. Deterministic + GPU-free."""

    def __init__(self, gpuid: int = 0) -> None:
        self.gpuid = gpuid

    def process(self, img0: Any, img1: Any) -> Any:
        # PIL.Image.copy() preserves mode/size which the encoder expects.
        return img0.copy()


class _FakeRifeRejectsKwargs:
    """First positional-only ctor — exercises the kwarg-probe fallback."""

    def __init__(self) -> None:
        pass

    def process(self, img0: Any, img1: Any) -> Any:
        return img0.copy()


def _install_fake_rife(module_attrs: dict[str, Any]) -> types.ModuleType:
    """Inject a fake `rife_ncnn_vulkan_python` into sys.modules.

    Returns the module so tests can assert on it. Caller is responsible
    for `sys.modules.pop("rife_ncnn_vulkan_python", None)` in teardown.
    """
    mod = types.ModuleType("rife_ncnn_vulkan_python")
    for name, attr in module_attrs.items():
        setattr(mod, name, attr)
    sys.modules["rife_ncnn_vulkan_python"] = mod
    return mod


@pytest.fixture
def fake_rife_cleanup():
    yield
    sys.modules.pop("rife_ncnn_vulkan_python", None)


# --- _build_rife_processor -------------------------------------------------


def test_build_rife_processor_raises_when_module_missing(fake_rife_cleanup):
    sys.modules.pop("rife_ncnn_vulkan_python", None)
    with pytest.raises(fi._RifeUnavailable, match="not installed"):
        fi._build_rife_processor()


def test_build_rife_processor_finds_class_under_Rife_name(fake_rife_cleanup):
    _install_fake_rife({"Rife": _FakeRifeIdentity})
    processor = fi._build_rife_processor()
    assert isinstance(processor, _FakeRifeIdentity)
    assert processor.gpuid == 0


def test_build_rife_processor_falls_back_to_RIFE_uppercase(fake_rife_cleanup):
    _install_fake_rife({"RIFE": _FakeRifeIdentity})
    processor = fi._build_rife_processor()
    assert isinstance(processor, _FakeRifeIdentity)


def test_build_rife_processor_falls_back_to_RifeNCNNVulkan(fake_rife_cleanup):
    _install_fake_rife({"RifeNCNNVulkan": _FakeRifeIdentity})
    processor = fi._build_rife_processor()
    assert isinstance(processor, _FakeRifeIdentity)


def test_build_rife_processor_probes_positional_ctor(fake_rife_cleanup):
    _install_fake_rife({"Rife": _FakeRifeRejectsKwargs})
    processor = fi._build_rife_processor()
    assert isinstance(processor, _FakeRifeRejectsKwargs)


def test_build_rife_processor_raises_when_no_class_found(fake_rife_cleanup):
    _install_fake_rife({"WrongName": _FakeRifeIdentity})
    with pytest.raises(fi._RifeUnavailable, match="no Rife class"):
        fi._build_rife_processor()


def test_build_rife_processor_raises_when_constructor_explodes(fake_rife_cleanup):
    class _Exploder:
        def __init__(self, **_kwargs: Any) -> None:
            raise RuntimeError("vulkan not available")

    _install_fake_rife({"Rife": _Exploder})
    with pytest.raises(fi._RifeUnavailable, match="rejected"):
        fi._build_rife_processor()


# --- _invoke_rife ----------------------------------------------------------


def test_invoke_rife_uses_process_method_when_present():
    sentinel = object()

    class P:
        def process(self, a, b):
            return sentinel

    assert fi._invoke_rife(P(), 1, 2) is sentinel


def test_invoke_rife_falls_back_to_interpolate_method():
    sentinel = object()

    class P:
        def interpolate(self, a, b):
            return sentinel

    assert fi._invoke_rife(P(), 1, 2) is sentinel


def test_invoke_rife_falls_back_to_callable():
    class P:
        def __call__(self, a, b):
            return "called"

    assert fi._invoke_rife(P(), 1, 2) == "called"


def test_invoke_rife_raises_when_no_entry_point():
    class P:
        pass

    with pytest.raises(AttributeError, match="no recognised entry point"):
        fi._invoke_rife(P(), 1, 2)


# --- _interpolate_via_rife dispatch ----------------------------------------


def test_interpolate_via_rife_skips_non_doubling_target(tmp_path: Path):
    # 24 → 30 is not 2×; the wheel-pipeline path returns False without
    # even attempting to import the wheel.
    src = tmp_path / "in.mp4"
    src.write_bytes(b"")
    dst = tmp_path / "out.mp4"
    assert fi._interpolate_via_rife(src, dst, base_fps=24, target_fps=30) is False


def test_interpolate_via_rife_returns_false_when_wheel_missing(
    tmp_path: Path, fake_rife_cleanup
) -> None:
    sys.modules.pop("rife_ncnn_vulkan_python", None)
    src = tmp_path / "in.mp4"
    src.write_bytes(b"")
    dst = tmp_path / "out.mp4"
    assert fi._interpolate_via_rife(src, dst, base_fps=24, target_fps=48) is False


# --- end-to-end pipeline against a synthetic source video ------------------


def _make_synth_source(
    tmp_path: Path, frames: int = 6, fps: int = 24, w: int = 64, h: int = 48
) -> Path:
    """Generate a tiny mp4 via ffmpeg's lavfi `color` source."""
    import ffmpeg  # type: ignore

    src = tmp_path / "synth.mp4"
    (
        ffmpeg.input(f"color=c=red:s={w}x{h}:r={fps}:d={frames / fps}", f="lavfi")
        .output(
            str(src), vcodec="libx264", pix_fmt="yuv420p", loglevel="error"
        )
        .overwrite_output()
        .run()
    )
    return src


def test_run_rife_pipeline_produces_output_at_target_fps(
    tmp_path: Path, fake_rife_cleanup
) -> None:
    """End-to-end: synth source → fake-rife midpoint → encoded dst.

    The fake processor returns img0.copy() as the midpoint, so the
    output is the source frames doubled (each appears twice). That's
    not visually useful but proves the encoder pipe receives the
    right number of frames at the right shape.
    """
    pytest.importorskip("ffmpeg")
    pytest.importorskip("PIL")
    pytest.importorskip("numpy")

    src = _make_synth_source(tmp_path, frames=4, fps=24)
    dst = tmp_path / "interpolated.mp4"

    _install_fake_rife({"Rife": _FakeRifeIdentity})
    processor = fi._build_rife_processor()
    ok = fi._run_rife_pipeline(src, dst, base_fps=24, target_fps=48, processor=processor)

    assert ok is True
    assert dst.is_file()
    assert dst.stat().st_size > 0

    # Verify dst is 2× source frame count.
    import ffmpeg  # type: ignore

    probe = ffmpeg.probe(str(dst))
    vid = next(s for s in probe["streams"] if s["codec_type"] == "video")
    nb_frames = int(vid.get("nb_frames", "0")) or int(
        vid.get("nb_read_frames", "0")
    )
    # 4 src frames → 4 + 3 interpolated = 7 frames in the output
    # (we don't add a midpoint after the last frame).
    assert nb_frames in (
        7,
        8,
    ), f"expected 7-8 frames, got {nb_frames}"


def test_run_rife_pipeline_returns_false_when_midpoint_shape_wrong(
    tmp_path: Path, fake_rife_cleanup
) -> None:
    """A misbehaving rife processor that returns the wrong shape must
    not crash the encoder — the function returns False so the caller
    falls through to ffmpeg minterpolate."""
    pytest.importorskip("ffmpeg")
    pytest.importorskip("PIL")
    pytest.importorskip("numpy")

    class _WrongShape:
        def __init__(self, **_kwargs: Any) -> None:
            pass

        def process(self, img0: Any, _img1: Any) -> Any:
            from PIL import Image  # type: ignore

            return Image.new("RGB", (10, 10), "blue")  # wrong dims

    _install_fake_rife({"Rife": _WrongShape})
    src = _make_synth_source(tmp_path, frames=2, fps=24)
    dst = tmp_path / "bad_shape.mp4"

    processor = fi._build_rife_processor()
    ok = fi._run_rife_pipeline(src, dst, base_fps=24, target_fps=48, processor=processor)
    assert ok is False


# --- _try_interpolate_rife composition -------------------------------------


def test_try_interpolate_rife_falls_through_to_ffmpeg_when_wheel_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch, fake_rife_cleanup
) -> None:
    """`_try_interpolate_rife` must always produce SOME output: RIFE if
    the wheel is present, ffmpeg minterpolate otherwise."""
    sys.modules.pop("rife_ncnn_vulkan_python", None)

    ffmpeg_called: dict[str, int] = {"count": 0}

    def fake_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
        ffmpeg_called["count"] += 1
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(b"\x00")
        return True

    monkeypatch.setattr(fi, "_interpolate_via_ffmpeg", fake_ffmpeg)
    src = tmp_path / "in.mp4"
    src.write_bytes(b"")
    dst = tmp_path / "out.mp4"

    assert fi.try_interpolate(src, dst, 24, 48) is True
    assert ffmpeg_called["count"] == 1


def test_try_interpolate_rife_skips_ffmpeg_when_rife_succeeds(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch, fake_rife_cleanup
) -> None:
    """When RIFE succeeds, the minterpolate fallback must NOT run."""
    pytest.importorskip("ffmpeg")
    pytest.importorskip("PIL")
    pytest.importorskip("numpy")

    _install_fake_rife({"Rife": _FakeRifeIdentity})
    ffmpeg_called: dict[str, int] = {"count": 0}

    def fake_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
        ffmpeg_called["count"] += 1
        return True

    monkeypatch.setattr(fi, "_interpolate_via_ffmpeg", fake_ffmpeg)
    src = _make_synth_source(tmp_path, frames=3, fps=24)
    dst = tmp_path / "out.mp4"

    assert fi.try_interpolate(src, dst, 24, 48) is True
    assert ffmpeg_called["count"] == 0, "ffmpeg fallback must not run when RIFE wins"
