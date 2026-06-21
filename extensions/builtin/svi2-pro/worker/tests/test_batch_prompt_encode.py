"""batch-prompt-encode #1 + the both-flags-off regression guard.

Off-path tests run without torch by faking the text encoder. The numerical
batched-vs-loop equality test needs a real UMT5 forward and is skipped when
torch is unavailable.
"""

import sys
import types

import pytest

from svi2_video_worker.pipeline_svi2 import _encode_prompts


class _FakeEncoder:
    """Records encode_text calls; returns a sentinel marking the prompt."""

    def __init__(self):
        self.calls = []

    def encode_text(self, prompt):
        self.calls.append(prompt)
        return _FakeCpuTensor(f"ctx::{prompt}")


class _FakeDevice:
    type = "cpu"


class _FakeCpuTensor:
    """Stands in for a torch tensor: not CUDA, so _to_pinned_cpu copies it."""

    device = _FakeDevice()

    def __init__(self, tag):
        self.tag = tag

    def to(self, *a, **k):
        return self  # already 'cpu'

    def detach(self):
        return self

    def clone(self):
        return _FakeCpuTensor(self.tag)


@pytest.fixture
def fake_torch_for_pinned(monkeypatch):
    # _to_pinned_cpu imports torch and checks isinstance(t, torch.Tensor); the
    # fake tensor reports a cpu device so it returns t.to("cpu") unchanged.
    fake = types.ModuleType("torch")
    fake.Tensor = _FakeCpuTensor
    monkeypatch.setitem(sys.modules, "torch", fake)


def test_off_path_calls_encode_text_per_prompt_with_negative(fake_torch_for_pinned):
    enc = _FakeEncoder()
    unique = ["a", "b"]
    ctx, neg = _encode_prompts(
        enc, unique, "neg", cfg_scale=5.0, batch_prompt_encode=False, device="cpu"
    )
    # one forward per unique prompt + one for the negative
    assert enc.calls == ["a", "b", "neg"]
    assert set(ctx.keys()) == {"a", "b"}
    assert ctx["a"].tag == "ctx::a"
    assert neg.tag == "ctx::neg"


def test_off_path_skips_negative_when_cfg_is_one(fake_torch_for_pinned):
    enc = _FakeEncoder()
    ctx, neg = _encode_prompts(
        enc, ["a"], "neg", cfg_scale=1.0, batch_prompt_encode=False, device="cpu"
    )
    assert enc.calls == ["a"]  # negative NOT encoded when cfg_scale == 1.0
    assert neg is None


# --- numerical equality (needs a real UMT5 forward) -------------------------

try:
    import torch as _torch  # noqa: F401

    _HAS_TORCH = True
except Exception:  # pragma: no cover - exercised only where torch is absent
    _HAS_TORCH = False


def _build_tiny_text_encoder():
    from svi2_video_worker.wan22.text_encoder_model import WanTextEncoder

    cfg = dict(
        vocab=64, dim=16, dim_attn=16, dim_ffn=32, num_heads=2, num_layers=2,
        num_buckets=8, shared_pos=False, dropout=0.0,
    )
    return WanTextEncoder(**cfg).eval(), cfg


class _ListTokenizer:
    """Deterministic toy tokenizer: maps chars to ids, pads list[str] to L=8."""

    L = 8

    def __call__(self, seqs, return_mask=False, add_special_tokens=True):
        import torch as t

        if isinstance(seqs, str):
            seqs = [seqs]
        ids = t.zeros(len(seqs), self.L, dtype=t.long)
        mask = t.zeros(len(seqs), self.L, dtype=t.long)
        for r, s in enumerate(seqs):
            toks = [(ord(c) % 60) + 1 for c in s][: self.L]
            for c, tok in enumerate(toks):
                ids[r, c] = tok
                mask[r, c] = 1
        return (ids, mask) if return_mask else ids


@pytest.mark.skipif(not _HAS_TORCH, reason="batched-encode equality needs torch")
def test_batched_encode_matches_per_prompt_loop():
    import torch as t

    from svi2_video_worker.text_encoder import TextEncoderWrapper

    model, _ = _build_tiny_text_encoder()
    tok = _ListTokenizer()

    wrapper = TextEncoderWrapper(weights_path="unused")
    wrapper._model = model
    wrapper._tokenizer = tok
    wrapper.device = "cpu"

    prompts = ["alpha", "bravo", "charlie"]

    loop_ctx, loop_neg = _encode_prompts(
        wrapper, prompts, "negative", cfg_scale=5.0,
        batch_prompt_encode=False, device="cpu",
    )
    batch_ctx, batch_neg = _encode_prompts(
        wrapper, prompts, "negative", cfg_scale=5.0,
        batch_prompt_encode=True, device="cpu",
    )

    for p in prompts:
        assert t.allclose(loop_ctx[p], batch_ctx[p], atol=1e-5), f"mismatch for {p}"
    assert t.allclose(loop_neg, batch_neg, atol=1e-5)
