use emotion_tts_extension::backend_client::notifications::ProgressEvent;
use emotion_tts_extension::backend_client::params::{
    CapabilityProbeEntry, CapabilityProbeParams, CapabilityProbeResult, CompileCompletePayload,
    CompileFailedPayload, CompileStartedPayload, DiagnosticAlignmentPayload, FamilyListEntry,
    FamilyListResult, FamilySwitchParams, FamilySwitchResult, PreprocessWarningPayload,
    PreprocessingReport, PreprocessingStage, SpeakerCacheHint, SynthesizeBatchSpec034Extensions,
    VoicePreprocessParams, VoicePreprocessResult,
};
use emotion_tts_extension::backend_client::rpc::{error_codes, methods};
use emotion_tts_extension::host_contract::NotificationEnvelope;
use serde_json::json;

#[test]
fn method_constants_match_contract() {
    // contracts/rpc/methods_additions.md
    assert_eq!(methods::VOICE_PREPROCESS, "voice.preprocess");
    assert_eq!(methods::CAPABILITY_PROBE, "capability.probe");
    assert_eq!(methods::FAMILY_LIST, "family.list");
    assert_eq!(methods::FAMILY_SWITCH, "family.switch");
}

#[test]
fn error_codes_match_contract() {
    assert_eq!(error_codes::PREPROCESS_INPUT_REJECTED, -32010);
    assert_eq!(error_codes::PREPROCESS_PARTIAL, -32011);
    assert_eq!(error_codes::FAMILY_NOT_INSTALLED, -32012);
    assert_eq!(error_codes::FAMILY_INCOMPATIBLE, -32013);
}

#[test]
fn voice_preprocess_params_round_trip() {
    let wire = json!({
        "request_id": "req_abc",
        "source_artifact_abs": "/tmp/in.wav",
        "output_artifact_abs": "/tmp/out.wav",
        "pipeline_version": "1"
    });
    let parsed: VoicePreprocessParams = serde_json::from_value(wire.clone()).unwrap();
    assert_eq!(parsed.pipeline_version, "1");
    let back = serde_json::to_value(&parsed).unwrap();
    assert_eq!(back, wire);
}

#[test]
fn voice_preprocess_result_matches_contract_sample() {
    let wire = json!({
        "succeeded": true,
        "report": {
            "pipeline_version": "1",
            "stages": [
                { "stage": "decode",   "status": "ok", "duration_ms": 8,
                  "input_sample_rate": 48000, "output_sample_rate": 24000 },
                { "stage": "denoise",  "status": "skipped", "reason": "rnnoise import failed" },
                { "stage": "vad_trim", "status": "ok", "duration_ms": 40,
                  "engine": "silero_vad", "trimmed_ms_leading": 320 }
            ],
            "succeeded": true,
            "warnings": []
        }
    });
    let result: VoicePreprocessResult = serde_json::from_value(wire.clone()).unwrap();
    assert!(result.succeeded);
    assert_eq!(result.report.stages.len(), 3);
    assert_eq!(result.report.stages[1].status, "skipped");
    assert_eq!(
        result.report.stages[1].reason.as_deref(),
        Some("rnnoise import failed")
    );
    assert_eq!(
        result.report.stages[0].extra.get("input_sample_rate"),
        Some(&json!(48000)),
        "stage-specific fields survive via flatten",
    );

    let re = serde_json::to_value(&result).unwrap();
    // round-trip preserves both typed fields and extras
    let parsed_again: VoicePreprocessResult = serde_json::from_value(re).unwrap();
    assert_eq!(parsed_again, result);
}

#[test]
fn preprocessing_stage_skipped_reason_is_optional() {
    let stage = PreprocessingStage {
        stage: "denoise".into(),
        status: "skipped".into(),
        duration_ms: None,
        reason: Some("rnnoise unavailable".into()),
        extra: Default::default(),
    };
    let v = serde_json::to_value(&stage).unwrap();
    assert!(v.get("duration_ms").is_none(), "omitted when None");
    assert_eq!(v["reason"], "rnnoise unavailable");
}

#[test]
fn capability_probe_round_trip() {
    let wire = json!({
        "probes": ["compile_gpt", "attention_capture", "denoise"]
    });
    let parsed: CapabilityProbeParams = serde_json::from_value(wire.clone()).unwrap();
    assert_eq!(parsed.probes.len(), 3);

    let result_wire = json!({
        "compile_gpt": { "available": true, "detail": "torch.compile round-trip 1240 ms", "duration_ms": 1240 },
        "attention_capture": { "available": true, "detail": "hooks on 10-14" },
        "denoise": { "available": false, "detail": "rnnoise import failed" }
    });
    let result: CapabilityProbeResult = serde_json::from_value(result_wire).unwrap();
    assert_eq!(result.len(), 3);
    assert_eq!(result["compile_gpt"].duration_ms, Some(1240));
    assert!(!result["denoise"].available);

    let one_entry = CapabilityProbeEntry {
        available: false,
        detail: "triton missing".into(),
        duration_ms: Some(5),
    };
    let serialized = serde_json::to_value(&one_entry).unwrap();
    assert_eq!(serialized["available"], false);
}

