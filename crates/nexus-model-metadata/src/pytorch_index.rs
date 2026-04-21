//! PyTorch `*.index.json` sidecar metadata extractor.
//!
//! SECURITY INVARIANT: this extractor must never open, read, or deserialize
//! any `*.bin` file. PyTorch `.bin` files are Python pickle streams and
//! deserialization is equivalent to arbitrary code execution (ACE) on
//! potentially untrusted downloads. Only the sidecar
//! `pytorch_model.bin.index.json` and the sibling `config.json` are parsed.

use std::path::{Path, PathBuf};

use serde_json::Value;

use crate::{
    ArtifactFormat, ExtractError, ExtractedMetadata, ExtractionStatus, MetadataExtractor,
    model::now_millis,
};

const SIDECAR_FILE: &str = "pytorch_model.bin.index.json";
const CONFIG_FILE: &str = "config.json";

#[derive(Debug, Default)]
#[non_exhaustive]
pub struct PytorchIndexExtractor;

impl PytorchIndexExtractor {
    pub fn new() -> Self {
        Self
    }
}

impl MetadataExtractor for PytorchIndexExtractor {
    fn format(&self) -> ArtifactFormat {
        ArtifactFormat::PytorchIndex
    }

    fn extract(&self, path: &Path, install_id: &str) -> Result<ExtractedMetadata, ExtractError> {
        let (sidecar_path, dir) = match resolve_sidecar(path) {
            Some(pair) => pair,
            None => return Ok(failed(install_id)),
        };

        let raw = match std::fs::read(&sidecar_path) {
            Ok(bytes) => bytes,
            Err(_) => return Ok(failed(install_id)),
        };

        let parsed: Value = match serde_json::from_slice(&raw) {
            Ok(value) => value,
            Err(_) => return Ok(failed(install_id)),
        };

        let layer_from_keys = infer_layer_count_from_weight_map(&parsed);

        let config = dir
            .as_ref()
            .map(|d| d.join(CONFIG_FILE))
            .and_then(|p| std::fs::read(&p).ok())
            .and_then(|bytes| serde_json::from_slice::<Value>(&bytes).ok());

        match config {
            Some(cfg) => Ok(build_ok(install_id, &cfg, layer_from_keys)),
            None => Ok(build_partial(install_id, layer_from_keys)),
        }
    }
}

fn resolve_sidecar(path: &Path) -> Option<(PathBuf, Option<PathBuf>)> {
    if path.is_file() {
        let name = path.file_name().and_then(|n| n.to_str()).unwrap_or("");
        if name.ends_with(".index.json") {
            let parent = path.parent().map(Path::to_path_buf);
            return Some((path.to_path_buf(), parent));
        }
        return None;
    }

    if path.is_dir() {
        let candidate = path.join(SIDECAR_FILE);
        if candidate.is_file() {
            return Some((candidate, Some(path.to_path_buf())));
        }
        let found = std::fs::read_dir(path).ok()?.flatten().find_map(|entry| {
            let p = entry.path();
            let name = p.file_name().and_then(|n| n.to_str()).unwrap_or("");
            if name.ends_with(".index.json") && p.is_file() {
                Some(p)
            } else {
                None
            }
        });
        if let Some(p) = found {
            return Some((p, Some(path.to_path_buf())));
        }
    }

    None
}

fn infer_layer_count_from_weight_map(root: &Value) -> Option<u32> {
    let weight_map = root.get("weight_map")?.as_object()?;
    let mut max_index: Option<u32> = None;
    for key in weight_map.keys() {
        if let Some(idx) = extract_layer_index(key) {
            max_index = Some(max_index.map_or(idx, |m| m.max(idx)));
        }
    }
    max_index.map(|m| m + 1)
}

fn extract_layer_index(key: &str) -> Option<u32> {
    const PREFIXES: &[&str] = &["model.layers.", "transformer.h."];
    for prefix in PREFIXES {
        if let Some(rest) = key.strip_prefix(prefix) {
            let end = rest.find('.').unwrap_or(rest.len());
            let digits = &rest[..end];
            if !digits.is_empty() && digits.chars().all(|c| c.is_ascii_digit()) {
                return digits.parse::<u32>().ok();
            }
        }
    }
    None
}

