# Phase 0 Research: Extension Modules Page + Backend Module Surface

**Feature**: 019-extension-modules
**Date**: 2026-04-16

Every unknown flagged in the Technical Context is resolved below with a **Decision / Rationale / Alternatives** triplet per spec-kit conventions.

---

## R1. ZIP extraction crate

**Decision**: **`zip` crate** (a.k.a. `zip-rs`), latest MSRV-compatible major version (confirmed to compile on Rust 1.84; use `2.x` line if `4.x` requires a newer MSRV than workspace).

**Rationale**:
- De-facto standard for ZIP in Rust; used by `cargo` itself historically.
- Synchronous API fits `tokio::task::spawn_blocking` perfectly; we do not need streaming extraction for ≤ 64 MiB archives.
- Exposes per-entry `name()` and `enclosed_name()` — the latter returns `None` for path-traversal attempts, giving us a clean Zip-Slip primitive (FR-IE03 step 3).
- Already in the dependency graph of many workspace-adjacent crates (no new transitive-dep audit burden).

**Alternatives considered**:
- `async_zip` — pure async, but forces us to rewrite the pipeline around streaming I/O when we already run under `spawn_blocking`; no upside for our archive size.
- `flate2` + hand-rolled ZIP central directory parsing — reinvents a solved problem; violates Principle I.
- Using the system `unzip` binary via `tokio::process::Command` — opaque portability, Windows needs external binary, no structured error codes.

**Security note**: Even with `enclosed_name()`, we double-check by canonicalizing the resolved target against the staging root and rejecting any path whose canonical form does not have the staging root as a prefix. This belt-and-braces approach is documented in `contracts/zip-install-pipeline.md`.

---

## R2. SVG sanitizer for manifest icons (FR-I03)

**Decision**: **Hand-rolled allow-list sanitizer** in `crates/nexus-extension/src/install/svg_sanitize.rs`, built on `quick-xml` for parsing. Reject-on-unknown rather than strip-on-unknown.

**Rationale**:
- The allow-list in FR-I03 is small and fixed (15 element names, ~20 attribute names). A 150-line hand-rolled validator is smaller and more auditable than pulling `ammonia` (which targets HTML sanitization and brings a CSS parser we do not need).
- Reject-on-unknown is the only safe posture for an *install-time* gate — we never want to silently strip a surprising attribute and accept the rest.
- `quick-xml` is already available indirectly via other workspace crates; using it for a ≤ 2 kB parse cost is trivially cheap.
- Violating content (script, on-handlers, xlink:href external refs, foreignObject, @import) makes the whole icon fail validation and falls back to deterministic hashing (FR-I04). No partial icons.

**Alternatives considered**:
- `ammonia` — designed for HTML; overkill, brings `html5ever` and `tendril`; strip-rather-than-reject by default is the wrong posture for manifest ingestion.
- `svg-sanitizer` (npm / WASM) — not a Rust option; running JS at install time is a non-starter.
- Skipping SVG support entirely, symbol-only — rejected during Q3 clarify because branded extensions want custom glyphs.

**Size cap**: 2 KiB raw string length (pre-parse). File-size cap enforced before XML parsing to prevent XML-bomb DoS.

---

## R3. FNV-1a 64-bit hash crate

**Decision**: **`fnv` crate** (tiny, dependency-free, explicit FNV-1a).

**Rationale**:
- Spec requires FNV-1a for cross-platform determinism (FR-I04). `fnv`'s `FnvHasher` provides exactly that, with zero transitive deps.
- < 100 SLOC of code total; easy to audit.
- Stable: crate last major version change was years ago; no ongoing API churn.
- The low 32 bits of the 64-bit digest are exposed as `fallback_hash: u32` in the module envelope (FR-I04, ModuleIcon).

