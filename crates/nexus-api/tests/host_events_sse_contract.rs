use std::collections::BTreeMap;
use std::sync::Arc;
use std::time::Duration;

use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::{BroadcastEventBus, EventBus};
use nexus_events::redaction::REDACTION_MARKER;
use nexus_events::types::NexusEvent;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use reqwest::Response;
use semver::Version;
use serde_json::Value;
use tokio::net::TcpListener;

async fn build_state() -> (AppState, Arc<BroadcastEventBus>, tempfile::TempDir) {
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
    let (extension_registry, _) =
        InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
            .await
            .expect("empty extension registry");

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

    let backend_event_bus = Arc::new(nexus_backend_runtimes::events::BackendEventBus::new(1024));

    let state = AppState {
        health_status_fn: Arc::new(|| serde_json::json!({ "status": "ok" })),
        db,
        event_bus: event_bus.clone(),
        extension_registry: Arc::new(extension_registry),
        run_engine,
        worker_manager,
        scheduler,
        artifact_store,
        extensions_dir: None,
        storage_manager: None,
        backend_adapter_registry: None,
        spawner: None,
        huggingface: None,
        civitai: None,
        capability_registry: None,
        download_job_store: None,
        download_orchestrator: None,
        hf_token_store: None,
        backend_event_publisher: backend_event_bus.clone(),
        backend_event_bus,
        draft_materialize_map: nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
        install_map: None,
        extension_router_registry: {
            use nexus_api::extension_router::ExtensionRouterRegistry as _;
            let registry = std::sync::Arc::new(nexus_api::extension_router::DefaultRegistry::new());
            registry.seal();
            registry as nexus_api::extension_router::SharedRegistry
        },
        family_handlers:
            nexus_backend_runtimes::generic::family_handler::FamilyHandlerRegistry::new(),
        pipeline_events: {
            let (tx, _) = tokio::sync::broadcast::channel(nexus_api::PIPELINE_EVENT_CAPACITY);
            Arc::new(tx)
        },
        lease_manager: Arc::new(nexus_backend_runtimes::generic::leases::LeaseManager::new()),
        dep_handler_registry: None,
        dep_install_state: Arc::new(dashmap::DashMap::new()),
        dep_runtime_bootstrapper: None,
        dep_model_store: None,
        dep_worker_handshake: None,
        dep_fetch_artifact: None,
        dep_host_data_dir: None,
    };

    (state, event_bus, ext_dir)
}

async fn spawn_test_server() -> (String, Arc<BroadcastEventBus>, tempfile::TempDir) {
    let (state, bus, guard) = build_state().await;
    let router = nexus_api::create_router(state);
    let listener = TcpListener::bind("127.0.0.1:0").await.expect("bind");
    let addr = listener.local_addr().expect("addr");
    tokio::spawn(async move {
        axum::serve(listener, router).await.expect("serve");
    });
    (format!("http://{addr}"), bus, guard)
}

async fn wait_for_subscriber(bus: &BroadcastEventBus) {
    let deadline = tokio::time::Instant::now() + Duration::from_millis(500);
    while bus.subscriber_count() == 0 {
        assert!(
            tokio::time::Instant::now() < deadline,
            "timed out waiting for SSE subscriber"
        );
        tokio::time::sleep(Duration::from_millis(10)).await;
    }
}

async fn open_sse(base: &str, query: &str, last_event_id: Option<&str>) -> Response {
    let client = reqwest::Client::builder().build().expect("reqwest client");

    let mut request = client.get(format!("{base}/api/v1/events/sse{query}"));
    if let Some(id) = last_event_id {
        request = request.header("Last-Event-ID", id);
    }

    request.send().await.expect("SSE request")
}

async fn next_frame(
    response: &mut Response,
    buffer: &mut String,
    timeout: Duration,
) -> Option<String> {
    loop {
        if let Some(idx) = buffer.find("\n\n") {
            let frame = buffer[..idx].to_owned();
            buffer.drain(..idx + 2);
            return Some(frame);
        }

        let chunk = match tokio::time::timeout(timeout, response.chunk()).await {
            Ok(Ok(Some(chunk))) => chunk,
            Ok(Ok(None)) | Ok(Err(_)) | Err(_) => return None,
        };

        buffer.push_str(std::str::from_utf8(&chunk).expect("utf-8 SSE frame"));
    }
}

#[derive(Debug)]
struct ParsedSseFrame {
    id: Option<String>,
    event: Option<String>,
    data: Option<Value>,
    comment: Option<String>,
}

