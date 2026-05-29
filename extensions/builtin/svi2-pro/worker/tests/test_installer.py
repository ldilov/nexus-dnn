from pathlib import Path
import yaml
from svi2_video_worker.installer import resolve_artifacts


def test_resolve_artifacts_reads_rtx50_fp8(tmp_path: Path):
    vfile = tmp_path / "versions.yaml"
    vfile.write_text(yaml.safe_dump({
        "spec_version": "0.1",
        "backend": {"runtime_id": "nexus.video.svi2-pro.rtx50-fp8", "default_version": "0.1.0"},
        "versions": [{"id": "0.1.0", "status": "experimental", "artifacts": [
            {"id": "dit-high-fp8", "source": {"kind": "huggingface", "repo": "Kijai/WanVideo_comfy_fp8_scaled", "revision": "main", "file": "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors"}},
        ]}],
    }))
    arts = resolve_artifacts(vfile)
    assert arts[0].id == "dit-high-fp8"
    assert arts[0].repo == "Kijai/WanVideo_comfy_fp8_scaled"
    assert arts[0].file.endswith("HIGH_fp8_e4m3fn_scaled_KJ.safetensors")


def test_register_installer_handlers_is_noop_safe():
    class Stub:
        def __init__(self): self.calls = {}
        def register(self, m, h): self.calls[m] = h
    from svi2_video_worker.installer import register_installer_handlers
    s = Stub(); register_installer_handlers(s)
    assert "svi2.video.install.start" in s.calls
    assert "svi2.video.install.status" in s.calls
