# Building an Extension UI with React (End-to-End)

This is the practical "I want to write React, how do I ship it as a Nexus extension?" walkthrough. It answers:

- What does a React extension look like on disk?
- Does the host build my extension?  **No.**
- What on earth is a Web Component / Shadow DOM / HTMLElement?
- How do I develop with hot-reload?

If you just want to compose host components in YAML (no JS needed), read [extension-ui-guide.md](./extension-ui-guide.md) instead.

---

## The 60-second mental model

Think of it as three separate processes:

```
┌─────────────────────────────┐        ┌────────────────────────────┐
│  YOUR extension repo        │        │  The Nexus host            │
│  ─────────────────────────  │        │  ─────────────────────────  │
│  Your code (React)          │        │                            │
│         │                   │        │  At startup:               │
│         │ pnpm build        │        │    • scans extensions/     │
│         ▼                   │        │    • reads manifest.json   │
│  dist/my-widget.esm.js ─────┼───────►│    • serves /ui/*.esm.js   │
│  (one pre-built ESM file)   │  copy  │                            │
│                             │        │  In the browser:           │
│                             │        │    • import() the ESM      │
│                             │        │    • render <ext-tag>      │
└─────────────────────────────┘        └────────────────────────────┘
```

**Who builds what, when**

| Thing | Built by | When |
|---|---|---|
| Host web app (`apps/web/`) | Host developer | Once, at host release |
| Your extension's React code | **You** | Whenever you change it, with your own Vite/tsup config |
| Extension `dist/*.esm.js` → served to browser | Host | Never built by the host — just served as a static file |
| The actual React component mount | Browser, at runtime | When the user opens the page that needs your widget |

**The host does not build your extension.** The host boots fast (no bundling step) and loads your pre-built ESM file on demand.

---

## Concepts you need (skip if you know them)

### HTMLElement

Every HTML tag (`<div>`, `<button>`, ...) is a subclass of `HTMLElement` at runtime. You can define your own:

```js
class MyTag extends HTMLElement {
  connectedCallback() {
    this.textContent = "hi";
  }
}
customElements.define("my-tag", MyTag);

// now <my-tag></my-tag> in HTML renders "hi"
```

That's it. Custom Elements are a browser-native API for defining new HTML tags. No framework required.

### Shadow DOM

An element can attach a private DOM subtree that's isolated from the rest of the page:

```js
this.attachShadow({ mode: "open" });
this.shadowRoot.innerHTML = `
  <style>.card { color: red; }</style>
  <div class="card">inside the shadow</div>
`;
```

Styles inside the shadow root don't leak out; styles outside don't leak in. Your extension CSS will never fight with the host's CSS (and vice versa). This is how we give each extension its own visual sandbox.

### Web Component

"Web Component" = Custom Element + (usually) Shadow DOM + (usually) declarative template. It's not a library — it's three browser APIs combined. Works in every browser without any runtime.

### How React fits in

React renders into any DOM node. Instead of rendering into `document.getElementById("root")`, you render into your custom element's shadow root:

```tsx
class MyWidgetElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this._root = createRoot(this.shadowRoot);
    this._root.render(<MyWidget />);
  }
  disconnectedCallback() { this._root?.unmount(); }
}
customElements.define("ext-myext-my-widget", MyWidgetElement);
```

From the host's perspective, your whole React app is one HTML tag: `<ext-myext-my-widget>`. From your perspective, everything inside that tag is regular React — hooks, state, components, whatever.

---

## A complete React extension

### Directory

```
extensions/community/my-ext/
├── manifest.json
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── MyWidget.tsx           # your React component (normal)
│   └── element.tsx            # the Web Component wrapper
├── dist/                      # build output, checked in OR built on publish
│   └── my-widget.esm.js
└── ui/
    ├── layouts/
    │   └── main.yaml          # optional: compose host primitives + your element
    └── styles/
        └── overrides.css      # optional: extra styles loaded by the host
```

