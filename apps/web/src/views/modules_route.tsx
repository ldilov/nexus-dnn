import { useLocation, useNavigate, useParams } from "react-router";
import { ModulesView } from "./modules/modules.view";
import { BlueprintView } from "./modules/blueprint.view";
import { InstanceView } from "./modules/instance_view/instance.view";
import { DraftView } from "./modules/instance_view/draft.view";

export function ModulesIndexRoute() {
  return <ModulesView />;
}

export function ModuleInstanceRoute() {
  const { moduleId = "" } = useParams();
  return <InstanceView moduleId={decodeURIComponent(moduleId)} />;
}

export function ModuleBlueprintRoute() {
  const { moduleId = "" } = useParams();
  const search = new URLSearchParams(useLocation().search);
  const recipeId = search.get("recipe_id") ?? undefined;
  return (
    <BlueprintView
      moduleId={decodeURIComponent(moduleId)}
      recipeId={recipeId}
    />
  );
}

export function ModuleDraftRoute() {
  const { moduleId = "", uuid = "" } = useParams();
  return (
    <DraftView
      sourceModuleId={decodeURIComponent(moduleId)}
      draftUuid={uuid}
    />
  );
}

export function LegacyDraftRedirectRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const marker = "/modules/user:draft:";
  const idx = pathname.indexOf(marker);
  if (idx < 0) {
    navigate("/modules", { replace: true });
    return null;
  }
  const uuid = pathname.slice(idx + marker.length);
  navigate(`/modules/user:blank/draft/${uuid}`, { replace: true });
  return null;
}
