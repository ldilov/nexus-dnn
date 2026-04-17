import { useState, useCallback } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useMatch,
  useNavigate,
  useOutletContext,
} from "react-router";
import { Shell } from "./layout/shell";
import { TopBar, type ViewId } from "./layout/top_bar";
import { Sidebar } from "./layout/sidebar";
import { RightInspector } from "./layout/right_inspector";
import { Tabs } from "./components/tabs";
import { sweepStaleDrafts } from "./views/modules/draft/draft_envelope";
import { useOperatorSpecs } from "./hooks/use_operator_specs";
import { useEventStream } from "./hooks/use_event_stream";
import { usePollingMetrics } from "./hooks/use_polling_metrics";
import { fetchLayouts } from "./services/layouts";
import { createRun } from "./services/runs";
import type {
  Workflow,
  WorkflowNode,
  LayoutSummary,
  Recipe,
} from "./services/api_client";
import * as styles from "./app.css";

type BottomTabId = "logs" | "events" | "problems" | "workers";

const BOTTOM_TABS = [
  { id: "logs" as const, label: "Logs" },
  { id: "events" as const, label: "Events" },
  { id: "problems" as const, label: "Problems" },
  { id: "workers" as const, label: "Workers" },
] as const;

type WorkflowViewMode = "catalog" | "editor";

interface RootLoaderData {
  layouts: LayoutSummary[];
}

export async function loader(): Promise<RootLoaderData> {
  sweepStaleDrafts();
  const layouts = await fetchLayouts().catch(() => [] as LayoutSummary[]);
  return { layouts };
}

export interface RootOutletContext {
  workflow: Workflow | null;
  setWorkflow: (workflow: Workflow | null) => void;
  workflowViewMode: WorkflowViewMode;
  setWorkflowViewMode: (mode: WorkflowViewMode) => void;
  activeView: ViewId;
  selectedNode: WorkflowNode | null;
  setSelectedNode: (node: WorkflowNode | null) => void;
  nodeProgress: Record<string, { status: string; progress: number }>;
  events: ReturnType<typeof useEventStream>["events"];
  isRunning: boolean;
  runId: string | null;
  loadError: string | null;
  setLoadError: (message: string | null) => void;
  extensionLayouts: LayoutSummary[];
  refreshLayouts: () => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onGoToRecipes: () => void;
  onGoToWorkflows: () => void;
  onGoToExtensions: () => void;
}

export function useRootOutletContext(): RootOutletContext {
  return useOutletContext<RootOutletContext>();
}

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

export default function RootLayout() {
  const { layouts: initialLayouts } = useLoaderData() as RootLoaderData;
  const navigate = useNavigate();

  const [extensionLayouts, setExtensionLayouts] =
    useState<LayoutSummary[]>(initialLayouts);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [workflowViewMode, setWorkflowViewMode] =
    useState<WorkflowViewMode>("catalog");
  const [activeView, setActiveView] = useState<ViewId>("stage");
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTabId>("logs");
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sidebarPinned, setSidebarPinned] = useState(false);

  const { specs: operatorSpecs } = useOperatorSpecs();
  const { events } = useEventStream();
  const nodeProgress = latestProgressByNode(events);
  const { metrics, connected } = usePollingMetrics();

  const refreshLayouts = useCallback(() => {
    fetchLayouts()
      .then(setExtensionLayouts)
      .catch(() => setExtensionLayouts([]));
  }, []);

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

  const handleOpenRecipe = useCallback(
    (recipe: Recipe) => {
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

  const goToRecipes = useCallback(() => navigate("/recipes"), [navigate]);
  const goToWorkflows = useCallback(() => navigate("/workflows"), [navigate]);
  const goToExtensions = useCallback(() => navigate("/extensions"), [navigate]);

  const location = useLocation();

  const isWorkflowsRoute = useMatch("/workflows");
  const showViewTabs = !!isWorkflowsRoute;
  const inspectorVisible = !!isWorkflowsRoute;

  const projectName =
    isWorkflowsRoute && workflow?.name ? workflow.name : "Nexus DNN";

  const outletContext: RootOutletContext = {
    workflow,
    setWorkflow,
    workflowViewMode,
    setWorkflowViewMode,
    activeView,
    selectedNode,
    setSelectedNode,
    nodeProgress,
    events,
    isRunning,
    runId,
    loadError,
    setLoadError,
    extensionLayouts,
    refreshLayouts,
    onOpenRecipe: handleOpenRecipe,
    onGoToRecipes: goToRecipes,
    onGoToWorkflows: goToWorkflows,
    onGoToExtensions: goToExtensions,
  };

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
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <div
              key={location.pathname}
              className={styles.routeTransitionWrapper}
            >
              <Outlet context={outletContext} />
            </div>
          </div>
        </div>
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

export function RootError() {
  return (
    <div className={styles.canvasColumn}>
      <div className={styles.canvasContent}>
        <p className={styles.placeholderText}>
          Something went wrong while loading the workspace. Refresh the page to
          retry.
        </p>
      </div>
    </div>
  );
}
