use nexus_local_llm::compatibility::{RequiredBackend, pair_allowed, tag_model};
use std::path::PathBuf;

#[test]
fn gguf_tagged_llamacpp() {
    let p = PathBuf::from("/models/Qwen.gguf");
    assert_eq!(tag_model(&p), RequiredBackend::LlamaCpp);
}

#[test]
fn gguf_pair_with_llamacpp_allowed() {
    assert!(pair_allowed(RequiredBackend::LlamaCpp, "llama.cpp").is_ok());
}

#[test]
fn gguf_pair_with_tensorrt_blocked() {
    assert!(pair_allowed(RequiredBackend::LlamaCpp, "tensorrt_llm").is_err());
}

#[test]
fn unknown_pair_allowed() {
    assert!(pair_allowed(RequiredBackend::Unknown, "llama.cpp").is_ok());
}
