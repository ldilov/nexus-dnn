use std::collections::HashSet;

use nexus_protocol::RuntimeFamily;
use referencing::Resource;
use semver::{Version, VersionReq};

use crate::error::ExtensionError;
use crate::manifest::ExtensionManifest;

const MANIFEST_SCHEMA: &str = include_str!("../../../schemas/extension-manifest.json");
const OPERATOR_SCHEMA: &str = include_str!("../../../schemas/operator-definition.json");
const STORAGE_CONTRIBUTION_SCHEMA: &str =
    include_str!("../../../schemas/storage-contribution.schema.json");

pub fn validate_manifest_schema(manifest_value: &serde_json::Value) -> Result<(), ExtensionError> {
    validate_manifest_with_refs(manifest_value)
}

/// Spec 032 — validate the parsed `backend_runtimes` block. Atomic per
/// FR-004: any invalid contribution rejects the whole activation.
pub fn validate_backend_runtimes(manifest: &ExtensionManifest) -> Result<(), ExtensionError> {
    crate::backend_runtime_contribution::validate_contributions(&manifest.backend_runtimes).map_err(
        |e| ExtensionError::SchemaValidation {
            errors: vec![format!("backend_runtimes contribution invalid: {e}")],
        },
    )
}

pub fn validate_operator_schema(operator_value: &serde_json::Value) -> Result<(), ExtensionError> {
    validate_against_schema(operator_value, OPERATOR_SCHEMA)
}

/// Fail-fast check run at extension load: if the manifest declares a
/// `config_schema`, it must compile as a JSON Schema (draft-07) or the
/// extension load is rejected. No-op when absent.
pub fn validate_config_schema_compiles(manifest: &ExtensionManifest) -> Result<(), ExtensionError> {
    let Some(schema) = manifest.config_schema.as_ref() else {
        return Ok(());
    };
    jsonschema::draft7::new(schema).map_err(|e| ExtensionError::SchemaValidation {
        errors: vec![format!("config_schema does not compile: {e}")],
    })?;
    Ok(())
}

/// Validate a per-deployment settings blob against an extension-declared
/// `config_schema` (draft-07). Returns the collected violation messages on
/// failure. Host-generic: the caller passes the schema fetched from the
/// extension's manifest; this function knows nothing about extension identity.
pub fn validate_settings_against_schema(
    schema: &serde_json::Value,
    instance: &serde_json::Value,
) -> Result<(), Vec<String>> {
    let validator = jsonschema::draft7::new(schema)
        .map_err(|e| vec![format!("config_schema does not compile: {e}")])?;
    let errors: Vec<String> = validator
        .iter_errors(instance)
        .map(|e| e.to_string())
        .collect();
    if errors.is_empty() {
        Ok(())
    } else {
        Err(errors)
    }
}

fn validate_manifest_with_refs(instance: &serde_json::Value) -> Result<(), ExtensionError> {
    let schema: serde_json::Value =
        serde_json::from_str(MANIFEST_SCHEMA).expect("embedded schema is valid JSON");

    let storage_schema: serde_json::Value =
        serde_json::from_str(STORAGE_CONTRIBUTION_SCHEMA).expect("embedded schema is valid JSON");

    let storage_resource =
        Resource::from_contents(storage_schema).map_err(|e| ExtensionError::SchemaValidation {
            errors: vec![format!("failed to load storage contribution schema: {e}")],
        })?;

    let validator = jsonschema::options()
        .with_resource(
            "https://nexus-dnn.dev/schemas/storage-contribution.schema.json",
            storage_resource,
        )
        .build(&schema)
        .map_err(|e| ExtensionError::SchemaValidation {
            errors: vec![format!("failed to compile schema: {e}")],
        })?;

    let errors: Vec<String> = validator
        .iter_errors(instance)
        .map(|e| e.to_string())
        .collect();
    if !errors.is_empty() {
        return Err(ExtensionError::SchemaValidation { errors });
    }
    Ok(())
}

fn validate_against_schema(
    instance: &serde_json::Value,
    schema_str: &str,
) -> Result<(), ExtensionError> {
    let schema: serde_json::Value =
        serde_json::from_str(schema_str).expect("embedded schema is valid JSON");
    let validator =
        jsonschema::Validator::new(&schema).map_err(|e| ExtensionError::SchemaValidation {
            errors: vec![format!("failed to compile schema: {e}")],
        })?;
    let errors: Vec<String> = validator
        .iter_errors(instance)
        .map(|e| e.to_string())
        .collect();
    if !errors.is_empty() {
        return Err(ExtensionError::SchemaValidation { errors });
    }
    Ok(())
}

