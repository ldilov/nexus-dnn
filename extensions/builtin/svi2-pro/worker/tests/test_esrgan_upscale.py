from pathlib import Path

import pytest

from svi2_video_worker import esrgan_torch_upscale as esr
from svi2_video_worker.esrgan_torch_upscale import _resolve_weights, try_esrgan_upscale


def test_rejects_bad_scale(tmp_path: Path):
    src = tmp_path / "in.mp4"
    src.write_bytes(b"x")
    assert try_esrgan_upscale(src, tmp_path / "out.mp4", 5) is False
    assert not (tmp_path / "out.mp4").exists()


def test_returns_false_when_unavailable(tmp_path: Path, monkeypatch):
    # No CUDA in CI (and autostage disabled so the weights path also can't
    # reach out to the network): the optional stage must fail soft.
    monkeypatch.setenv(esr._AUTOSTAGE_ENV, "0")
    monkeypatch.delenv(esr._WEIGHTS_ENV, raising=False)
    src = tmp_path / "in.mp4"
    src.write_bytes(b"not a real video")
    dst = tmp_path / "out.mp4"
    assert try_esrgan_upscale(src, dst, 2, models_dir=tmp_path) is False
    assert not dst.exists()


def test_resolve_weights_env_override_present(tmp_path: Path, monkeypatch):
    weights = tmp_path / "custom.pth"
    weights.write_bytes(b"weights")
    monkeypatch.setenv(esr._WEIGHTS_ENV, str(weights))
    assert _resolve_weights(None) == weights


def test_resolve_weights_env_override_missing(tmp_path: Path, monkeypatch):
    monkeypatch.setenv(esr._WEIGHTS_ENV, str(tmp_path / "nope.pth"))
    assert _resolve_weights(None) is None


def test_resolve_weights_uses_staged_copy(tmp_path: Path, monkeypatch):
    monkeypatch.delenv(esr._WEIGHTS_ENV, raising=False)
    monkeypatch.setenv(esr._AUTOSTAGE_ENV, "0")
    staged = tmp_path / "realesrgan" / esr._WEIGHTS_NAME
    staged.parent.mkdir(parents=True)
    staged.write_bytes(b"weights")
    assert _resolve_weights(tmp_path) == staged


def test_resolve_weights_autostage_disabled_returns_none(tmp_path: Path, monkeypatch):
    monkeypatch.delenv(esr._WEIGHTS_ENV, raising=False)
    monkeypatch.setenv(esr._AUTOSTAGE_ENV, "0")
    assert _resolve_weights(tmp_path) is None


def test_rrdbnet_x4_quadruples_resolution():
    torch = pytest.importorskip("torch")
    from svi2_video_worker.realesrgan_arch import RRDBNet

    model = RRDBNet(scale=4, num_block=1).eval()
    with torch.no_grad():
        out = model(torch.rand(1, 3, 8, 8))
    assert out.shape == (1, 3, 32, 32)


def test_rrdbnet_x2_doubles_resolution():
    torch = pytest.importorskip("torch")
    from svi2_video_worker.realesrgan_arch import RRDBNet

    model = RRDBNet(scale=2, num_block=1).eval()
    with torch.no_grad():
        out = model(torch.rand(1, 3, 8, 8))
    assert out.shape == (1, 3, 16, 16)