fn build_partial(install_id: &str, layer_count: Option<u32>) -> ExtractedMetadata {
    ExtractedMetadata {
        install_id: install_id.to_string(),
        format: ArtifactFormat::PytorchIndex,
        layer_count,
        max_context: None,
        architecture: None,
        hidden_size: None,
        extraction_status: ExtractionStatus::Partial,
        extracted_at: now_millis(),
    }
}

fn build_ok(
    install_id: &str,
    config: &Value,
    layer_from_keys: Option<u32>,
) -> ExtractedMetadata {
    let layer_count = read_u32(config, "num_hidden_layers").or(layer_from_keys);
    let max_context = read_u32(config, "max_position_embeddings");
    let hidden_size = read_u32(config, "hidden_size");

    let architecture = config
        .get("architectures")
        .and_then(|v| v.as_array())
        .and_then(|arr| arr.first())
        .and_then(|v| v.as_str())
        .map(canonicalize_architecture);

    ExtractedMetadata {
        install_id: install_id.to_string(),
        format: ArtifactFormat::PytorchIndex,
        layer_count,
        max_context,
        architecture,
        hidden_size,
        extraction_status: ExtractionStatus::Ok,
        extracted_at: now_millis(),
    }
}

fn read_u32(value: &Value, key: &str) -> Option<u32> {
    value.get(key)?.as_u64().and_then(|n| u32::try_from(n).ok())
}

fn failed(install_id: &str) -> ExtractedMetadata {
    ExtractedMetadata::failed(install_id, ArtifactFormat::PytorchIndex)
}

/// Canonicalize a Hugging Face `architectures[0]` class name into the short
/// family identifier used by the nexus-dnn metadata layer. Shared contract
/// with the safetensors extractor (see `src/safetensors.rs`).
pub(crate) fn canonicalize_architecture(class: &str) -> String {
    match class {
        "LlamaForCausalLM" => "llama".to_string(),
        "Qwen2ForCausalLM" => "qwen2".to_string(),
        "MistralForCausalLM" => "mistral".to_string(),
        "PhiForCausalLM" => "phi".to_string(),
        "Phi3ForCausalLM" => "phi3".to_string(),
        "GemmaForCausalLM" => "gemma".to_string(),
        "Gemma2ForCausalLM" => "gemma2".to_string(),
        "GPT2LMHeadModel" => "gpt2".to_string(),
        "FalconForCausalLM" => "falcon".to_string(),
        "CohereForCausalLM" => "command-r".to_string(),
        "Starcoder2ForCausalLM" => "starcoder2".to_string(),
        other => {
            let trimmed = other
                .strip_suffix("ForCausalLM")
                .or_else(|| other.strip_suffix("LMHeadModel"))
                .unwrap_or(other);
            trimmed.to_ascii_lowercase()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn extracts_layer_index_from_llama_key() {
        assert_eq!(
            extract_layer_index("model.layers.23.self_attn.q_proj.weight"),
            Some(23)
        );
    }

    #[test]
    fn extracts_layer_index_from_gpt2_key() {
        assert_eq!(
            extract_layer_index("transformer.h.11.attn.c_attn.weight"),
            Some(11)
        );
    }

    #[test]
    fn ignores_unrelated_keys() {
        assert_eq!(extract_layer_index("lm_head.weight"), None);
        assert_eq!(extract_layer_index("model.embed_tokens.weight"), None);
    }

    #[test]
    fn canonicalizes_known_architectures() {
        assert_eq!(canonicalize_architecture("LlamaForCausalLM"), "llama");
        assert_eq!(canonicalize_architecture("GPT2LMHeadModel"), "gpt2");
        assert_eq!(canonicalize_architecture("CohereForCausalLM"), "command-r");
    }

    #[test]
    fn canonicalizes_unknown_architecture() {
        assert_eq!(
            canonicalize_architecture("MyNovelForCausalLM"),
            "mynovel"
        );
    }
}
