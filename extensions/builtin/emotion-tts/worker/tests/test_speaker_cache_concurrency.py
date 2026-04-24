"""T071 — concurrency tests for SpeakerCache (spec 034 R-34-05)."""

from __future__ import annotations

import threading

from emotion_tts_worker.speaker_cache import SpeakerCache, SpeakerCacheKey


def key(tag: str) -> SpeakerCacheKey:
    return SpeakerCacheKey(
        content_hash=tag * 64,
        model_family="indextts-2",
        runtime_version="0.1.0",
    )


def test_concurrent_put_same_key_converges_to_first_value():
    """R-34-05: idempotent speaker conditioning — two threads inserting the
    same key must converge on one stored entry with no torn writes."""

    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    k = key("a")
    barrier = threading.Barrier(8)

    def worker(tag: bytes) -> None:
        barrier.wait()
        for _ in range(50):
            cache.put(k, tag, 100)

    threads = [threading.Thread(target=worker, args=(f"t{i}".encode(),)) for i in range(8)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    stats = cache.stats()
    assert stats.entries == 1
    assert stats.bytes == 100, f"expected size counter == 100; got {stats.bytes}"
    # Any thread's first-inserted byte string is acceptable.
    assert cache.get(k) is not None


def test_concurrent_get_does_not_trip_size_counter():
    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    cache.put(key("a"), b"a", 100)

    barrier = threading.Barrier(16)

    def reader() -> None:
        barrier.wait()
        for _ in range(200):
            cache.get(key("a"))

    threads = [threading.Thread(target=reader) for _ in range(16)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    stats = cache.stats()
    assert stats.bytes == 100
    assert stats.entries == 1
    assert stats.hits == 16 * 200
    assert stats.misses == 0


def test_concurrent_mixed_put_get_does_not_corrupt_budget():
    """Size bookkeeping must survive mixed put/get under contention."""

    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    barrier = threading.Barrier(4)

    def putter(tag: str) -> None:
        barrier.wait()
        for i in range(100):
            cache.put(key(f"{tag}{i:02x}"[0]), b"x", 1000)

    def reader() -> None:
        barrier.wait()
        for _ in range(400):
            cache.get(key("a"))

    threads = [
        threading.Thread(target=putter, args=("a",)),
        threading.Thread(target=putter, args=("b",)),
        threading.Thread(target=reader),
        threading.Thread(target=reader),
    ]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    stats = cache.stats()
    # Budget is respected no matter how contention resolved.
    assert stats.bytes <= stats.budget_bytes
    # Entry count matches explicit tracking (no leaks).
    assert stats.bytes == sum(1000 for _ in range(stats.entries))
