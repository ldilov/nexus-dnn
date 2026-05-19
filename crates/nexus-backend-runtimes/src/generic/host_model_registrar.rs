use std::path::PathBuf;

use async_trait::async_trait;

/// An already-on-disk model tree an extension downloaded itself and wants
/// the host to adopt into the shared model store (so it surfaces in the
/// generic host-model listing and dedups against a Foundry install of the
/// same repo).
#[derive(Debug, Clone)]
pub struct RegisterExistingModel {
    pub source: String,
    pub repo_id: String,
    pub revision: Option<String>,
    pub files: Vec<String>,
    pub existing_root: PathBuf,
    pub display_name: Option<String>,
}

#[derive(Debug, Clone)]
pub struct RegisteredModel {
    pub install_id: String,
    pub already_installed: bool,
}

/// Generic host capability: adopt an already-downloaded model tree into the
/// host model store without re-downloading. The host implements this; any
/// extension may consume it. The implementation owns identity derivation and
/// dedup so the caller stays decoupled from host storage internals.
#[async_trait]
pub trait HostModelRegistrar: Send + Sync {
    async fn register_existing(
        &self,
        req: RegisterExistingModel,
    ) -> Result<RegisteredModel, String>;
}
