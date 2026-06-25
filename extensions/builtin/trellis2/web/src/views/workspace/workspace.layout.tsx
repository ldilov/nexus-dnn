import type { ReactElement } from "react";
import { NavLink, Outlet, useParams } from "react-router";
import { Toaster } from "sonner";
import { GenerateRequestProvider } from "../../store/generate_request_store";
import * as styles from "./workspace.css";

interface TabDef {
  to: string;
  label: string;
}

const TABS: readonly TabDef[] = [
  { to: "generate", label: "Generate" },
  { to: "dag", label: "Workflow" },
];

export function WorkspaceLayout(): ReactElement {
  const { deploymentId } = useParams();
  const base = deploymentId ? `/${deploymentId}` : "";

  return (
    <GenerateRequestProvider>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <span className={styles.eyebrow}>GENERATIVE SURFACE · IMAGE TO 3D</span>
            <h1 className={styles.title}>TRELLIS 2</h1>
            <p className={styles.subtitle}>
              Turn a single image into a watertight 3D mesh with Microsoft TRELLIS.2. Upload a
              subject, tune the flow, and export a GLB.
            </p>
          </div>
          <nav className={styles.tabs} aria-label="Workspace sections">
            {TABS.map((tab) => (
              <NavLink
                key={tab.to}
                to={`${base}/${tab.to}`}
                className={({ isActive }) =>
                  [styles.tab, isActive ? styles.tabActive : ""].filter(Boolean).join(" ")
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-right" theme="dark" richColors />
    </GenerateRequestProvider>
  );
}
