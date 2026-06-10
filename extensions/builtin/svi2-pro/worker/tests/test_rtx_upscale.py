from pathlib import Path

import pytest

from svi2_video_worker.pipeline_svi2 import validate_render_params
from svi2_video_worker.rtx_upscale import (
    DEFAULT_QUALITY,
    UPSCALE_FACTORS,
    UPSCALE_QUALITIES,
    try_rtx_upscale,
)


def _base_params(**overrides):
    params = {
        "ref_image_path": "anchor.png",
        "prompts": ["a slow pan"],
        "width": 480,
        "height": 832,
    }
    params.update(overrides)
    return params


def test_upscale_defaults_off():
    validated = validate_render_params(_base_params())
    assert validated["upscale_factor"] == 0
    assert validated["upscale_quality"] == DEFAULT_QUALITY


@pytest.mark.parametrize("factor", [2, 3, 4])
def test_upscale_accepts_supported_factors(factor):
    validated = validate_render_params(_base_params(upscale_factor=factor))
    assert validated["upscale_factor"] == factor


@pytest.mark.parametrize("factor", [1, 5, 8, -2])
def test_upscale_rejects_unsupported_factors(factor):
    with pytest.raises(ValueError, match="upscale_factor"):
        validate_render_params(_base_params(upscale_factor=factor))


@pytest.mark.parametrize("quality", list(UPSCALE_QUALITIES))
def test_upscale_accepts_all_quality_presets(quality):
    validated = validate_render_params(_base_params(upscale_quality=quality.lower()))
    assert validated["upscale_quality"] == quality


def test_upscale_rejects_unknown_quality():
    with pytest.raises(ValueError, match="upscale_quality"):
        validate_render_params(_base_params(upscale_quality="EXTREME"))


def test_factor_zero_is_listed_as_off():
    assert 0 in UPSCALE_FACTORS


def test_try_rtx_upscale_returns_false_without_nvvfx(tmp_path: Path):
    src = tmp_path / "in.mp4"
    src.write_bytes(b"not a real video")
    dst = tmp_path / "out.mp4"
    assert try_rtx_upscale(src, dst, 2) is False
    assert not dst.exists()


def test_try_rtx_upscale_rejects_bad_scale(tmp_path: Path):
    src = tmp_path / "in.mp4"
    src.write_bytes(b"x")
    assert try_rtx_upscale(src, tmp_path / "out.mp4", 5) is False
