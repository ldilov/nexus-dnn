//! T071 / T072 / T073 — end-to-end lease tests against the real test-echo
//! Python worker.
//!
//! Spawns `python -u <workspace>/extensions/builtin/test-echo-runtime/worker/src/echo_worker/main.py`
//! through [`StdioLease`], runs the handshake, and exercises the three
//! failure / happy paths the lease subsystem must support.

use std::collections::HashMap;
use std::path::PathBuf;
use std::time::Duration;

use nexus_backend_runtimes::generic::enums::LeaseState;
use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::{
    BackendRuntimeLease, HOST_PROTOCOL_VERSION, LeaseError, StdioLease, do_handshake,
};

fn workspace_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(std::path::Path::parent)
        .expect("workspace root")
        .to_path_buf()
}

fn python_executable() -> &'static str {
    // Windows conventionally uses `python`; Linux / macOS may have
    // `python3` without `python`. Tests are expected to run on the same
    if cfg!(windows) { "python" } else { "python3" }
}

fn echo_worker_spec() -> LaunchSpec {
    let entry = workspace_root()
        .join("extensions/builtin/test-echo-runtime/worker/src/echo_worker/main.py");
    LaunchSpec {
        program: PathBuf::from(python_executable()),
        args: vec!["-u".into(), entry.display().to_string()],
        env: HashMap::new(),
        working_dir: None,
    }
}

/// Skip the test if the worker spawn fails. CI hosts without Python
/// shouldn't count as red.
async fn try_spawn() -> Option<std::sync::Arc<StdioLease>> {
    match StdioLease::spawn(echo_worker_spec(), RuntimeLeaseId::new()).await {
        Ok(l) => Some(l),
        Err(e) => {
            eprintln!("test skipped — could not spawn python echo worker: {e}");
            None
        }
    }
}

#[tokio::test]
async fn t071_handshake_and_echo_roundtrip_then_clean_release() {
    let Some(lease) = try_spawn().await else {
        return;
    };

    let info = do_handshake(&*lease as &dyn BackendRuntimeLease)
        .await
        .expect("handshake should succeed");
    assert_eq!(info.protocol_version, HOST_PROTOCOL_VERSION);
    assert!(info.accepts_methods.iter().any(|m| m == "echo"));

    lease.set_state(LeaseState::Ready);
    assert_eq!(lease.state(), LeaseState::Ready);

    // Round-trip an echo with a non-trivial payload.
    let resp = lease
        .send_rpc("echo", serde_json::json!({"text": "hello world"}))
        .await
        .expect("echo should succeed");
    assert_eq!(resp["text"], "hello world");

    // Notifications channel is subscribable; echo worker doesn't emit
    // any, but the channel must be alive for the subscription itself.
    let _rx = lease.subscribe_notifications();

    // Clean release — worker exits, state flips to Released.
    lease.release().await.expect("release should succeed");
    assert_eq!(lease.state(), LeaseState::Released);

    // Subsequent RPCs on a released lease fail fast.
    let err = lease
        .send_rpc("echo", serde_json::json!({"text": "zombie"}))
        .await
        .unwrap_err();
    assert!(matches!(err, LeaseError::RuntimeUnavailable));
}

#[tokio::test]
async fn t072_unknown_method_returns_rpc_error() {
    let Some(lease) = try_spawn().await else {
        return;
    };
    do_handshake(&*lease as &dyn BackendRuntimeLease)
        .await
        .unwrap();

    let err = lease
        .send_rpc("no_such_method", serde_json::json!({}))
        .await
        .unwrap_err();
    match err {
        LeaseError::Rpc { code, message, .. } => {
            assert_eq!(code, -32601, "JSON-RPC method-not-found code");
            assert!(message.contains("method not found"), "{message}");
        }
        other => panic!("expected LeaseError::Rpc, got {other:?}"),
    }

    lease.release().await.unwrap();
}

