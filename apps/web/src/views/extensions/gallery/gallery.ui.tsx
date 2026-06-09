import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Extension } from "../../../api/client";
import { InstallExtensionDrawer } from "../../../components/install/install_extension_drawer";
import { PageHero } from "../../../components/base/page_hero";
import { Section } from "../../../components/base/section";
import { StatusChip, type StatusKind } from "../../../components/base/status_chip";
import { DependencyStatusChip } from "../../../components/extension-gate";
import { EmptyState } from "../../../components/layout/empty_state";
import * as s from "./gallery.css";

export interface GalleryActionState {
  readonly loading: boolean;
  readonly targetId: string | null;
}

export interface ExtensionsGalleryUIProps {
  builtins: Extension[];
  externals: Extension[];
  totalCount: number;
  action: GalleryActionState;
  onToggle: (id: string, enable: boolean) => void;
  errorMessage: string | null;
  drawerOpen: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  onInstalled: () => void;
  /** Spec 035 — extension ids that need user-driven dep installs. */
  setupRequired?: Record<string, boolean>;
}

function statusKindFor(status: string): StatusKind {
  if (status === "active") return "live";
  if (status === "invalid") return "failed";
  if (status === "disabled") return "idle";
  return "idle";
}

function statusLabelFor(status: string): string {
  if (status === "active") return "Active";
  if (status === "invalid") return "Invalid";
  if (status === "disabled") return "Disabled";
  return status;
}

export function ExtensionsGalleryUI({
  builtins,
  externals,
  totalCount,
  action,
  onToggle,
  errorMessage,
  drawerOpen,
  onOpenDrawer,
  onCloseDrawer,
  onInstalled,
  setupRequired,
}: ExtensionsGalleryUIProps) {
  const setupCount = setupRequired
    ? Object.values(setupRequired).filter(Boolean).length
    : 0;
  const activeCount = [...builtins, ...externals].filter(
    (ext) => ext.status === "active",
  ).length;

  return (
    <div className={s.root}>
      <PageHero
        eyebrow="Operator surface · Capability registry"
        title="Extensions"
        meta={
          <span>
            Built-in and externally installed extensions. Toggle to enable, manage
            dependencies, or open the gallery to install more.
          </span>
        }
      />

      {errorMessage ? (
        <div className={s.errorState} role="alert">
          {errorMessage}
        </div>
      ) : (
        <>
          <div className={s.summaryGrid}>
            <SummaryStat label="Total" value={totalCount} />
            <SummaryStat label="Active" value={activeCount} />
            <SummaryStat label="Setup required" value={setupCount} />
          </div>

          {totalCount === 0 ? (
            <EmptyState
              count="0"
              line="No extensions are loaded. Install one from the gallery, or drop a NEXUS-DNN extension package onto the install dropzone below."
              primaryAction={{ label: "Install extension", onClick: onOpenDrawer }}
            />
          ) : (
            <>
              <ExtensionSection
                eyebrow="01"
                label="Built-in"
                items={builtins}
                action={action}
                onToggle={onToggle}
                showDelete={false}
                setupRequired={setupRequired}
              />
              <ExtensionSection
                eyebrow="02"
                label="External"
                items={externals}
                action={action}
                onToggle={onToggle}
                showDelete
                trailing={<InstallCard onClick={onOpenDrawer} />}
                setupRequired={setupRequired}
              />
            </>
          )}

          <InstallExtensionDrawer
            open={drawerOpen}
            onClose={onCloseDrawer}
            onInstalled={onInstalled}
          />
        </>
      )}
    </div>
  );
}

interface SummaryStatProps {
  label: string;
  value: number;
}

function SummaryStat({ label, value }: SummaryStatProps) {
  return (
    <div className={s.summaryStat}>
      <span className={s.summaryStatLabel}>{label}</span>
      <span className={s.summaryStatValue}>{value}</span>
    </div>
  );
}

interface ExtensionSectionProps {
  eyebrow: string;
  label: string;
  items: Extension[];
  action: GalleryActionState;
  onToggle: (id: string, enable: boolean) => void;
  showDelete: boolean;
  trailing?: ReactNode;
  setupRequired?: Record<string, boolean>;
}

function ExtensionSection({
  eyebrow,
  label,
  items,
  action,
  onToggle,
  showDelete,
  trailing,
  setupRequired,
}: ExtensionSectionProps) {
  if (items.length === 0 && !trailing) {
    return null;
  }
  return (
    <Section number={eyebrow} title={label}>
      <ul className={s.grid}>
        {items.map((ext) => (
          <li key={ext.id}>
            <ExtensionCard
              extension={ext}
              busy={action.loading && action.targetId === ext.id}
              onToggle={onToggle}
              showDelete={showDelete}
              needsSetup={Boolean(setupRequired?.[ext.id])}
            />
          </li>
        ))}
        {trailing ? <li>{trailing}</li> : null}
      </ul>
    </Section>
  );
}

