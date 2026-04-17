import { useState, useEffect } from "react";
import { fetchLayout, type LayoutDefinition } from "../../../api/client";
import { LayoutRenderer } from "../../../layout/layout_renderer";
import { Button } from "../../../components/button";
import * as styles from "./layout.css";

type ExtensionLayoutViewProps = {
  layoutId: string;
};

type ViewState =
  | { status: "loading" }
  | { status: "loaded"; layout: LayoutDefinition }
  | { status: "error"; message: string };

export function ExtensionLayoutView({ layoutId }: ExtensionLayoutViewProps) {
  const [state, setState] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    setState({ status: "loading" });
    fetchLayout(layoutId)
      .then((layout) => setState({ status: "loaded", layout }))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load layout";
        setState({ status: "error", message });
      });
  }, [layoutId]);

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
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setState({ status: "loading" });
            fetchLayout(layoutId)
              .then((layout) => setState({ status: "loaded", layout }))
              .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : "Failed to load layout";
                setState({ status: "error", message: msg });
              });
          }}
        >
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
