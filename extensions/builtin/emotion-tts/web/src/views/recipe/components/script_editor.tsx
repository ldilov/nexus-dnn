import { useMemo, useRef, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import type { CharacterMapping } from "../../../services/mappings_client";
import type { OutputFormat } from "../../../services/types";
import * as css from "../recipe.css";
import { Banner } from "../../../components/banner";
import { Button } from "../../../components/button";

interface Props {
  value: string;
  onChange: (next: string) => void;
  outputFormat: OutputFormat;
  mappings: Map<string, CharacterMapping>;
  deploymentId: string;
  /** When true, the editor styles itself as a plain-prose textarea
   * (accent left-rail, no syntax highlighting overlay). Optional so
   * existing call sites remain valid. */
  quickMode?: boolean;
}

interface LineToken {
  kind: "blank" | "narrator" | "character";
  raw: string;
  character?: string;
  override?: string;
  text?: string;
  hasMapping?: boolean;
}

interface LineAttribution {
  lineNumber: number;
  character: string;
  text: string;
  hasMapping: boolean;
}

const PALETTE = [
  // audit-allow: hex — neon decorative palette per design lang
  "var(--accent, #ba9eff)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--secondary, #9093ff)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--tertiary, #ff8439)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--success, #80e0a8)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--warning, #f0c265)",
  // audit-allow: hex — neon decorative palette per design lang
  "var(--info, #7fdbff)",
];

export function ScriptEditor(props: Props): JSX.Element {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const { tokens, attributions, unresolved, predictedFilenames, characterColor } = useMemo(
    () => analyseScript(props.value, props.outputFormat, props.mappings),
    [props.value, props.outputFormat, props.mappings],
  );

  const handleScroll = (event: SyntheticEvent<HTMLTextAreaElement>): void => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.scrollTop = event.currentTarget.scrollTop;
    overlay.scrollLeft = event.currentTarget.scrollLeft;
  };

  const quickMode = props.quickMode === true;

  return (
    <div>
      <div className={`${css.scriptShell} ${quickMode ? css.scriptShellQuick : ""}`}>
        {!quickMode && (
          <div ref={overlayRef} className={css.scriptOverlay} aria-hidden="true">
            {tokens.map((tok, idx) => renderToken(tok, idx, characterColor))}
          </div>
        )}
        <textarea
          className={`${css.scriptTextarea} ${quickMode ? css.scriptTextareaQuick : ""}`}
          value={props.value}
          onChange={(e) => props.onChange(e.currentTarget.value)}
          onScroll={quickMode ? undefined : handleScroll}
          placeholder={
            quickMode
              ? "Type or paste plain text. The selected voice will read every word."
              : "[Bob] Hey there\n[Alice] Hello\n..."
          }
          aria-label="Dialogue script"
          spellCheck={false}
        />
      </div>

      {unresolved.length > 0 && (
        <Banner severity="error">
          <strong>Unresolved characters:</strong>{" "}
          {unresolved.map((name) => (
            <Button
              key={name}
              variant="secondary"
              size="sm"
              onClick={() =>
                navigate(
                  `/${props.deploymentId}/mappings/new?character=${encodeURIComponent(name)}`,
                )
              }
            >
              Create mapping for {name}
            </Button>
          ))}
        </Banner>
      )}

      {attributions.length > 0 && (
        <div>
          <span className={css.label}>Parsed lines</span>
          <ul className={css.filenameList}>
            {attributions.map((a) => (
              <li key={a.lineNumber}>
                #{a.lineNumber.toString().padStart(3, "0")} [{a.character}] {a.text}
                {!a.hasMapping && a.character !== "Narrator" && " — unresolved"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {predictedFilenames.length > 0 && (
        <div>
          <span className={css.label}>Predicted filenames</span>
          <ul className={css.filenameList}>
            {predictedFilenames.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function renderToken(
  tok: LineToken,
  idx: number,
  characterColor: Map<string, string>,
): JSX.Element {
  if (tok.kind === "blank") {
    return <span key={idx}>{tok.raw}{"\n"}</span>;
  }
  if (tok.kind === "narrator") {
    return (
      <span key={idx}>
        <span className={css.scriptText}>{tok.raw}</span>
        {"\n"}
      </span>
    );
  }
  const color = characterColor.get(tok.character?.toLowerCase() ?? "") ?? "currentColor";
  const charClass = tok.hasMapping ? css.scriptCharacter : `${css.scriptCharacter} ${css.scriptUnresolved}`;
  return (
    <span key={idx}>
      <span className={charClass} style={{ color }}>
        [{tok.character}
        {tok.override && <span className={css.scriptOverride}>|{tok.override}</span>}]
      </span>
      <span className={css.scriptText}> {tok.text ?? ""}</span>
      {"\n"}
    </span>
  );
}

function analyseScript(
  script: string,
  outputFormat: OutputFormat,
  mappings: Map<string, CharacterMapping>,
): {
  tokens: LineToken[];
  attributions: LineAttribution[];
  unresolved: string[];
  predictedFilenames: string[];
  characterColor: Map<string, string>;
} {
  const tagRegex = /^\[(?<body>[^\]]*)\](?<rest>.*)$/;
  const tokens: LineToken[] = [];
  const attributions: LineAttribution[] = [];
  const unresolvedSet = new Set<string>();
  const characterCounter = new Map<string, number>();
  const predictedFilenames: string[] = [];
  const characterColor = new Map<string, string>();
  let nextColorIndex = 0;

  const lines = script.split(/\r?\n/);
  let globalIndex = 0;

  lines.forEach((raw, idx) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      tokens.push({ kind: "blank", raw });
      return;
    }
    const lineNumber = idx + 1;
    const match = trimmed.match(tagRegex);
    let character = "Narrator";
    let text = trimmed;
    let override: string | undefined;
    let isTagged = false;
    if (match?.groups) {
      isTagged = true;
      const body = (match.groups.body ?? "").trim();
      const rest = (match.groups.rest ?? "").trim();
      const head = body.split("|")[0] ?? "";
      const name = head.split(":")[0] ?? "";
      character = name.trim() || "Narrator";
      const tail = body.includes("|") ? body.slice(body.indexOf("|") + 1) : "";
      override = tail.trim() || undefined;
      text = rest;
    }

    globalIndex += 1;
    const lower = character.toLowerCase();
    const count = (characterCounter.get(lower) ?? 0) + 1;
    characterCounter.set(lower, count);
    const hasMapping = character === "Narrator" || mappings.has(lower);
    if (!hasMapping) unresolvedSet.add(character);

    if (character !== "Narrator" && !characterColor.has(lower)) {
      characterColor.set(lower, PALETTE[nextColorIndex % PALETTE.length] ?? "currentColor");
      nextColorIndex += 1;
    }

    if (isTagged) {
      const tok: LineToken = { kind: "character", raw, character, text, hasMapping };
      if (override !== undefined) tok.override = override;
      tokens.push(tok);
    } else {
      tokens.push({ kind: "narrator", raw });
    }

    attributions.push({ lineNumber, character, text, hasMapping });
    predictedFilenames.push(
      `${globalIndex.toString().padStart(3, "0")}_${sanitise(character)}_${count
        .toString()
        .padStart(3, "0")}.${outputFormat}`,
    );
  });

  return {
    tokens,
    attributions,
    unresolved: Array.from(unresolvedSet),
    predictedFilenames,
    characterColor,
  };
}

function sanitise(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return cleaned.length === 0 ? "Narrator" : cleaned.slice(0, 48);
}
