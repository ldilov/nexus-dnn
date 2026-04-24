use std::collections::{BTreeMap, BTreeSet};

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::domain::{EmotionTtsError, Result};

pub const WORKFLOW_TEMPLATE_ID: &str = "emotiontts_dialogue_batch@0.1.0";

pub const CURATED_NODES: &[(&str, &str)] = &[
    ("script_parse_1", "emotiontts.script.parse@1.0.0"),
    ("mapping_resolve_1", "emotiontts.mapping.resolve@1.0.0"),
    ("emotion_resolve_1", "emotiontts.emotion.resolve@1.0.0"),
    ("synthesize_1", "emotiontts.batch.synthesize@1.0.0"),
    ("postprocess_1", "emotiontts.audio.postprocess@1.0.0"),
    ("preview_mix_1", "emotiontts.audio.preview_mix@1.0.0"),
    ("export_bundle_1", "emotiontts.export.bundle@1.0.0"),
];

pub const CURATED_EDGES: &[(&str, &str)] = &[
    ("script_parse_1", "mapping_resolve_1"),
    ("mapping_resolve_1", "emotion_resolve_1"),
    ("emotion_resolve_1", "synthesize_1"),
    ("synthesize_1", "postprocess_1"),
    ("synthesize_1", "preview_mix_1"),
    ("postprocess_1", "export_bundle_1"),
    ("preview_mix_1", "export_bundle_1"),
];

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Node {
    pub id: String,
    pub operator_id: String,
    #[serde(default)]
    pub config: BTreeMap<String, Value>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Edge {
    pub from: String,
    pub to: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct WorkflowDocument {
    pub template_id: String,
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
    #[serde(default)]
    pub inputs: BTreeMap<String, Value>,
    #[serde(default)]
    pub customised: bool,
}

#[derive(Debug, Clone, Copy, Eq, PartialEq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RecipeField {
    ScriptText,
    OutputFormat,
    SpeedFactor,
    SpeedMode,
    GlobalEmotionMode,
    GlobalEmotionVector,
    GlobalEmotionQwenTemplate,
    GlobalEmotionAlpha,
    SeedStrategy,
    BaseSeed,
    CachePolicy,
    CreateZipBundle,
    IncludePreviewMix,
    IncludeManifestJson,
    IncludeCsvIndex,
}

impl RecipeField {
    #[must_use]
    pub const fn targets(self) -> &'static [&'static str] {
        match self {
            Self::ScriptText => &["input:script_text"],
            Self::OutputFormat => &[
                "node:postprocess_1.config.output_format",
                "node:export_bundle_1.config.output_format",
            ],
            Self::SpeedFactor => &["node:postprocess_1.config.speed_factor"],
            Self::SpeedMode => &["node:postprocess_1.config.speed_mode"],
            Self::GlobalEmotionMode => &["node:emotion_resolve_1.config.global_mode"],
            Self::GlobalEmotionVector => &["node:emotion_resolve_1.config.global_vector"],
            Self::GlobalEmotionQwenTemplate => {
                &["node:emotion_resolve_1.config.global_qwen_template"]
            }
            Self::GlobalEmotionAlpha => &["node:emotion_resolve_1.config.global_alpha"],
            Self::SeedStrategy => &["node:synthesize_1.config.seed_strategy"],
            Self::BaseSeed => &["node:synthesize_1.config.base_seed"],
            Self::CachePolicy => &["node:synthesize_1.config.cache_policy"],
            Self::CreateZipBundle => &["node:export_bundle_1.config.create_zip"],
            Self::IncludePreviewMix => &["node:preview_mix_1.config.enabled"],
            Self::IncludeManifestJson => &["node:export_bundle_1.config.include_manifest"],
            Self::IncludeCsvIndex => &["node:export_bundle_1.config.include_csv"],
        }
    }

    pub const ALL: &'static [Self] = &[
        Self::ScriptText,
        Self::OutputFormat,
        Self::SpeedFactor,
        Self::SpeedMode,
        Self::GlobalEmotionMode,
        Self::GlobalEmotionVector,
        Self::GlobalEmotionQwenTemplate,
        Self::GlobalEmotionAlpha,
        Self::SeedStrategy,
        Self::BaseSeed,
        Self::CachePolicy,
        Self::CreateZipBundle,
        Self::IncludePreviewMix,
        Self::IncludeManifestJson,
        Self::IncludeCsvIndex,
    ];
}

