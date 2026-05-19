# nexus-models-store

Host-owned model store. Two layers:

1. **Extension-owned install layer** — install pipeline, blob dedup,
   lease budget, quantization matching, resolver, verify, layout,
   reclaim. Originally extracted from `nexus-backend-runtimes` in
   spec 018 (Deployments).
2. **Universal search + download layer** — the normalize / capabilities /
   downloads modules that power the Models Search page (spec 025).

Both layers share this crate's domain types (`Format`, `Precision`,
`DownloadState`, …) and id newtypes (`FamilyId`, `ArtifactId`,
`VariantId`, `BackendId`, `JobId`).

## Module map

```
src/
├── blobs.rs            blob deduplication (install layer)
├── download.rs         legacy artifact fetcher (install layer)
├── install/            install pipeline (install layer)
├── leases.rs           lease budget (install layer)
├── quantization.rs     quantization matching (install layer)
├── resolver/           dependency resolution (install layer)
├── verify.rs           checksum + layout verification
├── provenance.rs       license + metadata derivation
├── reclaim.rs          background GC
│
├── ids.rs              newtype ids — FamilyId, ArtifactId, VariantId,
│                       BackendId, JobId (UUIDv7)
├── types.rs            non_exhaustive public enums — Format, Precision,
│                       PrecisionSource, Modality, DependencyRole,
│                       Requirement, CompatibilityStatus, DownloadState
├── model.rs            domain structs — ModelRepository, ModelFamily,
│                       Artifact, Variant, Dependency, BackendCapability
│
├── normalize/          pure functions — input: raw HF SearchResult
│   ├── classify.rs     format + modality classification
│   ├── variants.rs     GGUF quantization detector + default heuristic
│   ├── precision.rs    explicit-vs-inferred precision resolution
│   ├── deps.rs         VAE / tokenizer / controlnet / lora detection
│   ├── compat.rs       single-owner CompatibilityStatus classifier
│   └── mod.rs          integrator — `normalize_family(raw, registry)`
│
├── capabilities/       backend adapter registry (sealed trait)
│   └── mod.rs          BackendAdapter, CapabilityRegistry,
│                       LlamaCppAdapter, TestAdapter (for integration tests)
│
└── downloads/          artifact download machinery (spec 025)
    ├── auth.rs         TokenStore — shared HF token with change events
    ├── store.rs        JobStore — SQLite-backed download_jobs +
    │                   download_job_artifacts CRUD
    ├── orchestrator.rs DownloadOrchestrator — 2-slot semaphore, FIFO queue,
    │                   resumable Range: downloads, pause/resume signals,
    │                   startup rehydration, auth-change re-queue
    ├── install_map.rs  InstallMap — reverse-mapping artifact_id → upstream
    │                   identity, persisted in model_store_installed_artifacts
    └── mod.rs          MAX_CONCURRENT_DOWNLOADS constant + re-exports
```

## Domain model (spec 025)

```
ModelRepository ──1─── ModelFamily
                         │
                         ├── Artifact*         concrete downloadable file
                         ├── Variant*          GGUF quant / precision tier
                         ├── Dependency*       VAE / tokenizer / encoder
                         └── CompatibilityStatus (computed)

BackendCapability ── CapabilityRegistry (Single-Choice owner)

DownloadJob ──*── DownloadJobTarget           (persisted in SQLite)
InstalledArtifactRow                          (FR-086 reverse map)
```

## Migrations

| # | File | Purpose |
|---|---|---|
| 009 | `host_model_store.sql` | Original install tables (`host_models`, etc.) |
| 010 | `host_model_store_provenance.sql` | License / provenance columns |
| 013 | `model_store_download_jobs.sql` | Spec 025 job + per-artifact target tables |
| 014 | `model_store_installed_artifacts.sql` | Spec 025 FR-086 reverse-mapping |

All migrations are append-only and idempotent.

## Extension points

- **New runtime backend**: implement the sealed `BackendAdapter` trait
  inside this crate, register with `CapabilityRegistry::register` at
  host-assembly time. Zero edits to handlers or frontend required.
- **New artifact format**: add a variant to `types::Format`
  (`#[non_exhaustive]`), update `normalize::classify::classify_format`,
  add fixtures to `tests/normalize_fixtures.rs`.
- **New dependency role**: add a variant to `types::DependencyRole`,
  extend `normalize::deps::classify_role`, cover with a fixture.
- **Adopt an already-downloaded model**: any extension that fetches a
  model through its own path can hand the on-disk tree to the host via
  `register_existing` (or the generic `POST /api/v1/host-models/register-existing`
  endpoint, or the in-process `HostModelRegistrar` trait the host
  injects). The source tree is linked into the CAS without being
  consumed, a fresh install root is materialized, and the row dedups on
  the install `IdentityKey` — so a self-downloaded model converges to
  one `install_id` with a later Foundry install of the same repo.
  `compute_sha256_root` is the single canonical tree digest shared by
  every install path.

## Testing

```
cargo test -p nexus-models-store
```

covers:
- Unit tests per module (normalize classify/variants/precision/deps/compat,
  capabilities, ids, types, downloads store, auth)
- 50-repo fixture sweep (`tests/normalize_fixtures.rs`) — SC-002 + SC-009
- Integration tests for install / lease / reclaim / resolver (pre-existing)
- Download flow: 4 JobStore tests + 4 install_map tests

~118 tests total, all green.

## Related specs

- Spec 009 — host model store (initial tables)
- Spec 018 — deployments (crate split from backend-runtimes)
- Spec 020 — backends and models polish
- Spec 025 — models-search refactor (normalize + capabilities + downloads)
