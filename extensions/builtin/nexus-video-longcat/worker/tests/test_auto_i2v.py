from __future__ import annotations

from pathlib import Path

import pytest

from longcat_video_worker.auto_i2v import infer_mode, infer_modes_all
from longcat_video_worker.plan_validate import PlanValidationError


def test_auto_no_image_resolves_to_t2v() -> None:
    mode, warns = infer_mode({"scenes": [{"prompt": "a"}]})
    assert mode == "t2v"
    assert warns == []


def test_auto_with_scene_image_resolves_to_i2v(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    mode, warns = infer_mode({"scenes": [{"prompt": "a", "image_path": str(img)}]})
    assert mode == "i2v"


def test_auto_with_request_image_resolves_to_i2v(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    mode, _ = infer_mode({"scenes": [{"prompt": "a"}], "image_path": str(img)})
    assert mode == "i2v"


def test_t2v_with_image_raises_mode_conflict(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    with pytest.raises(PlanValidationError) as ei:
        infer_mode({"scenes": [{"prompt": "a", "mode": "t2v", "image_path": str(img)}]})
    assert ei.value.sub_reason == "I2V_MODE_CONFLICT"


def test_i2v_without_image_raises_image_missing() -> None:
    with pytest.raises(PlanValidationError) as ei:
        infer_mode({"scenes": [{"prompt": "a", "mode": "i2v"}]})
    assert ei.value.sub_reason == "I2V_IMAGE_MISSING"


def test_image_plus_cond_video_raises_conflict(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    with pytest.raises(PlanValidationError) as ei:
        infer_mode({
            "scenes": [{"prompt": "a", "image_path": str(img)}],
            "conditioning_video_path": "/tmp/cv.mp4",
        })
    assert ei.value.sub_reason == "I2V_MODE_CONFLICT"


def test_scene_n_auto_resolves_to_vc() -> None:
    modes, _ = infer_modes_all({"scenes": [
        {"prompt": "a"},
        {"prompt": "b"},
    ]})
    assert modes == ["t2v", "vc"]


def test_scene_n_i2v_raises_not_scene_zero() -> None:
    with pytest.raises(PlanValidationError) as ei:
        infer_modes_all({"scenes": [
            {"prompt": "a"},
            {"prompt": "b", "mode": "i2v"},
        ]})
    assert ei.value.sub_reason == "I2V_NOT_SCENE_ZERO"


def test_mode_switch_channel_warning_emitted(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    modes, warns = infer_modes_all({"scenes": [
        {"prompt": "a", "image_path": str(img)},
        {"prompt": "b"},
    ]})
    assert modes == ["i2v", "vc"]
    codes = [w["code"] for w in warns]
    assert "MODE_SWITCH_CHANNEL" in codes
