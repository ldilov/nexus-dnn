from pathlib import Path

import pytest

torch = pytest.importorskip("torch")

from svi2_video_worker.svi_chain import reencode_motion_tail


class _SpyVae:
    def __init__(self) -> None:
        self.received = None

    def encode_image(self, frames):
        self.received = list(frames)
        return torch.zeros(1, 16, 1, 8, 8)


def test_reencode_uses_last_n_frames():
    vae = _SpyVae()
    frames = [f"f{i}" for i in range(10)]
    reencode_motion_tail(vae, frames, 4)
    assert vae.received == ["f6", "f7", "f8", "f9"]


def test_reencode_returns_chfw_latent_without_batch_dim():
    vae = _SpyVae()
    out = reencode_motion_tail(vae, [f"f{i}" for i in range(5)], 4)
    assert out.shape == (16, 1, 8, 8)


def test_reencode_nonpositive_count_uses_all_frames():
    vae = _SpyVae()
    frames = [f"f{i}" for i in range(3)]
    reencode_motion_tail(vae, frames, 0)
    assert vae.received == frames


def test_reencode_count_exceeds_length_uses_all_frames():
    vae = _SpyVae()
    frames = [f"f{i}" for i in range(2)]
    reencode_motion_tail(vae, frames, 8)
    assert vae.received == frames


def _tiny_dit(dtype):
    from svi2_video_worker.wan22 import WanModel

    return WanModel(
        dim=48, in_dim=36, ffn_dim=128, out_dim=16, text_dim=32, freq_dim=64, eps=1e-6,
        patch_size=(1, 2, 2), num_heads=4, num_layers=2,
        has_image_input=True, require_clip_embedding=False,
    ).to(dtype).eval()


class _FakeTextEncoder:
    def __init__(self, dtype):
        self.dtype = dtype

    def encode_text(self, prompt):
        return torch.randn(1, 12, 32, dtype=self.dtype)

    def to_cpu(self):
        return self

    def to_cuda(self):
        return self


def _build_render_models(dtype, encode_calls):
    from svi2_video_worker.pipeline_svi2 import ExpertModel, RenderModels

    class _CountingVae:
        def __init__(self):
            self.dtype = dtype

        def encode_image(self, image):
            encode_calls.append(image)
            if isinstance(image, list):
                f = image[0]
                w, h = f.size
                frames_in = len(image)
            else:
                w, h = image.size
                frames_in = 1
            lat_f = 1 + (frames_in - 1) // 4  # mirror Wan VAE temporal compression
            return torch.randn(1, 16, lat_f, h // 8, w // 8, dtype=self.dtype)

        def decode_latents(self, latent):
            frames_lat = latent.shape[2]
            from PIL import Image

            return [Image.new("RGB", (16, 16)) for _ in range(frames_lat * 4 - 3)]

        def to_cpu(self):
            return self

        def to_cuda(self):
            return self

    high = ExpertModel(dit=_tiny_dit(dtype), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
    low = ExpertModel(dit=_tiny_dit(dtype), fp8_audit={"overlap_pct": 100.0}, lora_audit={})
    return RenderModels(
        high=high, low=low, vae=_CountingVae(), text_encoder=_FakeTextEncoder(dtype), audit={}
    )


def _run(tmp_path, monkeypatch, *, pixel_re_encode):
    import svi2_video_worker.ffmpeg_io as ffmpeg_io
    from PIL import Image
    from svi2_video_worker.pipeline_svi2 import _run_render, validate_render_params

    monkeypatch.setattr(
        ffmpeg_io,
        "frames_to_mp4",
        lambda frames, out, *, fps=15, quality=7: (Path(out).write_bytes(b"m"), out)[1],
    )
    ref = tmp_path / "ref.png"
    Image.new("RGB", (16, 16), (128, 64, 200)).save(ref)

    encode_calls: list = []
    params = validate_render_params(
        {
            "ref_image_path": str(ref),
            "prompts": ["a", "b"],
            "num_clips": 2,
            "height": 16,
            "width": 16,
            "frames_per_clip": 5,
            "num_inference_steps": 2,
            "num_overlap_frame": 1,
            "pixel_re_encode": pixel_re_encode,
            "num_motion_frame": 4,
            "output_path": str(tmp_path / "out.mp4"),
            "device": "cpu",
        }
    )
    result = _run_render(
        params, worker=None, build_models=lambda _p: _build_render_models(torch.bfloat16, encode_calls)
    )
    return result, encode_calls


def test_pixel_re_encode_off_encodes_anchor_only(tmp_path, monkeypatch):
    result, encode_calls = _run(tmp_path, monkeypatch, pixel_re_encode=False)
    assert result["status"] == "ok"
    # anchor encode only; no per-clip list re-encode
    assert sum(1 for c in encode_calls if isinstance(c, list)) == 0


def test_pixel_re_encode_on_reencodes_non_final_clips(tmp_path, monkeypatch):
    result, encode_calls = _run(tmp_path, monkeypatch, pixel_re_encode=True)
    assert result["status"] == "ok"
    # 2 clips: clip 0 re-encodes (tail feeds clip 1), final clip is skipped
    assert sum(1 for c in encode_calls if isinstance(c, list)) == 1


def test_validate_rejects_motion_latent_exceeding_reencode_depth():
    import pytest as _pytest
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    with _pytest.raises(ValueError, match="num_motion_frame"):
        validate_render_params(
            {
                "ref_image_path": "x.png",
                "prompts": ["a"],
                "pixel_re_encode": True,
                "num_motion_frame": 4,  # -> 1 latent frame
                "num_motion_latent": 2,  # needs 2 -> reject
            }
        )


def test_validate_accepts_sufficient_reencode_depth():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    out = validate_render_params(
        {
            "ref_image_path": "x.png",
            "prompts": ["a"],
            "pixel_re_encode": True,
            "num_motion_frame": 8,  # -> 1 + 7//4 = 2 latent frames
            "num_motion_latent": 2,
        }
    )
    assert out["num_motion_frame"] == 8 and out["num_motion_latent"] == 2


def test_validate_motion_latent_unconstrained_when_reencode_off():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    out = validate_render_params(
        {
            "ref_image_path": "x.png",
            "prompts": ["a"],
            "pixel_re_encode": False,
            "num_motion_frame": 4,
            "num_motion_latent": 5,
        }
    )
    assert out["num_motion_latent"] == 5


def test_validate_default_pixel_re_encode_is_false():
    # SVI 2.0 Pro carries the RAW prev-clip latent; decode->re-encode is the
    # pre-Pro behaviour that injects VAE-roundtrip error the LoRA cannot correct.
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    out = validate_render_params({"ref_image_path": "x.png", "prompts": ["a"]})
    assert out["pixel_re_encode"] is False


def test_validate_default_stitch_mode_is_crossfade_but_overridable():
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    out = validate_render_params({"ref_image_path": "x.png", "prompts": ["a"]})
    assert out["stitch_mode"] == "crossfade"
    out2 = validate_render_params(
        {"ref_image_path": "x.png", "prompts": ["a"], "stitch_mode": "trim"}
    )
    assert out2["stitch_mode"] == "trim"
