//! Cross-deployment isolation primitives shared by every router that
//! exposes a shared-id endpoint (e.g. `GET /mappings/{mapping_id}`).
//!
//! ## Why
//!
//! The audit on 2026-04-28 found that GET/PATCH/DELETE on bare-item-id
//! routes returned the row regardless of which deployment owned it.
//! Each router was patched to require a `?deploymentId=…` query
//! parameter and 404 on mismatch — the same shape a true not-found
//! produces, so cross-deployment scans cannot probe row existence.
//!
//! Three near-identical copies of `ScopedQuery` plus per-router
//! `assert_belongs_to_deployment` helpers existed across `mappings.rs`,
//! `presets.rs`, and `voice_assets.rs`. This module collapses them.
//!
//! ## How
//!
//! Each per-router handler still owns its repo lookup (return type
//! varies). After fetching the row, it calls
//! [`assert_deployment_match`] with the row's `deployment_id` and the
//! caller's claimed value. On mismatch the function returns a
//! `not_found` domain error built from the caller-supplied message —
//! identical to the message a real lookup miss would produce.
//!
//! ## Why not generic-over-future
//!
//! An earlier draft used `async fn fetch<R>(...) -> Result<R, ...>`
//! generic over a closure returning `Future<Output = Result<Option<R>>>`.
//! It pulled in a `HasDeploymentId` trait per row type and forced every
//! caller to import the trait. The match-only helper here keeps each
//! router's call shape (`let row = repo.get(...).await?; guard::assert_*`)
//! at the cost of one extra line per call site.

use serde::Deserialize;

use crate::domain::{EmotionTtsError, Result};

/// Required `?deploymentId=…` query parameter on every shared-id
/// endpoint. Camel-case wire format matches the rest of the EmotionTTS
/// HTTP surface.
#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ScopedQuery {
    pub deployment_id: String,
}

/// Validate a row's deployment matches the caller's claim. Returns
/// `Ok(())` on match; on mismatch returns a `not_found` error built
/// from the caller-supplied message.
///
/// **Use 404 (not 403)** so the response is byte-identical between
/// "row doesn't exist at all" and "row exists but belongs to another
/// deployment" — cross-deployment scans cannot probe existence.
pub fn assert_deployment_match(
    row_deployment_id: &str,
    claimed_deployment_id: &str,
    not_found_msg: impl FnOnce() -> String,
) -> Result<()> {
    if row_deployment_id == claimed_deployment_id {
        Ok(())
    } else {
        Err(EmotionTtsError::not_found(not_found_msg()))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn match_returns_ok() {
        let r = assert_deployment_match("dep_a", "dep_a", || "unused".to_string());
        assert!(r.is_ok());
    }

    #[test]
    fn mismatch_returns_not_found() {
        let r = assert_deployment_match("dep_a", "dep_b", || "mapping abc".to_string());
        let err = r.expect_err("expected not_found");
        // The message must look like a real lookup miss — no "forbidden"
        // or "wrong deployment" leak.
        let msg = err.to_string();
        assert!(msg.contains("mapping abc"), "got: {msg}");
        assert!(
            !msg.to_lowercase().contains("forbidden")
                && !msg.to_lowercase().contains("deployment")
                && !msg.to_lowercase().contains("denied"),
            "error message must not leak cross-deployment context: {msg}"
        );
    }
}
