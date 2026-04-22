# nexus-extension

Extension manifest parser, registry, and lifecycle for the host.

## HTTP router adapter contract (spec 030)

`router_hook::ExtensionRouterProvider` is the trait extensions implement
to publish HTTP routes. The host calls `build_router(cx)` once at startup
and forwards the returned `(Router, Vec<String>)` to
`nexus_api::extension_router::DefaultRegistry`. The first element becomes
the live router under `/api/v1/extensions/<ext_id>/*`; the second is an
optional disclosure surfaced via `/api/v1/extensions` listing
(FR-031). Constitution Principle XIII (Host ↔ Extension Boundary,
NON-NEGOTIABLE) governs the contract: extensions MAY consume host APIs;
the host MUST NOT name specific extensions in its router.

`ExtensionContext` is the deliberately narrow view of host facts the
provider receives at build time. Fields are additive; future host
capabilities land here without breaking older extensions.

## Manifest

Extensions ship `extension.yaml` at their root. Required top-level keys:
`spec_version`, `extension` (id, version, name, description), `compatibility`
(host_api, protocol), `runtime` (family, entrypoint, environment).

Optional: `capabilities`, `operators`, `recipes`, `ui`, `storage`,
`runtime_dependencies`, `model_dependencies`.

### `runtime_dependencies`

Host-managed runtime requirements (spec 012). Each entry:

```yaml
runtime_dependencies:
  - family: llama-cpp
    version: ">=0.5.0"
    acceleration: [cuda, cpu]
```

### `model_dependencies`

Host-managed model requirements (spec 017). The parsed type is
`nexus_protocol::ModelDependency` (shared with `nexus-backend-runtimes`).

```yaml
model_dependencies:
  - family: llama
    version: "3-8b-instruct"
    revision: "5fa94b9e..."      # HF commit SHA or blob sha256_root
    quantization: Q4_K_M         # case-insensitive; unknown falls back to Other
    min_params: 7B               # accepts "7B", "500M", "1K", or raw integer
    variant: default             # optional
    required: true               # default true; false = soft-skip on miss
```

**`revision` is required** unless `allow_unpinned: true` is set explicitly —
missing-revision without opt-in yields `ExtensionError::ManifestParse`. For
`source_kind = huggingface` installs, `allow_unpinned` causes the host to
auto-resolve the current commit SHA at install time and persist it
(`source_revision` is always populated on the installed row per FR-522).

`parse_manifest` runs `validate_revision_pinning` over every entry as part
of manifest parse.

## ZIP install

`ZipInstallPipeline` accepts a staged `.zip` file and publishes the extension
into `extensions_root/{id}/` after running 12 ordered validation + extraction
steps.

Caps (all overridable via `with_size_limits`):

- **256 MiB** uncompressed sum across all entries
- **8192** entry count
- **64 MiB** compressed size (axum-side gate; pipeline mirrors for defense-in-depth)

Forbidden content (fails the whole install, never strips):

- Zip-Slip attempts (`../`, absolute paths, path NULs) — double-checked with
  `ZipFile::enclosed_name()` + a component-level walk
- Missing `manifest.{yaml,yml,toml}` at depth ≤ 2
- Executable bits on any entry outside the declared entrypoint, `assets/`,
  or `worker/` prefix
- SVG icons with `<script>`, `on*` handlers, `<foreignObject>`, `xlink:*`,
  or bare `href` attributes (see `install::sanitize_svg` for the full
  allow-list)

All failure paths run the `StagingDir` RAII drop — no leftover directories
survive a failed install (SC-018).

The axum handler at `POST /api/v1/extensions/install-from-zip` wraps the
pipeline in `tokio::task::spawn_blocking`, streams multipart uploads to a
temp file, refreshes the in-memory registry on success, and emits a single
`ModuleInstalled` event on the local bus (FR-TP01).
