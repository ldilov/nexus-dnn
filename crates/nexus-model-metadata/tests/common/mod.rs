//! Shared test helpers for GGUF extraction tests.
//!
//! Emits minimal synthetic GGUF v3 byte buffers containing only the
//! metadata key-value pairs needed to exercise layer/arch extraction.
//! No tensor payload is emitted (tensor_count = 0).
//!
//! GGUF v3 layout reference: https://github.com/ggml-org/ggml/blob/master/docs/gguf.md

#![allow(dead_code)]

use byteorder::{LittleEndian, WriteBytesExt};
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};

// GGUF metadata value type tags (GGUF v3).
const GGUF_TYPE_UINT32: u32 = 4;
const GGUF_TYPE_UINT64: u32 = 10;
const GGUF_TYPE_STRING: u32 = 8;

const GGUF_MAGIC: &[u8; 4] = b"GGUF";
const GGUF_VERSION: u32 = 3;

/// Write a GGUF string (u64 length + UTF-8 bytes, no null terminator).
fn write_gguf_string<W: Write>(w: &mut W, s: &str) -> std::io::Result<()> {
    w.write_u64::<LittleEndian>(s.len() as u64)?;
    w.write_all(s.as_bytes())?;
    Ok(())
}

/// Write one metadata KV pair: key-string, then type-tag + value.
fn write_kv_string<W: Write>(w: &mut W, key: &str, value: &str) -> std::io::Result<()> {
    write_gguf_string(w, key)?;
    w.write_u32::<LittleEndian>(GGUF_TYPE_STRING)?;
    write_gguf_string(w, value)?;
    Ok(())
}

fn write_kv_u32<W: Write>(w: &mut W, key: &str, value: u32) -> std::io::Result<()> {
    write_gguf_string(w, key)?;
    w.write_u32::<LittleEndian>(GGUF_TYPE_UINT32)?;
    w.write_u32::<LittleEndian>(value)?;
    Ok(())
}

/// Synthesize a minimal valid GGUF v3 file with architecture metadata only.
///
/// Produces the header (magic, version, tensor_count=0, metadata_kv_count=4)
/// followed by four KV pairs:
///   - general.architecture  (string)
///   - <arch>.block_count    (u32)
///   - <arch>.context_length (u32)
///   - <arch>.embedding_length (u32)
pub fn write_synthetic_gguf(
    path: &Path,
    arch: &str,
    block_count: u32,
    ctx_len: u32,
    embd: u32,
) -> std::io::Result<()> {
    let mut buf: Vec<u8> = Vec::new();

    buf.write_all(GGUF_MAGIC)?;
    buf.write_u32::<LittleEndian>(GGUF_VERSION)?;
    // tensor_count (u64) = 0
    buf.write_u64::<LittleEndian>(0)?;
    // metadata_kv_count (u64) = 4
    buf.write_u64::<LittleEndian>(4)?;

    write_kv_string(&mut buf, "general.architecture", arch)?;
    write_kv_u32(&mut buf, &format!("{arch}.block_count"), block_count)?;
    write_kv_u32(&mut buf, &format!("{arch}.context_length"), ctx_len)?;
    write_kv_u32(&mut buf, &format!("{arch}.embedding_length"), embd)?;

    std::fs::write(path, &buf)?;
    Ok(())
}

