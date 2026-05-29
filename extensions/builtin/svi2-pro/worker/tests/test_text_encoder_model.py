import pytest

pytest.importorskip("torch")

import torch


def _tiny_config() -> dict:
    return dict(
        vocab=64,
        dim=16,
        dim_attn=16,
        dim_ffn=32,
        num_heads=2,
        num_layers=2,
        num_buckets=8,
        shared_pos=False,
        dropout=0.0,
    )


def test_wan_text_encoder_importable():
    from svi2_video_worker.wan22.text_encoder_model import WanTextEncoder
    assert WanTextEncoder is not None


def test_wan_text_encoder_forward_shape():
    from svi2_video_worker.wan22.text_encoder_model import WanTextEncoder
    cfg = _tiny_config()
    model = WanTextEncoder(**cfg).eval()
    B, L = 2, 5
    ids = torch.randint(0, cfg["vocab"], (B, L))
    mask = torch.ones(B, L, dtype=torch.long)
    with torch.no_grad():
        out = model(ids, mask)
    assert out.shape == (B, L, cfg["dim"]), f"unexpected shape {out.shape}"


def test_wan_text_encoder_forward_no_mask():
    from svi2_video_worker.wan22.text_encoder_model import WanTextEncoder
    cfg = _tiny_config()
    model = WanTextEncoder(**cfg).eval()
    ids = torch.randint(0, cfg["vocab"], (1, 8))
    with torch.no_grad():
        out = model(ids)
    assert out.shape == (1, 8, cfg["dim"])


def test_wan_text_encoder_shared_pos():
    from svi2_video_worker.wan22.text_encoder_model import WanTextEncoder
    cfg = _tiny_config()
    cfg["shared_pos"] = True
    model = WanTextEncoder(**cfg).eval()
    ids = torch.randint(0, cfg["vocab"], (1, 4))
    with torch.no_grad():
        out = model(ids)
    assert out.shape == (1, 4, cfg["dim"])


def test_text_encoder_wrapper_constructs_without_loading(tmp_path):
    from svi2_video_worker.text_encoder import TextEncoderWrapper
    t = TextEncoderWrapper(weights_path=tmp_path / "t5.safetensors")
    assert t._model is None
    assert t._tokenizer is None


def test_text_encoder_wrapper_ensure_loaded_no_weights(tmp_path):
    from svi2_video_worker.text_encoder import TextEncoderWrapper
    from svi2_video_worker.wan22.text_encoder_model import WanTextEncoder
    t = TextEncoderWrapper(weights_path=tmp_path / "missing.safetensors")
    t._ensure_loaded()
    assert isinstance(t._model, WanTextEncoder)
    assert t._tokenizer is None


def test_text_encoder_wrapper_to_cpu_to_cuda_noop_when_no_model(tmp_path):
    from svi2_video_worker.text_encoder import TextEncoderWrapper
    t = TextEncoderWrapper(weights_path=tmp_path / "missing.safetensors")
    t.to_cpu()
    assert t.device == "cpu"
    t.to_cuda()
    assert t.device == "cuda"


def test_text_encoder_wrapper_encode_text_raises_without_tokenizer(tmp_path):
    from svi2_video_worker.text_encoder import TextEncoderWrapper
    t = TextEncoderWrapper(weights_path=tmp_path / "missing.safetensors")
    with pytest.raises(RuntimeError, match="tokenizer_path"):
        t.encode_text("hello world")
