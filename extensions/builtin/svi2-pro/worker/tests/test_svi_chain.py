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


def test_radial_noise_mask_center_high_edge_low():
    from svi2_video_worker.svi_chain import radial_noise_mask
    m = radial_noise_mask(64, 64, bg_protect=1.0)
    assert m.shape == (64, 64)
    assert abs(float(m[32, 32]) - 1.0) < 0.05      # centre ~1
    assert float(m[0, 0]) < 0.05                    # corner ~0 (fully protected)
    assert float(m[0, 0]) < float(m[32, 32])


def test_radial_noise_mask_bg_protect_zero_is_uniform():
    from svi2_video_worker.svi_chain import radial_noise_mask
    m = radial_noise_mask(16, 16, bg_protect=0.0)
    assert torch.allclose(m, torch.ones_like(m))


def test_icn_bg_protect_perturbs_center_more_than_edge():
    torch.manual_seed(0)
    anchor = torch.randn(16, 1, 32, 32)
    y = build_conditioning_latents(
        anchor, None, total_latent_frames=21, num_motion_latent=1,
        image_cond_noise_scale=0.6, image_cond_noise_bg_protect=1.0,
    )
    d = (y[:, 0] - anchor[:, 0]).abs()
    center = d[:, 14:18, 14:18].mean()
    edge = d[:, :2, :2].mean()
    assert center > edge * 3      # centre noised far more than protected corner
