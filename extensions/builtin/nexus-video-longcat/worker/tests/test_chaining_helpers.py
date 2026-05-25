from __future__ import annotations

import numpy as np
import pytest

from longcat_video_worker.chaining import (
    damp_adain_drift,
    pin_last_frame_for_vc,
    purge_kv_cache,
)


def test_pin_last_frame_for_vc_promotes_channel_count() -> None:
    latent = np.ones((32, 4, 8), dtype=np.float32)
    out = pin_last_frame_for_vc(latent, target_channels=128)
    assert out.shape == (128, 4, 8)
    assert out.dtype == np.float32


def test_pin_last_frame_for_vc_truncates_when_over() -> None:
    latent = np.ones((256, 4, 8), dtype=np.float32)
    out = pin_last_frame_for_vc(latent, target_channels=128)
    assert out.shape == (128, 4, 8)


def test_pin_last_frame_for_vc_passthrough_equal_channels() -> None:
    latent = np.arange(128 * 2 * 2, dtype=np.float32).reshape(128, 2, 2)
    out = pin_last_frame_for_vc(latent, target_channels=128)
    assert out.shape == (128, 2, 2)
    np.testing.assert_array_equal(out, latent)


def test_pin_last_frame_rejects_low_ndim() -> None:
    with pytest.raises(ValueError):
        pin_last_frame_for_vc(np.array([1.0]))


def test_damp_adain_drift_monotonic_decay() -> None:
    factors = [damp_adain_drift(0.2, i) for i in range(10)]
    for i in range(1, len(factors)):
        assert factors[i] <= factors[i - 1] + 1e-9


def test_damp_adain_drift_floor_at_half() -> None:
    out = damp_adain_drift(0.2, 100)
    assert out == pytest.approx(0.2 * 0.5, rel=1e-9)


def test_damp_adain_drift_unmodified_for_early_scenes() -> None:
    assert damp_adain_drift(0.2, 0) == pytest.approx(0.2)
    assert damp_adain_drift(0.2, 3) == pytest.approx(0.2)


def test_purge_kv_cache_clears_attribute() -> None:
    class Fake:
        kv_cache = "stale"
    f = Fake()
    purge_kv_cache(f)
    assert f.kv_cache is None


def test_purge_kv_cache_noop_when_missing() -> None:
    class Fake:
        pass
    f = Fake()
    purge_kv_cache(f)
    assert not hasattr(f, "kv_cache")


def test_purge_kv_cache_none_safe() -> None:
    purge_kv_cache(None)
