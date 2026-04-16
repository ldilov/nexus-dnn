import type { ModuleIcon as ModuleIconDto } from "../api/client";
import { ModuleIcon } from "../components/module_icon";
import { style } from "@vanilla-extract/css";
import { vars } from "../styles";

const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.surfaceContainer,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.full,
  cursor: "pointer",
  color: vars.color.onSurface,
  fontFamily: vars.font.ui,
  fontSize: vars.text.labelS,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceContainerHigh,
      borderColor: vars.color.primary,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

interface ModuleBadgeProps {
  moduleId: string;
  displayName: string;
  icon: ModuleIconDto;
  onOpen?: (moduleId: string) => void;
}

export function ModuleBadge({
  moduleId,
  displayName,
  icon,
  onOpen,
}: ModuleBadgeProps) {
  return (
    <button
      type="button"
      className={chip}
      onClick={() => onOpen?.(moduleId)}
      aria-label={`Open module ${displayName}`}
      title={moduleId}
    >
      <ModuleIcon icon={icon} size={16} />
      <span>{displayName}</span>
    </button>
  );
}
