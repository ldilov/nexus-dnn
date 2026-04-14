# Quickstart: Builtin Local LLM Chat & RAG Extension

**Spec**: 005

---

## Scenario 1 — First local chat on Windows with llama.cpp

1. Open Nexus and navigate to the **Chat** area.
2. The host shows the builtin **Local LLM** extension as available. Click **Enable**.
3. The extension activates: storage tables are created, operators indexed, UI contributions registered.
4. Choose backend: **llama.cpp** (default recommendation on Windows).
5. The extension probes the system: Windows x64, NVIDIA GPU detected, CUDA 12 available.
6. Accept the recommended runtime profile (**CUDA 12**) or choose CPU / CUDA 13.
7. Click **Install Runtime**. The extension downloads the pinned llama.cpp release, unpacks it, validates the binary.
8. Open the **Model Browser**. Search Hugging Face for a GGUF model (e.g. "Qwen2.5 7B Instruct GGUF").
9. Inspect the repo file list. GGUF files are highlighted with size and quantization hints.
10. Select a GGUF file (e.g. `qwen2.5-7b-instruct-q4_k_m.gguf`) and click **Download**.
11. Monitor download progress. On completion, the model appears in the local registry.
12. Return to Chat. The new model is pre-selected. Click **New Session**.
13. Enter a system prompt and send a user message.
14. Watch the assistant response stream in. Backend health and metrics are visible in the inspector.
15. Try **Stop** mid-generation. The partial output is preserved.
16. Try **Retry**. A new response is generated; the old one remains accessible via retry lineage.

---

## Scenario 2 — Save interactive chat as workflow

1. Start a chat session and configure system prompt and backend profile.
2. Send a message and get a response.
3. Click **Save as Workflow** in the session menu.
4. The host serializes the session into a Local Chat workflow with typed inputs (user_message, system_prompt, backend_profile) and outputs (assistant_message).
5. Open the generated workflow in the **Stage View** or **Graph View**.
6. Click **Run** to execute it through the host run engine.
7. Inspect run artifacts: the assistant message is a typed `text/assistant-response` artifact with full provenance (backend profile, model identity, generation parameters).

---

## Scenario 3 — Local RAG with document corpus

1. Navigate to the **RAG** panel in the Local LLM extension.
2. Click **New Corpus** and name it (e.g. "Project Documentation").
3. Add one or more documents (text files, markdown, PDF).
4. Click **Index**. The extension extracts text, chunks it, generates embeddings, and builds an index.
5. Wait for the corpus state to transition to `ready`.
6. Open a **Chat Session** and attach the corpus via the corpus selector.
7. Ask a question about the documents.
8. The extension retrieves relevant chunks, assembles context, and generates an answer.
9. Click **Inspect Retrieval** to view the retrieval-trace artifact: which chunks were retrieved, with what scores, in what order.

---

## Scenario 4 — TensorRT-LLM on Linux

1. Open backend settings on a Linux system with an NVIDIA GPU.
2. Choose **TensorRT-LLM**.
3. The extension probes the environment: Linux detected, NVIDIA GPU found, CUDA toolkit available.
4. Click **Prepare Environment**. The extension creates a managed Python environment and installs `tensorrt_llm`.
5. Select a Hugging Face model compatible with TensorRT-LLM.
6. Click **Start Backend**. The extension launches `trtllm-serve`.
7. Wait for the backend to reach `ready` (model loaded, health endpoint passing).
8. Create a chat session. Verify streaming responses and normalized metrics (same UI as llama.cpp).

---

## Scenario 5 — TensorRT-LLM on Windows (native managed env)

1. Open backend settings on a Windows system with an NVIDIA GPU.
2. Choose **TensorRT-LLM** (labeled "NVIDIA Optimized").
3. The extension probes: Windows x64, NVIDIA GPU found, CUDA driver detected.
4. Click **Prepare Environment**. The extension creates a managed embedded Python venv with pinned TensorRT-LLM dependencies and validated CUDA version.
5. If a llama.cpp profile with a conflicting CUDA version is active, the UI warns about the conflict and requires stopping it first.
6. Select a compatible HF model (repo-level download happens automatically).
7. Click **Start Backend**. The extension launches `trtllm-serve` from the managed env.
8. Chat and inspect metrics as usual — same normalized UI as llama.cpp.

---

## Scenario 6 — Cross-extension workflow

1. Install an OCR extension that produces `text/document` artifacts.
2. Run an OCR workflow that produces a text artifact from a scanned PDF.
3. Open the Local LLM RAG panel.
4. Create a corpus and add the OCR output artifact as a document source.
5. Index the corpus.
6. Chat with the corpus attached. The local LLM answers questions about the scanned document.
7. The retrieval trace shows chunks from the OCR-produced artifact, maintaining full provenance chain.
