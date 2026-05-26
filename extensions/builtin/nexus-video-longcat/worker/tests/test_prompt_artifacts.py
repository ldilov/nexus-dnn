from __future__ import annotations

import json

import pytest

from longcat_video_worker.prompt_artifacts import (
    ArtifactBundle,
    ArtifactWriteError,
    video_plan_from_planner_payload,
    write_plan_artifacts,
)
from longcat_video_worker.video_plan import (
    AdaINOverride,
    AdaINStylePacket,
    ContinuityPacket,
    InterpolationPlan,
    PlanSource,
    PlanWarningEntry,
    ScenePromptPacket,
    StylePacket,
    VideoPlan,
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


def _plan() -> VideoPlan:
    return VideoPlan(
        classification="storyboard_scenes",
        anchor="Carol",
        scenes=(
            _scene("Carol. enters"),
            _scene("Carol. fights", overlap=13, mode="vc"),
            _scene("Carol. escapes", overlap=13, mode="vc"),
        ),
    )


def test_write_creates_plan_and_scene_files(tmp_path):
    bundle = write_plan_artifacts(
        plan=_plan(),
        output_dir=tmp_path,
        run_id="run-abc-123",
    )
    assert isinstance(bundle, ArtifactBundle)
    assert bundle.plan_path.exists()
    assert bundle.plan_path.name == "plan.normalized.json"
    body = json.loads(bundle.plan_path.read_text(encoding="utf-8"))
    assert body["schema_version"] == 1
    assert body["anchor"] == "Carol"
    assert len(body["scenes"]) == 3
    assert len(bundle.scene_paths) == 3
    assert bundle.scene_paths[0].name == "scene_001.prompt.txt"
    assert bundle.scene_paths[1].name == "scene_002.prompt.txt"
    assert bundle.scene_paths[2].name == "scene_003.prompt.txt"
    assert bundle.scene_paths[0].read_text(encoding="utf-8").strip() == "Carol. enters"


def test_write_skips_adain_and_interp_when_absent(tmp_path):
    bundle = write_plan_artifacts(
        plan=_plan(),
        output_dir=tmp_path,
        run_id="run-1",
    )
    assert bundle.adain_path is None
    assert bundle.interpolation_path is None
    assert bundle.raw_prompt_path is None
    postprocess = tmp_path / "run-1" / "postprocess_1"
    assert not postprocess.exists()


def test_write_emits_adain_and_interp_when_present(tmp_path):
    plan = VideoPlan(
        classification="storyboard_scenes",
        anchor="Dave",
        scenes=(_scene("Dave. walks"), _scene("Dave. runs", overlap=13, mode="vc")),
        adain=AdaINStylePacket(
            reference_scene_index=0,
            default_factor=0.2,
            per_scene_overrides=(AdaINOverride(scene_index=1, factor=0.4),),
        ),
        interpolation=InterpolationPlan(enabled=True, target_fps=48, method="rife"),
    )
    bundle = write_plan_artifacts(plan=plan, output_dir=tmp_path, run_id="r2")
    assert bundle.adain_path is not None
    assert bundle.adain_path.exists()
    assert bundle.adain_path.name == "adain_style_packet.json"
    adain_body = json.loads(bundle.adain_path.read_text(encoding="utf-8"))
    assert adain_body["reference_scene_index"] == 0
    assert adain_body["per_scene_overrides"][0] == {"scene_index": 1, "factor": 0.4}

    assert bundle.interpolation_path is not None
    interp_body = json.loads(bundle.interpolation_path.read_text(encoding="utf-8"))
    assert interp_body["enabled"] is True
    assert interp_body["target_fps"] == 48


def test_write_records_raw_prompt_when_supplied(tmp_path):
    bundle = write_plan_artifacts(
        plan=_plan(),
        output_dir=tmp_path,
        run_id="r3",
        raw_prompt="the original creative prompt",
    )
    assert bundle.raw_prompt_path is not None
    assert bundle.raw_prompt_path.read_text(encoding="utf-8") == "the original creative prompt\n"


def test_write_rejects_unsafe_run_id(tmp_path):
    for unsafe in ("../escape", "", "a/b", "..", ".hidden", "a..b", "/abs"):
        with pytest.raises(ArtifactWriteError):
            write_plan_artifacts(plan=_plan(), output_dir=tmp_path, run_id=unsafe)


def test_write_is_atomic_no_tmp_leftover(tmp_path):
    bundle = write_plan_artifacts(plan=_plan(), output_dir=tmp_path, run_id="atom")
    planner_dir = bundle.plan_path.parent
    leftovers = list(planner_dir.glob("*.tmp"))
    assert leftovers == []


def test_planner_payload_adapter_roundtrip(tmp_path):
    legacy_payload = {
        "scenes": [
            {
                "prompt": "Alice. walks",
                "per_scene_generated_seconds": 3.0,
                "overlap_frames": 0,
                "motion_intensity": "dynamic",
                "adain_factor": 0.2,
                "mode": "t2v",
            },
            {
                "prompt": "Alice. runs",
                "per_scene_generated_seconds": 3.2,
                "overlap_frames": 13,
                "motion_intensity": "intense",
                "adain_factor": 0.2,
                "mode": "vc",
            },
        ]
    }
    plan = video_plan_from_planner_payload(
        payload=legacy_payload,
        classification="storyboard_scenes",
        anchor="Alice",
        warnings=[{"code": "ANCHOR_SANITIZED", "detail": "ok", "scene_index": None}],
        source={"compiler": "deterministic"},
    )
    bundle = write_plan_artifacts(plan=plan, output_dir=tmp_path, run_id="adapter")
    assert len(bundle.scene_paths) == 2
    body = json.loads(bundle.plan_path.read_text(encoding="utf-8"))
    assert body["warnings"][0]["code"] == "ANCHOR_SANITIZED"
    assert body["source"]["compiler"] == "deterministic"
