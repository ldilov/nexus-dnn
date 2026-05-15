"""Fake-runtime end-to-end tests.

Drives the worker via the in-process Worker class (skipping the stdio framer
for unit-test speed). Asserts JSON-RPC contract is honoured: progress
notifications fire per segment, MEMORY_STATS emitted, ARTIFACT_CREATED for
each segment + final, DONE at the end, ERROR on cancellation.
"""

from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock, AsyncMock

import pytest

from ltx_video_worker.main import Worker
from ltx_video_worker.pipeline_fake import register_fake_handlers
from ltx_video_worker.rpc import Methods, Notifications


@pytest.fixture
def worker(tmp_path):
    w = Worker(profile="fake")
    register_fake_handlers(w)
    events: list[tuple[str, dict[str, Any]]] = []

    async def _capture(method: str, params: dict[str, Any]) -> None:
        events.append((method, params))

    w.emit_notification = _capture  # type: ignore[method-assign]
    return w, events, tmp_path


@pytest.mark.asyncio
async def test_render_start_emits_progress_and_done(worker):
    w, events, tmp_path = worker
    plan = {
        "segment_count": 3,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": 12,
        "segment_seconds": 4,
    }
    res = await w._handlers[Methods.RENDER_START](
        {"request_id": "run_test_001", "video": plan, "workdir": str(tmp_path)}
    )
    assert res["run_id"] == "run_test_001"

    # Wait for fire-and-forget render task
    for _ in range(50):
        if any(m == Notifications.DONE for m, _ in events):
            break
        await asyncio.sleep(0.05)

    methods = [m for m, _ in events]
    assert methods.count(Notifications.SEGMENT_STARTED) == 3
    assert methods.count(Notifications.SEGMENT_COMPLETED) == 3
    assert methods.count(Notifications.MEMORY_STATS) == 3
    # 2 per-segment artifacts (raw + last_frame) + final
    assert methods.count(Notifications.ARTIFACT_CREATED) == 3 * 2 + 1
    assert methods.count(Notifications.DONE) == 1


@pytest.mark.asyncio
async def test_render_cancel_emits_error(worker, monkeypatch):
    w, events, tmp_path = worker
    # Slow segments so we can cancel mid-flight
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FAKE_DELAY_MS", "200")
    # Re-register with new env (the worker reads at register time)
    w._handlers = {}
    w._register_intrinsic()
    register_fake_handlers(w)
    # Re-capture
    captured: list[tuple[str, dict[str, Any]]] = []
    async def _capture(method, params):
        captured.append((method, params))
    w.emit_notification = _capture  # type: ignore[method-assign]

    plan = {
        "segment_count": 5,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": 20,
    }
    await w._handlers[Methods.RENDER_START](
        {"request_id": "run_cancel_001", "video": plan, "workdir": str(tmp_path)}
    )
    await asyncio.sleep(0.3)
    await w._handlers[Methods.RENDER_CANCEL]({"run_id": "run_cancel_001"})

    for _ in range(20):
        if any(m == Notifications.ERROR for m, _ in captured):
            break
        await asyncio.sleep(0.1)

    methods = [m for m, _ in captured]
    assert Notifications.ERROR in methods
    assert Notifications.DONE not in methods


@pytest.mark.asyncio
async def test_render_failure_injection(worker, monkeypatch):
    w, events, tmp_path = worker
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_FAKE_FAILURE_SEGMENT_INDEX", "2")
    w._handlers = {}
    w._register_intrinsic()
    register_fake_handlers(w)
    captured: list[tuple[str, dict[str, Any]]] = []
    async def _capture(method, params):
        captured.append((method, params))
    w.emit_notification = _capture  # type: ignore[method-assign]

    plan = {"segment_count": 5, "width": 960, "height": 544, "requested_duration_seconds": 20}
    await w._handlers[Methods.RENDER_START](
        {"request_id": "run_fail_001", "video": plan, "workdir": str(tmp_path)}
    )
    for _ in range(40):
        if any(m == Notifications.ERROR for m, _ in captured):
            break
        await asyncio.sleep(0.05)
    methods = [m for m, _ in captured]
    assert Notifications.ERROR in methods
    # 0, 1 completed; 2 fails
    assert methods.count(Notifications.SEGMENT_COMPLETED) == 2
    assert Notifications.DONE not in methods


@pytest.mark.asyncio
async def test_health(worker):
    w, _, _ = worker
    res = await w._handlers["ltx.runtime.health"](None)
    assert res["profile"] == "fake"
    assert res["status"] == "ready"


@pytest.mark.asyncio
async def test_plan_validate_rejects_bad_dimensions(worker):
    w, _, _ = worker
    res = await w._handlers[Methods.PLAN_VALIDATE](
        {"plan": {"mode": "external_segments", "width": 961, "height": 544, "segments": []}}
    )
    assert res["ok"] is False
    assert any("32" in e for e in res["errors"])


@pytest.mark.asyncio
async def test_plan_validate_rejects_non_8n1_frame_count(worker):
    w, _, _ = worker
    res = await w._handlers[Methods.PLAN_VALIDATE](
        {"plan": {
            "mode": "external_segments", "width": 960, "height": 544,
            "segments": [{"index": 0, "frame_count": 50}],
        }}
    )
    assert res["ok"] is False
    assert any("8n+1" in e for e in res["errors"])


