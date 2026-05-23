from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest


def _has_torch() -> bool:
    try:
        import torch  # noqa: F401
        return True
    except ImportError:
        return False


from longcat_video_worker.longcat_native_loader import (
    KJ_BLOCK_INTERNAL_RENAMES,
    KJ_DROP_KEYS,
    KJ_TOP_LEVEL_PREFIX_RENAMES,
    VendorMissing,
    _meta_param_names,
    _rebind_preprocessor_modules,
    build_dit,
    read_embedded_config,
    rename_kj_keys,
)


# ---------------------------------------------------------------------------
# rename_kj_keys — pure-Python dict ops, no torch required
# ---------------------------------------------------------------------------


def test_rename_kj_keys_top_level_prefixes() -> None:
    sd = {
        "patch_embedding.weight": 1,
        "patch_embedding.bias": 2,
        "time_embedding.mlp.0.weight": 3,
        "time_embedding.mlp.0.bias": 4,
        "time_embedding.mlp.2.weight": 5,
        "text_embedding.0.weight": 6,
        "text_embedding.2.bias": 7,
    }
    out = rename_kj_keys(sd)
    assert "x_embedder.proj.weight" in out
    assert "x_embedder.proj.bias" in out
    assert "t_embedder.mlp.0.weight" in out
    assert "t_embedder.mlp.0.bias" in out
    assert "t_embedder.mlp.2.weight" in out
    assert "y_embedder.y_proj.0.weight" in out
    assert "y_embedder.y_proj.2.bias" in out
    # no old keys survive
    for k in sd:
        assert k not in out


def test_rename_kj_keys_block_internals() -> None:
    sd = {
        "blocks.5.self_attn.q.weight": "sq",
        "blocks.5.self_attn.o.weight": "so",
        "blocks.5.cross_attn.o.weight": "co",
        "blocks.5.modulation.1.weight": "mod",
        "blocks.5.norm3.weight": "n3",
        "blocks.5.cross_attn.norm_q.weight": "cnq",
        "blocks.5.cross_attn.norm_k.weight": "cnk",
        "blocks.5.self_attn.norm_q.weight": "snq",
        "blocks.5.self_attn.norm_k.weight": "snk",
    }
    out = rename_kj_keys(sd)
    assert "blocks.5.attn.q.weight" in out
    assert "blocks.5.attn.proj.weight" in out
    assert "blocks.5.cross_attn.proj.weight" in out
    assert "blocks.5.adaLN_modulation.1.weight" in out
    assert "blocks.5.pre_crs_attn_norm.weight" in out
    assert "blocks.5.cross_attn.q_norm.weight" in out
    assert "blocks.5.cross_attn.k_norm.weight" in out
    assert "blocks.5.attn.q_norm.weight" in out
    assert "blocks.5.attn.k_norm.weight" in out


def test_rename_kj_keys_drops_metadata() -> None:
    sd = {"scaled_fp8": "garbage", "blocks.0.modulation.1.weight": "ok"}
    out = rename_kj_keys(sd)
    assert "scaled_fp8" not in out
    assert "blocks.0.adaLN_modulation.1.weight" in out


def test_rename_kj_keys_preserves_scale_weight_suffix() -> None:
    sd = {
        "blocks.0.self_attn.q.scale_weight": 42,
        "blocks.0.cross_attn.k.scale_weight": 43,
        "blocks.0.self_attn.o.scale_weight": 44,
    }
    out = rename_kj_keys(sd)
    assert "blocks.0.attn.q.scale_weight" in out, list(out.keys())
    assert "blocks.0.cross_attn.k.scale_weight" in out, list(out.keys())
    assert "blocks.0.attn.proj.scale_weight" in out, list(out.keys())


def test_rename_kj_keys_head_subtree() -> None:
    sd = {
        "head.head.weight": "hw",
        "head.head.bias": "hb",
        "head.modulation.1.weight": "hmw",
        "head.modulation.1.bias": "hmb",
    }
    out = rename_kj_keys(sd)
    # head → final_layer, then head.head → final_layer.linear
    assert "final_layer.linear.weight" in out, list(out.keys())
    assert "final_layer.linear.bias" in out
    assert "final_layer.adaLN_modulation.1.weight" in out
    assert "final_layer.adaLN_modulation.1.bias" in out


def test_rename_kj_keys_idempotent() -> None:
    sd = {
        "blocks.3.self_attn.q.weight": 1,
        "blocks.3.modulation.1.bias": 2,
        "patch_embedding.weight": 3,
        "scaled_fp8": 4,
    }
    first = rename_kj_keys(sd)
    second = rename_kj_keys(first)
    assert first == second


def test_rename_kj_keys_ffn_passthrough() -> None:
    sd = {
        "blocks.0.ffn.w1.weight": "w1",
        "blocks.0.ffn.w1.scale_weight": "sw1",
        "blocks.0.ffn.w2.weight": "w2",
        "blocks.0.ffn.w3.weight": "w3",
    }
    out = rename_kj_keys(sd)
    assert out == sd


