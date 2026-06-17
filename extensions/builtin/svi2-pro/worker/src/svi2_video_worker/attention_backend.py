from __future__ import annotations

import os
import sys
from dataclasses import dataclass
from typing import Callable, Optional

import torch
import torch.nn.functional as F

# ---------------------------------------------------------------------------
# Internal tensor contract: q/k/v are HND => [batch, heads, seq, head_dim].

_Attn = Callable[[torch.Tensor, torch.Tensor, torch.Tensor, bool], torch.Tensor]


def _compute_capability() -> tuple[int, int]:
    if not torch.cuda.is_available():
        return (0, 0)
    try:
        return tuple(torch.cuda.get_device_capability(0))  # type: ignore[return-value]
    except Exception:
        return (0, 0)


_SM: tuple[int, int] = _compute_capability()
_IS_BLACKWELL: bool = _SM >= (12, 0)


def _sage_version() -> Optional[tuple[int, int]]:
    try:
        from importlib.metadata import version

        raw = version("sageattention")
    except Exception:
        return None
    parts = raw.split(".")
    try:
        return (int(parts[0]), int(parts[1]) if len(parts) > 1 else 0)
    except ValueError:
        return None


# --- availability probes (import-time, cheap) ------------------------------

try:
    import flash_attn as _flash_attn  # noqa: F401

    FLASH_AVAILABLE: bool = True
except ImportError:
    FLASH_AVAILABLE = False

try:
    import sageattention as _sageattention  # noqa: F401

    SAGE_AVAILABLE: bool = True
except ImportError:
    SAGE_AVAILABLE = False

try:
    import triton as _triton  # noqa: F401

    TRITON_AVAILABLE: bool = True
except ImportError:
    TRITON_AVAILABLE = False


def _resolve_sage3() -> Optional[Callable[..., torch.Tensor]]:
    # Upstream ships under two symbol layouts depending on build/platform.
    try:
        from sageattn3 import sageattn3_blackwell as fn

        return fn
    except ImportError:
        pass
    try:
        from sageattn import sageattn_blackwell as fn

        return fn
    except ImportError:
        return None


def _resolve_flash3() -> Optional[Callable[..., torch.Tensor]]:
    # FA3 (Hopper beta) exposes flash_attn_interface; FA4 (Blackwell) ships as
    # flash_attn_4. Either provides flash_attn_func with NHD inputs.
    try:
        import flash_attn_interface as fa3

        return getattr(fa3, "flash_attn_func", None)
    except ImportError:
        pass
    try:
        import flash_attn_4 as fa4

        return getattr(fa4, "flash_attn_func", None)
    except ImportError:
        return None


_SAGE3_FN = _resolve_sage3()
SAGE3_AVAILABLE: bool = _SAGE3_FN is not None
_FLASH3_FN = _resolve_flash3()
FLASH3_AVAILABLE: bool = _FLASH3_FN is not None

# Cache the SageAttention version once — importlib.metadata does disk I/O and
# _attn_sage2 runs inside the per-step denoise loop.
_SAGE_VERSION: Optional[tuple[int, int]] = _sage_version()


# --- backend implementations (all accept/return HND) -----------------------


def _attn_sdpa(q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, causal: bool) -> torch.Tensor:
    return F.scaled_dot_product_attention(q, k, v, is_causal=causal)


def _attn_flash2(q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, causal: bool) -> torch.Tensor:
    from flash_attn import flash_attn_func

    out = flash_attn_func(q.transpose(1, 2), k.transpose(1, 2), v.transpose(1, 2), causal=causal)
    return out.transpose(1, 2)


def _attn_flash3(q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, causal: bool) -> torch.Tensor:
    if _FLASH3_FN is None:
        raise RuntimeError("flash3_fp4 kernel not available")
    out = _FLASH3_FN(q.transpose(1, 2), k.transpose(1, 2), v.transpose(1, 2), causal=causal)
    if isinstance(out, tuple):  # FA3 varlen returns (out, lse)
        out = out[0]
    return out.transpose(1, 2)


def _attn_sage2(q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, causal: bool) -> torch.Tensor:
    import sageattention

    # Blackwell (sm120) parity with Wan2GP: explicit INT8-QK / FP8-PV CUDA
    # variant with per-warp quant granularity. pv_accum_dtype + smooth_v track
    if _SM >= (12, 0):
        fn = getattr(sageattention, "sageattn_qk_int8_pv_fp8_cuda", None)
        if fn is not None:
            ver = _SAGE_VERSION
            kwargs: dict = dict(
                tensor_layout="HND",
                is_causal=causal,
                qk_quant_gran="per_warp",
            )
            if ver is not None and ver >= (2, 2):
                kwargs["pv_accum_dtype"] = "fp32+fp16"
            else:
                kwargs["pv_accum_dtype"] = "fp32"
                kwargs["smooth_v"] = True
            try:
                return fn(q, k, v, **kwargs)
            except TypeError:
                pass  # signature drift across versions -> high-level selector
    return sageattention.sageattn(q, k, v, tensor_layout="HND", is_causal=causal)


