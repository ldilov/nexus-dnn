import type { LayoutDefinition } from "../../../api/client";
import { LayoutRenderer } from "../../../layout/layout_renderer";
import { Button } from "../../../components/base/button";
import * as styles from "./layout.css";

export type LayoutViewState =
  | { status: "loading" }
  | { status: "loaded"; layout: LayoutDefinition }
  | { status: "error"; message: string };

export interface ExtensionLayoutUIProps {
  state: LayoutViewState;
  onRetry: () => void;
  /**
   * Attributes injected onto the root custom element rendered by this
   * layout. The deployment-detail page uses this to pass
   * `deployment-id` so the mounted extension bundle routes to its
   * per-deployment views.
   */
  rootAttrs?: Record<string, string>;
  /**
   * Receives the root custom element once mounted. Used by the
   * deployment shell to wire the extension-action contract.
   */
  rootElementRef?: (el: HTMLElement | null) => void;
  /**
   * Deployment id surfaced to native registry renderers via
   * `LayoutContext`. Mirrors `rootAttrs["deployment-id"]`.
   */
  deploymentId?: string;
}

export function ExtensionLayoutUI({
  state,
  onRetry,
  rootAttrs,
  rootElementRef,
  deploymentId,
}: ExtensionLayoutUIProps) {
  if (state.status === "loading") {
    return (
      <div className={styles.stateShell} role="status" aria-live="polite">
        <div className={styles.spinner} aria-hidden="true" />
        <span className={styles.stateEyebrow}>Loading layout</span>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className={styles.stateShell} role="alert">
        <span className={styles.stateEyebrow}>Layout unavailable</span>
        <h2 className={styles.errorTitle}>Failed to load layout</h2>
        <p className={styles.stateMessage}>{state.message}</p>
        <Button variant="secondary" size="md" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <LayoutRenderer
        layout={state.layout}
        rootAttrs={rootAttrs}
        rootElementRef={rootElementRef}
        deploymentId={deploymentId}
      />
    </div>
  );
}
