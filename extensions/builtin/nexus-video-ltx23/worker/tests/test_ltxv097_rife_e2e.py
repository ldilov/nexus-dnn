from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any

import pytest

from ltx_video_worker import pipeline_ltxv097 as m
from ltx_video_worker.main import Worker
from ltx_video_worker.rpc import Methods, Notifications

pytest.importorskip("ffmpeg")
pytest.importorskip("PIL")
pytest.importorskip("numpy")

_BASE_FPS = 8
_OUT_FPS = 16
_SEG_FRAMES = 9
_W = 64
_H = 64


def _scene_color(prompt: str) -> tuple[int, int, int]:
    return (200, 30, 30) if prompt.startswith("alpha") else (30, 60, 200)


@pytest.fixture
def e2e(tmp_path, monkeypatch):
    # RIFE autostage defaults ON in prod; force OFF so this GPU-free
    # wiring test uses the deterministic ffmpeg-minterpolate fallback
    # instead of attempting a real binary download.
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_RIFE_AUTOSTAGE", "0")
    w = Worker(profile="rtx50-ltxv097-gguf")
    m.register_ltxv097_handlers(w)
    events: list[tuple[str, dict[str, Any]]] = []

    async def _capture(method: str, params: dict[str, Any]) -> None:
        events.append((method, params))

    w.emit_notification = _capture  # type: ignore[method-assign]

    def _fake_ensure(rs, cache, logger, *_a, **_k):
        rs.pipe = object()
        cache["pipe"] = rs.pipe

    monkeypatch.setattr(m, "_ensure_pipeline", _fake_ensure)

    seen_prompts: list[str] = []

    def _fake_dispatch(
        _pipe,
        _cache,
        _upscale,
        _target,
        _cond,
        effective_prompt,
        _neg,
        width,
        height,
        seg_frame_count,
        _seed,
        _samp,
        _emit_step,
        _logger,
        _mode,
    ):
        from PIL import Image  # type: ignore

        seen_prompts.append(effective_prompt)
        color = _scene_color(effective_prompt)
        return [
            Image.new("RGB", (width, height), color)
            for _ in range(seg_frame_count)
        ]

    monkeypatch.setattr(m, "_generate_segment_dispatch", _fake_dispatch)

    real_seam = m.apply_seam
    seam_calls: list[int] = []

    def _spy_seam(prev_tail, cur_frames, params, logger=None):
        seam_calls.append(
            len(prev_tail) if isinstance(prev_tail, (list, tuple)) else 0
        )
        return real_seam(prev_tail, cur_frames, params, logger)

    monkeypatch.setattr(m, "apply_seam", _spy_seam)

    return w, events, tmp_path, seen_prompts, seam_calls


def _plan() -> dict[str, Any]:
    return {
        "width": _W,
        "height": _H,
        "base_fps": _BASE_FPS,
        "requested_duration_seconds": 3,
        "segments": [
            {"index": 0, "frame_count": _SEG_FRAMES, "seed": 1,
             "action_prompt": "alpha tide rolling"},
            {"index": 1, "frame_count": _SEG_FRAMES, "seed": 2,
             "action_prompt": "alpha tide rolling"},
            {"index": 2, "frame_count": _SEG_FRAMES, "seed": 3,
             "action_prompt": "beta dunes drifting"},
        ],
    }


async def _drain(events, timeout_s: float = 20.0) -> None:
    waited = 0.0
    while waited < timeout_s:
        if any(m_ == Notifications.DONE for m_, _ in events):
            return
        errs = [p for me, p in events if me == Notifications.ERROR]
        if errs:
            raise AssertionError(f"render emitted ERROR: {errs[-1]}")
        await asyncio.sleep(0.1)
        waited += 0.1
    raise AssertionError(
        f"render did not finish in {timeout_s}s; methods="
        f"{[me for me, _ in events]}"
    )


@pytest.mark.asyncio
async def test_three_segment_two_scene_render_interpolates_and_seams(e2e):
    w, events, tmp_path, seen_prompts, seam_calls = e2e

    res = await w._handlers[Methods.RENDER_START](
        {
            "request_id": "run_rife_e2e",
            "video": _plan(),
            "workdir": str(tmp_path / "wd"),
            "prompt": {"action": "", "negative": "", "style": "",
                       "character": ""},
            "advanced": {"output_fps": _OUT_FPS},
        }
    )
    assert res["status"] == "started"
    await _drain(events)

    methods = [me for me, _ in events]
    assert methods.count(Notifications.SEGMENT_STARTED) == 3
    assert methods.count(Notifications.DONE) == 1

    final = [
        p for me, p in events
        if me == Notifications.ARTIFACT_CREATED
        and p.get("kind") == "final_video"
    ]
    assert len(final) == 1
    final_path = Path(final[0]["path"])
    assert final_path.is_file() and final_path.stat().st_size > 0

    progress_msgs = [
        p.get("message", "")
        for me, p in events
        if me == Notifications.PROGRESS
    ]
    assert any(
        f"FPS interpolation: {_BASE_FPS} → {_OUT_FPS} fps" in s
        for s in progress_msgs
    ), progress_msgs

    import ffmpeg  # type: ignore

    probe = ffmpeg.probe(str(final_path))
    vid = next(
        s for s in probe["streams"] if s["codec_type"] == "video"
    )
    num, den = (vid.get("r_frame_rate") or "0/1").split("/")
    fps = float(num) / float(den or "1")
    assert abs(fps - _OUT_FPS) < 1.5, f"expected ~{_OUT_FPS}fps, got {fps}"

    distinct = set(seen_prompts)
    assert len(distinct) >= 2, f"expected >=2 scenes, got {distinct}"

    assert len(seam_calls) == 3
    assert seam_calls[0] == 0
    assert seam_calls[1] > 0 and seam_calls[2] > 0
