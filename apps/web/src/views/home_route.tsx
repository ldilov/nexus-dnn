import { HomeDashboard } from "../catalog/home_dashboard";
import { useRootOutletContext } from "../root_layout";

export default function HomeRoute() {
  const ctx = useRootOutletContext();
  return (
    <HomeDashboard
      onOpenRecipe={ctx.onOpenRecipe}
      onGoToRecipes={ctx.onGoToRecipes}
      onGoToWorkflows={ctx.onGoToWorkflows}
      onGoToExtensions={ctx.onGoToExtensions}
    />
  );
}
