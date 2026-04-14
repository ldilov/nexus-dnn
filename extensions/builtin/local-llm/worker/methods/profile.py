"""Profile CRUD — create, list, update, delete, and bind resources to profiles."""
from __future__ import annotations

from typing import Any

from worker.backends.states import ProfileState
from worker.state import BackendProfile, WorkerState


async def handle_list_profiles(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profiles = [p.to_dict() for p in state.profiles.values()]
    return {"profiles": profiles, "total": len(profiles)}


async def handle_create_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    name = params.get("name", "").strip()
    if not name:
        return {"error": {"code": "invalid_params", "message": "name is required"}}

    backend_family = params.get("backend_family", "llamacpp")
    config = params.get("config", {})

    profile_id = state.new_profile_id()
    profile = BackendProfile(
        id=profile_id,
        name=name,
        backend_family=backend_family,
        config=config,
        state=ProfileState.DRAFT,
    )
    state.profiles[profile_id] = profile
    state.record_event(profile_id, "created", name)

    return {
        "profile_id": profile_id,
        "status": "created",
        "profile": profile.to_dict(),
    }


async def handle_update_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    if profile.state == ProfileState.RUNNING:
        return {"error": {"code": "running", "message": "Stop the profile before updating"}}

    if "name" in params:
        profile.name = params["name"]
    if "config" in params:
        profile.config = {**profile.config, **params["config"]}

    state.record_event(profile_id, "updated")
    return {"profile_id": profile_id, "updated": True, "profile": profile.to_dict()}


async def handle_delete_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    if profile.state == ProfileState.RUNNING:
        return {"error": {"code": "running", "message": "Stop the profile before deleting"}}

    del state.profiles[profile_id]
    state.active_backends.pop(profile_id, None)
    state.record_event(profile_id, "deleted")
    return {"profile_id": profile_id, "deleted": True}


async def handle_get_profile_detail(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    runtime_info = None
    if profile.runtime_install_id:
        rt = state.runtimes.get(profile.runtime_install_id)
        if rt is not None:
            runtime_info = rt.to_dict()

    return {
        "profile_id": profile_id,
        "profile": profile.to_dict(),
        "runtime": runtime_info,
    }


async def handle_bind_runtime_to_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    runtime_id = params.get("runtime_id", "")

    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    runtime = state.runtimes.get(runtime_id)
    if runtime is None:
        return {"error": {"code": "not_found", "message": f"Runtime {runtime_id} not found"}}

    if runtime.state not in ("installed", "validated", "ready"):
        return {"error": {"code": "not_ready", "message": f"Runtime state is {runtime.state}"}}

    profile.runtime_install_id = runtime_id

    if profile.model_path:
        profile.state = ProfileState.READY
    else:
        profile.state = ProfileState.MODEL_MISSING

    state.record_event(profile_id, "runtime_bound", runtime_id)
    return {
        "profile_id": profile_id,
        "runtime_id": runtime_id,
        "bound": True,
        "state": profile.state.value,
    }


async def handle_bind_model_to_profile(
    params: dict[str, Any], state: WorkerState
) -> dict[str, Any]:
    profile_id = params.get("profile_id", "")
    profile = state.profiles.get(profile_id)
    if profile is None:
        return {"error": {"code": "not_found", "message": f"Profile {profile_id} not found"}}

    model_path = params.get("model_path", "")
    model_name = params.get("model_name", "")
    model_id = params.get("model_id", "")

    if model_path:
        profile.model_path = model_path
        profile.model_name = model_name or model_path.split("/")[-1]
    elif model_id:
        profile.model_path = model_id
        profile.model_name = model_name or model_id
    else:
        return {"error": {"code": "invalid_params", "message": "model_path or model_id required"}}

    if profile.runtime_install_id:
        profile.state = ProfileState.READY
    else:
        profile.state = ProfileState.RUNTIME_MISSING

    state.record_event(profile_id, "model_bound", profile.model_path or "")
    return {
        "profile_id": profile_id,
        "bound": True,
        "model_path": profile.model_path,
        "state": profile.state.value,
    }


PROFILE_METHODS: dict[str, Any] = {
    "llm.list_profiles": handle_list_profiles,
    "llm.create_profile": handle_create_profile,
    "llm.update_profile": handle_update_profile,
    "llm.delete_profile": handle_delete_profile,
    "llm.get_profile_detail": handle_get_profile_detail,
    "llm.bind_runtime_to_profile": handle_bind_runtime_to_profile,
    "llm.bind_model_to_profile": handle_bind_model_to_profile,
}
