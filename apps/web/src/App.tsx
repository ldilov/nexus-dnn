import { useState, useCallback } from "react";
import { Shell } from "./layout/shell";
import { TopBar, type ViewId } from "./layout/top_bar";
import { LeftRail } from "./layout/left_rail";
import { RightInspector } from "./layout/right_inspector";
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
  const [activeView, setActiveView] = useState<ViewId>("stage");
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
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
    switch (activeView) {
      case "stage":
        return (
          <StageView
            workflow={workflow}
            nodeProgress={nodeProgress}
            selectedNodeId={selectedNode?.id ?? null}
            onSelectNode={handleSelectNode}
          />
        );
      case "graph":
        return <GraphView workflow={workflow} nodeProgress={nodeProgress} />;
      case "trace":
        return <RunTraceView events={events} />;
      case "artifacts":
        return <ArtifactBrowser runId={runId} />;
    }
  };

  return (
    <Shell
      topBar={
        <TopBar
          workflowName={workflow?.name ?? "Nexus DNN"}
          activeView={activeView}
          onViewChange={setActiveView}
          onRun={handleRun}
          onCancel={handleCancel}
          isRunning={isRunning}
        />
      }
      leftRail={
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
    />
  );
}