Only `dist/` and `ui/` and `manifest.json` ship. `src/` is your working directory.

### `package.json`

```json
{
  "name": "my-ext",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev":   "vite build --watch",
    "build": "vite build",
    "lint":  "tsc --noEmit"
  },
  "devDependencies": {
    "react":      "^19.0.0",
    "react-dom":  "^19.0.0",
    "vite":       "^6.0.0",
    "typescript": "^5.7.0"
  }
}
```

Extensions pin their own React version. They run in the shadow root with their own React instance — no version pinning with the host.

### `vite.config.ts`

This is the bundler config that produces one ESM file.

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/element.tsx"),
      formats: ["es"],
      fileName: () => "my-widget.esm.js",
    },
    rollupOptions: {
      // Bundle React in — each extension is isolated. If you share
      // deps with the host later, externalize and rely on importmaps.
      external: [],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
```

### `src/MyWidget.tsx` — normal React

```tsx
import { useEffect, useState } from "react";

interface MyWidgetProps {
  endpoint: string;
  hostCtx?: { apiBase: string; activeThreadId?: string };
  onEvent?: (topic: string, payload: unknown) => void;
}

export function MyWidget({ endpoint, hostCtx, onEvent }: MyWidgetProps) {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    if (!hostCtx?.apiBase) return;
    const ctrl = new AbortController();
    fetch(`${hostCtx.apiBase}${endpoint}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
    return () => ctrl.abort();
  }, [endpoint, hostCtx?.apiBase]);

  return (
    <div className="card">
      <h3>My Widget</h3>
      <p>Thread: {hostCtx?.activeThreadId ?? "none"}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => onEvent?.("my.clicked", { ts: Date.now() })}>
        Fire event to host
      </button>
      <style>{`
        .card {
          background: var(--color-surface, #1a1c1f);
          color: var(--color-on-surface, #eaeaf0);
          padding: 16px;
          border-radius: var(--radius-panel, 12px);
          font-family: var(--font-ui, system-ui);
        }
        button {
          background: var(--color-primary, #ba9eff);
          color: #000;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
```

Note how CSS uses `var(--color-...)` with fallbacks. Those variables are the host's theme tokens, which cascade into your shadow root so your component inherits the host's palette automatically.

### `src/element.tsx` — the Web Component wrapper

This is the 30 lines of boilerplate that turn your React component into an HTML tag. You write this once per extension and rarely touch it again.

```tsx
import { createRoot, type Root } from "react-dom/client";
import { MyWidget } from "./MyWidget";

type HostContext = {
  apiBase: string;
  activeThreadId?: string;
  themeTokens?: Record<string, string>;
};

class MyWidgetElement extends HTMLElement {
  static get observedAttributes() { return ["endpoint"]; }

  private _root: Root | null = null;
  private _hostCtx: HostContext | null = null;

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    // Inherit host typography + text color into the shadow tree.
    // CSS custom properties cross the boundary; font/color don't, unless
    // we pull them in on :host.
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        font: inherit;
        font-family: var(--font-ui, system-ui, sans-serif);
        color: var(--color-on-surface, #eaeaf0);
        line-height: 1.5;
      }
    `;
    this.shadowRoot!.appendChild(style);
    const mount = document.createElement("div");
    this.shadowRoot!.appendChild(mount);
    this._root = createRoot(mount);
    this._render();
  }

  disconnectedCallback() {
    this._root?.unmount();
    this._root = null;
  }

  attributeChangedCallback() { this._render(); }

  // Host passes structured data via this property (not attribute — attrs are string-only).
  set hostContext(ctx: HostContext) {
    this._hostCtx = ctx;
    this._render();
  }

  private _emit = (topic: string, payload: unknown) => {
    this.dispatchEvent(
      new CustomEvent("ext-event", {
        detail: { topic, payload },
        bubbles: true,
        composed: true,    // escape the shadow root so the host can hear it
      }),
    );
  };

  private _render() {
    if (!this._root) return;
    this._root.render(
      <MyWidget
        endpoint={this.getAttribute("endpoint") ?? ""}
        hostCtx={this._hostCtx ?? undefined}
        onEvent={this._emit}
      />,
    );
  }
}

// Tag MUST be prefixed `ext-<id>-<name>` so the host namespaces it.
customElements.define("ext-my-ext-my-widget", MyWidgetElement);
```

That's the whole wrapper. Three bits of API surface:

1. **Attributes** (`endpoint`) — strings only. The host sets these from YAML `props`.
2. **`hostContext` property** — structured data (objects, arrays). The host sets this imperatively.
3. **`ext-event` CustomEvent** — how your extension talks back to the host. The host listens on the element and republishes on its internal bus.

### How an event travels from your React code to the host

The API surface above is DOM-level, but inside your React tree you want regular callbacks (`onClick`, `onEvent`), not DOM dispatch. Here is the full round-trip when a user clicks a button in your widget:

```
┌───────────────────────────────────┐
│ React component (MyWidget.tsx)    │
│                                   │
│  onClick={() => onEvent(          │
│    "my.clicked", { ts: Date.now() │
│  })}                              │
└───────────────┬───────────────────┘
                │ plain React callback
                ▼
┌───────────────────────────────────┐
│ Wrapper (element.tsx)             │
│                                   │
│  const _emit = (topic, payload) =>│
│    this.dispatchEvent(            │
│      new CustomEvent("ext-event", │
│        { detail: { topic, payload},│
│          bubbles: true,           │
│          composed: true }))       │
└───────────────┬───────────────────┘
                │ DOM event bubbles up,
                │ crosses shadow boundary
                │ because composed: true
                ▼
┌───────────────────────────────────┐
│ Host container                    │
│ (listens once per mount)          │
│                                   │
│  el.addEventListener("ext-event", │
│    (e) => hostBus.publish(        │
│      e.detail.topic,              │
│      e.detail.payload))           │
└───────────────────────────────────┘
```

**Why re-emit?** Two boundaries need bridging:

1. **React ↔ DOM**: React speaks in callbacks (`onClick`, `onEvent`), the host page speaks in DOM events. The wrapper translates one to the other so your React stays framework-idiomatic and the host stays framework-agnostic. The host never imports React from your bundle; it just listens for a standard DOM event on the element.
2. **Shadow root ↔ light DOM**: events raised inside a shadow root only reach listeners outside it if `composed: true`. Without that flag, the event would bubble within your shadow DOM and stop at the host element. The flag is what lets the host pick it up.

**Why a single `ext-event` name with a `topic` field, instead of dispatching `my.clicked` directly as the event name?** One listener per element, not one per topic. The host registers `addEventListener("ext-event", …)` once, then dispatches based on `event.detail.topic` to whoever is listening internally. Simpler plumbing, fewer surprises when two extensions pick the same topic (the host namespaces it to `ext-<id>:<topic>` before re-publishing).

**So what does the host actually do with it?** The host listener calls its internal event bus, same one used by `session.state.changed` and `channel.ready`. Other parts of the host (other React components, other open tabs of the app via WebSocket fan-out) subscribe to topics they care about. Your extension's event can trigger a toast, refresh a list, update a progress bar — whatever the host layer chooses. From the extension's perspective, you fire the event and move on; the host decides what happens next.

**If you need a reply from the host** (not a one-way notification): today the pattern is to fetch it yourself via `fetch(hostCtx.apiBase + "/…")`. The `ext-event` channel is fire-and-forget. A request/response channel over the element property surface is a possible future extension to the contract, but today there is only the one direction.

### `manifest.json`

```jsonc
{
  "id": "my-ext",
  "name": "My Extension",
  "version": "0.1.0",
  "ui": {
    "elements": [
      {
        "tag": "my-widget",
        "module": "dist/my-widget.esm.js",
        "stylesheet": null,
        "props_schema": {
          "type": "object",
          "required": ["endpoint"],
          "properties": {
            "endpoint": { "type": "string" }
          }
        }
      }
    ],
    "layouts": ["my-ext.layout.main"]
  }
}
```

### `ui/layouts/main.yaml` — use your element from YAML

```yaml
id: "my-ext.layout.main"
displayName: "My Ext"
icon: "bolt"

root:
  type: workspace_shell
  props:
    eyebrow: "My Ext · Demo"
  children:
    - type: split_panel
      props: { direction: horizontal, sizes: ["1fr", 380] }
      children:
        - type: stack
          children:
            - type: chat_panel               # host primitive
              props:
                welcomeTitle: "Hi"
        - type: "ext:my-ext:my-widget"        # YOUR custom element
          props:
            endpoint: "/api/v1/my-ext/status"
```

Note the prefix: `ext:<extension-id>:<tag>`. The host's layout renderer recognizes that namespace, looks up the element by id+tag, lazy-loads the ESM module, and renders `<ext-my-ext-my-widget endpoint="...">`.

---

## Design inheritance across the Shadow DOM boundary

The one non-obvious thing about Web Components: Shadow DOM is **isolated from CSS rules** but **not from CSS custom properties**. Understanding this is the whole key to making your extension look native.

### What crosses the shadow boundary, what doesn't

| Thing | Crosses shadow root? |
|---|---|
| Host CSS rules (`.button { ... }`, `body { font: ... }`) | ❌ No |
| Host's `@keyframes` definitions | ❌ No (need to redefine or import inside shadow) |
| CSS custom properties (`--color-primary: ...`) | ✅ **Yes** — inherit down through `var()` |
| `font-family`, `color`, `line-height` set on `:host` or ancestor | ✅ Yes (normal CSS inheritance) |
| Global `*, *::before, *::after` resets | ❌ No |
| `@font-face` declarations loaded in host `<head>` | ✅ Yes (fonts are document-scoped) |

This is exactly what you want: **isolation from style collisions, inheritance of the design contract.** The bridge is CSS custom properties.

### How the host exposes its design system

The host declares its theme tokens on `:root` (the document element). They look like this:

```css
:root {
  --color-primary:           oklch(70% 0.18 290);
  --color-surface:           oklch(18% 0.005 280);
  --color-on-surface:        oklch(95% 0.01 280);
  --color-on-surface-variant: oklch(70% 0.02 280);
  --color-outline-variant:   oklch(30% 0.01 280);

  --font-ui:   "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-panel: 12px;
  --radius-pill:  999px;
  --motion-duration-fast: 150ms;
  --space-section: clamp(4rem, 3rem + 5vw, 10rem);
  /* ...etc — see apps/web/src/theme/contract.css.ts */
}
```

Because these are defined on `:root`, they inherit into **every** shadow root on the page — yours included. You just read them:

```css
.card {
  background: var(--color-surface);
  color: var(--color-on-surface);
  border-radius: var(--radius-panel);
  font-family: var(--font-ui);
}
```

No imports, no config. The values flow in automatically.

### The shadow root boilerplate

There's one line of setup inside every shadow root to make inheritance behave correctly. When you attach the shadow, add a `:host` block that explicitly inherits typography and color:

```js
this.attachShadow({ mode: "open" });
this.shadowRoot.innerHTML = `
  <style>
    :host {
      /* Inherit host typography + text color into the shadow tree. */
      display: block;
      font: inherit;
      color: var(--color-on-surface);
      font-family: var(--font-ui);
      line-height: 1.5;
    }
  </style>
`;
```

Why? Because `font-family`, `color`, `line-height` set on `<body>` in the host page **don't** automatically inherit into the shadow root — they inherit up to the shadow host element (your `<ext-...>` tag), but not through the shadow boundary. Setting `font: inherit` on `:host` pulls them back in.

After that one line, your React components just look right:

```tsx
// No special font setup needed — :host inherits.
<div style={{ background: "var(--color-surface)", padding: 16 }}>
  <h3>My Widget</h3>
  <p>Body text in the host's UI font, host's text color.</p>
</div>
```

### Light mode / dark mode / theme switching

Because tokens live on `:root`, when the host switches theme (e.g., `<html data-theme="light">`), every shadow root re-inherits the new values automatically. You write your CSS **once** using tokens, and it flips with the rest of the app. You do not subscribe to theme events — the cascade does it for you.

### What about @keyframes?

Keyframe names are scoped to the stylesheet that declares them. If you write an animation using a host-defined keyframe name, it won't find it inside your shadow root. Two options:

1. **Redefine the keyframes locally** (cheapest, usually right):
   ```css
   @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
   .toast { animation: fadeIn 200ms ease; }
   ```
2. **Use animation utilities that inline their keyframes** (e.g., `animate.css` vendored inside your extension's stylesheet).

### Common pitfalls (and the fixes)

**"My text is the wrong font."** You forgot the `:host { font: inherit }` block. Without it, the shadow root defaults to the browser's UA font.

**"My colors are wrong in light mode."** You hardcoded a color instead of reading a token:
```css
/* ❌ */  color: #eee;
/* ✅ */  color: var(--color-on-surface);
```

**"I want to override a host token just for my extension."** Scope your override inside `:host`:
```css
:host {
  --color-primary: hotpink;   /* only inside this extension's tree */
}
```
Host and other extensions are unaffected.

**"I used `:host { all: initial }` and everything broke."** Yes it did. `all: initial` nukes inheritance for every property — including the CSS variables you want to inherit. Don't use it. Use `:host { font: inherit; color: inherit; }` if you want a clean slate for just typography.

**"I want to use a Tailwind-like preflight reset."** Ship it *inside* your shadow root's stylesheet. It won't leak out.

**"Fonts loaded by the host aren't available in my extension."** They are — `@font-face` is document-scoped, so any font family the host has loaded can be referenced by name from inside any shadow root. If you need a font the host *doesn't* ship, add your own `@font-face` to your extension's stylesheet (the file will load, the font will register globally, and you can reference it).

**"My KaTeX / Prism / some third-party CSS doesn't work."** Most third-party CSS assumes it's in the light DOM. Import it **inside** your shadow root's stylesheet, not via `<link>` in `<head>`. For example in React:
```tsx
import katexCss from "katex/dist/katex.min.css?inline";
// ...
<style>{katexCss}</style>
```

### Want to opt out of Shadow DOM?

You can. In `element.tsx`, skip `attachShadow` and mount React directly onto the element:

```js
connectedCallback() {
  this._root = createRoot(this);   // light DOM, no shadow
  this._render();
}
```

Your component now lives in the light DOM and **inherits everything** from the host — including unintended CSS side effects. Use this only if you explicitly want host-CSS inheritance (rare; most of the time the isolation is what you want).

### TL;DR for theme inheritance

1. Read host tokens with `var(--color-...)` — they cross the shadow boundary for free.
2. Add `:host { font: inherit; color: var(--color-on-surface); }` once per element.
3. Redefine `@keyframes` inside your stylesheet if you need animations.
4. Don't use `all: initial`. Don't hardcode colors.

That's it. Everything else is normal React.

---

## The build & install flow

### You (extension author)

```bash
cd extensions/community/my-ext
pnpm install
pnpm build        # produces dist/my-widget.esm.js (once)
# OR
pnpm dev          # watches src/ and rebuilds dist/ on every save
```

Commit `dist/` (or publish it via your extension distribution — tarball, git tag, registry, whatever Nexus uses).

### Host (at its startup, once)

1. Scans `extensions/`
2. Reads each `manifest.json`
3. Registers routes:
   - `GET /api/v1/extensions/my-ext/ui/dist/my-widget.esm.js`  → streams the file
   - `GET /api/v1/ui/layouts/my-ext.layout.main`               → returns the YAML tree
4. Adds `ext:my-ext:my-widget` to the component registry, pointing at the module URL

That's all the host does. **It never runs your TypeScript or your Vite config.** It serves one pre-built ESM file.

### Browser (at runtime, when the user opens your layout)

1. Loads the layout YAML
2. Sees `type: "ext:my-ext:my-widget"`, lazy `import("/api/v1/extensions/my-ext/ui/dist/my-widget.esm.js")`
3. The module's top-level side effect calls `customElements.define("ext-my-ext-my-widget", ...)`
4. The host's `<ContainerForCustomElement>` React component renders `<ext-my-ext-my-widget endpoint="...">` into its slot
5. The browser's Custom Elements machinery calls `connectedCallback()` on your element, which attaches a shadow root and mounts your React tree inside it
6. Done. Fully isolated, fully themed (via CSS variables), fully interactive.

---

## Dev loop

### Hot reload

- Run `pnpm dev` in your extension — Vite watches and rebuilds `dist/my-widget.esm.js` on every save (~100ms typically).
- Run `pnpm --dir apps/web dev` — the host web shell reloads your ESM via cache-busting query param in dev mode.
- Save a file in your extension → dist rebuilds → host detects change → browser re-imports → your element reconnects with the new code.

Round-trip: ~1 second.

### Debugging

- Your React tree is a normal React tree. React DevTools sees it (look for the shadow root entry).
- `console.log` from inside your component shows up in the regular browser console.
- Source maps work — breakpoints in your `.tsx` file just work.
- Network panel shows fetches from inside your component like any other app.

The only gotcha: DevTools "Elements" tab shows your shadow root as a collapsed child of `<ext-my-ext-my-widget>`. Click to expand.

---

## Do I *have* to use React?

No. Everything in `element.tsx` above is React-specific, but the only thing the host cares about is:

1. Your file defines a custom element with the right tag name
2. The element reacts to the `hostContext` property and `endpoint` attribute
3. It dispatches `ext-event` CustomEvents

You could implement that in plain DOM, Preact, Solid, Vue, Svelte, Lit, or htmx. The simplest extensions need no framework at all — just a plain `HTMLElement` subclass setting `this.shadowRoot.innerHTML`.

---

## Quick FAQ

**Q: Does the host understand TypeScript?**  
No. You ship compiled ESM. Your `tsc` / Vite does the TypeScript.

**Q: Can my extension use Tailwind / vanilla-extract / CSS modules?**  
Yes — whatever your build produces. Because you're inside a shadow root, your styles can't collide with host CSS.

**Q: Can I import from the host's npm packages?**  
Each extension bundles its own dependencies, including its React instance. Extensions do not share npm packages with the host at runtime.

**Q: Can my extension call the host API?**  
Yes. Use `fetch(hostCtx.apiBase + "/my-endpoint")`. The extension runs in the host's origin so cookies and auth flow naturally.

**Q: How big is the bundle?**  
A typical React extension with one component and no extra dependencies beyond React and ReactDOM is roughly 50 KB gzipped.

**Q: Do I have to use YAML to mount my element?**  
No — any layout YAML can reference any registered element. You can embed the element deep inside a `stack`, place it on its own page, or compose it with other host primitives.

**Q: What if two extensions want the same tag name?**  
They can't collide. The host prefixes every registered element tag with `ext-<extension-id>-`, so `my-widget` in `ext-a` becomes `<ext-ext-a-my-widget>`, and the same name in `ext-b` becomes `<ext-ext-b-my-widget>`.

---

## Related docs

- [extension-ui-guide.md](./extension-ui-guide.md) — YAML-only path (compose host primitives, no JS)
- [extension-ui-architecture.md](./extension-ui-architecture.md) — contract specifics: tag naming, style layering, packaging format
- [extension-guide.md](./extension-guide.md) — backend extension development (worker, operators, manifest)
