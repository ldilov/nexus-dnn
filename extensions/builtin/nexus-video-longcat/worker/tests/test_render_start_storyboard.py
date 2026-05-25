from __future__ import annotations

from pathlib import Path
from typing import Any
from unittest.mock import patch

import pytest

from longcat_video_worker import pipeline_longcat
from longcat_video_worker.pipeline_longcat import (
    LongCatRenderRequest,
    Scene,
    _parse_scene,
    register_longcat_handlers,
)


class FakeWorker:
    def __init__(self) -> None:
        self.handlers: dict[str, Any] = {}

    def register(self, method: str, handler: Any) -> None:
        self.handlers[method] = handler


@pytest.fixture
def fake_worker() -> FakeWorker:
    worker = FakeWorker()
    register_longcat_handlers(worker, use_distill=False)
    return worker


async def test_register_exposes_plan_validate_and_render_start(fake_worker: FakeWorker) -> None:
    assert "longcat.video.render.start" in fake_worker.handlers
    assert "longcat.video.plan.validate" in fake_worker.handlers


async def test_plan_validate_handler_happy_path(fake_worker: FakeWorker) -> None:
    handler = fake_worker.handlers["longcat.video.plan.validate"]
    payload = {
        "scenes": [
            {"prompt": "a misty courtyard", "per_scene_generated_seconds": 4.0},
            {"prompt": "she turns toward the gate", "per_scene_generated_seconds": 4.0, "overlap_frames": 13},
        ]
    }
    result = await handler(payload)
    assert result["ok"] is True
    assert result["normalized"]["fps"] == 24
    assert len(result["normalized"]["scenes"]) == 2


async def test_plan_validate_handler_rejects_empty_scenes(fake_worker: FakeWorker) -> None:
    handler = fake_worker.handlers["longcat.video.plan.validate"]
    result = await handler({"scenes": []})
    assert result["ok"] is False
    assert result["error"]["sub_reason"] == "EMPTY_SCENES"


async def test_render_start_returns_plan_invalid_on_bad_scenes(fake_worker: FakeWorker) -> None:
    handler = fake_worker.handlers["longcat.video.render.start"]
    result = await handler(
            {
                "scenes": [{"prompt": "", "per_scene_generated_seconds": 4.0}],
                "prompt": "fallback",
            }
        )
    assert result["status"] == "error"
    assert result["code"] == -32108
    assert result["phase"] == "plan_validate"
    assert result["data"]["sub_reason"] == "PROMPT_EMPTY"


async def test_render_start_threads_new_params(fake_worker: FakeWorker, tmp_path: Path) -> None:
    handler = fake_worker.handlers["longcat.video.render.start"]
    captured: dict[str, Any] = {}

    def fake_render(request: LongCatRenderRequest, **kwargs: Any) -> Path:
        captured["request"] = request
        captured["kwargs"] = kwargs
        out = tmp_path / "out.mp4"
        out.write_bytes(b"")
        return out

    with patch.object(pipeline_longcat, "render", fake_render):
        result = await handler(
                {
                    "prompt": "single prompt path",
                    "image_cond_noise_scale": 0.20,
                    "force_refine_with_upscale": True,
                    "apply_refinement": True,
                    "refinement_steps": 5,
                    "refinement_guidance": 3.0,
                    "continuation_overlap_frames": 17,
                    "strict_scene_errors": True,
                    "target_frames": 145,
                }
            )

    assert result["status"] == "ok"
    req = captured["request"]
    assert req.image_cond_noise_scale == pytest.approx(0.20)
    assert req.force_refine_with_upscale is True
    assert req.apply_refinement is True
    assert req.refinement_steps == 5
    assert req.refinement_guidance == pytest.approx(3.0)
    assert req.continuation_overlap_frames == 17
    assert req.target_frames == 145
    assert captured["kwargs"]["strict_scene_errors"] is True
    assert isinstance(captured["kwargs"]["failures_out"], list)


