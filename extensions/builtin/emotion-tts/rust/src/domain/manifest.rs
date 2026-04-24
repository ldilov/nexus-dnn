//! Manifest + CSV builders for an export bundle.
//!
//! The manifest encodes partial-run provenance (FR-142..144) so an auditor
//! can see exactly which run produced each completed segment even across
//! resume chains.

use std::io::Write;

use serde::{Deserialize, Serialize};

use crate::domain::emotion::{EmotionMode, EmotionSource};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ManifestEntry {
    pub global_index: i64,
    pub character_display: String,
    pub character_sanitised: String,
    pub character_index: i64,
    pub text: String,
    pub resolved_mapping_id: Option<String>,
    pub resolved_emotion_mode: Option<EmotionMode>,
    pub resolved_emotion_source: EmotionSource,
    pub resolved_seed: Option<i64>,
    pub content_hash: Option<String>,
    pub status: String,
    pub source_run_id: Option<String>,
    pub cache_hit: bool,
    pub audio_artifact_ref: Option<String>,
    pub duration_ms: Option<i64>,
    pub filename: Option<String>,
    pub failure_category: Option<String>,
    /// Spec 034 / FR-203: which reference variant was fed to the engine for
    /// this segment. `None` on historic manifests + when US1 is disabled.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reference_variant: Option<ReferenceVariant>,
    /// Spec 034 / US2: per-segment alignment diagnostics (FR-210..214).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub alignment: Option<AlignmentDiagnostics>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ReferenceVariant {
    Preprocessed,
    Original,
}

/// Per-segment alignment diagnostics emitted by the OAS observability layer
/// (spec 034, R-34-02 / R-34-03). All fields except `alignment_score` are
/// optional so historic manifests and unflagged segments stay lean.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AlignmentDiagnostics {
    pub alignment_score: f64,
    #[serde(default)]
    pub alignment_flag: bool,
    pub threshold_used: f64,
    pub threshold_source: ThresholdSource,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub per_head_scores: Vec<f64>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub attention_map_artifact_ref: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ThresholdSource {
    LiteratureDefault,
    RollingMad,
}

/// Spec-034 aggregate alignment summary attached to the top-level manifest
/// when OAS is active (FR-214).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AlignmentSummary {
    pub min: f64,
    pub median: f64,
    pub p95: f64,
    pub flagged_count: i64,
    pub total_count: i64,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Manifest {
    pub run_id: String,
    pub deployment_id: String,
    pub original_run_id: Option<String>,
    pub partial: bool,
    pub extension_version: String,
    pub runtime_version: Option<String>,
    pub model_version: Option<String>,
    pub output_format: String,
    pub speed_factor: f64,
    pub speed_mode: String,
    pub utterance_total: i64,
    pub utterance_completed: i64,
    pub utterance_failed: i64,
    pub utterance_cancelled: i64,
    pub created_at: i64,
    /// Spec 034 / FR-243 — family active for this run. `None` only on pre-034
    /// historic manifests.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub model_family: Option<String>,
    /// Spec 034 / FR-252 — deployment-level toggle state at run start.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reference_preprocess_active: Option<bool>,
    /// Spec 034 — whether the compile path ran to completion (after fallback).
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub compile_active: Option<bool>,
    /// Spec 034 — whether attention capture was enabled for this run.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub oas_active: Option<bool>,
    /// Spec 034 — aggregate alignment stats. Present iff `oas_active == Some(true)`.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub alignment_summary: Option<AlignmentSummary>,
    /// Spec 034 — points at the voice-asset-level report if US1 ran on any
    /// reference used by this run.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub preprocessing_report_ref: Option<String>,
    pub entries: Vec<ManifestEntry>,
}

impl Manifest {
    pub fn to_pretty_json(&self) -> serde_json::Result<String> {
        serde_json::to_string_pretty(self)
    }

    /// Spec 034 US4 T087 — stamp the manifest with the resolved compile
    /// state (after fallback resolution). Called from the dispatcher on
    /// batch completion so a user replaying an export can see whether the
    /// compiled path was actually exercised.
    pub fn record_compile_active(&mut self, active: bool) {
        self.compile_active = Some(active);
    }

    /// Spec 034 US2 — stamp OAS context on the manifest after a batch.
    pub fn record_oas_active(
        &mut self,
        active: bool,
        summary: Option<AlignmentSummary>,
    ) {
        self.oas_active = Some(active);
        if active && summary.is_some() {
            self.alignment_summary = summary;
        }
    }

    /// Spec 034 US1 — stamp the reference-preprocess deployment toggle at
    /// run start (FR-252 — lets replayers distinguish "toggle off" from
    /// "no preprocessed ref available").
    pub fn record_reference_preprocess_active(&mut self, active: bool) {
        self.reference_preprocess_active = Some(active);
    }

    /// Spec 034 US5 — stamp the model family a run used (FR-243).
    pub fn record_model_family(&mut self, family: impl Into<String>) {
        self.model_family = Some(family.into());
    }
}

