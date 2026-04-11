import { useEffect, useState } from "react";
import { fetchExtensions, type Extension } from "../api/client";
import { StatusBadge, type BadgeStatus } from "../components/status_badge";
import * as styles from "./catalog.css";

function extensionStatusToBadge(status: string): BadgeStatus {
  if (status === "active") return "active";
  if (status === "disabled") return "disabled";
  if (status === "invalid") return "invalid";
  return "pending";
}

export function ExtensionList() {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExtensions()
      .then(setExtensions)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load extensions"),
      );
  }, []);

  if (error) return <p className={styles.errorState}>{error}</p>;

  if (extensions.length === 0) {
    return <p className={styles.emptyState}>No extensions loaded</p>;
  }

  return (
    <div>
      {extensions.map((ext) => (
        <div key={ext.id} className={styles.itemCard}>
          <div className={styles.itemName}>{ext.name}</div>
          <div className={styles.badgeRow}>
            <StatusBadge status={extensionStatusToBadge(ext.status)} />
            <span className={styles.itemMeta}>v{ext.version}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
