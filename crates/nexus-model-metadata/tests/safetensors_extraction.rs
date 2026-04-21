//! Failing (red) integration tests for the safetensors metadata extractor.
//!
//! T017 from specs/028-gguf-layer-metadata/tasks.md — asserts the FR-001
//! safetensors branch: derive `layer_count` from the `model.layers.{i}.weight`
//! key pattern, prefer `config.json` for `max_context`, `architecture`, and
//! `hidden_size`, reject oversized headers, and fall back to `Partial` when
//! the sidecar is missing.
//!
//! All tests are marked `#[ignore]` until T021 lands the extractor impl.
//! Run them explicitly with `cargo test -- --ignored`.
//!
//! Covers safetensors extraction across: llama/qwen-style `model.layers.{i}.*`,
//! GPT-family `transformer.h.{i}.*`, Falcon `transformer.h.{i}.self_attention.*`,
//! plus `config.json` `architectures` normalization for GPT2, Falcon, and
//! Cohere CommandR checkpoints.

mod common;

use common::{
    ConfigFixture, write_safetensors_config_sidecar, write_safetensors_with_oversized_header,
    write_synthetic_safetensors, write_synthetic_safetensors_with_pattern,
};
use nexus_model_metadata::safetensors::SafetensorsExtractor;
use nexus_model_metadata::{ArtifactFormat, ExtractionStatus, MetadataExtractor};
use tempfile::tempdir;

#[test]

fn safetensors_header_yields_layer_count_from_key_pattern() {
    let dir = tempdir().expect("tempdir");
    let path = write_synthetic_safetensors(dir.path(), 28, None);

    let extractor = SafetensorsExtractor::new();
    let meta = extractor
        .extract(&path, "install-safetensors-llama")
        .expect("extract");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
    assert_eq!(meta.layer_count, Some(28));
    assert_eq!(meta.extraction_status, ExtractionStatus::Partial);
    assert_eq!(meta.install_id, "install-safetensors-llama");
}

#[test]

fn safetensors_config_sidecar_provides_max_context() {
    let dir = tempdir().expect("tempdir");
    let path = write_synthetic_safetensors(dir.path(), 28, Some(ConfigFixture::qwen2_7b()));

    let extractor = SafetensorsExtractor::new();
    let meta = extractor
        .extract(&path, "install-qwen2-7b")
        .expect("extract");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
    assert_eq!(meta.extraction_status, ExtractionStatus::Ok);
    assert_eq!(meta.layer_count, Some(28));
    assert_eq!(meta.max_context, Some(32768));
    assert_eq!(meta.hidden_size, Some(3584));

    // Architecture should be normalized to a lower-case family name
    // ("Qwen2ForCausalLM" -> "qwen2"); we accept any case-insensitive
    // match against "qwen2" to stay tolerant of extractor impl details.
    let arch = meta.architecture.expect("architecture set");
    assert!(
        arch.to_ascii_lowercase().contains("qwen2"),
        "expected architecture to map to qwen2 family, got: {arch}"
    );
}

#[test]

fn safetensors_header_too_large_returns_failed() {
    let dir = tempdir().expect("tempdir");
    let path = write_safetensors_with_oversized_header(dir.path());

    let extractor = SafetensorsExtractor::new();
    // Must not panic; must surface a Failed status either as Ok(meta) with
    // Failed status or via a structured ExtractError — both are acceptable
    // because the extractor may choose to report via ExtractedMetadata.
    match extractor.extract(&path, "install-bogus-header") {
        Ok(meta) => {
            assert_eq!(meta.format, ArtifactFormat::Safetensors);
            assert_eq!(meta.extraction_status, ExtractionStatus::Failed);
            assert_eq!(meta.layer_count, None);
        }
        Err(err) => {
            // A typed error is equally acceptable; just confirm we didn't
            // try to allocate the 20 MiB header (no OOM/panic reached us).
            let msg = err.to_string();
            assert!(
                !msg.is_empty(),
                "error from oversized header must carry a message"
            );
        }
    }
}

#[test]

fn safetensors_key_pattern_non_llama_arch_still_works() {
    // GPT-family key layout: transformer.h.{i}.attn.c_attn.weight
    let dir = tempdir().expect("tempdir");
    let path = write_synthetic_safetensors_with_pattern(
        dir.path(),
        12,
        "transformer.h.{i}.attn.c_attn.weight",
        None,
    );

    let extractor = SafetensorsExtractor::new();
    let meta = extractor.extract(&path, "install-gpt2").expect("extract");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
    assert_eq!(meta.layer_count, Some(12));
    // No config sidecar → architecture may be None; layer count still present.
    assert!(
        meta.architecture.is_none()
            || meta
                .architecture
                .as_ref()
                .is_some_and(|s| !s.trim().is_empty()),
        "architecture must be None or a non-empty string"
    );
}

#[test]

fn safetensors_gpt2_transformer_h_pattern_yields_layer_count() {
    let dir = tempdir().expect("tempdir");
    let path = write_synthetic_safetensors_with_pattern(
        dir.path(),
        12,
        "transformer.h.{i}.attn.c_attn.weight",
        None,
    );

    let extractor = SafetensorsExtractor::new();
    let meta = extractor
        .extract(&path, "install-gpt2-small")
        .expect("extract");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
    assert_eq!(meta.layer_count, Some(12));
}

#[test]

fn safetensors_falcon_transformer_h_self_attention_pattern() {
    let dir = tempdir().expect("tempdir");
    let path = write_synthetic_safetensors_with_pattern(
        dir.path(),
        32,
        "transformer.h.{i}.self_attention.query_key_value.weight",
        None,
    );

    let extractor = SafetensorsExtractor::new();
    let meta = extractor
        .extract(&path, "install-falcon-7b")
        .expect("extract");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
    assert_eq!(meta.layer_count, Some(32));
}

#[test]

fn safetensors_config_json_architectures_variety() {
    let cases: &[(&str, &str)] = &[
        ("GPT2LMHeadModel", "gpt2"),
        ("FalconForCausalLM", "falcon"),
        ("CohereForCausalLM", "command-r"),
    ];

    for (hf_name, expected_family) in cases {
        let dir = tempdir().expect("tempdir");
        let path = write_synthetic_safetensors(dir.path(), 4, None);
        write_safetensors_config_sidecar(
            dir.path(),
            &ConfigFixture {
                max_position_embeddings: Some(4096),
                num_hidden_layers: Some(4),
                hidden_size: Some(128),
                architectures: vec![(*hf_name).to_string()],
            },
        );

        let extractor = SafetensorsExtractor::new();
        let meta = extractor
            .extract(&path, &format!("install-{expected_family}"))
            .expect("extract");

        let arch = meta
            .architecture
            .expect("architecture set from config.json")
            .to_ascii_lowercase();
        assert!(
            arch.contains(expected_family),
            "HF arch {hf_name} should map to canonical family \
             containing {expected_family}, got: {arch}"
        );
    }
}

#[test]

fn safetensors_no_config_sidecar_partial() {
    let dir = tempdir().expect("tempdir");
    let path = write_synthetic_safetensors(dir.path(), 28, None);

    let extractor = SafetensorsExtractor::new();
    let meta = extractor
        .extract(&path, "install-no-sidecar")
        .expect("extract");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
    assert_eq!(meta.extraction_status, ExtractionStatus::Partial);
    assert_eq!(meta.layer_count, Some(28));
    assert_eq!(meta.max_context, None);
    assert_eq!(meta.hidden_size, None);
}
