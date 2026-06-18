from pathlib import Path

import pytest

from svi2_video_worker.pipeline_svi2 import (
    _svi_lora_for_tier,
    _validate_svi_lora_tier,
    _validate_torch_compile_mode,
    validate_render_params,
)

_BASE = {"ref_image_path": "x.png", "prompts": ["a"]}


def test_svi_lora_tier_defaults_high():
    assert validate_render_params(_BASE)["svi_lora_tier"] == "high"


@pytest.mark.parametrize("raw,expected", [
    ("high", "high"),
    ("LOW", "low"),
    ("Off", "off"),
    ("bogus", "high"),
    (None, "high"),
])
def test_svi_lora_tier_validation(raw, expected):
    params = {**_BASE} if raw is None else {**_BASE, "svi_lora_tier": raw}
    assert _validate_svi_lora_tier(params) == expected


def test_svi_lora_for_tier_maps_to_artifacts():
    md = Path("models")
    assert _svi_lora_for_tier(md, "high").name.endswith("high_noise_lora_v2.0_pro.safetensors")
    assert _svi_lora_for_tier(md, "low").name.endswith("low_noise_lora_v2.0_pro.safetensors")
    assert _svi_lora_for_tier(md, "off") is None


@pytest.mark.parametrize("raw,expected", [
    ("default", "default"),
    ("reduce-overhead", "reduce-overhead"),
    ("MAX-AUTOTUNE", "max-autotune"),
    ("nonsense", "default"),
])
def test_torch_compile_mode_validation(raw, expected):
    assert _validate_torch_compile_mode({**_BASE, "torch_compile_mode": raw}) == expected


def test_torch_compile_mode_defaults_default():
    assert validate_render_params(_BASE)["torch_compile_mode"] == "default"
