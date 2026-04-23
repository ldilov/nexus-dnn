//! Bridge between `nexus_extension`'s `BackendRuntimeContribution` and
//! the host's backend-runtime catalog repo.
//!
//! Owns the `ContributionChecksum` derivation (SHA-256 of canonicalised
//! contribution JSON) and the activate / deactivate / uninstall cascades
//! described in `data-model.md §9`.

use sha2::{Digest, Sha256};
use thiserror::Error;

use nexus_backend_runtimes::family::RuntimeFamily;
use nexus_backend_runtimes::generic::catalog::{BackendRuntimeCatalogRepo, CatalogEntry};
use nexus_backend_runtimes::generic::enums::{ImplementationStatus, Transport};
use nexus_backend_runtimes::generic::errors::GenericRepoError;
use nexus_backend_runtimes::generic::ids::{ContributionChecksum, RuntimeId, SourceExtensionId};
use nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo;
use nexus_extension::manifest::BackendRuntimeContribution;

#[derive(Debug, Error)]
pub enum RegistrationError {
    #[error("invalid runtime_id `{raw}`: {detail}")]
    InvalidRuntimeId { raw: String, detail: String },
    #[error("unknown runtime family `{0}`")]
    UnknownFamily(String),
    #[error("unsupported transport `{0}`")]
    UnsupportedTransport(String),
    #[error("checksum derivation failed: {0}")]
    Checksum(String),
    #[error(transparent)]
    Repo(#[from] GenericRepoError),
}

/// Compute the SHA-256 of a contribution after canonicalising its fields.
/// Used to detect drift on re-activation (data-model.md §2 R-02).
pub fn compute_contribution_checksum(
    c: &BackendRuntimeContribution,
) -> Result<ContributionChecksum, RegistrationError> {
    let canonical = serde_json::json!({
        "runtime_id": c.runtime_id,
        "display_name": c.display_name,
        "family": c.family,
        "transport": c.transport,
        "worker_entrypoint": c.worker_entrypoint,
        "version_manifest": c.version_manifest,
        "capability_tags": c.capability_tags,
        "supported_roles": c.supported_roles,
    });
    let bytes =
        serde_json::to_vec(&canonical).map_err(|e| RegistrationError::Checksum(e.to_string()))?;
    let digest = Sha256::digest(&bytes);
    let hex = hex_lower(&digest);
    ContributionChecksum::new(hex).map_err(|e| RegistrationError::Checksum(e.to_string()))
}

fn hex_lower(bytes: &[u8]) -> String {
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        use std::fmt::Write;
        let _ = write!(s, "{b:02x}");
    }
    s
}

/// Map a contribution + activation context into a `CatalogEntry`. Pure;
/// no IO. Performs final domain-type validation (runtime_id regex,
/// family canonical lookup, transport enum) — these are also enforced
/// upstream by `nexus_extension::backend_runtime_contribution::validate_contribution`,
/// but defence-in-depth here keeps the bridge robust if a caller forgets.
pub fn build_catalog_entry(
    c: &BackendRuntimeContribution,
    source_extension_id: &SourceExtensionId,
    source_extension_version: &str,
    now_unix: i64,
) -> Result<CatalogEntry, RegistrationError> {
    let runtime_id = RuntimeId::try_from(c.runtime_id.as_str()).map_err(|e| {
        RegistrationError::InvalidRuntimeId {
            raw: c.runtime_id.clone(),
            detail: e.to_string(),
        }
    })?;
    let runtime_family = RuntimeFamily::canonical(&c.family)
        .ok_or_else(|| RegistrationError::UnknownFamily(c.family.clone()))?;
    let transport = match c.transport.as_str() {
        "stdio" => Transport::Stdio,
        other => return Err(RegistrationError::UnsupportedTransport(other.to_string())),
    };
    let contribution_checksum = compute_contribution_checksum(c)?;

    Ok(CatalogEntry {
        runtime_id,
        display_name: c.display_name.clone(),
        source_extension_id: source_extension_id.clone(),
        source_extension_version: source_extension_version.to_string(),
        contribution_checksum,
        runtime_family,
        transport,
        implementation_status: ImplementationStatus::Available,
        version_manifest_path: c.version_manifest.clone(),
        worker_entrypoint: c.worker_entrypoint.clone(),
        capability_tags: c.capability_tags.clone(),
        supported_roles: c.supported_roles.clone(),
        created_at: now_unix,
        updated_at: now_unix,
    })
}

/// Activate every contribution for one extension. T036.
///
/// On `contribution_checksum` change between activations, the catalog row
/// is updated in place; a `tracing::warn!` records the drift so an
/// operator can investigate (data-model.md §9 — Contribution-checksum
/// change on re-activation).
pub async fn register_contributions(
    repo: &dyn BackendRuntimeCatalogRepo,
    source_extension_id: &SourceExtensionId,
    source_extension_version: &str,
    contributions: &[BackendRuntimeContribution],
    now_unix: i64,
) -> Result<Vec<CatalogEntry>, RegistrationError> {
    let mut applied = Vec::with_capacity(contributions.len());
    for c in contributions {
        let entry =
            build_catalog_entry(c, source_extension_id, source_extension_version, now_unix)?;

        if let Some(existing) = repo.find_by_id(&entry.runtime_id).await? {
            // Cross-extension duplicate: another extension already owns
            // this runtime_id. Reject with both contributing ids surfaced.
            if existing.source_extension_id != *source_extension_id {
                return Err(RegistrationError::Repo(GenericRepoError::UniqueViolation(
                    format!(
                        "runtime_id `{}` already contributed by `{}`",
                        entry.runtime_id, existing.source_extension_id
                    ),
                )));
            }
            if existing.contribution_checksum != entry.contribution_checksum {
                tracing::warn!(
                    runtime_id = %entry.runtime_id,
                    extension_id = %source_extension_id,
                    "backend_runtime contribution checksum changed on re-activation"
                );
            }
        }

        repo.upsert(&entry).await?;
        applied.push(entry);
    }
    Ok(applied)
}

