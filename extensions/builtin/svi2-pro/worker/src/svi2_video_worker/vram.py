def probe_free_vram() -> int:
    """Probe free VRAM in bytes. Returns 0 if torch/CUDA unavailable.
    
    Returns:
        Free VRAM in bytes, or 0 if CUDA not available.
    """
    try:
        import torch

        if torch.cuda.is_available():
            free, _ = torch.cuda.mem_get_info()
            return int(free)
    except (ImportError, Exception):
        pass
    return 0


def peak_allocated() -> int:
    """Get peak allocated VRAM in bytes. Returns 0 if torch/CUDA unavailable.
    
    Returns:
        Peak allocated VRAM in bytes, or 0 if CUDA not available.
    """
    try:
        import torch

        if torch.cuda.is_available():
            return int(torch.cuda.max_memory_allocated())
    except (ImportError, Exception):
        pass
    return 0


def reset_peak() -> None:
    """Reset peak memory statistics. Silently ignores if torch/CUDA unavailable."""
    try:
        import torch

        if torch.cuda.is_available():
            torch.cuda.reset_peak_memory_stats()
    except (ImportError, Exception):
        pass
