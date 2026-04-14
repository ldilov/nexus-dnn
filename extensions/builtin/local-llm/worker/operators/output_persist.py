"""Operator handler for llm.output.persist — persist assistant message as typed artifact."""
from __future__ import annotations

from typing import TYPE_CHECKING, Any

from nexus_sdk.artifacts import ArtifactIO

if TYPE_CHECKING:
    from nexus_sdk.worker import ExecutionContext


def handle_output_persist(inputs: dict[str, Any], config: dict[str, Any], context: ExecutionContext) -> dict[str, Any]:
    """Write assistant output to an artifact target if one is configured."""
    message_content = inputs.get("message", {}).get("value", "")
    artifact_format = config.get("format", "text")

    artifacts = ArtifactIO(context)

    try:
        if artifact_format == "json":
            import json
            parsed = json.loads(message_content)
            artifacts.write_json("artifact_ref", parsed, artifact_type="llm-output")
        else:
            artifacts.write_text("artifact_ref", message_content, artifact_type="llm-output")

        context.send_progress(100, "Output persisted")

        return {
            "status": "completed",
            "outputs": {
                "artifact_ref": {"artifact_ref": "artifact_ref"},
            },
            "metrics": {"bytes_written": len(message_content.encode("utf-8"))},
        }
    except KeyError:
        context.send_progress(100, "Output captured (no write target)")

        return {
            "status": "completed",
            "outputs": {
                "artifact_ref": {"value": message_content},
            },
            "metrics": {},
        }
