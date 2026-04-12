# Implementation Plan: Top Bar Redesign with Live Metrics

**Branch**: `feature/003-design-system-ui` | **Date**: 2026-04-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/003-frontend-rework/spec.md` (US-8) + reference screenshot

## Summary

Redesign the top bar from a minimal command-palette layout to the Spectral Graphite reference: Space Grotesk brand name, view mode tabs (Recipe/Stage/Graph/Trace/Timeline) inline, live runtime metric chips (VRAM, Latency, Load) with color-coded thresholds, and violet RUN/outline VALIDATE action buttons. Requires a new `GET /api/v1/metrics` Rust endpoint and a ServiceWorker-based polling mechanism on the frontend per Constitution Principle X (Modern React Patterns).

## Technical Context

**Language/Version**: Rust 1.85+ (host), TypeScript 5.7 (frontend)
**Primary Dependencies**: axum 0.8 (API), React 19 (UI), vanilla-extract (styling)
**Storage**: SQLite (run/artifact counts), in-memory (worker state, uptime)
**Testing**: `cargo test`, `cargo clippy`, `npx tsc --noEmit`, `npx vite build`
**Target Platform**: Desktop browser (1280px+ viewport), localhost:3000
**Project Type**: Full-stack (Rust host + React SPA)
**Performance Goals**: Metrics endpoint <10ms p95, polling every 5s
**Constraints**: ServiceWorker for polling (Constitution X), no manual memoization (React Compiler)
**Scale/Scope**: Single endpoint, 3 frontend files, 1 ServiceWorker

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Ecosystem-First | PASS | axum, React 19, vanilla-extract — all ecosystem tools |
| II. Pure Functions & SOLID | PASS | Metrics handler is a pure data aggregation function |
| III. Extendability | PASS | Metrics response is a typed struct, extensible via new fields |
| IV. Self-Documenting Code | PASS | No inline comments planned |
| V. Git-Flow | PASS | Working on feature branch |
| VI. Living Documentation | PASS | README unaffected by this change |
| VII. Clean Provenance | PASS | No generative artifacts |
| VIII. Memory Safety | PASS | No unsafe code needed |
| IX. Parallelism-First | PASS | Metrics gathering uses concurrent queries |
| X. Modern React Patterns | PASS | ServiceWorker polling, no manual memoization, useEffectEvent for SW message handler |

## Project Structure

### Documentation (this feature)

```text
specs/003-frontend-rework/
├── spec.md              # Full frontend rework spec (US-1 through US-10)
├── plan.md              # This file (top bar + metrics focus)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── metrics-api.md   # GET /metrics contract
└── reference/           # Screenshot references
```

### Source Code (repository root)

```text
crates/nexus-api/src/
├── handlers/
│   ├── mod.rs           # MODIFY: add metrics module
│   └── metrics.rs       # CREATE: metrics handler
└── router.rs            # MODIFY: register /metrics route

apps/web/
├── public/
│   └── metrics-worker.js  # CREATE: ServiceWorker for polling
├── index.html              # MODIFY: register ServiceWorker
└── src/
    ├── api/
    │   └── client.ts       # MODIFY: add Metrics type + fetchMetrics
    ├── hooks/
    │   └── use_metrics.ts  # CREATE: ServiceWorker message hook
    ├── layout/
    │   ├── top_bar.tsx     # REWRITE: new layout with tabs + chips
    │   └── top_bar.css.ts  # REWRITE: spectral styling
    ├── App.tsx             # MODIFY: wire metrics + move view tabs
    └── app.css.ts          # MODIFY: remove canvas tab bar
```

**Structure Decision**: Full-stack change — Rust handler exposes metrics, ServiceWorker polls it, React top bar consumes via postMessage.
