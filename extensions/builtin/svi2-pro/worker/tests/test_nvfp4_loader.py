import pytest

torch = pytest.importorskip("torch")

from svi2_video_worker.nvfp4_loader import (
    NVFP4Linear,
    build_nvfp4_linears,
    dequantize_nvfp4,
    is_nvfp4_state_dict,
    nvfp4_member_keys,
    unpack_nvfp4_weight,
)

# Magnitudes of the E2M1 grid, indexed by (exp << 1) | mantissa.
_E2M1_GRID = torch.tensor([0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0])
_E2M1_SIGNED = torch.tensor(
    [0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0, -0.0, -0.5, -1.0, -1.5, -2.0, -3.0, -4.0, -6.0]
)


def _snap_to_e2m1_codes(x: torch.Tensor) -> torch.Tensor:
    """Nearest-grid E2M1 encode with sign, returning 4-bit codes
    (sign << 3) | grid_index — mirrors ComfyUI's packing semantics."""
    sign = (x < 0).to(torch.uint8)
    grid_index = (x.abs().unsqueeze(-1) - _E2M1_GRID).abs().argmin(dim=-1).to(torch.uint8)
    return (sign << 3) | grid_index


def _quantize_nvfp4_reference(
    weight: torch.Tensor,
) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
    """Reference NVFP4 encoder mirroring the ComfyUI _comfy convention:
    per-tensor scale amax/(6*448), per-16-block FP8 E4M3 scale, element-0 in the
    upper nibble. The loader's dequant must be the exact inverse of this."""
    out_f, in_f = weight.shape
    amax = weight.abs().max()
    s2 = (amax / (6.0 * 448.0)).to(torch.float32).clamp(min=1e-12)
    num_blocks = in_f // 16
    blocks = weight.reshape(out_f, num_blocks, 16)
    block_amax = blocks.abs().amax(dim=-1)
    block_scale = (block_amax / (6.0 * s2)).clamp(max=448.0)
    block_scale_e4m3 = block_scale.to(torch.float8_e4m3fn)
    denom = (block_scale_e4m3.to(torch.float32) * s2).clamp(min=1e-12)
    q = blocks / denom.unsqueeze(-1)
    codes = _snap_to_e2m1_codes(q).reshape(out_f, in_f)
    packed = ((codes[:, 0::2] << 4) | codes[:, 1::2]).to(torch.uint8)
    return packed, block_scale_e4m3, s2.reshape(1)


def test_unpack_nibble_order_element0_is_upper():
    # byte 0x35 -> upper nibble 0x3, lower nibble 0x5
    packed = torch.tensor([[0x35]], dtype=torch.uint8)
    codes = unpack_nvfp4_weight(packed)
    assert codes.tolist() == [[0x3, 0x5]]


def test_dequant_is_exact_inverse_of_reference_pack():
    torch.manual_seed(0)
    weight = torch.randn(32, 64) * 0.1
    packed, weight_scale, weight_scale_2 = _quantize_nvfp4_reference(weight)

    # Reconstruct expected weight straight from the codes + scales.
    codes = unpack_nvfp4_weight(packed)
    expected = _E2M1_SIGNED[codes]
    block_scale = weight_scale.to(torch.float32).repeat_interleave(16, dim=1)
    expected = expected * block_scale * weight_scale_2.to(torch.float32)[0]

    got = dequantize_nvfp4(packed, weight_scale, weight_scale_2, out_dtype=torch.float32)
    assert got.shape == (32, 64)
    assert torch.allclose(got, expected, atol=1e-5)


def test_dequant_approximates_original_weight():
    torch.manual_seed(1)
    weight = torch.randn(48, 128) * 0.05
    packed, weight_scale, weight_scale_2 = _quantize_nvfp4_reference(weight)
    got = dequantize_nvfp4(packed, weight_scale, weight_scale_2, out_dtype=torch.float32)
    rel_err = (got - weight).abs().mean() / weight.abs().mean()
    assert rel_err < 0.15


