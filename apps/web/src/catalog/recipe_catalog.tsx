import { useEffect, useState } from "react";
import { fetchRecipes, type Recipe } from "../api/client";
import * as sharedStyles from "./catalog.css";
import * as styles from "./recipe_catalog.css";

const ICON_BY_CATEGORY: Record<string, string> = {
  LLM: "chat",
  RAG: "auto_stories",
  Vision: "visibility",
  Audio: "graphic_eq",
};

function iconFor(recipe: Recipe): string {
  const byCategory = ICON_BY_CATEGORY[recipe.category];
  if (byCategory) return byCategory;
  if (recipe.id.toLowerCase().includes("chat")) return "chat";
  if (recipe.id.toLowerCase().includes("rag")) return "auto_stories";
  return "bolt";
}

export type RecipeCatalogProps = {
  onOpenRecipe?: (recipe: Recipe) => void;
};

export function RecipeCatalog({ onOpenRecipe }: RecipeCatalogProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load recipes"),
      );
  }, []);

  if (error) return <p className={sharedStyles.errorState}>{error}</p>;

  if (recipes.length === 0) {
    return <p className={sharedStyles.emptyState}>No recipes available</p>;
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe, index) => {
        const isFeatured = index === 0;
        const cls = [styles.card, isFeatured ? styles.cardFeatured : ""].filter(Boolean).join(" ");
        return (
          <button
            key={recipe.id}
            type="button"
            className={cls}
            onClick={() => onOpenRecipe?.(recipe)}
          >
            <div className={styles.topRow}>
              <div className={styles.iconBox}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "22px", fontVariationSettings: "'FILL' 1, 'wght' 500" }}
                >
                  {iconFor(recipe)}
                </span>
              </div>
              {isFeatured ? (
                <span className={styles.featuredTag}>
                  <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>
                    bolt
                  </span>
                  Featured
                </span>
              ) : (
                <span className={styles.categoryBadge}>{recipe.category}</span>
              )}
            </div>

            <div className={styles.title}>{recipe.display_name}</div>
            <div className={styles.summary}>{recipe.summary}</div>

            <div className={styles.footer}>
              <span className={styles.workflowRef} title={recipe.workflow_template_ref}>
                {recipe.category} · v{recipe.version}
              </span>
              <span className={styles.openHint}>
                Open
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  arrow_forward
                </span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
