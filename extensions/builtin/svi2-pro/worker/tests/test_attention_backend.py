import types

import pytest

torch = pytest.importorskip("torch")
import svi2_video_worker.attention_backend as ab
from svi2_video_worker.attention_backend import (
    FLASH_AVAILABLE,
    SAGE3_AVAILABLE,
    FLASH3_AVAILABLE,
    attention_capabilities,
    scaled_attention,
    set_attention_override,
)


def _fake_q(dtype=torch.float16, is_cuda=True, seq=64):
    return types.SimpleNamespace(is_cuda=is_cuda, dtype=dtype, shape=(1, 8, seq, 40))


def test_sdpa_path_shape():
    q = torch.randn(1, 8, 64, 40)
    k = torch.randn(1, 8, 64, 40)
    v = torch.randn(1, 8, 64, 40)
    out = scaled_attention(q, k, v, force_sdpa=True)
    assert out.shape == q.shape


def test_availability_flags_are_bool():
    assert isinstance(FLASH_AVAILABLE, bool)
    assert isinstance(SAGE3_AVAILABLE, bool)
    assert isinstance(FLASH3_AVAILABLE, bool)


def test_legacy_aliases_map_to_registry():
    for legacy in ("flash", "flash3", "sage", "sage3"):
        assert ab._ALIASES[legacy] in ab._REGISTRY


def test_requested_reads_env_and_aliases(monkeypatch):
    monkeypatch.setenv("SVI2_ATTENTION", "FLASH")
    assert ab._requested() == "flash2"
    monkeypatch.setenv("SVI2_ATTENTION", "sage")
    assert ab._requested() == "sage2"
    monkeypatch.delenv("SVI2_ATTENTION", raising=False)
    assert ab._requested() == "auto"


def test_cpu_tensor_always_sdpa():
    spec, reason = ab._resolve("sage2", _fake_q(is_cuda=False))
    assert spec.name == "sdpa"


def _set_available(spec, value):
    """Mutate a frozen BackendSpec.available, returning a restore callback."""
    original = spec.available
    object.__setattr__(spec, "available", value)
    return lambda: object.__setattr__(spec, "available", original)


def test_sage3_requires_bf16(monkeypatch):
    spec = ab._REGISTRY["sage3_fp4"]
    monkeypatch.setattr(ab, "_SM", (12, 0))
    monkeypatch.setattr(ab, "TRITON_AVAILABLE", True)
    restore = _set_available(spec, True)
    try:
        assert ab._is_usable(spec, torch.float16) is not None  # fp16 rejected
        assert ab._is_usable(spec, torch.bfloat16) is None  # bf16 ok
    finally:
        restore()


def test_sage3_arch_gated_below_blackwell(monkeypatch):
    spec = ab._REGISTRY["sage3_fp4"]
    monkeypatch.setattr(ab, "_SM", (8, 9))
    monkeypatch.setattr(ab, "TRITON_AVAILABLE", True)
    restore = _set_available(spec, True)
    try:
        assert ab._is_usable(spec, torch.bfloat16) is not None  # sm89 < sm120
    finally:
        restore()


def test_unavailable_backend_falls_back_non_strict(monkeypatch):
    spec = ab._REGISTRY["sage2"]
    monkeypatch.setattr(ab, "_SM", (12, 0))
    monkeypatch.delenv("SVI2_ATTENTION_STRICT", raising=False)
    restore = _set_available(spec, False)
    try:
        resolved, reason = ab._resolve("sage2", _fake_q(dtype=torch.bfloat16))
        assert resolved.name == "sdpa"
        assert "fallback" in reason
    finally:
        restore()


def test_strict_mode_raises_on_unavailable(monkeypatch):
    spec = ab._REGISTRY["sage2"]
    monkeypatch.setattr(ab, "_SM", (12, 0))
    monkeypatch.setenv("SVI2_ATTENTION_STRICT", "1")
    restore = _set_available(spec, False)
    try:
        with pytest.raises(RuntimeError):
            ab._resolve("sage2", _fake_q(dtype=torch.bfloat16))
    finally:
        restore()


