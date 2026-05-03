import type { OperatorDto } from "../../api/client";
import { isSupportedWidget, type WidgetSpec } from "./widgets";
import { isSupportedPreview, type PreviewSpec } from "./previews";

export type NodeAccent = "purple" | "pink" | "cyan" | "orange" | "green" | "gray";

export type NodeUiSpec = {
  icon?: string;
  accent?: NodeAccent;
  widgets: Record<string, WidgetSpec>;
  preview?: PreviewSpec;
  resizable?: boolean;
  collapsible?: ("inputs" | "outputs" | "widgets")[];
};

const DEFAULT_SPEC: NodeUiSpec = { widgets: {} };

/**
 * Coerce the loose `operator.ui` field (shipped as `unknown` from the backend
 * so extensions can evolve it) into the strictly-typed `NodeUiSpec` the
 * renderer expects. Unknown widget / preview kinds are dropped rather than
 * throwing, so a partial or future-dated YAML never breaks the UI.
 */
export function readNodeUiSpec(spec: OperatorDto | null | undefined): NodeUiSpec {
  if (!spec) return DEFAULT_SPEC;
  const raw = (spec as { ui?: unknown }).ui;
  if (!raw || typeof raw !== "object") return DEFAULT_SPEC;
  const obj = raw as Record<string, unknown>;

  const widgetsRaw = obj.widgets;
  const widgets: Record<string, WidgetSpec> = {};
  if (widgetsRaw && typeof widgetsRaw === "object") {
    for (const [key, value] of Object.entries(widgetsRaw)) {
      if (isSupportedWidget(value)) widgets[key] = value;
    }
  }

  const preview = isSupportedPreview(obj.preview) ? (obj.preview as PreviewSpec) : undefined;

  return {
    icon: typeof obj.icon === "string" ? obj.icon : undefined,
    accent: typeof obj.accent === "string" ? (obj.accent as NodeAccent) : undefined,
    widgets,
    preview,
    resizable: obj.resizable === true,
    collapsible: Array.isArray(obj.collapsible)
      ? (obj.collapsible.filter(
          (s) => s === "inputs" || s === "outputs" || s === "widgets",
        ) as NodeUiSpec["collapsible"])
      : undefined,
  };
}

const ACCENT_COLORS: Record<NodeAccent, string> = {
  // audit-allow: hex — hex — neon decorative palette per design lang
  purple: "#ba9eff",
  // audit-allow: hex — hex — neon decorative palette per design lang
  pink: "#F472B6",
  // audit-allow: hex — hex — neon decorative palette per design lang
  cyan: "#22D3EE",
  // audit-allow: hex — hex — neon decorative palette per design lang
  orange: "#ff8439",
  // audit-allow: hex — hex — neon decorative palette per design lang
  green: "#34D399",
  // audit-allow: hex — hex — neon decorative palette per design lang
  gray: "#94A3B8",
};

export function accentColor(accent: NodeAccent | undefined): string {
  return accent ? ACCENT_COLORS[accent] : ACCENT_COLORS.purple;
}
