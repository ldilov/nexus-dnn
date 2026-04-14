"""TensorRtAdapter — manages a trtllm-serve process via the SDK ManagedProcess."""
from __future__ import annotations

import asyncio
import json
from typing import Any, AsyncIterator

from nexus_sdk.process import ManagedProcess, ProcessConfig

from worker.backends.adapter import (
    BackendCapabilities,
    BackendHealthInfo,
    BackendKind,
    BackendStatus,
)
from worker.backends.tensorrt.config import TensorRtConfig


class TensorRtAdapter:
    """Wraps trtllm-serve behind the BackendAdapter protocol.

    Requires a Python environment with tensorrt_llm installed.
    The host provisions this env via the runtime.environment manifest section;
    this adapter just spawns the serve command inside it.
    """

    def __init__(self, python_executable: str | None = None) -> None:
        self._python_executable = python_executable or "python"
        self._process: ManagedProcess | None = None
        self._config: TensorRtConfig = TensorRtConfig()
        self._status = BackendStatus.STOPPED
        self._loaded_model: str | None = None

    @property
    def kind(self) -> BackendKind:
        return BackendKind.TENSORRT

    @property
    def status(self) -> BackendStatus:
        return self._status

    async def start(self, model_path: str, config: dict[str, Any]) -> None:
        """Spawn trtllm-serve for the given model."""
        if self._status in (BackendStatus.READY, BackendStatus.STARTING):
            return

        self._status = BackendStatus.STARTING
        self._config = TensorRtConfig.from_dict(config)

        cli_args = self._config.to_cli_args(model_path)
        command = [self._python_executable, "-m"] + cli_args

        proc_config = ProcessConfig(
            command=command,
            health_check_url=self._config.health_url,
            health_check_interval_seconds=5,
            shutdown_timeout_seconds=30,
        )

        self._process = ManagedProcess(proc_config)
        self._process.on_unexpected_exit(self._on_crash)
        self._process.on_health_change(self._on_health_transition)

        await self._process.start()
        await self._process.wait_for_ready()
        self._loaded_model = model_path
        self._status = BackendStatus.READY

    async def stop(self) -> None:
        """Gracefully terminate trtllm-serve."""
        if self._process is None:
            return
        self._status = BackendStatus.STOPPING
        await self._process.stop()
        self._process = None
        self._status = BackendStatus.STOPPED
        self._loaded_model = None

    async def health(self) -> BackendHealthInfo:
        """Query trtllm-serve /health and normalize."""
        if self._process is None or not self._process.is_running:
            return BackendHealthInfo(status=self._status)

        try:
            raw = await self._http_get("/health")
            return BackendHealthInfo(
                status=BackendStatus.READY,
                model_loaded=self._loaded_model,
                uptime_seconds=self._process.uptime,
            )
        except Exception as exc:
            return BackendHealthInfo(
                status=BackendStatus.FAILED,
                error=str(exc),
            )

    async def chat(
        self, messages: list[dict[str, str]], params: dict[str, Any]
    ) -> dict[str, Any]:
        """Non-streaming chat completion via POST /v1/chat/completions."""
        body = self._build_chat_body(messages, params, stream=False)
        raw = await self._http_post("/v1/chat/completions", body)
        return json.loads(raw)

    async def chat_stream(
        self, messages: list[dict[str, str]], params: dict[str, Any]
    ) -> AsyncIterator[dict[str, Any]]:
        """Streaming chat completion yielding parsed SSE data chunks."""
        body = self._build_chat_body(messages, params, stream=True)
        async for chunk in self._http_post_stream("/v1/chat/completions", body):
            yield chunk

    async def embeddings(self, texts: list[str]) -> list[list[float]]:
        """TensorRT-LLM does not natively expose an embeddings endpoint."""
        raise NotImplementedError(
            "TensorRT-LLM backend does not support embeddings. "
            "Use the llama.cpp backend for embedding operations."
        )

    def capabilities(self) -> BackendCapabilities:
        return BackendCapabilities(
            chat_completion=True,
            embeddings=False,
            streaming=True,
            max_context_length=self._config.max_input_len + self._config.max_output_len,
            supported_quantizations=("FP16", "FP8", "INT8", "INT4"),
        )

    def _build_chat_body(
        self,
        messages: list[dict[str, str]],
        params: dict[str, Any],
        stream: bool,
    ) -> bytes:
        payload: dict[str, Any] = {
            "messages": messages,
            "stream": stream,
            "temperature": params.get("temperature", 0.8),
            "top_p": params.get("top_p", 0.95),
        }
        max_tokens = params.get("max_tokens")
        if max_tokens is not None:
            payload["max_tokens"] = max_tokens
        return json.dumps(payload).encode()

    async def _http_get(self, path: str) -> str:
        reader, writer = await asyncio.open_connection(
            self._config.host, self._config.port
        )
        request = f"GET {path} HTTP/1.1\r\nHost: {self._config.host}\r\n\r\n"
        writer.write(request.encode())
        await writer.drain()
        response = await reader.read(65536)
        writer.close()
        await writer.wait_closed()
        return self._extract_body(response.decode(errors="replace"))

    async def _http_post(self, path: str, body: bytes) -> str:
        reader, writer = await asyncio.open_connection(
            self._config.host, self._config.port
        )
        header = (
            f"POST {path} HTTP/1.1\r\n"
            f"Host: {self._config.host}\r\n"
            f"Content-Type: application/json\r\n"
            f"Content-Length: {len(body)}\r\n"
            f"\r\n"
        )
        writer.write(header.encode() + body)
        await writer.drain()
        response = await reader.read(1 << 20)
        writer.close()
        await writer.wait_closed()
        return self._extract_body(response.decode(errors="replace"))

    async def _http_post_stream(
        self, path: str, body: bytes
    ) -> AsyncIterator[dict[str, Any]]:
        reader, writer = await asyncio.open_connection(
            self._config.host, self._config.port
        )
        header = (
            f"POST {path} HTTP/1.1\r\n"
            f"Host: {self._config.host}\r\n"
            f"Content-Type: application/json\r\n"
            f"Content-Length: {len(body)}\r\n"
            f"\r\n"
        )
        writer.write(header.encode() + body)
        await writer.drain()

        headers_done = False
        buffer = b""
        try:
            while True:
                chunk = await reader.read(4096)
                if not chunk:
                    break
                buffer += chunk

                if not headers_done:
                    header_end = buffer.find(b"\r\n\r\n")
                    if header_end == -1:
                        continue
                    buffer = buffer[header_end + 4:]
                    headers_done = True

                lines = buffer.split(b"\n")
                buffer = lines.pop()

                for line in lines:
                    text = line.decode(errors="replace").strip()
                    if not text.startswith("data: "):
                        continue
                    data_str = text[6:]
                    if data_str == "[DONE]":
                        return
                    yield json.loads(data_str)
        finally:
            writer.close()
            await writer.wait_closed()

    @staticmethod
    def _extract_body(raw_response: str) -> str:
        parts = raw_response.split("\r\n\r\n", 1)
        return parts[1] if len(parts) > 1 else raw_response

    def _on_crash(self, exit_code: int | None) -> None:
        self._status = BackendStatus.FAILED

    def _on_health_transition(self, healthy: bool) -> None:
        if healthy:
            self._status = BackendStatus.READY
        elif self._status == BackendStatus.READY:
            self._status = BackendStatus.FAILED
