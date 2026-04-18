import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import * as styles from "./workspace_shell.css";
import * as layoutStyles from "./layout_styles.css";

export type ToolbarAction = {
  id: string;
  icon?: string;
  label: string;
  drawerId: string;
};

export type DrawerConfig = {
  id: string;
  title: string;
  width?: number;
  body: ReactNode;
};

type WorkspaceShellProps = {
  eyebrow?: string;
  toolbarActions: ToolbarAction[];
  drawers: DrawerConfig[];
  children?: ReactNode;
};

export function WorkspaceShell({ eyebrow, toolbarActions, drawers, children }: WorkspaceShellProps) {
  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const close = useCallback(() => {
    const previousTrigger = openDrawerId ? triggerRefs.current[openDrawerId] : null;
    setOpenDrawerId(null);
    if (previousTrigger) {
      previousTrigger.focus();
    }
  }, [openDrawerId]);

  useEffect(() => {
    if (!openDrawerId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDrawerId, close]);

  const activeDrawer = drawers.find((d) => d.id === openDrawerId) ?? null;
  const titleId = activeDrawer ? `workspace-drawer-title-${activeDrawer.id}` : undefined;

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar}>
        {eyebrow && <span className={styles.toolbarEyebrow}>{eyebrow}</span>}
        <div className={styles.toolbarSpacer} />
        <div className={styles.toolbarActions}>
          {toolbarActions.map((action) => {
            const isOpen = openDrawerId === action.drawerId;
            const cls = [styles.toolbarButton, isOpen ? styles.toolbarButtonActive : ""].filter(Boolean).join(" ");
            return (
              <button
                key={action.id}
                ref={(el) => {
                  triggerRefs.current[action.drawerId] = el;
                }}
                type="button"
                className={cls}
                aria-expanded={isOpen}
                aria-controls={`workspace-drawer-${action.drawerId}`}
                onClick={() => setOpenDrawerId(isOpen ? null : action.drawerId)}
              >
                {action.icon && (
                  <span className={`material-symbols-outlined ${layoutStyles.iconMd}`}>
                    {action.icon}
                  </span>
                )}
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.content}>
        {children}
        {activeDrawer && (
          <>
            <div
              className={styles.backdrop}
              onClick={close}
              aria-hidden="true"
            />
            <aside
              id={`workspace-drawer-${activeDrawer.id}`}
              className={styles.drawer}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              style={{ width: `${activeDrawer.width ?? 480}px`, maxWidth: "90vw" }}
            >
              <div className={styles.drawerHeader}>
                <span id={titleId} className={styles.drawerTitle}>
                  {activeDrawer.title}
                </span>
                <button
                  type="button"
                  className={styles.drawerCloseButton}
                  onClick={close}
                  aria-label="Close"
                >
                  <span className={`material-symbols-outlined ${layoutStyles.iconInherit}`}>
                    close
                  </span>
                </button>
              </div>
              <div className={styles.drawerBody}>{activeDrawer.body}</div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
}
