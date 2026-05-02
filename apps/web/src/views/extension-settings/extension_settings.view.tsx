/**
 * Spec 035 — Extension settings page.
 *
 * Tabbed shell with Overview + Dependencies. The route deep-links to a tab via
 * `?tab=dependencies` (used by the Setup-required CTA on the gallery card).
 */
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import useSWR from "swr";

import { fetchExtensions } from "../../services/api_client";
import { OverviewTab } from "./tabs/overview.tab";
import { DependenciesTab } from "./tabs/dependencies.tab";
import { PageHero } from "../../components/base/page_hero";
import * as s from "./extension_settings.css";

export interface ExtensionSettingsViewProps {
  extensionId: string;
}

type TabKey = "overview" | "dependencies";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "dependencies", label: "Dependencies" },
];

export function ExtensionSettingsView({ extensionId }: ExtensionSettingsViewProps) {
  const [params, setParams] = useSearchParams();
  const tab: TabKey = useMemo(() => {
    const value = params.get("tab");
    return value === "dependencies" ? "dependencies" : "overview";
  }, [params]);

  const { data: extensions, error, isLoading } = useSWR(
    "/extensions",
    fetchExtensions,
  );
  const extension = useMemo(
    () => extensions?.find((ext) => ext.id === extensionId),
    [extensions, extensionId],
  );

  const setTab = (next: TabKey) => {
    const newParams = new URLSearchParams(params);
    if (next === "overview") newParams.delete("tab");
    else newParams.set("tab", next);
    setParams(newParams, { replace: true });
  };

  if (isLoading) {
    return (
      <div className={s.root}>
        <PageHero
          eyebrow="Extension settings"
          title="Loading…"
        />
      </div>
    );
  }
  if (error || !extension) {
    return (
      <div className={s.root}>
        <nav className={s.breadcrumb} aria-label="Breadcrumb">
          <Link to="/extensions" className={s.breadcrumbLink}>
            Extensions
          </Link>
          <span aria-hidden="true">›</span>
          <span>{extensionId}</span>
        </nav>
        <PageHero eyebrow="Extension settings" title="Not available" />
        <div className={s.errorState} role="alert">
          {extension
            ? "Could not load extension"
            : `Extension not found: ${extensionId}`}
        </div>
      </div>
    );
  }

  return (
    <div className={s.root}>
      <nav className={s.breadcrumb} aria-label="Breadcrumb">
        <Link to="/extensions" className={s.breadcrumbLink}>
          Extensions
        </Link>
        <span aria-hidden="true">›</span>
        <span>{extension.name ?? extension.id}</span>
      </nav>

      <PageHero
        eyebrow="Extension settings"
        title={extension.name ?? extension.id}
        meta={
          extension.version ? <span>Version {extension.version}</span> : undefined
        }
      />

      <div
        className={s.tabBar}
        role="tablist"
        aria-label="Extension settings sections"
      >
        {TABS.map((entry) => (
          <button
            key={entry.key}
            type="button"
            role="tab"
            aria-selected={tab === entry.key}
            id={`tab-${entry.key}`}
            aria-controls={`tabpanel-${entry.key}`}
            className={`${s.tabButton}${tab === entry.key ? ` ${s.tabActive}` : ""}`}
            onClick={() => setTab(entry.key)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div
        className={s.tabPanel}
        role="tabpanel"
        id={`tabpanel-${tab}`}
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "overview" ? (
          <OverviewTab extension={extension} />
        ) : (
          <DependenciesTab extensionId={extensionId} />
        )}
      </div>
    </div>
  );
}
