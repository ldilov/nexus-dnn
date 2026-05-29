import pytest

pytest.importorskip("torch")

import torch


def _tiny_config():
    return dict(
        dim=32,
        z_dim=4,
        dim_mult=[1, 2, 2, 2],
        num_res_blocks=1,
        attn_scales=[],
        temperal_downsample=[False, True, True],
        dropout=0.0,
    )


def test_wanvideovae_importable():
    from svi2_video_worker.wan22.vae_model import WanVideoVAE
    assert WanVideoVAE is not None


def test_videovae_inner_encode_decode_shapes():
    from svi2_video_worker.wan22.vae_model import VideoVAE_
    cfg = _tiny_config()
    model = VideoVAE_(**cfg).eval()
    scale = [model.encoder.conv1.weight.new_zeros(cfg["z_dim"]),
             model.encoder.conv1.weight.new_ones(cfg["z_dim"])]

    H, W = 32, 32
    x = torch.randn(1, 3, 1, H, W)
    with torch.no_grad():
        latent = model.encode(x, scale)
        assert latent.shape == (1, cfg["z_dim"], 1, H // 8, W // 8), latent.shape

        recon = model.decode(latent, scale)
        assert recon.shape[1] == 3
        assert recon.shape[3] == H
        assert recon.shape[4] == W


def test_wanvideovae_encode_decode_roundtrip():
    from svi2_video_worker.wan22.vae_model import WanVideoVAE, VideoVAE_
    cfg = _tiny_config()
    vae = WanVideoVAE.__new__(WanVideoVAE)
    torch.nn.Module.__init__(vae)
    vae.model = VideoVAE_(**cfg).eval().requires_grad_(False)
    vae.upsampling_factor = 8
    vae.z_dim = cfg["z_dim"]
    mean_vals = [0.0] * cfg["z_dim"]
    std_vals = [1.0] * cfg["z_dim"]
    vae.mean = torch.tensor(mean_vals)
    vae.std = torch.tensor(std_vals)
    vae.scale = [vae.mean, 1.0 / vae.std]

    H, W = 32, 32
    video = torch.randn(3, 1, H, W)

    with torch.no_grad():
        latents = vae.encode([video], device="cpu")
        assert latents.shape[1] == cfg["z_dim"]
        assert latents.shape[3] == H // 8
        assert latents.shape[4] == W // 8

        decoded = vae.decode(latents, device="cpu")
        assert decoded.shape[1] == 3
        assert decoded.shape[3] == H
        assert decoded.shape[4] == W


def test_vae_wrapper_constructs_without_loading(tmp_path):
    from svi2_video_worker.vae import VaeWrapper
    v = VaeWrapper(weights_path=tmp_path / "missing.safetensors")
    assert v._model is None


def test_vae_wrapper_ensure_loaded_no_weights(tmp_path):
    from svi2_video_worker.vae import VaeWrapper
    v = VaeWrapper(weights_path=tmp_path / "missing.safetensors")
    v._ensure_loaded()
    assert v._model is not None
    from svi2_video_worker.wan22.vae_model import WanVideoVAE
    assert isinstance(v._model, WanVideoVAE)


def test_vae_wrapper_to_cpu_to_cuda_noop_when_no_model(tmp_path):
    from svi2_video_worker.vae import VaeWrapper
    v = VaeWrapper(weights_path=tmp_path / "missing.safetensors")
    v.to_cpu()
    assert v.device == "cpu"
    v.to_cuda()
    assert v.device == "cuda"
