"""T050 — AttentionCapture context-manager unit tests (spec 034 R-34-02)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.observability.hooks import (
    AttentionCapture,
    _extract_attention_tensor,
)


torch_available = True
try:
    import torch  # type: ignore[import-not-found]
    import torch.nn as nn  # type: ignore[import-not-found]
except ImportError:
    torch_available = False

requires_torch = pytest.mark.skipif(not torch_available, reason="torch not installed")


@requires_torch
def test_captures_attention_from_stub_module_in_range():
    # Build a stub module exposing `.gpt.layers` — that's the first place
    # AttentionCapture probes for layers.
    num_layers = 20

    class Layer(nn.Module):
        def __init__(self, heads=3, text_len=8, frames=12):
            super().__init__()
            self.heads = heads
            self.text_len = text_len
            self.frames = frames

        def forward(self, x):
            # Return (hidden, attention) tuple — AttentionCapture's
            # _extract_attention_tensor looks for the first 3-D tensor.
            attn = torch.rand(self.heads, self.text_len, self.frames)
            attn = attn / attn.sum(dim=-1, keepdim=True)
            return x, attn

    class Gpt(nn.Module):
        def __init__(self):
            super().__init__()
            self.layers = nn.ModuleList([Layer() for _ in range(num_layers)])

        def forward(self, x):
            for layer in self.layers:
                x, _attn = layer(x)
            return x

    class Decoder(nn.Module):
        def __init__(self):
            super().__init__()
            self.gpt = Gpt()

        def forward(self, x):
            return self.gpt(x)

    decoder = Decoder()
    input_tensor = torch.zeros(1, 5)

    cap = AttentionCapture(decoder, layer_range=(10, 14))
    with cap:
        decoder(input_tensor)

    assert cap.available
    # The hook fires once per layer in range = 5 layers (10, 11, 12, 13, 14).
    assert len(cap.captured) == 5
    layer_indices = [c.layer_idx for c in cap.captured]
    assert layer_indices == [10, 11, 12, 13, 14]

    for entry in cap.captured:
        tensor = entry.tensor
        assert tensor.ndim == 3
        assert tensor.shape[0] == 3  # heads


@requires_torch
def test_no_op_when_no_layer_list_found():
    class Bare(nn.Module):
        def forward(self, x):
            return x

    mod = Bare()
    cap = AttentionCapture(mod, layer_range=(10, 14))
    with cap:
        mod(torch.zeros(1))
    assert cap.available is False
    assert cap.captured == []


def test_no_op_when_torch_not_available_or_module_none():
    # Passing `None` hits the early-exit path without needing torch.
    cap = AttentionCapture(None, layer_range=(10, 14))
    with cap:
        pass
    assert cap.available is False
    assert cap.captured == []


@requires_torch
def test_extract_attention_tensor_finds_named_attribute():
    class Output:
        def __init__(self, attn):
            self.attentions = attn

    attn = torch.rand(2, 4, 8)
    out = Output(attn)
    found = _extract_attention_tensor(out)
    assert found is attn


@requires_torch
def test_extract_attention_tensor_returns_none_for_scalar():
    assert _extract_attention_tensor(torch.tensor(1.0)) is None