pub fn check_compatibility(
    manifest: &ExtensionManifest,
    host_version: &Version,
    protocol_version: &Version,
) -> Result<(), ExtensionError> {
    let extension_id = &manifest.extension.id;

    let host_req = parse_version_req(&manifest.compatibility.host_api, extension_id, "host_api")?;
    if !host_req.matches(host_version) {
        return Err(ExtensionError::CompatibilityMismatch {
            extension_id: extension_id.clone(),
            detail: format!(
                "host_api requires {}, but host is {host_version}",
                manifest.compatibility.host_api
            ),
        });
    }

    let proto_req = parse_version_req(&manifest.compatibility.protocol, extension_id, "protocol")?;
    if !proto_req.matches(protocol_version) {
        return Err(ExtensionError::CompatibilityMismatch {
            extension_id: extension_id.clone(),
            detail: format!(
                "protocol requires {}, but host is {protocol_version}",
                manifest.compatibility.protocol
            ),
        });
    }

    Ok(())
}

fn parse_version_req(
    req_str: &str,
    extension_id: &str,
    field_name: &str,
) -> Result<VersionReq, ExtensionError> {
    VersionReq::parse(req_str).map_err(|e| ExtensionError::CompatibilityMismatch {
        extension_id: extension_id.to_owned(),
        detail: format!("invalid {field_name} version requirement '{req_str}': {e}"),
    })
}

const KNOWN_CAPABILITIES: &[&str] = &[
    "filesystem.read",
    "filesystem.write",
    "network.loopback",
    "network.remote",
    "gpu.compute",
    "process.spawn",
    "model_registry.read",
    "workspace.read",
    "workspace.write",
    "storage.schema_contribute",
];

pub struct CapabilityGrant {
    pub granted: HashSet<String>,
    pub denied: Vec<String>,
    pub pre_approved: bool,
}

pub fn resolve_capabilities(manifest: &ExtensionManifest) -> CapabilityGrant {
    let declared = manifest.capabilities.as_ref().cloned().unwrap_or_default();

    let known: HashSet<&str> = KNOWN_CAPABILITIES.iter().copied().collect();

    let mut granted = HashSet::new();
    let mut denied = Vec::new();

    for cap in &declared {
        if known.contains(cap.as_str()) {
            granted.insert(cap.clone());
        } else {
            denied.push(cap.clone());
        }
    }

    let pre_approved = manifest.runtime.family == RuntimeFamily::Builtin;

    if !pre_approved {
        granted.clear();
    }

    CapabilityGrant {
        granted,
        denied,
        pre_approved,
    }
}

#[cfg(test)]
mod config_schema_tests {
    use super::*;
    use serde_json::json;

    fn manifest_with(config_schema_block: &str) -> ExtensionManifest {
        let yaml = format!(
            r#"
spec_version: "0.1"
extension:
  id: "test.ext"
  version: "0.1.0"
compatibility:
  host_api: ">=0.1.0"
  protocol: ">=0.1.0"
runtime:
  family: "native"
  entrypoint: "bin/x"
{config_schema_block}
"#
        );
        serde_yaml::from_str(&yaml).expect("manifest fixture")
    }

    #[test]
    fn compiles_a_valid_config_schema() {
        let m =
            manifest_with("config_schema:\n  type: object\n  properties:\n    a: { type: string }");
        assert!(validate_config_schema_compiles(&m).is_ok());
    }

    #[test]
    fn rejects_a_malformed_config_schema() {
        // A bare number is not a valid JSON Schema (must be object or bool).
        let m = manifest_with("config_schema: 42");
        assert!(validate_config_schema_compiles(&m).is_err());
    }

    #[test]
    fn absent_config_schema_is_ok() {
        let m = manifest_with("");
        assert!(m.config_schema.is_none());
        assert!(validate_config_schema_compiles(&m).is_ok());
    }

    #[test]
    fn rejects_external_file_ref_in_config_schema() {
        // resolve-file is disabled, so an external file:// $ref fails to
        // compile rather than reading the host filesystem.
        let m = manifest_with("config_schema:\n  $ref: \"file:///etc/passwd\"");
        assert!(validate_config_schema_compiles(&m).is_err());
    }

    #[test]
    fn validates_settings_blob_pass_and_fail() {
        let schema = json!({
            "type": "object",
            "properties": { "family_id": { "type": "string" } },
            "required": ["family_id"],
        });
        assert!(validate_settings_against_schema(&schema, &json!({ "family_id": "x" })).is_ok());

        let wrong_type = validate_settings_against_schema(&schema, &json!({ "family_id": 1 }));
        assert!(wrong_type.is_err());

        let missing_required = validate_settings_against_schema(&schema, &json!({}));
        assert!(missing_required.is_err());
    }
}