def _attn_sage3(q: torch.Tensor, k: torch.Tensor, v: torch.Tensor, causal: bool) -> torch.Tensor:
    if _SAGE3_FN is None:
        raise RuntimeError("sage3_fp4 kernel not available")
    # SA3 FP4 is bfloat16-only; fp16 crashes the Triton quant kernel. Inputs are
    # already HND, which is the kernel's native layout (no transpose). The
    if q.dtype != torch.bfloat16:
        raise RuntimeError(f"sage3_fp4 requires bfloat16 (got {q.dtype})")
    try:
        return _SAGE3_FN(q, k, v, is_causal=causal)
    except TypeError:
        return _SAGE3_FN(q, k, v)


# --- backend registry ------------------------------------------------------


@dataclass(frozen=True)
class BackendSpec:
    name: str
    fn: _Attn
    available: bool
    min_arch: tuple[int, int]
    needs_triton: bool
    bf16_only: bool


_REGISTRY: dict[str, BackendSpec] = {
    "sdpa": BackendSpec("sdpa", _attn_sdpa, True, (0, 0), False, False),
    "flash2": BackendSpec("flash2", _attn_flash2, FLASH_AVAILABLE, (8, 0), False, False),
    "flash3_fp4": BackendSpec(
        "flash3_fp4", _attn_flash3, FLASH3_AVAILABLE, (9, 0), False, False
    ),
    "sage2": BackendSpec(
        "sage2", _attn_sage2, SAGE_AVAILABLE and TRITON_AVAILABLE, (8, 0), True, False
    ),
    "sage3_fp4": BackendSpec(
        "sage3_fp4", _attn_sage3, SAGE3_AVAILABLE and TRITON_AVAILABLE, (12, 0), True, True
    ),
}

# Legacy SVI2_ATTENTION values -> registry keys.
_ALIASES: dict[str, str] = {
    "flash": "flash2",
    "flash3": "flash3_fp4",
    "sage": "sage2",
    "sage3": "sage3_fp4",
}

# Conservative auto chain: keep the render-proven flash2 path first, never
# silently promote to quantized attention (correctness over speed). Operators
_AUTO_CHAIN: tuple[str, ...] = ("flash2", "sdpa")


def _is_usable(spec: BackendSpec, q_dtype: torch.dtype) -> Optional[str]:
    if not spec.available:
        return f"{spec.name} not installed"
    if _SM < spec.min_arch:
        return f"{spec.name} requires sm_{spec.min_arch[0]}{spec.min_arch[1]} (got sm_{_SM[0]}{_SM[1]})"
    if spec.needs_triton and not TRITON_AVAILABLE:
        return f"{spec.name} requires triton"
    if spec.bf16_only and q_dtype != torch.bfloat16:
        return f"{spec.name} requires bfloat16 (got {q_dtype})"
    return None


def _requested() -> str:
    raw = os.environ.get("SVI2_ATTENTION", "auto").strip().lower()
    return _ALIASES.get(raw, raw)


def _strict() -> bool:
    return os.environ.get("SVI2_ATTENTION_STRICT", "").strip().lower() in ("1", "true", "yes")


_logged = False


def _log_once(selected: str, requested: str, q: torch.Tensor, reason: str = "") -> None:
    global _logged
    if _logged:
        return
    _logged = True
    note = f" ({reason})" if reason else ""
    print(
        f"[attn] selected={selected} requested={requested}{note} "
        f"sm={_SM[0]}{_SM[1]} cuda={q.is_cuda} dtype={q.dtype} seq={q.shape[-2]} "
        f"flash2={FLASH_AVAILABLE} sage2={SAGE_AVAILABLE} sage3={SAGE3_AVAILABLE} "
        f"flash3={FLASH3_AVAILABLE} triton={TRITON_AVAILABLE}",
        file=sys.stderr,
        flush=True,
    )


def _resolve(requested: str, q: torch.Tensor) -> tuple[BackendSpec, str]:
    if not q.is_cuda:
        return _REGISTRY["sdpa"], "cpu tensor"

    if requested == "auto":
        for name in _AUTO_CHAIN:
            spec = _REGISTRY[name]
            if _is_usable(spec, q.dtype) is None:
                return spec, "auto"
        return _REGISTRY["sdpa"], "auto fallback"

    spec = _REGISTRY.get(requested)
    if spec is None:
        if _strict():
            raise RuntimeError(f"[attn] unknown backend '{requested}'")
        return _REGISTRY["sdpa"], f"unknown '{requested}'"

    why = _is_usable(spec, q.dtype)
    if why is None:
        return spec, ""
    if _strict():
        raise RuntimeError(f"[attn] backend '{requested}' unavailable: {why}")
    return _REGISTRY["sdpa"], f"fallback: {why}"


def scaled_attention(
    q: torch.Tensor,
    k: torch.Tensor,
    v: torch.Tensor,
    *,
    causal: bool = False,
    force_sdpa: bool = False,
) -> torch.Tensor:
    requested = "sdpa" if force_sdpa else _requested()
    spec, reason = _resolve(requested, q)
    _log_once(spec.name, requested, q, reason)
    return spec.fn(q, k, v, causal)
