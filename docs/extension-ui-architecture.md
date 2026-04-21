# Extension UI Architecture

This document specifies how extensions contribute UI to Nexus. It defines four things:

1. A **component catalog** so extension authors can discover and reference host primitives.
2. A **custom element contract** for extensions that need to ship their own React / framework-of-choice UI.
3. A **style-layering model** so extension CSS composes cleanly with host theme without conflict.
4. A **packaging format** that bundles all of the above in a way the host can load at runtime.

Companion doc for people who just want to use host primitives via YAML: [extension-ui-guide.md](./extension-ui-guide.md).

---

## 1. Component Catalog

Goal: an extension author should be able to see every layout key the host renders, along with the prop shape it accepts.

### Endpoint

```
GET /api/v1/ui/components
```

Returns:

```jsonc
{
  "version": "1",
  "components": [
    {
      "key": "split_panel",
      "category": "layout",
      "accepts_children": true,
      "display_name": "Split Panel",
      "description": "Resizable horizontal / vertical split.",
      "props_schema": {                // JSON Schema draft-2020-12
        "type": "object",
        "required": ["direction", "sizes"],
        "properties": {
          "direction": { "enum": ["horizontal", "vertical"] },
          "sizes":     { "type": "array", "items": { "type": ["number", "string"] } }
        }
      },
      "example": {
        "type": "split_panel",
        "props": { "direction": "horizontal", "sizes": [240, "1fr", 320] },
        "children": []
      }
    }
    // ... one entry per registered key
  ]
}
```

### Source of truth

`apps/web/src/layout/component_registry.tsx` already maps keys → React renderers. We extend each registry entry with metadata:

```ts
registerComponent("split_panel", {
  render: (node, children) => <SplitPanel ... />,
  meta: {
    category: "layout",
    accepts_children: true,
    props_schema: SplitPanelSchema,        // zod or ts-json-schema-generator
    example: { ... },
  },
});
```

Catalog endpoint is a pure derivation of the registry — no separate JSON file to drift.

### Tooling

- **VS Code extension (future):** consumes the catalog to autocomplete and validate `*.yaml` layouts.
- **Dev Playground page (`/dev/components`):** browsable catalog with live preview + prop editor. Good first thing to build right after this spec lands.

---

## 2. Custom Element Contract

When composing primitives isn't enough, extensions ship their own component.

**Decision: Web Components (Custom Elements + Shadow DOM) as the universal contract.** Not Module Federation, not iframes. Rationale at the bottom of this section.

### What the extension ships

```
extensions/<ext-id>/ui/
├── manifest.json
├── layouts/                          # optional, if the ext also uses host primitives
│   └── main.yaml
└── elements/                         # custom element bundles
    ├── my-widget.esm.js              # defines customElements.define("ext-<id>-my-widget", ...)
    └── my-widget.css                 # optional scoped stylesheet
```

### manifest.json

```jsonc
{
  "id": "my-ext",
  "ui": {
    "elements": [
      {
        "tag": "my-widget",              // becomes <ext-my-ext-my-widget> at runtime
        "module": "elements/my-widget.esm.js",
        "stylesheet": "elements/my-widget.css",
        "props_schema": { /* JSON Schema for attrs/props */ }
      }
    ],
    "layouts": ["my-ext.layout.main"]
  }
}
```

### Host behavior at discovery

1. Parses manifest, collects `elements[]`.
2. Dynamically imports each `module` URL via `/api/v1/extensions/<id>/ui/<path>`.
3. The ES module's side-effect is `customElements.define("ext-<id>-<tag>", class extends HTMLElement { ... })`.
4. Appends `<link rel="stylesheet">` for each `stylesheet` into the host document.
5. Registers the tag in the component registry under key `ext:<id>:<tag>` so YAML can reference it:

```yaml
- type: "ext:my-ext:my-widget"
  props:
    endpoint: "/api/v1/my-ext/foo"
    mode: "compact"
```

The layout renderer maps `ext:...` keys to a `<ContainerForCustomElement>` React component that:
- renders `<ext-my-ext-my-widget>`;
- sets each YAML prop as an attribute (strings) **and** as a property (for objects/arrays);
- passes a `host-context` property with `{ themeTokens, apiBase, activeThreadId, ...host-provided context }`;
- listens for `CustomEvent`s dispatched by the element and forwards them to the host's event bus (using a fixed event-name prefix like `ext-event`).

### What the extension author writes

Single-file, zero-framework version:

