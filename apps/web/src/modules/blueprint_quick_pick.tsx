import { useCallback, useEffect, useRef } from "react";
import type { RecipeRef } from "../api/client";
import { style } from "@vanilla-extract/css";
import { vars } from "../styles";

const menu = style({
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: vars.space.xs,
  minWidth: "240px",
  background: vars.color.surfaceContainerHigh,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
  boxShadow: `0 8px 24px ${vars.color.shadowElevation}`,
  padding: vars.space.xs,
  zIndex: vars.z.overlay,
  display: "flex",
  flexDirection: "column",
  gap: "1px",
});

const item = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  textAlign: "left",
  color: vars.color.onSurface,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.ui,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainerHighest },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "-2px",
    },
  },
});

const name = style({
  fontSize: vars.text.bodyS,
  fontWeight: 500,
});

const desc = style({
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

const primaryDot = style({
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  marginRight: vars.space.xs,
});

interface BlueprintQuickPickProps {
  blueprints: readonly RecipeRef[];
  onSelect: (recipeId: string) => void;
  onClose: () => void;
}

export function BlueprintQuickPick({
  blueprints,
  onSelect,
  onClose,
}: BlueprintQuickPickProps) {
  const firstBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleClick = useCallback(
    (recipeId: string) => {
      onSelect(recipeId);
    },
    [onSelect],
  );

  return (
    <div
      className={menu}
      role="menu"
      onClick={(e) => e.stopPropagation()}
    >
      {blueprints.map((bp, idx) => (
        <button
          key={bp.recipe_id}
          ref={idx === 0 ? firstBtn : undefined}
          type="button"
          role="menuitem"
          className={item}
          onClick={() => handleClick(bp.recipe_id)}
        >
          <span className={name}>
            {bp.is_primary && <span className={primaryDot} aria-hidden="true" />}
            {bp.display_name}
          </span>
          {bp.description && <span className={desc}>{bp.description}</span>}
        </button>
      ))}
    </div>
  );
}
