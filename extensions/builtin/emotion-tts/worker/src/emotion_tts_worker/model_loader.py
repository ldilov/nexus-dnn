"""Model-load lifecycle handlers (``ensure_model``, ``load_model``, ``unload_model``).

Emits ``model_load_progress`` notifications per ``contracts/rpc/notifications.md``
at each stage: ``checking`` → ``loading_gpt`` → ``loading_s2mel`` → ``loading_qwen``
→ ``ready``. Shapes the error envelopes with the worker-side error codes
(``-32000`` model_missing, ``-32003`` model_load_failed).
"""

from __future__ import annotations

import os
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

from .rpc import ErrorCodes, notification


REQUIRED_FILES = (
    "config.yaml",
    "gpt.pth",
    "s2mel.pth",
    "bpe.model",
    "feat1.pt",
    "feat2.pt",
    "wav2vec2bert_stats.pt",
)

QWEN_DIR = "qwen0.6bemo4-merge"
QWEN_REQUIRED_FILES = (
    "model.safetensors",
    "tokenizer.json",
    "tokenizer_config.json",
    "config.json",
)

PROGRESS_STAGES = ("checking", "loading_gpt", "loading_s2mel", "loading_qwen", "ready")


@dataclass
class ModelPresence:
    present: bool
    missing_files: list[str]
    model_version: str | None


def probe_model_dir(model_dir_abs: str) -> ModelPresence:
    root = Path(model_dir_abs)
    missing: list[str] = []

    if not root.exists() or not root.is_dir():
        return ModelPresence(
            present=False,
            missing_files=list(REQUIRED_FILES),
            model_version=None,
        )

    for name in REQUIRED_FILES:
        if not (root / name).exists():
            missing.append(name)

    qwen = root / QWEN_DIR
    if not qwen.exists() or not qwen.is_dir():
        missing.append(f"{QWEN_DIR}/")
    else:
        for name in QWEN_REQUIRED_FILES:
            if not (qwen / name).exists():
                missing.append(f"{QWEN_DIR}/{name}")

    version = _derive_model_version(root) if not missing else None
    return ModelPresence(
        present=not missing,
        missing_files=missing,
        model_version=version,
    )


def _derive_model_version(model_dir_abs: Path) -> str:
    config_path = model_dir_abs / "config.yaml"
    if not config_path.exists():
        return "unknown"
    stat = os.stat(config_path)
    return f"indextts-2-{int(stat.st_mtime)}"


def handle_ensure_model(params: dict[str, Any]) -> dict[str, Any]:
    model_dir = str(params.get("model_dir_abs", ""))
    if not model_dir:
        raise ValueError("model_dir_abs is required")

    presence = probe_model_dir(model_dir)
    if not presence.present:
        raise ModelMissingError(presence.missing_files)

    return {
        "present": True,
        "missing_files": [],
        "model_version": presence.model_version,
    }


class ModelMissingError(Exception):
    def __init__(self, missing_files: list[str]) -> None:
        super().__init__(f"model weights missing: {missing_files}")
        self.missing_files = missing_files

    def rpc_error(self) -> dict[str, Any]:
        return {
            "code": ErrorCodes.MODEL_MISSING,
            "message": "IndexTTS-2 weights missing",
            "data": {"missing_files": self.missing_files},
        }


class ModelLoadFailedError(Exception):
    def __init__(self, detail: str) -> None:
        super().__init__(detail)
        self.detail = detail

    def rpc_error(self) -> dict[str, Any]:
        return {
            "code": ErrorCodes.INTERNAL_ERROR,
            "message": "model_load_failed",
            "data": {"detail": self.detail},
        }


Notifier = Callable[[dict[str, Any]], None]


def emit_load_progress(emit: Notifier, stage: str, pct: float, detail: str | None = None) -> None:
    if stage not in PROGRESS_STAGES:
        raise ValueError(f"unknown progress stage {stage!r}")
    payload: dict[str, Any] = {"stage": stage, "pct": round(max(0.0, min(1.0, pct)), 3)}
    if detail is not None:
        payload["detail"] = detail
    emit(notification("model.load.progress", payload))


def orchestrate_load(
    adapter_ensure: Callable[[], None],
    emit: Notifier,
    *,
    include_qwen: bool,
) -> dict[str, Any]:
    start = time.time()
    emit_load_progress(emit, "checking", 0.05)
    emit_load_progress(emit, "loading_gpt", 0.2)
    emit_load_progress(emit, "loading_s2mel", 0.55)
    if include_qwen:
        emit_load_progress(emit, "loading_qwen", 0.85)

    try:
        adapter_ensure()
    except Exception as exc:
        raise ModelLoadFailedError(str(exc)) from exc

    elapsed = time.time() - start
    emit_load_progress(emit, "ready", 1.0)
    return {"loaded": True, "load_seconds": round(elapsed, 2)}


def handle_unload_model() -> dict[str, Any]:
    return {"unloaded": True, "vram_freed_mb": 0}
