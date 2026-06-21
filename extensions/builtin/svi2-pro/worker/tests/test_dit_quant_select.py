from pathlib import Path

from svi2_video_worker.pipeline_svi2 import dit_quant, resolve_dit_paths


def test_dit_quant_defaults_fp8_and_normalizes():
    assert dit_quant({}) == "fp8"
    assert dit_quant({"dit_quant": "NVFP4"}) == "nvfp4"
    assert dit_quant({"dit_quant": "bogus"}) == "fp8"
    assert dit_quant({"dit_quant": None}) == "fp8"


def test_resolve_dit_paths_fp8_is_default():
    high, low = resolve_dit_paths({}, Path("/models"))
    assert high.name == "Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors"
    assert "fp8" in low.name


def test_resolve_dit_paths_nvfp4_selects_comfy_files():
    high, low = resolve_dit_paths({"dit_quant": "nvfp4"}, Path("/models"))
    assert high.name == "Wan2.2-I2V-A14B_NVFP4_Sparse_high_comfy.safetensors"
    assert low.name == "Wan2.2-I2V-A14B_NVFP4_Sparse_low_comfy.safetensors"


def test_explicit_dit_overrides_win_over_quant_selection():
    high, low = resolve_dit_paths(
        {"dit_quant": "nvfp4", "dit_high_path": "/x/h.safetensors", "dit_low_path": "/x/l.safetensors"},
        Path("/models"),
    )
    assert high.name == "h.safetensors"
    assert low.name == "l.safetensors"
