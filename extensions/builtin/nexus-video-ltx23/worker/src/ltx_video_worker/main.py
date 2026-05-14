"""Stdio NDJSON JSON-RPC event loop.

Worker process talks to a Rust shim:
- Reads one JSON request per stdin line.
- Writes one JSON response per stdout line.
- Emits notifications (progress, segment events) the same way — no `id` field.

The shim's stdout was redirected to stderr in __main__._hijack_stdout(); the
original handle is stashed at sys.__nexus_jsonrpc_stdout__ so this module
writes to the wire instead of leaking to a hijacked stream.
"""

from __future__ import annotations

import asyncio
import sys
import threading
from typing import Any, Awaitable, Callable

from . import __version__
from .rpc import (
    ErrorCodes,
    JsonRpcRequest,
    Methods,
    error_response,
    notification,
    ok_response,
    parse_request,
)
from .telemetry import WorkerLogger

Handler = Callable[
    [dict[str, Any] | list[Any] | None], Awaitable[Any]
]

PROTOCOL_VERSION = "1.0"


def _jsonrpc_stdout() -> Any:
    return getattr(sys, "__nexus_jsonrpc_stdout__", sys.stdout)


class Worker:
    def __init__(self, profile: str) -> None:
        self.profile = profile
        self._handlers: dict[str, Handler] = {}
        self._shutdown = asyncio.Event()
        self._stdout_lock = asyncio.Lock()
        self._stdout_sync_lock = threading.Lock()
        self.logger = WorkerLogger()
        self._register_intrinsic()

    def register(
        self, method: str, handler: Handler, *, replace: bool = False
    ) -> None:
        if method in self._handlers and not replace:
            raise ValueError(f"duplicate handler for {method}")
        self._handlers[method] = handler

    async def emit_notification(
        self, method: str, params: dict[str, Any]
    ) -> None:
        line = notification(method, params)
        async with self._stdout_lock:
            await asyncio.to_thread(self._write, line)

    def _write(self, line: str) -> None:
        with self._stdout_sync_lock:
            out = _jsonrpc_stdout()
            out.write(line)
            out.flush()

    def _register_intrinsic(self) -> None:
        async def handshake(_params: Any) -> dict[str, Any]:
            return {
                "runtime_id": f"nexus.video.ltx23.{self.profile}",
                "profile": self.profile,
                "protocol_version": PROTOCOL_VERSION,
                "version": __version__,
                "python_version": "{}.{}.{}".format(*sys.version_info[:3]),
            }

        async def health(_params: Any) -> dict[str, Any]:
            return {
                "runtime_id": f"nexus.video.ltx23.{self.profile}",
                "profile": self.profile,
                "status": "ready",
                "version": __version__,
                "protocol_version": PROTOCOL_VERSION,
                "python_version": "{}.{}.{}".format(*sys.version_info[:3]),
            }

        async def shutdown(_params: Any) -> dict[str, Any]:
            self._shutdown.set()
            return {"shutting_down": True}

        self.register("handshake", handshake)
        self.register(Methods.HEALTH, health)
        self.register("shutdown", shutdown)

    async def run(self) -> int:
        self.logger.info(
            "worker.start", version=__version__, profile=self.profile
        )
        loop = asyncio.get_running_loop()

        # Windows note: asyncio.connect_read_pipe(sys.stdin) is unreliable
        # under WindowsProactorEventLoopPolicy — readline() never fires for
        # piped stdin. Use a thread-bridged reader instead. Pattern lifted
        # from emotion-tts worker.
        reader_q: asyncio.Queue[str | None] = asyncio.Queue()

        def _stdin_pump():
            for raw in sys.stdin:
                loop.call_soon_threadsafe(reader_q.put_nowait, raw)
            loop.call_soon_threadsafe(reader_q.put_nowait, None)

        threading.Thread(target=_stdin_pump, name="stdin-pump", daemon=True).start()

        while not self._shutdown.is_set():
            line = await reader_q.get()
            if line is None:
                break
            line = line.strip()
            if not line:
                continue
            await self._dispatch_line(line)

        self.logger.info("worker.stop")
        return 0

    async def _dispatch_line(self, line: str) -> None:
        try:
            req = parse_request(line)
        except Exception as exc:
            self.logger.error("rpc.parse_error", err=str(exc))
            self._write(
                error_response(None, ErrorCodes.PARSE_ERROR, f"parse error: {exc}")
            )
            return

        await self._dispatch_request(req)

    async def _dispatch_request(self, req: JsonRpcRequest) -> None:
        handler = self._handlers.get(req.method)
        if handler is None:
            if req.id is not None:
                self._write(
                    error_response(
                        req.id,
                        ErrorCodes.METHOD_NOT_FOUND,
                        f"method not found: {req.method}",
                    )
                )
            return

        try:
            result = await handler(req.params)
        except ValueError as exc:
            self.logger.error("rpc.invalid_params", method=req.method, err=str(exc))
            if req.id is not None:
                self._write(
                    error_response(
                        req.id, ErrorCodes.INVALID_PARAMS, str(exc)
                    )
                )
            return
        except Exception as exc:
            self.logger.error("rpc.internal_error", method=req.method, err=str(exc))
            if req.id is not None:
                self._write(
                    error_response(req.id, ErrorCodes.INTERNAL_ERROR, str(exc))
                )
            return

        if req.id is not None:
            self._write(ok_response(req.id, result))
