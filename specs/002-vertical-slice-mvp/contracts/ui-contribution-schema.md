# UI Contribution YAML Schema

**Spec Version**: 0.1
**Format**: YAML
**Location**: Inline within the extension manifest under `ui_contributions[]`, or referenced via `ui_contributions[].file`

UI contributions are metadata descriptors that tell the host frontend how to surface extension capabilities. Extensions do not ship frontend code bundles -- they declare structured metadata that the host interprets.

## Contribution Kinds

| Kind | Purpose |
|------|---------|
| `artifact_viewer` | Declares that this extension can render artifacts of specific types |
| `command` | Declares a user-invocable action (e.g., run a recipe, trigger an operator) |
| `config_widget` | Declares a custom widget hint for a specific operator config field |
| `inspector_panel` | Declares an additional panel in the right inspector for specific contexts |
| `recipe_card` | Declares display metadata for recipe cards in the catalog |
| `tool_metadata` | Declares additional metadata for tool catalog entries |

## Common Fields

Every UI contribution has these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `kind` | String | yes | One of the six kinds listed above |
| `id` | String | yes | Unique identifier within the extension |
| `display_name` | String | yes | Human-readable label |
| `description` | String | no | Short explanation of what this contribution does |
| `availability` | String | no | `available` (default) or `unavailable` |

Kind-specific fields are documented below.

---

## 1. Artifact Viewer

Declares that the extension knows how to render artifacts of listed types. The host uses `supported_types` to match artifacts and `priority` to resolve conflicts when multiple extensions offer viewers for the same type.

```yaml
kind: artifact_viewer
id: "image_viewer"
display_name: "Image Viewer"
description: "Renders RGB, mask, and grayscale images inline."
supported_types:
  - "image/rgb"
  - "image/mask"
  - "image/grayscale"
priority: 10
metadata:
  fallback: "default_binary_viewer"
  render_mode: "inline"
```

### Kind-specific fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `supported_types` | Vec<String> | yes | Artifact type identifiers this viewer handles |
| `priority` | u32 | no | Higher value = preferred viewer when multiple match. Default `0`. |
| `metadata.fallback` | String | no | Viewer ID to fall back to if this one cannot render |
| `metadata.render_mode` | String | no | Hint for the host: `inline`, `modal`, `panel` |

### Viewer Resolution

When the frontend needs to display an artifact:

1. Collect all `artifact_viewer` contributions where `supported_types` includes the artifact type
2. Sort by `priority` descending
3. Select the highest-priority viewer
4. If no extension viewer matches, use the host default viewer for the type category

---

## 2. Command

Declares a user-invocable action that the host surfaces in menus, palettes, or toolbars.

```yaml
kind: command
id: "run_basic_transform"
display_name: "Run Basic Image Transform"
description: "Execute the Basic Image Transform recipe on a selected image."
metadata:
  category: "Image"
  target_type: "recipe"
  invocation:
    recipe_id: "recipe.image.basic_transform"
  keybinding: null
```

### Kind-specific fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metadata.category` | String | no | Command category for grouping |
| `metadata.target_type` | String | no | What this command operates on: `recipe`, `operator`, `artifact`, `workflow` |
| `metadata.invocation` | Object | no | Structured invocation target |
| `metadata.keybinding` | String | no | Suggested keyboard shortcut (host may override) |

---

## 3. Config Widget

Declares a rendering hint for a specific operator config field. The host uses this to replace the default schema-driven form widget with a specialized control.

```yaml
kind: config_widget
id: "color_picker_widget"
display_name: "Color Picker"
description: "Renders a color picker for hex color config fields."
metadata:
  target_operator: "image.overlay"
  target_field: "overlay_color"
  widget_type: "color_picker"
  constraints:
    format: "hex"
```

### Kind-specific fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metadata.target_operator` | String | yes | Operator ID this widget applies to |
| `metadata.target_field` | String | yes | Config schema field name |
| `metadata.widget_type` | String | yes | Widget type hint the host frontend interprets |
| `metadata.constraints` | Object | no | Additional rendering constraints |

