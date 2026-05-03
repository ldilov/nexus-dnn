import type { ReactNode } from "react";
import { floatingInspector, floatingInspectorOverlap } from "./floating_inspector.css";

interface FloatingInspectorProps {
  children: ReactNode;
  overlap?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function FloatingInspector({ children, overlap = false, className, ariaLabel }: FloatingInspectorProps) {
  const cls = [floatingInspector, overlap ? floatingInspectorOverlap : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <aside className={cls} aria-label={ariaLabel}>
      {children}
    </aside>
  );
}
