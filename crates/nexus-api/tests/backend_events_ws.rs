use std::sync::Arc;
use std::time::Duration;

use futures_util::{SinkExt, StreamExt};
use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_backend_runtimes::events::{BackendEvent, BroadcastPublisher, EventPublisher};
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;
use tokio::net::TcpListener;
use tokio_tungstenite::connect_async;
use tokio_tungstenite::tungstenite::Message;

async fn build_state_with_bus(bus: Arc<BroadcastPublisher>) -> (AppState, tempfile::TempDir) {
    let db = Arc::new(
        SqliteDatabase::new("sqlite::memory:")
            .await
            .expect("in-memory db"),
    );
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));

    let ext_dir = tempfile::tempdir().expect("tempdir");
    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (registry, _) =
        InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
            .await
            .expect("registry");

    let artifact_dir = ext_dir.path().join("artifacts");
    std::fs::create_dir_all(&artifact_dir).expect("artifact dir");
    let artifact_store = Arc::new(FilesystemArtifactStore::new(artifact_dir));
    let scheduler: Arc<RoundRobinScheduler> = Arc::new(RoundRobinScheduler);
    let run_engine = Arc::new(DefaultRunEngine::new(
        db.clone(),
        worker_manager.clone(),
        artifact_store.clone(),
        event_bus.clone(),
        scheduler.clone(),
    ));

    let state = AppState {
        health_status_fn: Arc::new(|| serde_json::json!({ "status": "ok" })),
        db,
        event_bus,
        extension_registry: Arc::new(registry),
        run_engine,
        worker_manager,
        scheduler,
        artifact_store,
        extensions_dir: None,
        storage_manager: None,
        backend_adapter_registry: None,
        spawner: None,
        huggingface: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_publisher: bus.clone(),
        backend_event_bus: bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
        install_map: None,
        model_load_registry:
            nexus_api::handlers::extensions_local_llm::load_registry::ModelLoadRegistry::new(),
    };
    (state, ext_dir)
}

async fn spawn_test_server(bus: Arc<BroadcastPublisher>) -> (String, tempfile::TempDir) {
    let (state, guard) = build_state_with_bus(bus).await;
    let router = nexus_api::create_router(state);
    let listener = TcpListener::bind("127.0.0.1:0").await.expect("bind");
    let addr = listener.local_addr().expect("addr");
    tokio::spawn(async move {
        axum::serve(listener, router).await.expect("serve");
    });
    (format!("ws://{addr}"), guard)
}

async fn recv_text_within(
    socket: &mut tokio_tungstenite::WebSocketStream<
        tokio_tungstenite::MaybeTlsStream<tokio::net::TcpStream>,
    >,
    timeout: Duration,
) -> Option<String> {
    match tokio::time::timeout(timeout, socket.next()).await {
        Ok(Some(Ok(Message::Text(t)))) => Some(t.to_string()),
        _ => None,
    }
}

#[tokio::test]
async fn subscriber_receives_published_event() {
    let bus = Arc::new(BroadcastPublisher::new(64));
    let (base, _guard) = spawn_test_server(bus.clone()).await;

    let url = format!("{base}/api/v1/backends/events");
    let (mut ws, _) = connect_async(&url).await.expect("ws connect");

    tokio::time::sleep(Duration::from_millis(20)).await;

    let evt = BackendEvent::new("test.topic", "llama.cpp", serde_json::json!({ "x": 1 }));
    let expected_id = evt.event_id.clone();
    bus.publish(evt).await;

    let text = recv_text_within(&mut ws, Duration::from_millis(200))
        .await
        .expect("should receive event");
    let parsed: serde_json::Value = serde_json::from_str(&text).expect("json");
    assert_eq!(parsed["event_id"].as_str(), Some(expected_id.as_str()));
    assert_eq!(parsed["backend"].as_str(), Some("llama.cpp"));

    let _ = ws.send(Message::Close(None)).await;
}

