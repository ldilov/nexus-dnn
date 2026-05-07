import { useEffect, useState } from "react";
import {
  fetchRuntimeStatus,
  type ActiveModelStatusPayload,
// audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
} from "../../services/local_llm_chat";
import type { ModelLoadState } from "../../hooks/use_model_load_state";

const POLL_INTERVAL_MS = 4000;

function fromStatus(s: ActiveModelStatusPayload | null): ModelLoadState {
  if (!s) return { phase: "idle" };
  if (s.status !== "loading" && s.status !== "ready" && s.status !== "failed") {
    return { phase: "idle" };
  }
  const binding = s.binding;
  return {
    phase: s.status,
    label: s.label ?? binding?.label,
    familyId: s.family_id ?? binding?.family_id,
    variantId: s.variant_id ?? binding?.variant_id,
    reason: s.reason,
    port: s.port,
  };
}

export function useLocalLlmRuntimeStatus(): ModelLoadState {
  const [state, setState] = useState<ModelLoadState>({ phase: "idle" });

  useEffect(() => {
    let active = true;
    const ctrl = new AbortController();

    const poll = () => {
      fetchRuntimeStatus(ctrl.signal)
        .then((s) => {
          if (!active) return;
          setState(fromStatus(s));
        })
        .catch(() => {});
    };

    poll();
    const intervalId = window.setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      active = false;
      ctrl.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  return state;
}