/// Deactivate every contribution for one extension. T037.
/// Flips `implementation_status → unavailable` on every contributed
/// runtime. Does not touch live leases — callers that want the drain
/// cascade (T080) should use [`deactivate_contributions_with_drain`].
pub async fn deactivate_contributions(
    repo: &dyn BackendRuntimeCatalogRepo,
    source_extension_id: &SourceExtensionId,
) -> Result<(), RegistrationError> {
    let entries = repo.list_by_source_extension(source_extension_id).await?;
    for e in entries {
        if e.implementation_status != ImplementationStatus::Unavailable {
            repo.set_status(&e.runtime_id, ImplementationStatus::Unavailable)
                .await?;
        }
    }
    Ok(())
}

/// Deactivate contributions + drain every live lease bound to any
/// install of those runtimes (T080). Returns the count of leases
/// released. Used by the host's extension-deactivate handler; the
/// plain [`deactivate_contributions`] is retained for code paths that
/// don't have access to a `LeaseManager`.
pub async fn deactivate_contributions_with_drain(
    catalog_repo: &dyn BackendRuntimeCatalogRepo,
    installs_repo: &dyn nexus_backend_runtimes::generic::installs::BackendRuntimeInstallsRepo,
    lease_manager: &nexus_backend_runtimes::generic::leases::LeaseManager,
    source_extension_id: &SourceExtensionId,
) -> Result<usize, RegistrationError> {
    let entries = catalog_repo
        .list_by_source_extension(source_extension_id)
        .await?;

    // Collect install ids for every contributed runtime, then drain.
    let mut drained = 0;
    for e in &entries {
        let installs = installs_repo
            .list_by_runtime(&e.runtime_id)
            .await
            .map_err(RegistrationError::from)?;
        for install in installs {
            drained += lease_manager
                .release_all_for_install(&install.runtime_install_id)
                .await
                .map_err(|err| {
                    RegistrationError::Repo(GenericRepoError::Storage(err.to_string()))
                })?;
        }
    }

    // Flip the catalog rows only after leases drain (matches the
    // lifecycle cascade in data-model.md §9: state transitions follow
    // subprocess reaping).
    for e in entries {
        if e.implementation_status != ImplementationStatus::Unavailable {
            catalog_repo
                .set_status(&e.runtime_id, ImplementationStatus::Unavailable)
                .await?;
        }
    }

    Ok(drained)
}

/// Uninstall cascade. T038.
/// Catalog rows → `abandoned`; every install for those runtimes →
/// `abandoned` so the host artifact-store retention sweep can reclaim
/// the install paths.
pub async fn abandon_contributions(
    catalog_repo: &dyn BackendRuntimeCatalogRepo,
    installs_repo: &dyn BackendRuntimeInstallsRepo,
    source_extension_id: &SourceExtensionId,
) -> Result<(), RegistrationError> {
    let entries = catalog_repo
        .list_by_source_extension(source_extension_id)
        .await?;
    for e in entries {
        catalog_repo
            .set_status(&e.runtime_id, ImplementationStatus::Abandoned)
            .await?;
        installs_repo
            .mark_abandoned_for_runtime(&e.runtime_id)
            .await?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sample(runtime_id: &str) -> BackendRuntimeContribution {
        BackendRuntimeContribution {
            runtime_id: runtime_id.into(),
            display_name: "Test".into(),
            family: "python".into(),
            transport: "stdio".into(),
            worker_entrypoint: "worker/main.py".into(),
            version_manifest: "backends/v.yaml".into(),
            capability_tags: vec!["t1".into(), "t2".into()],
            supported_roles: vec!["primary".into()],
        }
    }

    #[test]
    fn checksum_is_deterministic() {
        let a = compute_contribution_checksum(&sample("test.echo")).unwrap();
        let b = compute_contribution_checksum(&sample("test.echo")).unwrap();
        assert_eq!(a, b);
    }

    #[test]
    fn checksum_changes_when_field_changes() {
        let mut c1 = sample("test.echo");
        let h1 = compute_contribution_checksum(&c1).unwrap();
        c1.display_name = "Different".into();
        let h2 = compute_contribution_checksum(&c1).unwrap();
        assert_ne!(h1, h2);
    }

    #[test]
    fn build_catalog_entry_rejects_unknown_family() {
        let mut c = sample("test.echo");
        c.family = "rust".into();
        let err = build_catalog_entry(
            &c,
            &SourceExtensionId::from("ext.test"),
            "0.1.0",
            1_700_000_000,
        )
        .unwrap_err();
        assert!(matches!(err, RegistrationError::UnknownFamily(_)));
    }

    #[test]
    fn build_catalog_entry_populates_canonical_fields() {
        let entry = build_catalog_entry(
            &sample("test.echo"),
            &SourceExtensionId::from("ext.test"),
            "0.1.0",
            1_700_000_000,
        )
        .unwrap();
        assert_eq!(entry.runtime_id.as_str(), "test.echo");
        assert_eq!(entry.runtime_family, RuntimeFamily::Python);
        assert_eq!(entry.transport, Transport::Stdio);
        assert_eq!(entry.implementation_status, ImplementationStatus::Available);
    }
}
