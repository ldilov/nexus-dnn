from pathlib import Path

import pytest

from svi2_video_worker.pipeline_svi2 import (
    _svi_lora_for_tier,
    _svi_loras_for_split,
    _user_lora_failures,
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


def test_svi_loras_for_split_applies_pair_by_default():
    hi, lo = _svi_loras_for_split(Path("models"), {**_BASE})
    assert hi is not None and hi.name.endswith("high_noise_lora_v2.0_pro.safetensors")
    assert lo is not None and lo.name.endswith("low_noise_lora_v2.0_pro.safetensors")


@pytest.mark.parametrize("tier", ["high", "low"])
def test_svi_loras_for_split_on_for_non_off_tiers(tier):
    hi, lo = _svi_loras_for_split(Path("models"), {**_BASE, "svi_lora_tier": tier})
    assert hi is not None and lo is not None


def test_svi_loras_for_split_off_disables_both():
    hi, lo = _svi_loras_for_split(Path("models"), {**_BASE, "svi_lora_tier": "off"})
    assert hi is None and lo is None


def test_user_lora_failures_flags_missing_file():
    audit = {"low_lora": {"user": [{"path": "/x/distill.safetensors", "missing": True}]}}
    fails = _user_lora_failures(audit)
    assert len(fails) == 1 and "not found (low)" in fails[0]


def test_user_lora_failures_flags_zero_modules():
    audit = {"high_lora": {"user": [{"path": "/x/l.safetensors", "wrapped_count": 0}]}}
    fails = _user_lora_failures(audit)
    assert len(fails) == 1 and "0 modules (high)" in fails[0]


def test_user_lora_failures_passes_applied_lora():
    audit = {"high_lora": {"user": [{"path": "/x/l.safetensors", "wrapped_count": 405}]}}
    assert _user_lora_failures(audit) == []


def test_user_lora_failures_ignores_non_dict_audit():
    assert _user_lora_failures(None) == []
    assert _user_lora_failures({"high_lora": {}}) == []


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