#[test]
fn family_list_round_trip() {
    let wire = json!({
        "active_family": "indextts-2",
        "known_families": [
            { "family_id": "indextts-2",   "engine_version": "0.1.3", "languages": ["zh","en"] },
            { "family_id": "indextts-2-5", "engine_version": null,    "languages": ["zh","en","ja","es"] }
        ]
    });
    let parsed: FamilyListResult = serde_json::from_value(wire.clone()).unwrap();
    assert_eq!(parsed.active_family, "indextts-2");
    assert_eq!(parsed.known_families.len(), 2);
    assert_eq!(parsed.known_families[1].engine_version, None);
    let re = serde_json::to_value(&parsed).unwrap();
    // Compare via re-parsing to avoid field-order sensitivity on the second
    // element where `engine_version: null` may or may not emit.
    let reparsed: FamilyListResult = serde_json::from_value(re).unwrap();
    assert_eq!(reparsed, parsed);
}

#[test]
fn family_switch_round_trip() {
    let params_wire = json!({ "family_id": "indextts-2-5" });
    let params: FamilySwitchParams = serde_json::from_value(params_wire.clone()).unwrap();
    assert_eq!(params.family_id, "indextts-2-5");

    let result_wire = json!({
        "switched": true,
        "load_duration_ms": 18400,
        "vram_delta_mb": 2300
    });
    let result: FamilySwitchResult = serde_json::from_value(result_wire.clone()).unwrap();
    assert!(result.switched);
    assert_eq!(result.load_duration_ms, 18400);
    assert_eq!(serde_json::to_value(&result).unwrap(), result_wire);
}

#[test]
fn synthesize_batch_extensions_backwards_compatible() {
    let empty: SynthesizeBatchSpec034Extensions = serde_json::from_value(json!({})).unwrap();
    assert_eq!(empty, SynthesizeBatchSpec034Extensions::default());
    let wire = json!({
        "model_family": "indextts-2",
        "enable_attention_capture": true,
        "enable_compile": false,
        "speaker_cache_hint": { "enabled": true, "budget_mb": 512 }
    });
    let parsed: SynthesizeBatchSpec034Extensions = serde_json::from_value(wire).unwrap();
    assert_eq!(parsed.model_family.as_deref(), Some("indextts-2"));
    assert_eq!(
        parsed.speaker_cache_hint,
        Some(SpeakerCacheHint {
            enabled: true,
            budget_mb: 512
        }),
    );
}

#[test]
fn notification_envelope_classifies_diagnostic() {
    let env = NotificationEnvelope {
        method: "diagnostic".into(),
        params: json!({
            "run_id": "run_xyz",
            "global_index": 3,
            "alignment_score": 0.41,
            "alignment_flag": true,
            "threshold_used": 0.45,
            "threshold_source": "literature_default",
            "attention_map_artifact_ref": "artifact://diagnostics/abc.png"
        }),
    };
    let event: ProgressEvent = env.into();
    let payload = match event {
        ProgressEvent::Diagnostic(v) => v,
        other => panic!("expected Diagnostic, got {other:?}"),
    };
    let typed: DiagnosticAlignmentPayload = serde_json::from_value(payload).unwrap();
    assert_eq!(typed.global_index, 3);
    assert!(typed.alignment_flag);
}

#[test]
fn notification_envelope_classifies_preprocess_warning() {
    let env = NotificationEnvelope {
        method: "preprocess_warning".into(),
        params: json!({
            "request_id": "req_1",
            "skipped_stage": "denoise",
            "reason": "rnnoise import failed"
        }),
    };
    let event: ProgressEvent = env.into();
    let payload = match event {
        ProgressEvent::PreprocessWarning(v) => v,
        other => panic!("expected PreprocessWarning, got {other:?}"),
    };
    let typed: PreprocessWarningPayload = serde_json::from_value(payload).unwrap();
    assert_eq!(typed.skipped_stage, "denoise");
}

#[test]
fn compile_progress_payloads_round_trip() {
    let started = CompileStartedPayload {
        request_id: "req".into(),
        stage: "compile.started".into(),
        eta_ms: 25000,
        message: "compiling GPT stage".into(),
    };
    let started_json = serde_json::to_value(&started).unwrap();
    assert_eq!(started_json["eta_ms"], 25000);

    let complete = CompileCompletePayload {
        stage: "compile.complete".into(),
        duration_ms: 21400,
    };
    let complete_json = serde_json::to_value(&complete).unwrap();
    assert_eq!(complete_json["duration_ms"], 21400);

    let failed = CompileFailedPayload {
        stage: "compile.failed".into(),
        duration_ms: 2100,
        reason: "triton.ImportError: module not found".into(),
    };
    assert!(serde_json::to_string(&failed).unwrap().contains("triton"));
}

#[test]
fn preprocessing_report_ignores_unknown_warnings_field() {
    // Test that the "warnings" field is optional (defaults to empty Vec).
    let minimal = json!({
        "pipeline_version": "1",
        "stages": [],
        "succeeded": true
    });
    let report: PreprocessingReport = serde_json::from_value(minimal).unwrap();
    assert!(report.warnings.is_empty());
}

#[test]
fn family_list_entry_engine_version_null_preserves_none() {
    let wire = json!({
        "family_id": "indextts-2-5",
        "engine_version": null,
        "languages": ["zh", "en"]
    });
    let parsed: FamilyListEntry = serde_json::from_value(wire).unwrap();
    assert!(parsed.engine_version.is_none());
}
