"""`runtime.release_memory` intrinsic — generic VRAM-free protocol method."""

from __future__ import annotations

import json
from typing import Any

import pytest

from emotion_tts_worker.main import Worker


class CapturingWorker(Worker):
    def __init__(self) -> None:
        super().__init__()
        self.outbound: list[dict[str, Any]] = []

    async def _emit(self, payload: dict[str, Any]) -> None:
        self.outbound.append(payload)

    def _emit_sync(self, payload: dict[str, Any]) -> None:
        self.outbound.append(payload)


@pytest.mark.asyncio
async def test_release_memory_intrinsic_no_model_frees_nothing() -> None:
    # Nothing is loaded, so freed_mb must be 0 and no exception is raised.
    # vram_used/total reflect the host GPU (or 0 when torch/CUDA is absent).
    worker = CapturingWorker()
    req = json.dumps(
        {"jsonrpc": "2.0", "id": 1, "method": "runtime.release_memory"}
    ).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert "error" not in out
    result = out["result"]
    assert set(result) == {"vram_used_mb", "vram_total_mb", "freed_mb"}
    assert all(isinstance(v, int) for v in result.values())
    assert result["vram_used_mb"] >= 0
    assert result["vram_total_mb"] >= 0
    assert result["freed_mb"] == 0


@pytest.mark.asyncio
async def test_release_memory_accepts_empty_object_params() -> None:
    worker = CapturingWorker()
    req = json.dumps(
        {"jsonrpc": "2.0", "id": 2, "method": "runtime.release_memory", "params": {}}
    ).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert "error" not in out
    assert out["result"]["freed_mb"] == 0


@pytest.mark.asyncio
async def test_release_memory_advertised_in_handshake() -> None:
    worker = CapturingWorker()
    req = json.dumps({"jsonrpc": "2.0", "id": 3, "method": "handshake"}).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert "runtime.release_memory" in out["result"]["accepts_methods"]
