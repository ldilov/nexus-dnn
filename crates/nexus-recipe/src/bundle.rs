//! P8 shareability bundle (CONTRACTS C8, OR-2 deterministic export). A
//! [`RecipeBundle`] serializes a recipe's projection + an immutable workflow
//! snapshot + derived requirements + a compatibility summary under a JCS-sha256
//! integrity digest. Export refuses to emit secrets; validate recomputes the
//! digest, re-scans for secrets, and checks every referenced operator resolves
//! in the live registry. Host-generic: no concrete node ids or binding literals.

use std::collections::BTreeMap;

use nexus_extension::OperatorDefinition;
use nexus_workflow::{Workflow, WorkflowVersionSnapshot};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

use crate::projection::{Preset, RecipeProjection};
use crate::status::RecipeStatus;

/// Bundle wire-format version. Bumped only on a breaking envelope change.
pub const BUNDLE_PACKAGE_VERSION: u32 = 1;

/// Integrity algorithm tag stored on every bundle (RFC 8785 JCS + sha256).
const HASH_ALGO: &str = "sha256-jcs-rfc8785";

/// Substrings that, if present anywhere in the serialized bundle, mark it as
/// carrying a secret. Mirrors the deployment export guard.
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

/// Errors from building or validating a recipe bundle.
#[derive(Debug, thiserror::Error)]
pub enum BundleError {
    #[error("unsupported bundle package_version: {found}")]
    UnsupportedVersion { found: u32 },
    #[error("bundle integrity digest mismatch")]
    IntegrityMismatch,
    #[error("operator `{id}@{version}` referenced by the bundle is not resolvable")]
    UnresolvableOperator { id: String, version: String },
    #[error("bundle would carry a secret value")]
    SecretLeak,
    #[error("bundle serialization failed: {0}")]
    Serialization(String),
}

/// Recipe display metadata carried by the bundle (the host generates a fresh id
/// on import, so no id travels in the bundle).
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct RecipeManifest {
    pub display_name: String,
    pub summary: String,
    pub category: String,
    pub recipe_version: String,
}

/// A serializable, immutable workflow-version snapshot. Mirrors
/// [`WorkflowVersionSnapshot`] minus the in-memory operator defs (which are
/// reconstructed from the live registry on import).
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct BundleWorkflowSnapshot {
    pub workflow_id: String,
    pub version: String,
    pub canonical_hash: String,
    pub workflow: Workflow,
    pub operator_schema_hashes: BTreeMap<String, String>,
}

/// One operator the bundle's snapshot depends on, with its per-node schema hash.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct OperatorRequirement {
    pub id: String,
    pub version: String,
    pub schema_hash: Option<String>,
}

/// One extension the bundle depends on.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct ExtensionRequirement {
    pub id: String,
    pub version: String,
}

/// The bundle's dependency manifest, derived from the snapshot's operator refs.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct Requirements {
    #[serde(default)]
    pub extensions: Vec<ExtensionRequirement>,
    pub operators: Vec<OperatorRequirement>,
}

/// The bundle's compatibility verdict at export time (canonical [`RecipeStatus`]).
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct BundleCompatSummary {
    pub status: RecipeStatus,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub reason: Option<String>,
}

/// Integrity envelope shared with the deployment export discipline.
#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct Integrity {
    pub hash_algo: String,
    pub digest: String,
}

/// A self-contained, shareable recipe bundle.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeBundle {
    pub package_version: u32,
    pub recipe: RecipeManifest,
    pub projection: RecipeProjection,
    pub workflow_snapshot: BundleWorkflowSnapshot,
    #[serde(default)]
    pub presets: Vec<Preset>,
    pub requirements: Requirements,
    pub compatibility: BundleCompatSummary,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub thumbnail: Option<String>,
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub samples: Vec<serde_json::Value>,
    pub integrity: Integrity,
}

/// Export a recipe bundle. Assembles requirements, runs the secret guard, and
/// stamps a JCS-sha256 integrity digest. Returns [`BundleError::SecretLeak`] if
/// any field would carry a secret-like value.
pub fn export_recipe_bundle(
    recipe: RecipeManifest,
    projection: RecipeProjection,
    snapshot: &WorkflowVersionSnapshot,
    status: RecipeStatus,
    reason: Option<String>,
) -> Result<RecipeBundle, BundleError> {
    let requirements = requirements_from(snapshot);
    let presets = projection.presets.clone();
    let workflow_snapshot = BundleWorkflowSnapshot {
        workflow_id: snapshot.workflow_id.clone(),
        version: snapshot.version.clone(),
        canonical_hash: snapshot.canonical_hash.clone(),
        workflow: snapshot.workflow.clone(),
        operator_schema_hashes: snapshot.operator_schema_hashes.clone(),
    };

    let mut bundle = RecipeBundle {
        package_version: BUNDLE_PACKAGE_VERSION,
        recipe,
        projection,
        workflow_snapshot,
        presets,
        requirements,
        compatibility: BundleCompatSummary { status, reason },
        thumbnail: None,
        samples: Vec::new(),
        integrity: Integrity {
            hash_algo: HASH_ALGO.to_string(),
            digest: String::new(),
        },
    };

    let value = to_value(&bundle)?;
    if contains_secret(&value) {
        return Err(BundleError::SecretLeak);
    }

    bundle.integrity.digest = compute_digest(&bundle)?;
    Ok(bundle)
}

