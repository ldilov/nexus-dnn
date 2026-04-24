"""Preprocessing-pipeline structured report (spec 034 FR-202, US1).

Mirrors the JSON shape documented in
``specs/034-tts-engine-quality-pack/data-model.md §VoiceAssetPreprocessing``
and the contract in
``specs/034-tts-engine-quality-pack/contracts/rpc/methods_additions.md``.

The report is intentionally serialisable back and forth without losing
stage-specific extras (decode bitrate, VAD engine name, etc.) — the Rust
side persists the blob verbatim under
``ext_emotion_tts__voice_assets.preprocessing_report_json``.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


DEFAULT_PIPELINE_VERSION = "1"


@dataclass(frozen=True)
class Stage:
    """A single pipeline step's outcome.

    ``status`` is one of the documented verbs:
    ``ok`` | ``skipped`` | ``failed``. ``reason`` is required for
    non-ok statuses. ``extra`` carries stage-specific metrics —
    decode sample-rate, VAD engine name, LUFS before/after, etc.
    """

    stage: str
    status: str
    duration_ms: int | None = None
    reason: str | None = None
    extra: dict[str, Any] = field(default_factory=dict)

    def to_json(self) -> dict[str, Any]:
        out: dict[str, Any] = {"stage": self.stage, "status": self.status}
        if self.duration_ms is not None:
            out["duration_ms"] = self.duration_ms
        if self.reason is not None:
            out["reason"] = self.reason
        out.update(self.extra)
        return out


@dataclass
class PreprocessingReport:
    pipeline_version: str = DEFAULT_PIPELINE_VERSION
    stages: list[Stage] = field(default_factory=list)
    succeeded: bool = True
    warnings: list[str] = field(default_factory=list)

    def add_stage(self, stage: Stage) -> None:
        self.stages.append(stage)
        if stage.status == "failed":
            self.succeeded = False
        if stage.status == "skipped" and stage.reason:
            self.warnings.append(f"{stage.stage}: {stage.reason}")

    def to_json(self) -> dict[str, Any]:
        return {
            "pipeline_version": self.pipeline_version,
            "stages": [s.to_json() for s in self.stages],
            "succeeded": self.succeeded,
            "warnings": list(self.warnings),
        }

    @staticmethod
    def from_json(payload: dict[str, Any]) -> "PreprocessingReport":
        stages: list[Stage] = []
        for raw in payload.get("stages", []):
            copy = dict(raw)
            stage = copy.pop("stage")
            status = copy.pop("status")
            duration_ms = copy.pop("duration_ms", None)
            reason = copy.pop("reason", None)
            stages.append(
                Stage(
                    stage=stage,
                    status=status,
                    duration_ms=duration_ms,
                    reason=reason,
                    extra=copy,
                )
            )
        return PreprocessingReport(
            pipeline_version=payload.get("pipeline_version", DEFAULT_PIPELINE_VERSION),
            stages=stages,
            succeeded=bool(payload.get("succeeded", True)),
            warnings=list(payload.get("warnings", [])),
        )

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


class PreprocessError(Exception):
    """Raised by a pipeline stage that cannot continue.

    Caught by the pipeline driver, which records a ``failed`` stage in the
    report and re-raises a structured RPC error (code ``-32010`` per
    contracts/rpc/methods_additions.md).
    """

    def __init__(self, stage: str, reason: str) -> None:
        super().__init__(f"{stage}: {reason}")
        self.stage = stage
        self.reason = reason
