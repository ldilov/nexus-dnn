"""In-memory speaker-conditioning LRU cache (spec 034 US3 / R-34-05).

Keys on the tuple ``(content_hash, model_family, runtime_version)`` so:

* identical reference bytes hit the cache even under different display names
  (FR-220 — an operational convenience, not a correctness issue);
* different model families *never* collide (FR-242 — the cache key tripling
  mirrors the synthesis cache key in ``domain::cache_key``);
* a worker restart wipes the cache automatically (in-memory only — R-34-05
  explicitly scopes this to subprocess lifetime).

Capacity is a byte budget, not an entry count. Default 200 MB matches
``AdapterSettings.speaker_cache_mb``. Eviction is strict LRU by
``last_hit_ns`` — the oldest-read entry is popped first, and freed tensors
are ``.cpu()``-moved before being dropped so CUDA memory is reclaimed on
the next allocator poll (R-34-05 "opportunistic empty_cache" policy;
the caller may invoke ``torch.cuda.empty_cache()`` after a large eviction
if they want synchronous reclamation).
"""

from __future__ import annotations

import threading
import time
from collections import OrderedDict
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any, Generic, Mapping, TypeVar

if TYPE_CHECKING:
    import torch  # type: ignore[import-not-found]


DEFAULT_BUDGET_MB = 200
MB_TO_BYTES = 1024 * 1024


@dataclass(frozen=True)
class SpeakerCacheKey:
    content_hash: str
    model_family: str
    runtime_version: str

    def __post_init__(self) -> None:
        # Content hashes are always 64-char lowercase hex in this project
        # (mirrors domain::ContentHash on the Rust side). The stricter check
        # catches "someone passed an ArtifactRef by mistake" early.
        if len(self.content_hash) != 64:
            raise ValueError(
                f"content_hash must be 64-char hex; got {len(self.content_hash)}"
            )
        if not all(c in "0123456789abcdef" for c in self.content_hash):
            raise ValueError("content_hash must be lowercase hex")
        if not self.model_family:
            raise ValueError("model_family must be non-empty")
        if not self.runtime_version:
            raise ValueError("runtime_version must be non-empty")


T = TypeVar("T")


@dataclass
class _Entry(Generic[T]):
    value: T
    size_bytes: int
    created_at_ns: int
    last_hit_ns: int


@dataclass
class CacheStats:
    entries: int
    bytes: int
    hits: int
    misses: int
    evictions: int
    budget_bytes: int


class SpeakerCache(Generic[T]):
    """Byte-budgeted LRU over arbitrary speaker-conditioning values.

    The generic parameter is intentional — tests use plain byte arrays to
    avoid pulling torch; production callers pass ``torch.Tensor``. The
    cache never inspects the value beyond asking for its size via the
    caller-supplied ``size_bytes`` argument.
    """

    def __init__(self, budget_mb: int = DEFAULT_BUDGET_MB) -> None:
        if budget_mb < 0:
            raise ValueError(f"budget_mb must be non-negative; got {budget_mb}")
        self._budget_bytes = budget_mb * MB_TO_BYTES
        self._entries: "OrderedDict[SpeakerCacheKey, _Entry[T]]" = OrderedDict()
        self._total_bytes = 0
        self._hits = 0
        self._misses = 0
        self._evictions = 0
        self._lock = threading.Lock()

    @property
    def budget_bytes(self) -> int:
        return self._budget_bytes

    def get(self, key: SpeakerCacheKey) -> T | None:
        with self._lock:
            entry = self._entries.get(key)
            if entry is None:
                self._misses += 1
                return None
            entry.last_hit_ns = time.monotonic_ns()
            self._entries.move_to_end(key, last=True)
            self._hits += 1
            return entry.value

    def put(self, key: SpeakerCacheKey, value: T, size_bytes: int) -> None:
        if size_bytes < 0:
            raise ValueError(f"size_bytes must be non-negative; got {size_bytes}")
        with self._lock:
            existing = self._entries.get(key)
            if existing is not None:
                # Idempotent — same key keeps the first-inserted value per
                # R-34-05 ("speaker conditioning is idempotent, first-write
                # wins"). Refresh LRU position so the repeated put doesn't
                # age out the entry.
                self._entries.move_to_end(key, last=True)
                existing.last_hit_ns = time.monotonic_ns()
                return

            now = time.monotonic_ns()
            entry: _Entry[T] = _Entry(
                value=value,
                size_bytes=size_bytes,
                created_at_ns=now,
                last_hit_ns=now,
            )
            self._entries[key] = entry
            self._total_bytes += size_bytes
            self._evict_to_budget_locked()

    def contains(self, key: SpeakerCacheKey) -> bool:
        with self._lock:
            return key in self._entries

    def _evict_to_budget_locked(self) -> None:
        while self._total_bytes > self._budget_bytes and self._entries:
            _oldest_key, oldest_entry = self._entries.popitem(last=False)
            self._total_bytes -= oldest_entry.size_bytes
            self._evictions += 1
            self._maybe_release_tensor(oldest_entry.value)

    def _maybe_release_tensor(self, value: Any) -> None:
        # Best-effort CUDA reclaim. If ``torch`` isn't installed, or the
        # value isn't a tensor, we silently drop the reference — the GC
        # handles the rest.
        try:
            import torch  # type: ignore[import-not-found]
        except ImportError:
            return
        if isinstance(value, torch.Tensor) and value.is_cuda:
            try:
                value.cpu()
            except Exception:
                pass

    def stats(self) -> CacheStats:
        with self._lock:
            return CacheStats(
                entries=len(self._entries),
                bytes=self._total_bytes,
                hits=self._hits,
                misses=self._misses,
                evictions=self._evictions,
                budget_bytes=self._budget_bytes,
            )

    def clear(self) -> int:
        """Drop every entry. Returns the number of entries cleared.

        Used on `family.switch` (FR-223, spec 034 T106) to guarantee the
        cache cannot serve a stale embedding across families.
        """

        with self._lock:
            dropped = len(self._entries)
            for entry in self._entries.values():
                self._maybe_release_tensor(entry.value)
            self._entries.clear()
            self._total_bytes = 0
            return dropped

    def clear_family(self, model_family: str) -> int:
        """Drop every entry whose key matches ``model_family``.

        Used by T106 to invalidate the outgoing family's entries on switch
        (the restart-semantics guarantee — even though keys include family
        so cross-hits are impossible, clearing frees memory).
        """

        with self._lock:
            victims = [k for k in self._entries if k.model_family == model_family]
            for key in victims:
                entry = self._entries.pop(key)
                self._total_bytes -= entry.size_bytes
                self._maybe_release_tensor(entry.value)
            return len(victims)

    def snapshot_stats(self) -> Mapping[str, Any]:
        """Compact dict for emitting into a `cache_stats` notification."""

        s = self.stats()
        return {
            "entries": s.entries,
            "bytes": s.bytes,
            "hits": s.hits,
            "misses": s.misses,
            "evictions": s.evictions,
            "budget_bytes": s.budget_bytes,
        }
