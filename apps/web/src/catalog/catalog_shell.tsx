import type { ReactNode } from "react";
import type { CatalogGroup, Groupable } from "./catalog_grouping";
import * as styles from "./catalog_shell.css";

export interface CatalogShellProps<T extends Groupable> {
  groups: ReadonlyArray<CatalogGroup<T>>;
  renderCard: (item: T, group: CatalogGroup<T>) => ReactNode;
  renderGroupAction?: (group: CatalogGroup<T>) => ReactNode;
  gridClassName: string;
  banner?: ReactNode;
  emptyTitle?: string;
  emptyHint?: string;
}

export function CatalogShell<T extends Groupable>({
  groups,
  renderCard,
  renderGroupAction,
  gridClassName,
  banner,
  emptyTitle = "Nothing to show here yet",
  emptyHint = "Install an extension or create a new item to populate this catalog.",
}: CatalogShellProps<T>) {
  if (groups.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <div className={styles.emptyTitle}>{emptyTitle}</div>
        <div className={styles.emptyHint}>{emptyHint}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {banner ? <div className={styles.bannerInfo}>{banner}</div> : null}
      {groups.map((group) => (
        <section key={group.key} className={styles.group}>
          <header className={styles.groupHeader}>
            <div className={styles.groupLabel}>
              <span className={styles.groupName}>{group.label}</span>
              {group.version ? (
                <span className={styles.groupVersion}>v{group.version}</span>
              ) : null}
              <span className={styles.groupCount}>
                {group.items.length} item{group.items.length === 1 ? "" : "s"}
              </span>
            </div>
            {renderGroupAction ? (
              <div className={styles.groupActions}>{renderGroupAction(group)}</div>
            ) : null}
          </header>
          <div className={gridClassName}>
            {group.items.map((item) => renderCard(item, group))}
          </div>
        </section>
      ))}
    </div>
  );
}
