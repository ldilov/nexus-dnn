use axum::Json;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ComponentCategory {
    Layout,
    Data,
    Input,
    Display,
    Feedback,
    Shell,
    Domain,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PropsSchema {
    pub version: String,
    pub schema: Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ComponentExample {
    pub title: String,
    pub yaml: String,
    pub tag: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ComponentMetadata {
    pub name: String,
    pub display_name: String,
    pub category: ComponentCategory,
    pub description: String,
    pub props_schema: PropsSchema,
    pub examples: Vec<ComponentExample>,
    pub docs_href: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CatalogEnvelope {
    pub schema_version: String,
    pub components: Vec<ComponentMetadata>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExtensionComponentSummary {
    pub extension_id: String,
    pub tag: String,
    pub asset_href: String,
    pub entry: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExtensionComponentsEnvelope {
    pub schema_version: String,
    pub components: Vec<ExtensionComponentSummary>,
}

pub const CATALOG_SCHEMA_VERSION: &str = "1";
pub const PROPS_SCHEMA_DRAFT: &str = "2020-12";

#[derive(Debug, thiserror::Error)]
pub enum CatalogValidationError {
    #[error(
        "component '{name}' declares required prop '{prop}' but no example covers it"
    )]
    RequiredPropNotCovered { name: String, prop: String },
    #[error("component '{name}' has zero examples (minimum 1)")]
    NoExamples { name: String },
    #[error("component '{name}' name does not match [a-z][a-z0-9_]*")]
    InvalidName { name: String },
    #[error(
        "component '{name}' top-level schema type must be 'object', got {got}"
    )]
    NonObjectSchema { name: String, got: String },
}

fn meta(
    name: &str,
    display_name: &str,
    category: ComponentCategory,
    description: &str,
    schema: Value,
    example_yaml: &str,
) -> ComponentMetadata {
    ComponentMetadata {
        name: name.to_string(),
        display_name: display_name.to_string(),
        category,
        description: description.to_string(),
        props_schema: PropsSchema {
            version: PROPS_SCHEMA_DRAFT.to_string(),
            schema,
        },
        examples: vec![ComponentExample {
            title: "Default".to_string(),
            yaml: example_yaml.to_string(),
            tag: None,
        }],
        docs_href: Some(format!("/docs/extensions/ui-authoring.md#{}", name)),
    }
}

fn obj(properties: Value, required: &[&str]) -> Value {
    json!({
        "type": "object",
        "properties": properties,
        "required": required,
        "additionalProperties": true,
    })
}

fn any_obj() -> Value {
    json!({
        "type": "object",
        "properties": {},
        "additionalProperties": true,
    })
}

pub fn catalog_entries() -> Vec<ComponentMetadata> {
    vec![
        meta(
            "split_panel",
            "Split Panel",
            ComponentCategory::Layout,
            "Two-pane layout with a draggable divider.",
            obj(
                json!({
                    "direction": { "type": "string", "enum": ["horizontal", "vertical"], "default": "horizontal" },
                    "sizes": { "type": "array", "items": { "type": ["string", "number"] } }
                }),
                &[],
            ),
            "type: split_panel\nprops:\n  direction: horizontal\n  sizes: [60, 40]\nchildren: []\n",
        ),
        meta(
            "stack",
            "Stack",
            ComponentCategory::Layout,
            "Vertical stack that lays its children out in order.",
            any_obj(),
            "type: stack\nchildren: []\n",
        ),
        meta(
            "tabs",
            "Tabs",
            ComponentCategory::Layout,
            "Tab strip whose panels match the order of child nodes.",
            obj(
                json!({
                    "tabs": {
                        "type": "array",
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "icon": { "type": "string" }
                            }),
                            &["label"],
                        )
                    }
                }),
                &["tabs"],
            ),
            "type: tabs\nprops:\n  tabs:\n    - label: Overview\n    - label: Settings\nchildren: []\n",
        ),
        meta(
            "card",
            "Card",
            ComponentCategory::Layout,
            "Surface container with an optional title and one of three variants.",
            obj(
                json!({
                    "title": { "type": "string" },
                    "variant": { "type": "string", "enum": ["default", "interactive", "outlined"], "default": "default" }
                }),
                &[],
            ),
            "type: card\nprops:\n  title: Example\nchildren: []\n",
        ),
        meta(
            "chat_panel",
            "Chat Panel",
            ComponentCategory::Domain,
            "Conversational panel with message list and composer.",
            any_obj(),
            "type: chat_panel\nprops: {}\n",
        ),
        meta(
            "data_table",
            "Data Table",
            ComponentCategory::Data,
            "Tabular data view with typed columns.",
            any_obj(),
            "type: data_table\nprops: {}\n",
        ),
        meta(
            "form",
            "Form",
            ComponentCategory::Input,
            "Form layout with labeled fields and submit handling.",
            any_obj(),
            "type: form\nprops: {}\n",
        ),
        meta(
            "file_browser",
            "File Browser",
            ComponentCategory::Data,
            "Tree-style file browser.",
            any_obj(),
            "type: file_browser\nprops: {}\n",
        ),
        meta(
            "metrics_dashboard",
            "Metrics Dashboard",
            ComponentCategory::Feedback,
            "Grid of metric tiles with live values.",
            any_obj(),
            "type: metrics_dashboard\nprops: {}\n",
        ),
        meta(
            "status_bar",
            "Status Bar",
            ComponentCategory::Shell,
            "Footer-style status bar for transient indicators.",
            any_obj(),
            "type: status_bar\nprops: {}\n",
        ),
        meta(
            "action_bar",
            "Action Bar",
            ComponentCategory::Shell,
            "Toolbar of primary and secondary actions.",
            any_obj(),
            "type: action_bar\nprops: {}\n",
        ),
        meta(
            "list",
            "List",
            ComponentCategory::Data,
            "Generic list; set `itemType: thread` to render threads.",
            obj(
                json!({
                    "itemType": { "type": "string" },
                    "items": { "type": "array" },
                    "emptyMessage": { "type": "string" },
                    "selectable": { "type": "boolean" }
                }),
                &[],
            ),
            "type: list\nprops:\n  items: []\n  emptyMessage: No items yet\n",
        ),
        meta(
            "model_selector",
            "Model Selector",
            ComponentCategory::Input,
            "Dropdown for picking the active model.",
            any_obj(),
            "type: model_selector\nprops: {}\n",
        ),
        meta(
            "generation_settings_form",
            "Generation Settings Form",
            ComponentCategory::Input,
            "Form bound to the host's generation parameter store.",
            any_obj(),
            "type: generation_settings_form\nprops: {}\n",
        ),
        meta(
            "detail_view",
            "Detail View",
            ComponentCategory::Display,
            "Key/value detail view with typed field formatters.",
            obj(
                json!({
                    "fields": { "type": "array" },
                    "data": { "type": "object", "additionalProperties": true }
                }),
                &[],
            ),
            "type: detail_view\nprops:\n  fields: []\n",
        ),
        meta(
            "empty_state",
            "Empty State",
            ComponentCategory::Display,
            "Placeholder with title, description, and optional call to action.",
            obj(
                json!({
                    "title": { "type": "string" },
                    "description": { "type": "string" }
                }),
                &[],
            ),
            "type: empty_state\nprops:\n  title: Nothing here yet\n",
        ),
        meta(
            "code_block",
            "Code Block",
            ComponentCategory::Display,
            "Monospaced block with optional language hint.",
            obj(
                json!({
                    "code": { "type": "string" },
                    "language": { "type": "string" }
                }),
                &["code"],
            ),
            "type: code_block\nprops:\n  code: \"println!(\\\"hi\\\");\"\n  language: rust\n",
        ),
        meta(
            "markdown_view",
            "Markdown View",
            ComponentCategory::Display,
            "Rendered Markdown with GFM and math extensions.",
            obj(
                json!({
                    "source": { "type": "string" }
                }),
                &["source"],
            ),
            "type: markdown_view\nprops:\n  source: \"# Hello\"\n",
        ),
        meta(
            "progress_tracker",
            "Progress Tracker",
            ComponentCategory::Feedback,
            "Stepped progress indicator.",
            any_obj(),
            "type: progress_tracker\nprops: {}\n",
        ),
        meta(
            "log_viewer",
            "Log Viewer",
            ComponentCategory::Feedback,
            "Streaming log tail with filtering.",
            any_obj(),
            "type: log_viewer\nprops: {}\n",
        ),
        meta(
            "setup_stepper",
            "Setup Stepper",
            ComponentCategory::Shell,
            "Onboarding-style step sequence.",
            any_obj(),
            "type: setup_stepper\nprops: {}\n",
        ),
        meta(
            "install_modal",
            "Install Modal",
            ComponentCategory::Domain,
            "Extension install modal surface.",
            any_obj(),
            "type: install_modal\nprops: {}\n",
        ),
        meta(
            "summary_strip",
            "Summary Strip",
            ComponentCategory::Display,
            "Horizontal strip of summary metrics.",
            any_obj(),
            "type: summary_strip\nprops: {}\n",
        ),
        meta(
            "runtime_card",
            "Runtime Card",
            ComponentCategory::Domain,
            "Card summarizing a backend runtime.",
            any_obj(),
            "type: runtime_card\nprops: {}\n",
        ),
        meta(
            "profile_card",
            "Profile Card",
            ComponentCategory::Display,
            "Avatar + identity card.",
            any_obj(),
            "type: profile_card\nprops: {}\n",
        ),
        meta(
            "diagnostics_view",
            "Diagnostics View",
            ComponentCategory::Feedback,
            "Diagnostic messages grouped by severity.",
            any_obj(),
            "type: diagnostics_view\nprops: {}\n",
        ),
        meta(
            "history_list",
            "History List",
            ComponentCategory::Data,
            "Chronological list with selectable entries.",
            any_obj(),
            "type: history_list\nprops: {}\n",
        ),
        meta(
            "models_panel",
            "Models Panel",
            ComponentCategory::Domain,
            "Host models management panel.",
            any_obj(),
            "type: models_panel\nprops: {}\n",
        ),
        meta(
            "backend_selector",
            "Backend Selector",
            ComponentCategory::Input,
            "Picker for the active backend runtime.",
            any_obj(),
            "type: backend_selector\nprops: {}\n",
        ),
        meta(
            "workspace_shell",
            "Workspace Shell",
            ComponentCategory::Shell,
            "Top-level application shell with toolbar and drawer slots.",
            any_obj(),
            "type: workspace_shell\nchildren: []\n",
        ),
        meta(
            "workspace_drawer",
            "Workspace Drawer",
            ComponentCategory::Shell,
            "Drawer slot inside the workspace shell.",
            any_obj(),
            "type: workspace_drawer\nchildren: []\n",
        ),
        meta(
            "workspace_content",
            "Workspace Content",
            ComponentCategory::Shell,
            "Primary content slot inside the workspace shell.",
            any_obj(),
            "type: workspace_content\nchildren: []\n",
        ),
    ]
}

