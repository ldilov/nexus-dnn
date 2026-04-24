//! Export-bundle operator — zips `audio/*`, `manifest.json`, `utterances.csv`,
//! and optionally `preview_mix.{ext}` into a single `.zip` on disk.

use std::io::{Cursor, Write};

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use tokio::fs;
use zip::write::SimpleFileOptions;
use zip::{CompressionMethod, ZipWriter};

use crate::domain::manifest::{write_csv, Manifest, ManifestEntry};
use crate::domain::{EmotionTtsError, Result};
use crate::operators::{Operator, OperatorId};

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "export.bundle",
    version: "1.0.0",
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SegmentFile {
    pub filename: String,
    pub source_path_abs: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub manifest: Manifest,
    pub segment_files: Vec<SegmentFile>,
    pub preview_mix_abs: Option<String>,
    pub preview_mix_filename: Option<String>,
    pub output_zip_abs: String,
    pub include_manifest_json: bool,
    pub include_csv_index: bool,
    pub include_preview_mix: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Output {
    pub zip_abs: String,
    pub size_bytes: u64,
    pub entry_count: usize,
}

pub struct ExportBundleOperator;

pub fn build_csv_bytes(entries: &[ManifestEntry]) -> Result<Vec<u8>> {
    let mut buf = Vec::new();
    write_csv(entries, &mut buf)
        .map_err(|e| EmotionTtsError::internal(format!("csv write: {e}")))?;
    Ok(buf)
}

pub async fn build_zip_bytes(input: &Input) -> Result<(Vec<u8>, usize)> {
    let mut buf = Cursor::new(Vec::new());
    let mut writer = ZipWriter::new(&mut buf);
    let options = SimpleFileOptions::default().compression_method(CompressionMethod::Deflated);
    let mut entry_count = 0usize;

    for seg in &input.segment_files {
        let bytes = fs::read(&seg.source_path_abs).await.map_err(|e| {
            EmotionTtsError::internal(format!("read segment {}: {e}", seg.source_path_abs))
        })?;
        writer
            .start_file(format!("audio/{}", seg.filename), options)
            .map_err(|e| EmotionTtsError::internal(format!("zip start_file: {e}")))?;
        writer
            .write_all(&bytes)
            .map_err(|e| EmotionTtsError::internal(format!("zip write: {e}")))?;
        entry_count += 1;
    }

    if input.include_manifest_json {
        let json = input
            .manifest
            .to_pretty_json()
            .map_err(|e| EmotionTtsError::internal(format!("manifest json: {e}")))?;
        writer
            .start_file("manifest.json", options)
            .map_err(|e| EmotionTtsError::internal(format!("zip start_file: {e}")))?;
        writer
            .write_all(json.as_bytes())
            .map_err(|e| EmotionTtsError::internal(format!("zip write: {e}")))?;
        entry_count += 1;
    }

    if input.include_csv_index {
        let csv = build_csv_bytes(&input.manifest.entries)?;
        writer
            .start_file("utterances.csv", options)
            .map_err(|e| EmotionTtsError::internal(format!("zip start_file: {e}")))?;
        writer
            .write_all(&csv)
            .map_err(|e| EmotionTtsError::internal(format!("zip write: {e}")))?;
        entry_count += 1;
    }

    if input.include_preview_mix {
        if let (Some(abs), Some(name)) = (&input.preview_mix_abs, &input.preview_mix_filename) {
            let bytes = fs::read(abs)
                .await
                .map_err(|e| EmotionTtsError::internal(format!("read preview {abs}: {e}")))?;
            writer
                .start_file(name.clone(), options)
                .map_err(|e| EmotionTtsError::internal(format!("zip start_file: {e}")))?;
            writer
                .write_all(&bytes)
                .map_err(|e| EmotionTtsError::internal(format!("zip write: {e}")))?;
            entry_count += 1;
        }
    }

    writer
        .finish()
        .map_err(|e| EmotionTtsError::internal(format!("zip finish: {e}")))?;
    Ok((buf.into_inner(), entry_count))
}

#[async_trait]
impl Operator for ExportBundleOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        let (bytes, entry_count) = build_zip_bytes(&input).await?;
        fs::write(&input.output_zip_abs, &bytes)
            .await
            .map_err(|e| EmotionTtsError::internal(format!("write zip: {e}")))?;
        Ok(Output {
            zip_abs: input.output_zip_abs,
            size_bytes: bytes.len() as u64,
            entry_count,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::emotion::{EmotionMode, EmotionSource};
    use crate::domain::manifest::{build_manifest, ManifestEntry};
    use tempfile::TempDir;

    fn entry() -> ManifestEntry {
        ManifestEntry {
            global_index: 1,
            character_display: "Bob".into(),
            character_sanitised: "Bob".into(),
            character_index: 1,
            text: "hi".into(),
            resolved_mapping_id: None,
            resolved_emotion_mode: Some(EmotionMode::None),
            resolved_emotion_source: EmotionSource::None,
            resolved_seed: Some(42),
            content_hash: None,
            status: "completed".into(),
            source_run_id: Some("run_01".into()),
            cache_hit: false,
            audio_artifact_ref: Some("artifact://a".into()),
            duration_ms: Some(1000),
            filename: Some("001_Bob_001.mp3".into()),
            failure_category: None,
        }
    }

    #[tokio::test]
    async fn zip_with_manifest_and_csv() {
        let dir = TempDir::new().unwrap();
        let seg_path = dir.path().join("001_Bob_001.mp3");
        tokio::fs::write(&seg_path, b"fake-audio").await.unwrap();

        let manifest = build_manifest(
            "run_01",
            "dep_01",
            "0.1.0",
            "mp3",
            1.0,
            "preserve_pitch",
            None,
            None,
            None,
            0,
            vec![entry()],
        );

        let zip_path = dir.path().join("bundle.zip");
        let op = ExportBundleOperator;
        let out = op
            .execute(Input {
                manifest,
                segment_files: vec![SegmentFile {
                    filename: "001_Bob_001.mp3".into(),
                    source_path_abs: seg_path.to_string_lossy().into_owned(),
                }],
                preview_mix_abs: None,
                preview_mix_filename: None,
                output_zip_abs: zip_path.to_string_lossy().into_owned(),
                include_manifest_json: true,
                include_csv_index: true,
                include_preview_mix: false,
            })
            .await
            .unwrap();

        assert_eq!(out.entry_count, 3);
        assert!(out.size_bytes > 0);
        assert!(zip_path.exists());
    }

    #[tokio::test]
    async fn missing_audio_source_errors() {
        let dir = TempDir::new().unwrap();
        let manifest = build_manifest("run_01", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch", None, None, None, 0, vec![]);
        let zip_path = dir.path().join("bundle.zip");
        let op = ExportBundleOperator;
        let err = op
            .execute(Input {
                manifest,
                segment_files: vec![SegmentFile {
                    filename: "missing.mp3".into(),
                    source_path_abs: dir.path().join("nope.mp3").to_string_lossy().into_owned(),
                }],
                preview_mix_abs: None,
                preview_mix_filename: None,
                output_zip_abs: zip_path.to_string_lossy().into_owned(),
                include_manifest_json: false,
                include_csv_index: false,
                include_preview_mix: false,
            })
            .await
            .unwrap_err();
        assert!(err.to_string().contains("read segment"));
    }
}
