import { Fragment, type ReactNode } from "react";
import { StatusChip } from "../components/base/status_chip";
import * as styles from "./top_bar.css";

export type RuntimeChipKind = "live" | "idle" | "failed";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface TopBarProps {
  breadcrumbs: ReadonlyArray<BreadcrumbItem>;
  runtime: { kind: RuntimeChipKind; label: string };
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  profileInitials?: string;
  /** Optional slot for the tweak panel (US6). Rendered between the
   *  search affordance and notifications when supplied. */
  tweakPanel?: ReactNode;
}

export function TopBar({
  breadcrumbs,
  runtime,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  profileInitials = "·",
  tweakPanel,
}: TopBarProps) {
  return (
    <div className={styles.root}>
      <div className={styles.leftZone}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumbList}>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Fragment key={`${crumb.label}-${index}`}>
                <button
                  type="button"
                  className={styles.breadcrumbCrumb({ last: isLast })}
                  onClick={!isLast ? crumb.onClick : undefined}
                  disabled={isLast || !crumb.onClick}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </button>
                {!isLast && (
                  <span className={styles.breadcrumbSeparator} aria-hidden="true">
                    ›
                  </span>
                )}
              </Fragment>
            );
          })}
        </nav>
      </div>

      <div className={styles.rightZone}>
        <StatusChip
          kind={runtime.kind === "failed" ? "failed" : runtime.kind === "live" ? "live" : "idle"}
          label={runtime.label}
          pulse={runtime.kind === "live"}
        />
        <button
          type="button"
          className={styles.searchAffordance}
          onClick={onOpenSearch}
          aria-label="Search"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <span>Search</span>
        </button>
        {tweakPanel}
        <button
          type="button"
          className={styles.iconButton}
          onClick={onOpenNotifications}
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            notifications
          </span>
        </button>
        <button
          type="button"
          className={styles.profileAvatar}
          onClick={onOpenProfile}
          aria-label="Profile"
        >
          {profileInitials}
        </button>
      </div>
    </div>
  );
}