/// Synthesize a minimal GGUF v3 file with architecture metadata plus an
/// explicit `<arch>.expert_count` KV. Used to exercise the MoE detection
/// path that prefers the GGUF metadata key over architecture-name fallback.
pub fn write_synthetic_gguf_with_expert_count(
    path: &Path,
    arch: &str,
    block_count: u32,
    ctx_len: u32,
    embd: u32,
    expert_count: u32,
) -> std::io::Result<()> {
    let mut buf: Vec<u8> = Vec::new();

    buf.write_all(GGUF_MAGIC)?;
    buf.write_u32::<LittleEndian>(GGUF_VERSION)?;
    buf.write_u64::<LittleEndian>(0)?;
    buf.write_u64::<LittleEndian>(5)?;

    write_kv_string(&mut buf, "general.architecture", arch)?;
    write_kv_u32(&mut buf, &format!("{arch}.block_count"), block_count)?;
    write_kv_u32(&mut buf, &format!("{arch}.context_length"), ctx_len)?;
    write_kv_u32(&mut buf, &format!("{arch}.embedding_length"), embd)?;
    write_kv_u32(&mut buf, &format!("{arch}.expert_count"), expert_count)?;

    std::fs::write(path, &buf)?;
    Ok(())
}

/// Synthesize a GGUF file whose architecture key is present but not one of
/// the known family names the extractor maps to a `<arch>.block_count` key.
///
/// The file is structurally valid; only the architecture value is unknown.
/// We intentionally write NO `<arch>.block_count` KV so a correct extractor
/// cannot recover layer_count.
pub fn write_gguf_unknown_arch(path: &Path, arch: &str) -> std::io::Result<()> {
    let mut buf: Vec<u8> = Vec::new();

    buf.write_all(GGUF_MAGIC)?;
    buf.write_u32::<LittleEndian>(GGUF_VERSION)?;
    buf.write_u64::<LittleEndian>(0)?;
    buf.write_u64::<LittleEndian>(1)?; // only the architecture KV

    write_kv_string(&mut buf, "general.architecture", arch)?;

    std::fs::write(path, &buf)?;
    Ok(())
}

/// Synthesize a truncated/corrupt GGUF: valid magic but header is cut off
/// before tensor/metadata counts — any correct parser must fail gracefully.
pub fn write_gguf_truncated(path: &Path) -> std::io::Result<()> {
    let mut buf: Vec<u8> = Vec::new();
    buf.write_all(GGUF_MAGIC)?;
    buf.write_u32::<LittleEndian>(GGUF_VERSION)?;
    // Stop here — tensor_count and metadata_kv_count u64s are missing.
    std::fs::write(path, &buf)?;
    Ok(())
}

// -------------------------------------------------------------------------
// PyTorch index sidecar helpers (pytorch_model.bin.index.json)
// -------------------------------------------------------------------------

/// Write a `pytorch_model.bin.index.json` sidecar describing a model with the
/// given number of transformer decoder layers. Each layer contributes two
/// weight entries partitioned across two shard files. Optionally writes a
/// `config.json` and/or empty `.bin` shard files alongside the sidecar.
///
/// Returns the absolute path to the written `pytorch_model.bin.index.json`.
pub fn write_pytorch_index(
    dir: &Path,
    layer_count: u32,
    with_config: bool,
    include_bin_files: bool,
) -> PathBuf {
    fs::create_dir_all(dir).expect("create pytorch index dir");

    let shard_a = "pytorch_model-00001-of-00002.bin";
    let shard_b = "pytorch_model-00002-of-00002.bin";

    let mut weight_map = serde_json::Map::new();
    let half = layer_count / 2;
    for layer_idx in 0..layer_count {
        let shard = if layer_idx < half { shard_a } else { shard_b };
        weight_map.insert(
            format!("model.layers.{layer_idx}.self_attn.q_proj.weight"),
            serde_json::Value::String(shard.to_string()),
        );
        weight_map.insert(
            format!("model.layers.{layer_idx}.mlp.gate_proj.weight"),
            serde_json::Value::String(shard.to_string()),
        );
    }

    let sidecar = serde_json::json!({
        "metadata": { "total_size": 0 },
        "weight_map": serde_json::Value::Object(weight_map),
    });

    let sidecar_path = dir.join("pytorch_model.bin.index.json");
    fs::write(&sidecar_path, serde_json::to_vec_pretty(&sidecar).unwrap())
        .expect("write index.json");

    if with_config {
        let config = serde_json::json!({
            "architectures": ["LlamaForCausalLM"],
            "num_hidden_layers": layer_count,
            "max_position_embeddings": 4096,
            "hidden_size": 4096,
        });
        fs::write(
            dir.join("config.json"),
            serde_json::to_vec_pretty(&config).unwrap(),
        )
        .expect("write config.json");
    }

    if include_bin_files {
        fs::write(dir.join(shard_a), b"").expect("write shard a");
        fs::write(dir.join(shard_b), b"").expect("write shard b");
    }

    sidecar_path
}

