import type { CSSProperties, ReactNode } from "react";
import { banner, type BannerSeverity } from "./banner.css";

interface BannerProps {
  severity: BannerSeverity;
  children: ReactNode;
  role?: "alert" | "status";
  ariaLive?: "polite" | "assertive";
  className?: string;
  style?: CSSProperties;
}

export function Banner({
  severity,
  children,
  role,
  ariaLive,
  className,
  style,
}: BannerProps): JSX.Element {
  const cls = [banner[severity], className].filter(Boolean).join(" ");
  const computedRole = role ?? (severity === "error" ? "alert" : "status");
  const computedLive = ariaLive ?? (severity === "error" ? "assertive" : "polite");
  return (
    <div className={cls} role={computedRole} aria-live={computedLive} style={style}>
      {children}
    </div>
  );
}
