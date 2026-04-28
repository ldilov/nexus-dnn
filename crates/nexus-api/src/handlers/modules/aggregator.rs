//! Aggregate read over `extensions` + `recipes` + `workflows` + `deployments`
//! for the module surface (spec 019 FR-027, FR-030, FR-015).

use std::collections::HashMap;

use axum::Json;
use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use nexus_extension::{
    FnvFallbackResolver, IconSource, ManifestIcon, ModuleIconResolver, resolve_from_manifest,
};
use nexus_storage::{ExtensionRecord, IconKind, RecipeRecord, WorkflowRecord};
use serde::Deserialize;

use crate::AppState;
use crate::envelope::ApiResponse;
use crate::error::ApiError;

use super::envelope::{
    CompatibilitySummary, DeploymentCounts, DeploymentRow, ModuleDetail, ModuleIcon,
    ModuleListEnvelope, ModuleSourceKind, ModuleSummary, RecipeRef, RunSummary,
};
use super::module_id::{ModuleId, ModuleIdKind};

#[derive(Debug, Deserialize, Default)]
#[serde(default)]
pub struct ListQuery {
    pub q: Option<String>,
    pub kind: Option<String>,
    pub status: Option<String>,
    pub limit: Option<u32>,
    pub offset: Option<u32>,
}

pub async fn list(
    State(state): State<AppState>,
    Query(q): Query<ListQuery>,
) -> Result<impl IntoResponse, ApiError> {
    let kind = q.kind.as_deref().unwrap_or("all");
    let limit = q.limit.unwrap_or(60).clamp(1, 200);
    let offset = q.offset.unwrap_or(0);
    let search = q.q.as_deref().map(str::trim).filter(|s| !s.is_empty());

    let extensions = nexus_storage::sqlite::extensions::list_extensions(state.db.pool())
        .await
        .map_err(ApiError::from)?;
    let workflows = workflows_of_any_kind(&state).await?;
    let recipes = recipes_of_any_kind(&state).await?;

    let recipes_by_extension: HashMap<String, Vec<RecipeRecord>> =
        group_recipes_by_extension(&recipes);
    let workflow_index = WorkflowIndex::build(&workflows);

    let mut modules = Vec::with_capacity(extensions.len() + workflows.len());

    if matches!(kind, "all" | "extension") {
        for ext in extensions {
            if ext.status == "disabled" && q.status.as_deref() == Some("enabled") {
                continue;
            }
            let blueprints =
                build_blueprints_for_extension(&ext, &recipes_by_extension, &workflow_index);
            if blueprints.is_empty() {
                continue;
            }
            let recipes_for_ext = recipes_by_extension
                .get(&ext.id)
                .map(|v| v.as_slice())
                .unwrap_or(&[]);
            let workflow_id =
                resolve_primary_workflow_id_impl(&ext, recipes_for_ext, &workflow_index);
            modules.push(build_extension_module(ext, blueprints, workflow_id));
        }
    }

    if matches!(kind, "all" | "user") {
        for wfl in workflows {
            if wfl.extension_id.is_some() {
                continue;
            }
            let step_count = count_workflow_nodes(&wfl);
            modules.push(build_user_module(wfl, step_count));
        }
    }

    if let Some(needle) = search {
        let needle_lower = needle.to_lowercase();
        modules.retain(|m| matches_search(m, &needle_lower));
    }

    modules.sort_by(|a, b| match (&a.source_kind, &b.source_kind) {
        (ModuleSourceKind::Extension, ModuleSourceKind::User) => std::cmp::Ordering::Less,
        (ModuleSourceKind::User, ModuleSourceKind::Extension) => std::cmp::Ordering::Greater,
        _ => a.display_name.cmp(&b.display_name),
    });

    let total = modules.len() as u32;
    let modules = modules
        .into_iter()
        .skip(offset as usize)
        .take(limit as usize)
        .collect();

    let envelope = ModuleListEnvelope {
        modules,
        total,
        limit,
        offset,
    };
    Ok((StatusCode::OK, Json(ApiResponse::ok(envelope))))
}

