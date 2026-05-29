# svi2-pro — Technical Requirements (Discovery Output)

**Date:** 2026-05-29
**Status:** Requirements / pre-spec. No code written. For review before any build.
**Author:** discovery pass (4 parallel agents + orchestrator synthesis)
**Target:** new builtin extension `svi2-pro` — long image-to-video on a single **16 GB** GPU (RTX 5070 Ti / Blackwell), listed in the nexus-dnn extensions UI, dependencies installable, models via Model Foundry.

---

## 1. Verdict (TL;DR)

- **What SVI 2.0 Pro actually is:** two **LoRAs** (high-noise + low-noise) applied on top of **Wan 2.2 I2V A14B** — a *dual-expert MoE* (a high-noise expert DiT + a low-noise expert DiT). It is **not** a standalone model. Long video is produced by chaining 81-frame clips with cross-clip "error recycling".
- **Base-model correction (resolved with user):** the originally-linked `Wan2_1-I2V-14B-720p_fp8…` is **Wan 2.1, single-expert** — incompatible with the 2.2 dual-LoRA. Corrected to the **Wan2.2 A14B HIGH + LOW fp8** experts from the same Kijai repo.
- **Recommended engine:** **reuse LongCat's in-repo fp8 loader** (`longcat_safetensors_loader.py` — already loads Kijai `_KJ.safetensors` fp8 + fuses bf16 LoRA, headless, on 16 GB Blackwell) and extend it for the Wan2.2 **dual-expert** + **dual-LoRA** + SVI cross-clip loop. This beats DiffSynth (needs an fp8→bf16 converter + large system RAM) and Kijai-as-library (ComfyUI-coupled, high port effort).
- **16 GB feasibility:** **FITS** with one expert resident at a time (sequential high→low swap) + block-swap. fp8 ≈ 14 GB/expert; only one on-GPU at once.
- **Biggest engineering risk:** the Wan2.2 DiT **forward/architecture** differs from LongCat's DiT. The fp8 *loading mechanics* transfer directly; the *model definition* and *SVI sampling loop* must be ported. This is the central spike.

---

## 2. Architecture of SVI 2.0 Pro (confirmed from source)

Sources: `inference_svi_2.0_pro.py`, `diffsynth/pipelines/wan_video_svi_pro.py`, `comfyui_workflow/SVI-Wan22-1210-4-Clips.json`.

### 2.1 Components
| Component | Role |
|---|---|
| `dit` (high-noise expert) | Wan2.2 A14B high-noise transformer; SVI **high** LoRA fused (α=1) |
| `dit2` (low-noise expert) | Wan2.2 A14B low-noise transformer; SVI **low** LoRA fused (α=1) |
| T5 (UMT5-XXL) | text encoder |
| VAE (Wan 2.1 / Wan 2.2 VAE) | latent encode/decode |
| CLIP image encoder | per-clip image conditioning |

### 2.2 MoE expert switching (load-bearing)
- Controlled by `switch_DiT_boundary = 0.875`. While `timestep >= 875` use `dit` (high-noise); once `timestep < 875` switch **permanently** to `dit2` (low-noise) — one-way, no switch-back.
- Scheduler: `FlowMatchScheduler("Wan")`, sigmas 1→0, `shift=5` (front-loads high sigmas), 50 steps default. Net effect: high expert active only the first ~3–4 steps, low expert handles the rest.
- ComfyUI workflow accelerated variant: LightX2V distill LoRA + **6 steps**, cfg≈1.5–2, `dpm++_sde`; two sequential sampler passes per clip implement the high→low split.

### 2.3 Cross-clip conditioning — the "error recycling" trick (THE consistency mechanism)
`WanVideoUnit_ImageEmbedderVAE` builds a conditioning tensor `y`, channel-concatenated onto the noise input:
- **Clip 0:** `y = concat([VAE(anchor_image), zeros])` — 1 anchor latent + 20 zero latents.
- **Clip N>0:** `y = concat([VAE(anchor_image), prev_last_latent[:, -num_motion_latent:], zeros])`.
- The **anchor latent at position 0 is fixed for the entire sequence** (always the original first frame).
- Motion is carried by the **raw latent tail of the previous clip** — never decoded to pixels and re-encoded. This raw-latent recycling is the "error recycling" that prevents drift/melt across clips.
- README re-implementation tip: the padding/anchor frame must **never** appear inside the currently-generated clip; strong augmentation on the first frame encourages restoration toward the anchor.

