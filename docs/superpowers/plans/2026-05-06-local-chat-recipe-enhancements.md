# Local Chat Recipe Enhancements + 503 Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Local LLM chat recipe usable end-to-end inside a deployment view: rich model picker with LM-Studio-style load-time params, system-prompt input, live context-window tracking, and Spectral-Graphite right-inspector redesign — and fix the 503 storm at the dispatcher that currently hides everything.

**Architecture:** Three layers. (1) **Backend** — extend `RuntimeTuning` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` with the missing llama.cpp knobs (mmap, n_batch, n_parallel, cont_batching, mlock) and propagate via `runtime_to_args()`; diagnose why `LocalLlmRouterProvider::build_router()` is failing (the dispatcher returns 503 with `elapsed_ms=0` only when registration failed — the canary is `Registration::Failed`). (2) **Bridge** — wire `chat_panel_adapter.tsx` to actually pass `RuntimeTuning` and `system_prompt` into `setActiveModel` and the streaming send-path; capture token usage from each `streamMessage().onDone` and expose it through `ChatSurface` props. (3) **UI** — split the right inspector into a `MODEL` card (load state + ctx/output bars), a `PARAMETERS` stack (sampler + system-prompt textarea), and a `LOAD-TIME CONFIG` section that surfaces the existing `RuntimePanel` controls inline (replacing the dead full-screen overlay). The header `ModelPicker` becomes the entry point to a load dialog that collects all params before binding.

**Tech Stack:** Rust 1.84 (workspace MSRV), TypeScript 5.x, React 19, vanilla-extract, SWR, sonner, Vitest, Playwright. No new packages — every piece is already wired or already in `package.json`.

**Boundary discipline (mandatory):** Per `.claude/rules/host-extension-boundary.md`, `apps/web/src/components/chat/*` MUST stay generic — no LLM-specific imports, no `nexus.local-llm` literals. All LLM-specific UI lives under `apps/web/src/layout/chat_panel_adapter.tsx` (acknowledged grandfathered debt) and **new** components must land under `apps/web/src/layout/local_llm/` (a new per-extension folder, namespaced like the existing `apps/web/src/components/layout/` LLM files but cleanly grouped). No new `local-llm` strings inside `apps/web/src/components/chat/`. No new tables in host migrations. The `ChatSurface` contract gets new optional props — that is the seam.

---

## File Structure

### Backend (extension)

| Path | Responsibility | Action |
|------|----------------|--------|
| `extensions/builtin/local-llm/rust/src/chat/handlers.rs` | `RuntimeTuning` struct + `runtime_to_args()` mapping | Modify (extend) |
| `extensions/builtin/local-llm/rust/src/chat/registration.rs` | New file — diagnostic logging when build_router fails | Create |
| `extensions/builtin/local-llm/rust/src/register.rs` | Wire diagnostic logging on `BuildRouterError` | Modify |
| `extensions/builtin/local-llm/rust/src/chat/handlers_test.rs` | Tests for extended `runtime_to_args` | Modify (extend) |

### Frontend (host bridge + new LLM-specific components)

| Path | Responsibility | Action |
|------|----------------|--------|
| `apps/web/src/components/chat/chat_surface.tsx` | Generic surface — accept `inspector` prop + new optional `headerSlot` | Modify (extend props) |
| `apps/web/src/components/chat/sampler_panel.tsx` | DEAD CODE — gets replaced by adapter-supplied inspector | Delete in P6 |
| `apps/web/src/components/chat/__tests__/chat_surface.test.tsx` | Add cases for new `inspector` slot wiring | Modify |
| `apps/web/src/layout/chat_panel_adapter.tsx` | LLM bridge — passes RuntimeTuning + system_prompt + token usage | Modify |
| `apps/web/src/layout/local_llm/` | NEW — extension-specific UI components | Create directory |
| `apps/web/src/layout/local_llm/model_load_dialog.tsx` | LM-Studio-style modal: model list + load params + Load button | Create |
| `apps/web/src/layout/local_llm/model_load_dialog.css.ts` | vanilla-extract styles | Create |
| `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` | The actual load-time controls (n_gpu_layers, ctx_size, kv quant, flash_attn, mmap, n_batch, n_parallel, threads) | Create — reuse `RuntimePanel` logic |
| `apps/web/src/layout/local_llm/inspector_panel.tsx` | Right-inspector: MODEL card + PARAMETERS + system-prompt textarea | Create |
| `apps/web/src/layout/local_llm/inspector_panel.css.ts` | Styles | Create |
| `apps/web/src/layout/local_llm/context_meter.tsx` | Tokens-used / max_context bar primitive | Create |
| `apps/web/src/layout/local_llm/system_prompt_editor.tsx` | Textarea with token-count + override toggle | Create |
| `apps/web/src/layout/local_llm/use_token_usage.ts` | Hook that accumulates `StreamStats` across thread | Create |
| `apps/web/src/services/local_llm_chat.ts` | Extend `streamMessage` to accept system prompt; emit usage events | Modify |
| `apps/web/src/services/local_llm_chat.test.ts` | Test system-prompt prepend + usage emission | Create |
| `apps/web/src/components/layout/model_picker.tsx` | Orphan full-screen overlay — DELETE after P3 | Delete |
| `apps/web/src/components/layout/runtime_panel.tsx` | Orphan — logic moves to `runtime_tuning_form.tsx`, then DELETE | Delete |

---

## Phase 1 — Diagnose & Fix the 503 Storm

The user reports continuous `5xx status=503 elapsed_ms=0` from `nexus_api::request`. `elapsed_ms=0` means the dispatcher rejected the request before any handler ran. From the code in `crates/nexus-api/src/extension_router/dispatcher.rs:71`, that means `Registration::Failed`. Root cause is almost always `LocalLlmRouterProvider::build_router()` returning `Err(BuildRouterError)` — most commonly because `ChatHistoryStoreSqlx::new()` failed (schema-version mismatch, migration runner ordering, missing `ext_local_llm_meta`).

### Task 1.1 — Add structured diagnostic on registration failure

**Files:**
- Modify: `extensions/builtin/local-llm/rust/src/register.rs:80` (where `ChatHistoryStoreSqlx::new` is awaited)
- Modify: `crates/nexus-core/src/app.rs:551` (where `register_failure` is called)

- [ ] **Step 1: Reproduce** — Start the host, hit any `/api/v1/extensions/nexus.local-llm/*` endpoint, capture the 503 response body. Run:

```bash
cargo run -p nexus-cli -- serve &
sleep 3
curl -i http://127.0.0.1:7878/api/v1/extensions/nexus.local-llm/chat/threads
```

Expected: `503 Service Unavailable` with body `{"error":"registration_failed","extension_id":"nexus.local-llm","reason":"<actual reason>"}`. Copy the `reason` text.

- [ ] **Step 2: Inspect the SQLite state** — open the host DB and check `ext_local_llm_meta`:

```bash
sqlite3 ~/.local/share/nexus-dnn/state.db "SELECT * FROM ext_local_llm_meta;"
sqlite3 ~/.local/share/nexus-dnn/state.db ".schema ext_local_llm_chat_threads"
```

Expected: either `no such table: ext_local_llm_meta` (migrations never ran) OR `schema_version` row with a value that `ChatHistoryStoreSqlx` rejects.

- [ ] **Step 3: Add a test that asserts a clean cold-start registers successfully**

File: `extensions/builtin/local-llm/rust/src/chat/registration_test.rs`

```rust
use crate::register::LocalLlmRouterProvider;
use sqlx::sqlite::SqlitePoolOptions;

#[tokio::test]
async fn cold_start_registers_router() {
    let pool = SqlitePoolOptions::new()
        .max_connections(1)
        .connect("sqlite::memory:")
        .await
        .expect("memory pool");

    let provider = LocalLlmRouterProvider::new(pool, /* host_client stub */);
    let result = provider.build_router().await;

    assert!(
        result.is_ok(),
        "cold start must register cleanly, got {:?}",
        result.err()
    );
}
```

- [ ] **Step 4: Run test** — `cargo test -p local-llm-extension cold_start_registers_router`. Expected: FAIL initially with the actual error message reproducing the 503 reason.

- [ ] **Step 5: Apply the fix.** Three likely fixes by reason text:

   - If reason contains `no such table: ext_local_llm_meta` — the migration runner never ran the schema. Fix: ensure migration `008_chat_history_persistence.sql` is included in the manifest's `migrations.files` list (it is currently missing per the research). Edit `extensions/builtin/local-llm/manifest.yaml` to list `001`–`008`.

   - If reason contains `schema_version mismatch` — `ChatHistoryStoreSqlx::new` rejects an older sentinel. Fix: implement an idempotent upgrade path in `chat_history/migrations.rs` that bumps `schema_version` from N to 8 by running the bridge migrations.

   - If reason contains `duplicate column name` — `ensure_schema()` in `chat/handlers.rs:233` is fighting the migration runner. Fix: gate `ensure_schema()` behind a `schema_version == 0` check; if the migration runner already ran, it's a no-op.

- [ ] **Step 6: Re-run test** — `cargo test -p local-llm-extension cold_start_registers_router`. Expected: PASS.

- [ ] **Step 7: Improve the dispatcher 503 message** — currently it leaks the raw reason. Add a `tracing::error!` at the registration site so the host log carries the failure once, not on every dispatched request:

In `extensions/builtin/local-llm/rust/src/register.rs`, wrap the `build_router` failure path:

```rust
match self.build_router_inner().await {
    Ok(router) => Ok(router),
    Err(err) => {
        tracing::error!(
            extension_id = "nexus.local-llm",
            error = %err,
            "router build failed; all requests will return 503 until restart"
        );
        Err(err)
    }
}
```

- [ ] **Step 8: Commit**

```bash
git add extensions/builtin/local-llm/
git commit -m "fix(local-llm): repair build_router cold-start failure causing 503 storm"
```

### Task 1.2 — Add a quick-recovery endpoint

The dispatcher has no retry. A registered-failed extension stays failed until host restart. Add a manual retry button surface so users can recover without a restart.

**Files:**
- Modify: `crates/nexus-api/src/extension_router/dispatcher.rs`
- Modify: `crates/nexus-api/src/handlers/extensions/mod.rs`
- Create: `crates/nexus-api/src/handlers/extensions/retry_registration.rs`

- [ ] **Step 1: Write failing test**

File: `crates/nexus-api/tests/extension_retry.rs`

```rust
#[tokio::test]
async fn retry_registration_clears_failed_state() {
    let app = test_app_with_failed_registration().await;
    let res = app.post("/api/v1/extensions/nexus.local-llm/_admin/retry_registration")
        .await;
    assert_eq!(res.status(), 200);
    assert_eq!(res.json::<Value>()["status"], "registered");
}
```

- [ ] **Step 2: Run test** — `cargo test -p nexus-api retry_registration_clears_failed_state`. Expected: FAIL — endpoint not found.

- [ ] **Step 3: Implement the handler** with body:

```rust
pub async fn retry_registration(
    State(state): State<AppState>,
    Path(extension_id): Path<String>,
) -> ApiResponse<RegistrationStatus> {
    let parsed = parse_extension_id(&extension_id)?;
    state.extension_registry.retry(parsed).await
        .map(|r| ApiResponse::ok(r))
        .unwrap_or_else(|e| ApiResponse::err(SERVICE_UNAVAILABLE, "retry_failed", "extension", e.to_string()))
}
```

Mount at `POST /api/v1/extensions/:id/_admin/retry_registration`.

- [ ] **Step 4: Run test** — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat(extensions): add manual retry endpoint for failed registrations"
```