def test_auto_chain_prefers_flash_then_sdpa(monkeypatch):
    monkeypatch.setattr(ab, "_SM", (12, 0))
    flash = ab._REGISTRY["flash2"]
    restore = _set_available(flash, True)
    try:
        spec, reason = ab._resolve("auto", _fake_q())
        assert spec.name == "flash2"
        assert reason == "auto"
    finally:
        restore()

    restore = _set_available(flash, False)
    try:
        spec, reason = ab._resolve("auto", _fake_q())
        assert spec.name == "sdpa"
    finally:
        restore()


def test_unknown_backend_non_strict_sdpa(monkeypatch):
    monkeypatch.delenv("SVI2_ATTENTION_STRICT", raising=False)
    spec, reason = ab._resolve("nonsense", _fake_q())
    assert spec.name == "sdpa"
    assert "unknown" in reason


_EXPECTED_ORDER = ("sdpa", "flash2", "flash3_fp4", "sage2", "sage3_fp4")


def test_attention_capabilities_shape():
    caps = attention_capabilities()
    assert "sm" in caps and isinstance(caps["sm"], list) and len(caps["sm"]) == 2
    assert "cuda_available" in caps and isinstance(caps["cuda_available"], bool)
    assert "default" in caps
    assert "auto_chain" in caps and isinstance(caps["auto_chain"], list)
    assert "backends" in caps
    ids = [b["id"] for b in caps["backends"]]
    assert ids == list(_EXPECTED_ORDER)


def test_attention_capabilities_backend_fields():
    caps = attention_capabilities()
    for b in caps["backends"]:
        assert "id" in b
        assert "installed" in b and isinstance(b["installed"], bool)
        assert "supported" in b and isinstance(b["supported"], bool)
        assert "min_arch" in b and isinstance(b["min_arch"], list) and len(b["min_arch"]) == 2
        assert "needs_triton" in b and isinstance(b["needs_triton"], bool)
        assert "bf16_only" in b and isinstance(b["bf16_only"], bool)


def test_attention_capabilities_unsupported_has_reason(monkeypatch):
    monkeypatch.setattr(ab, "_SM", (0, 0))
    caps = attention_capabilities()
    non_sdpa = [b for b in caps["backends"] if b["id"] != "sdpa"]
    for b in non_sdpa:
        assert b["supported"] is False
        assert b["reason"] is not None and len(b["reason"]) > 0


def test_attention_capabilities_sdpa_always_supported(monkeypatch):
    monkeypatch.setattr(ab, "_SM", (0, 0))
    caps = attention_capabilities()
    sdpa = next(b for b in caps["backends"] if b["id"] == "sdpa")
    assert sdpa["supported"] is True
    assert sdpa["reason"] is None


def test_set_attention_override_takes_priority_over_env(monkeypatch):
    monkeypatch.setenv("SVI2_ATTENTION", "sdpa")
    monkeypatch.setattr(ab, "_ATTENTION_OVERRIDE", None)
    assert ab._requested() == "sdpa"
    set_attention_override("sage2")
    assert ab._requested() == "sage2"
    set_attention_override(None)
    assert ab._requested() == "sdpa"


def test_set_attention_override_none_restores_env_fallback(monkeypatch):
    monkeypatch.delenv("SVI2_ATTENTION", raising=False)
    monkeypatch.setattr(ab, "_ATTENTION_OVERRIDE", None)
    set_attention_override("flash2")
    assert ab._requested() == "flash2"
    set_attention_override(None)
    assert ab._requested() == "auto"


def test_set_attention_override_empty_string_treated_as_none(monkeypatch):
    monkeypatch.delenv("SVI2_ATTENTION", raising=False)
    monkeypatch.setattr(ab, "_ATTENTION_OVERRIDE", None)
    set_attention_override("")
    assert ab._ATTENTION_OVERRIDE is None
