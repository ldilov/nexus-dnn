# nexus-backend-runtimes

Host-owned runtime pool: install/repair/uninstall pipelines, accelerator-aware
binary selection, validation + reconciler, managed spawn/drain, runtime channel
descriptors, logs, and versioned parameter catalogs.

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