---

## Phase 2 — Extend `RuntimeTuning` with Missing llama.cpp Knobs

Current `RuntimeTuning` (in `extensions/builtin/local-llm/rust/src/chat/handlers.rs:135`) covers `n_gpu_layers`, `threads`, `flash_attn`, `ctx_size`, `cache_type_k`, `cache_type_v`. Missing common knobs that the LM-Studio mockup shows: `mmap`, `mlock`, `n_batch`, `n_ubatch`, `n_parallel`, `cont_batching`, `seed`. Also `n_experts` and MoE-specific options for Mixtral/Gemma-MoE.

### Task 2.1 — Extend the struct

**Files:**
- Modify: `extensions/builtin/local-llm/rust/src/chat/handlers.rs:135`

- [ ] **Step 1: Write failing test**

File: `extensions/builtin/local-llm/rust/src/chat/handlers_test.rs`

```rust
#[test]
fn runtime_to_args_includes_all_extended_knobs() {
    let tuning = RuntimeTuning {
        n_gpu_layers: Some(26),
        threads: Some(12),
        flash_attn: Some(true),
        ctx_size: Some(4096),
        cache_type_k: Some("q8_0".into()),
        cache_type_v: Some("q8_0".into()),
        mmap: Some(true),
        mlock: Some(false),
        n_batch: Some(512),
        n_ubatch: Some(128),
        n_parallel: Some(4),
        cont_batching: Some(true),
        seed: None,
    };
    let args = runtime_to_args(&tuning);
    assert!(args.windows(2).any(|w| w[0] == "--mmap"));
    assert!(args.windows(2).any(|w| w[0] == "--batch-size" && w[1] == "512"));
    assert!(args.windows(2).any(|w| w[0] == "--parallel" && w[1] == "4"));
    assert!(args.iter().any(|a| a == "--cont-batching"));
}
```

