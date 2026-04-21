import { memo, useState } from "react";
import { type Node, type NodeProps } from "@xyflow/react";
import { ACCENT_COLORS, editable as editableClass, note as noteClass, textarea as textareaClass } from "./note_node.css";

export type NoteNodeData = {
  text: string;
  accent?: keyof typeof ACCENT_COLORS;
  editable?: boolean;
  onTextChange?: (nodeId: string, next: string) => void;
  nodeId: string;
};

export type NoteFlowNode = Node<NoteNodeData, "note">;

export const NoteNode = memo(function NoteNode({ data }: NoteFlowNode extends never ? never : NodeProps<NoteFlowNode>) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(data.text);
  const accentBg = data.accent ? ACCENT_COLORS[data.accent] : ACCENT_COLORS.yellow;

  if (editing && data.editable) {
    return (
      <textarea
        className={textareaClass}
        value={draft}
        autoFocus
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          setEditing(false);
          if (draft !== data.text) data.onTextChange?.(data.nodeId, draft);
        }}
      />
    );
  }

  return (
    <div
      className={data.editable ? editableClass : noteClass}
      style={{ background: accentBg }}
      onDoubleClick={() => data.editable && setEditing(true)}
    >
      {data.text || (data.editable ? "double-click to edit…" : "")}
    </div>
  );
});
