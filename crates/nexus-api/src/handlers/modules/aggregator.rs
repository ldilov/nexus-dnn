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

    let mut modules = Vec::with_capacity(extensions.len() + workflows.len());

    if matches!(kind, "all" | "extension") {
        for ext in extensions {
            if ext.status == "disabled" && q.status.as_deref() == Some("enabled") {
                continue;
            }
            let blueprints = build_blueprints_for_extension(&ext, &recipes_by_extension);
            if blueprints.is_empty() {
                continue;
            }
            modules.push(build_extension_module(ext, blueprints));
        }
    }

    if matches!(kind, "all" | "user") {
        for wfl in workflows {
            if wfl.extension_id.is_some() {
                continue;
            }
            modules.push(build_user_module(wfl));
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
            let recipes_by_extension = group_recipes_by_extension(&recipes);
            let blueprints = build_blueprints_for_extension(&ext, &recipes_by_extension);
            Ok(build_extension_module(ext, blueprints))
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
            Ok(build_user_module(wfl))
        }
        ModuleIdKind::Blank => Ok(build_blank_module()),
        ModuleIdKind::Draft { .. } => Err(ApiError::structured(
            StatusCode::BAD_REQUEST,
            "module.draft_id_not_allowed",
            "draft ids are only accepted by the materialize endpoint",
        )),
    }
}

fn build_extension_module(ext: ExtensionRecord, blueprints: Vec<RecipeRef>) -> ModuleSummary {
    let resolver = FnvFallbackResolver;
    let manifest_icon = icon_from_record(&ext);
    let resolved = resolve_from_manifest(&resolver, manifest_icon.as_ref(), &ext.id);
    let icon = ModuleIcon::from_resolved(resolved);
    let display_name = ext.name.clone().unwrap_or_else(|| ext.id.clone());
    let extension_id = ext.id.clone();
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
    }
}

fn build_user_module(wfl: WorkflowRecord) -> ModuleSummary {
    let resolver = FnvFallbackResolver;
    let resolved = resolver.resolve(IconSource::UserModule);
    let icon = ModuleIcon::from_resolved(resolved);
    let blueprint = RecipeRef {
        recipe_id: format!("synthetic:{}", wfl.id),
        display_name: wfl.title.clone(),
        description: None,
        step_count: 0,
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
            RecipeRef {
                recipe_id: r.id,
                display_name: r.display_name,
                description: Some(r.summary).filter(|s| !s.is_empty()),
                step_count: 0,
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
