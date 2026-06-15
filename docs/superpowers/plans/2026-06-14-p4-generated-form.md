# P4 — Generated Recipe Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design-led phase (constitution XII.8):** This phase ships UI. Before writing the component styling in Task 3, invoke the `nexudnn-design` skill for the Spectral Graphite visual direction (dark graphite surfaces, spectral accents, no hard borders, glassmorphism, dual typography). The CSS in this plan is a structural skeleton — the skill supplies the finished look.

**Goal:** Render any recipe projection as a usable form in the blueprint Recipe tab with no per-extension code: a backend `GET /api/v1/recipes/{id}/form` that resolves the projection + per-control schema hints (enum/min/max from operator schemas), and a generic React `RecipeForm` that maps controls to widgets, mirrors the compiler's validation client-side, and submits to `POST /recipes/{id}/run` (P3).

**Architecture:** The host resolves schema hints server-side (so the client never parses operator YAML) and returns a `RecipeFormDto` (ts-rs generated). `RecipeForm` is a generic host component (zero extension-id literals) driven entirely by that DTO. Submit reuses the P3 route and transitions to the existing run-progress UI.

**Tech Stack:** Rust/axum/ts-rs (backend), React 19 + TypeScript + vanilla-extract + SWR + sonner (frontend), vitest.

**Depends on:** P1 (`recipes.projection`, `status`, pin), P2 (`snapshot_to_workflow`), P3 (`POST /recipes/{id}/run`, `compile_and_launch`).

---

### Task 1: `GET /recipes/{id}/form` — projection + resolved schema hints

**Files:**
- Create: `crates/nexus-api/src/dto/recipe_form.rs`
- Modify: `crates/nexus-api/src/dto/mod.rs` (export)
- Create: `crates/nexus-api/src/recipe_form.rs` (builder)
- Modify: `crates/nexus-api/src/lib.rs` (declare module)
- Modify: `crates/nexus-api/src/handlers/recipes.rs` (handler)
- Modify: `crates/nexus-api/src/router.rs` (route)
- Test: `crates/nexus-api/src/recipe_form.rs` `#[cfg(test)]`

- [ ] **Step 1: The DTO**

Create `crates/nexus-api/src/dto/recipe_form.rs`:

```rust
use serde::Serialize;
use serde_json::Value;
use ts_rs::TS;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct SchemaHintDto {
    pub value_type: Option<String>,
    pub enum_values: Option<Vec<Value>>,
    pub minimum: Option<f64>,
    pub maximum: Option<f64>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct FormControlDto {
    pub control_id: String,
    pub kind: String,
    pub label: String,
    pub help_text: Option<String>,
    pub mode: String,
    pub default_value: Option<Value>,
    pub widget_hint: Option<String>,
    pub schema_hint: Option<SchemaHintDto>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct FormSectionDto {
    pub id: String,
    pub title: String,
    pub order: u32,
    pub control_ids: Vec<String>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct FormPresetDto {
    pub preset_id: String,
    pub label: String,
    pub description: Option<String>,
}

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RecipeFormDto {
    pub recipe_id: String,
    pub display_name: String,
    pub summary: String,
    pub status: Option<String>,
    pub sections: Vec<FormSectionDto>,
    pub controls: Vec<FormControlDto>,
    pub presets: Vec<FormPresetDto>,
}
```

Export from `crates/nexus-api/src/dto/mod.rs`:
```rust
pub mod recipe_form;
pub use recipe_form::{FormControlDto, FormPresetDto, FormSectionDto, RecipeFormDto, SchemaHintDto};
```

- [ ] **Step 2: The builder + failing test**

Create `crates/nexus-api/src/recipe_form.rs`:

