from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional

from .video_plan import (
    ContinuityPacket,
    InterpolationPlan,
    PlanSource,
    PlanWarningEntry,
    ScenePromptPacket,
    StylePacket,
    VideoPlan,
)

_RUN_ID_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_\-:]{0,63}$")


class ArtifactWriteError(Exception):
    pass


@dataclass(frozen=True)
class ArtifactBundle:
    output_dir: Path
    run_id: str
    plan_path: Path
    scene_paths: tuple[Path, ...]
    adain_path: Optional[Path]
    interpolation_path: Optional[Path]
    raw_prompt_path: Optional[Path]

    def to_dict(self) -> dict[str, Any]:
        return {
            "output_dir": str(self.output_dir),
            "run_id": self.run_id,
            "plan_path": str(self.plan_path),
            "scene_paths": [str(p) for p in self.scene_paths],
            "adain_path": str(self.adain_path) if self.adain_path else None,
            "interpolation_path": (
                str(self.interpolation_path) if self.interpolation_path else None
            ),
            "raw_prompt_path": (
                str(self.raw_prompt_path) if self.raw_prompt_path else None
            ),
        }


def _validate_run_id(run_id: str) -> None:
    # `.` deliberately omitted from the charset so a future regex refactor
    # cannot silently re-admit `..` traversal. If dot-bearing IDs are ever
    # required, add a negative lookahead `(?!.*\.\.)` rather than relying
    # on a separate string check.
    if not _RUN_ID_PATTERN.fullmatch(run_id):
        raise ArtifactWriteError(
            "run_id must start alphanumeric and match [A-Za-z0-9][A-Za-z0-9_\\-:]{0,63}"
        )


def _atomic_write(path: Path, payload: bytes) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("wb") as fh:
        fh.write(payload)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, path)


def _write_json(path: Path, data: dict[str, Any]) -> None:
    body = json.dumps(data, indent=2, sort_keys=False, ensure_ascii=False)
    _atomic_write(path, body.encode("utf-8") + b"\n")


def _write_text(path: Path, text: str) -> None:
    _atomic_write(path, text.encode("utf-8"))


def write_plan_artifacts(
    plan: VideoPlan,
    output_dir: Path,
    run_id: str,
    raw_prompt: Optional[str] = None,
) -> ArtifactBundle:
    _validate_run_id(run_id)
    output_dir = Path(output_dir)
    run_dir = output_dir / run_id / "planner_1"
    run_dir.mkdir(parents=True, exist_ok=True)

    plan_path = run_dir / "plan.normalized.json"
    _write_json(plan_path, plan.to_dict())

    scene_paths: list[Path] = []
    for idx, scene in enumerate(plan.scenes, start=1):
        scene_path = run_dir / f"scene_{idx:03d}.prompt.txt"
        _write_text(scene_path, scene.prompt + "\n")
        scene_paths.append(scene_path)

    postprocess_dir = output_dir / run_id / "postprocess_1"
    adain_path: Optional[Path] = None
    interpolation_path: Optional[Path] = None
    if plan.adain is not None:
        postprocess_dir.mkdir(parents=True, exist_ok=True)
        adain_path = postprocess_dir / "adain_style_packet.json"
        _write_json(adain_path, plan.adain.to_dict())
    if plan.interpolation.enabled or plan.interpolation.method != "none":
        postprocess_dir.mkdir(parents=True, exist_ok=True)
        interpolation_path = postprocess_dir / "interpolation_plan.json"
        _write_json(interpolation_path, plan.interpolation.to_dict())

    raw_prompt_path: Optional[Path] = None
    if raw_prompt is not None:
        raw_prompt_path = run_dir / "prompt.raw.txt"
        _write_text(raw_prompt_path, raw_prompt if raw_prompt.endswith("\n") else raw_prompt + "\n")

    return ArtifactBundle(
        output_dir=output_dir,
        run_id=run_id,
        plan_path=plan_path,
        scene_paths=tuple(scene_paths),
        adain_path=adain_path,
        interpolation_path=interpolation_path,
        raw_prompt_path=raw_prompt_path,
    )


def video_plan_from_planner_payload(
    payload: dict[str, Any],
    classification: str,
    anchor: str,
    warnings: list[dict[str, Any]] | None = None,
    source: Optional[dict[str, str]] = None,
) -> VideoPlan:
    """Adapter: PlannerResult.payload (legacy raw dict) -> typed VideoPlan.

    The legacy planner emits a `{"scenes": [...]}` dict with the CompiledScene
    fields. Wrap it as a VideoPlan v1 so D3 artifact persistence and any future
    schema-validated consumer can speak one shape.
    """
    scenes_raw = payload.get("scenes") or []
    scenes = tuple(ScenePromptPacket.from_dict(s) for s in scenes_raw)
    warning_entries = tuple(
        PlanWarningEntry.from_dict(w) for w in (warnings or [])
    )
    return VideoPlan(
        classification=classification,
        anchor=anchor,
        scenes=scenes,
        continuity=ContinuityPacket(),
        style=StylePacket(),
        adain=None,
        interpolation=InterpolationPlan(),
        warnings=warning_entries,
        source=PlanSource.from_dict(source or {}),
    )
