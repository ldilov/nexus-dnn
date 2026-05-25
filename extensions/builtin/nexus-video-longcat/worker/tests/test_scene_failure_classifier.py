from __future__ import annotations

import asyncio
import concurrent.futures

import pytest

from longcat_video_worker.scene_failure import (
    RefinementError,
    SCENE_DECODE_FAILED,
    SCENE_NAN_LATENT,
    SCENE_OOM,
    SCENE_REFINEMENT_FAILED,
    SCENE_TIMEOUT,
    SCENE_UNKNOWN,
    build_failure_record,
    classify_scene_exception,
)


def test_classify_refinement_error() -> None:
    assert classify_scene_exception(RefinementError("boom")) == SCENE_REFINEMENT_FAILED


def test_classify_asyncio_timeout() -> None:
    assert classify_scene_exception(asyncio.TimeoutError()) == SCENE_TIMEOUT


def test_classify_futures_timeout() -> None:
    assert classify_scene_exception(concurrent.futures.TimeoutError()) == SCENE_TIMEOUT


def test_classify_runtime_oom_message() -> None:
    exc = RuntimeError("CUDA out of memory. Tried to allocate 2 GiB")
    assert classify_scene_exception(exc) == SCENE_OOM


def test_classify_nan_runtime() -> None:
    exc = RuntimeError("latent contains NaN values during sampling")
    assert classify_scene_exception(exc) == SCENE_NAN_LATENT


def test_classify_nan_value_error() -> None:
    exc = ValueError("NaN detected in latent guard")
    assert classify_scene_exception(exc) == SCENE_NAN_LATENT


def test_classify_decode_runtime() -> None:
    exc = RuntimeError("vae.decode failed: shape mismatch on output tensor")
    assert classify_scene_exception(exc) == SCENE_DECODE_FAILED


def test_classify_decode_assertion() -> None:
    exc = AssertionError("decode shape mismatch")
    assert classify_scene_exception(exc) == SCENE_DECODE_FAILED


def test_classify_unknown_fallback() -> None:
    exc = KeyError("missing")
    assert classify_scene_exception(exc) == SCENE_UNKNOWN


def test_classify_torch_oom_type_name_match() -> None:
    class OutOfMemoryError(RuntimeError):
        pass

    assert classify_scene_exception(OutOfMemoryError("x")) == SCENE_OOM


def test_build_failure_record_shape() -> None:
    rec = build_failure_record(RuntimeError("boom NaN"), 3)
    assert rec["scene_index"] == 3
    assert rec["code"] == SCENE_NAN_LATENT
    assert "RuntimeError" in rec["detail"]
