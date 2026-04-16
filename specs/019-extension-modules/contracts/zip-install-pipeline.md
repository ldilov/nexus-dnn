# Contract: ZIP install pipeline (`crates/nexus-extension/src/install/`)

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)
**Spec ref**: FR-IE01..FR-IE07, SC-017, SC-018

## 1. Public entry

```rust
pub struct ZipInstallPipeline {
    staging_root: PathBuf,
    extensions_root: PathBuf,
    size_limits: ZipSizeLimits,
}

pub struct ZipSizeLimits {
    pub max_uncompressed_bytes: u64,   // 256 MiB
    pub max_file_count: usize,         // 8192
    pub max_compressed_bytes: u64,     // 64 MiB (enforced at axum layer; mirrored here for defense-in-depth)
}

impl ZipInstallPipeline {
    pub fn new(staging_root: PathBuf, extensions_root: PathBuf) -> Self { ... }
    pub fn with_size_limits(mut self, limits: ZipSizeLimits) -> Self { ... }

    pub async fn install<R: AsyncRead + Unpin + Send>(
        &self,
        zip_stream: R,
    ) -> Result<ZipInstallResult, ZipInstallError>;
}
```

`ZipInstallResult` and `ZipInstallError` are defined in data-model.md §3.3.

## 2. Pipeline steps (FR-IE03)

Run in strict order. Any failure deletes the staging dir and returns the enumerated error.

| # | Step | Module | Failure code |
|---|---|---|---|
| 1 | Stream zip bytes to `{staging_root}/zip-install-{uuid}/upload.zip` | `stage.rs::write_upload` | `io.stage_failed` |
| 2 | Parse central directory | `validate_zip.rs::parse_central_dir` | `zip.corrupt` |
| 3 | Reject any entry whose `enclosed_name()` is None OR whose canonical target escapes the staging root | `validate_zip.rs::check_zip_slip` | `zip.slip_attempt` |
| 4 | Reject if no `manifest.toml` at depth ≤ 2 from root | `validate_zip.rs::require_manifest` | `zip.missing_manifest` |
| 5a | Reject if total uncompressed size > `max_uncompressed_bytes` | `validate_zip.rs::check_size` | `zip.size_limit` |
| 5b | Reject if entry count > `max_file_count` | `validate_zip.rs::check_count` | `zip.file_count_limit` |
| 6 | Reject any entry with executable bits outside declared `assets/` or `worker/` prefixes as listed in the (yet-unparsed) manifest. Step runs a first-pass manifest-peek that reads ONLY the manifest entry from the central directory without unpacking | `validate_zip.rs::check_executables` | `zip.executable_outside_assets` |
| 7 | Extract into `{staging_root}/zip-install-{uuid}/unpacked/` | `stage.rs::extract` | `io.stage_failed` |
| 8 | Run the existing manifest validator against `unpacked/manifest.toml` | `crates/nexus-extension/src/validation.rs::validate` | `manifest.invalid` |
| 9 | Sanitize `ManifestIcon.svg` if present (FR-I03) | `svg_sanitize.rs::sanitize` | `manifest.icon_invalid` |
| 10 | Atomic rename `unpacked/` → `{extensions_root}/{extension_id}/` (or return 409 if the target already exists) | `stage.rs::atomic_rename` | `extension.already_installed` / `io.stage_failed` |
| 11 | Call `InMemoryExtensionRegistry::refresh()` to publish the new extension | `stage.rs::publish` | `io.stage_failed` |
| 12 | Build and return `ZipInstallResult` | `zip_install.rs::build_result` | — |

**Post-condition on any failure** (FR-IE05): the entire `{staging_root}/zip-install-{uuid}/` directory is removed via the `StagingDir` RAII `Drop` impl. SC-018 verifies no leftover directory ages past 1 s after a failing request.

**Post-condition on success**: `{staging_root}/zip-install-{uuid}/` is removed after step 10 since its contents have been renamed to their final location. The RAII drop still runs, observing an empty dir.

## 3. Zip-Slip defense

Two independent checks in step 3:

