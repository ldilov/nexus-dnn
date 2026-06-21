import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { LayoutSummary, Workflow } from "../../../api/client";
import { Button } from "../../../components/base/button";
import { StatusChip, type StatusKind } from "../../../components/base/status_chip";
import { GraphView } from "../../workflows/components/canvas/graph_view";
import { ExtensionLayoutView } from "../../extensions/layout/layout.view";
import { ArtifactsView } from "./artifacts/artifacts.view";
import { RunsView } from "./runs/runs.view";
import {
  EXT_ACTIONS_DECLARE,
  EXT_ACTIONS_REQUEST,
  EXT_ACTION_INVOKE,
  EXT_ACTION_STATE,
  type ExtActionInvokeDetail,
  type ExtActionStateDetail,
  type ExtActionsDeclareDetail,
  type ExtensionActionDeclaration,
  type ExtensionActionSet,
  type ExtensionActionTone,
} from "../../../types/extension_actions";
import * as s from "./detail.css";

export type DetailTabId =
  | "recipe"
  | "graph"
  | "stages"
  | "runs"
  | "artifacts"
  | "settings"
  | "logs";

const TABS: readonly { id: DetailTabId; label: string }[] = [
  { id: "recipe", label: "Recipe" },
  { id: "graph", label: "Workflow Graph" },
  { id: "stages", label: "Stages" },
  { id: "runs", label: "Runs & Traces" },
  { id: "artifacts", label: "Artifacts" },
  { id: "settings", label: "Settings" },
  { id: "logs", label: "Logs" },
];

interface StubCopy {
  icon: string;
  heading: string;
  body: string;
  hint: string;
}

const STUBS: Record<
  Exclude<DetailTabId, "recipe" | "graph" | "artifacts" | "runs">,
  StubCopy
> = {
  stages: {
    icon: "timeline",
    heading: "Stages",
    body: "Pipeline checkpoints with per-stage durations and cache hits — prepare, generate, persist, and any extension-declared stages with the operators grouped under them.",
    hint: "phase 3 · stub",
  },
  settings: {
    icon: "tune",
    heading: "Settings",
    body: "Deployment-level configuration — restore policy, env vars, secrets, recipe overrides.",
    hint: "stub",
  },
  logs: {
    icon: "terminal",
    heading: "Logs",
    body: "Streaming stdout / stderr from the deployment runtime.",
    hint: "stub",
  },
};

export interface DeploymentDetailUIProps {
  deploymentId: string;
  displayName: string | null;
  slug: string | null;
  /** Module name shown left-of-dash in the title. Derived host-side. */
  moduleName: string | null;
  /** "live" if the host has any active runtime lease; otherwise "ready". */
  status: StatusKind;
  statusLabel: string;
  tab: DetailTabId;
  onTabChange: (tab: DetailTabId) => void;
  onBack: () => void;
  workflow: Workflow | null;
  workflowLoading: boolean;
  /** Live per-node run status from the host event bus — drives the Workflow
   * Graph tab's execution overlay. Empty map when no run is active. */
  nodeProgress: Record<string, { status: string; progress: number }>;
  /** Active run id for the live graph's port-value overlay; null when idle. */
  runId: string | null;
  extensionLayout: LayoutSummary | null;
  /** The owning extension id for the deployment, when bound to one. Drives the
   * generic `/api/v1/extensions/{ext-id}/...` mount path for extension-owned
   * surfaces (artifacts list/download/zip/delete). The host shell stays opaque
   * about which extension this is. */
  extensionId: string | null;
  /** Callback to surface a delete confirmation. When omitted, the Delete
   * button is hidden (e.g. for soft-deleted/already-purged states the
   * caller may suppress this affordance). */
  onRequestDelete?: () => void;
  onRequestExport?: () => void;
  /** Callback to begin an in-deployment import-replace (file picker + confirm).
   * When omitted, the Import button is hidden. */
  onRequestImport?: () => void;
}

function renderTitle(moduleName: string | null, name: string) {
  if (!moduleName) {
    return <span className={s.titleName}>{name}</span>;
  }
  return (
    <>
      <span className={s.titleModule} aria-hidden="true">
        {moduleName}
      </span>
      <span className={s.titleSep} aria-hidden="true">
        —
      </span>
      <span className={s.titleName} aria-hidden="true">
        {name}
      </span>
    </>
  );
}

function buildTitleAriaLabel(moduleName: string | null, name: string): string {
  if (!moduleName) return name;
  return `${moduleName} ${name}`;
}

function mergeActionState(
  prev: ExtensionActionSet | null,
  updated: ExtensionActionDeclaration,
): ExtensionActionSet | null {
  if (!prev) return prev;
  if (prev.primary.id === updated.id) {
    return { ...prev, primary: { ...prev.primary, ...updated } };
  }
  if (prev.secondary && prev.secondary.id === updated.id) {
    return { ...prev, secondary: { ...prev.secondary, ...updated } };
  }
  return prev;
}

const TONE_TO_VARIANT: Record<ExtensionActionTone, "primary" | "secondary" | "danger"> = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
};