#[must_use]
pub fn default_workflow() -> WorkflowDocument {
    let nodes = CURATED_NODES
        .iter()
        .map(|(id, op)| Node {
            id: (*id).into(),
            operator_id: (*op).into(),
            config: default_config_for(id),
        })
        .collect();
    let edges = CURATED_EDGES
        .iter()
        .map(|(a, b)| Edge { from: (*a).into(), to: (*b).into() })
        .collect();
    WorkflowDocument {
        template_id: WORKFLOW_TEMPLATE_ID.into(),
        nodes,
        edges,
        inputs: default_inputs(),
        customised: false,
    }
}

fn default_inputs() -> BTreeMap<String, Value> {
    let mut m = BTreeMap::new();
    m.insert("script_text".into(), Value::String(String::new()));
    m
}

fn default_config_for(node_id: &str) -> BTreeMap<String, Value> {
    let mut m = BTreeMap::new();
    match node_id {
        "postprocess_1" => {
            m.insert("output_format".into(), json!("mp3"));
            m.insert("speed_factor".into(), json!(1.0));
            m.insert("speed_mode".into(), json!("preserve_pitch"));
        }
        "synthesize_1" => {
            m.insert("seed_strategy".into(), json!("increment_per_line"));
            m.insert("base_seed".into(), json!(42));
            m.insert("cache_policy".into(), json!("use_cache"));
        }
        "emotion_resolve_1" => {
            m.insert("global_mode".into(), json!("none"));
            m.insert("global_alpha".into(), json!(1.0));
        }
        "preview_mix_1" => {
            m.insert("enabled".into(), json!(true));
        }
        "export_bundle_1" => {
            m.insert("output_format".into(), json!("mp3"));
            m.insert("create_zip".into(), json!(true));
            m.insert("include_manifest".into(), json!(true));
            m.insert("include_csv".into(), json!(true));
        }
        _ => {}
    }
    m
}

pub fn read(doc: &WorkflowDocument, path: &str) -> Option<Value> {
    let parsed = parse_path(path).ok()?;
    match parsed {
        ParsedPath::Input(key) => doc.inputs.get(&key).cloned(),
        ParsedPath::NodeConfig { node_id, key } => {
            let node = doc.nodes.iter().find(|n| n.id == node_id)?;
            node.config.get(&key).cloned()
        }
    }
}

pub fn write(doc: &mut WorkflowDocument, path: &str, value: Value) -> Result<()> {
    let parsed = parse_path(path)?;
    match parsed {
        ParsedPath::Input(key) => {
            doc.inputs.insert(key, value);
            Ok(())
        }
        ParsedPath::NodeConfig { node_id, key } => {
            let node = doc
                .nodes
                .iter_mut()
                .find(|n| n.id == node_id)
                .ok_or_else(|| {
                    EmotionTtsError::not_found(format!("workflow node {node_id:?} not found"))
                })?;
            node.config.insert(key, value);
            Ok(())
        }
    }
}

pub fn bind_recipe_field(
    doc: &mut WorkflowDocument,
    field: RecipeField,
    value: &Value,
) -> Result<usize> {
    let mut hits = 0usize;
    let mut last_err: Option<EmotionTtsError> = None;
    for target in field.targets() {
        match write(doc, target, value.clone()) {
            Ok(()) => hits += 1,
            Err(err) => last_err = Some(err),
        }
    }
    if hits == 0 {
        return Err(last_err.unwrap_or_else(|| {
            EmotionTtsError::validation(format!("no mappable target for {field:?}"))
        }));
    }
    Ok(hits)
}

#[must_use]
pub fn is_field_mappable(doc: &WorkflowDocument, field: RecipeField) -> bool {
    field.targets().iter().all(|t| {
        let parsed = match parse_path(t) {
            Ok(p) => p,
            Err(_) => return false,
        };
        match parsed {
            ParsedPath::Input(_) => true,
            ParsedPath::NodeConfig { node_id, .. } => doc.nodes.iter().any(|n| n.id == node_id),
        }
    })
}

#[must_use]
pub fn mappable_fields(doc: &WorkflowDocument) -> Vec<RecipeField> {
    RecipeField::ALL
        .iter()
        .copied()
        .filter(|f| is_field_mappable(doc, *f))
        .collect()
}

#[must_use]
pub fn unmappable_fields(doc: &WorkflowDocument) -> Vec<RecipeField> {
    RecipeField::ALL
        .iter()
        .copied()
        .filter(|f| !is_field_mappable(doc, *f))
        .collect()
}

