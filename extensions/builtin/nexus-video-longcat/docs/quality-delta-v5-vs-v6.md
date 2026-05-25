# v5_planB vs v6_locked — quality-delta capture
## T6 follow-up — 2026-05-25

Captures objective signals available without re-viewing mp4s. Subjective melt/deform assessment requires operator inspection.

## Fixture configuration delta

| Knob | v5_planB (1779666421064.mp4) | v6_locked (1779725370554.mp4) | Why it matters |
|---|---|---|---|
| scenes | 3 | 3 | same |
| duration per scene | 2.5 s | 4.0 s | v6 hits 10-15s target; v5 = 6 s total |
| overlap_frames | 13 | 13 | same |
| scene 1 use_distill | true | true | same |
| scene 2 use_distill | **false** | **true** | v5 mixed distill → DISTILL_MIX_MELT_RISK warning fires |
| scene 3 use_distill | **false** | **true** | v5 mixed distill → ditto |
| scene 1 num_inference_steps | 16 (default) | 16 | same |
| scene 2 num_inference_steps | **30** | 16 | v5 doubles compute on scene 2 + scene 3 |
| scene 3 num_inference_steps | **30** | 16 | same |
| scene 1 guidance_scale | 1.0 | 1.0 | same |
| scene 2 guidance_scale | **3.5** | 1.0 | v5 raises CFG for non-distill scenes — known melt trigger above 4.0 |
| scene 3 guidance_scale | **4.0** | 1.0 | same |
| scene 2 enhance_hf | **true** | false | v5 attempts high-freq detail boost on non-distill path |
| scene 3 enhance_hf | **true** | false | same |
| adain_factor (all scenes) | absent (= 0.0) | 0.15 | v6 actively pulls colour back to scene-1 anchor; v5 has no AdaIN damping |
| mode | i2v | i2v | same — both anchored to nun.jpg |

## ffprobe output delta

| Field | v5 | v6 |
|---|---|---|
| codec | h264 | h264 |
| width × height | 2432 × 1536 | 768 × 512 |
| fps | 24/1 | 24/1 |
| duration | 6.04 s | 10.54 s |
| frame count | 145 | 253 |
| file size | 4.24 MB | 1.97 MB |

The 2432×1536 in v5 vs 768×512 in v6 is curious — neither smoke run requested `--upscale`. v5's resolution likely came from a different `--height/--width` arg in the earlier session, NOT from native i2v auto-bucket. v6 was let to auto-bucket (768×512 = nun.jpg aspect floor for the i2v bucket).

## Memory notes from prior sessions

From `checkpoint_2026_05_25_longcat_adain_pushed.md`:
- "GPU smoke verified AdaIN math end-to-end + duration bug fixed (overlap=13: 145f @ 24fps = 6.04s). Scene-3 melt UNFIXED (geometry, not colour — hypothesis confirmed)."

v5 scene-3 melt was geometric (not colour drift), so even though v5 had no AdaIN, AdaIN wouldn't have fixed scene-3 melt anyway. v6 changed the LIKELY root causes of geometric melt:

1. **All-distill across scenes** — prior session noted distill-mix between scenes can trigger melt (DISTILL_MIX_MELT_RISK warning was added to validator as part of S1 → emitted on v5 plan).
2. **Lower guidance** — v5 scene-3 had `guidance_scale=4.0` which is at the upper edge of the LongCat distill paper's stable band. v6 uses 1.0 throughout (distill-paper recommended).
3. **Higher denoising steps not always better** — v5 ran 30 steps on scene 2/3 (non-distill path). v6 uses 16 (distill-paper trained step count). Memory note 2026-05-24: "distill default 12 → 16 = paper-trained step count" — running distill below 16 produces bursty motion; running distill above 16 has diminishing returns; running non-distill at 30 steps doesn't fix the architecture's distill-LoRA expectations.

## Validator predictions on v5 (run now)

If we run `validate_plan` on `nun_possession_scenes_v5_planB.json` today, expect:
- 3× DEPRECATED_FIELD_ALIAS (uses `duration_seconds`)
- 1× DISTILL_MIX_MELT_RISK (scene 1 distill=true, scene 2 distill=false — consecutive mismatch)
- Possibly DISTILL_STATIC_RISK no (different prompts)
- Possibly IMAGE_COND_NOISE_LOW no (not set)
- 1× MODE_SWITCH_CHANNEL on scene 1 (i2v→vc), same as v6

The DISTILL_MIX_MELT_RISK warning we added in commit `5f69eae` was specifically designed to catch v5-style fixtures.

## Hypothesis to operator-verify

If v6 mp4 (1779725370554.mp4) shows:
- Scene 3 NO MELT vs v5 scene 3 → distill consistency + low guidance was the cure → **lock all-distill + g=1.0 as canonical recommendation in `docs/storyboard.md`**.
- Scene 3 still melts → geometric melt has a different root cause (model architecture limit, not config); pursue refinement pass (T2) or upscale (T1) as compensation.
- Scenes 1-2 look NEARLY IDENTICAL on motion (static-repeat) → DISTILL_STATIC_RISK is real; need motion-intensity per-scene variation or per-scene seed offset to break mode collapse.

## Recommendation pending operator review

**If v6 mp4 visually beats v5:** Update `docs/storyboard.md` (S1-8 in backlog) with:

```
For multiscene chains:
- Use the SAME use_distill across all scenes (avoid DISTILL_MIX_MELT_RISK)
- Stick to distill 16 steps + guidance 1.0 (paper-trained band)
- Apply AdaIN 0.10-0.20 across scenes 2+ (caps colour drift)
- Avoid non-distill mid-chain — re-attach cost + visual inconsistency
- For motion diversity, vary the PROMPT not the sampling config
```

**If v6 mp4 is no better than v5:** Document this in checkpoint, schedule T2 (refinement + upscale) as next experiment.

## Action items

- [ ] Operator views both mp4s side-by-side. 2-paragraph note appended below recording the visual delta.
- [ ] If v6 wins, S1-8's `docs/storyboard.md` adopts the rule above.
- [ ] If v6 doesn't win on scene 3, T2 smoke runs.

## Operator note (fill in after viewing)

_To be filled in by operator after side-by-side review._