interface ExtensionActionButtonProps {
  action: ExtensionActionDeclaration;
  fallbackVariant: "primary" | "secondary";
  onInvoke: (id: string) => void;
}

function ExtensionActionButton({ action, fallbackVariant, onInvoke }: ExtensionActionButtonProps) {
  const variant = action.tone ? TONE_TO_VARIANT[action.tone] : fallbackVariant;
  const loading = action.state === "loading";
  const disabled = loading || action.state === "disabled";
  return (
    <Button
      type="button"
      variant={variant}
      size="sm"
      disabled={disabled}
      aria-busy={loading || undefined}
      title={action.tooltip}
      onClick={() => onInvoke(action.id)}
    >
      {loading ? (
        <span className={s.actionSpinner} aria-hidden="true" />
      ) : action.icon ? (
        <span
          className={`material-symbols-outlined ${s.actionIcon}`}
          aria-hidden="true"
        >
          {action.icon}
        </span>
      ) : null}
      {action.label}
    </Button>
  );
}

export function DeploymentDetailUI({
  deploymentId,
  displayName,
  slug,
  moduleName,
  status,
  statusLabel,
  tab,
  onTabChange,
  onBack,
  workflow,
  workflowLoading,
  nodeProgress,
  runId,
  extensionLayout,
  extensionId,
  onRequestDelete,
  onRequestExport,
  onRequestImport,
}: DeploymentDetailUIProps) {
  const name = displayName ?? "Deployment detail";
  const titleAriaLabel = buildTitleAriaLabel(moduleName, name);

  const tabRefs = useRef<Map<DetailTabId, HTMLButtonElement>>(new Map());
  const setTabRef = useCallback(
    (id: DetailTabId) => (el: HTMLButtonElement | null) => {
      if (el) tabRefs.current.set(id, el);
      else tabRefs.current.delete(id);
    },
    [],
  );

  const handleTabKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      const order = TABS;
      const activeIdx = order.findIndex((t) => t.id === tab);
      let nextIdx: number | null = null;
      switch (event.key) {
        case "ArrowRight":
          nextIdx = (activeIdx + 1) % order.length;
          break;
        case "ArrowLeft":
          nextIdx = (activeIdx - 1 + order.length) % order.length;
          break;
        case "Home":
          nextIdx = 0;
          break;
        case "End":
          nextIdx = order.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      const nextEntry = order[nextIdx];
      if (!nextEntry) return;
      const nextId = nextEntry.id;
      onTabChange(nextId);
      // Defer focus to the next paint so the just-activated tab is
      // tabIndex=0 by the time we focus it.
      requestAnimationFrame(() => {
        tabRefs.current.get(nextId)?.focus();
      });
    },
    [onTabChange, tab],
  );

  const [actions, setActions] = useState<ExtensionActionSet | null>(null);
  const [hostEl, setHostEl] = useState<HTMLElement | null>(null);

  const handleElementRef = useCallback((el: HTMLElement | null) => {
    setHostEl(el);
    if (!el) {
      setActions(null);
    }
  }, []);

  useEffect(() => {
    const el = hostEl;
    if (!el) return;

    const handleDeclare = (event: Event) => {
      const detail = (event as CustomEvent<ExtActionsDeclareDetail>).detail;
      setActions(detail?.actions ?? null);
    };
    const handleState = (event: Event) => {
      const detail = (event as CustomEvent<ExtActionStateDetail>).detail;
      const updated = detail?.action;
      if (!updated) return;
      setActions((prev) => mergeActionState(prev, updated));
    };

    el.addEventListener(EXT_ACTIONS_DECLARE, handleDeclare);
    el.addEventListener(EXT_ACTION_STATE, handleState);

    // Ask for the current action set. Extensions that don't implement
    // the contract simply won't reply — slots stay empty.
    el.dispatchEvent(
      new CustomEvent(EXT_ACTIONS_REQUEST, { bubbles: false }),
    );

    return () => {
      el.removeEventListener(EXT_ACTIONS_DECLARE, handleDeclare);
      el.removeEventListener(EXT_ACTION_STATE, handleState);
    };
  }, [hostEl, extensionLayout?.id]);

  const handleInvoke = useCallback((id: string) => {
    if (!hostEl) return;
    const detail: ExtActionInvokeDetail = { id };
    hostEl.dispatchEvent(
      new CustomEvent(EXT_ACTION_INVOKE, { detail, bubbles: false }),
    );
  }, [hostEl]);

  return (
    <div className={s.root}>
      <button type="button" className={s.backLink} onClick={onBack}>
        <span
          className={`material-symbols-outlined ${s.backIcon}`}
          aria-hidden="true"
        >
          arrow_back
        </span>
        Back to deployments
      </button>

      <header className={s.header}>
        <div className={s.headerRow}>
          <div className={s.titleBlock}>
            <h1 className={s.title} aria-label={titleAriaLabel}>
              {renderTitle(moduleName, name)}
            </h1>
            <div className={s.meta}>
              <div role="status" aria-live="polite">
                <StatusChip
                  kind={status}
                  label={statusLabel}
                  pulse={status === "live"}
                />
              </div>
              <span className={s.metaSep} aria-hidden="true">
                ·
              </span>
              <span className={s.recipeIdLabel}>
                recipe{" "}
                <span className={s.recipeIdValue}>
                  {slug ?? deploymentId}
                </span>
              </span>
            </div>
          </div>

          <div className={s.actions}>
            {actions?.secondary && (
              <ExtensionActionButton
                action={actions.secondary}
                fallbackVariant="secondary"
                onInvoke={handleInvoke}
              />
            )}
            {actions?.primary && (
              <ExtensionActionButton
                action={actions.primary}
                fallbackVariant="primary"
                onInvoke={handleInvoke}
              />
            )}
            {onRequestImport && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onRequestImport}
                aria-label={
                  displayName
                    ? `Import into deployment ${displayName}`
                    : "Import into deployment"
                }
              >
                <span
                  className={`material-symbols-outlined ${s.actionIcon}`}
                  aria-hidden="true"
                >
                  upload
                </span>
                Import
              </Button>
            )}
            {onRequestExport && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onRequestExport}
                aria-label={
                  displayName
                    ? `Export deployment ${displayName}`
                    : "Export deployment"
                }
              >
                <span
                  className={`material-symbols-outlined ${s.actionIcon}`}
                  aria-hidden="true"
                >
                  download
                </span>
                Export
              </Button>
            )}
            {onRequestDelete && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={onRequestDelete}
                aria-label={
                  displayName
                    ? `Delete deployment ${displayName}`
                    : "Delete deployment"
                }
              >
                <span
                  className={`material-symbols-outlined ${s.actionIcon}`}
                  aria-hidden="true"
                >
                  delete
                </span>
                Delete
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className={s.tabs} role="tablist" aria-label="Deployment tabs">
        {TABS.map((t) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              ref={setTabRef(t.id)}
              id={`tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              className={s.tab}
              onClick={() => onTabChange(t.id)}
              onKeyDown={handleTabKeyDown}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className={s.body}>
        {/* Recipe stays MOUNTED across tab switches — it hosts the extension's
            own app (filled inputs + in-flight render state). Conditionally
            unmounting it would destroy that state; hide it instead. */}
        <section
          id="panel-recipe"
          className={s.panelDocument}
          role="tabpanel"
          aria-labelledby="tab-recipe"
          tabIndex={0}
          hidden={tab !== "recipe"}
          style={tab === "recipe" ? undefined : { display: "none" }}
        >
          {extensionLayout ? (
            <div className={s.documentFrame}>
              <ExtensionLayoutView
                layoutId={extensionLayout.id}
                deploymentId={deploymentId}
                rootElementRef={handleElementRef}
              />
            </div>
          ) : (
            <div className={s.fallbackNote}>
              This deployment's source extension hasn't registered a Recipe
              layout yet. Once it does, the extension's own UI renders here —
              same surface as the Extensions tab.
            </div>
          )}
        </section>

        {tab === "graph" && (
          <section
            id="panel-graph"
            className={s.panelLive}
            role="tabpanel"
            aria-labelledby="tab-graph"
            tabIndex={0}
          >
            {workflowLoading && (
              <div className={s.fallbackNote}>Loading workflow graph…</div>
            )}
            {!workflowLoading && workflow && (
              <div className={s.realGraphFrame}>
                <GraphView workflow={workflow} nodeProgress={nodeProgress} runId={runId} />
              </div>
            )}
            {!workflowLoading && !workflow && (
              <div className={s.fallbackNote}>
                Can't resolve a workflow for this deployment. Either the source
                module has no workflow bound (blank module), or the deployment
                was created from a revision we can't look up.
              </div>
            )}
          </section>
        )}

        {tab === "runs" && (
          <section
            id="panel-runs"
            className={s.panelLive}
            role="tabpanel"
            aria-labelledby="tab-runs"
            tabIndex={0}
          >
            <RunsView deploymentId={deploymentId} extensionId={extensionId} />
          </section>
        )}

        {tab === "artifacts" && (
          <section
            id="panel-artifacts"
            className={s.panelLive}
            role="tabpanel"
            aria-labelledby="tab-artifacts"
            tabIndex={0}
          >
            <ArtifactsView
              deploymentId={deploymentId}
              extensionId={extensionId}
            />
          </section>
        )}

        {tab !== "recipe" && tab !== "graph" && tab !== "artifacts" && tab !== "runs" && (
          <section
            id={`panel-${tab}`}
            className={s.stub}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            tabIndex={0}
          >
            <span
              className={`material-symbols-outlined ${s.stubGlyph}`}
              aria-hidden="true"
            >
              {STUBS[tab].icon}
            </span>
            <div className={s.stubTitle}>{STUBS[tab].heading}</div>
            <div className={s.stubBody}>{STUBS[tab].body}</div>
            <div className={s.stubHint}>{STUBS[tab].hint}</div>
          </section>
        )}
      </div>
    </div>
  );
}