```rust
use nexus_extension::OperatorDefinition;
use nexus_recipe::projection::{ControlKind, ControlMode, RecipeProjection};
use nexus_recipe::target::{parse_target, ParsedTarget};
use nexus_workflow::Workflow;
use serde_json::Value;

use crate::dto::recipe_form::{
    FormControlDto, FormPresetDto, FormSectionDto, RecipeFormDto, SchemaHintDto,
};

fn kind_str(k: ControlKind) -> &'static str {
    match k {
        ControlKind::String => "string",
        ControlKind::Enum => "enum",
        ControlKind::Bool => "bool",
        ControlKind::Int => "int",
        ControlKind::Float => "float",
        ControlKind::Asset => "asset",
        ControlKind::PresetSelector => "preset_selector",
    }
}

fn mode_str(m: ControlMode) -> &'static str {
    match m {
        ControlMode::Basic => "basic",
        ControlMode::Advanced => "advanced",
        ControlMode::Hidden => "hidden",
        ControlMode::Locked => "locked",
    }
}

/// Resolve a schema hint for the FIRST resolvable binding target of a control,
/// reading enum/min/max from the operator's config_schema (node config targets)
/// or the port type (input targets). Returns None when nothing resolves.
fn schema_hint_for(
    bindings: &[String],
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> Option<SchemaHintDto> {
    for raw in bindings {
        let Ok(target) = parse_target(raw) else { continue };
        match target {
            ParsedTarget::Input(name) => {
                if let Some(port) = workflow.inputs.iter().find(|p| p.name == name) {
                    return Some(SchemaHintDto {
                        value_type: Some(port.port_type.clone()),
                        enum_values: None,
                        minimum: None,
                        maximum: None,
                    });
                }
            }
            ParsedTarget::NodeConfig { node_id, pointer } => {
                let node = workflow.nodes.iter().find(|n| n.id == node_id)?;
                let (op_id, op_ver) = match node.operator.rsplit_once('@') {
                    Some((i, v)) => (i, v),
                    None => (node.operator.as_str(), ""),
                };
                let op = operators
                    .iter()
                    .find(|o| o.operator.id == op_id && o.operator.version == op_ver)?;
                let schema = op.config_schema.as_ref()?;
                // walk schema.properties.<pointer...> to the leaf property
                let mut cur = schema.get("properties")?;
                for (i, key) in pointer.iter().enumerate() {
                    cur = cur.get(key)?;
                    if i < pointer.len() - 1 {
                        cur = cur.get("properties")?;
                    }
                }
                return Some(SchemaHintDto {
                    value_type: cur.get("type").and_then(Value::as_str).map(str::to_string),
                    enum_values: cur.get("enum").and_then(Value::as_array).cloned(),
                    minimum: cur.get("minimum").and_then(Value::as_f64),
                    maximum: cur.get("maximum").and_then(Value::as_f64),
                });
            }
        }
    }
    None
}

/// Build the form DTO from a projection + the pinned workflow snapshot.
pub fn build_recipe_form(
    recipe_id: &str,
    display_name: &str,
    summary: &str,
    status: Option<&str>,
    projection: &RecipeProjection,
    workflow: &Workflow,
    operators: &[OperatorDefinition],
) -> RecipeFormDto {
    let controls = projection
        .controls
        .iter()
        .filter(|c| c.mode != ControlMode::Hidden) // hidden controls never reach the form
        .map(|c| FormControlDto {
            control_id: c.control_id.clone(),
            kind: kind_str(c.kind).to_string(),
            label: c.label.clone(),
            help_text: c.help_text.clone(),
            mode: mode_str(c.mode).to_string(),
            default_value: c.default_value.clone(),
            widget_hint: c.widget_hint.clone(),
            schema_hint: schema_hint_for(&c.bindings, workflow, operators),
        })
        .collect();
    let sections = projection
        .sections
        .iter()
        .map(|s| FormSectionDto {
            id: s.id.clone(),
            title: s.title.clone(),
            order: s.order,
            control_ids: s.control_ids.clone(),
        })
        .collect();
    let presets = projection
        .presets
        .iter()
        .map(|p| FormPresetDto {
            preset_id: p.preset_id.clone(),
            label: p.label.clone(),
            description: p.description.clone(),
        })
        .collect();
    RecipeFormDto {
        recipe_id: recipe_id.to_string(),
        display_name: display_name.to_string(),
        summary: summary.to_string(),
        status: status.map(str::to_string),
        sections,
        controls,
        presets,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use nexus_recipe::projection::{ControlDef, PresetPack, PresetSource, Section};
    use nexus_workflow::{Workflow, WorkflowPort};
    use std::collections::BTreeMap;

    fn wf() -> Workflow {
        Workflow {
            id: "wf".into(), title: "T".into(), version: "0.1.0".into(),
            inputs: vec![WorkflowPort { name: "script".into(), port_type: "string".into() }],
            outputs: vec![], nodes: vec![], stages: vec![],
            created_at: "t".into(), updated_at: "t".into(),
        }
    }

    #[test]
    fn hides_hidden_controls_and_resolves_input_hint() {
        let proj = RecipeProjection {
            schema_version: 1,
            sections: vec![Section { id: "input".into(), title: "Input".into(), order: 0, control_ids: vec!["text".into()] }],
            controls: vec![
                ControlDef {
                    control_id: "text".into(), kind: ControlKind::String, label: "Text".into(),
                    help_text: None, mode: ControlMode::Basic, default_value: None,
                    widget_hint: None, bindings: vec!["input:script".into()],
                },
                ControlDef {
                    control_id: "secret".into(), kind: ControlKind::String, label: "Secret".into(),
                    help_text: None, mode: ControlMode::Hidden, default_value: None,
                    widget_hint: None, bindings: vec!["input:script".into()],
                },
            ],
            presets: vec![PresetPack {
                preset_id: "final".into(), label: "Final".into(), description: None,
                source: PresetSource::Recipe, values: BTreeMap::new(),
            }],
            output: Default::default(),
        };
        let form = build_recipe_form("r", "R", "s", Some("healthy"), &proj, &wf(), &[]);
        assert_eq!(form.controls.len(), 1, "hidden control excluded");
        assert_eq!(form.controls[0].control_id, "text");
        assert_eq!(form.controls[0].schema_hint.as_ref().unwrap().value_type.as_deref(), Some("string"));
        assert_eq!(form.presets.len(), 1);
    }
}
```

