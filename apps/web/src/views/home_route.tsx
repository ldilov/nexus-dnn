import { Component as Home } from "./home";
import { useRootOutletContext } from "../root_layout";

export default function HomeRoute() {
  const ctx = useRootOutletContext();
  return (
    <Home
      onOpenRecipe={ctx.onOpenRecipe}
      onGoToRecipes={ctx.onGoToRecipes}
      onGoToWorkflows={ctx.onGoToWorkflows}
      onGoToExtensions={ctx.onGoToExtensions}
    />
  );
}