```js
// elements/my-widget.esm.js
class MyWidget extends HTMLElement {
  static get observedAttributes() { return ["endpoint", "mode"]; }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() { this.render(); }

  set hostContext(ctx) { this._ctx = ctx; this.render(); }

  render() {
    const endpoint = this.getAttribute("endpoint");
    const { themeTokens } = this._ctx ?? { themeTokens: {} };
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; font-family: var(--font-ui); color: var(--color-on-surface); }
        .card { background: var(--color-surface); border-radius: var(--radius-panel); padding: 16px; }
      </style>
      <div class="card">Widget bound to ${endpoint}</div>
    `;
  }
}
customElements.define("ext-my-ext-my-widget", MyWidget);
```

Or, with React (the common case), using `@lit/react` or a small host-provided helper:

```tsx
// elements/my-widget.esm.js  (built from React source)
import { createRoot } from "react-dom/client";
import { MyWidget } from "./MyWidget";   // standard React component

class MyWidgetElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    // Copy host theme stylesheet into shadow root so CSS variables cascade:
    this._root = createRoot(this.shadowRoot);
    this._render();
  }
  set hostContext(ctx) { this._ctx = ctx; this._render(); }
  attributeChangedCallback() { this._render(); }
  disconnectedCallback() { this._root?.unmount(); }

  _render() {
    this._root?.render(
      <MyWidget endpoint={this.getAttribute("endpoint")} hostCtx={this._ctx} />,
    );
  }
}
customElements.define("ext-my-ext-my-widget", MyWidgetElement);
```

The extension builds its own bundle (`pnpm build`, `tsup`, whatever) and ships the single ESM file. The host doesn't care what's inside.

### Host ↔ extension comms

- **Host → extension**: attributes for scalars; the `hostContext` property for structured data.
- **Extension → host**: the element dispatches a single `ext-event` CustomEvent with `{ detail: { topic, payload }, bubbles: true, composed: true }`. The host container element has one listener registered per mount and republishes `detail.topic` + `detail.payload` on its internal event bus (namespacing the topic to `ext-<id>:<topic>` so two extensions can't collide).

Extension authors never talk to the host bus directly; they dispatch a DOM event from inside their shadow root and the host picks it up at the element boundary. Inside a React tree this usually looks like a plain `onEvent(topic, payload)` callback — the element wrapper translates that callback into the DOM dispatch. Full walkthrough with a diagram: [extension-ui-react-example.md — How an event travels from your React code to the host](./extension-ui-react-example.md#how-an-event-travels-from-your-react-code-to-the-host).

This keeps the API **tiny** (3 things: attributes, `hostContext` property, `ext-event` CustomEvent) and framework-agnostic. Extensions written in Preact, Solid, Lit, or plain DOM all use the exact same DOM-level contract.

### Why Web Components and not Module Federation / iframes

| Approach | Pros | Cons | Verdict |
|---|---|---|---|
| **Web Components (chosen)** | Framework-agnostic. Shadow DOM isolates CSS cleanly. Lifecycle is native DOM. Zero host-framework lock-in for extension authors. | Prop passing via attributes is stringly-typed (we solve with `hostContext` property). | ✅ Best long-term. |
| Module Federation (Vite / webpack) | Seamless React interop; shared React instance. | Host + extension must match bundler major versions. Breaks if host upgrades. Pins extensions to Vite. Weak isolation — extension can pollute host globals. | ❌ Too much coupling. |
| iframes | Total isolation. | CSS boundary = not seamless visually. postMessage-only comms, very chatty. Heavier. Can't share the host's auth cookies cleanly without extra plumbing. | ❌ Only for sandboxed untrusted extensions, which isn't today's ecosystem. |

---

## 3. Style Layering

Problem: multiple extensions, each with its own CSS, plus host defaults, plus theme overrides. We need predictable precedence.

### Use CSS cascade layers

The host shell injects a single `@layer` declaration at the top of the document stylesheet:

```css
@layer host-reset, host-tokens, host-components, extension-base, extension-overrides;
```

- `host-reset` — normalize / CSS reset
- `host-tokens` — `:root { --color-primary: ...; }` design tokens
- `host-components` — every host component's vanilla-extract CSS
- `extension-base` — extension stylesheets loaded from manifest `stylesheets[]`
- `extension-overrides` — user or per-install theme tweaks

Later layers beat earlier layers regardless of specificity. That means:

- Extension CSS cannot accidentally override host tokens (that's `host-tokens`, explicitly priority-protected).
- Extensions **can** override host-component visuals inside extension-scoped wrappers — their rules are in `extension-base`, which beats `host-components`.
- User overrides always win, no `!important` needed.

### Theme tokens are the contract

Extensions read tokens, never raw colors:

```css
/* ❌ breaks on theme switch */
.my-panel { background: #1d2023; color: #fff; }

/* ✅ survives light/dark and palette changes */
.my-panel {
  background: var(--color-surface);
  color: var(--color-on-surface);
  font-family: var(--font-ui);
}
```

The token catalog lives at `apps/web/src/theme/contract.css.ts` and is stable: changes require a major version bump of the host's extension API.

### How tokens reach shadow roots

Tokens are declared on `:root` and inherit through the shadow boundary via CSS custom property inheritance — this is the **only** CSS that crosses the boundary. Regular rules (`.foo { color: red }` or `body { font: ... }`) do **not** reach inside shadow roots. That's the whole point: isolation of visuals, inheritance of the design contract.

Extensions must add one line of shadow-root boilerplate to make typography inherit correctly:

```css
:host {
  font: inherit;
  color: var(--color-on-surface);
  font-family: var(--font-ui);
}
```

Full walkthrough including the four common pitfalls (wrong font inside shadow, light-mode regressions, `@keyframes` scoping, `all: initial` traps): [extension-ui-react-example.md § Design inheritance](./extension-ui-react-example.md#design-inheritance-across-the-shadow-dom-boundary).

---

## 4. Extension UI Package Format

### Directory layout (canonical)

```
extensions/<id>/
├── manifest.json              # now with ui.elements[], ui.layouts[], ui.stylesheets[]
└── ui/
    ├── layouts/               # *.yaml, host-primitive composition
    │   └── main.yaml
    ├── elements/              # *.esm.js custom elements
    │   └── my-widget.esm.js
    ├── styles/                # optional global stylesheets (loaded into extension-base layer)
    │   └── overrides.css
    └── assets/                # images, fonts, etc. served under /api/v1/extensions/<id>/ui/assets/*
```

### Serving

The host adds:

```
GET /api/v1/extensions/<id>/ui/<path>
```

Streaming files from the extension's `ui/` dir with strict content-type enforcement (`.esm.js` → `application/javascript`, `.css` → `text/css`, `.png` → `image/png`, etc.). No directory listing, no path traversal, Content-Security-Policy headers set.

### Discovery flow

1. Extension discovery scans `extensions/` at host startup, builds a registry.
2. `manifest.json.ui` is parsed; layouts and elements are registered.
3. Web client fetches `/api/v1/ui/layouts/<layout-id>` and `/api/v1/ui/components` to render.
4. When a layout references `type: ext:foo:bar`, the renderer:
   - lazy-loads `import("/api/v1/extensions/foo/ui/elements/bar.esm.js")` on first mount;
   - waits for `customElements.whenDefined("ext-foo-bar")`;
   - renders the element with props → attributes + `hostContext` property.

### Backwards compatibility

- Extensions without a `ui/elements/` directory keep working exactly as today (YAML-only).
- The `ui.stylesheets[]` array is additive — omitting it is a no-op.
- The `ext:*` key namespace is new; existing keys are unchanged.

---

## 5. Scope

Current scope covers host-primitive composition, custom elements with Shadow DOM isolation, theme-token inheritance, and per-extension style layering. Each extension ships its own bundled dependencies including its React instance; the runtime contract between host and extension is framework-agnostic (attributes, the `hostContext` property, and `ext-event` CustomEvents).

Every UI element currently runs with the same privileges as the host page. A capability-based permission model for UI elements — declaring what APIs an element may call — is planned on the same roadmap as backend-capability enforcement.

---

## References

- Host component registry: [`apps/web/src/layout/component_registry.tsx`](../apps/web/src/layout/component_registry.tsx)
- Host primitives: [`apps/web/src/components/`](../apps/web/src/components/) — split across `base/`, `layout/`, `nodes/`, `install/`
- Theme tokens: [`apps/web/src/theme/contract.css.ts`](../apps/web/src/theme/contract.css.ts)
- Usage guide: [`extension-ui-guide.md`](./extension-ui-guide.md)
- Example YAML extension: [`extensions/builtin/local-llm/ui/layouts/chat.yaml`](../extensions/builtin/local-llm/ui/layouts/chat.yaml)
