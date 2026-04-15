use std::path::Path;

use crate::error::RuntimeAdapterError;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RequiredBackend {
    LlamaCpp,
    TensorRtLlm,
    Unknown,
}

impl RequiredBackend {
    pub fn as_wire(&self) -> &'static str {
        match self {
            Self::LlamaCpp => "llama.cpp",
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
                entries
                    .filter_map(|e| e.ok())
                    .any(|entry| {
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
    let ok = match (model, backend) {
        (RequiredBackend::LlamaCpp, "llama.cpp") => true,
        (RequiredBackend::TensorRtLlm, "tensorrt_llm") => true,
        (RequiredBackend::Unknown, _) => true,
        _ => false,
    };
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
