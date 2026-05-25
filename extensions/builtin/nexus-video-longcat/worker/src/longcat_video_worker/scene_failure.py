from __future__ import annotations

import asyncio
import concurrent.futures
from typing import Optional


class RefinementError(RuntimeError):
    pass


SCENE_OOM = "SCENE_OOM"
SCENE_NAN_LATENT = "SCENE_NAN_LATENT"
SCENE_REFINEMENT_FAILED = "SCENE_REFINEMENT_FAILED"
SCENE_DECODE_FAILED = "SCENE_DECODE_FAILED"
SCENE_TIMEOUT = "SCENE_TIMEOUT"
SCENE_UNKNOWN = "SCENE_UNKNOWN"


def _looks_like_torch_oom(exc: BaseException) -> bool:
    name = type(exc).__name__
    if name == "OutOfMemoryError":
        return True
    msg = str(exc).lower()
    return "out of memory" in msg or "cuda oom" in msg or "cuda out of memory" in msg


def _looks_like_nan(exc: BaseException) -> bool:
    msg = str(exc).lower()
    return ("nan" in msg) or ("inf" in msg and "infin" not in msg)


def _looks_like_decode(exc: BaseException) -> bool:
    msg = str(exc).lower()
    return (
        "vae.decode" in msg
        or "decode" in msg
        and ("shape" in msg or "mismatch" in msg or "assert" in msg)
    )


def classify_scene_exception(exc: BaseException) -> str:
    if isinstance(exc, RefinementError):
        return SCENE_REFINEMENT_FAILED
    if isinstance(exc, (asyncio.TimeoutError, concurrent.futures.TimeoutError)):
        return SCENE_TIMEOUT
    if _looks_like_torch_oom(exc):
        return SCENE_OOM
    if isinstance(exc, RuntimeError) and _looks_like_nan(exc):
        return SCENE_NAN_LATENT
    if isinstance(exc, ValueError) and _looks_like_nan(exc):
        return SCENE_NAN_LATENT
    if isinstance(exc, AssertionError) and _looks_like_decode(exc):
        return SCENE_DECODE_FAILED
    if isinstance(exc, RuntimeError) and _looks_like_decode(exc):
        return SCENE_DECODE_FAILED
    return SCENE_UNKNOWN


def build_failure_record(exc: BaseException, scene_index: int) -> dict:
    return {
        "scene_index": scene_index,
        "code": classify_scene_exception(exc),
        "detail": f"{type(exc).__name__}: {exc}",
    }
