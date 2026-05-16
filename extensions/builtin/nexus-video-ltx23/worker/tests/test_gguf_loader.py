"""Tests for the GGUF transformer loader bypass.

Covers:
  - ``find_gguf_transformer`` discovery semantics (zero / one / many).
  - ``_byte_shape_to_unquantized_shape`` for packed byte shapes.
  - ``_normalize_state_dict_shapes`` for mixed plain + GGUFParameter
    entries.
  - ``validate_state_dict_against_model`` clean + dirty paths against
    a tiny stand-in model whose ``state_dict()`` mirrors what the
    real ``LTX2VideoTransformer3DModel`` would expose.
  - ``GGUFSchemaMismatch`` raised from ``load_gguf_transformer`` when
    the state-dict diverges from the target model (the dominant real-
    world failure mode, e.g. Abiray vs dg845 schema gap).
  - ``_resolve_gguf_transformer_override`` env + dir-scan behaviour.

The loader's full ``load_gguf_transformer`` path-through-diffusers is
exercised in real-GPU smoke runs; the unit test plane validates the
schema-validation half (which is what catches the Abiray/dg845
divergence cleanly) plus the wiring.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import pytest

import torch  # type: ignore
from diffusers.quantizers.gguf.utils import GGUFParameter
import gguf  # type: ignore

from ltx_video_worker import gguf_loader, pipeline_diffusers as pd


# Quant types whose byte-shape unpacks to a known logical shape under
# the diffusers GGML_QUANT_SIZES table.
Q4_K = gguf.GGMLQuantizationType.Q4_K
Q5_K = gguf.GGMLQuantizationType.Q5_K
Q6_K = gguf.GGMLQuantizationType.Q6_K
Q8_0 = gguf.GGMLQuantizationType.Q8_0
F32 = gguf.GGMLQuantizationType.F32
BF16 = gguf.GGMLQuantizationType.BF16


def _make_gguf_param(byte_shape: tuple[int, ...], quant_type: Any) -> GGUFParameter:
    """Forge a ``GGUFParameter`` from a uint8 packed-byte tensor."""
    data = torch.zeros(byte_shape, dtype=torch.uint8)
    return GGUFParameter(data, quant_type=quant_type)


class _TinyTransformer(torch.nn.Module):
    """Stand-in for ``LTX2VideoTransformer3DModel`` for schema-validation tests.

    Exposes a flat ``state_dict()`` with the same shape conventions
    as a single LTX-2.3 transformer block, scaled down to small sizes
    so the test fixture stays cheap.
    """

    def __init__(self, hidden: int = 32, ffn: int = 64) -> None:
        super().__init__()
        # Param keys mirror dg845 naming so they match the production
        # target model. Buffers/parameters intentionally have float
        # shapes; comparison is shape-only.
        self.proj_in = torch.nn.Linear(hidden, hidden)
        self.proj_out = torch.nn.Linear(hidden, hidden)
        self.scale_shift_table = torch.nn.Parameter(torch.zeros(2, hidden))
        self.audio_scale_shift_table = torch.nn.Parameter(torch.zeros(2, hidden // 2))
        self.ff_proj = torch.nn.Linear(hidden, ffn)


# --- shape unpacking ---------------------------------------------------------


def test_byte_shape_to_unquantized_shape_passthrough_for_unquantized() -> None:
    for qt in (F32, BF16, gguf.GGMLQuantizationType.F16):
        assert gguf_loader._byte_shape_to_unquantized_shape((4096,), qt) == (4096,)
        assert gguf_loader._byte_shape_to_unquantized_shape((128, 256), qt) == (128, 256)


def test_byte_shape_to_unquantized_shape_q4_k_round_trip() -> None:
    # Q4_K packs 256 weights into 144 bytes (block_size=256, type_size=144).
    from diffusers.quantizers.gguf.utils import GGML_QUANT_SIZES

    block_size, type_size = GGML_QUANT_SIZES[Q4_K]
    assert (block_size, type_size) == (256, 144)
    byte_shape = (4096, 144)  # last-dim is one block of 256 logical weights
    logical = gguf_loader._byte_shape_to_unquantized_shape(byte_shape, Q4_K)
    assert logical == (4096, 256)


def test_byte_shape_to_unquantized_shape_q5_k_round_trip() -> None:
    from diffusers.quantizers.gguf.utils import GGML_QUANT_SIZES

    block_size, type_size = GGML_QUANT_SIZES[Q5_K]
    byte_shape = (32, 4 * type_size)
    logical = gguf_loader._byte_shape_to_unquantized_shape(byte_shape, Q5_K)
    assert logical == (32, 4 * block_size)


# --- state-dict shape normalization -----------------------------------------


def test_normalize_state_dict_shapes_mixes_plain_and_gguf_params() -> None:
    sd = {
        "scale_shift_table": torch.zeros(2, 32, dtype=torch.float32),
        "proj_in.weight": _make_gguf_param((32, 144), Q4_K),
        "proj_in.bias": torch.zeros(32, dtype=torch.float32),
    }
    shapes = gguf_loader._normalize_state_dict_shapes(sd)
    assert shapes["scale_shift_table"] == (2, 32)
    assert shapes["proj_in.weight"] == (32, 256)  # Q4_K-unpacked
    assert shapes["proj_in.bias"] == (32,)


# --- schema validation ------------------------------------------------------


def _state_dict_matching(model: _TinyTransformer) -> dict[str, Any]:
    """Build a state-dict whose shapes line up with the target model."""
    sd: dict[str, Any] = {}
    target = model.state_dict()
    for name, tensor in target.items():
        if name.endswith(".weight") and tensor.ndim == 2 and tensor.shape[-1] >= 256:
            # Use a Q4_K-packed surrogate.
            cols = tensor.shape[-1]
            type_size = 144
            packed_cols = (cols // 256) * type_size
            sd[name] = _make_gguf_param(tensor.shape[:-1] + (packed_cols,), Q4_K)
        else:
            sd[name] = torch.zeros_like(tensor)
    return sd


def test_validate_state_dict_against_model_reports_clean_when_aligned() -> None:
    model = _TinyTransformer(hidden=256, ffn=512)
    sd = _state_dict_matching(model)
    report = gguf_loader.validate_state_dict_against_model(sd, model)
    assert report.is_clean, report.summary()
    assert report.matched == len(model.state_dict())


def test_validate_state_dict_against_model_flags_missing_keys() -> None:
    model = _TinyTransformer(hidden=32, ffn=64)
    sd = _state_dict_matching(model)
    sd.pop("scale_shift_table")
    report = gguf_loader.validate_state_dict_against_model(sd, model)
    assert not report.is_clean
    assert "scale_shift_table" in report.missing_in_gguf


def test_validate_state_dict_against_model_flags_extra_keys() -> None:
    model = _TinyTransformer(hidden=32, ffn=64)
    sd = _state_dict_matching(model)
    sd["adaln_single.bias"] = torch.zeros(32, dtype=torch.float32)
    report = gguf_loader.validate_state_dict_against_model(sd, model)
    assert not report.is_clean
    assert "adaln_single.bias" in report.extra_in_gguf


def test_validate_state_dict_against_model_flags_shape_mismatch() -> None:
    model = _TinyTransformer(hidden=32, ffn=64)
    sd = _state_dict_matching(model)
    # Mimic the Abiray/dg845 divergence — scale_shift_table is rank-2
    # in dg845 but rank-2-with-9-channels in the dev-schema GGUF.
    sd["scale_shift_table"] = torch.zeros(9, 32, dtype=torch.float32)
    report = gguf_loader.validate_state_dict_against_model(sd, model)
    assert not report.is_clean
    assert any(name == "scale_shift_table" for name, *_ in report.shape_mismatches)


# --- load_gguf_transformer schema-mismatch guard ----------------------------


def test_load_gguf_transformer_raises_schema_mismatch_when_state_dict_diverges(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """The real LTX2VideoTransformer3DModel + an unrelated state-dict
    should trip ``GGUFSchemaMismatch`` cleanly rather than fail deep in
    the load with a meta-tensor dispatch error."""

    diverging_sd = {
        "transformer_blocks.0.scale_shift_table": torch.zeros(4096, 9, dtype=torch.float32),
    }

    def fake_load_gguf_state_dict(_path: str | Path) -> dict[str, Any]:
        return diverging_sd

    monkeypatch.setattr(gguf_loader, "load_gguf_state_dict", fake_load_gguf_state_dict)

    fake_gguf = tmp_path / "fake.gguf"
    fake_gguf.write_bytes(b"\x00")

    # Mock the heavy diffusers import surface so the test stays fast +
    # doesn't pull a real model config from disk. The class only needs
    # to expose ``load_config`` + ``from_config``.
    class _FakeModelCls:
        @staticmethod
        def load_config(_path: str, *, return_unused_kwargs: bool = False) -> tuple[dict[str, Any], dict[str, Any]]:
            return ({}, {})

        @staticmethod
        def from_config(_cfg: dict[str, Any]) -> _TinyTransformer:
            return _TinyTransformer()

    import diffusers as _diffusers_mod

    monkeypatch.setattr(_diffusers_mod, "LTX2VideoTransformer3DModel", _FakeModelCls, raising=False)

    base_config_dir = tmp_path / "base"
    (base_config_dir / "transformer").mkdir(parents=True)

    with pytest.raises(gguf_loader.GGUFSchemaMismatch) as excinfo:
        gguf_loader.load_gguf_transformer(fake_gguf, base_config_dir)
    msg = str(excinfo.value)
    assert "does not match" in msg
    assert "transformer_blocks.0.scale_shift_table" in msg or "extra_in_gguf" in msg


# --- find_gguf_transformer + override resolver ------------------------------


def test_find_gguf_transformer_returns_none_for_empty_dir(tmp_path: Path) -> None:
    assert gguf_loader.find_gguf_transformer(tmp_path) is None


def test_find_gguf_transformer_returns_single_match(tmp_path: Path) -> None:
    gguf_file = tmp_path / "transformer.gguf"
    gguf_file.write_bytes(b"\x00")
    assert gguf_loader.find_gguf_transformer(tmp_path) == gguf_file


def test_find_gguf_transformer_returns_none_when_ambiguous(tmp_path: Path) -> None:
    (tmp_path / "one.gguf").write_bytes(b"\x00")
    (tmp_path / "two.gguf").write_bytes(b"\x00")
    assert gguf_loader.find_gguf_transformer(tmp_path) is None


def test_find_gguf_transformer_returns_none_when_dir_missing(tmp_path: Path) -> None:
    assert gguf_loader.find_gguf_transformer(tmp_path / "does-not-exist") is None


def test_resolve_override_returns_none_when_no_override(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", raising=False)
    assert pd._resolve_gguf_transformer_override(tmp_path) is None


def test_resolve_override_honours_env_absolute(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    gguf_file = tmp_path / "weights.gguf"
    gguf_file.write_bytes(b"\x00")
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", str(gguf_file))
    assert pd._resolve_gguf_transformer_override(tmp_path) == gguf_file


def test_resolve_override_honours_env_relative_to_model_dir(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    gguf_file = tmp_path / "weights.gguf"
    gguf_file.write_bytes(b"\x00")
    monkeypatch.setenv("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", "weights.gguf")
    assert pd._resolve_gguf_transformer_override(tmp_path) == gguf_file


def test_resolve_override_returns_none_when_env_path_missing(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv(
        "NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", str(tmp_path / "missing.gguf")
    )
    assert pd._resolve_gguf_transformer_override(tmp_path) is None


def test_resolve_override_falls_back_to_dir_scan(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", raising=False)
    found = tmp_path / "scan-me.gguf"
    found.write_bytes(b"\x00")
    assert pd._resolve_gguf_transformer_override(tmp_path) == found


def test_load_gguf_state_dict_raises_on_missing_file(tmp_path: Path) -> None:
    with pytest.raises(FileNotFoundError):
        gguf_loader.load_gguf_state_dict(tmp_path / "absent.gguf")


# --- G-A3: rtx50-gguf profile resolver wiring -------------------------------


def test_gguf_family_for_only_maps_the_gguf_profile() -> None:
    assert pd._gguf_family_for("rtx50-gguf") == "Abiray/LTX-2.3-22B-DISTILLED-1.1-GGUF"
    for p in ("rtx50-nvfp4", "rtx50-fp8", "rtx40-fp8", "fake", ""):
        assert pd._gguf_family_for(p) is None


def test_expected_family_id_includes_gguf_profile() -> None:
    # rtx50-gguf borrows the dg845 tree for config + companions.
    assert pd._expected_family_id("rtx50-gguf") == "dg845/LTX-2.3-Distilled-Diffusers"


def test_resolve_override_resolves_gguf_profile_family_dir(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", raising=False)
    monkeypatch.setenv("NEXUS_HOST_DATA_DIR", str(tmp_path))
    fam = tmp_path / "models" / "Abiray" / "LTX-2.3-22B-DISTILLED-1.1-GGUF"
    fam.mkdir(parents=True)
    gguf_file = fam / "LTX-2.3-22B-distilled-1.1-Q4_K_M.gguf"
    gguf_file.write_bytes(b"\x00")
    # base model_dir (dg845-ish) has NO .gguf — resolution must reach
    # the profile family dir.
    base = tmp_path / "dg845"
    base.mkdir()
    assert pd._resolve_gguf_transformer_override(base, "rtx50-gguf") == gguf_file
    # a non-gguf profile must NOT pick up the family gguf.
    assert pd._resolve_gguf_transformer_override(base, "rtx50-nvfp4") is None


def test_resolve_override_family_path_needs_host_data_dir(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.delenv("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", raising=False)
    monkeypatch.delenv("NEXUS_HOST_DATA_DIR", raising=False)
    base = tmp_path / "dg845"
    base.mkdir()
    assert pd._resolve_gguf_transformer_override(base, "rtx50-gguf") is None


# --- G-A: LTX2 diffusers key rename -----------------------------------------


def test_apply_ltx2_diffusers_rename_maps_adaln_single_to_time_embed() -> None:
    # The Abiray GGUF carries original `adaln_single.*` names; the
    # diffusers LTX2 model expects `time_embed.*`. The rename must
    # bridge that (this is the dominant `extra_in_gguf` cause).
    sd = {
        "adaln_single.linear.weight": torch.zeros(2, 2),
        "adaln_single.emb.timestep_embedder.linear_1.bias": torch.zeros(3),
        "transformer_blocks.0.attn1.to_q.weight": torch.zeros(4, 4),
    }
    out = gguf_loader.apply_ltx2_diffusers_rename(sd)
    assert "time_embed.linear.weight" in out
    assert "time_embed.emb.timestep_embedder.linear_1.bias" in out
    # already-diffusers keys pass through untouched
    assert "transformer_blocks.0.attn1.to_q.weight" in out
    # no key dropped or duplicated
    assert len(out) == len(sd)
    # original keys gone (renamed, not copied)
    assert "adaln_single.linear.weight" not in out


def test_apply_ltx2_diffusers_rename_is_collision_free() -> None:
    # R-GA-2 guard: renaming must not collapse two distinct keys onto
    # one (which would silently drop a weight).
    sd = {
        "adaln_single.linear.weight": torch.zeros(1),
        "q_norm.weight": torch.zeros(1),
        "k_norm.weight": torch.zeros(1),
        "patchify_proj.weight": torch.zeros(1),
    }
    out = gguf_loader.apply_ltx2_diffusers_rename(sd)
    assert len(out) == len(sd), "rename collapsed keys (collision)"
    assert "norm_q.weight" in out and "norm_k.weight" in out
    assert "proj_in.weight" in out


def test_apply_ltx2_diffusers_rename_maps_prompt_adaln_single_variants() -> None:
    # Residual the diffusers converter does NOT cover: the Abiray GGUF
    # carries `prompt_adaln_single.*` / `audio_prompt_adaln_single.*`;
    # the diffusers model attributes are `prompt_adaln`/`audio_prompt_adaln`.
    # One substring rule must fix BOTH (the audio key contains the
    # non-audio token). Without this 12 keys stay unmatched vs dg845.
    sd = {
        "prompt_adaln_single.linear.weight": torch.zeros(1),
        "audio_prompt_adaln_single.emb.timestep_embedder.linear_1.bias": torch.zeros(1),
    }
    out = gguf_loader.apply_ltx2_diffusers_rename(sd)
    assert "prompt_adaln.linear.weight" in out
    assert "audio_prompt_adaln.emb.timestep_embedder.linear_1.bias" in out
    assert len(out) == len(sd)
    assert not any("_single." in k for k in out)


def test_apply_ltx2_diffusers_rename_preserves_gguf_param_values() -> None:
    p = _make_gguf_param((32, 144), Q4_K)
    sd = {"adaln_single.linear.weight": p}
    out = gguf_loader.apply_ltx2_diffusers_rename(sd)
    assert out["time_embed.linear.weight"] is p  # value object untouched


# --- G-A: zero-fill of unmatched (audio_*) meta params ----------------------


def test_zero_fill_meta_params_materialises_remaining_meta_tensors() -> None:
    from accelerate import init_empty_weights

    with init_empty_weights():
        m = _TinyTransformer(hidden=8, ffn=16)
    # everything is on meta after init_empty_weights
    assert any(p.is_meta for p in m.parameters())
    filled = gguf_loader.zero_fill_meta_params(
        m, device=torch.device("cpu"), dtype=torch.float32
    )
    assert filled > 0
    assert not any(p.is_meta for p in m.parameters())
    assert not any(b.is_meta for b in m.buffers())
    # filled params are zeros (inert for the unused audio branch)
    for p in m.parameters():
        assert torch.count_nonzero(p) == 0


def test_zero_fill_meta_params_noop_when_all_materialised() -> None:
    m = _TinyTransformer(hidden=8, ffn=16)  # real init, no meta
    filled = gguf_loader.zero_fill_meta_params(
        m, device=torch.device("cpu"), dtype=torch.float32
    )
    assert filled == 0
