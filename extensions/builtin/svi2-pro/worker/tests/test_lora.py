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


def test_wrap_module_with_lora_adds_delta_at_runtime():
    from svi2_video_worker.lora import wrap_module_with_lora

    torch.manual_seed(0)
    in_f, out_f, rank = 16, 8, 2

    class Tiny(torch.nn.Module):
        def __init__(self):
            super().__init__()
            self.proj = torch.nn.Linear(in_f, out_f, bias=False)

        def forward(self, x):
            return self.proj(x)

    model = Tiny().eval()
    A = torch.randn(rank, in_f)
    B = torch.randn(out_f, rank)
    pairs = {"proj": (A, B, 1.0)}

    x = torch.randn(4, in_f)
    base_out = model(x).detach().clone()

    report = wrap_module_with_lora(model, pairs)
    assert report["wrapped_count"] == 1 and report["missing_count"] == 0

    with torch.no_grad():
        wrapped_out = model(x)
    expected = base_out + (x @ A.t()) @ B.t()
    assert torch.allclose(wrapped_out, expected, atol=1e-4)


def test_wrap_module_with_lora_reports_missing_targets():
    from svi2_video_worker.lora import wrap_module_with_lora

    model = torch.nn.Module()
    pairs = {"does.not.exist": (torch.randn(2, 4), torch.randn(4, 2), 1.0)}
    report = wrap_module_with_lora(model, pairs)
    assert report["wrapped_count"] == 0 and report["missing_count"] == 1
