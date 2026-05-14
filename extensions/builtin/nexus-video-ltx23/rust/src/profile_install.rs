use std::collections::{HashMap, HashSet, VecDeque};
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;

use nexus_backend_runtimes::generic::leases::trait_def::BackendRuntimeLease;
use serde::Serialize;
use serde_json::json;
use tokio::sync::broadcast::error::RecvError;
use tokio::sync::Mutex;

use crate::errors::{ExtensionError, Result};
use crate::lease::LtxLeaseFactory;

const INSTALL_TIMEOUT: Duration = Duration::from_secs(60 * 60);
const PROGRESS_LINE_CAP: usize = 200;
const PROGRESS_LINE_MAX_LEN: usize = 1024;

#[derive(Debug, Clone, Serialize)]
pub struct ProfileInstallStatus {
    pub profile: String,
    pub installed: bool,
    pub repo: Option<String>,
    pub dest: Option<String>,
    pub in_flight: bool,
    pub last_error: Option<String>,
    pub phase: Option<String>,
    pub recent_progress: Vec<String>,
}

#[derive(Clone)]
pub struct ProfileInstallService {
    factory: Arc<LtxLeaseFactory>,
    host_data_root: PathBuf,
    in_flight: Arc<Mutex<HashSet<String>>>,
    last_errors: Arc<Mutex<HashMap<String, String>>>,
    phases: Arc<Mutex<HashMap<String, String>>>,
    progress: Arc<Mutex<HashMap<String, VecDeque<String>>>>,
}

