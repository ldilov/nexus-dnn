from __future__ import annotations

import asyncio
import collections
import signal
import sys
import time
from dataclasses import dataclass, field
from typing import Any, Callable, Coroutine


@dataclass(frozen=True)
class ProcessConfig:
    """Configuration for a managed subprocess."""

    command: list[str]
    env: dict[str, str] = field(default_factory=dict)
    cwd: str | None = None
    log_capture: bool = True
    health_check_url: str | None = None
    health_check_interval_seconds: int = 5
    shutdown_timeout_seconds: int = 10


LOG_BUFFER_LINES = 200


class ManagedProcess:
    """Manages the lifecycle of an external subprocess with health monitoring."""

    def __init__(self, config: ProcessConfig) -> None:
        self._config = config
        self._process: asyncio.subprocess.Process | None = None
        self._started_at: float | None = None
        self._stdout_buffer: collections.deque[str] = collections.deque(maxlen=LOG_BUFFER_LINES)
        self._stderr_buffer: collections.deque[str] = collections.deque(maxlen=LOG_BUFFER_LINES)
        self._on_unexpected_exit: Callable[[int | None], Any] | None = None
        self._on_health_change: Callable[[bool], Any] | None = None
        self._on_log_line: Callable[[str, str], None] | None = None
        self._monitor_task: asyncio.Task[None] | None = None
        self._log_tasks: list[asyncio.Task[None]] = []
        self._healthy = False

    @property
    def pid(self) -> int | None:
        if self._process is None:
            return None
        return self._process.pid

    @property
    def is_running(self) -> bool:
        return self._process is not None and self._process.returncode is None

    @property
    def exit_code(self) -> int | None:
        if self._process is None:
            return None
        return self._process.returncode

    @property
    def last_stdout(self) -> list[str]:
        return list(self._stdout_buffer)

    @property
    def last_stderr(self) -> list[str]:
        return list(self._stderr_buffer)

    @property
    def uptime(self) -> float:
        if self._started_at is None or not self.is_running:
            return 0.0
        return time.monotonic() - self._started_at

    def on_unexpected_exit(self, callback: Callable[[int | None], Any]) -> None:
        """Register a callback invoked when the process exits unexpectedly."""
        self._on_unexpected_exit = callback

    def on_health_change(self, callback: Callable[[bool], Any]) -> None:
        """Register a callback invoked when health check status changes."""
        self._on_health_change = callback

    def on_log_line(self, callback: Callable[[str, str], None]) -> None:
        """Register a callback for each captured log line. Args: (stream_name, line_text)."""
        self._on_log_line = callback

    async def start(self) -> None:
        """Launch the subprocess and begin log capture / health monitoring."""
        if self.is_running:
            return

        kwargs: dict[str, Any] = {}
        if sys.platform == "win32":
            kwargs["creationflags"] = 0x00000200  # CREATE_NEW_PROCESS_GROUP

        self._process = await asyncio.create_subprocess_exec(
            *self._config.command,
            stdout=asyncio.subprocess.PIPE if self._config.log_capture else asyncio.subprocess.DEVNULL,
            stderr=asyncio.subprocess.PIPE if self._config.log_capture else asyncio.subprocess.DEVNULL,
            env=self._config.env or None,
            cwd=self._config.cwd,
            **kwargs,
        )
        self._started_at = time.monotonic()

        if self._config.log_capture:
            if self._process.stdout is not None:
                self._log_tasks.append(
                    asyncio.create_task(self._capture_stream(self._process.stdout, self._stdout_buffer, "stdout"))
                )
            if self._process.stderr is not None:
                self._log_tasks.append(
                    asyncio.create_task(self._capture_stream(self._process.stderr, self._stderr_buffer, "stderr"))
                )

        self._monitor_task = asyncio.create_task(self._monitor())

    async def stop(self) -> None:
        """Gracefully shut down the subprocess, falling back to kill after timeout."""
        if self._process is None or not self.is_running:
            self._cancel_background_tasks()
            return

        try:
            if sys.platform == "win32":
                self._process.terminate()
            else:
                self._process.send_signal(signal.SIGTERM)
            await asyncio.wait_for(
                self._process.wait(),
                timeout=self._config.shutdown_timeout_seconds,
            )
        except asyncio.TimeoutError:
            self._process.kill()
            await self._process.wait()

        self._cancel_background_tasks()

    async def restart(self) -> None:
        """Stop the current process and start a fresh instance."""
        await self.stop()
        self._stdout_buffer.clear()
        self._stderr_buffer.clear()
        await self.start()

    async def wait_for_ready(self) -> None:
        """Block until the health check endpoint responds successfully."""
        if self._config.health_check_url is None:
            return

        while self.is_running:
            healthy = await self._check_health()
            if healthy:
                self._set_healthy(True)
                return
            await asyncio.sleep(self._config.health_check_interval_seconds)

    def _cancel_background_tasks(self) -> None:
        if self._monitor_task is not None:
            self._monitor_task.cancel()
            self._monitor_task = None
        for task in self._log_tasks:
            task.cancel()
        self._log_tasks.clear()

    async def _capture_stream(
        self, stream: asyncio.StreamReader, buffer: collections.deque[str], stream_name: str = "stdout"
    ) -> None:
        try:
            async for raw_line in stream:
                line = raw_line.decode(errors="replace").rstrip("\n")
                buffer.append(line)
                if self._on_log_line is not None:
                    self._on_log_line(stream_name, line)
        except asyncio.CancelledError:
            return

    async def _monitor(self) -> None:
        try:
            if self._process is None:
                return
            return_code = await self._process.wait()
            if self._on_unexpected_exit is not None:
                result = self._on_unexpected_exit(return_code)
                if asyncio.iscoroutine(result):
                    await result
        except asyncio.CancelledError:
            return

    async def _check_health(self) -> bool:
        if self._config.health_check_url is None:
            return True
        try:
            reader, writer = await asyncio.wait_for(
                asyncio.open_connection(
                    *self._parse_health_url(self._config.health_check_url)
                ),
                timeout=5,
            )
            request = f"GET {self._config.health_check_url} HTTP/1.0\r\nHost: localhost\r\n\r\n"
            writer.write(request.encode())
            await writer.drain()
            response = await asyncio.wait_for(reader.read(4096), timeout=5)
            writer.close()
            return b"200" in response
        except (OSError, asyncio.TimeoutError):
            return False

    def _set_healthy(self, healthy: bool) -> None:
        if healthy == self._healthy:
            return
        self._healthy = healthy
        if self._on_health_change is not None:
            self._on_health_change(healthy)

    @staticmethod
    def _parse_health_url(url: str) -> tuple[str, int]:
        stripped = url.replace("http://", "").replace("https://", "")
        host_port = stripped.split("/", 1)[0]
        if ":" in host_port:
            host, port_str = host_port.rsplit(":", 1)
            return host, int(port_str)
        return host_port, 80
