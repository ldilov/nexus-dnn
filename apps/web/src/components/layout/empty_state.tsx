import type { ReactNode } from "react";
import { Button } from "../base/button";
import * as styles from "./layout_styles.css";

type PrimaryAction = {
  label: string;
  action?: string;
  onClick?: () => void;
};

type EmptyStateProps = {
  icon?: string;
  count?: string | number;
  title?: string;
  description?: string;
  line?: string;
  primaryAction?: PrimaryAction;
  children?: ReactNode;
};

export function EmptyState({
  icon,
  count,
  title,
  description,
  line,
  primaryAction,
  children,
}: EmptyStateProps) {
  const showCountPattern = count !== undefined || (line !== undefined && !title && !description);

  if (showCountPattern) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateCount}>{count ?? "0"}</div>
        {line && <p className={styles.emptyStateLine}>{line}</p>}
        {primaryAction && (
          <Button
            variant="primary"
            size="md"
            data-action={primaryAction.action}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className={styles.emptyState}>
      {icon && (
        <div className={styles.emptyStateIconBox}>
          <span className={`material-symbols-outlined ${styles.iconInheritFilled}`}>
            {icon}
          </span>
        </div>
      )}
      {title && <h3 className={styles.emptyStateTitle}>{title}</h3>}
      {description && <p className={styles.emptyStateDescription}>{description}</p>}
      {primaryAction && (
        <Button
          variant="primary"
          size="md"
          data-action={primaryAction.action}
          onClick={primaryAction.onClick}
        >
          {primaryAction.label}
        </Button>
      )}
      {children}
    </div>
  );
}