- [ ] **Step 2: Run test** — `cargo test -p local-llm-extension runtime_to_args_includes_all_extended_knobs`. Expected: FAIL — fields don't exist.

- [ ] **Step 3: Extend the struct**

```rust
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct RuntimeTuning {
    pub n_gpu_layers: Option<u32>,
    pub threads: Option<u32>,
    pub flash_attn: Option<bool>,
    pub ctx_size: Option<u32>,
    pub cache_type_k: Option<String>,
    pub cache_type_v: Option<String>,
    pub mmap: Option<bool>,
    pub mlock: Option<bool>,
    pub n_batch: Option<u32>,
    pub n_ubatch: Option<u32>,
    pub n_parallel: Option<u32>,
    pub cont_batching: Option<bool>,
    pub seed: Option<i64>,
}
```

- [ ] **Step 4: Extend `runtime_to_args()`**

```rust
pub fn runtime_to_args(t: &RuntimeTuning) -> Vec<String> {
    let mut args = Vec::new();
    if let Some(v) = t.n_gpu_layers { args.extend(["--n-gpu-layers".into(), v.to_string()]); }
    if let Some(v) = t.threads {
        args.extend(["--threads".into(), v.to_string()]);
        args.extend(["--threads-batch".into(), v.to_string()]);
    }
    if let Some(v) = t.flash_attn { args.extend(["--flash-attn".into(), if v {"on"} else {"off"}.into()]); }
    if let Some(v) = t.ctx_size { args.extend(["--ctx-size".into(), v.to_string()]); }
    if let Some(v) = &t.cache_type_k { args.extend(["--cache-type-k".into(), v.clone()]); }
    if let Some(v) = &t.cache_type_v { args.extend(["--cache-type-v".into(), v.clone()]); }
    match t.mmap {
        Some(true) => args.push("--mmap".into()),
        Some(false) => args.push("--no-mmap".into()),
        None => {}
    }
    if let Some(true) = t.mlock { args.push("--mlock".into()); }
    if let Some(v) = t.n_batch { args.extend(["--batch-size".into(), v.to_string()]); }
    if let Some(v) = t.n_ubatch { args.extend(["--ubatch-size".into(), v.to_string()]); }
    if let Some(v) = t.n_parallel { args.extend(["--parallel".into(), v.to_string()]); }
    if let Some(true) = t.cont_batching { args.push("--cont-batching".into()); }
    if let Some(v) = t.seed { args.extend(["--seed".into(), v.to_string()]); }
    args
}
```

- [ ] **Step 5: Run test** — Expected: PASS.

- [ ] **Step 6: Add a defaults helper**

```rust
impl RuntimeTuning {
    pub fn sensible_defaults(layer_count: Option<u32>, has_cuda: bool) -> Self {
        Self {
            n_gpu_layers: layer_count.map(|n| if has_cuda { n } else { 0 }),
            threads: Some(num_cpus::get() as u32 / 2),
            flash_attn: Some(has_cuda),
            ctx_size: Some(4096),
            cache_type_k: if has_cuda { Some("q8_0".into()) } else { Some("fp16".into()) },
            cache_type_v: if has_cuda { Some("q8_0".into()) } else { Some("fp16".into()) },
            mmap: Some(true),
            mlock: Some(false),
            n_batch: Some(512),
            n_ubatch: Some(128),
            n_parallel: Some(1),
            cont_batching: Some(true),
            seed: None,
        }
    }
}
```

- [ ] **Step 7: Test the defaults helper**

```rust
#[test]
fn sensible_defaults_for_cuda_enables_flash_attn_and_q8_kv() {
    let d = RuntimeTuning::sensible_defaults(Some(40), true);
    assert_eq!(d.flash_attn, Some(true));
    assert_eq!(d.cache_type_k.as_deref(), Some("q8_0"));
    assert_eq!(d.n_gpu_layers, Some(40));
}
```

