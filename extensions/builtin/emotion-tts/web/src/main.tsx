import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createMemoryRouter, RouterProvider } from "react-router";
import { buildRoutes } from "./routes";
import "./theme/tokens.css";

const TAG = "emotion-tts-app";
const HOST_EVENT = "ext-event";
const STYLESHEET_ID = "emotion-tts-stylesheet";

const TWEAK_ATTRS = ["accent", "density", "card"] as const;
type TweakAttr = (typeof TWEAK_ATTRS)[number];

function readBodyTweak(name: TweakAttr): string | undefined {
  if (typeof document === "undefined" || !document.body) return undefined;
  return document.body.dataset[name];
}

function ensureStylesheet(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLESHEET_ID)) return;
  const href = new URL("./emotion-tts.css", import.meta.url).href;
  const link = document.createElement("link");
  link.id = STYLESHEET_ID;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

ensureStylesheet();

interface HostContext {
  apiBase?: string;
  themeTokens?: Record<string, string>;
}

class EmotionTtsAppElement extends HTMLElement {
  private root: Root | null = null;
  private ctx: HostContext | null = null;
  private observer: MutationObserver | null = null;

  static get observedAttributes(): string[] {
    return ["route", "deployment-id"];
  }

  connectedCallback(): void {
    this.root = createRoot(this);
    this.syncTweaksFromBody();
    this.observeBodyTweaks();
    this.paint();
  }

  attributeChangedCallback(): void {
    this.paint();
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = null;
    this.observer?.disconnect();
    this.observer = null;
  }

  private syncTweaksFromBody(): void {
    for (const name of TWEAK_ATTRS) {
      const value = readBodyTweak(name);
      if (value === undefined) {
        delete this.dataset[name];
      } else if (this.dataset[name] !== value) {
        this.dataset[name] = value;
      }
    }
  }

  private observeBodyTweaks(): void {
    if (typeof MutationObserver === "undefined" || !document.body) return;
    if (this.observer) this.observer.disconnect();
    this.observer = new MutationObserver(() => this.syncTweaksFromBody());
    this.observer.observe(document.body, {
      attributes: true,
      attributeFilter: TWEAK_ATTRS.map((name) => `data-${name}`),
    });
  }

  set hostContext(ctx: HostContext | null) {
    this.ctx = ctx;
    this.paint();
  }

  get hostContext(): HostContext | null {
    return this.ctx;
  }

  private paint(): void {
    if (!this.root || !this.isConnected) return;
    const route = this.resolveInitialEntry();
    const router = createMemoryRouter(buildRoutes(), { initialEntries: [route] });
    this.root.render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  }

  private resolveInitialEntry(): string {
    const explicit = this.getAttribute("route");
    if (explicit && explicit.length > 0) return explicit;
    const deployment = this.getAttribute("deployment-id");
    if (deployment && deployment.length > 0) return `/${deployment}/recipe`;
    return "/";
  }

  emitHostEvent(topic: string, payload: unknown): void {
    this.dispatchEvent(
      new CustomEvent(HOST_EVENT, {
        detail: { topic, payload },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

export function register(): void {
  if (typeof customElements === "undefined") return;
  if (customElements.get(TAG)) return;
  customElements.define(TAG, EmotionTtsAppElement);
}

if (typeof customElements !== "undefined" && !customElements.get(TAG)) {
  register();
}
