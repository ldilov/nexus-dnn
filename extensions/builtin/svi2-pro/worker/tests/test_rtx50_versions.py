from pathlib import Path
import yaml
ROOT = Path(__file__).resolve().parents[2]


def test_rtx50_fp8_has_full_artifact_set():
    v = yaml.safe_load((ROOT / "backends/rtx50-fp8/versions.yaml").read_text())
    arts = {a["id"]: a for a in v["versions"][0]["artifacts"]}
    expected = {
        "dit-high-fp8", "dit-low-fp8", "svi-lora-high", "svi-lora-low",
        "text-encoder", "vae", "tokenizer",
        "qwen-edit-diffusion", "qwen-edit-vae", "qwen-edit-llm", "qwen-edit-mmproj",
        "rife-flownet", "sd-cli",
    }
    assert set(arts) == expected
    assert arts["dit-high-fp8"]["source"]["repo"] == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts["svi-lora-high"]["source"]["repo"] == "epfl-vita/svi-model"
    assert arts["qwen-edit-diffusion"]["source"]["repo"] == "QuantStack/Qwen-Image-Edit-2509-GGUF"


def test_every_artifact_declares_role():
    v = yaml.safe_load((ROOT / "backends/rtx50-fp8/versions.yaml").read_text())
    for a in v["versions"][0]["artifacts"]:
        assert a.get("role"), a["id"]
