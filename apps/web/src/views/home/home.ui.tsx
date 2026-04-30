import type { Extension, Recipe, Workflow } from "../../api/client";
import { RecipeCatalog } from "../../catalog/recipe_catalog";
import { PageHero } from "../../components/base/page_hero";
import { Section } from "../../components/base/section";
import { StatusChip } from "../../components/base/status_chip";
import * as styles from "./home.css";

export interface HomeUIProps {
  recipes: Recipe[];
  workflows: Workflow[];
  extensions: Extension[];
  activeExtensions: number;
  onOpenRecipe?: (recipe: Recipe) => void;
  onGoToRecipes?: () => void;
  onGoToWorkflows?: () => void;
  onGoToExtensions?: () => void;
}

export function HomeUI({
  recipes,
  workflows,
  extensions,
  activeExtensions,
  onOpenRecipe,
  onGoToRecipes,
  onGoToWorkflows,
  onGoToExtensions,
}: HomeUIProps) {
  return (
    <div className={styles.container}>
      <PageHero
        eyebrow="Nexus DNN · Local-First AI Runtime"
        title="Welcome back"
        meta={
          <>
            <StatusChip kind="idle" label="Local-only" />
            <span className={styles.emptyLine}>
              Launch a recipe to start working, inspect a workflow graph, or manage
              the extensions that power your local AI stack.
            </span>
          </>
        }
      />

      <div className={styles.statGrid}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Recipes</span>
          <span className={styles.statValue}>{recipes.length}</span>
          <span className={styles.statDelta}>available to run</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Workflows</span>
          <span className={styles.statValue}>{workflows.length}</span>
          <span className={styles.statDelta}>compiled graphs</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Extensions</span>
          <span className={styles.statValue}>{extensions.length}</span>
          <span className={styles.statDelta}>{activeExtensions} active</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Runs</span>
          <span className={styles.statValue}>—</span>
          <span className={styles.statDelta}>last 24h</span>
        </div>
      </div>

      <Section
        number="01"
        title="Featured recipes"
        right={
          onGoToRecipes && (
            <button type="button" className={styles.sectionLink} onClick={onGoToRecipes}>
              View all →
            </button>
          )
        }
      >
        <RecipeCatalog onOpenRecipe={onOpenRecipe} />
      </Section>

      <Section number="02" title="Get moving">
        <div className={styles.statGrid}>
          <button
            type="button"
            className={`${styles.stat} ${styles.ctaStat}`}
            onClick={onGoToWorkflows}
          >
            <span className={styles.statLabel}>Inspect</span>
            <span className={styles.statValue}>Workflows</span>
            <span className={styles.statDelta}>See node graphs</span>
          </button>
          <button
            type="button"
            className={`${styles.stat} ${styles.ctaStat}`}
            onClick={onGoToExtensions}
          >
            <span className={styles.statLabel}>Manage</span>
            <span className={styles.statValue}>Extensions</span>
            <span className={styles.statDelta}>Enable and install</span>
          </button>
        </div>
      </Section>
    </div>
  );
}
