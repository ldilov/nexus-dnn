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
   * per-deployment views (e.g. emotion-tts's RecipeView at
   * `/<id>/recipe`) instead of falling back to the deployments-index
   * landing page.
   */
  deploymentId?: string;
}

export function ExtensionLayoutView({ layoutId, deploymentId }: ExtensionLayoutViewProps) {
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
  return <ExtensionLayoutUI state={state} onRetry={load} rootAttrs={rootAttrs} />;
}
