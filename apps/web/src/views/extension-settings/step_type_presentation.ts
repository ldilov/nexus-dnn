/**
 * Spec 035 — UI-side presentation map keyed by step `type` discriminator.
 * Adding a new step type to the host's `HandlerRegistry` is one new entry
 * here. The host backend stays type-string opaque (FR-005); this map is
 * the only place the frontend pattern-matches on type.
 */
import type { DependencyStep } from "../../types/extension_dependencies";

export interface StepTypePresentation {
  /** Glyph rendered in the step row's leading icon tile. */
  glyph: string;
  /** Short human-readable type label. */
  label: string;
  /** One-line subtitle template that summarises the spec block. */
  subtitle: (step: DependencyStep) => string;
}

function shortenSize(bytes: number): string {
  if (bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v >= 10 ? v.toFixed(0) : v.toFixed(1)} ${units[i]}`;
}

export const STEP_TYPE_PRESENTATION: Record<string, StepTypePresentation> = {
  runtime: {
    glyph: "λ",
    label: "Runtime",
    subtitle: (step) => {
      const family = String(step.artifact?.summary?.split(" ")[0] ?? "language runtime");
      return family;
    },
  },
  package_set: {
    glyph: "{}",
    label: "Packages",
    subtitle: (step) => step.artifact?.summary ?? "third-party packages",
  },
  system_binary: {
    glyph: "▣",
    label: "Binary",
    subtitle: (step) => step.artifact?.summary ?? "prebuilt binary",
  },
  model_artifact: {
    glyph: "✦",
    label: "Model",
    subtitle: (step) => {
      const summary = step.artifact?.summary;
      if (summary) return summary;
      const remaining = step.estimated_remaining_bytes;
      return remaining > 0 ? `model weights · ${shortenSize(remaining)}` : "model weights";
    },
  },
  validation: {
    glyph: "✓",
    label: "Validation",
    subtitle: () => "worker handshake",
  },
};

export function presentation(step: DependencyStep): StepTypePresentation {
  return (
    STEP_TYPE_PRESENTATION[step.type] ?? {
      glyph: "•",
      label: step.type,
      subtitle: () => step.type,
    }
  );
}

export { shortenSize };
