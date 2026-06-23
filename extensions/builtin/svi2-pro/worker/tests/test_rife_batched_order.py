"""RIFE memory-bounded interpolation must preserve output frame order and count.

Frames are streamed from disk and the batched path processes at most
``chunk_pairs`` pairs per forward (bounding unified-memory peak). This test
injects a fake ``torch`` (list-backed "tensors") and a deterministic midpoint
``pair_fn``, then asserts the saved frame sequence is byte-for-byte identical to
the original per-pair loop — for serial, single-batch, and every chunk size.
"""

import sys
import types

import pytest


class _FakeCuda:
    @staticmethod
    def is_available():
        return False

    @staticmethod
    def empty_cache():
        return None


class _FakeTorch(types.ModuleType):
    cuda = _FakeCuda()

    @staticmethod
    def cat(items, dim=0):
        out = []
        for it in items:
            out.extend(it)
        return out


def _install_fake_torch(monkeypatch):
    monkeypatch.setitem(sys.modules, "torch", _FakeTorch("torch"))


def _midpoint(a, b):
    return [(x + y) / 2.0 for x, y in zip(a, b)]


def _make_pair_fn():
    def _pair(a, b, d):
        if d <= 0:
            return []
        mid = _midpoint(a, b)
        return _pair(a, mid, d - 1) + [mid] + _pair(mid, b, d - 1)

    return _pair


def _load(i):
    return [float(i)]


def _per_pair_reference(n_frames, pair_fn, depth):
    """The canonical per-pair save order, as a flat list of frame scalars."""
    frames = [_load(i) for i in range(n_frames)]
    saved = [frames[0][0]]
    prev = frames[0]
    for nxt in frames[1:]:
        for mid in pair_fn(prev, nxt, depth):
            saved.append(mid[0])
        saved.append(nxt[0])
        prev = nxt
    return saved


@pytest.mark.parametrize("depth", [1, 2, 3])
@pytest.mark.parametrize("n_frames", [2, 3, 5, 9])
@pytest.mark.parametrize("chunk_pairs", [0, 1, 2, 3, 100])
def test_batched_matches_per_pair_order_and_count(monkeypatch, depth, n_frames, chunk_pairs):
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_batched

    paths = list(range(n_frames))
    saved = []
    _interpolate_batched(
        paths, _load, _make_pair_fn(), depth, lambda t, *a, **k: saved.append(t[0]),
        chunk_pairs=chunk_pairs,
    )

    reference = _per_pair_reference(n_frames, _make_pair_fn(), depth)
    assert saved == reference, f"chunk_pairs={chunk_pairs} reordered output"
    expected_count = n_frames + (n_frames - 1) * ((1 << depth) - 1)
    assert len(saved) == expected_count


@pytest.mark.parametrize("depth", [1, 2])
@pytest.mark.parametrize("n_frames", [2, 5, 9])
def test_serial_matches_per_pair_order_and_count(monkeypatch, depth, n_frames):
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_serial

    paths = list(range(n_frames))
    saved = []
    _interpolate_serial(paths, _load, _make_pair_fn(), depth, lambda t, *a, **k: saved.append(t[0]))

    assert saved == _per_pair_reference(n_frames, _make_pair_fn(), depth)


def test_batched_single_frame_saves_only_that_frame(monkeypatch):
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_batched

    saved = []
    _interpolate_batched([0], _load, _make_pair_fn(), 2, lambda t, *a, **k: saved.append(t[0]))
    assert saved == [0.0]


def test_chunking_runs_one_forward_per_chunk(monkeypatch):
    """Batching runs one forward per chunk — full batch when uncapped, ceil(P/k)
    when chunked — so peak memory is bounded without losing the batch speedup."""
    _install_fake_torch(monkeypatch)
    from svi2_video_worker.rife_torch import _interpolate_batched

    base_pair = _make_pair_fn()
    for chunk_pairs, expected_calls in [(0, 1), (2, 2), (1, 4)]:
        calls = {"n": 0}

        def counting_pair(a, b, d, _cp=chunk_pairs):
            calls["n"] += 1
            return base_pair(a, b, d)

        _interpolate_batched(
            list(range(5)), _load, counting_pair, 1, lambda t, *a, **k: None,
            chunk_pairs=chunk_pairs,
        )
        assert calls["n"] == expected_calls, f"chunk_pairs={chunk_pairs}"


@pytest.mark.parametrize(
    "num_pairs,k,expected",
    [
        (0, 4, []),
        (1, 4, [(0, 1)]),
        (4, 2, [(0, 2), (2, 4)]),
        (5, 2, [(0, 2), (2, 4), (4, 5)]),
        (5, 100, [(0, 5)]),
        (3, 1, [(0, 1), (1, 2), (2, 3)]),
    ],
)
def test_chunk_ranges_cover_all_pairs_in_order(num_pairs, k, expected):
    from svi2_video_worker.rife_torch import _chunk_ranges

    ranges = _chunk_ranges(num_pairs, k)
    assert ranges == expected
    flat = [p for s, e in ranges for p in range(s, e)]
    assert flat == list(range(num_pairs))


def test_chunk_pairs_for_bounds_large_frames_and_floors_at_one():
    from svi2_video_worker.rife_torch import _chunk_pairs_for, _RIFE_BATCH_BUDGET_BYTES

    # A huge upscaled frame yields a small (but >=1) chunk.
    big = _chunk_pairs_for(1696, 960)
    assert big >= 1
    assert big * 3 * 1696 * 960 * 4 <= _RIFE_BATCH_BUDGET_BYTES + 3 * 1696 * 960 * 4
    # A tiny frame allows a large chunk.
    assert _chunk_pairs_for(64, 64) > big
    assert _chunk_pairs_for(0, 0) == 1
