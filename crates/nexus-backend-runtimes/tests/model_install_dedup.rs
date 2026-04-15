//! Spec 017 US1 — SC-506: concurrent identical installs collapse to one row + one download.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 4 (T642).

#[tokio::test]
#[ignore = "red: spec-017 phase 4 — models_store::install dedup"]
async fn identical_tuple_installs_collapse_to_one_row() {
    panic!("not yet implemented: models_store::install_model dedup by (family, version, quantization, variant, sha256_root)");
}

#[tokio::test]
#[ignore = "red: spec-017 phase 8 — revision pinning (US12.4)"]
async fn distinct_revisions_produce_distinct_rows() {
    panic!("not yet implemented: two manifests same tuple + different revision -> two rows");
}
