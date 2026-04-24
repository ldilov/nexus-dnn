# Feature Specification: EmotionTTS Engine Quality + Performance Expansion Pack

**Feature Branch**: `main` (spec 034)
**Created**: 2026-04-24
**Status**: Draft
**Input**: User request — ship the top-5 improvements surfaced by the IndexTTS deep-research pass (research-agent `a37462737fd163722`) as a coherent quality + performance upgrade to the EmotionTTS extension (spec 031). Everything lives under `extensions/builtin/emotion-tts/**`. No host changes. Honours the extension-decoupling principle: every improvement reaches the user through a contract any external TTS extension could also consume.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Voice cloning that doesn't "sound nothing like the reference" (Priority: P1)

A voice director uploads a 40-second noisy phone-call recording as a speaker reference. The extension silently preprocesses it — trims leading/trailing silence, light-denoises, normalises to a target loudness, caps to 15 seconds of best material, appends a short tail of silence — and synthesis now tracks the reference timbre cleanly. The user sees a non-blocking banner summarising what was done and can toggle preprocessing off if they know what they're doing.

**Why this priority**: This addresses the #1 failure class in the upstream IndexTTS2 issue tracker (#410, #94): users submit raw audio and get outputs that don't resemble the speaker. The fix is well-understood, extension-local, and improves every single synthesis — not a subset. It is also a prerequisite for meaningful A/B evaluation of the subsequent perf improvements.

**Independent Test**: Take a known-poor reference (noisy, 45 s, -18 dB peaks). Run synthesis with preprocessing OFF and ON. On panel, MOS-grade a blind pair: ≥ 7 of 10 listeners pick the ON version as "more similar to the reference". Also verified automatically: preprocessed reference has measured LUFS within ±1 of target, duration ≤ 15 s, no clipping.

**Acceptance Scenarios**:

1. **Given** a noisy 40 s reference, **When** the user saves it, **Then** the extension runs the preprocessing pipeline and stores both the original artifact and a preprocessed artifact with a deterministic hash.
2. **Given** preprocessing is enabled, **When** synthesis runs, **Then** the preprocessed reference is passed to the engine and the manifest records which reference variant was used.
3. **Given** the user disables preprocessing via the mapping editor toggle, **When** synthesis runs, **Then** the original reference is passed through unchanged and the manifest records `preprocessed: false`.
4. **Given** an undecodable or silent reference, **When** preprocessing attempts to run, **Then** the operation fails with a structured error identifying the stage that rejected the input (decode / vad_empty / loudness_nan).

---

### User Story 2 — Catch hallucinated synthesis before the user hears it (Priority: P1)

A long-form audiobook run produces 300 segments. Segment 47 drops a phoneme and stretches one vowel for five seconds; segment 128 skips the last four words of the line. Without listening to all 300 files, the user sees a "3 segments flagged as low-alignment" badge in the run view and can jump directly to the offenders. Each flagged segment ships an attention-map PNG as a diagnostic artifact.

**Why this priority**: Silent quality regressions are the most expensive failure mode — they reach the user and pollute deliverables. Upstream research (arXiv:2509.19852) shows alignment score correlates with Word Error Rate at r=0.638, which is an actionable signal. Without this, the only QC is the user's ears; with it, we can pre-triage 300 segments in under 5 seconds of CPU.

**Independent Test**: Seed a run with 5 deliberately-failing segments (truncated text, repeated phrase, garbage IPA). The observability layer flags ≥ 4 of 5 as low-alignment, attaches attention-map PNGs, and the run detail view surfaces them at the top of the segment list. No false-positive flag on 20 clean segments in the same run.

**Acceptance Scenarios**:

1. **Given** a completed run, **When** the user opens run detail, **Then** any segment whose alignment score fell below the learned threshold carries an inline "low-alignment" warning with the score.
2. **Given** a flagged segment, **When** the user clicks the warning, **Then** an attention-map PNG (log-scale heatmap, one per alignment-relevant attention head) opens as a modal or downloads.
3. **Given** the observability module is disabled via a config toggle, **When** synthesis runs, **Then** no attention tensors are captured and no flagging/PNG artifacts are produced.
4. **Given** a run fails catastrophically mid-batch, **When** partial export runs, **Then** the alignment scores for completed segments are preserved in the manifest under `segment.diagnostics.alignment_score`.

