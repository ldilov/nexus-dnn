import { createHashRouter, redirect, type LoaderFunctionArgs } from "react-router";
import RootLayout, { loader as rootLoader, RootError } from "./root_layout";
import HomeRoute from "./views/home/home.route";
import RecipesRoute from "./views/recipes/recipes.route";
import WorkflowsRoute from "./views/workflows/workflows.route";
import BackendsRoute from "./views/backends/backends.route";
import { BackendRuntimesView } from "./views/backend-runtimes/backend_runtimes.view";
import {
  ModulesIndexRoute,
  ModuleInstanceRoute,
  ModuleBlueprintRoute,
  ModuleDraftRoute,
  LegacyDraftRedirectRoute,
} from "./views/modules/modules.routes";
import {
  DeploymentsIndexRoute,
  DeploymentDetailRoute,
} from "./views/deployments/deployments.routes";
import {
  ExtensionsGalleryRoute,
  ExtensionLayoutRoute,
} from "./views/extensions/extensions.routes";
import { RunsPlaceholderRoute } from "./views/runs/runs.route";
import { ArtifactsPlaceholderRoute } from "./views/artifacts/artifacts.route";
import { RuntimeLatticeRoute } from "./views/runtime_lattice/lattice.view";

export const router = createHashRouter([
  {
    Component: RootLayout,
    loader: rootLoader,
    errorElement: <RootError />,
    children: [
      { index: true, Component: HomeRoute },
      { path: "recipes", Component: RecipesRoute },
      { path: "workflows", Component: WorkflowsRoute },
      {
        path: "workflows/:id",
        loader: ({ params }: LoaderFunctionArgs) =>
          redirect(
            `/modules/${encodeURIComponent(`user:${params.id ?? ""}`)}/blueprint`,
          ),
      },
      { path: "modules", Component: ModulesIndexRoute },
      { path: "modules/:moduleId/blueprint", Component: ModuleBlueprintRoute },
      { path: "modules/:moduleId/draft/:uuid", Component: ModuleDraftRoute },
      { path: "modules/user:draft::uuid", Component: LegacyDraftRedirectRoute },
      { path: "modules/:moduleId", Component: ModuleInstanceRoute },
      { path: "deployments", Component: DeploymentsIndexRoute },
      { path: "deployments/:deploymentId", Component: DeploymentDetailRoute },
      { path: "backends", Component: BackendsRoute },
      { path: "backend-runtimes", Component: BackendRuntimesView },
      { path: "models", lazy: () => import("./views/models-search") },
      { path: "models-search", lazy: () => import("./views/models-search") },
      { path: "extensions", Component: ExtensionsGalleryRoute },
      {
        // audit-allow: boundary — dispatcher route mounting the Local LLM chat surface; literal IS the contract
        path: "extensions/nexus.local-llm/chat/:threadId",
        lazy: async () => {
          // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
          const mod = await import("./views/extensions/local-llm/chat");
          return { Component: mod.Component, loader: mod.loader };
        },
      },
      {
        path: "extensions/:id/settings",
        lazy: async () => {
          const mod = await import("./views/extension-settings/extension_settings.routes");
          return { Component: mod.ExtensionSettingsRoute };
        },
      },
      { path: "extensions/:layoutId", Component: ExtensionLayoutRoute },
      { path: "runs", Component: RunsPlaceholderRoute },
      { path: "runtime/load/:runId", Component: RuntimeLatticeRoute },
      { path: "artifacts", Component: ArtifactsPlaceholderRoute },
      { path: "dev/components", lazy: () => import("./views/dev-components") },
      { path: "dev/lattice", lazy: () => import("./views/_dev/lattice_storybook") },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
