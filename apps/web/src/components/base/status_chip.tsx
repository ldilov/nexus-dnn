import type { ReactNode } from "react";
import { chip, chipDot, chipDotPulse, chipKind, type StatusKind } from "./status_chip.css";

export type { StatusKind };

interface StatusChipProps {
  kind: StatusKind;
  label: ReactNode;
  pulse?: boolean;
}

export function StatusChip({ kind, label, pulse = false }: StatusChipProps) {
  const cls = [chip, chipKind[kind]].join(" ");
  const dotCls = [chipDot, pulse ? chipDotPulse : ""].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      {kind !== "ai" ? (
        <span className={dotCls} aria-hidden="true" data-testid="status-chip-dot" />
      ) : null}
      <span>{label}</span>
    </span>
  );
}
