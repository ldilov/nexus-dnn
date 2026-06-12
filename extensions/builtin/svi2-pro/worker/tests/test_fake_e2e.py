import json
import shutil
from pathlib import Path

import pytest

from svi2_video_worker.main import Worker
from svi2_video_worker.pipeline_fake import register_fake_handlers
from svi2_video_worker.rpc import Notifications

pytestmark = pytest.mark.skipif(
    shutil.which("ffmpeg") is None, reason="ffmpeg not installed"
)


def _drive_render(tmp_path: Path, params: dict):
    import asyncio

    worker = Worker(profile="fake")
    notes: list[tuple[str, dict]] = []

    async def _capture(method: str, payload: dict):
        notes.append((method, payload))

    worker.emit_notification = _capture  # type: ignore
    register_fake_handlers(worker)
    handler = worker._handlers["svi2.video.render.start"]
    result = asyncio.new_event_loop().run_until_complete(handler(params))
    return result, notes


def _base_params(tmp_path: Path, **overrides) -> dict:
    out = tmp_path / "render" / "out.mp4"
    params = {
        "ref_image_path": "x.png",
        "prompts": ["a coherent motion prompt"],
        "num_clips": 3,
        "frames_per_clip": 69,
        "num_overlap_frame": 5,
        "num_inference_steps": 4,
        "width": 832,
        "height": 480,
        "fps": 16,
        "interpolate_fps": 48,
        "stitch_mode": "trim",
        "pixel_re_encode": False,
        "output_path": str(out),
    }
    params.update(overrides)
    return params


def test_fake_render_produces_artifact_and_report(tmp_path: Path):
    params = _base_params(tmp_path)
    result, _ = _drive_render(tmp_path, params)

    out = Path(result["output_path"])
    assert out.exists() and out.stat().st_size > 0

    report_path = out.parent / "render_report.json"
    assert report_path.exists()
    report = json.loads(report_path.read_text())

    for key in (
        "profile", "output_path", "sha256", "frames", "frames_per_clip",
        "num_clips", "width", "height", "fps", "final_fps", "duration_seconds",
        "peak_vram_bytes", "resolution_warning", "stitch_mode", "pixel_re_encode",
    ):
        assert key in report, key

    assert report["profile"] == "fake"
    assert report["num_clips"] == 3
    assert report["final_fps"] == 48
    assert report["sha256"] == result["sha256"]
    # stitched frame count = fpc + (clips-1) * (fpc - overlap)
    assert report["frames"] == 69 + 2 * (69 - 5)
    assert result["render_report"]["sha256"] == report["sha256"]


def test_fake_render_emits_complete_ordered_notification_sequence(tmp_path: Path):
    params = _base_params(tmp_path)
    _, notes = _drive_render(tmp_path, params)
    methods = [m for m, _ in notes]

    assert methods[0] == Notifications.PROGRESS
    assert methods[-1] == Notifications.DONE
    assert Notifications.ARTIFACT_CREATED in methods

    # one started/completed per clip, ordered
    started = [p["clip_index"] for m, p in notes if m == Notifications.CLIP_STARTED]
    completed = [p["clip_index"] for m, p in notes if m == Notifications.CLIP_COMPLETED]
    assert started == [0, 1, 2]
    assert completed == [0, 1, 2]

    # memory stats fire per clip
    mem = [p["clip_index"] for m, p in notes if m == Notifications.MEMORY_STATS]
    assert mem == [0, 1, 2]

    # clip.started precedes its clip.completed
    for clip in (0, 1, 2):
        s_idx = next(i for i, (m, p) in enumerate(notes)
                     if m == Notifications.CLIP_STARTED and p["clip_index"] == clip)
        c_idx = next(i for i, (m, p) in enumerate(notes)
                     if m == Notifications.CLIP_COMPLETED and p["clip_index"] == clip)
        assert s_idx < c_idx


def test_fake_render_progress_is_monotonic_and_per_clip_steps_fire(tmp_path: Path):
    params = _base_params(tmp_path, num_inference_steps=4)
    _, notes = _drive_render(tmp_path, params)

    progresses = [p["progress"] for m, p in notes
                  if m == Notifications.PROGRESS and "progress" in p]
    assert progresses == sorted(progresses)
    assert progresses[-1] == pytest.approx(1.0)

    steps = [(p["clip_index"], p["step"]) for m, p in notes if m == Notifications.CLIP_STEP]
    # 3 clips * 4 steps
    assert len(steps) == 12
    assert steps[:4] == [(0, 0), (0, 1), (0, 2), (0, 3)]


def test_fake_render_off_budget_resolution_warning_in_notifications_and_report(tmp_path: Path):
    params = _base_params(tmp_path, width=640, height=368, interpolate_fps=0)
    result, notes = _drive_render(tmp_path, params)

    start = next(p for m, p in notes if m == Notifications.PROGRESS and p.get("phase") == "start")
    assert start["resolution_warning"] is not None
    assert start["resolution_warning"]["code"] == "RESOLUTION_OFF_BUDGET"
    assert result["render_report"]["resolution_warning"]["sub_budget"] is True


def test_fake_render_rejects_flf2v_without_last_image(tmp_path: Path):
    params = _base_params(tmp_path, requires_last_image=True, num_clips=1, frames_per_clip=65)
    with pytest.raises(ValueError, match="last_image_path is required"):
        _drive_render(tmp_path, params)


def test_fake_render_cancels_cooperatively_and_writes_no_artifact(tmp_path: Path):
    import asyncio
    import threading

    from svi2_video_worker.pipeline_fake import render_fake_e2e
    from svi2_video_worker.pipeline_svi2 import RenderCancelled

    params = _base_params(tmp_path)
    notes: list[tuple[str, dict]] = []

    async def _emit(method: str, payload: dict) -> None:
        notes.append((method, payload))

    cancel_event = threading.Event()
    cancel_event.set()  # signal cancel before the first diffusion step

    with pytest.raises(RenderCancelled):
        asyncio.new_event_loop().run_until_complete(
            render_fake_e2e(params, _emit, cancel_event=cancel_event)
        )

    assert not Path(params["output_path"]).exists()
    assert Notifications.DONE not in [m for m, _ in notes]


def test_fake_render_accepts_same_params_as_real_validator(tmp_path: Path):
    from svi2_video_worker.pipeline_svi2 import validate_render_params

    params = _base_params(tmp_path)
    # the real validator accepts the exact same params dict
    validate_render_params(params)
    result, _ = _drive_render(tmp_path, params)
    assert result["status"] == "ok"
