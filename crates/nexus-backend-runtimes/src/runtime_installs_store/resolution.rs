use sqlx::SqlitePool;

use super::{RuntimeInstallRow, list_all};
use crate::error::BackendRuntimeResult;

pub async fn resolve_dependency(
    pool: &SqlitePool,
    family: &str,
    version_req: Option<&str>,
    acceleration: &[String],
) -> BackendRuntimeResult<Option<RuntimeInstallRow>> {
    let all = list_all(pool).await?;
    let matched = all.into_iter().find(|row| {
        row.family == family
            && row.state == "installed"
            && version_satisfies(row.version.as_str(), version_req)
            && (acceleration.is_empty() || acceleration.iter().any(|a| a == &row.accelerator))
    });
    Ok(matched)
}

pub(super) fn version_satisfies(have: &str, req: Option<&str>) -> bool {
    let Some(req) = req else {
        return true;
    };
    let req = req.trim();
    if let Some(rest) = req.strip_prefix(">=") {
        return have >= rest.trim();
    }
    if let Some(rest) = req.strip_prefix(">") {
        return have > rest.trim();
    }
    if let Some(rest) = req.strip_prefix("<=") {
        return have <= rest.trim();
    }
    if let Some(rest) = req.strip_prefix("<") {
        return have < rest.trim();
    }
    if let Some(rest) = req.strip_prefix("=") {
        return have == rest.trim();
    }
    have == req
}
