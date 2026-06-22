from svi2_video_worker.pipeline_svi2 import (
    _SIGMA_PRESETS,
    _is_distilled_sigma_preset,
    _resolve_cfg_scale,
    _resolve_fixed_sigmas,
)


def test_distilled_preset_expands_to_fixed_sigmas():
    expected = _SIGMA_PRESETS["distilled_4step"]
    assert _resolve_fixed_sigmas({"sigma_preset": "distilled_4step"}) == expected
    assert _resolve_fixed_sigmas({"sigma_preset": "DISTILLED_4STEP"}) == expected


def test_auto_preset_has_no_fixed_sigmas():
    assert _resolve_fixed_sigmas({}) is None
    assert _resolve_fixed_sigmas({"sigma_preset": "auto"}) is None
    assert _resolve_fixed_sigmas({"sigma_preset": "bogus"}) is None


def test_explicit_fixed_sigmas_overrides_preset():
    out = _resolve_fixed_sigmas({"sigma_preset": "distilled_4step", "fixed_sigmas": [1.0, 0.5, 0.0]})
    assert out == [1.0, 0.5, 0.0]


def test_distilled_preset_forces_cfg_off():
    assert _resolve_cfg_scale({"sigma_preset": "distilled_4step", "cfg_scale": 4.0}) == 1.0
    assert _is_distilled_sigma_preset({"sigma_preset": "distilled_4step"}) is True


def test_auto_preset_honours_requested_cfg():
    assert _resolve_cfg_scale({"cfg_scale": 4.0}) == 4.0
    assert _resolve_cfg_scale({"sigma_preset": "auto", "cfg_scale": 6.0}) == 6.0
    assert _is_distilled_sigma_preset({}) is False


def test_distilled_preset_yields_four_steps_in_scheduler():
    import pytest

    pytest.importorskip("torch")
    from svi2_video_worker.wan22.flow_match import FlowMatchScheduler

    scheduler = FlowMatchScheduler(template="Wan")
    scheduler.set_timesteps(num_inference_steps=50, shift=5.0)
    scheduler.set_fixed_sigmas(_SIGMA_PRESETS["distilled_4step"])
    assert len(scheduler.sigmas) == 4
    assert len(scheduler.timesteps) == 4
