import numpy as np
import pytest

from longcat_video_worker.chaining import (
    adain_color_match,
    compute_color_anchor,
)


def _gradient_frames(n: int, h: int, w: int, base_rgb=(120, 100, 80)) -> np.ndarray:
    base = np.asarray(base_rgb, dtype=np.float32).reshape(1, 1, 1, 3)
    grad = np.linspace(0, 40, n * h * w, dtype=np.float32).reshape(n, h, w, 1)
    out = np.clip(base + grad, 0, 255).astype(np.uint8)
    return out


def test_compute_color_anchor_shape_and_dtype():
    frames = _gradient_frames(4, 8, 8)
    mean, std = compute_color_anchor(frames)
    assert mean.shape == (3,) and std.shape == (3,)
    assert mean.dtype == np.float32 and std.dtype == np.float32


def test_compute_color_anchor_matches_numpy_reference():
    frames = _gradient_frames(3, 16, 16, base_rgb=(50, 90, 150))
    mean, std = compute_color_anchor(frames)
    work = frames.astype(np.float32)
    np.testing.assert_allclose(mean, work.mean(axis=(0, 1, 2)), rtol=1e-6)
    np.testing.assert_allclose(std, work.std(axis=(0, 1, 2)), rtol=1e-6)


def test_compute_color_anchor_rejects_wrong_shape():
    with pytest.raises(ValueError, match=r"shape \(N, H, W, 3\)"):
        compute_color_anchor(np.zeros((4, 8, 8), dtype=np.uint8))
    with pytest.raises(ValueError, match=r"shape \(N, H, W, 3\)"):
        compute_color_anchor(np.zeros((4, 8, 8, 4), dtype=np.uint8))


def test_adain_color_match_zero_factor_is_noop():
    frames = _gradient_frames(4, 8, 8, base_rgb=(120, 100, 80))
    anchor = compute_color_anchor(_gradient_frames(4, 8, 8, base_rgb=(50, 200, 30)))
    out = adain_color_match(frames, anchor, factor=0.0)
    assert out is frames  # short-circuited, identity returned


def test_adain_color_match_full_factor_replaces_stats():
    src = _gradient_frames(4, 16, 16, base_rgb=(120, 100, 80))
    ref_frames = _gradient_frames(4, 16, 16, base_rgb=(50, 200, 30))
    anchor = compute_color_anchor(ref_frames)
    out = adain_color_match(src, anchor, factor=1.0)
    out_mean, _ = compute_color_anchor(out)
    # uint8 rounding + clipping introduces ~0.5 LSB error per channel
    np.testing.assert_allclose(out_mean, anchor[0], atol=1.0)


def test_adain_color_match_partial_factor_blends():
    src = _gradient_frames(4, 16, 16, base_rgb=(120, 100, 80))
    ref_frames = _gradient_frames(4, 16, 16, base_rgb=(50, 200, 30))
    anchor = compute_color_anchor(ref_frames)
    src_mean, _ = compute_color_anchor(src)
    out = adain_color_match(src, anchor, factor=0.3)
    out_mean, _ = compute_color_anchor(out)
    expected = src_mean + 0.3 * (anchor[0] - src_mean)
    np.testing.assert_allclose(out_mean, expected, atol=1.5)


def test_adain_color_match_preserves_dtype_and_shape():
    src = _gradient_frames(3, 8, 8)
    anchor = compute_color_anchor(_gradient_frames(3, 8, 8, base_rgb=(0, 255, 128)))
    out = adain_color_match(src, anchor, factor=0.5)
    assert out.dtype == np.uint8
    assert out.shape == src.shape


def test_adain_color_match_rejects_wrong_shape():
    anchor = (np.zeros(3, dtype=np.float32), np.ones(3, dtype=np.float32))
    with pytest.raises(ValueError, match=r"shape \(N, H, W, 3\)"):
        adain_color_match(np.zeros((4, 8, 8), dtype=np.uint8), anchor, factor=0.2)


def test_adain_color_match_rejects_wrong_anchor_shape():
    src = _gradient_frames(2, 8, 8)
    bad = (np.zeros(4, dtype=np.float32), np.ones(3, dtype=np.float32))
    with pytest.raises(ValueError, match="reference anchor"):
        adain_color_match(src, bad, factor=0.2)


def test_adain_color_match_clips_to_uint8_range():
    src = np.full((2, 4, 4, 3), 200, dtype=np.uint8)
    anchor = (
        np.asarray([500.0, -100.0, 128.0], dtype=np.float32),
        np.asarray([1.0, 1.0, 1.0], dtype=np.float32),
    )
    out = adain_color_match(src, anchor, factor=1.0)
    assert out.min() >= 0 and out.max() <= 255
