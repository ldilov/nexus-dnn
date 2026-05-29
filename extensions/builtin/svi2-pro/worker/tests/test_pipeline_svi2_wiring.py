import pytest
from svi2_video_worker.pipeline_svi2 import register_svi2_handlers, validate_render_params


def test_register_adds_render_handler():
    class Stub:
        def __init__(self): self.calls = {}
        def register(self, m, h): self.calls[m] = h
    s = Stub(); register_svi2_handlers(s)
    assert "svi2.video.render.start" in s.calls


def test_validate_render_params_rejects_missing_image():
    with pytest.raises(ValueError):
        validate_render_params({"prompts": ["a"]})


def test_validate_render_params_rejects_empty_prompts():
    with pytest.raises(ValueError):
        validate_render_params({"ref_image_path": "x.png", "prompts": []})


def test_validate_render_params_defaults():
    p = validate_render_params({"ref_image_path": "x.png", "prompts": ["a", "b"]})
    assert p["num_clips"] == 2 and p["height"] == 832 and p["width"] == 480
    assert p["cfg_scale"] == 5.0 and p["num_overlap_frame"] == 4
    assert p["num_motion_latent"] == 1 and p["fps"] == 15 and p["frames_per_clip"] == 81
    assert p["seed_multiplier"] == 42
