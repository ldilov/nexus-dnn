import type { ReactNode } from "react";
import { Button } from "../button";
import * as styles from "./layout_styles.css";

type PrimaryAction = {
  label: string;
  action?: string;
};

type EmptyStateProps = {
  icon?: string;
  title?: string;
  description?: string;
  primaryAction?: PrimaryAction;
  children?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  children,
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon && (
        <div className={styles.emptyStateIconBox}>
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "inherit",
              fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
            }}
          >
            {icon}
          </span>
        </div>
      )}
      {title && <h3 className={styles.emptyStateTitle}>{title}</h3>}
      {description && <p className={styles.emptyStateDescription}>{description}</p>}
      {primaryAction && (
        <Button variant="primary" size="md" data-action={primaryAction.action}>
          {primaryAction.label}
        </Button>
      )}
      {children}
    </div>
  );
}
