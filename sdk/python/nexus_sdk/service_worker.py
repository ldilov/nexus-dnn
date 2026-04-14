from __future__ import annotations

import asyncio
import sys
from typing import Any

from nexus_sdk.protocol import (
    format_error,
    format_health_report,
    format_response,
    parse_message,
    INTERNAL_ERROR,
    METHOD_NOT_FOUND,
    PARSE_ERROR,
)
from nexus_sdk.worker import BaseWorker


class ServiceWorker(BaseWorker):
    """A long-lived worker with async lifecycle hooks and health reporting.

    Extends BaseWorker to run on an asyncio event loop, providing
    structured startup/shutdown callbacks, health checks, and
    per-request cancellation.
    """

    async def on_startup(self) -> None:
        """Called after the handshake completes. Override to initialize resources."""

    async def on_shutdown(self) -> None:
        """Called when stdin closes or the worker is stopping. Override to release resources."""

    async def on_health_check(self) -> dict[str, Any]:
        """Return a structured health payload. Override to add custom health data."""
        return {"status": "healthy"}

    async def on_cancel(self, request_id: str) -> None:
        """Called when the host requests cancellation of a running request."""

    def run(self) -> None:
        """Start the async event loop and process messages from stdin."""
        asyncio.run(self._async_run())

    async def _async_run(self) -> None:
        loop = asyncio.get_running_loop()
        reader = asyncio.StreamReader()
        transport, _ = await loop.connect_read_pipe(
            lambda: asyncio.StreamReaderProtocol(reader),
            sys.stdin.buffer,
        )

        handshake_done = False

        try:
            while True:
                raw = await reader.readline()
                if not raw:
                    break
                line = raw.decode(errors="replace").strip()
                if not line:
                    continue

                response_line = await self._async_handle_line(line)
                if response_line is not None:
                    self._write_line(response_line)

                if not handshake_done and line:
                    try:
                        msg = parse_message(line)
                        if msg.method == "handshake":
                            handshake_done = True
                            await self.on_startup()
                    except ValueError:
                        pass
        finally:
            transport.close()
            await self.on_shutdown()

    async def _async_handle_line(self, line: str) -> str | None:
        try:
            request = parse_message(line)
        except ValueError:
            return format_error(None, PARSE_ERROR, "Parse error")

        if request.method == "health":
            return await self._async_handle_health(request.id)

        if request.method == "cancel":
            return await self._async_handle_cancel(request.id, request.params)

        dispatch = {
            "handshake": self._handle_handshake,
            "list_operators": self._handle_list_operators,
            "execute": self._handle_execute,
            "validate_config": self._handle_validate_config,
        }

        handler = dispatch.get(request.method)
        if handler is None:
            custom_handler = self._methods.get(request.method)
            if custom_handler is None:
                return format_error(request.id, METHOD_NOT_FOUND, f"Unknown method: {request.method}")
            try:
                result = await custom_handler(request.params)
                return format_response(request.id, result)
            except Exception as exc:
                return format_error(request.id, INTERNAL_ERROR, str(exc))

        try:
            result = handler(request.params)
            return format_response(request.id, result)
        except Exception as exc:
            return format_error(request.id, INTERNAL_ERROR, str(exc))

    async def _async_handle_health(self, request_id: int | None) -> str:
        try:
            payload = await self.on_health_check()
            return format_response(request_id, payload)
        except Exception as exc:
            return format_error(request_id, INTERNAL_ERROR, str(exc))

    async def _async_handle_cancel(self, request_id: int | None, params: dict[str, Any]) -> str:
        target_request_id = params.get("request_id", "")

        result = self._handle_cancel(params)

        await self.on_cancel(target_request_id)

        return format_response(request_id, result)
