import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

const TAG = "ltx23-video-app";
const STYLESHEET_ID = "ltx23-video-stylesheet";

function ensureStylesheet(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLESHEET_ID)) return;
  const href = new URL("./ltx23-video.css", import.meta.url).href;
  const link = document.createElement("link");
  link.id = STYLESHEET_ID;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

ensureStylesheet();

class Ltx23VideoAppElement extends HTMLElement {
  private root: Root | null = null;

  connectedCallback(): void {
    this.root = createRoot(this);
    this.paint();
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
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
