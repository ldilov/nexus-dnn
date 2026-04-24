use emotion_tts_extension::domain::manifest::{
    build_manifest, AlignmentDiagnostics, AlignmentSummary, Manifest, ManifestEntry,
    ReferenceVariant, ThresholdSource,
};
use emotion_tts_extension::domain::emotion::{EmotionMode, EmotionSource};
use serde_json::json;

fn minimal_entry() -> ManifestEntry {
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
        source_run_id: None,
        cache_hit: false,
        audio_artifact_ref: None,
        duration_ms: Some(1000),
        filename: Some("001_Bob_001.mp3".into()),
        failure_category: None,
        reference_variant: None,
        alignment: None,
    }
}

#[test]
fn historic_manifest_json_without_spec_034_fields_still_parses() {
    // Pre-spec-034 manifests have none of: model_family, reference_preprocess_active,
    // compile_active, oas_active, alignment_summary, preprocessing_report_ref.
    let historic = json!({
        "run_id": "run_01",
        "deployment_id": "dep_01",
        "original_run_id": null,
        "partial": false,
        "extension_version": "0.1.0",
        "runtime_version": null,
        "model_version": null,
        "output_format": "mp3",
        "speed_factor": 1.0,
        "speed_mode": "preserve_pitch",
        "utterance_total": 1,
        "utterance_completed": 1,
        "utterance_failed": 0,
        "utterance_cancelled": 0,
        "created_at": 0,
        "entries": [{
            "global_index": 1,
            "character_display": "Bob",
            "character_sanitised": "Bob",
            "character_index": 1,
            "text": "hi",
            "resolved_mapping_id": null,
            "resolved_emotion_mode": null,
            "resolved_emotion_source": "none",
            "resolved_seed": 42,
            "content_hash": null,
            "status": "completed",
            "source_run_id": null,
            "cache_hit": false,
            "audio_artifact_ref": null,
            "duration_ms": 1000,
            "filename": "001_Bob_001.mp3",
            "failure_category": null
        }]
    });

    let m: Manifest = serde_json::from_value(historic).expect("historic manifest parses");
    assert_eq!(m.run_id, "run_01");
    assert!(m.model_family.is_none(), "new optional fields default to None");
    assert!(m.reference_preprocess_active.is_none());
    assert!(m.compile_active.is_none());
    assert!(m.oas_active.is_none());
    assert!(m.alignment_summary.is_none());
    assert!(m.preprocessing_report_ref.is_none());
    let e = &m.entries[0];
    assert!(e.reference_variant.is_none());
    assert!(e.alignment.is_none());
}

#[test]
fn new_spec_034_fields_round_trip_when_present() {
    let mut entry = minimal_entry();
    entry.reference_variant = Some(ReferenceVariant::Preprocessed);
    entry.alignment = Some(AlignmentDiagnostics {
        alignment_score: 0.67,
        alignment_flag: false,
        threshold_used: 0.45,
        threshold_source: ThresholdSource::LiteratureDefault,
        per_head_scores: vec![0.72, 0.68, 0.65, 0.71, 0.59],
        attention_map_artifact_ref: None,
    });

    let mut m = build_manifest(
        "run_02",
        "dep_01",
        "0.1.0",
        "mp3",
        1.0,
        "preserve_pitch",
        None,
        None,
        None,
        0,
        vec![entry],
    );
    m.model_family = Some("indextts-2".into());
    m.reference_preprocess_active = Some(true);
    m.compile_active = Some(false);
    m.oas_active = Some(true);
    m.alignment_summary = Some(AlignmentSummary {
        min: 0.41,
        median: 0.66,
        p95: 0.72,
        flagged_count: 0,
        total_count: 1,
    });

    let json = serde_json::to_value(&m).unwrap();
    assert_eq!(json["model_family"], "indextts-2");
    assert_eq!(json["reference_preprocess_active"], true);
    assert_eq!(json["oas_active"], true);
    assert!(json["alignment_summary"].is_object());

    let re: Manifest = serde_json::from_value(json).unwrap();
    assert_eq!(re, m);
}

