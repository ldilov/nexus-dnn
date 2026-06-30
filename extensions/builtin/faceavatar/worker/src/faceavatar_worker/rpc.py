"""JSON-RPC 2.0 framing + frozen method names + error codes for the faceavatar worker.

Method/notification names and error codes are the frozen scaffold contract
(spec §3); the Rust shim and web must match these literals exactly. Each
logical op (generate_head, graft_head) is a `.start` + `.cancel` pair, and the
wire verb segment is `generate`/`graft` (P0.5 frozen contract).
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


class Methods:
    HEALTH = "faceavatar.runtime.health"
    GENERATE_HEAD_START = "faceavatar.generate.start"
    GENERATE_HEAD_CANCEL = "faceavatar.generate.cancel"
    GRAFT_HEAD_START = "faceavatar.graft.start"
    GRAFT_HEAD_CANCEL = "faceavatar.graft.cancel"


class Notifications:
    PROGRESS = "faceavatar.generate.progress"
    ARTIFACT_CREATED = "faceavatar.generate.artifact.created"
    DONE = "faceavatar.generate.done"
    ERROR = "faceavatar.generate.error"
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
