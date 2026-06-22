import { Fragment, type ReactNode } from "react";
import { StatusChip } from "../components/base/status_chip";
import * as styles from "./top_bar.css";

export type RuntimeChipKind = "live" | "idle" | "failed";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface RuntimeBadge {
  kind: RuntimeChipKind;
  label: string;
}

export type GcState = "idle" | "loading" | "done" | "error";

export interface TopBarProps {
  breadcrumbs: ReadonlyArray<BreadcrumbItem>;
  host: RuntimeBadge;
  runtimes: RuntimeBadge;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  profileInitials?: string;
  /** Optional slot for the tweak panel (US6). Rendered between the
   *  search affordance and notifications when supplied. */
  tweakPanel?: ReactNode;
  /** Broadcast a memory-release to every live runtime. When provided,
   *  a power-action button is rendered before notifications. */
  onFreeMemory?: () => void;
  gcState?: GcState;
  /** Open the off-canvas navigation drawer. The hamburger that triggers it
   *  is only visible below the tablet breakpoint. */
  onOpenNav?: () => void;
}

const GC_BUTTON_BY_STATE: Record<
  GcState,
  { icon: string; spin: boolean; disabled: boolean; ariaLabel: string }
> = {
  idle: {
    icon: "memory",
    spin: false,
    disabled: false,
    ariaLabel: "Free GPU memory",
  },
  loading: {
    icon: "sync",
    spin: true,
    disabled: true,
    ariaLabel: "Freeing memory…",
  },
  done: {
    icon: "check_circle",
    spin: false,
    disabled: true,
    ariaLabel: "Memory freed",
  },
  error: {
    icon: "memory",
    spin: false,
    disabled: false,
    ariaLabel: "Free GPU memory (last attempt failed)",
  },
};

export function TopBar({
  breadcrumbs,
  host,
  runtimes,
  onOpenSearch,
  onOpenNotifications,
  onOpenProfile,
  profileInitials = "·",
  tweakPanel,
  onFreeMemory,
  gcState = "idle",
  onOpenNav,
}: TopBarProps) {
  const gc = GC_BUTTON_BY_STATE[gcState];
  return (
    <div className={styles.root}>
      {onOpenNav && (
        <button
          type="button"
          className={styles.hamburger}
          onClick={onOpenNav}
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            menu
          </span>
        </button>
      )}
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
        <div className={styles.statusCluster}>
          <StatusChip
            kind={host.kind === "live" ? "live" : "failed"}
            label={host.label}
            pulse={host.kind === "live"}
          />
          <StatusChip
            kind={runtimes.kind === "live" ? "live" : "failed"}
            label={runtimes.label}
            pulse={runtimes.kind === "live"}
          />
        </div>
        <button
          type="button"
          className={styles.searchAffordance}
          onClick={onOpenSearch}
          aria-label="Search"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <span className={styles.searchLabel}>Search</span>
        </button>
        {tweakPanel}
        {onFreeMemory && (
          <button
            type="button"
            className={styles.gcButton}
            onClick={onFreeMemory}
            disabled={gc.disabled}
            aria-label={gc.ariaLabel}
            title={
              gcState === "idle" || gcState === "error"
                ? "Free all GPU memory across running runtimes — interrupts active renders"
                : undefined
            }
          >
            <span
              className={`material-symbols-outlined${gc.spin ? ` ${styles.spinningIcon}` : ""}`}
              aria-hidden="true"
            >
              {gc.icon}
            </span>
          </button>
        )}
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
