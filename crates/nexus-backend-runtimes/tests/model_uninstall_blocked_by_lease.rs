//! Spec 017 US3 — SC-508: uninstall with active lease returns LeasedByExtensions, not a silent delete.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 6 (T659).

#[tokio::test]
#[ignore = "red: spec-017 phase 6 — models_store::uninstall_model blocked by active lease"]
async fn uninstall_with_active_lease_returns_leased_by_extensions() {
    panic!("not yet implemented: uninstall_model -> ModelStoreError::LeasedByExtensions {{ extensions }}");
}
