import { type ReactNode } from "react";
import * as styles from "./shell.css";

type ShellProps = {
  topBar: ReactNode;
  sidebar: ReactNode;
  sidebarPinned: boolean;
  canvas: ReactNode;
  inspector: ReactNode;
  bottomDrawer: ReactNode;
  inspectorVisible?: boolean;
  bottomDrawerVisible?: boolean;
};

export function Shell({
  topBar,
  sidebar,
  sidebarPinned,
  canvas,
  inspector,
  bottomDrawer,
  inspectorVisible = true,
  bottomDrawerVisible = false,
}: ShellProps) {
  const shellCls = [
    styles.shellContainer,
    sidebarPinned ? styles.shellContainerSidebarPinned : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inspectorCls = inspectorVisible
    ? styles.inspector
    : `${styles.inspector} ${styles.inspectorCollapsed}`;

  const drawerCls = bottomDrawerVisible
    ? styles.bottomDrawer
    : `${styles.bottomDrawer} ${styles.bottomDrawerCollapsed}`;

  return (
    <>
      {sidebar}
      <div className={shellCls}>
        <header className={styles.topBar}>{topBar}</header>
        <main className={styles.canvas}>{canvas}</main>
        <aside className={inspectorCls}>{inspector}</aside>
        <section className={drawerCls}>{bottomDrawer}</section>
      </div>
    </>
  );
}
