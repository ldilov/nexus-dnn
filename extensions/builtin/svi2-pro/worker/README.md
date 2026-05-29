# svi2-pro Worker

Stdio JSON-RPC NDJSON render worker for Stable Video Infinity 2.0 Pro.

## Profiles

- `fake` — no-GPU CI mode (deterministic test frames)
- `rtx50-fp8` — RTX 50 Blackwell GPU, 16 GB VRAM, fp8 quantization

## Dependencies

Base: pydantic, pyyaml, ffmpeg-python, pillow, numpy, huggingface_hub.

Heavy ML stack in `[project.optional-dependencies] diffusers` extra.

Flash attention wheels in `[project.optional-dependencies] flash` extra (vendored under `../binaries/` for Windows; PyTorch index for Linux).

## Production install (isolated venv)

The host provisions an **isolated per-extension venv** automatically from `manifest.yaml`:

- `dependencies.steps.pkgs` (`type: package_set`, `manager: uv`, `target: extension_local`) → host creates `worker/.venv` and runs `uv sync --all-extras`, pinned via `UV_PROJECT_ENVIRONMENT` (no system-Python contamination).
- `--all-extras` installs `diffusers` (cu132 torch via the pinned `[[tool.uv.index]]`) + `flash` (vendored cu132 wheels) + `test`. `deepspeed` is the only Windows-excluded extra; ours are unaffected.
- Result: CUDA torch 2.12+cu132 + flash_attn 2.8.3 + render deps, isolated to this extension.

**Deploy requirement:** the `flash` extra resolves to the wheels under `../binaries/*.whl` (git-LFS). A fresh clone/deploy MUST fetch LFS objects first, else the flash install fails:

```bash
git lfs pull --include="extensions/builtin/svi2-pro/binaries/*"
```

(Linux deploys pull flash from PyPI via the `sys_platform == 'linux'` marker — no LFS needed there.)

## Testing

Run via the venv python (NOT plain `uv run`, which re-syncs to base deps and strips torch):

```bash
cd worker
.venv/Scripts/python.exe -m pytest -q          # Windows
# .venv/bin/python -m pytest -q                # Linux
# or keep extras when using uv:
uv run --extra diffusers --extra flash --extra test pytest -q
```
