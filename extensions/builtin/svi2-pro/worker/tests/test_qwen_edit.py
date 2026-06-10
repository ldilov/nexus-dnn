from pathlib import Path

import pytest

from svi2_video_worker.qwen_edit import build_qwen_edit_cmd, qwen_edit_image


def test_build_cmd_has_models_prompt_ref_out():
    cmd = build_qwen_edit_cmd(
        "C:/sd/sd-cli.exe", "C:/m", "ref.png", "out.png", "make it demonic",
        steps=24, cfg_scale=2.5, flow_shift=3.0,
    )
    assert cmd[0] == "C:/sd/sd-cli.exe"
    # model quartet present
    joined = " ".join(cmd)
    assert "Qwen-Image-Edit-2509-Q5_K_M.gguf" in joined
    assert "qwen_image_vae.safetensors" in joined
    assert "Qwen2.5-VL-7B-Instruct.Q4_K_M.gguf" in joined
    assert "Qwen2.5-VL-7B-Instruct.mmproj-f16.gguf" in joined
    # prompt + io flags
    assert cmd[cmd.index("-p") + 1] == "make it demonic"
    assert cmd[cmd.index("-r") + 1] == "ref.png"
    assert cmd[cmd.index("-o") + 1] == "out.png"
    assert cmd[cmd.index("--steps") + 1] == "24"
    assert cmd[cmd.index("--cfg-scale") + 1] == "2.5"
    assert "--offload-to-cpu" in cmd        # 16GB spill handling on by default
    assert "--diffusion-fa" in cmd


def test_build_cmd_offload_and_fa_toggle_off():
    cmd = build_qwen_edit_cmd(
        "sd", "m", "r.png", "o.png", "p", offload_to_cpu=False, diffusion_fa=False
    )
    assert "--offload-to-cpu" not in cmd
    assert "--diffusion-fa" not in cmd


def test_qwen_edit_image_raises_when_no_output(tmp_path: Path, monkeypatch):
    import svi2_video_worker.qwen_edit as qe

    monkeypatch.setattr(qe.subprocess, "run", lambda *a, **k: None)  # produces nothing
    with pytest.raises(RuntimeError, match="no output"):
        qwen_edit_image("sd", "m", tmp_path / "ref.png", tmp_path / "edited.png", "p")


def test_qwen_edit_image_returns_path_on_success(tmp_path: Path, monkeypatch):
    import svi2_video_worker.qwen_edit as qe

    out = tmp_path / "edited.png"

    def _fake_run(cmd, **kw):
        Path(cmd[cmd.index("-o") + 1]).write_bytes(b"png")

    monkeypatch.setattr(qe.subprocess, "run", _fake_run)
    result = qwen_edit_image("sd", "m", tmp_path / "ref.png", out, "p")
    assert result == out and out.exists()
