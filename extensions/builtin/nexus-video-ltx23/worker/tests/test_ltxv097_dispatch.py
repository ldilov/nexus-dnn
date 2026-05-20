"""GPU-free guards for the 0.9.7 dispatch/offload/upscale_mode surface."""

from __future__ import annotations

import logging
from types import SimpleNamespace
from typing import Any
from unittest.mock import MagicMock

import pytest

from ltx_video_worker import pipeline_ltxv097 as m


def _logger() -> Any:
    rec: list[tuple[str, dict]] = []
    ns = SimpleNamespace(
        records=rec,
        info=lambda *a, **k: rec.append((a[0] if a else "", dict(k))),
        error=lambda *a, **k: rec.append((a[0] if a else "", dict(k))),
    )
    return ns


def _saw(logger: Any, msg: str) -> bool:
    return any(m_ == msg for m_, _ in logger.records)


# --- _resolve_upscale_mode ---------------------------------------------------


@pytest.mark.parametrize(
    "advanced, expected",
    [
        ({}, "two_pass"),
        ({"upscale_mode": None}, "two_pass"),
        ({"upscale_mode": "two_pass"}, "two_pass"),
        ({"upscale_mode": "decoupled"}, "decoupled"),
        ({"upscale_mode": "DeCoupled"}, "decoupled"),
        ({"upscale_mode": "  decoupled  "}, "decoupled"),
        ({"upscale_mode": "garbage"}, "two_pass"),
        ({"upscale_mode": 123}, "two_pass"),
    ],
)
def test_resolve_upscale_mode(advanced: dict, expected: str) -> None:
    assert m._resolve_upscale_mode(advanced) == expected


def test_resolve_upscale_mode_env_override(monkeypatch: Any) -> None:
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_UPSCALE_MODE", "decoupled")
    assert m._resolve_upscale_mode({}) == "decoupled"
    # explicit advanced value wins over the env
    assert m._resolve_upscale_mode({"upscale_mode": "two_pass"}) == "two_pass"


# --- _apply_offload_ltxv097 (the #2 GGUF crash guard) ------------------------


def test_apply_offload_none_places_direct() -> None:
    pipe = MagicMock(name="pipe")
    m._apply_offload_ltxv097(pipe, "none", _logger())
    pipe.to.assert_called_once_with("cuda")
    pipe.enable_model_cpu_offload.assert_not_called()


def test_apply_offload_sequential_degrades_to_model_and_logs() -> None:
    pipe = MagicMock(name="pipe")
    log = _logger()
    m._apply_offload_ltxv097(pipe, "sequential", log)
    # NEVER calls the GGUF-incompatible API that crashed (H-B)
    pipe.enable_sequential_cpu_offload.assert_not_called()
    pipe.enable_model_cpu_offload.assert_called_once_with()
    assert _saw(log, "ltxv097.offload_mode_unsupported")


def test_apply_offload_model_installs_hook_no_log() -> None:
    pipe = MagicMock(name="pipe")
    log = _logger()
    m._apply_offload_ltxv097(pipe, "model", log)
    pipe.enable_model_cpu_offload.assert_called_once_with()
    assert not _saw(log, "ltxv097.offload_mode_unsupported")


def test_apply_offload_model_falls_back_to_cuda_without_hook() -> None:
    class NoHookPipe:
        def __init__(self) -> None:
            self.moved: str | None = None

        def to(self, dev: str) -> None:
            self.moved = dev

    pipe = NoHookPipe()
    m._apply_offload_ltxv097(pipe, "model", _logger())
    assert pipe.moved == "cuda"


# --- _generate_segment_dispatch (branch + tiling invariant + fallback) -------


def _pipe(use_tiling: bool = True) -> Any:
    calls: list[int] = []
    vae = SimpleNamespace(use_tiling=use_tiling, calls=calls)
    vae.enable_tiling = lambda: calls.append(1)
    return SimpleNamespace(vae=vae)


def _patch_paths(monkeypatch: Any) -> dict:
    seen: dict = {}
    monkeypatch.setattr(
        m, "_ensure_upsampler", lambda *a, **k: seen.setdefault("ensured", True)
    )
    monkeypatch.setattr(
        m, "_generate_segment",
        lambda *a, **k: seen.setdefault("path", "single"),
    )
    monkeypatch.setattr(
        m, "_generate_segment_2pass",
        lambda *a, **k: seen.setdefault("path", "2pass"),
    )
    monkeypatch.setattr(
        m, "_generate_segment_decoupled",
        lambda *a, **k: seen.setdefault("path", "decoupled"),
    )
    return seen


