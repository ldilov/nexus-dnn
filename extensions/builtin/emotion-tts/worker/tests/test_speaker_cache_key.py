"""T072 — SpeakerCacheKey composition tests (spec 034 FR-220, FR-242)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.speaker_cache import SpeakerCache, SpeakerCacheKey


def make(
    content_hash: str = "a" * 64,
    family: str = "indextts-2",
    runtime: str = "0.1.0",
) -> SpeakerCacheKey:
    return SpeakerCacheKey(
        content_hash=content_hash,
        model_family=family,
        runtime_version=runtime,
    )


def test_same_triplet_hashes_equal_and_hits_same_slot():
    a = make()
    b = make()
    assert a == b
    assert hash(a) == hash(b)


def test_different_model_family_forces_miss():
    """FR-242: cache key MUST include model_family so cross-family hits are 0."""

    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    cache.put(make(family="indextts-2"), b"v2", 100)
    assert cache.get(make(family="indextts-2-5")) is None, (
        "family mismatch must NEVER return the indextts-2 entry"
    )


def test_different_runtime_version_forces_miss():
    """FR-220: cache key MUST include runtime_version so runtime bumps invalidate."""

    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    cache.put(make(runtime="0.1.0"), b"old", 100)
    assert cache.get(make(runtime="0.2.0")) is None


def test_identical_content_hash_under_different_display_name_hits():
    """FR-220 / spec edge case — same bytes under different UI labels = intentional hit."""

    cache: SpeakerCache[bytes] = SpeakerCache(budget_mb=1)
    shared_hash = "b" * 64
    cache.put(make(content_hash=shared_hash), b"embedding", 100)
    # Only the hash matters — display-name collisions are a UI concern.
    assert cache.get(make(content_hash=shared_hash)) == b"embedding"


def test_uppercase_hash_rejected():
    with pytest.raises(ValueError):
        SpeakerCacheKey(
            content_hash="A" * 64,
            model_family="indextts-2",
            runtime_version="0.1.0",
        )


def test_short_hash_rejected():
    with pytest.raises(ValueError):
        SpeakerCacheKey(
            content_hash="abc",
            model_family="indextts-2",
            runtime_version="0.1.0",
        )


@pytest.mark.parametrize("blank_field", ["model_family", "runtime_version"])
def test_blank_identity_fields_rejected(blank_field: str):
    kwargs = {
        "content_hash": "a" * 64,
        "model_family": "indextts-2",
        "runtime_version": "0.1.0",
    }
    kwargs[blank_field] = ""
    with pytest.raises(ValueError):
        SpeakerCacheKey(**kwargs)


def test_key_is_frozen_and_hashable():
    k = make()
    with pytest.raises(Exception):
        k.model_family = "different"  # type: ignore[misc]
    # Used as dict key directly.
    d = {k: "value"}
    assert d[make()] == "value"
