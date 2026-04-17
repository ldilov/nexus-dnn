import { useMemo, useState } from "react";
import type { LayoutSummary, ModuleSummary } from "../api/client";
import {
  useDeployment,
  useLayouts,
  useModules,
  useWorkflow,
} from "../hooks/use_api";
import { GraphView } from "./graph_view";
import { ExtensionLayoutView } from "./extension_layout_view";
import * as s from "./deployment_detail_placeholder.css";

interface DeploymentDetailPlaceholderProps {
  deploymentId: string;
  onBack: () => void;
}

type TabId = "recipe" | "graph" | "stages" | "runs" | "artifacts";

const TABS: readonly { id: TabId; label: string }[] = [
  { id: "recipe", label: "Recipe" },
  { id: "graph", label: "Workflow Graph" },
  { id: "stages", label: "Stages" },
  { id: "runs", label: "Runs & Traces" },
  { id: "artifacts", label: "Artifacts" },
];

const STILL_PENDING_COPY: Record<Exclude<TabId, "recipe" | "graph">, {
  heading: string;
  body: string;
}> = {
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

export function DeploymentDetailPlaceholder({
  deploymentId,
  onBack,
}: DeploymentDetailPlaceholderProps) {
  const [tab, setTab] = useState<TabId>("recipe");

  const { data: deployment } = useDeployment(deploymentId);
  const { data: modulesEnvelope } = useModules({ limit: 200 });
  const { data: layouts } = useLayouts();

  // Resolve the deployment's backing module so we can follow the chain
  // extension → module → workflow_id (for the DAG) and
  // extension → default layout (for the Recipe chat UI).
  const linkedModule = useMemo<ModuleSummary | null>(() => {
    if (!deployment || !modulesEnvelope) return null;
    if (deployment.source_extension_id) {
      return (
        modulesEnvelope.modules.find(
          (m) => m.extension_id === deployment.source_extension_id,
        ) ?? null
      );
    }
    if (deployment.source_workflow_id) {
      return (
        modulesEnvelope.modules.find(
          (m) => m.module_id === `user:${deployment.source_workflow_id}`,
        ) ?? null
      );
    }
    return null;
  }, [deployment, modulesEnvelope]);

  const workflowId = linkedModule?.workflow_id ?? null;
  const { data: workflow, isLoading: workflowLoading } = useWorkflow(workflowId);

  // Pick the extension's default layout — prefer an explicitly-default
  // one, otherwise the first layout registered for that extension.
  const extensionLayout = useMemo<LayoutSummary | null>(() => {
    if (!deployment?.source_extension_id || !layouts) return null;
    const extId = deployment.source_extension_id;
    return (
      layouts.find((l) => l.extension_id === extId && l.is_default) ??
      layouts.find((l) => l.extension_id === extId) ??
      null
    );
  }, [deployment, layouts]);

  return (
    <div className={s.root}>
      <button type="button" className={s.backLink} onClick={onBack}>
        ← Back to deployments
      </button>

      <header className={s.hero}>
        <h1 className={s.title}>
          {deployment?.display_name ?? "Deployment detail"}
        </h1>
        <div className={s.slug}>{deployment?.slug ?? deploymentId}</div>
      </header>

      <div className={s.tabs} role="tablist" aria-label="Deployment tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={s.tab}
            onClick={() => setTab(t.id)}
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
            // Mounts the real editor canvas in its default non-editable mode
            // — same OperatorNode / BoundaryNode / port styling as the
            // workflow editor, minus the edit affordances.
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