Declare in `crates/nexus-api/src/lib.rs`: `pub mod recipe_form;`.

- [ ] **Step 3: Handler + route**

In `crates/nexus-api/src/handlers/recipes.rs`:

```rust
pub async fn get_recipe_form(
    State(state): State<crate::AppState>,
    Path(id): Path<String>,
) -> Result<crate::envelope::ApiResponse<crate::dto::RecipeFormDto>, crate::error::ApiError> {
    use crate::error::ApiError;
    let recipe = state.db.get_recipe(&id).await.map_err(|e| ApiError::NotFound(e.to_string()))?;
    let workflow_id = recipe.workflow_id.as_deref()
        .ok_or_else(|| ApiError::BadRequest("recipe is not pinned".into()))?;
    let version = recipe.workflow_version.as_deref()
        .ok_or_else(|| ApiError::BadRequest("recipe is not pinned to a version".into()))?;
    let projection: nexus_recipe::RecipeProjection = match recipe.projection.as_deref() {
        Some(p) => serde_json::from_str(p).map_err(|e| ApiError::BadRequest(e.to_string()))?,
        None => nexus_recipe::RecipeProjection::default(),
    };
    let version_rec = state.db.get_workflow_version(workflow_id, version).await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let head = state.db.get_workflow(workflow_id).await
        .map_err(|e| ApiError::NotFound(e.to_string()))?;
    let workflow = nexus_recipe::snapshot_to_workflow(&head.title, &version_rec)
        .map_err(|e| ApiError::Internal(e.to_string()))?;
    let operators = state.extension_registry.list_operators();
    let form = crate::recipe_form::build_recipe_form(
        &recipe.id, &recipe.display_name, &recipe.summary,
        recipe.status.as_deref(), &projection, &workflow, &operators,
    );
    Ok(crate::envelope::ApiResponse::ok(form))
}
```

Register in `crates/nexus-api/src/router.rs` recipes group:
```rust
        .route("/{id}/form", get(handlers::recipes::get_recipe_form))
```

- [ ] **Step 4: Run + commit**

Run: `cargo test -p nexus-api hides_hidden_controls_and_resolves_input_hint && cargo build -p nexus-api`
Expected: PASS + build (regenerate ts-rs bindings).

