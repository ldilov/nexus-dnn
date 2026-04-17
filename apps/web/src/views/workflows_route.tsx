import { useCallback } from "react";
import { WorkflowCatalog } from "../catalog/workflow_catalog";
import { StageView } from "./stage_view";
import { GraphView } from "./graph_view";
import { RunTraceView } from "./run_trace_view";
import { useRootOutletContext } from "../root_layout";
import { fetchWorkflow } from "../services/workflows";
import * as styles from "../app.css";
import * as local from "./workflows_route.css";

const LAST_WORKFLOW_KEY = "nexus.catalog.workflows.lastOpened";

export default function WorkflowsRoute() {
  const ctx = useRootOutletContext();
  const {
    workflow,
    setWorkflow,
    workflowViewMode,
    setWorkflowViewMode,
    activeView,
    selectedNode,
    setSelectedNode,
    nodeProgress,
    events,
    loadError,
  } = ctx;

  const handleWorkflowSelect = useCallback(
    (id: string) => {
      if (workflow?.id === id) {
        setWorkflowViewMode("editor");
        return;
      }
      fetchWorkflow(id).then((wf) => {
        setWorkflow(wf);
        setWorkflowViewMode("editor");
        try {
          window.sessionStorage.setItem(LAST_WORKFLOW_KEY, wf.id);
        } catch {
          return;
        }
      });
      setSelectedNode(null);
    },
    [workflow?.id, setWorkflow, setWorkflowViewMode, setSelectedNode],
  );

  const handleBackToCatalog = useCallback(
    () => setWorkflowViewMode("catalog"),
    [setWorkflowViewMode],
  );

  const handleResumeLastOpened = useCallback(() => {
    if (workflow) setWorkflowViewMode("editor");
  }, [workflow, setWorkflowViewMode]);

  if (loadError) {
    return <p className={styles.placeholderText}>{loadError}</p>;
  }

  const showCatalog = workflowViewMode === "catalog" || workflow === null;

  return (
    <div className={local.surfaceColumn}>
      <div
        style={{
          display: showCatalog ? "block" : "none",
          flex: showCatalog ? "1 1 auto" : "0 0 auto",
          minHeight: 0,
        }}
      >
        <WorkflowCatalog
          selectedId={workflow?.id ?? null}
          onSelect={handleWorkflowSelect}
          resumeWorkflow={workflow}
          onResume={handleResumeLastOpened}
        />
      </div>
      {workflow && (
        <div
          className={local.editorColumn}
          style={{ display: showCatalog ? "none" : "flex" }}
        >
          <button
            type="button"
            onClick={handleBackToCatalog}
            className={styles.backToCatalog}
          >
            <span
              className={`material-symbols-outlined ${local.backIcon}`}
              aria-hidden="true"
            >
              arrow_back
            </span>
            Back to catalog
          </button>
          <div className={local.editorActiveViewRow}>
            {activeView === "stage" && (
              <StageView
                workflow={workflow}
                nodeProgress={nodeProgress}
                selectedNodeId={selectedNode?.id ?? null}
                onSelectNode={setSelectedNode}
              />
            )}
            {activeView === "graph" && (
              <GraphView
                workflow={workflow}
                nodeProgress={nodeProgress}
                onSelectNode={setSelectedNode}
              />
            )}
            {activeView === "trace" && <RunTraceView events={events} />}
          </div>
        </div>
      )}
    </div>
  );
}
