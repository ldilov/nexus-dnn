import { useCallback, useEffect, useState } from "react";
import { fetchLayout } from "../../../api/client";
import {
  ExtensionLayoutUI,
  type LayoutViewState,
} from "./layout.ui";

export interface ExtensionLayoutViewProps {
  layoutId: string;
}

export function ExtensionLayoutView({ layoutId }: ExtensionLayoutViewProps) {
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

  return <ExtensionLayoutUI state={state} onRetry={load} />;
}
