import type { ComponentMetadata } from "../../services/ui_catalog";
import { CatalogBrowser } from "./components/catalog_browser";
import { PreviewPane } from "./components/preview_pane";
import { PropsPanel } from "./components/props_panel";
import * as styles from "./dev_components.css";

export interface DevComponentsUIProps {
  components: ComponentMetadata[];
  selected: ComponentMetadata | null;
  propValues: Record<string, unknown>;
  errors: Record<string, string>;
  snippets: { yaml: string; tag: string | null };
  lastCopied: "yaml" | "tag" | null;
  error: string | null;
  onSelect: (name: string) => void;
  onPropsChange: (next: Record<string, unknown>) => void;
  onCopy: (kind: "yaml" | "tag") => void;
}

export function DevComponentsUI({
  components,
  selected,
  propValues,
  errors,
  snippets,
  lastCopied,
  error,
  onSelect,
  onPropsChange,
  onCopy,
}: DevComponentsUIProps) {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <h1 className={styles.heading}>Component Playground</h1>
        <span className={styles.devBadge}>Developer surface</span>
        <span className={styles.topBarSpacer} />
        <span className={styles.topBarMeta}>
          {components.length} components · schema v1
        </span>
        <a className={styles.docsLink} href="/docs/extensions/ui-authoring.md">
          Docs ↗
        </a>
      </header>

      {error ? <div className={styles.errorBlock}>{error}</div> : null}

      <div className={styles.body}>
        <div className={styles.bodyCol}>
          <CatalogBrowser
            components={components}
            selectedName={selected?.name ?? null}
            onSelect={onSelect}
          />
        </div>
        <div className={styles.bodyCol}>
          <PreviewPane
            metadata={selected}
            propValues={propValues}
            hasValidationErrors={hasErrors}
          />
        </div>
        <div className={styles.bodyCol}>
          <PropsPanel
            metadata={selected}
            values={propValues}
            errors={errors}
            snippets={snippets}
            onChange={onPropsChange}
            onCopy={onCopy}
            lastCopied={lastCopied}
          />
        </div>
      </div>
    </div>
  );
}
