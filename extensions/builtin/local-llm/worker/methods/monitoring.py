"""Monitoring — health, metrics, logs, diagnostics for running backends."""
from __future__ import annotations

import time
from typing import Any

from worker.backends.adapter import BackendHealthInfo, BackendStatus
from worker.backends.failures import diagnose
from worker.backends.states import ProfileState
from worker.state import WorkerState


async def handle_get_backend_health(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    adapter = state.active_backends.get(profile_id)
    if adapter is None:
        return {
            "profile_id": profile_id,
            "status": profile.state.value,
            "model_loaded": None,
            "uptime_seconds": 0,
            "slots_available": 0,
            "slots_total": 0,
        }

    try:
        health = await adapter.health()
        return {
            "profile_id": profile_id,
            "status": health.status.value,
            "model_loaded": health.model_loaded,
            "uptime_seconds": health.uptime_seconds,
            "slots_available": health.slots_available,
            "slots_total": health.slots_total,
            "error": health.error,
        }
    except Exception as exc:
        return {
            "profile_id": profile_id,
            "status": "error",
            "error": str(exc),
        }


async def handle_get_metrics(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    adapter = state.active_backends.get(profile_id)
    if adapter is None:
        return {
            "profile_id": profile_id,
            "metrics": {},
            "collected_at": None,
        }

    metrics: dict[str, Any] = {
        "backend_kind": adapter.kind.value,
        "backend_status": adapter.status.value,
    }

    try:
        health = await adapter.health()
        metrics["uptime_seconds"] = health.uptime_seconds
        metrics["slots_available"] = health.slots_available
        metrics["slots_total"] = health.slots_total
        metrics["model_loaded"] = health.model_loaded
    except Exception:
        pass

    if hasattr(adapter, "_process") and adapter._process is not None:
        proc = adapter._process
        metrics["pid"] = proc.pid
        metrics["stdout_lines"] = len(proc.last_stdout)
        metrics["stderr_lines"] = len(proc.last_stderr)

    return {
        "profile_id": profile_id,
        "metrics": metrics,
        "collected_at": time.time(),
    }


async def handle_get_backend_logs(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    adapter = state.active_backends.get(profile_id)
    if adapter is None:
        return {
            "profile_id": profile_id,
            "lines": [],
            "offset": 0,
            "has_more": False,
        }

    all_lines: list[str] = []
    if hasattr(adapter, "_process") and adapter._process is not None:
        proc = adapter._process
        all_lines.extend(f"[stdout] {l}" for l in proc.last_stdout)
        all_lines.extend(f"[stderr] {l}" for l in proc.last_stderr)

    offset = params.get("offset", 0)
    limit = params.get("limit", 100)
    page = all_lines[offset : offset + limit]

    return {
        "profile_id": profile_id,
        "lines": page,
        "offset": offset,
        "has_more": offset + limit < len(all_lines),
    }


async def handle_get_diagnostics(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    diagnostics: dict[str, Any] = {
        "profile_state": profile.state.value,
        "has_runtime": profile.runtime_install_id is not None,
        "has_model": profile.model_path is not None,
        "has_active_backend": profile_id in state.active_backends,
    }

    failure_info = None
    if profile.last_failure:
        failure_info = profile.last_failure

    adapter = state.active_backends.get(profile_id)
    if adapter is not None and hasattr(adapter, "_process") and adapter._process is not None:
        proc = adapter._process
        if not proc.is_running:
            stderr_text = "\n".join(proc.last_stderr)
            structured = diagnose(stderr_text, proc.exit_code)
            failure_info = {
                "category": structured.category.value,
                "message": structured.message,
                "detail": structured.detail,
                "remediation": structured.remediation,
                "exit_code": structured.exit_code,
            }

    return {
        "profile_id": profile_id,
        "diagnostics": diagnostics,
        "failure": failure_info,
    }


async def handle_list_profile_history(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    offset = params.get("offset", 0)
    limit = params.get("limit", 50)

    entries = [e for e in state.history if e["profile_id"] == profile_id]
    page = entries[offset : offset + limit]

    return {
        "profile_id": profile_id,
        "entries": page,
        "total": len(entries),
        "offset": offset,
        "limit": limit,
    }


MONITORING_METHODS: dict[str, Any] = {
    "llm.get_backend_health": handle_get_backend_health,
    "llm.get_metrics": handle_get_metrics,
    "llm.get_backend_logs": handle_get_backend_logs,
    "llm.get_diagnostics": handle_get_diagnostics,
    "llm.list_profile_history": handle_list_profile_history,
}
