# svi2-pro — Design Spec

**Date:** 2026-05-29
**Status:** Approved design (brainstorming output). Next step: implementation plan.
**Extension id:** `nexus.video.svi2-pro`
**Goal:** New builtin nexus-dnn extension that generates long, cross-clip-consistent **image-to-video** using **Stable Video Infinity (SVI) 2.0 Pro** on a single **16 GB** GPU (RTX 5070 Ti / Blackwell). Listed in the extensions UI, dependencies installable, models via Model Foundry.

---

## 0. What SVI 2.0 Pro is (grounding)

SVI 2.0 Pro = **two LoRAs** (high-noise + low-noise) on top of **Wan 2.2 I2V A14B**, a **dual-expert MoE** (a high-noise expert DiT + a low-noise expert DiT). Long video is produced by chaining 81-frame clips, each conditioned on the previous clip's **raw latent tail** plus a **fixed anchor latent** from the original first frame ("error recycling"). Source: the `svi_wan22` branch zip — `inference_svi_2.0_pro.py`, `diffsynth/pipelines/wan_video_svi_pro.py`, `comfyui_workflow/`.

### Locked decisions (from brainstorming)
| Decision | Choice |
|---|---|
| Engine | **Fresh hand-rolled worker**, no DiffSynth dependency. Vendor only the Wan2.2 DiT math. |
| DiT source | **Approach A** — vendor DiffSynth's `WanModel` (+ scheduler/attention/embeddings) from the zip. |
| Base weights | **Kijai fp8_e4m3 Wan2.2 A14B HIGH + LOW** (`_KJ.safetensors`). |
| LoRAs | **SVI v2.0 pro** high + low (`epfl-vita/svi-model`, `version-2.0`). |
| LoRA application | **Runtime additive (NOT fused)** — preserves fp8 base in RAM. |
| 16 GB strategy | One expert on-GPU at a time; swap at boundary 0.875; block-swap as fallback knob. |
| System RAM | 64 GB+ confirmed — both fp8 experts resident in CPU RAM. |
| Attention | **flash_attn 2.8.3** via prebuilt cu132 wheel (mjun0812 v0.9.26, `win_amd64`, torch2.12); SDPA runtime fallback if import fails. |
| Torch/CUDA | **torch 2.12 + cu132** (proven Blackwell path in LongCat; matches the flash_attn wheel's `+cu132torch2.12` tag). |
| v1 "done" | Full pipeline + installer + manifest + UI listing + fake backend + offline tests green. GPU E2E smoke scripted for operator to run. |
| Host impact | **Zero host changes** — pure Python-worker extension. |
| GGUF | Explicitly **not** in v1. |

---

## 1. Architecture / Engine

Headless Python worker, **stdio JSON-RPC**, broker-leased — same operational shape as `nexus-video-longcat`, but fresh code. No DiffSynth runtime dependency.

**Vendored from the zip (the math only):** `WanModel` (Wan2.2 A14B DiT), flow-match scheduler, attention, time/text/image embeddings. DiffSynth's loader, offload manager, and pipeline classes are **stripped** — we feed the vendored `WanModel` from our own loader.

**Owned (fresh code):** fp8 loader, LoRA application, expert router, sampling loop, cross-clip chain, RPC framing, installer, VRAM management, ffmpeg I/O, render report.

---

## 2. Models — Model Foundry declarations

Declared in `backends/rtx50-fp8/versions.yaml` as `artifacts[]` (`source.kind: huggingface` / `huggingface_split`), resolved by the worker installer at first render. No host registry edit.

| Artifact id | Size | Repo / file |
|---|---|---|
| `dit-high-fp8` | 14.0 GB | `Kijai/WanVideo_comfy_fp8_scaled` → `I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors` |
| `dit-low-fp8` | 14.0 GB | `Kijai/WanVideo_comfy_fp8_scaled` → `I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors` |
| `svi-lora-high` | 1.14 GB | `epfl-vita/svi-model` → `version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors` |
| `svi-lora-low` | 1.14 GB | `epfl-vita/svi-model` → `version-2.0/SVI_Wan2.2-I2V-A14B_low_noise_lora_v2.0_pro.safetensors` |
| `text-encoder` | 6.27 GB | `Kijai/WanVideo_comfy` → `umt5-xxl-enc-fp8_e4m3fn.safetensors` |
| `vae` | 1.31 GB | `Kijai/WanVideo_comfy` → `Wan2_2_VAE_bf16.safetensors` |

Total ≈ 37.9 GB. (`size_bytes`/`sha256` to be filled from HF at manifest-authoring time; placeholder `0`/zeros pattern as LongCat does until pinned.)

---

## 3. fp8 + LoRA strategy (load-bearing)

**fp8 loader (`fp8_loader.py`):** Read Kijai `_KJ` safetensors. Each Linear carries a per-tensor `*.scale_weight`; weights are `torch.float8_e4m3fn`. Forward uses `torch._scaled_mm(x_fp8, W_fp8, scale_a=1, scale_b=scale_weight)` (activations cast to fp8 with clamp to ±448.0). Mirrors the proven repo technique — implemented fresh, no LongCat import.

**LoRA application (`lora.py`): runtime additive, NOT fused.**
- Forward per patched Linear: `out = scaled_mm(x, W_fp8, scale) + (x @ Aᵀ) @ Bᵀ · α`, with LoRA `A`/`B` kept in bf16 (small).
- `α = 1`. High LoRA → high expert; low LoRA → low expert.
- **Rationale:** fusing `W += B@A` would require dequantizing fp8→bf16 (≈28 GB/expert × 2 = 56 GB RAM, tight even at 64 GB and wasteful). Runtime additive keeps both experts at fp8 (~28 GB total) and matches how the ComfyUI/Kijai path applies SVI LoRA onto fp8.
- Loader accepts `lora_up/down` and `lora_A/B` key conventions; strips `diffusion_model.` prefix (SVI ships these conventions).

---

## 4. VRAM strategy (16 GB)

- Both fp8 experts in **pinned CPU RAM** (64 GB ✓). **Only the active expert resides on GPU.**
- **Expert router (`expert_router.py`):** scheduler `shift=5` front-loads high sigmas. While `timestep ≥ 875` the **HIGH** expert is on GPU; on the first step with `timestep < 875`, evict HIGH → CPU, move **LOW** → GPU (one-way per clip, boundary `0.875`).
- One ~14 GB fp8 expert + 81-frame activations at the training resolution (832×480 or 480×832, H×W) fits 16 GB.
- **Block-swap depth** is a fallback knob (offload N of 28 transformer blocks) if OOM observed during the GPU smoke.
- T5 on GPU only during text encode; VAE on GPU only during encode/decode; both offloaded otherwise.

---

## 5. Per-clip data flow (SVI loop — ported into `svi_chain.py` + `pipeline_svi2.py`)

1. **Text encode:** UMT5 encodes prompt + fixed negative prompt → offload T5.
2. **Conditioning `y`** (channel-concat onto noise input):
   - Clip 0: `y = concat([VAE(anchor_image), zeros])` (1 anchor latent + 20 zeros).
   - Clip N>0: `y = concat([VAE(anchor_image), prev_last_latent[:, -num_motion_latent:], zeros])`.
   - **Anchor latent at position 0 is fixed for the entire sequence** (always the original first frame).
3. **Denoise:** latent shape `(1, 16, 21, H/8, W/8)` for 81 frames. `FlowMatchScheduler("Wan")`, `shift=5`, N steps. CFG: `nega + cfg_scale·(posi − nega)`. Expert router swaps at 0.875.
4. **Recycle:** store the **raw latent tail** as `prev_last_latent` (never decode→re-encode — this is the error-recycling mechanism).
5. **Decode + stitch:** VAE decode → frames; for clips >0 drop the first `num_overlap_frame` frames to dedupe the seam.
6. Loop `num_clips`; assemble all frames → mp4 via ffmpeg; write `render_report.json`.

### Render params (RPC inputs)
`ref_image_path`, `prompts[]` (one per clip, or a stream), `height`/`width` (H×W; pro README default H=832 W=480, landscape 480×832 also supported), `num_frames`=81, `fps`=15, `num_clips`, `cfg_scale` (default 5.0), `num_overlap_frame` (1–4), `num_motion_latent` (default 1), `seed_multiplier` (seed = `clip_idx·seed_multiplier`).

---

## 6. Worker module map (`worker/src/svi2_video_worker/`)

| Module | Responsibility |
|---|---|
| `__main__.py` | stdout-hijack guard → cli → `Worker(profile)` → asyncio run |
| `main.py` | Worker event loop, handler registry, notification emit |
| `rpc.py` | JSON-RPC framing: parse_request / ok_response / notification / error codes |
| `telemetry.py` | structured stderr logging |
| `io_safety.py` | scrub sensitive, safe subprocess env |
| `installer.py` / `headless_install.py` | resolve `versions.yaml` artifacts → `huggingface_hub.snapshot_download`; completion sentinel |
| `fp8_loader.py` | load Kijai `_KJ` fp8 (scale_weight + `_scaled_mm` Linear) |
| `lora.py` | parse SVI LoRA, runtime-additive application per expert |
| `wan22/` | **vendored** WanModel (DiT) + flow-match scheduler + attention + embeddings |
| `vae.py` | AutoencoderKLWan wrapper (encode anchor/motion, decode frames) |
| `text_encoder.py` | UMT5-XXL wrapper |
| `expert_router.py` | boundary-0.875 high↔low GPU residency swap |
| `svi_chain.py` | cross-clip loop: anchor-0 fix, latent-tail recycle, overlap stitch |
| `pipeline_svi2.py` | real handler for `svi2.video.render.start` |
| `pipeline_fake.py` | CI path — emits synthetic frames, no torch GPU |
| `vram.py` | VRAM probe / block-swap budget |
| `ffmpeg_io.py` | frame → mp4 assembly |
| `render_report.py` | `render_report.json` writer |

**RPC surface:** `svi2.video.render.start` + `svi2.video.install.start` / `.status`; per-clip and per-step progress notifications.

---

## 7. Extension shell (mirror `nexus-video-longcat`)

```
extensions/builtin/svi2-pro/
  manifest.yaml                 # id nexus.video.svi2-pro; spec_version "0.1"
                                # dependencies.steps: python(>=3.11,<3.13; cuda12/cuda13) → uv pkgs → ffmpeg → validate
                                # capabilities: filesystem.r/w, process.spawn, gpu.compute,
                                #   huggingface.{search,install}, model.registry.read, workspace.r/w
                                # backend_runtimes: rtx50-fp8 (16GB) + fake (CI)
  backends/
    fake/versions.yaml          # artifacts: []
    rtx50-fp8/versions.yaml     # the 6 artifacts from §2
  operators/
    svi2_render.yaml            # method svi2.video.render.start
  schemas/
    svi2_render_params.schema.json
  scripts/
    install.sh + install.ps1
    smoke-rtx50-fp8.sh + smoke-rtx50-fp8.ps1
  worker/
    pyproject.toml              # torch 2.12 via [tool.uv.sources] → pytorch cu132 index (Blackwell);
                                # flash_attn 2.8.3 from mjun0812 v0.9.26 prebuilt cu132 wheel (win_amd64)
    uv.lock
    src/svi2_video_worker/...   # §6
    tests/...                   # §9
  README.md
```

- **UI listing:** automatic via the host's generic manifest scanner — appears in the extensions gallery. No host edit.
- **CUDA/torch:** `worker/pyproject.toml` `[tool.uv.sources]` + `[[tool.uv.index]]` route torch to the **cu132** wheel index (`torch>=2.12`, Blackwell sm_120 — LongCat's proven path). **flash_attn 2.8.3** declared as a direct prebuilt-wheel URL dependency from mjun0812 `flash-attention-prebuild-wheels` v0.9.26 (`flash_attn-2.8.3+cu132torch2.12-cp31x-cp31x-win_amd64.whl`), platform-gated to `win_amd64`. The Windows wheels (cp311 + cp312, ~229 MiB each) are **vendored in-repo under `binaries/` via git-lfs** and pinned through `[tool.uv.sources]` path entries (no network fetch at install). Linux uses the PyPI flash-attn wheel (`sys_platform == 'linux'`). Runtime guard: if `import flash_attn` fails, the vendored attention falls back to torch SDPA (mirrors LongCat's `_patch_attention_to_use_sdpa`).

---

## 8. Error handling

- **fp8 NaN guard:** `nan_to_num` on suspect outputs + reseed-retry (seed perturbation) — carryover from known fp8_e4m3 overflow behavior.
- **OOM:** reduce block-swap depth / lower guidance; surface an actionable error rather than a raw CUDA OOM.
- **RPC boundary:** validate all inputs against `svi2_render_params.schema.json`; fail fast with clear messages.
- **prompts vs num_clips mismatch:** explicit handling (truncate/pad rule defined in pipeline; documented in schema).
- **Model resolution:** installer surfaces clear errors on HF download/auth failure; never silently proceeds with missing weights.

---

## 9. Testing

**Offline (CI, no GPU) — all green before v1 "done":**
- `pipeline_fake` end-to-end (frame count, mp4 produced, report written).
- RPC framing (parse/serialize, error codes).
- `fp8_loader`: synthetic `scale_weight` tensor → `_scaled_mm` result matches a bf16 reference within tolerance.
- `lora`: additive delta correctness vs a reference `W + B@A` application.
- `expert_router`: timestep → expert selection + one-way swap at 0.875.
- `svi_chain`: anchor latent fixed at pos 0; `prev_last_latent` tail recycling; overlap-dedupe frame counts.
- `installer`: artifact resolution from `versions.yaml` with mocked HF.
- `render_report` schema.

**GPU smoke (operator-run on RTX 5070 Ti):** `scripts/smoke-rtx50-fp8.{sh,ps1}` — single + multi-clip i2v render, asserts no NaN/no OOM, peak VRAM within 16 GB, output mp4 valid. Cross-platform pair required.

---

## 10. Host-boundary compliance

- Pure Python-worker extension → **no host crate, no host migration, no host route, no host UI edit**.
- If render-state persistence is later needed: extension-owned `storage:` block + `storage/migrations/001_*.sql`, tables prefixed `ext_nexus_video_svi2_pro__*`.
- If HTTP routes later needed: extension-owned Rust crate implementing `ExtensionRouterProvider` under `extensions/builtin/svi2-pro/`.

---

## 11. Open risks (carried into the plan)

1. **Vendored WanModel scope** — pin exactly which DiffSynth modules to copy; confirm it loads a Kijai fp8 expert and runs one forward without NaN (first spike).
2. **fp8 key-name bridge** — Kijai `_KJ` tensor names vs vendored WanModel's expected names; confirm/author the remap.
3. **SVI LoRA key hit-rate** — verify SVI LoRA keys map onto the vendored WanModel layers after fp8 load (proven in ComfyUI; re-verify in our loader).
4. **flash_attn 2.8 on Blackwell** — RESOLVED: mjun0812 v0.9.26 ships `flash_attn-2.8.3+cu132torch2.12-cp311/cp312-win_amd64.whl`. Declared as a direct wheel-URL dep; SDPA fallback retained as defense. (FA2 on sm_120 expected to run since the wheel is cu132-built; GPU smoke confirms.)
5. **T5/VAE format** — Kijai fp8 UMT5 + Wan VAE bf16 must load into the vendored wrappers (vs DiffSynth-converted formats).

---

### Appendix — discovery notes
`C:\Users\lazar\AppData\Local\Temp\svi-research\findings\` → `A_pipeline_trace.md`, `B_model_manifest.md`, `C_engine_comparison.md`, `D_nexus_conventions.md`.
Prior requirements doc: `docs/research/2026-05-29-svi2-pro-requirements.md`.
