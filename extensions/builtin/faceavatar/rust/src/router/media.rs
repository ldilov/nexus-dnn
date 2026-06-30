use std::path::{Path as FsPath, PathBuf};

use axum::body::Body;
use axum::extract::{Path, State};
use axum::http::{header, HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::get;
use axum::Router;
use tokio::io::{AsyncReadExt, AsyncSeekExt};
use tokio_util::io::ReaderStream;

use crate::domain::{Result, FaceAvatarError};
use crate::router::AppState;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/media/{*media_ref}", get(media).head(media_head))
        .route("/generate/jobs/{job_id}/output", get(job_output))
}

async fn media(
    State(state): State<AppState>,
    Path(media_ref): Path<String>,
    headers: HeaderMap,
) -> Response {
    let decoded = decode_ref(&media_ref);
    match serve_file(&state, &decoded, &headers).await {
        Ok(resp) => resp,
        Err(err) => err.into_response(),
    }
}

/// Existence probe for the same media path that `media` serves. Runs the
/// identical path-traversal guard and replies `200`/`404` with no body.
async fn media_head(State(state): State<AppState>, Path(media_ref): Path<String>) -> Response {
    let decoded = decode_ref(&media_ref);
    match resolve_in_workspace(&state, &decoded).await {
        Ok(_) => StatusCode::OK.into_response(),
        Err(err) => StatusCode::from_u16(err.status_code())
            .unwrap_or(StatusCode::INTERNAL_SERVER_ERROR)
            .into_response(),
    }
}

async fn job_output(
    State(state): State<AppState>,
    Path(job_id): Path<String>,
    headers: HeaderMap,
) -> Response {
    let id = match crate::domain::JobId::try_from(job_id.as_str()).map_err(FaceAvatarError::from) {
        Ok(id) => id,
        Err(err) => return err.into_response(),
    };
    let row = match state.store.get_job(id.as_str()).await {
        Ok(r) => r,
        Err(err) => return err.into_response(),
    };
    let Some(output) = row.output_glb_ref else {
        return FaceAvatarError::not_found("output not found").into_response();
    };
    match serve_file(&state, &output, &headers).await {
        Ok(resp) => resp,
        Err(err) => err.into_response(),
    }
}

fn decode_ref(media_ref: &str) -> String {
    urlencoding::decode(media_ref)
        .map_or_else(|_| media_ref.to_string(), std::borrow::Cow::into_owned)
}

/// A wire `ref` is workspace-RELATIVE; reject anything that escapes (absolute
/// path, or any `..`/root component). Pure, no I/O — runs before touching disk.
fn is_safe_relative(requested: &str) -> bool {
    let p = FsPath::new(requested);
    !p.is_absolute()
        && p.components().all(|c| {
            matches!(
                c,
                std::path::Component::Normal(_) | std::path::Component::CurDir
            )
        })
}

/// Resolve a workspace-relative ref to its canonical absolute location, refusing
/// any ref that escapes the extension workspace. Single chokepoint shared by
/// `serve_file` (GET) and `media_head` (HEAD).
async fn resolve_in_workspace(state: &AppState, requested: &str) -> Result<PathBuf> {
    resolve_under_root(&state.workspace_dir, requested).await
}

/// Resolve `requested` (workspace-RELATIVE) under `workspace_dir`: join, then
/// canonicalize both and enforce `starts_with(root)`. Rejects absolute/`..`
/// refs before any I/O. Kept independent of `AppState` so it's unit-testable.
pub async fn resolve_under_root(workspace_dir: &FsPath, requested: &str) -> Result<PathBuf> {
    if !is_safe_relative(requested) {
        return Err(FaceAvatarError::not_found("media not found"));
    }
    let canonical_root = tokio::fs::canonicalize(workspace_dir)
        .await
        .map_err(|e| FaceAvatarError::internal(format!("workspace dir unresolved: {e}")))?;

    let candidate = canonical_root.join(requested);
    let resolved = tokio::fs::canonicalize(&candidate)
        .await
        .map_err(|_| FaceAvatarError::not_found("media not found"))?;

    if !resolved.starts_with(&canonical_root) {
        return Err(FaceAvatarError::not_found("media not found"));
    }

    Ok(resolved)
}