Run: `cargo test -p local-llm-extension sensible_defaults`. Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git commit -am "feat(local-llm): extend RuntimeTuning with mmap/mlock/n_batch/n_parallel/seed"
```

---

## Phase 3 — Wire Model Selection Inside Deployment Chat

Today the chat surface header has a `<ModelPicker>` combobox that just lists models. The orphan `apps/web/src/components/layout/model_picker.tsx` is the rich LM-Studio-style overlay but is unreachable. We replace the in-header combobox with a "Select model" button that opens a `ModelLoadDialog` modal. The modal collects `RuntimeTuning` before binding.

### Task 3.1 — Create `ModelLoadDialog` skeleton

**Files:**
- Create: `apps/web/src/layout/local_llm/model_load_dialog.tsx`
- Create: `apps/web/src/layout/local_llm/model_load_dialog.css.ts`

- [ ] **Step 1: Write the failing test**

File: `apps/web/src/layout/local_llm/__tests__/model_load_dialog.test.tsx`

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ModelLoadDialog } from "../model_load_dialog";

const fakeModels = [
  { family_id: "gemma-4-26b-a4b-instruct", variant_id: "q4_k_m", label: "Gemma 4 26B A4B Instruct", format: "gguf", size_bytes: 16e9, max_context: 262144 },
];

test("renders model list and disables Load until selection", () => {
  const onLoad = vi.fn();
  render(<ModelLoadDialog open models={fakeModels} onLoad={onLoad} onClose={vi.fn()} />);
  const loadBtn = screen.getByRole("button", { name: /load model/i });
  expect(loadBtn).toBeDisabled();
  fireEvent.click(screen.getByText(/Gemma 4 26B/));
  expect(loadBtn).toBeEnabled();
});

test("invokes onLoad with full RuntimeTuning when Load clicked", () => {
  const onLoad = vi.fn();
  render(<ModelLoadDialog open models={fakeModels} onLoad={onLoad} onClose={vi.fn()} />);
  fireEvent.click(screen.getByText(/Gemma 4 26B/));
  fireEvent.click(screen.getByRole("button", { name: /load model/i }));
  expect(onLoad).toHaveBeenCalledWith(
    fakeModels[0],
    expect.objectContaining({
      ctx_size: expect.any(Number),
      n_gpu_layers: expect.any(Number),
      flash_attn: expect.any(Boolean),
      mmap: expect.any(Boolean),
    })
  );
});
```

- [ ] **Step 2: Run** — `pnpm vitest run apps/web/src/layout/local_llm`. Expected: FAIL (file missing).

- [ ] **Step 3: Implement dialog**

```tsx
import { useState } from "react";
import * as s from "./model_load_dialog.css";
import type { AvailableModel } from "../../services/local_llm_chat";
import { RuntimeTuningForm, type RuntimeTuning } from "./runtime_tuning_form";

interface Props {
  open: boolean;
  models: AvailableModel[];
  defaultTuning?: RuntimeTuning;
  onLoad: (model: AvailableModel, tuning: RuntimeTuning) => void;
  onClose: () => void;
}

export function ModelLoadDialog({ open, models, defaultTuning, onLoad, onClose }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tuning, setTuning] = useState<RuntimeTuning>(defaultTuning ?? defaultsFor(null));
  const selected = models.find((m) => modelKey(m) === selectedId) ?? null;

  if (!open) return null;
  return (
    <div className={s.scrim} onClick={onClose} role="presentation">
      <div className={s.dialog} role="dialog" aria-modal="true" aria-labelledby="mld-title" onClick={(e) => e.stopPropagation()}>
        <header className={s.head}>
          <h2 id="mld-title" className={s.title}>Load Model</h2>
          <button className={s.close} onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className={s.body}>
          <ul className={s.list}>
            {models.map((m) => (
              <li key={modelKey(m)}>
                <button
                  type="button"
                  className={s.row}
                  data-selected={selectedId === modelKey(m)}
                  onClick={() => { setSelectedId(modelKey(m)); setTuning(defaultsFor(m)); }}
                >
                  <span className={s.rowTitle}>{m.label}</span>
                  <span className={s.rowMeta}>{formatBytes(m.size_bytes)} · ctx {m.max_context.toLocaleString()}</span>
                </button>
              </li>
            ))}
          </ul>
          {selected && (
            <RuntimeTuningForm
              model={selected}
              value={tuning}
              onChange={setTuning}
            />
          )}
        </div>
        <footer className={s.foot}>
          <button className={s.cancel} onClick={onClose}>Cancel</button>
          <button
            className={s.primary}
            disabled={!selected}
            onClick={() => selected && onLoad(selected, tuning)}
          >
            Load Model
          </button>
        </footer>
      </div>
    </div>
  );
}

function modelKey(m: AvailableModel) { return `${m.family_id}:${m.variant_id}`; }
function formatBytes(n: number) { return `${(n / 1e9).toFixed(2)} GB`; }
function defaultsFor(m: AvailableModel | null): RuntimeTuning {
  return {
    n_gpu_layers: 0, threads: 8, flash_attn: false,
    ctx_size: m ? Math.min(8192, m.max_context) : 4096,
    cache_type_k: "fp16", cache_type_v: "fp16",
    mmap: true, mlock: false, n_batch: 512, n_ubatch: 128, n_parallel: 1, cont_batching: true,
  };
}
```

- [ ] **Step 4: Style with vanilla-extract** — `model_load_dialog.css.ts` using Spectral Graphite tokens (`var(--surface-low)`, `var(--accent)`, `var(--r-lg)`, `var(--shadow-lg)`). Mirror the LM-Studio screenshot: 720×640 dialog, list on left, params on right, header with title + close, footer with Cancel + Load Model (primary).

