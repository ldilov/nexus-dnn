# 🖥️ Platform Support

This page describes what the repo appears to support today and where the strongest validation evidence exists.

## Executive Summary

- `nexus-dnn` is architected to be cross-platform.
- The strongest recent validation evidence in the repo is Windows + NVIDIA-focused.
- The most demanding built-in extensions are tuned around recent RTX hardware, especially Blackwell-era workflows.

## Architecture Support

`nexus-dnn` targets three host architectures. The host binary, embedded Python, ffmpeg, and the LLM install pipeline are arch-aware across all three; GPU-heavy paths degrade on aarch64 where upstream prebuilt assets do not yet exist.

| Capability | amd64 Windows | amd64 Linux | aarch64 Linux (DGX Spark / GB10) |
|------------|:---:|:---:|:---|
| Host binary (`nexus-dnn`) | 🟢 | 🟢 | 🟢 build natively or cross-compile |
| Embedded Python runtime | 🟢 | 🟢 | 🟢 |
| ffmpeg (managed install) | 🟢 | 🟢 | 🟢 |
| LLM via llama.cpp (managed) | 🟢 cpu/cuda | 🟢 cpu/cuda | 🟡 CPU-only — no upstream CUDA arm64 build |
| LLM via external server | 🟢 | 🟢 | 🟢 GPU-capable (operator runs llama-server) |
| EmotionTTS | 🟢 | 🟢 | 🟡 experimental — verify CUDA torch on hardware |
| LTX-2.3 / LongCat video | 🟢 | 🟢 | 🟡 experimental — SDPA fallback, no flash-attn arm64 wheel |
| SVI2-Pro | 🟢 | 🟡 | 🟡 experimental — i2v works; sd-cli edit path needs a system binary |

**aarch64 Linux notes:**

- **Managed llama.cpp is CPU-only.** Upstream ggml-org ships no CUDA arm64 build. For GPU LLM, build `llama-server` natively (aarch64 + CUDA) and point the host at it via `NEXUS_LLAMA_SERVER_URL` — the external-server path is fully arch-agnostic.
- **GPU attention accelerators (flash-attn, sageattention) have no aarch64 wheels.** SVI2-Pro's managed install currently **fails** on aarch64: its `flash` extra declares `flash-attn` with only a `sys_platform == 'linux'` marker, so `uv sync` tries a from-source `nvcc` build that needs a matching CUDA toolkit and aborts the install on a stock host. LTX-2.3 / LongCat fall back to SDPA at runtime. Arch-gating these extras to `x86_64` (so aarch64 skips them) is a pending follow-up that requires a `uv.lock` regeneration; until it lands, install the affected workers manually on aarch64.
- **stable-diffusion.cpp (svi2-pro edit-then-animate) has no Linux arm64/CUDA build.** Core image-to-video render works; the edit path needs an operator-built `sd` on `PATH`.

## Tested Machine Evidence

The clearest recent repo evidence points to a workstation with:

| Component | Evidence |
|-----------|----------|
| OS | Windows |
| GPU | NVIDIA GeForce RTX 5070 Ti |
| VRAM | about 15.92 GiB |
| Driver | 570.65+ |
| Python | 3.12.11 |
| Torch | 2.12.0 + CUDA 13.2 |

This evidence is especially visible in the video-extension verification materials and runtime-selection notes.

## Support Readout

| Area | Status | Notes |
|------|--------|-------|
| Host runtime on Windows | 🟢 strongest evidence | best documented path in current repo state |
| Browser-based local UI | 🟢 strong | host serves embedded frontend bundle |
| TUI workflow | 🟢 strong | explicit cargo aliases and recent work |
| Desktop shell | 🟢 strong | active Tauri shell crate and app wiring |
| Linux/macOS host conceptually | 🟡 partial confidence | architecture supports it, but current evidence is thinner |
| CPU-only usage | 🟡 available for some flows | practical, but many flagship features are GPU-oriented |
| High-end video generation | 🟢 on recent NVIDIA stacks | most validated on RTX 50-series-oriented setups |

## Built-in Extension Expectations

| Extension | Hardware expectations |
|-----------|-----------------------|
| `nexus.local-llm` | lowest barrier; can run CPU-only, better with GPU |
| `nexus.audio.emotiontts` | practical on NVIDIA GPU; slower on CPU |
| `nexus.video.ltx23` | expects serious disk, driver, and GPU alignment |
| `nexus.video.longcat` | high-end GPU workflow, still evolving |
| `nexus.video.svi2-pro` | most demanding path; Blackwell-oriented assumptions show up repeatedly |

## What “Supported” Should Mean Here

For this repo today, “supported” is best understood in three tiers:

1. **Actively validated**
   Recent code, docs, and verification evidence line up.
2. **Architecturally intended**
   The code is written to allow it, but the repo’s validation evidence is lighter.
3. **Experimental**
   The path exists, but users should expect rough edges, long installs, or hardware-specific caveats.

## Recommended Reader Path

- [requirements.md](requirements.md) for prerequisites and resource budgets
- [getting-started.md](getting-started.md) for the quickest local launch
- [architecture.md](architecture.md) for the host/extension model
