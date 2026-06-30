import type { ReactElement } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { GenerateRequestProvider } from "../../store/generate_request_store";
import * as styles from "./workspace.css";

export function WorkspaceLayout(): ReactElement {
  return (
    <GenerateRequestProvider>
      <div className={styles.shell}>
        <div className={styles.glow} aria-hidden="true" />
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <span className={styles.eyebrow}>GENERATIVE SURFACE · IMAGE TO 3D</span>
            <h1 className={styles.title}>TRELLIS 2</h1>
            <p className={styles.subtitle}>
              Turn a single image into a watertight 3D mesh with Microsoft TRELLIS.2. Upload a
              subject, tune the flow, and export a GLB.
            </p>
          </div>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-right" theme="dark" richColors />
    </GenerateRequestProvider>
  );
}
