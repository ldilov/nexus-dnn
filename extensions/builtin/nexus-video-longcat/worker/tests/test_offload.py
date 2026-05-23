"""Unit tests for CPU-offload helpers + profile wiring.

torch is required for every loader-side test in this module. Each test
imports `longcat_safetensors_loader` lazily inside the function body and
gates on `_HAS_TORCH` so collection works in environments without torch.
"""

from __future__ import annotations

import importlib
import importlib.util
import logging
from unittest.mock import MagicMock, patch

import pytest

from longcat_video_worker import profiles


_HAS_TORCH = importlib.util.find_spec("torch") is not None
_NEEDS_TORCH = pytest.mark.skipif(not _HAS_TORCH, reason="torch not installed")


def _loader():
    return importlib.import_module(
        "longcat_video_worker.longcat_safetensors_loader"
    )


@_NEEDS_TORCH
def test_allowed_modes_include_partial() -> None:
    L = _loader()
    assert "partial" in L.ALLOWED_OFFLOAD_MODES
    assert set(L.ALLOWED_OFFLOAD_MODES) == {
        "none",
        "partial",
        "sequential",
        "group",
        "disk",
    }


@_NEEDS_TORCH
def test_validate_partial_requires_swap_count() -> None:
    L = _loader()
    with pytest.raises(ValueError, match="requires block_swap_count > 0"):
        L._validate_offload_args("partial", None, block_swap_count=0)


@_NEEDS_TORCH
def test_validate_partial_accepts_positive_swap_count() -> None:
    L = _loader()
    L._validate_offload_args("partial", None, block_swap_count=40)


@_NEEDS_TORCH
def test_validate_disk_still_requires_folder() -> None:
    L = _loader()
    with pytest.raises(ValueError, match="requires offload_folder"):
        L._validate_offload_args("disk", None, block_swap_count=0)


@_NEEDS_TORCH
def test_validate_unknown_mode_rejected() -> None:
    L = _loader()
    with pytest.raises(ValueError, match="is not one of"):
        L._validate_offload_args("bogus", None)


@_NEEDS_TORCH
def test_validate_warns_on_ignored_swap_count(
    caplog: pytest.LogCaptureFixture,
) -> None:
    L = _loader()
    caplog.set_level(logging.WARNING)
    L._validate_offload_args("group", None, block_swap_count=10)
    assert any("ignored for offload_mode='group'" in r.message for r in caplog.records)


@_NEEDS_TORCH
def test_validate_no_warning_for_sequential_with_swap_count(
    caplog: pytest.LogCaptureFixture,
) -> None:
    L = _loader()
    caplog.set_level(logging.WARNING)
    L._validate_offload_args("sequential", None, block_swap_count=48)
    assert not any("ignored" in r.message for r in caplog.records)


def test_profile_12gb_has_partial_offload() -> None:
    p = profiles.get_profile("rtx50-fp8-12gb")
    assert p.offload_mode == "partial"
    assert p.block_swap_count == 40
    assert p.offload_kv_cache is True


def test_profile_8gb_has_sequential_full() -> None:
    p = profiles.get_profile("rtx50-fp8-8gb")
    assert p.offload_mode == "sequential"
    assert p.block_swap_count == 48
    assert p.offload_kv_cache is True


def test_profile_default_fp8_no_offload() -> None:
    p = profiles.get_profile("rtx50-fp8")
    assert p.offload_mode == "none"
    assert p.block_swap_count == 0
    assert p.offload_kv_cache is False


def test_profile_registry_size() -> None:
    ids = {p.profile_id for p in profiles.PROFILES}
    assert ids == {
        "rtx50-fp8",
        "rtx50-fp8-distill",
        "rtx50-fp8-12gb",
        "rtx50-fp8-8gb",
        "fake",
    }


@_NEEDS_TORCH
def test_partial_offload_hooks_only_tail_blocks() -> None:
    pytest.importorskip("accelerate")
    import torch.nn as nn

    L = _loader()

    class _M(nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.blocks = nn.ModuleList([nn.Linear(8, 8) for _ in range(10)])

    model = _M()
    with patch("accelerate.hooks.add_hook_to_module") as add_hook:
        L._attach_partial_offload(model, execution_device="cpu", swap_count=3)
    assert add_hook.call_count == 3


@_NEEDS_TORCH
def test_partial_offload_zero_swap_no_op(caplog: pytest.LogCaptureFixture) -> None:
    pytest.importorskip("accelerate")
    import torch.nn as nn

    L = _loader()

    class _M(nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.blocks = nn.ModuleList([nn.Linear(8, 8) for _ in range(4)])

    caplog.set_level(logging.INFO)
    with patch("accelerate.hooks.add_hook_to_module") as add_hook:
        L._attach_partial_offload(_M(), execution_device="cpu", swap_count=0)
    assert add_hook.call_count == 0
    assert any("no-op" in r.message for r in caplog.records)


@_NEEDS_TORCH
def test_partial_offload_negative_swap_raises() -> None:
    pytest.importorskip("accelerate")
    import torch.nn as nn

    L = _loader()

    class _M(nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.blocks = nn.ModuleList([nn.Linear(8, 8) for _ in range(4)])

    with pytest.raises(ValueError, match="swap_count must be >= 0"):
        L._attach_partial_offload(_M(), execution_device="cpu", swap_count=-1)


@_NEEDS_TORCH
def test_partial_offload_swap_exceeds_blocks_raises() -> None:
    pytest.importorskip("accelerate")
    import torch.nn as nn

    L = _loader()

    class _M(nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.blocks = nn.ModuleList([nn.Linear(8, 8) for _ in range(4)])

    with pytest.raises(ValueError, match="exceeds block count"):
        L._attach_partial_offload(_M(), execution_device="cpu", swap_count=100)


def test_render_request_default_no_kv_offload() -> None:
    from longcat_video_worker.pipeline_longcat import LongCatRenderRequest

    req = LongCatRenderRequest(mode="t2v", prompt="x")
    assert req.offload_kv_cache is False


def test_render_request_kv_offload_settable() -> None:
    from longcat_video_worker.pipeline_longcat import LongCatRenderRequest

    req = LongCatRenderRequest(mode="t2v", prompt="x", offload_kv_cache=True)
    assert req.offload_kv_cache is True
