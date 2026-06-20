//! `POST /model-store/upload` — import a local weight file directly into the
//! model store, no URL required.
//!
//! Streams the multipart file field straight to the download sink (so multi-GB
//! weights never buffer in RAM) and records an installed-artifact row, so the
//! upload lands in exactly the same place a downloaded model would — it shows
//! up in `/model-store/installed` and every model picker. Source is tagged
//! `upload`; the body-size limit is disabled for this route at the router.

use axum::extract::{Multipart, State};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use serde::Serialize;
use tokio::io::AsyncWriteExt;

use nexus_models_store::downloads::InstalledArtifactRecord;
use nexus_models_store::ids::{ArtifactId, FamilyId, JobId};
use nexus_models_store::normalize::classify::classify_format;
use nexus_models_store::types::DependencyRole;

use crate::AppState;
use crate::envelope::ApiResponse;

const ALLOWED_EXTS: &[&str] = &["safetensors", "gguf", "ckpt", "pt", "pth", "bin"];

#[derive(Debug, Serialize)]
pub struct UploadResultDto {
    pub artifact_id: String,
    pub family_id: String,
    pub filename: String,
    pub size_bytes: u64,
    pub install_path: String,
}

/// Reduce a client-supplied name to a safe basename — no directories, no
/// traversal, no NUL — or `None` if it can't be made safe.
fn safe_basename(name: &str) -> Option<String> {
    let base = name.rsplit(['/', '\\']).next().unwrap_or(name).trim();
    if base.is_empty() || base == "." || base == ".." || base.contains('\0') {
        return None;
    }
    Some(base.to_owned())
}

fn has_allowed_ext(name: &str) -> bool {
    name.rsplit_once('.')
        .map(|(_, ext)| ALLOWED_EXTS.contains(&ext.to_ascii_lowercase().as_str()))
        .unwrap_or(false)
}

pub async fn upload_model(State(state): State<AppState>, mut multipart: Multipart) -> Response {
    let (Some(install_map), Some(orchestrator)) = (
        state.install_map.as_ref(),
        state.download_orchestrator.as_ref(),
    ) else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "MODEL_STORE_UNAVAILABLE",
            "unavailable",
            "model store is not configured on this host".to_owned(),
        )
        .into_response();
    };

    let mut field = match multipart.next_field().await {
        Ok(Some(f)) => f,
        Ok(None) => {
            return ApiResponse::<()>::bad_request("no file field in upload".to_owned())
                .into_response();
        }
        Err(e) => {
            return ApiResponse::<()>::bad_request(format!("malformed multipart body: {e}"))
                .into_response();
        }
    };

    let Some(raw_name) = field.file_name().map(str::to_owned) else {
        return ApiResponse::<()>::bad_request("upload field has no filename".to_owned())
            .into_response();
    };
    let Some(filename) = safe_basename(&raw_name) else {
        return ApiResponse::<()>::bad_request(format!("unsafe filename: {raw_name}"))
            .into_response();
    };
    if !has_allowed_ext(&filename) {
        return ApiResponse::<()>::bad_request(format!(
            "unsupported file type for '{filename}' — allowed: {}",
            ALLOWED_EXTS.join(", ")
        ))
        .into_response();
    }

    let job_id = JobId::from_uuid(uuid::Uuid::new_v4());
    let job_dir = orchestrator.sink_root().join(job_id.to_string());
    if let Err(e) = tokio::fs::create_dir_all(&job_dir).await {
        return ApiResponse::<()>::internal(format!("create upload dir: {e}")).into_response();
    }
    let dest = job_dir.join(&filename);

    let written = match stream_field_to_file(&mut field, &dest).await {
        Ok(n) => n,
        Err(e) => {
            let _ = tokio::fs::remove_dir_all(&job_dir).await;
            return ApiResponse::<()>::internal(format!("write upload: {e}")).into_response();
        }
    };
    if written == 0 {
        let _ = tokio::fs::remove_dir_all(&job_dir).await;
        return ApiResponse::<()>::bad_request("uploaded file is empty".to_owned()).into_response();
    }

    let family_id = FamilyId::from(format!("upload:{filename}"));
    let artifact_id = ArtifactId::from(format!("upload:{filename}#0"));
    let record = InstalledArtifactRecord {
        artifact_id: artifact_id.clone(),
        family_id: family_id.clone(),
        variant_id: None,
        format: classify_format(&filename),
        role: DependencyRole::Primary,
        source_provider: "upload".to_owned(),
        source_repo: filename.clone(),
        source_revision: None,
        filename: filename.clone(),
        job_id,
        sha256: None,
        size_bytes: Some(written),
    };
    if let Err(e) = install_map.record(record).await {
        let _ = tokio::fs::remove_dir_all(&job_dir).await;
        return ApiResponse::<()>::internal(format!("record install: {e}")).into_response();
    }

    ApiResponse::ok(UploadResultDto {
        artifact_id: artifact_id.to_string(),
        family_id: family_id.to_string(),
        filename,
        size_bytes: written,
        install_path: dest.display().to_string(),
    })
    .into_response()
}

/// Stream a multipart field's chunks to `dest`, returning the byte count.
async fn stream_field_to_file(
    field: &mut axum::extract::multipart::Field<'_>,
    dest: &std::path::Path,
) -> Result<u64, String> {
    let mut file = tokio::fs::File::create(dest)
        .await
        .map_err(|e| format!("create file: {e}"))?;
    let mut total: u64 = 0;
    loop {
        match field.chunk().await {
            Ok(Some(chunk)) => {
                file.write_all(&chunk)
                    .await
                    .map_err(|e| format!("write: {e}"))?;
                total += chunk.len() as u64;
            }
            Ok(None) => break,
            Err(e) => return Err(format!("read chunk: {e}")),
        }
    }
    file.flush().await.map_err(|e| format!("flush: {e}"))?;
    Ok(total)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn safe_basename_strips_dirs_and_rejects_traversal() {
        assert_eq!(
            safe_basename("model.safetensors").as_deref(),
            Some("model.safetensors")
        );
        assert_eq!(safe_basename("/abs/path/x.gguf").as_deref(), Some("x.gguf"));
        assert_eq!(
            safe_basename("a/b/../../etc/passwd").as_deref(),
            Some("passwd")
        );
        assert_eq!(
            safe_basename("C:\\Users\\x\\m.safetensors").as_deref(),
            Some("m.safetensors")
        );
        assert_eq!(safe_basename(".."), None);
        assert_eq!(safe_basename(""), None);
        assert_eq!(safe_basename("   "), None);
    }

    #[test]
    fn ext_allowlist_is_case_insensitive_and_rejects_unknown() {
        assert!(has_allowed_ext("m.safetensors"));
        assert!(has_allowed_ext("M.SafeTensors"));
        assert!(has_allowed_ext("w.gguf"));
        assert!(has_allowed_ext("c.ckpt"));
        assert!(!has_allowed_ext("evil.exe"));
        assert!(!has_allowed_ext("noext"));
        assert!(!has_allowed_ext(""));
    }
}
