//! MoE detection tests for the GGUF extractor (spec 039 phase 3 / US4).
//!
//! Detection precedence:
//! 1. `<arch>.expert_count > 0` GGUF metadata key wins.
//! 2. If the key is absent, architecture-name match against
//!    `MOE_ARCHITECTURES` (mixtral, qwen2moe, qwen3moe, deepseek2, dbrx,
//!    gptoss, glm4_moe).
//! 3. Otherwise `is_moe = Some(false)`.
//!
//! `expert_layer_count` mirrors `layer_count` when MoE is detected, else
//! `None`. See `data-model.md` § Extraction algorithm.

mod common;

use common::{write_synthetic_gguf, write_synthetic_gguf_with_expert_count};
use nexus_model_metadata::{MetadataExtractor, gguf::GgufExtractor};
use tempfile::TempDir;

#[test]
fn gguf_extract_marks_mixtral_fixture_as_moe() {
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("mixtral_8x7b_header.gguf");
    write_synthetic_gguf_with_expert_count(&path, "llama", 32, 32768, 4096, 8)
        .expect("emit gguf");

    let meta = GgufExtractor::default()
        .extract(&path, "mixtral-test")
        .expect("extract should succeed");

    assert_eq!(meta.is_moe, Some(true));
    assert_eq!(meta.expert_layer_count, Some(32));
    assert_eq!(meta.layer_count, Some(32));
}

#[test]
fn gguf_extract_marks_dense_fixture_as_not_moe() {
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("llama_dense_header.gguf");
    write_synthetic_gguf(&path, "llama", 32, 8192, 4096).expect("emit gguf");

    let meta = GgufExtractor::default()
        .extract(&path, "dense-test")
        .expect("extract should succeed");

    assert_eq!(meta.is_moe, Some(false));
    assert_eq!(meta.expert_layer_count, None);
}

#[test]
fn gguf_extract_arch_name_fallback_marks_qwen3moe_as_moe() {
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("qwen3moe_header.gguf");
    write_synthetic_gguf(&path, "qwen3moe", 48, 32768, 4096).expect("emit gguf");

    let meta = GgufExtractor::default()
        .extract(&path, "qwen3moe-test")
        .expect("extract should succeed");

    assert_eq!(meta.is_moe, Some(true));
    assert_eq!(meta.expert_layer_count, Some(48));
}

#[test]
fn gguf_extract_expert_count_zero_marks_dense() {
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("expert_count_zero.gguf");
    write_synthetic_gguf_with_expert_count(&path, "llama", 32, 8192, 4096, 0)
        .expect("emit gguf");

    let meta = GgufExtractor::default()
        .extract(&path, "zero-experts-test")
        .expect("extract should succeed");

    assert_eq!(meta.is_moe, Some(false));
    assert_eq!(meta.expert_layer_count, None);
}

#[test]
fn gguf_extract_mixtral_arch_fallback_marks_as_moe_without_expert_key() {
    let tmp = TempDir::new().expect("tempdir");
    let path = tmp.path().join("mixtral_arch_only.gguf");
    write_synthetic_gguf(&path, "mixtral", 32, 32768, 4096).expect("emit gguf");

    let meta = GgufExtractor::default()
        .extract(&path, "mixtral-arch-fallback")
        .expect("extract should succeed");

    assert_eq!(meta.is_moe, Some(true));
    assert_eq!(meta.expert_layer_count, Some(32));
}
