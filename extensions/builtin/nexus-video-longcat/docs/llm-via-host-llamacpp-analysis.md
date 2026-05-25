# LLM Prompt-Breakdown via Host llama.cpp Backend Runtime — Effort + VRAM Analysis
## Captured 2026-05-25 after operator question on T5 spec

User asked: *"what effort and VRAM impact will have usage of LLM via host llamacpp gguf provider? Can we first create multiple prompts from one big prompt and then start generation and can we reuse host app's available backend runtime - llamacpp and mark that this extension requires backend runtime llamacpp just like local chat llm?"*

Short answer: **Yes, and it's significantly better than the spawn-and-exit `llama-cpp-python` design in `docs/llm-planner-requirements.md`.** Reusing the host's backend runtime ecosystem reduces effort, avoids vendoring a second llama.cpp install, and gives operators a single source of truth for model management.

---

## How `local-llm` already does it (pattern to clone)

From `extensions/builtin/local-llm/manifest.yaml`:

```yaml
runtime_dependencies:
  - family: "llama.cpp"
    version: ">=b4000"
    acceleration:
      - "cpu"
      - "cuda12"
      - "cuda13"

backend_runtimes:
  - runtime_id: "nexus.local-llm.completions"
    display_name: "Local LLM — Text Completion"
    family: "python"
    transport: "stdio"
    worker_entrypoint: "backends/llamacpp/completions_worker.py"
    version_manifest: "backends/llamacpp/completions_versions.yaml"
    capability_tags:
      - "text-completion"
    supported_roles:
      - "draft-suggestions"
```

Two layers:

1. **`runtime_dependencies`** declares "I need a llama.cpp binary." Host installer (per spec 032 Generic backend-runtime catalog + lease API, merged to main) provisions the binary at extension-install time. The extension does NOT vendor llama.cpp — it leases the host-managed install.
2. **`backend_runtimes`** exposes a TYPED runtime (`nexus.local-llm.completions`) that OTHER extensions can lease via the lease API. This is the cross-extension surface.

## Two reuse options for storyboard extension

### Option A — Storyboard declares its own llama.cpp lease

Add to `extensions/builtin/nexus-video-longcat/manifest.yaml`:

```yaml
runtime_dependencies:
  - family: "llama.cpp"
    version: ">=b4000"
    acceleration: ["cpu", "cuda12", "cuda13"]
```

Storyboard worker spawns a llama.cpp process at planner-time, sends prompt, gets scenes JSON, kills process. Identical pattern to local-llm's own internal llama.cpp use, no cross-extension RPC.

**Pros**:
- Self-contained — storyboard works even if local-llm extension isn't installed.
- Direct control over model selection (storyboard picks its own GGUF).
- Zero cross-extension protocol surface.

**Cons**:
- Duplicates the llama.cpp lease lifecycle code that local-llm already implements.
- Two extensions now manage their own GGUF model installs.

### Option B — Storyboard leases `nexus.local-llm.completions`

Add to `extensions/builtin/nexus-video-longcat/manifest.yaml`:

```yaml
runtime_dependencies:
  - runtime_id: "nexus.local-llm.completions"
    capability_tag: "text-completion"
    minimum_role: "draft-suggestions"
```

Storyboard worker calls into the host lease API to acquire a `nexus.local-llm.completions` worker, sends prompt, releases lease. Host arbitrates concurrency + lifecycle. The local-llm extension is the SOURCE of truth for model selection + GGUF management.

**Pros**:
- Single source of truth for LLM model management (local-llm owns it).
- Cross-extension reuse pattern — establishes the pattern for future extensions needing LLM.
- Storyboard's manifest stays narrow; no GGUF management code.
- Operator already installed a model via local-llm UI → storyboard reuses it.

**Cons**:
- Requires local-llm extension installed and enabled.
- Cross-extension RPC adds one network hop (stdio → host broker → stdio).
- Coupling to local-llm's API (model selection UI, etc.).

### Recommendation: **Option B**

Reasons:
1. **Boundary hygiene** — host-extension-boundary rule in `.claude/rules/host-extension-boundary.md` says extensions should reuse host-mediated capabilities. local-llm is the host-mediated LLM extension; storyboard should consume it the same way any other extension would.
2. **Operator UX** — user already manages GGUF models in local-llm UI. Storyboard reusing those models avoids double-install + double-tuning.
3. **Future-proofing** — when local-llm switches GGUFs (Llama-3 → Llama-4 → whatever), storyboard inherits the upgrade for free.
4. **Failure mode is identical** — Option A fails on missing llama.cpp binary; Option B fails on missing local-llm extension. Both fall back to S2-1 deterministic compiler.

---

## VRAM impact analysis

### Phase ordering (critical for VRAM math)

```
T=0  user submits big prompt
T=1  storyboard worker spawns
T=2  storyboard leases local-llm.completions
T=3  llama.cpp loads small GGUF (Llama-3.2-3B-Q4 ≈ 1.8 GB GGUF on disk)
T=4  prompt → scenes JSON (≈2-5 seconds)
T=5  llama.cpp unloads / lease released
T=6  validator runs (microseconds, pure-python)
T=7  user reviews/edits scenes (optional)
T=8  render.start fires
T=9  LongCat 13B loads (15.7 GiB peak on 16 GiB card)
T=10 render runs ~19 min
```

