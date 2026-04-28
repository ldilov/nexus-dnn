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
    probe_model_dir,
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
            mismatch = HandshakeProtocolMismatch(
                expected=DEFAULT_HANDSHAKE_PROTOCOL,
                received=str(client_version),
            )
            raise _RpcErrorProxy(mismatch.rpc_error()) from mismatch
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
        # Cheap precheck: confirm every required file is on disk before
        # diving into IndexTTS2's internal load (which buries missing-file
        # errors under a torch stack trace). Surfaces a structured
        # `model_missing` envelope to the host instead of an opaque
        # `model_load_failed`.
        presence = probe_model_dir(adapter._settings.model_dir_abs)
        if not presence.present:
            raise _RpcErrorProxy(ModelMissingError(presence.missing_files).rpc_error())
        include_qwen = bool(params.get("include_qwen", True)) if isinstance(params, dict) else True
        try:
            return orchestrate_load(
                adapter_ensure=adapter.ensure_model,
                emit=worker.emit,
                include_qwen=include_qwen,
            )
        except ModelLoadFailedError as exc:
            raise _RpcErrorProxy(exc.rpc_error()) from exc

    async def unload_model(_: Any) -> dict[str, Any]:
        freed_mb = adapter.unload() if adapter is not None else 0
        return handle_unload_model(vram_freed_mb=freed_mb)

    async def cancel(params: Any) -> dict[str, Any]:
        request_id = str(params.get("request_id", "")) if isinstance(params, dict) else ""
        if not request_id:
            raise ValueError("request_id is required")
        cancelled = GLOBAL_TOKEN.cancel(request_id)
        return {"request_id": request_id, "cancel_acked": cancelled}

    async def voice_preprocess(params: Any) -> dict[str, Any]:
        # No-op stub. The host's voice-asset upload flow calls
        # `voice.preprocess` after every successful upload to do optional
        # background work (loudness normalization, silence trimming, etc.).
        # IndexTTS-2 clones from raw audio just fine, so we skip the
        # preprocessing — but the host's caller still needs a structured
        # OK response, otherwise it logs a misleading warning every upload.
        request_id = (
            str(params.get("request_id", ""))
            if isinstance(params, dict)
            else ""
        )
        return {
            "request_id": request_id,
            "preprocessed": False,
            "skipped_reason": "preprocessing is a no-op for IndexTTS-2; raw audio works",
        }

    worker.register(Methods.HANDSHAKE, handshake, replace=True)
    worker.register(Methods.HEALTH, health, replace=True)
    worker.register(Methods.MODEL_LOAD, load_model)
    worker.register("model.ensure", ensure_model)
    worker.register(Methods.MODEL_UNLOAD, unload_model)
    worker.register(Methods.CANCEL, cancel)
    worker.register("voice.preprocess", voice_preprocess)

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


HANDSHAKE_PROTOCOL_MISMATCH_CODE = -32004


class HandshakeProtocolMismatch(Exception):
    def __init__(self, *, expected: str, received: str) -> None:
        super().__init__(f"expected protocol {expected}, got {received}")
        self.expected = expected
        self.received = received

    def rpc_error(self) -> dict[str, Any]:
        return {
            "code": HANDSHAKE_PROTOCOL_MISMATCH_CODE,
            "message": str(self),
            "data": {"expected": self.expected, "received": self.received},
        }


class _RpcErrorProxy(Exception):
    """Raised by handlers to emit a specific JSON-RPC error envelope with
    code + message + data. ``main.py::Worker._dispatch_line`` detects
    ``exc.rpc_error`` attribute and surfaces it verbatim.
    """

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