---

### User Story 3 — Multi-paragraph exports finish in roughly the same time as single paragraphs per line (Priority: P2)

A user exports a 200-line audiobook chapter with one dominant speaker. The first line warms the GPU; every subsequent same-speaker line reuses the speaker-conditioning KV cache that was computed the first time. Total wall-clock time drops 8–12 % vs. the baseline without cross-line cache reuse. The user sees no visible change except the run finishes faster.

**Why this priority**: Compounds with improvement 3 (torch.compile) for multiplicative wins. By itself, 5–15 % on multi-paragraph exports; cheap (~2 days) and independent of upstream changes. Risk is low — the cache is content-hash keyed so there is no possibility of returning a stale speaker embedding.

**Independent Test**: Run a 50-line single-speaker script twice. With the speaker-prefix cache enabled, the second run's warm-start-to-first-segment latency drops by ≥ 70 % and total wall-clock drops by ≥ 5 %. Cache hit rate on a same-speaker 50-line run is ≥ 95 % (first line is the only miss by design).

**Acceptance Scenarios**:

1. **Given** the cache is cold, **When** the first segment for a speaker runs, **Then** the speaker-conditioning embedding is computed and stored under a key derived from the reference's content hash.
2. **Given** the cache is warm, **When** a subsequent segment uses the same reference, **Then** the cached speaker embedding is loaded without recomputing speaker conditioning.
3. **Given** the reference audio file is swapped for a different file with the same display name, **When** the next segment runs, **Then** the new content hash is computed, the cache misses, and the new embedding is stored — no cross-speaker bleed.
4. **Given** the cache exceeds its per-runtime-session memory budget, **When** the next insert arrives, **Then** the least-recently-used entry is evicted without breaking the in-flight batch.

---

### User Story 4 — Synthesis is 2–4× faster on the same hardware (Priority: P2)

A user on an RTX 4070 who was getting RTF ≈ 0.6 on 10 s utterances (so a 10 s line took ~6 s) now gets RTF ≈ 0.15–0.25 after a one-time compile step on first run. The first run eats an extra ~15 s warmup; every subsequent run — same session — is 2–4× faster than the baseline. Users opt in via a "Compile GPT stage (experimental)" toggle in the deployment settings; if compilation fails on their build, the extension falls back to uncompiled inference automatically with a structured warning.

**Why this priority**: This is the single biggest performance lever, but higher risk: compilation recomputes on shape changes, Windows-CUDA13 compatibility is still-fresh, and the warmup cost is visible. Ship behind a toggle so users who need speed can take it and users who need stability can skip it. Impact is latent on single-line test runs, massive on batch exports.

**Independent Test**: A/B the same 50-line script on a CUDA 13.1 Windows install. Compiled run total wall-clock is ≤ 0.55× the uncompiled baseline. If compilation raises any documented TorchCompile error, the extension falls back to uncompiled mode and the run completes within 1.05× of the baseline (i.e., the failure path does not make things worse).

**Acceptance Scenarios**:

1. **Given** the "Compile GPT stage" toggle is off (default), **When** the user runs synthesis, **Then** inference runs exactly as before this feature landed.
2. **Given** the toggle is on, **When** the user starts the first synthesis of the session, **Then** the extension emits a "compiling GPT stage" progress notification with an ETA bound (≤ 30 s) before the first segment starts.
3. **Given** the compile step succeeds, **When** a subsequent segment runs with a compatible input shape, **Then** inference runs on the compiled path with no recompilation.
4. **Given** the compile step fails (e.g., missing Triton backend on Windows), **When** the error is caught, **Then** the toggle is disabled for the remainder of the session, a user-visible warning explains why, and synthesis continues on the uncompiled path.