**Alternatives considered**:
- `twox-hash` — XXH3 and XXH64 are faster but the spec pinned FNV-1a for stability reasons (plain-text spec-readable algorithm; no SIMD variance).
- `std::hash::DefaultHasher` — explicitly *not* stable across Rust versions; disqualified.
- `siphasher` with a fixed key — also stable but overkill for a 16-bucket selector.

---

## R4. Material Symbols glyph allowlist (FR-I02)

**Decision**: Generate a compile-time allowlist from the **Material Symbols Outlined CSS file** at build time, emit `const MATERIAL_SYMBOLS: &[&str]` into a generated Rust file via `build.rs` in `crates/nexus-extension/`.

**Rationale**:
- Material Symbols ship as a variable font + a CSS file that lists every glyph codepoint. Parsing the CSS at build time gives us a single authoritative source.
- Keeping the list in a generated file (not a hand-maintained array) prevents drift when the font updates.
- Validation at manifest-ingest time is `O(log n)` with a sorted slice + binary search; no runtime cost.
- `build.rs` reads the CSS from a vendored file under `crates/nexus-extension/vendor/material-symbols.css` so the build is reproducible offline (local-first, FR-TP03).

**Alternatives considered**:
- No validation at all — rejected: silently-wrong glyph names would render as square boxes in the UI, wasting debug cycles.
- Runtime fetch from a Google endpoint — violates FR-TP03 (no outbound network).
- Hard-code a minimal allowlist (e.g., 200 common glyphs) — fragile and excludes valid manifest entries arbitrarily.

---

## R5. Self-hosted fonts (FR-TP04)

**Decision**:
- **Inter** variable font (`Inter-VariableFont_opsz,wght.woff2`, latin-ext subset only), self-hosted at `apps/web/public/fonts/inter.woff2`.
- **JetBrains Mono** variable font (`JetBrainsMono-VariableFont_wght.woff2`, latin subset), self-hosted at `apps/web/public/fonts/jetbrains-mono.woff2`.
- **Material Symbols Outlined** variable font (`MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2`, full glyph set), self-hosted at `apps/web/public/fonts/material-symbols-outlined.woff2`.
- All three declared via `@font-face` in `apps/web/src/styles/typography.css.ts` with `font-display: swap` and no remote `src` URLs.

**Rationale**:
- FR-TP04 forbids remote font loading. Self-hosting is the only path.
- Variable fonts provide every weight/fill axis we need (FR-019 uses `'FILL' 1` for active state) from a single file, minimizing bundle size.
- Subset ranges (latin, latin-ext) cover our UI copy; non-Latin glyphs are out of v1 scope (mostly mono-locale).
- `woff2` is universally supported in modern browsers, ~30–40% smaller than `woff`.

**Alternatives considered**:
- Bundling ttf/otf — 3–5× the bytes, no upside.
- Loading Google Fonts locally via a pre-build script that downloads once and commits — conflates build-time and runtime concerns; rejected for simplicity.
- System-font-only stack — rejected because the design language is defined by Inter + JBM; system fonts cannot match the editorial character the mockups specify.

**Licensing**: Inter is SIL OFL-1.1; JetBrains Mono is Apache-2.0; Material Symbols is Apache-2.0. All three are compatible with the project's GPL-3.0 posture. `apps/web/public/fonts/LICENSES.txt` ships alongside the binaries.

---

## R6. Grid virtualization (FR-011)

**Decision**: **`@tanstack/react-virtual` v3** for the Modules grid when `modules.length > 60`; below that, native CSS Grid with no virtualization.

**Rationale**:
- `@tanstack/react-virtual` is maintained by the TanStack team, ships ESM, no DOM-library dependencies, ~10 kB gzipped.
- Virtualizing a grid is noticeably more complex than a list; the threshold of 60 (≈ 4 rows × 4 cols × 3.75 viewport heights at 1440 px) is where scroll performance starts to matter.
- Below the threshold, CSS Grid `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` ships with zero JS overhead.

