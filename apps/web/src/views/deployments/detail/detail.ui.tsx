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
}

// Title splits into module (left, dim) + accent dash + name (right).
// Choice: derive moduleName host-side (from linkedModule) rather than
// parsing displayName — works for both EmotionTTS and Local LLM where
// the deployment name does not always include " — module ".
function renderTitle(moduleName: string | null, name: string) {
  if (!moduleName) {
    return <span className={s.titleName}>{name}</span>;
  }
  return (
    <>
      <span className={s.titleModule}>{moduleName}</span>
      <span className={s.titleSep}>—</span>
      <span className={s.titleName}>{name}</span>
    </>
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
  extensionLayout,
}: DeploymentDetailUIProps) {
  const name = displayName ?? "Deployment detail";

  const handleHistory = () => onTabChange("runs");
  const handleValidate = () => {
    toast("Validation hook coming soon", {
      description: "Deployment-level validation is not wired yet.",
    });
  };
  // The Run flow lives inside the extension iframe (Recipe tab → Generate).
  // The host can't trigger synth directly without a host↔extension run
  // contract that doesn't exist yet — file a future spec to wire this via
  // a custom event on the extension's custom element.
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
            <h1 className={s.title}>{renderTitle(moduleName, name)}</h1>
            <div className={s.meta}>
              <StatusChip
                kind={status}
                label={statusLabel}
                pulse={status === "live"}
              />
              <span className={s.metaSep}>·</span>
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
          </div>
        </div>
      </header>

      <div className={s.tabs} role="tablist" aria-label="Deployment tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={s.tab}
            onClick={() => onTabChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={s.body}>
        {tab === "recipe" && (
          <section
            className={s.panelDocument}
            role="tabpanel"
            aria-label="Recipe — extension UI"
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
            className={s.panelLive}
            role="tabpanel"
            aria-label="Workflow Graph — read-only"
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
            className={s.stub}
            role="tabpanel"
            aria-label={STUBS[tab].heading}
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
