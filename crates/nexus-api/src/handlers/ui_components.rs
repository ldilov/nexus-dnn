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

/// Curated subset of Material Symbols names commonly used across host and
/// extension UIs. Used as the `enum` for every `icon` prop so the playground
/// renders a discoverable dropdown instead of a blind text field.
fn icon_enum() -> serde_json::Value {
    json!([
        "play_arrow", "pause", "stop", "skip_next", "skip_previous",
        "add", "remove", "close", "check", "check_circle", "cancel",
        "edit", "delete", "download", "upload", "save", "content_copy",
        "settings", "tune", "menu", "more_vert", "more_horiz",
        "home", "dashboard", "folder", "folder_open", "description", "inbox",
        "search", "filter_list", "sort", "refresh", "sync",
        "arrow_forward", "arrow_back", "chevron_left", "chevron_right",
        "expand_more", "expand_less", "open_in_new", "launch",
        "error", "warning", "info", "help", "bug_report",
        "account_circle", "person", "group", "lock", "lock_open", "visibility", "visibility_off",
        "chat", "send", "notifications", "star", "favorite", "bookmark",
        "code", "terminal", "extension", "model_training", "developer_board", "rocket_launch",
        "play_circle", "bolt", "hub", "cloud_sync", "history", "schedule"
    ])
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
                                "icon": { "type": "string", "enum": icon_enum(), "description": "Optional Material Symbols icon shown in the tab." }
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
            "Conversational panel with message list, composer, and optional model chips. Without live backend data, pass `messages` to preview with static content.",
            obj(
                json!({
                    "messages": {
                        "type": "array",
                        "description": "Static message list; when absent the panel streams from the local-llm extension.",
                        "default": [
                            { "id": "m1", "role": "user", "content": "How do I register a custom element?" },
                            { "id": "m2", "role": "assistant", "content": "Declare ui.custom_elements in your manifest and ship an ES module that exports register()." }
                        ],
                        "items": obj(
                            json!({
                                "id": { "type": "string" },
                                "role": { "type": "string", "enum": ["user", "assistant", "system"] },
                                "content": { "type": "string" }
                            }),
                            &["id", "role", "content"],
                        )
                    },
                    "modelName": { "type": "string", "default": "llama-3-8b", "description": "Display name shown in the header." },
                    "modelChips": {
                        "type": "array",
                        "description": "Pill labels beside the model name.",
                        "default": [
                            { "label": "8B", "type": "model" },
                            { "label": "Q4_K_M", "type": "optimize" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "type": { "type": "string", "enum": ["model", "optimize"] }
                            }),
                            &["label", "type"],
                        )
                    },
                    "welcomeIcon": { "type": "string", "default": "chat", "description": "Material Symbols icon shown when messages list is empty." },
                    "welcomeTitle": { "type": "string", "default": "Start a conversation" },
                    "welcomeDescription": { "type": "string", "default": "Messages stream live once a model is loaded." },
                    "showStopButton": { "type": "boolean", "default": true, "description": "Whether the composer shows a Stop button during streaming." },
                    "showRetryButton": { "type": "boolean", "default": true, "description": "Whether the composer shows a Retry button after errors." },
                    "streamingEnabled": { "type": "boolean", "default": true, "description": "Controls whether the panel opens a streaming connection." }
                }),
                &[],
            ),
            "type: chat_panel\nprops:\n  modelName: llama-3-8b\n  messages:\n    - { id: m1, role: user, content: Hi }\n    - { id: m2, role: assistant, content: Hello! }\n",
        ),
        meta(
            "data_table",
            "Data Table",
            ComponentCategory::Data,
            "Tabular view with typed columns + row data. Columns are render order; row keys match column.key.",
            obj(
                json!({
                    "columns": {
                        "type": "array",
                        "description": "Column definitions in render order.",
                        "default": [
                            { "key": "name", "label": "Name", "sortable": true },
                            { "key": "status", "label": "Status" },
                            { "key": "size", "label": "Size", "width": "80px" }
                        ],
                        "items": obj(
                            json!({
                                "key": { "type": "string" },
                                "label": { "type": "string" },
                                "sortable": { "type": "boolean", "default": false },
                                "width": { "type": "string", "description": "CSS width, e.g. '120px' or '1fr'." }
                            }),
                            &["key", "label"],
                        )
                    },
                    "rows": {
                        "type": "array",
                        "description": "Row objects keyed by column.key.",
                        "default": [
                            { "name": "llama-3-8b", "status": "ready", "size": "4.8 GB" },
                            { "name": "mistral-7b", "status": "downloading", "size": "4.1 GB" },
                            { "name": "qwen-2.5-3b", "status": "ready", "size": "2.0 GB" }
                        ],
                        "items": { "type": "object", "additionalProperties": true }
                    },
                    "selectable": { "type": "boolean", "default": false, "description": "Whether rows respond to clicks." }
                }),
                &[],
            ),
            "type: data_table\nprops:\n  columns:\n    - { key: name, label: Name }\n    - { key: status, label: Status }\n  rows:\n    - { name: Alpha, status: ready }\n",
        ),
        meta(
            "form",
            "Form",
            ComponentCategory::Input,
            "Declarative form — each field picks its widget from the `type` field. Values map records keyed by field.key.",
            obj(
                json!({
                    "fields": {
                        "type": "array",
                        "description": "Field definitions in render order.",
                        "default": [
                            { "key": "name", "label": "Name", "type": "text", "default": "" },
                            { "key": "enabled", "label": "Enabled", "type": "toggle", "default": true },
                            { "key": "size", "label": "Context size", "type": "slider", "min": 512, "max": 8192, "step": 512, "default": 2048 },
                            { "key": "mode", "label": "Mode", "type": "select", "default": "balanced",
                              "options": [ { "label": "Fast", "value": "fast" }, { "label": "Balanced", "value": "balanced" }, { "label": "Quality", "value": "quality" } ] }
                        ],
                        "items": obj(
                            json!({
                                "key": { "type": "string" },
                                "label": { "type": "string" },
                                "type": { "type": "string", "enum": ["text", "number", "slider", "select", "toggle", "textarea"] },
                                "min": { "type": "number" },
                                "max": { "type": "number" },
                                "step": { "type": "number" },
                                "options": { "type": "array" }
                            }),
                            &["key", "label", "type"],
                        )
                    },
                    "values": {
                        "type": "object",
                        "additionalProperties": true,
                        "default": { "name": "Alpha", "enabled": true, "size": 4096, "mode": "balanced" }
                    }
                }),
                &[],
            ),
            "type: form\nprops:\n  fields:\n    - { key: name, label: Name, type: text }\n  values: { name: Alpha }\n",
        ),
        meta(
            "file_browser",
            "File Browser",
            ComponentCategory::Data,
            "Tree-style file browser rendered from a static entries list (pass `entries`) or a host-provided path (pass `path`).",
            obj(
                json!({
                    "path": { "type": "string", "default": "/var/data/models", "description": "Root path label shown at the top." },
                    "entries": {
                        "type": "array",
                        "description": "Static entries to render.",
                        "default": [
                            { "name": "llama-3-8b.Q4_K_M.gguf", "type": "file", "size": 4_800_000_000u64 },
                            { "name": "mistral-7b.Q4_K_M.gguf", "type": "file", "size": 4_100_000_000u64 },
                            { "name": "archive", "type": "directory" }
                        ],
                        "items": obj(
                            json!({
                                "name": { "type": "string" },
                                "type": { "type": "string", "enum": ["file", "directory"] },
                                "size": { "type": "number", "description": "Bytes; omitted for directories." }
                            }),
                            &["name", "type"],
                        )
                    }
                }),
                &[],
            ),
            "type: file_browser\nprops:\n  path: /var/data\n  entries:\n    - { name: file.txt, type: file, size: 1024 }\n",
        ),
        meta(
            "metrics_dashboard",
            "Metrics Dashboard",
            ComponentCategory::Feedback,
            "Grid of metric tiles. `metrics` defines which tiles to render; `data` supplies the values keyed by metric.key.",
            obj(
                json!({
                    "layout": { "type": "string", "enum": ["default", "compact"], "default": "default" },
                    "metrics": {
                        "type": "array",
                        "default": [
                            { "key": "vram", "label": "VRAM", "format": "bytes" },
                            { "key": "latency", "label": "Latency", "format": "duration" },
                            { "key": "load", "label": "Load", "format": "percent" },
                            { "key": "requests", "label": "Requests", "format": "number" }
                        ],
                        "items": obj(
                            json!({
                                "key": { "type": "string" },
                                "label": { "type": "string" },
                                "format": { "type": "string", "enum": ["number", "percent", "bytes", "duration"], "default": "number" }
                            }),
                            &["key", "label"],
                        )
                    },
                    "data": {
                        "type": "object",
                        "additionalProperties": true,
                        "default": { "vram": 8_000_000_000u64, "latency": 42, "load": 18, "requests": 1287 }
                    }
                }),
                &[],
            ),
            "type: metrics_dashboard\nprops:\n  metrics:\n    - { key: vram, label: VRAM, format: bytes }\n  data: { vram: 8_000_000_000u64 }\n",
        ),
        meta(
            "status_bar",
            "Status Bar",
            ComponentCategory::Shell,
            "Footer-style indicator strip. Each item has a label, optional value, and optional status severity.",
            obj(
                json!({
                    "compact": { "type": "boolean", "default": false, "description": "Tighter spacing for dense layouts." },
                    "items": {
                        "type": "array",
                        "default": [
                            { "label": "Status", "value": "Ready", "status": "ok" },
                            { "label": "VRAM", "value": "8 GB" },
                            { "label": "Queue", "value": "3 pending", "status": "warning" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "value": { "type": "string" },
                                "status": { "type": "string", "enum": ["ok", "warning", "error"] }
                            }),
                            &["label"],
                        )
                    }
                }),
                &[],
            ),
            "type: status_bar\nprops:\n  items:\n    - { label: Status, value: Ready, status: ok }\n",
        ),
        meta(
            "action_bar",
            "Action Bar",
            ComponentCategory::Shell,
            "Toolbar of buttons with icons, action ids, and visual variants (primary / secondary / ghost / danger).",
            obj(
                json!({
                    "actions": {
                        "type": "array",
                        "default": [
                            { "label": "Run", "icon": "play_arrow", "action": "run", "variant": "primary" },
                            { "label": "Validate", "icon": "check", "action": "validate", "variant": "secondary" },
                            { "label": "Clear", "icon": "delete", "action": "clear", "variant": "danger" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "icon": { "type": "string", "enum": icon_enum(), "description": "Material Symbols icon." },
                                "action": { "type": "string", "description": "Action id dispatched on click." },
                                "variant": { "type": "string", "enum": ["primary", "secondary", "ghost", "danger"], "default": "secondary" }
                            }),
                            &["label"],
                        )
                    }
                }),
                &[],
            ),
            "type: action_bar\nprops:\n  actions:\n    - { label: Run, variant: primary, action: run }\n",
        ),
        meta(
            "list",
            "List",
            ComponentCategory::Data,
            "Generic list of items with id + label. Set `itemType: thread` to render the thread-optimized variant.",
            obj(
                json!({
                    "itemType": {
                        "type": "string",
                        "enum": ["default", "thread"],
                        "default": "default",
                        "description": "Rendering variant — 'thread' switches to the ThreadList component."
                    },
                    "items": {
                        "type": "array",
                        "description": "Rows to render. Each item MUST have a unique id and a label.",
                        "items": obj(
                            json!({
                                "id": { "type": "string", "description": "Stable identifier." },
                                "label": { "type": "string", "description": "Visible row text." },
                                "description": { "type": "string", "description": "Optional secondary text." },
                                "icon": { "type": "string", "enum": icon_enum(), "description": "Optional Material Symbols icon." }
                            }),
                            &["id", "label"],
                        )
                    },
                    "emptyMessage": {
                        "type": "string",
                        "default": "No items",
                        "description": "Shown when `items` is empty."
                    },
                    "selectable": {
                        "type": "boolean",
                        "default": false,
                        "description": "Whether rows respond to clicks."
                    }
                }),
                &[],
            ),
            "type: list\nprops:\n  items:\n    - { id: a, label: First }\n    - { id: b, label: Second }\n  emptyMessage: No items yet\n",
        ),
        meta(
            "model_selector",
            "Model Selector",
            ComponentCategory::Input,
            "Dropdown bound to the host model registry. In the playground it renders the empty state unless the host has models loaded.",
            any_obj(),
            "type: model_selector\nprops: {}\n",
        ),
        meta(
            "generation_settings_form",
            "Generation Settings Form",
            ComponentCategory::Input,
            "Form bound to the host's runtime parameter store (temperature, top-p, context window, etc.). Takes no props — configuration flows from the active model.",
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
                    "fields": {
                        "type": "array",
                        "description": "Field definitions in render order.",
                        "items": obj(
                            json!({
                                "label": { "type": "string", "description": "Visible label." },
                                "key": { "type": "string", "description": "Key in `data` to read from." },
                                "format": {
                                    "type": "string",
                                    "enum": ["text", "status_badge", "code"],
                                    "default": "text",
                                    "description": "How to render the value."
                                }
                            }),
                            &["label", "key"],
                        )
                    },
                    "data": {
                        "type": "object",
                        "additionalProperties": true,
                        "description": "Key/value payload referenced by `fields[].key`."
                    }
                }),
                &[],
            ),
            "type: detail_view\nprops:\n  fields:\n    - { label: Name, key: name }\n    - { label: Status, key: status, format: status_badge }\n  data: { name: Alpha, status: running }\n",
        ),
        meta(
            "empty_state",
            "Empty State",
            ComponentCategory::Display,
            "Placeholder surface for zero-data states, with title + description + optional CTA.",
            obj(
                json!({
                    "icon": {
                        "type": "string",
                        "enum": icon_enum(),
                        "default": "inbox",
                        "description": "Material Symbols icon name — pick from the dropdown."
                    },
                    "title": {
                        "type": "string",
                        "description": "Primary message."
                    },
                    "description": {
                        "type": "string",
                        "description": "Supporting text below the title."
                    },
                    "primaryAction": obj(
                        json!({
                            "label": { "type": "string", "description": "Button label." },
                            "action": { "type": "string", "description": "Action id dispatched on click." }
                        }),
                        &["label"],
                    )
                }),
                &[],
            ),
            "type: empty_state\nprops:\n  title: Nothing here yet\n  description: Create your first item to get started.\n",
        ),
        meta(
            "code_block",
            "Code Block",
            ComponentCategory::Display,
            "Monospaced code block with syntax-language hint and optional header.",
            obj(
                json!({
                    "code": {
                        "type": "string",
                        "format": "code",
                        "description": "Source text to display. Multi-line; syntax highlighting driven by `language`."
                    },
                    "language": {
                        "type": "string",
                        "enum": ["rust", "typescript", "javascript", "python", "go", "bash", "yaml", "json", "toml", "markdown", "sql", "plain"],
                        "description": "Syntax highlighting hint (renderer-side support varies)."
                    },
                    "showHeader": {
                        "type": "boolean",
                        "default": true,
                        "description": "Whether to show the language label + copy button header."
                    }
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
                    "content": {
                        "type": "string",
                        "format": "markdown",
                        "description": "Markdown source to render. Multi-line; GFM + math extensions supported."
                    }
                }),
                &[],
            ),
            "type: markdown_view\nprops:\n  content: \"# Hello\\n\\nBody text.\"\n",
        ),
        meta(
            "progress_tracker",
            "Progress Tracker",
            ComponentCategory::Feedback,
            "Progress bar with optional byte-count readout and cancel affordance.",
            obj(
                json!({
                    "label": { "type": "string", "description": "Headline above the bar." },
                    "percent": {
                        "type": "number",
                        "minimum": 0,
                        "maximum": 100,
                        "description": "Completion percentage (0-100). If omitted, falls back to bytesLoaded/bytesTotal."
                    },
                    "bytesLoaded": { "type": "number", "minimum": 0, "description": "Bytes transferred so far." },
                    "bytesTotal": { "type": "number", "minimum": 0, "description": "Total bytes expected." },
                    "showCancel": { "type": "boolean", "default": false, "description": "Render a cancel button." }
                }),
                &[],
            ),
            "type: progress_tracker\nprops:\n  label: Downloading\n  percent: 42\n  showCancel: true\n",
        ),
        meta(
            "log_viewer",
            "Log Viewer",
            ComponentCategory::Feedback,
            "Tail-style log viewer with severity-colored rows and optional auto-scroll.",
            obj(
                json!({
                    "entries": {
                        "type": "array",
                        "default": [
                            { "timestamp": "10:42:01", "level": "info", "message": "Host started on :3000" },
                            { "timestamp": "10:42:03", "level": "debug", "message": "Scanned 3 extensions" },
                            { "timestamp": "10:42:04", "level": "warn", "message": "Extension xyz has deprecated manifest fields" },
                            { "timestamp": "10:42:07", "level": "error", "message": "Worker exited with code 137" }
                        ],
                        "items": obj(
                            json!({
                                "timestamp": { "type": "string" },
                                "level": { "type": "string", "enum": ["debug", "info", "warn", "error"] },
                                "message": { "type": "string" }
                            }),
                            &["level", "message"],
                        )
                    },
                    "autoScroll": { "type": "boolean", "default": true, "description": "Pin to bottom as new entries arrive." }
                }),
                &[],
            ),
            "type: log_viewer\nprops:\n  entries:\n    - { level: info, message: Host started }\n",
        ),
        meta(
            "setup_stepper",
            "Setup Stepper",
            ComponentCategory::Shell,
            "Onboarding step sequence. Each step has a label + status (todo / active / done / error).",
            obj(
                json!({
                    "steps": {
                        "type": "array",
                        "default": [
                            { "label": "Install runtime", "status": "done" },
                            { "label": "Download model", "status": "active" },
                            { "label": "Load backend", "status": "todo" },
                            { "label": "First run", "status": "todo" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "status": { "type": "string", "enum": ["todo", "active", "done", "error"] }
                            }),
                            &["label", "status"],
                        )
                    }
                }),
                &[],
            ),
            "type: setup_stepper\nprops:\n  steps:\n    - { label: Install, status: done }\n    - { label: Configure, status: active }\n",
        ),
        meta(
            "install_modal",
            "Install Modal",
            ComponentCategory::Domain,
            "Extension install progress modal. Shows phase list, streaming logs, progress bar, and elapsed time.",
            obj(
                json!({
                    "visible": { "type": "boolean", "default": false, "description": "Whether the modal is open. Toggle to true to preview — the playground's stage contains the overlay so it won't escape the preview area." },
                    "phases": {
                        "type": "array",
                        "default": [
                            { "name": "Download", "status": "done" },
                            { "name": "Extract", "status": "active" },
                            { "name": "Verify", "status": "todo" }
                        ],
                        "items": obj(
                            json!({
                                "name": { "type": "string" },
                                "status": { "type": "string", "enum": ["todo", "active", "done", "error"] }
                            }),
                            &["name", "status"],
                        )
                    },
                    "logs": {
                        "type": "array",
                        "default": ["[10:42:01] fetching bundle …", "[10:42:03] 2.1 MB downloaded", "[10:42:04] extracting …"],
                        "items": { "type": "string" }
                    },
                    "progress": {
                        "type": "object",
                        "additionalProperties": true,
                        "default": { "percent": 62, "bytesLoaded": 62_914_560u64, "bytesTotal": 101_187_584u64 }
                    },
                    "elapsed": { "type": "string", "default": "00:03", "description": "Human-readable elapsed time label." }
                }),
                &[],
            ),
            "type: install_modal\nprops:\n  visible: true\n  phases:\n    - { name: Download, status: active }\n",
        ),
        meta(
            "summary_strip",
            "Summary Strip",
            ComponentCategory::Display,
            "Horizontal strip of labeled values with optional badges — great for status rollups.",
            obj(
                json!({
                    "items": {
                        "type": "array",
                        "default": [
                            { "label": "Models", "value": "12", "badge": "+3" },
                            { "label": "Active runs", "value": "4" },
                            { "label": "Uptime", "value": "2d 4h" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "value": { "type": "string" },
                                "badge": { "type": "string" }
                            }),
                            &["label", "value"],
                        )
                    }
                }),
                &[],
            ),
            "type: summary_strip\nprops:\n  items:\n    - { label: Models, value: 12 }\n",
        ),
        meta(
            "runtime_card",
            "Runtime Card",
            ComponentCategory::Domain,
            "Titled card summarizing a backend runtime — fields are rendered as a two-column key/value list.",
            obj(
                json!({
                    "title": { "type": "string", "default": "llama.cpp v0.2.85" },
                    "fields": {
                        "type": "array",
                        "default": [
                            { "label": "GPU", "value": "CUDA 12.3 · RTX 4090" },
                            { "label": "Context", "value": "8192 tokens" },
                            { "label": "Precision", "value": "Q4_K_M" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "value": { "type": "string" }
                            }),
                            &["label", "value"],
                        )
                    }
                }),
                &[],
            ),
            "type: runtime_card\nprops:\n  title: llama.cpp\n  fields:\n    - { label: GPU, value: RTX 4090 }\n",
        ),
        meta(
            "profile_card",
            "Profile Card",
            ComponentCategory::Display,
            "Identity / profile card — shares the RuntimeCard shell with a different semantic. Title + fields pair.",
            obj(
                json!({
                    "title": { "type": "string", "default": "Lazar Dilov" },
                    "fields": {
                        "type": "array",
                        "default": [
                            { "label": "Role", "value": "Platform engineer" },
                            { "label": "Team", "value": "Nexus DNN" },
                            { "label": "Location", "value": "Zürich" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "value": { "type": "string" }
                            }),
                            &["label", "value"],
                        )
                    }
                }),
                &[],
            ),
            "type: profile_card\nprops:\n  title: Name\n  fields:\n    - { label: Role, value: Engineer }\n",
        ),
        meta(
            "diagnostics_view",
            "Diagnostics View",
            ComponentCategory::Feedback,
            "Failure-report surface with category, message, remediation, and optional next-action button.",
            obj(
                json!({
                    "failure": {
                        "type": "object",
                        "additionalProperties": true,
                        "default": {
                            "category": "binary_not_found",
                            "message": "llama-server binary is missing",
                            "detail": "Host couldn't locate the llama-server executable at the configured path.",
                            "command": "/usr/local/bin/llama-server --model model.gguf",
                            "remediation": "Install llama.cpp or set LLAMA_SERVER_PATH to a valid binary.\n\nSteps:\n  1. brew install llama.cpp\n  2. export LLAMA_SERVER_PATH=/opt/homebrew/bin/llama-server\n  3. Restart the host.",
                            "binaryPath": "/usr/local/bin/llama-server"
                        }
                    },
                    "nextAction": {
                        "type": "object",
                        "additionalProperties": true,
                        "default": { "label": "Open install guide", "action": "install_llama_cpp" }
                    }
                }),
                &[],
            ),
            "type: diagnostics_view\nprops:\n  failure:\n    category: binary_not_found\n    message: llama-server missing\n    detail: Host couldn't locate the binary.\n    remediation: Install llama.cpp or set LLAMA_SERVER_PATH.\n",
        ),
        meta(
            "history_list",
            "History List",
            ComponentCategory::Data,
            "Chronological run/action history. Each entry carries a unique id, action name, result, timestamps, and optional summary.",
            obj(
                json!({
                    "entries": {
                        "type": "array",
                        "default": [
                            { "id": "r-1287", "action": "run", "result": "ok", "startedAt": "10:42:01", "finishedAt": "10:42:08", "summary": "Generated 312 tokens" },
                            { "id": "r-1286", "action": "validate", "result": "ok", "startedAt": "10:30:14", "finishedAt": "10:30:15" },
                            { "id": "r-1285", "action": "run", "result": "error", "startedAt": "10:28:02", "finishedAt": "10:28:02", "summary": "Worker exited with code 137" }
                        ],
                        "items": obj(
                            json!({
                                "id": { "type": "string" },
                                "action": { "type": "string" },
                                "result": { "type": "string" },
                                "startedAt": { "type": "string" },
                                "finishedAt": { "type": "string" },
                                "summary": { "type": "string" }
                            }),
                            &["id", "action", "result", "startedAt"],
                        )
                    }
                }),
                &[],
            ),
            "type: history_list\nprops:\n  entries:\n    - { id: r-1, action: run, result: ok, startedAt: 10:00 }\n",
        ),
        meta(
            "models_panel",
            "Models Panel",
            ComponentCategory::Domain,
            "Extension-scoped models management panel. The playground renders the empty/loading state because models are fetched from the host.",
            obj(
                json!({
                    "extension_id": {
                        "type": "string",
                        "default": "local-llm",
                        "description": "Extension whose models to list."
                    }
                }),
                &[],
            ),
            "type: models_panel\nprops:\n  extension_id: local-llm\n",
        ),
        meta(
            "backend_selector",
            "Backend Selector",
            ComponentCategory::Input,
            "Picker for the active backend runtime. Pass a static `backends` array to preview without a running host.",
            obj(
                json!({
                    "title": { "type": "string", "default": "Choose a backend" },
                    "description": { "type": "string", "default": "Runtimes compatible with the selected model." },
                    "backends": {
                        "type": "array",
                        "default": [
                            { "id": "llama_cpp", "label": "llama.cpp", "status": "ready", "description": "Fast CPU/GPU inference via GGUF." },
                            { "id": "diffusers", "label": "Diffusers", "status": "degraded", "description": "Image/video backend — partial compatibility." }
                        ],
                        "items": obj(
                            json!({
                                "id": { "type": "string" },
                                "label": { "type": "string" },
                                "status": { "type": "string", "enum": ["ready", "degraded", "unavailable"], "default": "ready" },
                                "description": { "type": "string" }
                            }),
                            &["id", "label"],
                        )
                    }
                }),
                &[],
            ),
            "type: backend_selector\nprops:\n  title: Pick a backend\n  backends:\n    - { id: llama_cpp, label: llama.cpp, status: ready }\n",
        ),
        meta(
            "workspace_shell",
            "Workspace Shell",
            ComponentCategory::Shell,
            "Top-level app chrome — eyebrow label, toolbar actions, one or more drawers, and the main content area. Children of type workspace_drawer become drawers; everything else goes into the content region.",
            obj(
                json!({
                    "eyebrow": { "type": "string", "default": "Nexus DNN / Playground" },
                    "toolbarActions": {
                        "type": "array",
                        "default": [
                            { "label": "Run", "icon": "play_arrow", "variant": "primary" },
                            { "label": "Validate", "icon": "check", "variant": "secondary" }
                        ],
                        "items": obj(
                            json!({
                                "label": { "type": "string" },
                                "icon": { "type": "string", "enum": icon_enum(), "description": "Optional Material Symbols icon for the toolbar button." },
                                "variant": { "type": "string", "enum": ["primary", "secondary", "ghost"], "default": "secondary" }
                            }),
                            &["label"],
                        )
                    }
                }),
                &[],
            ),
            "type: workspace_shell\nprops:\n  eyebrow: My app\n  toolbarActions:\n    - { label: Run, variant: primary }\nchildren: []\n",
        ),
        meta(
            "workspace_drawer",
            "Workspace Drawer",
            ComponentCategory::Shell,
            "Drawer slot inside workspace_shell — set `id`, `title`, and `width` to tune the shell's behavior. Children render as the drawer body.",
            obj(
                json!({
                    "id": { "type": "string", "default": "main", "description": "Stable drawer id — preserves collapsed state." },
                    "title": { "type": "string", "default": "Navigation" },
                    "width": { "type": "number", "default": 280, "minimum": 160, "maximum": 600, "description": "Expanded width in pixels." }
                }),
                &[],
            ),
            "type: workspace_drawer\nprops:\n  id: main\n  title: Navigation\n  width: 280\nchildren: []\n",
        ),
        meta(
            "workspace_content",
            "Workspace Content",
            ComponentCategory::Shell,
            "Primary content slot inside workspace_shell. Renders children passthrough — props on this element are ignored.",
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