# ── Item C: RESUME_ACKNOWLEDGED ack for Rung 7L mid-chain restarts ────


@pytest.mark.asyncio
async def test_render_start_emits_resume_ack_when_offset_nonzero(worker):
    """A resume payload (resumed_from_segment > 0) should emit exactly
    one RESUME_ACKNOWLEDGED notification before the first SEGMENT_STARTED.
    """
    w, events, tmp_path = worker
    plan = {
        "segment_count": 3,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": 12,
        "segment_seconds": 4,
    }
    await w._handlers[Methods.RENDER_START](
        {
            "request_id": "run_resume_001",
            "video": plan,
            "workdir": str(tmp_path),
            "resumed_from_segment": 2,
        }
    )
    for _ in range(50):
        if any(m == Notifications.DONE for m, _ in events):
            break
        await asyncio.sleep(0.05)

    methods = [m for m, _ in events]
    assert methods.count(Notifications.RESUME_ACKNOWLEDGED) == 1, (
        f"expected exactly one resume ack, got methods={methods}"
    )
    # The ack MUST land before the first SEGMENT_STARTED so a host log
    # reader can attach the offset to the chain's first segment row.
    ack_idx = methods.index(Notifications.RESUME_ACKNOWLEDGED)
    first_started_idx = methods.index(Notifications.SEGMENT_STARTED)
    assert ack_idx < first_started_idx, (
        f"ack at {ack_idx} should precede first SEGMENT_STARTED at {first_started_idx}"
    )

    # Ack payload includes the offset so the operator UI can show
    # "resumed at segment 2" without inferring from segment numbering.
    ack_params = next(p for m, p in events if m == Notifications.RESUME_ACKNOWLEDGED)
    assert ack_params["run_id"] == "run_resume_001"
    assert ack_params["resumed_from_segment"] == 2


@pytest.mark.asyncio
async def test_render_start_skips_resume_ack_for_first_attempt(worker):
    """First-attempt render (no resumed_from_segment field, or =0)
    must NOT emit RESUME_ACKNOWLEDGED — the notification's whole
    purpose is to flag a non-trivial offset.
    """
    w, events, tmp_path = worker
    plan = {
        "segment_count": 2,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": 8,
        "segment_seconds": 4,
    }
    await w._handlers[Methods.RENDER_START](
        {
            "request_id": "run_clean_001",
            "video": plan,
            "workdir": str(tmp_path),
            # Explicit zero — exercises the >0 guard.
            "resumed_from_segment": 0,
        }
    )
    for _ in range(50):
        if any(m == Notifications.DONE for m, _ in events):
            break
        await asyncio.sleep(0.05)

    methods = [m for m, _ in events]
    assert Notifications.RESUME_ACKNOWLEDGED not in methods, (
        f"clean run should NOT emit resume ack, got methods={methods}"
    )


@pytest.mark.asyncio
async def test_render_start_keeps_strong_ref_to_bg_task(worker):
    """Regression guard for CPython 3.11's weak-task-ref bug.

    `asyncio.create_task(...)` returns a Task that the event loop only
    holds a WEAK reference to. If the caller discards the return value,
    the task can be garbage-collected before its first await runs —
    which is exactly what bit us on 2026-05-15: the worker accepted
    render.start, replied OK, then sat idle for minutes because the
    background render task had vanished.

    Behavioural check: if the bg task GCs before first await, no
    SEGMENT_STARTED ever fires. Asserting SEGMENT_STARTED arrives
    within a generous timeout is the cleanest proof that the strong
    reference on rs.bg_task is doing its job.
    """
    w, events, tmp_path = worker
    plan = {
        "segment_count": 1,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": 4,
        "segment_seconds": 4,
    }
    await w._handlers[Methods.RENDER_START](
        {"request_id": "run_bg_task", "video": plan, "workdir": str(tmp_path)}
    )
    # Force a GC pass between render_start and the first await, to
    # surface the bug if the strong-ref guard ever regresses.
    import gc
    gc.collect()
    for _ in range(50):
        if any(m == Notifications.SEGMENT_STARTED for m, _ in events):
            break
        await asyncio.sleep(0.05)
    methods = [m for m, _ in events]
    assert Notifications.SEGMENT_STARTED in methods, (
        "Background render task never reached its first emit — "
        "likely GC'd before its first await. Verify "
        "rs.bg_task = asyncio.create_task(...) in render_start."
    )


@pytest.mark.asyncio
async def test_render_start_tolerates_malformed_resume_offset(worker):
    """Garbage values for resumed_from_segment must collapse to 0,
    not crash render_start. Defends against host bugs that emit
    strings, negatives, or None into the field.
    """
    w, events, tmp_path = worker
    plan = {
        "segment_count": 2,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": 8,
        "segment_seconds": 4,
    }
    # Negative offset: max(0, -3) = 0 → no ack expected.
    await w._handlers[Methods.RENDER_START](
        {
            "request_id": "run_bad_offset_001",
            "video": plan,
            "workdir": str(tmp_path),
            "resumed_from_segment": -3,
        }
    )
    for _ in range(50):
        if any(m == Notifications.DONE for m, _ in events):
            break
        await asyncio.sleep(0.05)
    methods = [m for m, _ in events]
    assert Notifications.RESUME_ACKNOWLEDGED not in methods
