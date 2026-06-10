from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[2]


def _manifest():
    return yaml.safe_load((ROOT / "manifest.yaml").read_text())


def test_manifest_declares_svi2_runtimes():
    m = _manifest()
    assert m["extension"]["id"] == "nexus.video.svi2-pro"
    ids = {r["runtime_id"] for r in m["backend_runtimes"]}
    assert "nexus.video.svi2-pro.rtx50-fp8" in ids
    assert "nexus.video.svi2-pro.fake" in ids
    caps = set(m["capabilities"])
    assert {"gpu.compute", "huggingface.install", "model.registry.read", "storage.schema_contribute"} <= caps


def test_fake_versions_empty_artifacts():
    v = yaml.safe_load((ROOT / "backends/fake/versions.yaml").read_text())
    assert v["versions"][0]["artifacts"] == []


def test_manifest_declares_model_artifact_steps_for_every_weight():
    steps = _manifest()["dependencies"]["steps"]
    model_steps = [s for s in steps if s["type"] == "model_artifact"]
    families = {s["spec"]["family_id"] for s in model_steps}
    assert families == {
        "huggingface:Kijai/WanVideo_comfy_fp8_scaled",
        "huggingface:epfl-vita/svi-model",
        "huggingface:Kijai/WanVideo_comfy",
        "huggingface:Wan-AI/Wan2.1-T2V-1.3B",
        "huggingface:QuantStack/Qwen-Image-Edit-2509-GGUF",
        "huggingface:Comfy-Org/Qwen-Image_ComfyUI",
        "huggingface:unsloth/Qwen2.5-VL-7B-Instruct-GGUF",
        "huggingface:AlexWortega/RIFE",
    }
    for s in model_steps:
        assert s["requires"] == ["python"]
        assert s["spec"]["acceleration_match"] == "matches_runtime_step:python"


def test_validate_step_requires_model_steps():
    steps = {s["id"]: s for s in _manifest()["dependencies"]["steps"]}
    requires = set(steps["validate"]["requires"])
    model_ids = {s_id for s_id, s in steps.items() if s["type"] == "model_artifact"}
    assert model_ids <= requires
    assert {"python", "pkgs", "ffmpeg"} <= requires


def test_ffmpeg_and_sdcli_allow_system_path():
    steps = {s["id"]: s for s in _manifest()["dependencies"]["steps"]}
    assert steps["ffmpeg"]["spec"]["allow_system_path"] is True
    assert steps["sdcli"]["spec"]["allow_system_path"] is True


def test_manifest_declares_ui_operators_recipes_storage():
    m = _manifest()
    assert m["ui"]["assets"]["root"] == "web/dist"
    ce = m["ui"]["custom_elements"][0]
    assert ce["tag"] == "svi2-pro-app"
    assert ce["module"] == "svi2-pro.js"
    assert ce["entry"] == "register"
    assert any(c["file"] == "ui/settings.yaml" for c in m["ui"]["contributions"])
    operator_files = {o["file"] for o in m["operators"]}
    assert operator_files == {"operators/video_render.yaml"}
    assert m["recipes"] == [{"file": "recipes/svi2_render.yaml"}]
    assert m["storage"]["namespace"]["alias"] == "svi2_pro"
    assert m["storage"]["namespace"]["prefix_mode"] == "host_derived"
    assert m["storage"]["sql_profile"]["profile"] == "nexus_sqlite_v1"


def test_manifest_referenced_files_exist():
    m = _manifest()
    refs = [m["ui"]["layouts"][0]["file"]]
    refs += [c["file"] for c in m["ui"]["contributions"]]
    refs += [o["file"] for o in m["operators"]]
    refs += [r["file"] for r in m["recipes"]]
    refs += [f["path"] for f in m["storage"]["migrations"]["files"]]
    refs.append(m["ui"]["assets"]["root"] + "/" + m["ui"]["custom_elements"][0]["module"])
    for rel in refs:
        assert (ROOT / rel).exists(), rel