# ---------------------------------------------------------------------------
# build_dit without vendor — must raise VendorMissing
# ---------------------------------------------------------------------------


def test_build_dit_raises_without_vendor() -> None:
    with pytest.raises(VendorMissing):
        build_dit({}, Path("/nonexistent/vendor/path"))


# ---------------------------------------------------------------------------
# _meta_param_names — needs torch
# ---------------------------------------------------------------------------


@pytest.mark.skipif(not _has_torch(), reason="torch not installed")
def test_meta_param_names_empty_on_full_model() -> None:
    import torch

    model = torch.nn.Linear(4, 4)
    # fully-realized model on cpu — no meta tensors
    assert _meta_param_names(model) == []


@pytest.mark.skipif(not _has_torch(), reason="torch not installed")
def test_meta_param_names_returns_meta_tensors() -> None:
    import torch

    with torch.device("meta"):
        model = torch.nn.Linear(8, 8)
    names = _meta_param_names(model)
    assert "weight" in names


# ---------------------------------------------------------------------------
# _rebind_preprocessor_modules — no-op
# ---------------------------------------------------------------------------


def test_rebind_preprocessor_is_noop() -> None:
    model = MagicMock()
    result = _rebind_preprocessor_modules(model)
    assert result is None
    model.assert_not_called()


# ---------------------------------------------------------------------------
# read_embedded_config
# ---------------------------------------------------------------------------


def test_read_embedded_config(tmp_path: Path) -> None:
    import json

    dit_dir = tmp_path / "dit"
    dit_dir.mkdir()
    cfg = {"depth": 48, "hidden_size": 4096, "num_heads": 32}
    (dit_dir / "config.json").write_text(json.dumps(cfg), encoding="utf-8")

    # path argument is expected to be the sibling of `dit/` directory (e.g. the
    # safetensors file itself); config is at path.parent / dit / config.json.
    fake_st_path = tmp_path / "model.safetensors"
    fake_st_path.touch()

    result = read_embedded_config(fake_st_path)
    assert result == cfg


# ---------------------------------------------------------------------------
# rename_kj_keys — full round-trip with a realistic mini state-dict
# ---------------------------------------------------------------------------


def test_rename_kj_keys_realistic_mini() -> None:
    sd = {
        "scaled_fp8": None,
        "patch_embedding.weight": 1,
        "patch_embedding.bias": 2,
        "time_embedding.mlp.0.weight": 3,
        "time_embedding.mlp.0.bias": 4,
        "time_embedding.mlp.2.weight": 5,
        "time_embedding.mlp.2.bias": 6,
        "text_embedding.0.weight": 7,
        "text_embedding.0.bias": 8,
        "text_embedding.2.weight": 9,
        "text_embedding.2.bias": 10,
        "head.head.weight": 11,
        "head.head.bias": 12,
        "head.modulation.1.weight": 13,
        "head.modulation.1.bias": 14,
        "blocks.0.self_attn.q.weight": 15,
        "blocks.0.self_attn.q.bias": 16,
        "blocks.0.self_attn.q.scale_weight": 17,
        "blocks.0.self_attn.k.weight": 18,
        "blocks.0.self_attn.v.weight": 19,
        "blocks.0.self_attn.o.weight": 20,
        "blocks.0.self_attn.o.bias": 21,
        "blocks.0.self_attn.norm_q.weight": 22,
        "blocks.0.self_attn.norm_k.weight": 23,
        "blocks.0.cross_attn.q.weight": 24,
        "blocks.0.cross_attn.k.weight": 25,
        "blocks.0.cross_attn.v.weight": 26,
        "blocks.0.cross_attn.o.weight": 27,
        "blocks.0.cross_attn.norm_q.weight": 28,
        "blocks.0.cross_attn.norm_k.weight": 29,
        "blocks.0.ffn.w1.weight": 30,
        "blocks.0.ffn.w1.scale_weight": 31,
        "blocks.0.modulation.1.weight": 32,
        "blocks.0.norm3.weight": 33,
        "blocks.0.norm3.bias": 34,
    }

    out = rename_kj_keys(sd)

    assert "scaled_fp8" not in out
    assert "x_embedder.proj.weight" in out
    assert "t_embedder.mlp.0.weight" in out
    assert "y_embedder.y_proj.0.weight" in out
    assert "final_layer.linear.weight" in out
    assert "final_layer.adaLN_modulation.1.weight" in out
    assert "blocks.0.attn.q.weight" in out
    assert "blocks.0.attn.q.scale_weight" in out
    assert "blocks.0.attn.proj.weight" in out
    assert "blocks.0.attn.q_norm.weight" in out
    assert "blocks.0.attn.k_norm.weight" in out
    assert "blocks.0.cross_attn.proj.weight" in out
    assert "blocks.0.cross_attn.q_norm.weight" in out
    assert "blocks.0.cross_attn.k_norm.weight" in out
    assert "blocks.0.ffn.w1.weight" in out
    assert "blocks.0.adaLN_modulation.1.weight" in out
    assert "blocks.0.pre_crs_attn_norm.weight" in out
    # original keys gone
    assert "patch_embedding.weight" not in out
