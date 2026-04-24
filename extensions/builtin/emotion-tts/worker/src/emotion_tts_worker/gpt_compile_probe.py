"""Capability probe for ``torch.compile`` on the GPT stage (spec 034 US4 R-34-04).

Pure detection — returns a snapshot. Persistence (writing
``compile_available`` + ``last_compile_failure_reason`` onto the deployment
row) is the Rust side's job via the ``capability.probe`` RPC handler
(spec 034 T019).

Cache policy: one run per worker subprocess lifetime. Re-probe happens
only on restart, so a user who fixes a broken Triton install has to
toggle the feature off/on (the toggle reset path in the UI) or restart
the runtime — matches R-34-04.
"""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class ProbeResult:
    """Wire-shape mirrors contracts/rpc §capability.probe entry."""

    available: bool
    detail: str
    duration_ms: int


_CACHED: ProbeResult | None = None


def probe(force: bool = False) -> ProbeResult:
    """Probe whether ``torch.compile`` can wrap a trivial module.

    On success returns ``available=True`` with a human-readable detail
    that includes the round-trip duration. On failure the error type +
    message goes into ``detail`` so the UI can explain *why* the toggle
    is disabled (R-34-04: Triton wheel problems are the common cause on
    Windows-CUDA).
    """

    global _CACHED
    if _CACHED is not None and not force:
        return _CACHED

    start = time.perf_counter()
    try:
        import torch  # type: ignore[import-not-found]
    except ImportError as err:
        _CACHED = ProbeResult(
            available=False,
            detail=f"torch not installed: {err}",
            duration_ms=int((time.perf_counter() - start) * 1000),
        )
        return _CACHED

    try:
        # Triton is the common failure point on Windows-CUDA. Import
        # is best-effort — ``torch.compile`` itself may still work on
        # a reduced backend if triton is missing.
        import triton  # type: ignore[import-not-found]  # noqa: F401

        has_triton = True
    except ImportError:
        has_triton = False

    try:
        import torch.nn as nn

        module = nn.Linear(8, 8)
        compiled = torch.compile(module, mode="reduce-overhead")
        # Single round-trip — if the backend is going to fail on a trivial
        # module it will fail here.
        result = compiled(torch.zeros(2, 8))
        if result is None or result.shape != (2, 8):
            raise RuntimeError("compile round-trip returned unexpected shape")
    except Exception as err:
        _CACHED = ProbeResult(
            available=False,
            detail=f"{type(err).__name__}: {err}",
            duration_ms=int((time.perf_counter() - start) * 1000),
        )
        return _CACHED

    duration_ms = int((time.perf_counter() - start) * 1000)
    suffix = "" if has_triton else " (no triton — reduced backend)"
    _CACHED = ProbeResult(
        available=True,
        detail=f"torch.compile round-trip succeeded in {duration_ms} ms{suffix}",
        duration_ms=duration_ms,
    )
    return _CACHED


def reset_cache() -> None:
    """Test helper — clear the subprocess-lifetime cache."""

    global _CACHED
    _CACHED = None


def snapshot() -> dict[str, Any]:
    """Return the cached probe as a plain dict, probing if unset."""

    result = probe()
    return {
        "available": result.available,
        "detail": result.detail,
        "duration_ms": result.duration_ms,
    }
