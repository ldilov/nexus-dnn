"""Frozen dataclasses for the audio-edit result envelope."""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class OpDuration:
    """Wall-clock duration spent on a single op, in milliseconds."""

    op_id: str
    duration_ms: float


@dataclass(frozen=True)
class AudioEditReport:
    """Result envelope returned by ``apply_chain`` and ``materialize_to_temp``."""

    chain_digest: str
    source_duration_ms: int
    derived_duration_ms: int
    measured_lufs: float | None
    per_op_durations_ms: list[OpDuration]
    warnings: list[str] = field(default_factory=list)
