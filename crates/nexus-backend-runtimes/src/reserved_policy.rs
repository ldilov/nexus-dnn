//! Reserved-flag classifier + 4-tier enforcement.
//!
//! Input: raw argv + env from an extension's spawn request.
//! Output: `Ok(ValidatedArgs)` if every flag passes policy; `Err(SpawnError)`
//! on the first collision. Unknown flags pass through unchanged.

use std::collections::BTreeMap;

use crate::error::BackendRuntimeError;
use crate::parameter_catalog::{ParameterCatalog, ParameterPolicy};

#[derive(Debug, Clone)]
pub struct ValidatedLaunch {
    pub args: Vec<String>,
    pub env: BTreeMap<String, String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ClassifyOutcome {
    Passthrough,
    ManagedSpawnDisallowed,
    HostInjected,
    HostGoverned,
    Unknown,
}

pub fn classify(catalog: &ParameterCatalog, token: &str) -> ClassifyOutcome {
    let Some(entry) = catalog.lookup_flag(token) else {
        return ClassifyOutcome::Unknown;
    };
    match entry.policy {
        ParameterPolicy::ManagedSpawnDisallowed => ClassifyOutcome::ManagedSpawnDisallowed,
        ParameterPolicy::HostInjected => ClassifyOutcome::HostInjected,
        ParameterPolicy::HostGoverned => ClassifyOutcome::HostGoverned,
        ParameterPolicy::ExtensionPassthrough => ClassifyOutcome::Passthrough,
    }
}

fn scan_arg_is_flag(s: &str) -> bool {
    s.starts_with('-')
}

pub fn validate_args(
    catalog: &ParameterCatalog,
    args: &[String],
) -> Result<(), BackendRuntimeError> {
    for a in args {
        if !scan_arg_is_flag(a) {
            continue;
        }
        match classify(catalog, a) {
            ClassifyOutcome::ManagedSpawnDisallowed => {
                return Err(BackendRuntimeError::ManagedSpawnDisallowed { flag: a.clone() });
            }
            ClassifyOutcome::HostInjected => {
                return Err(BackendRuntimeError::ReservedLaunchSetting { flag: a.clone() });
            }
            ClassifyOutcome::HostGoverned => {
                return Err(BackendRuntimeError::ReservedLaunchSetting { flag: a.clone() });
            }
            ClassifyOutcome::Passthrough | ClassifyOutcome::Unknown => {}
        }
    }
    Ok(())
}

pub fn validate_env(
    catalog: &ParameterCatalog,
    env: &BTreeMap<String, String>,
) -> Result<(), BackendRuntimeError> {
    for name in env.keys() {
        let Some(entry) = catalog.lookup_env(name) else {
            continue;
        };
        match entry.policy {
            ParameterPolicy::ManagedSpawnDisallowed => {
                return Err(BackendRuntimeError::ManagedSpawnDisallowed { flag: name.clone() });
            }
            ParameterPolicy::HostInjected | ParameterPolicy::HostGoverned => {
                return Err(BackendRuntimeError::ReservedLaunchSetting { flag: name.clone() });
            }
            ParameterPolicy::ExtensionPassthrough => {}
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::parameter_catalog::llamacpp_catalog;

    #[test]
    fn unknown_flag_passes_through() {
        let catalog = llamacpp_catalog().unwrap();
        assert_eq!(
            classify(&catalog, "--novel-future-flag"),
            ClassifyOutcome::Unknown
        );
        assert!(
            validate_args(
                &catalog,
                &["--novel-future-flag".into(), "value".into()],
            )
            .is_ok()
        );
    }

    #[test]
    fn host_injected_flag_rejected() {
        let catalog = llamacpp_catalog().unwrap();
        let err = validate_args(&catalog, &["--port".into(), "9999".into()]).unwrap_err();
        assert!(matches!(
            err,
            BackendRuntimeError::ReservedLaunchSetting { .. }
        ));
    }

    #[test]
    fn managed_spawn_disallowed_rejected() {
        let catalog = llamacpp_catalog().unwrap();
        let err = validate_args(&catalog, &["--help".into()]).unwrap_err();
        assert!(matches!(
            err,
            BackendRuntimeError::ManagedSpawnDisallowed { .. }
        ));
    }

    #[test]
    fn host_governed_flag_rejected() {
        let catalog = llamacpp_catalog().unwrap();
        let err = validate_args(&catalog, &["--api-key".into(), "secret".into()]).unwrap_err();
        assert!(matches!(
            err,
            BackendRuntimeError::ReservedLaunchSetting { .. }
        ));
    }

    #[test]
    fn extension_passthrough_accepted() {
        let catalog = llamacpp_catalog().unwrap();
        assert!(
            validate_args(
                &catalog,
                &["--ctx-size".into(), "8192".into(), "--temperature".into(), "0.7".into()],
            )
            .is_ok()
        );
    }

    #[test]
    fn env_lookup_rejects_host_injected() {
        let catalog = llamacpp_catalog().unwrap();
        let mut env = BTreeMap::new();
        env.insert("LLAMA_ARG_PORT".into(), "9999".into());
        let err = validate_env(&catalog, &env).unwrap_err();
        assert!(matches!(
            err,
            BackendRuntimeError::ReservedLaunchSetting { .. }
        ));
    }
}
