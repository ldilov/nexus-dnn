//! No-op family handler for runtimes that ship a pre-built native binary
//! (T063). Bootstrap + dep install are no-ops; validate_env confirms the
//! recorded entrypoint exists and is non-empty.
//!
//! v1 doesn't yet have `RuntimeFamily::Native` — this handler maps to
//! `RuntimeFamily::LlamaCpp` so it can be registered alongside the
//! grandfathered llama.cpp adapter without colliding. When a `Native`
//! variant is added in a future spec, change [`Self::family`] accordingly.

use async_trait::async_trait;

use crate::family::RuntimeFamily;
use crate::generic::enums::PipelineFailureCategory;
use crate::generic::errors::GenericInstallError;
use crate::generic::family_handler::RuntimeFamilyHandler;
use crate::generic::install_ctx::{InstallCtx, LaunchSpec};
use crate::generic::installs::InstallRecord;
use crate::generic::settings::RuntimeSettings;

/// Pre-built-binary runtime handler. Trivial — exists to demonstrate that
/// the generic pipeline is family-agnostic.
pub struct FamilyNativeHandler {
    family: RuntimeFamily,
}

impl FamilyNativeHandler {
    pub fn new(family: RuntimeFamily) -> Self {
        Self { family }
    }
}

#[async_trait]
impl RuntimeFamilyHandler for FamilyNativeHandler {
    fn family(&self) -> RuntimeFamily {
        self.family
    }

    async fn bootstrap_runtime(&self, _ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        Ok(())
    }

    async fn install_deps(&self, _ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        Ok(())
    }

    async fn validate_env(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        match &ctx.entrypoint_path {
            Some(p) if !p.as_os_str().is_empty() => Ok(()),
            _ => Err(GenericInstallError::new(
                "validate_env",
                PipelineFailureCategory::WorkerStartFailed,
                "native handler requires entrypoint_path on InstallCtx",
            )),
        }
    }

    fn spawn_launch_spec(
        &self,
        install: &InstallRecord,
        _settings: &RuntimeSettings,
    ) -> LaunchSpec {
        let entrypoint = install
            .entrypoint_path
            .clone()
            .unwrap_or_else(|| install.install_path.clone());
        LaunchSpec::new(std::path::PathBuf::from(entrypoint))
    }
}
