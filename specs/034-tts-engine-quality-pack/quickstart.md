# Quickstart — Spec 034

A developer on day one of spec 034 should be able to follow this doc and land their first commit in under an hour.

## Prerequisites

- Spec 031 is merged and building (**actually run `cargo test` and `pnpm --filter @nexus/emotion-tts-web build` once before starting** — the worker + rust + web bundle all need to be green baselines).
- Python 3.11 env in `extensions/builtin/emotion-tts/worker/`, managed by `uv`.
- An installed IndexTTS-2 model (see spec 031's [quickstart](../031-emotiontts-extension/quickstart.md)).

## Orient yourself

1. **Read [spec.md](./spec.md) end to end.** 5 user stories, 7 non-goals — the non-goals are as important as the goals.
2. **Skim [research.md](./research.md).** R-34-01 through R-34-10 record every decision. If you're tempted to re-litigate one, read the rationale first.
3. **Skim [data-model.md](./data-model.md).** Two migrations, one YAML registry, six entity updates. All additive.
4. **Glance at [contracts/](./contracts/).** Four new HTTP endpoints + four new RPC methods + six new notification types. That's the full new surface.

## Ordered implementation plan

Each step leaves `cargo test` green and boundary audits clean. Commit after each step.

### Step 1 — Foundations (no behaviour change)

1. Land migrations 011 and 012. Register them in `rust/src/lib.rs::MIGRATIONS`.
2. Update `DeploymentRow` and `VoiceAssetRow` in `rust/src/storage/repo_traits.rs` with the new nullable fields. Wire through the SQLite repos.
3. Update `CacheKeyInput` in `rust/src/domain/cache_key.rs` to include `model_family`. Existing cache tests will break until you bump them — expected; update them to pass `model_family` explicitly.
4. Extend the Rust `Manifest` struct in `rust/src/domain/manifest.rs` with the 5 new optional top-level fields and the per-segment `alignment` block. `serde(skip_serializing_if = "Option::is_none")` on every new field so existing manifest readers stay happy.

Commit: `feat(spec-034): foundations — migrations 011/012, cache-key family participation, manifest evolution`.

### Step 2 — Family registry (US5)

1. Create `recipes/families/indextts-2.yaml` with the descriptor shape from research R-34-06.
2. Create `recipes/families/indextts-2-5.yaml` as a stub pointing at the same weights dir as 2.0 (so CI can test dual-family flows without real 2.5 weights).
3. `rust/src/domain/family.rs` — `ModelFamily` newtype, `FamilyDescriptor` parsed from YAML, `FamilyRegistry` in-memory.
4. `router/families.rs` — GET /families, GET /families/:id, GET /families/:id/install-hint.
5. `worker/families/` — Python mirror for the `family.list` / `family.switch` RPC methods.
6. Contract test + family-registry unit test.

Commit: `feat(spec-034): US5 family registry (indextts-2 + stub indextts-2-5)`.

### Step 3 — Engine-settings endpoint + UI (cross-cutting)

1. `router/engine_settings.rs` — GET/PATCH /deployments/:id/engine-settings.
2. `web/src/services/engine_settings_client.ts`.
3. `web/src/views/recipe/components/engine_settings_panel.tsx` + css — four toggles + family dropdown.
4. Thread the panel through `recipe.view.tsx`.
5. Contract test for the engine-settings endpoint.

Commit: `feat(spec-034): engine-settings endpoint + UI panel`.

### Step 4 — Reference-audio preprocessing (US1)

1. `worker/ref_audio.py` — `Preprocessor` class. Each stage is a pure function accepting `(tensor, sample_rate, config) -> (tensor, StageReport)`.
2. Wire into `voice.preprocess` RPC method in `worker/handlers.py` + `synthesis.py`.
3. Rust side: voice-asset upload path invokes `voice.preprocess` when the deployment has `reference_preprocess_enabled = 1`.
4. Mapping editor (`web/src/views/mapping_editor/`) gets a per-voice-asset preprocess toggle.
5. Pytest fixtures: 3 small `.wav` files under `worker/tests/fixtures/audio/` (clean, noisy, silent). Unit-test each stage + the pipeline end-to-end.
6. Manifest starts carrying `reference_variant` per utterance.

Commit: `feat(spec-034): US1 reference-audio preprocessing pipeline`.

### Step 5 — OAS observability (US2)

1. `worker/observability/attention_hook.py` — forward hook registration on layers 10–14 (configurable).
2. `worker/observability/oas.py` — Viterbi Optimal Alignment Score computation.
3. `worker/observability/attention_map.py` — matplotlib Agg PNG renderer, flagged-segments only.
4. Threshold management: cold-start literature 0.45 → rolling MAD after 100 segments (R-34-03). Persist `oas_threshold_learned` + `oas_samples_seen` to the deployment row via the `PATCH /deployments/:id/oas-threshold` endpoint.
5. Emit `diagnostic.alignment` notification per segment; store the score in the manifest; generate PNG only on flagged segments.
6. Frontend: run-detail view gains an alignment badge column, an attention-map modal, and the run-level alignment summary.
7. `router/diagnostics.rs` — GET /runs/:id/diagnostics + per-segment PNG redirect.

Commit: `feat(spec-034): US2 OAS observability + attention-map artifacts`.

### Step 6 — Speaker-prefix cache (US3)

1. `worker/speaker_cache.py` — `OrderedDict` + `threading.Lock`, byte-size accounting, LRU eviction.
2. Wire into `indextts_adapter.py::synthesise` — cache key `(content_hash, model_family, runtime_version)`.
3. Emit sampled `speaker_cache.hit` / `speaker_cache.miss` notifications (R-34-10 — once per 25 segments).
4. Unit test: insert, hit, miss, eviction under budget, cross-family isolation.

Commit: `feat(spec-034): US3 speaker-prefix LRU cache`.

### Step 7 — Compile GPT stage (US4)

1. `worker/gpt_compile.py` — capability probe via `capability.probe` RPC method; compiled-path wrapper around `IndexTTS2.infer()`.
2. On first enable, probe Triton import + trivial compile round-trip. Persist result to deployment row via engine-settings PATCH.
3. Emit `compile.started` / `compile.complete` / `compile.failed` notifications.
4. Stub-model unit test: compile a trivial `nn.Linear`, verify invocation paths + fallback on injected failure.
5. Manifest records `compile_active` per run.

Commit: `feat(spec-034): US4 opt-in torch.compile + static KV cache`.

### Step 8 — Polish

1. Worker README and Rust README updates.
2. CHANGELOG entry.
3. Boundary-audit CI gate extension if not already done from spec 031 T126.
4. Playwright smoke test extension: toggles round-trip, preprocessing applies, alignment badge appears, compile toggle fallback doesn't brick a run.

Commit: `docs(spec-034): polish + smoke test`.

## Running the smoke path

```powershell
# One-time: install worker deps
cd D:/Workspace/repos/nexus-dnn/extensions/builtin/emotion-tts/worker
uv sync

# Build web bundle (reuses spec-031 T125a toolchain)
cd ../web
pnpm install
pnpm build

# Rust tests
cd ../rust
cargo test --tests --lib

# Worker tests
cd ../worker
PYTHONPATH=src python -m pytest tests/ -q

# Boundary audits
cd D:/Workspace/repos/nexus-dnn
powershell -ExecutionPolicy Bypass -File scripts/audit-runtime-boundary.ps1
powershell -ExecutionPolicy Bypass -File extensions/builtin/emotion-tts/scripts/audit-boundary.ps1
```

Every step's commit should leave all of the above green.

## Watch-outs

- **`torch.compile` on Windows-CUDA13**: `triton` wheel is the flakiest part. If your local env fails the probe, DO NOT try to force-install — the whole point of R-34-04 is that the fallback is real. Report the failure reason through the structured notification and move on.
- **RNNoise wheel install**: Same pattern. If `rnnoise` import fails, the denoise stage is skipped with a warning; preprocessing still delivers VAD + loudness wins.
- **Attention-tensor shape drift**: if upstream changes the decoder module structure, the forward hooks break silently. The `attention_hook.py` module has one file-level audit point and must log a warning on registration failure.
- **Model family YAML editing**: YAML is loaded once at activation. Changing `recipes/families/*.yaml` requires an extension reload — don't expect hot-reload in v1.
- **Manifest optional fields**: everything new is `Option<T>` / `skip_serializing_if`. Do not serialise `null` fields; old manifest readers should see no new keys at all.

## Reference commits (from spec 031 that you'll want to mimic)

- `8beb931` — /speckit.specify skeleton
- `b1f83c3` — T114a-d workflow persistence (model for migration + repo + contract test + client commits)
- `aba589f` — T120a-h partial export + resume (model for adding new RPC endpoints + frontend button + manifest fields)
- `5cc87a4` — Phase 8 cache (model for the planner/evictor split + UI policy toggle)
- `dea4fc0` — C1-C5 engine fixes (model for surgical Python worker fixes)
