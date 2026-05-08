import { useState, useCallback, useMemo } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router";
import { toast } from "sonner";
import { Shell } from "./layout/shell";
import { TopBar, type BreadcrumbItem } from "./layout/top_bar";
import { Sidebar, type SidebarVariant } from "./layout/sidebar";
import { RightInspector } from "./layout/right_inspector";
import { TweakPanel } from "./layout/tweak_panel";
import { Tabs } from "./components/base/tabs";
import { PulseFloor } from "./components/pulse_floor/pulse_floor";
import { CursorRoot } from "./components/cursor/cursor_root";
import { FocusedBlockProvider } from "./hooks/use_focused_block";
import { sweepStaleDrafts } from "./views/modules/draft/draft_envelope";
import { useOperatorSpecs } from "./hooks/use_operator_specs";
import { useEventStream } from "./hooks/use_event_stream";
import { usePollingMetrics } from "./hooks/use_polling_metrics";
import { fetchLayouts } from "./services/layouts";
import { createRun } from "./services/runs";
import type {
  RuntimeMetrics,
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
export type ViewId = "stage" | "graph" | "trace" | "timeline";

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
  setActiveView: (view: ViewId) => void;
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
  metrics: RuntimeMetrics | null;
  metricsConnected: boolean;
  onRun: () => void;
  onCancel: () => void;
  onValidate: () => void;
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

const HOST_ROUTE_LABELS: Record<string, string> = {
  modules: "Modules",
  deployments: "Deployments",
  recipes: "Recipes",
  workflows: "Workflows",
  backends: "Backends",
  models: "Models",
  runs: "Runs",
  artifacts: "Artifacts",
  extensions: "Extensions",
};

function buildBreadcrumbs(
  pathname: string,
  navigate: (to: string) => void,
  extensionLayouts: ReadonlyArray<LayoutSummary>,
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const home: BreadcrumbItem = { label: "Home", onClick: () => navigate("/") };
  if (segments.length === 0) return [home];

  const crumbs: BreadcrumbItem[] = [home];
  let path = "";
  for (let i = 0; i < segments.length; i += 1) {
    const segment = segments[i]!;
    path += `/${segment}`;
    let label: string | null = HOST_ROUTE_LABELS[segment] ?? null;
    if (!label && segments[0] === "extensions" && i === 1) {
      const layout = extensionLayouts.find((l) => l.id === decodeURIComponent(segment));
      label = layout?.display_name ?? decodeURIComponent(segment);
    }
    if (!label) label = decodeURIComponent(segment);
    const target = path;
    crumbs.push({
      label,
      onClick: i < segments.length - 1 ? () => navigate(target) : undefined,
    });
  }
  return crumbs;
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
  const { metrics, connected: metricsConnected } = usePollingMetrics();

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

  const inspectorVisible = location.pathname.startsWith("/workflows");

  const breadcrumbs = useMemo(
    () => buildBreadcrumbs(location.pathname, navigate, extensionLayouts),
    [location.pathname, navigate, extensionLayouts],
  );

  const outletContext: RootOutletContext = {
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
    metrics,
    metricsConnected,
    onRun: handleRun,
    onCancel: handleCancel,
    onValidate: () => {},
  };

  const sidebarVariant: SidebarVariant = sidebarPinned ? "expanded" : "rail";
  const notYetWired = useCallback(
    (label: string) => () => {
      toast.info(`${label} is not yet wired`, {
        description: "Tracked as host-shell follow-up.",
      });
    },
    [],
  );

  return (
    <FocusedBlockProvider>
      <Shell
        topBar={
          <TopBar
            breadcrumbs={breadcrumbs}
            onOpenSearch={notYetWired("Search")}
            onOpenNotifications={notYetWired("Notifications")}
            onOpenProfile={notYetWired("Profile")}
            tweakPanel={<TweakPanel />}
          />
        }
        sidebar={
          <Sidebar
            variant={sidebarVariant}
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
      <CursorRoot />
      <PulseFloor />
    </FocusedBlockProvider>
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