**Critical invariant**: planner runs at T=4, LongCat runs at T=9. They NEVER overlap unless the operator explicitly keeps the planner loaded (anti-pattern).

### VRAM budget per phase (RTX 5070 Ti 16 GiB)

| Phase | LLM planner | LongCat | Free | Notes |
|---|---|---|---|---|
| Pre-render planner | 2.0 GB GPU (Q4 full offload) | 0 GB | 14 GB | Tight but fits |
| Pre-render planner (CPU-only) | 0 GB GPU + 3.5 GB RAM | 0 GB | 16 GB GPU | RAM cost, no VRAM cost |
| LongCat render | 0 GB (unloaded) | 15.7 GB peak | 0.2 GB headroom | Full LongCat budget |
| Concurrent (anti-pattern) | 2.0 GB | 15.7 GB | -1.7 GB **OOM** | Don't do this |

### Recommended config: CPU-only planner

The planner job is tiny (≈100 tokens output). Even on CPU, Q4 produces output in 2-3 seconds. CPU-only avoids ALL VRAM contention. Use:

- Model: Llama-3.2-3B-Instruct-Q4_K_M
- Backend: llama.cpp CPU-only build (or GPU build with `n_gpu_layers=0`)
- RAM peak: ~3.5 GB
- Latency: <5 s on 6-core x86
- VRAM cost: **0 bytes**

The host's llama.cpp backend already supports CPU mode (`acceleration: ["cpu", ...]` in runtime_dependencies). Storyboard simply requests CPU acceleration tier for the planner lease.

### Edge case: low-RAM systems

On 8 GB RAM systems, 3.5 GB Q4 planner + 4 GB OS + 1 GB other = tight. Mitigation: use SmolLM2-1.7B-Q4 (~2 GB RAM peak) or fall back to S2-1 deterministic compiler.

---

## Effort estimate

| Item | Effort | Notes |
|---|---|---|
| Manifest declaration (`runtime_dependencies: nexus.local-llm.completions`) | XS (5 min) | One YAML block |
| `plan_llm.py` module with `expand_prompt()` that acquires lease + sends prompt + parses JSON | M (1 day) | Lease acquire/release, prompt template, JSON parse, fallback wiring |
| `longcat.video.plan.expand` RPC method | S (2-3 hrs) | Thin wrapper around `expand_prompt`, handles errors |
| Prompt template + JSON-schema constrained sampling for llama.cpp | S (2-3 hrs) | Template + sampler config |
| Validator round-trip (LLM output → `validate_plan` → fall back to S2-1 on fail) | S (1-2 hrs) | Existing validator + existing compiler stub |
| Unit tests (mock lease, validator round-trip, fallback paths) | S (3-4 hrs) | 8-10 tests |
| Documentation + manifest version bump | XS (30 min) | README section + version |
| **Subtotal — LLM layer** | **~2 dev-days** | |
| S2-1 deterministic compiler (PRE-REQUISITE) | M (1 day) | The floor; ships first |
| **Total** | **~3 dev-days** | |

**Compared to original spawn-and-exit design** (in `llm-planner-requirements.md`): saves ~1 dev-day by reusing local-llm's lease infrastructure instead of vendoring llama-cpp-python directly.

---

## What needs to land in order

1. **S2-1 deterministic compiler first** (`compile_storyboard.py`) — the zero-dependency floor. Ships even if user never installs local-llm.
2. **Cross-extension lease primitive verification** — confirm spec 032's lease API supports the pattern. Local-llm uses it for its own internal completions; we need it usable from a SECOND extension.
3. **Manifest dependency declaration** — declare `runtime_dependencies: nexus.local-llm.completions` and confirm host installer recognises cross-extension runtime deps.
4. **`plan_llm.py` impl** with `expand_prompt(prompt, duration, scene_count, style_hint, seed, timeout) → dict`.
5. **`longcat.video.plan.expand` RPC** method registered in `register_longcat_handlers`.
6. **Fallback wiring** — every failure path (lease unavailable, llama.cpp returns malformed JSON, timeout, model not installed) falls through to S2-1.
7. **Tests** — mock lease, mock llama responses, validator round-trip.

---

## Open questions for operator decision

1. **Option A vs Option B?** Recommendation is B (reuse local-llm). Confirm.
2. **Required vs optional dep?** Recommendation: optional. Storyboard works without local-llm via S2-1 deterministic compiler. local-llm is a quality enhancement.
3. **CPU-only planner default?** Recommendation: yes. Zero VRAM cost; latency adequate.
4. **Which Q4 model as the default planner?** Recommendation: Llama-3.2-3B-Instruct-Q4_K_M. SmolLM2-1.7B-Q4 as the low-RAM fallback.
5. **Ship S2-1 first then LLM, or skip S2-1?** Recommendation: ship S2-1 first. ~1 dev-day for a stable floor that doesn't depend on any LLM, then layer LLM on top.

---

## Backlog adjustment

Replace original T5 (`llm-planner-requirements.md` — spawn-and-exit) with a new task:

**T5 (revised)** — Add `nexus.local-llm.completions` as optional cross-extension runtime dep + implement `plan.expand` RPC with `plan_llm.py` module that leases via host lease API, falls back to S2-1 deterministic compiler.

This supersedes the spawn-and-exit pattern documented in the original T5. Both docs stay in the repo for design-history continuity.
