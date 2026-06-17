//! Multipart handler for `POST /api/v1/extensions/install-from-zip`.
//!
//! Streams the uploaded ZIP body to a file under the state-configured
//! staging root, hands the path off to [`ZipInstallPipeline`] under
//! `spawn_blocking`, refreshes the extension registry on success, and emits
//! a `ModuleInstalled` event (local bus only per FR-TP01).

use std::path::PathBuf;

use axum::Json;
use axum::extract::{Multipart, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use nexus_events::types::NexusEvent;
use nexus_extension::{ZipInstallError, ZipInstallPipeline, ZipInstallResult};
use semver::Version;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

pub async fn install_from_zip(
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> Result<impl IntoResponse, ApiError> {
    let extensions_root = state.extensions_dir.clone().ok_or_else(|| {
        ApiError::structured(
            StatusCode::SERVICE_UNAVAILABLE,
            "install.extensions_root_unconfigured",
            "server is not configured with an extensions directory; ZIP install is disabled",
        )
    })?;
    let staging_root = extensions_root.join(".zip-install-staging");
    tokio::fs::create_dir_all(&staging_root)
        .await
        .map_err(|e| ApiError::Internal(format!("create staging root: {e}")))?;

    let zip_path = receive_zip_field(&mut multipart, &staging_root).await?;

    let pipeline_root = extensions_root.clone();
    let pipeline_staging = staging_root.clone();
    let zip_for_task = zip_path.clone();
    let result = tokio::task::spawn_blocking(move || {
        let pipeline = ZipInstallPipeline::new(pipeline_root, pipeline_staging);
        pipeline.install_from_file(&zip_for_task)
    })
    .await
    .map_err(|e| ApiError::Internal(format!("pipeline join: {e}")))?;

    // Remove the uploaded ZIP regardless of outcome — the pipeline's staging
    // RAII already cleaned up its own working dir, but it never owned the
    let _ = tokio::fs::remove_file(&zip_path).await;

    let result: ZipInstallResult = result.map_err(zip_install_err_to_api)?;

    refresh_registry(&state, &extensions_root)?;

    state.event_bus.publish(NexusEvent::ModuleInstalled {
        extension_id: result.extension_id.clone(),
        module_id: result.module_id.clone(),
    });

    Ok((StatusCode::CREATED, Json(ApiResponse::ok(result))))
}

async fn receive_zip_field(
    multipart: &mut Multipart,
    staging_root: &std::path::Path,
) -> Result<PathBuf, ApiError> {
    let upload_name = format!("upload-{}.zip", uuid::Uuid::new_v4().simple());
    let upload_path = staging_root.join(upload_name);
    let mut file = File::create(&upload_path)
        .await
        .map_err(|e| ApiError::Internal(format!("create upload file: {e}")))?;

    let mut got_any = false;
    while let Some(mut field) = multipart.next_field().await.map_err(|e| {
        ApiError::structured(
            StatusCode::BAD_REQUEST,
            "install.multipart_invalid",
            format!("multipart parse error: {e}"),
        )
    })? {
        // Accept any field — single-file-upload form, field name is not
        // load-bearing. First field with bytes wins.
        while let Some(chunk) = field.chunk().await.map_err(|e| {
            ApiError::structured(
                StatusCode::BAD_REQUEST,
                "install.multipart_invalid",
                format!("multipart read error: {e}"),
            )
        })? {
            got_any = true;
            file.write_all(&chunk)
                .await
                .map_err(|e| ApiError::Internal(format!("write upload: {e}")))?;
        }
        if got_any {
            break;
        }
    }
    file.flush()
        .await
        .map_err(|e| ApiError::Internal(format!("flush upload: {e}")))?;
    drop(file);

    if !got_any {
        let _ = tokio::fs::remove_file(&upload_path).await;
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "install.empty_upload",
            "multipart body did not contain any file bytes",
        ));
    }
    Ok(upload_path)
}

fn refresh_registry(state: &AppState, extensions_root: &std::path::Path) -> Result<(), ApiError> {
    // Spec 019 pipeline step 11 — make the newly-installed extension visible
    // to the in-process registry. We use the same host/protocol versions the
    let host_version = Version::new(1, 0, 0);
    let protocol_version = Version::new(1, 0, 0);
    state
        .extension_registry
        .refresh(extensions_root, &host_version, &protocol_version)
        .map_err(|e| ApiError::Internal(format!("registry refresh: {e}")))?;
    Ok(())
}

fn zip_install_err_to_api(err: ZipInstallError) -> ApiError {
    let status = match &err {
        ZipInstallError::SlipAttempt
        | ZipInstallError::MissingManifest
        | ZipInstallError::ExecutableOutsideAssets { .. }
        | ZipInstallError::Corrupt(_)
        | ZipInstallError::SizeLimit { .. }
        | ZipInstallError::FileCountLimit { .. }
        | ZipInstallError::ManifestInvalid(_)
        | ZipInstallError::ManifestIconInvalid(_) => StatusCode::UNPROCESSABLE_ENTITY,
        ZipInstallError::AlreadyInstalled { .. } => StatusCode::CONFLICT,
        ZipInstallError::StageFailed(_) => StatusCode::INTERNAL_SERVER_ERROR,
        // Fallthrough arm required because `ZipInstallError` is `#[non_exhaustive]`.
        // New variants should land their own branch above before any release.
        _ => StatusCode::UNPROCESSABLE_ENTITY,
    };
    ApiError::structured(status, err.code(), err.to_string())
}
