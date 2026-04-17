//! `POST /api/v1/backends/load-model` — the one call extensions make when
//! they want to start using a model.
//!
//! Design:
//! - Extensions don't need to know which runtime family a model needs. The
//!   host reads `host_model_installs.family` (e.g. `llama-cpp-gguf`) and
//!   routes to the correct runtime adapter. Today only llama.cpp is wired.
//! - Extensions don't spawn runtimes directly via `POST /backends/{id}/lease`.
//!   The host owns that step: resolve ready runtime install → build CLI
//!   args with `--model <path>` + hyperparameter flags → Spawner::spawn.
//! - Hyperparameters are validated against
//!   `nexus-backend-runtimes::parameter_catalog`. Flags marked
//!   `managed-spawn-disallowed` (e.g. `--port`, `--host`) are rejected with
//!   400 `MANAGED_SPAWN_DISALLOWED`; everything else passes through as
//!   `--<flag> <value>` args.

use std::collections::BTreeMap;

use axum::Json;
use axum::extract::State;
use axum::http::{HeaderMap, StatusCode};
use axum::response::{IntoResponse, Response};
use serde::{Deserialize, Serialize};

use nexus_backend_runtimes::RuntimeFamily;
use nexus_backend_runtimes::parameter_catalog::ParameterPolicy;
use nexus_backend_runtimes::settings::AcceleratorProfile;
use nexus_backend_runtimes::spawn::{RuntimeBindMode, SpawnRuntimeRequest};
use nexus_models_store::list_all_visible;

use super::{extension_from_headers, spawn_error_response};
use crate::AppState;
use crate::envelope::ApiResponse;

