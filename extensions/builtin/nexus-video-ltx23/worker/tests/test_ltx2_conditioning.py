"""Unit tests for the spec-048 LTX-2 conditioning helpers.

GPU-bound helpers (``load_video_encoder``, ``encode_image_to_latent``)
are exercised by the ``smoke-ltxv2-*`` GPU scripts, not here — these
tests cover the pure / CPU-only surface.
"""

from __future__ import annotations

import pytest

torch = pytest.importorskip("torch")

from ltx_video_worker import ltx2_conditioning as cond


def test_load_input_image_returns_none_for_unset_path() -> None:
    assert cond.load_input_image(None, 768, 512) is None
    assert cond.load_input_image("", 768, 512) is None


def test_load_input_image_returns_none_for_missing_file(tmp_path) -> None:
    assert cond.load_input_image(str(tmp_path / "nope.png"), 768, 512) is None


def test_load_input_image_cover_crops_to_requested_size(tmp_path) -> None:
    pil = pytest.importorskip("PIL.Image")
    src = tmp_path / "in.png"
    pil.new("RGB", (1000, 400), (10, 20, 30)).save(src)
    img = cond.load_input_image(str(src), 768, 512)
    assert img is not None
    assert img.size == (768, 512)


def test_cover_crop_handles_portrait_and_landscape() -> None:
    pil = pytest.importorskip("PIL.Image")
    wide = cond._cover_crop(pil.new("RGB", (1920, 200)), 768, 512)
    assert wide.size == (768, 512)
    tall = cond._cover_crop(pil.new("RGB", (200, 1920)), 768, 512)
    assert tall.size == (768, 512)


def test_extract_tail_latent_slices_trailing_frames() -> None:
    grid = torch.randn(1, 128, 10, 4, 6)
    tail = cond.extract_tail_latent(grid, 3)
    assert tail.shape == (1, 128, 3, 4, 6)
    assert torch.equal(tail, grid[:, :, -3:, :, :])


def test_extract_tail_latent_clamps_to_available_frames() -> None:
    grid = torch.randn(1, 128, 4, 4, 6)
    assert cond.extract_tail_latent(grid, 99).shape[2] == 4
    assert cond.extract_tail_latent(grid, 0).shape[2] == 1


def test_decay_condition_strength_ramps_then_settles() -> None:
    base = 0.5
    assert cond.decay_condition_strength(base, 0) == pytest.approx(0.2)
    assert cond.decay_condition_strength(base, 12) == base
    assert cond.decay_condition_strength(base, 100) == base
    mid = cond.decay_condition_strength(base, 6)
    assert 0.2 < mid < 0.5


def test_decay_condition_strength_disabled_for_nonpositive_span() -> None:
    assert cond.decay_condition_strength(0.7, 0, decay_span=0) == 0.7
    assert cond.decay_condition_strength(0.7, 3, decay_span=-1) == 0.7


def test_build_keyframe_condition_replaces_frame_zero() -> None:
    latent = torch.randn(1, 128, 1, 4, 6)
    item = cond.build_keyframe_condition(latent, strength=1.0)
    assert item.latent_idx == 0
    assert item.strength == 1.0
    assert item.latent is latent


def test_build_keyframe_condition_replaces_in_place_not_appends() -> None:
    from ltx_core.components.patchifiers import VideoLatentPatchifier
    from ltx_core.tools import VideoLatentTools
    from ltx_core.types import LatentState, VideoLatentShape

    target = VideoLatentShape(batch=1, channels=128, frames=3, height=4, width=6)
    tools = VideoLatentTools(
        patchifier=VideoLatentPatchifier(patch_size=1),
        target_shape=target,
        fps=24.0,
    )
    init = tools.create_initial_state(device="cpu", dtype=torch.float32)
    token_count = init.latent.shape[1]
    state = LatentState(
        latent=torch.randn(1, token_count, 128),
        denoise_mask=torch.ones(1, token_count, 1),
        positions=init.positions,
        clean_latent=torch.zeros(1, token_count, 128),
        attention_mask=None,
    )
    keyframe = torch.randn(1, 128, 1, 4, 6)
    item = cond.build_keyframe_condition(keyframe, strength=1.0)
    out = item.apply_to(state, tools)

    # Replace-in-place: token count is unchanged (no appended tokens).
    assert out.latent.shape[1] == token_count
    assert out.clean_latent.shape == out.latent.shape
    # Frame-0 latent tokens carry the keyframe and a fully-clean mask.
    frame0 = keyframe.shape[3] * keyframe.shape[4]
    assert torch.allclose(out.clean_latent[:, :frame0], item.latent.flatten(2).permute(0, 2, 1))
    assert torch.all(out.denoise_mask[:, :frame0] == 0.0)
    assert torch.all(out.denoise_mask[:, frame0:] == 1.0)


def test_build_reference_condition_carries_tail_latent() -> None:
    tail = torch.randn(1, 128, 3, 4, 6)
    item = cond.build_reference_condition(tail, strength=0.5)
    assert item.strength == 0.5
    assert item.downscale_factor == 1
    assert item.latent is tail


def test_apply_image_cond_noise_is_noop_at_zero_scale() -> None:
    latent = torch.randn(1, 128, 1, 4, 6)
    assert cond.apply_image_cond_noise(latent, 0.0, seed=7) is latent
    assert cond.apply_image_cond_noise(latent, -0.1, seed=7) is latent


def test_apply_image_cond_noise_perturbs_and_is_seed_deterministic() -> None:
    latent = torch.zeros(1, 128, 1, 4, 6)
    noised = cond.apply_image_cond_noise(latent, 0.05, seed=42)
    assert noised.shape == latent.shape
    assert not torch.equal(noised, latent)
    again = cond.apply_image_cond_noise(latent, 0.05, seed=42)
    assert torch.equal(noised, again)
    other = cond.apply_image_cond_noise(latent, 0.05, seed=43)
    assert not torch.equal(noised, other)
