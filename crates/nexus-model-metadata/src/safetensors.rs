//! Safetensors metadata extractor.
//!
//! Parses the safetensors binary header (u64 LE length prefix + JSON body),
//! enumerates tensor keys to derive `layer_count` from `model.layers.{i}.*`
//! or `transformer.h.{i}.*` patterns, and reads a sibling `config.json` for
//! `max_context`, `hidden_size`, and a canonicalized `architecture`.
//!
//! Enforces a 10 MiB header cap to avoid allocating attacker-controlled sizes.

use std::fs;
use std::io::Read;
use std::path::{Path, PathBuf};

use serde::Deserialize;
use serde_json::Value;

use crate::model::now_millis;
use crate::{ArtifactFormat, ExtractError, ExtractedMetadata, ExtractionStatus, MetadataExtractor};

const MAX_HEADER_BYTES: u64 = 10 * 1024 * 1024;

#[derive(Debug, Default)]
#[non_exhaustive]
pub struct SafetensorsExtractor;

impl SafetensorsExtractor {
    pub fn new() -> Self {
        Self
    }
}

impl MetadataExtractor for SafetensorsExtractor {
    fn format(&self) -> ArtifactFormat {
        ArtifactFormat::Safetensors
    }

    fn extract(&self, path: &Path, install_id: &str) -> Result<ExtractedMetadata, ExtractError> {
        let resolved = resolve_inputs(path)?;

        let key_universe = match &resolved.shard {
            ShardSource::IndexJson(idx) => read_index_keys(idx)?,
            ShardSource::SafetensorsFile(file) => match read_header_keys(file) {
                Ok(keys) => keys,
                Err(err) => return handle_header_error(err, install_id),
            },
        };

        let layer_from_keys = max_layer_from_keys(&key_universe);

        let config = resolved
            .config
            .as_deref()
            .and_then(|p| read_config(p).ok());

        let layer_count = config
            .as_ref()
            .and_then(|c| c.num_hidden_layers)
            .or(layer_from_keys);

        let max_context = config.as_ref().and_then(|c| c.max_position_embeddings);
        let hidden_size = config.as_ref().and_then(|c| c.hidden_size);
        let architecture = config
            .as_ref()
            .and_then(|c| c.architectures.first())
            .map(|raw| canonicalize_architecture(raw));

        let extraction_status = if config.is_some() {
            ExtractionStatus::Ok
        } else {
            ExtractionStatus::Partial
        };

        Ok(ExtractedMetadata {
            install_id: install_id.to_string(),
            format: ArtifactFormat::Safetensors,
            layer_count,
            max_context,
            architecture,
            hidden_size,
            is_moe: None,
            expert_layer_count: None,
            extraction_status,
            extracted_at: now_millis(),
        })
    }
}

fn handle_header_error(
    err: ExtractError,
    install_id: &str,
) -> Result<ExtractedMetadata, ExtractError> {
    match err {
        ExtractError::MalformedHeader(msg) if msg.starts_with("header too large") => {
            Ok(ExtractedMetadata::failed(
                install_id,
                ArtifactFormat::Safetensors,
            ))
        }
        other => Err(other),
    }
}

enum ShardSource {
    IndexJson(PathBuf),
    SafetensorsFile(PathBuf),
}

struct Resolved {
    shard: ShardSource,
    config: Option<PathBuf>,
}

fn resolve_inputs(path: &Path) -> Result<Resolved, ExtractError> {
    let meta = fs::metadata(path)?;

    if meta.is_dir() {
        let index = path.join("model.safetensors.index.json");
        let shard = if index.exists() {
            ShardSource::IndexJson(index)
        } else {
            let file = find_safetensors_in_dir(path)?;
            ShardSource::SafetensorsFile(file)
        };
        let cfg = path.join("config.json");
        let config = if cfg.exists() { Some(cfg) } else { None };
        return Ok(Resolved { shard, config });
    }

    let parent = path.parent().unwrap_or_else(|| Path::new("."));
    let sibling_cfg = parent.join("config.json");
    let same_dir_cfg = path.with_file_name("config.json");
    let config = if sibling_cfg.exists() {
        Some(sibling_cfg)
    } else if same_dir_cfg.exists() {
        Some(same_dir_cfg)
    } else {
        None
    };

    Ok(Resolved {
        shard: ShardSource::SafetensorsFile(path.to_path_buf()),
        config,
    })
}

fn find_safetensors_in_dir(dir: &Path) -> Result<PathBuf, ExtractError> {
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        let p = entry.path();
        if p.extension().and_then(|s| s.to_str()) == Some("safetensors") {
            return Ok(p);
        }
    }
    Err(ExtractError::MissingSidecar(format!(
        "no .safetensors file in {}",
        dir.display()
    )))
}

