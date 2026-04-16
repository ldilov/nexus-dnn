import { useState, useCallback, useEffect, useMemo } from "react";
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
import { ModulesView } from "./modules/modules_view";
import { BlueprintView } from "./modules/blueprint_view";
import { InstanceView } from "./modules/instance_view/instance_view";
import { DraftView } from "./modules/instance_view/draft_view";
import { sweepStaleDrafts } from "./modules/draft/draft_envelope";
import { useOperatorSpecs } from "./hooks/use_operator_specs";
import { useHashRoute, replaceHash } from "./hooks/use_hash_route";
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
  const [route, navigateHash] = useHashRoute();

  const hashRoute = useMemo(() => {
    const [first, second, third, fourth] = route.segments;
    if (first === "modules") {
      if (!second) return { kind: "modules-list" as const };
      // Spec 019 refinement: pre-refinement draft URL `/#/modules/user:draft:{uuid}`
      // redirects to the new namespaced shape `/#/modules/user:blank/draft/{uuid}`.
      if (second.startsWith("user:draft:")) {
        const uuid = second.slice("user:draft:".length);
        replaceHash(`#/modules/user:blank/draft/${uuid}`);
        return {
          kind: "draft" as const,
          sourceModuleId: "user:blank",
          uuid,
        };
      }
      // New shape (FR-051): `/#/modules/{source_module_id}/draft/{uuid}`.
      if (third === "draft" && fourth) {
        return {
          kind: "draft" as const,
          sourceModuleId: decodeURIComponent(second),
          uuid: fourth,
        };
      }
      if (third === "blueprint") {
        return {
          kind: "blueprint" as const,
          moduleId: decodeURIComponent(second),
          recipeId: route.query.get("recipe_id") ?? undefined,
        };
      }
      return { kind: "module-detail" as const, moduleId: decodeURIComponent(second) };
    }
    if (first === "deployments" && second) {
      return { kind: "instance" as const, deploymentId: decodeURIComponent(second) };
    }
    // Legacy redirect (FR-004): recipes → modules; workflows/{id} → modules/user:{id}/blueprint
    if (first === "recipes") {
      replaceHash("#/modules");
      return { kind: "modules-list" as const };
    }
    if (first === "workflows" && second) {
      replaceHash(`#/modules/user:${encodeURIComponent(second)}/blueprint`);
      return { kind: "blueprint" as const, moduleId: `user:${second}` };
    }
    return null;
  }, [route]);

  useEffect(() => {
    if (!hashRoute) return;
    if (
      hashRoute.kind === "modules-list" ||
      hashRoute.kind === "module-detail" ||
      hashRoute.kind === "blueprint" ||
      hashRoute.kind === "draft"
    ) {
      setActiveNav("modules");
    } else if (hashRoute.kind === "instance") {
      // scan-terminology: allow — sidebar item stays canonical
      setActiveNav("deployments");
    }
  }, [hashRoute]);

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
      id: `ext:${l.id}` as NavItemId,
      label: l.display_name,
      icon: "extension",
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
    if (id === "modules") {
      navigateHash("#/modules");
    }
    setActiveNav(id);
  }, [navigateHash]);

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
    // Spec 019 — hash-route-driven views take precedence over sidebar-driven ones.
    if (hashRoute?.kind === "modules-list") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <ModulesView onNavigate={navigateHash} />
          </div>
        </div>
      );
    }
    if (hashRoute?.kind === "module-detail") {
      // Spec 019 refinement: `/#/modules/{id}` renders the Instance view
      // (4 read-only tabs + 3 CTAs) — the canonical per-module surface.
      // Old ModuleDetailView (list-of-deployments) is kept in-repo for
      // reference but no longer routed.
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <InstanceView moduleId={hashRoute.moduleId} onNavigate={navigateHash} />
          </div>
        </div>
      );
    }
    if (hashRoute?.kind === "blueprint") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <BlueprintView
              moduleId={hashRoute.moduleId}
              recipeId={hashRoute.recipeId}
              onNavigate={navigateHash}
            />
          </div>
        </div>
      );
    }
    if (hashRoute?.kind === "instance") {
      // scan-terminology: allow — route segment is `/deployments/{id}`;
      // the deployment editor from spec 018 lives here, not an instance
      // editor. For v1 the editor is still pending; this placeholder
      // routes the user to the flat deployments list scoped to their row.
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <DeploymentsView onNavigate={navigateHash} />
          </div>
        </div>
      );
    }
    if (hashRoute?.kind === "draft") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <DraftView
              sourceModuleId={hashRoute.sourceModuleId}
              draftUuid={hashRoute.uuid}
              onNavigate={navigateHash}
            />
          </div>
        </div>
      );
    }

    if (activeExtensionLayoutId) {
      return <ExtensionLayoutView layoutId={activeExtensionLayoutId} />;
    }

    if (activeNav === "modules") {
      return (
        <div className={styles.canvasColumn}>
          <div className={styles.canvasContent}>
            <ModulesView onNavigate={navigateHash} />
          </div>
        </div>
      );
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
            <DeploymentsView onNavigate={navigateHash} />
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
