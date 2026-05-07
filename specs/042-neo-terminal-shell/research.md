# Phase 0 Research: Neo-Terminal Desktop Shell

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-05-08

This document resolves the unknowns flagged during plan generation. Each entry follows the Decision / Rationale / Alternatives format.

---

## R1 — Tauri 2.x as the desktop wrapper

**Decision**: Tauri 2.x with the `tray-icon` feature; embed `nexus-api` directly in-process; bind axum on `127.0.0.1:0` and read the chosen port back into the frontend.

**Rationale**:

- Tauri 2.x has stable system-tray, custom-titlebar, and typed-channel IPC support in the current release line. Workspace layout works with our existing root `Cargo.toml` if the sub-crate sits at `apps/web/src-tauri/` and we run `pnpm tauri dev` from `apps/web/` (not from workspace root).
- **Embedding the host in-process eliminates the duplicate-spawn / single-leader problem** that motivates spec 040's Service Worker broker. One process, one window, no leader election. This is the most consequential side-effect of choosing a desktop wrapper: spec 040's stated motivation evaporates for the desktop build path. Spec 040 remains relevant for the headless browser dev path; the desktop path bypasses it entirely.
- Channel-based streaming (`tauri::ipc::Channel<T>`) skips the JSON-string round-trip the global event bus uses; the official guidance is explicit that the event bus is not designed for high-throughput streams. Our 1,000 RunEvents/sec target requires Channel.

**Alternatives considered**:

- *Electron* — heavier, worse Rust integration, no in-process host embedding. Rejected.
- *Stay browser-only and ship spec 040* — preserves the current dev workflow but does not deliver the system-tray-resident host (US1) or the custom prompt-style titlebar (FR-002). Spec 040 alone cannot satisfy the spec.
- *Wry directly without Tauri* — drops the system-tray + bundler conveniences; not worth the savings.

**Concrete patterns adopted** (from research):

