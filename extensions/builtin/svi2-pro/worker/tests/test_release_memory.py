"""`runtime.release_memory` intrinsic — generic VRAM-free protocol method."""

from __future__ import annotations

import json

import pytest

from svi2_video_worker.main import RELEASE_MEMORY, Worker, base_release_memory


def test_base_release_memory_shape_no_model() -> None:
    result = base_release_memory()
    assert set(result) == {"vram_used_mb", "vram_total_mb", "freed_mb"}
    assert all(isinstance(v, int) for v in result.values())
    assert result["freed_mb"] == 0


def test_release_memory_registered() -> None:
    worker = Worker(profile="fake")
    assert RELEASE_MEMORY in worker._handlers


@pytest.mark.asyncio
async def test_release_memory_dispatch_no_model_frees_nothing() -> None:
    captured: list[str] = []
    worker = Worker(profile="fake")
    worker._write = captured.append  # type: ignore[method-assign]
    await worker._dispatch_line(
        json.dumps({"jsonrpc": "2.0", "id": 1, "method": RELEASE_MEMORY})
    )
    out = json.loads(captured[-1])
    assert "error" not in out
    assert out["result"]["freed_mb"] == 0
