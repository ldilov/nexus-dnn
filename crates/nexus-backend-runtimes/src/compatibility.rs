use std::path::Path;

use crate::error::RuntimeAdapterError;
use crate::family::RuntimeFamily;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RequiredBackend {
    LlamaCpp,
    TensorRtLlm,
    Unknown,
}

impl RequiredBackend {
    pub fn as_wire(&self) -> &'static str {
        match self {
            Self::LlamaCpp => RuntimeFamily::LLAMA_CPP,
            Self::TensorRtLlm => "tensorrt_llm",
            Self::Unknown => "unknown",
        }
    }
}

pub fn tag_model(path: &Path) -> RequiredBackend {
    if path
        .extension()
        .and_then(|ext| ext.to_str())
        .map(|ext| ext.eq_ignore_ascii_case("gguf"))
        .unwrap_or(false)
    {
        return RequiredBackend::LlamaCpp;
    }
    if path.is_dir() {
        let has_engine = std::fs::read_dir(path)
            .ok()
            .map(|entries| {
                entries.filter_map(|e| e.ok()).any(|entry| {
                    entry
                        .file_name()
                        .to_str()
                        .map(|s| s.ends_with(".engine") || s == "config.json")
                        .unwrap_or(false)
                })
            })
            .unwrap_or(false);
        if has_engine {
            return RequiredBackend::TensorRtLlm;
        }
    }
    RequiredBackend::Unknown
}

pub fn pair_allowed(model: RequiredBackend, backend: &str) -> Result<(), RuntimeAdapterError> {
    let backend_fam = RuntimeFamily::canonical(backend);
    let ok = matches!(
        (model, backend_fam, backend),
        (RequiredBackend::LlamaCpp, Some(RuntimeFamily::LlamaCpp), _)
            | (RequiredBackend::TensorRtLlm, _, "tensorrt_llm")
            | (RequiredBackend::Unknown, _, _)
    );
    if ok {
        Ok(())
    } else {
        Err(RuntimeAdapterError::BackendUnavailable(format!(
            "model requires {} but backend {} selected",
            model.as_wire(),
            backend
        )))
    }
}
