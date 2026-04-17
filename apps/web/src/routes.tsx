import { createHashRouter, redirect, type LoaderFunctionArgs } from "react-router";
import RootLayout, { loader as rootLoader, RootError } from "./root_layout";
import HomeRoute from "./views/home/home.route";
import RecipesRoute from "./views/recipes/recipes.route";
import WorkflowsRoute from "./views/workflows/workflows.route";
import BackendsRoute from "./views/backends/backends.route";
import ModelsRoute from "./views/models/models.route";
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
      { path: "models", Component: ModelsRoute },
      { path: "extensions", Component: ExtensionsGalleryRoute },
      { path: "extensions/:layoutId", Component: ExtensionLayoutRoute },
      { path: "runs", Component: RunsPlaceholderRoute },
      { path: "artifacts", Component: ArtifactsPlaceholderRoute },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);
