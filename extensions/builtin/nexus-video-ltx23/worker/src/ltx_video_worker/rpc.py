"""JSON-RPC 2.0 framing + error codes for the LTX video worker."""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


class Methods:
    HEALTH = "ltx.runtime.health"
    MODELS_LIST = "ltx.video.models.list"
    PLAN_VALIDATE = "ltx.video.plan.validate"
    RENDER_START = "ltx.video.render.start"
    RENDER_CANCEL = "ltx.video.render.cancel"
    SEGMENT_RETRY = "ltx.video.segment.retry"


class Notifications:
    PROGRESS = "ltx.video.progress"
    SEGMENT_STARTED = "ltx.video.segment.started"
    SEGMENT_COMPLETED = "ltx.video.segment.completed"
    SEGMENT_STEP = "ltx.video.segment.step"
    ARTIFACT_CREATED = "ltx.video.artifact.created"
    DONE = "ltx.video.done"
    ERROR = "ltx.video.error"
    MEMORY_STATS = "runtime.memory_stats"
    # Worker-side ack for a Rung 7L resume. Emitted exactly once per
    # render.start when the payload's `resumed_from_segment` field is
    # non-zero, BEFORE the first SEGMENT_STARTED of the resumed chain.
    # Operators correlate this with the host's restart_count to confirm
    # that the worker saw the resume offset the runner believes it sent.
    RESUME_ACKNOWLEDGED = "runtime.resume_acknowledged"
    # Emitted once after the diffusers pipeline finishes loading, before
    # the first SEGMENT_STARTED of the render. Payload carries the
    # transformer's device (cuda vs cpu) + bytes reserved by the CUDA
    # allocator — the smoke gate consumes this to prove `offload_mode=
    # "none"` actually parked the weights on the GPU.
    WEIGHTS_RESIDENT = "runtime.weights_resident"


class ErrorCodes:
    PARSE_ERROR = -32700
    INVALID_REQUEST = -32600
    METHOD_NOT_FOUND = -32601
    INVALID_PARAMS = -32602
    INTERNAL_ERROR = -32603

    DRIVER_TOO_OLD = -32100
    TORCH_CUDA_MISMATCH = -32101
    GPU_NOT_SUPPORTED = -32102
    MODEL_MISSING = -32103
    MODEL_LOAD_FAILED = -32104
    VRAM_BUDGET_EXCEEDED = -32105
    RENDER_FAILED = -32106
    RENDER_CANCELLED = -32107
    PLAN_INVALID = -32108
    NVFP4_NAN_BURST = -32109


@dataclass
class JsonRpcRequest:
    id: str | int | None
    method: str
    params: dict[str, Any] | list[Any] | None


def parse_request(line: str) -> JsonRpcRequest:
    obj = json.loads(line)
    if obj.get("jsonrpc") != "2.0":
        raise ValueError("missing jsonrpc=2.0")
    return JsonRpcRequest(
        id=obj.get("id"),
        method=obj["method"],
        params=obj.get("params"),
    )


def ok_response(request_id: Any, result: Any) -> str:
    return json.dumps({"jsonrpc": "2.0", "id": request_id, "result": result}) + "\n"


def error_response(
    request_id: Any, code: int, message: str, data: Any = None
) -> str:
    payload: dict[str, Any] = {"code": code, "message": message}
    if data is not None:
        payload["data"] = data
    return (
        json.dumps({"jsonrpc": "2.0", "id": request_id, "error": payload}) + "\n"
    )


def notification(method: str, params: dict[str, Any]) -> str:
    return json.dumps({"jsonrpc": "2.0", "method": method, "params": params}) + "\n"
