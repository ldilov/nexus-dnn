import type { ReactElement, ReactNode } from "react";
import { type BadgeTone, toneStyle } from "./badge.css";

export type { BadgeTone };

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "neutral", children, className }: BadgeProps): ReactElement {
  const cls = [toneStyle[tone], className].filter(Boolean).join(" ");
  return <span className={cls}>{children}</span>;
}
