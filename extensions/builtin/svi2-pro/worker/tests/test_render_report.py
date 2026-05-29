import json
from pathlib import Path

from svi2_video_worker.render_report import write_render_report
from svi2_video_worker.vram import probe_free_vram, peak_allocated


def test_write_render_report(tmp_path: Path):
    p = write_render_report(
        tmp_path,
        {
            "profile": "rtx50-fp8",
            "num_clips": 3,
            "frames_per_clip": 81,
            "width": 480,
            "height": 832,
            "fps": 15,
            "peak_vram_bytes": 0,
            "output_path": str(tmp_path / "out.mp4"),
        },
    )
    rec = json.loads(Path(p).read_text())
    assert rec["num_clips"] == 3 and rec["profile"] == "rtx50-fp8"


def test_vram_probes_safe_without_cuda():
    # must not raise when torch/CUDA absent; return ints
    assert isinstance(probe_free_vram(), int)
    assert isinstance(peak_allocated(), int)
