# trellis2_worker

Stdio JSON-RPC worker for the `nexus.3d.trellis2` builtin extension — image → 3D
mesh (GLB) via Microsoft TRELLIS.2-4B. Two backends, selected by the
`NEXUS_3D_TRELLIS2_RUNTIME` env var (set by the host from the manifest's
`backend_runtimes[].runtime_id` suffix):

- **`fake`** (default) — zero torch / zero GPU. Emits the real progress
  notification sequence and writes a byte-valid minimal GLB. Drives offline
  E2E + protocol verification (CI, Windows).
- **`gb10-flash`** — the proven P0 pipeline (torch 2.12/cu132, py3.12,
  ATTN_BACKEND=flash_attn, transformers==4.56.0, 4 vendored aarch64 kernels +
  flash_attn). Verified on the GB10 Spark (sm_121). See
  `docs/research/comfyui-trellis2/2026-06-24-trellis2-P0-COMPLETE.md`.

## RPC surface (frozen P0.5 contract)

| Method | Direction | Notes |
|---|---|---|
| `handshake` | req→res | runtime_id + protocol/version |
| `trellis2.runtime.health` | req→res | real backend adds per-dep health + profile_status |
| `trellis2.generate.start` | req→res | streams `trellis2.generate.progress`; returns result payload |
| `trellis2.generate.cancel` | req | cooperative cancel in the sampler loops |
| `runtime.release_memory` | req→res | gc + cuda empty_cache |

Notifications: `trellis2.generate.progress` ({stage, step, total}),
`trellis2.generate.artifact.created`, `trellis2.generate.done`,
`runtime.memory_stats`.

Error codes: `GPU_NOT_SUPPORTED -32100`, `MODEL_MISSING -32101`,
`GENERATION_FAILED -32102`, `CANCELLED -32103`.

## Run the torch-free tests

```bash
cd extensions/builtin/trellis2/worker
PYTHONPATH=src python -m pytest tests/ -x
```
