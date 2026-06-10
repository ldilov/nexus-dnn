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
    assert p["dit_high_path"] is None and p["dit_low_path"] is None


def test_validate_render_params_passes_dit_overrides_through():
    p = validate_render_params(
        {
            "ref_image_path": "x.png",
            "prompts": ["a"],
            "dit_high_path": "/abs/high.safetensors",
            "dit_low_path": "/abs/low.safetensors",
        }
    )
    assert p["dit_high_path"] == "/abs/high.safetensors"
    assert p["dit_low_path"] == "/abs/low.safetensors"


def test_dit_overrides_win_over_models_dir_resolution():
    from pathlib import Path

    from svi2_video_worker.pipeline_svi2 import resolve_dit_paths

    high, low = resolve_dit_paths(
        {
            "dit_high_path": "/override/high.safetensors",
            "dit_low_path": "/override/low.safetensors",
        },
        Path("models"),
    )
    assert high == Path("/override/high.safetensors")
    assert low == Path("/override/low.safetensors")


def test_dit_paths_fall_back_to_models_dir():
    from pathlib import Path

    from svi2_video_worker.pipeline_svi2 import resolve_dit_paths

    high, low = resolve_dit_paths({}, Path("models"))
    assert str(high).startswith("models")
    assert "HIGH" in high.name
    assert str(low).startswith("models")
    assert "LOW" in low.name


def test_render_time_rejects_missing_override_file(tmp_path):
    from pathlib import Path

    from svi2_video_worker.pipeline_svi2 import resolve_dit_paths

    present = tmp_path / "high.safetensors"
    present.write_bytes(b"x")
    with pytest.raises(ValueError, match="dit_low_path does not exist"):
        resolve_dit_paths(
            {"dit_high_path": str(present), "dit_low_path": str(tmp_path / "missing.safetensors")},
            Path("models"),
            require_overrides_exist=True,
        )

    low = tmp_path / "low.safetensors"
    low.write_bytes(b"x")
    high, low_path = resolve_dit_paths(
        {"dit_high_path": str(present), "dit_low_path": str(low)},
        Path("models"),
        require_overrides_exist=True,
    )
    assert high == present and low_path == low
