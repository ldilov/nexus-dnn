# faceavatar_worker

Stdio JSON-RPC worker for the `nexus.3d.faceavatar` builtin extension — single
photo → identity 3D head (GLB) via Arc2Avatar (FLAME + ArcFace), plus a
FLAME→base-mesh identity graft. Two backends, selected by the
`NEXUS_3D_FACEAVATAR_RUNTIME` env var (set by the host from the manifest's
`backend_runtimes[].runtime_id` suffix):

- **`fake`** (default) — zero torch / zero GPU. Emits the real progress
  notification sequence and writes a byte-valid minimal GLB. Drives offline E2E +
  protocol verification (CI, Windows). Byte-deterministic.
- **`gb10`** — the real Arc2Avatar identity fit + FLAME graft on GB10 Spark
  (sm_121). **GPU-deferred** (spec §8): `pipeline_arc2avatar.py` + `graft.py` are
  stubs that validate the contract then raise `TODO(gpu-spike)`.

> **License:** FLAME / Arc2Avatar are **non-commercial** — recorded in the
> manifest + this banner.

## RPC surface (frozen scaffold contract)

| Method | Direction | Notes |
|---|---|---|
| `handshake` | req→res | runtime_id + protocol/version |
| `faceavatar.runtime.health` | req→res | real backend adds per-dep health + profile_status |
| `faceavatar.generate.start` | req→res | streams `faceavatar.generate.progress`; returns result payload |
| `faceavatar.generate.cancel` | req | cooperative cancel |
| `faceavatar.graft.start` | req→res | base_mesh + photo → grafted head; streams progress |
| `faceavatar.graft.cancel` | req | cooperative cancel |
| `runtime.release_memory` | req→res | gc + cuda empty_cache |

Notifications: `faceavatar.generate.progress` ({stage, step, total}),
`faceavatar.generate.artifact.created`, `faceavatar.generate.done`,
`faceavatar.generate.error`, `runtime.memory_stats`.

Outputs (both ops): `mesh_glb` (string path) + `metadata_json` (object).

Error codes: `GPU_NOT_SUPPORTED -32100`, `MODEL_MISSING -32101`,
`GENERATION_FAILED -32102`, `CANCELLED -32103`.

## Run the torch-free tests

```bash
cd extensions/builtin/faceavatar/worker
PYTHONPATH=src python -m pytest -q
```
