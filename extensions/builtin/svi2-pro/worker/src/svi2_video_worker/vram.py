def probe_free_vram() -> int:
    try:
        import torch

        if torch.cuda.is_available():
            free, _ = torch.cuda.mem_get_info()
            return int(free)
    except (ImportError, Exception):
        pass
    return 0


def peak_allocated() -> int:
    try:
        import torch

        if torch.cuda.is_available():
            return int(torch.cuda.max_memory_allocated())
    except (ImportError, Exception):
        pass
    return 0


def reset_peak() -> None:
    try:
        import torch

        if torch.cuda.is_available():
            torch.cuda.reset_peak_memory_stats()
    except (ImportError, Exception):
        pass


def snapshot() -> tuple[int, int]:
    try:
        import torch

        if torch.cuda.is_available():
            return int(torch.cuda.memory_allocated()), int(torch.cuda.memory_reserved())
    except (ImportError, Exception):
        pass
    return 0, 0


def _trace_enabled() -> bool:
    import os

    return os.environ.get("SVI2_VRAM_TRACE", "") not in ("", "0", "false", "False")


def log_vram(label: str) -> None:
    if not _trace_enabled():
        return
    import sys

    alloc, reserved = snapshot()
    gib = 1024**3
    print(
        f"[vram] {label}: alloc={alloc / gib:.2f}GiB reserved={reserved / gib:.2f}GiB",
        file=sys.stderr,
        flush=True,
    )
