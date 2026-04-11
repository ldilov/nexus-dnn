import { type ReactNode } from "react";
import * as styles from "./shell.css";

type ShellProps = {
  topBar: ReactNode;
  iconRail: ReactNode;
  secondaryPanel: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
  bottomDrawer: ReactNode;
  secondaryPanelVisible?: boolean;
  inspectorVisible?: boolean;
  bottomDrawerVisible?: boolean;
};

export function Shell({
  topBar,
  iconRail,
  secondaryPanel,
  canvas,
  inspector,
  bottomDrawer,
  secondaryPanelVisible = true,
  inspectorVisible = true,
  bottomDrawerVisible = false,
}: ShellProps) {
  const secondaryCls = secondaryPanelVisible
    ? styles.secondaryPanel
    : `${styles.secondaryPanel} ${styles.secondaryPanelCollapsed}`;

  const inspectorCls = inspectorVisible
    ? styles.inspector
    : `${styles.inspector} ${styles.inspectorCollapsed}`;

  const drawerCls = bottomDrawerVisible
    ? styles.bottomDrawer
    : `${styles.bottomDrawer} ${styles.bottomDrawerCollapsed}`;

  return (
    <div className={styles.shellContainer}>
      <header className={styles.topBar}>{topBar}</header>
      <nav className={styles.iconRail}>{iconRail}</nav>
      <aside className={secondaryCls}>{secondaryPanel}</aside>
      <main className={styles.canvas}>{canvas}</main>
      <aside className={inspectorCls}>{inspector}</aside>
      <section className={drawerCls}>{bottomDrawer}</section>
    </div>
  );
}
