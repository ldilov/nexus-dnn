import { type ReactElement, type ReactNode, useId, useState } from "react";
import * as styles from "./tier_field_group.css";

export type TierFieldGroupProps = {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  summary?: ReactNode;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  className?: string;
  children: ReactNode;
};

export function TierFieldGroup({
  title,
  description,
  badge,
  summary,
  defaultCollapsed = false,
  collapsible = true,
  className,
  children,
}: TierFieldGroupProps): ReactElement {
  const bodyId = useId();
  const [collapsed, setCollapsed] = useState(collapsible ? defaultCollapsed : false);

  const cls = [styles.root, className].filter(Boolean).join(" ");
  const chevronCls = [styles.chevron, collapsed ? styles.chevronCollapsed : ""]
    .filter(Boolean)
    .join(" ");
  const isOpen = !collapsible || !collapsed;

  return (
    <section className={cls}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        disabled={!collapsible}
        onClick={() => collapsible && setCollapsed((prev) => !prev)}
      >
        {collapsible && (
          <span className={chevronCls} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
              <title>toggle</title>
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        <span className={styles.titleBlock}>
          <span className={styles.title}>{title}</span>
          {description && <span className={styles.description}>{description}</span>}
        </span>
        {(summary || badge) && (
          <span className={styles.badgeSlot}>
            {summary && <span className={styles.summaryChip}>{summary}</span>}
            {badge}
          </span>
        )}
      </button>
      <div
        id={bodyId}
        className={[styles.bodyShell, isOpen ? styles.bodyShellOpen : ""].filter(Boolean).join(" ")}
        inert={!isOpen || undefined}
      >
        <div className={styles.bodyClip}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </section>
  );
}
