from __future__ import annotations

import sys
import types
from unittest.mock import MagicMock, patch

import numpy as np
import pytest

from longcat_video_worker import upscale_rtx


def _frames_u8(n: int = 4, h: int = 32, w: int = 48) -> np.ndarray:
    return np.full((n, h, w, 3), 128, dtype=np.uint8)


def test_is_rtx_vfx_available_no_torch() -> None:
    with patch.dict(sys.modules, {"torch": None}):
        # Force ImportError on `import torch` inside the function. Patching
        # sys.modules to None makes a subsequent import raise ImportError.
        # The probe must catch and return False with a clear reason string.
        ok, reason = upscale_rtx.is_rtx_vfx_available()
    assert ok is False
    assert "torch" in reason.lower()


def test_is_rtx_vfx_available_no_cuda() -> None:
    fake_torch = MagicMock()
    fake_torch.cuda.is_available.return_value = False
    with patch.dict(sys.modules, {"torch": fake_torch}):
        ok, reason = upscale_rtx.is_rtx_vfx_available()
    assert ok is False
    assert "cuda" in reason.lower()


def test_is_rtx_vfx_available_capability_too_low() -> None:
    fake_torch = MagicMock()
    fake_torch.cuda.is_available.return_value = True
    fake_torch.cuda.get_device_capability.return_value = (6, 1)
    with patch.dict(sys.modules, {"torch": fake_torch}):
        ok, reason = upscale_rtx.is_rtx_vfx_available()
    assert ok is False
    assert "compute capability" in reason.lower() or "(6, 1)" in reason


def test_is_rtx_vfx_available_no_nvvfx() -> None:
    fake_torch = MagicMock()
    fake_torch.cuda.is_available.return_value = True
    fake_torch.cuda.get_device_capability.return_value = (12, 0)
    with patch.dict(sys.modules, {"torch": fake_torch, "nvvfx": None}):
        ok, reason = upscale_rtx.is_rtx_vfx_available()
    assert ok is False
    assert "nvvfx" in reason.lower()


def test_is_rtx_vfx_available_all_ok() -> None:
    fake_torch = MagicMock()
    fake_torch.cuda.is_available.return_value = True
    fake_torch.cuda.get_device_capability.return_value = (12, 0)

    fake_nvvfx = types.ModuleType("nvvfx")
    setattr(fake_nvvfx, "VideoSuperRes", MagicMock())

    with patch.dict(sys.modules, {"torch": fake_torch, "nvvfx": fake_nvvfx}):
        ok, reason = upscale_rtx.is_rtx_vfx_available()
    assert ok is True
    assert reason == "ok"


def test_upscale_frames_rejects_bad_scale() -> None:
    with pytest.raises(ValueError, match="scale must be one of"):
        upscale_rtx.upscale_frames(_frames_u8(), scale=5)  # type: ignore[arg-type]


def test_upscale_frames_raises_when_unavailable() -> None:
    with patch.object(
        upscale_rtx, "is_rtx_vfx_available", return_value=(False, "no rtx")
    ):
        with pytest.raises(RuntimeError, match="VFX SDK upscale unavailable: no rtx"):
            upscale_rtx.upscale_frames(_frames_u8(), scale=2)


def test_upscale_frames_rejects_wrong_shape() -> None:
    with patch.object(
        upscale_rtx, "is_rtx_vfx_available", return_value=(True, "ok")
    ):
        fake_torch = MagicMock()
        fake_nvvfx = types.ModuleType("nvvfx")
        setattr(fake_nvvfx, "VideoSuperRes", MagicMock())
        with patch.dict(sys.modules, {"torch": fake_torch, "nvvfx": fake_nvvfx}):
            with pytest.raises(ValueError, match=r"frames must be \(N, H, W, 3\)"):
                upscale_rtx.upscale_frames(
                    np.zeros((4, 32), dtype=np.uint8), scale=2  # type: ignore[arg-type]
                )


