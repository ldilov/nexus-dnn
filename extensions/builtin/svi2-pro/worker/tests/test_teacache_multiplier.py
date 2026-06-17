import pytest

from svi2_video_worker.pipeline_svi2 import (
    _TEACACHE_MULTIPLIER_THRESH,
    _resolve_teacache_thresh,
    validate_render_params,
)


def _base(**kw: object) -> dict:
    p: dict = {"ref_image_path": "x.png", "prompts": ["a"]}
    p.update(kw)
    return p


def test_multiplier_1x_gives_zero_thresh():
    assert _resolve_teacache_thresh({}) == 0.0


def test_multiplier_1x_explicit_gives_zero_thresh():
    assert _resolve_teacache_thresh({"teacache_multiplier": 1.0}) == 0.0


def test_multiplier_1_5x():
    assert _resolve_teacache_thresh({"teacache_multiplier": 1.5}) == pytest.approx(0.08)


def test_multiplier_2x():
    assert _resolve_teacache_thresh({"teacache_multiplier": 2.0}) == pytest.approx(0.15)


def test_multiplier_2_5x():
    assert _resolve_teacache_thresh({"teacache_multiplier": 2.5}) == pytest.approx(0.23)


def test_snap_between_values_1_6_goes_to_1_5():
    assert _resolve_teacache_thresh({"teacache_multiplier": 1.6}) == pytest.approx(0.08)


def test_snap_between_values_2_4_goes_to_2_5():
    assert _resolve_teacache_thresh({"teacache_multiplier": 2.4}) == pytest.approx(0.23)


def test_explicit_raw_thresh_wins_over_multiplier():
    result = _resolve_teacache_thresh({"teacache_thresh": 0.5, "teacache_multiplier": 2.0})
    assert result == pytest.approx(0.5)


def test_negative_raw_thresh_clamped_to_zero():
    assert _resolve_teacache_thresh({"teacache_thresh": -0.1}) == 0.0


def test_validate_render_params_default_teacache_off():
    p = validate_render_params(_base())
    assert p["teacache_multiplier"] == pytest.approx(1.0)
    assert p["teacache_thresh"] == pytest.approx(0.0)


def test_validate_render_params_multiplier_carried_and_thresh_derived():
    p = validate_render_params(_base(teacache_multiplier=2.0))
    assert p["teacache_multiplier"] == pytest.approx(2.0)
    assert p["teacache_thresh"] == pytest.approx(0.15)


def test_validate_render_params_raw_thresh_override():
    p = validate_render_params(_base(teacache_thresh=0.5, teacache_multiplier=2.0))
    assert p["teacache_thresh"] == pytest.approx(0.5)


def test_multiplier_table_has_expected_keys():
    assert set(_TEACACHE_MULTIPLIER_THRESH) == {1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5}


def test_multiplier_table_off_at_1x():
    assert _TEACACHE_MULTIPLIER_THRESH[1.0] == 0.0
