import type { ReactNode } from "react";
import type { Extension } from "../../../api/client";
import { InstallExtensionDrawer } from "../../../install/install_extension_drawer";
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
}: ExtensionsGalleryUIProps) {
  if (errorMessage) {
    return <div className={s.errorState}>{errorMessage}</div>;
  }
  return (
    <div className={s.root}>
      <ExtensionSection
        label="Built-in Extensions"
        count={builtins.length}
        items={builtins}
        action={action}
        onToggle={onToggle}
        showDelete={false}
      />
      <ExtensionSection
        label="External Extensions"
        count={externals.length}
        items={externals}
        action={action}
        onToggle={onToggle}
        showDelete
        trailing={<InstallCard onClick={onOpenDrawer} />}
      />
      {totalCount === 0 && (
        <div className={s.emptyState}>No extensions loaded</div>
      )}
      <InstallExtensionDrawer
        open={drawerOpen}
        onClose={onCloseDrawer}
        onInstalled={onInstalled}
      />
    </div>
  );
}

interface ExtensionSectionProps {
  label: string;
  count: number;
  items: Extension[];
  action: GalleryActionState;
  onToggle: (id: string, enable: boolean) => void;
  showDelete: boolean;
  trailing?: ReactNode;
}

function ExtensionSection({
  label,
  count,
  items,
  action,
  onToggle,
  showDelete,
  trailing,
}: ExtensionSectionProps) {
  return (
    <section className={s.section}>
      <header className={s.sectionHeader}>
        <h2 className={s.sectionTitle}>{label}</h2>
        <span className={s.sectionCount}>{count.toString().padStart(2, "0")}</span>
      </header>
      <div className={s.grid}>
        {items.map((ext) => (
          <ExtensionCard
            key={ext.id}
            extension={ext}
            busy={action.loading && action.targetId === ext.id}
            onToggle={onToggle}
            showDelete={showDelete}
          />
        ))}
        {trailing}
      </div>
    </section>
  );
}

interface ExtensionCardProps {
  extension: Extension;
  busy: boolean;
  onToggle: (id: string, enable: boolean) => void;
  showDelete: boolean;
}

function ExtensionCard({ extension, busy, onToggle, showDelete }: ExtensionCardProps) {
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
            <span className={s.title}>{displayName}</span>
            <span className={s.sourceChip}>
              {extension.source === "builtin" ? "Core" : "External"}
            </span>
            <StatusPill status={extension.status} />
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
        <div>
          <div className={s.metricLabel}>Peak Memory</div>
          <div className={`${s.metricValue} ${s.metricValueMuted}`}>—</div>
        </div>
        <div>
          <div className={s.metricLabel}>Avg Latency</div>
          <div className={`${s.metricValue} ${s.metricValueMuted}`}>—</div>
        </div>
      </div>

      <div className={s.footer}>
        <div className={s.footerActions}>
          <IconButton label="Open extension folder" onClick={() => undefined}>
            <FolderIcon />
          </IconButton>
          {showDelete && (
            <IconButton label="Uninstall extension" danger onClick={() => undefined}>
              <TrashIcon />
            </IconButton>
          )}
        </div>
        <Toggle
          on={active}
          disabled={busy || invalid}
          onToggle={(next) => onToggle(extension.id, next)}
        />
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: string }) {
  const dotClass =
    status === "active"
      ? s.statusDotActive
      : status === "invalid"
        ? s.statusDotInvalid
        : s.statusDotDisabled;
  const label =
    status === "active"
      ? "Active"
      : status === "invalid"
        ? "Invalid"
        : status === "disabled"
          ? "Disabled"
          : status;
  return (
    <span className={s.statusPill}>
      <span className={`${s.statusDot} ${dotClass}`} />
      {label}
    </span>
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
    >
      <div className={s.installIcon} aria-hidden="true">
        +
      </div>
      <div className={s.installTitle}>Install new extension</div>
      <div className={s.installHint}>Open ZIP installer</div>
    </div>
  );
}

function FolderIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
