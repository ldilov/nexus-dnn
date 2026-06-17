mod common;

use std::fs;
use std::time::Duration;

use nexus_local_llm_worker::migration;
use serde_json::json;
use tempfile::tempdir;

#[tokio::test]
async fn first_run_scans_legacy_paths_and_writes_marker_then_second_run_is_noop() {
    let tmp = tempdir().expect("tempdir");
    let root = tmp.path();

    let bin_dir = root
        .join("llamacpp")
        .join("cuda13")
        .join("build-b4800")
        .join("bin");
    fs::create_dir_all(&bin_dir).unwrap();
    let bin_name = if cfg!(windows) {
        "llama-server.exe"
    } else {
        "llama-server"
    };
    fs::write(bin_dir.join(bin_name), b"#!/bin/true\n").unwrap();

    let models_dir = root.join("models").join("qwen-7b");
    fs::create_dir_all(&models_dir).unwrap();
    fs::write(models_dir.join("qwen-7b-q4km.gguf"), b"GGUF body stub").unwrap();

    let harness = common::spawn_harness();
    let host_client = harness.host_client.clone();

    let root_clone = root.to_path_buf();
    let migration_task =
        tokio::spawn(async move { migration::run_if_needed(&host_client, &root_clone).await });

    let bin_call = harness
        .fake_host
        .expect_call("host.runtimes.register_existing", Duration::from_secs(2))
        .await;
    let legacy_bin_path = bin_call.params["legacy_path"].as_str().unwrap().to_string();
    assert!(
        legacy_bin_path.contains("llama-server"),
        "expected llama-server path, got {legacy_bin_path}"
    );
    assert_eq!(bin_call.params["variant_hint"], "cuda13");
    harness
        .fake_host
        .reply_ok(
            bin_call.id,
            json!({ "install_id": "install-legacy-cuda13", "status": "registered" }),
        )
        .await;

    let model_call = harness
        .fake_host
        .expect_call("host.models.register_existing", Duration::from_secs(2))
        .await;
    let legacy_model_path = model_call.params["legacy_path"].as_str().unwrap();
    assert!(
        legacy_model_path.ends_with(".gguf"),
        "unexpected model path {legacy_model_path}"
    );
    assert_eq!(model_call.params["hint"]["format"], "GGUF");
    harness
        .fake_host
        .reply_ok(
            model_call.id,
            json!({ "model_id": "qwen-7b-q4km", "status": "registered" }),
        )
        .await;

    migration_task
        .await
        .expect("task join")
        .expect("migration success");

    let marker = root.join(".migration_v1_rust");
    assert!(marker.is_file(), "migration marker should exist");

    let contents = fs::read_to_string(&marker).unwrap();
    assert!(contents.contains("migrated_at"));
    assert!(contents.contains("install-legacy-cuda13"));
    assert!(contents.contains("qwen-7b-q4km"));

    let host_for_second = harness.host_client.clone();
    let root_for_second = root.to_path_buf();
    let second =
        tokio::spawn(
            async move { migration::run_if_needed(&host_for_second, &root_for_second).await },
        );
    second.await.expect("join").expect("second run success");

    let no_more = harness
        .fake_host
        .try_take_call(Duration::from_millis(150))
        .await;
    assert!(
        no_more.is_none(),
        "second run must be a no-op (got {no_more:?})"
    );
}

#[tokio::test]
async fn missing_legacy_tree_produces_empty_but_valid_marker() {
    let tmp = tempdir().expect("tempdir");
    let root = tmp.path();

    let harness = common::spawn_harness();
    let host_client = harness.host_client.clone();

    let root_clone = root.to_path_buf();
    let task =
        tokio::spawn(async move { migration::run_if_needed(&host_client, &root_clone).await });

    let no_call = harness
        .fake_host
        .try_take_call(Duration::from_millis(150))
        .await;
    assert!(no_call.is_none(), "no register calls expected");

    task.await.expect("join").expect("migration ok");

    let marker = root.join(".migration_v1_rust");
    assert!(marker.is_file());
}
