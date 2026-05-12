# nexus-dnn Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-05-08

## Active Technologies
- SQLite via `nexus-storage`. One new migration `012_extensions_primary_refs.sql` adds two additive nullable columns — `extensions.primary_recipe_id` (TEXT) and `extensions.default_workflow_id` (TEXT) — plus non-durable mirroring of the manifest-icon contract on extension upsert (icon stored inside the registry record, not a new column; see data-model.md). No other schema changes. (main)
- Rust 1.84 (workspace MSRV) + TypeScript 5.x / React 19 / @xyflow/react / SWR / sonner / vanilla-extract (020-backends-and-models-polish)
- Rust 1.84 (workspace MSRV per existing crates) (018-deployments)
- TypeScript 5.7, React 19.0, Node ≥ 20 (for Vite 6 and Playwright) + `react@^19`, `react-dom@^19`, `react-router@^7.14` (unified v7 package — source imports switch FROM `react-router-dom` TO `react-router`; the `-dom` NPM dep stays one release as a compat alias), `@vanilla-extract/css@^1.17`, `swr@^2.4` (live-polling surfaces only), `@xyflow/react@^12` (workflow canvas), `sonner@^2`. **New**: `motion@^12` (formerly Framer Motion — import path `motion/react`; use `LazyMotion + m` for bundle discipline). (main)
- N/A (frontend-only refactor; no DB, no sqlx). `sessionStorage` for draft envelopes (unchanged). The Rust host is untouched. (main)
- Rust 1.84 (workspace MSRV, per existing crates). (main)
- SQLite via `nexus-storage`; migrations `001`..`005` reused unchanged (frozen contract per spec Assumptions). No new migrations in v1. (main)
- Rust 1.84 (workspace MSRV per existing crates); TypeScript 5.x / React 19 / Node ≥ 20 on the frontend. (025-models-search-refactor)
- SQLite via `nexus-storage`. One new additive migration — `013_model_store_download_jobs.sql` — creating a `download_jobs` table (job-level state + per-artifact-target rows); no changes to existing tables. The capability registry is **in-memory only** (built from compiled-in backend adapter list) — no migration. (025-models-search-refactor)
- Rust 1.84 (workspace MSRV) for host crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend. + Host — `axum`, `tower-http` (for `ServeDir`-style static serving), `serde`, `nexus-extension`, `nexus-api`. Frontend — `react-router@^7.14` (data mode), `@vanilla-extract/css`, `motion/react` (already in `apps/web`), `zod@^3` (props-schema validation on the client — **new**; justified under Principle I as the only spec-driven JSON Schema subset with an actively maintained TS-first API). (027-extension-ui-playground)
- No migrations. Manifest schema changes are additive (new optional fields on `UiDeclaration`). Catalog and registration state live in memory, derived at extension-load time. `sessionStorage` for playground draft state (last-selected component + prop values). (027-extension-ui-playground)
- SQLite via `nexus-storage`. One new migration `013_extraction_metadata.sql` adds nullable columns to the existing `installed_artifacts` table — `layer_count INT`, `max_context INT`, `architecture TEXT`, `hidden_size INT`, `format TEXT`, `extraction_status TEXT`. **No new host tables.** Per-model runtime settings live in **extension-local storage** (LLM extension owns its own SQLite file or `nexus-extension` primitives); host does not inspect the blob. (028-gguf-layer-metadata)
- Rust 1.84 (workspace MSRV) for the new extension subproject; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend edits. (029-chat-history-persistence)
- Rust 1.84 (workspace MSRV). No TypeScript changes required — the frontend was written against `/api/v1/extensions/nexus.local-llm/*` in spec 029 already; this spec makes those URLs reachable. (030-extension-router-mount)
- No new tables, no new migrations. Migration 008 from spec 029 remains the latest. The legacy `ext_local_llm_chat_*` tables survive unchanged — the migrated handlers in CP2 write to the same tables via sqlx inside the extension subproject. (030-extension-router-mount)
- 036-audio-editing: EmotionTTS audio editing — worker `audio_edit/` subpackage (`pipeline.py`/`ops.py`/`codecs.py`/`digest.py`/`validation.py`) on the existing `ffmpeg-python` + `soundfile` + `pyloudnorm` + `numpy` deps (no new packages); 3 SQL migrations (015 voice-asset edit chain, 016 utterance edit chain, 017 `ext_emotion_tts__audio_edit_log`); Rust `router/{audio_edit,utterance_edit,audit}.rs` mounting 5 routes under the generic dispatcher; frontend `audio_edit_panel` + `waveform_canvas` + `edit_chain_list` + `audit_history_panel` + `per_utterance_edit` (Web Audio API + Canvas, Spectral-Graphite tokens, Playwright precision tests). Cache-key invalidation via `ChainDigest` (SHA-256 over canonical chain JSON). (036-audio-editing)
- TypeScript 5.x + React 19 + Node ≥ 20 (frontend); Rust 1.84 workspace MSRV (host crates for the new draft suggestion handler). (037-spectral-graphite-redesign)
- Browser `localStorage` for tweak settings (`nexus.tweaks.accent`, `nexus.tweaks.density`, `nexus.tweaks.card`). No host SQLite migrations introduced by this feature. No IndexedDB. No service worker. (037-spectral-graphite-redesign)
- Rust 1.84 (workspace MSRV) for host + extension Rust crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend. + existing — `axum`, `serde`, `sqlx`, `tracing` on the Rust side; `react-router@^7.14`, `swr@^2.4`, `@vanilla-extract/css`, `motion/react`, `sonner` on the frontend. The `gguf` reader path inside `crates/nexus-model-metadata/` already handles header parsing for spec 028 metadata; this spec adds two GGUF metadata key reads (`*.expert_count`, `*.expert_used_count` and architecture-name MoE detection). **No new workspace dependencies.** (039-llamacpp-throughput-tier1)
- SQLite via `nexus-storage`. ONE new host migration `021_installed_artifact_moe_metadata.sql` adds two nullable columns to the existing host-owned `model_store_installed_artifacts` table — `is_moe INTEGER` and `expert_layer_count INTEGER`. The local-llm extension's own `extensions/builtin/local-llm/storage/migrations/` series is NOT touched (latest there remains 008; spec 029 territory). (039-llamacpp-throughput-tier1)
- Rust 1.84 (workspace MSRV) for host crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend. + NEW — `tauri@^2` + `@tauri-apps/api@^2` (desktop wrapper), `idb@^8` (IndexedDB warm tier for event store). EXISTING — `axum`, `serde`, `sqlx`, `tracing` on the Rust side; `react-router@^7`, `swr@^2.4` (live polling only), `@vanilla-extract/css@^1.17`, `motion@^12` (`motion/react` import path), `sonner@^2`, `@xyflow/react@^12`. No other new workspace dependencies. (042-neo-terminal-shell)
- SQLite via `nexus-storage` for the cold tier (existing — no new tables, no new migrations). Browser `IndexedDB` for the warm tier (per-run event windows). In-memory ring buffers for the hot tier (last ~2,000 items per active run). (042-neo-terminal-shell)

