//! Axum `IntoResponse` mapping for `ModelStoreError`.
//!
//! Handlers under `/api/v1/model-store/*` should return
//! `Result<T, ModelStoreError>` and rely on this conversion to emit the
//! REST envelope with the stable snake-case `error.code` plus the HTTP
//! status defined on the error type (`contracts/rust-backend-adapter.md §4`).
//!
//! This centralises the mapping so new variants get a code + status in
//! exactly one place (the error enum itself), and the envelope shape
//! stays in lockstep across every handler.

use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};

use nexus_models_store::errors::ModelStoreError;

use crate::envelope::ApiResponse;

/// Category label shown in the REST envelope's `error.category` field.
/// Purely cosmetic — groups related variants so UIs can decide whether to
/// surface a banner, a toast, or an inline message.
fn category_for(err: &ModelStoreError) -> &'static str {
    match err {
        ModelStoreError::UpstreamUnavailable(_)
        | ModelStoreError::SourceUnreachable { .. } => "upstream",
        ModelStoreError::AuthRequired { .. } => "auth",
        ModelStoreError::FamilyNotFound(_)
        | ModelStoreError::TargetNotFound
        | ModelStoreError::InstallNotFound(_) => "not_found",
        ModelStoreError::Incompatible(_)
        | ModelStoreError::ChecksumMismatch { .. }
        | ModelStoreError::InsufficientResources { .. }
        | ModelStoreError::ManifestInvalid(_) => "validation",
        ModelStoreError::LeasedByExtensions { .. } => "conflict",
        ModelStoreError::Internal(_)
        | ModelStoreError::Storage(_)
        | ModelStoreError::Io(_) => "internal",
    }
}

/// Convert a `ModelStoreError` into an axum `Response` wrapped in the
/// standard REST envelope. Falls back to 500 if the enum carries a status
/// that cannot be represented (shouldn't happen — `status_u16()` always
/// returns a valid code).
pub fn into_response(err: ModelStoreError) -> Response {
    let status = StatusCode::from_u16(err.status_u16())
        .unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);
    let code = err.code();
    let category = category_for(&err);
    let message = err.to_string();
    ApiResponse::<()>::err(status, code, category, message).into_response()
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::http::StatusCode;

    #[test]
    fn auth_required_maps_to_401() {
        let resp =
            into_response(ModelStoreError::AuthRequired { repo: "meta/x".into() });
        assert_eq!(resp.status(), StatusCode::UNAUTHORIZED);
    }

    #[test]
    fn family_not_found_maps_to_404() {
        let resp = into_response(ModelStoreError::FamilyNotFound("x".into()));
        assert_eq!(resp.status(), StatusCode::NOT_FOUND);
    }

    #[test]
    fn upstream_unavailable_maps_to_502() {
        let resp =
            into_response(ModelStoreError::UpstreamUnavailable("timeout".into()));
        assert_eq!(resp.status(), StatusCode::BAD_GATEWAY);
    }

    #[test]
    fn incompatible_maps_to_422() {
        let resp = into_response(ModelStoreError::Incompatible("no backend".into()));
        assert_eq!(resp.status(), StatusCode::UNPROCESSABLE_ENTITY);
    }

    #[test]
    fn internal_maps_to_500() {
        let resp = into_response(ModelStoreError::Internal("boom".into()));
        assert_eq!(resp.status(), StatusCode::INTERNAL_SERVER_ERROR);
    }
}
