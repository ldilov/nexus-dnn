import pytest
import torch

from svi2_video_worker.wan22 import FlowMatchScheduler, WanModel


def _tiny_config() -> dict:
    return {
        "dim": 48,  # head_dim = dim // num_heads = 12, divisible by the 3D-RoPE thirds split
        "in_dim": 36,
        "ffn_dim": 128,
        "out_dim": 16,
        "text_dim": 32,
        "freq_dim": 64,
        "eps": 1e-6,
        "patch_size": (1, 2, 2),
        "num_heads": 4,
        "num_layers": 2,
        "has_image_input": True,
    }


def test_wanmodel_importable() -> None:
    assert WanModel is not None
    assert FlowMatchScheduler is not None


def test_wanmodel_instantiates_cpu() -> None:
    model = WanModel(**_tiny_config())
    assert isinstance(model, torch.nn.Module)
    assert len(model.blocks) == 2


def test_wanmodel_forward_i2v_shape() -> None:
    torch.manual_seed(0)
    cfg = _tiny_config()
    dtype = torch.float32
    model = WanModel(**cfg).to(dtype).eval()

    batch = 1
    latent_channels = 16
    cond_channels = cfg["in_dim"] - latent_channels  # y is concatenated on channel dim
    frames, height, width = 2, 8, 8

    x = torch.randn(batch, latent_channels, frames, height, width, dtype=dtype)
    y = torch.randn(batch, cond_channels, frames, height, width, dtype=dtype)
    timestep = torch.tensor([500], dtype=dtype)
    context = torch.randn(batch, 12, cfg["text_dim"], dtype=dtype)
    clip_feature = torch.randn(batch, 257, 1280, dtype=dtype)

    with torch.no_grad():
        out = model(
            x=x,
            timestep=timestep,
            context=context,
            clip_feature=clip_feature,
            y=y,
        )

    assert out.shape == (batch, cfg["out_dim"], frames, height, width)
    assert torch.isfinite(out).all()


def test_block_swap_sets_state_and_forward_runs() -> None:
    torch.manual_seed(0)
    cfg = _tiny_config()
    cfg["num_layers"] = 4
    dtype = torch.float32
    model = WanModel(**cfg).to(dtype).eval()

    cpu = torch.device("cpu")
    model.block_swap(2, main_device=cpu, offload_device=cpu)

    assert model.blocks_to_swap == 2
    assert model.main_device == cpu
    assert model.offload_device == cpu

    batch = 1
    latent_channels = 16
    cond_channels = cfg["in_dim"] - latent_channels
    frames, height, width = 2, 8, 8

    x = torch.randn(batch, latent_channels, frames, height, width, dtype=dtype)
    y = torch.randn(batch, cond_channels, frames, height, width, dtype=dtype)
    timestep = torch.tensor([500], dtype=dtype)
    context = torch.randn(batch, 12, cfg["text_dim"], dtype=dtype)
    clip_feature = torch.randn(batch, 257, 1280, dtype=dtype)

    with torch.no_grad():
        out = model(x=x, timestep=timestep, context=context, clip_feature=clip_feature, y=y)

    assert out.shape == (batch, cfg["out_dim"], frames, height, width)
    assert torch.isfinite(out).all()


def test_block_swap_clamps_to_block_count() -> None:
    cfg = _tiny_config()
    cfg["num_layers"] = 4
    model = WanModel(**cfg).eval()
    cpu = torch.device("cpu")

    model.block_swap(99, main_device=cpu, offload_device=cpu)
    assert model.blocks_to_swap == 4

    model.block_swap(0, main_device=cpu, offload_device=cpu)
    assert model.blocks_to_swap == 0


def test_flow_match_scheduler_wan() -> None:
    scheduler = FlowMatchScheduler(template="Wan")
    scheduler.set_timesteps(num_inference_steps=8)
    assert len(scheduler.timesteps) == 8
    assert len(scheduler.sigmas) == 8

    sample = torch.randn(1, 16, 2, 8, 8)
    model_output = torch.randn_like(sample)
    prev = scheduler.step(model_output, scheduler.timesteps[0], sample)
    assert prev.shape == sample.shape