### 2.4 Generation parameters (defaults + meaningful ranges)
| Param | Default | Range / note |
|---|---|---|
| height × width | 480×832 (pro README uses 832×480) | training res; off-ratio hurts prompt following |
| frames_per_clip | 81 | → latent T = 21 |
| fps | 15 | |
| num_clips | 15 (README pro demo: 50 → 250 s) | |
| cfg_scale | 5.0 py / 1.5 comfy+distill | |
| num_overlap_frame | 1–4 | pixel-level dedupe at stitch |
| num_motion_latent | 1 | 0–5; latents recycled from prev clip |
| num_motion_frame | 1–4 | decoded frames bookkeeping (not model cond) |
| seed | `clip_idx * seed_multiplier` | deterministic per clip |

### 2.5 LoRA application
`GeneralLoRALoader.fuse_lora_to_base_model`, α=1 → permanent `W += B@A` fuse. Loader accepts both `lora_up/down` (ComfyUI/kohya) and `lora_A/B` (PEFT) keys, strips `diffusion_model.` prefix. **SVI LoRA keys are portable to a Kijai fp8 base** — the shipped ComfyUI workflow already loads the SVI `.safetensors` LoRAs onto fp8 Wan2.2 DiTs via `WanVideoLoraSelect`. fp8 affects weight dtype, not parameter names.

---

## 3. Model Download Manifest (confirmed via HF API)