- `tauri.conf.json`: `decorations: false`, `titleBarStyle: "Overlay"` (macOS hybrid — keeps traffic-light geometry + rounded corners), `transparent: true`, `hiddenTitle: true`. Capabilities file must include `core:window:default` and `core:window:allow-start-dragging`.
- Custom titlebar uses `data-tauri-drag-region` on every passive child (the attribute does NOT inherit; flex parents alone won't drag).
- System tray wired in `setup()` with `AppHandle`. Window close: two-arg `on_window_event(|window, event|)` calling `window.hide()` + `api.prevent_close()`. macOS additionally needs `RunEvent::ExitRequested → api.prevent_exit()` to keep the process alive after dock-quit.
- Streaming IPC: `Channel<Vec<RunEvent>>` (typed batch) — Rust producer coalesces into 50ms windows before sending to avoid pinning the JS GC.

**Cite**: [Window Customization](https://v2.tauri.app/learn/window-customization/), [System Tray](https://v2.tauri.app/learn/system-tray/), [Calling the Frontend](https://v2.tauri.app/develop/calling-frontend/), [Calling Rust](https://v2.tauri.app/develop/calling-rust/).

**Known gotchas to track in tasks**:

- Live Windows bug ([tauri-apps/tauri#9504](https://github.com/tauri-apps/tauri/issues/9504)): close-handler scope loss after `restore-from-tray → minimize → close`. Tasks must include this exact flow in the Playwright matrix.
- `data-tauri-drag-region` swallows clicks if applied to buttons/inputs. The titlebar component's typing must enforce that buttons do NOT carry the attribute.
- Tauri CLI must run from `apps/web/` (issue [#2643](https://github.com/tauri-apps/tauri/issues/2643)); document this in quickstart.md.

---

## R2 — Headless dev mode (browser + desktop dual-target)

**Decision**: Single transport module at `apps/web/src/services/ipc_adapter.ts` that branches on `window.isTauri` runtime check. Both branches expose the same typed surface; consumers never see the conditional.

**Rationale**:

- `window.isTauri` (added in 2.0.0-beta.9) is the documented runtime detection. Avoids `window.__TAURI_INTERNALS__` timing window bugs ([#12694](https://github.com/tauri-apps/tauri/issues/12694)) where the global is briefly undefined on first paint.
- The browser fallback uses our existing `axum` HTTP + SSE surfaces (already shipped via spec 037 T084's SSE infrastructure). No new browser-side transport needed; the desktop path picks up Channel + invoke when present.
- Keeps the current dev workflow alive — `pnpm dev` opens a Vite browser tab that talks to a headless host on port 3000, exactly as today.

**Alternatives considered**:

- *Build-time strip via `import.meta.env.TAURI_PLATFORM`* — drops the unused branch from the bundle but breaks dev-time hot-swap between browser and desktop. Use only as an opt-in production optimization later.
- *Sprinkled `if (isTauri)` checks across components* — violates Principle XII.4 (single I/O boundary). Rejected.

**Concrete pattern**:

```ts
const isTauri = typeof window !== "undefined" && (window as any).isTauri === true;
export const rpc = isTauri
  ? await import("./tauri_transport")    // invoke() + Channel<Vec<RunEvent>>
  : await import("./http_transport");    // fetch() + EventSource
```

The check happens once at module load, inside an effect or after `DOMContentLoaded`, never at top-level (timing bug).

---

## R3 — IndexedDB warm-tier library

**Decision**: `idb` (Jake Archibald's wrapper) at `^8`.

**Rationale**:

- ~7 KB gzipped, thin Promise wrapper around the native IndexedDB API. Schema is owned in code, not declared in a DSL — fits our typed `RunEventItem` shape.
- The warm tier is a typed key-value store keyed by `(run_id, seq)` with one secondary index by `(run_id, ts)`. We do not need ORM-style query semantics, hooks, or versioned migrations beyond what the native API offers.
- Already battle-tested across PWA tooling; small enough to vendor if needed.

**Alternatives considered**:

- *Dexie* — ~50 KB gzipped, full ORM. Overkill for this use case; pulls in query DSL we will not use.
- *Hand-rolled* — Principle I (Ecosystem-First) blocks this; `idb` is the canonical choice.

---

## R4 — llama.cpp stderr scraper approach

**Decision**: Tokenize-then-classify parser inside `crates/nexus-backend-runtimes/src/llamacpp/scraper_patterns.rs`. Match `\w+:` family prefix first, route body to per-function-prefix sub-parser. Treat per-tensor allocation events as **synthesized** (not directly observed). Stage Lattice cell state transitions to the *real phase boundaries* in llama.cpp's output, not to a fictional per-tensor stream.

**Rationale (with material spec adjustment)**:

The research surfaced a load-bearing reality check: **llama.cpp does not emit a per-tensor allocation stream during GPU upload**. The closest thing is a metadata-time histogram (`llama_model_loader: - tensor split N: blk.23.attn_q.weight ...`) gated behind `LLAMA_LOG_LEVEL=info` verbosity; per-buffer summaries arrive aggregated by device + kind; KV-cache reports a single aggregate line with separate K and V dtypes + sizes. The actual GPU memory copy is silent.

Implication for the Lattice: a smooth cell-by-cell sweep cursor over a 5-second load is theatrical. The honest visualization stages cell state across the **real** phase transitions:

| Cell state | Trigger event |
|---|---|
| `pending` | Initial — before metadata parse begins |
| `discovered` | The histogram line for that tensor's `blk.N.<group>` arrives — metadata (shape, dtype, bytes) known |
| `assigned` | The offload-plan line arrives — placement (GPU/CPU/MoE-CPU) known per layer |
| `reserved` | The per-buffer summary line arrives for the device hosting this tensor — bytes counted |
| `ready` | KV-cache init complete + context build complete — model is loadable |
| `error` | The relevant error trio (CUDA OOM, gallocr reserve fail, compute buffer fail within 2s window) fires |
| `cpu-offloaded` | Offload-plan line places this layer on CPU (spec 039 `--n-cpu-moe`) |

The "sweep cursor" is reframed as **the singleton phosphor block cursor (US4)** which sits at the most-recently-updated cell. It moves bursty during phase transitions (cells flip in batches as each phase fires), not smoothly during silent kernel work. This is honest and still aesthetically coherent: the cursor's pulse rate continues to encode system load, and its position encodes "where the loader's attention most recently was."

**Spec impact**: FR-032 ("A sweep cursor MUST mark the loader's current head; cells immediately after a load completion MUST exhibit a brief persistence-fade trail") is preserved in spirit; the cursor is the singleton from US4. We will note this clarification in the spec's Test strategy section before `/speckit.tasks`.

**Concrete scraper design**:

- **First-pass tokenizer**: regex `^(?P<func>\w+):\s+(?P<body>.*)$`. Capture `func` family.
- **Phase classifier**: when `func` transitions through `llama_model_loader → llm_load_print_meta → llm_load_tensors → llama_kv_cache → llama_context`, emit `kind: "phase"` events with names `discover`, `print_meta`, `tensors`, `kv_reserve`, `context_build`. The `ready` phase is synthesized when stream goes quiet AND first inference token arrives (or `/health` flips to `ok`).
- **Layer count required**: cache `n_layer` from the `\w+:\s+n_layer\s*=\s*\d+` line. Emit `kind: "gap"` with `reason: "n_layer_missing"` if absent — Lattice cannot render without this.
- **Histogram → tensor.allocate synthesis**: for each `llama_model_loader: - tensor split N: blk.X.<group>` line, emit one `tensor.allocate { layer: X, group: <group>, bytes }` event. When the histogram is verbosity-gated off, emit `kind: "gap"` with `reason: "tensor_histogram_missing"` and fall back to layer-count × per-layer estimated bytes.
- **Buffer summary → metric**: for `\w+:\s+(?P<device>\S+)\s+(?P<kind>model|KV|compute|output)\s+buffer size\s*=\s*[0-9.]+\s+MiB`, emit `metric { name: "buffer.bytes", labels: { device, kind }, value: mib * 1048576 }`. Device label treated as opaque + known-prefix table for normalization (CUDA0 / CPU / Metal / SYCL0 / RPC[host:port] / ROCm).
- **KV-cache aggregate → metric + dtype telemetry**: parse `llama_kv_cache: size = ... K (f16): ... V (f16): ...` and emit two `metric` events with labels `{ kind: "kv", device, k_dtype, v_dtype }` and the K and V byte values separately. Spec 039's Force-FP16-KV button reads this dtype telemetry.
- **Multi-line errors**: VRAM OOM emits a trio of lines (`cudaMalloc failed`, `ggml_gallocr_reserve_n: failed to allocate <device> buffer of size <bytes>`, `failed to allocate compute buffers`) within a 2-second sliding window. Aggregate into one `kind: "error", reason: "vram_oom", device, bytes` event.
- **Format drift**: any line whose `func:` matches the family prefix but whose body fails all per-`func` regexes emits `kind: "scraper_unknown" { line }`. Surfaces drift to telemetry without crashing.
- **Always invoke `llama-server` with `--log-verbosity 1`** (or env `LLAMA_LOG_LEVEL=info`) — the verbose level surfaces the per-tensor histogram and per-layer KV debug lines. This is a startup-flag change in `crates/nexus-backend-runtimes/src/llamacpp/spawn.rs`; document in tasks.

**Alternatives considered**:

- *Patch upstream llama.cpp to add structured event output* — out of scope for this spec; would couple us to upstream review timelines. Stage 2 future spec.
- *Skip metadata phase and only render post-load state* — loses the load-time narrative the Lattice exists to provide. Rejected.
- *Use the `--log-format json` flag* — llama-server supports JSON-formatted logs but the JSON shape is not stable across versions and does not include the per-tensor histogram. Verbose stderr scraping is more durable.

**Cite**: `src/llama-model.cpp::print_info`, `src/llama-model-loader.cpp`, `src/llama-context.cpp`, `src/llama-kv-cache.cpp`, `ggml/src/ggml-cuda/ggml-cuda.cu` in [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp).

**Known instabilities to track**:

- Function-name prefixes have changed across llama.cpp versions (`llm_load_tensors:` ↔ `load_tensors:`, `llama_load_model_from_file:` ↔ `llama_model_load_from_file:`). Match `\w+:` family, never literals.
- ROCm builds emit `hipMalloc failed` and `ROCm` device prefix instead of `cudaMalloc failed` and `CUDA0`. Same shape, different labels — known-prefix table absorbs.
- Aggregate KV `layers` count may be less than `n_layer` for hybrid Mamba models (some layers don't have KV cache). Use the explicit `layers` field, do not derive.
- The 2-second OOM trio window is a heuristic; flush periodically and emit even on partial trios (as `error` with `reason: "alloc_failure_partial"`).

---

## R5 — Mono font face for the Bloomberg-dense layer

**Decision**: **JetBrains Mono** at v2.304+ as the default. Berkeley Mono is documented as an opt-in upgrade path for installations where the license is acquired locally (no project-wide license purchase). Commit Mono is documented as a free alternative for installations that want a more modern shape.

**Rationale**:

- JetBrains Mono — Apache-2.0, broad Unicode coverage (covers all our log content + GGUF tensor names), ligatures available (toggleable), already familiar to developer-operators as the JetBrains IDE default.
- Existing Spectral Graphite typography pairing already supports an arbitrary mono face; swapping to JetBrains Mono is a one-line `@font-face` addition + a `terminal.css.ts` token change.
- Berkeley Mono (paid, $75/$200 per-user) is genuinely warmer and more distinctive but adds a license burden inconsistent with our open-source posture. Document the swap recipe so individual users can opt in locally.

**Alternatives considered**:

- *Monaspace* (GitHub's variable mono family) — interesting variable-axis design but heavy as a default; pull in only if a specific Lattice use case needs it.
- *iA Writer Mono* — designed for prose, not dense ops surfaces.

---

## R6 — Block primitive precedents

**Decision**: Build the Block primitive as our own composition; do not adopt an external library. Architecture is informed by Warp's command-block model + Posting's request-as-block + Notion's block addressing semantics.

**Rationale**:

- No existing component library ships a "streaming-ops Block" with the exact contract we need (prompt-style header + collapse-with-sparkline + 4-char mnemonic + share-as-link + split-pane). Adopting an external Block library (Notion-clone editors etc.) drags in unrelated content-block semantics.
- The Block contract is small (≤200 LOC for the primitive itself) — well under the threshold where ecosystem adoption pays for itself.
- Warp is closed-source so we cannot copy implementation; we copy the *atomicity discipline* (every command is a Block, collapsible, share-as-link).

**Alternatives considered**:

- *Notion-style block editor packages (BlockNote, EditorJS)* — content-editable focus, wrong domain.
- *Charm-style Bubble equivalents in JS* — TUI-coded, drags in retro aesthetic that conflicts with Modern neo-terminal.

---

## R7 — Bret Victor Ladder of Abstraction implementation

**Decision**: Hand-build the Ladder Slider as a 4-detent vertical control with `motion/react` spring transition. Each rung is a separate component reading the same RunEvent store via a shared hook (`use_run_events(runId, projection)`), filtered/aggregated differently per rung. No external "ladder" library.

**Rationale**:

- Bret Victor's "Up and Down the Ladder of Abstraction" essay (worrydream.com, 2011) is the conceptual source; no canonical implementation exists. Closest precedent is Vega-Lite's compositional pipeline (which targets data viz, not ops streams).
- The Ladder is structurally simple: 4 rungs × 1 shared event store × 1 keyboard handler. Building it is cheaper than wrapping anything.
- The four rungs (Bytes / Tensors / Phases / Story) need bespoke render logic per rung anyway — there's no abstraction-library shortcut.

**Alternatives considered**:

- *Observable notebooks as inline render* — interesting but adds a Notebook runtime dependency for one widget.

---

## R8 — Sweep cursor reframing (consequence of R4)

**Decision**: Drop the dedicated "sweep cursor" component. Reuse the singleton US4 phosphor block cursor as the loader's attention marker. Position updates on each new `tensor.allocate` / `phase` / `metric` event for the active load. Persistence-fade trail (FR-032) becomes a per-cell post-transition glow that fades over 600ms after a cell settles to a new state.

**Rationale**:

- US4 already mandates a single block cursor across the entire app. Inventing a *second* sweep marker just for the Lattice would violate that contract.
- The cursor's position naturally follows where state is changing — exactly the semantic of "the loader's current head."
- Persistence trails on cells are independent of the cursor; they fire on each cell's state transition as a brief inset-glow boost, then settle.

**Spec impact**: FR-032 wording is preserved; the implementation maps "sweep cursor" to the US4 cursor primitive rather than a bespoke marker. Document in tasks.md when implementing US2 + US4.

---

## Summary of decisions

| ID | Topic | Decision |
|---|---|---|
| R1 | Desktop wrapper | Tauri 2.x with `tray-icon`; embed nexus-api in-process; bind axum on `127.0.0.1:0` |
| R2 | Dev mode | Single `services/ipc_adapter.ts` branching on `window.isTauri` |
| R3 | IndexedDB lib | `idb` v8 |
| R4 | llama.cpp scraper | Tokenize-then-classify; phase-staged Lattice fill; synthesize per-tensor events from histogram + offload plan; multi-line OOM aggregation |
| R5 | Mono face | JetBrains Mono default; Berkeley Mono opt-in; Commit Mono alt |
| R6 | Block primitive | Hand-build (Warp/Posting-informed) |
| R7 | Ladder Slider | Hand-build; 4 rungs share one event-store hook |
| R8 | Sweep cursor | Reuse US4 singleton phosphor cursor; per-cell persistence trail unchanged |

## Open follow-ups for `/speckit.clarify`

- Berkeley Mono license decision — defer; not blocking.
- Spec 040 status under desktop reframe — recommend marking 040 as "browser-dev path only" in its scope; no longer needed for desktop production. Coordinate with whoever is actively working spec 040.
- Linux system-tray fallback policy — Tauri abstracts but desktop-environment variance is real (KDE Plasma vs GNOME Shell vs Sway/Wayland-no-tray). Document degraded behavior tiers.