---

### User Story 5 — Ready-for-IndexTTS 2.5 without breaking existing deployments (Priority: P3)

IndexTTS 2.5 weights drop on HuggingFace. The user enters the model-store, selects the new `IndexTeam/IndexTTS-2.5` family, clicks Install. Existing deployments keep using 2.0; new deployments default to 2.5. The recipe UI, mapping editor, cache, and manifest all behave identically — only the engine family is different, and the manifest records which one produced each segment. A user wanting to migrate a deployment from 2.0 → 2.5 clicks a "Switch family" button; the cache invalidates (cache keys include model family), mappings are preserved unchanged, and the next run uses the new engine.

**Why this priority**: The upstream release is coming but not yet available — weights aren't on HF at spec time. Priority is P3 because we can't ship until upstream ships, and the delivery schedule is out of our control. But designing the contract for dual-family support **now** prevents a painful future migration, and the architectural decisions (cache key includes family, manifest records family, mapping layer is family-agnostic) are trivially testable with a second "family" that is just a second instance of 2.0 weights in a different directory.

**Independent Test**: With a mock 2.5 family (directory name + registry entry, weights reused from 2.0 for test purposes): (a) both families coexist in the registry; (b) a deployment bound to family A and one bound to family B run concurrently without cross-contamination; (c) the cache hit rate on cross-family re-runs is 0 % — keys diverge by family; (d) existing 2.0 mappings transfer verbatim to a new 2.5 deployment by "duplicate mapping" action.

**Acceptance Scenarios**:

1. **Given** two model families are installed, **When** the user creates a deployment, **Then** the deployment-create form lets them pick a family and the choice is persisted.
2. **Given** a deployment is bound to family A, **When** synthesis runs, **Then** the manifest records `model_family` and the cache key incorporates it so a later deployment on family B does not hit the family-A cache.
3. **Given** the user switches a deployment's family, **When** they do so, **Then** the mapping rows are preserved, the cache hit-rate for the next run is 0 % (expected), and the UI displays a one-time notice that "cache is warming up on the new family".
4. **Given** the IndexTTS 2.5 release introduces languages beyond CN/EN (JA/ES), **When** the user enters non-CN/EN text under a 2.5 deployment, **Then** synthesis proceeds; under a 2.0 deployment the same text produces a structured warning about language support.

---

### Edge Cases

