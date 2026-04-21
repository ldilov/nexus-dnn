//! Red-phase tests for the GGUF metadata extractor (T016 → T020).
//!
//! These tests define the behavioral contract the future
//! `nexus_model_metadata::gguf::GgufExtractor` must satisfy. They reference a
//! type path that does not yet exist, so they are marked `#[ignore]` until
//! T020 lands the implementation. Running `cargo test -- --ignored` will
//! fail (expected red state); `cargo test` stays green.
//!
//! Covers GGUF extraction across: llama, qwen2, mistral, phi3, gemma, gpt2,
//! deepseek2, command-r, starcoder2, stablelm2, falcon.
//!
//! Reference values per arch are taken from upstream Hugging Face config
//! sidecars for canonical checkpoints (GPT-2 124M/355M, DeepSeek-V2-Chat,
//! Cohere CommandR 35B, StarCoder2 15B, StableLM 2 12B, Falcon 7B) and the
//! GGUF metadata key convention documented at
//! <https://github.com/ggml-org/ggml/blob/master/docs/gguf.md>.

mod common;

use common::{write_gguf_truncated, write_gguf_unknown_arch, write_synthetic_gguf};
use nexus_model_metadata::{
    ArtifactFormat, ExtractionStatus, MetadataExtractor, gguf::GgufExtractor,
};
use tempfile::TempDir;

// ---------------------------------------------------------------------------
// Happy-path per-architecture extraction
// ---------------------------------------------------------------------------

fn assert_arch_extracts(arch: &str, block_count: u32, ctx_len: u32, embd: u32) {
    // Arrange
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("synthetic.gguf");
    write_synthetic_gguf(&path, arch, block_count, ctx_len, embd).expect("emit gguf");
    let extractor = GgufExtractor::default();

    // Act
    let meta = extractor
        .extract(&path, "test-install")
        .expect("extract should succeed on well-formed gguf");

    // Assert
    assert_eq!(meta.format, ArtifactFormat::Gguf);
    assert_eq!(meta.install_id, "test-install");
    assert_eq!(meta.extraction_status, ExtractionStatus::Ok);
    assert_eq!(meta.architecture.as_deref(), Some(arch));
    assert_eq!(meta.layer_count, Some(block_count));
    assert_eq!(meta.max_context, Some(ctx_len));
    assert_eq!(meta.hidden_size, Some(embd));
}

#[test]
fn gguf_llama_header_extracts_layer_count() {
    assert_arch_extracts("llama", 32, 8192, 4096);
}

#[test]
fn gguf_qwen_header_extracts_layer_count() {
    assert_arch_extracts("qwen2", 28, 32768, 3584);
}

#[test]
fn gguf_mistral_header_extracts_layer_count() {
    assert_arch_extracts("mistral", 32, 32768, 4096);
}

#[test]
fn gguf_phi_header_extracts_layer_count() {
    assert_arch_extracts("phi3", 32, 131072, 3072);
}

#[test]
fn gguf_gemma_header_extracts_layer_count() {
    assert_arch_extracts("gemma", 18, 8192, 2048);
}

#[test]
fn gguf_gpt2_header_extracts_layer_count() {
    assert_arch_extracts("gpt2", 12, 1024, 768);
}

#[test]
fn gguf_gpt2_medium_header_extracts_layer_count() {
    assert_arch_extracts("gpt2", 24, 1024, 1024);
}

#[test]
fn gguf_deepseek2_header_extracts_layer_count() {
    assert_arch_extracts("deepseek2", 60, 32768, 5120);
}

#[test]
fn gguf_command_r_header_extracts_layer_count() {
    assert_arch_extracts("command-r", 40, 131072, 8192);
}

#[test]
fn gguf_starcoder2_header_extracts_layer_count() {
    assert_arch_extracts("starcoder2", 40, 16384, 6144);
}

#[test]
fn gguf_stablelm2_header_extracts_layer_count() {
    assert_arch_extracts("stablelm2", 40, 16384, 5120);
}

#[test]
fn gguf_falcon_header_extracts_layer_count() {
    assert_arch_extracts("falcon", 32, 2048, 4544);
}

// ---------------------------------------------------------------------------
// Failure and degraded paths
// ---------------------------------------------------------------------------

#[test]
fn gguf_malformed_header_returns_failed() {
    // Arrange — truncated header (magic + version only).
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("broken.gguf");
    write_gguf_truncated(&path).expect("emit truncated gguf");
    let extractor = GgufExtractor::default();

    // Act — extractor must not panic on malformed input. It should either
    // return Ok(metadata with Failed status) or Err(ExtractError) — both are
    // acceptable, as long as the process survives.
    let result = std::panic::catch_unwind(|| extractor.extract(&path, "broken-install"));
    let outcome = result.expect("extractor must not panic on malformed header");

    // Assert
    match outcome {
        Ok(meta) => {
            assert_eq!(meta.format, ArtifactFormat::Gguf);
            assert_eq!(meta.extraction_status, ExtractionStatus::Failed);
            assert_eq!(meta.layer_count, None);
            assert_eq!(meta.architecture, None);
        }
        Err(_) => {
            // An Err return is also a valid failure signal for malformed bytes.
        }
    }
}

#[test]
fn gguf_unknown_architecture_key_returns_partial() {
    // Arrange — valid GGUF magic + architecture KV with an unrecognised name.
    // No `<arch>.block_count` KV is present, so layer_count cannot be derived.
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("unknown.gguf");
    write_gguf_unknown_arch(&path, "mystery-arch-v9").expect("emit unknown-arch gguf");
    let extractor = GgufExtractor::default();

    // Act
    let meta = extractor
        .extract(&path, "unknown-install")
        .expect("structurally valid gguf should parse to Partial, not Err");

    // Assert
    assert_eq!(meta.format, ArtifactFormat::Gguf);
    assert_eq!(meta.extraction_status, ExtractionStatus::Partial);
    assert_eq!(
        meta.architecture.as_deref(),
        Some("mystery-arch-v9"),
        "architecture should be captured verbatim even when unrecognised"
    );
    assert_eq!(
        meta.layer_count, None,
        "layer_count must be null when the arch-specific block_count key is unknown"
    );
}
