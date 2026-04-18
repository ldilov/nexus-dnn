use tracing::debug;

use crate::errors::{WorkerError, WorkerResult};
use crate::host_rpc::HostClient;
use crate::host_rpc::models::{HostModel, ModelsClient};
use crate::host_rpc::runtimes::{BackendRuntime, RuntimeHealth, RuntimesClient};
use crate::ids::{ModelId, VariantCodename};

#[derive(Clone, Debug)]
pub struct ResolvedRuntime {
    pub model: HostModel,
    pub runtime: BackendRuntime,
}

pub struct Resolver {
    host: HostClient,
}

impl Resolver {
    pub fn new(host: HostClient) -> Self {
        Self { host }
    }

    pub async fn resolve_for_model(
        &self,
        model_id: &ModelId,
        variant_preference: Option<&VariantCodename>,
    ) -> WorkerResult<ResolvedRuntime> {
        let models = ModelsClient::new(self.host.transport());
        let model = models.get(model_id).await?;

        if model.file_path.is_empty() {
            return Err(WorkerError::ModelMetadataIncomplete {
                field: "file_path".into(),
            });
        }
        if model.format.is_empty() {
            return Err(WorkerError::ModelMetadataIncomplete {
                field: "format".into(),
            });
        }

        if model.compatible_backends.is_empty() {
            return Err(WorkerError::IncompatibleRuntime {
                format: model.format.clone(),
            });
        }

        let runtimes_client = RuntimesClient::new(self.host.transport());
        let candidates = runtimes_client
            .list(Some(&model.format), None, None)
            .await?;

        let candidates: Vec<BackendRuntime> = candidates
            .into_iter()
            .filter(|r| r.health == RuntimeHealth::Installed)
            .filter(|r| model.compatible_backends.contains(&r.codename.as_str().to_string()))
            .collect();

        if candidates.is_empty() {
            return Err(WorkerError::IncompatibleRuntime {
                format: model.format.clone(),
            });
        }

        let chosen = pick_runtime(&candidates, variant_preference);

        debug!(
            model = %model.id,
            runtime = %chosen.install_id,
            codename = %chosen.codename,
            variant = %chosen.variant,
            "resolved"
        );

        Ok(ResolvedRuntime {
            model,
            runtime: chosen,
        })
    }
}

fn pick_runtime(
    candidates: &[BackendRuntime],
    preference: Option<&VariantCodename>,
) -> BackendRuntime {
    if let Some(pref) = preference
        && let Some(hit) = candidates.iter().find(|r| r.codename == *pref)
    {
        return hit.clone();
    }
    if let Some(hit) = candidates
        .iter()
        .find(|r| ["cuda13", "cuda12", "vulkan"].contains(&r.variant.as_str()))
    {
        return hit.clone();
    }
    candidates[0].clone()
}
