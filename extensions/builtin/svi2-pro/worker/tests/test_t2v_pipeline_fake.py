import asyncio
import shutil
from pathlib import Path

import pytest

from svi2_video_worker.pipeline_fake import render_fake_e2e

pytestmark = pytest.mark.skipif(
    shutil.which("ffmpeg") is None, reason="ffmpeg not installed"
)


def _run(params: dict) -> dict:
    notes: list[tuple[str, dict]] = []

    async def _emit(method: str, payload: dict) -> None:
        notes.append((method, payload))

    return asyncio.run(render_fake_e2e(params, _emit))


def _base(tmp_path: Path, **overrides) -> dict:
    out = tmp_path / "render" / "out.mp4"
    params = {
        "prompts": ["a coherent motion prompt"],
        "num_clips": 3,
        "frames_per_clip": 65,
        "num_overlap_frame": 5,
        "num_inference_steps": 2,
        "width": 832,
        "height": 480,
        "fps": 16,
        "output_path": str(out),
    }
    params.update(overrides)
    return params


def test_t2v_no_image_matches_i2v_frame_count(tmp_path: Path):
    i2v = _run(_base(tmp_path / "i2v", ref_image_path="x.png"))
    t2v = _run(_base(tmp_path / "t2v", mode="text_to_video"))
    assert t2v["status"] == "ok"
    assert t2v["frames"] == i2v["frames"]


def test_t2v_no_image_invokes_seed_pre_step(tmp_path: Path, monkeypatch):
    import svi2_video_worker.pipeline_fake as pf

    calls: list[str] = []

    def _spy(*args, **kwargs):
        calls.append("synth")
        return Path("seed.png")

    monkeypatch.setattr(pf, "synthesize_seed_frame", _spy)
    _run(_base(tmp_path, mode="text_to_video", seed=7))
    assert calls == ["synth"]


def test_t2v_with_ref_image_skips_seed_synthesis(tmp_path: Path, monkeypatch):
    import svi2_video_worker.pipeline_fake as pf

    calls: list[str] = []
    monkeypatch.setattr(pf, "synthesize_seed_frame", lambda *a, **k: calls.append("synth"))
    _run(_base(tmp_path, mode="text_to_video", ref_image_path="x.png"))
    assert calls == []


def test_i2v_does_not_invoke_seed_synthesis(tmp_path: Path, monkeypatch):
    import svi2_video_worker.pipeline_fake as pf

    calls: list[str] = []
    monkeypatch.setattr(pf, "synthesize_seed_frame", lambda *a, **k: calls.append("synth"))
    _run(_base(tmp_path, ref_image_path="x.png"))
    assert calls == []


def test_t2v_records_seed_origin_synthesized_in_report(tmp_path: Path, monkeypatch):
    import svi2_video_worker.pipeline_fake as pf

    monkeypatch.setattr(pf, "synthesize_seed_frame", lambda *a, **k: Path("seed.png"))
    result = _run(_base(tmp_path, mode="text_to_video", seed=11))
    report = result["render_report"]
    assert report["seed_origin"] == "synthesized"
    assert report["seed_value"] == 11


def test_t2v_with_operator_ref_records_origin_operator(tmp_path: Path, monkeypatch):
    import svi2_video_worker.pipeline_fake as pf

    monkeypatch.setattr(pf, "synthesize_seed_frame", lambda *a, **k: Path("seed.png"))
    result = _run(_base(tmp_path, mode="text_to_video", ref_image_path="x.png"))
    assert result["render_report"]["seed_origin"] == "operator"


def test_t2v_honors_last_image_flf2v(tmp_path: Path, monkeypatch):
    import svi2_video_worker.pipeline_fake as pf

    monkeypatch.setattr(pf, "synthesize_seed_frame", lambda *a, **k: Path("seed.png"))
    params = _base(
        tmp_path,
        mode="text_to_video",
        num_clips=1,
        frames_per_clip=65,
        last_image_path="end.png",
    )
    result = _run(params)
    assert result["status"] == "ok"
    assert result["render_report"]["last_image_path"] == "end.png"
