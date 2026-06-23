import { useEffect, useState, useCallback } from "react";
import {
  fetchExtensions,
  enableExtension,
  disableExtension,
  type Extension,
} from "../api/client";
import { StatusBadge, type BadgeStatus } from "../components/base/status_badge";
import { Button } from "../components/base/button";
import * as styles from "./catalog.css";

function extensionStatusToBadge(status: string): BadgeStatus {
  if (status === "active") return "active";
  if (status === "disabled") return "disabled";
  if (status === "invalid") return "invalid";
  return "pending";
}

type ActionState = {
  readonly loading: boolean;
  readonly targetId: string | null;
};

const IDLE_ACTION: ActionState = { loading: false, targetId: null };

type ExtensionListProps = {
  onExtensionToggled?: () => void;
};

export function ExtensionList({ onExtensionToggled }: ExtensionListProps = {}) {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [action, setAction] = useState<ActionState>(IDLE_ACTION);

  const loadExtensions = useCallback(() => {
    fetchExtensions()
      .then(setExtensions)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load extensions"),
      );
  }, []);

  useEffect(() => {
    loadExtensions();
  }, [loadExtensions]);

  const handleEnable = useCallback(
    (id: string) => {
      setAction({ loading: true, targetId: id });
      enableExtension(id)
        .then(() => {
          loadExtensions();
          onExtensionToggled?.();
        })
        .catch((err: unknown) =>
          setError(err instanceof Error ? err.message : "Failed to enable extension"),
        )
        .finally(() => setAction(IDLE_ACTION));
    },
    [loadExtensions, onExtensionToggled],
  );

  const handleDisable = useCallback(
    (id: string) => {
      setAction({ loading: true, targetId: id });
      disableExtension(id)
        .then(() => {
          loadExtensions();
          onExtensionToggled?.();
        })
        .catch((err: unknown) =>
          setError(err instanceof Error ? err.message : "Failed to disable extension"),
        )
        .finally(() => setAction(IDLE_ACTION));
    },
    [loadExtensions, onExtensionToggled],
  );

  if (error) return <p className={styles.errorState}>{error}</p>;

  if (extensions.length === 0) {
    return <p className={styles.emptyState}>No extensions loaded</p>;
  }

  return (
    <div>
      {extensions.map((ext) => {
        const isTarget = action.targetId === ext.id;
        const busy = action.loading && isTarget;

        return (
          <div key={ext.id} className={styles.itemCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardBody}>
                <div className={styles.itemName}>{ext.name}</div>
                <div className={styles.badgeRow}>
                  <StatusBadge status={extensionStatusToBadge(ext.status)} />
                  <span className={styles.itemMeta}>v{ext.version}</span>
                </div>
              </div>
              <ExtensionAction
                status={ext.status}
                busy={busy}
                onEnable={() => handleEnable(ext.id)}
                onDisable={() => handleDisable(ext.id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

type ExtensionActionProps = {
  status: string;
  busy: boolean;
  onEnable: () => void;
  onDisable: () => void;
};

function ExtensionAction({ status, busy, onEnable, onDisable }: ExtensionActionProps) {
  if (status === "active") {
    return (
      <Button variant="ghost" size="sm" loading={busy} onClick={onDisable}>
        Disable
      </Button>
    );
  }

  if (status === "disabled") {
    return (
      <Button variant="primary" size="sm" loading={busy} onClick={onEnable}>
        Enable
      </Button>
    );
  }

  if (status === "available_builtin") {
    return (
      <Button variant="accent" size="sm" loading={busy} onClick={onEnable}>
        Activate
      </Button>
    );
  }

  return null;
}
