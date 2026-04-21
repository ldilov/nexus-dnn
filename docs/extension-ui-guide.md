# Extension UI Guide

How to build a UI for a Nexus extension.

You have two tiers to choose from:

1. **Compose host components in YAML** (recommended, 90% of extensions). Zero JavaScript — the host renders everything. Hot-reload, automatic theming, accessibility, keyboard navigation all come for free.
2. **Ship your own component** (when you truly need bespoke behavior). Custom element / Web Component contract; host embeds it in a themed container. See [extension-ui-architecture.md](./extension-ui-architecture.md).

This guide covers tier 1 end-to-end with a working example. Tier 2 is in the architecture doc.

## TL;DR

```
extensions/<your-ext>/
└── ui/
    └── layouts/
        └── main.yaml
```

The YAML declares a tree of component keys. The host’s layout renderer walks the tree, mounts the matching React components, and handles data-fetching, events, and theming.

## What components can I use?

Every renderable key comes from the host's **component registry**. Fetch the live catalog at runtime:

```
GET /api/v1/ui/components   →  { components: [{ key, category, props, ... }] }
```

Today the keys are grouped under four namespaces that mirror `apps/web/src/components/`:

| Namespace | What lives here | Examples |
|---|---|---|
| `base`    | Pure visual primitives | `button`, `card`, `badge`, `input`, `tabs`, `status_badge`, `module_icon` |
| `layout`  | Composite layout widgets | `workspace_shell`, `split_panel`, `stack`, `tabs_layout`, `detail_view`, `data_table`, `form`, `chat_panel`, `model_picker`, `model_selector`, `thread_list`, `list`, `action_bar`, `file_browser`, `log_viewer`, `metrics_dashboard`, `progress_tracker`, `runtime_panel`, `generation_settings_form`, `history_list` |
| `nodes`   | Graph/workflow canvas nodes | `operator_node`, `boundary_nodes`, `reroute_node`, `note_node` |
| `install` | Install flows | `install_extension_drawer` |

`layout/` is what you'll use 95% of the time for extension YAML — those are the composites designed for page-level composition.

## Example: a "Hello" extension with chat + sidebar

Let's build a minimal extension that shows a chat panel with a session sidebar. We'll reuse everything from the host — no code.

### 1. Declare the layout

`extensions/builtin/hello-llm/ui/layouts/main.yaml`:

```yaml
id: "hello.layout.main"
displayName: "Hello LLM"
description: "A minimal chat extension built entirely from host primitives."
icon: "bolt"

root:
  type: workspace_shell
  props:
    eyebrow: "Hello · Local Chat"
  children:
    - type: split_panel
      props:
        direction: horizontal
        sizes: [240, "1fr", 320]
      children:
        # LEFT SIDEBAR
        - type: stack
          id: sidebar
          children:
            - type: detail_view
              props:
                headerTitle: "Sessions"
                headerSubtitleColor: "accent"
                compact: true
            - type: model_selector
              id: model_selector
            - type: action_bar
              props:
                actions:
                  - label: "+ New Session"
                    icon: "add"
                    action: "llm.new_thread"
                    variant: "primary"
                    fullWidth: true
            - type: list
              id: thread_list
              props:
                itemType: thread
                emptyMessage: "No conversations yet"
                selectable: true

        # MAIN
        - type: stack
          children:
            - type: chat_panel
              props:
                streamingEnabled: true
                welcomeIcon: "bolt"
                welcomeTitle: "Say hi"
                welcomeDescription: "Pick a model and start talking."

        # RIGHT INSPECTOR
        - type: stack
          children:
            - type: generation_settings_form
              id: generation_settings
```

That's the whole extension. The host already knows how to:

- render `workspace_shell` with the eyebrow strip;
- lay out `split_panel` with 240px fixed left, flex middle, 320px fixed right;
- mount `chat_panel` wired to the streaming service;
- mount `model_selector` / `model_picker` wired to `active_model`;
- mount `generation_settings_form` bound to the current thread.

### 2. Register the layout

In the extension's `manifest.json`, list the layout id:

```json
{
  "id": "hello-llm",
  "name": "Hello LLM",
  "ui": {
    "layouts": ["hello.layout.main"]
  }
}
```

The host discovers it, serves it at `/<ext-id>#/extensions/<layout-id>`, and you're live.

### 3. Iterate

Edit the YAML — hot reload reflects within a second. Nothing to bundle, nothing to compile on the extension side.

## Anatomy of a layout node

Every node in the YAML tree has this shape:

```yaml
- type: <component-key>     # e.g. "split_panel"
  id: <optional-node-id>    # used for event wiring / data sources
  props:                    # component-specific props
    key: value
  children:                 # optional; only for container components
    - type: ...
  dataSource:               # optional; binds data to the component
    method: "llm.list_threads"
    params: { limit: 50 }
    events: ["session.state.changed"]
```

