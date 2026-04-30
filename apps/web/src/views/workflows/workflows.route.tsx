import { useCallback } from "react";
import { WorkflowCatalog } from "./components/workflow_catalog";
import { StageView } from "./components/canvas/stage_view";
import { GraphView } from "./components/canvas/graph_view";
import { RunTraceView } from "./components/canvas/run_trace_view";
import { WorkflowActionBar } from "./components/workflow_action_bar";
import { PageHero } from "../../components/base/page_hero";
import { useRootOutletContext } from "../../root_layout";
import { fetchWorkflow } from "../../services/workflows";
import * as styles from "../../app.css";
import * as local from "./workflows.route.css";

const LAST_WORKFLOW_KEY = "nexus.catalog.workflows.lastOpened";

export default function WorkflowsRoute() {
  const ctx = useRootOutletContext();
  const {
    workflow,
    setWorkflow,
    workflowViewMode,
    setWorkflowViewMode,
    activeView,
    setActiveView,
    selectedNode,
    setSelectedNode,
    nodeProgress,
    events,
    loadError,
    metrics,
    metricsConnected,
    isRunning,
    onRun,
    onCancel,
    onValidate,
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
      {showCatalog && (
        <div className={local.heroSlot}>
          <PageHero
            eyebrow="Authoring surface · Node graphs"
            title="Workflows"
            meta={
              <span>
                Compiled graphs of operators. Pick a workflow to inspect its stages, run
                traces, or open it in the editor.
              </span>
            }
          />
        </div>
      )}
      <div
        className={`${showCatalog ? local.catalogSlot : local.catalogSlotPinned}`}
        hidden={!showCatalog}
      >
        <WorkflowCatalog
          selectedId={workflow?.id ?? null}
          onSelect={handleWorkflowSelect}
          resumeWorkflow={workflow}
          onResume={handleResumeLastOpened}
        />
      </div>
      {workflow && !showCatalog && (
        <div className={local.editorColumn}>
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
          <WorkflowActionBar
            activeView={activeView}
            onViewChange={setActiveView}
            metrics={metrics}
            metricsConnected={metricsConnected}
            isRunning={isRunning}
            onRun={onRun}
            onCancel={onCancel}
            onValidate={onValidate}
          />
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
