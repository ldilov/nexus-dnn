import type { LayoutSummary, Workflow } from "../../../api/client";
import { GraphView } from "../../workflows/components/canvas/graph_view";
import { ExtensionLayoutView } from "../../extensions/layout/layout.view";
import * as s from "./detail.css";

export type DetailTabId = "recipe" | "graph" | "stages" | "runs" | "artifacts";

const TABS: readonly { id: DetailTabId; label: string }[] = [
  { id: "recipe", label: "Recipe" },
  { id: "graph", label: "Workflow Graph" },
  { id: "stages", label: "Stages" },
  { id: "runs", label: "Runs & Traces" },
  { id: "artifacts", label: "Artifacts" },
];

const STILL_PENDING_COPY: Record<
  Exclude<DetailTabId, "recipe" | "graph">,
  { heading: string; body: string }
> = {
  stages: {
    heading: "Stages — lifecycle phases",
    body:
      "Prepare, generate, persist, and any extension-declared stages with the operators grouped under them. Lets you reason about where a run spends time before you open a trace.",
  },
  runs: {
    heading: "Runs & Traces — timeline + per-node heat",
    body:
      "The last N runs of this deployment, most recent first. Selecting a run opens the per-node trace timeline so you can see status, progress, and per-node duration without leaving this page.",
  },
  artifacts: {
    heading: "Artifacts — produced outputs",
    body:
      "The artifacts emitted by successful runs — images, audio, text, JSON blobs — filtered to this deployment. Lets you pick up yesterday's output without remembering which run produced it.",
  },
};

export interface DeploymentDetailUIProps {
  deploymentId: string;
  displayName: string | null;
  slug: string | null;
  tab: DetailTabId;
  onTabChange: (tab: DetailTabId) => void;
  onBack: () => void;
  workflow: Workflow | null;
  workflowLoading: boolean;
  extensionLayout: LayoutSummary | null;
}

export function DeploymentDetailUI({
  deploymentId,
  displayName,
  slug,
  tab,
  onTabChange,
  onBack,
  workflow,
  workflowLoading,
  extensionLayout,
}: DeploymentDetailUIProps) {
  return (
    <div className={s.root}>
      <button type="button" className={s.backLink} onClick={onBack}>
        ← Back to deployments
      </button>

      <header className={s.hero}>
        <h1 className={s.title}>{displayName ?? "Deployment detail"}</h1>
        <div className={s.slug}>{slug ?? deploymentId}</div>
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

      {tab === "recipe" && (
        <section
          className={s.panelLive}
          role="tabpanel"
          aria-label="Recipe — extension chat UI"
        >
          {extensionLayout ? (
            <div className={s.chatFrame}>
              <ExtensionLayoutView layoutId={extensionLayout.id} />
            </div>
          ) : (
            <div className={s.fallbackNote}>
              This deployment's source extension hasn't registered a chat /
              Recipe layout yet. Once it does, the extension's own UI renders
              here — same surface as the Extensions tab.
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

      {(tab === "stages" || tab === "runs" || tab === "artifacts") && (
        <section
          className={s.panel}
          role="tabpanel"
          aria-label={STILL_PENDING_COPY[tab].heading}
        >
          <h2 className={s.panelHeading}>{STILL_PENDING_COPY[tab].heading}</h2>
          <p className={s.panelBody}>{STILL_PENDING_COPY[tab].body}</p>
          <div className={s.idBox}>deployment_id = {deploymentId}</div>
        </section>
      )}
    </div>
  );
}
