"""Unit tests for `_resolve_use_cuda_kernel`.

The function decides whether IndexTTS2 should attempt to JIT-build
BigVGAN's `anti_alias_activation_cuda` kernel. Auto-detect mode
(`requested=None`) checks `nvcc` on PATH; explicit True/False is
passed through. Without these checks, machines with PyTorch CUDA but
no CUDA Toolkit produce a noisy
`RuntimeError("Error building extension 'anti_alias_activation_cuda'")`
during model load.
"""

from __future__ import annotations

from unittest.mock import patch

from emotion_tts_worker.indextts_adapter import _resolve_use_cuda_kernel


def test_explicit_true_is_respected() -> None:
    with patch("shutil.which", return_value=None):
        assert _resolve_use_cuda_kernel(True) is True


def test_explicit_false_is_respected() -> None:
    with patch("shutil.which", return_value="/usr/local/cuda/bin/nvcc"):
        assert _resolve_use_cuda_kernel(False) is False


def test_auto_returns_true_when_nvcc_available() -> None:
    with patch("shutil.which", return_value="/usr/local/cuda/bin/nvcc"):
        assert _resolve_use_cuda_kernel(None) is True


def test_auto_returns_false_when_nvcc_missing() -> None:
    with patch("shutil.which", return_value=None):
        assert _resolve_use_cuda_kernel(None) is False
