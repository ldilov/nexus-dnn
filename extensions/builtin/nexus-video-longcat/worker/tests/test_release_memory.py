"""`runtime.release_memory` intrinsic — generic VRAM-free protocol method."""

from __future__ import annotations

from typing import Any

import pytest

from longcat_video_worker.main import RELEASE_MEMORY, base_release_memory
from longcat_video_worker.pipeline_longcat import register_longcat_handlers


class FakeWorker:
    def __init__(self) -> None:
        self.handlers: dict[str, Any] = {}

    def register(self, method: str, handler: Any, *, replace: bool = False) -> None:
        if method in self.handlers and not replace:
            raise ValueError(f"duplicate handler for {method}")
        self.handlers[method] = handler


def test_base_release_memory_shape_no_model() -> None:
    result = base_release_memory()
    assert set(result) == {"vram_used_mb", "vram_total_mb", "freed_mb"}
    assert all(isinstance(v, int) for v in result.values())
    assert result["freed_mb"] == 0


def test_release_memory_intrinsic_registered_on_real_worker() -> None:
    from longcat_video_worker.main import Worker

    worker = Worker(profile="fake")
    assert RELEASE_MEMORY in worker._handlers


async def test_release_memory_override_registered_on_real_profile() -> None:
    worker = FakeWorker()
    register_longcat_handlers(worker, use_distill=False)
    assert RELEASE_MEMORY in worker.handlers
    result = await worker.handlers[RELEASE_MEMORY]({})
    assert set(result) == {"vram_used_mb", "vram_total_mb", "freed_mb"}
    assert result["freed_mb"] == 0


@pytest.mark.asyncio
async def test_base_intrinsic_dispatch_on_real_worker() -> None:
    import json

    from longcat_video_worker.main import Worker

    captured: list[str] = []
    worker = Worker(profile="fake")
    worker._write = captured.append  # type: ignore[method-assign]
    await worker._dispatch_line(
        json.dumps({"jsonrpc": "2.0", "id": 1, "method": RELEASE_MEMORY})
    )
    out = json.loads(captured[-1])
    assert "error" not in out
    assert out["result"]["freed_mb"] == 0
