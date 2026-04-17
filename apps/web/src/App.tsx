import { useState, useCallback, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Shell } from "./layout/shell";
import { TopBar, type ViewId } from "./layout/top_bar";
import { Sidebar } from "./layout/sidebar";
import { RightInspector } from "./layout/right_inspector";
import { Tabs } from "./components/tabs";
import { RecipeCatalog } from "./catalog/recipe_catalog";
import { WorkflowCatalog } from "./catalog/workflow_catalog";
import { HomeDashboard } from "./catalog/home_dashboard";
import { ExtensionsGallery } from "./views/extensions_gallery";
import { DeploymentsView } from "./views/deployments_view";
import { DeploymentDetailPlaceholder } from "./views/deployment_detail_placeholder";
import { BackendsView } from "./views/backends_view";
import { ModelsView } from "./views/models_view";
import { ModulesView } from "./modules/modules_view";
import { BlueprintView } from "./modules/blueprint_view";
import { InstanceView } from "./modules/instance_view/instance_view";
import { DraftView } from "./modules/instance_view/draft_view";
import { sweepStaleDrafts } from "./modules/draft/draft_envelope";
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
  const navigate = useNavigate();

  const [, setWorkflows] = useState<Workflow[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [workflowViewMode, setWorkflowViewMode] = useState<WorkflowViewMode>("catalog");
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

    // Spec 019 T408 — evict abandoned drafts older than 7 days on boot so
    // sessionStorage doesn't accumulate orphans from users who fork and
    // close the tab without saving.
    sweepStaleDrafts();
  }, [refreshLayouts]);

  // Spec 019 SC-015 — no substring-based icon heuristics. Extensions that
  // want a non-default icon declare it in their manifest; the server maps
  // that into LayoutSummary.icon at projection time. Everything else falls
  // back to the generic `extension` glyph.
  const extensionNavItems = extensionLayouts
    .filter((l) => l.placement === "main")
    .map((l) => ({
      layoutId: l.id,
      label: l.display_name,
      icon: "extension",
    }));

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

  const handleOpenRecipe = useCallback(
    (recipe: Recipe) => {
      // Resolve the recipe's extension default layout and navigate to it.
      const target =
        extensionLayouts.find(
          (l) => l.extension_id === recipe.extension_id && l.is_default,
        ) ??
        extensionLayouts.find((l) => l.extension_id === recipe.extension_id);
      if (target) {
        navigate(`/extensions/${encodeURIComponent(target.id)}`);
      }
    },
    [extensionLayouts, navigate],
  );

  const isWorkflowsRoute = useMatch("/workflows");
  const showViewTabs = !!isWorkflowsRoute;
  const inspectorVisible = !!isWorkflowsRoute;

  // Derived project name for the top bar — keeps the existing UX where the
  // editor's current workflow name replaces the fallback "Nexus DNN".
  const projectName =
    isWorkflowsRoute && workflow?.name ? workflow.name : "Nexus DNN";

  return (
    <Shell
      topBar={
        <TopBar
          projectName={projectName}
          activeView={activeView}
          onViewChange={setActiveView}
          showViewTabs={showViewTabs}
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
          pinned={sidebarPinned}
          onTogglePin={() => setSidebarPinned((p) => !p)}
          extensionNavItems={extensionNavItems}
        />
      }
      sidebarPinned={sidebarPinned}
      canvas={
        <Routes>
          <Route
            path="/"
            element={
              <CanvasFrame>
                <HomeDashboard
                  onOpenRecipe={handleOpenRecipe}
                  onGoToRecipes={() => navigate("/recipes")}
                  onGoToWorkflows={() => navigate("/workflows")}
                  onGoToExtensions={() => navigate("/extensions")}
                />
              </CanvasFrame>
            }
          />

          {/* Modules */}
          <Route
            path="/modules"
            element={
              <CanvasFrame>
                <ModulesView />
              </CanvasFrame>
            }
          />
          <Route
            path="/modules/:moduleId/blueprint"
            element={
              <CanvasFrame>
                <BlueprintRouteWrapper />
              </CanvasFrame>
            }
          />
          <Route
            path="/modules/:moduleId/draft/:uuid"
            element={
              <CanvasFrame>
                <DraftRouteWrapper />
              </CanvasFrame>
            }
          />
          {/* Legacy draft URL shape → redirect to the namespaced shape. */}
          <Route
            path="/modules/user:draft::uuid"
            element={<LegacyDraftRedirect />}
          />
          <Route
            path="/modules/:moduleId"
            element={
              <CanvasFrame>
                <InstanceRouteWrapper />
              </CanvasFrame>
            }
          />

          {/* Deployments */}
          <Route
            path="/deployments"
            element={
              <CanvasFrame>
                <DeploymentsView />
              </CanvasFrame>
            }
          />
          <Route
            path="/deployments/:deploymentId"
            element={
              <CanvasFrame>
                <DeploymentDetailRouteWrapper />
              </CanvasFrame>
            }
          />

          {/* Backends + Models — host-level surfaces. Used to be declared
              inside the Local Chat extension layout (workspace_drawer); now
              they live in the host shell so they're shared across every
              extension that installs a backend or model. */}
          <Route
            path="/backends"
            element={
              <CanvasFrame>
                <BackendsView />
              </CanvasFrame>
            }
          />
          <Route
            path="/models"
            element={
              <CanvasFrame>
                <ModelsView />
              </CanvasFrame>
            }
          />

          {/* Extensions */}
          <Route
            path="/extensions"
            element={
              <CanvasFrame>
                <ExtensionsGallery onExtensionToggled={refreshLayouts} />
              </CanvasFrame>
            }
          />
          <Route
            path="/extensions/:layoutId"
            element={<ExtensionRouteWrapper />}
          />

          {/* Recipes — flat catalog */}
          <Route
            path="/recipes"
            element={
              <CanvasFrame>
                <RecipeCatalog onOpenRecipe={handleOpenRecipe} />
              </CanvasFrame>
            }
          />

          {/* Workflows — classic catalog/editor surface */}
          <Route
            path="/workflows"
            element={
              loadError ? (
                <p className={styles.placeholderText}>{loadError}</p>
              ) : (
                <CanvasFrame>
                  <WorkflowsSurface
                    workflow={workflow}
                    workflowViewMode={workflowViewMode}
                    activeView={activeView}
                    nodeProgress={nodeProgress}
                    selectedNode={selectedNode}
                    events={events}
                    onWorkflowSelect={handleWorkflowSelect}
                    onResume={handleResumeLastOpened}
                    onBack={handleBackToCatalog}
                    onSelectNode={handleSelectNode}
                  />
                </CanvasFrame>
              )
            }
          />
          {/* Legacy: /workflows/:id → /modules/user::id/blueprint */}
          <Route path="/workflows/:id" element={<LegacyWorkflowRedirect />} />

          {/* Placeholders still on the sidebar. */}
          <Route
            path="/runs"
            element={
              <CanvasFrame>
                <p className={styles.placeholderText}>Run history</p>
              </CanvasFrame>
            }
          />
          <Route
            path="/artifacts"
            element={
              <CanvasFrame>
                <p className={styles.placeholderText}>Artifact browser</p>
              </CanvasFrame>
            }
          />

          {/* Unknown routes → home. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
      inspector={
        <RightInspector
          selectedNode={selectedNode}
          selectedSpec={
            selectedNode ? operatorSpecs.get(selectedNode.operator) ?? null : null
          }
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
      inspectorVisible={inspectorVisible}
    />
  );
}

// ─── Route wrappers ────────────────────────────────────────────────────────

function CanvasFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.canvasColumn}>
      <div className={styles.canvasContent}>{children}</div>
    </div>
  );
}

function InstanceRouteWrapper() {
  const { moduleId = "" } = useParams();
  return <InstanceView moduleId={decodeURIComponent(moduleId)} />;
}

function BlueprintRouteWrapper() {
  const { moduleId = "" } = useParams();
  const [search] = [new URLSearchParams(useLocation().search)];
  const recipeId = search.get("recipe_id") ?? undefined;
  return (
    <BlueprintView
      moduleId={decodeURIComponent(moduleId)}
      recipeId={recipeId}
    />
  );
}

function DraftRouteWrapper() {
  const { moduleId = "", uuid = "" } = useParams();
  return (
    <DraftView
      sourceModuleId={decodeURIComponent(moduleId)}
      draftUuid={uuid}
    />
  );
}

function DeploymentDetailRouteWrapper() {
  const { deploymentId = "" } = useParams();
  const navigate = useNavigate();
  return (
    <DeploymentDetailPlaceholder
      deploymentId={decodeURIComponent(deploymentId)}
      onBack={() => navigate("/deployments")}
    />
  );
}

function ExtensionRouteWrapper() {
  const { layoutId = "" } = useParams();
  return <ExtensionLayoutView layoutId={decodeURIComponent(layoutId)} />;
}

function LegacyDraftRedirect() {
  // /#/modules/user:draft:{uuid} → /#/modules/user:blank/draft/{uuid}
  const { pathname } = useLocation();
  // Grab the uuid directly from the pathname since the match token includes
  // the `user:draft:` prefix which would otherwise get captured as part of
  // the `:moduleId` segment.
  const marker = "/modules/user:draft:";
  const idx = pathname.indexOf(marker);
  if (idx < 0) return <Navigate to="/modules" replace />;
  const uuid = pathname.slice(idx + marker.length);
  return <Navigate to={`/modules/user:blank/draft/${uuid}`} replace />;
}

function LegacyWorkflowRedirect() {
  const { id = "" } = useParams();
  return (
    <Navigate
      to={`/modules/${encodeURIComponent(`user:${id}`)}/blueprint`}
      replace
    />
  );
}

// ─── Workflows surface (catalog/editor toggle) ───────────────────────────

interface WorkflowsSurfaceProps {
  workflow: Workflow | null;
  workflowViewMode: WorkflowViewMode;
  activeView: ViewId;
  nodeProgress: Record<string, { status: string; progress: number }>;
  selectedNode: WorkflowNode | null;
  events: ReturnType<typeof useEventStream>["events"];
  onWorkflowSelect: (id: string) => void;
  onResume: () => void;
  onBack: () => void;
  onSelectNode: (node: WorkflowNode) => void;
}

function WorkflowsSurface({
  workflow,
  workflowViewMode,
  activeView,
  nodeProgress,
  selectedNode,
  events,
  onWorkflowSelect,
  onResume,
  onBack,
  onSelectNode,
}: WorkflowsSurfaceProps) {
  const showCatalog = workflowViewMode === "catalog" || workflow === null;
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
      <div
        style={{
          display: showCatalog ? "block" : "none",
          flex: showCatalog ? "1 1 auto" : "0 0 auto",
          minHeight: 0,
        }}
      >
        <WorkflowCatalog
          selectedId={workflow?.id ?? null}
          onSelect={onWorkflowSelect}
          resumeWorkflow={workflow}
          onResume={onResume}
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
            onClick={onBack}
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
                onSelectNode={onSelectNode}
              />
            )}
            {activeView === "graph" && (
              <GraphView
                workflow={workflow}
                nodeProgress={nodeProgress}
                onSelectNode={onSelectNode}
              />
            )}
            {activeView === "trace" && <RunTraceView events={events} />}
          </div>
        </div>
      )}
    </div>
  );
}
