use crate::host_rpc::HostClient;
use crate::host_rpc::models::{ModelsClient, RegisterExistingHint, RegisterExistingRequest};
use crate::host_rpc::runtimes::{RegisterExistingRuntimeRequest, RuntimesClient};
use crate::migration::scan::{LegacyBinary, LegacyModel};

pub async fn register_binaries(
    host: &HostClient,
    binaries: &[LegacyBinary],
) -> Vec<Result<String, String>> {
    let runtimes = RuntimesClient::new(host.transport());
    let mut outcomes = Vec::with_capacity(binaries.len());
    for b in binaries {
        let req = RegisterExistingRuntimeRequest {
            legacy_path: b.path.display().to_string(),
            variant_hint: b.variant_hint.clone(),
        };
        match runtimes.register_existing(req).await {
            Ok(resp) => outcomes.push(Ok(resp.install_id.as_str().to_string())),
            Err(e) => outcomes.push(Err(format!("{}: {e}", b.path.display()))),
        }
    }
    outcomes
}

pub async fn register_models(
    host: &HostClient,
    models: &[LegacyModel],
) -> Vec<Result<String, String>> {
    let models_client = ModelsClient::new(host.transport());
    let mut outcomes = Vec::with_capacity(models.len());
    for m in models {
        let req = RegisterExistingRequest {
            legacy_path: m.path.display().to_string(),
            hint: Some(RegisterExistingHint {
                format: "GGUF".into(),
            }),
        };
        match models_client.register_existing(req).await {
            Ok(resp) => outcomes.push(Ok(resp.model_id.as_str().to_string())),
            Err(e) => outcomes.push(Err(format!("{}: {e}", m.path.display()))),
        }
    }
    outcomes
}