pub fn catalog_entries_empty() -> Vec<ComponentMetadata> {
    Vec::new()
}

pub fn validate_catalog(
    entries: &[ComponentMetadata],
) -> Result<(), CatalogValidationError> {
    for entry in entries {
        if !is_valid_name(&entry.name) {
            return Err(CatalogValidationError::InvalidName {
                name: entry.name.clone(),
            });
        }
        let schema_type = entry
            .props_schema
            .schema
            .get("type")
            .and_then(|v| v.as_str())
            .unwrap_or("<missing>");
        if schema_type != "object" {
            return Err(CatalogValidationError::NonObjectSchema {
                name: entry.name.clone(),
                got: schema_type.to_string(),
            });
        }
        if entry.examples.is_empty() {
            return Err(CatalogValidationError::NoExamples {
                name: entry.name.clone(),
            });
        }
        let required = entry
            .props_schema
            .schema
            .get("required")
            .and_then(|v| v.as_array())
            .cloned()
            .unwrap_or_default();
        for prop in required {
            let Some(prop_name) = prop.as_str() else { continue };
            let covered = entry
                .examples
                .iter()
                .any(|ex| example_mentions_prop(&ex.yaml, prop_name));
            if !covered {
                return Err(CatalogValidationError::RequiredPropNotCovered {
                    name: entry.name.clone(),
                    prop: prop_name.to_string(),
                });
            }
        }
    }
    Ok(())
}

