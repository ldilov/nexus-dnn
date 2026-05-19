from __future__ import annotations

import zipfile
from pathlib import Path

import pytest

from ltx_video_worker import esrgan_upscale as eu


@pytest.fixture(autouse=True)
def _no_network(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv(eu._ESRGAN_AUTOSTAGE_ENV, "0")
    monkeypatch.delenv(eu._ESRGAN_BIN_ENV, raising=False)
    monkeypatch.delenv(eu._ESRGAN_URL_ENV, raising=False)


def test_platform_url_and_override(monkeypatch: pytest.MonkeyPatch):
    u = eu._platform_url()
    assert u and u.endswith(".zip") and eu._ESRGAN_TAG in u
    monkeypatch.setenv(eu._ESRGAN_URL_ENV, "https://example.test/x.zip")
    assert eu._platform_url() == "https://example.test/x.zip"


def test_find_binary_and_models_dir(tmp_path: Path):
    root = tmp_path / "stage"
    nested = root / "realesrgan-ncnn-vulkan-v0.2.0-windows"
    (nested / "models").mkdir(parents=True)
    exe = nested / "realesrgan-ncnn-vulkan.exe"
    exe.write_bytes(b"\x00")
    (nested / "models" / "realesrgan-x4plus.param").write_text("x")
    assert eu._find_binary(root) == exe
    assert eu._find_models_dir(exe) == nested / "models"


def test_find_models_dir_falls_back_to_param_dir(tmp_path: Path):
    binary = tmp_path / "realesrgan-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "weights").mkdir()
    (tmp_path / "weights" / "realesrgan-x4plus.param").write_text("x")
    assert eu._find_models_dir(binary) == tmp_path / "weights"


def test_resolve_explicit_bin(tmp_path: Path, monkeypatch: pytest.MonkeyPatch):
    binary = tmp_path / "realesrgan-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "models").mkdir()
    (tmp_path / "models" / "realesrgan-x4plus.param").write_text("x")
    monkeypatch.setenv(eu._ESRGAN_BIN_ENV, str(binary))
    assert eu._resolve_binary() == (binary, tmp_path / "models")


def test_resolve_none_when_autostage_off_and_absent(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    assert eu._resolve_binary() is None


def test_autostage_downloads_and_extracts(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    monkeypatch.setenv(eu._ESRGAN_AUTOSTAGE_ENV, "1")

    def fake_dl(url: str, dest: Path) -> bool:
        dest.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(dest, "w") as zf:
            zf.writestr("revk/realesrgan-ncnn-vulkan", "\x00")
            zf.writestr("revk/models/realesrgan-x4plus.param", "p")
            zf.writestr("revk/models/realesrgan-x4plus.bin", "b")
        return True

    monkeypatch.setattr(eu, "_download", fake_dl)
    resolved = eu._resolve_binary()
    assert resolved is not None
    binary, models = resolved
    assert binary.name == "realesrgan-ncnn-vulkan"
    assert models.name == "models"
    assert not (eu._stage_root() / f"realesrgan-ncnn-vulkan-{eu._ESRGAN_TAG}.zip").exists()


def test_autostage_download_failure_returns_none(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    monkeypatch.setenv(eu._ESRGAN_AUTOSTAGE_ENV, "1")
    monkeypatch.setattr(eu, "_download", lambda u, d: False)
    assert eu._resolve_binary() is None


def _synth(tmp_path: Path, frames=3, fps=16, w=64, h=36) -> Path:
    import ffmpeg  # type: ignore

    src = tmp_path / "src.mp4"
    (
        ffmpeg.input(f"color=c=red:s={w}x{h}:r={fps}:d={frames / fps}", f="lavfi")
        .output(str(src), vcodec="libx264", pix_fmt="yuv420p", loglevel="error")
        .overwrite_output()
        .run()
    )
    return src


def _fake_esrgan(monkeypatch: pytest.MonkeyPatch, out_w=256, out_h=144):
    def fake(cmd, *a, **k):  # noqa: ANN001
        argv = [str(c) for c in cmd]
        indir = Path(argv[argv.index("-i") + 1])
        outdir = Path(argv[argv.index("-o") + 1])
        from PIL import Image  # type: ignore

        outdir.mkdir(parents=True, exist_ok=True)
        for p in sorted(indir.glob("*.png")):
            Image.new("RGB", (out_w, out_h), (20, 40, 60)).save(outdir / p.name)

        class _R:
            returncode = 0

        return _R()

    monkeypatch.setattr(eu.subprocess, "run", fake)


def test_try_upscale_produces_target_dims(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    pytest.importorskip("ffmpeg")
    pytest.importorskip("PIL")
    binary = tmp_path / "realesrgan-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "models").mkdir()
    (tmp_path / "models" / "realesrgan-x4plus.param").write_text("x")
    monkeypatch.setenv(eu._ESRGAN_BIN_ENV, str(binary))
    _fake_esrgan(monkeypatch)

    src = _synth(tmp_path, frames=4, fps=16)
    dst = tmp_path / "up.mp4"
    assert eu.try_upscale(src, dst, 1920, 1080) is True

    import ffmpeg  # type: ignore

    v = next(
        s for s in ffmpeg.probe(str(dst))["streams"] if s["codec_type"] == "video"
    )
    assert (int(v["width"]), int(v["height"])) == (1920, 1080)


def test_try_upscale_false_without_binary(tmp_path: Path):
    src = tmp_path / "s.mp4"
    src.write_bytes(b"")
    dst = tmp_path / "d.mp4"
    assert eu.try_upscale(src, dst, 1920, 1080) is False
    assert not dst.exists()


def test_try_upscale_false_on_nonzero_exit(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
):
    pytest.importorskip("ffmpeg")
    binary = tmp_path / "realesrgan-ncnn-vulkan"
    binary.write_bytes(b"\x00")
    (tmp_path / "models").mkdir()
    (tmp_path / "models" / "realesrgan-x4plus.param").write_text("x")
    monkeypatch.setenv(eu._ESRGAN_BIN_ENV, str(binary))

    def fake(cmd, *a, **k):  # noqa: ANN001
        class _R:
            returncode = 1

        return _R()

    monkeypatch.setattr(eu.subprocess, "run", fake)
    src = _synth(tmp_path, frames=2)
    dst = tmp_path / "d.mp4"
    assert eu.try_upscale(src, dst, 1280, 720) is False
