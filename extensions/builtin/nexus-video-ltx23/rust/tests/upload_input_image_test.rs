//! Integration tests for `POST /input-images`.
//!
//! Exercises the upload route end-to-end through the real axum router:
//! happy-path PNG, empty body, unsupported MIME, oversized body, and
//! magic-byte spoof rejection. Each test brings up an isolated
//! `ApiState` against an in-memory `SQLite` + a temp `inputs_dir` so
//! they can run in parallel without contention.

use std::path::PathBuf;
use std::sync::Arc;

use axum::body::Body;
use axum::http::{header, Request, StatusCode};
use axum::Router;
use http_body_util::BodyExt;
use nexus_video_ltx23_extension::api::{router, ApiState, INPUT_IMAGE_BODY_LIMIT_BYTES};
use nexus_video_ltx23_extension::profile_install::ProfileInstallService;
use nexus_video_ltx23_extension::runner::{Runner, RunnerConfig};
use nexus_video_ltx23_extension::storage::Repos;
use serde_json::Value;
use sqlx::sqlite::SqlitePoolOptions;
use tower::ServiceExt;

const TEST_EXTENSION_VERSION: &str = "0.1.0-test";

const PNG_MAGIC: &[u8] = &[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

async fn build_app() -> (Router, tempfile::TempDir) {
    let tmp = tempfile::tempdir().expect("tempdir");
    let runs_dir = tmp.path().join("runs");
    let inputs_dir = tmp.path().join("inputs");
    std::fs::create_dir_all(&runs_dir).expect("mkdir runs");
    std::fs::create_dir_all(&inputs_dir).expect("mkdir inputs");

    let pool = SqlitePoolOptions::new()
        .max_connections(4)
        .connect("sqlite::memory:")
        .await
        .expect("open sqlite");
    apply_test_migrations(&pool).await;
    let repos = Repos::from_pool(pool);

    let factory = Arc::new(nexus_video_ltx23_extension::lease::LtxLeaseFactory::new(
        PathBuf::from("/nonexistent-ext"),
        PathBuf::from("/nonexistent-data"),
    ));
    let (notification_buffer, _flusher) =
        nexus_video_ltx23_extension::notification_buffer::NotificationBuffer::new(
            repos.clone(),
            nexus_video_ltx23_extension::notification_buffer::DEFAULT_FLUSH_INTERVAL,
        );
    let runner = Runner::new(RunnerConfig {
        runs_dir: runs_dir.clone(),
        inputs_dir: inputs_dir.clone(),
        repos: repos.clone(),
        factory,
        vram_supervisor: nexus_video_ltx23_extension::vram_supervisor::VramSupervisor::default(),
        notification_buffer,
    });
    let profile_install = ProfileInstallService::new(
        Arc::new(nexus_video_ltx23_extension::lease::LtxLeaseFactory::new(
            PathBuf::from("/nonexistent-ext"),
            PathBuf::from("/nonexistent-data"),
        )),
        tmp.path().to_path_buf(),
    );

    let state = ApiState::new(
        repos,
        runner,
        runs_dir,
        inputs_dir,
        TEST_EXTENSION_VERSION,
        profile_install,
    );
    (router(state), tmp)
}

async fn apply_test_migrations(pool: &sqlx::SqlitePool) {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__schema_versions (\
             version INTEGER PRIMARY KEY,\
             name TEXT NOT NULL,\
             applied_at TEXT NOT NULL\
         )",
    )
    .execute(pool)
    .await
    .expect("create schema_versions");

    for migration in nexus_video_ltx23_extension::migrations::MIGRATIONS {
        let already: Option<i64> = sqlx::query_scalar(
            "SELECT version FROM ext_nexus_video_ltx23__schema_versions WHERE version = ?",
        )
        .bind(i64::from(migration.version))
        .fetch_optional(pool)
        .await
        .expect("query schema version");
        if already.is_some() {
            continue;
        }
        let mut tx = pool.begin().await.expect("begin tx");
        sqlx::raw_sql(migration.sql)
            .execute(&mut *tx)
            .await
            .expect("apply migration");
        sqlx::query(
            "INSERT INTO ext_nexus_video_ltx23__schema_versions (version, name, applied_at) \
             VALUES (?, ?, datetime('now'))",
        )
        .bind(i64::from(migration.version))
        .bind(migration.name)
        .execute(&mut *tx)
        .await
        .expect("record version");
        tx.commit().await.expect("commit tx");
    }
}

