from __future__ import annotations

import json
from dataclasses import dataclass, field
from typing import Any


@dataclass(frozen=True)
class RpcRequest:
    jsonrpc: str
    id: int | None
    method: str
    params: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class RpcResponse:
    jsonrpc: str
    id: int | None
    result: dict[str, Any] | None = None
    error: dict[str, Any] | None = None


@dataclass(frozen=True)
class RpcNotification:
    jsonrpc: str
    method: str
    params: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class RpcError:
    code: int
    message: str
    data: Any = None


PARSE_ERROR = -32700
INVALID_REQUEST = -32600
METHOD_NOT_FOUND = -32601
INVALID_PARAMS = -32602
INTERNAL_ERROR = -32603


def parse_message(line: str) -> RpcRequest:
    try:
        raw = json.loads(line)
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid JSON: {exc}") from exc

    return RpcRequest(
        jsonrpc=raw.get("jsonrpc", "2.0"),
        id=raw.get("id"),
        method=raw.get("method", ""),
        params=raw.get("params", {}),
    )


def format_response(request_id: int | None, result: dict[str, Any]) -> str:
    payload = {"jsonrpc": "2.0", "id": request_id, "result": result}
    return json.dumps(payload, separators=(",", ":"))


def format_error(request_id: int | None, code: int, message: str, data: Any = None) -> str:
    error_obj: dict[str, Any] = {"code": code, "message": message}
    if data is not None:
        error_obj["data"] = data
    payload = {"jsonrpc": "2.0", "id": request_id, "error": error_obj}
    return json.dumps(payload, separators=(",", ":"))


def format_notification(method: str, params: dict[str, Any]) -> str:
    payload = {"jsonrpc": "2.0", "method": method, "params": params}
    return json.dumps(payload, separators=(",", ":"))


def format_stream_event(event_type: str, data: dict[str, Any]) -> str:
    """Create a JSON-RPC notification for a streaming event."""
    return format_notification("stream_event", {"event_type": event_type, **data})


def format_health_report(payload: dict[str, Any]) -> str:
    """Create a JSON-RPC notification for a health status report."""
    return format_notification("health_report", payload)


def format_backend_state(state_data: dict[str, Any]) -> str:
    """Create a JSON-RPC notification for a backend state change."""
    return format_notification("backend_state", state_data)
