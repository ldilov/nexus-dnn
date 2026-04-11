import { useState, useCallback } from "react";
import { Shell } from "./layout/shell";
import { TopBar } from "./layout/top_bar";
import { IconRail, type NavItemId } from "./layout/icon_rail";
import { LeftRail } from "./layout/left_rail";
import { RightInspector } from "./layout/right_inspector";
import { Tabs } from "./components/tabs";
import { StageView } from "./views/stage_view";
import { GraphView } from "./views/graph_view";
import { RunTraceView } from "./views/run_trace_view";
import { ArtifactBrowser } from "./views/artifact_browser";
import { useEventStream } from "./hooks/use_event_stream";
import {
  fetchWorkflows,
  fetchWorkflow,
  createRun,
  type Workflow,
  type WorkflowNode,
} from "./api/client";
import { useEffect } from "react";

type ViewId = "stage" | "graph" | "trace" | "timeline" | "artifacts";

type BottomTabId = "logs" | "events" | "problems" | "workers";

const VIEW_TABS = [
  { id: "stage" as const, label: "Stage" },
  { id: "graph" as const, label: "Graph" },
  { id: "trace" as const, label: "Trace" },
  { id: "timeline" as const, label: "Timeline" },
  { id: "artifacts" as const, label: "Artifacts" },
] as const;

const BOTTOM_TABS = [
  { id: "logs" as const, label: "Logs" },
  { id: "events" as const, label: "Events" },
  { id: "problems" as const, label: "Problems" },
  { id: "workers" as const, label: "Workers" },
] as const;

function latestProgressByNode(
  events: { node_id?: string; status?: string; progress?: number }[],
): Record<string, { status: string; progress: number }> {
  const map: Record<string, { status: string; progress: number }> = {};
  for (const e of events) {
    if (e.node_id && e.status !== undefined) {
      map[e.node_id] = { status: e.status, progress: e.progress ?? 0 };
    }
  }
  return map;
}

export function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [activeNav, setActiveNav] = useState<NavItemId>("workflows");
  const [activeView, setActiveView] = useState<ViewId>("stage");
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTabId>("logs");
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [_runId, setRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { events } = useEventStream();
  const nodeProgress = latestProgressByNode(events);

  useEffect(() => {
    fetchWorkflows()
      .then((wfs) => {
        setWorkflows(wfs);
        if (wfs[0]) {
          fetchWorkflow(wfs[0].id).then(setWorkflow);
        }
      })
      .catch(() => {});
  }, []);

  const handleRun = useCallback(() => {
    if (!workflow) return;
    setIsRunning(true);
    createRun(workflow.id)
      .then((run) => setRunId(run.id))
      .catch(() => setIsRunning(false));
  }, [workflow]);

  const handleCancel = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleSelectNode = useCallback((node: WorkflowNode) => {
    setSelectedNode(node);
  }, []);

  const handleWorkflowSelect = useCallback((id: string) => {
    fetchWorkflow(id).then(setWorkflow);
    setSelectedNode(null);
  }, []);

  const renderCanvas = () => {
    if (activeNav === "workflows") {
      return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Tabs
            items={VIEW_TABS}
            activeId={activeView}
            onSelect={setActiveView}
            variant="segmented"
          />
          <div style={{ flex: 1, overflow: "auto", padding: "12px" }}>
            {activeView === "stage" && (
              <StageView
                workflow={workflow}
                nodeProgress={nodeProgress}
                selectedNodeId={selectedNode?.id ?? null}
                onSelectNode={handleSelectNode}
              />
            )}
            {activeView === "graph" && (
              <GraphView workflow={workflow} nodeProgress={nodeProgress} />
            )}
            {activeView === "trace" && <RunTraceView events={events} />}
            {activeView === "timeline" && (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "48px" }}>
                Timeline view coming soon
              </p>
            )}
            {activeView === "artifacts" && <ArtifactBrowser runId={_runId} />}
          </div>
        </div>
      );
    }

    if (activeNav === "recipes" || activeNav === "extensions" || activeNav === "models") {
      return (
        <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "48px" }}>
          {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} view
        </p>
      );
    }

    return null;
  };

  return (
    <Shell
      topBar={
        <TopBar
          projectName={workflow?.name ?? "Nexus DNN"}
          onRun={handleRun}
          onCancel={handleCancel}
          onValidate={() => {}}
          isRunning={isRunning}
        />
      }
      iconRail={
        <IconRail activeItem={activeNav} onNavigate={setActiveNav} />
      }
      secondaryPanel={
        <>
          <LeftRail />
          {workflows.length > 1 && (
            <div style={{ padding: "8px" }}>
              {workflows.map((wf) => (
                <button key={wf.id} onClick={() => handleWorkflowSelect(wf.id)}>
                  {wf.name}
                </button>
              ))}
            </div>
          )}
        </>
      }
      canvas={renderCanvas()}
      inspector={
        <RightInspector
          selectedNode={selectedNode}
          nodeStatus={selectedNode ? nodeProgress[selectedNode.id]?.status : undefined}
        />
      }
      bottomDrawer={
        <Tabs
          items={BOTTOM_TABS}
          activeId={activeBottomTab}
          onSelect={setActiveBottomTab}
          variant="underline"
        />
      }
      secondaryPanelVisible={activeNav !== "home"}
      inspectorVisible={activeNav === "workflows"}
    />
  );
}
