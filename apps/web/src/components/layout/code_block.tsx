import type { ReactNode } from "react";
import { Button } from "../button";
import * as styles from "./layout_styles.css";

type CodeBlockProps = {
  code?: string;
  language?: string;
  showHeader?: boolean;
  children?: ReactNode;
};

export function CodeBlock({
  code = "",
  language,
  showHeader = true,
  children,
}: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div>
      {showHeader && language && (
        <div className={styles.codeBlockHeader}>
          <span className={styles.codeBlockLanguage}>{language}</span>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      )}
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
      {children}
    </div>
  );
}
