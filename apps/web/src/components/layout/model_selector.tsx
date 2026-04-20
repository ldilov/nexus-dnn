import { useCallback, useEffect, useState } from "react";
import { Button } from "../button";
import {
  fetchActiveModel,
  type ActiveModelBinding,
} from "../../services/local_llm_chat";
import { dispatchLayoutAction } from "../../layout/action_dispatch";
import * as styles from "./layout_styles.css";

export function ModelSelectorComponent() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [binding, setBinding] = useState<ActiveModelBinding | null>(null);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(
    (id: string | null, signal?: AbortSignal) => {
      if (!id) {
        setBinding(null);
        return;
      }
      setLoading(true);
      fetchActiveModel(id, signal)
        .then((b) => setBinding(b))
        .catch(() => setBinding(null))
        .finally(() => {
          if (!signal?.aborted) setLoading(false);
        });
    },
    [],
  );

  useEffect(() => {
    const ctrl = new AbortController();
    const onSelected = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      const id = ce.detail?.id ?? null;
      setThreadId(id);
      reload(id, ctrl.signal);
    };
    const onChanged = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      const id = ce.detail?.id ?? threadId;
      if (id) reload(id, ctrl.signal);
    };
    window.addEventListener("local-llm/thread:selected", onSelected);
    window.addEventListener("local-llm/session.state.changed", onChanged);
    return () => {
      ctrl.abort();
      window.removeEventListener("local-llm/thread:selected", onSelected);
      window.removeEventListener("local-llm/session.state.changed", onChanged);
    };
  }, [reload, threadId]);

  const label = binding
    ? binding.label
    : loading
      ? "Loading…"
      : threadId
        ? "Choose Model"
        : "Select a session";

  return (
    <div className={styles.actionBar}>
      <Button
        variant="secondary"
        size="sm"
        disabled={!threadId}
        onClick={() => void dispatchLayoutAction("llm.open_model_browser")}
        data-active-model={binding?.variant_id ?? ""}
      >
        {label}
      </Button>
    </div>
  );
}