- [ ] **Step 5: Run test** — Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat(local-llm): add ModelLoadDialog with LM-Studio-style param form"
```

### Task 3.2 — Build `RuntimeTuningForm`

**Files:**
- Create: `apps/web/src/layout/local_llm/runtime_tuning_form.tsx`
- Create: `apps/web/src/layout/local_llm/runtime_tuning_form.css.ts`

- [ ] **Step 1: Write failing test** for the contract — every knob renders, slider edges match `model.max_context`, KV-quant disabled when flash_attn off:

```tsx
test("ctx_size slider max equals model.max_context", () => {
  const onChange = vi.fn();
  render(<RuntimeTuningForm model={fakeModels[0]} value={defaultTuning} onChange={onChange} />);
  const slider = screen.getByLabelText(/Context Length/i);
  expect(slider).toHaveAttribute("max", "262144");
});
```

- [ ] **Step 2: Run** — Expected: FAIL.

- [ ] **Step 3: Implement** — port the existing `apps/web/src/components/layout/runtime_panel.tsx` controls and add the new ones (mmap, mlock, n_batch, n_ubatch, n_parallel, cont_batching, seed). Use disclosure (`<details>`) for an "Show advanced settings" toggle so the dialog isn't overwhelming. Group: **Memory** (ctx_size, GPU offload, KV cache, flash_attn), **Performance** (threads, n_batch, n_ubatch, n_parallel, cont_batching, mmap, mlock), **Sampling** (seed).

- [ ] **Step 4: Run test** — PASS.

- [ ] **Step 5: Delete the orphan**

```bash
rm apps/web/src/components/layout/model_picker.tsx
rm apps/web/src/components/layout/runtime_panel.tsx
git rm apps/web/src/components/layout/model_picker.tsx apps/web/src/components/layout/runtime_panel.tsx
```

- [ ] **Step 6: Boundary audit** — run grep for any remaining `local-llm` literal in `apps/web/src/components/`:

```bash
grep -rn "local-llm\|local_llm" apps/web/src/components/
```

Expected: zero matches in `apps/web/src/components/chat/` (the host-generic surface). Matches under other folders are fine if they are in the deletion list above.

- [ ] **Step 7: Commit**

```bash
git commit -am "feat(local-llm): add RuntimeTuningForm; delete orphan host-side overlay"
```

### Task 3.3 — Wire dialog into `chat_panel_adapter.tsx`

**Files:**
- Modify: `apps/web/src/layout/chat_panel_adapter.tsx`
- Modify: `apps/web/src/services/local_llm_chat.ts` (`setActiveModel` already accepts `runtime` — confirm)
- Modify: `apps/web/src/components/chat/chat_surface.tsx` (replace `headerRight` ModelPicker with a button + slot)
- Modify: `apps/web/src/layout/action_dispatch.ts` (rewire `llm.open_model_browser` — see follow-up FU-3.3-A below)
- Modify: `apps/web/src/layout/local_llm/model_load_dialog.tsx` (focus trap + restoration — see follow-up FU-3.3-B below)

**Pre-merge follow-ups inherited from Tasks 3.1 + 3.2 code review (HEAD `7527f6d`):**

- **FU-3.3-A — Rewire `llm.open_model_browser` action.** `apps/web/src/layout/action_dispatch.ts:45-55` still fires `window.dispatchEvent(new CustomEvent("local-llm/model-picker:open"))` whose listener (the deleted overlay) no longer exists. The action becomes a silent no-op. Fix as part of Task 3.3: replace the dispatcher body with a navigation to the deployment view's chat tab (where `ModelLoadDialog` is now mounted), or — simpler — emit a new event `local-llm/model-load-dialog:open` that the chat_panel_adapter listens to and uses to flip its dialog-open state. Drop the `audit-allow` boundary marker on line 46 once the rewire lands.

- **FU-3.3-B — Focus trap + restoration in `ModelLoadDialog`.** Initial focus is set on the dialog wrapper, but there is no Tab trap and no focus restoration on close. For a dialog that performs a consequential action (loading a model), this is a real a11y gap. Two acceptable fixes: (a) refactor the modal to use the native `<dialog>` element with `showModal()` (browser-native trap + restoration), or (b) add a small `useFocusTrap(dialogRef, open)` hook + a `previousFocusRef` saved on open and restored on close. Either fix lands in Task 3.3 alongside the adapter wire-up.

- [ ] **Step 1: Write failing test** that proves the adapter sends `RuntimeTuning` to the backend:

File: `apps/web/src/layout/__tests__/chat_panel_adapter.test.tsx`

```tsx
test("loading a model passes RuntimeTuning to setActiveModel", async () => {
  const setActive = vi.fn().mockResolvedValue({ ok: true });
  vi.mocked(localLlmChatModule.setActiveModel).mockImplementation(setActive);
  // ... render adapter, open dialog, pick model, click Load
  expect(setActive).toHaveBeenCalledWith(
    "thread-1",
    "gemma-4-26b-a4b-instruct",
    "q4_k_m",
    expect.objectContaining({ n_gpu_layers: expect.any(Number), ctx_size: expect.any(Number) })
  );
});
```

- [ ] **Step 2: Run** — FAIL.

- [ ] **Step 3: Modify the adapter** — add dialog state, mount `<ModelLoadDialog>`, replace the header `ModelPicker` mount with a button that opens the dialog:

```tsx
const [loadDialogOpen, setLoadDialogOpen] = useState(false);

const handleLoadModel = useCallback(async (model: AvailableModel, tuning: RuntimeTuning) => {
  if (!activeId) return;
  try {
    await setActiveModel(activeId, model.family_id, model.variant_id, tuning);
    setLoadDialogOpen(false);
    toast.success(`Loading ${model.label}…`);
  } catch (err) {
    toast.error(`Failed to load: ${err instanceof Error ? err.message : String(err)}`);
  }
}, [activeId]);

// Pass to ChatSurface
<ChatSurface
  ...
  headerSlot={
    <button className={...} onClick={() => setLoadDialogOpen(true)}>
      <span>{currentModelLabel ?? "Select model"}</span>
      <ChevronIcon />
    </button>
  }
/>
<ModelLoadDialog
  open={loadDialogOpen}
  models={models}
  defaultTuning={lastTuning}
  onLoad={handleLoadModel}
  onClose={() => setLoadDialogOpen(false)}
/>
```

Persist `lastTuning` in `localStorage["local-llm:runtime-tuning"]` keyed by `family_id` (mirroring the current `runtime_panel.tsx` behavior so users don't re-set every load).

- [ ] **Step 4: Modify `ChatSurface`** to accept `headerSlot` instead of the embedded `ModelPicker`:

```tsx
interface ChatSurfaceProps {
  ...
  headerSlot?: React.ReactNode;  // replaces the deprecated `models`/`activeModelId`/`onSelectModel` triplet
  inspector?: React.ReactNode;   // replaces the embedded SamplerPanel
}
```

Mark `models`, `activeModelId`, `onSelectModel` as `@deprecated` for one release; remove in P6.

- [ ] **Step 5: Run** — PASS.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat(local-llm): mount ModelLoadDialog in chat header; pass RuntimeTuning to setActiveModel"
```

---

## Phase 4 — System Prompt UI + Streaming-Path Injection

Two bugs: (1) no UI to edit `system_prompt`. (2) The streaming path (`streamMessage()` → llama.cpp `/v1/chat/completions`) does not include the system prompt. Only the host-side `send_message` handler does — but that handler isn't on the live composer path.

### Task 4.1 — Inject system prompt in `streamMessage()`

**Files:**
- Modify: `apps/web/src/services/local_llm_chat.ts`
- Create: `apps/web/src/services/__tests__/local_llm_chat.test.ts`

- [ ] **Step 1: Write failing test**

