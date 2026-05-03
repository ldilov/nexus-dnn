import { useCallback, useRef } from "react";
import type { KeyboardEvent } from "react";
import { toast } from "sonner";
import type { LayoutSummary, Workflow } from "../../../api/client";
import { Button } from "../../../components/base/button";
import { StatusChip, type StatusKind } from "../../../components/base/status_chip";
import { GraphView } from "../../workflows/components/canvas/graph_view";
import { ExtensionLayoutView } from "../../extensions/layout/layout.view";
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
  Exclude<DetailTabId, "recipe" | "graph">,
  StubCopy
> = {
  stages: {
    icon: "timeline",
    heading: "Stages",
    body: "Pipeline checkpoints with per-stage durations and cache hits — prepare, generate, persist, and any extension-declared stages with the operators grouped under them.",
    hint: "phase 3 · stub",
  },
  runs: {
    icon: "timer",
    heading: "Runs & Traces",
    body: "Per-run trace tree, span breakdown, and span-level logs. Selecting a run opens the per-node trace timeline so you can see status, progress, and per-node duration without leaving this page.",
    hint: "phase 3 · stub",
  },
  artifacts: {
    icon: "inventory_2",
    heading: "Artifacts",
    body: "Output artifacts produced by this deployment, browsable and downloadable. Lets you pick up yesterday's output without remembering which run produced it.",
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
  extensionLayout: LayoutSummary | null;
  /** Callback to surface a delete confirmation. When omitted, the Delete
   * button is hidden (e.g. for soft-deleted/already-purged states the
   * caller may suppress this affordance). */
  onRequestDelete?: () => void;
}

// Title splits into module (left, dim) + accent dash + name (right).
// Screen readers read the three sibling spans as "Module, em dash, Name"
// without intervention — we set aria-label on the <h1> to flatten the
// reading to a clean joined string, and aria-hide every visual child.
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
  extensionLayout,
  onRequestDelete,
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

  // WAI-ARIA APG Tabs — manual activation. Arrow keys move focus only;
  // selection still happens via Enter/Space/click on the focused tab.
  // This is the less-aggressive variant (no surprise tab switch when the
  // user is just sweeping with the keyboard).
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

  const handleHistory = () => onTabChange("runs");
  // TODO(host↔extension run-trigger contract): replace with a custom-event
  // dispatch on the extension custom element once the contract is defined.
  // See spec 038 — currently no host-driven validation surface exists.
  const handleValidate = () => {
    toast("Validation hook coming soon", {
      description: "Deployment-level validation is not wired yet.",
    });
  };
  // TODO(host↔extension run-trigger contract): the Run flow currently lives
  // inside the extension iframe (Recipe tab → Generate). Wire this to a
  // CustomEvent on the extension custom element when the contract lands.
  // See spec 038.
  const handleRun = () => {
    toast("Open the Recipe tab and use the Generate button", {
      description: "Host-driven Run requires a future host↔extension contract.",
    });
    onTabChange("recipe");
  };

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
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleHistory}
            >
              <span
                className={`material-symbols-outlined ${s.actionIcon}`}
                aria-hidden="true"
              >
                history
              </span>
              History
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleValidate}
            >
              <span
                className={`material-symbols-outlined ${s.actionIcon}`}
                aria-hidden="true"
              >
                verified
              </span>
              Validate
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleRun}
            >
              <span
                className={`material-symbols-outlined ${s.actionIcon}`}
                aria-hidden="true"
              >
                play_arrow
              </span>
              Run
            </Button>
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
        {tab === "recipe" && (
          <section
            id="panel-recipe"
            className={s.panelDocument}
            role="tabpanel"
            aria-labelledby="tab-recipe"
            tabIndex={0}
          >
            {extensionLayout ? (
              <div className={s.documentFrame}>
                <ExtensionLayoutView
                  layoutId={extensionLayout.id}
                  deploymentId={deploymentId}
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
        )}

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
                <GraphView workflow={workflow} nodeProgress={{}} />
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

        {tab !== "recipe" && tab !== "graph" && (
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
