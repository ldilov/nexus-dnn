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
}

export function ExtensionLayoutUI({ state, onRetry, rootAttrs, rootElementRef }: ExtensionLayoutUIProps) {
  if (state.status === "loading") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <span className={styles.loadingText}>Loading layout...</span>
      </div>
    );
  }
  if (state.status === "error") {
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorTitle}>Failed to load layout</span>
        <span className={styles.errorMessage}>{state.message}</span>
        <Button variant="secondary" size="md" onClick={onRetry}>
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <LayoutRenderer layout={state.layout} rootAttrs={rootAttrs} rootElementRef={rootElementRef} />
    </div>
  );
}