pub async fn detail(
    State(state): State<AppState>,
    Path(module_id_raw): Path<String>,
) -> Result<impl IntoResponse, ApiError> {
    let module_id = ModuleId::parse(module_id_raw.clone()).map_err(|_| {
        ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.invalid_id",
            "module_id does not match the expected shape",
        )
    })?;
    if module_id.is_draft() {
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_id_not_allowed",
            "draft ids are only accepted by /modules/user:draft:{uuid}/materialize",
        ));
    }

    let summary = build_summary_for_id(&state, &module_id).await?;
    let detail = ModuleDetail {
        summary,
        deployments: Vec::new(),
        recent_runs: Vec::new(),
    };
    Ok((StatusCode::OK, Json(ApiResponse::ok(detail))))
}

async fn build_summary_for_id(
    state: &AppState,
    module_id: &ModuleId,
) -> Result<ModuleSummary, ApiError> {
    match module_id.kind() {
        ModuleIdKind::Extension { extension_id } => {
            let ext =
                nexus_storage::sqlite::extensions::get_extension(state.db.pool(), &extension_id)
                    .await
                    .map_err(|_| {
                        ApiError::structured(
                            StatusCode::NOT_FOUND,
                            "module.not_found",
                            "extension not found",
                        )
                    })?;
            let recipes = recipes_of_any_kind(state).await?;
            let workflows = workflows_of_any_kind(state).await?;
            let recipes_by_extension = group_recipes_by_extension(&recipes);
            let workflow_index = WorkflowIndex::build(&workflows);
            let blueprints =
                build_blueprints_for_extension(&ext, &recipes_by_extension, &workflow_index);
            let recipes_for_ext = recipes_by_extension
                .get(&ext.id)
                .map(|v| v.as_slice())
                .unwrap_or(&[]);
            let workflow_id =
                resolve_primary_workflow_id_impl(&ext, recipes_for_ext, &workflow_index);
            Ok(build_extension_module(ext, blueprints, workflow_id))
        }
        ModuleIdKind::User { workflow_id } => {
            let wfls = workflows_of_any_kind(state).await?;
            let wfl = wfls
                .into_iter()
                .find(|w| w.id == workflow_id)
                .ok_or_else(|| {
                    ApiError::structured(
                        StatusCode::NOT_FOUND,
                        "module.not_found",
                        "user workflow not found",
                    )
                })?;
            let step_count = count_workflow_nodes(&wfl);
            Ok(build_user_module(wfl, step_count))
        }
        ModuleIdKind::Blank => Ok(build_blank_module()),
        ModuleIdKind::Draft { .. } => Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_id_not_allowed",
            "draft ids are only accepted by the materialize endpoint",
        )),
    }
}

fn build_extension_module(
    ext: ExtensionRecord,
    blueprints: Vec<RecipeRef>,
    resolved_workflow_id: Option<String>,
) -> ModuleSummary {
    let resolver = FnvFallbackResolver;
    let manifest_icon = icon_from_record(&ext);
    let resolved = resolve_from_manifest(&resolver, manifest_icon.as_ref(), &ext.id);
    let icon = ModuleIcon::from_resolved(resolved);
    let display_name = ext.name.clone().unwrap_or_else(|| ext.id.clone());
    let extension_id = ext.id.clone();
    let status = ext.status.clone();
    ModuleSummary {
        module_id: ModuleId::from_extension(&extension_id),
        source_kind: ModuleSourceKind::Extension,
        extension_id: Some(extension_id),
        display_name,
        icon,
        version: Some(ext.version.clone()),
        tags: Vec::new(),
        blueprints,
        default_runtime_binding_ref: None,
        default_model_binding_ref: None,
        deployments: DeploymentCounts::default(),
        compatibility_summary: ok_compat(),
        description: ext.description.clone(),
        publisher: ext.publisher.clone(),
        runtime_family: Some(ext.runtime_family.clone()),
        installed_at: Some(ext.installed_at.clone()),
        // Prefer the recipe-resolved workflow id (derived from the primary
        // recipe's `workflow_template_ref`) over the manually-curated
        // `ext.default_workflow_id` so frontend "Workflow graph" tab can
        // render a real DAG even on extensions that predate FR-034.
        workflow_id: resolved_workflow_id.or_else(|| ext.default_workflow_id.clone()),
        extension_status: Some(status),
    }
}

