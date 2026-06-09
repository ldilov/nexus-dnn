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

const PHASE_LABELS: Record<string, string> = {
  probing: "Probing",
  resolving: "Resolving",
  downloading: "Downloading",
  extracting: "Extracting",
  installing: "Installing",
  verifying: "Verifying",
  running: "Running",
  done: "Done",
  packages: "Installing packages",
};

/**
 * Human label for a runner phase string. Falls back to a capitalized form of
 * the raw phase so unknown phases still read cleanly.
 */
function formatPhase(phase: string): string {
  const key = phase.trim().toLowerCase();
  if (key.length === 0) return "Working";
  return PHASE_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

function formatSpeed(bytesPerSecond: number): string {
  if (bytesPerSecond <= 0) return "—";
  return `${shortenSize(bytesPerSecond)}/s`;
}

function formatDuration(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return "—";
  const total = Math.round(seconds);
  if (total < 60) return `${total}s`;
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins > 0 ? `${hours}h ${remMins}m` : `${hours}h`;
}

export function presentation(step: DependencyStep): StepTypePresentation {
  return (
    STEP_TYPE_PRESENTATION[step.type] ?? {
      glyph: "•",
      label: step.type,
      subtitle: () => step.type,
    }
  );
}

export interface UninstallImpactEstimate {
  /** Number of model-weight steps the extension installed. */
  modelCount: number;
  /** Sum of on-disk bytes the model steps placed (upper-bound freed estimate). */
  modelBytes: number;
}

/**
 * Estimate what an uninstall removes from a dependency snapshot. Keeps the
 * `model_artifact` type discriminator inside this presentation module so the
 * host UI shell stays type-opaque (FR-005). The host's uninstall response is
 * authoritative; this only powers the pre-confirm copy.
 */
export function estimateUninstallImpact(
  steps: readonly DependencyStep[],
): UninstallImpactEstimate {
  let modelCount = 0;
  let modelBytes = 0;
  for (const step of steps) {
    if (step.type !== "model_artifact") continue;
    if (!step.satisfied && step.status !== "ok") continue;
    modelCount += 1;
    modelBytes += step.artifact?.bytes_placed ?? 0;
  }
  return { modelCount, modelBytes };
}

export { shortenSize, formatSpeed, formatDuration, formatPhase };
