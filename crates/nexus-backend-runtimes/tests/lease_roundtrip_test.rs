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

    // Lease is live (`Starting`); the reader must flip it on the worker's EOF.
    // (Ready/Busy behave identically — see `reader_exit_tests`.)

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

/// Regression for the HUNG-worker case seen in production: the worker breaks
/// its stdin (host writes fail → writer task exits) but keeps stdout open and
/// the process alive, so the reader NEVER sees EOF. Detection must come from
/// the send/writer side; without it the lease stays `Ready` and every later
/// RPC returns `WorkerCrashed` ("rpc writer channel closed") forever — only a
/// host restart recovered.
#[tokio::test]
async fn writer_break_with_open_stdout_flips_lease_to_failed() {
    // Close stdin (host writes break); keep stdout open + alive (no reader EOF).
    let stub_script = "import os, time\nos.close(0)\ntime.sleep(30)\n";
    let tmp = tempfile::tempdir().unwrap();
    let stub_path = tmp.path().join("stdin_break_worker.py");
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

    // Let python boot and run os.close(0) so subsequent host writes break.
    tokio::time::sleep(Duration::from_secs(1)).await;

    // Drive sends until the writer side reports the worker gone. On Linux a
    // write to the closed-stdin pipe fails → writer task exits → WorkerCrashed.
    let mut observed_crash = false;
    for _ in 0..6 {
        match lease
            .send_rpc_with_timeout("ping", serde_json::json!({}), Duration::from_millis(400))
            .await
        {
            Err(LeaseError::WorkerCrashed) | Err(LeaseError::RuntimeUnavailable) => {
                observed_crash = true;
                break;
            }
            _ => {}
        }
    }

    // Windows discards writes into a closed-read-end pipe instead of erroring,
    // so the writer never dies and the hung case can't be driven here — skip.
    if !observed_crash {
        eprintln!(
            "test skipped — host writes to a closed-stdin pipe did not fail on this platform"
        );
        let _ = lease.release().await;
        return;
    }

    // The send path detected the dead writer while the reader saw NO EOF
    // (stdout still open) — the lease MUST be flipped to Failed for recovery.
    let mut state = lease.state();
    for _ in 0..20 {
        if state == LeaseState::Failed {
            break;
        }
        tokio::time::sleep(Duration::from_millis(50)).await;
        state = lease.state();
    }
    assert_eq!(
        state,
        LeaseState::Failed,
        "send-side crash detection must flip the lease to Failed (reader saw no EOF)"
    );

    let _ = lease.release().await;
}
