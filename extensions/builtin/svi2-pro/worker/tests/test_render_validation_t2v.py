import pytest

from svi2_video_worker.pipeline_svi2 import validate_render_params


def _base(**overrides):
    params = {"prompts": ["a coherent motion prompt"], "num_clips": 1}
    params.update(overrides)
    return params


def test_text_to_video_accepts_missing_ref_image():
    validated = validate_render_params(_base(mode="text_to_video"))
    assert validated["mode"] == "text_to_video"
    assert validated["ref_image_path"] is None


def test_image_to_video_still_requires_ref_image():
    with pytest.raises(ValueError, match="ref_image_path is required"):
        validate_render_params(_base(mode="image_to_video"))


def test_missing_mode_defaults_to_image_to_video_and_requires_ref():
    with pytest.raises(ValueError, match="ref_image_path is required"):
        validate_render_params(_base())


def test_unknown_mode_rejected():
    with pytest.raises(ValueError, match="mode must be one of"):
        validate_render_params(_base(mode="audio_to_video", ref_image_path="x.png"))


def test_text_to_video_with_ref_image_keeps_ref():
    validated = validate_render_params(_base(mode="text_to_video", ref_image_path="x.png"))
    assert validated["mode"] == "text_to_video"
    assert validated["ref_image_path"] == "x.png"


def test_seed_carried_through_as_int():
    validated = validate_render_params(_base(mode="text_to_video", seed=1234))
    assert validated["seed"] == 1234


def test_seed_absent_is_none():
    validated = validate_render_params(_base(mode="text_to_video"))
    assert validated["seed"] is None
