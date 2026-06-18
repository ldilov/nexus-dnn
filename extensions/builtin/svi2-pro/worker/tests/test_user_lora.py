import pytest
from svi2_video_worker.pipeline_svi2 import validate_render_params


def test_user_lora_params_normalized_and_clamped():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_lora_high_path": "/m/a.safetensors",
        "user_lora_low_path": "/m/b.safetensors",
        "user_lora_high_weight": 5.0,
        "user_lora_low_weight": -1.0,
    })
    assert p["user_lora_high_path"] == "/m/a.safetensors"
    assert p["user_lora_low_path"] == "/m/b.safetensors"
    assert p["user_lora_high_weight"] == 2.0
    assert p["user_lora_low_weight"] == 0.0


def test_user_lora_defaults_none():
    p = validate_render_params({"ref_image_path": "x.png", "prompts": ["a"]})
    assert p["user_lora_high_path"] is None
    assert p["user_lora_low_path"] is None
    assert p["user_lora_high_weight"] == 1.0
    assert p["user_lora_low_weight"] == 1.0


def test_user_lora_empty_string_normalizes_to_none():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_lora_high_path": "",
        "user_lora_low_path": "",
    })
    assert p["user_lora_high_path"] is None
    assert p["user_lora_low_path"] is None


def test_user_lora_weight_midrange():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_lora_high_weight": 1.5,
        "user_lora_low_weight": 0.75,
    })
    assert p["user_lora_high_weight"] == 1.5
    assert p["user_lora_low_weight"] == 0.75


def test_user_lora_weight_non_numeric_defaults_to_one():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_lora_high_weight": "bad",
        "user_lora_low_weight": None,
    })
    assert p["user_lora_high_weight"] == 1.0
    assert p["user_lora_low_weight"] == 1.0


def test_user_lora_apply_and_mismatch_warning(tmp_path):
    torch = pytest.importorskip("torch")
    safetensors_torch = pytest.importorskip("safetensors.torch")

    from svi2_video_worker.lora import load_lora_pairs, wrap_module_with_lora

    in_f, out_f, rank = 16, 8, 2

    class Tiny(torch.nn.Module):
        def __init__(self):
            super().__init__()
            self.proj = torch.nn.Linear(in_f, out_f, bias=False)

    model = Tiny().eval()

    matching_path = tmp_path / "matching.safetensors"
    tensors_match = {
        "proj.lora_A.weight": torch.randn(rank, in_f),
        "proj.lora_B.weight": torch.randn(out_f, rank),
    }
    safetensors_torch.save_file(tensors_match, str(matching_path))

    pairs = load_lora_pairs(matching_path)
    audit = wrap_module_with_lora(model, pairs)
    assert audit["wrapped_count"] >= 1

    mismatched_path = tmp_path / "mismatched.safetensors"
    tensors_mismatch = {
        "does.not.exist.lora_A.weight": torch.randn(rank, in_f),
        "does.not.exist.lora_B.weight": torch.randn(out_f, rank),
    }
    safetensors_torch.save_file(tensors_mismatch, str(mismatched_path))

    class Tiny2(torch.nn.Module):
        def __init__(self):
            super().__init__()
            self.proj = torch.nn.Linear(in_f, out_f, bias=False)

    model2 = Tiny2().eval()
    pairs2 = load_lora_pairs(mismatched_path)
    audit2 = wrap_module_with_lora(model2, pairs2)
    assert audit2["wrapped_count"] == 0
