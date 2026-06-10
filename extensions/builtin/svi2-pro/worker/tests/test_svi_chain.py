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


def test_stitch_crossfades_overlap_after_first_clip():
    import numpy as np
    from PIL import Image

    a = [Image.fromarray(np.zeros((4, 4, 3), np.uint8)) for _ in range(81)]
    b = [Image.fromarray(np.full((4, 4, 3), 255, np.uint8)) for _ in range(81)]
    out = stitch_clip_frames([a, b], num_overlap_frame=5)
    assert len(out) == 81 + (81 - 5)                 # count preserved, overlap merged
    means = [float(np.asarray(out[i]).mean()) for i in range(76, 81)]
    assert means == sorted(means)                    # black->white ramp across overlap
    assert means[0] > 0 and means[-1] < 255          # genuinely blended, not hard cut
    assert float(np.asarray(out[81]).mean()) == 255  # first non-overlap b frame intact


def test_ref_pad_num_all_fills_every_slot():
    anchor_lat = torch.randn(16, 1, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=None, total_latent_frames=21,
        num_motion_latent=1, ref_pad_num=-1,
    )
    for i in range(21):
        assert torch.equal(y[:, i], anchor_lat[:, 0])   # -1 = every slot biased to ref


def test_ref_pad_num_partial_only_fills_first_n_padding():
    anchor_lat = torch.randn(16, 1, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=None, total_latent_frames=21,
        num_motion_latent=1, ref_pad_num=3,
    )
    assert torch.equal(y[:, 0], anchor_lat[:, 0])        # anchor at 0
    for i in range(1, 4):
        assert torch.equal(y[:, i], anchor_lat[:, 0])    # next 3 padding slots = ref
    assert torch.count_nonzero(y[:, 4:]) == 0            # rest stays free (zero)


def test_ref_pad_num_zero_keeps_zero_padding():
    anchor_lat = torch.randn(16, 1, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=None, total_latent_frames=21,
        num_motion_latent=1, ref_pad_num=0,
    )
    assert torch.count_nonzero(y[:, 1:]) == 0


def test_ref_pad_auto_ramp_keeps_early_clips_free():
    from svi2_video_worker.svi_chain import ref_pad_for_clip
    vals = [ref_pad_for_clip(i, 5, 5, 2) for i in range(5)]
    assert vals == [0, 0, 2, 3, 5]           # free early, ramps to max at last clip


def test_ref_pad_ramp_off_and_full_and_override():
    from svi2_video_worker.svi_chain import ref_pad_for_clip
    assert ref_pad_for_clip(3, 5, 0, 2) == 0                 # max 0 = off everywhere
    assert ref_pad_for_clip(1, 5, 5, 2) == 0                 # within free window
    assert ref_pad_for_clip(4, 5, -1, 2) == -1              # -1 = full lock, late clip
    over = [ref_pad_for_clip(i, 4, 9, 2, schedule=[0, 0, 3, 5]) for i in range(4)]
    assert over == [0, 0, 3, 5]                             # explicit schedule wins


def test_rolling_stitcher_matches_batch_stitch():
    import numpy as np
    from PIL import Image
    from svi2_video_worker.svi_chain import RollingCrossfadeStitcher

    rng = np.random.default_rng(0)
    clips = [
        [Image.fromarray(rng.integers(0, 256, (4, 4, 3), dtype=np.uint8)) for _ in range(20)]
        for _ in range(4)
    ]
    batch = stitch_clip_frames([list(c) for c in clips], num_overlap_frame=5)
    st = RollingCrossfadeStitcher(5)
    streamed = []
    for c in clips:
        streamed += st.push(c)
    streamed += st.flush()
    assert len(streamed) == len(batch)
    for a, b in zip(streamed, batch):
        assert np.array_equal(np.asarray(a), np.asarray(b))


def test_flf2v_end_lat_pins_last_frame():
    anchor_lat = torch.randn(16, 1, 8, 8)
    end_lat = torch.randn(16, 1, 8, 8)
    y = build_conditioning_latents(
        anchor_lat, prev_last_latent=None, total_latent_frames=21,
        num_motion_latent=1, end_lat=end_lat,
    )
    assert torch.equal(y[:, 0], anchor_lat[:, 0])    # start anchor at pos 0
    assert torch.equal(y[:, -1], end_lat[:, 0])      # end keyframe pinned at last slot
    assert torch.count_nonzero(y[:, 1:-1]) == 0      # middle stays zero


def test_stitch_single_clip_unchanged():
    c0 = [f"a{i}" for i in range(81)]
    assert stitch_clip_frames([c0], num_overlap_frame=5) == c0


def test_stitch_trim_mode_drops_overlap_without_blend():
    import numpy as np
    from PIL import Image

    a = [Image.fromarray(np.zeros((4, 4, 3), np.uint8)) for _ in range(81)]
    b = [Image.fromarray(np.full((4, 4, 3), 255, np.uint8)) for _ in range(81)]
    out = stitch_clip_frames([a, b], num_overlap_frame=5, mode="trim")
    assert len(out) == 81 + (81 - 5)                  # same length as crossfade
    # canonical SVI: prev clip kept whole, next clip's leading overlap dropped, no blend
    assert float(np.asarray(out[80]).mean()) == 0     # last frame of clip a, pure (not blended)
    assert float(np.asarray(out[81]).mean()) == 255   # first kept frame of clip b, pure


def test_stitch_trim_equals_reference_concat():
    a = [f"a{i}" for i in range(20)]
    b = [f"b{i}" for i in range(20)]
    c = [f"c{i}" for i in range(20)]
    out = stitch_clip_frames([a, b, c], num_overlap_frame=5, mode="trim")
    assert out == a + b[5:] + c[5:]                   # drop leading overlap per later clip


def test_rolling_stitcher_trim_matches_batch_trim():
    from svi2_video_worker.svi_chain import RollingCrossfadeStitcher

    clips = [[f"{j}_{i}" for i in range(20)] for j in range(4)]
    batch = stitch_clip_frames([list(c) for c in clips], num_overlap_frame=5, mode="trim")
    st = RollingCrossfadeStitcher(5, mode="trim")
    streamed: list = []
    for c in clips:
        streamed += st.push(c)
    streamed += st.flush()
    assert streamed == batch


def test_check_trained_resolution_accepts_trained_budgets():
    from svi2_video_worker.svi_chain import check_trained_resolution

    assert check_trained_resolution(832, 480) is None     # landscape 480p budget
    assert check_trained_resolution(480, 832) is None     # portrait 480p budget


def test_check_trained_resolution_warns_off_budget():
    from svi2_video_worker.svi_chain import check_trained_resolution

    warn = check_trained_resolution(960, 544)             # the drifting run's resolution
    assert warn is not None and "832x480" in warn
    assert check_trained_resolution(1024, 576) is not None


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
