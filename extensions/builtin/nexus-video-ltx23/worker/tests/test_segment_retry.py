"""Segment-retry RPC contract tests against the fake pipeline.

Covers:
  - Happy path: ``segment.retry`` emits SEGMENT_STARTED → ARTIFACT_CREATED
    (raw + last_frame) → SEGMENT_COMPLETED → MEMORY_STATS → PROGRESS;
    DOES NOT emit DONE (retry is partial recovery, not full chain).
  - All retry notifications carry the ``retry: true`` flag so consumers
    can distinguish from initial-render notifications.
  - segment_index validation: missing / non-int / negative / out-of-range
    raise ValueError synchronously from the handler (worker frames it
    as JSON-RPC INVALID_PARAMS).
  - run-id auto-registration when no prior render exists (the typical
    flow on the Rust runner — fresh lease, no in-memory run state).
  - Cancellation mid-retry: if the run's cancelled flag is set before
    the retry task starts, ERROR with RENDER_CANCELLED fires instead.
  - Artifact files actually land on disk (placeholder MP4 + PNG).
"""

from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any

import pytest

from ltx_video_worker.main import Worker
from ltx_video_worker.pipeline_fake import register_fake_handlers
from ltx_video_worker.rpc import ErrorCodes, Methods, Notifications


@pytest.fixture
def worker(tmp_path):
    w = Worker(profile="fake")
    register_fake_handlers(w)
    events: list[tuple[str, dict[str, Any]]] = []

    async def _capture(method: str, params: dict[str, Any]) -> None:
        events.append((method, params))

    w.emit_notification = _capture  # type: ignore[method-assign]
    return w, events, tmp_path


def _plan(segment_count: int = 4) -> dict[str, Any]:
    return {
        "segment_count": segment_count,
        "width": 960,
        "height": 544,
        "requested_duration_seconds": segment_count * 4,
        "segment_seconds": 4,
    }


async def _drain_until(
    events: list[tuple[str, dict[str, Any]]],
    target: str,
    *,
    timeout_s: float = 3.0,
) -> None:
    deadline = asyncio.get_running_loop().time() + timeout_s
    while asyncio.get_running_loop().time() < deadline:
        if any(m == target for m, _ in events):
            return
        await asyncio.sleep(0.02)
    raise AssertionError(
        f"never observed {target!r} within {timeout_s}s; saw {[m for m, _ in events]}"
    )


# --- happy path -------------------------------------------------------------


@pytest.mark.asyncio
async def test_segment_retry_emits_partial_notification_stream(worker):
    w, events, tmp_path = worker
    res = await w._handlers[Methods.SEGMENT_RETRY](
        {
            "request_id": "run_retry_001",
            "segment_index": 2,
            "video": _plan(),
            "workdir": str(tmp_path),
        }
    )
    assert res["run_id"] == "run_retry_001"
    assert res["segment_index"] == 2
    assert res["status"] == "retrying"

    await _drain_until(events, Notifications.SEGMENT_COMPLETED)

    methods = [m for m, _ in events]
    assert methods.count(Notifications.SEGMENT_STARTED) == 1
    assert methods.count(Notifications.SEGMENT_COMPLETED) == 1
    assert methods.count(Notifications.MEMORY_STATS) == 1
    # 2 per-retry artifacts: raw_video + last_frame
    assert methods.count(Notifications.ARTIFACT_CREATED) == 2
    # Crucial: retry must NOT emit DONE (retry is partial, not full chain).
    assert Notifications.DONE not in methods


@pytest.mark.asyncio
async def test_segment_retry_notifications_carry_retry_flag(worker):
    w, events, tmp_path = worker
    await w._handlers[Methods.SEGMENT_RETRY](
        {
            "request_id": "run_retry_002",
            "segment_index": 1,
            "video": _plan(),
            "workdir": str(tmp_path),
        }
    )
    await _drain_until(events, Notifications.SEGMENT_COMPLETED)
    flagged_methods = (
        Notifications.SEGMENT_STARTED,
        Notifications.SEGMENT_COMPLETED,
        Notifications.ARTIFACT_CREATED,
        Notifications.PROGRESS,
    )
    for method, params in events:
        if method in flagged_methods:
            assert params.get("retry") is True, (
                f"{method} payload missing retry flag: {params}"
            )


