//! Spec 017 US10b — SC-511: content-addressed blob store dedups byte-identical files across installs.
//!
//! RED skeleton authored in Phase 1. Goes GREEN in Phase 4 (T642).

#[tokio::test]
#[ignore = "red: spec-017 phase 4 — models_store::blobs dedup via hardlink"]
async fn two_installs_sharing_tokenizer_share_one_blob() {
    panic!("not yet implemented: two installs with identical tokenizer.json -> one blob under blobs/<sha[0:2]>/<sha>");
}

#[tokio::test]
#[ignore = "red: spec-017 phase 4 — gc_blobs removes unreferenced blobs"]
async fn gc_blobs_removes_unreferenced_after_reclaim() {
    panic!("not yet implemented: gc_blobs with zero-ref blobs");
}
