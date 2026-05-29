from pathlib import Path
import yaml
ROOT = Path(__file__).resolve().parents[2]


def test_rtx50_fp8_has_six_artifacts():
    v = yaml.safe_load((ROOT / "backends/rtx50-fp8/versions.yaml").read_text())
    arts = {a["id"]: a for a in v["versions"][0]["artifacts"]}
    assert set(arts) == {"dit-high-fp8", "dit-low-fp8", "svi-lora-high", "svi-lora-low", "text-encoder", "vae"}
    assert arts["dit-high-fp8"]["source"]["repo"] == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts["svi-lora-high"]["source"]["repo"] == "epfl-vita/svi-model"
