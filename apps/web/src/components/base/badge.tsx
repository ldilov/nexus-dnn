import { badgeRecipe, dot as dotRecipe } from "./badge.css";

type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error";
type BadgeModality = "image" | "video" | "audio" | "text" | "model" | "system";
type BadgeSize = "sm" | "md";

type BadgeProps = {
  label: string;
  size?: BadgeSize;
  intent?: BadgeIntent;
  modality?: BadgeModality;
  showDot?: boolean;
  mono?: boolean;
  className?: string;
};

export function Badge({
  label,
  size,
  intent,
  modality,
  showDot = false,
  mono,
  className,
}: BadgeProps) {
  const cls = [badgeRecipe({ size, intent, modality, mono }), className]
    .filter(Boolean)
    .join(" ");

  const dotColor = intent === "success"
    ? "success"
    : intent === "warning"
      ? "warning"
      : intent === "error"
        ? "error"
        : intent === "info"
          ? "info"
          : "neutral";

  return (
    <span className={cls}>
      {showDot && <span className={dotRecipe({ color: dotColor })} />}
      {label}
    </span>
  );
}