fn is_valid_name(name: &str) -> bool {
    let mut chars = name.chars();
    let Some(first) = chars.next() else { return false };
    if !first.is_ascii_lowercase() {
        return false;
    }
    chars.all(|c| c.is_ascii_lowercase() || c.is_ascii_digit() || c == '_')
}

fn example_mentions_prop(yaml: &str, prop: &str) -> bool {
    let needle = format!("{prop}:");
    yaml.contains(&needle)
}

pub async fn list_ui_components() -> Json<CatalogEnvelope> {
    Json(CatalogEnvelope {
        schema_version: CATALOG_SCHEMA_VERSION.to_string(),
        components: catalog_entries(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn production_catalog_validates() {
        validate_catalog(&catalog_entries()).expect("production catalog must validate");
    }

    #[test]
    fn empty_catalog_validates() {
        validate_catalog(&catalog_entries_empty()).unwrap();
    }

    #[test]
    fn invalid_name_rejected() {
        let entry = meta(
            "BadName",
            "Bad",
            ComponentCategory::Layout,
            "",
            any_obj(),
            "type: BadName\n",
        );
        let err = validate_catalog(&[entry]).unwrap_err();
        assert!(matches!(err, CatalogValidationError::InvalidName { .. }));
    }

    #[test]
    fn missing_example_for_required_prop_rejected() {
        let entry = meta(
            "needs_thing",
            "Needs Thing",
            ComponentCategory::Input,
            "",
            obj(
                json!({ "thing": { "type": "string" } }),
                &["thing"],
            ),
            "type: needs_thing\nprops: {}\n",
        );
        let err = validate_catalog(&[entry]).unwrap_err();
        assert!(matches!(
            err,
            CatalogValidationError::RequiredPropNotCovered { .. }
        ));
    }

    #[test]
    fn catalog_entries_has_expected_count() {
        assert_eq!(catalog_entries().len(), 32);
    }

    #[test]
    fn catalog_entries_unique_names() {
        let entries = catalog_entries();
        let mut names: Vec<&str> = entries.iter().map(|e| e.name.as_str()).collect();
        names.sort();
        let before = names.len();
        names.dedup();
        assert_eq!(names.len(), before, "duplicate component name in catalog");
    }
}
