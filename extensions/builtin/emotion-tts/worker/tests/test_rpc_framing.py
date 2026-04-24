"""NDJSON JSON-RPC 2.0 envelope + error-code round-trip tests."""

from __future__ import annotations

import asyncio
import io
import json
from typing import Any

import pytest

from emotion_tts_worker.main import Worker
from emotion_tts_worker.rpc import ErrorCodes, Methods, error_response, notification, ok_response


def test_ok_response_shape() -> None:
    payload = ok_response(1, {"pong": True})
    assert payload == {"jsonrpc": "2.0", "id": 1, "result": {"pong": True}}


def test_error_response_shape() -> None:
    payload = error_response(7, ErrorCodes.VALIDATION_FAILED, "bad input", {"field": "text"})
    assert payload["jsonrpc"] == "2.0"
    assert payload["id"] == 7
    assert payload["error"] == {
        "code": ErrorCodes.VALIDATION_FAILED,
        "message": "bad input",
        "data": {"field": "text"},
    }


def test_error_response_omits_data_when_none() -> None:
    payload = error_response(1, ErrorCodes.INTERNAL_ERROR, "oops")
    assert "data" not in payload["error"]


def test_notification_shape() -> None:
    payload = notification("progress", {"pct": 50})
    assert payload == {"jsonrpc": "2.0", "method": "progress", "params": {"pct": 50}}
    assert "id" not in payload


class CapturingWorker(Worker):
    def __init__(self) -> None:
        super().__init__()
        self.outbound: list[dict[str, Any]] = []

    async def _emit(self, payload: dict[str, Any]) -> None:
        self.outbound.append(payload)

    def _emit_sync(self, payload: dict[str, Any]) -> None:
        self.outbound.append(payload)


@pytest.mark.asyncio
async def test_parse_error_on_invalid_json() -> None:
    worker = CapturingWorker()
    await worker._dispatch_line(b"{this is not json}\n")
    assert len(worker.outbound) == 1
    out = worker.outbound[0]
    assert out["error"]["code"] == ErrorCodes.PARSE_ERROR
    assert out["id"] is None


@pytest.mark.asyncio
async def test_method_not_found() -> None:
    worker = CapturingWorker()
    req = json.dumps({"jsonrpc": "2.0", "id": 42, "method": "nope"}).encode()
    await worker._dispatch_line(req + b"\n")
    assert len(worker.outbound) == 1
    out = worker.outbound[0]
    assert out["id"] == 42
    assert out["error"]["code"] == ErrorCodes.METHOD_NOT_FOUND


@pytest.mark.asyncio
async def test_invalid_request_missing_jsonrpc() -> None:
    worker = CapturingWorker()
    req = json.dumps({"id": 1, "method": "health"}).encode()
    await worker._dispatch_line(req + b"\n")
    assert worker.outbound[0]["error"]["code"] == ErrorCodes.INVALID_REQUEST


@pytest.mark.asyncio
async def test_handshake_intrinsic() -> None:
    worker = CapturingWorker()
    req = json.dumps({"jsonrpc": "2.0", "id": 1, "method": Methods.HANDSHAKE}).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert out["result"]["protocol_version"] == "1.0"
    assert Methods.HEALTH in out["result"]["accepts_methods"]


@pytest.mark.asyncio
async def test_health_intrinsic() -> None:
    worker = CapturingWorker()
    req = json.dumps({"jsonrpc": "2.0", "id": 2, "method": Methods.HEALTH}).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert out["result"]["status"] == "ok"


@pytest.mark.asyncio
async def test_shutdown_intrinsic_sets_event() -> None:
    worker = CapturingWorker()
    req = json.dumps({"jsonrpc": "2.0", "id": 3, "method": Methods.SHUTDOWN}).encode()
    await worker._dispatch_line(req + b"\n")
    assert worker._shutdown.is_set()
    out = worker.outbound[-1]
    assert out["result"]["status"] == "shutting_down"


@pytest.mark.asyncio
async def test_notification_request_has_no_response() -> None:
    worker = CapturingWorker()
    req = json.dumps({"jsonrpc": "2.0", "method": Methods.HEALTH}).encode()
    await worker._dispatch_line(req + b"\n")
    assert worker.outbound == []


@pytest.mark.asyncio
async def test_handler_validation_error_maps() -> None:
    worker = CapturingWorker()

    async def picky_handler(params: Any) -> Any:
        raise ValueError("text must be non-empty")

    worker.register("custom.validate", picky_handler)
    req = json.dumps({"jsonrpc": "2.0", "id": 9, "method": "custom.validate"}).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert out["error"]["code"] == ErrorCodes.VALIDATION_FAILED


@pytest.mark.asyncio
async def test_handler_generic_exception_maps_internal() -> None:
    worker = CapturingWorker()

    async def boom(params: Any) -> Any:
        raise RuntimeError("kaboom")

    worker.register("custom.boom", boom)
    req = json.dumps({"jsonrpc": "2.0", "id": 10, "method": "custom.boom"}).encode()
    await worker._dispatch_line(req + b"\n")
    out = worker.outbound[-1]
    assert out["error"]["code"] == ErrorCodes.INTERNAL_ERROR
