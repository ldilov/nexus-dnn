use axum::Router;
use axum::routing::{delete, get, post};

use crate::AppState;

use super::form::get_recipe_form;
use super::presets;
use super::read::{get_recipe, list_recipes};
use super::run::run_recipe;
use super::write::{create_recipe, delete_recipe, update_recipe};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_recipes).post(create_recipe))
        .route(
            "/{id}",
            get(get_recipe).put(update_recipe).delete(delete_recipe),
        )
        .route("/{id}/form", get(get_recipe_form))
        .route("/{id}/run", post(run_recipe))
        .route(
            "/{id}/presets",
            get(presets::list_presets).post(presets::create_user_preset),
        )
        .route(
            "/{id}/presets/{preset_id}",
            delete(presets::delete_user_preset),
        )
        .route("/{id}/explain", get(presets::explain_preset_handler))
        .route("/{id}/diff", get(presets::diff_preset_handler))
}
