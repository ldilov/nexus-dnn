//! GGUF metadata extractor.
//!
//! Parses the GGUF v2/v3 header and the metadata key-value table to recover
//! architecture, layer count (`<arch>.block_count`), context length
//! (`<arch>.context_length`), and hidden size (`<arch>.embedding_length`).
//!
//! No tensor data is read; tensor info entries are not consumed either — we
//! only scan the metadata KV block. Unknown value types abort the scan safely
//! and degrade to whatever was learned so far.
//!
//! Reference: <https://github.com/ggml-org/ggml/blob/master/docs/gguf.md>

use std::fs::File;
use std::io::{BufReader, Read};
use std::path::Path;

use byteorder::{LittleEndian, ReadBytesExt};

use crate::{
    ArtifactFormat, ExtractError, ExtractedMetadata, ExtractionStatus, MetadataExtractor,
    model::now_millis,
};

const GGUF_MAGIC: [u8; 4] = *b"GGUF";
const GGUF_VERSION_MIN: u32 = 2;
const GGUF_VERSION_MAX: u32 = 3;

const MAX_STRING_BYTES: u64 = 1 << 20;
const MAX_ARRAY_ELEMS: u64 = 1 << 20;

const GGUF_TYPE_UINT8: u32 = 0;
const GGUF_TYPE_INT8: u32 = 1;
const GGUF_TYPE_UINT16: u32 = 2;
const GGUF_TYPE_INT16: u32 = 3;
const GGUF_TYPE_UINT32: u32 = 4;
const GGUF_TYPE_INT32: u32 = 5;
const GGUF_TYPE_FLOAT32: u32 = 6;
const GGUF_TYPE_BOOL: u32 = 7;
const GGUF_TYPE_STRING: u32 = 8;
const GGUF_TYPE_ARRAY: u32 = 9;
const GGUF_TYPE_UINT64: u32 = 10;
const GGUF_TYPE_INT64: u32 = 11;
const GGUF_TYPE_FLOAT64: u32 = 12;

#[derive(Debug, Clone)]
enum MetaValue {
    UInt(u64),
    Int(i64),
    String(String),
    Other,
}

#[derive(Default)]
pub struct GgufExtractor;

impl GgufExtractor {
    pub fn new() -> Self {
        Self
    }
}

impl MetadataExtractor for GgufExtractor {
    fn format(&self) -> ArtifactFormat {
        ArtifactFormat::Gguf
    }

    fn extract(&self, path: &Path, install_id: &str) -> Result<ExtractedMetadata, ExtractError> {
        let file = File::open(path)?;
        let mut reader = BufReader::new(file);

        parse_header(&mut reader)?;

        let kv_count = reader.read_u64::<LittleEndian>()?;

        let mut architecture: Option<String> = None;
        let mut unsigned_fields: Vec<(String, u64)> = Vec::new();

        for _ in 0..kv_count {
            let key = read_string(&mut reader)?;
            let type_tag = reader.read_u32::<LittleEndian>()?;
            let value = read_value(&mut reader, type_tag)?;

            match value {
                MetaValue::String(s) if key == "general.architecture" => {
                    architecture = Some(s);
                }
                MetaValue::UInt(v) => unsigned_fields.push((key, v)),
                MetaValue::Int(v) if v >= 0 => unsigned_fields.push((key, v as u64)),
                _ => {}
            }
        }

        build_metadata(install_id, architecture, &unsigned_fields)
    }
}

fn parse_header<R: Read>(reader: &mut R) -> Result<(), ExtractError> {
    let mut magic = [0u8; 4];
    reader.read_exact(&mut magic)?;
    if magic != GGUF_MAGIC {
        return Err(ExtractError::MalformedHeader(format!(
            "expected GGUF magic, got {magic:?}"
        )));
    }
    let version = reader.read_u32::<LittleEndian>()?;
    if !(GGUF_VERSION_MIN..=GGUF_VERSION_MAX).contains(&version) {
        return Err(ExtractError::MalformedHeader(format!(
            "unsupported GGUF version {version}"
        )));
    }
    let _tensor_count = reader.read_u64::<LittleEndian>()?;
    Ok(())
}

fn read_string<R: Read>(reader: &mut R) -> Result<String, ExtractError> {
    let len = reader.read_u64::<LittleEndian>()?;
    if len > MAX_STRING_BYTES {
        return Err(ExtractError::MalformedHeader(format!(
            "gguf string length {len} exceeds cap"
        )));
    }
    let mut buf = vec![0u8; len as usize];
    reader.read_exact(&mut buf)?;
    String::from_utf8(buf).map_err(|e| ExtractError::MalformedHeader(e.to_string()))
}

