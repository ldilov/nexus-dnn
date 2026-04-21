use std::collections::HashSet;
use std::path::PathBuf;

use axum::Json;
use axum::body::Body;
use axum::extract::{Path, State};
use axum::http::{HeaderValue, StatusCode, header};
use axum::response::{IntoResponse, Response};
use serde::Serialize;
use tokio::io::AsyncReadExt;

use nexus_extension::ExtensionRegistry;

use crate::AppState;
use crate::handlers::ui_components::{
    CATALOG_SCHEMA_VERSION, ExtensionComponentSummary, ExtensionComponentsEnvelope,
};

#[derive(Serialize)]
struct ApiErrorBody {
    status: &'static str,
    code: &'static str,
    message: String,
}

fn error_response(status: StatusCode, code: &'static str, message: impl Into<String>) -> Response {
    let body = ApiErrorBody {
        status: "error",
        code,
        message: message.into(),
    };
    (status, Json(body)).into_response()
}

pub async fn list_extension_components(
    State(state): State<AppState>,
) -> Json<ExtensionComponentsEnvelope> {
    let host_tags: HashSet<String> = HashSet::new();
    let registrations = state
        .extension_registry
        .collect_custom_elements(&host_tags)
        .unwrap_or_default();
    let components: Vec<ExtensionComponentSummary> = registrations
        .into_iter()
        .map(|r| ExtensionComponentSummary {
            extension_id: r.extension_id.clone(),
            tag: r.tag,
            asset_href: format!(
                "/api/v1/extensions/{}/ui/{}",
                r.extension_id, r.module
            ),
            entry: r.entry,
        })
        .collect();
    Json(ExtensionComponentsEnvelope {
        schema_version: CATALOG_SCHEMA_VERSION.to_string(),
        components,
    })
}

pub async fn serve_extension_asset(
    State(state): State<AppState>,
    Path((id, asset_path)): Path<(String, String)>,
) -> Response {
    if asset_path.contains("..")
        || asset_path.contains('\0')
        || asset_path.starts_with('/')
        || asset_path.starts_with('\\')
    {
        return error_response(
            StatusCode::BAD_REQUEST,
            "path_escaped_root",
            format!("requested path '{asset_path}' is not permitted"),
        );
    }

    let Some(ext) = state.extension_registry.get_extension(&id) else {
        return error_response(
            StatusCode::NOT_FOUND,
            "extension_not_found",
            format!("extension '{id}' is not installed"),
        );
    };

    let Some(ui) = ext.manifest.ui.as_ref() else {
        return error_response(
            StatusCode::NOT_FOUND,
            "no_ui_assets",
            format!("extension '{id}' declares no UI assets"),
        );
    };
    let Some(assets) = ui.assets.as_ref() else {
        return error_response(
            StatusCode::NOT_FOUND,
            "no_ui_assets",
            format!("extension '{id}' has no ui.assets declaration"),
        );
    };

    let assets_root_abs = match nexus_extension::registry::custom_elements::canonical_assets_root(
        &ext.directory,
        assets,
        &id,
    ) {
        Ok(p) => p,
        Err(_) => {
            return error_response(
                StatusCode::NOT_FOUND,
                "no_ui_assets",
                format!("extension '{id}' assets root is invalid"),
            );
        }
    };

    let requested_rel = PathBuf::from(&asset_path);
    let candidate = assets_root_abs.join(&requested_rel);
    let canonical = match std::fs::canonicalize(&candidate) {
        Ok(p) => p,
        Err(_) => {
            return error_response(
                StatusCode::NOT_FOUND,
                "asset_not_found",
                format!("asset '{asset_path}' not found in extension '{id}'"),
            );
        }
    };
    if !canonical.starts_with(&assets_root_abs) {
        return error_response(
            StatusCode::BAD_REQUEST,
            "path_escaped_root",
            format!("asset path '{asset_path}' resolved outside the extension assets root via symlink or traversal"),
        );
    }
    let metadata = match std::fs::metadata(&canonical) {
        Ok(m) => m,
        Err(_) => {
            return error_response(
                StatusCode::NOT_FOUND,
                "asset_not_found",
                format!("asset '{asset_path}' metadata unavailable"),
            );
        }
    };
    if !metadata.is_file() {
        return error_response(
            StatusCode::NOT_FOUND,
            "asset_not_found",
            format!("asset '{asset_path}' is not a file"),
        );
    }

    let mut file = match tokio::fs::File::open(&canonical).await {
        Ok(f) => f,
        Err(_) => {
            return error_response(
                StatusCode::NOT_FOUND,
                "asset_not_found",
                format!("asset '{asset_path}' could not be opened"),
            );
        }
    };
    let mut bytes = Vec::new();
    if file.read_to_end(&mut bytes).await.is_err() {
        return error_response(
            StatusCode::INTERNAL_SERVER_ERROR,
            "read_failed",
            format!("failed to read asset '{asset_path}'"),
        );
    }

    let content_type = guess_content_type(&canonical);
    let etag = weak_etag(&metadata);
    let content_length = bytes.len();
    let mut resp = Response::new(Body::from(bytes));
    resp.headers_mut().insert(
        header::CONTENT_TYPE,
        HeaderValue::from_str(content_type).unwrap_or(HeaderValue::from_static("application/octet-stream")),
    );
    resp.headers_mut().insert(
        header::CONTENT_LENGTH,
        HeaderValue::from(content_length),
    );
    resp.headers_mut().insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("public, max-age=300, must-revalidate"),
    );
    if let Ok(value) = HeaderValue::from_str(&etag) {
        resp.headers_mut().insert(header::ETAG, value);
    }
    resp
}

fn weak_etag(metadata: &std::fs::Metadata) -> String {
    let len = metadata.len();
    let mtime = metadata
        .modified()
        .ok()
        .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
        .map(|d| d.as_nanos())
        .unwrap_or(0);
    format!("W/\"{len:x}-{mtime:x}\"")
}

fn guess_content_type(path: &std::path::Path) -> &'static str {
    let name = path
        .file_name()
        .and_then(|s| s.to_str())
        .unwrap_or("")
        .to_ascii_lowercase();
    if name.ends_with(".js") || name.ends_with(".mjs") || name.ends_with(".esm.js") {
        "text/javascript; charset=utf-8"
    } else if name.ends_with(".css") {
        "text/css; charset=utf-8"
    } else if name.ends_with(".json") {
        "application/json; charset=utf-8"
    } else if name.ends_with(".html") || name.ends_with(".htm") {
        "text/html; charset=utf-8"
    } else if name.ends_with(".svg") {
        "image/svg+xml"
    } else if name.ends_with(".png") {
        "image/png"
    } else if name.ends_with(".wasm") {
        "application/wasm"
    } else {
        "application/octet-stream"
    }
}
