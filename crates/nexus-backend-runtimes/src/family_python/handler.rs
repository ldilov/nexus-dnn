//! T059 — [`FamilyPythonHandler`] — the [`RuntimeFamilyHandler`]
//! implementation for `family: python` backend runtimes. Delegates each
//! pipeline phase hook to the sibling module that owns its concrete
//! behaviour (`bootstrap`, `uv_install`, `validate`) and exposes a
//! [`LaunchSpec`] that spawns the embedded interpreter against the
//! extension's declared worker entrypoint.
//!
//! The handler is typically registered at host boot via
//! [`super::register_default`]; tests that don't want the real
//! embedded-Python download can construct one with
//! [`FamilyPythonHandler::with_asset`] + a `file://` asset pointing at a
//! fixture.

use std::path::{Path, PathBuf};

use async_trait::async_trait;

use crate::family::RuntimeFamily;
use crate::generic::errors::GenericInstallError;
use crate::generic::family_handler::RuntimeFamilyHandler;
use crate::generic::install_ctx::{InstallCtx, LaunchSpec};
use crate::generic::installs::InstallRecord;
use crate::generic::settings::RuntimeSettings;

use super::asset::PythonAsset;
use super::uv_install::UvInvocation;
use super::{FAMILY, bootstrap, uv_install, validate};

/// [`RuntimeFamilyHandler`] for `family: python` runtimes.
///
/// Both the embedded-Python asset and the `uv` invocation are injectable
/// so tests can run against fixtures without requiring a real
/// python-build-standalone download or a system-wide `uv` install at a
/// specific path.
pub struct FamilyPythonHandler {
    asset: Option<PythonAsset>,
    uv: UvInvocation,
}

impl FamilyPythonHandler {
    /// Production constructor — no asset override, default `uv` on PATH.
    /// Production hosts are expected to populate the asset table via
    /// [`Self::with_asset`] once embedded-Python pins are stamped.
    pub fn new() -> Self {
        Self {
            asset: None,
            uv: UvInvocation::default(),
        }
    }

    /// Override the embedded-Python asset. Typical for tests.
    pub fn with_asset(asset: PythonAsset) -> Self {
        Self {
            asset: Some(asset),
            uv: UvInvocation::default(),
        }
    }

    /// Override the `uv` invocation (binary path + platform knobs).
    pub fn with_uv(mut self, uv: UvInvocation) -> Self {
        self.uv = uv;
        self
    }

    /// Accessor for the currently-configured asset (primarily for tests).
    pub fn asset(&self) -> Option<&PythonAsset> {
        self.asset.as_ref()
    }
}

impl Default for FamilyPythonHandler {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl RuntimeFamilyHandler for FamilyPythonHandler {
    fn family(&self) -> RuntimeFamily {
        FAMILY
    }

    async fn bootstrap_runtime(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        bootstrap::run(ctx, self.asset.as_ref()).await
    }

    async fn install_deps(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        uv_install::run(ctx, &self.uv).await
    }

    async fn validate_env(&self, ctx: &mut InstallCtx) -> Result<(), GenericInstallError> {
        validate::run(ctx).await
    }

    fn spawn_launch_spec(
        &self,
        install: &InstallRecord,
        _settings: &RuntimeSettings,
    ) -> LaunchSpec {
        let install_root = PathBuf::from(&install.install_path);
        let python = python_exe_in(&install_root);
        let entry = install
            .entrypoint_path
            .clone()
            .unwrap_or_else(|| install.install_path.clone());
        LaunchSpec {
            program: python,
            args: vec!["-u".into(), entry],
            env: Default::default(),
            working_dir: Some(install_root),
        }
    }
}

/// Platform-conventional path to the embedded interpreter inside an
/// install root. Windows: `python/python.exe`; Unix:
/// `python/bin/python3`. Exposed at module scope so every phase module
/// resolves the same location.
pub fn python_exe_in(install_root: &Path) -> PathBuf {
    if cfg!(windows) {
        install_root.join("python").join("python.exe")
    } else {
        install_root.join("python").join("bin").join("python3")
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::generic::enums::InstallStatus;
    use crate::generic::ids::{
        AcceleratorProfile, PlatformId, ReleaseId, RuntimeId, RuntimeInstallId,
    };

    fn sample_settings(runtime_id: &RuntimeId) -> RuntimeSettings {
        let now = chrono::Utc::now().timestamp();
        RuntimeSettings {
            runtime_settings_id: String::new(),
            runtime_id: runtime_id.clone(),
            default_device: None,
            default_model_family_id: None,
            keep_warm_default: 0,
            idle_timeout_seconds: 0,
            env_overrides: serde_json::Value::Null,
            created_at: now,
            updated_at: now,
        }
    }

    fn sample_install() -> InstallRecord {
        let now = chrono::Utc::now().timestamp();
        InstallRecord {
            runtime_install_id: RuntimeInstallId::new(),
            runtime_id: RuntimeId::try_from("nexus.tts.index").unwrap(),
            release_id: ReleaseId::try_from("v1_0_0").unwrap(),
            platform: PlatformId::try_from("linux-x64").unwrap(),
            accelerator_profile: AcceleratorProfile::try_from("cpu").unwrap(),
            install_path: "/opt/runtimes/tts".into(),
            entrypoint_path: Some("/opt/runtimes/tts/worker/src/tts/main.py".into()),
            artifact_hash: Some("b".repeat(64)),
            status: InstallStatus::Validated,
            current_phase: None,
            validated_at: Some(now),
            last_failure_category: None,
            last_failure_detail: None,
            created_at: now,
            updated_at: now,
        }
    }

    #[test]
    fn handler_reports_python_family() {
        let h = FamilyPythonHandler::new();
        assert_eq!(h.family(), RuntimeFamily::Python);
    }

    #[test]
    fn python_exe_in_matches_platform_convention() {
        let root = Path::new("/opt/x");
        let p = python_exe_in(root);
        if cfg!(windows) {
            assert!(p.ends_with("python/python.exe") || p.ends_with("python\\python.exe"));
        } else {
            assert_eq!(p, PathBuf::from("/opt/x/python/bin/python3"));
        }
    }

    #[test]
    fn launch_spec_points_at_embedded_interpreter() {
        let handler = FamilyPythonHandler::new();
        let install = sample_install();
        let settings = sample_settings(&install.runtime_id);
        let spec = handler.spawn_launch_spec(&install, &settings);
        let install_root = Path::new(&install.install_path);
        assert_eq!(spec.program, python_exe_in(install_root));
        assert_eq!(spec.args.len(), 2);
        assert_eq!(spec.args[0], "-u");
        assert_eq!(spec.working_dir.as_deref(), Some(install_root));
    }

    #[test]
    fn with_asset_sets_override() {
        let asset = PythonAsset::pbs_install_only("file:///x.tar.gz", "a".repeat(64), 1);
        let handler = FamilyPythonHandler::with_asset(asset.clone());
        assert_eq!(handler.asset(), Some(&asset));
    }

    #[test]
    fn with_uv_customises_invocation() {
        let handler = FamilyPythonHandler::new().with_uv(UvInvocation {
            program: PathBuf::from("/custom/uv"),
            deepspeed_extra_on_windows: true,
        });
        assert_eq!(handler.uv.program, PathBuf::from("/custom/uv"));
        assert!(handler.uv.deepspeed_extra_on_windows);
    }
}
