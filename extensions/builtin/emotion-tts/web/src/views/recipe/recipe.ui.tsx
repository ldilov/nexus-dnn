import { useEffect, useState, type ReactNode } from "react";
import * as css from "./recipe.css";
import { Banner } from "../../components/banner";
import type { Deployment } from "../../services/deployments_client";
import type { RecipeField } from "../../services/workflows_client";

export interface RecipeUiProps {
  deployment: Deployment;
  hero: ReactNode;
  quickActions?: ReactNode;
  scriptSection: ReactNode;
  parsedDialogueSection: ReactNode;
  castSection: ReactNode;
  emotionSection: ReactNode;
  performanceSection: ReactNode;
  recentRunsSection: ReactNode;
  auditSection?: ReactNode;
  workflowCustomised?: boolean;
  unmappableFields?: RecipeField[];
}

export function RecipeUi(props: RecipeUiProps): JSX.Element {
  const customised = props.workflowCustomised ?? false;
  const unmappable = props.unmappableFields ?? [];
  const heroTitle = resolveHeroTitle(props.deployment.displayName, props.deployment.deploymentId);
  const showScrollTop = useScrollPastThreshold(360);

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
        {props.auditSection && (
          <RecipeSection
            number="07"
            title="Edit history"
            id="recipe-section-audit"
            variant="default"
            defaultCollapsed={true}
          >
            {props.auditSection}
          </RecipeSection>
        )}
      </div>
      <button
        type="button"
        className={css.scrollTopBtn}
        data-visible={showScrollTop ? "true" : "false"}
        aria-label="Scroll to top"
        title="Scroll to top"
        onClick={scrollToTop}
      >
        ↑
      </button>
    </div>
  );
}

function useScrollPastThreshold(threshold: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const target = findScrollContainer();
    const read = (): number => (target instanceof Window ? window.scrollY : (target as HTMLElement).scrollTop);
    const update = (): void => setPast(read() > threshold);
    update();
    const opts: AddEventListenerOptions = { passive: true };
    target.addEventListener("scroll", update, opts);
    return () => target.removeEventListener("scroll", update, opts);
  }, [threshold]);
  return past;
}

function findScrollContainer(): Window | HTMLElement {
  // The host's deployment-detail panel uses overflow:auto on `app_canvasContent`.
  // Walk up from the recipe shell to find the nearest scrollable ancestor.
  if (typeof document === "undefined") return window;
  let el: HTMLElement | null = document.querySelector("emotion-tts-app");
  while (el) {
    const style = window.getComputedStyle(el);
    if (/(auto|scroll|overlay)/.test(style.overflowY)) return el;
    el = el.parentElement;
  }
  return window;
}

function scrollToTop(): void {
  const target = findScrollContainer();
  if (target instanceof Window) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    (target as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
  }
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
            {number} / {title}
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
