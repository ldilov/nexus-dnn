use axum::Router;
use axum::routing::{get, post};

use crate::AppState;

use super::read::{get_recipe, list_recipes};
use super::run::run_recipe;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", get(list_recipes))
        .route("/{id}", get(get_recipe))
        .route("/{id}/run", post(run_recipe))
}
