//! RED tests for the format-dispatch entrypoint (T019 / spec FR-001 +
//! data-model.md dispatch priority: gguf > safetensors > pytorch_index).
//!
//! These tests pin the selection contract of `dispatch::extract_any` before
//! the real implementation lands in T023. All tests are `#[ignore]`d.

mod common;

use nexus_model_metadata::{ArtifactFormat, ExtractionStatus, extract_any};
use tempfile::tempdir;

#[test]
fn dispatch_prefers_gguf_over_safetensors() {
    let tmp = tempdir().unwrap();
    common::write_synthetic_gguf(&tmp.path().join("model.gguf"), "llama", 32, 4096, 4096)
        .unwrap();
    // A dummy safetensors sentinel is enough — dispatch decides by file
    // presence, not by content at the dispatch layer.
    std::fs::write(tmp.path().join("model.safetensors"), b"").unwrap();

    let meta = extract_any(tmp.path(), "install-gguf-wins");

    assert_eq!(meta.format, ArtifactFormat::Gguf);
}

#[test]
fn dispatch_prefers_safetensors_over_pytorch_index() {
    let tmp = tempdir().unwrap();
    std::fs::write(tmp.path().join("model.safetensors"), b"").unwrap();
    common::write_pytorch_index(tmp.path(), 8, false, false);

    let meta = extract_any(tmp.path(), "install-st-wins");

    assert_eq!(meta.format, ArtifactFormat::Safetensors);
}

#[test]
fn dispatch_pytorch_index_when_alone() {
    let tmp = tempdir().unwrap();
    common::write_pytorch_index(tmp.path(), 12, true, true);

    let meta = extract_any(tmp.path(), "install-pt-only");

    assert_eq!(meta.format, ArtifactFormat::PytorchIndex);
}

#[test]
fn dispatch_unknown_when_nothing_matches() {
    let tmp = tempdir().unwrap();
    std::fs::write(tmp.path().join("readme.txt"), b"hello").unwrap();

    let meta = extract_any(tmp.path(), "install-nothing");

    assert_eq!(meta.format, ArtifactFormat::Unknown);
    assert_eq!(meta.extraction_status, ExtractionStatus::Failed);
}

#[test]
fn dispatch_never_attempts_pickle() {
    let tmp = tempdir().unwrap();
    let bin = tmp.path().join("pytorch_model.bin");
    std::fs::write(&bin, b"\x80\x04REFUSE_TO_UNPICKLE").unwrap();

    let mtime_before = std::fs::metadata(&bin).unwrap().modified().unwrap();

    let meta = extract_any(tmp.path(), "install-pickle-safe");

    let mtime_after = std::fs::metadata(&bin).unwrap().modified().unwrap();
    assert_eq!(mtime_before, mtime_after);

    assert_ne!(meta.extraction_status, ExtractionStatus::Ok);
    assert!(matches!(
        meta.format,
        ArtifactFormat::Unknown | ArtifactFormat::PytorchIndex
    ));
}