/// Like [`write_pytorch_index`] but lets the caller override the weight-map
/// key pattern to cover non-llama architectures (GPT-family uses
/// `transformer.h.{i}.*`, Falcon uses `transformer.h.{i}.self_attention.*`).
/// The pattern must contain the `{i}` placeholder; it is expanded once per
/// layer index. Two sibling keys per layer are emitted so the layer-count
/// inference cannot collapse to a trivial single-key match.
pub fn write_pytorch_index_with_patterns(
    dir: &Path,
    layer_count: u32,
    key_patterns: &[&str],
    with_config: bool,
    config_architectures: &[&str],
) -> PathBuf {
    fs::create_dir_all(dir).expect("create pytorch index dir");

    let shard_a = "pytorch_model-00001-of-00002.bin";
    let shard_b = "pytorch_model-00002-of-00002.bin";

    let mut weight_map = serde_json::Map::new();
    let half = layer_count / 2;
    for layer_idx in 0..layer_count {
        let shard = if layer_idx < half { shard_a } else { shard_b };
        for pat in key_patterns {
            let key = pat.replace("{i}", &layer_idx.to_string());
            weight_map.insert(key, serde_json::Value::String(shard.to_string()));
        }
    }

    let sidecar = serde_json::json!({
        "metadata": { "total_size": 0 },
        "weight_map": serde_json::Value::Object(weight_map),
    });

    let sidecar_path = dir.join("pytorch_model.bin.index.json");
    fs::write(&sidecar_path, serde_json::to_vec_pretty(&sidecar).unwrap())
        .expect("write index.json");

    if with_config {
        let config = serde_json::json!({
            "architectures": config_architectures,
            "num_hidden_layers": layer_count,
            "max_position_embeddings": 4096,
            "hidden_size": 4096,
        });
        fs::write(
            dir.join("config.json"),
            serde_json::to_vec_pretty(&config).unwrap(),
        )
        .expect("write config.json");
    }

    sidecar_path
}

/// Write an `.index.json` sidecar containing deliberately invalid JSON so
/// extractors can exercise the malformed-sidecar branch.
pub fn write_malformed_pytorch_index(dir: &Path) -> PathBuf {
    fs::create_dir_all(dir).expect("create pytorch index dir");
    let path = dir.join("pytorch_model.bin.index.json");
    fs::write(&path, b"{ this is : not json, ").expect("write malformed index.json");
    path
}

// -------------------------------------------------------------------------
// Safetensors test fixtures (T017)
// -------------------------------------------------------------------------

/// Config-sidecar fixture values for synthetic safetensors fixtures.
#[derive(Debug, Clone, Default)]
pub struct ConfigFixture {
    pub max_position_embeddings: Option<u32>,
    pub num_hidden_layers: Option<u32>,
    pub hidden_size: Option<u32>,
    pub architectures: Vec<String>,
}

impl ConfigFixture {
    /// Realistic Qwen2-7B config sidecar.
    pub fn qwen2_7b() -> Self {
        Self {
            max_position_embeddings: Some(32768),
            num_hidden_layers: Some(28),
            hidden_size: Some(3584),
            architectures: vec!["Qwen2ForCausalLM".to_string()],
        }
    }
}

