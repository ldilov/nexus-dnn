# svi2-pro Worker

Stdio JSON-RPC NDJSON render worker for Stable Video Infinity 2.0 Pro.

## Profiles

- `fake` — no-GPU CI mode (deterministic test frames)
- `rtx50-fp8` — RTX 50 Blackwell GPU, 16 GB VRAM, fp8 quantization

## Dependencies

Base: pydantic, pyyaml, ffmpeg-python, pillow, numpy, huggingface_hub.

Heavy ML stack in `[project.optional-dependencies] diffusers` extra.

Flash attention wheels in `[project.optional-dependencies] flash` extra (vendored under `../binaries/` for Windows; PyTorch index for Linux).

## Testing

```bash
cd worker
uv run pytest -q
```