#[tokio::test]
async fn two_subscribers_both_receive() {
    let bus = Arc::new(BroadcastPublisher::new(64));
    let (base, _guard) = spawn_test_server(bus.clone()).await;

    let url = format!("{base}/api/v1/backends/events");
    let (mut ws_a, _) = connect_async(&url).await.expect("a connect");
    let (mut ws_b, _) = connect_async(&url).await.expect("b connect");
    tokio::time::sleep(Duration::from_millis(30)).await;

    let evt = BackendEvent::new("topic.fanout", "llama.cpp", serde_json::json!({}));
    let id = evt.event_id.clone();
    bus.publish(evt).await;

    let a = recv_text_within(&mut ws_a, Duration::from_millis(200))
        .await
        .expect("a recv");
    let b = recv_text_within(&mut ws_b, Duration::from_millis(200))
        .await
        .expect("b recv");
    let pa: serde_json::Value = serde_json::from_str(&a).unwrap();
    let pb: serde_json::Value = serde_json::from_str(&b).unwrap();
    assert_eq!(pa["event_id"].as_str(), Some(id.as_str()));
    assert_eq!(pb["event_id"].as_str(), Some(id.as_str()));
}

#[tokio::test]
async fn family_filter_drops_mismatches() {
    let bus = Arc::new(BroadcastPublisher::new(64));
    let (base, _guard) = spawn_test_server(bus.clone()).await;

    let url = format!("{base}/api/v1/backends/events?family=llama.cpp");
    let (mut ws, _) = connect_async(&url).await.expect("ws connect");
    tokio::time::sleep(Duration::from_millis(20)).await;

    let evt = BackendEvent::new("topic.mismatch", "tensorrt", serde_json::json!({}));
    bus.publish(evt).await;

    let got = recv_text_within(&mut ws, Duration::from_millis(200)).await;
    assert!(got.is_none(), "mismatched family must not be delivered");
}

#[tokio::test]
async fn install_id_filter_drops_mismatches() {
    let bus = Arc::new(BroadcastPublisher::new(64));
    let (base, _guard) = spawn_test_server(bus.clone()).await;

    let url = format!("{base}/api/v1/backends/events?runtime_install_id=ri_a");
    let (mut ws, _) = connect_async(&url).await.expect("ws connect");
    tokio::time::sleep(Duration::from_millis(20)).await;

    let evt =
        BackendEvent::new("topic.install", "llama.cpp", serde_json::json!({})).with_install("ri_b");
    bus.publish(evt).await;

    let got = recv_text_within(&mut ws, Duration::from_millis(200)).await;
    assert!(got.is_none(), "mismatched install_id must not be delivered");
}

#[tokio::test]
async fn lagged_subscriber_gets_warning_frame() {
    let bus = Arc::new(BroadcastPublisher::new(4));
    let (base, _guard) = spawn_test_server(bus.clone()).await;

    let url = format!("{base}/api/v1/backends/events");
    let (mut ws, _) = connect_async(&url).await.expect("ws connect");
    tokio::time::sleep(Duration::from_millis(30)).await;

    for i in 0..64u32 {
        let evt = BackendEvent::new("topic.flood", "llama.cpp", serde_json::json!({ "seq": i }));
        bus.publish(evt).await;
    }

    let mut saw_lagged = false;
    for _ in 0..80 {
        match recv_text_within(&mut ws, Duration::from_millis(300)).await {
            Some(t) => {
                let v: serde_json::Value = serde_json::from_str(&t).unwrap();
                if v["type"].as_str() == Some("lagged") {
                    assert!(v["missed"].as_u64().unwrap_or(0) > 0);
                    saw_lagged = true;
                    break;
                }
            }
            None => break,
        }
    }
    assert!(saw_lagged, "expected a lagged warning frame");

    bus.publish(BackendEvent::new(
        "topic.post-lag",
        "llama.cpp",
        serde_json::json!({}),
    ))
    .await;
    let post = recv_text_within(&mut ws, Duration::from_millis(300)).await;
    assert!(post.is_some(), "socket must stay open after lag warning");
}
