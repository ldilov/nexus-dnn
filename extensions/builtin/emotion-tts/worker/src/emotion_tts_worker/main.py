"""stdio NDJSON JSON-RPC 2.0 event loop entry point.

Phase 2 ships the loop + dispatcher + three intrinsic methods
(``handshake``, ``health``, ``shutdown``). Synthesis handlers
(``synthesize``, ``synthesize.batch``, ``voice.probe``, ``cancel``) land in
Phase 3 under user-story tasks.
"""

from __future__ import annotations

import asyncio
import json
import sys
import threading
from typing import Any, Awaitable, Callable

from . import __version__
from .rpc import ErrorCodes, Methods, error_response, ok_response
from .telemetry import WorkerLogger

Handler = Callable[[dict[str, Any] | list[Any] | None], Awaitable[Any]]
ProtocolVersion = "1.0"


class Worker:
    def __init__(self) -> None:
        self._handlers: dict[str, Handler] = {}
        self._shutdown = asyncio.Event()
        self._stdout_lock = asyncio.Lock()
        self._stdout_sync_lock = threading.Lock()
        self.logger = WorkerLogger(self._emit_sync)
        self._register_intrinsic()

    def register(self, method: str, handler: Handler, *, replace: bool = False) -> None:
        if method in self._handlers and not replace:
            raise ValueError(f"duplicate handler for {method}")
        self._handlers[method] = handler

    async def run(self) -> int:
        self.logger.info("worker.start", version=__version__)
        loop = asyncio.get_running_loop()

        # Cross-platform stdin bridge. asyncio.connect_read_pipe(sys.stdin)
        # is unreliable on Windows — the call returns successfully but
        # readline() never fires for piped stdin under
        # WindowsProactorEventLoopPolicy. The bug surfaces as a host
        # `handshake_timeout` even though the worker is alive.
        # A daemon thread doing blocking sys.stdin.buffer.readline() and
        # forwarding lines via call_soon_threadsafe works on every
        # platform Python supports.
        line_queue: asyncio.Queue[bytes | None] = asyncio.Queue()

        def _stdin_pump() -> None:
            try:
                stream = sys.stdin.buffer
                while True:
                    chunk = stream.readline()
                    loop.call_soon_threadsafe(line_queue.put_nowait, chunk)
                    if not chunk:
                        break
            except Exception:  # noqa: BLE001 — last-resort: signal EOF
                loop.call_soon_threadsafe(line_queue.put_nowait, None)

        threading.Thread(target=_stdin_pump, daemon=True, name="emotion_tts_worker.stdin").start()

        while not self._shutdown.is_set():
            try:
                line = await line_queue.get()
            except (asyncio.CancelledError, KeyboardInterrupt):
                break
            if not line:
                # Empty bytes (EOF on parent close) or None (pump errored)
                # — either way we're done.
                break
            await self._dispatch_line(line)

        self.logger.info("worker.stop")
        return 0

    async def _dispatch_line(self, line: bytes) -> None:
        try:
            request = json.loads(line)
        except json.JSONDecodeError as exc:
            await self._emit(error_response(None, ErrorCodes.PARSE_ERROR, f"parse error: {exc}"))
            return

        if not isinstance(request, dict) or request.get("jsonrpc") != "2.0":
            await self._emit(error_response(
                request.get("id") if isinstance(request, dict) else None,
                ErrorCodes.INVALID_REQUEST,
                "invalid request",
            ))
            return

        method = request.get("method")
        request_id = request.get("id")
        params = request.get("params")

        if not isinstance(method, str):
            await self._emit(error_response(request_id, ErrorCodes.INVALID_REQUEST, "method must be a string"))
            return

        handler = self._handlers.get(method)
        if handler is None:
            await self._emit(error_response(request_id, ErrorCodes.METHOD_NOT_FOUND, f"method not found: {method}"))
            return

        try:
            result = await handler(params)
        except ValueError as exc:
            await self._emit(error_response(request_id, ErrorCodes.VALIDATION_FAILED, str(exc)))
            return
        except Exception as exc:
            rpc_payload = getattr(exc, "rpc_error", None)
            if isinstance(rpc_payload, dict) and "code" in rpc_payload:
                await self._emit(
                    error_response(
                        request_id,
                        int(rpc_payload["code"]),
                        str(rpc_payload.get("message", str(exc))),
                        rpc_payload.get("data"),
                    )
                )
                return
            self.logger.error("handler.exception", method=method, error=str(exc))
            await self._emit(error_response(request_id, ErrorCodes.INTERNAL_ERROR, str(exc)))
            return

        if request_id is not None:
            await self._emit(ok_response(request_id, result))

    async def _emit(self, payload: dict[str, Any]) -> None:
        line = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        async with self._stdout_lock:
            with self._stdout_sync_lock:
                sys.stdout.write(line + "\n")
                sys.stdout.flush()

    def emit(self, payload: dict[str, Any]) -> None:
        """Public synchronous NDJSON emitter; safe to call from any thread.

        Holds the same ``threading.Lock`` as :meth:`_emit` so interleaving
        with the async dispatch stays frame-atomic. Use this from handlers
        that push notifications from inside blocking code (e.g.
        ``model.load.progress`` during a 20 s torch load).
        """
        line = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
        with self._stdout_sync_lock:
            sys.stdout.write(line + "\n")
            sys.stdout.flush()

    def _emit_sync(self, payload: dict[str, Any]) -> None:
        self.emit(payload)

    def _register_intrinsic(self) -> None:
        async def handshake(_: Any) -> dict[str, Any]:
            return {
                "protocol_version": ProtocolVersion,
                "worker_version": __version__,
                "accepts_methods": list(sorted(self._handlers.keys())) + [
                    Methods.HANDSHAKE,
                    Methods.HEALTH,
                    Methods.SHUTDOWN,
                ],
                "notification_methods": [
                    "progress",
                    "segment_started",
                    "segment_completed",
                    "segment_failed",
                    "warning",
                    "log",
                    "model.load.progress",
                ],
            }

        async def health(_: Any) -> dict[str, Any]:
            return {"status": "ok", "version": __version__}

        async def shutdown(_: Any) -> dict[str, Any]:
            self._shutdown.set()
            return {"status": "shutting_down"}

        self._handlers[Methods.HANDSHAKE] = handshake
        self._handlers[Methods.HEALTH] = health
        self._handlers[Methods.SHUTDOWN] = shutdown


def main() -> int:
    worker = Worker()
    try:
        return asyncio.run(worker.run())
    except KeyboardInterrupt:
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
