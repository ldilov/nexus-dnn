import { box, chartBox, imageBox, jsonBox, imgFit, svgFit } from "./previews.css";

export type PreviewKind = "log_tail" | "json" | "image" | "chart";

export type PreviewSpec = {
  kind: PreviewKind;
  source?: string;
  maxLines?: number;
};

export type PreviewProps = {
  spec: PreviewSpec;
  value: unknown;
};

function LogTailPreview({ value, spec }: PreviewProps) {
  const raw = value == null ? "" : typeof value === "string" ? value : JSON.stringify(value);
  const lines = raw.split("\n").filter(Boolean);
  const max = spec.maxLines ?? 6;
  const tail = lines.slice(-max);
  if (tail.length === 0) {
    return <pre className={box}>(no output yet)</pre>;
  }
  return <pre className={box}>{tail.join("\n")}</pre>;
}

function JsonPreview({ value }: PreviewProps) {
  let text: string;
  try {
    text = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  } catch {
    text = String(value);
  }
  return <pre className={jsonBox}>{text || "(empty)"}</pre>;
}

function ImagePreview({ value }: PreviewProps) {
  const src = typeof value === "string" ? value : null;
  if (!src) return <div className={jsonBox}>(no image)</div>;
  return (
    <div className={imageBox}>
      <img src={src} alt="preview" className={imgFit} />
    </div>
  );
}

function ChartPreview({ value }: PreviewProps) {
  const arr = Array.isArray(value) ? (value as number[]) : [];
  if (arr.length === 0) return <div className={chartBox}>(no data)</div>;
  const max = Math.max(...arr, 1);
  return (
    <div className={chartBox}>
      <svg viewBox={`0 0 ${arr.length * 6} 60`} className={svgFit}>
        {arr.map((v, i) => (
          <rect
            key={i}
            x={i * 6}
            y={60 - (v / max) * 60}
            width={4}
            height={(v / max) * 60}
            // audit-allow: hex — hex — neon decorative palette per design lang
            fill="#ba9eff"
          />
        ))}
      </svg>
    </div>
  );
}

export function Preview(props: PreviewProps) {
  switch (props.spec.kind) {
    case "log_tail":
      return <LogTailPreview {...props} />;
    case "json":
      return <JsonPreview {...props} />;
    case "image":
      return <ImagePreview {...props} />;
    case "chart":
      return <ChartPreview {...props} />;
    default:
      return null;
  }
}

export function isSupportedPreview(spec: unknown): spec is PreviewSpec {
  if (!spec || typeof spec !== "object") return false;
  const kind = (spec as { kind?: unknown }).kind;
  return kind === "log_tail" || kind === "json" || kind === "image" || kind === "chart";
}
