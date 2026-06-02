import pytest
torch = pytest.importorskip("torch")
from svi2_video_worker.svi_chain import build_conditioning_latents, stitch_clip_frames


def test_clip0_conditioning_is_anchor_plus_zeros():
    anchor_lat = torch.randn(16, 1, 60, 104)      # C, T=1, H/8, W/8
    y = build_conditioning_latents(anchor_lat, prev_last_latent=None, total_latent_frames=21, num_motion_latent=1)
    assert y.shape[1] == 21                         # T dimension
    assert torch.equal(y[:, 0], anchor_lat[:, 0])   # anchor fixed at pos 0
    assert torch.count_nonzero(y[:, 1:]) == 0       # rest zero on clip 0


def test_clipN_inserts_motion_tail_after_anchor():
    anchor_lat = torch.randn(16, 1, 60, 104)
    prev = torch.randn(16, 5, 60, 104)
    y = build_conditioning_latents(anchor_lat, prev_last_latent=prev, total_latent_frames=21, num_motion_latent=1)
    assert torch.equal(y[:, 0], anchor_lat[:, 0])           # anchor still pos 0
    assert torch.equal(y[:, 1], prev[:, -1])                # 1 motion latent from tail
    assert torch.count_nonzero(y[:, 2:]) == 0


def test_clipN_multi_motion_latent():
    anchor_lat = torch.randn(16, 1, 8, 8)
    prev = torch.randn(16, 5, 8, 8)
    y = build_conditioning_latents(anchor_lat, prev_last_latent=prev, total_latent_frames=21, num_motion_latent=3)
    assert torch.equal(y[:, 0], anchor_lat[:, 0])
    assert torch.equal(y[:, 1:4], prev[:, -3:])             # last 3 latents
    assert torch.count_nonzero(y[:, 4:]) == 0


def test_stitch_drops_overlap_frames_after_first_clip():
    c0 = [f"a{i}" for i in range(81)]
    c1 = [f"b{i}" for i in range(81)]
    out = stitch_clip_frames([c0, c1], num_overlap_frame=5)
    assert len(out) == 81 + (81 - 5)
    assert out[81] == "b5"


def test_stitch_single_clip_unchanged():
    c0 = [f"a{i}" for i in range(81)]
    assert stitch_clip_frames([c0], num_overlap_frame=5) == c0


def test_icn_perturbs_anchor_and_leaves_noncond_zero():
    torch.manual_seed(0)
    anchor_lat = torch.randn(16, 1, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=None, total_latent_frames=21,
        num_motion_latent=1, image_cond_noise_scale=0.5,
    )
    assert not torch.equal(y[:, 0], anchor_lat[:, 0])      # anchor noised
    assert torch.count_nonzero(y[:, 1:]) == 0              # non-cond frames untouched


def test_icn_noises_motion_tail_too():
    torch.manual_seed(0)
    anchor_lat = torch.randn(16, 1, 8, 8)
    prev = torch.randn(16, 5, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=prev, total_latent_frames=21,
        num_motion_latent=2, image_cond_noise_scale=0.5,
    )
    assert not torch.equal(y[:, 1], prev[:, -2])           # tail noised
    assert not torch.equal(y[:, 2], prev[:, -1])
    assert torch.count_nonzero(y[:, 3:]) == 0              # beyond cond stays zero


def test_icn_zero_is_unchanged():
    anchor_lat = torch.randn(16, 1, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=None, total_latent_frames=21,
        num_motion_latent=1, image_cond_noise_scale=0.0,
    )
    assert torch.equal(y[:, 0], anchor_lat[:, 0])
    assert torch.count_nonzero(y[:, 1:]) == 0


def test_icn_deterministic_under_seed():
    anchor_lat = torch.randn(16, 1, 8, 8)
    torch.manual_seed(7)
    a = build_conditioning_latents(anchor_lat, None, 21, 1, image_cond_noise_scale=0.4)
    torch.manual_seed(7)
    b = build_conditioning_latents(anchor_lat, None, 21, 1, image_cond_noise_scale=0.4)
    assert torch.equal(a, b)
