import type { ReactElement, ReactNode } from "react";
import * as styles from "./empty_state.css";

interface EmptyStateProps {
  title: ReactNode;
  detail?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, detail, action, className }: EmptyStateProps): ReactElement {
  const cls = [styles.root, className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span className={styles.title}>{title}</span>
      {detail && <span className={styles.detail}>{detail}</span>}
      {action}
    </div>
  );
}
