from __future__ import annotations

import platform
import sys
import time
import threading
import uuid
from dataclasses import dataclass, field
from typing import Any, Awaitable, Callable

from nexus_sdk.protocol import (
    format_error,
    format_notification,
    format_response,
    parse_message,
    INTERNAL_ERROR,
    METHOD_NOT_FOUND,
    PARSE_ERROR,
)

PROTOCOL_VERSION = "0.1.0"


@dataclass(frozen=True)
class OperatorRegistration:
    operator_id: str
    version: str
    handler: Callable[[dict[str, Any], dict[str, Any], ExecutionContext], dict[str, Any]]


@dataclass
class ExecutionContext:
    request_id: str
    run_id: str
    node_id: str
    output_targets: dict[str, Any]
    _write_line: Callable[[str], None] = field(repr=False)
    _cancelled: threading.Event = field(default_factory=threading.Event, repr=False)

    def send_progress(self, percent: int, message: str) -> None:
        notification = format_notification("progress", {
            "request_id": self.request_id,
            "percent": percent,
            "message": message,
        })
        self._write_line(notification)

    def send_log(self, level: str, message: str) -> None:
        notification = format_notification("log", {
            "request_id": self.request_id,
            "level": level,
            "message": message,
        })
        self._write_line(notification)

    @property
    def is_cancelled(self) -> bool:
        return self._cancelled.is_set()


class BaseWorker:
    def __init__(self, extension_id: str, extension_version: str, worker_name: str) -> None:
        self._extension_id = extension_id
        self._extension_version = extension_version
        self._worker_name = worker_name
        self._session_id: str = ""
        self._operators: dict[str, OperatorRegistration] = {}
        self._methods: dict[str, Callable[[dict[str, Any]], Any]] = {}
        self._active_contexts: dict[str, ExecutionContext] = {}
        self._lock = threading.Lock()

    def register_operator(
        self,
        operator_id: str,
        version: str,
        handler: Callable[[dict[str, Any], dict[str, Any], ExecutionContext], dict[str, Any]],
    ) -> None:
        self._operators[operator_id] = OperatorRegistration(
            operator_id=operator_id,
            version=version,
            handler=handler,
        )

    def register_method(
        self,
        method_name: str,
        handler: Callable[[dict[str, Any]], Any],
    ) -> None:
        self._methods[method_name] = handler

    def send_progress(self, request_id: str, percent: int, message: str) -> None:
        notification = format_notification("progress", {
            "request_id": request_id,
            "percent": percent,
            "message": message,
        })
        self._write_line(notification)

    def send_log(self, request_id: str, level: str, message: str) -> None:
        notification = format_notification("log", {
            "request_id": request_id,
            "level": level,
            "message": message,
        })
        self._write_line(notification)

    def run(self) -> None:
        for line in sys.stdin:
            stripped = line.strip()
            if not stripped:
                continue
            self._handle_line(stripped)

    def _write_line(self, data: str) -> None:
        sys.stdout.write(data + "\n")
        sys.stdout.flush()

    def _handle_line(self, line: str) -> None:
        try:
            request = parse_message(line)
        except ValueError:
            self._write_line(format_error(None, PARSE_ERROR, "Parse error"))
            return

        dispatch = {
            "handshake": self._handle_handshake,
            "list_operators": self._handle_list_operators,
            "execute": self._handle_execute,
            "cancel": self._handle_cancel,
            "health": self._handle_health,
            "validate_config": self._handle_validate_config,
        }

        handler = dispatch.get(request.method)
        if handler is None:
            custom_handler = self._methods.get(request.method)
            if custom_handler is None:
                self._write_line(
                    format_error(request.id, METHOD_NOT_FOUND, f"Unknown method: {request.method}")
                )
                return
            try:
                result = custom_handler(request.params)
                self._write_line(format_response(request.id, result))
            except Exception as exc:
                self._write_line(format_error(request.id, INTERNAL_ERROR, str(exc)))
            return

        try:
            result = handler(request.params)
            self._write_line(format_response(request.id, result))
        except Exception as exc:
            self._write_line(format_error(request.id, INTERNAL_ERROR, str(exc)))

    def _handle_handshake(self, params: dict[str, Any]) -> dict[str, Any]:
        self._session_id = str(uuid.uuid4())
        return {
            "protocol_version": PROTOCOL_VERSION,
            "worker_name": self._worker_name,
            "extension_id": self._extension_id,
            "extension_version": self._extension_version,
            "session_id": self._session_id,
            "runtime_info": {
                "python_version": platform.python_version(),
                "platform": platform.platform(),
            },
            "supported_methods": [
                "handshake",
                "list_operators",
                "execute",
                "cancel",
                "health",
                "validate_config",
                *sorted(self._methods.keys()),
            ],
        }

    def _handle_list_operators(self, params: dict[str, Any]) -> dict[str, Any]:
        operators = [
            {"id": reg.operator_id, "version": reg.version}
            for reg in self._operators.values()
        ]
        return {"operators": operators}

    def _handle_execute(self, params: dict[str, Any]) -> dict[str, Any]:
        request_id = params.get("request_id", "")
        run_id = params.get("run_id", "")
        node_id = params.get("node_id", "")
        operator_info = params.get("operator", {})
        operator_id = operator_info.get("id", "")
        config = params.get("config", {})
        inputs = params.get("inputs", {})
        output_targets = params.get("output_targets", {})

        registration = self._operators.get(operator_id)
        if registration is None:
            return {
                "status": "failed",
                "error": {
                    "code": METHOD_NOT_FOUND,
                    "category": "operator",
                    "message": f"Unknown operator: {operator_id}",
                    "retryable": False,
                },
            }

        context = ExecutionContext(
            request_id=request_id,
            run_id=run_id,
            node_id=node_id,
            output_targets=output_targets,
            _write_line=self._write_line,
        )

        with self._lock:
            self._active_contexts[request_id] = context

        try:
            start_time = time.monotonic()
            result = registration.handler(inputs, config, context)
            elapsed_ms = int((time.monotonic() - start_time) * 1000)

            if "metrics" in result and "duration_ms" not in result["metrics"]:
                result = {**result, "metrics": {**result["metrics"], "duration_ms": elapsed_ms}}

            return result
        except Exception as exc:
            return {
                "status": "failed",
                "error": {
                    "code": INTERNAL_ERROR,
                    "category": "runtime",
                    "message": str(exc),
                    "retryable": False,
                },
            }
        finally:
            with self._lock:
                self._active_contexts.pop(request_id, None)

    def _handle_cancel(self, params: dict[str, Any]) -> dict[str, Any]:
        request_id = params.get("request_id", "")
        with self._lock:
            context = self._active_contexts.get(request_id)

        if context is not None:
            context._cancelled.set()
            return {"cancelled": True}

        return {"cancelled": False}

    def _handle_validate_config(self, params: dict[str, Any]) -> dict[str, Any]:
        operator_id = params.get("operator_id", "")
        registration = self._operators.get(operator_id)
        if registration is None:
            return {"valid": False, "errors": [f"Unknown operator: {operator_id}"]}
        return {"valid": True, "errors": []}

    def _handle_health(self, params: dict[str, Any]) -> dict[str, Any]:
        return {"status": "healthy"}
