/**
 * Per-extension action contract for the deployment-detail shell.
 *
 * The host shell renders up to 2 extension-declared buttons in the
 * deployment header (a required "primary" entry-point and an optional
 * "secondary" custom action). The host treats action objects as opaque
 * data delivered via custom events on the embedded extension custom
 * element — it never knows what the action does.
 *
 * Wire protocol:
 *   1. Host dispatches `ext-actions-request` on the custom element on
 *      mount (and may re-dispatch on demand).
 *   2. Extension responds with `ext-actions-declare` whose detail is an
 *      `ExtensionActionSet` ({ primary, secondary? }).
 *   3. Extension fires `ext-action-state` whenever the label/state of an
 *      action changes (e.g. Run → Stop, idle → loading).
 *   4. Host dispatches `ext-action-invoke` with `{ id }` when the user
 *      clicks one of the host shell buttons.
 *
 * Hosts that see no `ext-actions-declare` simply hide the primary +
 * secondary slots — the contract is opt-in.
 */

export type ExtensionActionTone = "primary" | "secondary" | "danger";
export type ExtensionActionRuntimeState = "idle" | "loading" | "disabled";

export interface ExtensionActionDeclaration {
  /** Stable identifier owned by the extension (e.g. "acme.demo.run"). */
  id: string;
  /** Visible button label. May change at runtime. */
  label: string;
  /** Optional Material Symbols icon name. */
  icon?: string;
  /** Visual tone hint; the host applies its own theme. */
  tone?: ExtensionActionTone;
  /** Runtime state — "loading" disables + spins the host shell button. */
  state?: ExtensionActionRuntimeState;
  /** Optional tooltip / aria description. */
  tooltip?: string;
}

/**
 * Complete action set declared by an extension. `primary` is the
 * deployment's main entry-point; `secondary` is an optional per-extension
 * custom action.
 */
export interface ExtensionActionSet {
  primary: ExtensionActionDeclaration;
  secondary?: ExtensionActionDeclaration;
}

/** CustomEvent topic strings — single source of truth for both sides. */
export const EXT_ACTIONS_REQUEST = "ext-actions-request";
export const EXT_ACTIONS_DECLARE = "ext-actions-declare";
export const EXT_ACTION_STATE = "ext-action-state";
export const EXT_ACTION_INVOKE = "ext-action-invoke";

export interface ExtActionsDeclareDetail {
  actions: ExtensionActionSet | null;
}

export interface ExtActionStateDetail {
  /** Action whose state/label is being updated. */
  action: ExtensionActionDeclaration;
}

export interface ExtActionInvokeDetail {
  id: string;
}
