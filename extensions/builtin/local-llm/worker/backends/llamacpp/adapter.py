"""LlamaCppAdapter — manages a llama-server process via the SDK ManagedProcess."""
from __future__ import annotations

import asyncio
import json
from pathlib import Path
from typing import Any, AsyncIterator

from nexus_sdk.process import ManagedProcess, ProcessConfig

from worker.backends.adapter import (
    BackendCapabilities,
    BackendHealthInfo,
    BackendKind,
    BackendStatus,
)
from worker.backends.llamacpp.config import LlamaCppConfig
from worker.backends.llamacpp.resolver import (
    ResolvedAsset,
    locate_server_binary,
    resolve_asset,
)


class LlamaCppAdapter:
    """Wraps llama-server behind the BackendAdapter protocol.

    Lifecycle is driven entirely by ManagedProcess from the SDK.
    HTTP calls to /v1/chat/completions handle inference.
    """

    def __init__(
        self,
        install_dir: Path,
        manifest: dict[str, Any],
        log_callback: Any | None = None,
    ) -> None:
        self._install_dir = install_dir
        self._manifest = manifest
        self._process: ManagedProcess | None = None
        self._config: LlamaCppConfig = LlamaCppConfig()
        self._status = BackendStatus.STOPPED
        self._loaded_model: str | None = None
        self._log_callback = log_callback

    @property
    def kind(self) -> BackendKind:
        return BackendKind.LLAMA_CPP

    @property
    def status(self) -> BackendStatus:
        return self._status

    async def start(self, model_path: str, config: dict[str, Any]) -> None:
        """Spawn llama-server for the given model file."""
        if self._status in (BackendStatus.READY, BackendStatus.STARTING):
            return

        self._status = BackendStatus.STARTING
        self._config = LlamaCppConfig.from_dict(config)

        asset = resolve_asset(self._manifest)
        server_bin = locate_server_binary(self._install_dir, asset.server_binary_name)

        cli_args = self._config.to_cli_args(model_path, str(server_bin))

        proc_config = ProcessConfig(
            command=cli_args,
            health_check_url=self._config.health_url,
            health_check_interval_seconds=2,
            shutdown_timeout_seconds=15,
        )

        self._process = ManagedProcess(proc_config)
        self._process.on_unexpected_exit(self._on_crash)
        self._process.on_health_change(self._on_health_transition)
        if self._log_callback is not None:
            self._process.on_log_line(self._log_callback)

        await self._process.start()
        await self._process.wait_for_ready()
        self._loaded_model = model_path
        self._status = BackendStatus.READY

    async def stop(self) -> None:
        """Gracefully terminate llama-server."""
        if self._process is None:
            return
        self._status = BackendStatus.STOPPING
        await self._process.stop()
        self._process = None
        self._status = BackendStatus.STOPPED
        self._loaded_model = None

    async def health(self) -> BackendHealthInfo:
        """Query llama-server /health and normalize the response."""
        if self._process is None or not self._process.is_running:
            return BackendHealthInfo(status=self._status)

        try:
            raw = await self._http_get("/health")
            data = json.loads(raw)
            return BackendHealthInfo(
                status=BackendStatus.READY,
                model_loaded=self._loaded_model,
                uptime_seconds=self._process.uptime,
                slots_available=data.get("slots_idle", 0),
                slots_total=data.get("slots", 0),
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
        """Streaming chat completion, yields parsed SSE data chunks."""
        body = self._build_chat_body(messages, params, stream=True)
        async for chunk in self._http_post_stream("/v1/chat/completions", body):
            yield chunk

    async def embeddings(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings via POST /v1/embeddings."""
        body = json.dumps({"input": texts}).encode()
        raw = await self._http_post("/v1/embeddings", body)
        data = json.loads(raw)
        return [item["embedding"] for item in data.get("data", [])]

    def capabilities(self) -> BackendCapabilities:
        return BackendCapabilities(
            chat_completion=True,
            embeddings=True,
            streaming=True,
            max_context_length=self._config.ctx_size,
            supported_quantizations=(
                "Q4_K_M", "Q4_K_S", "Q5_K_M", "Q5_K_S",
                "Q6_K", "Q8_0", "F16", "F32",
            ),
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
        stop = params.get("stop_sequences")
        if stop:
            payload["stop"] = stop
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