/// Write a synthetic safetensors file with `layer_count` layers whose keys
/// follow the default `model.layers.{i}.weight` pattern. If a config sidecar
/// is provided, also write a `config.json` next to the model file.
///
/// Layout: `u64 LE header_length` + JSON header + minimal tensor body.
/// Returns the path to the written `.safetensors` file.
pub fn write_synthetic_safetensors(
    dir: &Path,
    layer_count: u32,
    with_config: Option<ConfigFixture>,
) -> PathBuf {
    write_synthetic_safetensors_with_pattern(
        dir,
        layer_count,
        "model.layers.{i}.weight",
        with_config,
    )
}

/// Same as [`write_synthetic_safetensors`] but lets the caller override the
/// key pattern (used to test non-llama architectures such as GPT).
pub fn write_synthetic_safetensors_with_pattern(
    dir: &Path,
    layer_count: u32,
    key_pattern: &str,
    with_config: Option<ConfigFixture>,
) -> PathBuf {
    fs::create_dir_all(dir).expect("create fixture dir");

    let mut entries = serde_json::Map::new();
    // Required metadata field per safetensors spec.
    entries.insert(
        "__metadata__".to_string(),
        serde_json::json!({ "format": "pt" }),
    );

    for i in 0..layer_count {
        let key = key_pattern.replace("{i}", &i.to_string());
        entries.insert(
            key,
            serde_json::json!({
                "dtype": "F32",
                "shape": [1, 1],
                "data_offsets": [0, 4],
            }),
        );
    }

    let header = serde_json::to_vec(&serde_json::Value::Object(entries))
        .expect("serialize safetensors header");
    let header_len = header.len() as u64;

    let path = dir.join("model.safetensors");
    let mut f = fs::File::create(&path).expect("create safetensors file");
    f.write_u64::<LittleEndian>(header_len)
        .expect("write header len");
    f.write_all(&header).expect("write header");
    // 4-byte zero tensor body — satisfies data_offsets = [0, 4].
    f.write_all(&[0u8; 4]).expect("write tensor body");

    if let Some(cfg) = with_config {
        write_safetensors_config_sidecar(dir, &cfg);
    }

    path
}

/// Write a Hugging Face `config.json` sidecar into `dir` from a
/// [`ConfigFixture`]. Distinct name from the pytorch-branch helper to avoid
/// clashes with other test fixtures in this module.
pub fn write_safetensors_config_sidecar(dir: &Path, cfg: &ConfigFixture) {
    let mut obj = serde_json::Map::new();
    if let Some(v) = cfg.max_position_embeddings {
        obj.insert("max_position_embeddings".to_string(), serde_json::json!(v));
    }
    if let Some(v) = cfg.num_hidden_layers {
        obj.insert("num_hidden_layers".to_string(), serde_json::json!(v));
    }
    if let Some(v) = cfg.hidden_size {
        obj.insert("hidden_size".to_string(), serde_json::json!(v));
    }
    if !cfg.architectures.is_empty() {
        obj.insert(
            "architectures".to_string(),
            serde_json::json!(cfg.architectures),
        );
    }
    let path = dir.join("config.json");
    fs::write(&path, serde_json::to_vec_pretty(&obj).unwrap()).expect("write config.json");
}

/// Write a safetensors file with a deliberately oversized header length prefix
/// (20 MiB), used to verify that extractors enforce the 10 MiB cap without
/// attempting to read the bogus header.
pub fn write_safetensors_with_oversized_header(dir: &Path) -> PathBuf {
    fs::create_dir_all(dir).expect("create fixture dir");
    let path = dir.join("model.safetensors");
    let mut f = fs::File::create(&path).expect("create safetensors file");
    let bogus_len: u64 = 20 * 1024 * 1024;
    f.write_u64::<LittleEndian>(bogus_len)
        .expect("write bogus len");
    // Small stub body — extractor should refuse before reading this much.
    f.write_all(&[0u8; 64]).expect("write stub body");
    path
}
