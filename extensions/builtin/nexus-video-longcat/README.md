# nexus-video-longcat

LongCat-Video TI2V extension for nexus-dnn.

Generates text-to-video, image-to-video, video continuations, and
720p refinement using [meituan-longcat/LongCat-Video](https://github.com/meituan-longcat/LongCat-Video)
(13.6B DiT, Wan 2.1 VAE, UMT5-XXL text encoder). FP8 e4m3fn scaled
path consumes the Kijai repack
([Kijai/LongCat-Video_comfy](https://huggingface.co/Kijai/LongCat-Video_comfy)).
BF16 path consumes the upstream canonical split. MIT-licensed
weights.

## Architecture (from upstream `dit/config.json`)

- `LongCatVideoTransformer3DModel`, depth 48, hidden 4096, heads 32,
  FFN 16384, in/out channels 16, patch [1, 2, 2], AdaLN embed 512,
  dense (not MoE), ~13.6B params
- VAE: `AutoencoderKLWan` (Wan 2.1, z_dim 16, 4x16x16 compression)
- Text encoder: `UMT5EncoderModel` (`google/umt5-xxl`), d_model 4096,
  24 layers
- Scheduler: `FlowMatchEulerDiscreteScheduler`; distill = CFG 1.0,
  shift 12, 12 steps
- FP8 convention: per-linear `*.scale_weight`,
  `torch._scaled_mm(scale_a=1, scale_b=scale_weight)` — identical
  to the spec 048 path in `nexus-video-ltx23`

## Status

Scaffold only. See `worker/README.md` for the port checklist.

## Backend runtimes

| runtime_id                                  | display name                                    |
|---------------------------------------------|-------------------------------------------------|
| `nexus.video.longcat.rtx50-fp8`             | LongCat TI2V FP8 (RTX 50 / Blackwell, 16 GB)    |
| `nexus.video.longcat.fake`                  | LongCat Fake (CI / development)                 |

## Research basis

`C:\Users\lazar\.claude-octopus\results\probe-synthesis-20260523-longcat-ti2v-fp8.md`
(2026-05-23 multi-LLM probe — codex GPT-5.5 + claude-sonnet +
WebFetch). Decision to split from `nexus-video-ltx23` was carried
by a 3-agent debate (PRO / CON / JUDGE); dominant factor was
mutually-exclusive dependency pins (`diffusers==0.35.1` +
`transformers==4.41.0` vs the ltx23 worker's
`diffusers @ git+adff1cae` + `transformers>=4.52,<5.0`).