/// Convert a worker-produced ABSOLUTE path into the workspace-RELATIVE wire ref
/// the client sees. Falls back to the input when it is not under the workspace
/// (defensive — the worker's `output_path` is always host-chosen under it).
#[must_use]
pub fn to_relative_ref(workspace_dir: &FsPath, abs_path: &str) -> String {
    let root = std::fs::canonicalize(workspace_dir).unwrap_or_else(|_| workspace_dir.to_path_buf());
    let abs = std::fs::canonicalize(abs_path).unwrap_or_else(|_| PathBuf::from(abs_path));
    match abs.strip_prefix(&root) {
        Ok(rel) => rel.to_string_lossy().replace('\\', "/"),
        Err(_) => abs_path.to_string(),
    }
}

/// Serve a file from the extension workspace, honouring a single-range
/// `Range: bytes=` request (206 partial) and always setting Content-Disposition
/// + an accurate Content-Type. Reuses `resolve_in_workspace` for the guard.
async fn serve_file(state: &AppState, requested: &str, headers: &HeaderMap) -> Result<Response> {
    let resolved = resolve_in_workspace(state, requested).await?;

    let mut file = tokio::fs::File::open(&resolved)
        .await
        .map_err(|_| FaceAvatarError::not_found("media not found"))?;
    let total = file
        .metadata()
        .await
        .map_err(|e| FaceAvatarError::internal(format!("stat failed: {e}")))?
        .len();

    let content_type = guess_content_type(&resolved);
    let filename = sanitize_filename(resolved.file_name().and_then(|n| n.to_str()));
    let disposition = format!("inline; filename=\"{filename}\"");

    let range = headers
        .get(header::RANGE)
        .and_then(|v| v.to_str().ok())
        .and_then(|s| parse_range(s, total));

    if let Some((start, end)) = range {
        let len = end - start + 1;
        file.seek(std::io::SeekFrom::Start(start))
            .await
            .map_err(|e| FaceAvatarError::internal(format!("seek failed: {e}")))?;
        let stream = ReaderStream::new(file.take(len));
        return Ok((
            StatusCode::PARTIAL_CONTENT,
            [
                (header::CONTENT_TYPE, content_type.to_string()),
                (header::CONTENT_DISPOSITION, disposition),
                (header::ACCEPT_RANGES, "bytes".to_string()),
                (
                    header::CONTENT_RANGE,
                    format!("bytes {start}-{end}/{total}"),
                ),
                (header::CONTENT_LENGTH, len.to_string()),
            ],
            Body::from_stream(stream),
        )
            .into_response());
    }

    let stream = ReaderStream::new(file);
    Ok((
        StatusCode::OK,
        [
            (header::CONTENT_TYPE, content_type.to_string()),
            (header::CONTENT_DISPOSITION, disposition),
            (header::ACCEPT_RANGES, "bytes".to_string()),
            (header::CONTENT_LENGTH, total.to_string()),
        ],
        Body::from_stream(stream),
    )
        .into_response())
}

/// Parse a single `bytes=start-end` range against `total`. Returns inclusive
/// `(start, end)` clamped to the file, or `None` for unsatisfiable/multi ranges.
fn parse_range(value: &str, total: u64) -> Option<(u64, u64)> {
    if total == 0 {
        return None;
    }
    let spec = value.strip_prefix("bytes=")?;
    if spec.contains(',') {
        return None;
    }
    let (start_s, end_s) = spec.split_once('-')?;
    let last = total - 1;
    let (start, end) = match (start_s.trim(), end_s.trim()) {
        ("", "") => return None,
        ("", suffix) => {
            let n: u64 = suffix.parse().ok()?;
            if n == 0 {
                return None;
            }
            (total.saturating_sub(n), last)
        }
        (s, "") => (s.parse().ok()?, last),
        (s, e) => (s.parse().ok()?, e.parse::<u64>().ok()?.min(last)),
    };
    if start > end || start > last {
        return None;
    }
    Some((start, end))
}

/// Restrict the Content-Disposition filename to `[A-Za-z0-9._-]` so a crafted
/// filename can't inject header bytes (CR/LF/quote). Falls back to `model.glb`.
fn sanitize_filename(name: Option<&str>) -> String {
    let cleaned: String = name
        .unwrap_or("")
        .chars()
        .filter(|c| c.is_ascii_alphanumeric() || matches!(c, '.' | '_' | '-'))
        .collect();
    if cleaned.is_empty() {
        "model.glb".to_string()
    } else {
        cleaned
    }
}