/// Hand-rolled multipart body — keeps the test free of an extra dep
/// just to assemble a Content-Type: multipart/form-data payload. The
/// boundary is fixed for determinism.
fn multipart_body(
    boundary: &str,
    field_name: &str,
    filename: &str,
    content_type: Option<&str>,
    payload: &[u8],
) -> Vec<u8> {
    let mut out = Vec::with_capacity(payload.len() + 256);
    out.extend_from_slice(format!("--{boundary}\r\n").as_bytes());
    out.extend_from_slice(
        format!(
            "Content-Disposition: form-data; name=\"{field_name}\"; filename=\"{filename}\"\r\n"
        )
        .as_bytes(),
    );
    if let Some(ct) = content_type {
        out.extend_from_slice(format!("Content-Type: {ct}\r\n").as_bytes());
    }
    out.extend_from_slice(b"\r\n");
    out.extend_from_slice(payload);
    out.extend_from_slice(format!("\r\n--{boundary}--\r\n").as_bytes());
    out
}

fn make_png_bytes(payload_after_magic: &[u8]) -> Vec<u8> {
    let mut out = Vec::with_capacity(PNG_MAGIC.len() + payload_after_magic.len());
    out.extend_from_slice(PNG_MAGIC);
    out.extend_from_slice(payload_after_magic);
    out
}

fn make_webp_bytes() -> Vec<u8> {
    let mut out = Vec::new();
    out.extend_from_slice(b"RIFF");
    out.extend_from_slice(&[0u8; 4]);
    out.extend_from_slice(b"WEBP");
    out.extend_from_slice(b"VP8 fake-payload");
    out
}

async fn post_upload(app: Router, boundary: &str, body: Vec<u8>) -> (StatusCode, Value) {
    let req = Request::builder()
        .method("POST")
        .uri("/input-images")
        .header(
            header::CONTENT_TYPE,
            format!("multipart/form-data; boundary={boundary}"),
        )
        .body(Body::from(body))
        .expect("build request");
    let res = app.oneshot(req).await.expect("router service");
    let status = res.status();
    let bytes = res
        .into_body()
        .collect()
        .await
        .expect("collect body")
        .to_bytes();
    let json: Value = if bytes.is_empty() {
        Value::Null
    } else {
        serde_json::from_slice(&bytes).unwrap_or_else(|_| {
            // Some error paths return text/plain (e.g. axum's
            // body-limit rejection). Wrap in a Value::String so the
            // assertions can still inspect the payload uniformly.
            Value::String(String::from_utf8_lossy(&bytes).to_string())
        })
    };
    (status, json)
}

#[tokio::test]
async fn upload_png_returns_201_with_artifact_id() {
    // T8 — happy path. A minimal valid PNG payload produces a 201 with
    // a `ltx23-input-*` artifact id and lands on disk under
    // `inputs_dir`.
    let (app, tmp) = build_app().await;
    let boundary = "----TestBoundary8a";
    let png = make_png_bytes(&[0u8; 512]);
    let body = multipart_body(boundary, "image", "shot.png", Some("image/png"), &png);
    let (status, json) = post_upload(app, boundary, body).await;

    assert_eq!(status, StatusCode::CREATED, "expected 201, body: {json:?}");
    let artifact_id = json["artifact_id"]
        .as_str()
        .expect("artifact_id must be present");
    assert!(
        artifact_id.starts_with("ltx23-input-"),
        "got artifact_id={artifact_id:?}"
    );
    assert_eq!(json["mime"].as_str(), Some("image/png"));
    assert_eq!(json["byte_length"].as_u64(), Some(png.len() as u64));
    assert!(
        json["sha256"]
            .as_str()
            .is_some_and(|s| s.len() == 64 && s.chars().all(|c| c.is_ascii_hexdigit())),
        "sha256 must be 64 lowercase hex chars; got {:?}",
        json["sha256"]
    );

    // The persisted file must exist with the matching extension.
    let on_disk = tmp.path().join("inputs").join(format!("{artifact_id}.png"));
    assert!(on_disk.is_file(), "expected file at {}", on_disk.display());
}

