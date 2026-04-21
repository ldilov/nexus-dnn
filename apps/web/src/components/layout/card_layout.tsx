import type { ReactNode } from "react";
import { Card } from "../base/card";
import * as styles from "./layout_styles.css";

type CardLayoutProps = {
  title?: string;
  variant?: "default" | "interactive" | "outlined";
  children?: ReactNode;
};

export function CardLayout({ title, variant = "default", children }: CardLayoutProps) {
  return (
    <Card variant={variant}>
      {title && <div className={styles.cardLayoutTitle}>{title}</div>}
      {children}
    </Card>
  );
}
