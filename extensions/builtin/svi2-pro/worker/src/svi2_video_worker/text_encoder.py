"""UMT5-XXL text encoder wrapper with CPU/GPU offload toggles. Model load is lazy (deferred to GPU integration, Task 3.6)."""

from __future__ import annotations

from pathlib import Path
from typing import Any


class TextEncoderWrapper:
    def __init__(self, weights_path: str | Path, device: str = "cpu") -> None:
        self.weights_path = Path(weights_path)
        self.device = device
        self._model: Any = None

    def _ensure_loaded(self) -> None:
        raise NotImplementedError(
            "Text encoder model load wired in GPU integration (Task 2.5/3.6)"
        )

    def encode_text(self, prompt: str) -> Any:
        self._ensure_loaded()
        return self._model.encode(prompt)

    def to_cpu(self) -> "TextEncoderWrapper":
        self.device = "cpu"
        if self._model is not None:
            import torch
            self._model = self._model.to(torch.device("cpu"))
        return self

    def to_cuda(self) -> "TextEncoderWrapper":
        self.device = "cuda"
        if self._model is not None:
            import torch
            self._model = self._model.to(torch.device("cuda"))
        return self