**Canonical SVI org = `epfl-vita`** (the README's `vita-video-gen` resolves here). MIT-licensed.

| # | File | Size | Source |
|---|---|---|---|
| 1 | Wan2.2 A14B **HIGH** expert, fp8_e4m3fn | **14.0 GB** | `Kijai/WanVideo_comfy_fp8_scaled` → `I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors` |
| 2 | Wan2.2 A14B **LOW** expert, fp8_e4m3fn | **14.0 GB** | same repo → `I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors` |
| 3 | SVI **high-noise** LoRA v2.0 **pro** | **1.14 GB** | `epfl-vita/svi-model` → `version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors` |
| 4 | SVI **low-noise** LoRA v2.0 **pro** | **1.14 GB** | same repo → `…_low_noise_lora_v2.0_pro.safetensors` |
| 5 | UMT5-XXL text encoder (fp8) | **6.27 GB** | `Kijai/WanVideo_comfy` → `umt5-xxl-enc-fp8_e4m3fn.safetensors` |
| 6 | Wan VAE (bf16) | **1.31 GB** | `Kijai/WanVideo_comfy` → `Wan2_2_VAE_bf16.safetensors` |

Total ≈ **37.9 GB**. e5m2 base variants exist as alternates.

**Lower-VRAM wildcard (future option):** `QuantStack/Wan2.2-I2V-A14B-GGUF` Q4_K_M ≈ **9 GB/expert** → ~10.3 GB peak single-expert, no block-swap. BUT requires a ComfyUI-GGUF loader path (coupling) and **SVI-LoRA-on-GGUF is unconfirmed** — needs a test before adoption. Not the v1 path.

> Note: SVI's reference T5/VAE are DiffSynth-converted `.pth`. If we keep the DiffSynth sampling code we must source T5/VAE in the format that code expects, or adapt the loader. Resolve in the spike (§7).

---

## 4. Engine Decision

| Criterion | LongCat-loader reuse (recommended) | DiffSynth (repo-native) | Kijai as library |
|---|---|---|---|
| Loads Kijai fp8 `_KJ` directly | **YES (already in repo)** | NO (needs fp8→bf16 converter) | YES |
| Headless (no ComfyUI) | **YES** | YES | NO (imports `comfy.*`, `server.PromptServer`) |
| 16 GB fit | **YES (fp8 + swap)** | Marginal; streams bf16 from CPU (high RAM) | YES (block-swap proven) |
| SVI dual-expert routing | port (add 2nd DiT + boundary) | **built-in** | not in nodes; must add |
| SVI dual-LoRA fuse | extend (single→dual) | **built-in** | partial wiring |
| Wan2.2 DiT forward | **must port/vendor** | **built-in** | built-in |
| Port effort | Medium | Low-Medium | High (2–4 d shims) |
| Repo consistency | **High (mirrors LongCat)** | New framework dep | New framework dep |

### Recommendation: **Hybrid — LongCat fp8 loader + ported Wan2.2 DiT + ported SVI loop**
- Reuse `longcat_safetensors_loader.py` mechanics: per-tensor `*.scale_weight`, `torch.float8_e4m3fn`, `torch._scaled_mm(scale_a=1, scale_b=scale_weight)`. Proven headless on 16 GB Blackwell, already fuses bf16 LoRA onto fp8 base.
- **Vendor the Wan2.2 DiT model definition** (from DiffSynth's `WanModel`, or diffusers `WanTransformer3DModel`) — weights fed via the fp8 loader, not DiffSynth's loader.
- **Port the SVI sampling loop** (`wan_video_svi_pro.py`): dual-expert boundary switch (0.875), dual-LoRA, anchor-latent-0 fix + raw-latent-tail recycling, FlowMatch `shift=5`.

This honors the user's Kijai-fp8 base, stays headless, fits 16 GB, and maximizes reuse of an already-working in-repo pattern.

**Rejected:** DiffSynth as the engine (fp8 converter + ~56 GB RAM to hold both bf16 experts; off-pattern for this repo) — but keep `wan_video_svi_pro.py` as the **algorithm reference**. Kijai-as-library (ComfyUI coupling violates the clean-worker model).

---

## 5. 16 GB VRAM Strategy
- **One expert on-GPU at a time.** High expert resident for the first ~3–4 (of N) steps, then evict to CPU and bring the low expert on-GPU for the remainder. Per-clip cost: 2 expert loads (one swap).
- **Block-swap** ~10–20 of 28 transformer blocks to CPU to hold KV/activations for 81 frames @ 480×832 within budget (LongCat already has the offload scaffold to mirror).
- T5 encodes once per clip then offloads; VAE on-GPU only during encode/decode.
- Expect **2–3× slower** than a 24 GB card. Tune block-swap depth as the 16 GB throttle.
- **fp8 NaN risk:** prior LongCat experience shows fp8_e4m3 overflow → NaN. Carry over LongCat's NaN guards (nan_to_num / reseed-retry) into the SVI loop.

---

## 6. Extension Scaffold (grounded in LongCat conventions)

`extensions/builtin/svi2-pro/` (mirror `nexus-video-longcat/`):

```
svi2-pro/
  manifest.yaml                 # id "nexus.video.svi2-pro"; spec_version "0.1"
                                # dependencies.steps: python(>=3.11,<3.13; cuda12/cuda13) + uv pkgs + ffmpeg + validate
                                # capabilities: filesystem.r/w, process.spawn, gpu.compute,
                                #   huggingface.{search,install}, model.registry.read, workspace.r/w
                                # backend_runtimes: rtx50-fp8 (16GB) + fake (CI)
  backends/
    fake/versions.yaml          # artifacts: []
    rtx50-fp8/versions.yaml     # the 6 artifacts from §3 (HF repo/revision/file/size/sha256)
  operators/
    svi2_render.yaml            # method e.g. "svi2.video.render.start"
  schemas/
    svi2_render_params.schema.json
  scripts/
    install.sh + install.ps1    # POSIX + PowerShell pair (cross-platform rule)
    smoke-rtx50-fp8.sh + .ps1
  worker/
    pyproject.toml              # torch via [tool.uv.sources] → pytorch cu128 index (Blackwell)
    uv.lock
    src/svi2_video_worker/
      __main__.py  main.py  rpc.py  telemetry.py
      installer.py  headless_install.py  io_safety.py
      pipeline_fake.py          # CI path, no GPU
      pipeline_svi2.py          # real path: dual-expert + dual-LoRA + SVI clip loop
      wan22_dit.py              # vendored Wan2.2 DiT model definition
      fp8_loader.py             # ported from longcat_safetensors_loader.py
      svi_chain.py              # cross-clip error-recycling loop (anchor-0 + latent-tail)
      vram.py  ffmpeg_io.py  render_report.py
    tests/
      conftest.py  test_rpc_framing.py  test_pipeline_fake.py
      test_installer.py  test_render_report.py  test_svi_chain.py
```

- **UI listing:** automatic — host's generic scanner discovers `manifest.yaml`; the extension appears in the gallery. No host edit.
- **Model Foundry:** declarations live entirely in `backends/rtx50-fp8/versions.yaml` (`artifacts[]`, `source.kind: huggingface` / `huggingface_split`). Worker `installer.py` runs `snapshot_download` and writes a completion sentinel. No host registry file to touch.
- **Dependency install:** manifest `dependencies.steps` (python → uv pkgs → ffmpeg → validate handshake), exactly as LongCat. CUDA via `worker/pyproject.toml` `[tool.uv.sources]` + `[[tool.uv.index]]` pointing torch at the **cu128** wheel index (Blackwell needs ≥ cu128 / torch 2.7.x — matches SVI's own torch 2.7.1+cu128).

---

## 7. Open Risks & Required Validation Spikes (before/early in build)
1. **Wan2.2 DiT port (highest risk).** Decide source of the DiT forward: vendor DiffSynth `WanModel` vs diffusers `WanTransformer3DModel`. Spike: load one fp8 expert via the LongCat-style loader into the chosen DiT, run one forward, confirm shapes + no NaN.
2. **fp8 key-name bridge.** Kijai `_KJ` tensor names vs the chosen DiT's expected names — confirm a remap exists (LongCat already bridges its own DiT; Wan2.2 mapping must be verified).
3. **SVI LoRA onto fp8 expert.** Confirm SVI LoRA target keys hit the vendored DiT's layers after fp8 load (proven in ComfyUI; re-verify in our loader).
4. **T5/VAE format.** Pick UMT5 + VAE files that the ported pipeline can load (Kijai fp8 T5 + Wan VAE bf16 vs DiffSynth-converted). Resolve alongside #1.
5. **flash_attn on Blackwell.** SVI wants `flash_attn==2.8.0.post2`; prebuilt Blackwell (sm_120) wheels may be unavailable → may need source build or an SDPA fallback. Decide before locking deps.
6. **System RAM assumption.** Sequential single-expert-on-GPU avoids needing both experts in VRAM, but holding fp8 experts + offloaded blocks in RAM still wants healthy system RAM. **Confirm the dev box RAM** (assumed ≥ 32 GB).
7. **GGUF Q4_K_M alt.** Optional later spike: does the SVI LoRA apply through a ComfyUI-GGUF headless loader? If yes, ~9 GB/expert is a much roomier 16 GB path.

---

## 8. Host-Boundary Compliance
- Pure Python-worker extension → **zero host code changes** required. No host crate, no host migration, no host route.
- If render-state persistence is later needed: add a `storage:` block + `storage/migrations/001_*.sql` with tables prefixed `ext_nexus_video_svi2_pro__*` (extension-owned).
- If HTTP routes are later needed (image upload / polling): an extension-owned Rust crate implementing `ExtensionRouterProvider` under `extensions/builtin/svi2-pro/`. No host coupling.

---

## 9. Decision Points for User (before build)
- **(a)** Confirm engine = **hybrid (LongCat fp8 loader + ported Wan2.2 DiT + ported SVI loop)**, with DiffSynth kept as algorithm reference only.
- **(b)** Confirm v1 weights = **fp8_e4m3fn HIGH+LOW + SVI pro LoRAs** per §3 (GGUF Q4_K_M deferred to a spike).
- **(c)** Confirm dev-box **system RAM** (risk #6) and whether a `flash_attn` source-build is acceptable or we ship an SDPA fallback (risk #5).
- **(d)** On approval, next step is `/octo:spec` → NLSpec → `/octo:factory` (or a written plan), beginning with the §7 #1 DiT-load spike.

---

### Appendix — raw discovery notes
`C:\Users\lazar\AppData\Local\Temp\svi-research\findings\` → `A_pipeline_trace.md`, `B_model_manifest.md`, `C_engine_comparison.md`, `D_nexus_conventions.md`.
