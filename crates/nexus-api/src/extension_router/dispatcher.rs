//! HTTP dispatch handler for `/api/v1/extensions/{ext_id}/{*rest}`.

use std::sync::Arc;

use axum::body::Body;
use axum::extract::{Path, Request, State};
use axum::http::{StatusCode, Uri};
use axum::response::{IntoResponse, Response};
use serde_json::json;
use tower::ServiceExt;

use super::{ExtensionRouterRegistry, Registration};

/// Handler bound to the single generic extension dispatch route.
///
/// Looks up the extension router by `ext_id` and forwards the request
/// after rewriting the URI to drop the host-owned `/api/v1/extensions/{ext_id}`
/// prefix. Body, headers, method, and query string pass through unchanged.
pub async fn dispatch(
    Path((ext_id, rest)): Path<(String, String)>,
    State(registry): State<Arc<dyn ExtensionRouterRegistry>>,
    req: Request<Body>,
) -> Response {
    dispatch_inner(ext_id, rest, registry, req).await
}

/// Bare-trailing-slash dispatcher (`/api/v1/extensions/{ext_id}/`).
///
/// axum's wildcard `{*rest}` requires ≥1 character, so the bare URL with
/// nothing after the trailing slash needs a separate route. Per spec
/// edge case (line 92): forward to the extension's router with empty
/// sub-path; the extension decides whether to 404 or serve a root.
pub async fn dispatch_root(
    Path(ext_id): Path<String>,
    State(registry): State<Arc<dyn ExtensionRouterRegistry>>,
    req: Request<Body>,
) -> Response {
    dispatch_inner(ext_id, String::new(), registry, req).await
}

async fn dispatch_inner(
    ext_id: String,
    rest: String,
    registry: Arc<dyn ExtensionRouterRegistry>,
    req: Request<Body>,
) -> Response {
    match registry.get(&ext_id) {
        Some(Registration::Ok { router, .. }) => {
            let rewritten = match rewrite_uri(req.uri(), &rest) {
                Ok(u) => u,
                Err(_) => {
                    return (
                        StatusCode::BAD_REQUEST,
                        axum::Json(json!({
                            "error": "bad_request",
                            "message": "invalid forwarded URI",
                        })),
                    )
                        .into_response();
                }
            };
            let (mut parts, body) = req.into_parts();
            parts.uri = rewritten;
            isolate_match_context(&mut parts.extensions);
            let forwarded = Request::from_parts(parts, body);
            match router.oneshot(forwarded).await {
                Ok(resp) => resp.into_response(),
                Err(infallible) => match infallible {},
            }
        }
        Some(Registration::Failed { reason, .. }) => (
            StatusCode::SERVICE_UNAVAILABLE,
            axum::Json(json!({
                "error": "registration_failed",
                "extension_id": ext_id,
                "reason": reason,
            })),
        )
            .into_response(),
        None => (
            StatusCode::NOT_FOUND,
            axum::Json(json!({
                "error": "unknown_extension",
                "extension_id": ext_id,
            })),
        )
            .into_response(),
    }
}

/// Strip request extensions that would carry the host router's match
/// data (path params, MatchedPath) into the forwarded extension router.
/// Without this, the extension's `Path<T>` extractor sees the host
/// route's `(ext_id, rest)` accumulated alongside its own params and
/// 500s with "Wrong number of path arguments." Clearing the extensions
/// map gives the inner router the same clean context it would see if
/// the request had arrived directly.
fn isolate_match_context(extensions: &mut axum::http::Extensions) {
    extensions.clear();
}

/// Replace the `/api/v1/extensions/{ext_id}` prefix with `/`, preserving
/// the wildcard remainder and the query string. The extracted `rest`
/// already excludes the leading slash; we add one back so the extension
/// router sees a normal absolute path.
fn rewrite_uri(original: &Uri, rest: &str) -> Result<Uri, axum::http::uri::InvalidUri> {
    let path = if rest.is_empty() {
        "/".to_owned()
    } else {
        format!("/{rest}")
    };
    let path_and_query = match original.query() {
        Some(q) => format!("{path}?{q}"),
        None => path,
    };
    path_and_query.parse::<Uri>()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rewrites_root_path() {
        let original: Uri = "/api/v1/extensions/alpha".parse().unwrap();
        let out = rewrite_uri(&original, "").unwrap();
        assert_eq!(out.path(), "/");
        assert_eq!(out.query(), None);
    }

    #[test]
    fn rewrites_nested_path_with_query() {
        let original: Uri = "/api/v1/extensions/alpha/chat/threads?limit=10"
            .parse()
            .unwrap();
        let out = rewrite_uri(&original, "chat/threads").unwrap();
        assert_eq!(out.path(), "/chat/threads");
        assert_eq!(out.query(), Some("limit=10"));
    }

    #[test]
    fn preserves_query_with_special_chars() {
        let original: Uri = "/api/v1/extensions/alpha/x?k=v%20w&z=1".parse().unwrap();
        let out = rewrite_uri(&original, "x").unwrap();
        assert_eq!(out.path(), "/x");
        assert_eq!(out.query(), Some("k=v%20w&z=1"));
    }
}