def test_upscale_frames_rejects_bad_quality() -> None:
    fake_torch = MagicMock()
    fake_nvvfx = types.ModuleType("nvvfx")

    class _Q:
        HIGH = "HIGH"
        __members__ = {"HIGH": HIGH}

        @classmethod
        def __class_getitem__(cls, key: str) -> str:
            return cls.__members__[key]

    class _SR:
        QualityLevel = _Q

    setattr(fake_nvvfx, "VideoSuperRes", _SR)

    with patch.object(
        upscale_rtx, "is_rtx_vfx_available", return_value=(True, "ok")
    ):
        with patch.dict(sys.modules, {"torch": fake_torch, "nvvfx": fake_nvvfx}):
            with pytest.raises(ValueError, match="quality must be one of"):
                upscale_rtx.upscale_frames(
                    _frames_u8(),
                    scale=2,
                    quality="NOPE",  # type: ignore[arg-type]
                )


def test_upscale_frames_calls_unload_on_success() -> None:
    fake_torch = MagicMock()

    class _Q:
        HIGH = "HIGH"
        __members__ = {"HIGH": HIGH}

        @classmethod
        def __class_getitem__(cls, key: str) -> str:
            return cls.__members__[key]

    class _SRInst:
        is_loaded = True

        def __init__(self, device: int, quality: object) -> None:
            self.unload = MagicMock()

        def load(self) -> None:
            pass

        def run(self, *a: object, **kw: object) -> object:
            return MagicMock(image="dlpack-stub")

    instances: list[_SRInst] = []

    def _factory(device: int, quality: object) -> _SRInst:
        inst = _SRInst(device, quality)
        instances.append(inst)
        return inst

    _SR = MagicMock(side_effect=_factory)
    _SR.QualityLevel = _Q

    fake_nvvfx = types.ModuleType("nvvfx")
    setattr(fake_nvvfx, "VideoSuperRes", _SR)

    # Patch from_dlpack to return a controllable mock; mock all the torch
    # ops the function chains.
    fake_output_tensor = MagicMock()
    fake_output_tensor.clamp.return_value.__mul__.return_value.byte.return_value = (
        fake_output_tensor
    )
    fake_output_tensor.permute.return_value.contiguous.return_value.cpu.return_value.numpy.return_value = (
        np.zeros((64, 96, 3), dtype=np.uint8)
    )
    fake_output_tensor.clone.return_value = fake_output_tensor
    fake_torch.from_dlpack.return_value = fake_output_tensor

    # torch.from_numpy(...).to(...).permute(...).float().__truediv__(...)
    fake_input_tensor = MagicMock()
    fake_input_tensor.contiguous.return_value = fake_input_tensor
    fake_torch.from_numpy.return_value.to.return_value.permute.return_value.float.return_value.__truediv__.return_value = (
        fake_input_tensor
    )

    with patch.object(
        upscale_rtx, "is_rtx_vfx_available", return_value=(True, "ok")
    ):
        with patch.dict(sys.modules, {"torch": fake_torch, "nvvfx": fake_nvvfx}):
            upscale_rtx.upscale_frames(_frames_u8(n=2), scale=2)

    assert len(instances) == 1
    instances[0].unload.assert_called_once()


def test_upscale_frames_unload_called_even_on_run_exception() -> None:
    fake_torch = MagicMock()

    class _Q:
        HIGH = "HIGH"
        __members__ = {"HIGH": HIGH}

        @classmethod
        def __class_getitem__(cls, key: str) -> str:
            return cls.__members__[key]

    class _SRInst:
        is_loaded = True

        def __init__(self, device: int, quality: object) -> None:
            self.unload = MagicMock()

        def load(self) -> None:
            pass

        def run(self, *a: object, **kw: object) -> object:
            raise RuntimeError("simulated SDK failure")

    instances: list[_SRInst] = []

    def _factory(device: int, quality: object) -> _SRInst:
        inst = _SRInst(device, quality)
        instances.append(inst)
        return inst

    _SR = MagicMock(side_effect=_factory)
    _SR.QualityLevel = _Q

    fake_nvvfx = types.ModuleType("nvvfx")
    setattr(fake_nvvfx, "VideoSuperRes", _SR)

    with patch.object(
        upscale_rtx, "is_rtx_vfx_available", return_value=(True, "ok")
    ):
        with patch.dict(sys.modules, {"torch": fake_torch, "nvvfx": fake_nvvfx}):
            with pytest.raises(RuntimeError, match="simulated SDK failure"):
                upscale_rtx.upscale_frames(_frames_u8(n=2), scale=2)

    assert len(instances) == 1
    instances[0].unload.assert_called_once()
