import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import {
  densityStyle,
  elevationStyle,
  header as headerStyle,
  toneStyle,
  type PanelDensity,
  type PanelElevation,
  type PanelTone,
} from "./panel.css";

export type { PanelDensity, PanelElevation, PanelTone };

interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "title"> {
  tone?: PanelTone;
  density?: PanelDensity;
  elevation?: PanelElevation;
  as?: "section" | "div" | "article" | "aside";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Panel({
  tone = "raised",
  density = "comfortable",
  elevation = "subtle",
  as: Tag = "section",
  children,
  className,
  style,
  ...rest
}: PanelProps): JSX.Element {
  const cls = [toneStyle[tone], densityStyle[density], elevationStyle[elevation], className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} style={style} data-elevation={elevation} {...rest}>
      {children}
    </Tag>
  );
}

interface PanelHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PanelHeader({ children, className }: PanelHeaderProps): JSX.Element {
  const cls = [headerStyle, className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}
