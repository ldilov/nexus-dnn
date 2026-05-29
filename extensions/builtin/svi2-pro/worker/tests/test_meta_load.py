import pytest

torch = pytest.importorskip("torch")

from svi2_video_worker.fp8_loader import (
    ScaledFP8Linear,
    is_fp8_dtype,
    load_expert_meta,
)
from svi2_video_worker.wan22 import WanModel


_TINY_CONFIG: dict = {
    "has_image_input": False,
    "patch_size": (1, 2, 2),
    "in_dim": 36,
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


def _build_tiny(config: dict) -> WanModel:
    return WanModel(**config)


def _synthetic_state_dict() -> dict[str, torch.Tensor]:
    torch.manual_seed(0)
    reference = WanModel(**_TINY_CONFIG)
    state: dict[str, torch.Tensor] = {}
    for name, param in reference.named_parameters():
        tensor = param.detach()
        if name.endswith(".weight") and tensor.ndim == 2:
            scale = tensor.abs().max().to(torch.float32) / 448.0
            fp8 = (tensor.float() / scale).clamp(-448, 448).to(torch.float8_e4m3fn)
            state["diffusion_model." + name] = fp8
            state["diffusion_model." + name[: -len(".weight")] + ".scale_weight"] = scale
        else:
            state["diffusion_model." + name] = tensor.float()
    return state


def test_meta_load_materializes_all_tensors():
    state = _synthetic_state_dict()

    import svi2_video_worker.fp8_loader as loader

    original = loader.load_fp8_state_dict
    loader.load_fp8_state_dict = lambda _path: state
    try:
        dit, audit = load_expert_meta(_TINY_CONFIG, "ignored.safetensors", _build_tiny)
    finally:
        loader.load_fp8_state_dict = original

    for name, param in dit.named_parameters():
        assert not param.is_meta, name
    for name, buf in dit.named_buffers():
        assert not buf.is_meta, name

    fp8_count = 0
    fp8_module_prefixes: list[str] = []
    for name, module in dit.named_modules():
        if isinstance(module, ScaledFP8Linear):
            fp8_count += 1
            assert is_fp8_dtype(module.weight_fp8.dtype)
            fp8_module_prefixes.append(name + ".")
    assert fp8_count > 0

    remainder_params = [
        (name, param)
        for name, param in dit.named_parameters()
        if not any(name.startswith(prefix) for prefix in fp8_module_prefixes)
    ]
    assert remainder_params
    assert all(param.dtype == torch.bfloat16 for _, param in remainder_params)

    assert isinstance(dit.freqs, tuple)
    for f in dit.freqs:
        assert isinstance(f, torch.Tensor)
        assert not f.is_meta
        assert f.device.type == "cpu"

    assert audit["overlap_pct"] > 0

    height, width = 16, 16
    frames = 5
    lat_h = height // 8
    lat_w = width // 8
    total_latent_frames = (frames - 1) // 4 + 1
    out_dim = _TINY_CONFIG["out_dim"]
    in_dim = _TINY_CONFIG["in_dim"]
    text_dim = _TINY_CONFIG["text_dim"]

    x = torch.randn(1, out_dim, total_latent_frames, lat_h, lat_w, dtype=torch.bfloat16)
    timestep = torch.tensor([500.0])
    context = torch.randn(1, 12, text_dim, dtype=torch.bfloat16)
    y = torch.zeros(1, in_dim - out_dim, total_latent_frames, lat_h, lat_w, dtype=torch.bfloat16)

    with torch.no_grad():
        out = dit(x=x, timestep=timestep, context=context, clip_feature=None, y=y)

    assert torch.isfinite(out).all().item()