pub fn build_manifest(
    run_id: impl Into<String>,
    deployment_id: impl Into<String>,
    extension_version: impl Into<String>,
    output_format: impl Into<String>,
    speed_factor: f64,
    speed_mode: impl Into<String>,
    original_run_id: Option<String>,
    runtime_version: Option<String>,
    model_version: Option<String>,
    created_at: i64,
    entries: Vec<ManifestEntry>,
) -> Manifest {
    let utterance_total = entries.len() as i64;
    let utterance_completed = entries.iter().filter(|e| e.status == "completed").count() as i64;
    let utterance_failed = entries.iter().filter(|e| e.status == "failed").count() as i64;
    let utterance_cancelled = entries.iter().filter(|e| e.status == "cancelled").count() as i64;
    let partial = utterance_completed != utterance_total;

    Manifest {
        run_id: run_id.into(),
        deployment_id: deployment_id.into(),
        original_run_id,
        partial,
        extension_version: extension_version.into(),
        runtime_version,
        model_version,
        output_format: output_format.into(),
        speed_factor,
        speed_mode: speed_mode.into(),
        utterance_total,
        utterance_completed,
        utterance_failed,
        utterance_cancelled,
        created_at,
        model_family: None,
        reference_preprocess_active: None,
        compile_active: None,
        oas_active: None,
        alignment_summary: None,
        preprocessing_report_ref: None,
        entries,
    }
}

pub fn write_csv<W: Write>(entries: &[ManifestEntry], writer: W) -> std::io::Result<()> {
    let mut wtr = csv::Writer::from_writer(writer);
    wtr.write_record([
        "global_index",
        "character_display",
        "character_sanitised",
        "character_index",
        "text",
        "status",
        "filename",
        "duration_ms",
        "cache_hit",
        "resolved_emotion_mode",
        "resolved_emotion_source",
        "resolved_seed",
        "source_run_id",
        "failure_category",
    ])?;

    for e in entries {
        wtr.write_record([
            e.global_index.to_string(),
            e.character_display.clone(),
            e.character_sanitised.clone(),
            e.character_index.to_string(),
            e.text.clone(),
            e.status.clone(),
            e.filename.clone().unwrap_or_default(),
            e.duration_ms.map(|v| v.to_string()).unwrap_or_default(),
            if e.cache_hit { "true".into() } else { "false".into() },
            e.resolved_emotion_mode
                .map(|m| m.as_str().to_string())
                .unwrap_or_default(),
            match e.resolved_emotion_source {
                EmotionSource::Inline => "inline".into(),
                EmotionSource::Mapping => "mapping".into(),
                EmotionSource::Global => "global".into(),
                EmotionSource::None => "none".into(),
            },
            e.resolved_seed.map(|v| v.to_string()).unwrap_or_default(),
            e.source_run_id.clone().unwrap_or_default(),
            e.failure_category.clone().unwrap_or_default(),
        ])?;
    }
    wtr.flush()?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn entry(idx: i64, status: &str) -> ManifestEntry {
        ManifestEntry {
            global_index: idx,
            character_display: "Bob".into(),
            character_sanitised: "Bob".into(),
            character_index: idx,
            text: "hi".into(),
            resolved_mapping_id: None,
            resolved_emotion_mode: Some(EmotionMode::None),
            resolved_emotion_source: EmotionSource::None,
            resolved_seed: Some(42 + idx),
            content_hash: None,
            status: status.into(),
            source_run_id: Some("run_01".into()),
            cache_hit: false,
            audio_artifact_ref: Some("artifact://audio/x".into()),
            duration_ms: Some(1000),
            filename: Some(format!("{idx:03}_Bob_{idx:03}.mp3")),
            failure_category: None,
            reference_variant: None,
            alignment: None,
        }
    }

    #[test]
    fn partial_true_when_any_non_completed() {
        let entries = vec![entry(1, "completed"), entry(2, "failed")];
        let m = build_manifest("run_02", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch", None, None, None, 0, entries);
        assert!(m.partial);
        assert_eq!(m.utterance_completed, 1);
        assert_eq!(m.utterance_failed, 1);
    }

    #[test]
    fn partial_false_when_all_completed() {
        let entries = vec![entry(1, "completed"), entry(2, "completed")];
        let m = build_manifest("run_02", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch", None, None, None, 0, entries);
        assert!(!m.partial);
    }

    #[test]
    fn chain_original_run_id_preserved() {
        let m = build_manifest("run_02", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch", Some("run_01".into()), None, None, 0, vec![]);
        assert_eq!(m.original_run_id.as_deref(), Some("run_01"));
    }

    #[test]
    fn counts_by_status() {
        let entries = vec![
            entry(1, "completed"),
            entry(2, "completed"),
            entry(3, "failed"),
            entry(4, "cancelled"),
        ];
        let m = build_manifest("run_02", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch", None, None, None, 0, entries);
        assert_eq!(m.utterance_total, 4);
        assert_eq!(m.utterance_completed, 2);
        assert_eq!(m.utterance_failed, 1);
        assert_eq!(m.utterance_cancelled, 1);
    }

    #[test]
    fn csv_header_present() {
        let entries = vec![entry(1, "completed")];
        let mut buf = Vec::new();
        write_csv(&entries, &mut buf).unwrap();
        let s = String::from_utf8(buf).unwrap();
        assert!(s.starts_with("global_index,character_display"));
    }

    #[test]
    fn csv_roundtrip_contains_filename() {
        let entries = vec![entry(1, "completed")];
        let mut buf = Vec::new();
        write_csv(&entries, &mut buf).unwrap();
        let s = String::from_utf8(buf).unwrap();
        assert!(s.contains("001_Bob_001.mp3"));
    }

    #[test]
    fn json_serialises() {
        let m = build_manifest("run_02", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch", None, None, None, 0, vec![entry(1, "completed")]);
        let json = m.to_pretty_json().unwrap();
        assert!(json.contains("\"partial\""));
        assert!(json.contains("\"entries\""));
    }
}
