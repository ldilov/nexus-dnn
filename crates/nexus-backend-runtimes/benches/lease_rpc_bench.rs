use std::collections::HashMap;
use std::path::{Path, PathBuf};

use criterion::{Criterion, criterion_group, criterion_main};
use tokio::runtime::Builder;

use nexus_backend_runtimes::generic::ids::RuntimeLeaseId;
use nexus_backend_runtimes::generic::install_ctx::LaunchSpec;
use nexus_backend_runtimes::generic::leases::BackendRuntimeLease;
use nexus_backend_runtimes::generic::leases::handshake::do_handshake;
use nexus_backend_runtimes::generic::leases::stdio_lease::StdioLease;

fn workspace_root() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(Path::parent)
        .expect("workspace root")
        .to_path_buf()
}

fn python_executable() -> PathBuf {
    if cfg!(windows) {
        PathBuf::from("python")
    } else {
        PathBuf::from("python3")
    }
}

fn echo_main_py() -> PathBuf {
    workspace_root().join("extensions/builtin/test-echo-runtime/worker/src/echo_worker/main.py")
}

fn launch_spec(entry: &Path) -> LaunchSpec {
    LaunchSpec {
        program: python_executable(),
        args: vec!["-u".into(), entry.display().to_string()],
        env: HashMap::new(),
        working_dir: None,
    }
}

fn bench_echo_rpc(c: &mut Criterion) {
    let runtime = Builder::new_multi_thread().enable_all().build().unwrap();
    let entry = echo_main_py();
    if !entry.is_file() {
        eprintln!(
            "skipping bench — test-echo worker missing at {}",
            entry.display()
        );
        return;
    }

    let lease = runtime.block_on(async {
        let spec = launch_spec(&entry);
        let lease = StdioLease::spawn(spec, RuntimeLeaseId::new())
            .await
            .expect("spawn lease");
        do_handshake(lease.as_ref()).await.expect("handshake");
        lease
    });

    let mut group = c.benchmark_group("lease_rpc");
    group.sample_size(50);
    {
        let lease = lease.clone();
        group.bench_function("echo_warm", |b| {
            b.to_async(&runtime).iter(|| {
                let lease = lease.clone();
                async move {
                    let v = lease
                        .send_rpc("echo", serde_json::json!({"text": "x"}))
                        .await
                        .expect("echo rpc");
                    assert_eq!(v["text"], "x");
                }
            });
        });
    }
    group.finish();

    runtime.block_on(async {
        let _ = lease.release().await;
    });
}

criterion_group!(benches, bench_echo_rpc);
criterion_main!(benches);
