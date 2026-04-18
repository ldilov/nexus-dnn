import { useState, type ReactNode } from "react";
import * as styles from "./layout_styles.css";

type FileEntry = {
  name: string;
  type: "file" | "directory";
  size?: number;
  modified?: string;
};

type FileBrowserProps = {
  path?: string;
  entries?: FileEntry[];
  children?: ReactNode;
};

function formatSize(bytes?: number): string {
  if (bytes === undefined) return "";
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)} GB`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function FileBrowser({ path = "/", entries = [], children }: FileBrowserProps) {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const sorted = [...entries].sort((a, b) => {
    if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className={styles.listContainer}>
      <div className={styles.actionBar}>
        <span className={styles.codeSmall}>
          {path}
        </span>
      </div>
      {sorted.length === 0 && (
        <div className={styles.listItemEmpty}>Empty directory</div>
      )}
      {sorted.map((entry) => {
        const isSelected = selectedName === entry.name;
        const cls = isSelected
          ? `${styles.listItem} ${styles.listItemSelected}`
          : styles.listItem;
        const icon = entry.type === "directory" ? "\uD83D\uDCC1" : "\uD83D\uDCC4";
        return (
          <div
            key={entry.name}
            className={cls}
            onClick={() => setSelectedName(entry.name)}
          >
            <span>{icon}</span>
            <span className={styles.flexOne}>{entry.name}</span>
            {entry.size !== undefined && (
              <span className={styles.mutedSmall}>{formatSize(entry.size)}</span>
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
}
