//! Strict schema validation for `BackendRuntimeContribution` per
//! `specs/032-backend-runtime-catalog/contracts/manifest/backend_runtime_contribution.yaml`
//! and research.md R-12.

use std::collections::HashSet;
use std::path::{Component, Path};

use thiserror::Error;

use crate::manifest::BackendRuntimeContribution;

/// Canonical wire-form names + accepted aliases. Must stay in sync with
/// `nexus_backend_runtimes::family::RuntimeFamily::canonical`.
const KNOWN_FAMILIES: &[&str] = &["llama.cpp", "llamacpp", "python", "py"];

/// v1 supports stdio only.
const KNOWN_TRANSPORTS: &[&str] = &["stdio"];

#[derive(Debug, Error, PartialEq, Eq)]
pub enum ContributionValidationError {
    #[error("runtime_id `{0}` does not match ^[a-z][a-z0-9._-]{{2,63}}$")]
    InvalidRuntimeId(String),
    #[error("display_name must be 1..=120 chars, got {0}")]
    InvalidDisplayName(usize),
    #[error("unknown runtime family `{0}` (allowed: llama.cpp, python)")]
    UnknownFamily(String),
    #[error("unsupported transport `{0}` (v1 supports: stdio)")]
    UnsupportedTransport(String),
    #[error("worker_entrypoint `{0}` is invalid: {1}")]
    InvalidWorkerEntrypoint(String, &'static str),
    #[error("version_manifest `{0}` is invalid: {1}")]
    InvalidVersionManifest(String, &'static str),
    #[error("capability_tag at index {0} is empty")]
    EmptyCapabilityTag(usize),
    #[error("supported_role at index {0} is empty")]
    EmptySupportedRole(usize),
    #[error("duplicate runtime_id `{0}` within manifest")]
    DuplicateWithinManifest(String),
}

/// Validate a single contribution. Pure — no IO, no DB.
pub fn validate_contribution(
    c: &BackendRuntimeContribution,
) -> Result<(), ContributionValidationError> {
    validate_runtime_id(&c.runtime_id)?;
    validate_display_name(&c.display_name)?;
    validate_family(&c.family)?;
    validate_transport(&c.transport)?;
    validate_relative_path(&c.worker_entrypoint).map_err(|reason| {
        ContributionValidationError::InvalidWorkerEntrypoint(c.worker_entrypoint.clone(), reason)
    })?;
    validate_relative_path(&c.version_manifest).map_err(|reason| {
        ContributionValidationError::InvalidVersionManifest(c.version_manifest.clone(), reason)
    })?;
    for (i, tag) in c.capability_tags.iter().enumerate() {
        if tag.trim().is_empty() {
            return Err(ContributionValidationError::EmptyCapabilityTag(i));
        }
    }
    for (i, role) in c.supported_roles.iter().enumerate() {
        if role.trim().is_empty() {
            return Err(ContributionValidationError::EmptySupportedRole(i));
        }
    }
    Ok(())
}

/// Validate every contribution in a manifest + check for within-manifest
/// duplicate `runtime_id`s. Cross-manifest duplicates are caught at
/// registration time by the host's catalog upsert.
pub fn validate_contributions(
    contributions: &[BackendRuntimeContribution],
) -> Result<(), ContributionValidationError> {
    let mut seen = HashSet::new();
    for c in contributions {
        validate_contribution(c)?;
        if !seen.insert(c.runtime_id.as_str()) {
            return Err(ContributionValidationError::DuplicateWithinManifest(
                c.runtime_id.clone(),
            ));
        }
    }
    Ok(())
}

fn validate_runtime_id(s: &str) -> Result<(), ContributionValidationError> {
    let len = s.len();
    if !(3..=64).contains(&len) {
        return Err(ContributionValidationError::InvalidRuntimeId(s.to_string()));
    }
    let mut chars = s.chars();
    let first = chars.next().unwrap();
    if !first.is_ascii_lowercase() {
        return Err(ContributionValidationError::InvalidRuntimeId(s.to_string()));
    }
    for c in s.chars() {
        let ok = c.is_ascii_lowercase() || c.is_ascii_digit() || c == '.' || c == '_' || c == '-';
        if !ok {
            return Err(ContributionValidationError::InvalidRuntimeId(s.to_string()));
        }
    }
    Ok(())
}

fn validate_display_name(s: &str) -> Result<(), ContributionValidationError> {
    let len = s.chars().count();
    if !(1..=120).contains(&len) {
        return Err(ContributionValidationError::InvalidDisplayName(len));
    }
    Ok(())
}

fn validate_family(s: &str) -> Result<(), ContributionValidationError> {
    if KNOWN_FAMILIES.contains(&s) {
        Ok(())
    } else {
        Err(ContributionValidationError::UnknownFamily(s.to_string()))
    }
}

fn validate_transport(s: &str) -> Result<(), ContributionValidationError> {
    if KNOWN_TRANSPORTS.contains(&s) {
        Ok(())
    } else {
        Err(ContributionValidationError::UnsupportedTransport(
            s.to_string(),
        ))
    }
}

/// Relative-only path validator: rejects empty, absolute paths, and any
/// component containing `..` or `.` to prevent path traversal escape.
fn validate_relative_path(s: &str) -> Result<(), &'static str> {
    if s.is_empty() {
        return Err("empty path");
    }
    let path = Path::new(s);
    if path.is_absolute() {
        return Err("absolute path not permitted");
    }
    for comp in path.components() {
        match comp {
            Component::Normal(_) => {}
            Component::CurDir => return Err("`.` segment not permitted"),
            Component::ParentDir => return Err("`..` segment not permitted"),
            Component::RootDir | Component::Prefix(_) => {
                return Err("absolute path not permitted");
            }
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sample(runtime_id: &str) -> BackendRuntimeContribution {
        BackendRuntimeContribution {
            runtime_id: runtime_id.into(),
            display_name: "Test Runtime".into(),
            family: "python".into(),
            transport: "stdio".into(),
            worker_entrypoint: "worker/main.py".into(),
            version_manifest: "backends/v.yaml".into(),
            capability_tags: vec!["echo".into()],
            supported_roles: vec!["test".into()],
        }
    }

    #[test]
    fn accepts_valid_contribution() {
        validate_contribution(&sample("test.echo")).unwrap();
    }

    #[test]
    fn rejects_invalid_runtime_id() {
        for bad in ["ab", "1abc", "Test.Echo", "test space", "test/slash"] {
            let mut c = sample("test.echo");
            c.runtime_id = bad.into();
            assert!(matches!(
                validate_contribution(&c).unwrap_err(),
                ContributionValidationError::InvalidRuntimeId(_)
            ));
        }
    }

    #[test]
    fn rejects_unknown_family() {
        let mut c = sample("test.echo");
        c.family = "rust".into();
        assert!(matches!(
            validate_contribution(&c).unwrap_err(),
            ContributionValidationError::UnknownFamily(_)
        ));
    }

    #[test]
    fn accepts_known_family_aliases() {
        for alias in ["python", "py", "llama.cpp", "llamacpp"] {
            let mut c = sample("test.echo");
            c.family = alias.into();
            validate_contribution(&c).unwrap();
        }
    }

    #[test]
    fn rejects_unsupported_transport() {
        let mut c = sample("test.echo");
        c.transport = "websocket".into();
        assert!(matches!(
            validate_contribution(&c).unwrap_err(),
            ContributionValidationError::UnsupportedTransport(_)
        ));
    }

    #[test]
    fn rejects_path_traversal_in_worker_entrypoint() {
        for bad in ["../escape.py", "/abs/path.py", "worker/../escape.py"] {
            let mut c = sample("test.echo");
            c.worker_entrypoint = bad.into();
            assert!(matches!(
                validate_contribution(&c).unwrap_err(),
                ContributionValidationError::InvalidWorkerEntrypoint(_, _)
            ));
        }
    }

    #[test]
    fn rejects_absolute_version_manifest() {
        let mut c = sample("test.echo");
        c.version_manifest = "/etc/passwd".into();
        assert!(matches!(
            validate_contribution(&c).unwrap_err(),
            ContributionValidationError::InvalidVersionManifest(_, _)
        ));
    }

    #[test]
    fn rejects_duplicate_runtime_id_within_manifest() {
        let entries = vec![sample("test.echo"), sample("test.echo")];
        assert!(matches!(
            validate_contributions(&entries).unwrap_err(),
            ContributionValidationError::DuplicateWithinManifest(_)
        ));
    }

    #[test]
    fn rejects_empty_capability_tag() {
        let mut c = sample("test.echo");
        c.capability_tags = vec!["ok".into(), "".into()];
        assert!(matches!(
            validate_contribution(&c).unwrap_err(),
            ContributionValidationError::EmptyCapabilityTag(1)
        ));
    }

    #[test]
    fn rejects_display_name_overrun() {
        let mut c = sample("test.echo");
        c.display_name = "x".repeat(121);
        assert!(matches!(
            validate_contribution(&c).unwrap_err(),
            ContributionValidationError::InvalidDisplayName(121)
        ));
    }
}
