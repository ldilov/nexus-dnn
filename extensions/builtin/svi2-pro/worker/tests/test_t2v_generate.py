import pytest

from svi2_video_worker.pipeline_svi2 import (
    _WAN22_A14B_CONFIG,
    _WAN22_T2V_A14B_CONFIG,
    _ARTIFACT_FILENAMES,
)


def test_t2v_config_is_latent_only_no_conditioning():
    assert _WAN22_T2V_A14B_CONFIG["in_dim"] == 16
    assert _WAN22_T2V_A14B_CONFIG["require_vae_embedding"] is False
    assert _WAN22_T2V_A14B_CONFIG["has_image_input"] is False
    assert _WAN22_T2V_A14B_CONFIG["require_clip_embedding"] is False


def test_t2v_config_shares_transformer_shape_with_i2v():
    for key in ("dim", "ffn_dim", "freq_dim", "text_dim", "out_dim", "num_heads", "num_layers"):
        assert _WAN22_T2V_A14B_CONFIG[key] == _WAN22_A14B_CONFIG[key], key


def test_t2v_artifact_filenames_registered():
    assert _ARTIFACT_FILENAMES["dit-t2v-high"].startswith("T2V/")
    assert _ARTIFACT_FILENAMES["dit-t2v-low"].startswith("T2V/")
    assert "T2V" in _ARTIFACT_FILENAMES["dit-t2v-high"]


def test_t2v_expert_carries_no_lora():
    pytest.importorskip("torch")
    from svi2_video_worker.pipeline_svi2 import _build_t2v_expert

    expert = _build_t2v_expert(__import__("pathlib").Path("does-not-exist.safetensors"))
    assert expert.lora_audit == {}
    assert expert.dit.in_dim == 16
    assert expert.dit.require_vae_embedding is False


def test_t2v_dit_runs_without_y_conditioning():
    torch = pytest.importorskip("torch")
    from svi2_video_worker.wan22 import WanModel

    tiny = {
        **_WAN22_T2V_A14B_CONFIG,
        "dim": 48,
        "ffn_dim": 128,
        "freq_dim": 64,
        "text_dim": 32,
        "num_heads": 4,
        "num_layers": 2,
    }
    dit = WanModel(**tiny).eval()

    frames, lat_h, lat_w = 2, 8, 8
    x = torch.randn(1, tiny["out_dim"], frames, lat_h, lat_w)
    context = torch.randn(1, 12, tiny["text_dim"])
    timestep = torch.tensor([500.0])

    with torch.no_grad():
        out = dit(x=x, timestep=timestep, context=context, clip_feature=None, y=None)
    assert out.shape == x.shape
    assert torch.isfinite(out).all()


def test_generate_t2v_clip0_seed_wires_and_returns_chain_carry(tmp_path):
    torch = pytest.importorskip("torch")
    from svi2_video_worker.pipeline_svi2 import (
        ExpertModel,
        _generate_t2v_clip0,
        validate_render_params,
    )
    from svi2_video_worker.wan22 import FlowMatchScheduler, WanModel

    def _tiny_dit():
        return WanModel(
            dim=48, in_dim=16, ffn_dim=128, out_dim=16, text_dim=32, freq_dim=64,
            eps=1e-6, patch_size=(1, 2, 2), num_heads=4, num_layers=2,
            has_image_input=False, require_vae_embedding=False, require_clip_embedding=False,
        ).to(torch.bfloat16).eval()

    class _FakeVae:
        def encode_image(self, image):
            return torch.randn(1, 16, 1, 2, 2)

        def decode_latents(self, latent):
            frames = latent.shape[2] * 4 - 3
            return [torch.randint(0, 255, (16, 16, 3), dtype=torch.uint8) for _ in range(frames)]

        def to_cpu(self):
            return self

        def to_cuda(self):
            return self

    def _build(_params):
        high = ExpertModel(dit=_tiny_dit(), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
        low = ExpertModel(dit=_tiny_dit(), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
        return high, low

    params = validate_render_params(
        {
            "mode": "text_to_video",
            "prompts": ["a coherent motion prompt"],
            "num_clips": 2,
            "height": 16,
            "width": 16,
            "frames_per_clip": 5,
            "num_inference_steps": 2,
            "seed": 4242,
            "device": "cpu",
            "output_path": str(tmp_path / "out.mp4"),
        }
    )

    scheduler = FlowMatchScheduler(template="Wan")
    scheduler.set_timesteps(num_inference_steps=2, shift=5.0)
    context = torch.randn(1, 12, 32, dtype=torch.bfloat16)

    clip = _generate_t2v_clip0(
        params,
        context_posi=context,
        context_nega=context,
        vae=_FakeVae(),
        scheduler=scheduler,
        timesteps=scheduler.timesteps,
        device="cpu",
        build_t2v_experts=_build,
    )

    total_latent_frames = (5 - 1) // 4 + 1
    assert clip.last_latent.shape == (16, total_latent_frames, 2, 2)
    assert all(hasattr(f, "shape") or hasattr(f, "save") for f in clip.frames)
    assert clip.frames
    assert clip.audit["t2v_high_fp8"]["overlap_pct"] == 100.0
