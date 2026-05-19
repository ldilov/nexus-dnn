from __future__ import annotations

import subprocess
import zipfile
from pathlib import Path

import pytest

from ltx_video_worker import fps_interp as fi


@pytest.fixture(autouse=True)
def _no_network(monkeypatch: pytest.MonkeyPatch):
    """Autostage defaults ON in prod; force it OFF for every test so a
    missing binary never triggers a real ~tens-of-MB GitHub download."""
    monkeypatch.setenv(fi._RIFE_AUTOSTAGE_ENV, "0")
    monkeypatch.delenv(fi._RIFE_BIN_ENV, raising=False)
    monkeypatch.delenv(fi._RIFE_URL_ENV, raising=False)


# --- pure helpers ----------------------------------------------------------


@pytest.mark.parametrize(
    "raw,default,expected",
    [
        (None, True, True),
        (None, False, False),
        ("", True, True),
        ("1", False, True),
        ("true", False, True),
        ("ON", False, True),
        ("0", True, False),
        ("nope", True, False),
    ],
)
def test_coerce_bool(raw, default, expected):
    assert fi._coerce_bool(raw, default) is expected


def test_platform_url_resolves_for_host_and_honours_override(
    monkeypatch: pytest.MonkeyPatch,
):
    url = fi._platform_rife_url()
    assert url is not None and url.endswith(".zip")
    assert fi._RIFE_TAG in url
    monkeypatch.setenv(fi._RIFE_URL_ENV, "https://example.test/custom.zip")
    assert fi._platform_rife_url() == "https://example.test/custom.zip"


def test_find_binary_and_model_dir(tmp_path: Path):
    root = tmp_path / "stage"
    nested = root / "rife-ncnn-vulkan-20221029-windows"
    nested.mkdir(parents=True)
    exe = nested / "rife-ncnn-vulkan.exe"
    exe.write_bytes(b"\x00")
    (nested / "rife-v4").mkdir()
    (nested / "rife-v4.6").mkdir()

    found = fi._find_binary(root)
    assert found == exe
    # rife-v4.6 is preferred over the lexicographically-earlier rife-v4.
    assert fi._find_model_dir(found) == nested / "rife-v4.6"


def test_find_model_dir_falls_back_to_any_rife_dir(tmp_path: Path):
    base = tmp_path
    (base / "rife-anime").mkdir()
    binary = base / "rife-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    assert fi._find_model_dir(binary) == base / "rife-anime"


# --- _resolve_rife_binary --------------------------------------------------


