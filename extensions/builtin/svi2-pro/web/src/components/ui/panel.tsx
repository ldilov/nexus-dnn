import type { ReactElement, ReactNode } from "react";
import * as styles from "./panel.css";

type PanelElevation = "default" | "raised" | "inset";

interface PanelProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  elevation?: PanelElevation;
}

const ELEVATION_CLASS: Record<PanelElevation, string> = {
  default: "",
  raised: styles.panelRaised,
  inset: styles.panelInset,
};

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  elevation = "default",
}: PanelProps): ReactElement {
  const cls = [styles.panel, ELEVATION_CLASS[elevation], className]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={cls}>
      {(title || actions) && (
        <header className={styles.panelHeader}>
          {title && <span className={styles.panelTitle}>{title}</span>}
          {description && <span className={styles.panelDescription}>{description}</span>}
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
