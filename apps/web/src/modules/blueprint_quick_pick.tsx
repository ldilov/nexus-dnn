import { useCallback, useEffect, useRef } from "react";
import type { RecipeRef } from "../api/client";
import { menu, item, name, desc, primaryDot } from "./blueprint_quick_pick.css";

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
