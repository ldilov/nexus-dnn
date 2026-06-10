/**
 * Spec 053 — DependencyStatusChip.
 *
 * Generic, host-owned readiness chip for any extension. Keyed purely by `:id`
 * with zero extension-id literals and zero per-step-type logic. Reads the same
 * readiness source as `DependencyGate` (`useDependencyReadiness`) so the two
 * never diverge, and links to the deps settings surface.
 */
import { Link } from "react-router";

import { useDependencyReadiness } from "./use_dependency_readiness";
import * as s from "./dependency_status_chip.css";

export interface DependencyStatusChipProps {
  extensionId: string;
}

export function DependencyStatusChip({ extensionId }: DependencyStatusChipProps) {
  const { ready, missingCount, hasManagedDeps, isLoading, error } =
    useDependencyReadiness(extensionId);

  if (isLoading) {
    return (
      <span
        className={`${s.chip} ${s.tone.loading}`}
        role="status"
        aria-label="Checking dependencies"
      >
        <span className={`${s.dot} ${s.dotTone.loading}`} aria-hidden="true" />
        Checking…
      </span>
    );
  }

  if (error || !hasManagedDeps) {
    return null;
  }

  const href = `/extensions/${encodeURIComponent(extensionId)}/settings?tab=dependencies`;
  const tone = ready ? "ready" : "missing";
  const label = ready ? "Ready" : `${missingCount} missing`;
  const ariaLabel = ready
    ? "Dependencies ready"
    : `${missingCount} dependencies missing — open setup`;
  const glyph = ready ? "✓" : "⚠";

  return (
    <Link
      to={href}
      className={`${s.chip} ${s.tone[tone]}`}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <span className={`${s.dot} ${s.dotTone[tone]}`} aria-hidden="true" />
      <span aria-hidden="true">{glyph}</span>
      {label}
    </Link>
  );
}