#[tokio::test]
async fn t072_slow_response_hits_timeout() {
    // Spawn a one-shot python subprocess that reads a request but never
    // replies — framed via a tiny in-test stub rather than the echo
    let stub_script = r#"
import sys
# Read one line then sleep forever, ignoring any further input.
sys.stdin.readline()
import time
time.sleep(300)
"#;
    let tmp = tempfile::tempdir().unwrap();
    let stub_path = tmp.path().join("slow_worker.py");
    std::fs::write(&stub_path, stub_script).unwrap();
    let spec = LaunchSpec {
        program: PathBuf::from(python_executable()),
        args: vec!["-u".into(), stub_path.display().to_string()],
        env: HashMap::new(),
        working_dir: None,
    };

    let Ok(lease) = StdioLease::spawn(spec, RuntimeLeaseId::new()).await else {
        eprintln!("test skipped — python unavailable");
        return;
    };

    let err = lease
        .send_rpc_with_timeout(
            "handshake",
            serde_json::Value::Null,
            Duration::from_millis(300),
        )
        .await
        .unwrap_err();
    assert!(
        matches!(err, LeaseError::Timeout),
        "expected Timeout, got {err:?}"
    );
    lease.release().await.unwrap();
}

#[tokio::test]
async fn t073_worker_crash_mid_request_returns_worker_crashed() {
    // A worker that exits immediately after reading one request. The
    // host enqueues a request, the worker dies before replying, and
    let stub_script = r#"
import sys
sys.stdin.readline()
sys.exit(1)
"#;
    let tmp = tempfile::tempdir().unwrap();
    let stub_path = tmp.path().join("crashy_worker.py");
    std::fs::write(&stub_path, stub_script).unwrap();
    let spec = LaunchSpec {
        program: PathBuf::from(python_executable()),
        args: vec!["-u".into(), stub_path.display().to_string()],
        env: HashMap::new(),
        working_dir: None,
    };

    let Ok(lease) = StdioLease::spawn(spec, RuntimeLeaseId::new()).await else {
        eprintln!("test skipped — python unavailable");
        return;
    };

    let err = lease
        .send_rpc_with_timeout("handshake", serde_json::Value::Null, Duration::from_secs(5))
        .await
        .unwrap_err();
    assert!(
        matches!(err, LeaseError::WorkerCrashed | LeaseError::Timeout),
        "expected WorkerCrashed (or Timeout if reader task hasn't noticed yet), got {err:?}"
    );
    lease.release().await.unwrap();
}

#[tokio::test]
async fn release_is_idempotent() {
    let Some(lease) = try_spawn().await else {
        return;
    };
    do_handshake(&*lease as &dyn BackendRuntimeLease)
        .await
        .unwrap();
    lease.release().await.unwrap();
    // Calling release() a second time is a no-op.
    lease.release().await.unwrap();
    assert_eq!(lease.state(), LeaseState::Released);
}

/// Regression: when the worker dies on its own (crash / exit, NOT a clean
/// release), the reader's EOF must flip the lease to `Failed` so the lease
/// provider discards and replaces it. Before the fix the state stayed
/// `Ready`, every later RPC hit the dead writer with `WorkerCrashed`, and
/// only a host restart recovered.
#[tokio::test]
async fn worker_exit_flips_lease_to_failed_for_recovery() {
    // A worker that exits immediately, closing stdout → reader hits EOF.
    let stub_script = "import sys\nsys.exit(0)\n";
    let tmp = tempfile::tempdir().unwrap();
    let stub_path = tmp.path().join("exit_worker.py");
    std::fs::write(&stub_path, stub_script).unwrap();
    let spec = LaunchSpec {
        program: PathBuf::from(python_executable()),
        args: vec!["-u".into(), stub_path.display().to_string()],
        env: HashMap::new(),
        working_dir: None,
    };

    let Ok(lease) = StdioLease::spawn(spec, RuntimeLeaseId::new()).await else {
        eprintln!("test skipped — python unavailable");
        return;
    };

    // Simulate a live lease (a successful handshake would set this).
    lease.set_state(LeaseState::Ready);

    // Condition-based wait: poll until the reader observes EOF and flips state.
    let mut state = lease.state();
    for _ in 0..40 {
        if state == LeaseState::Failed {
            break;
        }
        tokio::time::sleep(Duration::from_millis(50)).await;
        state = lease.state();
    }
    assert_eq!(
        state,
        LeaseState::Failed,
        "worker exit must flip the lease to Failed for recovery"
    );

    // The accept gate must now reject new RPCs fast (RuntimeUnavailable),
    // not block or surface a raw WorkerCrashed from the dead writer.
    let err = lease
        .send_rpc("echo", serde_json::json!({"text": "after-crash"}))
        .await
        .unwrap_err();
    assert!(
        matches!(err, LeaseError::RuntimeUnavailable),
        "a Failed lease must reject RPCs with RuntimeUnavailable, got {err:?}"
    );
}
