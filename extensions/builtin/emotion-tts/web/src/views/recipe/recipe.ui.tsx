import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import * as css from "./recipe.css";
import { Banner } from "../../components/banner";
import type { Deployment } from "../../services/deployments_client";
import type { RecipeField } from "../../services/workflows_client";
import { StickyActionBar } from "./components/sticky_action_bar";
import {
  STICKY_BAR_THRESHOLD,
  scrollToTop,
  useScrollPastThreshold,
} from "./hooks/use_scroll_past_threshold";

export interface RecipeUiProps {
  deployment: Deployment;
  hero: ReactNode;
  quickActions?: ReactNode;
  /** Card surfaced ABOVE the section stack — last-N generated audios with
   * inline play / download. Optional: when not provided the recipe shell
   * renders without the recent-generations strip. */
  recentGenerations?: ReactNode;
  scriptSection: ReactNode;
  parsedDialogueSection: ReactNode;
  voiceLibrarySection?: ReactNode;
  castSection: ReactNode;
  emotionSection: ReactNode;
  performanceSection: ReactNode;
  recentRunsSection: ReactNode;
  auditSection?: ReactNode;
  workflowCustomised?: boolean;
  unmappableFields?: RecipeField[];
  /** Drives the floating toolbar's Generate enable-state. */
  canGenerate?: boolean;
}

export function RecipeUi(props: RecipeUiProps): JSX.Element {
  const customised = props.workflowCustomised ?? false;
  const unmappable = props.unmappableFields ?? [];
  const heroTitle = resolveHeroTitle(props.deployment.displayName, props.deployment.deploymentId);
  const showScrollTop = useScrollPastThreshold(STICKY_BAR_THRESHOLD);
  const canGenerate = props.canGenerate ?? false;

  return (
    <div className={css.shell}>
      <header className={css.heroBlock}>
        <div className={css.heroEyebrow}>EmotionTTS · Recipe Studio</div>
        <div className={css.heroTopRow}>
          <h1 className={css.heroTitle}>{heroTitle}</h1>
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
      {props.quickActions && (
        <div className={css.quickActions} aria-label="Quick actions">
          {props.quickActions}
        </div>
      )}
      {props.recentGenerations}
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
        {props.voiceLibrarySection && (
          <RecipeSection
            number="03"
            title="Voice library"
            id="recipe-section-voice-library"
            variant="default"
          >
            {props.voiceLibrarySection}
          </RecipeSection>
        )}
        <RecipeSection
          number={props.voiceLibrarySection ? "04" : "03"}
          title="Cast"
          id="recipe-section-cast"
          variant="default"
        >
          {props.castSection}
        </RecipeSection>
        <RecipeSection
          number={props.voiceLibrarySection ? "05" : "04"}
          title="Emotion"
          id="recipe-section-emotion"
          variant="split"
        >
          {props.emotionSection}
        </RecipeSection>
        <RecipeSection
          number={props.voiceLibrarySection ? "06" : "05"}
          title="Performance"
          id="recipe-section-performance"
          variant="default"
        >
          {props.performanceSection}
        </RecipeSection>
        <RecipeSection
          number={props.voiceLibrarySection ? "07" : "06"}
          title="Recent runs"
          id="recipe-section-runs"
          variant="default"
        >
          {props.recentRunsSection}
        </RecipeSection>
        {props.auditSection && (
          <RecipeSection
            number={props.voiceLibrarySection ? "08" : "07"}
            title="Edit history"
            id="recipe-section-audit"
            variant="default"
            defaultCollapsed={true}
          >
            {props.auditSection}
          </RecipeSection>
        )}
      </div>
      <StickyActionBar visible={showScrollTop} canGenerate={canGenerate} />
      {typeof document !== "undefined" &&
        createPortal(
          <button
            type="button"
            className={css.scrollTopBtn}
            data-visible={showScrollTop ? "true" : "false"}
            aria-label="Scroll to top"
            title="Scroll to top"
            onClick={scrollToTop}
          >
            ↑
          </button>,
          document.body,
        )}
    </div>
  );
}

function resolveHeroTitle(displayName: string, deploymentId: string): string {
  const trimmed = (displayName ?? "").trim();
  if (!trimmed || trimmed === deploymentId) {
    return "Recipe Studio";
  }
  return trimmed;
}

interface RecipeSectionProps {
  number: string;
  title: string;
  id: string;
  variant: "default" | "split";
  defaultCollapsed?: boolean;
  children: ReactNode;
}

function RecipeSection({
  number,
  title,
  id,
  variant,
  defaultCollapsed = false,
  children,
}: RecipeSectionProps): JSX.Element {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const bodyId = `${id}-body`;
  return (
    <section className={css.section} aria-labelledby={id}>
      <header className={css.sectionHeader}>
        <button
          type="button"
          className={css.sectionToggle}
          aria-expanded={!collapsed}
          aria-controls={bodyId}
          onClick={() => setCollapsed((c) => !c)}
        >
          <span className={css.sectionEyebrow}>
            <span className={css.sectionEyebrowNumber}>{number}</span>
            <span className={css.sectionEyebrowSlash} aria-hidden="true">
              /
            </span>
            <span className={css.sectionEyebrowLabel}>{title}</span>
          </span>
          <h2 id={id} className={css.sectionTitle}>
            {title}
          </h2>
          <span
            className={css.sectionChevron}
            data-collapsed={collapsed ? "true" : "false"}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>
      </header>
      {!collapsed && (
        <div
          id={bodyId}
          className={variant === "split" ? css.splitBody : css.sectionBody}
        >
          {children}
        </div>
      )}
    </section>
  );
}
