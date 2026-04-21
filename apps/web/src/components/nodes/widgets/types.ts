export type WidgetKind =
  | "slider"
  | "number"
  | "toggle"
  | "select"
  | "text"
  | "textarea"
  | "code"
  | "color"
  | "file"
  | "model_picker";

export type WidgetSpec =
  | SliderWidget
  | NumberWidget
  | ToggleWidget
  | SelectWidget
  | TextWidget
  | TextareaWidget
  | CodeWidget
  | ColorWidget
  | FileWidget
  | ModelPickerWidget;

export type SliderWidget = {
  kind: "slider";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export type NumberWidget = {
  kind: "number";
  min?: number;
  max?: number;
  step?: number;
};

export type ToggleWidget = {
  kind: "toggle";
  label?: string;
};

export type SelectWidget = {
  kind: "select";
  options: { label: string; value: string | number | boolean }[];
};

export type TextWidget = {
  kind: "text";
  placeholder?: string;
  maxLength?: number;
};

export type TextareaWidget = {
  kind: "textarea";
  rows?: number;
  placeholder?: string;
};

export type CodeWidget = {
  kind: "code";
  language?: string;
};

export type ColorWidget = {
  kind: "color";
};

export type FileWidget = {
  kind: "file";
  accept?: string;
};

export type ModelPickerWidget = {
  kind: "model_picker";
  backend?: string;
};

export type WidgetProps = {
  spec: WidgetSpec;
  value: unknown;
  editable: boolean;
  onChange: (value: unknown) => void;
};
