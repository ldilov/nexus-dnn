import type { ReactElement } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { GenerateRequestProvider } from "../../store/generate_request_store";
import { ViewSwitcher } from "./components/view_switcher";
import * as styles from "./workspace.css";

export function WorkspaceLayout(): ReactElement {
  const location = useLocation();
  const active = location.pathname.endsWith("/head-refine") ? "head-refine" : "generate";
  return (
    <GenerateRequestProvider>
      <div className={styles.shell}>
        <div className={styles.glow} aria-hidden="true" />
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <span className={styles.eyebrow}>GENERATIVE SURFACE · PHOTO TO 3D HEAD</span>
            <h1 className={styles.title}>Face Avatar</h1>
            <p className={styles.subtitle}>
              Turn one photo of a person into an identity-preserving 3D head, or graft that
              identity face onto an existing base mesh. Non-commercial models (FLAME / Arc2Avatar).
            </p>
          </div>
          <ViewSwitcher active={active} />
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-right" theme="dark" richColors />
    </GenerateRequestProvider>
  );
}
