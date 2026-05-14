import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const TAG = "ltx23-video-app";

// Resolve the bundle's CSS at module-evaluation time so we can inject
// it into each shadow root individually. The build emits
// `dist/ltx23-video.css` alongside the JS bundle; the import.meta.url
// trick lets that work whether the host loads us from /assets/ or
// from an extension-served static path.
const STYLESHEET_HREF = new URL("./ltx23-video.css", import.meta.url).href;

class Ltx23VideoAppElement extends HTMLElement {
  private root: Root | null = null;
  private shadow: ShadowRoot | null = null;

  connectedCallback(): void {
    // Open shadow DOM so each LTX UI mount is fully isolated from the
    // host's CSS. Without this, vanilla-extract's `globalStyle` rules
    // would target the host body / inputs and the host's design system
    // would target ours. `mode: "open"` lets debuggers + the host's own
    // automation poke at the tree if they need to, while keeping
    // accidental rule bleed-through impossible.
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: "open" });
      this.injectStylesheet(this.shadow);
    }
    this.root = createRoot(this.shadow);
    this.paint();
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
  }

  private injectStylesheet(root: ShadowRoot): void {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = STYLESHEET_HREF;
    root.appendChild(link);
  }

  private paint(): void {
    if (!this.root) return;
    this.root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

if (!customElements.get(TAG)) {
  customElements.define(TAG, Ltx23VideoAppElement);
}

export function register(): void {
  if (!customElements.get(TAG)) {
    customElements.define(TAG, Ltx23VideoAppElement);
  }
}