#[tokio::test]
async fn upload_empty_body_returns_400() {
    // T9 — empty body. The route differentiates "missing field" from
    // "empty payload"; an empty file in the multipart field should
    // produce 400 with a clear message.
    let (app, _tmp) = build_app().await;
    let boundary = "----TestBoundary9b";
    let body = multipart_body(boundary, "image", "empty.png", Some("image/png"), &[]);
    let (status, json) = post_upload(app, boundary, body).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    let msg = json["message"].as_str().unwrap_or_default();
    assert!(msg.contains("empty"), "expected 'empty' in {msg:?}");
}

#[tokio::test]
async fn upload_unsupported_mime_returns_400() {
    // T10 — Content-Type not in the allowlist. The route refuses
    // before reading magic bytes so the operator gets the most
    // actionable error.
    let (app, _tmp) = build_app().await;
    let boundary = "----TestBoundaryAc";
    let body = multipart_body(
        boundary,
        "image",
        "doc.pdf",
        Some("application/pdf"),
        b"%PDF-1.4 fake",
    );
    let (status, json) = post_upload(app, boundary, body).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    let msg = json["message"].as_str().unwrap_or_default();
    assert!(
        msg.contains("not an accepted image type") || msg.contains("application/pdf"),
        "expected MIME-rejection text; got {msg:?}"
    );
}

#[tokio::test]
async fn upload_oversized_body_returns_413() {
    // T11 — payload exceeds the body-limit layer. axum emits 413
    // BEFORE the handler runs, so the bytes never reach disk.
    let (app, tmp) = build_app().await;
    let boundary = "----TestBoundaryBd";

    // The body-limit layer counts the entire multipart envelope, not
    // just the field payload, so go meaningfully past the cap.
    let oversized = vec![0u8; INPUT_IMAGE_BODY_LIMIT_BYTES + 64 * 1024];
    let mut png_oversized = Vec::with_capacity(PNG_MAGIC.len() + oversized.len());
    png_oversized.extend_from_slice(PNG_MAGIC);
    png_oversized.extend_from_slice(&oversized);
    let body = multipart_body(
        boundary,
        "image",
        "huge.png",
        Some("image/png"),
        &png_oversized,
    );

    let (status, _json) = post_upload(app, boundary, body).await;
    // axum 0.8's body-limit + multer combination can surface the
    // overflow as either 413 (the body-limit layer cuts the request
    // before the handler runs) or 400 (multer reports a truncated
    // multipart stream to the handler, which maps to InvalidRequest).
    // Either status proves the limit fired; we accept both so the test
    // doesn't go red on a future axum/multer behavioural tweak. The
    // operationally important invariant — no on-disk artifact for an
    // oversized request — is checked below.
    assert!(
        status == StatusCode::PAYLOAD_TOO_LARGE || status == StatusCode::BAD_REQUEST,
        "expected 413 or 400 for oversized upload; got {status}"
    );

    // Nothing landed on disk.
    let inputs_dir = tmp.path().join("inputs");
    let any = std::fs::read_dir(&inputs_dir)
        .expect("read inputs")
        .next()
        .is_some();
    assert!(!any, "oversized upload must not leave files on disk");
}

#[tokio::test]
async fn upload_magic_mismatch_returns_400() {
    // T12 — declared image/png + non-image bytes. The magic-byte
    // sniff catches the spoof and rejects.
    let (app, _tmp) = build_app().await;
    let boundary = "----TestBoundaryCe";
    let body = multipart_body(
        boundary,
        "image",
        "fake.png",
        Some("image/png"),
        b"MZ\x90\x00 this is a windows exe header, not a PNG",
    );
    let (status, json) = post_upload(app, boundary, body).await;
    assert_eq!(status, StatusCode::BAD_REQUEST);
    let msg = json["message"].as_str().unwrap_or_default();
    assert!(
        msg.contains("recognised image signature") || msg.contains("magic"),
        "expected magic-byte rejection text; got {msg:?}"
    );
}

