"""Lifecycle management — start, stop, restart backend processes for profiles."""
from __future__ import annotations

import time
from typing import Any

from worker.backends.adapter import BackendStatus
from worker.backends.llamacpp import LlamaCppAdapter
from worker.backends.states import ProfileState
from worker.state import WorkerState


async def handle_start_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    if profile.state == ProfileState.RUNNING:
        return {"error": {"code": "already_running", "message": "Profile is already running"}}

    if not profile.runtime_install_id:
        return {"error": {"code": "no_runtime", "message": "No runtime bound to profile"}}

    runtime = state.runtimes.get(profile.runtime_install_id)
    if runtime is None:
        return {"error": {"code": "not_found", "message": "Bound runtime not found"}}

    if runtime.binary_path is None or not runtime.binary_path.is_file():
        return {"error": {"code": "binary_missing", "message": "Runtime binary not found on disk"}}

    if not profile.model_path:
        return {"error": {"code": "no_model", "message": "No model bound to profile"}}

    profile.state = ProfileState.STARTING
    state.record_event(profile_id, "starting")

    def forward_log(stream_name: str, line: str) -> None:
        prefix = f"[ext:nexus.local-llm] [llamacpp:{stream_name}]"
        state.record_event(profile_id, "log", f"{prefix} {line}")
        import sys
        sys.stderr.write(f"{prefix} {line}\n")
        sys.stderr.flush()

    try:
        adapter = LlamaCppAdapter(
            install_dir=runtime.install_path,
            manifest=state.manifest,
            log_callback=forward_log,
        )
        await adapter.start(profile.model_path, profile.config)

        state.active_backends[profile_id] = adapter
        profile.state = ProfileState.RUNNING
        profile.pid = adapter._process.pid if adapter._process else None
        config = adapter._config
        profile.endpoint = f"http://{config.host}:{config.port}"
        profile.last_failure = None
        state.record_event(profile_id, "started", profile.endpoint or "")

        return {
            "profile_id": profile_id,
            "started": True,
            "pid": profile.pid,
            "endpoint": profile.endpoint,
        }
    except Exception as exc:
        profile.state = ProfileState.FAILED
        profile.last_failure = {"error": str(exc), "timestamp": time.time()}
        state.record_event(profile_id, "start_failed", str(exc))
        return {"error": {"code": "start_failed", "message": str(exc)}}


async def handle_stop_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    adapter = state.active_backends.get(profile_id)
    if adapter is None:
        profile.state = ProfileState.STOPPED
        return {"profile_id": profile_id, "stopped": True}

    profile.state = ProfileState.STOPPING
    state.record_event(profile_id, "stopping")

    try:
        await adapter.stop()
    except Exception:
        pass

    del state.active_backends[profile_id]
    profile.state = ProfileState.STOPPED
    profile.pid = None
    profile.endpoint = None
    state.record_event(profile_id, "stopped")
    return {"profile_id": profile_id, "stopped": True}


async def handle_restart_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    stop_result = await handle_stop_profile(params, state)
    if "error" in stop_result:
        return stop_result

    return await handle_start_profile(params, state)


async def handle_test_boot_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    t0 = time.monotonic()
    start_result = await handle_start_profile(params, state)

    if "error" in start_result:
        duration_ms = int((time.monotonic() - t0) * 1000)
        return {
            "profile_id": profile_id,
            "boot_success": False,
            "duration_ms": duration_ms,
            "health_snapshot": None,
            "error": start_result["error"],
        }

    adapter = state.active_backends.get(profile_id)
    health_snapshot = None
    if adapter is not None:
        try:
            health = await adapter.health()
            health_snapshot = {
                "status": health.status.value,
                "model_loaded": health.model_loaded,
                "uptime_seconds": health.uptime_seconds,
            }
        except Exception:
            pass

    await handle_stop_profile(params, state)
    duration_ms = int((time.monotonic() - t0) * 1000)

    return {
        "profile_id": profile_id,
        "boot_success": True,
        "duration_ms": duration_ms,
        "health_snapshot": health_snapshot,
    }


LIFECYCLE_METHODS: dict[str, Any] = {
    "llm.start_profile": handle_start_profile,
    "llm.stop_profile": handle_stop_profile,
    "llm.restart_profile": handle_restart_profile,
    "llm.test_boot_profile": handle_test_boot_profile,
}
