import type { ReactElement, ReactNode } from "react";
import * as styles from "./panel.css";

type PanelElevation = "default" | "raised" | "inset";

interface PanelProps {
  eyebrow?: ReactNode;
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
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  elevation = "default",
}: PanelProps): ReactElement {
  const cls = [styles.panel, ELEVATION_CLASS[elevation], className].filter(Boolean).join(" ");
  const hasHeader = Boolean(eyebrow || title || actions);
  return (
    <section className={cls}>
      {hasHeader && (
        <header className={styles.panelHeader}>
          <div className={styles.panelHeading}>
            {eyebrow && <span className={styles.panelEyebrow}>{eyebrow}</span>}
            {title && <span className={styles.panelTitle}>{title}</span>}
            {description && <span className={styles.panelDescription}>{description}</span>}
          </div>
          {actions && <div className={styles.panelActions}>{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
