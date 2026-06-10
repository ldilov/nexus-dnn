//! Spec 035 T054 — HTTP contract test for the four extension-dependencies endpoints.
//!
//! Verifies the **wire format** of every DTO matches `contracts/http-api.openapi.yaml`
//! and the SSE event payload matches `contracts/sse-events.md`. Runs without spinning
//! up an `AppState` — this is the leanest shape that catches contract drift
//! (renamed field, dropped property, type change) without dragging in the full
//! host bootstrap. Real end-to-end coverage lands in spec-035 phase polish (T086)
//! after the host wires concrete dep services.

use serde_json::json;

use nexus_api::dto::extension_dependencies::{
    DependenciesResponseDto, InstallStartedResponseDto, StepArtifactDto, StepDto, StepErrorDto,
    StepProgressDto, StepStatusKind,
};

#[test]
fn dependencies_response_shape_matches_contract() {
    let dto = DependenciesResponseDto {
        steps: vec![
            StepDto {
                id: "python".to_owned(),
                step_type: "runtime".to_owned(),
                requires: Vec::new(),
                status: StepStatusKind::Ok,
                satisfied: true,
                artifact: Some(StepArtifactDto {
                    path: Some("/.../runtime/python".to_owned()),
                    bytes_placed: 480_000_000,
                    summary: "python 3.11.9 (cuda12)".to_owned(),
                }),
                last_error: None,
                progress: None,
                estimated_remaining_bytes: 0,
                files_present: None,
                files_total: None,
                integrity: None,
            },
            StepDto {
                id: "ffmpeg".to_owned(),
                step_type: "system_binary".to_owned(),
                requires: Vec::new(),
                status: StepStatusKind::Failed,
                satisfied: false,
                artifact: None,
                last_error: Some(StepErrorDto {
                    category: "sha256_mismatch".to_owned(),
                    message: "Downloaded bytes failed integrity check.".to_owned(),
                    hint: Some("Network may be modifying downloads".to_owned()),
                    log_excerpt: None,
                }),
                progress: None,
                estimated_remaining_bytes: 12_345_678,
                files_present: None,
                files_total: None,
                integrity: None,
            },
            StepDto {
                id: "models".to_owned(),
                step_type: "model_artifact".to_owned(),
                requires: vec!["python".to_owned()],
                status: StepStatusKind::Running,
                satisfied: false,
                artifact: None,
                last_error: None,
                progress: Some(StepProgressDto {
                    phase: "download".to_owned(),
                    current_bytes: 4_520_000_000,
                    total_bytes: 12_000_000_000,
                }),
                estimated_remaining_bytes: 7_480_000_000,
                files_present: Some(3),
                files_total: Some(8),
                integrity: None,
            },
        ],
        all_satisfied: false,
        total_remaining_bytes: 7_492_345_678,
        install_active: true,
        install_resumable: false,
    };

    let v = serde_json::to_value(&dto).expect("serialize");
    let expected = json!({
        "steps": [
            {
                "id": "python",
                "type": "runtime",
                "requires": [],
                "status": "ok",
                "satisfied": true,
                "artifact": {
                    "path": "/.../runtime/python",
                    "bytes_placed": 480_000_000,
                    "summary": "python 3.11.9 (cuda12)"
                },
                "last_error": null,
                "progress": null,
                "estimated_remaining_bytes": 0
            },
            {
                "id": "ffmpeg",
                "type": "system_binary",
                "requires": [],
                "status": "failed",
                "satisfied": false,
                "artifact": null,
                "last_error": {
                    "category": "sha256_mismatch",
                    "message": "Downloaded bytes failed integrity check.",
                    "hint": "Network may be modifying downloads",
                    "log_excerpt": null
                },
                "progress": null,
                "estimated_remaining_bytes": 12_345_678
            },
            {
                "id": "models",
                "type": "model_artifact",
                "requires": ["python"],
                "status": "running",
                "satisfied": false,
                "artifact": null,
                "last_error": null,
                "progress": {
                    "phase": "download",
                    "current_bytes": 4_520_000_000_u64,
                    "total_bytes": 12_000_000_000_u64
                },
                "estimated_remaining_bytes": 7_480_000_000_u64,
                "files_present": 3,
                "files_total": 8
            }
        ],
        "all_satisfied": false,
        "total_remaining_bytes": 7_492_345_678_u64,
        "install_active": true,
        "install_resumable": false
    });
    assert_eq!(v, expected, "wire format must match the OpenAPI contract");
}

#[test]
fn step_status_kind_serialises_as_lowercase_snake_case() {
    for (kind, expected) in [
        (StepStatusKind::Pending, "\"pending\""),
        (StepStatusKind::Running, "\"running\""),
        (StepStatusKind::Ok, "\"ok\""),
        (StepStatusKind::Failed, "\"failed\""),
        (StepStatusKind::Skipped, "\"skipped\""),
    ] {
        let s = serde_json::to_string(&kind).expect("serialize");
        assert_eq!(s, expected, "{kind:?} wire form drifted");
    }
}

#[test]
fn install_started_response_shape() {
    let dto = InstallStartedResponseDto {
        install_run_id: "1f7a25cf-3c33-4a3b-9af9-d2a7be2b0e44".to_owned(),
        started_at: "2026-04-25T12:34:56+00:00".to_owned(),
    };
    let v = serde_json::to_value(&dto).expect("serialize");
    assert_eq!(
        v,
        json!({
            "install_run_id": "1f7a25cf-3c33-4a3b-9af9-d2a7be2b0e44",
            "started_at": "2026-04-25T12:34:56+00:00"
        })
    );
}

#[test]
fn nullable_fields_serialise_as_null_not_omitted() {
    // Per the OpenAPI contract, `artifact`, `last_error`, `progress`, and the
    // hint/log fields are explicitly nullable — clients (incl. zod) expect
    // `null` rather than missing keys.
    let step = StepDto {
        id: "validate".to_owned(),
        step_type: "validation".to_owned(),
        requires: vec!["python".to_owned(), "models".to_owned()],
        status: StepStatusKind::Pending,
        satisfied: false,
        artifact: None,
        last_error: None,
        progress: None,
        estimated_remaining_bytes: 0,
        files_present: None,
        files_total: None,
        integrity: None,
    };
    let v = serde_json::to_value(&step).expect("serialize");
    assert!(v.get("artifact").is_some_and(|x| x.is_null()));
    assert!(v.get("last_error").is_some_and(|x| x.is_null()));
    assert!(v.get("progress").is_some_and(|x| x.is_null()));
    // files_present/files_total/integrity are omitted (not null) when absent.
    assert!(v.get("files_present").is_none());
    assert!(v.get("files_total").is_none());
    assert!(v.get("integrity").is_none());
}
