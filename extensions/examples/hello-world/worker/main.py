from __future__ import annotations

import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parents[4] / "sdk" / "python"))

from nexus_sdk.worker import BaseWorker, ExecutionContext


def echo_handler(inputs: dict[str, Any], config: dict[str, Any], context: ExecutionContext) -> dict[str, Any]:
    text = inputs.get("text", {}).get("value", "")
    prefix = config.get("prefix", "")
    output_text = f"{prefix}{text}" if prefix else text

    context.send_progress(50, "Processing...")

    write_ref = context.output_targets.get("text_out", {}).get("artifact_write_ref", "")
    artifact_ref = write_ref.replace("artifact-write://", "artifact://") if write_ref else f"artifact://text_out_{context.request_id}"

    return {
        "status": "completed",
        "outputs": {
            "text_out": {
                "artifact_ref": artifact_ref,
                "type": "text/plain",
            }
        },
        "metrics": {"duration_ms": 1},
    }


worker = BaseWorker(
    extension_id="nexus.utility.hello-world",
    extension_version="0.1.0",
    worker_name="hello-world-worker",
)
worker.register_operator("echo", "1.0.0", echo_handler)
worker.run()
