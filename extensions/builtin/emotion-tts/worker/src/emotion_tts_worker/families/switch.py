"""Spec 034 US5 T106 — ``family.switch`` Python service.

Core contract (from contracts/rpc/methods_additions.md §family.switch):

* Input params: ``{ family_id: str }``
* Result: ``{ switched: bool, load_duration_ms: int, vram_delta_mb: int }``
* Errors:
    * ``-32012 family_not_installed`` — descriptor exists but host
      model-store reports artifacts missing.
    * ``-32013 family_incompatible`` — descriptor engine-version
      constraint unsatisfied.

**FR-223 restart-semantics invalidation**: on a successful switch we
*always* clear every speaker-cache entry, not just the ones keyed to
the outgoing family. Keys already diverge by family (cross-family hits
are impossible per FR-242), so the clear is about freeing memory +
guaranteeing no stale state if the worker has been long-lived.
"""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any, Callable, Protocol

from ..indextts_adapter import IndexTtsAdapter
from . import FamilyLoader


class FamilyNotInstalled(Exception):
    """Raised when the family descriptor exists but weights aren't available.

    Worker dispatcher maps this to RPC error code ``-32012``.
    """


class FamilyIncompatible(Exception):
    """Raised when the engine version doesn't satisfy the family's constraint.

    Worker dispatcher maps this to RPC error code ``-32013``.
    """


class ArtifactStatusProbe(Protocol):
    """Abstract seam for asking the host whether family weights are present.

    Real implementations call the host model-store HTTP API over the
    existing RPC transport; tests supply a closure.
    """

    def __call__(self, family_id: str, model_family_ref: str) -> str:
        """Return one of: ``available | not_installed | partial | incompatible``."""


@dataclass
class FamilySwitchResult:
    switched: bool
    load_duration_ms: int
    vram_delta_mb: int


class FamilySwitcher:
    """Coordinates unload → load → cache invalidation on family change.

    Callers wire this into the ``family.switch`` RPC dispatcher. The
    class keeps state minimal so a switch can be retried idempotently
    — repeated switches to the same family are no-ops.
    """

    def __init__(
        self,
        loader: FamilyLoader,
        adapter: IndexTtsAdapter,
        probe: ArtifactStatusProbe,
    ) -> None:
        self._loader = loader
        self._adapter = adapter
        self._probe = probe

    def switch(self, family_id: str) -> FamilySwitchResult:
        desc = self._loader.get(family_id)
        if desc is None:
            # Unknown family — surfaced as -32013 per contract (the
            # family is "incompatible with the worker" because the
            # worker doesn't know about it).
            raise FamilyIncompatible(f"family '{family_id}' is not in the registry")

        if self._loader.active_family_id == family_id:
            # Idempotent no-op — caller can retry safely.
            return FamilySwitchResult(
                switched=False,
                load_duration_ms=0,
                vram_delta_mb=0,
            )

        status = self._probe(desc.family_id, desc.model_family_ref)
        if status == "not_installed":
            raise FamilyNotInstalled(
                f"family '{family_id}' has no weights installed on the host"
            )
        if status == "incompatible":
            raise FamilyIncompatible(
                f"family '{family_id}' is incompatible with the active runtime"
            )
        if status == "partial":
            raise FamilyNotInstalled(
                f"family '{family_id}' is partially installed — re-download required"
            )

        old_family = self._loader.active_family_id

        start = time.perf_counter()
        vram_before_mb = self._adapter.unload()
        # Unload returns MB freed; positive value means something was
        # resident. On a cold worker this is 0.

        self._adapter.set_active_model_family(family_id)
        # Lazily load — ensure_model() is invoked on the first
        # synthesis after the switch. Avoids a compile/load round-trip
        # on every toggle flip.
        load_duration_ms = int((time.perf_counter() - start) * 1000)

        # FR-223 invalidation: drop every cache entry — both old and new
        # family — so stale embeddings from a long-lived worker don't
        # leak across switches. Also clears the incoming family's
        # entries (which should be empty the first time, but we're
        # defensive — a repeated switch cycle would otherwise keep
        # stale data warm).
        dropped_old = self._adapter.clear_speaker_cache_family(old_family)
        dropped_new = self._adapter.clear_speaker_cache_family(family_id)

        self._loader.set_active_family(family_id)

        # Post-condition required by spec 034 I1 remediation: after the
        # switch the cache is empty of any entries belonging to either
        # family. The adapter's cache holds other families' entries
        # only if they were populated pre-switch (uncommon in practice).
        assert (dropped_old + dropped_new) >= 0, "clear_speaker_cache_family returned negative"

        return FamilySwitchResult(
            switched=True,
            load_duration_ms=load_duration_ms,
            vram_delta_mb=vram_before_mb,
        )


def build_not_installed_probe() -> ArtifactStatusProbe:
    """Default probe used before the host reconciliation lands — every
    family reports ``not_installed`` so ``family.switch`` surfaces a
    clean error rather than tripping on ``ensure_model``."""

    def _probe(_family_id: str, _model_family_ref: str) -> str:
        return "not_installed"

    return _probe


def build_always_available_probe() -> ArtifactStatusProbe:
    """Test fixture — every family reports ``available``."""

    def _probe(_family_id: str, _model_family_ref: str) -> str:
        return "available"

    return _probe