impl ProfileInstallService {
    #[must_use]
    pub fn new(factory: Arc<LtxLeaseFactory>, host_data_root: PathBuf) -> Self {
        Self {
            factory,
            host_data_root,
            in_flight: Arc::new(Mutex::new(HashSet::new())),
            last_errors: Arc::new(Mutex::new(HashMap::new())),
            phases: Arc::new(Mutex::new(HashMap::new())),
            progress: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub async fn status(&self, profile: &str) -> Result<ProfileInstallStatus> {
        let repo = profile_repo(profile);
        let in_flight = self.in_flight.lock().await.contains(profile);
        let last_error = self.last_errors.lock().await.get(profile).cloned();
        let phase = self.phases.lock().await.get(profile).cloned();
        let recent_progress = self
            .progress
            .lock()
            .await
            .get(profile)
            .map(|q| q.iter().cloned().collect())
            .unwrap_or_default();
        let dest = repo.map(|r| self.dest_for(r));
        let installed = dest
            .as_ref()
            .is_some_and(|d| d.join(".nexus-install-complete").is_file());
        Ok(ProfileInstallStatus {
            profile: profile.to_string(),
            installed,
            repo: repo.map(str::to_string),
            dest: dest.map(|d| d.to_string_lossy().into_owned()),
            in_flight,
            last_error,
            phase,
            recent_progress,
        })
    }

    pub async fn start(&self, profile: String) -> Result<ProfileInstallStatus> {
        if profile_repo(&profile).is_none() {
            return Err(ExtensionError::InvalidRequest(format!(
                "no installable model for profile '{profile}' (fake profile has none)"
            )));
        }

        {
            let mut guard = self.in_flight.lock().await;
            if guard.contains(&profile) {
                drop(guard);
                return self.status(&profile).await;
            }
            guard.insert(profile.clone());
            drop(guard);
            self.last_errors.lock().await.remove(&profile);
            self.phases
                .lock()
                .await
                .insert(profile.clone(), "starting".to_string());
            self.progress.lock().await.remove(&profile);
        }

        let svc = self.clone();
        let profile_for_task = profile.clone();
        tokio::spawn(async move {
            if let Err(e) = svc.run_runtime_install(&profile_for_task).await {
                tracing::error!(
                    extension_id = "nexus.video.ltx23",
                    profile = %profile_for_task,
                    error = %e,
                    "runtime install failed"
                );
                svc.last_errors
                    .lock()
                    .await
                    .insert(profile_for_task.clone(), e.to_string());
            }
            svc.in_flight.lock().await.remove(&profile_for_task);
        });

        self.status(&profile).await
    }

    fn dest_for(&self, repo: &str) -> PathBuf {
        let mut path = self.host_data_root.join("models");
        for segment in repo.split('/') {
            path = path.join(segment);
        }
        path
    }

    async fn record_phase(&self, profile: &str, phase: &str) {
        self.phases
            .lock()
            .await
            .insert(profile.to_string(), phase.to_string());
    }

    async fn record_progress_line(&self, profile: &str, line: String) {
        let trimmed = if line.len() <= PROGRESS_LINE_MAX_LEN {
            line
        } else {
            let mut s = line[..PROGRESS_LINE_MAX_LEN].to_string();
            s.push('…');
            s
        };
        let mut guard = self.progress.lock().await;
        let q = guard.entry(profile.to_string()).or_default();
        q.push_back(trimmed);
        while q.len() > PROGRESS_LINE_CAP {
            q.pop_front();
        }
        drop(guard);
    }

    async fn run_runtime_install(&self, profile: &str) -> Result<()> {
        let lease = self.factory.acquire("fake").await?;
        let mut notifications = lease.subscribe_notifications();

        let params = json!({
            "profile": profile,
            "host_data_dir": self.host_data_root.to_string_lossy(),
        });

        if let Err(e) = lease.send_rpc("ltx.video.runtime.install", params).await {
            let _ = lease.release().await;
            return Err(ExtensionError::Internal(format!(
                "runtime.install RPC rejected: {e}"
            )));
        }

        let svc = self.clone();
        let profile_owned = profile.to_string();
        let outcome = tokio::time::timeout(INSTALL_TIMEOUT, async {
            loop {
                match notifications.recv().await {
                    Ok(note) => match note.method.as_str() {
                        "ltx.video.runtime.install.done" => {
                            svc.record_phase(&profile_owned, "done").await;
                            return Ok::<(), ExtensionError>(());
                        }
                        "ltx.video.runtime.install.error" => {
                            let phase = note
                                .params
                                .get("phase")
                                .and_then(|v| v.as_str())
                                .unwrap_or("unknown")
                                .to_string();
                            let msg = note
                                .params
                                .get("message")
                                .and_then(|v| v.as_str())
                                .unwrap_or("worker emitted runtime.install.error without message")
                                .to_string();
                            svc.record_phase(&profile_owned, &format!("error:{phase}"))
                                .await;
                            return Err(ExtensionError::Internal(msg));
                        }
                        "ltx.video.runtime.install.progress" => {
                            if let Some(phase) = note
                                .params
                                .get("phase")
                                .and_then(|v| v.as_str())
                            {
                                svc.record_phase(&profile_owned, phase).await;
                            }
                            if let Some(line) = note
                                .params
                                .get("output")
                                .and_then(|v| v.as_str())
                            {
                                let stream = note
                                    .params
                                    .get("stream")
                                    .and_then(|v| v.as_str())
                                    .unwrap_or("info");
                                svc.record_progress_line(
                                    &profile_owned,
                                    format!("{stream}: {line}"),
                                )
                                .await;
                            }
                        }
                        _ => {}
                    },
                    Err(RecvError::Lagged(skipped)) => {
                        tracing::warn!(
                            profile = %profile_owned,
                            skipped,
                            "runtime install: notification lag"
                        );
                    }
                    Err(RecvError::Closed) => {
                        return Err(ExtensionError::Internal(
                            "worker closed notification channel mid-install".into(),
                        ));
                    }
                }
            }
        })
        .await
        .map_err(|_| {
            ExtensionError::Internal(format!(
                "runtime install timed out after {} seconds",
                INSTALL_TIMEOUT.as_secs()
            ))
        })?;

        let _ = lease.release().await;
        outcome
    }
}

fn profile_repo(profile: &str) -> Option<&'static str> {
    // Mirror of the Python worker's `installer.py::PROFILE_REPO`. All
    // real-runtime profiles point at the community diffusers-format port
    // until upstream diffusers ships native LTX-2.3 quant support (see
    // `specs/046-ltx23-video-generation/verification/p0-t001-results.md`
    // for the architecture finding).
    match profile {
        "rtx40-fp8" | "rtx50-fp8" | "rtx50-nvfp4" => {
            Some("dg845/LTX-2.3-Distilled-Diffusers")
        }
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn temp_factory() -> Arc<LtxLeaseFactory> {
        Arc::new(LtxLeaseFactory::new(
            PathBuf::from("/tmp/does-not-exist"),
            PathBuf::from("/tmp/data"),
        ))
    }

    #[tokio::test]
    async fn status_for_unknown_profile_returns_repo_none() {
        let svc = ProfileInstallService::new(temp_factory(), PathBuf::from("/tmp"));
        let s = svc.status("imaginary").await.expect("status ok");
        assert_eq!(s.profile, "imaginary");
        assert!(s.repo.is_none());
        assert!(!s.installed);
        assert!(!s.in_flight);
        assert!(s.last_error.is_none());
        assert!(s.phase.is_none());
        assert!(s.recent_progress.is_empty());
    }

    // All real-runtime profiles map to the community diffusers-format
    // port today (verification/p0-t001-results.md).
    const DG845: &str = "dg845/LTX-2.3-Distilled-Diffusers";

    #[tokio::test]
    async fn status_resolves_repo_per_profile() {
        let svc = ProfileInstallService::new(temp_factory(), PathBuf::from("/tmp"));
        assert_eq!(
            svc.status("rtx40-fp8").await.unwrap().repo.as_deref(),
            Some(DG845)
        );
        assert_eq!(
            svc.status("rtx50-fp8").await.unwrap().repo.as_deref(),
            Some(DG845)
        );
        assert_eq!(
            svc.status("rtx50-nvfp4").await.unwrap().repo.as_deref(),
            Some(DG845)
        );
    }

    #[tokio::test]
    async fn start_rejects_unknown_profile() {
        let svc = ProfileInstallService::new(temp_factory(), PathBuf::from("/tmp"));
        let err = svc.start("imaginary".into()).await.unwrap_err();
        assert!(matches!(err, ExtensionError::InvalidRequest(_)));
    }

    #[tokio::test]
    async fn record_progress_caps_buffer_length() {
        let svc = ProfileInstallService::new(temp_factory(), PathBuf::from("/tmp"));
        for i in 0..(PROGRESS_LINE_CAP + 50) {
            svc.record_progress_line("rtx40-fp8", format!("line {i}"))
                .await;
        }
        let status = svc.status("rtx40-fp8").await.unwrap();
        assert_eq!(status.recent_progress.len(), PROGRESS_LINE_CAP);
        assert_eq!(status.recent_progress[0], "line 50");
        assert_eq!(
            status.recent_progress.last().unwrap(),
            &format!("line {}", PROGRESS_LINE_CAP + 49)
        );
    }

    #[tokio::test]
    async fn record_progress_truncates_overlong_lines() {
        let svc = ProfileInstallService::new(temp_factory(), PathBuf::from("/tmp"));
        let big = "x".repeat(PROGRESS_LINE_MAX_LEN + 200);
        svc.record_progress_line("rtx40-fp8", big).await;
        let status = svc.status("rtx40-fp8").await.unwrap();
        assert_eq!(status.recent_progress.len(), 1);
        let line = &status.recent_progress[0];
        assert!(line.ends_with('…'));
        assert!(line.chars().count() <= PROGRESS_LINE_MAX_LEN + 1);
    }

    #[tokio::test]
    async fn record_phase_overwrites_previous_phase() {
        let svc = ProfileInstallService::new(temp_factory(), PathBuf::from("/tmp"));
        svc.record_phase("rtx40-fp8", "resolving_deps").await;
        svc.record_phase("rtx40-fp8", "downloading_weights").await;
        let status = svc.status("rtx40-fp8").await.unwrap();
        assert_eq!(status.phase.as_deref(), Some("downloading_weights"));
    }
}