async def test_render_start_parses_scenes_into_dataclass(fake_worker: FakeWorker, tmp_path: Path) -> None:
    handler = fake_worker.handlers["longcat.video.render.start"]
    captured: dict[str, Any] = {}

    def fake_render(request: LongCatRenderRequest, **kwargs: Any) -> Path:
        captured["request"] = request
        out = tmp_path / "out.mp4"
        out.write_bytes(b"")
        return out

    with patch.object(pipeline_longcat, "render", fake_render):
        result = await handler(
                {
                    "scenes": [
                        {
                            "prompt": "scene one establish",
                            "per_scene_generated_seconds": 4.0,
                            "use_distill": True,
                            "guidance_scale": 1.0,
                            "num_inference_steps": 8,
                            "adain_factor": 0.2,
                        },
                        {
                            "prompt": "scene two action",
                            "per_scene_generated_seconds": 4.0,
                            "overlap_frames": 13,
                            "use_distill": False,
                            "guidance_scale": 3.5,
                            "num_inference_steps": 30,
                            "image_cond_noise_scale": 0.10,
                            "seed_offset": 17,
                        },
                    ]
                }
            )

    assert result["status"] == "ok"
    req = captured["request"]
    assert req.scenes is not None
    assert len(req.scenes) == 2
    assert req.scenes[0].use_distill is True
    assert req.scenes[1].use_distill is False
    assert req.scenes[1].guidance_scale == pytest.approx(3.5)
    assert req.scenes[1].image_cond_noise_scale == pytest.approx(0.10)
    assert req.scenes[1].seed_offset == 17


async def test_render_start_surfaces_scene_failures_as_partial(
    fake_worker: FakeWorker, tmp_path: Path
) -> None:
    handler = fake_worker.handlers["longcat.video.render.start"]

    def fake_render(
        request: LongCatRenderRequest, *, failures_out: list, **kwargs: Any
    ) -> Path:
        failures_out.append(
            {"scene_index": 1, "code": "SCENE_OOM", "detail": "cuda oom"}
        )
        out = tmp_path / "partial.mp4"
        out.write_bytes(b"")
        return out

    with patch.object(pipeline_longcat, "render", fake_render):
        result = await handler(
                {
                    "scenes": [
                        {"prompt": "scene one", "per_scene_generated_seconds": 4.0},
                        {"prompt": "scene two", "per_scene_generated_seconds": 4.0},
                    ]
                }
            )

    assert result["status"] == "ok"
    assert result["partial"] is True
    assert result["scenes_rendered"] == 1
    assert result["scenes_failed"][0]["code"] == "SCENE_OOM"


async def test_render_start_legacy_single_prompt_unchanged(
    fake_worker: FakeWorker, tmp_path: Path
) -> None:
    handler = fake_worker.handlers["longcat.video.render.start"]
    captured: dict[str, Any] = {}

    def fake_render(request: LongCatRenderRequest, **kwargs: Any) -> Path:
        captured["request"] = request
        out = tmp_path / "legacy.mp4"
        out.write_bytes(b"")
        return out

    with patch.object(pipeline_longcat, "render", fake_render):
        result = await handler({"prompt": "single shot, no scenes"})
    assert result["status"] == "ok"
    assert "partial" not in result
    assert captured["request"].scenes is None


async def test_parse_scene_duration_alias() -> None:
    scene = _parse_scene({"prompt": "x", "duration_seconds": 3.5})
    assert isinstance(scene, Scene)
    assert scene.per_scene_generated_seconds == pytest.approx(3.5)
    assert scene.duration_seconds == pytest.approx(3.5)


async def test_parse_scene_per_scene_field_wins_over_alias() -> None:
    scene = _parse_scene(
        {"prompt": "x", "duration_seconds": 9.9, "per_scene_generated_seconds": 4.0}
    )
    assert scene.per_scene_generated_seconds == pytest.approx(4.0)
