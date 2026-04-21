# nexus-model-metadata

Host-level multi-format extractor for downloaded model artifacts.

## Supported formats

| Format | Source | Safety |
|---|---|---|
| GGUF | binary header key-value block | safe, purely structural read |
| safetensors | JSON header (first N bytes after the 8-byte length prefix) + optional `config.json` sidecar | safe, no tensor data read |
| pytorch-bin | `*.index.json` sidecar only (`pytorch_model.bin.index.json`) | safe — pickle deserialization is **explicitly forbidden** (arbitrary-code-execution risk) |

Unrecognized formats or missing sidecars produce `ExtractionStatus::Failed` / `ExtractionStatus::Partial` with null fields; the install still succeeds.

## Contract

```rust
use nexus_model_metadata::{MetadataExtractor, ArtifactFormat, ExtractError};
use std::path::Path;

fn example(extractor: &dyn MetadataExtractor, path: &Path, install_id: &str)
    -> Result<(), ExtractError>
{
    let metadata = extractor.extract(path, install_id)?;
    assert_eq!(metadata.format, extractor.format());
    Ok(())
}
```

## Adding a new format

1. Implement `MetadataExtractor` in a new submodule.
2. Register in `dispatch.rs` with a priority slot.
3. Add golden fixture under `tests/fixtures/<format>/`.
4. Add a unit test in `tests/<format>_extraction.rs`.

No changes to `nexus-installer` or `nexus-api` are required — the trait is the contract.

## Consumers

- `nexus-installer` — calls `dispatch::extract_any` in the post-download commit step.
- `nexus-models-store` — surfaces the extracted fields in installed-artifacts listings.
- `nexus-api` — exposes the record via `GET /api/host/models/{install_id}/metadata`.
- LLM extension — consumes the REST endpoint to seed the Runtime tuning drawer.
