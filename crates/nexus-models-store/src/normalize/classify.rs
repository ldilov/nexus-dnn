//! Format + modality classifiers (pure functions).
//!
//! Classification is **metadata-first, filename-fallback** (FR-004). The
//! HF API surfaces structured `pipeline_tag` + file listings that we
//! trust first; only when those are silent do we fall back to filename
//! suffix heuristics.

use crate::types::{Format, Modality};

/// Recognise an artifact format from its filename. Falls back to
/// `Format::Unknown` if no known extension matches. Case-insensitive.
#[must_use]
pub fn classify_format(filename: &str) -> Format {
    let lower = filename.to_ascii_lowercase();
    if lower.ends_with(".gguf") || lower.contains(".gguf.") {
        Format::Gguf
    } else if lower.ends_with(".ggml") {
        Format::Ggml
    } else if lower.ends_with(".safetensors") {
        Format::Safetensors
    } else if lower.ends_with(".bin") {
        Format::PytorchBin
    } else if lower.ends_with(".pth") {
        Format::Pth
    } else {
        Format::Unknown
    }
}

/// Map an HF `pipeline_tag` to our internal [`Modality`]. Unknown tags
/// resolve to `Modality::Other`.
#[must_use]
pub fn classify_modality(pipeline_tag: Option<&str>, tags: &[String]) -> Modality {
    if let Some(p) = pipeline_tag {
        let lower = p.to_ascii_lowercase();
        if lower.contains("text-generation")
            || lower.contains("text2text")
            || lower.contains("conversational")
        {
            return Modality::Llm;
        }
        if lower.contains("text-to-image") || lower.contains("image-to-image") {
            return Modality::Image;
        }
        if lower.contains("text-to-video") || lower.contains("video") {
            return Modality::Video;
        }
        if lower.contains("audio") || lower.contains("speech") {
            return Modality::Audio;
        }
        if lower.contains("sentence-similarity")
            || lower.contains("feature-extraction")
        {
            return Modality::Embedding;
        }
        if lower.contains("super-resolution") || lower.contains("upscal") {
            return Modality::Upscaler;
        }
    }
    for tag in tags {
        let lower = tag.to_ascii_lowercase();
        if lower.contains("llm") || lower.contains("llama") || lower.contains("gpt") {
            return Modality::Llm;
        }
        if lower.contains("stable-diffusion") || lower.contains("diffusion") {
            return Modality::Image;
        }
        if lower.contains("upscaler") {
            return Modality::Upscaler;
        }
    }
    Modality::Other
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classifies_gguf_and_shards() {
        assert_eq!(classify_format("model.gguf"), Format::Gguf);
        assert_eq!(
            classify_format("llama-3-Q5_K_M.gguf"),
            Format::Gguf
        );
        assert_eq!(
            classify_format("model-00001-of-00003.gguf"),
            Format::Gguf
        );
    }

    #[test]
    fn classifies_safetensors_and_pytorch() {
        assert_eq!(
            classify_format("model.safetensors"),
            Format::Safetensors
        );
        assert_eq!(
            classify_format("pytorch_model.bin"),
            Format::PytorchBin
        );
        assert_eq!(classify_format("checkpoint.bin"), Format::PytorchBin);
        assert_eq!(classify_format("upscaler_x4.pth"), Format::Pth);
    }

    #[test]
    fn unknown_extensions_fall_back() {
        assert_eq!(classify_format("README.md"), Format::Unknown);
        assert_eq!(classify_format("config.json"), Format::Unknown);
        assert_eq!(classify_format(""), Format::Unknown);
    }

    #[test]
    fn is_case_insensitive() {
        assert_eq!(classify_format("Model.SafeTensors"), Format::Safetensors);
        assert_eq!(classify_format("MODEL.GGUF"), Format::Gguf);
    }

    #[test]
    fn classifies_modality_from_pipeline_tag() {
        assert_eq!(
            classify_modality(Some("text-generation"), &[]),
            Modality::Llm
        );
        assert_eq!(
            classify_modality(Some("text-to-image"), &[]),
            Modality::Image
        );
        assert_eq!(
            classify_modality(Some("automatic-speech-recognition"), &[]),
            Modality::Audio
        );
        assert_eq!(
            classify_modality(Some("feature-extraction"), &[]),
            Modality::Embedding
        );
    }

    #[test]
    fn falls_back_to_tags() {
        assert_eq!(
            classify_modality(None, &["stable-diffusion-xl".into()]),
            Modality::Image
        );
        assert_eq!(
            classify_modality(None, &["llama".into()]),
            Modality::Llm
        );
    }

    #[test]
    fn unknown_modality_is_other() {
        assert_eq!(classify_modality(None, &[]), Modality::Other);
        assert_eq!(classify_modality(Some("mystery-task"), &[]), Modality::Other);
    }
}