- **`type`** — any registered key. Catalog via `GET /api/v1/ui/components`.
- **`id`** — lets you reference the node from other places (e.g. cross-component event wiring).
- **`props`** — the JSON shape accepted by that component. The catalog returns a JSON-schema per key so your editor / tooling can autocomplete and validate.
- **`children`** — only accepted by container keys (`stack`, `split_panel`, `tabs_layout`, `card_layout`, `workspace_shell`).
- **`dataSource`** — declarative binding: what method feeds this component, what events invalidate it.

## Props at a glance

A few high-traffic keys and the props you'll use most:

### `workspace_shell`

Top-level chrome with an eyebrow row.

```yaml
type: workspace_shell
props:
  eyebrow: "Section · Subtitle"
children: [ ... ]
```

### `split_panel`

Horizontal or vertical resizable panels.

```yaml
type: split_panel
props:
  direction: horizontal       # or "vertical"
  sizes: [240, "1fr", 320]    # px numbers or "Nfr" fractional
children: [ ..., ..., ... ]
```

### `chat_panel`

Full chat surface with composer, streaming bubbles, markdown + KaTeX, latency/tokens meta, stop button.

```yaml
type: chat_panel
props:
  streamingEnabled: true
  welcomeIcon: "auto_awesome"
  welcomeTitle: "Initialize Conversation"
  welcomeDescription: "Select a model and start a conversation."
  modelChips:
    - label: "@LOCAL_MODEL"
      type: "model"
```

### `model_selector` + `model_picker`

Chip in the action bar that opens the model picker modal. Wired to the active-model lifecycle automatically.

```yaml
- type: model_selector
  id: model_selector
```

### `list` (with `itemType: thread`)

The thread list in the sidebar, auto-wired to `/extensions/local-llm/chat/threads`.

```yaml
- type: list
  props:
    itemType: thread
    emptyMessage: "No conversations yet"
    selectable: true
```

### `generation_settings_form`

Temperature / top_p / top_k / max_tokens / repeat_penalty / system_prompt, bound to the active thread.

```yaml
- type: generation_settings_form
  id: generation_settings
```

### `data_table` / `metrics_dashboard` / `log_viewer` / `history_list`

For content-heavy pages. All take a `dataSource` block.

## Theme variables (use these — don't hardcode colors)

Extensions composing host components inherit theme automatically. If you need to add styling to something custom, read these CSS variables:

| Variable | Meaning |
|---|---|
| `--color-primary` | Spectral accent |
| `--color-on-surface` | Primary text |
| `--color-on-surface-variant` | Muted text |
| `--color-surface` / `--color-bg-hover` | Background / hover |
| `--color-outline-variant` | Dividers |
| `--font-ui` / `--font-mono` | Body / code fonts |
| `--radius-panel` / `--radius-pill` | Border-radius tokens |
| `--motion-duration-fast` | Micro-interaction duration |

These are the **stable contract** between the host and extensions. Palette changes (light/dark, future themes) will flow through without any extension rewrite.

## When YAML isn't enough

If you need something the host doesn't have a component for — custom visualizations, bespoke interactions, a whole embedded SPA — ship your own component.

- **Practical walkthrough with a full React example:** [extension-ui-react-example.md](./extension-ui-react-example.md) — covers Web Components, Shadow DOM, the build story, hot reload, debugging.
- **The underlying contract** (catalog endpoint, tag naming, style layers, packaging format): [extension-ui-architecture.md](./extension-ui-architecture.md).

## Development loop

```bash
# 1. Start the host
cargo run -p nexus-core --bin nexus-dnn

# 2. Start the web dev server
pnpm --dir apps/web dev

# 3. Edit your extension's YAML — changes hot-reload
```

The Vite dev server watches `extensions/` via the host's `/api/v1/ui/layouts/<id>` route, so saving a YAML file reflects in the browser within ~500 ms.

## Common pitfalls

- **Don't hardcode sizes in `px` for responsive areas.** Use `"1fr"` for the middle column of `split_panel`.
- **Don't nest `workspace_shell` inside another shell.** One shell per layout.
- **Don't set `--host` / `--port` in any runtime-tuning surface.** The host owns those; the server will reject them.
- **Do give node IDs** when you want one component to listen to another component's events (e.g. `thread:selected` → `model_selector`).
- **Do use `dataSource.events`** instead of polling — the host streams updates via WebSocket.

## Reference

- Layout primitives live under `apps/web/src/components/layout/`
- Component registry: `apps/web/src/layout/component_registry.tsx`
- Real example: [`extensions/builtin/local-llm/ui/layouts/chat.yaml`](../extensions/builtin/local-llm/ui/layouts/chat.yaml)
- Architecture for custom UIs: [`extension-ui-architecture.md`](./extension-ui-architecture.md)
