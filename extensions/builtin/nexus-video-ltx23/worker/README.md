# nexus.video.ltx23 backend worker

Python worker for the LTX-2.3 video extension. Speaks NDJSON JSON-RPC 2.0 over stdio to a Rust shim.

## Runtime profiles

Selected via env var `NEXUS_VIDEO_LTX23_RUNTIME`:

| Value | Pipeline module |
|---|---|
| `fake` (default if unset) | `pipeline_fake.py` — pure Python, no torch, no GPU. CI + frontend dev. |
| `rtx40-fp8` / `rtx50-fp8` / `rtx50-nvfp4` | `pipeline_diffusers.py` (P2+) |

## JSON-RPC contract

See `../../../contracts/runtime-rpc.json`.

Methods:
- `ltx.runtime.health` → returns `{ runtime_id, status, python_version, torch_version?, cuda_available?, gpu_name?, vram_total_mb? }`
- `ltx.video.models.list` → installed models for the active profile
- `ltx.video.plan.validate` → validates a `RenderPlan` against runtime capabilities
- `ltx.video.render.start` → starts a render (notifications below)
- `ltx.video.render.cancel` → cancels active render

Notifications (server → client):
- `ltx.video.progress`
- `ltx.video.segment.started`
- `ltx.video.segment.completed`
- `ltx.video.artifact.created`
- `ltx.video.done`
- `ltx.video.error`
- `runtime.memory_stats` (after each segment in warm mode)

## Tests

```bash
uv run pytest
```
