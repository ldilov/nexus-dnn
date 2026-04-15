//! Spec 017 US3 — SC-507: VRAM budget exhaustion returns typed error, not panic.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 6 (T659).

#[tokio::test]
#[ignore = "red: spec-017 phase 6 — models_store::leases acquire against 12GB device with 12GB reserved"]
async fn acquire_lease_returns_insufficient_resources_on_budget_exhaustion() {
    panic!("not yet implemented: acquire_lease -> ModelStoreError::InsufficientResources {{ device, requested, available }}");
}
