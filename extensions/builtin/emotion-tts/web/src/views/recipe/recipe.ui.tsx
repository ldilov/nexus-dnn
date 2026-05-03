import type { ReactNode } from "react";
import * as css from "./recipe.css";
import { Banner } from "../../components/banner";
import type { Deployment } from "../../services/deployments_client";
import type { RecipeField } from "../../services/workflows_client";

export interface RecipeUiProps {
  deployment: Deployment;
  hero: ReactNode;
  scriptSection: ReactNode;
  parsedDialogueSection: ReactNode;
  castSection: ReactNode;
  emotionSection: ReactNode;
  performanceSection: ReactNode;
  recentRunsSection: ReactNode;
  workflowCustomised?: boolean;
  unmappableFields?: RecipeField[];
}

export function RecipeUi(props: RecipeUiProps): JSX.Element {
  const customised = props.workflowCustomised ?? false;
  const unmappable = props.unmappableFields ?? [];

  return (
    <div className={css.shell}>
      <header className={css.heroBlock}>
        <div className={css.heroEyebrow}>EmotionTTS · Recipe Studio</div>
        <div className={css.heroTopRow}>
          <h1 className={css.heroTitle}>{props.deployment.displayName}</h1>
        </div>
        <p className={css.heroLede}>
          Author the script, cast the voices, sculpt the emotion, and modulate every utterance —
          all from a single screen, with cache-bound previews and a non-destructive edit chain.
        </p>
        {props.hero}
      </header>
      {customised && (
        <Banner severity="warning">
          <strong>Workflow customised.</strong>{" "}
          {unmappable.length === 0
            ? "Every recipe field still binds, but the graph topology diverges from the curated template."
            : `These fields are now managed in the graph: ${unmappable.join(", ")}.`}{" "}
          <a href="/#/workflows" target="_top">
            Open workflow canvas →
          </a>
        </Banner>
      )}
      <div className={css.sectionStack}>
        <RecipeSection
          number="01"
          title="Script"
          id="recipe-section-script"
          variant="default"
        >
          {props.scriptSection}
        </RecipeSection>
        <RecipeSection
          number="02"
          title="Parsed dialogue"
          id="recipe-section-parsed"
          variant="default"
        >
          {props.parsedDialogueSection}
        </RecipeSection>
        <RecipeSection
          number="03"
          title="Cast"
          id="recipe-section-cast"
          variant="default"
        >
          {props.castSection}
        </RecipeSection>
        <RecipeSection
          number="04"
          title="Emotion"
          id="recipe-section-emotion"
          variant="split"
        >
          {props.emotionSection}
        </RecipeSection>
        <RecipeSection
          number="05"
          title="Performance"
          id="recipe-section-performance"
          variant="default"
        >
          {props.performanceSection}
        </RecipeSection>
        <RecipeSection
          number="06"
          title="Recent runs"
          id="recipe-section-runs"
          variant="default"
        >
          {props.recentRunsSection}
        </RecipeSection>
      </div>
    </div>
  );
}

interface RecipeSectionProps {
  number: string;
  title: string;
  id: string;
  variant: "default" | "split";
  children: ReactNode;
}

function RecipeSection({ number, title, id, variant, children }: RecipeSectionProps): JSX.Element {
  return (
    <section className={css.section} aria-labelledby={id}>
      <header className={css.sectionHeader}>
        <div>
          <div className={css.sectionEyebrow}>
            {number} / {title}
          </div>
          <h2 id={id} className={css.sectionTitle}>
            {title}
          </h2>
        </div>
      </header>
      <div className={variant === "split" ? css.splitBody : css.sectionBody}>{children}</div>
    </section>
  );
}
