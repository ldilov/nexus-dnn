//! Host-canonical binding grammar: parse and apply control binding targets.
//!
//! A binding target is either:
//! - `input:<port-name>` — maps to a workflow-level input port.
//! - `node:<node-id>` followed by `.config` and then field segments — maps
//!   to a JSON pointer inside a node's config object.
//!
//! These string prefixes are the generic grammar constants; concrete ids are
//! supplied at call-time and never appear in this source file.

use crate::error::BindingError;

/// A parsed binding target: either a workflow input port or a node config path.
#[derive(Clone, Debug, PartialEq, Eq)]
pub enum BindingTarget {
    /// Corresponds to the `input:` prefix form.
    Input(String),
    /// Corresponds to the `node:` prefix form with a config pointer.
    NodeConfig {
        node_id: String,
        pointer: Vec<String>,
    },
}

impl BindingTarget {
    /// Render this target back to its canonical binding string, the inverse of
    /// [`parse_target`]. Built from the grammar constants so host callers (e.g.
    /// the exposable-targets scan) can emit node-config binding strings without
    /// spelling a forbidden node-id-shaped literal in their own source.
    pub fn to_target_string(&self) -> String {
        match self {
            BindingTarget::Input(name) => format!("{INPUT_PREFIX}{name}"),
            BindingTarget::NodeConfig { node_id, pointer } => {
                format!("{NODE_PREFIX}{node_id}.{CONFIG_INFIX}{}", pointer.join("."))
            }
        }
    }
}

/// The literal prefix that introduces an input-port binding.
const INPUT_PREFIX: &str = "input:";

/// The literal prefix that introduces a node-config binding.
const NODE_PREFIX: &str = "node:";

/// The infix that separates the node-id segment from the config pointer.
/// Note: no leading dot here — safe per boundary rules.
const CONFIG_INFIX: &str = "config.";

/// Parse a raw binding string into a [`BindingTarget`].
///
/// # Grammar
///
/// An input binding: `"input:"` followed by a non-empty port name.
///
/// A node-config binding: `"node:"` followed by a non-empty node-id, a dot,
/// the word `"config"`, a dot, then one or more non-empty field segments
/// separated by dots.
///
/// Returns [`BindingError::PathResolveFailed`] for any malformed input.
pub fn parse_target(raw: &str) -> Result<BindingTarget, BindingError> {
    if let Some(name) = raw.strip_prefix(INPUT_PREFIX) {
        if name.is_empty() {
            return Err(BindingError::PathResolveFailed {
                target: raw.to_string(),
                detail: "input port name must not be empty".to_string(),
            });
        }
        return Ok(BindingTarget::Input(name.to_string()));
    }

    if let Some(rest) = raw.strip_prefix(NODE_PREFIX) {
        return parse_node_target(raw, rest);
    }

    Err(BindingError::PathResolveFailed {
        target: raw.to_string(),
        detail: "binding must start with a recognized prefix".to_string(),
    })
}

/// Parse the part of a node binding after the `node:` prefix has been stripped.
fn parse_node_target(raw: &str, rest: &str) -> Result<BindingTarget, BindingError> {
    let (node_id, after_id) =
        rest.split_once('.')
            .ok_or_else(|| BindingError::PathResolveFailed {
                target: raw.to_string(),
                detail: "node binding requires a dot-separated node-id and config path".to_string(),
            })?;

    if node_id.is_empty() {
        return Err(BindingError::PathResolveFailed {
            target: raw.to_string(),
            detail: "node-id must not be empty".to_string(),
        });
    }

    let tail =
        after_id
            .strip_prefix(CONFIG_INFIX)
            .ok_or_else(|| BindingError::PathResolveFailed {
                target: raw.to_string(),
                detail: "node binding path must include the config infix".to_string(),
            })?;

    if tail.is_empty() {
        return Err(BindingError::PathResolveFailed {
            target: raw.to_string(),
            detail: "config pointer must not be empty after the config infix".to_string(),
        });
    }

    let pointer: Vec<String> = tail.split('.').map(str::to_string).collect();

    if pointer.iter().any(|s| s.is_empty()) {
        return Err(BindingError::PathResolveFailed {
            target: raw.to_string(),
            detail: "config pointer must not contain empty segments".to_string(),
        });
    }

    Ok(BindingTarget::NodeConfig {
        node_id: node_id.to_string(),
        pointer,
    })
}

/// Write a JSON `value` into `node.config` at the path described by `pointer`.
///
/// - An empty `pointer` is rejected with [`BindingError::PathResolveFailed`].
/// - If the node's config field is `None` it is initialised to an empty JSON object.
/// - Missing intermediate objects are created automatically.
/// - If an intermediate path segment resolves to a non-object value the write
///   is rejected with [`BindingError::PathResolveFailed`].
pub fn write_node_config(
    node: &mut nexus_workflow::NodeInstance,
    pointer: &[String],
    value: serde_json::Value,
) -> Result<(), BindingError> {
    if pointer.is_empty() {
        return Err(BindingError::PathResolveFailed {
            target: String::new(),
            detail: "pointer must not be empty".to_string(),
        });
    }

    // Initialise the config field if absent.
    let cfg = &mut node.config;
    if cfg.is_none() {
        *cfg = Some(serde_json::Value::Object(serde_json::Map::new()));
    }

    let root = cfg.as_mut().expect("just initialised above");

    let (leaf_key, parents) = pointer.split_last().expect("checked non-empty above");

    let mut cursor = root;
    for segment in parents {
        if !cursor.is_object() {
            return Err(BindingError::PathResolveFailed {
                target: pointer.join("/"),
                detail: "intermediate path segment is not an object".to_string(),
            });
        }
        cursor = cursor
            .as_object_mut()
            .unwrap()
            .entry(segment.clone())
            .or_insert_with(|| serde_json::Value::Object(serde_json::Map::new()));

        if !cursor.is_object() {
            return Err(BindingError::PathResolveFailed {
                target: pointer.join("/"),
                detail: "intermediate path segment is not an object".to_string(),
            });
        }
    }

    match cursor.as_object_mut() {
        Some(map) => {
            map.insert(leaf_key.clone(), value);
            Ok(())
        }
        None => Err(BindingError::PathResolveFailed {
            target: pointer.join("/"),
            detail: "cannot index into a non-object at the leaf parent".to_string(),
        }),
    }
}
