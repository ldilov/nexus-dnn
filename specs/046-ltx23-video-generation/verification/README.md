# P0 verification spike

Pre-flight verification before P2 (real-runtime work) starts.

## Status

| Task | Status | File |
|---|---|---|
| P0-T001 — diffusers LTX-2.3 FP8 load + 1 segment on 16GB | **PENDING** (real GPU) | [`p0_diffusers_smoke.py`](p0_diffusers_smoke.py) |
| P0-T002 — Lightricks native inference.py fallback | N/A until T001 | (write if T001 fails) |
| P0-T003 — cold-spawn benchmark | **PENDING** (real GPU) | [`p0_cold_spawn_bench.py`](p0_cold_spawn_bench.py) |
| P0-T004 — HF repos exist | **✅ PASS (with corrections)** | [`p0-t004.md`](p0-t004.md) |

## How to run on a real GPU

```bash
# 1. Isolated venv (per the install playbook)
cd /tmp/ltx_p0_run
uv venv .venv --python 3.12 --seed
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 2. Install (FP8 path = cu128)
pip install --upgrade pip
pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 \
    --index-url https://download.pytorch.org/whl/cu128
pip install diffusers transformers accelerate safetensors huggingface_hub einops pillow numpy

# 3. Authenticate HF if the repo is private (Lightricks LTX-2.3 generally requires accepting a license)
huggingface-cli login

# 4. Run T001 (downloads ~22 GB checkpoint on first run)
python /path/to/specs/046-ltx23-video-generation/verification/p0_diffusers_smoke.py

# 5. Run T003 once T001 passes
python /path/to/specs/046-ltx23-video-generation/verification/p0_cold_spawn_bench.py
```

## Decision tree from results

```
P0-T001 result
├── pass → P0-T003 → use median_cold_spawn:
│     ├── < 15% of 1200s → switch D2 to process-per-segment (delete supervisor)
│     └── ≥ 15%          → keep warm-runtime + restart policy (current scaffold)
└── fail → write P0-T002 (Lightricks native inference.py)
      ├── pass → swap pipeline_diffusers.py for pipeline_native.py in P2; same JSON-RPC contract
      └── fail → escalate; LTX-2.3 may not be installable on this stack
```

All four outcomes are recoverable. P0 is the cheapest place to discover the truth — running it now saves rework in P2.
