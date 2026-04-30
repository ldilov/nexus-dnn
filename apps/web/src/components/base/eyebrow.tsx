import type { ReactNode } from "react";
import { eyebrow, eyebrowAccent } from "./eyebrow.css";

interface EyebrowProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export function Eyebrow({ children, accent = false, className }: EyebrowProps) {
  const cls = [eyebrow, accent ? eyebrowAccent : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}
