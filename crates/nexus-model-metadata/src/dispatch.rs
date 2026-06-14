//! Format-dispatch entrypoint for model metadata extraction.
//!
//! Given a path that is either a model file or a directory containing model
//! artifacts, select the highest-priority supported format and delegate to
//! the matching extractor. Priority order (highest first):
//!
//!   1. GGUF (`*.gguf`)
//!   2. safetensors (`*.safetensors`)
//!   3. PyTorch index sidecar (`*.index.json`)
//!
//! SECURITY INVARIANT: this module must NEVER open, read, or memory-map any
//! `*.bin` file. Pickle deserialization is ACE. Only the three formats above
//! are ever touched.

use std::path::{Path, PathBuf};

use crate::gguf::GgufExtractor;
use crate::pytorch_index::PytorchIndexExtractor;
use crate::safetensors::SafetensorsExtractor;
use crate::{ArtifactFormat, ExtractedMetadata, MetadataExtractor};

/// Inspect `path` (file or directory) and return the best-effort metadata
/// record. Never panics, never returns `Err`: on any failure — unknown
/// format, I/O error, malformed header — returns an
/// [`ExtractedMetadata`] with [`crate::ExtractionStatus::Failed`] so the
/// caller can keep the surrounding install flow green.
pub fn extract_any(path: &Path, install_id: &str) -> ExtractedMetadata {
    let Some(choice) = select_format(path) else {
        return ExtractedMetadata::failed(install_id, ArtifactFormat::Unknown);
    };
    run_extractor(choice, install_id)
}

#[derive(Debug, Clone)]
struct FormatChoice {
    format: ArtifactFormat,
    target: PathBuf,
}

fn select_format(path: &Path) -> Option<FormatChoice> {
    if path.is_file() {
        return classify_file(path);
    }
    if path.is_dir() {
        return classify_dir(path);
    }
    None
}

fn classify_file(path: &Path) -> Option<FormatChoice> {
    let name = path.file_name()?.to_str()?.to_ascii_lowercase();
    if name.ends_with(".gguf") {
        return Some(FormatChoice {
            format: ArtifactFormat::Gguf,
            target: path.to_path_buf(),
        });
    }
    if name.ends_with(".safetensors") {
        return Some(FormatChoice {
            format: ArtifactFormat::Safetensors,
            target: path.to_path_buf(),
        });
    }
    if name.ends_with(".index.json") {
        return Some(FormatChoice {
            format: ArtifactFormat::PytorchIndex,
            target: path.to_path_buf(),
        });
    }
    None
}

fn classify_dir(dir: &Path) -> Option<FormatChoice> {
    let mut gguf: Option<PathBuf> = None;
    let mut safetensors: Option<PathBuf> = None;
    let mut pytorch_index: Option<PathBuf> = None;

    let entries = std::fs::read_dir(dir).ok()?;
    for entry in entries.flatten() {
        let entry_path = entry.path();
        if !entry_path.is_file() {
            continue;
        }
        let Some(name) = entry_path.file_name().and_then(|n| n.to_str()) else {
            continue;
        };
        let lower = name.to_ascii_lowercase();
        if gguf.is_none() && lower.ends_with(".gguf") {
            gguf = Some(entry_path.clone());
        } else if safetensors.is_none() && lower.ends_with(".safetensors") {
            safetensors = Some(entry_path.clone());
        } else if pytorch_index.is_none() && lower.ends_with(".index.json") {
            pytorch_index = Some(entry_path.clone());
        }
    }

    if let Some(target) = gguf {
        return Some(FormatChoice {
            format: ArtifactFormat::Gguf,
            target,
        });
    }
    if let Some(target) = safetensors {
        return Some(FormatChoice {
            format: ArtifactFormat::Safetensors,
            target,
        });
    }
    if let Some(target) = pytorch_index {
        return Some(FormatChoice {
            format: ArtifactFormat::PytorchIndex,
            target,
        });
    }
    None
}

fn run_extractor(choice: FormatChoice, install_id: &str) -> ExtractedMetadata {
    let FormatChoice { format, target } = choice;
    let outcome = match format {
        ArtifactFormat::Gguf => GgufExtractor::new().extract(&target, install_id),
        ArtifactFormat::Safetensors => SafetensorsExtractor::new().extract(&target, install_id),
        ArtifactFormat::PytorchIndex => PytorchIndexExtractor::new().extract(&target, install_id),
        ArtifactFormat::Unknown => return ExtractedMetadata::failed(install_id, format),
    };
    outcome.unwrap_or_else(|_| ExtractedMetadata::failed(install_id, format))
}