- Reference audio is 3 seconds of pure silence → preprocessing fails with `vad_empty`; user keeps the original upload.
- Reference audio is 10 minutes of crowd noise → preprocessing truncates to the 15 s window with highest speech activity, flags a warning "clipped to 15 s of 600 s — select a cleaner reference".
- The OAS threshold has not learned yet (first 100 segments of the instance's lifetime) → module defaults to a published literature threshold and flags "calibrating" in the UI for the first 100 segments.
- `torch.compile` succeeds but then a segment with a never-before-seen text length triggers a recompile mid-batch → emit a progress event, wait for recompile, continue; recompiles are expected to converge after ≤ 10 distinct shapes on a typical run.
- Speaker-prefix cache key collides across different reference files with identical bytes (user uploaded the same file twice under different names) → intentional hit, no bug.
- User toggles "Compile GPT stage" off mid-session → current in-flight segment completes on compiled path, next segment uses uncompiled path; no restart required.
- Attention-map PNG generation fails for a flagged segment (e.g., out-of-memory on large attention tensor) → skip the PNG, keep the numeric alignment score flag, surface the score without the image.
- Two deployments on different families share a synthesis runtime process → each deployment's requests are tagged with their family at the lease layer, so the worker loads the correct weights for each request and doesn't leak state between families.

## Requirements *(mandatory)*

### Functional Requirements

**US1 — Reference-audio preprocessing**

- **FR-200**: Voice-asset upload MUST optionally run a preprocessing pipeline producing a second artifact alongside the original. Default behaviour MUST be preprocessing-on for new uploads; the toggle lives per-voice-asset so users can flip individual references.
- **FR-201**: The preprocessing pipeline MUST perform, in order: decode and resample to the engine's expected sample rate, mono downmix if stereo, light denoise, voice-activity-detection silence trim with 100–500 ms pad, loudness normalisation to −25 LUFS ±1, peak limit to −1 dBFS, and a hard cap of 30 s (soft target 15 s of highest-activity window).
- **FR-202**: The preprocessing pipeline MUST emit a structured report (per stage: succeeded / skipped / failed-with-reason) that is stored alongside the preprocessed artifact and surfaced in the mapping editor.
- **FR-203**: The manifest MUST record, per utterance, whether the preprocessed or original reference was used (`reference_variant: "preprocessed" | "original"`) and the reference's post-preprocessing content hash.
- **FR-204**: Disabling preprocessing globally MUST be supported as a per-deployment toggle that overrides the per-voice-asset toggle. Export of an existing deployment MUST include this toggle state for reproducibility.

**US2 — OAS observability**

- **FR-210**: The engine MUST expose an alignment score (numeric, 0.0–1.0) per completed segment, computed deterministically from the decoder's attention tensors.
- **FR-211**: Scores below a learned per-deployment threshold (initialised from a documented literature default, updated by rolling average after ≥ 100 segments) MUST be flagged in the run manifest under `segment.diagnostics.alignment_flag: true`.
- **FR-212**: For every flagged segment, a log-scale attention-map PNG MUST be generated, stored as a host artifact, and linked from the run detail view. The PNG MUST NOT be generated for unflagged segments (cost control).
- **FR-213**: The observability module MUST be toggleable per-deployment; disabled state MUST skip all attention-tensor capture (no cost on segments where the user doesn't want it).
- **FR-214**: Aggregate run-level alignment statistics (min, median, p95) MUST appear in the run summary so users can see run-wide quality trend without clicking individual segments.

**US3 — Speaker-prefix cache**

- **FR-220**: The engine MUST cache speaker-conditioning outputs keyed on the speaker reference's post-preprocessing content hash + model family + runtime version (so compatible hits survive restarts within a session and different families don't cross-pollute).
- **FR-221**: The cache MUST be an in-memory LRU per runtime-worker lifetime, with a configurable size budget (default 200 MB per FR-200's speaker_cache_mb setting).
- **FR-222**: Cache hits MUST skip re-computing the speaker conditioning; the saved time MUST be observable in the run's per-segment timing histogram.
- **FR-223**: The cache MUST be invalidated automatically when the runtime subprocess is stopped and restarted, and when the model family changes.

**US4 — Compiled GPT stage**

- **FR-230**: The engine MUST support a compiled GPT-stage execution path as an opt-in per-deployment setting, defaulting to off.
- **FR-231**: On first synthesis with the toggle on, the engine MUST emit a progress notification indicating compilation is in progress, with a bounded ETA.
- **FR-232**: If compilation raises any documented failure, the engine MUST fall back to uncompiled inference for the remainder of the session, emit a `compile_failed` warning with the structured failure reason, and continue without interruption to the user's run.
- **FR-233**: The engine MUST maintain a shape-cache so that compilation across common input lengths is amortised; a user running a batch of similar-length segments SHOULD hit a warm compile on the second segment.
- **FR-234**: The compile toggle state MUST be recorded in the run manifest so A/B comparisons are provenance-traceable.

**US5 — Dual model-family support**

- **FR-240**: The engine MUST support more than one IndexTTS model family concurrently, with each family installed as a separate host model-store family entry.
- **FR-241**: Deployments MUST carry a `model_family` reference; the mapping editor, recipe, and cache MUST all be family-agnostic (no family-specific columns other than the reference itself).
- **FR-242**: The synthesis cache key MUST include `model_family` so cache hits never cross families.
- **FR-243**: The manifest MUST record the `model_family` per utterance.
- **FR-244**: A user MUST be able to change a deployment's model family without losing mappings, presets, or history; the next run on the new family is expected to cache-miss and re-synthesize.
- **FR-245**: The extension MUST ship a family-registry format (YAML under the extension's `recipes/families/` directory) that declares each family's model directory, expected artifact file list, supported languages, and default generation settings. Adding a new family is an additive YAML change, not a code change.

**Cross-cutting**

- **FR-250**: None of the five improvements MUST introduce a host code change. All new code lives under `extensions/builtin/emotion-tts/**`. The boundary-audit script MUST continue to return zero host references.
- **FR-251**: Every new toggle surface MUST be reachable from the deployment recipe UI; no improvement MAY be hidden behind environment variables or config files the user cannot see. *Clarification: "recipe UI" includes the deployment's Engine Settings panel (spec 034 T109), which is the canonical surface for engine-level toggles; per-segment toggles remain in the mapping editor.*
- **FR-252**: Every new toggle MUST be recorded in the run manifest so a user replaying an export can see which code paths were active.
- **FR-253**: Every new observability artifact (attention-map PNG, alignment score, preprocessing report) MUST travel through the host artifact store — no sidecar on-disk files outside the artifact system.

### Key Entities

- **VoiceAssetPreprocessing** — a report attached to a voice-asset version summarising what the pipeline did (pass/fail per stage, LUFS before/after, duration before/after, denoise engine, VAD engine, timestamp).
- **AlignmentDiagnostics** — per-segment record: `alignment_score: f64`, `flagged: bool`, `threshold_used: f64`, `attention_map_artifact_ref: Option<ArtifactRef>`, `per_head_scores: [f64; N]`.
- **SpeakerPrefixCacheEntry** — in-memory only, keyed on `(content_hash, model_family, runtime_version)`; value is an opaque embedding tensor serialised by the worker; never persisted across subprocess restarts.
- **CompileToggleState** — per-deployment: `compile_gpt: bool`, `compile_attempts: i64`, `last_compile_failure_reason: Option<String>`, `last_compile_duration_ms: Option<i64>`.
- **ModelFamily** — catalogue entry under the extension: `family_id: String`, `display_name: String`, `model_dir_template: String`, `expected_artifacts: Vec<String>`, `supported_languages: Vec<String>`, `default_generation_settings: Map<String, Value>`, `engine_version_constraint: SemverRange`.
- **ModelFamilyRegistry** — the set of families the extension knows about, reconciled at extension activation time against what the host model-store reports as installed.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-200**: On a curated "hard reference" evaluation set of 20 noisy clips, preprocessing increases blind-pair listener preference for speaker similarity from baseline to ≥ 70 % (measured by a 10-panellist listening test — spec 031 SC-001 precedent for qualitative panels). **Manual verification — out of CI scope; tracked as a release-gate ritual, not a code task.**
- **SC-201**: On the same curated set, preprocessed references produce a ≥ 15 % relative reduction in measured speaker-similarity cosine-distance (using a standard pretrained speaker encoder, computed offline).
- **SC-202**: The OAS observability module flags ≥ 4 of 5 intentionally-corrupted segments in a 25-segment benchmark while producing ≤ 1 false positive — i.e., precision ≥ 80 % at recall ≥ 80 %.
- **SC-203**: Attention-map PNG generation cost is ≤ 80 ms of CPU per flagged segment at p95 on a curated benchmark host (Ryzen 5800X class), measured offline.
- **SC-204**: On a 50-line single-speaker benchmark script, the speaker-prefix cache produces a ≥ 5 % wall-clock total runtime reduction vs. the same run with the cache disabled.
- **SC-205**: On the same benchmark, second-segment-onwards warm-start latency (receipt-of-request → first audio sample produced) drops by ≥ 60 % vs. first segment.
- **SC-206**: The compiled GPT-stage toggle produces a total wall-clock runtime of ≤ 0.55 × the uncompiled baseline on a CUDA 13.1 Windows workstation for the same 50-line benchmark, after the first compile is amortised.
- **SC-207**: Compile-failure fallback completes the user's run within 1.05 × the baseline time — i.e., failing to compile MUST NOT make the user's experience worse than not trying to compile.
- **SC-208**: When a second model family is registered (even if it is a mock duplicate of 2.0), both families can be bound to concurrent deployments that run batches without cross-contamination, verified by a test that asserts zero cross-family cache hits and zero state bleed at the worker lifecycle.
- **SC-209**: The boundary-audit script returns zero host references across all five improvements, verifying the non-negotiable extension-decoupling constraint.
- **SC-210**: A user can enable preprocessing + OAS + speaker-prefix cache + compile toggle through the deployment recipe UI without editing any file on disk.

## Assumptions

- IndexTTS 2.5 weights are **not yet available** at spec time; US5 implementation will exercise its architecture with a mock second family (e.g., pointing at the same 2.0 weights under a second `family_id`) until real 2.5 weights drop on HuggingFace.
- The upstream `IndexTTS2.infer()` signature is stable enough that `torch.compile` can wrap the GPT stage without patching upstream code — if upstream ships a compile-friendly path first, we prefer that over our wrapper.
- The OAS module captures attention tensors via forward hooks on the decoder; upstream does not expose them as a return value but they are accessible through standard PyTorch introspection. If upstream changes to a kernel that obscures attention tensors (e.g., a fused attention op), the module will need to adapt — flagged as a technical risk.
- Pyloudnorm, pyannote-audio (or silero-vad equivalent), and RNNoise (or equivalent) are the baseline library choices for preprocessing. Final choices land in `research.md` during `/speckit.plan`.
- Windows-CUDA13 is the primary target. Linux and macOS support follow the existing spec 031 deferral (v1+).
- The host's backend-runtime catalog (spec 032) treats families as caller-supplied strings and does not need any additional schema work.
- `torch.compile` warmup ETA is bounded per GPU class; the UI displays a 30 s cap derived from empirical measurement on consumer GPUs.
- The speaker-prefix cache is scoped to the worker subprocess lifetime; cross-session persistence is out of scope.
- No improvement may require DeepSpeed on Windows; upstream DeepSpeed-on-Windows support is structurally broken and will not be fixed within the scope of this spec.

## Explicit Non-Goals

The following items appeared in the research report but are deliberately excluded from this spec. Each has a recorded reason:

- **TensorRT-LLM integration** — Windows-CUDA13 support is thin; TRT-LLM serialisation is per-GPU-SKU (breaks the "ship the same model artifact to all users" contract); would require host-side CUDA-runtime registration (violates Principle XIII). Revisit in a future v2+ spec only if the host ships a generic TRT runtime.
- **Migrating off IndexTTS to CosyVoice 3 / F5-TTS / XTTSv2 / StyleTTS2** — EmotionTTS's identity is tied to IndexTTS-2's emotion-disentanglement axes; migrating wholesale would invalidate every existing mapping, preset, and cached artifact. Any second engine belongs in a separate extension, not this spec.
- **Replacing 8-axis emotion with Valence–Arousal–Dominance (VAD)** — users have authored presets and mappings against the 8-axis schema. A VAD *view* over the existing vectors MAY land in a later spec; canonical storage stays 8-axis.
- **Installing DeepSpeed on Windows** — upstream `dskernels` / MSVC tooling is fundamentally broken on Windows. The extension will `detect-and-warn` (informational banner "DeepSpeed unavailable — expect 3–10× slowdown"), not attempt to install.
- **Host-side model quantisation pipeline** — putting engine-specific INT8 knowledge into `nexus-models-store` violates the boundary rule. If quantised IndexTTS weights become available, they are installed as a separate family (US5 path) rather than via a host pipeline.
- **Cross-extension telemetry dashboard** — coupling the host shell to TTS-specific metrics would break extension-decoupling. Any dashboard ships inside this extension's UI surface.
- **Inline-streaming synthesis (chunked audio over the lifetime of a single utterance)** — out of scope for this spec. Interesting, but touches the RPC contract deeper than the other five items. Flagged for a future spec if latency becomes the bottleneck after the compile path lands.