fn build_user_module(wfl: WorkflowRecord, step_count: u32) -> ModuleSummary {
    let resolver = FnvFallbackResolver;
    let resolved = resolver.resolve(IconSource::UserModule);
    let icon = ModuleIcon::from_resolved(resolved);
    let blueprint = RecipeRef {
        recipe_id: format!("synthetic:{}", wfl.id),
        display_name: wfl.title.clone(),
        description: None,
        step_count,
        tags: Vec::new(),
        is_primary: true,
    };
    ModuleSummary {
        module_id: ModuleId::from_user_workflow(&wfl.id),
        source_kind: ModuleSourceKind::User,
        extension_id: None,
        display_name: wfl.title,
        icon,
        version: Some(wfl.version),
        tags: Vec::new(),
        blueprints: vec![blueprint],
        default_runtime_binding_ref: None,
        default_model_binding_ref: None,
        deployments: DeploymentCounts::default(),
        compatibility_summary: ok_compat(),
        description: None,
        publisher: None,
        runtime_family: None,
        installed_at: Some(wfl.created_at),
        workflow_id: Some(wfl.id),
        extension_status: None,
    }
}

fn build_blank_module() -> ModuleSummary {
    let resolver = FnvFallbackResolver;
    let resolved = resolver.resolve(IconSource::BlankModule);
    ModuleSummary {
        module_id: ModuleId::blank(),
        source_kind: ModuleSourceKind::Blank,
        extension_id: None,
        display_name: "Blank Module".into(),
        icon: ModuleIcon::from_resolved(resolved),
        version: None,
        tags: Vec::new(),
        blueprints: Vec::new(),
        default_runtime_binding_ref: None,
        default_model_binding_ref: None,
        deployments: DeploymentCounts::default(),
        compatibility_summary: CompatibilitySummary::default(),
        description: Some("Start from an empty workflow.".into()),
        publisher: None,
        runtime_family: None,
        installed_at: None,
        workflow_id: None,
        extension_status: None,
    }
}

fn ok_compat() -> CompatibilitySummary {
    CompatibilitySummary {
        overall: "ok".into(),
        warning_count: 0,
    }
}

fn icon_from_record(ext: &ExtensionRecord) -> Option<ManifestIcon> {
    match ext.icon_kind {
        Some(IconKind::Symbol) => Some(ManifestIcon {
            symbol: ext.icon_symbol.clone(),
            svg: None,
        }),
        Some(IconKind::Svg) => Some(ManifestIcon {
            symbol: None,
            svg: ext.icon_svg.clone(),
        }),
        Some(_) | None => None,
    }
}

fn build_blueprints_for_extension(
    ext: &ExtensionRecord,
    recipes_by_extension: &HashMap<String, Vec<RecipeRecord>>,
    workflow_index: &WorkflowIndex,
) -> Vec<RecipeRef> {
    let mut recipes = recipes_by_extension
        .get(&ext.id)
        .cloned()
        .unwrap_or_default();
    recipes.sort_by(|a, b| a.id.cmp(&b.id));
    let primary_id = ext.primary_recipe_id.as_deref();
    let mut out: Vec<RecipeRef> = recipes
        .into_iter()
        .map(|r| {
            let is_primary = primary_id.is_some_and(|p| p == r.id);
            let step_count = workflow_index
                .resolve(&ext.id, &r.workflow_template_ref)
                .map(count_workflow_nodes)
                .unwrap_or(0);
            RecipeRef {
                recipe_id: r.id,
                display_name: r.display_name,
                description: Some(r.summary).filter(|s| !s.is_empty()),
                step_count,
                tags: Vec::new(),
                is_primary,
            }
        })
        .collect();
    if !out.is_empty() && !out.iter().any(|b| b.is_primary) {
        out[0].is_primary = true;
    }
    out.sort_by(|a, b| b.is_primary.cmp(&a.is_primary));
    out
}

