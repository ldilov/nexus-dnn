from __future__ import annotations

from typing import Any

import pytest

from longcat_video_worker.pipeline_fake import register_fake_handlers
from longcat_video_worker.pipeline_longcat import register_longcat_handlers
from longcat_video_worker.rpc import Methods


class FakeWorker:
    def __init__(self) -> None:
        self.handlers: dict[str, Any] = {}

    def register(self, method: str, handler: Any) -> None:
        self.handlers[method] = handler


@pytest.fixture
def fake_profile_worker() -> FakeWorker:
    worker = FakeWorker()
    register_fake_handlers(worker)
    return worker


@pytest.fixture
def real_profile_worker() -> FakeWorker:
    worker = FakeWorker()
    register_longcat_handlers(worker, use_distill=False)
    return worker


def test_method_constant_present():
    assert Methods.PLAN_EXPAND == "longcat.video.plan.expand"


def test_plan_expand_registered_on_fake_profile(fake_profile_worker):
    assert Methods.PLAN_EXPAND in fake_profile_worker.handlers


def test_plan_expand_registered_on_real_profile(real_profile_worker):
    assert Methods.PLAN_EXPAND in real_profile_worker.handlers


async def test_plan_expand_use_llm_false_returns_deterministic(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler(
        {
            "prompt": "Alice runs then chases then arrives",
            "duration_seconds": 9.0,
            "scene_count": 3,
            "style_hint": "noir",
            "use_llm": False,
        }
    )
    assert result["compiler"] == "deterministic"
    assert len(result["scenes"]) == 3
    assert "anchor" in result


async def test_plan_expand_use_llm_true_no_lease_falls_back(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler(
        {
            "prompt": "Alice runs then chases",
            "duration_seconds": 6.0,
            "scene_count": 2,
            "use_llm": True,
        }
    )
    assert result["compiler"] == "deterministic"


async def test_plan_expand_invalid_duration_returns_plan_invalid(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler(
        {
            "prompt": "Alice runs",
            "duration_seconds": 0.1,
            "scene_count": 3,
        }
    )
    assert result.get("status") == "error"
    assert result["sub_reason"] == "DURATION_BELOW_SCENE_FLOOR"


async def test_plan_expand_empty_prompt_returns_plan_invalid(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler({"prompt": "", "duration_seconds": 4.0, "scene_count": 1})
    assert result.get("status") == "error"
    assert result["sub_reason"] == "PROMPT_EMPTY"


async def test_plan_expand_scene_count_too_high(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler(
        {"prompt": "Alice runs", "duration_seconds": 5.0, "scene_count": 100}
    )
    assert result.get("status") == "error"
    assert result["sub_reason"] == "SCENE_COUNT_TOO_HIGH"


async def test_plan_expand_response_shape(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler(
        {"prompt": "Alice runs", "duration_seconds": 4.0, "scene_count": 1}
    )
    for key in ("scenes", "compiler", "warnings", "anchor"):
        assert key in result
    for scene in result["scenes"]:
        for key in ("prompt", "per_scene_generated_seconds", "overlap_frames", "motion_intensity", "adain_factor", "mode"):
            assert key in scene


async def test_plan_expand_seed_default_42(real_profile_worker):
    handler = real_profile_worker.handlers[Methods.PLAN_EXPAND]
    a = await handler(
        {"prompt": "Alice walks then runs", "duration_seconds": 6.0, "scene_count": 2}
    )
    b = await handler(
        {"prompt": "Alice walks then runs", "duration_seconds": 6.0, "scene_count": 2}
    )
    assert a["scenes"] == b["scenes"]


async def test_plan_expand_fake_profile_same_contract(fake_profile_worker):
    handler = fake_profile_worker.handlers[Methods.PLAN_EXPAND]
    result = await handler(
        {"prompt": "Alice runs", "duration_seconds": 4.0, "scene_count": 1}
    )
    assert result["compiler"] == "deterministic"
    assert len(result["scenes"]) == 1