## Project Structure

```text
src/
tests/
```

## Commands

cargo test; cargo clippy

## Code Style

Rust 1.84 (workspace MSRV per existing crates): Follow standard conventions

<!-- SPECKIT START -->
**Active spec**: [044-tui-streaming-console](specs/044-tui-streaming-console/plan.md)
<!-- SPECKIT END -->

## Recent Changes
- 044-tui-streaming-console: Added new Rust binary crate `crates/nexus-tui` (CLI streaming console for host events). New workspace deps: `reedline ^0.36`, `crossterm ^0.28`, `eventsource-stream ^0.2`, `rustc-hash ^2`. Host-side additions: `NexusEvent::HostLog` variant, `nexus-core::tracing_bridge` module, `GET /api/v1/events/sse` SSE adapter, `POST /api/v1/desktop/focus` route. No new tables; two host-config entries for ring-buffer capacity and tracing-bridge sensitive-name allowlist.
- 042-neo-terminal-shell: Added Rust 1.84 (workspace MSRV) for host crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend. + NEW — `tauri@^2` + `@tauri-apps/api@^2` (desktop wrapper), `idb@^8` (IndexedDB warm tier for event store). EXISTING — `axum`, `serde`, `sqlx`, `tracing` on the Rust side; `react-router@^7`, `swr@^2.4` (live polling only), `@vanilla-extract/css@^1.17`, `motion@^12` (`motion/react` import path), `sonner@^2`, `@xyflow/react@^12`. No other new workspace dependencies.
- 039-llamacpp-throughput-tier1: Added Rust 1.84 (workspace MSRV) for host + extension Rust crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend. + existing — `axum`, `serde`, `sqlx`, `tracing` on the Rust side; `react-router@^7.14`, `swr@^2.4`, `@vanilla-extract/css`, `motion/react`, `sonner` on the frontend. The `gguf` reader path inside `crates/nexus-model-metadata/` already handles header parsing for spec 028 metadata; this spec adds two GGUF metadata key reads (`*.expert_count`, `*.expert_used_count` and architecture-name MoE detection). **No new workspace dependencies.**
- 037-spectral-graphite-redesign: Added TypeScript 5.x + React 19 + Node ≥ 20 (frontend); Rust 1.84 workspace MSRV (host crates for the new draft suggestion handler).


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- For cross-module "how does X relate to Y" questions, prefer `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep — these traverse the graph's EXTRACTED + INFERRED edges instead of scanning files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