1. `zip::ZipFile::enclosed_name()` returns `Option<&Path>` — `None` indicates a path containing `..` or absolute. Reject on `None`.
2. Resolve the intended target as `staging_root.join(enclosed_name())`, then `fs::canonicalize` both the staging root and the target's parent; verify the canonical target begins with the canonical staging root. Reject otherwise.

Two checks is belt-and-braces: the first catches malformed central directory entries; the second catches symlink-loop tricks if the underlying FS has any pre-existing symlinks in the staging path.

## 4. Manifest peek (step 6)

Problem: we cannot fully extract until step 7, but we need to know which paths are declared as assets/worker to check the executable rule in step 6.

Solution: read ONLY the `manifest.toml` entry from the central directory — `zip` crate exposes `ZipArchive::by_name("manifest.toml")` — into a `String`, parse it with `toml`, extract the `[assets]` and `[worker]` path prefixes, and use those as the allowlist in step 6. The full extraction in step 7 doesn't repeat this work.

If the manifest's executable-path declarations do not actually match what lands on disk post-extraction, that's a step-8 manifest-validation failure, not a step-6 failure.

## 5. RAII staging guard

```rust
pub struct StagingDir {
    root: PathBuf,
    removed: AtomicBool,
}

impl StagingDir {
    pub fn new(under: &Path) -> io::Result<Self> { ... }
    pub fn path(&self) -> &Path { &self.root }
    pub fn consume(mut self) { self.removed.store(true, Ordering::Release); }
}

impl Drop for StagingDir {
    fn drop(&mut self) {
        if !self.removed.load(Ordering::Acquire) {
            let _ = std::fs::remove_dir_all(&self.root);
        }
    }
}
```

Successful atomic-rename calls `.consume()`. Every other exit path lets `Drop` run.

## 6. Async posture

- `install` is `async`, but the synchronous ZIP parse and FS extraction run under `tokio::task::spawn_blocking` to avoid blocking the runtime on slow disks.
- Upload streaming to disk uses `tokio::io::copy`; no blocking.
- Registry refresh (step 11) is in-memory and sync.

Total handler latency budget: 5 s p95 on a 64 MiB archive on local SSD (SC-017).

## 7. Observability

- `tracing::info_span!("zip_install", extension_id)` wraps the whole call once the manifest has been peeked.
- On failure, the `tracing::error!` carries the structured `ZipInstallError` variant.
- One `module.installed` event emitted on success (local-only per FR-TP01).

## 8. Test matrix (SC-018 adversarial fixtures)

| Fixture | Expected code | HTTP |
|---|---|---|
| `happy/cinema-engine-v4.zip` | 201 Created | — |
| `adv/path-traversal.zip` (entry `../../../etc/passwd`) | `zip.slip_attempt` | 422 |
| `adv/bomb-uncompressed.zip` (300 MiB uncompressed) | `zip.size_limit` | 422 |
| `adv/many-files.zip` (9000 files) | `zip.file_count_limit` | 422 |
| `adv/no-manifest.zip` | `zip.missing_manifest` | 422 |
| `adv/svg-on-handler.zip` (icon.svg contains `onload=`) | `manifest.icon_invalid` | 422 |
| `adv/exec-outside-assets.zip` (executable at root) | `zip.executable_outside_assets` | 422 |
| `adv/already-installed.zip` (extension_id collision) | `extension.already_installed` | 409 |

After every adversarial case, a sweep over `{staging_root}` returns zero directories older than 1 s (SC-018 leftover-check).

## 9. Interaction with existing `InMemoryExtensionRegistry`

- No change to `InMemoryExtensionRegistry` public API; we call `refresh()` (or `activate_builtin_extension` with the new path — TBD during M3 implementation).
- The existing directory-scan path (`from_directory`) continues to work; ZIP install is purely additive.

## 10. Forbidden additions (Principle V + Principle XI)

- MUST NOT fetch anything over the network (FR-IE06).
- MUST NOT shell out to `unzip` or any external binary.
- MUST NOT hold a `Mutex<HashMap>` for the staging map (we use per-request UUID dirs — no shared state).
- MUST NOT leave any `TODO` / `FIXME` marker (Principle IV).
- MUST NOT contain `unwrap()` outside tests (Principle VII).
- MUST NOT use `#[deny(warnings)]` on the crate (Principle VII).
