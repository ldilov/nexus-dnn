import pytest

torch = pytest.importorskip("torch")
from svi2_video_worker.fp8_loader import ScaledFP8Linear, is_fp8_dtype


def test_scaled_fp8_linear_matches_bf16_reference():
    torch.manual_seed(0)
    in_f, out_f = 64, 32
    w_bf16 = (torch.randn(out_f, in_f) * 0.1).to(torch.bfloat16)
    scale = w_bf16.abs().max().to(torch.float32) / 448.0
    w_fp8 = (w_bf16.float() / scale).clamp(-448, 448).to(torch.float8_e4m3fn)
    lin = ScaledFP8Linear(in_f, out_f, weight_fp8=w_fp8, scale_weight=scale)
    x = torch.randn(4, in_f, dtype=torch.bfloat16)
    ref = x.float() @ w_bf16.float().t()
    out = lin(x)
    assert out.shape == (4, out_f)
    assert torch.allclose(out.float(), ref, atol=0.5, rtol=0.1)


def test_is_fp8_dtype():
    assert is_fp8_dtype(torch.float8_e4m3fn) is True
    assert is_fp8_dtype(torch.bfloat16) is False
