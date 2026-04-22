# nexus-backend-runtimes

Host-owned runtime pool: install/repair/uninstall pipelines, accelerator-aware
binary selection, validation + reconciler, managed spawn/drain, runtime channel
descriptors, logs, and versioned parameter catalogs.

## Caller-supplied event namespace (spec 030)

`LlamaCppAdapter::new` takes a `namespace: impl Into<String>` parameter.
The crate treats the namespace as opaque — it surfaces in
`LogPipelineContext` and inside event payloads, but the crate itself
never matches on its value.

Recommended convention for callers (extensions): build the namespace as
`extension.<extension-id>.<backend-family>`, e.g.
`"extension.nexus.local-llm.llama.cpp"`. The host enforces nothing.

Constitution Principle XIII (Host ↔ Extension Boundary, NON-NEGOTIABLE)
forbids hardcoding extension identity into reusable host infrastructure.
The pre-spec-030 `NAMESPACE_LLAMACPP` / `NAMESPACE_TENSORRT_LLM`
constants violated this and were deleted in spec 030 CP2.

## Module layout (post spec 015)

```
src/
├── lib.rs
├── adapter.rs              # BackendAdapter trait + AdapterRegistry
├── channel.rs              # RuntimeChannelDescriptor + ChannelBuildCtx
├── compatibility.rs        # RequiredBackend / pair_allowed
├── error.rs                # BackendRuntimeError + variants
├── events.rs               # BackendEvent + SharedPublisher
├── family.rs               # RuntimeFamily newtype (single-choice registry)
├── parameter_catalog.rs    # ParameterCatalog + family dispatch
├── reserved_policy.rs      # host-governed flag deny + injection
├── settings.rs             # RuntimeSettings (typed opt-ins)
├── installs_store/
│   ├── mod.rs              # RuntimeInstallRow + load/list/hydrate/delete/dependents
│   ├── migration.rs        # migrate_from_legacy + build_binary_paths_json
│   ├── relocation.rs       # relocate_legacy_binaries + path rewriter
│   ├── resolution.rs       # resolve_dependency + version_satisfies
│   └── tests.rs
├── llamacpp/
│   ├── mod.rs              # LlamaCppAdapter
│   ├── install_ctx.rs      # InstallCtx (spec 015 US6 — replaces 9-arg sig)
│   ├── install_pipeline.rs # run + run_inner(ctx)
│   ├── installs_store.rs   # llama.cpp-specific store helpers
│   └── probe.rs
└── spawn/
    ├── mod.rs              # Spawner + SpawnMode + impl Spawner public API
    ├── port.rs             # PortAllocator + PortLease + RuntimeBindMode
    ├── host_env.rs         # build_host_env + host-governed argv injection
    ├── stub.rs             # stub-mode spawn helpers
    ├── real.rs             # real-mode spawn helpers
    ├── supervise.rs        # supervise_real + SupervisorCtx + drain_stream
    └── tests.rs
```

## Family registry

All `"llama.cpp"` / `"llamacpp"` matches go through `RuntimeFamily::canonical(&str)`
and the `RuntimeFamily::LLAMA_CPP` const. Adding a new family means adding a
variant + a match arm in `family.rs`; the registry is `#[non_exhaustive]` so
downstream call sites compile-fail until they handle the new variant.

## Spawn modes

`Spawner` carries an explicit `SpawnMode` enum (no implicit `Option<pool>` /
`Option<adapters>`):

- `SpawnMode::Stub { port_allocator }` — for tests; spawn() uses
  `port_hint` + HTTP probe instead of forking.
- `SpawnMode::Real { pool, adapters, port_allocator }` — production;
  spawn() forks via the adapter's `launch_spec` and supervises via
  `supervise_real`.

`publisher: SharedPublisher` stays on the `Spawner` struct (not inside
`SpawnMode`) because both modes publish through the same broadcast.

## InstallCtx

`llamacpp/install_pipeline::run_inner` takes `&InstallCtx` instead of 9
positional arguments. New install fields land as `InstallCtx` fields without
churning every call site.

## CI checks

- `bash scripts/verify-spec-011.sh` — asserts the zero-extension-deps invariant.

## Model store

Host-owned model catalog under `models_store/`.

- **`install/`** — `install_model`, `uninstall_model`, in-flight dedup via
  per-identity mutex map, `list_all_visible` (private-filtered).
  `InstallModelRequest` carries optional `param_count`, `license_spdx`,
  `license_url`, `provenance_note`. Tests: `install/tests.rs`.
- **`blobs.rs`** — content-addressed store at `<root>/blobs/<sha[0:2]>/<sha>`;
  hardlink with symlink fallback; `gc_blobs` sweeps unreferenced files.
- **`download.rs`** — SHA-256-streaming downloader with HTTP `Range` resume
  and a shared `tokio::sync::Semaphore` (default 2 permits).
- **`leases.rs`** — `acquire_lease` / `release_lease` / `list_active_leases`
  with device VRAM budget enforcement.
- **`quantization.rs`** — re-exports `nexus_protocol::Quantization` /
  `MatchQuality`. Exact > Family > None matching; NVFP4 ≠ MXFP4;
  case-insensitive parse; unknown tags fall back to `Other(String)`.
- **`resolver/`** — `check_model_dependencies` (deterministic tie-breaker:
  exact > family > `created_at DESC`) and side-effect-free `resolve_dry_run`.
  Uses `param_count` for `min_params` gating.
- **`provenance.rs`** — `resolve_license` three-tier resolution (user →
  HF metadata → `UNKNOWN + provenance_note`), `HfProbe` trait for pluggable
  HF metadata fetching, auto-revision resolution when `allow_unpinned=true`.
- **`reclaim.rs`** — `run_reclaim_pass` (one-shot) + `spawn_reclaim_ticker`
  (tokio task) for private-install cleanup when owner extensions disappear.
- **`verify.rs`** — `verify_install` re-hashes files against the stored
  manifest; transitions `state` to `'corrupt'` on mismatch.
- **`errors.rs`** — `ModelStoreError` (not `#[non_exhaustive]` — exhaustive
  match enforcement on every HTTP mapper).

Migration files: `migrations/009_host_model_store.sql` (schema, FR-501/502),
`migrations/010_host_model_store_provenance.sql` (`param_count` column).
Schema DDL lives at the repo `migrations/` level per repo convention; no
`schema.rs` inside `models_store/`.