```ts
test("streamMessage prepends system message when systemPrompt provided", async () => {
  const fetchSpy = vi.fn().mockResolvedValue({ body: makeMockSSEStream([]) });
  vi.stubGlobal("fetch", fetchSpy);
  await streamMessage({
    port: 9999,
    messages: [{ role: "user", content: "hi" }],
    systemPrompt: "Be terse.",
  });
  const sentBody = JSON.parse(fetchSpy.mock.calls[0][1].body);
  expect(sentBody.messages[0]).toEqual({ role: "system", content: "Be terse." });
  expect(sentBody.messages[1]).toEqual({ role: "user", content: "hi" });
});

test("streamMessage skips empty system prompt", async () => {
  // assert no system message prepended when systemPrompt is undefined or ""
});
```

- [ ] **Step 2: Run** — `pnpm vitest run apps/web/src/services`. Expected: FAIL.

- [ ] **Step 3: Modify `streamMessage`**

```ts
export interface StreamMessageOptions {
  port: number;
  messages: ChatMessage[];
  systemPrompt?: string;
  signal?: AbortSignal;
  onToken?: (delta: string) => void;
  onDone?: (stats: StreamStats) => void;
}

export async function streamMessage(opts: StreamMessageOptions): Promise<void> {
  const fullMessages = opts.systemPrompt?.trim()
    ? [{ role: "system", content: opts.systemPrompt }, ...opts.messages]
    : opts.messages;
  // ... pass `fullMessages` to fetch body
}
```

- [ ] **Step 4: Run** — PASS.

- [ ] **Step 5: Commit**

```bash
git commit -am "fix(local-llm): inject system prompt into streamed chat completions"
```

### Task 4.2 — Build `SystemPromptEditor`

**Files:**
- Create: `apps/web/src/layout/local_llm/system_prompt_editor.tsx`
- Create: `apps/web/src/layout/local_llm/system_prompt_editor.css.ts`

- [ ] **Step 1: Test contract**

```tsx
test("typing in textarea calls onChange with new value", () => {
  const onChange = vi.fn();
  render(<SystemPromptEditor value="" onChange={onChange} />);
  fireEvent.change(screen.getByRole("textbox", { name: /system prompt/i }), { target: { value: "Be terse." } });
  expect(onChange).toHaveBeenCalledWith("Be terse.");
});

test("shows token count", () => {
  render(<SystemPromptEditor value="hello world" onChange={vi.fn()} />);
  expect(screen.getByText(/~3 tokens/i)).toBeInTheDocument();  // rough char/4 estimate
});
```

- [ ] **Step 2: Run** — FAIL.

- [ ] **Step 3: Implement**

```tsx
interface Props {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

export function SystemPromptEditor({ value, onChange, placeholder }: Props) {
  const tokenEstimate = Math.ceil(value.length / 4);
  return (
    <div className={s.wrap}>
      <label className={s.label} htmlFor="system-prompt">System Prompt</label>
      <textarea
        id="system-prompt"
        className={s.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "You are a helpful assistant."}
        rows={4}
      />
      <div className={s.foot}>
        <span className={s.muted}>~{tokenEstimate} tokens</span>
        {value.length > 0 && (
          <button className={s.clear} onClick={() => onChange("")}>Clear</button>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run** — PASS.

- [ ] **Step 5: Wire into adapter** — add system_prompt to thread-scoped state, debounce 500ms, persist via `PUT /chat/threads/:id/generation_settings`. On `streamMessage` call, pass current system_prompt:

```tsx
const [systemPrompt, setSystemPrompt] = useState("");
const debouncedPersist = useDebounce(systemPrompt, 500);

useEffect(() => {
  if (!activeId) return;
  putGenerationSettings(activeId, { ...currentSettings, system_prompt: debouncedPersist }).catch(toast.error);
}, [debouncedPersist, activeId]);

// In send handler:
await streamMessage({ port, messages, systemPrompt, ... });
```

- [ ] **Step 6: Commit**

```bash
git commit -am "feat(local-llm): system-prompt editor with debounced persistence"
```

### Tasks 4.1 + 4.2 review follow-ups (logged 2026-05-07)

Code review on commits `89bc35f` + `2dc392c` + `107cd02` flagged two narrow races. The first was mitigated inline (sync-reset `generationSettings` to `DEFAULT_GENERATION_PARAMS` at the top of the thread-switch effect). The remaining items defer to a single follow-up sprint:

- **FU-ADAPTER-A — Stale-fetch overwrite of in-progress edit.** Race: thread mounts → `fetchGenerationSettings` fires → user types into the textarea before fetch resolves → fetch resolution unconditionally calls `setGenerationSettings_(params)` and clobbers the user's draft. Mitigation: track a `userEditedSinceFetchRef` (or capture a pre-fetch snapshot of `generationSettings` and skip the apply if state changed during the fetch). Test the typing-during-fetch case explicitly.

- **FU-ADAPTER-B — Hook extraction sprint.** Bundle `use_model_loading.ts` (originally deferred from Task 3.3) and a new `use_generation_settings.ts` together. Both share the same shape (controller + thread-keyed fetch + ref-guarded persist). The extraction should drop `chat_panel_adapter.tsx` from ~543 LOC to ~300 LOC. While extracting, also include a thread-id stamp on debounced writes so the persist effect refuses to write if `activeId` drifted between debounce-capture and timer-fire. Add tests for thread A→B→A switching during a pending debounce.

- **FU-ADAPTER-C — Token-counter precision (Minor).** `Math.ceil(value.length / 4)` heuristic drifts ~2× low for CJK and code-heavy prompts. Optional polish: load a real BPE counter (e.g., `gpt-tokenizer`) when prompt-length actually drives a cost/budget display.

---

## Phase 5 — Context-Window Tracking

`streamMessage().onDone(stats)` already provides `prompt_tokens` and `completion_tokens`. Need an accumulator hook + a `<ContextMeter>` primitive.

### Task 5.1 — `useTokenUsage` hook

**Files:**
- Create: `apps/web/src/layout/local_llm/use_token_usage.ts`
- Create: `apps/web/src/layout/local_llm/__tests__/use_token_usage.test.ts`

- [ ] **Step 1: Failing test**

```ts
test("accumulates prompt + completion tokens across stream events", () => {
  const { result } = renderHook(() => useTokenUsage("thread-1", 8192));
  act(() => result.current.record({ promptTokens: 500, completionTokens: 200, latencyMs: 1000 }));
  expect(result.current.tokensUsed).toBe(700);
  expect(result.current.contextUsedPct).toBeCloseTo(700 / 8192, 4);
  act(() => result.current.record({ promptTokens: 800, completionTokens: 300, latencyMs: 1500 }));
  expect(result.current.tokensUsed).toBe(1100);  // last prompt absorbs prior context; only the latest matters
});

