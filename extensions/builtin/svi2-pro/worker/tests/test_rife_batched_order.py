"""fast-parallel #5: batched RIFE must preserve output frame order and count.

``_interpolate_batched`` stacks every consecutive pair into one forward per
recursion level. This test injects a fake ``torch`` (list-backed "tensors") and
a deterministic midpoint ``pair_fn``, then asserts the saved frame sequence is
byte-for-byte the same order/count as the original per-pair loop.
"""

import sys
import types

import pytest


class _FakeTorch(types.ModuleType):
    @staticmethod
    def cat(items, dim=0):
        out = []
        for it in items:
            out.extend(it)
        return out


def _install_fake_torch(monkeypatch):
    monkeypatch.setitem(sys.modules, "torch", _FakeTorch("torch"))


def _midpoint(a, b):
    # a, b are batched "tensors" (lists of per-pair scalar frames); average rowwise
    return [(x + y) / 2.0 for x, y in zip(a, b)]


def _make_pair_fn():
    def _pair(a, b, d):
        if d <= 0:
            return []
        mid = _midpoint(a, b)
        return _pair(a, mid, d - 1) + [mid] + _pair(mid, b, d - 1)

    return _pair


def _per_pair_reference(frames, pair_fn, depth):
    """The original per-pair save order, as a flat list of frame scalars."""
    saved = [frames[0][0]]
    prev = frames[0]
    for nxt in frames[1:]:
        for mid in pair_fn(prev, nxt, depth):
            saved.append(mid[0])
        saved.append(nxt[0])
        prev = nxt
    return saved


@pytest.mark.parametrize("depth", [1, 2, 3])
@pytest.mark.parametrize("n_frames", [2, 3, 5])
def test_batched_matches_per_pair_order_and_count(monkeypatch, depth, n_frames):
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_batched

    # each frame is a single-row batch [scalar]; scalars are distinct
    frames = [[float(i)] for i in range(n_frames)]
    pair_fn = _make_pair_fn()

    saved = []
    _interpolate_batched(frames, pair_fn, depth, lambda t, *a, **k: saved.append(t[0]))

    reference = _per_pair_reference(frames, pair_fn, depth)

    assert saved == reference  # identical order AND values
    # count = N source frames + (N-1) pairs * (2^depth - 1) midpoints
    expected_count = n_frames + (n_frames - 1) * ((1 << depth) - 1)
    assert len(saved) == expected_count


def test_batched_single_frame_saves_only_that_frame(monkeypatch):
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_batched

    frames = [[7.0]]
    saved = []
    _interpolate_batched(frames, _make_pair_fn(), 2, lambda t, *a, **k: saved.append(t[0]))
    assert saved == [7.0]


def test_pair_fn_invoked_once_for_all_pairs(monkeypatch):
    """Batching means the top-level forward runs once for ALL consecutive pairs
    rather than once per pair — the whole point of the optimization."""
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_batched

    calls = {"n": 0}
    base_pair = _make_pair_fn()

    def counting_pair(a, b, d):
        calls["n"] += 1
        return base_pair(a, b, d)

    frames = [[float(i)] for i in range(5)]  # 4 pairs
    _interpolate_batched(frames, counting_pair, 1, lambda t, *a, **k: None)
    assert calls["n"] == 1  # one batched call, not 4
