/// Emits a structured tracing::error event so 5xx / 4xx responses carry
/// `error.code` + `error.detail` + the full `source()` chain on top of
/// whatever `tower_http::trace` records as the classification line.
pub fn log_handler_error(
    err: &dyn std::error::Error,
    route: &str,
    error_code: &str,
    request_id: Option<&str>,
) {
    let mut chain = String::new();
    let mut cur: Option<&dyn std::error::Error> = Some(err);
    let mut depth = 0;
    while let Some(e) = cur {
        if depth > 0 {
            chain.push_str(" -> ");
        }
        chain.push_str(&e.to_string());
        cur = e.source();
        depth += 1;
        if depth >= 5 {
            break;
        }
    }
    tracing::error!(
        route,
        request_id = request_id.unwrap_or(""),
        error.code = error_code,
        error.detail = %err,
        error.chain = %chain,
        "handler error",
    );
}