def test_dequant_matches_real_comfy_file_layout():
    # Byte-validated lightx2v/Wan2.2-NVFP4-Sparse _comfy layout: weight U8 [out,
    # in/2], weight_scale F8_E4M3 [out, in/16] PLAIN, weight_scale_2 F32 0-dim.
    torch.manual_seed(7)
    out_f, in_f = 64, 256
    weight = torch.randn(out_f, in_f) * 0.1
    packed, weight_scale, weight_scale_2 = _quantize_nvfp4_reference(weight)
    assert packed.dtype == torch.uint8 and tuple(packed.shape) == (out_f, in_f // 2)
    assert weight_scale.dtype == torch.float8_e4m3fn
    assert tuple(weight_scale.shape) == (out_f, in_f // 16)
    scalar_scale = weight_scale_2.reshape(())  # 0-dim, as on disk
    got = dequantize_nvfp4(packed, weight_scale, scalar_scale, out_dtype=torch.float32)
    assert got.shape == (out_f, in_f)
    assert (got - weight).abs().mean() / weight.abs().mean() < 0.15


def test_dequant_rejects_padded_block_mismatch():
    qweight = torch.zeros(8, 16, dtype=torch.uint8)  # in_features = 32
    weight_scale = torch.ones(8, 3, dtype=torch.float8_e4m3fn)  # 32 % 3 != 0
    weight_scale_2 = torch.ones(1)
    with pytest.raises(ValueError, match="not divisible"):
        dequantize_nvfp4(qweight, weight_scale, weight_scale_2)


def test_is_nvfp4_detects_only_weight_scale_2():
    nvfp4_state = {"blocks.0.ffn.0.weight_scale_2": torch.ones(1)}
    fp8_state = {"blocks.0.ffn.0.scale_weight": torch.ones(1)}
    bf16_state = {"blocks.0.ffn.0.weight": torch.ones(4, 4)}
    assert is_nvfp4_state_dict(nvfp4_state) is True
    assert is_nvfp4_state_dict(fp8_state) is False
    assert is_nvfp4_state_dict(bf16_state) is False


def test_nvfp4_linear_forward_matches_dequant_reference():
    torch.manual_seed(2)
    weight = torch.randn(16, 32) * 0.1
    packed, weight_scale, weight_scale_2 = _quantize_nvfp4_reference(weight)
    bias = torch.randn(16)
    linear = NVFP4Linear(
        32, 16, qweight=packed, weight_scale=weight_scale, weight_scale_2=weight_scale_2, bias=bias
    )
    x = torch.randn(4, 32, dtype=torch.bfloat16)
    ref_w = dequantize_nvfp4(packed, weight_scale, weight_scale_2)
    ref = (x.to(torch.bfloat16) @ ref_w.t()) + bias.to(torch.bfloat16)
    out = linear(x)
    assert out.shape == (4, 16)
    assert torch.allclose(out.float(), ref.float(), atol=1e-2)


def test_build_nvfp4_linears_bridges_prefix_and_pairs_triplets():
    torch.manual_seed(3)
    weight = torch.randn(16, 32) * 0.1
    packed, weight_scale, weight_scale_2 = _quantize_nvfp4_reference(weight)
    state = {
        "diffusion_model.blocks.0.ffn.0.weight": packed,
        "diffusion_model.blocks.0.ffn.0.weight_scale": weight_scale,
        "diffusion_model.blocks.0.ffn.0.weight_scale_2": weight_scale_2,
    }
    linears = build_nvfp4_linears(state)
    assert "blocks.0.ffn.0" in linears
    assert linears["blocks.0.ffn.0"].in_features == 32
    assert linears["blocks.0.ffn.0"].out_features == 16


def test_nvfp4_member_keys_excludes_all_triplet_members():
    state = {
        "diffusion_model.x.weight": torch.zeros(4, 4, dtype=torch.uint8),
        "diffusion_model.x.weight_scale": torch.ones(4, 1, dtype=torch.float8_e4m3fn),
        "diffusion_model.x.weight_scale_2": torch.ones(1),
        "diffusion_model.x.input_scale": torch.ones(1),
    }
    members = nvfp4_member_keys(state)
    assert "x.weight" in members
    assert "x.weight_scale" in members
    assert "x.weight_scale_2" in members
    assert "x.input_scale" in members


_TINY_CONFIG: dict = {
    "has_image_input": False,
    "patch_size": (1, 2, 2),
    "in_dim": 32,
    "dim": 48,
    "ffn_dim": 128,
    "freq_dim": 64,
    "text_dim": 32,
    "out_dim": 16,
    "num_heads": 4,
    "num_layers": 2,
    "eps": 1e-6,
    "require_clip_embedding": False,
}


def _nvfp4_synthetic_state_dict(WanModel) -> dict[str, torch.Tensor]:
    torch.manual_seed(0)
    reference = WanModel(**_TINY_CONFIG)
    state: dict[str, torch.Tensor] = {}
    for name, param in reference.named_parameters():
        tensor = param.detach()
        is_nvfp4_linear = name.endswith(".weight") and tensor.ndim == 2 and tensor.shape[1] % 16 == 0
        if is_nvfp4_linear:
            packed, weight_scale, weight_scale_2 = _quantize_nvfp4_reference(tensor.float())
            base = "diffusion_model." + name[: -len(".weight")]
            state[f"{base}.weight"] = packed
            state[f"{base}.weight_scale"] = weight_scale
            state[f"{base}.weight_scale_2"] = weight_scale_2
        else:
            state["diffusion_model." + name] = tensor.float()
    return state


def test_meta_load_nvfp4_materializes_and_forwards_finite():
    pytest.importorskip("ftfy")
    pytest.importorskip("transformers")
    from svi2_video_worker.fp8_loader import load_expert_meta
    from svi2_video_worker.wan22 import WanModel

    state = _nvfp4_synthetic_state_dict(WanModel)
    assert is_nvfp4_state_dict(state)

    import svi2_video_worker.fp8_loader as loader

    original = loader.load_fp8_state_dict
    loader.load_fp8_state_dict = lambda _path: state
    try:
        dit, audit = load_expert_meta(_TINY_CONFIG, "ignored.safetensors", lambda c: WanModel(**c))
    finally:
        loader.load_fp8_state_dict = original

    for name, param in dit.named_parameters():
        assert not param.is_meta, name
    for name, buf in dit.named_buffers():
        assert not buf.is_meta, name

    nvfp4_count = sum(1 for _, m in dit.named_modules() if isinstance(m, NVFP4Linear))
    assert nvfp4_count > 0
    assert audit["nvfp4_linears_built"] == nvfp4_count

    total_latent_frames = (5 - 1) // 4 + 1
    x = torch.randn(1, 16, total_latent_frames, 2, 2, dtype=torch.bfloat16)
    timestep = torch.tensor([500.0])
    context = torch.randn(1, 12, 32, dtype=torch.bfloat16)
    y = torch.zeros(1, 16, total_latent_frames, 2, 2, dtype=torch.bfloat16)
    with torch.no_grad():
        out = dit(x=x, timestep=timestep, context=context, clip_feature=None, y=y)
    assert torch.isfinite(out).all().item()