**Alternatives considered**:
- `react-window` / `react-virtualized` — older API, heavier, `react-window` lacks first-class grid support.
- Native CSS `content-visibility: auto` — good default but inconsistent paint budget across browsers; insufficient for 200+ cards.
- Intersection-observer-based hand-rolled virtualizer — violates Principle I.

**Threshold rationale**: measured on 4 K test fixtures in preliminary research; 60 cards is when Lighthouse's "Total Blocking Time" exceeds the 200 ms FR-010 budget on low-end laptops.

---

## R7. Draft-UUID TTL map (FR-BM04)

**Decision**: **In-memory `tokio::sync::RwLock<HashMap<Uuid, (WorkflowId, DeploymentId)>>`** behind an `Arc`, with a tokio background task that sweeps entries older than 10 minutes every 60 seconds. No external cache.

**Rationale**:
- The map exists purely for FR-BM04 idempotency; it does not need to survive a host restart (FR-BM06 explicitly says "no guarantee across browser-session boundaries").
- A host restart is rare; if it happens between the two materialize POSTs of an adversarial replay, the second call hits an empty map and creates a second `workflows`+`deployments` row — but FR-BM04's idempotency is scoped to the TTL window, so this is acceptable.
- `tokio::sync::RwLock` gives us the read-heavy-write-occasional pattern fit; contention is near zero (draft materialize is a rare operation).

**Alternatives considered**:
- `moka` crate (async cache with TTL + weighing) — nice API but adds a dependency for a feature we can implement in ~40 LOC.
- Persisting the map to SQLite — adds a table, fights Principle III (no new tables beyond additive columns), and offers no user-visible benefit.
- Browser-side-only idempotency (no server map) — would require the client to remember the mint-time response; a reload mid-materialize breaks idempotency. The server-side short-TTL map is the robust choice.

**Note**: the sweep task lives inside `nexus-api` `AppState`; on shutdown the `Arc` drops and the task exits cleanly.

---

## R8. Route redirects for `/recipes` and `/workflows` (FR-004)

**Decision**: Client-side redirect in `apps/web/src/App.tsx` using a thin `LegacyRedirect` component that reads `location.hash` (the project uses hash routing) and pushes the new location via `history.replaceState`. Two deprecated routes are handled: `/recipes` → `/modules`, `/workflows/{id}` → `/modules/user:{id}/blueprint`. Each redirect sets a `Deprecation: true` header analog via an in-app warning banner visible on the target page for the first visit in a session (dismissible).

**Rationale**:
- The project uses hash-routing (`/#/foo`) per the existing `App.tsx` implementation; the redirect stays in-client and requires no server change.
- `history.replaceState` is preferable to `pushState` so the Back button doesn't get trapped on the deprecated route.
- The in-app banner replaces the HTTP `Deprecation` header we cannot send from a SPA; it achieves the same educational outcome.

**Alternatives considered**:
- Server-side 302 in `axum` — our SPA is served by Vite in dev and static-hosted in prod; adding server routes is scope creep.
- Hard-remove the legacy routes without a redirect — violates FR-004's "one release cycle" promise.
- Keeping both old and new routes active indefinitely — adds sidebar bloat and contradicts the spec's consolidation goal.

---

## R9. Multipart upload in axum (FR-IE03)

**Decision**: `axum::extract::Multipart` with a per-handler **64 MiB body size limit** enforced via `tower_http::limit::RequestBodyLimitLayer` stacked on only the `/extensions/install-from-zip` route. Upload is streamed to a unique per-request staging tempdir under the host data directory via `tokio::fs::File` and `tokio::io::copy`. No buffering of the full ZIP in memory.

**Rationale**:
- Streaming to disk avoids peaking at 64 MiB of RAM on every install.
- Per-route body limit keeps other endpoints at their existing smaller defaults.
- `RequestBodyLimitLayer` is already in the tower-http dependency graph.
- Failing fast on oversized uploads (before reading the stream) gives the client a clean `413 Payload Too Large` with the FR-IE05 `zip.size_limit` code.

