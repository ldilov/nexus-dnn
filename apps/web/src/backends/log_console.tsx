import { useMemo, useState } from "react";

export interface LogLine {
  timestamp: number;
  source: string;
  runtime_id: string | null;
  deployment_id: string | null;
  severity: string;
  namespace: string;
  message: string;
}

interface Props {
  lines: LogLine[];
}

const SOURCES = ["all", "host", "extension", "llama.cpp", "tensorrt_llm"] as const;
const LEVELS = ["all", "info", "warn", "error"] as const;

export function LogConsole({ lines }: Props) {
  const [source, setSource] = useState<(typeof SOURCES)[number]>("all");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");

  const filtered = useMemo(() => {
    return lines.filter((l) => {
      if (source !== "all" && l.source !== source) return false;
      if (level !== "all" && l.severity !== level) return false;
      return true;
    });
  }, [lines, source, level]);

  return (
    <div data-testid="log-console">
      <div style={{ display: "flex", gap: "8px" }}>
        {SOURCES.map((s) => (
          <button
            type="button"
            key={s}
            data-active={source === s}
            onClick={() => setSource(s)}
          >
            {s}
          </button>
        ))}
        <span style={{ width: "12px" }} />
        {LEVELS.map((l) => (
          <button
            type="button"
            key={l}
            data-active={level === l}
            onClick={() => setLevel(l)}
          >
            {l}
          </button>
        ))}
      </div>
      <pre data-testid="log-lines">
        {filtered
          .map(
            (l) =>
              `[${new Date(l.timestamp).toISOString()}] ${l.namespace} ${l.severity.toUpperCase()} ${l.message}`,
          )
          .join("\n")}
      </pre>
    </div>
  );
}