test("reset clears state on thread switch", () => {
  const { result, rerender } = renderHook(({ id }) => useTokenUsage(id, 8192), {
    initialProps: { id: "thread-1" },
  });
  act(() => result.current.record({ promptTokens: 500, completionTokens: 200, latencyMs: 1000 }));
  rerender({ id: "thread-2" });
  expect(result.current.tokensUsed).toBe(0);
});
```

- [ ] **Step 2: Run** — FAIL.

- [ ] **Step 3: Implement** — note that for chat completions, the *running context* equals `last_prompt_tokens + last_completion_tokens`, not a sum across turns (the prompt re-includes prior turns):

```ts
export function useTokenUsage(threadId: string | null, maxContext: number) {
  const [state, setState] = useState({ tokensUsed: 0, lastTps: 0 });
  useEffect(() => { setState({ tokensUsed: 0, lastTps: 0 }); }, [threadId]);
  const record = useCallback((stats: { promptTokens?: number; completionTokens?: number; tokensPerSec?: number }) => {
    const used = (stats.promptTokens ?? 0) + (stats.completionTokens ?? 0);
    setState({ tokensUsed: used, lastTps: stats.tokensPerSec ?? 0 });
  }, []);
  return {
    tokensUsed: state.tokensUsed,
    lastTps: state.lastTps,
    contextUsedPct: maxContext > 0 ? state.tokensUsed / maxContext : 0,
    record,
  };
}
```

- [ ] **Step 4: Run** — PASS.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat(local-llm): useTokenUsage hook for per-thread context tracking"
```

### Task 5.2 — `ContextMeter` primitive

**Files:**
- Create: `apps/web/src/layout/local_llm/context_meter.tsx`
- Create: `apps/web/src/layout/local_llm/context_meter.css.ts`

- [ ] **Step 1: Test**

```tsx
test("renders percentage and warns at 80%", () => {
  render(<ContextMeter used={6554} max={8192} />);
  expect(screen.getByText(/80%/)).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveAttribute("data-tone", "warn");
});
```

- [ ] **Step 2: Run** — FAIL.

- [ ] **Step 3: Implement** — three tones: `ok` (<60%), `warn` (60–85%), `danger` (>85%). Use Spectral Graphite acid green / amber / error tokens.

- [ ] **Step 4: Run** — PASS.

