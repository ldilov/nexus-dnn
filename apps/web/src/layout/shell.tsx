import type { ReactNode } from "react";
import * as styles from "./shell.css";

type ShellProps = {
  topBar: ReactNode;
  leftRail: ReactNode;
  canvas: ReactNode;
  inspector: ReactNode;
};

export function Shell({ topBar, leftRail, canvas, inspector }: ShellProps) {
  return (
    <div className={styles.shellContainer}>
      <header className={styles.topBar}>{topBar}</header>
      <nav className={styles.leftRail}>{leftRail}</nav>
      <main className={styles.canvas}>{canvas}</main>
      <aside className={styles.inspector}>{inspector}</aside>
    </div>
  );
}
