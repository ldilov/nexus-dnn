import pytest

torch = pytest.importorskip("torch")
from svi2_video_worker.svi_chain import adain_normalize_latent


def _stats(x):
    dims = tuple(range(1, x.ndim))
    return x.mean(dim=dims), x.std(dim=dims)


def test_factor_zero_is_identity():
    lat = torch.randn(16, 4, 8, 8)
    ref = torch.randn(16, 4, 8, 8)
    assert torch.equal(adain_normalize_latent(lat, ref, 0.0), lat)


def test_full_factor_matches_reference_per_channel():
    ref = torch.randn(16, 4, 8, 8) * 2.0 + 1.0
    lat = torch.randn(16, 4, 8, 8) * 5.0 - 3.0
    out = adain_normalize_latent(lat, ref, 1.0)
    om, os = _stats(out)
    rm, rs = _stats(ref)
    assert torch.allclose(om, rm, atol=1e-3)
    assert torch.allclose(os, rs, atol=1e-3)


def test_partial_factor_moves_toward_reference():
    ref = torch.zeros(16, 4, 8, 8) + 1.0
    lat = torch.zeros(16, 4, 8, 8) + 5.0
    half = adain_normalize_latent(lat, ref, 0.5)
    # mean should move from 5 toward 1, not past it
    m = half.mean().item()
    assert 1.0 < m < 5.0


def test_shape_preserved():
    lat = torch.randn(16, 7, 30, 52)
    ref = torch.randn(16, 7, 30, 52)
    assert adain_normalize_latent(lat, ref, 0.4).shape == lat.shape