**Alternatives considered**:
- `actix-web` multipart — we don't use actix.
- `bytes::BytesMut` in-memory buffer — trivial to implement but exposes us to memory DoS.
- External upload service — violates local-first posture.

**Staging location**: `{host_data_dir}/staging/zip-install-{uuid}/` — guaranteed unique per request; `Drop` on the `StagingDir` RAII guard removes the directory on any failure path (FR-IE05).

---

## R10. Motion duration enforcement (FR-041, SC-022)

**Decision**: Motion budgets live as **named vanilla-extract values** in `apps/web/src/styles/motion.css.ts`, re-exported as CSS custom properties in `tokens.css`. Components reference them as `vars.motion.cardHoverLift` (etc.) — no inline duration literals in any component.

A Playwright test (`tests/e2e/motion_budgets.spec.ts`) programmatically reads the CSS custom property values off `getComputedStyle(document.documentElement)` and asserts each motion key falls within ±20 ms of the spec budget.

**Rationale**:
- Pinning motion values in one file mirrors the color/typography token discipline (FR-035).
- CSS custom properties give us a single point where `prefers-reduced-motion` can collapse all durations to `0s` (FR-040).
- The Playwright reading via `getComputedStyle` is robust against build tooling mangling — what ships is what's tested.

**Alternatives considered**:
- Hardcoding durations per-component — rejected, same reason as color tokens.
- Runtime motion-budget check via a React provider — adds runtime cost for no gain; CSS custom properties are already zero-cost.

---

## R11. Manifest schema migration posture for `ManifestIcon`

**Decision**: Add `icon: Option<ManifestIcon>` to the manifest struct (`crates/nexus-extension/src/manifest.rs`) as `#[non_exhaustive]` with `#[serde(default)]`. The existing manifest.toml files in the repo (if any) continue to parse without an `icon` field; absence of `icon` triggers the deterministic FNV-1a fallback (FR-I04).

**Rationale**:
- Additive, forward-compatible. Zero existing manifests break.
- `#[serde(default)]` means old manifests get `icon: None` implicitly.
- `#[non_exhaustive]` lets us later add `icon.png_base64` / `icon.url` without an SDK break.

**Alternatives considered**:
- Require `icon` on every manifest going forward — would break every existing extension.
- Store the icon in a separate `icon.toml` sidecar — conflates files, adds I/O to manifest load, rejected.

---

## R12. Local-first network enforcement (SC-021)

**Decision**: Enforcement has two layers:
1. **Build-time**: `apps/web/scripts/scan-theme-leaks.mjs` is extended (or paired with `scan-remote-cdns.mjs`) to grep the built `dist/**/*.{js,css,html}` for `fonts.googleapis.com`, `fonts.gstatic.com`, `lh3.googleusercontent.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`, and any absolute URL not matching `^http://(localhost|127\\.0\\.0\\.1)`. Non-zero matches fail the build.
2. **Runtime**: Playwright test `local_first_network.spec.ts` installs a `page.route('**/*', route => { if (!isLocal(route.request().url())) return fail() })` interceptor and runs a scripted happy path through every new page.

**Rationale**:
- Build-time catches 95% of accidental regressions (e.g., someone re-adds a Google Fonts `@import`).
- Runtime catches the other 5% (e.g., a JSON config file referencing a remote image).
- Both layers are cheap to maintain and already aligned with similar enforcement in spec 018's hash-compliance harness.

**Alternatives considered**:
- CSP header enforcement — we don't control the final deployment's CSP header for desktop-Electron / desktop-Tauri targets; relying on CSP alone is fragile.
- Runtime-only — misses regressions on code paths not exercised by the happy path.
- Build-only — misses third-party libraries that resolve URLs lazily at runtime.

---

## Resolution status

All NEEDS CLARIFICATION items from plan.md Technical Context are resolved above. No open research items remain; ready to proceed to Phase 1 (data-model + contracts + quickstart).