fn read_value<R: Read>(reader: &mut R, type_tag: u32) -> Result<MetaValue, ExtractError> {
    match type_tag {
        GGUF_TYPE_UINT8 => {
            let mut b = [0u8; 1];
            reader.read_exact(&mut b)?;
            Ok(MetaValue::UInt(b[0] as u64))
        }
        GGUF_TYPE_INT8 => {
            let mut b = [0u8; 1];
            reader.read_exact(&mut b)?;
            Ok(MetaValue::Int(b[0] as i8 as i64))
        }
        GGUF_TYPE_UINT16 => Ok(MetaValue::UInt(reader.read_u16::<LittleEndian>()? as u64)),
        GGUF_TYPE_INT16 => Ok(MetaValue::Int(reader.read_i16::<LittleEndian>()? as i64)),
        GGUF_TYPE_UINT32 => Ok(MetaValue::UInt(reader.read_u32::<LittleEndian>()? as u64)),
        GGUF_TYPE_INT32 => Ok(MetaValue::Int(reader.read_i32::<LittleEndian>()? as i64)),
        GGUF_TYPE_FLOAT32 => {
            let _ = reader.read_f32::<LittleEndian>()?;
            Ok(MetaValue::Other)
        }
        GGUF_TYPE_BOOL => {
            let mut b = [0u8; 1];
            reader.read_exact(&mut b)?;
            Ok(MetaValue::Other)
        }
        GGUF_TYPE_STRING => Ok(MetaValue::String(read_string(reader)?)),
        GGUF_TYPE_UINT64 => Ok(MetaValue::UInt(reader.read_u64::<LittleEndian>()?)),
        GGUF_TYPE_INT64 => Ok(MetaValue::Int(reader.read_i64::<LittleEndian>()?)),
        GGUF_TYPE_FLOAT64 => {
            let _ = reader.read_f64::<LittleEndian>()?;
            Ok(MetaValue::Other)
        }
        GGUF_TYPE_ARRAY => {
            let elem_type = reader.read_u32::<LittleEndian>()?;
            let count = reader.read_u64::<LittleEndian>()?;
            if count > MAX_ARRAY_ELEMS {
                return Err(ExtractError::MalformedHeader(format!(
                    "gguf array length {count} exceeds cap"
                )));
            }
            for _ in 0..count {
                let _ = read_value(reader, elem_type)?;
            }
            Ok(MetaValue::Other)
        }
        other => Err(ExtractError::MalformedHeader(format!(
            "unknown gguf value type tag {other}"
        ))),
    }
}

const MOE_ARCHITECTURES: &[&str] = &[
    "mixtral",
    "qwen2moe",
    "qwen3moe",
    "deepseek2",
    "dbrx",
    "gptoss",
    "glm4_moe",
];

fn build_metadata(
    install_id: &str,
    architecture: Option<String>,
    unsigned_fields: &[(String, u64)],
) -> Result<ExtractedMetadata, ExtractError> {
    let Some(arch) = architecture else {
        return Ok(ExtractedMetadata {
            install_id: install_id.to_string(),
            format: ArtifactFormat::Gguf,
            extraction_status: ExtractionStatus::Partial,
            extracted_at: now_millis(),
            ..ExtractedMetadata::default()
        });
    };

    let block_key = format!("{arch}.block_count");
    let ctx_key = format!("{arch}.context_length");
    let embd_key = format!("{arch}.embedding_length");

    let layer_count = lookup_u32(unsigned_fields, &block_key);
    let max_context = lookup_u32(unsigned_fields, &ctx_key);
    let hidden_size = lookup_u32(unsigned_fields, &embd_key);
    let is_moe = detect_moe(&arch, unsigned_fields);
    let expert_layer_count = if is_moe == Some(true) {
        layer_count
    } else {
        None
    };

    let status = if layer_count.is_some() && max_context.is_some() && hidden_size.is_some() {
        ExtractionStatus::Ok
    } else {
        ExtractionStatus::Partial
    };

    Ok(ExtractedMetadata {
        install_id: install_id.to_string(),
        format: ArtifactFormat::Gguf,
        layer_count,
        max_context,
        architecture: Some(arch),
        hidden_size,
        is_moe,
        expert_layer_count,
        extraction_status: status,
        extracted_at: now_millis(),
    })
}

fn detect_moe(arch: &str, unsigned_fields: &[(String, u64)]) -> Option<bool> {
    let expert_count_key = format!("{arch}.expert_count");
    if let Some(count) = lookup_u32(unsigned_fields, &expert_count_key) {
        return Some(count > 0);
    }
    if MOE_ARCHITECTURES.iter().any(|name| *name == arch) {
        return Some(true);
    }
    Some(false)
}

fn lookup_u32(fields: &[(String, u64)], key: &str) -> Option<u32> {
    fields
        .iter()
        .find(|(k, _)| k == key)
        .and_then(|(_, v)| u32::try_from(*v).ok())
}
