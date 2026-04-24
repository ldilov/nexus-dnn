"""RPC handlers factored out of main.py.

Wires up every Phase-4 method (`handshake`, `health`, `ensure_model`,
`load_model`, `unload_model`, `cancel`, `synthesize`, `synthesize_batch`)
onto an existing ``Worker`` instance. Importable without IndexTTS so the
intrinsic handlers still work on CPU-only CI.
"""

from __future__ import annotations

import time
from typing import Any

from . import __version__
from .cancellation import GLOBAL_TOKEN
from .main import ProtocolVersion, Worker
from .model_loader import (
    ModelLoadFailedError,
    ModelMissingError,
    handle_ensure_model,
    handle_unload_model,
    orchestrate_load,
)
from .rpc import ErrorCodes, Methods, error_response


DEFAULT_HANDSHAKE_PROTOCOL = ProtocolVersion


def register_phase4_handlers(
    worker: Worker,
    *,
    runtime_id: str = "indextts.python",
    adapter: Any | None = None,
    synthesis: Any | None = None,
) -> None:
    start_time = time.time()

    async def handshake(params: Any) -> dict[str, Any]:
        client_version = params.get("protocol_version") if isinstance(params, dict) else None
        if client_version and client_version != DEFAULT_HANDSHAKE_PROTOCOL:
            raise HandshakeProtocolMismatch(
                expected=DEFAULT_HANDSHAKE_PROTOCOL,
                received=str(client_version),
            )
        return {
            "protocol_version": DEFAULT_HANDSHAKE_PROTOCOL,
            "worker_version": __version__,
            "runtime_id": runtime_id,
            "python_version": _python_version(),
            "torch_version": _optional_import_version("torch"),
            "cuda_available": _cuda_available(),
            "device": _active_device(),
            "model_family_id": "huggingface/IndexTeam/IndexTTS-2",
            "model_present": adapter is not None and getattr(adapter, "_model", None) is not None,
            "capabilities": [
                "tts.synthesis",
                "tts.emotion.audio_ref",
                "tts.emotion.vector",
                "tts.emotion.text_qwen",
                "audio.export.wav",
                "audio.export.mp3",
                "audio.export.flac",
                "streaming.unsupported_v1",
            ],
        }

    async def health(_: Any) -> dict[str, Any]:
        vram_used, vram_total = _vram_usage()
        model_loaded = adapter is not None and getattr(adapter, "_model", None) is not None
        return {
            "state": "ready" if model_loaded else "starting",
            "uptime_seconds": int(time.time() - start_time),
            "vram_used_mb": vram_used,
            "vram_total_mb": vram_total,
            "model_loaded": model_loaded,
            "last_error_category": None,
        }

    async def ensure_model(params: Any) -> dict[str, Any]:
        try:
            return handle_ensure_model(params if isinstance(params, dict) else {})
        except ModelMissingError as exc:
            raise _RpcErrorProxy(exc.rpc_error()) from exc

    async def load_model(params: Any) -> dict[str, Any]:
        if adapter is None:
            raise ModelLoadFailedError("adapter is not configured")
        include_qwen = bool(params.get("include_qwen", True)) if isinstance(params, dict) else True
        try:
            return orchestrate_load(
                adapter_ensure=adapter.ensure_model,
                emit=worker._emit_sync,
                include_qwen=include_qwen,
            )
        except ModelLoadFailedError as exc:
            raise _RpcErrorProxy(exc.rpc_error()) from exc

    async def unload_model(_: Any) -> dict[str, Any]:
        if adapter is not None:
            adapter.unload()
        return handle_unload_model()

    async def cancel(params: Any) -> dict[str, Any]:
        request_id = str(params.get("request_id", "")) if isinstance(params, dict) else ""
        if not request_id:
            raise ValueError("request_id is required")
        cancelled = GLOBAL_TOKEN.cancel(request_id)
        return {"request_id": request_id, "cancel_acked": cancelled}

    worker.register(Methods.HANDSHAKE, handshake)
    worker.register(Methods.HEALTH, health)
    worker.register("ensure_model", ensure_model)
    worker.register("load_model", load_model)
    worker.register(Methods.MODEL_UNLOAD, unload_model)
    worker.register(Methods.CANCEL, cancel)

    if synthesis is not None:
        async def synthesize_batch(params: Any) -> dict[str, Any]:
            if not isinstance(params, dict):
                raise ValueError("synthesize.batch params must be an object")
            return synthesis.handle_synthesize_batch(params)

        async def synthesize(params: Any) -> dict[str, Any]:
            if not isinstance(params, dict):
                raise ValueError("synthesize params must be an object")
            return synthesis.handle_synthesize(params)

        worker.register(Methods.SYNTHESIZE_BATCH, synthesize_batch)
        worker.register(Methods.SYNTHESIZE, synthesize)


class HandshakeProtocolMismatch(Exception):
    def __init__(self, *, expected: str, received: str) -> None:
        super().__init__(f"expected protocol {expected}, got {received}")
        self.expected = expected
        self.received = received


class _RpcErrorProxy(Exception):
    def __init__(self, rpc_error: dict[str, Any]) -> None:
        super().__init__(rpc_error.get("message", "rpc error"))
        self.rpc_error = rpc_error


def _python_version() -> str:
    import sys

    return f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"


def _optional_import_version(module: str) -> str:
    try:
        mod = __import__(module)
    except ImportError:
        return ""
    return str(getattr(mod, "__version__", ""))


def _cuda_available() -> bool:
    try:
        import torch

        return bool(torch.cuda.is_available())
    except ImportError:
        return False


def _active_device() -> str:
    try:
        import torch

        if torch.cuda.is_available():
            return f"cuda:{torch.cuda.current_device()}"
    except ImportError:
        pass
    return "cpu"


def _vram_usage() -> tuple[int, int]:
    try:
        import torch

        if torch.cuda.is_available():
            used = torch.cuda.memory_allocated() // (1024 * 1024)
            total = torch.cuda.get_device_properties(0).total_memory // (1024 * 1024)
            return int(used), int(total)
    except (ImportError, RuntimeError):
        pass
    return 0, 0
