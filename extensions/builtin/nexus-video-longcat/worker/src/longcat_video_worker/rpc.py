"""JSON-RPC 2.0 framing + error codes for the longcat video worker."""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


class Methods:
    HEALTH = "longcat.runtime.health"
    MODELS_LIST = "longcat.video.models.list"
    PLAN_VALIDATE = "longcat.video.plan.validate"
    PLAN_EXPAND = "longcat.video.plan.expand"
    RENDER_START = "longcat.video.render.start"
    RENDER_CANCEL = "longcat.video.render.cancel"
    SEGMENT_RETRY = "longcat.video.segment.retry"


class Notifications:
    PROGRESS = "longcat.video.progress"
    SEGMENT_STARTED = "longcat.video.segment.started"
    SEGMENT_COMPLETED = "longcat.video.segment.completed"
    SEGMENT_STEP = "longcat.video.segment.step"
    ARTIFACT_CREATED = "longcat.video.artifact.created"
    DONE = "longcat.video.done"
    ERROR = "longcat.video.error"
    MEMORY_STATS = "runtime.memory_stats"
    RESUME_ACKNOWLEDGED = "runtime.resume_acknowledged"
    WEIGHTS_RESIDENT = "runtime.weights_resident"
    UPSCALE_FALLBACK = "longcat.video.upscale.fallback"


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
