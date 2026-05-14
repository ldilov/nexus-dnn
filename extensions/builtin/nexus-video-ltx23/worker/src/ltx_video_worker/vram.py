"""Canonical VRAM drop sequence + memory_stats snapshot.

In the fake profile, torch is not installed — every function is a no-op that
returns safe-default stats. In a real profile (P2+), the implementations
delegate to torch.cuda.

This module is the single source of truth for AC13 ("models cleared from
VRAM after generation"). The supervisor on the Rust side reads
memory_stats() to decide when to restart the runtime.
"""

from __future__ import annotations

import gc
from typing import Any


def evict_models(state: Any) -> None:
    """Run the canonical drop sequence.

    Order is load-bearing:
      1. Move pipeline to CPU, drop sub-modules, drop pipeline.
      2. Reset dynamo / compile caches.
      3. gc.collect() x2 BEFORE empty_cache (finalizers can resurrect refs).
      4. torch.cuda.synchronize().
      5. empty_cache + ipc_collect.
      6. reset_peak_memory_stats.
    """
    pipe = getattr(state, "pipe", None)
    if pipe is not None:
        try:
            pipe.to("cpu")
        except Exception:
            pass
        for attr in ("transformer", "vae", "text_encoder"):
            try:
                delattr(pipe, attr)
            except Exception:
                pass
        try:
            del state.pipe
        except Exception:
            pass
        state.pipe = None

    try:
        import torch
        try:
            torch._dynamo.reset()
        except AttributeError:
            pass
    except ImportError:
        torch = None

    gc.collect()
    gc.collect()

    if torch is not None and torch.cuda.is_available():
        try:
            torch.cuda.synchronize()
            torch.cuda.empty_cache()
            torch.cuda.ipc_collect()
            torch.cuda.reset_peak_memory_stats()
        except Exception:
            pass


def memory_stats(generation_count: int = 0) -> dict[str, Any]:
    """Snapshot for the runtime.memory_stats notification.

    Fake profile returns zeros + generation_count from caller.
    """
    try:
        import torch
        if not torch.cuda.is_available():
            return _empty_stats(generation_count)
        s = torch.cuda.memory_stats()
        reserved = s.get("reserved_bytes.all.current", 0)
        allocated = s.get("allocated_bytes.all.current", 0)
        peak = s.get("allocated_bytes.all.peak", 0)
        frag_ratio = (reserved - allocated) / reserved if reserved else 0.0
        return {
            "allocated_mb": allocated // (1024 * 1024),
            "reserved_mb": reserved // (1024 * 1024),
            "peak_mb_this_segment": peak // (1024 * 1024),
            "frag_ratio": round(frag_ratio, 4),
            "num_alloc_retries": s.get("num_alloc_retries", 0),
            "num_ooms": s.get("num_ooms", 0),
            "free_mb": _free_vram_mb(),
            "rss_mb": _rss_mb(),
            "generation_count": generation_count,
        }
    except ImportError:
        return _empty_stats(generation_count)


def _empty_stats(generation_count: int) -> dict[str, Any]:
    return {
        "allocated_mb": 0,
        "reserved_mb": 0,
        "peak_mb_this_segment": 0,
        "frag_ratio": 0.0,
        "num_alloc_retries": 0,
        "num_ooms": 0,
        "free_mb": 0,
        "rss_mb": _rss_mb(),
        "generation_count": generation_count,
    }


def _free_vram_mb() -> int:
    try:
        import torch
        if not torch.cuda.is_available():
            return 0
        free, _ = torch.cuda.mem_get_info()
        return free // (1024 * 1024)
    except Exception:
        return 0


def _rss_mb() -> int:
    try:
        import resource
        # *NIX path. ru_maxrss is KB on Linux, bytes on macOS — be conservative.
        rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
        return rss // 1024
    except Exception:
        try:
            import psutil
            return psutil.Process().memory_info().rss // (1024 * 1024)
        except Exception:
            return 0
