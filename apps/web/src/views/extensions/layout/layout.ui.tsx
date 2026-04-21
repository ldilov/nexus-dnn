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
}

export function ExtensionLayoutUI({ state, onRetry }: ExtensionLayoutUIProps) {
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
      <LayoutRenderer layout={state.layout} />
    </div>
  );
}
