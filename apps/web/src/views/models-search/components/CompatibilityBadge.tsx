import type { CompatibilityStatus } from "../../../services/model_store";
import * as s from "./CompatibilityBadge.css";

const LABELS: Record<CompatibilityStatus, string> = {
  compatible: "Ready",
  compatible_with_requirements: "Needs setup",
  downloadable_but_not_runnable: "Download only",
  unsupported: "Unsupported",
  unknown: "Unknown",
};

const SHAPES: Record<CompatibilityStatus, string> = {
  compatible: s.shapeCompatible,
  compatible_with_requirements: s.shapeReqs,
  downloadable_but_not_runnable: s.shapeDl,
  unsupported: s.shapeUnsupported,
  unknown: s.shapeUnknown,
};

interface CompatibilityBadgeProps {
  status: CompatibilityStatus;
}

/**
 * Non-color-only compatibility indicator (NFR-007). Conveys state via
 * shape (dot / ring / dashed ring), text label, and colour together —
 * so the signal survives any single channel failing.
 */
export function CompatibilityBadge({ status }: CompatibilityBadgeProps) {
  const className = `${s.badge} ${s.badgeVariants[status]}`;
  return (
    <span
      className={className}
      role="status"
      aria-label={`Compatibility: ${LABELS[status]}`}
    >
      <span className={SHAPES[status]} aria-hidden="true" />
      {LABELS[status]}
    </span>
  );
}
