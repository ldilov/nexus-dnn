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


def _stub_render_start(monkeypatch, swept: list[int], run_impl) -> "object":
    """Wire a fake render: spy the VRAM sweep, replace _run_render/_log/validate
    so the start handler runs without torch, and return the registered handler.

    The sweep runs only once the render frame is fully unwound — past it, no
    render-local GPU tensor survives, so gc + empty_cache reclaims everything
    the in-function finally could not.
    """
    from svi2_video_worker import main as worker_main
    from svi2_video_worker import pipeline_svi2

    monkeypatch.setattr(
        worker_main,
        "base_release_memory",
        lambda: (swept.append(1), {"freed_mb": 0})[1],
    )
    monkeypatch.setattr(pipeline_svi2, "_run_render", run_impl)
    monkeypatch.setattr(pipeline_svi2, "_log_render_inputs", lambda *a, **k: None)
    monkeypatch.setattr(
        pipeline_svi2, "validate_render_params", lambda p: {**p, "models_dir": "x"}
    )

    worker = Worker(profile="fake")
    pipeline_svi2.register_svi2_handlers(worker)
    return worker._handlers["svi2.video.render.start"]


@pytest.mark.asyncio
async def test_render_start_sweeps_vram_on_success(monkeypatch) -> None:
    swept: list[int] = []

    def _ok(validated, worker, cancel_event=None):
        return {"status": "ok", "output_path": validated["output_path"]}

    start = _stub_render_start(monkeypatch, swept, _ok)
    result = await start({"output_path": "/tmp/out.mp4"})

    assert result["status"] == "ok"
    assert swept == [1], "completion path must sweep residual VRAM once"


@pytest.mark.asyncio
async def test_render_start_sweeps_vram_on_cancel(monkeypatch) -> None:
    from svi2_video_worker.pipeline_svi2 import RenderCancelled

    swept: list[int] = []

    def _cancel(validated, worker, cancel_event=None):
        raise RenderCancelled()

    start = _stub_render_start(monkeypatch, swept, _cancel)
    result = await start({"output_path": "/tmp/out.mp4"})

    assert result == {"status": "cancelled"}
    assert swept == [1], "cancel path must sweep residual VRAM once"
