# Stable Video Infinity 2.0 Pro (svi2-pro)

Long-form image-to-video extension for nexus-dnn.

## What It Does

Renders multi-clip video from a single image using Stable Video Infinity 2.0 Pro: a dual-LoRA adaptation of Wan2.2-I2V-A14B (14B dual-expert MoE). Chains 81-frame clips with error-recycling for temporal consistency across the full video duration.

## Backends

- `nexus.video.svi2-pro.fake` — no-GPU CI backend (deterministic synthetic frames)
- `nexus.video.svi2-pro.rtx50-fp8` — RTX 50 / Blackwell, 16 GB VRAM, fp8 e4m3fn quantization

## Models

Downloaded and installed via nexus Model Foundry:

- **Kijai Wan2.2-I2V-A14B experts**: `Wan2_2-I2V-A14B-HIGH/LOW_fp8_e4m3fn_scaled_KJ.safetensors`
- **SVI v2.0 LoRAs**: `epfl-vita/svi-model/version-2.0/SVI_Wan2.2-I2V-A14B_high/low_noise_lora_v2.0_pro.safetensors`
- **T5 text encoder**: `umt5-xxl-enc-fp8_e4m3fn.safetensors`
- **VAE decoder**: `Wan2_2_VAE_bf16.safetensors`

## Dependencies

Base dependencies: pydantic, pyyaml, ffmpeg-python, pillow, numpy, huggingface_hub.

Heavy ML stack in `diffusers` extra: torch, torchvision, safetensors, einops, sentencepiece, protobuf, transformers, ftfy, regex, av, imageio, imageio-ffmpeg.

Flash attention 2.8.3 cu132 wheels are vendored in `binaries/` (git-lfs); SDPA fallback if import fails.

## Operator Testing

Run the GPU smoke test on the RTX 50 box:

```bash
cd extensions/builtin/svi2-pro
./scripts/smoke-rtx50-fp8.sh    # Linux
./scripts/smoke-rtx50-fp8.ps1   # Windows PowerShell
```

## Worker Architecture

Stdio JSON-RPC NDJSON render worker. See `worker/README.md`.
