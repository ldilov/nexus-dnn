"""Spec 051 D-C — render_report.json writer.

Assembles a per-run JSON report from surfaces the pipeline already
computes (per-scene durations, vram peak_mb_this_segment, scene
failure list, plan warnings) and writes it atomically into the
per-run output directory next to the rendered .mp4.

SECURITY C1 (gate synthesis):
- Path-traversal guard on `run_id` (alphanumeric + safe punctuation).
- Refuses to write any key matching `free_vram*` / `total_vram*` /
  `gpu_index` / `process_list` — the writer raises on those names so a
  future regression that tries to log side-channel data fails loud.
- File mode 0600 on POSIX (best-effort on Windows).
- Writer failure NEVER raises out to the render pipeline; on error,
  the writer returns None and logs a warning. Render success/failure
  is not gated on the report being persisted.

The report shape is intentionally small and forward-compatible: extra
keys can be added in a new schema_version=2 later.
"""
from __future__ import annotations

import json
import logging
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional

REPORT_SCHEMA_VERSION = 1
_RUN_ID_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_\-:]{0,63}$")
_BANNED_KEYS = frozenset(
    {
        "free_vram_mb",
        "total_vram_mb",
        "free_vram",
        "total_vram",
        "gpu_index",
        "process_list",
    }
)

_log = logging.getLogger("longcat.render_report")


class RenderReportError(Exception):
    pass


@dataclass(frozen=True)
class RenderReport:
    schema_version: int
    run_id: str
    status: str  # ok | error | partial
    duration_seconds: float
    num_frames: int
    scenes_rendered: int
    scenes_failed: tuple[dict[str, Any], ...]
    warnings: tuple[dict[str, Any], ...]
    output_path: Optional[str]
    error_phase: Optional[str]
    error_message: Optional[str]
    memory: dict[str, Any]
    # S5 (additive, backward-compatible): boundary-transition descriptors
    # from the plan (one entry per boundary) and the boundary_telemetry
    transitions: tuple[dict[str, Any], ...] = ()
    boundary_scores: tuple[dict[str, Any], ...] = ()

    def to_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "schema_version": self.schema_version,
            "run_id": self.run_id,
            "status": self.status,
            "duration_seconds": self.duration_seconds,
            "num_frames": self.num_frames,
            "scenes_rendered": self.scenes_rendered,
            "scenes_failed": list(self.scenes_failed),
            "warnings": list(self.warnings),
            "output_path": self.output_path,
            "error_phase": self.error_phase,
            "error_message": self.error_message,
            "memory": dict(self.memory),
        }
        if self.transitions:
            out["transitions"] = [dict(t) for t in self.transitions]
        if self.boundary_scores:
            out["boundary_scores"] = [dict(s) for s in self.boundary_scores]
        return out


def _validate_run_id(run_id: str) -> None:
    if not _RUN_ID_PATTERN.fullmatch(run_id):
        raise RenderReportError(
            "run_id must start alphanumeric and match [A-Za-z0-9][A-Za-z0-9_\\-:]{0,63}"
        )


def _scrub_memory(memory_stats: Optional[dict[str, Any]]) -> dict[str, Any]:
    """Strip side-channel keys (Security A1 + C1). Keep only non-leaky
    fields: peak_mb_this_segment, num_alloc_retries, num_ooms. RSS is
    fine too. Anything else we don't recognise is dropped, not added —
    additive growth should go through a schema_version bump."""
    if not memory_stats:
        return {}
    safe_keys = (
        "peak_mb_this_segment",
        "num_alloc_retries",
        "num_ooms",
        "generation_count",
        "rss_mb",
    )
    out: dict[str, Any] = {}
    for key in safe_keys:
        if key in memory_stats:
            out[key] = memory_stats[key]
    return out


def _assert_no_banned_keys(payload: dict[str, Any]) -> None:
    def _walk(node: Any) -> None:
        if isinstance(node, dict):
            for k, v in node.items():
                if k in _BANNED_KEYS:
                    raise RenderReportError(
                        f"render report contains banned side-channel key: {k!r}"
                    )
                _walk(v)
        elif isinstance(node, list):
            for item in node:
                _walk(item)

    _walk(payload)


def _atomic_write(path: Path, payload: bytes) -> None:
    tmp = path.with_suffix(path.suffix + ".tmp")
    with tmp.open("wb") as fh:
        fh.write(payload)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, path)
    try:
        # POSIX: 0o600 owner-only. Best-effort on Windows where chmod
        # is a no-op for read/write semantics; the ACL would need
        os.chmod(path, 0o600)
    except OSError:
        pass


def build_report(
    run_id: str,
    status: str,
    duration_seconds: float,
    num_frames: int,
    scenes_rendered: int,
    scenes_failed: Optional[list[dict[str, Any]]] = None,
    warnings: Optional[list[dict[str, Any]]] = None,
    output_path: Optional[str] = None,
    error_phase: Optional[str] = None,
    error_message: Optional[str] = None,
    memory_stats: Optional[dict[str, Any]] = None,
    transitions: Optional[list[dict[str, Any]]] = None,
    boundary_scores: Optional[list[dict[str, Any]]] = None,
) -> RenderReport:
    _validate_run_id(run_id)
    return RenderReport(
        schema_version=REPORT_SCHEMA_VERSION,
        run_id=run_id,
        status=status,
        duration_seconds=round(float(duration_seconds), 3),
        num_frames=int(num_frames),
        scenes_rendered=int(scenes_rendered),
        scenes_failed=tuple(scenes_failed or ()),
        warnings=tuple(warnings or ()),
        output_path=output_path,
        error_phase=error_phase,
        error_message=error_message,
        memory=_scrub_memory(memory_stats),
        transitions=tuple(transitions or ()),
        boundary_scores=tuple(boundary_scores or ()),
    )


def write_report(report: RenderReport, output_dir: Path) -> Path:
    output_dir = Path(output_dir)
    if not output_dir.exists():
        output_dir.mkdir(parents=True, exist_ok=True)
    payload = report.to_dict()
    _assert_no_banned_keys(payload)
    body = json.dumps(payload, indent=2, ensure_ascii=False, sort_keys=False)
    path = output_dir / f"{report.run_id}.render_report.json"
    _atomic_write(path, body.encode("utf-8") + b"\n")
    return path


def write_report_swallow(
    output_dir: Optional[Path],
    **build_kwargs: Any,
) -> Optional[Path]:
    """Build + write a report; on ANY failure log a warning and return
    None. The render pipeline calls this — it MUST NOT raise."""
    if output_dir is None:
        return None
    try:
        report = build_report(**build_kwargs)
        return write_report(report, Path(output_dir))
    except Exception as exc:  # broad: writer must not fail the render
        _log.warning("render report write failed: %s", exc)
        return None
