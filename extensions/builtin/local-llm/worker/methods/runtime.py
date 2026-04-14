"""Runtime install/validate/uninstall — manages llama.cpp binary lifecycle."""
from __future__ import annotations

import asyncio
import platform
import sys
from typing import Any

from worker.backends.llamacpp.resolver import locate_server_binary, resolve_asset
from worker.methods.runtime_install import (
    extract_acceleration,
    run_install,
    validate_runtime,
)
from worker.state import InstallTask, RuntimeInstall, WorkerState


async def handle_list_runtime_candidates(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    try:
        llamacpp = state.manifest.get("llamacpp", state.manifest)
        releases = llamacpp.get("releases", {})
        candidates: list[dict[str, Any]] = []
        for tag, release in releases.items():
            assets = release.get("assets", {})
            for platform_key, info in assets.items():
                candidates.append({
                    "id": f"llamacpp-{tag}-{platform_key}",
                    "backend": "llamacpp",
                    "version": tag,
                    "platform_key": platform_key,
                    "filename": info.get("filename", ""),
                    "installed": f"llamacpp-{tag}-{platform_key}" in {
                        r.id for r in state.runtimes.values()
                    },
                })
        return {"candidates": candidates}
    except Exception as exc:
        return {"error": {"code": "manifest_error", "message": str(exc)}}


async def handle_install_runtime(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    candidate_id = params.get("candidate_id", "")
    variant = params.get("variant")

    try:
        asset = resolve_asset(state.manifest, variant=variant)
    except LookupError as exc:
        return {"error": {"code": "resolve_failed", "message": str(exc)}}

    runtime_id = state.new_runtime_id()
    task_id = state.new_task_id()
    accel = extract_acceleration(candidate_id)
    os_family = platform.system().lower()

    install_path = (
        state.runtimes_dir / "llamacpp" / asset.tag / f"{os_family}-{accel}"
    )
    runtime = RuntimeInstall(
        id=runtime_id,
        backend_family="llamacpp",
        version=asset.tag,
        platform=os_family,
        arch=platform.machine().lower(),
        acceleration=accel,
        install_path=install_path,
        binary_path=None,
        state="installing",
    )
    state.runtimes[runtime_id] = runtime

    task = InstallTask(id=task_id, runtime_id=runtime_id, state="pending")
    state.install_tasks[task_id] = task
    asyncio.create_task(run_install(state, runtime, task, asset))

    return {"task_id": task_id, "runtime_id": runtime_id, "status": "started"}


async def handle_cancel_install(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    task_id = params.get("task_id", "")
    task = state.install_tasks.get(task_id)
    if task is None:
        return {"error": {"code": "not_found", "message": f"Task {task_id} not found"}}
    if task.state in ("done", "failed", "cancelled"):
        return {"task_id": task_id, "cancelled": False, "reason": "already_finished"}
    task.cancel_event.set()
    return {"task_id": task_id, "cancelled": True}


async def handle_get_install_status(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    task_id = params.get("task_id", "")
    task = state.install_tasks.get(task_id)
    if task is None:
        return {"error": {"code": "not_found", "message": f"Task {task_id} not found"}}
    return task.to_dict()


async def handle_get_install_logs(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    task_id = params.get("task_id", "")
    task = state.install_tasks.get(task_id)
    if task is None:
        return {"error": {"code": "not_found", "message": f"Task {task_id} not found"}}
    offset = params.get("offset", 0)
    limit = params.get("limit", 50)
    lines = task.logs[offset : offset + limit]
    return {
        "task_id": task_id,
        "lines": lines,
        "offset": offset,
        "has_more": offset + limit < len(task.logs),
    }


async def handle_validate_runtime(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    runtime_id = params.get("runtime_id", "")
    runtime = state.runtimes.get(runtime_id)
    if runtime is None:
        return {"error": {"code": "not_found", "message": f"Runtime {runtime_id} not found"}}
    result = validate_runtime(runtime)
    return {"runtime_id": runtime_id, **result}


async def handle_repair_runtime(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    runtime_id = params.get("runtime_id", "")
    runtime = state.runtimes.get(runtime_id)
    if runtime is None:
        return {"error": {"code": "not_found", "message": f"Runtime {runtime_id} not found"}}

    actions: list[str] = []
    bin_name = "llama-server.exe" if sys.platform == "win32" else "llama-server"

    if runtime.binary_path and not runtime.binary_path.is_file():
        try:
            binary = locate_server_binary(runtime.install_path, bin_name)
            runtime.binary_path = binary
            actions.append("relocated_binary")
        except FileNotFoundError:
            return {
                "runtime_id": runtime_id,
                "repaired": False,
                "actions_taken": actions,
                "error": "Binary not found — reinstall required",
            }

    if runtime.binary_path and sys.platform != "win32":
        runtime.binary_path.chmod(runtime.binary_path.stat().st_mode | 0o755)
        actions.append("fixed_permissions")

    runtime.state = "installed"
    return {"runtime_id": runtime_id, "repaired": True, "actions_taken": actions}


async def handle_uninstall_runtime(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    runtime_id = params.get("runtime_id", "")
    runtime = state.runtimes.get(runtime_id)
    if runtime is None:
        return {"error": {"code": "not_found", "message": f"Runtime {runtime_id} not found"}}

    in_use = any(
        p.runtime_install_id == runtime_id and p.state.value == "running"
        for p in state.profiles.values()
    )
    if in_use:
        return {"error": {"code": "in_use", "message": "Runtime is used by a running profile"}}

    import shutil
    if runtime.install_path.is_dir():
        await asyncio.to_thread(shutil.rmtree, runtime.install_path)

    del state.runtimes[runtime_id]
    return {"runtime_id": runtime_id, "removed": True}


RUNTIME_METHODS: dict[str, Any] = {
    "llm.list_runtime_candidates": handle_list_runtime_candidates,
    "llm.install_runtime": handle_install_runtime,
    "llm.cancel_install": handle_cancel_install,
    "llm.get_install_status": handle_get_install_status,
    "llm.get_install_logs": handle_get_install_logs,
    "llm.validate_runtime": handle_validate_runtime,
    "llm.repair_runtime": handle_repair_runtime,
    "llm.uninstall_runtime": handle_uninstall_runtime,
}
