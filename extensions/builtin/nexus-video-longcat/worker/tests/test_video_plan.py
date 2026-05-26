from __future__ import annotations

import json

import pytest

jsonschema = pytest.importorskip("jsonschema")

from longcat_video_worker.video_plan import (
    AdaINOverride,
    AdaINStylePacket,
    ContinuityPacket,
    InterpolationPlan,
    PlanSource,
    PlanWarningEntry,
    ScenePromptPacket,
    SCHEMA_VERSION,
    StylePacket,
    VideoPlan,
    load_adain_schema,
    load_plan_schema,
    load_scene_schema,
)


def _scene(prompt: str, overlap: int = 0, mode: str = "t2v") -> ScenePromptPacket:
    return ScenePromptPacket(
        prompt=prompt,
        per_scene_generated_seconds=3.0,
        overlap_frames=overlap,
        motion_intensity="dynamic",
        adain_factor=0.2,
        mode=mode,
    )


def _three_scene_plan() -> VideoPlan:
    return VideoPlan(
        classification="storyboard_scenes",
        anchor="Alice cinematic",
        scenes=(
            _scene("Alice cinematic. she walks"),
            _scene("Alice cinematic. she runs", overlap=13, mode="vc"),
            _scene("Alice cinematic. she escapes", overlap=13, mode="vc"),
        ),
    )


def test_scene_roundtrip():
    s = _scene("hello world")
    assert ScenePromptPacket.from_dict(s.to_dict()) == s


def test_scene_with_negative_prompt_roundtrips():
    s = ScenePromptPacket(
        prompt="hi",
        per_scene_generated_seconds=2.5,
        overlap_frames=0,
        motion_intensity="static",
        adain_factor=0.1,
        mode="t2v",
        negative_prompt="lowres",
    )
    assert ScenePromptPacket.from_dict(s.to_dict()) == s


def test_video_plan_minimal_roundtrip():
    plan = _three_scene_plan()
    payload = plan.to_dict()
    assert payload["schema_version"] == SCHEMA_VERSION
    assert VideoPlan.from_dict(payload) == plan


def test_video_plan_full_roundtrip():
    plan = VideoPlan(
        classification="storyboard_scenes",
        anchor="Bob",
        scenes=(_scene("Bob. walks"), _scene("Bob. runs", overlap=13, mode="vc")),
        continuity=ContinuityPacket(
            identity_anchors=("Bob",),
            clothing_anchors=("red jacket",),
            persistent_objects=("brass key",),
            locked_rules=("no time skips",),
        ),
        style=StylePacket(
            lighting="warm tungsten",
            lens="50mm",
            palette="amber",
            register="neo-noir",
        ),
        adain=AdaINStylePacket(
            reference_scene_index=0,
            default_factor=0.2,
            per_scene_overrides=(AdaINOverride(scene_index=1, factor=0.4),),
        ),
        interpolation=InterpolationPlan(enabled=True, target_fps=48, method="rife"),
        warnings=(PlanWarningEntry(code="ANCHOR_SANITIZED", detail="trimmed"),),
        source=PlanSource(compiler="deterministic", llm_model="qwen3-8b-q4_k_m"),
    )
    assert VideoPlan.from_dict(plan.to_dict()) == plan


def test_video_plan_rejects_future_schema_version():
    payload = _three_scene_plan().to_dict()
    payload["schema_version"] = 99
    with pytest.raises(ValueError, match="schema_version=99"):
        VideoPlan.from_dict(payload)


def test_video_plan_rejects_missing_schema_version():
    payload = _three_scene_plan().to_dict()
    del payload["schema_version"]
    with pytest.raises(ValueError, match="schema_version=0"):
        VideoPlan.from_dict(payload)


def test_scene_packet_validates_against_schema():
    schema = load_scene_schema()
    s = _scene("hello world")
    jsonschema.Draft202012Validator.check_schema(schema)
    jsonschema.Draft202012Validator(schema).validate(s.to_dict())


def test_video_plan_validates_against_schema():
    from referencing import Registry, Resource
    from referencing.jsonschema import DRAFT202012

    plan = _three_scene_plan()
    scene_resource = Resource(contents=load_scene_schema(), specification=DRAFT202012)
    adain_resource = Resource(contents=load_adain_schema(), specification=DRAFT202012)
    registry = Registry().with_resources(
        [
            ("scene_prompt_packet.schema.json", scene_resource),
            ("adain_style_packet.schema.json", adain_resource),
        ]
    )
    validator = jsonschema.Draft202012Validator(load_plan_schema(), registry=registry)
    validator.validate(plan.to_dict())


def test_adain_schema_valid():
    schema = load_adain_schema()
    jsonschema.Draft202012Validator.check_schema(schema)
    packet = AdaINStylePacket(
        reference_scene_index=0,
        default_factor=0.2,
        per_scene_overrides=(AdaINOverride(scene_index=2, factor=0.5),),
    )
    jsonschema.Draft202012Validator(schema).validate(packet.to_dict())


def test_continuity_and_style_packets_skip_when_empty():
    plan = _three_scene_plan()
    payload = plan.to_dict()
    assert "continuity" not in payload
    assert "style" not in payload
    assert "adain" not in payload
    assert "interpolation" not in payload
    assert "source" not in payload
    assert "warnings" not in payload
