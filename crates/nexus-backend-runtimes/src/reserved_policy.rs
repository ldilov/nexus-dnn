use std::collections::BTreeMap;

use crate::error::BackendRuntimeError;
use crate::parameter_catalog::{ParameterCatalog, ParameterPolicy};
use crate::settings::RuntimeSettings;

/// Outcome of gating a host-governed flag against a [`RuntimeSettings`]
/// typed opt-in. `Inject` carries the value the host should pass on the
/// child's argv; `Deny` means no opt-in is set and the flag must be rejected.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum HostPolicyDecision {
    Inject(String),
    Deny,
}

/// Host-side policy arbiter for host-governed launch flags.
pub struct HostPolicy;

impl HostPolicy {
    /// Map a host-governed flag to its typed host-setting opt-in.
    pub fn gate_host_governed(flag: &str, settings: &RuntimeSettings) -> HostPolicyDecision {
        match flag {
            "--api-key" => match settings.api_key.as_ref() {
                Some(v) if !v.is_empty() => HostPolicyDecision::Inject(v.clone()),
                _ => HostPolicyDecision::Deny,
            },
            "--ssl-cert-file" => match settings.tls_cert_path.as_ref() {
                Some(p) => HostPolicyDecision::Inject(p.to_string_lossy().into_owned()),
                None => HostPolicyDecision::Deny,
            },
            "--ssl-key-file" => match settings.tls_key_path.as_ref() {
                Some(p) => HostPolicyDecision::Inject(p.to_string_lossy().into_owned()),
                None => HostPolicyDecision::Deny,
            },
            "--media-path" => match settings.media_path.as_ref() {
                Some(p) => HostPolicyDecision::Inject(p.to_string_lossy().into_owned()),
                None => HostPolicyDecision::Deny,
            },
            "--tools" if settings.tools_enabled => HostPolicyDecision::Inject(String::new()),
            "--webui-mcp-proxy" if settings.mcp_proxy_enabled => {
                HostPolicyDecision::Inject(String::new())
            }
            _ => HostPolicyDecision::Deny,
        }
    }
}

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
                tracing::warn!(flag = %a, "host_governed_denied");
                return Err(BackendRuntimeError::HostGovernedDenied { flag: a.clone() });
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
            ParameterPolicy::HostInjected => {
                return Err(BackendRuntimeError::ReservedLaunchSetting { flag: name.clone() });
            }
            ParameterPolicy::HostGoverned => {
                tracing::warn!(flag = %name, "host_governed_denied");
                return Err(BackendRuntimeError::HostGovernedDenied { flag: name.clone() });
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
        assert!(validate_args(&catalog, &["--novel-future-flag".into(), "value".into()],).is_ok());
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
            BackendRuntimeError::HostGovernedDenied { .. }
        ));
    }

    #[test]
    fn extension_passthrough_accepted() {
        let catalog = llamacpp_catalog().unwrap();
        assert!(
            validate_args(
                &catalog,
                &[
                    "--ctx-size".into(),
                    "8192".into(),
                    "--temperature".into(),
                    "0.7".into()
                ],
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
