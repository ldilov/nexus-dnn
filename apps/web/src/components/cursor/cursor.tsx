import { type ReactElement, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import {
  cursor,
  cursorActivityInference,
  cursorActivityLoad,
  cursorActivityRest,
  cursorReducedMotion,
} from "./cursor.css";

export type CursorActivityLevel = "rest" | "inference" | "load";

export interface CursorProps {
  ownerBlockId: string | null;
  activityLevel: CursorActivityLevel;
}

const ACTIVITY_CLASS: Record<CursorActivityLevel, string> = {
  rest: cursorActivityRest,
  inference: cursorActivityInference,
  load: cursorActivityLoad,
};

export function Cursor(props: CursorProps): ReactElement | null {
  const { ownerBlockId, activityLevel } = props;
  const reducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (import.meta.env?.MODE === "production") return;
    const all = document.querySelectorAll("[data-cursor]");
    if (all.length > 1) {
      console.warn(
        `[Cursor] Single-cursor invariant violated: ${all.length} [data-cursor] elements detected.`,
      );
    }
  });

  if (ownerBlockId === null) return null;

  const className = [
    cursor,
    ACTIVITY_CLASS[activityLevel],
    reducedMotion ? cursorReducedMotion : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      data-cursor=""
      data-owner-block-id={ownerBlockId}
      data-activity-level={activityLevel}
      data-reduced-motion={reducedMotion ? "true" : undefined}
      className={className}
      aria-hidden="true"
    />
  );
}
