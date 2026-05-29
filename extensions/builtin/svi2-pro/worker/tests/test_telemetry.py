import json
from svi2_video_worker.telemetry import WorkerLogger


def test_logger_writes_structured_json_to_stderr(capsys):
    log = WorkerLogger()
    log.info("worker.start", profile="fake", version="0.1.0")
    err = capsys.readouterr().err.strip().splitlines()[-1]
    rec = json.loads(err)
    assert rec["level"] == "info" and rec["event"] == "worker.start"
    assert rec["profile"] == "fake" and rec["target"] == "nexus.video.svi2-pro"
