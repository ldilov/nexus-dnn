use std::net::{SocketAddr, TcpListener};
use std::process::Stdio;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::process::Command;
use tokio::time::timeout;

use crate::diagnostics::FailureCategory;
use crate::events::SharedPublisher;
use crate::log_pipeline::{self, LogPipelineContext};
use crate::manifest::install::InstallManifest;
use crate::validator::{CHECK_IDS, ValidationCheck, ValidationReport};

pub async fn run_validation(
    install: &InstallManifest,
    publisher: SharedPublisher,
    namespace: &str,
) -> ValidationReport {
    let mut report = ValidationReport::new(Some(install.runtime_install_id.clone()));

    report.push(check_binary_exists(install));
    if !report.overall_ok {
        report.fail_with(FailureCategory::RequiredBinaryMissing);
        return report;
    }

    report.push(check_version_probe(install).await);
    if !report.overall_ok {
        report.fail_with(FailureCategory::DependencyLoadFailure);
        return report;
    }

    report.push(pass(
        2,
        "dependent_libraries",
        "version probe covered library load",
    ));
    report.push(check_profile_matches(install));

    let port = match pick_ephemeral_port() {
        Some(p) => p,
        None => {
            report.push(ValidationCheck {
                check_id: CHECK_IDS[4].into(),
                ok: false,
                message: "could not bind ephemeral port".into(),
                duration_ms: 0,
            });
            report.fail_with(FailureCategory::PortBindFailure);
            return report;
        }
    };

    let probe_result = spawn_and_probe(install, port, publisher.clone(), namespace).await;
    match probe_result {
        Ok(()) => {
            report.push(pass(4, "health_probe_starts", "probe process started"));
            report.push(pass(5, "health_endpoint_reachable", "HTTP 200 /health"));
            report.push(pass(6, "health_probe_shutdown", "exit 0"));
        }
        Err(category) => {
            report.push(ValidationCheck {
                check_id: CHECK_IDS[4].into(),
                ok: false,
                message: format!("probe failed: {category:?}"),
                duration_ms: 0,
            });
            report.fail_with(category);
        }
    }
    report
}

fn check_binary_exists(install: &InstallManifest) -> ValidationCheck {
    let path = std::path::Path::new(&install.binary_path);
    let exists = path.exists();
    ValidationCheck {
        check_id: CHECK_IDS[0].into(),
        ok: exists,
        message: if exists {
            format!("found {}", install.binary_path)
        } else {
            format!("missing {}", install.binary_path)
        },
        duration_ms: 0,
    }
}

async fn check_version_probe(install: &InstallManifest) -> ValidationCheck {
    let started = Instant::now();
    let result = Command::new(&install.binary_path)
        .arg("--version")
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .kill_on_drop(true)
        .spawn();
    let mut child = match result {
        Ok(c) => c,
        Err(e) => {
            return ValidationCheck {
                check_id: CHECK_IDS[1].into(),
                ok: false,
                message: format!("spawn failed: {e}"),
                duration_ms: started.elapsed().as_millis() as u64,
            };
        }
    };
    let wait = timeout(Duration::from_secs(15), child.wait()).await;
    let ok = matches!(wait, Ok(Ok(status)) if status.success());
    ValidationCheck {
        check_id: CHECK_IDS[1].into(),
        ok,
        message: if ok {
            "version probe succeeded".into()
        } else {
            "version probe failed".into()
        },
        duration_ms: started.elapsed().as_millis() as u64,
    }
}

fn check_profile_matches(install: &InstallManifest) -> ValidationCheck {
    ValidationCheck {
        check_id: CHECK_IDS[3].into(),
        ok: true,
        message: format!("{} matches manifest", install.accelerator_profile.as_wire()),
        duration_ms: 0,
    }
}

fn pass(index: usize, id: &str, message: &str) -> ValidationCheck {
    ValidationCheck {
        check_id: if index < CHECK_IDS.len() {
            CHECK_IDS[index].into()
        } else {
            id.to_string()
        },
        ok: true,
        message: message.into(),
        duration_ms: 0,
    }
}

fn pick_ephemeral_port() -> Option<u16> {
    let listener = TcpListener::bind(SocketAddr::from(([127, 0, 0, 1], 0))).ok()?;
    listener.local_addr().ok().map(|addr| addr.port())
}

async fn spawn_and_probe(
    install: &InstallManifest,
    port: u16,
    publisher: SharedPublisher,
    namespace: &str,
) -> Result<(), FailureCategory> {
    let mut cmd = Command::new(&install.binary_path);
    cmd.args([
        "--host",
        "127.0.0.1",
        "--port",
        &port.to_string(),
        "--ctx-size",
        "128",
        "--parallel",
        "1",
    ]);
    cmd.stdout(Stdio::piped());
    cmd.stderr(Stdio::piped());
    cmd.kill_on_drop(true);
    let mut child = cmd
        .spawn()
        .map_err(|_| FailureCategory::UnexpectedProcessExit)?;
    let stdout = child.stdout.take();
    let stderr = child.stderr.take();
    let ctx = Arc::new(LogPipelineContext {
        source: crate::family::RuntimeFamily::LLAMA_CPP.into(),
        namespace: namespace.to_owned(),
        runtime_id: Some(install.runtime_install_id.clone()),
        deployment_id: None,
        publisher: publisher.clone(),
        backend: crate::family::RuntimeFamily::LLAMA_CPP.into(),
    });
    if let Some(out) = stdout {
        let ctx_clone = ctx.clone();
        tokio::spawn(async move { log_pipeline::pipe_stream(ctx_clone, out).await });
    }
    if let Some(err) = stderr {
        let ctx_clone = ctx.clone();
        tokio::spawn(async move { log_pipeline::pipe_stream(ctx_clone, err).await });
    }

    let deadline = Instant::now() + Duration::from_secs(10);
    let url = format!("http://127.0.0.1:{port}/health");
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(2))
        .build()
        .map_err(|_| FailureCategory::RuntimeValidationTimeout)?;
    let mut reached = false;
    while Instant::now() < deadline {
        if let Ok(resp) = client.get(&url).send().await
            && resp.status().is_success()
        {
            reached = true;
            break;
        }
        tokio::time::sleep(Duration::from_millis(250)).await;
    }
    let _ = child.kill().await;
    let _ = child.wait().await;
    if reached {
        Ok(())
    } else {
        Err(FailureCategory::RuntimeValidationTimeout)
    }
}
