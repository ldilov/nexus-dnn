# Local Chat extension — long session close (2026-05-07)

## TL;DR

Closed out a 39-commit-deep arc on `claude/busy-leavitt-af604a` that fixed the 503 storm at `/api/v1/extensions/nexus.local-llm/*`, redesigned the chat surface (markdown + LaTeX + shiki code blocks + bubble alignment + composer polish), detached model loading from chats (sticky-per-deployment + suppress flash on switch + skip duplicate spawn), wired chat-history persistence (load on switch, persist user/assistant turns), added per-bubble tokens/sec + context-capacity tracking, fixed the empty-extension-dir scanner warnings + SQL validator INSERT rejection, and shipped a global runtime-status endpoint. Ended with a `speckit-specify` for three Tier-1 throughput knobs (`--cache-reuse`, `--cram`, `--n-cpu-moe`) at `specs/039-llamacpp-throughput-tier1/`. **Branch is at `b8272e8`, 39 commits ahead of `origin/main`. NOT pushed.**

## Branch state

- Worktree: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\busy-leavitt-af604a`
- Branch: `claude/busy-leavitt-af604a`
- HEAD: `b8272e8`
- Status: 39 commits ahead of `origin/main`. Local `main` is fast-forwarded to the same HEAD. `origin/main` last seen at `ed99577` (the EmotionTTS pill-padding tweak).
- The user has NOT pushed; multiple "want me to push?" prompts during the session were not answered with a yes/no — left as final tail-end question.

## Commits in this arc (oldest → newest, summarised)

- `8eb31a3` 503 fix: manifest now lists migrations 006/007/008; `read_stored_version` resilient to "no such table"; `tracing::error!` on registration failure; `http_routes()` advertises `/inference/cancel` + `/available_models`.
- `8e6771a` `RuntimeTuning` extended with mmap/mlock/n_batch/n_ubatch/n_parallel/cont_batching/seed; `runtime_to_args` mapping; `sensible_defaults(layer_count, has_cuda)` helper.
- `a409141` ModelLoadDialog + RuntimeTuningForm (new `apps/web/src/layout/local_llm/`).
- `7527f6d` Deleted orphan host-overlay `apps/web/src/components/layout/{model_picker,runtime_panel,model_picker.css}`. tsc errors 52 → 3 as side benefit.
- `c7b67bf` Polish: `vars.color.text.inverse` for load-button text; logged FU-3.3-A action_dispatch rewire + FU-3.3-B focus trap as Task 3.3 obligations.
- `2bc4f9a` ChatSurface gains `headerSlot` + `inspector` slots.
- `2ad9274` Adapter wires ModelLoadDialog through `headerSlot`; focus trap + restoration; `local-llm/model-load-dialog:open` event rewire.
- `2b3fdfe` Polish: rename `metadataByInstallId` → `metadataByKey`; HeaderModelButton tokens + aria-haspopup; drop dead focus-restore guard.
- `89bc35f` `streamMessage` injects system prompt at head of body when non-empty + trimmed.
- `2dc392c` `SystemPromptEditor` component + `useDebounce` hook.
- `107cd02` Adapter wires SystemPromptEditor: fetch on activeId, debounce-persist 500 ms, forward to `streamMessage`. `inspector` slot stacks `<SamplerPanel>` + `<SystemPromptEditor>`.
- `d2168b0` Polish: cross-thread debounce race fix (sync-reset `generationSettings` to defaults at top of effect).
- `5e81744` `useTokenUsage` hook (per-thread, latest-snapshot semantics).
- `2574d54` `ContextMeter` primitive with three tonal thresholds.
- `c93ecdf` Adapter wires meter: `activeMaxContext` from sticky tuning, `useTokenUsage(activeId, activeMaxContext)`, conditional render. New 1 adapter test.
- `fe2977d` Polish: `record({})` no-op guard; un-export `toneFor`; depend on `tokenUsage.record` not whole object.
- `44fee9e` `InspectorPanel` (3 sections: 01 MODEL / 02 PARAMETERS / 03 SYSTEM PROMPT).
- `ba915c2` Adapter wires InspectorPanel; sampler decoupling (header tray's `sampler_override` is now inert at request time — see `FU-INSPECTOR-B` for resolution); `activeMaxContext` fallback tightened (FU-METER-A: never falls back to `model.max_context`, only `lastTuningByFamily[familyId].ctx_size`).
- `9f01f71` Polish: NaN guard in sampler handlers; localStorage polyfill in test wrapped in try/finally; remove dead paramValueText export; aria-hidden tightened to indicator span only.
- `7200883` Last Phase 5/5b stragglers (instance_view PageHero + backend-runtimes PageHero + models-search PageHero + extension-settings PageHero).
- `6783bf5` T042 + T043: blueprint + draft visual restyles → PageHero + Pill + Tabs primitives.
- (subsequent commits Phases 7+ from spec 037 — not part of this arc, were already on main when arc started.)
- `bb00965` First chat redesign pass: shiki code blocks + bubble alignment + composer attach/mic + chip XOR time + avatars rounded square.
- `9cb79bc` `prettyModelLabel` helper + HeaderModelButton max-width + EmptyChatState component.
- `2a2dffd` Sticky deployment-scoped model: localStorage-keyed `local-llm:deployment-active-model`, `LayoutContext` plumbs deploymentId, auto-bind effect on idle threads.
- `a31ad97` MessageBubble redesign with markdown + KaTeX + footer stats; ChatMessage gains authorLabel/Initials/tokens/latencyMs/cached.
- `0c1d12a` BE: `chat/runtime_status` endpoint walks `ModelLoadRegistry::find_ready()`.
- `19e1489` FE: `useLocalLlmRuntimeStatus()` hook polls every 4 s; adapter populates `liveRuntimeRef` from BOTH per-thread and global runtime status.
- `57e356c` Two scanner fixes: silently skip dirs without `manifest.yaml`; SQL validator allows INSERT into prefix-matching tables (was rejecting migration 008's schema_version sentinel).
- `c7de901` ChatMessage gains tokensPerSec/contextUsed/contextMax. Bubble footer renders all three.
- `70d8003` Composer polish: focus-within glow, gradient send button, char-count badge.
- `db9d29a` Adapter pipes new fields to bubble; `composerPlaceholder` is model-aware.
- `b8501a2` History persistence: `listMessages` on activeId change; `appendMessage` for user + assistant turns; optimistic IDs swapped for BE message_id on resolve. React 18 batching trap mitigated via `messagesRef`.
- `b8272e8` Auto-bind skip: when `liveRuntimeRef` matches sticky family/variant, do NOT call `setActiveModel` (was causing a second llama-server spawn on every fresh-thread switch).

## Architectural deltas worth remembering

- **Two sampler surfaces still exist (FU-INSPECTOR-B, deferred).** The header tray's per-thread `sampler_override` is INERT at request time — `streamMessage` reads only `generationSettings.{temperature,top_p,max_tokens}` from the InspectorPanel sampler. Either delete the header tray sampler or define a merge order. Track with FU-ADAPTER-B (hook extraction).
- **`chat_panel_adapter.tsx` is at ~620 LOC.** Hook extraction (`useChatThreads`, `useGenerationSettings`, `useModelLoad`) is well past due. Spec-037 review filed it as `FU-ADAPTER-B`; this session re-confirmed.
- **`displayedLoad` memo + `liveRuntimeRef`** is the canonical "all threads see ready when global runtime matches sticky" pattern. The recent auto-bind skip leans on this. If you refactor either, keep the contract: `displayedLoad.phase === "ready"` whenever `liveRuntimeRef` matches sticky, regardless of per-thread state.
- **Backend `set_active_model` does NOT deduplicate** against existing leases. The frontend skip (commit `b8272e8`) is the user-facing fix; a backend-side smartness would obviate the FE workaround. Defer until the spawner is touched for other reasons.
- **GGUF metadata pipeline is the install-time codepath from spec 028.** Spec 039 (just specced) extends it with `is_moe` + `expert_layer_count`. Same migration pattern.

## Spec 039 — `specs/039-llamacpp-throughput-tier1/`

Drafted via `/speckit-specify` at session end. **Expanded after initial draft** when the user asked to also surface counter-intuitive pitfalls as warnings and to add modern samplers "only if real benefit". Final scope:

**Three Tier-1 throughput knobs** (the original ask):

1. **`--cache-reuse N`** toggle (Memory section). Off by default. Min-chunk numeric input (default 256). Gated on known-broken models (Gemma 3, Qwen3-Next SWA hybrid) with unsafe-override affordance. When override is on for those families, **`--swa-full` is auto-applied** to argv (FR-029).
2. **`--cram MB` + `--checkpoint-every-n-tokens N`** toggle (Performance / Advanced section). Off by default. Two numeric inputs (cache 1024 MB default, checkpoint 8192 tokens default). Targets RAG TTFT.
3. **`--n-cpu-moe N`** slider (gated on `is_moe` from new GGUF metadata fields). Auto-bumps `n_batch` / `n_ubatch` to ≥ 2048 when above zero (the well-known `GGML_OP_OFFLOAD_MIN_BATCH` footgun). VRAM-budget read-out via pure helper.

**Sampler-quality additions** (added under the "real benefit only" filter):

4. **DRY (Don't Repeat Yourself)** — `--dry-multiplier`, `--dry-base`, `--dry-allowed-length`, `--dry-penalty-last-n`. Strictly better than classic `--repeat-penalty` for chat repetition control.
5. **min-p** — `--min-p`. Modern recommended replacement for top-p. Tiny addition.
6. **Profile presets** — three chips: **Chat (default)**, **Code & factual**, **Creative**. Each writes a fixed sampler combination into form state. Modified-dot indicator when operator hand-edits after picking a chip; re-clicking a modified chip prompts for confirmation.

(XTC, top-nσ, dynatemp, mirostat, logit-bias, etc. remain Out of Scope — niche or model-specific.)

**Counter-intuitive pitfall warnings** (six in-scope, surface inline at moment of input):

7. Gemma 3 + flash_attn + KV-q8_0 → amber chip + "Force FP16 KV" button (FR-026)
8. `top_k = 0` → clamp to 40 + slowdown info chip; below 40 needs explicit override (FR-027)
9. `n_parallel > 1` → advisory chip explaining slot KV-cost (FR-028)
10. cache-reuse override on Gemma/Qwen3-Next → auto-apply `--swa-full` (FR-029)
11. CPU-only (`n_gpu_layers = 0`) + `n_batch > 1024` → amber chip citing #6075 (FR-030)
12. Speculative decoding regression on small-active MoE → noted Out of Scope (defer to spec-decoding spec)
13. Containerized Metal slowdown → noted Out of Scope (environmental, requires runtime probe)

**Backend changes**: extend `RuntimeTuning` Rust struct with **10 optional fields total** (4 throughput + 5 sampler + 1 mitigation `swa_full`); `runtime_to_args` mapping; new migration on `installed_artifacts` for `is_moe` + `expert_layer_count`; install-time GGUF extraction; AvailableModel DTO update.

**Frontend changes**: TS interface mirror; new toggles + slider + sampler preset chips + warning-rule registry; HelpTooltip copy; pure VRAM-budget calculator; auto-bump callout; persistence in `lastTuningByFamily`.

**Boundary**: backend in `extensions/builtin/local-llm/`; frontend in `apps/web/src/layout/local_llm/`. Generic `apps/web/src/components/chat/` not touched.

**Final spec shape**: 7 user stories (4 throughput knobs + 1 GGUF metadata extraction + 1 sampler-quality + 1 counter-intuitive-warnings + 1 boundary discipline). 31 functional requirements (FR-001 through FR-031). 11 success criteria. Out of Scope explicitly enumerates deferred items including XTC family, multi-GPU, reasoning models, LoRA, real driver probe, live retune, containerized-Metal warning, spec-decoding regression coverage. Key Entities now lists 7 entities including `SamplerPreset` and `WarningRule`.

Deliverables:
- `specs/039-llamacpp-throughput-tier1/spec.md` — full feature spec.
- `specs/039-llamacpp-throughput-tier1/checklists/requirements.md` — quality checklist, all items pass.
- `.specify/feature.json` updated to point to `specs/039-llamacpp-throughput-tier1`.

Spec NOT yet committed. Run `/speckit-plan` then `/speckit-tasks` to generate the implementation plan and task list.

## Open questions for next session

1. **Push or not?** User has not answered the "push 39 commits to origin/main?" question. Probably appropriate to ask once at the top of next session before doing anything else.
2. **FU-INSPECTOR-B (two sampler surfaces).** Recommended to delete the header-tray `sampler_override` outright since it's currently inert. Need user signoff because there may be users with persisted sampler_override values they expect to keep working.
3. **FU-ADAPTER-B (hook extraction).** Adapter is at ~620 LOC. The spec-039 work will add ~50-80 LOC if shipped on top of current state; extracting first is the cleaner sequence.
4. **Spec 039 plan + tasks.** Run `/speckit-plan` against `specs/039-llamacpp-throughput-tier1/` to produce the implementation plan, then `/speckit-tasks` for the task breakdown.

## Files to read first next session

1. `specs/039-llamacpp-throughput-tier1/spec.md` — the just-drafted spec.
2. `apps/web/src/layout/chat_panel_adapter.tsx` — primary integration site for spec 039 frontend; also the candidate for FU-ADAPTER-B extraction.
3. `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` — primary surface for the new toggles + slider.
4. `extensions/builtin/local-llm/rust/src/chat/handlers.rs` — `RuntimeTuning` struct + `runtime_to_args` (lines 135-260 ish).
5. `apps/web/src/services/local_llm_chat.ts` — TS `RuntimeTuning` mirror + `AvailableModel` interface.
6. `extensions/builtin/local-llm/storage/migrations/` — next migration ID to use (008 is the latest used; spec 039 needs 009).

## Verification baseline at session close

- `pnpm vitest run` (apps/web): 237/243 passing (6 pre-existing failures: `recipe_catalog.state.test.tsx` × 3, `workflow_catalog.state.test.tsx` × 2, `tests/audit_redesign.unit.ts` syntax error).
- `pnpm exec tsc --noEmit`: 3 errors (pre-existing `node:fs/url/path` import issues in `component_registry.test.ts`).
- `cargo test -p nexus-extension --tests`: all green (124 lib + 4 integration).
- `cargo test -p nexus-extension --test discover_and_activate_scans_dir`: 3/3 (added empty-dir-skip regression).
- Boundary: `apps/web/src/components/chat/` empty for `local-llm`/`local_llm` literals.

## Constraints / sticky preferences (session-confirmed)

- **No inline `//` comments.** Test names + variable names + module structure carry the meaning. Audit-allow boundary markers are the ONLY allowed `//` lines.
- **No AI provenance markers anywhere.** No `🤖`, "Claude", "AI-generated", "Co-Authored-By: Claude".
- **Vanilla-extract `vars.*` tokens only.** Raw rgba / hex permitted ONLY inside `color-mix(in oklch, ...)` strings or gradient strings.
- **Boundary discipline is non-negotiable.** Generic `apps/web/src/components/chat/` stays generic. Per-extension code under `apps/web/src/layout/local_llm/` (or grandfathered `audit-allow:` sites). Backend per-extension code under `extensions/builtin/<ext-id>/`.
- **TDD where natural** — new tests added with each substantive change. Pre-existing test failures left alone unless the fix surfaced them.
