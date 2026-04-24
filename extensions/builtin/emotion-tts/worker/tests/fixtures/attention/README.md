# Attention tensor fixtures (spec 034, T004)

Used by OAS observability unit tests (T050–T053, T056 Viterbi golden path).

## Files

| File                     | Shape / type               | Purpose |
|--------------------------|----------------------------|---------|
| `synthetic_attn_10s.pt`  | `Tensor[5, 80, 120]`       | Synthetic attention for a 10-second synthesis (5 middle-layer heads, 80 text tokens, 120 audio frames). Strong diagonal + mild noise — exercises the Viterbi path without needing a real model. |
| `golden_viterbi.json`    | `{"log_prob": float, "path": [int, ...]}` | Expected Viterbi output for `synthetic_attn_10s.pt`. Regenerate with `generate_fixtures.py` if the algorithm changes. |

## Regeneration

Run from the repo root:

```powershell
python extensions/builtin/emotion-tts/worker/tests/fixtures/attention/generate_fixtures.py
```

The script is deterministic (seeded RNG) so the produced `.pt` and `.json` are
byte-identical across machines with the same torch version. A floating-point
tolerance of `1e-6` is applied in tests that compare the golden output.

## Git-LFS

`synthetic_attn_10s.pt` is ~190 kB (float32) — safe to check in without LFS.
