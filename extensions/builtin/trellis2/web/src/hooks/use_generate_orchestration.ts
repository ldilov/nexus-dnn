import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { dispatchGenerateState, subscribeTriggerGenerate } from "../app_events";
import { ExtensionApiError } from "../services/http";
import { useGenerateRequest } from "../store/generate_request_store";

export interface GenerateOrchestration {
  blocked: boolean;
  busy: boolean;
  submit: () => Promise<void>;
  cancel: () => Promise<void>;
}

/** Bridges the form store to the host action bar: validates, fires the start
 * call on the host's primary-action trigger, and mirrors busy/blocked back. */
export function useGenerateOrchestration(): GenerateOrchestration {
  const { imageRef, generate, startJob, cancelJob } = useGenerateRequest();

  const blocked = !imageRef;
  const busy = generate.phase === "running";

  const submit = useCallback(async () => {
    if (blocked) {
      toast.error("Upload an input image before generating.");
      return;
    }
    try {
      await startJob();
      toast.success("Generation started.");
    } catch (err) {
      const message =
        err instanceof ExtensionApiError ? err.message : "Could not start the generation.";
      toast.error(message);
    }
  }, [blocked, startJob]);

  const cancel = useCallback(async () => {
    try {
      await cancelJob();
    } catch {
      toast.error("Could not cancel the generation.");
    }
  }, [cancelJob]);

  useEffect(() => subscribeTriggerGenerate(() => void submit()), [submit]);

  useEffect(() => {
    dispatchGenerateState({ busy, blocked });
  }, [busy, blocked]);

  return { blocked, busy, submit, cancel };
}
