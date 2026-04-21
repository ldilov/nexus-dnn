# Extension UI Authoring

The canonical reference for building extension UIs on Nexus DNN.

This guide covers both authoring paths — YAML-only (no build step) and custom element (ship a UI bundle) — plus the developer playground, the manifest contract, and the failure semantics the host enforces.

---

## Decision flow: pick a path

```
              ┌─────────────────────────────────────┐
              │ Does the host catalog cover         │
              │ what you need to render?            │
              │ (open /dev/components to check)     │
              └─────────────────────────────────────┘
                   │                          │
                 yes                         no
                   │                          │
                   ▼                          ▼
        ┌──────────────────┐        ┌──────────────────────┐
        │ YAML-only path   │        │ Custom-element path  │
        │ (no JS build)    │        │ (ship a UI bundle)   │
        └──────────────────┘        └──────────────────────┘
```

**Default to YAML-only.** Reach for a custom element only when the catalog genuinely doesn't cover your need — a novel visualization, a domain-specific widget, or a third-party chart library you want to embed.

---

## The playground at `/dev/components`

Run the host, open the web UI, and navigate to `/dev/components`. You'll see three panes:

1. **Catalog browser** (left) — every host-provided component, grouped by category, with a filter.
2. **Live preview** (center) — the component as it would render in a real layout.
3. **Props panel** (right) — a form generated from the component's own JSON Schema, plus copy-to-clipboard YAML and custom-element tag snippets.

Workflow for authoring a layout:

1. Search or browse to the component you want.
2. Edit its props in the form — the preview updates live.
3. Click **Copy YAML**.
4. Paste into your extension's `layouts/*.yaml`.

Every catalog entry has a stable schema version (currently `"1"`). If the host ever changes the catalog shape, downstream tooling will detect it via the `schema_version` field on `GET /api/v1/ui/components`.

The playground is a **developer surface** — it's available in every build but excluded from the main navigation. Support engineers can use it against a production host without a rebuild.

---

## Path A — YAML-only

For the 99% case where the catalog covers your needs.

### 1. Browse the catalog

```bash
# The host publishes the full catalog here:
curl http://localhost:3000/api/v1/ui/components | jq '.components[] | {name, category}'
```

Or visit `/dev/components` in the UI.

### 2. Write your layout

Layouts are YAML trees of `{ type, props, children }` nodes. Each `type` is a catalog `name`.

```yaml
# layouts/main.yaml
type: split_panel
props:
  direction: horizontal
  sizes: [60, 40]
children:
  - type: stack
    children:
      - type: card
        props:
          title: Hello
        children:
          - type: markdown_view
            props:
              source: "# Hello from my extension"
  - type: list
    props:
      itemType: thread
      emptyMessage: No threads yet
```

### 3. Declare it in your manifest

```yaml
# manifest.yaml
spec_version: "0.1"
extension:
  id: my-extension
  version: "0.1.0"
compatibility:
  host_api: ">=0.1.0, <2.0.0"
  protocol: ">=0.1.0, <2.0.0"
  platforms: [linux-x64, windows-x64, darwin-arm64]
runtime:
  family: builtin
  entrypoint: noop
ui:
  layouts:
    - file: layouts/main.yaml
      placement: main
      default: true
```

That's it. No build step, no JS, no bundler.

---

## Path B — Custom element (when the catalog isn't enough)

For novel widgets the host doesn't ship.

### 1. Build your UI bundle

Ship a standard ES module that exports a `register()` function. The host calls it exactly once, before the first mount.

```js
// ui/dist/novel-metrics.esm.js

class NovelMetrics extends HTMLElement {
  static get observedAttributes() {
    return ["dataset", "interval"];
  }

  connectedCallback() {
    // Read attributes — the host coerces props → attributes per the rules below.
    const dataset = this.getAttribute("dataset") ?? "cpu";
    this.innerHTML = `<div class="metric">${dataset}</div>`;
  }

  attributeChangedCallback(name, _old, next) {
    // Optional — react to prop updates.
  }
}

export function register() {
  if (!customElements.get("ext-novel-metrics")) {
    customElements.define("ext-novel-metrics", NovelMetrics);
  }
}
```

Key rules:

- Your `register()` function MUST be idempotent — the host may call it once per page lifetime, but sibling code should still guard with `customElements.get(...)`.
- Your element MUST be a valid custom element (tag name contains a hyphen, extends `HTMLElement` or uses the Shadow DOM).
- The host does NOT bundle, transpile, or transform your source code. Ship exactly what the browser will run.

