import { useState, useCallback, useEffect } from "react";
import { Shell } from "./layout/shell";
import { TopBar, type ViewId } from "./layout/top_bar";
import { Sidebar, type NavItemId } from "./layout/sidebar";
import { RightInspector } from "./layout/right_inspector";
import { Tabs } from "./components/tabs";
import { RecipeCatalog } from "./catalog/recipe_catalog";
import { WorkflowCatalog } from "./catalog/workflow_catalog";
import { HomeDashboard } from "./catalog/home_dashboard";
import { ExtensionsGallery } from "./views/extensions_gallery";
import { DeploymentsView } from "./views/deployments_view";
import { useOperatorSpecs } from "./hooks/use_operator_specs";
import { StageView } from "./views/stage_view";
import { GraphView } from "./views/graph_view";
import { RunTraceView } from "./views/run_trace_view";
import { ExtensionLayoutView } from "./views/extension_layout_view";
import { useEventStream } from "./hooks/use_event_stream";
import { usePollingMetrics } from "./hooks/use_polling_metrics";
import {
  fetchWorkflows,
  fetchWorkflow,
  fetchLayouts,
  createRun,
  type Workflow,
  type WorkflowNode,
  type LayoutSummary,
  type Recipe,
} from "./api/client";
import * as styles from "./app.css";

type BottomTabId = "logs" | "events" | "problems" | "workers";

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

const LAST_WORKFLOW_KEY = "nexus.catalog.workflows.lastOpened";

type WorkflowViewMode = "catalog" | "editor";