def test_resolve_explicit_bin_precedence(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    binary = tmp_path / "rife-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "rife-v4.6").mkdir()
    monkeypatch.setenv(fi._RIFE_BIN_ENV, str(binary))
    resolved = fi._resolve_rife_binary()
    assert resolved == (binary, tmp_path / "rife-v4.6")


def test_resolve_explicit_bin_missing_returns_none(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv(fi._RIFE_BIN_ENV, str(tmp_path / "nope"))
    assert fi._resolve_rife_binary() is None


def test_resolve_returns_none_when_autostage_disabled_and_absent(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    # autostage off (autouse fixture) + nothing staged → None, no network.
    assert fi._resolve_rife_binary() is None


def test_autostage_uses_already_staged_binary(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    root = fi._stage_root()
    sub = root / "rife-ncnn-vulkan-20221029-ubuntu"
    sub.mkdir(parents=True)
    (sub / "rife-ncnn-vulkan").write_bytes(b"\x00")
    (sub / "rife-v4.6").mkdir()
    resolved = fi._resolve_rife_binary()
    assert resolved is not None
    assert resolved[0] == sub / "rife-ncnn-vulkan"


def test_autostage_downloads_and_extracts_when_enabled(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    monkeypatch.setenv(fi._RIFE_AUTOSTAGE_ENV, "1")

    def fake_download(url: str, dest: Path) -> bool:
        dest.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("rife-ncnn-vulkan-20221029-ubuntu/rife-ncnn-vulkan", "\x00")
            zf.writestr("rife-ncnn-vulkan-20221029-ubuntu/rife-v4.6/flownet.bin", "x")
        return True

    monkeypatch.setattr(fi, "_download", fake_download)
    resolved = fi._resolve_rife_binary()
    assert resolved is not None
    binary, model_dir = resolved
    assert binary.name == "rife-ncnn-vulkan"
    assert model_dir.name == "rife-v4.6"
    # Zip is cleaned up after extraction.
    assert not (fi._stage_root() / f"rife-ncnn-vulkan-{fi._RIFE_TAG}.zip").exists()


def test_autostage_download_failure_returns_none(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    monkeypatch.setenv(fi._RIFE_AUTOSTAGE_ENV, "1")
    monkeypatch.setattr(fi, "_download", lambda url, dest: False)
    assert fi._resolve_rife_binary() is None


# --- end-to-end binary pipeline (synthetic source, fake subprocess) --------


def _make_synth_source(
    tmp_path: Path, frames: int = 4, fps: int = 24, w: int = 64, h: int = 48
) -> Path:
    import ffmpeg  # type: ignore

    src = tmp_path / "synth.mp4"
    (
        ffmpeg.input(
            f"color=c=red:s={w}x{h}:r={fps}:d={frames / fps}", f="lavfi"
        )
        .output(str(src), vcodec="libx264", pix_fmt="yuv420p", loglevel="error")
        .overwrite_output()
        .run()
    )
    return src


def _fake_rife_run(monkeypatch: pytest.MonkeyPatch) -> None:
    """Replace subprocess.run so the 'binary' just emits N png frames
    into -o <outdir> (N taken from -n), proving the extract→invoke→
    re-encode pipeline shape without a real rife/Vulkan/GPU."""
    real_run = subprocess.run

    def fake(cmd, *a, **k):  # noqa: ANN001
        argv = [str(c) for c in cmd]
        outdir = Path(argv[argv.index("-o") + 1])
        n = int(argv[argv.index("-n") + 1])
        from PIL import Image  # type: ignore

        outdir.mkdir(parents=True, exist_ok=True)
        for i in range(1, n + 1):
            Image.new("RGB", (64, 48), (10, 20, 30)).save(
                outdir / f"{i:08d}.png"
            )

        class _R:
            returncode = 0

        return _R()

    monkeypatch.setattr(fi.subprocess, "run", fake)
    _ = real_run


def test_rife_binary_pipeline_doubles_frames(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    pytest.importorskip("ffmpeg")
    pytest.importorskip("PIL")

    binary = tmp_path / "rife-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "rife-v4.6").mkdir()
    monkeypatch.setenv(fi._RIFE_BIN_ENV, str(binary))
    _fake_rife_run(monkeypatch)

    src = _make_synth_source(tmp_path, frames=4, fps=24)
    dst = tmp_path / "out.mp4"
    assert fi._interpolate_via_rife_binary(src, dst, 24, 48) is True
    assert dst.is_file() and dst.stat().st_size > 0

    import ffmpeg  # type: ignore

    probe = ffmpeg.probe(str(dst))
    vid = next(s for s in probe["streams"] if s["codec_type"] == "video")
    nb = int(vid.get("nb_frames", "0")) or int(
        vid.get("nb_read_frames", "0")
    )
    assert nb >= 7, f"expected ~2x of 4 frames, got {nb}"


def test_rife_binary_pipeline_returns_false_on_nonzero_exit(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    pytest.importorskip("ffmpeg")
    binary = tmp_path / "rife-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "rife-v4.6").mkdir()
    monkeypatch.setenv(fi._RIFE_BIN_ENV, str(binary))

    def fake(cmd, *a, **k):  # noqa: ANN001
        class _R:
            returncode = 1

        return _R()

    monkeypatch.setattr(fi.subprocess, "run", fake)
    src = _make_synth_source(tmp_path, frames=2, fps=24)
    dst = tmp_path / "bad.mp4"
    assert fi._interpolate_via_rife_binary(src, dst, 24, 48) is False


# --- try_interpolate composition -------------------------------------------


def test_try_interpolate_falls_through_to_ffmpeg_without_binary(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    calls: dict[str, int] = {"n": 0}

    def fake_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
        calls["n"] += 1
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(b"\x00")
        return True

    monkeypatch.setattr(fi, "_interpolate_via_ffmpeg", fake_ffmpeg)
    src = tmp_path / "in.mp4"
    src.write_bytes(b"")
    dst = tmp_path / "out.mp4"
    # autostage off + no binary → ffmpeg fallback carries it.
    assert fi.try_interpolate(src, dst, 24, 48) is True
    assert calls["n"] == 1


def test_try_interpolate_skips_ffmpeg_when_binary_succeeds(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    pytest.importorskip("ffmpeg")
    pytest.importorskip("PIL")
    binary = tmp_path / "rife-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "rife-v4.6").mkdir()
    monkeypatch.setenv(fi._RIFE_BIN_ENV, str(binary))
    _fake_rife_run(monkeypatch)

    calls: dict[str, int] = {"n": 0}
    monkeypatch.setattr(
        fi,
        "_interpolate_via_ffmpeg",
        lambda *a, **k: calls.__setitem__("n", calls["n"] + 1) or True,
    )
    src = _make_synth_source(tmp_path, frames=3, fps=24)
    dst = tmp_path / "out.mp4"
    assert fi.try_interpolate(src, dst, 24, 48) is True
    assert calls["n"] == 0


def test_try_interpolate_noop_when_target_not_greater(tmp_path: Path):
    src = tmp_path / "in.mp4"
    src.write_bytes(b"")
    dst = tmp_path / "out.mp4"
    assert fi.try_interpolate(src, dst, 24, 24) is False
    assert fi.try_interpolate(src, dst, 24, 12) is False
