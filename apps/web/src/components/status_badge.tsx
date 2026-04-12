import { Badge } from "./badge";

type BadgeStatus = "active" | "disabled" | "invalid" | "running" | "completed" | "failed" | "pending";

const STATUS_TO_INTENT: Record<BadgeStatus, "neutral" | "info" | "success" | "warning" | "error"> = {
  active: "success",
  disabled: "neutral",
  invalid: "error",
  running: "info",
  completed: "success",
  failed: "error",
  pending: "neutral",
};

type StatusBadgeProps = {
  status: BadgeStatus;
  label?: string;
};

/** @deprecated Use Badge component directly */
export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <Badge
      label={label ?? status}
      intent={STATUS_TO_INTENT[status]}
      showDot
      size="sm"
    />
  );
}

export type { BadgeStatus };
