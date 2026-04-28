"""JSON-RPC 2.0 message shapes + well-known method / error-code constants."""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class RpcRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    jsonrpc: Literal["2.0"] = "2.0"
    id: int | str | None = None
    method: str
    params: dict[str, Any] | list[Any] | None = None


class RpcResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")
    jsonrpc: Literal["2.0"] = "2.0"
    id: int | str | None
    result: Any | None = None
    error: "RpcError | None" = None


class RpcError(BaseModel):
    model_config = ConfigDict(extra="forbid")
    code: int
    message: str
    data: dict[str, Any] | None = None


class RpcNotification(BaseModel):
    model_config = ConfigDict(extra="forbid")
    jsonrpc: Literal["2.0"] = "2.0"
    method: str
    params: dict[str, Any] = Field(default_factory=dict)


class Methods:
    HANDSHAKE = "handshake"
    HEALTH = "health"
    SHUTDOWN = "shutdown"
    SETTINGS_APPLY = "settings.apply"
    MODEL_LOAD = "model.load"
    MODEL_UNLOAD = "model.unload"
    SYNTHESIZE = "synthesize"
    SYNTHESIZE_BATCH = "synthesize.batch"
    VOICE_PROBE = "voice.probe"
    CANCEL = "cancel"
    AUDIO_EDIT = "audio.edit"
    AUDIO_EDIT_PREVIEW = "audio.edit.preview"


class ErrorCodes:
    PARSE_ERROR = -32700
    INVALID_REQUEST = -32600
    METHOD_NOT_FOUND = -32601
    INVALID_PARAMS = -32602
    INTERNAL_ERROR = -32603
    RUNTIME_UNAVAILABLE = -33000
    MODEL_MISSING = -33001
    CANCELLED = -33002
    VALIDATION_FAILED = -33010
    SYNTHESIS_FAILED = -33020


def ok_response(request_id: int | str | None, result: Any) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "id": request_id, "result": result}


def error_response(
    request_id: int | str | None,
    code: int,
    message: str,
    data: dict[str, Any] | None = None,
) -> dict[str, Any]:
    err: dict[str, Any] = {"code": code, "message": message}
    if data is not None:
        err["data"] = data
    return {"jsonrpc": "2.0", "id": request_id, "error": err}


def notification(method: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
    return {"jsonrpc": "2.0", "method": method, "params": params or {}}
