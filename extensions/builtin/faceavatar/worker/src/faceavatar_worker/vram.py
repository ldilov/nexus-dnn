"""Per-stage VRAM tracking. Torch-absent-safe (every probe returns 0)."""
from __future__ import annotations

import os
import sys


def probe_free_vram() -> int:
    try:
        import torch

        if torch.cuda.is_available():
            free, _ = torch.cuda.mem_get_info()
            return int(free)
    except Exception:
        pass
    return 0


def peak_allocated() -> int:
    try:
        import torch

        if torch.cuda.is_available():
            return int(torch.cuda.max_memory_allocated())
    except Exception:
        pass
    return 0


def reset_peak() -> None:
    try:
        import torch

        if torch.cuda.is_available():
            torch.cuda.reset_peak_memory_stats()
    except Exception:
        pass


def snapshot() -> tuple[int, int]:
    try:
        import torch

        if torch.cuda.is_available():
            return int(torch.cuda.memory_allocated()), int(torch.cuda.memory_reserved())
    except Exception:
        pass
    return 0, 0


def _trace_enabled() -> bool:
    return os.environ.get("FACEAVATAR_VRAM_TRACE", "") not in ("", "0", "false", "False")


def log_vram(label: str) -> None:
    if not _trace_enabled():
        return
    alloc, reserved = snapshot()
    gib = 1024**3
    print(
        f"[vram] {label}: alloc={alloc / gib:.2f}GiB reserved={reserved / gib:.2f}GiB",
        file=sys.stderr,
        flush=True,
    )
