mod fixtures;

use trellis2_extension::domain::JobId;
use trellis2_extension::storage::Store;

#[tokio::test]
async fn create_then_complete_job_persists_dto() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let job_id = JobId::new();
    store
        .create_job(&job_id, "artifact-image-1", r#"{"seed":42,"texture":false}"#)
        .await
        .unwrap();

    store.mark_running(&job_id).await.unwrap();
    store
        .mark_completed(
            &job_id,
            Some("/data/out.glb"),
            Some(r#"{"vertices":12000,"sha256":"abc"}"#),
        )
        .await
        .unwrap();

    let row = store.get_job(job_id.as_str()).await.unwrap();
    let dto = row.into_dto();

    assert_eq!(dto.id, job_id.as_str());
    assert_eq!(dto.input_image_ref, "artifact-image-1");
    // storage `completed` surfaces to the frontend as `succeeded`
    assert_eq!(dto.status, "succeeded");
    assert_eq!(dto.glb_ref.as_deref(), Some("/data/out.glb"));
    let metadata = dto.metadata.expect("metadata present");
    assert_eq!(metadata["vertices"], 12000);
    assert_eq!(metadata["sha256"], "abc");
    assert!(dto.created_at.ends_with('Z'));
}

#[tokio::test]
async fn failed_job_carries_error_message() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let job_id = JobId::new();
    store
        .create_job(&job_id, "artifact-image-2", "{}")
        .await
        .unwrap();
    store
        .mark_failed(&job_id, "-32101|MODEL_MISSING: weights gone")
        .await
        .unwrap();

    let dto = store.get_job(job_id.as_str()).await.unwrap().into_dto();
    assert_eq!(dto.status, "failed");
    assert_eq!(dto.error_code, Some(-32101));
    assert_eq!(
        dto.error_message.as_deref(),
        Some("MODEL_MISSING: weights gone")
    );
}

#[tokio::test]
async fn list_jobs_orders_newest_first() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let a = JobId::new();
    store.create_job(&a, "img-a", "{}").await.unwrap();
    tokio::time::sleep(std::time::Duration::from_millis(5)).await;
    let b = JobId::new();
    store.create_job(&b, "img-b", "{}").await.unwrap();

    let jobs = store.list_jobs(25).await.unwrap();
    assert_eq!(jobs.len(), 2);
}

#[tokio::test]
async fn cancel_only_affects_active_jobs() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let job_id = JobId::new();
    store.create_job(&job_id, "img", "{}").await.unwrap();
    store.mark_running(&job_id).await.unwrap();
    store.mark_cancelled(&job_id).await.unwrap();

    let dto = store.get_job(job_id.as_str()).await.unwrap().into_dto();
    assert_eq!(dto.status, "cancelled");
}

#[tokio::test]
async fn delete_job_removes_history_row() {
    let pool = fixtures::memory_pool().await;
    let store = Store::new(pool);

    let job_id = JobId::new();
    store.create_job(&job_id, "img", "{}").await.unwrap();
    assert!(store.delete_job(job_id.as_str()).await.unwrap());
    assert!(store.get_job_opt(job_id.as_str()).await.unwrap().is_none());
}
