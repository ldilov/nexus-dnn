# nexus-extension

Extension manifest parser, registry, and lifecycle for the host.

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