### 2. Declare it in your manifest

```yaml
spec_version: "0.1"
extension:
  id: my-metrics
  version: "0.1.0"
compatibility:
  host_api: ">=0.1.0, <2.0.0"
  protocol: ">=0.1.0, <2.0.0"
  platforms: [linux-x64, windows-x64, darwin-arm64]
runtime:
  family: builtin
  entrypoint: noop
ui:
  assets:
    root: ui/dist
  custom_elements:
    - tag: ext-novel-metrics
      module: novel-metrics.esm.js
      entry: register     # default is "register" — can omit
  layouts:
    - file: layouts/main.yaml
      default: true
```

### 3. Use your tag from YAML

Once your extension is installed, the tag becomes usable from any layout YAML — from your own extension **and** from any other extension that wants to embed it (if you publish the contract).

```yaml
type: card
props:
  title: Live CPU
children:
  - type: ext-novel-metrics
    props:
      dataset: cpu
      interval: 500
```

### 4. What the host enforces at install time

- `tag` MUST match `^[a-z][a-z0-9]*(-[a-z0-9]+)+$` (custom-element grammar — must contain a hyphen, lowercase + digits only).
- `tag` MUST be globally unique across **all** installed extensions. Install is rejected with a readable error on collision.
- `module` MUST resolve to an existing file under your declared `assets.root`.
- `assets.root` MUST stay inside your extension directory — the host canonicalizes the path and rejects anything that escapes via `..` or a symlink.

### 5. What the host guarantees at runtime

- The host loads your module lazily — the bundle is NOT fetched until a layout actually references your tag.
- The host caches the bundle with `Cache-Control: public, max-age=300, must-revalidate` + a weak ETag. Intermediaries can cache; browser revalidation is cheap.
- If loading fails, `register()` throws, or the module exports no callable, the host renders an in-place placeholder identifying your extension and the failure reason. Sibling layout keeps rendering.

---

## Attribute coercion

When the host mounts your custom element, it coerces the YAML `props` object to HTML attributes using these rules:

| Prop type | Attribute form |
|-----------|----------------|
| `string` | attribute value = string |
| `number` | attribute value = `String(num)` |
| `boolean: true` | attribute present with empty-string value (HTML idiom) |
| `boolean: false` | attribute absent |
| `null` or `undefined` | attribute absent |
| object or array | attribute value = `JSON.stringify(value)` |

If you need the original typed value, parse the attribute inside `attributeChangedCallback` or at `connectedCallback` time. Design your component to treat attributes as the source of truth — this keeps you compatible with layouts that re-render with different props.

---

## Local iteration workflow

While you're developing:

1. Edit your bundle at `ui/dist/novel-metrics.esm.js` (or wherever your build emits).
2. Hit the reload endpoint to pick up the new bundle without restarting the host:

   ```bash
   curl -X POST http://localhost:3000/api/v1/extensions/my-metrics/reload
   ```

   The host re-reads your manifest and swaps your registry entry atomically. Other installed extensions are not touched.

3. Refresh the page. The host fetches the new bundle on next render; the old tag is re-registered (your `customElements.get(...)` guard makes this a no-op) and your new code runs.

Return codes from `/reload`:

- `200` on success.
- `404` if the extension id is unknown.
- `409` if reload would cause a tag collision or the manifest fails schema validation — your previous entry stays in place, no partial state.

---

## Uninstall semantics

When an extension is uninstalled:

- Its asset paths (`/api/v1/extensions/{id}/ui/*`) return `404 extension_not_found`.
- Its tags disappear from `GET /api/v1/ui/extension-components`.
- Any layout that references the tag renders an "unknown tag" placeholder — surrounding layout keeps working.
- Tag names become available again for other extensions to claim.

---

## Reference endpoints

| Endpoint | Use |
|----------|-----|
| `GET /api/v1/ui/components` | Host-provided component catalog (for doc generators, AI assistants, the playground). |
| `GET /api/v1/ui/extension-components` | Registered custom-element tags, one row per installed extension's contribution. |
| `GET /api/v1/extensions/{id}/ui/{*path}` | Serves static UI assets shipped by extension `{id}`. |
| `POST /api/v1/extensions/{id}/reload` | Atomically re-reads one extension's manifest and re-registers its tags. |