fn parse_frame(frame: &str) -> ParsedSseFrame {
    let mut id = None;
    let mut event = None;
    let mut data_lines = Vec::new();
    let mut comment = None;

    for line in frame.lines() {
        if let Some(rest) = line.strip_prefix("id:") {
            id = Some(rest.trim().to_owned());
        } else if let Some(rest) = line.strip_prefix("event:") {
            event = Some(rest.trim().to_owned());
        } else if let Some(rest) = line.strip_prefix("data:") {
            data_lines.push(rest.trim_start().to_owned());
        } else if let Some(rest) = line.strip_prefix(':') {
            comment = Some(rest.trim().to_owned());
        }
    }

    let data = if data_lines.is_empty() {
        None
    } else {
        Some(serde_json::from_str(&data_lines.join("\n")).expect("json SSE payload"))
    };

    ParsedSseFrame {
        id,
        event,
        data,
        comment,
    }
}

#[tokio::test]
async fn stream_open_filtered_subscribe() {
    let (base, bus, _guard) = spawn_test_server().await;
    let mut response = open_sse(&base, "?run_id=run-live&event_type=run_created", None).await;

    assert_eq!(response.status(), reqwest::StatusCode::OK);
    let content_type = response
        .headers()
        .get(reqwest::header::CONTENT_TYPE)
        .and_then(|value| value.to_str().ok())
        .unwrap_or_default();
    assert!(
        content_type.starts_with("text/event-stream"),
        "expected SSE content-type, got {content_type:?}"
    );

    wait_for_subscriber(&bus).await;
    let _ = bus.publish(NexusEvent::RunCreated {
        run_id: "other-run".to_owned(),
        workflow_id: "wf-a".to_owned(),
    });
    let _ = bus.publish(NexusEvent::RunStateChanged {
        run_id: "run-live".to_owned(),
        old_status: "queued".to_owned(),
        new_status: "running".to_owned(),
    });
    let expected = bus.publish(NexusEvent::RunCreated {
        run_id: "run-live".to_owned(),
        workflow_id: "wf-live".to_owned(),
    });

    let mut buffer = String::new();
    let frame = next_frame(&mut response, &mut buffer, Duration::from_millis(500))
        .await
        .expect("matching SSE frame");
    let parsed = parse_frame(&frame);
    let data = parsed.data.expect("event data");

    assert_eq!(parsed.event.as_deref(), Some("run_created"));
    assert_eq!(parsed.id.as_deref(), Some(expected.id.as_str()));
    assert_eq!(data["type"].as_str(), Some("run_created"));
    assert_eq!(data["run_id"].as_str(), Some("run-live"));
    assert_eq!(data["workflow_id"].as_str(), Some("wf-live"));
}

#[tokio::test]
async fn last_event_id_resume() {
    let (base, bus, _guard) = spawn_test_server().await;
    let first = bus.publish(NexusEvent::RunCreated {
        run_id: "run-replay".to_owned(),
        workflow_id: "wf-1".to_owned(),
    });
    let second = bus.publish(NexusEvent::RunStateChanged {
        run_id: "run-replay".to_owned(),
        old_status: "queued".to_owned(),
        new_status: "running".to_owned(),
    });

    assert!(first.id < second.id, "event ids must be monotonic ULIDs");

    let mut response = open_sse(&base, "", Some(&first.id)).await;
    assert_eq!(response.status(), reqwest::StatusCode::OK);

    let mut buffer = String::new();
    let replay_frame = next_frame(&mut response, &mut buffer, Duration::from_millis(500))
        .await
        .expect("replayed frame");
    let replay = parse_frame(&replay_frame);
    let replay_data = replay.data.expect("replay data");

    assert_eq!(replay.id.as_deref(), Some(second.id.as_str()));
    assert_eq!(replay.event.as_deref(), Some("run_state_changed"));
    assert_eq!(replay_data["type"].as_str(), Some("run_state_changed"));
    assert_eq!(replay_data["new_status"].as_str(), Some("running"));

    wait_for_subscriber(&bus).await;
    let live = bus.publish(NexusEvent::NodeStarted {
        run_id: "run-replay".to_owned(),
        node_id: "node-a".to_owned(),
    });
    assert!(
        second.id < live.id,
        "live event id must continue the monotonic sequence"
    );

    let live_frame = next_frame(&mut response, &mut buffer, Duration::from_millis(500))
        .await
        .expect("live frame");
    let live_parsed = parse_frame(&live_frame);
    let live_data = live_parsed.data.expect("live data");

    assert_eq!(live_parsed.id.as_deref(), Some(live.id.as_str()));
    assert_eq!(live_parsed.event.as_deref(), Some("node_started"));
    assert_eq!(live_data["type"].as_str(), Some("node_started"));
    assert_eq!(live_data["node_id"].as_str(), Some("node-a"));
}

