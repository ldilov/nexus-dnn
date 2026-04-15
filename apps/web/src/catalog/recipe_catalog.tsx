import { useEffect, useMemo, useState } from "react";
import {
  fetchExtensions,
  fetchRecipes,
  revealExtensionFolder,
  type Extension,
  type Recipe,
} from "../api/client";
import { CatalogShell } from "./catalog_shell";
import { CatalogControls, type StatusKey } from "./catalog_controls";
import {
  filterByExtensionEnablement,
  groupByExtension,
  type Groupable,
  type WithOrphan,
} from "./catalog_grouping";
import { matchesControls, useCatalogState } from "../hooks/use_catalog_state";
import * as sharedStyles from "./catalog.css";
import * as styles from "./recipe_catalog.css";
import * as shellStyles from "./catalog_shell.css";

type RecipeItem = Recipe & Groupable;

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

const RECIPE_STATUS_FILTERS: StatusKey[] = [];

export interface RecipeCatalogProps {
  onOpenRecipe?: (recipe: Recipe) => void;
}

export function RecipeCatalog({ onOpenRecipe }: RecipeCatalogProps) {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [revealNotice, setRevealNotice] = useState<string | null>(null);
  const { state: controls, setState: setControls } = useCatalogState("recipes");

  useEffect(() => {
    Promise.all([fetchRecipes(), fetchExtensions()])
      .then(([recs, exts]) => {
        setRecipes(recs as RecipeItem[]);
        setExtensions(exts);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load recipes"),
      );
  }, []);

  const extNameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const ext of extensions) {
      map.set(ext.id, ext.name ?? ext.id);
    }
    return map;
  }, [extensions]);

  const enabled = useMemo(
    () =>
      filterByExtensionEnablement(recipes, extensions, {
        // Recipes are tightly tied to their extension — if the extension is
        // disabled the recipe can't execute, so we hide it regardless of
        // whether the user touched the underlying workflow.
        keepUserEditedFromDisabled: false,
      }),
    [recipes, extensions],
  );

  const visible = useMemo(
    () =>
      enabled.filter((recipe) =>
        matchesControls(recipe, controls, (extId) => extNameById.get(extId)),
      ),
    [enabled, controls, extNameById],
  );

  const groups = useMemo(
    () => groupByExtension(visible, extensions),
    [visible, extensions],
  );

  const handleReveal = async (extensionId: string) => {
    try {
      const result = await revealExtensionFolder(extensionId);
      if (!result.revealed && result.path) {
        await navigator.clipboard?.writeText(result.path);
        setRevealNotice(`Path copied to clipboard: ${result.path}`);
      } else {
        setRevealNotice(`Revealed ${extensionId} in file manager`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not open extension folder";
      setRevealNotice(msg);
    }
    window.setTimeout(() => setRevealNotice(null), 4000);
  };

  if (error) return <p className={sharedStyles.errorState}>{error}</p>;

  const anyControlsActive =
    controls.query.length > 0 ||
    controls.statusFilters.size > 0 ||
    controls.extensionFilter !== null;

  return (
    <div>
      <CatalogControls
        state={controls}
        onChange={setControls}
        availableExtensions={extensions}
        availableStatuses={RECIPE_STATUS_FILTERS}
        placeholder="Search recipes by name, category, or extension…"
        resultCount={visible.length}
        totalCount={enabled.length}
      />
      {revealNotice ? (
        <div className={shellStyles.bannerInfo} style={{ marginBottom: "16px" }}>
          {revealNotice}
        </div>
      ) : null}
      <CatalogShell<WithOrphan<RecipeItem>>
        groups={groups}
        gridClassName={styles.grid}
        emptyTitle={
          anyControlsActive
            ? `No recipes match "${controls.query}"`
            : "No recipes available"
        }
        emptyHint={
          anyControlsActive
            ? "Clear your search or filters to see every recipe."
            : "Install an extension that ships a recipe to populate this list."
        }
        renderGroupAction={(group) => {
          if (group.kind !== "extension" || !group.extension) return null;
          const extId = group.extension.id;
          return (
            <button
              type="button"
              className={shellStyles.revealButton}
              onClick={() => handleReveal(extId)}
              title="Open extension folder"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
                aria-hidden="true"
              >
                folder_open
              </span>
              Folder
            </button>
          );
        }}
        renderCard={(recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onSelect={() => onOpenRecipe?.(recipe)}
          />
        )}
      />
    </div>
  );
}

function RecipeCard({
  recipe,
  onSelect,
}: {
  recipe: WithOrphan<RecipeItem>;
  onSelect: () => void;
}) {
  return (
    <button type="button" className={styles.card} onClick={onSelect}>
      <div className={styles.topRow}>
        <div className={styles.iconBox}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "22px", fontVariationSettings: "'FILL' 1, 'wght' 500" }}
          >
            {iconFor(recipe)}
          </span>
        </div>
        <span className={styles.categoryBadge}>{recipe.category}</span>
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
}