#[must_use]
pub fn compute_customised(doc: &WorkflowDocument) -> bool {
    if doc.template_id != WORKFLOW_TEMPLATE_ID {
        return true;
    }

    let curated_ids: BTreeSet<&str> = CURATED_NODES.iter().map(|(id, _)| *id).collect();
    for (id, op) in CURATED_NODES {
        match doc.nodes.iter().find(|n| n.id == *id) {
            None => return true,
            Some(node) if node.operator_id != *op => return true,
            _ => {}
        }
    }

    if doc.nodes.iter().any(|n| !curated_ids.contains(n.id.as_str())) {
        return true;
    }

    let doc_edges: BTreeSet<(&str, &str)> = doc
        .edges
        .iter()
        .map(|e| (e.from.as_str(), e.to.as_str()))
        .collect();
    let curated_edges: BTreeSet<(&str, &str)> =
        CURATED_EDGES.iter().map(|(a, b)| (*a, *b)).collect();
    if doc_edges != curated_edges {
        return true;
    }

    false
}

pub fn refresh_customised(doc: &mut WorkflowDocument) {
    doc.customised = compute_customised(doc);
}

enum ParsedPath {
    Input(String),
    NodeConfig { node_id: String, key: String },
}

fn parse_path(raw: &str) -> Result<ParsedPath> {
    if let Some(rest) = raw.strip_prefix("input:") {
        if rest.is_empty() {
            return Err(EmotionTtsError::validation("empty input path"));
        }
        return Ok(ParsedPath::Input(rest.into()));
    }
    if let Some(rest) = raw.strip_prefix("node:") {
        let (node_id, tail) = rest.split_once('.').ok_or_else(|| {
            EmotionTtsError::validation(format!("malformed node path {raw:?}"))
        })?;
        let key = tail.strip_prefix("config.").ok_or_else(|| {
            EmotionTtsError::validation(format!("node path must use .config. prefix: {raw:?}"))
        })?;
        if node_id.is_empty() || key.is_empty() {
            return Err(EmotionTtsError::validation(format!(
                "empty segment in path {raw:?}"
            )));
        }
        return Ok(ParsedPath::NodeConfig {
            node_id: node_id.into(),
            key: key.into(),
        });
    }
    Err(EmotionTtsError::validation(format!(
        "path {raw:?} must start with input: or node:"
    )))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_workflow_is_not_customised() {
        let doc = default_workflow();
        assert!(!compute_customised(&doc));
        assert_eq!(doc.nodes.len(), 7);
        assert_eq!(doc.edges.len(), 7);
    }

    #[test]
    fn parse_path_rejects_garbage() {
        assert!(parse_path("").is_err());
        assert!(parse_path("foo").is_err());
        assert!(parse_path("node:").is_err());
        assert!(parse_path("node:x.bad.key").is_err());
        assert!(parse_path("input:").is_err());
    }

    #[test]
    fn write_then_read_round_trip_input() {
        let mut doc = default_workflow();
        write(&mut doc, "input:script_text", json!("hello")).unwrap();
        assert_eq!(read(&doc, "input:script_text"), Some(json!("hello")));
    }

    #[test]
    fn write_unknown_node_is_not_found() {
        let mut doc = default_workflow();
        let err = write(&mut doc, "node:ghost_1.config.x", json!(1)).unwrap_err();
        assert_eq!(err.status_code(), 404);
    }

    #[test]
    fn mappable_fields_covers_all_recipe_fields_on_default() {
        let doc = default_workflow();
        let m = mappable_fields(&doc);
        assert_eq!(m.len(), RecipeField::ALL.len());
        assert!(unmappable_fields(&doc).is_empty());
    }

    #[test]
    fn removing_preview_mix_unbinds_only_that_field() {
        let mut doc = default_workflow();
        doc.nodes.retain(|n| n.id != "preview_mix_1");
        doc.edges
            .retain(|e| e.from != "preview_mix_1" && e.to != "preview_mix_1");
        refresh_customised(&mut doc);

        assert!(doc.customised);
        assert!(!is_field_mappable(&doc, RecipeField::IncludePreviewMix));
        assert!(is_field_mappable(&doc, RecipeField::OutputFormat));
        assert!(is_field_mappable(&doc, RecipeField::SpeedFactor));
    }
}