If the referenced operator or field does not exist at runtime, the host ignores the contribution gracefully and renders the default widget.

---

## 4. Inspector Panel

Declares an additional panel in the right inspector sidebar for specific contexts (e.g., when a particular node type is selected, or when viewing a specific artifact type).

```yaml
kind: inspector_panel
id: "image_histogram_panel"
display_name: "Histogram"
description: "Shows a histogram analysis for image artifacts."
metadata:
  context: "artifact_detail"
  target_types:
    - "image/rgb"
    - "image/grayscale"
  panel_position: "below_metadata"
```

### Kind-specific fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metadata.context` | String | yes | Where the panel appears: `artifact_detail`, `node_detail`, `run_detail` |
| `metadata.target_types` | Vec<String> | no | Artifact or operator types that trigger this panel |
| `metadata.panel_position` | String | no | Position hint: `above_metadata`, `below_metadata`, `tab` |

---

## 5. Recipe Card

Declares display metadata for how a recipe appears in the recipe catalog. This supplements the recipe's own metadata with UI-specific rendering hints.

```yaml
kind: recipe_card
id: "basic_transform_card"
display_name: "Basic Image Transform"
description: "Card layout for the basic transform recipe."
metadata:
  recipe_id: "recipe.image.basic_transform"
  card_style: "featured"
  badge: "starter"
  preview_fields:
    - "sourceImage"
    - "targetWidth"
```

### Kind-specific fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metadata.recipe_id` | String | yes | Recipe this card describes |
| `metadata.card_style` | String | no | Layout hint: `default`, `featured`, `compact` |
| `metadata.badge` | String | no | Badge text shown on the card |
| `metadata.preview_fields` | Vec<String> | no | Recipe fields to show in the card preview |

---

## 6. Tool Metadata

Declares additional metadata for an operator or recipe entry in the tool catalog. Used to enrich the `/tools` API projection with extension-specific display information.

```yaml
kind: tool_metadata
id: "resize_tool_meta"
display_name: "Resize Tool Info"
metadata:
  target_id: "image.resize"
  target_kind: "operator"
  tags:
    - "image"
    - "resize"
    - "transform"
    - "scale"
  icon: "assets/icons/resize.svg"
  documentation_url: "https://docs.example.com/resize"
```

### Kind-specific fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metadata.target_id` | String | yes | Operator or recipe ID this metadata enriches |
| `metadata.target_kind` | String | yes | `operator` or `recipe` |
| `metadata.tags` | Vec<String> | no | Additional search tags |
| `metadata.icon` | String | no | Relative path to an icon within the extension package |
| `metadata.documentation_url` | String | no | External documentation link |

---

## Manifest Integration

UI contributions can be declared inline in the extension manifest or in separate files:

**Inline**:
```yaml
ui_contributions:
  - kind: artifact_viewer
    id: "image_viewer"
    display_name: "Image Viewer"
    supported_types: ["image/rgb", "image/mask"]
    priority: 10
```

**File reference**:
```yaml
ui_contributions:
  - file: "contributions/image_viewer.yaml"
```

Both forms are equivalent. The host resolves file references relative to the extension package root.

## Validation Rules

The host rejects a UI contribution during extension validation if:

- `kind` is not one of the six recognized values
- `id` is missing or not unique within the extension
- `display_name` is missing
- For `artifact_viewer`: `supported_types` is missing or empty
- For `config_widget`: `metadata.target_operator` or `metadata.target_field` is missing
- For `recipe_card`: `metadata.recipe_id` is missing
- For `tool_metadata`: `metadata.target_id` or `metadata.target_kind` is missing

Soft failures (logged but not rejected):
- `config_widget` references an operator or field that does not exist at runtime
- `recipe_card` references a recipe ID that does not exist
- `inspector_panel` references a target type that no artifact currently produces