```bash
git add crates/nexus-api/src/dto/recipe_form.rs crates/nexus-api/src/dto/mod.rs crates/nexus-api/src/recipe_form.rs crates/nexus-api/src/lib.rs crates/nexus-api/src/handlers/recipes.rs crates/nexus-api/src/router.rs apps/web/src/api/generated/
git commit -m "feat(api): GET /recipes/{id}/form — projection + resolved schema hints (P4)"
```

---

### Task 2: Frontend data layer (client fns + hook)

**Files:**
- Modify: `apps/web/src/services/api_client.ts` (add `fetchRecipeForm`, `runRecipe`)
- Modify: the `api/client` barrel the views import from (re-export the new fns + generated types)
- Modify: `apps/web/src/hooks/use_api.ts` (add `useRecipeForm`)

- [ ] **Step 1: Client functions**

In `apps/web/src/services/api_client.ts`, after `fetchRecipes` (line ~297), add (import the generated types from `../api/generated/`):

```typescript
import type { RecipeFormDto } from "../api/generated/RecipeFormDto";
import type { CreateRunResponseDto } from "../api/generated/CreateRunResponseDto";

export function fetchRecipeForm(id: string): Promise<RecipeFormDto> {
  return apiFetch(`/recipes/${encodeURIComponent(id)}/form`);
}

export interface RunRecipeBody {
  control_values: Record<string, unknown>;
  preset_id?: string;
}

export function runRecipe(id: string, body: RunRecipeBody): Promise<CreateRunResponseDto> {
  return apiFetch(`/recipes/${encodeURIComponent(id)}/run`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
```

(Confirm the import path style for generated types matches existing imports in this file — copy an existing `import type { ... } from "../api/generated/..."` line. Re-export `fetchRecipeForm`/`runRecipe`/`RecipeFormDto` through whatever barrel `blueprint.view.tsx` imports from — `../../api/client`.)

- [ ] **Step 2: SWR hook**

In `apps/web/src/hooks/use_api.ts`, mirroring `useWorkflow`/`useModule`:

```typescript
export function useRecipeForm(recipeId: string | null) {
  return useSWR(recipeId ? ["recipe-form", recipeId] : null, () =>
    fetchRecipeForm(recipeId as string),
  );
}
```

(Import `fetchRecipeForm` from the same module the other hooks use. Match the existing `useSWR` key + fetcher style exactly.)

- [ ] **Step 3: Type-check + commit**

