import { Component as Recipes } from "./recipes";
import { useRootOutletContext } from "../root_layout";

export default function RecipesRoute() {
  const ctx = useRootOutletContext();
  return <Recipes onOpenRecipe={ctx.onOpenRecipe} />;
}