/// Lookup over `workflows` grouped by extension. Used to resolve a
/// recipe's `workflow_template_ref` (e.g. `"workflows/local_chat.yaml"`)
/// to the actual `WorkflowRecord` ingested for that extension — the
/// workflow's `id` comes from the YAML itself, so we match on the file
/// stem.
struct WorkflowIndex<'a> {
    by_extension: HashMap<String, Vec<&'a WorkflowRecord>>,
}

impl<'a> WorkflowIndex<'a> {
    fn build(workflows: &'a [WorkflowRecord]) -> Self {
        let mut by_extension: HashMap<String, Vec<&'a WorkflowRecord>> = HashMap::new();
        for wfl in workflows {
            if let Some(ext_id) = &wfl.extension_id {
                by_extension.entry(ext_id.clone()).or_default().push(wfl);
            }
        }
        Self { by_extension }
    }

    fn resolve(&self, ext_id: &str, template_ref: &str) -> Option<&WorkflowRecord> {
        let candidates = self.by_extension.get(ext_id)?;
        if candidates.is_empty() {
            return None;
        }
        let stem = workflow_ref_stem(template_ref);
        // Prefer an exact id match; fall back to the only-candidate case
        // (many extensions ship 1:1 workflow:recipe).
        candidates
            .iter()
            .find(|w| w.id == stem)
            .or_else(|| candidates.iter().find(|w| w.id.ends_with(stem)))
            .or_else(|| {
                if candidates.len() == 1 {
                    candidates.first()
                } else {
                    None
                }
            })
            .copied()
    }
}

/// Turn a `workflow_template_ref` like `"workflows/local_chat_basic.yaml"`
/// into the workflow id stem `"local_chat_basic"`. Handles `.yaml`, `.yml`,
/// and bare (already-stemmed) refs.
fn workflow_ref_stem(template_ref: &str) -> &str {
    let name = template_ref
        .rsplit('/')
        .next()
        .unwrap_or(template_ref)
        .rsplit('\\')
        .next()
        .unwrap_or(template_ref);
    name.strip_suffix(".yaml")
        .or_else(|| name.strip_suffix(".yml"))
        .unwrap_or(name)
}

/// Count operator nodes on a `WorkflowRecord`. The `nodes` column is a
/// JSON array of `{id, operator, ...}` objects; a valid parse returns the
/// array length. A malformed row returns 0 rather than erroring — the
/// aggregator is read-only and tolerates dirty data with a zero count.
fn count_workflow_nodes(wfl: &WorkflowRecord) -> u32 {
    serde_json::from_str::<serde_json::Value>(&wfl.nodes)
        .ok()
        .and_then(|v| v.as_array().map(|a| a.len()))
        .map(|n| u32::try_from(n).unwrap_or(u32::MAX))
        .unwrap_or(0)
}

/// Pick the workflow id that backs the module's Workflow tab. Prefer the
/// primary blueprint's recipe → workflow_template_ref → resolved workflow;
/// fall back to the extension's manually-set `default_workflow_id`, then
/// to the first workflow the extension owns.
fn resolve_primary_workflow_id_impl(
    ext: &ExtensionRecord,
    recipes_for_ext: &[RecipeRecord],
    workflow_index: &WorkflowIndex,
) -> Option<String> {
    if let Some(default_wf) = ext.default_workflow_id.clone().filter(|s| !s.is_empty()) {
        return Some(default_wf);
    }
    let primary_recipe = ext
        .primary_recipe_id
        .as_ref()
        .and_then(|pid| recipes_for_ext.iter().find(|r| &r.id == pid))
        .or_else(|| recipes_for_ext.first());
    if let Some(r) = primary_recipe {
        if let Some(wfl) = workflow_index.resolve(&ext.id, &r.workflow_template_ref) {
            return Some(wfl.id.clone());
        }
    }
    workflow_index
        .by_extension
        .get(&ext.id)
        .and_then(|list| list.first().map(|w| w.id.clone()))
}