- [ ] **Step 5: Wire `onDone(stats) → record(stats)` in adapter**, then pipe `useTokenUsage` into the inspector built next phase.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat(local-llm): ContextMeter with tonal thresholds (ok/warn/danger)"
```

### Tasks 5.1 + 5.2 review follow-ups (logged 2026-05-07)

Code review on commits `5e81744` + `2574d54` + `c93ecdf` flagged three items. The cheap ones (record-no-op guard, un-export `toneFor`, depend on `record` not whole `tokenUsage` object) were applied inline. The remaining items defer to Task 6.1 / Phase 7:

- **FU-METER-A — Plumb actual loaded `ctx_size` through `useModelLoadState` (Important).** Today `activeMaxContext` falls back to the model's theoretical `max_context` (e.g. 262144) when `lastTuningByFamily` is empty, even though the runtime may have been loaded with a much smaller `ctx_size` (e.g. 4096). The meter then reads "X / 262144 — 0%" while the runtime is 50% full. Defeats the entire warn-before-OOM goal on cold start. Fix: extend the lease/load-state DTO so the frontend can read the actually-bound `ctx_size`. Until plumbed, prefer rendering nothing (return null from the meter) over the wrong number. Task 6.1 should consume the lease's `ctx_size` directly.

- **FU-METER-B — Move meter to top of inspector (Minor).** Prototype mockup places the MODEL card with usage bars at the TOP of the inspector. Current implementation stacks `<SamplerPanel>` → `<SystemPromptEditor>` → `<ContextMeter>` (meter last). Task 6.1's full inspector redesign reorders to `MODEL/ContextMeter` → `PARAMETERS/SamplerPanel` → `SYSTEM PROMPT/SystemPromptEditor` per mockup.

- **FU-METER-C — ARIA severity hint (Minor).** `aria-valuenow` conveys raw percentage; the *meaning* (warn/danger) is only signaled visually. Add a visually-hidden severity word ("Warning"/"Critical") when `tone !== "ok"` so screen-reader users get the same urgency cue. Low priority; will surface in `audit:redesign`.

---

## Phase 6 — Inspector Redesign (Spectral-Graphite + Mockup Parity)

Replace the orphaned `<SamplerPanel>` with a richer inspector based on `ScreenExtensionLayout` from the prototype: MODEL card with load state + ctx + output bars, PARAMETERS stack, system-prompt editor.

### Task 6.1 — Build `InspectorPanel`

**Files:**
- Create: `apps/web/src/layout/local_llm/inspector_panel.tsx`
- Create: `apps/web/src/layout/local_llm/inspector_panel.css.ts`

- [ ] **Step 1: Test the structural contract**

```tsx
test("renders MODEL card, PARAMETERS stack, SYSTEM PROMPT editor", () => {
  render(<InspectorPanel
    modelLabel="claude-haiku-4-5" loadPhase="ready"
    contextUsedPct={0.23} outputBudgetPct={0.41}
    sampler={{ temperature: 0.42, top_p: 0.95, max_tokens: 1024 }}
    onSamplerChange={vi.fn()}
    systemPrompt=""
    onSystemPromptChange={vi.fn()}
  />);
  expect(screen.getByText(/^MODEL$/)).toBeInTheDocument();
  expect(screen.getByText(/^PARAMETERS$/)).toBeInTheDocument();
  expect(screen.getByLabelText(/system prompt/i)).toBeInTheDocument();
  expect(screen.getByText(/23%/)).toBeInTheDocument();  // ctx bar
});
```

- [ ] **Step 2: Run** — FAIL.

- [ ] **Step 3: Implement** — match the prototype's `ext-inspector` block (lines 760–800 of `screens.jsx`). Three sections separated by mono-numbered eyebrows (`01 / Model`, `02 / Parameters`, `03 / System prompt`). Use shared `Section`/`eyebrow-mini` style.

- [ ] **Step 4: Run** — PASS.

- [ ] **Step 5: Mount in adapter** — replace any direct `<SamplerPanel>` reference; pass `inspector={<InspectorPanel ... />}` into `ChatSurface`.

- [ ] **Step 6: Delete `apps/web/src/components/chat/sampler_panel.tsx`** (now unreferenced):

```bash
git rm apps/web/src/components/chat/sampler_panel.tsx
```

- [ ] **Step 7: Update `chat_surface.test.tsx`** — drop the sampler-panel cases, add cases for the new `inspector` slot.

- [ ] **Step 8: Commit**

```bash
git commit -am "feat(local-llm): inspector panel with MODEL card / params / system-prompt"
```

### Task 6.2 — Visual baseline

- [ ] **Step 1: Boot dev server**

```bash
pnpm --filter @nexus/web dev
```

- [ ] **Step 2: Use preview tool to verify** at `/deployments/<id>` with chat recipe — open the model dialog, load a model, watch the inspector populate, type into system-prompt textarea, send a message, confirm context bar moves.

- [ ] **Step 3: Capture screenshots** for the visual baseline:

```bash
pnpm --filter @nexus/web test:visual -- chat-deployment
```

- [ ] **Step 4: Commit baselines** if they look right.

---

## Phase 7 — Verification

- [ ] **Step 1: Type-check**

```bash
pnpm --filter @nexus/web typecheck
```

Expected: 0 errors.

- [ ] **Step 2: Vitest**

```bash
pnpm --filter @nexus/web test
```

Expected: all green.

- [ ] **Step 3: Cargo test**

```bash
cargo test -p local-llm-extension
cargo test -p nexus-api
```

Expected: all green.

- [ ] **Step 4: Boundary audit**

```bash
grep -rn "local-llm\|local_llm" apps/web/src/components/chat/
grep -rn "local-llm\|local_llm" apps/web/src/components/layout/  # should be empty after deletions
```

Expected: zero matches in `apps/web/src/components/chat/`. Whatever remains in `apps/web/src/components/layout/` must be in the explicit deletion list.

- [ ] **Step 5: EmotionTTS regression**

```bash
pnpm --filter @nexus/web test extensions/builtin/emotion-tts/
```

Expected: green — confirms we didn't break the other extension's chat surface usage (if any) by changing `ChatSurfaceProps`.

- [ ] **Step 6: Browser smoke** — restart host, open a deployment with chat recipe, confirm:
  - No 503s in the host log on first request
  - Model dialog opens, lists installed GGUFs, KV-quant disabled until flash_attn flipped
  - Loading a model triggers the load-state spinner; inspector MODEL card populates
  - Typing system prompt → message stream picks it up (ask "what are you" — the model should reflect the prompt)
  - Context bar updates after each turn
  - Load-time options round-trip via localStorage between sessions

- [ ] **Step 7: Final commit + PR**

```bash
git push -u origin claude/busy-leavitt-af604a
gh pr create --title "feat(local-llm): rich model loader + system prompt + context tracking + 503 fix" \
  --body "$(cat <<'EOF'
## Summary
- Fix the 503 storm at `/api/v1/extensions/nexus.local-llm/*` (root-caused to `LocalLlmRouterProvider::build_router()` failing at cold start)
- Replace orphan model-picker overlay with a deployment-scoped `ModelLoadDialog` mounted in the chat header
- Extend `RuntimeTuning` with mmap, mlock, n_batch, n_ubatch, n_parallel, cont_batching, seed
- Add system-prompt editor + inject prompt into streaming `chat/completions`
- Add per-thread token-usage accumulator + ContextMeter
- Right-inspector redesign matching the LM-Studio + Spectral Graphite mockup

## Test plan
- [ ] cargo test -p local-llm-extension
- [ ] cargo test -p nexus-api
- [ ] pnpm --filter @nexus/web typecheck
- [ ] pnpm --filter @nexus/web test
- [ ] manual smoke: load Gemma 4 26B with q8_0 KV / flash-attn / 26 GPU layers, send 5 turns, watch context bar move
EOF
)"
```

---

## Self-Review

**1. Spec coverage:**
- 503 errors → Phase 1 (Tasks 1.1, 1.2)
- Model selection from chat recipe → Phase 3 (Task 3.3 wires dialog into adapter)
- Model customization (KV cache quant, flash attn, GPU offload, ctx) → Phase 2 (struct extension) + Task 3.2 (form)
- System prompt → Phase 4 (Tasks 4.1, 4.2)
- Context-window tracking → Phase 5 (Tasks 5.1, 5.2)
- Frontend redesign per LM-Studio mockup → Phase 6 (Task 6.1)
- All seven mockup-driven concerns covered. No gaps.

**2. Placeholder scan:** No "TBD"/"implement later"/"add appropriate". Each task has runnable test + concrete code. Phase 1 has three branched fixes — that's not a placeholder, it's a decision tree keyed on the actual reproduction reason.

**3. Type consistency:** `RuntimeTuning` field names (snake_case) used identically in `handlers.rs`, `local_llm_chat.ts`, `runtime_tuning_form.tsx`, `model_load_dialog.tsx`. `setActiveModel(threadId, familyId, variantId, runtime?)` signature consistent across adapter + service tests. `StreamStats { promptTokens, completionTokens, tokensPerSec, latencyMs }` consistent with `useTokenUsage` consumer.

**4. Boundary discipline:** Plan adds zero `local-llm` literals to `apps/web/src/components/chat/`. New extension-specific UI lives under new folder `apps/web/src/layout/local_llm/`. Two orphan files in `apps/web/src/components/layout/` are explicitly deleted, not extended.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-06-local-chat-recipe-enhancements.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best fit since this plan has 7 phases with TDD cycles.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
