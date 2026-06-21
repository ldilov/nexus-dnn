from pathlib import Path
import yaml
ROOT = Path(__file__).resolve().parents[2]


def test_rtx50_fp8_has_full_artifact_set():
    v = yaml.safe_load((ROOT / "backends/rtx50-fp8/versions.yaml").read_text())
    arts = {a["id"]: a for a in v["versions"][0]["artifacts"]}
    expected = {
        "dit-high-fp8", "dit-low-fp8", "dit-t2v-high", "dit-t2v-low",
        "svi-lora-high", "svi-lora-low",
        "text-encoder", "vae", "tokenizer",
        "qwen-edit-diffusion", "qwen-edit-vae", "qwen-edit-llm", "qwen-edit-mmproj",
        "rife-flownet", "sd-cli",
    }
    assert set(arts) == expected
    assert arts["dit-high-fp8"]["source"]["repo"] == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts["dit-t2v-high"]["source"]["repo"] == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts["dit-t2v-high"]["source"]["file"].startswith("T2V/")
    assert arts["svi-lora-high"]["source"]["repo"] == "epfl-vita/svi-model"
    assert arts["qwen-edit-diffusion"]["source"]["repo"] == "QuantStack/Qwen-Image-Edit-2509-GGUF"


def test_every_artifact_declares_role():
    v = yaml.safe_load((ROOT / "backends/rtx50-fp8/versions.yaml").read_text())
    for a in v["versions"][0]["artifacts"]:
        assert a.get("role"), a["id"]


def test_rtx50_nvfp4_dit_artifacts_point_at_lightx2v_comfy():
    v = yaml.safe_load((ROOT / "backends/rtx50-nvfp4/versions.yaml").read_text())
    assert v["backend"]["runtime_id"] == "nexus.video.svi2-pro.rtx50-nvfp4"
    arts = {a["id"]: a for a in v["versions"][0]["artifacts"]}
    for aid in ("dit-high-nvfp4", "dit-low-nvfp4", "dit-t2v-high-nvfp4", "dit-t2v-low-nvfp4"):
        assert arts[aid]["source"]["repo"] == "lightx2v/Wan2.2-NVFP4-Sparse"
        assert arts[aid]["source"]["file"].endswith("_comfy.safetensors")
        assert "NVFP4" in arts[aid]["source"]["file"]
    for aid in ("svi-lora-high", "svi-lora-low", "text-encoder", "vae", "tokenizer", "rife-flownet", "sd-cli"):
        assert aid in arts
    for a in v["versions"][0]["artifacts"]:
        assert a.get("role"), a["id"]