/// Validate a client-supplied bundle: version, integrity digest, no secrets, and
/// every operator the snapshot references resolvable in `available_operators`.
/// Performs no writes; never trusts the client-supplied digest.
pub fn validate_bundle(
    bundle: &RecipeBundle,
    available_operators: &[OperatorDefinition],
) -> Result<(), BundleError> {
    if bundle.package_version != BUNDLE_PACKAGE_VERSION {
        return Err(BundleError::UnsupportedVersion {
            found: bundle.package_version,
        });
    }

    let expected = compute_digest(bundle)?;
    if expected != bundle.integrity.digest {
        return Err(BundleError::IntegrityMismatch);
    }

    let value = to_value(bundle)?;
    if contains_secret(&value) {
        return Err(BundleError::SecretLeak);
    }

    for (id, version) in operator_refs(&bundle.workflow_snapshot.workflow) {
        let resolvable = available_operators
            .iter()
            .any(|op| op.operator.id == id && op.operator.version == version);
        if !resolvable {
            return Err(BundleError::UnresolvableOperator { id, version });
        }
    }

    Ok(())
}

/// Derive the dependency manifest from the snapshot's node operator refs +
/// per-node schema hashes. Extensions are left empty: the snapshot carries no
/// operator→extension map, and operator resolvability is the import-time gate.
fn requirements_from(snapshot: &WorkflowVersionSnapshot) -> Requirements {
    let mut operators: Vec<OperatorRequirement> = Vec::new();
    for n in &snapshot.workflow.nodes {
        let (id, version) = split_operator(&n.operator);
        if operators.iter().any(|o| o.id == id && o.version == version) {
            continue;
        }
        operators.push(OperatorRequirement {
            id,
            version,
            schema_hash: snapshot.operator_schema_hashes.get(&n.id).cloned(),
        });
    }
    Requirements {
        extensions: Vec::new(),
        operators,
    }
}

/// Distinct `(id, version)` operator references across the workflow's nodes.
fn operator_refs(workflow: &Workflow) -> Vec<(String, String)> {
    let mut refs: Vec<(String, String)> = Vec::new();
    for n in &workflow.nodes {
        let pair = split_operator(&n.operator);
        if !refs.contains(&pair) {
            refs.push(pair);
        }
    }
    refs
}

/// Split an `id@version` operator reference; a missing `@` yields an empty
/// version.
fn split_operator(operator: &str) -> (String, String) {
    match operator.rsplit_once('@') {
        Some((id, version)) => (id.to_string(), version.to_string()),
        None => (operator.to_string(), String::new()),
    }
}

/// Recompute the JCS-sha256 digest over the bundle with its digest field blanked,
/// so export and validate agree byte-for-byte.
fn compute_digest(bundle: &RecipeBundle) -> Result<String, BundleError> {
    let mut blanked = bundle.clone();
    blanked.integrity.digest = String::new();
    let value = to_value(&blanked)?;
    Ok(hex(&sha256_jcs(&value)?))
}

fn to_value<T: Serialize>(value: &T) -> Result<serde_json::Value, BundleError> {
    serde_json::to_value(value).map_err(|e| BundleError::Serialization(e.to_string()))
}

fn contains_secret(value: &serde_json::Value) -> bool {
    let serialized = value.to_string().to_lowercase();
    SECRET_PATTERNS.iter().any(|p| serialized.contains(p))
}

fn sha256_jcs(value: &serde_json::Value) -> Result<[u8; 32], BundleError> {
    let canonical =
        json_canon::to_string(value).map_err(|e| BundleError::Serialization(e.to_string()))?;
    let mut hasher = Sha256::new();
    hasher.update(canonical.as_bytes());
    let out = hasher.finalize();
    let mut bytes = [0u8; 32];
    bytes.copy_from_slice(&out);
    Ok(bytes)
}

fn hex(digest: &[u8; 32]) -> String {
    const HEX: &[u8; 16] = b"0123456789abcdef";
    let mut s = String::with_capacity(64);
    for b in digest {
        s.push(HEX[(b >> 4) as usize] as char);
        s.push(HEX[(b & 0x0f) as usize] as char);
    }
    s
}
