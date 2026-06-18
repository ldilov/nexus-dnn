from pathlib import Path

import svi2_video_worker.pipeline_svi2 as p


def _track_build_expert(monkeypatch):
    calls: list[Path] = []

    def fake(dit_path, lora_path, distill_lora_path=None, user_loras=None):
        calls.append(dit_path)
        return p.ExpertModel(dit=object(), fp8_audit={}, lora_audit={})

    monkeypatch.setattr(p, "_build_expert", fake)
    return calls


def test_single_file_loads_expert_once_and_reuses(tmp_path, monkeypatch):
    model = tmp_path / "smooth_mix_wan2.2_14b.safetensors"
    model.write_bytes(b"x")
    calls = _track_build_expert(monkeypatch)

    high, low = p._build_experts(
        {
            "dit_high_path": str(model),
            "dit_low_path": str(model),
            "models_dir": str(tmp_path),
        }
    )

    assert len(calls) == 1
    assert high is low


def test_distinct_high_low_loads_two_experts(tmp_path, monkeypatch):
    high_f = tmp_path / "high.safetensors"
    low_f = tmp_path / "low.safetensors"
    high_f.write_bytes(b"x")
    low_f.write_bytes(b"x")
    calls = _track_build_expert(monkeypatch)

    high, low = p._build_experts(
        {
            "dit_high_path": str(high_f),
            "dit_low_path": str(low_f),
            "models_dir": str(tmp_path),
        }
    )

    assert len(calls) == 2
    assert high is not low


def test_same_base_distinct_distill_loras_loads_two(tmp_path, monkeypatch):
    model = tmp_path / "base.safetensors"
    model.write_bytes(b"x")
    calls = _track_build_expert(monkeypatch)

    high, low = p._build_experts(
        {
            "dit_high_path": str(model),
            "dit_low_path": str(model),
            "distill_lora_high": str(tmp_path / "dh.safetensors"),
            "distill_lora_low": str(tmp_path / "dl.safetensors"),
            "models_dir": str(tmp_path),
        }
    )

    assert len(calls) == 2
    assert high is not low
