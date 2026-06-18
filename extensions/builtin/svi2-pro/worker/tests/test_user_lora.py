import pytest
from svi2_video_worker.pipeline_svi2 import validate_render_params


def test_user_loras_normalized_clamped_capped():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_loras": [
            {"path": "/m/a.safetensors", "weight": 5.0},
            {"path": "/m/b.safetensors", "weight": -1.0},
            {"path": "", "weight": 1.0},
            {"path": "/m/c.safetensors"},
            {"path": "/m/d.safetensors", "weight": 1.0},
            {"path": "/m/e.safetensors", "weight": 1.0},
        ],
    })
    out = p["user_loras"]
    assert [e["path"] for e in out] == [
        "/m/a.safetensors",
        "/m/b.safetensors",
        "/m/c.safetensors",
        "/m/d.safetensors",
    ]
    assert out[0]["weight"] == 2.0
    assert out[1]["weight"] == 0.0
    assert out[2]["weight"] == 1.0


def test_user_loras_defaults_empty():
    assert validate_render_params({"ref_image_path": "x.png", "prompts": ["a"]})["user_loras"] == []


def test_user_loras_non_list_treated_as_empty():
    p = validate_render_params({"ref_image_path": "x.png", "prompts": ["a"], "user_loras": "bad"})
    assert p["user_loras"] == []


def test_user_loras_non_dict_entries_skipped():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_loras": [
            "/m/a.safetensors",
            {"path": "/m/b.safetensors", "weight": 0.5},
        ],
    })
    assert [e["path"] for e in p["user_loras"]] == ["/m/b.safetensors"]
    assert p["user_loras"][0]["weight"] == 0.5


def test_user_loras_whitespace_path_skipped():
    p = validate_render_params({
        "ref_image_path": "x.png",
        "prompts": ["a"],
        "user_loras": [{"path": "   ", "weight": 1.0}],
    })
    assert p["user_loras"] == []


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
