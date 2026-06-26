"""JSON-RPC 2.0 framing + frozen method names + error codes for the trellis2 worker.

Mirrors svi2-pro's rpc module. Method/notification names and error codes are
the P0.5 frozen contract (see docs/research/comfyui-trellis2/*-P0.5-contracts.md);
the Rust shim (P1) and web (P3) must match these literals exactly.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


class Methods:
    HEALTH = "trellis2.runtime.health"
    GENERATE_START = "trellis2.generate.start"
    GENERATE_CANCEL = "trellis2.generate.cancel"
    REFINE_START = "trellis2.refine.start"
    REFINE_CANCEL = "trellis2.refine.cancel"


class Notifications:
    PROGRESS = "trellis2.generate.progress"
    ARTIFACT_CREATED = "trellis2.generate.artifact.created"
    DONE = "trellis2.generate.done"
    ERROR = "trellis2.generate.error"
    MEMORY_STATS = "runtime.memory_stats"


class ErrorCodes:
    PARSE_ERROR = -32700
    INVALID_REQUEST = -32600
    METHOD_NOT_FOUND = -32601
    INVALID_PARAMS = -32602
    INTERNAL_ERROR = -32603

    GPU_NOT_SUPPORTED = -32100
    MODEL_MISSING = -32101
    GENERATION_FAILED = -32102
    CANCELLED = -32103


@dataclass
class JsonRpcRequest:
    id: str | int | None
    method: str
    params: dict[str, Any] | list[Any] | None


def parse_request(line: str) -> JsonRpcRequest:
    obj = json.loads(line)
    if obj.get("jsonrpc") != "2.0":
        raise ValueError("missing jsonrpc=2.0")
    return JsonRpcRequest(id=obj.get("id"), method=obj["method"], params=obj.get("params"))


def ok_response(request_id: Any, result: Any) -> str:
    return json.dumps({"jsonrpc": "2.0", "id": request_id, "result": result}) + "\n"


def error_response(request_id: Any, code: int, message: str, data: Any = None) -> str:
    payload: dict[str, Any] = {"code": code, "message": message}
    if data is not None:
        payload["data"] = data
    return json.dumps({"jsonrpc": "2.0", "id": request_id, "error": payload}) + "\n"


def notification(method: str, params: dict[str, Any]) -> str:
    return json.dumps({"jsonrpc": "2.0", "method": method, "params": params}) + "\n"