See [contracts/ui_components.openapi.yaml](../../specs/027-extension-ui-playground/contracts/ui_components.openapi.yaml) and [contracts/extension_ui_assets.openapi.yaml](../../specs/027-extension-ui-playground/contracts/extension_ui_assets.openapi.yaml) for full OpenAPI definitions.

---

## Worked examples

### YAML-only: a minimal chat extension

```yaml
# layouts/main.yaml
type: split_panel
props:
  direction: horizontal
  sizes: [30, 70]
children:
  - type: list
    props:
      itemType: thread
      emptyMessage: Start a conversation
  - type: chat_panel
```

```yaml
# manifest.yaml (abridged — full example in the extensions/ tree)
spec_version: "0.1"
extension:
  id: my-chat
  version: "0.1.0"
compatibility: { host_api: ">=0.1.0, <2.0.0", protocol: ">=0.1.0, <2.0.0", platforms: [linux-x64] }
runtime: { family: builtin, entrypoint: noop }
ui:
  layouts:
    - file: layouts/main.yaml
      default: true
```

### Custom element: a streaming sparkline

```js
// ui/dist/sparkline.esm.js
class ExtSparkline extends HTMLElement {
  connectedCallback() {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 48;
    this.appendChild(canvas);
    // draw sparkline…
  }
}
export function register() {
  customElements.get("ext-sparkline") || customElements.define("ext-sparkline", ExtSparkline);
}
```

```yaml
# manifest.yaml
ui:
  assets:
    root: ui/dist
  custom_elements:
    - tag: ext-sparkline
      module: sparkline.esm.js
```

```yaml
# layouts/main.yaml
type: card
props:
  title: CPU usage
children:
  - type: ext-sparkline
    props:
      source: metrics.cpu
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Unknown component: <name>" placeholder in layout | The name doesn't match any catalog entry AND the tag has no hyphen (so the host didn't try the custom-element path). | Typo in `type`; check spelling against `/dev/components`. |
| "Extension UI failed — reason: unknown_tag" | Tag contains a hyphen (host recognized it as custom-element) but no installed extension registers that tag. | Confirm the extension is installed and the manifest declares the exact tag. |
| "Extension UI failed — reason: load_failed" | Bundle fetch failed (404, network, CORS). | Check that the module path is correct relative to `assets.root`. Visit `/api/v1/extensions/{id}/ui/{module}` directly. |
| "Extension UI failed — reason: register_failed" | Module loaded but `register()` threw, or the declared `entry` export isn't a function. | Check your bundle's console output; verify the export name matches `custom_elements[].entry` (default: `register`). |
| Install rejected with "duplicate custom element tag" | Another installed extension claims the same tag. | Namespace your tag with a prefix unique to your extension (e.g. `ext-<your-id>-<widget>`). |
| Install rejected with "invalid custom element tag" | Tag missing hyphen, uppercase, or non-lowercase-alphanumeric. | Use `^[a-z][a-z0-9]*(-[a-z0-9]+)+$`. |

---

## What the host guarantees (and enforces in tests)

| Guarantee | Enforcement |
|-----------|-------------|
| Every catalog component has category + schema + ≥1 example | Startup validation in `validate_catalog()`; contract test `catalog_shape`. |
| Prop edit → preview repaint < 200 ms | Playground is pure catalog consumer; e2e assertion scheduled in Phase 7. |
| Path traversal in extension assets → 400 | `extension_ui_assets_contract.rs::path_traversal_blocked`. |
| Tag uniqueness at install time | `collect_from_extensions` + `duplicate_tag_across_extensions_fails_collection` test. |
| Uninstall tears down tags + routes atomically | `not_found_after_uninstall` + `tag_absent_from_list_after_uninstall`. |
| Bundle failure isolated to its placeholder | `extension_custom_element.test.tsx` — 5 failure-mode tests. |
| Per-extension reload leaves other extensions untouched | `reload_returns_ok_for_installed_extension` + idempotency test. |

---

## Next steps

- Add a new entry to the host catalog: open a PR editing `crates/nexus-api/src/handlers/ui_components.rs` — the playground picks it up automatically after rebuild.
- Publish a custom element for others to reuse: document your tag + prop contract in your extension's README; file it under the appropriate category in the broader extension registry.
- See the [feature spec](../../specs/027-extension-ui-playground/spec.md) for the full non-negotiable contract this guide implements.
