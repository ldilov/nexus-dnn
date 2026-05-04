import { useCallback, useEffect, useState } from "react";
import { fetchLayout } from "../../../api/client";
import {
  ExtensionLayoutUI,
  type LayoutViewState,
} from "./layout.ui";

export interface ExtensionLayoutViewProps {
  layoutId: string;
  /**
   * Optional deployment context. When set, the bundle's root custom
   * element receives `deployment-id="<id>"` so it can route to its
   * per-deployment views (e.g. `/<id>/recipe`) instead of falling
   * back to its index landing page.
   */
  deploymentId?: string;
  /**
   * Receives the root custom element once mounted. The deployment shell
   * uses this to dispatch / listen for the per-extension action contract
   * (see `apps/web/src/types/extension_actions.ts`).
   */
  rootElementRef?: (el: HTMLElement | null) => void;
}

export function ExtensionLayoutView({ layoutId, deploymentId, rootElementRef }: ExtensionLayoutViewProps) {
  const [state, setState] = useState<LayoutViewState>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    fetchLayout(layoutId)
      .then((layout) => setState({ status: "loaded", layout }))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load layout";
        setState({ status: "error", message });
      });
  }, [layoutId]);

  useEffect(() => {
    load();
  }, [load]);

  const rootAttrs = deploymentId ? { "deployment-id": deploymentId } : undefined;
  return (
    <ExtensionLayoutUI
      state={state}
      onRetry={load}
      rootAttrs={rootAttrs}
      rootElementRef={rootElementRef}
    />
  );
}
