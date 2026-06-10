import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { dispatchRenderState, subscribeTriggerRender } from "../../../app_events";
import {
  hasBlockingErrors,
  validateRenderParams,
  type ValidationIssue,
} from "../../../domain/validation";
import { ExtensionApiError } from "../../../services/http";
import { useRenderRequest } from "../../../store/render_request_store";

export interface FocusRequest {
  field: ValidationIssue["field"];
  token: number;
}

export function useRenderOrchestration() {
  const {
    params,
    presetId,
    refImageName,
    lastImageName,
    render,
    startRenderJob,
    cancelRenderJob,
  } = useRenderRequest();

  const issues = useMemo(
    () =>
      validateRenderParams(params, {
        presetId,
        hasRefImage: Boolean(refImageName),
        hasLastImage: Boolean(lastImageName),
        presetParams: params,
      }),
    [params, presetId, refImageName, lastImageName],
  );

  const blocked = hasBlockingErrors(issues);
  const busy = render.phase === "running";

  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);

  const submit = useCallback(async () => {
    if (blocked) {
      const firstError = issues.find((i) => i.severity === "error");
      if (firstError) {
        setFocusRequest({ field: firstError.field, token: Date.now() });
      }
      toast.error("Fix the highlighted fields before rendering.");
      return;
    }
    try {
      await startRenderJob();
      toast.success("Render started.");
    } catch (err) {
      const message =
        err instanceof ExtensionApiError ? err.message : "Could not start the render.";
      toast.error(message);
    }
  }, [blocked, issues, startRenderJob]);

  const cancel = useCallback(async () => {
    try {
      await cancelRenderJob();
    } catch {
      toast.error("Could not cancel the render.");
    }
  }, [cancelRenderJob]);

  useEffect(() => subscribeTriggerRender(() => void submit()), [submit]);

  useEffect(() => {
    dispatchRenderState({ busy, blocked });
  }, [busy, blocked]);

  return { issues, blocked, busy, submit, cancel, focusRequest };
}
