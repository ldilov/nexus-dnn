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


def test_kj_bridge_strips_prefix_and_audits_overlap():
    from svi2_video_worker.fp8_loader import (
        audit_key_overlap,
        bridge_kj_keys,
        build_fp8_linears,
        apply_fp8_linears_to_module,
    )
    from svi2_video_worker.wan22 import WanModel

    model = WanModel(
        dim=48,
        in_dim=36,
        ffn_dim=128,
        out_dim=16,
        text_dim=32,
        freq_dim=64,
        eps=1e-6,
        patch_size=(1, 2, 2),
        num_heads=4,
        num_layers=2,
        has_image_input=True,
        require_clip_embedding=False,
    )

    kj_state = {}
    for name, param in model.named_parameters():
        if name.endswith(".weight") and param.ndim == 2:
            scale = param.detach().abs().max().to(torch.float32) / 448.0
            fp8 = (param.detach().float() / scale).clamp(-448, 448).to(torch.float8_e4m3fn)
            kj_state["diffusion_model." + name] = fp8
            kj_state["diffusion_model." + name[: -len(".weight")] + ".scale_weight"] = scale

    bridged = bridge_kj_keys(kj_state)
    assert all(not k.startswith("diffusion_model.") for k in bridged)

    audit = audit_key_overlap(kj_state, model)
    assert audit["matched_count"] > 0
    assert audit["overlap_pct"] > 0

    linears = build_fp8_linears(kj_state)
    report = apply_fp8_linears_to_module(model, linears)
    assert report["installed_count"] == len(linears)
    assert report["missing_count"] == 0