#[derive(Debug, Deserialize)]
pub struct LoadModelRequest {
    /// Host-model-store install id of the model the extension wants to use.
    pub model_install_id: String,
    /// Free-form hyperparameters. Keys are CLI flags without the leading
    /// dashes (e.g. "ctx-size", "n-gpu-layers", "parallel"). Values are
    /// stringified. The catalog decides which ones are allowed.
    #[serde(default)]
    pub hyperparameters: BTreeMap<String, String>,
    /// Optional accelerator preference. Defaults to `cpu` so callers who
    /// don't care get a sane fallback.
    #[serde(default)]
    pub accelerator: Option<AcceleratorProfile>,
    /// Optional runtime version constraint (e.g. `>=4970`). Passed through
    /// to `runtime_installs_store::resolve_dependency`.
    #[serde(default)]
    pub version_req: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct LoadModelResponse {
    pub runtime_lease: nexus_backend_runtimes::lease::RuntimeLease,
    pub progress_channel: String,
    /// The install id of the runtime that was picked to host the model —
    /// lets the extension poll `/backends/{id}` for details if it wants.
    pub runtime_install_id: String,
    /// Echo back the model's family so the UI can render family-specific
    /// affordances without a second round-trip.
    pub model_family: String,
}

/// `POST /api/v1/backends/load-model`
///
/// Orchestrates: resolve model → pick runtime family → validate params →
/// spawn runtime with `--model <path>` + hyperparameter flags.
pub async fn load_model(
    State(state): State<AppState>,
    headers: HeaderMap,
    Json(body): Json<LoadModelRequest>,
) -> Response {
    let Some(extension_id) = extension_from_headers(&headers) else {
        return ApiResponse::<()>::err(
            StatusCode::BAD_REQUEST,
            "MISSING_EXTENSION_HEADER",
            "validation",
            "X-Extension-Id header required".into(),
        )
        .into_response();
    };

    // 1. Resolve the model.
    let pool = state.db.pool();
    let installs = match list_all_visible(pool, Some(extension_id.as_str())).await {
        Ok(v) => v,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "MODEL_LIST_FAILED",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };
    let Some(model) = installs
        .into_iter()
        .find(|m| m.install_id == body.model_install_id)
    else {
        return ApiResponse::<()>::err(
            StatusCode::NOT_FOUND,
            "MODEL_NOT_FOUND",
            "not_found",
            format!(
                "no host-installed model with install_id {}",
                body.model_install_id
            ),
        )
        .into_response();
    };
    if model.state != "ready" {
        return ApiResponse::<()>::err(
            StatusCode::CONFLICT,
            "MODEL_NOT_READY",
            "state",
            format!(
                "model {} is in state {}; expected ready",
                model.install_id, model.state
            ),
        )
        .into_response();
    }

    // 2. Route model family → runtime family. Today all llama-cpp-* formats
    //    route to the llama.cpp adapter. Extensible via match arms.
    let runtime_family = match model.family.as_str() {
        f if f.starts_with("llama-cpp") => RuntimeFamily::LLAMA_CPP,
        other => {
            return ApiResponse::<()>::err(
                StatusCode::UNPROCESSABLE_ENTITY,
                "MODEL_FAMILY_UNSUPPORTED",
                "validation",
                format!("no runtime adapter handles model family {other}"),
            )
            .into_response();
        }
    };

    // 3. Validate hyperparameters against the parameter catalog. Reject any
    //    flags marked managed-spawn-disallowed (port/host/etc.) — those
    //    belong to the host, not the extension.
    let catalog = match nexus_backend_runtimes::parameter_catalog::catalog_for(runtime_family) {
        Ok(c) => c,
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "CATALOG_LOAD_FAILED",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };
    for key in body.hyperparameters.keys() {
        let flag = normalize_flag(key);
        if let Some(entry) = catalog.lookup_flag(&flag) {
            if matches!(entry.policy, ParameterPolicy::ManagedSpawnDisallowed) {
                return ApiResponse::<()>::err(
                    StatusCode::BAD_REQUEST,
                    "MANAGED_SPAWN_DISALLOWED",
                    "validation",
                    format!("parameter {flag} is host-managed; extensions cannot set it"),
                )
                .into_response();
            }
        }
    }

    // 4. Resolve the matching runtime install. Must exist + be installed.
    let runtime_row = match nexus_backend_runtimes::runtime_installs_store::resolve_dependency(
        pool,
        runtime_family,
        body.version_req.as_deref(),
        &[],
    )
    .await
    {
        Ok(Some(r)) => r,
        Ok(None) => {
            return ApiResponse::<()>::err(
                StatusCode::CONFLICT,
                "RUNTIME_NOT_INSTALLED",
                "state",
                format!(
                    "no ready {runtime_family} runtime install; install it via /backends/{runtime_family}/install first"
                ),
            )
            .into_response();
        }
        Err(e) => {
            return ApiResponse::<()>::err(
                StatusCode::INTERNAL_SERVER_ERROR,
                "RUNTIME_RESOLVE_FAILED",
                "internal",
                e.to_string(),
            )
            .into_response();
        }
    };

    // 5. Build the CLI args. `--model <install_root>/<variant>` is the
    //    critical one — without it llama-server idles and refuses requests.
    let model_path = format!("{}/{}", model.install_root, model.variant);
    let mut args: Vec<String> = vec!["--model".into(), model_path];
    for (key, value) in &body.hyperparameters {
        args.push(normalize_flag(key));
        args.push(value.clone());
    }

    // 6. Spawn. Accelerator defaults to CPU — callers who care set it.
    let spawn_request = SpawnRuntimeRequest {
        extension_id: extension_id.clone(),
        family: runtime_family.to_string(),
        version_req: body.version_req.clone(),
        accelerator: body.accelerator.unwrap_or(AcceleratorProfile::Cpu),
        args,
        env: BTreeMap::new(),
        port_hint: None,
        bind_mode: RuntimeBindMode::Loopback,
        install_id: Some(runtime_row.install_id.clone()),
    };

    let Some(spawner) = state.spawner.as_ref() else {
        return ApiResponse::<()>::err(
            StatusCode::SERVICE_UNAVAILABLE,
            "SPAWNER_UNAVAILABLE",
            "internal",
            "runtime spawner not wired in this build".into(),
        )
        .into_response();
    };

    match spawner.spawn(spawn_request).await {
        Ok(lease) => {
            let progress_channel = format!("runtime:lease:{}", lease.lease_id);
            let runtime_install_id = runtime_row.install_id.clone();
            let mut resp = ApiResponse::ok(LoadModelResponse {
                runtime_lease: lease,
                progress_channel,
                runtime_install_id,
                model_family: model.family,
            })
            .into_response();
            *resp.status_mut() = StatusCode::ACCEPTED;
            resp
        }
        Err(err) => spawn_error_response(err),
    }
}

/// Extension hands us a flag without leading dashes; llama-server wants
/// `--ctx-size`. Accept both so nobody trips over the convention.
fn normalize_flag(raw: &str) -> String {
    if raw.starts_with("--") {
        raw.to_string()
    } else if raw.starts_with('-') {
        format!("-{raw}")
    } else {
        format!("--{raw}")
    }
}
