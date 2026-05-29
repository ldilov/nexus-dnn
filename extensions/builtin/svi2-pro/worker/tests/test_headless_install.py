from pathlib import Path

from svi2_video_worker.headless_install import main


def test_dry_run_lists_artifacts_without_downloading(tmp_path: Path, capsys):
    rc = main(["--profile", "rtx50-fp8", "--dest", str(tmp_path), "--dry-run"])
    assert rc == 0
    out = capsys.readouterr().out
    assert "dit-high-fp8" in out
    assert "svi-lora-high" in out
    assert not any(tmp_path.iterdir())