fn group_recipes_by_extension(recipes: &[RecipeRecord]) -> HashMap<String, Vec<RecipeRecord>> {
    let mut map: HashMap<String, Vec<RecipeRecord>> = HashMap::new();
    for r in recipes {
        if !r.extension_id.is_empty() {
            map.entry(r.extension_id.clone())
                .or_default()
                .push(r.clone());
        }
    }
    map
}

async fn workflows_of_any_kind(state: &AppState) -> Result<Vec<WorkflowRecord>, ApiError> {
    use nexus_storage::Database as _;
    state.db.list_workflows().await.map_err(ApiError::from)
}

async fn recipes_of_any_kind(state: &AppState) -> Result<Vec<RecipeRecord>, ApiError> {
    use nexus_storage::Database as _;
    state.db.list_recipes().await.map_err(ApiError::from)
}

fn matches_search(m: &ModuleSummary, needle_lower: &str) -> bool {
    if m.display_name.to_lowercase().contains(needle_lower) {
        return true;
    }
    if let Some(ext_id) = m
        .extension_id
        .as_ref()
        .filter(|id| id.to_lowercase().contains(needle_lower))
    {
        let _ = ext_id;
        return true;
    }
    m.tags
        .iter()
        .any(|t| t.to_lowercase().contains(needle_lower))
}

/// Blueprint projection for `GET /api/v1/modules/{id}/blueprint` (FR-015).
/// For v1 this returns the selected recipe's `RecipeRef`; full step lists
/// are a plan-phase extension and will be emitted once recipe parsing is
/// wired through the aggregator.
pub async fn blueprint(
    State(state): State<AppState>,
    Path(module_id_raw): Path<String>,
    Query(query): Query<BlueprintQuery>,
) -> Result<impl IntoResponse, ApiError> {
    let module_id = ModuleId::parse(module_id_raw).map_err(|_| {
        ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.invalid_id",
            "module_id does not match the expected shape",
        )
    })?;
    if module_id.is_draft() {
        return Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_id_not_allowed",
            "draft ids are only accepted by the materialize endpoint",
        ));
    }
    let summary = build_summary_for_id(&state, &module_id).await?;
    let blueprint = match query.recipe_id {
        Some(requested) => summary
            .blueprints
            .iter()
            .find(|b| b.recipe_id == requested)
            .cloned()
            .ok_or_else(|| {
                ApiError::structured(
                    StatusCode::UNPROCESSABLE_ENTITY,
                    "module.recipe_not_in_module",
                    "recipe_id is not in this module's blueprints",
                )
            })?,
        None => summary.blueprints.first().cloned().ok_or_else(|| {
            ApiError::structured(
                StatusCode::UNPROCESSABLE_ENTITY,
                "module.no_blueprint",
                "module has no blueprints",
            )
        })?,
    };
    Ok((StatusCode::OK, Json(ApiResponse::ok(blueprint))))
}

#[derive(Debug, Deserialize, Default)]
#[serde(default)]
pub struct BlueprintQuery {
    pub recipe_id: Option<String>,
}

/// List the deployments derived from a given module (module-detail view).
#[derive(Clone, Copy, Debug)]
pub enum RunSummaryFilter {
    ByModule,
}

impl RunSummaryFilter {
    /// Intentionally a no-op placeholder for v1 — spec carries this to a
    /// later increment where a materialized view over `runs` + `deployment_run_links`
    /// answers it in one query.
    pub fn summary(&self) -> Vec<RunSummary> {
        Vec::new()
    }
}

pub fn dummy_deployment_rows() -> Vec<DeploymentRow> {
    Vec::new()
}