Run: `pnpm --dir apps/web tsc --noEmit` (or the repo's TS check command)
Expected: clean.

```bash
git add apps/web/src/services/api_client.ts apps/web/src/hooks/use_api.ts apps/web/src/api/
git commit -m "feat(web): recipe form + run client fns and SWR hook (P4)"
```

---

### Task 3: `RecipeForm` component (widget dispatch + client validation + submit)

> **Invoke `nexudnn-design` first** for the Spectral Graphite styling of this surface. The `.css.ts` below is a structural placeholder.

**Files:**
- Create: `apps/web/src/views/modules/recipe-form/RecipeForm.tsx`
- Create: `apps/web/src/views/modules/recipe-form/widgets.tsx`
- Create: `apps/web/src/views/modules/recipe-form/recipe_form.css.ts`
- Create: `apps/web/src/views/modules/recipe-form/validation.ts`
- Test: `apps/web/src/views/modules/recipe-form/validation.test.ts`, `widgets.test.tsx`

- [ ] **Step 1: Pure client-side validation (mirrors the compiler) + failing test**

Create `apps/web/src/views/modules/recipe-form/validation.ts`:

```typescript
import type { FormControlDto } from "../../../api/generated/FormControlDto";

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

/**
 * Mirror the host compiler's user-input rules client-side: locked controls are
 * never editable, numeric values respect schema min/max, and enum values must be
 * in range. The server re-validates — this is fast feedback, not the gate.
 */
export function validateControlValues(
  controls: FormControlDto[],
  values: Record<string, unknown>,
): ValidationResult {
  const errors: Record<string, string> = {};
  const byId = new Map(controls.map((c) => [c.control_id, c]));
  for (const [id, value] of Object.entries(values)) {
    const control = byId.get(id);
    if (!control) {
      errors[id] = "unknown control";
      continue;
    }
    if (control.mode === "locked") {
      errors[id] = "this value is locked by the recipe";
      continue;
    }
    const hint = control.schema_hint;
    if (hint && typeof value === "number") {
      if (hint.minimum != null && value < hint.minimum) errors[id] = `min ${hint.minimum}`;
      if (hint.maximum != null && value > hint.maximum) errors[id] = `max ${hint.maximum}`;
    }
    if (hint?.enum_values && !hint.enum_values.some((e) => e === value)) {
      errors[id] = "not an allowed value";
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
}
```

Create `validation.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { validateControlValues } from "./validation";
import type { FormControlDto } from "../../../api/generated/FormControlDto";

const ctrl = (over: Partial<FormControlDto>): FormControlDto => ({
  control_id: "c", kind: "float", label: "C", help_text: null, mode: "basic",
  default_value: null, widget_hint: null, schema_hint: null, ...over,
});

describe("validateControlValues", () => {
  it("rejects locked override", () => {
    const r = validateControlValues([ctrl({ control_id: "c", mode: "locked" })], { c: 1 });
    expect(r.ok).toBe(false);
    expect(r.errors.c).toMatch(/locked/);
  });
  it("enforces numeric range", () => {
    const r = validateControlValues(
      [ctrl({ control_id: "c", schema_hint: { value_type: "integer", enum_values: null, minimum: 1, maximum: 10 } })],
      { c: 99 },
    );
    expect(r.ok).toBe(false);
  });
  it("passes valid values", () => {
    const r = validateControlValues([ctrl({ control_id: "c" })], { c: 3 });
    expect(r.ok).toBe(true);
  });
});
```

- [ ] **Step 2: Widget dispatch + failing test**

Create `apps/web/src/views/modules/recipe-form/widgets.tsx`:

```tsx
import type { FormControlDto } from "../../../api/generated/FormControlDto";

interface WidgetProps {
  control: FormControlDto;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function ControlWidget({ control, value, onChange }: WidgetProps) {
  const disabled = control.mode === "locked";
  const hint = control.schema_hint;

  if (hint?.enum_values && hint.enum_values.length > 0) {
    return (
      <select
        aria-label={control.label}
        disabled={disabled}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
      >
        {hint.enum_values.map((opt) => (
          <option key={String(opt)} value={String(opt)}>{String(opt)}</option>
        ))}
      </select>
    );
  }

  switch (control.kind) {
    case "bool":
      return (
        <input type="checkbox" aria-label={control.label} disabled={disabled}
          checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
      );
    case "int":
    case "float":
      return (
        <input type="number" aria-label={control.label} disabled={disabled}
          min={hint?.minimum ?? undefined} max={hint?.maximum ?? undefined}
          value={value === undefined || value === null ? "" : Number(value)}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} />
      );
    case "asset":
      return (
        <input type="text" aria-label={control.label} disabled={disabled}
          placeholder="artifact id or path"
          value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
      );
    default:
      return (
        <textarea aria-label={control.label} disabled={disabled}
          value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
      );
  }
}
```

Create `widgets.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ControlWidget } from "./widgets";
import type { FormControlDto } from "../../../api/generated/FormControlDto";

const ctrl = (over: Partial<FormControlDto>): FormControlDto => ({
  control_id: "c", kind: "string", label: "C", help_text: null, mode: "basic",
  default_value: null, widget_hint: null, schema_hint: null, ...over,
});

describe("ControlWidget", () => {
  it("renders a select for enum hints", () => {
    render(<ControlWidget control={ctrl({ schema_hint: { value_type: "string", enum_values: ["a", "b"], minimum: null, maximum: null } })} value="a" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeTruthy();
  });
  it("locked control is disabled", () => {
    render(<ControlWidget control={ctrl({ mode: "locked" })} value="x" onChange={() => {}} />);
    expect((screen.getByLabelText("C") as HTMLTextAreaElement).disabled).toBe(true);
  });
  it("number widget emits numbers", () => {
    const onChange = vi.fn();
    render(<ControlWidget control={ctrl({ kind: "int" })} value={1} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("C"), { target: { value: "5" } });
    expect(onChange).toHaveBeenCalledWith(5);
  });
});
```

(Confirm the repo's vitest + testing-library setup — copy imports/config from an existing `*.test.tsx` under `apps/web/src`.)

- [ ] **Step 3: The form component + css skeleton**

Create `apps/web/src/views/modules/recipe-form/recipe_form.css.ts` (structural; `nexudnn-design` finalizes tokens):

```typescript
import { style } from "@vanilla-extract/css";

export const root = style({ display: "flex", flexDirection: "column", gap: "1.5rem" });
export const presetRail = style({ display: "flex", gap: "0.5rem", flexWrap: "wrap" });
export const section = style({ display: "flex", flexDirection: "column", gap: "0.75rem" });
export const field = style({ display: "flex", flexDirection: "column", gap: "0.25rem" });
export const error = style({ fontSize: "0.8rem" });
export const actions = style({ display: "flex", gap: "0.75rem", marginTop: "1rem" });
```

Create `apps/web/src/views/modules/recipe-form/RecipeForm.tsx`:

```tsx
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { RecipeFormDto } from "../../../api/generated/RecipeFormDto";
import { runRecipe } from "../../../services/api_client";
import { ControlWidget } from "./widgets";
import { validateControlValues } from "./validation";
import * as s from "./recipe_form.css";

interface RecipeFormProps {
  form: RecipeFormDto;
  onLaunched: (runId: string) => void;
}

export function RecipeForm({ form, onLaunched }: RecipeFormProps) {
  const initial = useMemo(() => {
    const v: Record<string, unknown> = {};
    for (const c of form.controls) {
      if (c.default_value !== null && c.default_value !== undefined) v[c.control_id] = c.default_value;
    }
    return v;
  }, [form]);

  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [presetId, setPresetId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const editable = useMemo(
    () => form.controls.filter((c) => c.mode !== "locked"),
    [form.controls],
  );
  const byId = useMemo(() => new Map(form.controls.map((c) => [c.control_id, c])), [form.controls]);
  const validation = validateControlValues(form.controls, values);

  const setValue = (id: string, value: unknown) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const sections = [...form.sections].sort((a, b) => a.order - b.order);

  async function submit() {
    if (!validation.ok) {
      toast.error("Fix the highlighted fields before running");
      return;
    }
    setSubmitting(true);
    try {
      // only send values for editable controls; locked stay as recipe defaults
      const payload: Record<string, unknown> = {};
      for (const c of editable) {
        if (c.control_id in values) payload[c.control_id] = values[c.control_id];
      }
      const res = await runRecipe(form.recipe_id, { control_values: payload, preset_id: presetId });
      toast.success("Run started");
      onLaunched(res.run_id);
    } catch (err: unknown) {
      toast.error("Run failed", { description: err instanceof Error ? err.message : "unknown" });
    } finally {
      setSubmitting(false);
    }
  }

  const renderControl = (id: string) => {
    const c = byId.get(id);
    if (!c || c.mode === "hidden") return null;
    return (
      <div key={id} className={s.field}>
        <label htmlFor={id}>{c.label}</label>
        <ControlWidget control={c} value={values[id]} onChange={(v) => setValue(id, v)} />
        {c.help_text && <span>{c.help_text}</span>}
        {validation.errors[id] && <span className={s.error}>{validation.errors[id]}</span>}
      </div>
    );
  };

  return (
    <div className={s.root}>
      {form.presets.length > 0 && (
        <div className={s.presetRail}>
          {form.presets.map((p) => (
            <button key={p.preset_id} type="button"
              aria-pressed={presetId === p.preset_id}
              onClick={() => setPresetId(presetId === p.preset_id ? undefined : p.preset_id)}>
              {p.label}
            </button>
          ))}
        </div>
      )}

      {sections.length > 0
        ? sections.map((sec) => (
            <fieldset key={sec.id} className={s.section}>
              <legend>{sec.title}</legend>
              {sec.control_ids.map(renderControl)}
            </fieldset>
          ))
        : form.controls.map((c) => renderControl(c.control_id))}

      <div className={s.actions}>
        <button type="button" disabled={submitting || !validation.ok} onClick={submit}>
          {submitting ? "Starting…" : "Run"}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `pnpm --dir apps/web vitest run src/views/modules/recipe-form`
Expected: validation + widget tests PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/views/modules/recipe-form/
git commit -m "feat(web): generic RecipeForm — widget dispatch, validation, submit (P4)"
```

---

### Task 4: Mount `RecipeForm` in the blueprint Recipe tab

**Files:**
- Modify: `apps/web/src/views/modules/blueprint.view.tsx` (Recipe tab content)

- [ ] **Step 1: Load + render the form**

In `blueprint.view.tsx`, add `useRecipeForm(effectiveRecipeId)` near the other hooks, and in the Recipe-mode branch render `<RecipeForm form={form} onLaunched={(runId) => navigate(\`/runs/${runId}\`)} />` when `form` is loaded (keep the existing step-list as a secondary "How this works" affordance). Import `RecipeForm` from `./recipe-form/RecipeForm` and the hook from `../../hooks/use_api`.

```tsx
// near other hooks:
const { data: recipeForm } = useRecipeForm(effectiveRecipeId);

// inside the Recipe-mode render branch, above/below the existing step list:
{recipeForm && (
  <RecipeForm
    form={recipeForm}
    onLaunched={(runId) => navigate(`/runs/${encodeURIComponent(runId)}`)}
  />
)}
```

(Match the existing JSX structure of the `mode === "recipe"` branch — read lines ~120-300 of the file and place the form where the recipe content renders. The run-progress route `/runs/:id` is assumed to exist; confirm the route in the app router and adjust the navigate target if different.)

- [ ] **Step 2: Verify in the browser (preview workflow)**

Start the dev server (`preview_start`), navigate to a module with a pinned recipe, confirm: the form renders controls, locked controls are disabled, preset pills toggle, an invalid number blocks the Run button, and a valid Run navigates to the run view. Capture a screenshot at 1024/1440 widths. Fix issues in source, re-check.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/views/modules/blueprint.view.tsx
git commit -m "feat(web): render generated RecipeForm in blueprint Recipe tab (P4)"
```

---

## Final verification

- [ ] **Backend tests + lint**

Run: `cargo test -p nexus-api && cargo clippy -p nexus-api -- -D warnings`
Expected: green.

- [ ] **Frontend checks**

Run: `pnpm --dir apps/web tsc --noEmit && pnpm --dir apps/web vitest run src/views/modules/recipe-form && pnpm --dir apps/web build`
Expected: clean; committed `web/dist` rebuilt if the repo commits build output.

- [ ] **Boundary gate**

Run: `grep -rn "emotion-tts\|svi2\|local-llm" crates/nexus-api/src/recipe_form.rs apps/web/src/views/modules/recipe-form/`
Expected: zero hits — the form is fully generic.

---

## Self-review notes

- `GET /recipes/{id}/form` resolves projection + schema hints server-side → Task 1. ✅
- Client data layer (fetch + run + hook) → Task 2. ✅
- Generic `RecipeForm`: widget dispatch, client validation mirroring the compiler, preset rail, submit → Task 3. ✅
- Mounted in the blueprint Recipe tab; browser-verified → Task 4. ✅
- **Hidden controls** excluded server-side (Task 1) AND defensively in render (Task 3). **Locked controls** rendered disabled + never sent. ✅
- **Design discipline (XII.8):** styling is a skeleton; `nexudnn-design` must run before Task 3 for the Spectral Graphite finish. Flagged at the top + per task.
- **Operator schema hint resolution** walks `properties.<pointer>` recursively — covers nested config pointers from P2's grammar. Controls whose binding can't resolve get `schema_hint: null` (rendered as a permissive textarea/number).
- Assumes a `/runs/:id` progress route exists — confirm in the app router at Task 4.