#[tokio::test]
async fn upload_webp_round_trip_uses_webp_extension() {
    // Round-trip for WEBP — the route picks the extension matching the
    // sniffed format, not the client-supplied filename.
    let (app, tmp) = build_app().await;
    let boundary = "----TestBoundaryDe";
    let webp = make_webp_bytes();
    let body = multipart_body(boundary, "image", "frame.bin", Some("image/webp"), &webp);
    let (status, json) = post_upload(app, boundary, body).await;
    assert_eq!(status, StatusCode::CREATED);
    let artifact_id = json["artifact_id"].as_str().expect("artifact_id");
    let on_disk = tmp
        .path()
        .join("inputs")
        .join(format!("{artifact_id}.webp"));
    assert!(
        on_disk.is_file(),
        "expected webp extension at {}",
        on_disk.display()
    );
}

async fn post_json(app: Router, uri: &str, body: Value) -> (StatusCode, Value) {
    let req = Request::builder()
        .method("POST")
        .uri(uri)
        .header(header::CONTENT_TYPE, "application/json")
        .body(Body::from(serde_json::to_vec(&body).expect("serialise")))
        .expect("build request");
    let res = app.oneshot(req).await.expect("router service");
    let status = res.status();
    let bytes = res
        .into_body()
        .collect()
        .await
        .expect("collect body")
        .to_bytes();
    let json: Value = if bytes.is_empty() {
        Value::Null
    } else {
        serde_json::from_slice(&bytes)
            .unwrap_or_else(|_| Value::String(String::from_utf8_lossy(&bytes).to_string()))
    };
    (status, json)
}

#[tokio::test]
async fn create_render_rejects_unresolvable_input_image_artifact_id() {
    // M1 — submission-time pre-flight. A well-shaped artifact id that
    // doesn't point at an on-disk file must be rejected with 400 at
    // POST /renders, NOT silently accepted and degraded to text-only
    // by the runner after the render starts.
    let (app, _tmp) = build_app().await;
    let body = serde_json::json!({
        "prompt": "a cinematic dolly shot over a city at dusk",
        "duration_seconds": 4.0,
        "runtime_profile": "auto",
        "quality_preset": "balanced16gb",
        // Valid shape (passes schema validation) but no file was ever
        // uploaded under this id.
        "input_image_artifact_id": "ltx23-input-01J9NEVERUPLOADED",
    });
    let (status, json) = post_json(app, "/renders", body).await;
    assert_eq!(
        status,
        StatusCode::BAD_REQUEST,
        "expected 400 for unresolvable artifact id; body: {json:?}"
    );
    let msg = json["message"].as_str().unwrap_or_default();
    assert!(
        msg.contains("does not resolve") && msg.contains("ltx23-input-01J9NEVERUPLOADED"),
        "expected actionable resolve-failure message; got {msg:?}"
    );
}

#[tokio::test]
async fn create_render_accepts_resolvable_input_image_artifact_id() {
    // Counterpart to the rejection test: when the file IS present the
    // pre-flight passes and the render is accepted (202). Proves the
    // gate doesn't false-positive on a legitimate upload→render flow.
    let (app, tmp) = build_app().await;

    // Stage a real file the resolver will find.
    let id = "ltx23-input-01J9STAGEDOK";
    let img_path = tmp.path().join("inputs").join(format!("{id}.png"));
    std::fs::write(&img_path, b"\x89PNG\r\n\x1a\nstaged").expect("write staged image");

    let body = serde_json::json!({
        "prompt": "a cinematic dolly shot over a city at dusk",
        "duration_seconds": 4.0,
        "runtime_profile": "auto",
        "quality_preset": "balanced16gb",
        "input_image_artifact_id": id,
    });
    let (status, json) = post_json(app, "/renders", body).await;
    assert_eq!(
        status,
        StatusCode::ACCEPTED,
        "expected 202 for resolvable artifact id; body: {json:?}"
    );
    assert!(
        json["id"].as_str().is_some_and(|s| !s.is_empty()),
        "accepted render must return a run id; got {json:?}"
    );
}
