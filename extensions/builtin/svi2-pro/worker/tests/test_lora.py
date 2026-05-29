import pytest

torch = pytest.importorskip("torch")
from svi2_video_worker.lora import apply_additive_lora, parse_lora_key


def test_additive_lora_matches_reference():
    torch.manual_seed(0)
    in_f, out_f, rank = 32, 16, 4
    base = torch.randn(out_f, in_f)
    A = torch.randn(rank, in_f)
    B = torch.randn(out_f, rank)
    x = torch.randn(8, in_f)
    ref = x @ (base + (B @ A)).t()
    base_out = x @ base.t()
    out = apply_additive_lora(base_out, x, A, B, scale=1.0)
    assert torch.allclose(out, ref, atol=1e-4)


def test_parse_lora_key_strips_diffusion_model_prefix():
    assert parse_lora_key("diffusion_model.blocks.0.attn.q.lora_down.weight") == ("blocks.0.attn.q", "down")
    assert parse_lora_key("blocks.0.attn.q.lora_A.weight") == ("blocks.0.attn.q", "down")