export function App() {
  const [, setWorkflows] = useState<Workflow[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [workflowViewMode, setWorkflowViewMode] = useState<WorkflowViewMode>("catalog");
  const [activeNav, setActiveNav] = useState<NavItemId>("home");
  const [activeView, setActiveView] = useState<ViewId>("stage");
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTabId>("logs");
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [_runId, setRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [extensionLayouts, setExtensionLayouts] = useState<LayoutSummary[]>([]);
  const { specs: operatorSpecs } = useOperatorSpecs();
  const { events } = useEventStream();
  const nodeProgress = latestProgressByNode(events);
  const { metrics, connected } = usePollingMetrics();

  const refreshLayouts = useCallback(() => {
    fetchLayouts()
      .then(setExtensionLayouts)
      .catch(() => setExtensionLayouts([]));
  }, []);

  useEffect(() => {
    fetchWorkflows()
      .then((wfs) => {
        setWorkflows(wfs);
        setLoadError(null);
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : "Failed to load workflows";
        setLoadError(message);
      });

    refreshLayouts();
  }, [refreshLayouts]);

  const extensionNavItems = extensionLayouts
    .filter((l) => l.placement === "main")
    .map((l) => ({
      id: `ext:${l.id}` as NavItemId,
      label: l.display_name,
      icon: l.id.includes("chat") ? "chat" : l.id.includes("model") ? "model_training" : l.id.includes("backend") ? "settings" : "extension",
    }));

  const activeExtensionLayoutId = activeNav.startsWith("ext:")
    ? activeNav.slice(4)
    : null;

  const handleRun = useCallback(() => {
    if (!workflow) return;
    setIsRunning(true);
    createRun(workflow.id)
      .then((run) => setRunId(run.run_id))
      .catch(() => setIsRunning(false));
  }, [workflow]);

  const handleCancel = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleSelectNode = useCallback((node: WorkflowNode) => {
    setSelectedNode(node);
  }, []);

  const handleWorkflowSelect = useCallback((id: string) => {
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
        // sessionStorage unavailable — ignore
      }
    });
    setSelectedNode(null);
  }, [workflow?.id]);

  const handleBackToCatalog = useCallback(() => {
    setWorkflowViewMode("catalog");
  }, []);

  const handleResumeLastOpened = useCallback(() => {
    if (workflow) setWorkflowViewMode("editor");
  }, [workflow]);

  const handleNavigate = useCallback((id: NavItemId) => {
    if (id === "workflows") {
      setWorkflowViewMode("catalog");
    }
    setActiveNav(id);
  }, []);

  const handleOpenRecipe = useCallback((recipe: Recipe) => {
    // Resolve the recipe's extension default layout and navigate to it.
    const target =
      extensionLayouts.find((l) => l.extension_id === recipe.extension_id && l.is_default) ??
      extensionLayouts.find((l) => l.extension_id === recipe.extension_id);
    if (target) {
      setActiveNav(`ext:${target.id}` as NavItemId);
    }
  }, [extensionLayouts]);

  const renderCanvas = () => {
    if (activeExtensionLayoutId) {
      return <ExtensionLayoutView layoutId={activeExtensionLayoutId} />;
    }

    if (activeNav === "home") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <HomeDashboard
              onOpenRecipe={handleOpenRecipe}
              onGoToRecipes={() => handleNavigate("recipes")}
              onGoToWorkflows={() => handleNavigate("workflows")}
              onGoToExtensions={() => handleNavigate("extensions")}
            />
          </div>
        </div>
      );
    }

    if (activeNav === "workflows") {
      if (loadError) {
        return <p className={styles.placeholderText}>{loadError}</p>;
      }
      const showCatalog = workflowViewMode === "catalog" || workflow === null;
      return (
        <div className={styles.canvasColumn}>
          <div
            className={styles.canvasContent}
            style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
          >
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
                style={{
                  display: showCatalog ? "none" : "flex",
                  flexDirection: "column",
                  flex: "1 1 auto",
                  minHeight: 0,
                }}
              >
                <button
                  type="button"
                  onClick={handleBackToCatalog}
                  className={styles.backToCatalog}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                    aria-hidden="true"
                  >
                    arrow_back
                  </span>
                  Back to catalog
                </button>
                <div style={{ flex: "1 1 auto", minHeight: 0, display: "flex" }}>
                  {activeView === "stage" && (
                    <StageView
                      workflow={workflow}
                      nodeProgress={nodeProgress}
                      selectedNodeId={selectedNode?.id ?? null}
                      onSelectNode={handleSelectNode}
                    />
                  )}
                  {activeView === "graph" && (
                    <GraphView
                      workflow={workflow}
                      nodeProgress={nodeProgress}
                      onSelectNode={handleSelectNode}
                    />
                  )}
                  {activeView === "trace" && <RunTraceView events={events} />}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeNav === "recipes") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <RecipeCatalog onOpenRecipe={handleOpenRecipe} />
          </div>
        </div>
      );
    }

    if (activeNav === "extensions") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <ExtensionsGallery onExtensionToggled={refreshLayouts} />
          </div>
        </div>
      );
    }

    if (activeNav === "deployments") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <DeploymentsView />
          </div>
        </div>
      );
    }

    if (activeNav === "runs") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <p className={styles.placeholderText}>Run history</p>
          </div>
        </div>
      );
    }

    if (activeNav === "artifacts") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <p className={styles.placeholderText}>Artifact browser</p>
          </div>
        </div>
      );
    }

    return (
      <p className={styles.placeholderText}>
        Select a page from the sidebar
      </p>
    );
  };

  return (
    <Shell
      topBar={
        <TopBar
          projectName={workflow?.name ?? "Nexus DNN"}
          activeView={activeView}
          onViewChange={setActiveView}
          showViewTabs={activeNav === "workflows"}
          metrics={metrics}
          metricsConnected={connected}
          onRun={handleRun}
          onCancel={handleCancel}
          onValidate={() => {}}
          isRunning={isRunning}
        />
      }
      sidebar={
        <Sidebar
          activeItem={activeNav}
          onNavigate={handleNavigate}
          pinned={sidebarPinned}
          onTogglePin={() => setSidebarPinned((p) => !p)}
          extensionNavItems={extensionNavItems}
        />
      }
      sidebarPinned={sidebarPinned}
      canvas={renderCanvas()}
      inspector={
        <RightInspector
          selectedNode={selectedNode}
          selectedSpec={selectedNode ? operatorSpecs.get(selectedNode.operator) ?? null : null}
          nodeStatus={selectedNode ? nodeProgress[selectedNode.id]?.status : undefined}
        />
      }
      bottomDrawer={
        <div className={styles.drawerContent}>
          <Tabs
            items={BOTTOM_TABS}
            activeId={activeBottomTab}
            onSelect={setActiveBottomTab}
            variant="underline"
          />
        </div>
      }
      inspectorVisible={activeNav === "workflows"}
    />
  );
}