def _dispatch(pipe: Any, log: Any, upscale: bool, mode: str) -> Any:
    return m._generate_segment_dispatch(
        pipe, {}, upscale, (1280, 720) if upscale else None,
        None, "p", "n", 768, 512, 49, 1, {"num_inference_steps": 30},
        None, log, mode,
    )


def test_dispatch_no_upscale_uses_single_pass(monkeypatch: Any) -> None:
    seen = _patch_paths(monkeypatch)
    _dispatch(_pipe(), _logger(), False, "two_pass")
    assert seen["path"] == "single"
    assert "ensured" not in seen


def test_dispatch_decoupled_branch(monkeypatch: Any) -> None:
    seen = _patch_paths(monkeypatch)
    _dispatch(_pipe(), _logger(), True, "decoupled")
    assert seen["path"] == "decoupled"


def test_dispatch_two_pass_branch(monkeypatch: Any) -> None:
    seen = _patch_paths(monkeypatch)
    _dispatch(_pipe(), _logger(), True, "two_pass")
    assert seen["path"] == "2pass"


def test_dispatch_upscale_failure_falls_back_to_single(monkeypatch: Any) -> None:
    seen: dict = {}
    monkeypatch.setattr(m, "_ensure_upsampler", lambda *a, **k: object())

    def _boom(*a: Any, **k: Any) -> Any:
        raise RuntimeError("upscaler unavailable")

    monkeypatch.setattr(m, "_generate_segment_2pass", _boom)
    monkeypatch.setattr(
        m, "_generate_segment",
        lambda *a, **k: seen.setdefault("path", "single"),
    )
    log = _logger()
    _dispatch(_pipe(), log, True, "two_pass")
    assert seen["path"] == "single"
    assert _saw(log, "ltxv097.upscale_fallback")


def test_dispatch_reasserts_tiling_when_disabled(monkeypatch: Any) -> None:
    _patch_paths(monkeypatch)
    pipe = _pipe(use_tiling=False)
    _dispatch(pipe, _logger(), False, "two_pass")
    assert pipe.vae.calls == [1]


def test_dispatch_skips_tiling_reassert_when_enabled(monkeypatch: Any) -> None:
    _patch_paths(monkeypatch)
    pipe = _pipe(use_tiling=True)
    _dispatch(pipe, _logger(), False, "two_pass")
    assert pipe.vae.calls == []


# --- _resolve_vae_tiling -----------------------------------------------------


def test_resolve_vae_tiling_default_is_empty_kwargs() -> None:
    assert m._resolve_vae_tiling({}) == ("default", {})
    assert m._resolve_vae_tiling({"vae_tiling": "default"}) == ("default", {})
    assert m._resolve_vae_tiling({"vae_tiling": "garbage"}) == ("default", {})


def test_resolve_vae_tiling_aggressive_carries_small_tiles() -> None:
    mode, kw = m._resolve_vae_tiling({"vae_tiling": "AGGRESSIVE"})
    assert mode == "aggressive"
    assert kw["tile_sample_min_height"] == 256
    assert kw["tile_sample_stride_width"] == 192
    # caller-mutation must not poison the module constant
    kw["tile_sample_min_height"] = 1
    assert m._resolve_vae_tiling({"vae_tiling": "aggressive"})[1][
        "tile_sample_min_height"
    ] == 256


def test_resolve_vae_tiling_off() -> None:
    assert m._resolve_vae_tiling({"vae_tiling": "off"}) == ("off", {})


# --- _safe_gguf_basename + _resolve_ltxv097_paths (model_id, security) ------


@pytest.mark.parametrize(
    "raw, expected",
    [
        ("ltxv-13b-0.9.7-dev-Q4_K_M.gguf", "ltxv-13b-0.9.7-dev-Q4_K_M.gguf"),
        ("  Q5_K_S.gguf  ", "Q5_K_S.gguf"),
        (None, None),
        ("", None),
        ("../etc/passwd.gguf", None),
        ("/abs/x.gguf", None),
        ("sub/dir.gguf", None),
        ("back\\slash.gguf", None),
        ("model.safetensors", None),
        ("a b.gguf", None),
        ("x" * 130 + ".gguf", None),
    ],
)
def test_safe_gguf_basename(raw: Any, expected: Any) -> None:
    assert m._safe_gguf_basename(raw) == expected


