//! SC-002 / SC-009 — 50-repo normalizer fixture sweep.
//!
//! Each fixture is a minimal `SearchResult`-shaped JSON document
//! covering one realistic HF repository layout. The sweep asserts:
//!
//! 1. **Zero panics / zero errors**: `normalize_family` returns a
//!    valid `ModelFamily` for every fixture.
//! 2. **≥ 95 % correct primary-format classification** (SC-002):
//!    the fixture declares an expected `primary_format`; the
//!    classifier must agree on at least 48 of 50.
//! 3. **Zero unsupported crashes** (SC-009): families whose format
//!    cannot be classified still render a family value, not an Err.
//!
//! Fixtures are defined inline here rather than as 50 separate JSON
//! files so the test data is self-contained and easy to diff.

use std::sync::Arc;

use nexus_huggingface::{RepoFile, SearchResult};
use nexus_models_store::capabilities::{CapabilityRegistry, LlamaCppAdapter};
use nexus_models_store::normalize::normalize_family;
use nexus_models_store::types::{CompatibilityStatus, DependencyRole, Format, Modality};

#[derive(Clone)]
struct Fixture {
    repo_id: &'static str,
    pipeline_tag: Option<&'static str>,
    license: Option<&'static str>,
    files: Vec<(&'static str, u64)>,
    expected_primary_format: Format,
    expected_modality: Modality,
    expected_compat: CompatibilityStatus,
    expected_variant_count: Option<usize>,
    expected_dependencies: Vec<DependencyRole>,
}

fn mk(raw: &Fixture) -> SearchResult {
    SearchResult {
        repo_id: raw.repo_id.to_owned(),
        author: raw.repo_id.split('/').next().map(str::to_owned),
        license: raw.license.map(str::to_owned),
        downloads_30d: Some(1000),
        last_modified: Some("2026-01-01T00:00:00Z".to_owned()),
        files: raw
            .files
            .iter()
            .map(|(path, size)| RepoFile {
                path: (*path).to_owned(),
                size_bytes: Some(*size),
            })
            .collect(),
        formats: vec![],
        quantizations: vec![],
        pipeline_tag: raw.pipeline_tag.map(str::to_owned),
    }
}

fn all_fixtures() -> Vec<Fixture> {
    vec![
        // -- GGUF, single quantization (1-10)
        Fixture {
            repo_id: "TheBloke/Llama-2-7B-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("llama2"),
            files: vec![("llama-2-7b.Q4_K_M.gguf", 4_900_000_000)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "TheBloke/TinyLlama-1.1B-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("apache-2.0"),
            files: vec![
                ("tinyllama.Q2_K.gguf", 480_000_000),
                ("tinyllama.Q4_K_M.gguf", 700_000_000),
                ("tinyllama.Q8_0.gguf", 1_200_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(3),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "bartowski/Llama-3-8B-Instruct-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("llama3"),
            files: vec![
                ("Llama-3-8B.IQ3_M.gguf", 3_700_000_000),
                ("Llama-3-8B.IQ4_XS.gguf", 4_200_000_000),
                ("Llama-3-8B.Q4_K_M.gguf", 4_900_000_000),
                ("Llama-3-8B.Q5_K_M.gguf", 5_700_000_000),
                ("Llama-3-8B.Q6_K.gguf", 6_600_000_000),
                ("Llama-3-8B.Q8_0.gguf", 8_500_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(6),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "lmg-anon/llama-3-70b-gguf",
            pipeline_tag: Some("text-generation"),
            license: None,
            files: vec![
                ("llama70b-Q2_K-00001-of-00004.gguf", 10_000_000_000),
                ("llama70b-Q2_K-00002-of-00004.gguf", 10_000_000_000),
                ("llama70b-Q2_K-00003-of-00004.gguf", 10_000_000_000),
                ("llama70b-Q2_K-00004-of-00004.gguf", 5_000_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "TheBloke/Mistral-7B-v0.3-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("apache-2.0"),
            files: vec![
                ("mistral-7b.Q4_0.gguf", 4_000_000_000),
                ("mistral-7b.Q5_K_M.gguf", 5_100_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(2),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "NousResearch/Hermes-2-Pro-Llama-3-8B-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("llama3"),
            files: vec![("Hermes-2-Pro.Q4_K_M.gguf", 4_900_000_000)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "TheBloke/CodeLlama-7B-Instruct-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("llama2"),
            files: vec![("codellama-7b.Q4_K_M.gguf", 4_800_000_000)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "Qwen/Qwen2.5-7B-Instruct-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("apache-2.0"),
            files: vec![
                ("qwen2.5-7b.Q4_K_M.gguf", 4_800_000_000),
                ("qwen2.5-7b.Q8_0.gguf", 8_100_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(2),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "lmstudio-community/gemma-2-9b-it-GGUF",
            pipeline_tag: Some("text-generation"),
            license: Some("gemma"),
            files: vec![("gemma-9b-it.F16.gguf", 18_000_000_000)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "microsoft/Phi-3-mini-4k-instruct-gguf",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![
                ("Phi-3-mini-4k.Q4_0.gguf", 2_400_000_000),
                ("Phi-3-mini-4k.Q8_0.gguf", 4_100_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(2),
            expected_dependencies: vec![],
        },
        // -- safetensors LLM (11-20)
        Fixture {
            repo_id: "meta-llama/Llama-3-8B-Instruct",
            pipeline_tag: Some("text-generation"),
            license: Some("llama3"),
            files: vec![
                ("model-00001-of-00004.safetensors", 4_900_000_000),
                ("model-00002-of-00004.safetensors", 4_900_000_000),
                ("tokenizer.json", 1_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        Fixture {
            repo_id: "mistralai/Mistral-7B-Instruct-v0.3",
            pipeline_tag: Some("text-generation"),
            license: Some("apache-2.0"),
            files: vec![
                ("model-fp16.safetensors", 14_500_000_000),
                ("tokenizer.model", 500_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        Fixture {
            repo_id: "Qwen/Qwen2.5-14B-Instruct",
            pipeline_tag: Some("text-generation"),
            license: Some("apache-2.0"),
            files: vec![("model-bf16.safetensors", 28_000_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "google/gemma-2-2b",
            pipeline_tag: Some("text-generation"),
            license: Some("gemma"),
            files: vec![
                ("model.safetensors", 5_000_000_000),
                ("tokenizer_config.json", 10_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        Fixture {
            repo_id: "microsoft/Phi-3-mini-4k-instruct",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![("model-fp16.safetensors", 7_600_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "tiiuae/falcon-7b-instruct",
            pipeline_tag: Some("text-generation"),
            license: Some("apache-2.0"),
            files: vec![("pytorch_model.bin", 14_000_000_000)],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "EleutherAI/gpt-neo-2.7B",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![("pytorch_model.bin", 10_700_000_000)],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "bigscience/bloom-7b1",
            pipeline_tag: Some("text-generation"),
            license: Some("bigscience-bloom-rail-1.0"),
            files: vec![("pytorch_model.bin", 14_000_000_000)],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "facebook/opt-6.7b",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![("pytorch_model-00001-of-00002.bin", 7_000_000_000)],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "HuggingFaceH4/zephyr-7b-beta",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![
                ("model-fp16.safetensors", 14_500_000_000),
                ("tokenizer.json", 2_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        // -- image models w/ dependencies (21-30)
        Fixture {
            repo_id: "stabilityai/stable-diffusion-xl-base-1.0",
            pipeline_tag: Some("text-to-image"),
            license: Some("openrail++"),
            files: vec![
                ("sd_xl_base_1.0.safetensors", 6_900_000_000),
                ("vae/diffusion_pytorch_model.safetensors", 335_000_000),
                ("tokenizer/vocab.json", 500_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Vae, DependencyRole::Tokenizer],
        },
        Fixture {
            repo_id: "runwayml/stable-diffusion-v1-5",
            pipeline_tag: Some("text-to-image"),
            license: Some("creativeml-openrail-m"),
            files: vec![
                ("v1-5-pruned.safetensors", 7_000_000_000),
                ("vae.safetensors", 335_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Vae],
        },
        Fixture {
            repo_id: "stabilityai/stable-diffusion-3-medium",
            pipeline_tag: Some("text-to-image"),
            license: Some("stabilityai-license"),
            files: vec![("sd3_medium.safetensors", 4_300_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "madebyollin/sdxl-vae-fp16-fix",
            pipeline_tag: Some("text-to-image"),
            license: Some("apache-2.0"),
            files: vec![("diffusion_pytorch_model.safetensors", 335_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "lllyasviel/sd-controlnet-canny",
            pipeline_tag: Some("image-to-image"),
            license: Some("creativeml-openrail-m"),
            files: vec![("controlnet-model.safetensors", 1_400_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "latent-consistency/lcm-lora-sdxl",
            pipeline_tag: Some("text-to-image"),
            license: Some("openrail++"),
            files: vec![("lora.safetensors", 200_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "black-forest-labs/FLUX.1-dev",
            pipeline_tag: Some("text-to-image"),
            license: Some("flux-dev-non-commercial"),
            files: vec![
                ("flux1-dev.safetensors", 23_000_000_000),
                ("vae/vae.safetensors", 335_000_000),
                ("text_encoder/model.safetensors", 246_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Vae, DependencyRole::TextEncoder],
        },
        Fixture {
            repo_id: "ByteDance/SDXL-Lightning",
            pipeline_tag: Some("text-to-image"),
            license: Some("openrail++"),
            files: vec![("sdxl_lightning_8step.safetensors", 5_100_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "Lykon/DreamShaper",
            pipeline_tag: Some("text-to-image"),
            license: Some("creativeml-openrail-m"),
            files: vec![
                ("dreamshaper_8.safetensors", 2_100_000_000),
                ("vae.safetensors", 335_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Vae],
        },
        Fixture {
            repo_id: "emilianJR/chilloutmix_Niprunedfp16Fix",
            pipeline_tag: Some("text-to-image"),
            license: Some("creativeml-openrail-m"),
            files: vec![("chilloutmix-fp16.safetensors", 2_100_000_000)],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        // -- upscalers and .pth (31-35)
        Fixture {
            repo_id: "lllyasviel/Annotators",
            pipeline_tag: Some("image-to-image"),
            license: Some("apache-2.0"),
            files: vec![("ScuNET.pth", 65_000_000)],
            expected_primary_format: Format::Pth,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "xinntao/Real-ESRGAN",
            pipeline_tag: Some("super-resolution"),
            license: Some("apache-2.0"),
            files: vec![("RealESRGAN_x4plus.pth", 67_000_000)],
            expected_primary_format: Format::Pth,
            expected_modality: Modality::Upscaler,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "TencentARC/PhotoMaker",
            pipeline_tag: Some("image-to-image"),
            license: Some("apache-2.0"),
            files: vec![("photomaker-v2.bin", 930_000_000)],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Image,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "caidas/swin2SR-classical-sr-x2-64",
            pipeline_tag: Some("super-resolution"),
            license: Some("apache-2.0"),
            files: vec![("model.pth", 45_000_000)],
            expected_primary_format: Format::Pth,
            expected_modality: Modality::Upscaler,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "utnah/upscaler-x4-anime",
            pipeline_tag: None,
            license: Some("apache-2.0"),
            files: vec![("upscaler.pth", 30_000_000)],
            expected_primary_format: Format::Pth,
            expected_modality: Modality::Other,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        // -- audio + embedding (36-40)
        Fixture {
            repo_id: "openai/whisper-large-v3",
            pipeline_tag: Some("automatic-speech-recognition"),
            license: Some("apache-2.0"),
            files: vec![
                ("model-fp16.safetensors", 3_100_000_000),
                ("tokenizer.json", 2_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Audio,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        Fixture {
            repo_id: "facebook/wav2vec2-base-960h",
            pipeline_tag: Some("automatic-speech-recognition"),
            license: Some("apache-2.0"),
            files: vec![("pytorch_model.bin", 380_000_000)],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Audio,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "coqui/XTTS-v2",
            pipeline_tag: Some("text-to-speech"),
            license: Some("cpml"),
            files: vec![("model.pth", 1_900_000_000)],
            expected_primary_format: Format::Pth,
            expected_modality: Modality::Audio,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "sentence-transformers/all-MiniLM-L6-v2",
            pipeline_tag: Some("sentence-similarity"),
            license: Some("apache-2.0"),
            files: vec![
                ("model.safetensors", 90_000_000),
                ("tokenizer.json", 500_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Embedding,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        Fixture {
            repo_id: "BAAI/bge-large-en-v1.5",
            pipeline_tag: Some("feature-extraction"),
            license: Some("mit"),
            files: vec![
                ("pytorch_model.bin", 1_300_000_000),
                ("tokenizer.json", 500_000),
            ],
            expected_primary_format: Format::PytorchBin,
            expected_modality: Modality::Embedding,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![DependencyRole::Tokenizer],
        },
        // -- mixed/weird/edge (41-50)
        Fixture {
            repo_id: "mixed/both-formats",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![
                ("model.Q4_K_M.gguf", 4_900_000_000),
                ("model-fp16.safetensors", 14_000_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/empty-repo",
            pipeline_tag: None,
            license: None,
            files: vec![("README.md", 2_000), ("config.json", 500)],
            expected_primary_format: Format::Unknown,
            expected_modality: Modality::Other,
            expected_compat: CompatibilityStatus::Unsupported,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/pth-only-no-pipeline-tag",
            pipeline_tag: None,
            license: None,
            files: vec![("checkpoint.pth", 150_000_000)],
            expected_primary_format: Format::Pth,
            expected_modality: Modality::Other,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/weird-ext-gguf-dot-lfs",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![("model.gguf.lfs", 4_000_000_000)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: None,
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/enormous-quant-set",
            pipeline_tag: Some("text-generation"),
            license: None,
            files: vec![
                ("m.IQ1_S.gguf", 1_000_000_000),
                ("m.IQ2_XXS.gguf", 1_500_000_000),
                ("m.IQ2_XS.gguf", 1_700_000_000),
                ("m.IQ3_XXS.gguf", 2_000_000_000),
                ("m.IQ3_M.gguf", 2_100_000_000),
                ("m.Q2_K.gguf", 2_300_000_000),
                ("m.Q3_K_S.gguf", 2_800_000_000),
                ("m.Q3_K_M.gguf", 3_100_000_000),
                ("m.Q4_K_S.gguf", 3_700_000_000),
                ("m.Q4_K_M.gguf", 4_100_000_000),
                ("m.Q5_K_M.gguf", 4_800_000_000),
                ("m.Q6_K.gguf", 5_600_000_000),
                ("m.Q8_0.gguf", 7_200_000_000),
                ("m.F16.gguf", 13_000_000_000),
            ],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(14),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/readme-only",
            pipeline_tag: None,
            license: None,
            files: vec![("README.md", 50_000)],
            expected_primary_format: Format::Unknown,
            expected_modality: Modality::Other,
            expected_compat: CompatibilityStatus::Unsupported,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/missing-size-bytes",
            pipeline_tag: Some("text-generation"),
            license: Some("mit"),
            files: vec![("model.Q4_K_M.gguf", 0)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/uppercase-extension",
            pipeline_tag: Some("text-generation"),
            license: None,
            files: vec![("MODEL-Q5_K_M.GGUF", 5_000_000_000)],
            expected_primary_format: Format::Gguf,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::Compatible,
            expected_variant_count: Some(1),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/tokenizer-only",
            pipeline_tag: None,
            license: None,
            files: vec![("tokenizer.json", 500_000)],
            expected_primary_format: Format::Unknown,
            expected_modality: Modality::Other,
            expected_compat: CompatibilityStatus::Unsupported,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
        Fixture {
            repo_id: "edge/giant-sharded-safetensors",
            pipeline_tag: Some("text-generation"),
            license: Some("llama3"),
            files: vec![
                ("model-00001-of-00030.safetensors", 4_000_000_000),
                ("model-00002-of-00030.safetensors", 4_000_000_000),
                ("model-00003-of-00030.safetensors", 4_000_000_000),
            ],
            expected_primary_format: Format::Safetensors,
            expected_modality: Modality::Llm,
            expected_compat: CompatibilityStatus::DownloadableButNotRunnable,
            expected_variant_count: Some(0),
            expected_dependencies: vec![],
        },
    ]
}

fn registry() -> CapabilityRegistry {
    let mut r = CapabilityRegistry::new();
    r.register(Arc::new(LlamaCppAdapter::new()));
    r
}

#[test]
fn fifty_repo_sweep_never_panics_and_classifies_correctly() {
    let fixtures = all_fixtures();
    assert_eq!(fixtures.len(), 50, "expected exactly 50 fixtures for SC-002");

    let reg = registry();
    let mut panics = 0_usize;
    let mut correct_format = 0_usize;

    for fixture in &fixtures {
        let raw = mk(fixture);
        let result = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
            normalize_family(&raw, &reg)
        }));
        let family = match result {
            Ok(f) => f,
            Err(_) => {
                panics += 1;
                eprintln!("PANIC on fixture {}", fixture.repo_id);
                continue;
            }
        };

        let primary = family
            .artifacts
            .iter()
            .find(|a| a.role == DependencyRole::Primary);
        let got_format = primary.map(|a| a.format).unwrap_or(Format::Unknown);
        if got_format == fixture.expected_primary_format {
            correct_format += 1;
        } else if fixture.expected_primary_format == Format::Unknown
            && primary.is_none()
        {
            correct_format += 1;
        } else {
            eprintln!(
                "MISCLASSIFIED {}: expected {:?}, got {:?}",
                fixture.repo_id, fixture.expected_primary_format, got_format
            );
        }
    }

    assert_eq!(panics, 0, "SC-009: zero panics across the 50-repo sweep");
    let correct_pct = (correct_format as f64) / (fixtures.len() as f64) * 100.0;
    assert!(
        correct_format >= 48,
        "SC-002: expected ≥95% primary-format classification (≥48/50), got {correct_format}/50 ({correct_pct:.1}%)"
    );
}

#[test]
fn sweep_detects_required_dependencies_when_present() {
    let fixtures = all_fixtures();
    let reg = registry();
    for f in &fixtures {
        let family = normalize_family(&mk(f), &reg);
        let roles: Vec<DependencyRole> =
            family.dependencies.iter().map(|d| d.role).collect();
        for expected in &f.expected_dependencies {
            assert!(
                roles.contains(expected),
                "fixture {} missing expected dep {:?}; got {:?}",
                f.repo_id,
                expected,
                roles
            );
        }
    }
}

#[test]
fn sweep_computes_compat_deterministically() {
    let fixtures = all_fixtures();
    let reg = registry();
    for f in &fixtures {
        let family = normalize_family(&mk(f), &reg);
        assert_eq!(
            family.compat, f.expected_compat,
            "compat mismatch for {}: expected {:?}, got {:?}",
            f.repo_id, f.expected_compat, family.compat
        );
    }
}

#[test]
fn sweep_classifies_modality_reasonably() {
    let fixtures = all_fixtures();
    let reg = registry();
    let mut correct = 0_usize;
    for f in &fixtures {
        let family = normalize_family(&mk(f), &reg);
        if family.repository.modality == f.expected_modality {
            correct += 1;
        }
    }
    assert!(
        correct >= 45,
        "modality: expected ≥90% ({correct}/50). Fixtures without pipeline_tag fall back to Other by design."
    );
}

#[test]
fn sweep_variant_counts_match_declared() {
    let fixtures = all_fixtures();
    let reg = registry();
    for f in &fixtures {
        let Some(expected_count) = f.expected_variant_count else {
            continue;
        };
        let family = normalize_family(&mk(f), &reg);
        assert_eq!(
            family.variants.len(),
            expected_count,
            "variant count mismatch for {}: expected {}, got {} — labels {:?}",
            f.repo_id,
            expected_count,
            family.variants.len(),
            family.variants.iter().map(|v| v.label.as_str()).collect::<Vec<_>>()
        );
    }
}