fn guess_content_type(path: &FsPath) -> &'static str {
    match path.extension().and_then(|e| e.to_str()) {
        Some("glb") => "model/gltf-binary",
        Some("gltf") => "model/gltf+json",
        Some("png") => "image/png",
        Some("jpg" | "jpeg") => "image/jpeg",
        Some("json") => "application/json",
        _ => "application/octet-stream",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn relative_ref_resolves_in_workspace_file() {
        let root = tempfile::tempdir().unwrap();
        let dir = root.path().join("uploads");
        tokio::fs::create_dir_all(&dir).await.unwrap();
        tokio::fs::write(dir.join("out.glb"), b"glb-bytes")
            .await
            .unwrap();

        let resolved = resolve_under_root(root.path(), "uploads/out.glb")
            .await
            .expect("in-workspace relative ref resolves");
        assert!(resolved.ends_with("out.glb"));
    }

    #[tokio::test]
    async fn relative_ref_404_for_missing_file() {
        let root = tempfile::tempdir().unwrap();
        let err = resolve_under_root(root.path(), "uploads/gone.glb")
            .await
            .expect_err("missing file -> 404");
        assert_eq!(err.status_code(), 404);
    }

    #[tokio::test]
    async fn rejects_dotdot_traversal_ref() {
        let root = tempfile::tempdir().unwrap();
        let err = resolve_under_root(root.path(), "../secret.glb")
            .await
            .expect_err("`..` ref rejected");
        assert_eq!(err.status_code(), 404);
        assert_eq!(err.to_string(), "resource not found: media not found");
    }

    #[tokio::test]
    async fn rejects_absolute_path_ref() {
        let root = tempfile::tempdir().unwrap();
        let outside = tempfile::tempdir().unwrap();
        let secret = outside.path().join("secret.glb");
        tokio::fs::write(&secret, b"secret").await.unwrap();

        let err = resolve_under_root(root.path(), secret.to_str().unwrap())
            .await
            .expect_err("absolute ref rejected");
        assert_eq!(err.status_code(), 404);
    }

    #[test]
    fn relative_ref_round_trips_through_absolute() {
        let root = tempfile::tempdir().unwrap();
        let dir = root.path().join("meshes").join("job");
        std::fs::create_dir_all(&dir).unwrap();
        let abs = dir.join("out.glb");
        std::fs::write(&abs, b"x").unwrap();
        let rel = to_relative_ref(root.path(), abs.to_str().unwrap());
        assert_eq!(rel, "meshes/job/out.glb");
    }

    #[test]
    fn sanitize_filename_strips_header_bytes() {
        assert_eq!(sanitize_filename(Some("a\r\nb\"c.glb")), "abc.glb");
        // Path separators are stripped (dots are allowed); the result carries no
        // CR/LF/quote/slash, so it can't inject a header or a path.
        let cleaned = sanitize_filename(Some("../../etc/passwd"));
        assert!(!cleaned.contains('/') && !cleaned.contains('\\'));
        assert!(cleaned.chars().all(|c| c.is_ascii_alphanumeric() || matches!(c, '.' | '_' | '-')));
        assert_eq!(sanitize_filename(None), "model.glb");
        assert_eq!(sanitize_filename(Some("")), "model.glb");
    }

    #[test]
    fn safe_relative_guard() {
        assert!(is_safe_relative("uploads/a.png"));
        assert!(!is_safe_relative("../x"));
        assert!(!is_safe_relative("a/../../x"));
        assert!(!is_safe_relative("/abs/x"));
    }

    #[test]
    fn range_parses_closed_interval() {
        assert_eq!(parse_range("bytes=0-99", 1000), Some((0, 99)));
    }

    #[test]
    fn range_open_end_clamps_to_last_byte() {
        assert_eq!(parse_range("bytes=500-", 1000), Some((500, 999)));
    }

    #[test]
    fn range_suffix_returns_tail() {
        assert_eq!(parse_range("bytes=-200", 1000), Some((800, 999)));
    }

    #[test]
    fn range_rejects_multi_and_unsatisfiable() {
        assert_eq!(parse_range("bytes=0-1,5-6", 1000), None);
        assert_eq!(parse_range("bytes=2000-3000", 1000), None);
        assert_eq!(parse_range("bytes=-", 1000), None);
    }

    #[test]
    fn glb_content_type_is_model_gltf_binary() {
        assert_eq!(
            guess_content_type(FsPath::new("/x/out.glb")),
            "model/gltf-binary"
        );
    }
}
