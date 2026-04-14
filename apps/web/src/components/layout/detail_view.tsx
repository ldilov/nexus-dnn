import type { ReactNode } from "react";
import { Badge } from "../badge";
import * as styles from "./layout_styles.css";

type FieldDef = {
  label: string;
  key: string;
  format?: "text" | "status_badge" | "code" | "model_badge";
};

type ContextRef = {
  label: string;
  icon?: string;
};

type HealthDef = {
  label: string;
  value: number;
};

type MetricDef = {
  key: string;
  label: string;
  unit?: string;
  color?: "primary" | "secondary" | "tertiary";
};

type ModelDef = {
  label?: string;
  name: string;
  version?: string;
  contextWindow?: string;
};

type SectionDef = {
  title: string;
  type: "fields" | "context" | "health" | "metrics" | "model";
  fields?: FieldDef[];
  contextRefs?: ContextRef[];
  health?: HealthDef;
  metrics?: MetricDef[];
  model?: ModelDef;
};

type DetailViewProps = {
  headerTitle?: string;
  fields?: FieldDef[];
  sections?: SectionDef[];
  data?: Record<string, unknown>;
  children?: ReactNode;
};

function renderFieldValue(value: unknown, format?: string): ReactNode {
  if (value === undefined || value === null) return "--";

  if (format === "status_badge") {
    return <Badge label={String(value)} intent="info" showDot size="sm" />;
  }

  if (format === "model_badge") {
    return <Badge label={String(value)} intent="success" showDot size="sm" />;
  }

  if (format === "code") {
    return (
      <span style={{ fontFamily: "var(--font-code)" }}>{String(value)}</span>
    );
  }

  return String(value);
}

function FieldRow({ field, data }: { field: FieldDef; data: Record<string, unknown> }) {
  return (
    <div className={styles.detailField}>
      <span className={styles.detailFieldLabel}>{field.label}</span>
      <span className={styles.detailFieldValue}>
        {renderFieldValue(data[field.key], field.format)}
      </span>
    </div>
  );
}

function ModelSection({ model }: { model: ModelDef }) {
  return (
    <div className={styles.detailModelCard}>
      <span className={styles.detailModelLabel}>
        {model.label ?? "ACTIVE_MODEL"}
      </span>
      <div className={styles.detailModelNameRow}>
        <span className={styles.detailModelName}>{model.name}</span>
        {model.version && (
          <span className={styles.detailModelVersion}>{model.version}</span>
        )}
      </div>
      {model.contextWindow && (
        <span className={styles.detailModelInfo}>
          Context: {model.contextWindow}
        </span>
      )}
    </div>
  );
}

function colorForMetric(c?: string): string {
  if (c === "secondary") return "var(--color-accent-secondary)";
  if (c === "tertiary") return "var(--color-accent-tertiary)";
  return "var(--color-text-primary)";
}

function MetricsSection({
  title,
  metrics,
  data,
}: {
  title: string;
  metrics: MetricDef[];
  data: Record<string, unknown>;
}) {
  return (
    <div className={styles.detailSection}>
      <span className={styles.detailSectionTitle}>{title}</span>
      <div className={styles.detailMetricsGrid}>
        {metrics.map((m) => {
          const raw = data[m.key];
          const display = raw !== undefined && raw !== null ? String(raw) : "--";
          return (
            <div key={m.key} className={styles.detailMetricCard}>
              <span className={styles.detailMetricLabel}>{m.label}</span>
              <span
                className={styles.detailMetricValue}
                style={{ color: colorForMetric(m.color) }}
              >
                {display}
                {m.unit && (
                  <span className={styles.detailMetricUnit}>{m.unit}</span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContextSection({ title, refs }: { title: string; refs: ContextRef[] }) {
  return (
    <div className={styles.detailSection}>
      <span className={styles.detailSectionTitle}>{title}</span>
      {refs.map((ref, i) => (
        <div key={i} className={styles.detailContextItem}>
          {ref.icon && (
            <span className={`${styles.detailContextIcon} material-symbols-outlined`}>
              {ref.icon}
            </span>
          )}
          <span style={{ flex: 1 }}>{ref.label}</span>
          <button className={styles.detailContextClose} type="button">
            <span className="material-symbols-outlined" style={{ fontSize: "inherit" }}>
              close
            </span>
          </button>
        </div>
      ))}
      <button className={styles.detailAddRefButton} type="button">
        <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>add</span>
        Add Reference
      </button>
    </div>
  );
}

function HealthSection({ title, health }: { title: string; health: HealthDef }) {
  const pct = Math.max(0, Math.min(100, health.value));

  return (
    <div className={styles.detailSection}>
      <div className={styles.detailHealthCardGradient}>
        <div className={styles.detailHealthCard}>
          <div className={styles.detailHealthHeader}>
            <span className={styles.detailHealthDot} />
            <span className={styles.detailHealthLabel}>{title}</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.progressInfo}>
            <span className={styles.progressLabel}>{health.label}</span>
            <span className={styles.progressPercent}>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DetailView({
  headerTitle,
  fields = [],
  sections = [],
  data = {},
  children,
}: DetailViewProps) {
  return (
    <div className={styles.detailView}>
      {headerTitle && (
        <div className={styles.detailHeader}>
          <span className={styles.detailHeaderDot} />
          <span className={styles.detailHeaderTitle}>{headerTitle}</span>
          <span className={styles.detailLiveBadge}>
            <span className={styles.detailLiveDot} />
            LIVE
          </span>
        </div>
      )}

      {fields.map((field) => (
        <FieldRow key={field.key} field={field} data={data} />
      ))}

      {sections.map((section, i) => {
        if (section.type === "model" && section.model) {
          return <ModelSection key={i} model={section.model} />;
        }

        if (section.type === "metrics" && section.metrics) {
          return (
            <MetricsSection
              key={i}
              title={section.title}
              metrics={section.metrics}
              data={data}
            />
          );
        }

        if (section.type === "fields" && section.fields) {
          return (
            <div key={i} className={styles.detailSection}>
              <span className={styles.detailSectionTitle}>{section.title}</span>
              {section.fields.map((field) => (
                <FieldRow key={field.key} field={field} data={data} />
              ))}
            </div>
          );
        }

        if (section.type === "context" && section.contextRefs) {
          return (
            <ContextSection
              key={i}
              title={section.title}
              refs={section.contextRefs}
            />
          );
        }

        if (section.type === "health" && section.health) {
          return (
            <HealthSection
              key={i}
              title={section.title}
              health={section.health}
            />
          );
        }

        return null;
      })}

      {children}
    </div>
  );
}