interface ExtensionCardProps {
  extension: Extension;
  busy: boolean;
  onToggle: (id: string, enable: boolean) => void;
  showDelete: boolean;
  needsSetup?: boolean;
}

function ExtensionCard({
  extension,
  busy,
  onToggle,
  showDelete,
  needsSetup,
}: ExtensionCardProps) {
  const active = extension.status === "active";
  const invalid = extension.status === "invalid";
  const displayName = extension.name ?? extension.id;
  const initials =
    displayName
      .replace(/[^a-zA-Z]+/g, " ")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "·";

  return (
    <article className={`${s.card}${!active ? ` ${s.cardDisabled}` : ""}`}>
      <div className={s.cardHead}>
        <div className={s.iconTile} aria-hidden="true">
          {initials}
        </div>
        <div className={s.headText}>
          <div className={s.titleRow}>
            <Link
              className={s.titleLink}
              to={`/extensions/${encodeURIComponent(extension.id)}/settings`}
              title="Open extension settings"
            >
              {displayName}
            </Link>
            <span className={s.sourceChip}>
              {extension.source === "builtin" ? "Core" : "External"}
            </span>
            <StatusChip
              kind={statusKindFor(extension.status)}
              label={statusLabelFor(extension.status)}
              pulse={extension.status === "active"}
            />
            <DependencyStatusChip extensionId={extension.id} />
            {needsSetup && (
              <span className={s.setupBadge} aria-label="Dependency setup required">
                <span className={s.setupBadgePulse} aria-hidden="true" />
                Setup required
              </span>
            )}
          </div>
          <span className={s.meta}>
            v{extension.version}
            {extension.publisher ? ` · ${extension.publisher}` : ""}
          </span>
        </div>
      </div>

      {extension.capabilities.length > 0 && (
        <div className={s.capabilityRow}>
          {extension.capabilities.slice(0, 4).map((cap) => (
            <span key={cap} className={s.capability}>
              {cap}
            </span>
          ))}
        </div>
      )}

      <div className={s.metrics}>
        <div className={s.metricCell}>
          <span className={s.metricLabel}>Peak memory</span>
          <span className={`${s.metricValue} ${s.metricValueMuted}`}>—</span>
        </div>
        <div className={s.metricCell}>
          <span className={s.metricLabel}>Avg latency</span>
          <span className={`${s.metricValue} ${s.metricValueMuted}`}>—</span>
        </div>
      </div>

      <div className={s.footer}>
        <div className={s.footerActions}>
          <Link
            className={s.iconButtonLink}
            to={`/extensions/${encodeURIComponent(extension.id)}/settings`}
            aria-label="Extension settings"
            title="Settings"
          >
            <span
              className={`material-symbols-outlined ${s.iconGlyph}`}
              aria-hidden="true"
            >
              settings
            </span>
          </Link>
          <IconButton label="Open extension folder" onClick={() => undefined}>
            <span
              className={`material-symbols-outlined ${s.iconGlyph}`}
              aria-hidden="true"
            >
              folder_open
            </span>
          </IconButton>
          {showDelete && (
            <IconButton
              label="Uninstall extension"
              danger
              onClick={() => undefined}
            >
              <span
                className={`material-symbols-outlined ${s.iconGlyph}`}
                aria-hidden="true"
              >
                delete
              </span>
            </IconButton>
          )}
        </div>
        {needsSetup ? (
          <Link
            className={s.setupCta}
            to={`/extensions/${encodeURIComponent(extension.id)}/settings?tab=dependencies`}
          >
            <span
              className={`material-symbols-outlined ${s.iconGlyph}`}
              aria-hidden="true"
            >
              build
            </span>
            Set up
          </Link>
        ) : (
          <Toggle
            on={active}
            disabled={busy || invalid}
            onToggle={(next) => onToggle(extension.id, next)}
          />
        )}
      </div>
    </article>
  );
}

interface IconButtonProps {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

function IconButton({ label, onClick, danger, disabled, children }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`${s.iconButton}${danger ? ` ${s.iconButtonDanger}` : ""}`}
    >
      {children}
    </button>
  );
}

function Toggle({
  on,
  disabled,
  onToggle,
}: {
  on: boolean;
  disabled?: boolean;
  onToggle: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={on ? "Disable extension" : "Enable extension"}
      disabled={disabled}
      onClick={() => onToggle(!on)}
      className={`${s.toggle}${on ? ` ${s.toggleOn}` : ""}`}
    >
      <span className={`${s.toggleKnob}${on ? ` ${s.toggleKnobOn}` : ""}`} />
    </button>
  );
}

function InstallCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      className={s.installCard}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="Install new extension"
    >
      <span className={s.installGlyph} aria-hidden="true">
        add_box
      </span>
      <span className={s.installTitle}>Install new extension</span>
      <span className={s.installHint}>Open ZIP installer</span>
    </div>
  );
}
