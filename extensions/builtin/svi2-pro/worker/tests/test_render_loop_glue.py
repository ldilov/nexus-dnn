import pytest

torch = pytest.importorskip("torch")

from svi2_video_worker.expert_router import ExpertSelector
from svi2_video_worker.pipeline_svi2 import (
    ExpertModel,
    RenderModels,
    _denoise_clip,
    _run_render,
    validate_render_params,
)
from svi2_video_worker.wan22 import FlowMatchScheduler, WanModel


def _tiny_dit(dtype: torch.dtype = torch.float32) -> WanModel:
    return WanModel(
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
    ).to(dtype).eval()


class _FakeVae:
    def __init__(self, dtype: torch.dtype = torch.float32) -> None:
        self.dtype = dtype

    def encode_image(self, image):
        # pipeline passes a single PIL (anchor) or a list of PIL (pixel re-encode tail)
        if isinstance(image, list):
            frame = image[0]
            frames_in = len(image)
        else:
            frame = image
            frames_in = 1
        h, w = frame.size[1], frame.size[0]
        lat_f = 1 + (frames_in - 1) // 4  # mirror Wan VAE temporal compression
        return torch.randn(1, 16, lat_f, h // 8, w // 8, dtype=self.dtype)

    def decode_latents(self, latent):
        frames_lat = latent.shape[2]
        out = []
        for _ in range(frames_lat * 4 - 3):
            out.append(torch.randint(0, 255, (16, 16, 3), dtype=torch.uint8))
        return out

    def to_cpu(self):
        return self

    def to_cuda(self):
        return self


class _FakeTextEncoder:
    def __init__(self, dtype: torch.dtype = torch.float32) -> None:
        self.dtype = dtype

    def encode_text(self, prompt):
        return torch.randn(1, 12, 32, dtype=self.dtype)

    def to_cpu(self):
        return self

    def to_cuda(self):
        return self


def _tiny_models(dtype: torch.dtype = torch.float32) -> RenderModels:
    high = ExpertModel(dit=_tiny_dit(dtype), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
    low = ExpertModel(dit=_tiny_dit(dtype), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
    return RenderModels(
        high=high,
        low=low,
        vae=_FakeVae(dtype),
        text_encoder=_FakeTextEncoder(dtype),
        audit={},
    )


def test_denoise_clip_switches_expert_and_returns_finite_latent():
    models = _tiny_models()
    scheduler = FlowMatchScheduler(template="Wan")
    scheduler.set_timesteps(num_inference_steps=4, shift=5.0)

    latent = torch.randn(1, 16, 2, 8, 8)
    y = torch.randn(1, 20, 2, 8, 8)
    context = torch.randn(1, 12, 32)

    selected_tiers: list[str] = []

    def _move(tier: str) -> None:
        selected_tiers.append(tier)

    out = _denoise_clip(
        models=models,
        latent=latent,
        y=y,
        context_posi=context,
        context_nega=context,
        timesteps=scheduler.timesteps,
        cfg_scale=5.0,
        expert_selector=ExpertSelector(boundary=0.875),
        scheduler=scheduler,
        move_to=_move,
    )

    assert out.shape == latent.shape
    assert torch.isfinite(out).all()
    assert "high" in selected_tiers and "low" in selected_tiers


def test_run_render_end_to_end_with_fakes(tmp_path, monkeypatch):
    import svi2_video_worker.ffmpeg_io as ffmpeg_io
    from pathlib import Path

    captured = {}

    class _FakeWriter:
        def __init__(self):
            self.frames = []
            captured["writer"] = self

        def write(self, frame):
            self.frames.append(frame)

        def write_many(self, frames):
            self.frames.extend(frames)

        @property
        def count(self):
            return len(self.frames)

        def finalize(self, out_path, *, fps=15, quality=7):
            Path(out_path).write_bytes(b"fake-mp4")
            return out_path

    monkeypatch.setattr(ffmpeg_io, "StreamingFrameWriter", _FakeWriter)

    ref_path = tmp_path / "ref.png"
    from PIL import Image

    Image.new("RGB", (16, 16), (128, 64, 200)).save(ref_path)

    params = validate_render_params(
        {
            "ref_image_path": str(ref_path),
            "prompts": ["a cat", "a dog"],
            "num_clips": 2,
            "height": 16,
            "width": 16,
            "frames_per_clip": 5,
            "num_inference_steps": 2,
            "num_overlap_frame": 1,
            "output_path": str(tmp_path / "out.mp4"),
            "device": "cpu",
        }
    )

    result = _run_render(
        params, worker=None, build_models=lambda _p: _tiny_models(torch.bfloat16)
    )

    assert result["status"] == "ok"
    assert (tmp_path / "out.mp4").exists()
    assert (tmp_path / "render_report.json").exists()
    assert captured["writer"].count > 0
    for frame in captured["writer"].frames:
        assert hasattr(frame, "save")


def _tiny_t2v_experts(dtype: torch.dtype = torch.float32):
    def _t2v_dit() -> WanModel:
        return WanModel(
            dim=48, in_dim=16, ffn_dim=128, out_dim=16, text_dim=32, freq_dim=64,
            eps=1e-6, patch_size=(1, 2, 2), num_heads=4, num_layers=2,
            has_image_input=False, require_vae_embedding=False, require_clip_embedding=False,
        ).to(dtype).eval()

    high = ExpertModel(dit=_t2v_dit(), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
    low = ExpertModel(dit=_t2v_dit(), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
    return high, low


def test_run_render_t2v_generates_seed_clip_then_chains(tmp_path, monkeypatch):
    import json

    import svi2_video_worker.ffmpeg_io as ffmpeg_io
    from pathlib import Path

    captured = {}

    class _FakeWriter:
        def __init__(self):
            self.frames = []
            captured["writer"] = self

        def write(self, frame):
            self.frames.append(frame)

        def write_many(self, frames):
            self.frames.extend(frames)

        @property
        def count(self):
            return len(self.frames)

        def finalize(self, out_path, *, fps=15, quality=7):
            Path(out_path).write_bytes(b"fake-mp4")
            return out_path

    monkeypatch.setattr(ffmpeg_io, "StreamingFrameWriter", _FakeWriter)

    params = validate_render_params(
        {
            "mode": "text_to_video",
            "prompts": ["a cat", "a dog"],
            "num_clips": 2,
            "height": 16,
            "width": 16,
            "frames_per_clip": 5,
            "num_inference_steps": 2,
            "num_overlap_frame": 1,
            "seed": 99,
            "output_path": str(tmp_path / "out.mp4"),
            "device": "cpu",
        }
    )

    result = _run_render(
        params,
        worker=None,
        build_models=lambda _p: _tiny_models(torch.bfloat16),
        build_t2v_experts=lambda _p: _tiny_t2v_experts(torch.bfloat16),
    )

    assert result["status"] == "ok"
    assert captured["writer"].count > 0
    report = json.loads((tmp_path / "render_report.json").read_text())
    assert report["seed_origin"] == "t2v_clip"
    assert report["mode"] == "text_to_video"
    assert "t2v_high_fp8" in report["model_audit"]
