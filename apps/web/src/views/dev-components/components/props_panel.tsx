import type { ComponentMetadata } from "../../../services/ui_catalog";
import { PropsEditor } from "../../../components/props-editor/props_editor";
import * as styles from "./props_panel.css";

export interface PropsPanelProps {
  metadata: ComponentMetadata | null;
  values: Record<string, unknown>;
  errors: Record<string, string>;
  snippets: { yaml: string; tag: string | null };
  onChange: (next: Record<string, unknown>) => void;
  onCopy: (kind: "yaml" | "tag") => void;
  lastCopied: "yaml" | "tag" | null;
}

export function PropsPanel({
  metadata,
  values,
  errors,
  snippets,
  onChange,
  onCopy,
  lastCopied,
}: PropsPanelProps) {
  if (!metadata) {
    return (
      <aside className={styles.root}>
        <div className={styles.empty}>
          Props will appear here once you select a component.
        </div>
      </aside>
    );
  }
  return (
    <aside className={styles.root}>
      <header className={styles.header}>
        <h2 className={styles.title}>{metadata.display_name}</h2>
        <code className={styles.tagLabel}>{metadata.name}</code>
        {metadata.description ? (
          <p className={styles.description}>{metadata.description}</p>
        ) : null}
      </header>

      <div className={styles.editorWrap}>
        <PropsEditor
          metadata={metadata}
          values={values}
          errors={errors}
          onChange={onChange}
        />
      </div>

      <section className={styles.snippets} aria-label="Copy-to-clipboard snippets">
        <div className={styles.snippetBlock}>
          <div className={styles.snippetHeader}>
            <span className={styles.snippetLabel}>YAML layout fragment</span>
            <button
              type="button"
              className={styles.copyButton}
              onClick={() => onCopy("yaml")}
            >
              {lastCopied === "yaml" ? "copied ✓" : "copy YAML"}
            </button>
          </div>
          <pre className={styles.snippetBody}>{snippets.yaml}</pre>
        </div>

        {snippets.tag !== null ? (
          <div className={styles.snippetBlock}>
            <div className={styles.snippetHeader}>
              <span className={styles.snippetLabel}>Custom-element tag</span>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => onCopy("tag")}
              >
                {lastCopied === "tag" ? "copied ✓" : "copy tag"}
              </button>
            </div>
            <pre className={styles.snippetBody}>{snippets.tag}</pre>
          </div>
        ) : null}
      </section>
    </aside>
  );
}
