import { useState, useCallback, useEffect } from "react";
import { Shell } from "./layout/shell";
import { TopBar, type ViewId } from "./layout/top_bar";
import { Sidebar, type NavItemId } from "./layout/sidebar";
import { RightInspector } from "./layout/right_inspector";
import { Tabs } from "./components/tabs";
import { ToolCatalog } from "./catalog/tool_catalog";
import { RecipeCatalog } from "./catalog/recipe_catalog";
import { ExtensionList } from "./catalog/extension_list";
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
} from "./api/client";
import * as styles from "./app.css";

type BottomTabId = "logs" | "events" | "problems" | "workers";

const BOTTOM_TABS = [
  { id: "logs" as const, label: "Logs" },
  { id: "events" as const, label: "Events" },
  { id: "problems" as const, label: "Problems" },
  { id: "workers" as const, label: "Workers" },
] as const;

type SecondaryTabId = "tools" | "recipes" | "extensions";

const SECONDARY_TABS: { id: SecondaryTabId; label: string }[] = [
  { id: "tools", label: "Tools" },
  { id: "recipes", label: "Recipes" },
  { id: "extensions", label: "Extensions" },
];

const SECONDARY_CONTENT_STATIC: Partial<Record<SecondaryTabId, React.ComponentType>> = {
  tools: ToolCatalog,
  recipes: RecipeCatalog,
};

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

type SecondaryPanelProps = {
  onExtensionToggled?: () => void;
};

function SecondaryPanel({ onExtensionToggled }: SecondaryPanelProps) {
  const [activeTab, setActiveTab] = useState<SecondaryTabId>("tools");
  const StaticContent = SECONDARY_CONTENT_STATIC[activeTab];

  return (
    <div className={styles.canvasColumn}>
      <Tabs
        items={SECONDARY_TABS}
        activeId={activeTab}
        onSelect={setActiveTab}
        variant="underline"
      />
      <div className={styles.canvasContent}>
        {StaticContent ? (
          <StaticContent />
        ) : (
          <ExtensionList onExtensionToggled={onExtensionToggled} />
        )}
      </div>
    </div>
  );
}

export function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [activeNav, setActiveNav] = useState<NavItemId>("home");
  const [activeView, setActiveView] = useState<ViewId>("stage");
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTabId>("logs");
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [_runId, setRunId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [extensionLayouts, setExtensionLayouts] = useState<LayoutSummary[]>([]);
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
        if (wfs[0]) {
          fetchWorkflow(wfs[0].id).then(setWorkflow);
        }
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
    if (activeExtensionLayoutId) {
      return <ExtensionLayoutView layoutId={activeExtensionLayoutId} />;
    }

    if (activeNav === "home") {
      const defaultLayout = extensionLayouts.find((l) => l.is_default);
      if (defaultLayout) {
        return <ExtensionLayoutView layoutId={defaultLayout.id} />;
      }
      return (
        <p className={styles.placeholderText}>
          Welcome to Nexus DNN. Enable an extension to get started.
        </p>
      );
    }

    if (activeNav === "workflows") {
      if (loadError) {
        return <p className={styles.placeholderText}>{loadError}</p>;
      }
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
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
          </div>
        </div>
      );
    }

    if (activeNav === "recipes") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <RecipeCatalog />
          </div>
        </div>
      );
    }

    if (activeNav === "extensions") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <ExtensionList onExtensionToggled={refreshLayouts} />
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

  const showSecondaryPanel = !activeNav.startsWith("ext:") && activeNav !== "home";
  const secondaryContent = showSecondaryPanel ? (
    <>
      <SecondaryPanel onExtensionToggled={refreshLayouts} />
      {workflows.length > 1 && (
        <div className={styles.workflowListFallback}>
          {workflows.map((wf) => (
            <button key={wf.id} onClick={() => handleWorkflowSelect(wf.id)}>
              {wf.name}
            </button>
          ))}
        </div>
      )}
    </>
  ) : undefined;

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
          onNavigate={setActiveNav}
          pinned={sidebarPinned}
          onTogglePin={() => setSidebarPinned((p) => !p)}
          secondaryContent={secondaryContent}
          extensionNavItems={extensionNavItems}
        />
      }
      sidebarPinned={sidebarPinned}
      canvas={renderCanvas()}
      inspector={
        <RightInspector
          selectedNode={selectedNode}
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
