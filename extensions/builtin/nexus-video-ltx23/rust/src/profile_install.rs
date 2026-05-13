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

#[derive(Debug, Clone, Serialize)]
pub struct ProfileInstallStatus {
    pub profile: String,
    pub installed: bool,
    pub repo: Option<String>,
    pub dest: Option<String>,
    pub in_flight: bool,
    pub last_error: Option<String>,
}

#[derive(Clone)]
pub struct ProfileInstallService {
    factory: Arc<LtxLeaseFactory>,
    host_data_root: PathBuf,
    in_flight: Arc<Mutex<std::collections::HashSet<String>>>,
    last_errors: Arc<Mutex<std::collections::HashMap<String, String>>>,
}

impl ProfileInstallService {
    #[must_use]
    pub fn new(factory: Arc<LtxLeaseFactory>, host_data_root: PathBuf) -> Self {
        Self {
            factory,
            host_data_root,
            in_flight: Arc::new(Mutex::new(std::collections::HashSet::new())),
            last_errors: Arc::new(Mutex::new(std::collections::HashMap::new())),
        }
    }

    pub async fn status(&self, profile: &str) -> Result<ProfileInstallStatus> {
        let repo = profile_repo(profile);
        let in_flight = self.in_flight.lock().await.contains(profile);
        let last_error = self.last_errors.lock().await.get(profile).cloned();
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
        }

        let svc = self.clone();
        let profile_for_task = profile.clone();
        tokio::spawn(async move {
            if let Err(e) = svc.run_install(&profile_for_task).await {
                tracing::error!(
                    extension_id = "nexus.video.ltx23",
                    profile = %profile_for_task,
                    error = %e,
                    "profile install failed"
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

    async fn run_install(&self, profile: &str) -> Result<()> {
        let lease = self.factory.acquire("fake").await?;
        let mut notifications = lease.subscribe_notifications();

        let params = json!({
            "profile": profile,
            "host_data_dir": self.host_data_root.to_string_lossy(),
        });

        if let Err(e) = lease.send_rpc("ltx.video.install.start", params).await {
            let _ = lease.release().await;
            return Err(ExtensionError::Internal(format!(
                "install.start RPC rejected: {e}"
            )));
        }

        let outcome = tokio::time::timeout(INSTALL_TIMEOUT, async {
            loop {
                match notifications.recv().await {
                    Ok(note) => match note.method.as_str() {
                        "ltx.video.install.done" => return Ok::<(), ExtensionError>(()),
                        "ltx.video.install.error" => {
                            let msg = note
                                .params
                                .get("message")
                                .and_then(|v| v.as_str())
                                .unwrap_or("worker emitted install error without message")
                                .to_string();
                            return Err(ExtensionError::Internal(msg));
                        }
                        _ => {}
                    },
                    Err(RecvError::Lagged(skipped)) => {
                        tracing::warn!(
                            profile = %profile,
                            skipped,
                            "profile install: notification lag"
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
                "install timed out after {} seconds",
                INSTALL_TIMEOUT.as_secs()
            ))
        })?;

        let _ = lease.release().await;
        outcome
    }
}

fn profile_repo(profile: &str) -> Option<&'static str> {
    match profile {
        "rtx40-fp8" | "rtx50-fp8" => Some("Lightricks/LTX-2.3-fp8"),
        "rtx50-nvfp4" => Some("Lightricks/LTX-2.3-nvfp4"),
        _ => None,
    }
}
