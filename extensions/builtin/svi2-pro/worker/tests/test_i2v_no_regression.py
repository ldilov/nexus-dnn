import pytest

from svi2_video_worker.pipeline_svi2 import validate_render_params


def _i2v_request(**overrides):
    params = {
        "ref_image_path": "ref.png",
        "prompts": ["a coherent motion prompt"],
        "num_clips": 3,
        "frames_per_clip": 81,
        "width": 480,
        "height": 832,
        "fps": 15,
    }
    params.update(overrides)
    return params


def test_i2v_mode_absent_defaults_to_image_to_video():
    validated = validate_render_params(_i2v_request())
    assert validated["mode"] == "image_to_video"
    assert validated["ref_image_path"] == "ref.png"


def test_i2v_validated_shape_is_unchanged_golden():
    validated = validate_render_params(_i2v_request())

    expected_core = {
        "mode": "image_to_video",
        "seed": None,
        "seed_strength": None,
        "ref_image_path": "ref.png",
        "last_image_path": None,
        "prompts": ["a coherent motion prompt"],
        "num_clips": 3,
        "height": 832,
        "width": 480,
        "fps": 15,
        "frames_per_clip": 81,
        "cfg_scale": 5.0,
        "num_inference_steps": 50,
        "sigma_shift": 5.0,
        "switch_boundary": 0.9,
        "num_overlap_frame": 4,
        "stitch_mode": "crossfade",
        "num_motion_latent": 1,
        "pixel_re_encode": False,
        "num_motion_frame": 4,
        "interpolate_fps": 0,
        "interpolate_method": "rife",
        "blocks_to_swap": 40,
        "seed_multiplier": 42,
        "output_path": "out.mp4",
    }
    for key, value in expected_core.items():
        assert validated[key] == value, key


def test_i2v_explicit_mode_equivalent_to_absent():
    absent = validate_render_params(_i2v_request())
    explicit = validate_render_params(_i2v_request(mode="image_to_video"))
    assert absent == explicit


def test_i2v_conditioning_shape_unchanged():
    import torch

    from svi2_video_worker.pipeline_svi2 import _build_image_conditioning

    height, width = 832, 480
    total_latent_frames = (81 - 1) // 4 + 1
    anchor_lat = torch.zeros(16, 1, height // 8, width // 8)

    y = _build_image_conditioning(
        anchor_lat,
        None,
        total_latent_frames=total_latent_frames,
        num_frames=81,
        height=height,
        width=width,
        num_motion_latent=1,
    )
    # y = [mask(4) + cond(16)] over latent frames, batched.
    assert y.shape == (1, 20, total_latent_frames, height // 8, width // 8)
