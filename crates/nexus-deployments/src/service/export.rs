use crate::error::DeploymentError;
use crate::hash::{hex, sha256_jcs};
use crate::id::DeploymentId;
use crate::repository::DeploymentRepository;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::sync::Arc;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportEnvelope {
    pub package_version: u32,
    pub deployment: Value,
    pub revisions: Vec<Value>,
    /// Per-extension opaque settings captured at export time. Additive and
    /// optional: v1 envelopes lacking the field deserialize to an empty vec,
    /// so no `package_version` bump is needed and old importers still read it.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub extension_settings: Vec<ExtensionSettingsBundle>,
    pub integrity: Integrity,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExtensionSettingsBundle {
    pub extension_id: String,
    pub settings: Value,
    pub schema_fingerprint: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Integrity {
    pub hash_algo: String,
    pub digest: String,
}

const SECRET_PATTERNS: &[&str] = &[
    "api_key",
    "api-key",
    "apikey",
    "secret",
    "password",
    "private_key",
    "private-key",
    "bearer ",
];

pub struct DeploymentExportService {
    repo: Arc<dyn DeploymentRepository>,
}

impl DeploymentExportService {
    pub fn new(repo: Arc<dyn DeploymentRepository>) -> Self {
        Self { repo }
    }

    pub async fn export(
        &self,
        deployment_id: &DeploymentId,
    ) -> Result<ExportEnvelope, DeploymentError> {
        let deployment = self.repo.fetch_deployment(deployment_id).await?;
        let revision_id = deployment
            .current_revision_id
            .clone()
            .ok_or_else(|| DeploymentError::RestoreBlocked("no revision".into()))?;
        let revision = self.repo.fetch_revision(&revision_id).await?;

        let deployment_value = serde_json::to_value(&deployment)?;
        let revision_value = serde_json::to_value(&revision)?;

        let settings_rows = self.repo.list_extension_settings(deployment_id).await?;
        let mut bundles = Vec::with_capacity(settings_rows.len());
        for row in settings_rows {
            let settings: Value = serde_json::from_str(&row.settings_json)
                .unwrap_or_else(|_| Value::String(row.settings_json.clone()));
            bundles.push(ExtensionSettingsBundle {
                extension_id: row.extension_id,
                settings,
                schema_fingerprint: row.settings_schema_fingerprint,
            });
        }

        let bundles_value = serde_json::to_value(&bundles)?;
        if contains_secret(&deployment_value)
            || contains_secret(&revision_value)
            || contains_secret(&bundles_value)
        {
            return Err(DeploymentError::ExportBlockedBySecret);
        }

        // Add the key only when non-empty so a settings-less deployment keeps
        // the exact digest it had before this field existed (v1 stability).
        let mut body = json!({
            "deployment": deployment_value,
            "revisions": [revision_value],
        });
        if !bundles.is_empty() {
            body["extension_settings"] = bundles_value;
        }
        let digest = hex(&sha256_jcs(&body)?);

        Ok(ExportEnvelope {
            package_version: 1,
            deployment: body["deployment"].clone(),
            revisions: vec![body["revisions"][0].clone()],
            extension_settings: bundles,
            integrity: Integrity {
                hash_algo: "sha256-jcs-rfc8785".into(),
                digest,
            },
        })
    }
}

fn contains_secret(value: &Value) -> bool {
    let serialized = value.to_string().to_lowercase();
    SECRET_PATTERNS.iter().any(|p| serialized.contains(p))
}

/// Re-scan a fully-formed envelope for secret-like keys/values. The host export
/// path already scans at build time; this guards the save-from-import preset
/// path, where the envelope comes from a client-supplied file.
pub fn envelope_contains_secret(envelope: &ExportEnvelope) -> bool {
    if contains_secret(&envelope.deployment) || envelope.revisions.iter().any(contains_secret) {
        return true;
    }
    match serde_json::to_value(&envelope.extension_settings) {
        Ok(v) => contains_secret(&v),
        // Unserializable settings are anomalous — treat as unsafe.
        Err(_) => true,
    }
}

#[cfg(test)]
mod secret_scan_tests {
    use super::*;
    use serde_json::json;

    fn env(deployment: serde_json::Value, settings: serde_json::Value) -> ExportEnvelope {
        ExportEnvelope {
            package_version: 1,
            deployment,
            revisions: vec![json!({})],
            extension_settings: vec![ExtensionSettingsBundle {
                extension_id: "x".into(),
                settings,
                schema_fingerprint: None,
            }],
            integrity: Integrity {
                hash_algo: "x".into(),
                digest: "0".repeat(64),
            },
        }
    }

    #[test]
    fn flags_secret_in_settings_and_passes_clean() {
        assert!(envelope_contains_secret(&env(
            json!({}),
            json!({"api_key": "sk-1"})
        )));
        assert!(!envelope_contains_secret(&env(
            json!({"display_name": "ok"}),
            json!({"speed": 1.5})
        )));
    }
}
