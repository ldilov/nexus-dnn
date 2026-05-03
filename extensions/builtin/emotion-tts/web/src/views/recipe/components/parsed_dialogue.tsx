import * as css from "./parsed_dialogue.css";
import type { ParsedLine } from "../lib/parse_dialogue";

export interface ParsedDialogueProps {
  lines: readonly ParsedLine[];
  characterColors: Record<string, string>;
  onLineClick?: (idx: number) => void;
}

export function ParsedDialogue({
  lines,
  characterColors,
  onLineClick,
}: ParsedDialogueProps): JSX.Element {
  if (lines.length === 0) {
    return (
      <p className={css.empty}>
        Paste dialogue above to see character-tagged lines, override badges, and per-line previews here.
      </p>
    );
  }
  const totalLines = lines.length;
  const characterLines = lines.filter((l) => l.character !== null).length;
  const narrationLines = totalLines - characterLines;

  return (
    <div>
      <div className={css.summaryRow}>
        <span className={css.summaryStat}>
          <span className={css.summaryValue}>{totalLines}</span>
          lines
        </span>
        <span className={css.summaryStat}>
          <span className={css.summaryValue}>{characterLines}</span>
          spoken
        </span>
        <span className={css.summaryStat}>
          <span className={css.summaryValue}>{narrationLines}</span>
          narration
        </span>
      </div>
      <ol className={css.list}>
        {lines.map((line) => (
          <ParsedLineRow
            key={line.idx}
            line={line}
            {...(line.character && characterColors[line.character]
              ? { color: characterColors[line.character] }
              : {})}
            {...(onLineClick ? { onClick: () => onLineClick(line.idx) } : {})}
          />
        ))}
      </ol>
    </div>
  );
}

interface RowProps {
  line: ParsedLine;
  color?: string;
  onClick?: () => void;
}

function ParsedLineRow({ line, color, onClick }: RowProps): JSX.Element {
  if (line.character === null) {
    return (
      <li className={`${css.item} ${css.itemNarration}`}>
        <span className={css.idx}>{String(line.idx + 1).padStart(2, "0")}</span>
        <span className={css.narrationText}>{line.text}</span>
      </li>
    );
  }
  return (
    <li
      className={css.item}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      <span className={css.idx}>{String(line.idx + 1).padStart(2, "0")}</span>
      <span className={css.character} style={color ? { color } : undefined}>
        {line.character}
      </span>
      <span className={css.text}>
        {line.text}
        {line.override && (
          <span className={`${css.overrideBadge} ${css.overrideKindStyles[line.override.kind]}`}>
            {line.override.kind}
            {line.override.label ? ` · ${line.override.label}` : ""}
          </span>
        )}
      </span>
    </li>
  );
}
