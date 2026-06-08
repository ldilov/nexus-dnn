import type { ReactElement, ReactNode } from "react";
import * as styles from "./panel.css";

interface PanelProps {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
}: PanelProps): ReactElement {
  const cls = [styles.panel, className].filter(Boolean).join(" ");
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
