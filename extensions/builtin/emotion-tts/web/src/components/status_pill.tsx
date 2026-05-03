import type { CSSProperties, ReactNode } from "react";
import {
  pulseStyle,
  sizeStyle,
  toneStyle,
  type StatusPillSize,
  type StatusPillTone,
} from "./status_pill.css";

export type { StatusPillSize, StatusPillTone };

interface StatusPillProps {
  tone: StatusPillTone;
  size?: StatusPillSize;
  pulse?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function StatusPill({
  tone,
  size = "sm",
  pulse = false,
  children,
  className,
  style,
  title,
}: StatusPillProps): JSX.Element {
  const showPulse = pulse && tone !== "faint";
  const cls = [sizeStyle[size], toneStyle[tone], showPulse ? pulseStyle : null, className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} style={style} title={title}>
      {children}
    </span>
  );
}
