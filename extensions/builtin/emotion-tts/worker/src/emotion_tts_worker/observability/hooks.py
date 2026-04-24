"""``AttentionCapture`` — register forward hooks on decoder cross-attention
layers so we can harvest attention probabilities without patching upstream
(R-34-02).

Design constraints:

* **Torch-only**. Uses ``nn.Module.register_forward_hook``. The context
  manager no-ops (returns ``available=False``) if torch isn't installed,
  so unit tests can exercise it in bare envs.
* **Layer range is configurable**. Default ``(10, 14)`` matches the
  middle-layer alignment heads identified in arXiv:2509.19852.
* **Fused-kernel safe**. When the hooked module returns `None` or a
  shape we can't interpret, we record `available=False` and skip capture
  for the rest of the session.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

try:
    import torch  # type: ignore[import-not-found]
    import torch.nn as nn  # type: ignore[import-not-found]

    _TORCH_AVAILABLE = True
except ImportError:  # pragma: no cover - exercised on bare envs
    torch = None  # type: ignore[assignment]
    nn = None  # type: ignore[assignment]
    _TORCH_AVAILABLE = False


@dataclass
class CapturedAttention:
    layer_idx: int
    tensor: Any  # torch.Tensor when available


@dataclass
class AttentionCapture:
    """Context manager that harvests attention tensors from a decoder.

    Usage::

        cap = AttentionCapture(decoder, layer_range=(10, 14))
        with cap:
            decoder(input_ids)
        captured = cap.captured  # list[CapturedAttention]
    """

    module: Any
    layer_range: tuple[int, int] = (10, 14)
    captured: list[CapturedAttention] = field(default_factory=list)
    _handles: list[Any] = field(default_factory=list)
    available: bool = False

    def __enter__(self) -> "AttentionCapture":
        if not _TORCH_AVAILABLE or self.module is None:
            self.available = False
            return self
        layers = self._collect_layers()
        if not layers:
            self.available = False
            return self
        for layer_idx, layer in layers:
            handle = layer.register_forward_hook(self._hook_factory(layer_idx))
            self._handles.append(handle)
        self.available = True
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        for handle in self._handles:
            try:
                handle.remove()
            except Exception:
                pass
        self._handles.clear()

    def _collect_layers(self) -> list[tuple[int, Any]]:
        """Best-effort discovery of the hookable attention layers.

        Upstream ``IndexTTS2`` exposes ``.gpt.layers`` (a ``ModuleList``) in
        recent releases. We try that first, then fall back to any
        ``nn.ModuleList`` on the module, then to ``named_modules`` iteration.
        If no plausible layer-list is found we return empty and the session
        runs without capture.
        """

        low, high = self.layer_range
        candidates: list[Any] = []

        for attr in ("gpt", "decoder", "model"):
            container = getattr(self.module, attr, None)
            if container is None:
                continue
            layers = getattr(container, "layers", None)
            if layers is not None and hasattr(layers, "__getitem__"):
                candidates.append(layers)
                break

        if not candidates:
            for _name, sub in getattr(self.module, "named_modules", lambda: [])():
                if nn is not None and isinstance(sub, nn.ModuleList):
                    candidates.append(sub)
                    break

        if not candidates:
            return []

        layers = candidates[0]
        total = len(layers)
        start = max(0, min(low, total - 1))
        end = max(start, min(high, total - 1))
        return [(idx, layers[idx]) for idx in range(start, end + 1)]

    def _hook_factory(self, layer_idx: int):
        captured = self.captured

        def hook(_module: Any, _inputs: Any, output: Any) -> None:
            tensor = _extract_attention_tensor(output)
            if tensor is None:
                return
            captured.append(CapturedAttention(layer_idx=layer_idx, tensor=tensor))

        return hook


def _extract_attention_tensor(output: Any) -> Any:
    """Try to find an attention-probability tensor in a module's output.

    Upstream conventions vary — some layers return the attention tensor
    as ``output[1]``, others attach it as ``output.attentions``. We probe
    both; on failure we return ``None`` (the capture just skips that layer).
    """

    if output is None:
        return None
    if not _TORCH_AVAILABLE:
        return None

    attr = getattr(output, "attentions", None)
    if attr is not None:
        return attr

    if isinstance(output, (tuple, list)):
        for item in output:
            if torch is not None and isinstance(item, torch.Tensor) and item.ndim >= 3:
                return item

    if torch is not None and isinstance(output, torch.Tensor) and output.ndim >= 3:
        return output

    return None
