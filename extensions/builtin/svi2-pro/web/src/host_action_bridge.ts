import {
  dispatchTriggerRender,
  subscribeRenderState,
  type RenderStateDetail,
} from "./app_events";

interface ActionDecl {
  id: string;
  label: string;
  icon?: string;
  tone?: "primary" | "secondary" | "danger";
  state?: "idle" | "loading" | "disabled";
  tooltip?: string;
}

interface ActionSet {
  primary: ActionDecl;
  secondary?: ActionDecl;
}

const EXT_ACTIONS_REQUEST = "ext-actions-request";
const EXT_ACTIONS_DECLARE = "ext-actions-declare";
const EXT_ACTION_STATE = "ext-action-state";
const EXT_ACTION_INVOKE = "ext-action-invoke";

export const INTERNAL_NAVIGATE = "svi2-pro:navigate";

const ACTION_RENDER = "svi2-pro.render";

interface BridgeHandle {
  dispose: () => void;
}

export function attachActionBridge(host: HTMLElement, _deploymentId: string): BridgeHandle {
  let busy = false;
  let blocked = false;

  const buildPrimary = (): ActionDecl => ({
    id: ACTION_RENDER,
    label: busy ? "Rendering…" : "Render",
    icon: busy ? "hourglass_top" : "movie",
    tone: "primary",
    state: busy ? "loading" : blocked ? "disabled" : "idle",
    tooltip: blocked
      ? "Fix the highlighted fields before rendering"
      : "Start the SVI 2.0 Pro render",
  });

  const buildSet = (): ActionSet => ({
    primary: buildPrimary(),
  });

  const dispatchDeclare = () => {
    host.dispatchEvent(
      new CustomEvent(EXT_ACTIONS_DECLARE, { detail: { actions: buildSet() }, bubbles: false }),
    );
  };

  const dispatchPrimaryState = () => {
    host.dispatchEvent(
      new CustomEvent(EXT_ACTION_STATE, { detail: { action: buildPrimary() }, bubbles: false }),
    );
  };

  const handleRequest = () => dispatchDeclare();

  const handleInvoke = (event: Event) => {
    const id = (event as CustomEvent<{ id?: string }>).detail?.id;
    if (id === ACTION_RENDER) {
      dispatchTriggerRender();
    }
  };

  const unsubscribeRenderState = subscribeRenderState((detail: RenderStateDetail) => {
    busy = detail.busy;
    blocked = detail.blocked;
    dispatchPrimaryState();
  });

  host.addEventListener(EXT_ACTIONS_REQUEST, handleRequest);
  host.addEventListener(EXT_ACTION_INVOKE, handleInvoke);
  dispatchDeclare();

  return {
    dispose: () => {
      unsubscribeRenderState();
      host.removeEventListener(EXT_ACTIONS_REQUEST, handleRequest);
      host.removeEventListener(EXT_ACTION_INVOKE, handleInvoke);
    },
  };
}
