# nexus.video.ltx23 backend worker

Python worker for the LTX-2.3 video extension. Speaks NDJSON JSON-RPC 2.0 over stdio to a Rust shim.

## Runtime profiles

Selected via env var `NEXUS_VIDEO_LTX23_RUNTIME`:

| Value | Pipeline module |
|---|---|
| `fake` (default if unset) | `pipeline_fake.py` — pure Python, no torch, no GPU. CI + frontend dev. |
| `rtx40-fp8` / `rtx50-fp8` / `rtx50-nvfp4` / `rtx50-gguf` | `pipeline_diffusers.py` (LTX-2.3) |
| `rtx50-ltxv097-gguf` | `pipeline_ltxv097.py` (LTX-Video 0.9.7) |
| `rtx50-ltx2-gguf` | `pipeline_ltx2.py` (LTX-2 19B native, `ltx-core`) |

## LTX-2 native path (spec 048)

`pipeline_ltx2.py` drives the LTX-2 19B distilled Kijai Q4 GGUF stack
through Lightricks' own `ltx-core` package. Spec 048 adds:

- **Image-to-video** — `ltx2_conditioning.py` encodes an input image to
  a keyframe latent applied via `VideoConditionByKeyframeIndex` before
  the denoise loop.
- **Multi-scene continuation** — `ltx2_multiscene.py` runs the
  `render.path == "manual_stitch"` branch: 2-3 scenes where scene N
  carries scene N-1's 3-frame latent tail as a continuation anchor, the
  19B transformer staying warm across every scene.
- **RIFE + 720p upscale** — `post_render_tail` chains the esrgan 720p
  upscale and RIFE 16→32 fps interpolation after stitching.

Generation profiles (`generation_profiles.py`): `ltxv2-distilled-q4`
(default i2v), `ltxv2-distilled-q4-quality` (guidance 1.1, negative
prompt live), `ltxv2-multiscene`. GPU smokes: `scripts/smoke-ltxv2-*`.

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
