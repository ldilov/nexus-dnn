import pytest

torch = pytest.importorskip("torch")
from svi2_video_worker.wan22 import WanModel

_TINY = dict(
    has_image_input=False,
    patch_size=(1, 2, 2),
    in_dim=16,
    dim=16,
    ffn_dim=32,
    freq_dim=16,
    text_dim=16,
    out_dim=16,
    num_heads=2,
    num_layers=1,
    eps=1e-6,
    require_clip_embedding=False,
)


def _model():
    m = WanModel(**_TINY)
    m.eval()
    return m


def _tmod(scale=1.0):
    return torch.ones(1, 6, 16) * scale


def test_disabled_returns_no_cache():
    m = _model()
    should, tc = m._tea_cache_gate(_tmod(), {})
    assert should is True
    assert tc is None


def test_configure_and_reset():
    m = _model()
    m.configure_tea_cache(True, 0.1)
    assert m.enable_teacache is True
    m._tc[0] = {"acc": 5.0, "prev": _tmod(), "resid": torch.zeros(1)}
    m.reset_tea_cache()
    assert m._tc == {}


def test_zero_thresh_keeps_disabled():
    m = _model()
    m.configure_tea_cache(True, 0.0)
    assert m.enable_teacache is False


def test_first_call_forces_compute():
    m = _model()
    m.configure_tea_cache(True, 0.1)
    should, tc = m._tea_cache_gate(_tmod(), {"tea_slot": 0})
    assert should is True
    assert tc is not None and tc["prev"] is not None


def test_small_change_skips_after_residual_set():
    m = _model()
    m.configure_tea_cache(True, 0.5)
    should, tc = m._tea_cache_gate(_tmod(1.0), {"tea_slot": 0})  # first -> compute
    tc["resid"] = torch.zeros(1)  # simulate residual stored
    should2, _ = m._tea_cache_gate(_tmod(1.0), {"tea_slot": 0})  # identical -> rel~0
    assert should2 is False


def test_large_change_recomputes():
    m = _model()
    m.configure_tea_cache(True, 0.1)
    should, tc = m._tea_cache_gate(_tmod(1.0), {"tea_slot": 0})
    tc["resid"] = torch.zeros(1)
    should2, _ = m._tea_cache_gate(_tmod(5.0), {"tea_slot": 0})  # big jump -> rel>thresh
    assert should2 is True


def test_tea_last_forces_compute():
    m = _model()
    m.configure_tea_cache(True, 10.0)
    should, tc = m._tea_cache_gate(_tmod(1.0), {"tea_slot": 0})
    tc["resid"] = torch.zeros(1)
    should2, _ = m._tea_cache_gate(_tmod(1.0), {"tea_slot": 0, "tea_last": True})
    assert should2 is True


def test_slots_are_independent():
    m = _model()
    m.configure_tea_cache(True, 0.5)
    m._tea_cache_gate(_tmod(1.0), {"tea_slot": 0})
    m._tea_cache_gate(_tmod(1.0), {"tea_slot": 1})
    assert set(m._tc.keys()) == {0, 1}
