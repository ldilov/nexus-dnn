# nexus-video-longcat-worker

Stdio JSON-RPC worker for the `nexus.video.longcat` extension.
Drives meituan-longcat/LongCat-Video (13.6B DiT, UMT5-XXL text
encoder, Wan 2.1 VAE) at FP8 e4m3fn scaled or BF16.

## Status: scaffold

Stub modules only. Real wiring lands in follow-up rungs:

- `longcat_safetensors_loader.py` — port `FP8Linear` +
  `WEIGHT_SCALE_SUFFIXES` from `ltx_video_worker.ltx2_safetensors_loader`
- `longcat_native_loader.py` — vendor 5 MIT files from upstream
  `longcat_video/modules/` then implement key remap
- `pipeline_longcat.py` — bind `generate_t2v` / `generate_i2v` /
  `generate_vc` / `generate_refine`
- `installer.py`, `rpc.py`, `vram.py` — port from ltx23 worker

## Layout

```
src/longcat_video_worker/
  __init__.py
  __main__.py                  # stdio entrypoint (handshake stub)
  profiles.py                  # rtx50-fp8 / rtx50-fp8-distill / fake
  longcat_safetensors_loader.py
  longcat_native_loader.py
  pipeline_longcat.py
  pipeline_fake.py
tests/
  test_smoke.py
```

## Profiles

| profile_id          | quant                | steps | CFG  | distill |
|---------------------|----------------------|-------|------|---------|
| rtx50-fp8           | fp8_e4m3fn_scaled    | 50    | 4.0  | no      |
| rtx50-fp8-distill   | fp8_e4m3fn_scaled    | 12    | 1.0  | yes     |
| fake                | fake                 | 1     | n/a  | n/a     |

## Tests

```
uv run --extra test pytest tests/
```
