import { statusBadgeRecipe } from "./status_badge.css";

export type BadgeStatus =
  | "active"
  | "disabled"
  | "invalid"
  | "running"
  | "completed"
  | "failed"
  | "pending";

type StatusBadgeProps = {
  status: BadgeStatus;
  label?: string;
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={statusBadgeRecipe({ status })}>
      {label ?? status}
    </span>
  );
}