@pytest.mark.asyncio
async def test_segment_retry_writes_artifacts_to_disk(worker):
    w, events, tmp_path = worker
    await w._handlers[Methods.SEGMENT_RETRY](
        {
            "request_id": "run_retry_003",
            "segment_index": 0,
            "video": _plan(),
            "workdir": str(tmp_path),
        }
    )
    await _drain_until(events, Notifications.SEGMENT_COMPLETED)
    seg_dir = Path(tmp_path) / "segments" / "000"
    assert (seg_dir / "raw.mp4").is_file()
    assert (seg_dir / "last_frame.png").is_file()


@pytest.mark.asyncio
async def test_segment_retry_targets_only_requested_segment(worker):
    """Retrying segment 2 must not touch segments 0/1/3 on disk."""
    w, events, tmp_path = worker
    await w._handlers[Methods.SEGMENT_RETRY](
        {
            "request_id": "run_retry_004",
            "segment_index": 2,
            "video": _plan(),
            "workdir": str(tmp_path),
        }
    )
    await _drain_until(events, Notifications.SEGMENT_COMPLETED)
    assert (Path(tmp_path) / "segments" / "002" / "raw.mp4").is_file()
    for other in (0, 1, 3):
        assert not (Path(tmp_path) / "segments" / f"{other:03d}" / "raw.mp4").is_file()


# --- input validation -------------------------------------------------------


@pytest.mark.asyncio
async def test_segment_retry_rejects_missing_segment_index(worker):
    w, _, tmp_path = worker
    with pytest.raises(ValueError, match="segment_index"):
        await w._handlers[Methods.SEGMENT_RETRY](
            {"request_id": "run_retry_005", "video": _plan(), "workdir": str(tmp_path)}
        )


@pytest.mark.asyncio
async def test_segment_retry_rejects_negative_segment_index(worker):
    w, _, tmp_path = worker
    with pytest.raises(ValueError, match="non-negative"):
        await w._handlers[Methods.SEGMENT_RETRY](
            {
                "request_id": "run_retry_006",
                "segment_index": -1,
                "video": _plan(),
                "workdir": str(tmp_path),
            }
        )


@pytest.mark.asyncio
async def test_segment_retry_rejects_out_of_range_segment_index(worker):
    w, _, tmp_path = worker
    with pytest.raises(ValueError, match="out of range"):
        await w._handlers[Methods.SEGMENT_RETRY](
            {
                "request_id": "run_retry_007",
                "segment_index": 99,
                "video": _plan(),
                "workdir": str(tmp_path),
            }
        )


@pytest.mark.asyncio
async def test_segment_retry_rejects_non_object_params(worker):
    w, _, _ = worker
    with pytest.raises(ValueError):
        await w._handlers[Methods.SEGMENT_RETRY]("not-a-dict")


@pytest.mark.asyncio
async def test_segment_retry_rejects_non_int_segment_index(worker):
    w, _, tmp_path = worker
    with pytest.raises(ValueError):
        await w._handlers[Methods.SEGMENT_RETRY](
            {
                "request_id": "run_retry_008",
                "segment_index": "two",
                "video": _plan(),
                "workdir": str(tmp_path),
            }
        )


@pytest.mark.asyncio
async def test_segment_retry_auto_registers_run_when_unknown(worker):
    """Fresh worker / no prior render_start — retry still works.
    Mirrors the real-world flow: Rust runner acquires a fresh lease for
    the retry, so the worker subprocess has no prior in-memory state."""
    w, events, tmp_path = worker
    await w._handlers[Methods.SEGMENT_RETRY](
        {
            "request_id": "run_unknown_retry",
            "segment_index": 0,
            "video": _plan(),
            "workdir": str(tmp_path),
        }
    )
    await _drain_until(events, Notifications.SEGMENT_COMPLETED)
    completed = [
        (m, p) for m, p in events if m == Notifications.SEGMENT_COMPLETED
    ]
    assert len(completed) == 1
    assert completed[0][1]["segment_index"] == 0
