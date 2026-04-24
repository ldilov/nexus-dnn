"""T070 — LRU eviction + byte-budget tests for SpeakerCache (spec 034 US3)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.speaker_cache import (
    MB_TO_BYTES,
    SpeakerCache,
    SpeakerCacheKey,
)


def key(tag: str, family: str = "indextts-2", runtime: str = "0.1.0") -> SpeakerCacheKey:
    return SpeakerCacheKey(
        content_hash=tag * 64,
        model_family=family,
        runtime_version=runtime,
    )


def test_budget_honoured_on_insert():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)  # 1 MB = 1_048_576 bytes
    half_mb = MB_TO_BYTES // 2
    cache.put(key("a"), b"\0" * half_mb, half_mb)
    cache.put(key("b"), b"\0" * half_mb, half_mb)
    stats = cache.stats()
    assert stats.entries == 2
    assert stats.bytes == MB_TO_BYTES
    assert stats.evictions == 0


def test_oldest_entry_evicted_when_budget_exceeded():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    third = MB_TO_BYTES // 3
    cache.put(key("a"), b"a", third)
    cache.put(key("b"), b"b", third)
    cache.put(key("c"), b"c", third)
    # 1 MB = 3 × third + remainder — all three fit.
    assert cache.stats().entries == 3

    # Insert a fourth one that pushes us past the budget.
    cache.put(key("d"), b"d", third * 2)
    stats = cache.stats()
    assert stats.evictions >= 1
    assert cache.get(key("a")) is None, "oldest key must be evicted first"
    assert cache.get(key("d")) is not None


def test_get_touches_entry_lru_position():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    third = MB_TO_BYTES // 3
    cache.put(key("a"), b"a", third)
    cache.put(key("b"), b"b", third)
    cache.put(key("c"), b"c", third)

    # Refresh `a` via get — now `b` is the oldest.
    assert cache.get(key("a")) == b"a"

    cache.put(key("d"), b"d", third * 2)
    assert cache.get(key("b")) is None, "touched 'a' stays; 'b' becomes eldest and evicts"
    assert cache.get(key("a")) == b"a"


def test_repeated_put_does_not_duplicate_entry():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    k = key("a")
    cache.put(k, b"v1", 100)
    cache.put(k, b"v2", 500)  # R-34-05 first-write wins.
    assert cache.get(k) == b"v1"
    assert cache.stats().entries == 1
    assert cache.stats().bytes == 100


def test_stats_tracks_hits_misses_evictions():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    cache.put(key("a"), b"a", 100)
    cache.get(key("a"))
    cache.get(key("a"))
    cache.get(key("f"))
    stats = cache.stats()
    assert stats.hits == 2
    assert stats.misses == 1


def test_zero_budget_evicts_everything_on_next_insert():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=0)
    cache.put(key("a"), b"a", 100)
    stats = cache.stats()
    # First insert exceeded budget immediately → entry evicted.
    assert stats.entries == 0
    assert stats.evictions == 1


def test_clear_drops_every_entry():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    cache.put(key("a"), b"a", 100)
    cache.put(key("b"), b"b", 100)
    dropped = cache.clear()
    assert dropped == 2
    assert cache.stats().entries == 0
    assert cache.stats().bytes == 0


def test_clear_family_only_drops_matching_family():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    cache.put(key("a", family="indextts-2"), b"a", 100)
    cache.put(key("a", family="indextts-2-5"), b"b", 100)
    cache.put(key("b", family="indextts-2"), b"c", 100)
    dropped = cache.clear_family("indextts-2")
    assert dropped == 2
    assert cache.stats().entries == 1
    assert cache.get(key("a", family="indextts-2-5")) == b"b"


@pytest.mark.parametrize("bad", [-1])
def test_negative_budget_rejected(bad: int):
    with pytest.raises(ValueError):
        SpeakerCache(budget_mb=bad)