#[test]
fn unflagged_alignment_diagnostics_omit_attention_map_ref() {
    let diag = AlignmentDiagnostics {
        alignment_score: 0.67,
        alignment_flag: false,
        threshold_used: 0.45,
        threshold_source: ThresholdSource::LiteratureDefault,
        per_head_scores: vec![],
        attention_map_artifact_ref: None,
    };
    let v = serde_json::to_value(&diag).unwrap();
    assert!(v.get("attention_map_artifact_ref").is_none());
    assert!(v.get("per_head_scores").is_none(), "empty vec omitted");
    assert_eq!(v["alignment_flag"], false);
}

#[test]
fn flagged_alignment_serialises_attention_map_ref_and_per_head() {
    let diag = AlignmentDiagnostics {
        alignment_score: 0.28,
        alignment_flag: true,
        threshold_used: 0.42,
        threshold_source: ThresholdSource::RollingMad,
        per_head_scores: vec![0.31, 0.29, 0.24, 0.33, 0.22],
        attention_map_artifact_ref: Some("artifact://diagnostics/xyz.png".into()),
    };
    let v = serde_json::to_value(&diag).unwrap();
    assert_eq!(v["attention_map_artifact_ref"], "artifact://diagnostics/xyz.png");
    assert_eq!(v["threshold_source"], "rolling_mad");
    assert_eq!(v["per_head_scores"].as_array().unwrap().len(), 5);
}

#[test]
fn reference_variant_serialises_snake_case() {
    let pre = serde_json::to_value(ReferenceVariant::Preprocessed).unwrap();
    assert_eq!(pre, json!("preprocessed"));
    let orig = serde_json::to_value(ReferenceVariant::Original).unwrap();
    assert_eq!(orig, json!("original"));
}

#[test]
fn record_compile_active_stamps_field() {
    let mut m = build_manifest(
        "run_04", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch",
        None, None, None, 0, vec![minimal_entry()],
    );
    assert!(m.compile_active.is_none());
    m.record_compile_active(true);
    assert_eq!(m.compile_active, Some(true));
    m.record_compile_active(false);
    assert_eq!(m.compile_active, Some(false));
}

#[test]
fn record_oas_active_includes_summary_when_active() {
    let mut m = build_manifest(
        "run_05", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch",
        None, None, None, 0, vec![minimal_entry()],
    );
    let summary = AlignmentSummary {
        min: 0.3, median: 0.6, p95: 0.8, flagged_count: 2, total_count: 20,
    };
    m.record_oas_active(true, Some(summary.clone()));
    assert_eq!(m.oas_active, Some(true));
    assert_eq!(m.alignment_summary, Some(summary));
}

#[test]
fn record_oas_inactive_does_not_set_summary() {
    let mut m = build_manifest(
        "run_06", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch",
        None, None, None, 0, vec![minimal_entry()],
    );
    let summary = AlignmentSummary {
        min: 0.3, median: 0.6, p95: 0.8, flagged_count: 0, total_count: 0,
    };
    m.record_oas_active(false, Some(summary));
    assert_eq!(m.oas_active, Some(false));
    assert!(m.alignment_summary.is_none());
}

#[test]
fn record_model_family_and_preprocess_active_stamp_fields() {
    let mut m = build_manifest(
        "run_07", "dep_01", "0.1.0", "mp3", 1.0, "preserve_pitch",
        None, None, None, 0, vec![minimal_entry()],
    );
    m.record_model_family("indextts-2-5");
    m.record_reference_preprocess_active(true);
    assert_eq!(m.model_family.as_deref(), Some("indextts-2-5"));
    assert_eq!(m.reference_preprocess_active, Some(true));
}

#[test]
fn manifest_top_level_skips_none_spec_034_fields() {
    let m = build_manifest(
        "run_03",
        "dep_01",
        "0.1.0",
        "mp3",
        1.0,
        "preserve_pitch",
        None,
        None,
        None,
        0,
        vec![minimal_entry()],
    );
    let v = serde_json::to_value(&m).unwrap();
    // All six new top-level fields start life as None and must be omitted from the JSON —
    // historic manifest consumers must not see them until we opt-in.
    for key in [
        "model_family",
        "reference_preprocess_active",
        "compile_active",
        "oas_active",
        "alignment_summary",
        "preprocessing_report_ref",
    ] {
        assert!(
            v.get(key).is_none(),
            "field {key} must be skipped when None (historic-consumer safety)",
        );
    }
}
