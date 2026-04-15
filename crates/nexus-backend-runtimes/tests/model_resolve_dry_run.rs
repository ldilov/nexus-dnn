//! Spec 017 US10c — SC-513: resolve_dry_run produces a full report without mutating state.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 7 (T672).

#[tokio::test]
#[ignore = "red: spec-017 phase 7 — resolve_dry_run zero side effects"]
async fn dry_run_leaves_row_count_and_blob_count_unchanged() {
    panic!("not yet implemented: assert (count(host_model_installs), count(blobs/**)) unchanged across resolve_dry_run");
}
