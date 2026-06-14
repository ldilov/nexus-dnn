//! RED tests for the PyTorch index-sidecar extractor (T018 / spec FR-001).
//!
//! These tests pin the contract of `PytorchIndexExtractor` before the real
//! implementation lands in T022. They are all `#[ignore]`d so `cargo test`
//! stays green for unrelated crates until the extractor is wired up.
//!
//! Security invariant: the extractor must NEVER deserialize `.bin` files
//! (pickle = arbitrary code execution). Only `pytorch_model.bin.index.json`
//! and `config.json` are parsed.
//!
//! Covers weight-map layer inference across: llama-style `model.layers.{i}.*`
//! and GPT-family `transformer.h.{i}.*`.

mod common;

use nexus_model_metadata::{
    ArtifactFormat, ExtractedMetadata, ExtractionStatus, MetadataExtractor,
};
use tempfile::tempdir;

/// Returns the as-yet-unimplemented extractor. Once `T022` lands this should
/// be replaced with
/// `nexus_model_metadata::pytorch_index::PytorchIndexExtractor::new()`.
fn extractor() -> Box<dyn MetadataExtractor> {
    Box::new(nexus_model_metadata::pytorch_index::PytorchIndexExtractor::new())
}

fn run(path: &std::path::Path, install_id: &str) -> ExtractedMetadata {
    extractor().extract(path, install_id).expect("extract")
}

#[test]
fn pytorch_index_sidecar_present_partial() {
    let tmp = tempdir().unwrap();
    common::write_pytorch_index(tmp.path(), 24, false, true);

    let meta = run(tmp.path(), "install-partial");

    assert_eq!(meta.format, ArtifactFormat::PytorchIndex);
    assert_eq!(meta.extraction_status, ExtractionStatus::Partial);
    assert_eq!(meta.layer_count, Some(24));
    assert_eq!(meta.install_id, "install-partial");
}

#[test]
fn pytorch_index_with_config_ok() {
    let tmp = tempdir().unwrap();
    common::write_pytorch_index(tmp.path(), 24, true, true);

    let meta = run(tmp.path(), "install-ok");

    assert_eq!(meta.format, ArtifactFormat::PytorchIndex);
    assert_eq!(meta.extraction_status, ExtractionStatus::Ok);
    assert_eq!(meta.layer_count, Some(24));
    assert_eq!(meta.max_context, Some(4096));
    assert_eq!(meta.hidden_size, Some(4096));
    assert_eq!(meta.architecture.as_deref(), Some("llama"));
}

#[test]
fn pytorch_index_sidecar_missing_failed() {
    let tmp = tempdir().unwrap();
    // Only bare .bin files, no index.json. Extractor MUST NOT touch these
    // files' contents — they are potentially untrusted pickle streams.
    std::fs::write(tmp.path().join("pytorch_model-00001-of-00002.bin"), b"").unwrap();
    std::fs::write(tmp.path().join("pytorch_model-00002-of-00002.bin"), b"").unwrap();

    let meta = run(tmp.path(), "install-missing");

    assert_eq!(meta.extraction_status, ExtractionStatus::Failed);
    assert!(meta.layer_count.is_none());
}

#[test]
fn pytorch_index_gpt2_transformer_h_pattern() {
    let tmp = tempdir().unwrap();
    common::write_pytorch_index_with_patterns(
        tmp.path(),
        12,
        &[
            "transformer.h.{i}.attn.c_attn.weight",
            "transformer.h.{i}.mlp.c_fc.weight",
        ],
        true,
        &["GPT2LMHeadModel"],
    );

    let meta = run(tmp.path(), "install-gpt2-pt-index");

    assert_eq!(meta.format, ArtifactFormat::PytorchIndex);
    assert_eq!(meta.layer_count, Some(12));
    let arch = meta
        .architecture
        .expect("architecture set from config.json");
    assert!(
        arch.to_ascii_lowercase().contains("gpt2"),
        "expected architecture to map to gpt2 family, got: {arch}"
    );
}

#[test]
fn pytorch_index_malformed_json_failed() {
    let tmp = tempdir().unwrap();
    common::write_malformed_pytorch_index(tmp.path());

    // Must not panic — return Failed status instead.
    let result = extractor().extract(tmp.path(), "install-malformed");
    let meta = result.unwrap_or_else(|_| {
        ExtractedMetadata::failed("install-malformed", ArtifactFormat::PytorchIndex)
    });

    assert_eq!(meta.extraction_status, ExtractionStatus::Failed);
    assert!(meta.layer_count.is_none());
}
