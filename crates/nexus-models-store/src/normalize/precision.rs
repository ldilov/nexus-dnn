//! Precision inference.
//!
//! Rules per research R3:
//! - `.gguf` / `.ggml` → `(Quantized, Explicit)` (the quant label is on
//!   the variant, not the precision axis).
//! - `.safetensors` → explicit only if the HF safetensors payload
//!   surfaces a dominant dtype; otherwise inferred from filename
//!   tokens; otherwise `Unknown`.
//! - `.bin` / `.pth` → always `Inferred` or `Unknown`.

use crate::types::{Format, Precision, PrecisionSource};

/// Infer precision for a single artifact from its format, filename,
/// and any explicit dtype hint the caller extracted from HF metadata.
#[must_use]
pub fn infer_precision(
    format: Format,
    filename: &str,
    explicit_dtype: Option<&str>,
) -> (Precision, PrecisionSource) {
    if matches!(format, Format::Gguf | Format::Ggml) {
        return (Precision::Quantized, PrecisionSource::Explicit);
    }
    if let Some(p) = explicit_dtype.and_then(parse_dtype) {
        return (p, PrecisionSource::Explicit);
    }
    let lower = filename.to_ascii_lowercase();
    if let Some(p) = scan_filename(&lower) {
        return (p, PrecisionSource::Inferred);
    }
    (Precision::Unknown, PrecisionSource::Unknown)
}

fn parse_dtype(dtype: &str) -> Option<Precision> {
    let lower = dtype.to_ascii_lowercase();
    match lower.as_str() {
        "f32" | "fp32" | "float32" => Some(Precision::Fp32),
        "f16" | "fp16" | "float16" => Some(Precision::Fp16),
        "bf16" | "bfloat16" => Some(Precision::Bf16),
        "i8" | "int8" | "u8" | "uint8" => Some(Precision::Int8),
        _ => None,
    }
}

fn scan_filename(lower: &str) -> Option<Precision> {
    if lower.contains("-fp32") || lower.contains("_fp32") || lower.contains(".fp32") {
        return Some(Precision::Fp32);
    }
    if lower.contains("-bf16") || lower.contains("_bf16") || lower.contains(".bf16") {
        return Some(Precision::Bf16);
    }
    if lower.contains("-fp16") || lower.contains("_fp16") || lower.contains(".fp16") {
        return Some(Precision::Fp16);
    }
    if lower.contains("-int8") || lower.contains("_int8") || lower.contains("-awq")
        || lower.contains("-gptq")
    {
        return Some(Precision::Int8);
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn gguf_is_always_quantized_and_explicit() {
        let (p, s) = infer_precision(Format::Gguf, "llama-Q4.gguf", None);
        assert_eq!(p, Precision::Quantized);
        assert_eq!(s, PrecisionSource::Explicit);
    }

    #[test]
    fn safetensors_explicit_dtype_wins() {
        let (p, s) =
            infer_precision(Format::Safetensors, "model.safetensors", Some("BF16"));
        assert_eq!(p, Precision::Bf16);
        assert_eq!(s, PrecisionSource::Explicit);
    }

    #[test]
    fn safetensors_filename_fallback_is_inferred() {
        let (p, s) = infer_precision(
            Format::Safetensors,
            "sdxl-fp16-model.safetensors",
            None,
        );
        assert_eq!(p, Precision::Fp16);
        assert_eq!(s, PrecisionSource::Inferred);
    }

    #[test]
    fn safetensors_without_signal_is_unknown() {
        let (p, s) = infer_precision(Format::Safetensors, "model.safetensors", None);
        assert_eq!(p, Precision::Unknown);
        assert_eq!(s, PrecisionSource::Unknown);
    }

    #[test]
    fn pth_and_bin_never_explicit() {
        let (p, s) = infer_precision(Format::Pth, "upscale_x4-fp16.pth", None);
        assert_eq!(p, Precision::Fp16);
        assert_eq!(s, PrecisionSource::Inferred);
    }

    #[test]
    fn quantization_tokens_recognise_awq_gptq() {
        let (p, _) = infer_precision(
            Format::Safetensors,
            "llama-3-AWQ-4bit.safetensors",
            None,
        );
        assert_eq!(p, Precision::Int8);
    }
}
