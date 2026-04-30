import type { Recipe } from "../../api/client";
import { RecipeCatalog } from "../../catalog/recipe_catalog";
import { PageHero } from "../../components/base/page_hero";
import { shell } from "./recipes.css";

export interface RecipesUIProps {
  onOpenRecipe?: (recipe: Recipe) => void;
}

export function RecipesUI({ onOpenRecipe }: RecipesUIProps) {
  return (
    <div className={shell}>
      <PageHero
        eyebrow="Authoring surface · Recipes"
        title="Recipes"
        meta={
          <span>
            Pre-built starting points contributed by extensions and user authors. Open one
            to launch a deployment in seconds.
          </span>
        }
      />
      <RecipeCatalog onOpenRecipe={onOpenRecipe} />
    </div>
  );
}
