import { type ReactElement, type ReactNode, useId, useState } from "react";
import {
  root,
  header,
  chevron,
  chevronCollapsed,
  titleBlock,
  title as titleStyle,
  description as descriptionStyle,
  badgeSlot,
  body,
} from "./tier_field_group.css";

export type TierFieldGroupProps = {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  defaultCollapsed?: boolean;
  collapsible?: boolean;
  className?: string;
  children: ReactNode;
};

export function TierFieldGroup({
  title,
  description,
  badge,
  defaultCollapsed = false,
  collapsible = true,
  className,
  children,
}: TierFieldGroupProps): ReactElement {
  const bodyId = useId();
  const [collapsed, setCollapsed] = useState(collapsible ? defaultCollapsed : false);

  const cls = [root, className].filter(Boolean).join(" ");
  const chevronCls = [chevron, collapsed ? chevronCollapsed : ""].filter(Boolean).join(" ");
  const isOpen = !collapsible || !collapsed;

  return (
    <section className={cls}>
      <button
        type="button"
        className={header}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        disabled={!collapsible}
        onClick={() => collapsible && setCollapsed((prev) => !prev)}
      >
        {collapsible && (
          <span className={chevronCls} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none">
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
        <span className={titleBlock}>
          <span className={titleStyle}>{title}</span>
          {description && <span className={descriptionStyle}>{description}</span>}
        </span>
        {badge && <span className={badgeSlot}>{badge}</span>}
      </button>
      {isOpen && (
        <div id={bodyId} className={body}>
          {children}
        </div>
      )}
    </section>
  );
}
