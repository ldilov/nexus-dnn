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

pub fn validate_operator_schema(operator_value: &serde_json::Value) -> Result<(), ExtensionError> {
    validate_against_schema(operator_value, OPERATOR_SCHEMA)
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
    let declared = manifest
        .capabilities
        .as_ref()
        .cloned()
        .unwrap_or_default();

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
