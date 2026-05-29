from __future__ import annotations

import torch
import torch.nn.functional as F

try:
    import flash_attn as _flash_attn  # noqa: F401

    FLASH_AVAILABLE: bool = True
except ImportError:
    FLASH_AVAILABLE = False


def scaled_attention(
    q: torch.Tensor,
    k: torch.Tensor,
    v: torch.Tensor,
    *,
    causal: bool = False,
    force_sdpa: bool = False,
) -> torch.Tensor:
    if FLASH_AVAILABLE and not force_sdpa and q.is_cuda:
        from flash_attn import flash_attn_func

        q_fa = q.transpose(1, 2)
        k_fa = k.transpose(1, 2)
        v_fa = v.transpose(1, 2)
        out = flash_attn_func(q_fa, k_fa, v_fa, causal=causal)
        return out.transpose(1, 2)

    return F.scaled_dot_product_attention(q, k, v, is_causal=causal)
