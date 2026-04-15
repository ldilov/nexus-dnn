//! Spec 017 FR-515 / FR-519 / FR-520 / FR-524 — HTTP surface contract for host-managed models.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 10 (T712).

#[tokio::test]
#[ignore = "red: spec-017 phase 10 — GET /api/v1/host-models returns provenance fields (FR-515)"]
async fn list_host_models_includes_license_source_and_sha() {
    panic!("not yet implemented: license_spdx, license_url, source_url, source_kind, sha256_root, source_revision in DTO");
}

#[tokio::test]
#[ignore = "red: spec-017 phase 10 — POST /api/v1/host-models/{id}/leases + DELETE (FR-519)"]
async fn lease_endpoints_mirror_runtime_lease_shape() {
    panic!("not yet implemented: create_model_lease + release_model_lease endpoints");
}

#[tokio::test]
#[ignore = "red: spec-017 phase 10 — POST /api/v1/host-models/resolve is side-effect-free (FR-520)"]
async fn resolve_endpoint_does_not_mutate_state() {
    panic!("not yet implemented: row_count and blob_count unchanged across /resolve");
}

#[tokio::test]
#[ignore = "red: spec-017 phase 10 — host-scoped lists sufficient for sidebar UI (FR-524)"]
async fn host_runtimes_and_host_models_are_independent_top_level_lists() {
    panic!("not yet implemented: both endpoints return host-scoped rows without required extension_id filter");
}
