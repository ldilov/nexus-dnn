import { useEffect, useState } from "react";
import {
  fetchActiveModelStatus,
  type ActiveModelStatusPayload,
// audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
} from "../services/local_llm_chat";
import { subscribeSessionEvents } from "../services/event_streams";

export type ModelPhase = "idle" | "loading" | "ready" | "failed";

export interface ModelLoadState {
  phase: ModelPhase;
  label?: string;
  familyId?: string;
  variantId?: string;
  reason?: string;
  port?: number;
}

function fromStatus(s: ActiveModelStatusPayload | null): ModelLoadState {
  if (!s) return { phase: "idle" };
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

export function useModelLoadState(threadId: string | null): ModelLoadState {
  const [state, setState] = useState<ModelLoadState>({ phase: "idle" });

  useEffect(() => {
    if (!threadId) {
      setState({ phase: "idle" });
      return;
    }
    const ctrl = new AbortController();
    fetchActiveModelStatus(threadId, ctrl.signal)
      .then((s) => setState(fromStatus(s)))
      .catch(() => {});

    const sub = subscribeSessionEvents(threadId, (ev) => {
      setState((prev) => {
        switch (ev.cause) {
          case "model_loading":
            return {
              phase: "loading",
              label: ev.label,
              familyId: ev.familyId,
              variantId: ev.variantId,
            };
          case "model_ready":
            return {
              phase: "ready",
              label: ev.label ?? prev.label,
              familyId: ev.familyId ?? prev.familyId,
              variantId: ev.variantId ?? prev.variantId,
              port: ev.port ?? prev.port,
            };
          case "model_load_failed":
            return {
              phase: "failed",
              label: ev.label ?? prev.label,
              familyId: ev.familyId ?? prev.familyId,
              variantId: ev.variantId ?? prev.variantId,
              reason: ev.reason,
            };
          case "model_unloaded":
          case "model_unavailable":
            return { phase: "idle" };
          default:
            return prev;
        }
      });
    });

    const rePoll = setTimeout(() => {
      fetchActiveModelStatus(threadId, ctrl.signal)
        .then((s) => setState(fromStatus(s)))
        .catch(() => {});
    }, 400);

    return () => {
      clearTimeout(rePoll);
      ctrl.abort();
      sub.close();
    };
  }, [threadId]);

  return state;
}
