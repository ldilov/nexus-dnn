from pathlib import Path

import pytest

from svi2_video_worker.seed_synthesis import build_seed_txt2img_cmd, synthesize_seed_frame


def test_build_cmd_uses_base_qwen_image_model_and_no_ref():
    cmd = build_seed_txt2img_cmd(
        "C:/sd/sd-cli.exe", "C:/m", "out.png", "a stormy castle",
        width=832, height=480,
    )
    assert cmd[0] == "C:/sd/sd-cli.exe"
    joined = " ".join(cmd)
    # base txt2img diffusion model (NOT the edit model) + shared encoder/vae
    assert "Qwen-Image-Q5_K_M.gguf" in joined
    assert "Qwen-Image-Edit" not in joined
    assert "qwen_image_vae.safetensors" in joined
    assert "Qwen2.5-VL-7B-Instruct.Q4_K_M.gguf" in joined
    # txt2img: no reference-image flag
    assert "-r" not in cmd
    # prompt + output wired
    assert cmd[cmd.index("-p") + 1] == "a stormy castle"
    assert cmd[cmd.index("-o") + 1] == "out.png"


def test_build_cmd_threads_render_resolution():
    cmd = build_seed_txt2img_cmd(
        "sd", "m", "o.png", "p", width=720, height=1280,
    )
    assert cmd[cmd.index("-W") + 1] == "720"
    assert cmd[cmd.index("-H") + 1] == "1280"


def test_build_cmd_wires_numeric_seed():
    cmd = build_seed_txt2img_cmd(
        "sd", "m", "o.png", "p", width=64, height=64, seed=98765,
    )
    assert cmd[cmd.index("-s") + 1] == "98765"


def test_build_cmd_omits_seed_flag_when_none():
    cmd = build_seed_txt2img_cmd("sd", "m", "o.png", "p", width=64, height=64, seed=None)
    assert "-s" not in cmd


def test_synthesize_returns_path_on_success(tmp_path: Path, monkeypatch):
    import svi2_video_worker.seed_synthesis as ss

    out = tmp_path / "seed.png"

    def _fake_run(cmd, **kw):
        Path(cmd[cmd.index("-o") + 1]).write_bytes(b"pngbytes")

    monkeypatch.setattr(ss.subprocess, "run", _fake_run)
    result = synthesize_seed_frame("sd", "m", out, "a prompt", width=64, height=64)
    assert result == out and out.exists()


def test_synthesize_raises_when_no_output(tmp_path: Path, monkeypatch):
    import svi2_video_worker.seed_synthesis as ss

    monkeypatch.setattr(ss.subprocess, "run", lambda *a, **k: None)
    with pytest.raises(RuntimeError, match="no output"):
        synthesize_seed_frame("sd", "m", tmp_path / "seed.png", "p", width=64, height=64)


def test_synthesize_raises_on_empty_output_frame(tmp_path: Path, monkeypatch):
    import svi2_video_worker.seed_synthesis as ss

    out = tmp_path / "seed.png"

    def _fake_run(cmd, **kw):
        Path(cmd[cmd.index("-o") + 1]).write_bytes(b"")

    monkeypatch.setattr(ss.subprocess, "run", _fake_run)
    with pytest.raises(RuntimeError, match="empty"):
        synthesize_seed_frame("sd", "m", out, "p", width=64, height=64)