def test_resolve_paths_model_id_wins_over_env_and_default(
    monkeypatch: Any,
) -> None:
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", "/data")
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_LTXV097_GGUF", "/env/override.gguf")
    gguf, _ = m._resolve_ltxv097_paths("ltxv-13b-0.9.7-dev-Q6_K.gguf")
    assert gguf.name == "ltxv-13b-0.9.7-dev-Q6_K.gguf"
    assert "wsbagnsv1" in str(gguf)  # resolved UNDER the family dir


def test_resolve_paths_unsafe_model_id_falls_back_to_env(
    monkeypatch: Any,
) -> None:
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", "/data")
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_LTXV097_GGUF", "/env/override.gguf")
    gguf, _ = m._resolve_ltxv097_paths("../escape.gguf")
    assert str(gguf) == str(__import__("pathlib").Path("/env/override.gguf"))


def test_resolve_paths_none_model_id_uses_default(monkeypatch: Any) -> None:
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", "/data")
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_LTXV097_GGUF", raising=False)
    gguf, _ = m._resolve_ltxv097_paths(None)
    assert gguf.name == m._DEFAULT_GGUF_BASENAME


# --- _silence_offload_defeat_warning ----------------------------------------


def test_silence_offload_defeat_warning_idempotent_and_scoped(
    monkeypatch: Any,
) -> None:
    monkeypatch.setattr(m, "_offload_defeat_filter_installed", False)
    lg = logging.getLogger("diffusers.pipelines.pipeline_utils")
    before = list(lg.filters)
    try:
        m._silence_offload_defeat_warning()
        m._silence_offload_defeat_warning()
        added = [f for f in lg.filters if f not in before]
        assert len(added) == 1
        filt = added[0]
        keep = logging.LogRecord(
            "x", logging.WARNING, "p", 1, "all good", None, None
        )
        drop = logging.LogRecord(
            "x", logging.WARNING, "p", 1,
            "memory gains from offloading are likely to be lost", None, None,
        )
        assert filt.filter(keep) is True
        assert filt.filter(drop) is False
    finally:
        lg.filters[:] = before


# --- _resolve_output_fps -----------------------------------------------------


@pytest.mark.parametrize(
    "advanced, base, expected",
    [
        ({}, 24, 24),
        ({"output_fps": None}, 24, 24),
        ({"output_fps": 48}, 24, 48),
        ({"output_fps": "48"}, 24, 48),
        ({"output_fps": 24}, 24, 24),
        ({"output_fps": 12}, 24, 24),
        ({"output_fps": "garbage"}, 24, 24),
        ({"output_fps": 999999}, 24, 240),
        ({"output_fps": 96}, 24, 96),
    ],
)
def test_resolve_output_fps(advanced: dict, base: int, expected: int) -> None:
    assert m._resolve_output_fps(advanced, base) == expected


def test_resolve_output_fps_env_override(monkeypatch: Any) -> None:
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_OUTPUT_FPS", "48")
    assert m._resolve_output_fps({}, 24) == 48
    assert m._resolve_output_fps({"output_fps": 24}, 24) == 24


# --- _sampling_params preset resolution -------------------------------------


def test_sampling_params_default_is_dev_recipe() -> None:
    samp = m._sampling_params({})
    assert samp["num_inference_steps"] == m._DEF_STEPS
    assert samp["guidance_scale"] == m._DEF_GUIDANCE


def test_sampling_params_distilled_preset_flips_steps_and_guidance() -> None:
    samp = m._sampling_params({"preset": "distilled"})
    assert samp["num_inference_steps"] == 8
    assert samp["guidance_scale"] == 1.0
    # non-preset knobs keep their dev baseline
    assert samp["image_cond_noise_scale"] == m._DEF_IMAGE_COND_NOISE_SCALE
    assert samp["condition_strength"] == m._DEF_CONDITION_STRENGTH


def test_sampling_params_explicit_value_overrides_preset() -> None:
    samp = m._sampling_params(
        {"preset": "distilled", "guidance_scale": 1.25, "num_inference_steps": 12}
    )
    assert samp["num_inference_steps"] == 12
    assert samp["guidance_scale"] == 1.25


@pytest.mark.parametrize("preset", [None, "", "  ", "unknown", 123])
def test_sampling_params_unknown_preset_falls_back_to_dev(preset: Any) -> None:
    samp = m._sampling_params({"preset": preset})
    assert samp["num_inference_steps"] == m._DEF_STEPS
    assert samp["guidance_scale"] == m._DEF_GUIDANCE