fn read_header_keys(path: &Path) -> Result<Vec<String>, ExtractError> {
    let mut file = fs::File::open(path)?;

    let mut len_buf = [0u8; 8];
    file.read_exact(&mut len_buf)?;
    let header_len = u64::from_le_bytes(len_buf);

    if header_len > MAX_HEADER_BYTES {
        return Err(ExtractError::MalformedHeader(format!(
            "header too large: {header_len} bytes exceeds cap {MAX_HEADER_BYTES}"
        )));
    }

    let mut header_bytes = vec![0u8; header_len as usize];
    file.read_exact(&mut header_bytes)?;

    let parsed: Value = serde_json::from_slice(&header_bytes)
        .map_err(|e| ExtractError::MalformedHeader(format!("json parse failed: {e}")))?;

    let obj = parsed.as_object().ok_or_else(|| {
        ExtractError::MalformedHeader("safetensors header is not a json object".to_string())
    })?;

    let keys = obj
        .keys()
        .filter(|k| k.as_str() != "__metadata__")
        .cloned()
        .collect();
    Ok(keys)
}

fn read_index_keys(path: &Path) -> Result<Vec<String>, ExtractError> {
    let bytes = fs::read(path)?;
    let parsed: Value = serde_json::from_slice(&bytes)?;
    let map = parsed
        .get("weight_map")
        .and_then(|v| v.as_object())
        .ok_or_else(|| {
            ExtractError::MalformedHeader(
                "index.json missing weight_map object".to_string(),
            )
        })?;
    Ok(map.keys().cloned().collect())
}

fn max_layer_from_keys(keys: &[String]) -> Option<u32> {
    const PREFIXES: &[&str] = &["model.layers.", "transformer.h."];
    let mut max_idx: Option<u32> = None;
    for key in keys {
        for prefix in PREFIXES {
            if let Some(rest) = key.strip_prefix(*prefix) {
                if let Some(dot) = rest.find('.') {
                    let num = &rest[..dot];
                    if let Ok(n) = num.parse::<u32>() {
                        max_idx = Some(max_idx.map_or(n, |m| m.max(n)));
                    }
                }
                break;
            }
        }
    }
    max_idx.map(|m| m + 1)
}

#[derive(Debug, Deserialize, Default)]
struct ConfigJson {
    #[serde(default)]
    num_hidden_layers: Option<u32>,
    #[serde(default)]
    max_position_embeddings: Option<u32>,
    #[serde(default)]
    hidden_size: Option<u32>,
    #[serde(default)]
    architectures: Vec<String>,
}

fn read_config(path: &Path) -> Result<ConfigJson, ExtractError> {
    let bytes = fs::read(path)?;
    let parsed: ConfigJson = serde_json::from_slice(&bytes)?;
    Ok(parsed)
}

fn canonicalize_architecture(raw: &str) -> String {
    match raw {
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
            let stripped = other
                .strip_suffix("ForCausalLM")
                .or_else(|| other.strip_suffix("LMHeadModel"))
                .unwrap_or(other);
            stripped.to_ascii_lowercase()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn canonicalize_known_families() {
        assert_eq!(canonicalize_architecture("LlamaForCausalLM"), "llama");
        assert_eq!(canonicalize_architecture("Qwen2ForCausalLM"), "qwen2");
        assert_eq!(canonicalize_architecture("GPT2LMHeadModel"), "gpt2");
        assert_eq!(canonicalize_architecture("CohereForCausalLM"), "command-r");
    }

    #[test]
    fn canonicalize_unknown_strips_suffix_and_lowercases() {
        assert_eq!(
            canonicalize_architecture("CustomFooForCausalLM"),
            "customfoo"
        );
        assert_eq!(canonicalize_architecture("MyModelLMHeadModel"), "mymodel");
    }

    #[test]
    fn max_layer_from_llama_keys() {
        let keys: Vec<String> = (0..28)
            .map(|i| format!("model.layers.{i}.weight"))
            .collect();
        assert_eq!(max_layer_from_keys(&keys), Some(28));
    }

    #[test]
    fn max_layer_from_gpt_keys() {
        let keys: Vec<String> = (0..12)
            .map(|i| format!("transformer.h.{i}.attn.c_attn.weight"))
            .collect();
        assert_eq!(max_layer_from_keys(&keys), Some(12));
    }

    #[test]
    fn max_layer_none_when_no_match() {
        let keys = vec!["embeddings.weight".to_string(), "lm_head.weight".to_string()];
        assert_eq!(max_layer_from_keys(&keys), None);
    }
}