#[tokio::test]
async fn keep_alive_cadence() {
    let (base, _bus, _guard) = spawn_test_server().await;
    let mut response = open_sse(&base, "", None).await;
    assert_eq!(response.status(), reqwest::StatusCode::OK);

    let mut buffer = String::new();
    let frame = next_frame(&mut response, &mut buffer, Duration::from_secs(17))
        .await
        .expect("keep-alive frame");
    let parsed = parse_frame(&frame);

    assert!(parsed.event.is_none(), "keep-alive must not carry event");
    assert!(parsed.data.is_none(), "keep-alive must not carry data");
    assert!(
        parsed.comment.is_some(),
        "expected SSE keep-alive comment frame, got {frame:?}"
    );
}

#[tokio::test]
async fn source_glob_composition() {
    let (base, bus, _guard) = spawn_test_server().await;
    let mut response = open_sse(
        &base,
        "?event_type=host_log&source=nexus_api::*,nexus_core::*",
        None,
    )
    .await;
    assert_eq!(response.status(), reqwest::StatusCode::OK);

    wait_for_subscriber(&bus).await;
    let _ = bus.publish(NexusEvent::HostLog {
        level: "info".to_owned(),
        target: "hyper::client".to_owned(),
        message: "ignore me".to_owned(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 1_746_681_600_000,
    });

    let mut buffer = String::new();
    let first = next_frame(&mut response, &mut buffer, Duration::from_millis(150)).await;
    assert!(
        first.is_none(),
        "non-matching source must not be delivered before a matching publish"
    );

    let matched = bus.publish(NexusEvent::HostLog {
        level: "warn".to_owned(),
        target: "nexus_api::request".to_owned(),
        message: "matched".to_owned(),
        fields: BTreeMap::new(),
        span_path: None,
        timestamp_ms: 1_746_681_600_001,
    });

    let frame = next_frame(&mut response, &mut buffer, Duration::from_millis(500))
        .await
        .expect("matched source frame");
    let parsed = parse_frame(&frame);
    let data = parsed.data.expect("matched data");

    assert_eq!(parsed.id.as_deref(), Some(matched.id.as_str()));
    assert_eq!(parsed.event.as_deref(), Some("host_log"));
    assert_eq!(data["target"].as_str(), Some("nexus_api::request"));
    assert_eq!(data["message"].as_str(), Some("matched"));
}

#[tokio::test]
async fn host_log_redaction_round_trip() {
    let (base, bus, _guard) = spawn_test_server().await;
    let mut response = open_sse(
        &base,
        "?event_type=host_log&source=nexus_core::panic_hook",
        None,
    )
    .await;
    assert_eq!(response.status(), reqwest::StatusCode::OK);

    wait_for_subscriber(&bus).await;
    let expected = bus.publish(NexusEvent::HostLog {
        level: "error".to_owned(),
        target: "nexus_core::panic_hook".to_owned(),
        message: "token=abc-secret-123 failed".to_owned(),
        fields: BTreeMap::from([("token".to_owned(), REDACTION_MARKER.to_owned())]),
        span_path: Some(vec!["http_request".to_owned(), "panic_hook".to_owned()]),
        timestamp_ms: 1_746_681_600_002,
    });

    let mut buffer = String::new();
    let frame = next_frame(&mut response, &mut buffer, Duration::from_millis(500))
        .await
        .expect("host log frame");
    let parsed = parse_frame(&frame);
    let data = parsed.data.expect("host log data");

    assert_eq!(parsed.id.as_deref(), Some(expected.id.as_str()));
    assert_eq!(parsed.event.as_deref(), Some("host_log"));
    assert_eq!(data["type"].as_str(), Some("host_log"));
    assert_eq!(
        data["message"].as_str(),
        Some("token=abc-secret-123 failed")
    );
    assert_eq!(data["fields"]["token"].as_str(), Some(REDACTION_MARKER));
    assert_eq!(data["span_path"][0].as_str(), Some("http_request"));
    assert_eq!(data["span_path"][1].as_str(), Some("panic_hook"));
}
