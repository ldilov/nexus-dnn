# 🐍 Python SDK Reference

The `nexus_sdk` package provides a Python framework for building Nexus workers. It handles JSON-RPC transport, operator dispatch, progress reporting, and cooperative cancellation so you can focus on your operator logic.

---

## ⚡ Quick Start

```python
from nexus_sdk.worker import BaseWorker

def my_handler(inputs, config, context):
    context.send_progress(50, "Processing...")
    return {
        "status": "completed",
        "outputs": {},
        "metrics": {"duration_ms": 100}
    }

worker = BaseWorker(
    extension_id="my.extension.id",
    extension_version="0.1.0",
    worker_name="my-worker"
)
worker.register_operator("my_op", "1.0.0", my_handler)
worker.run()
```

The worker reads JSON-RPC messages from stdin and writes responses to stdout. The host manages the process lifecycle.

---

## 📦 BaseWorker

### Constructor

```python
BaseWorker(
    extension_id: str,
    extension_version: str,
    worker_name: str
)
```

| Parameter           | Type  | Description                             |
|:--------------------|:------|:----------------------------------------|
| `extension_id`      | `str` | Reverse-DNS extension identifier        |
| `extension_version` | `str` | Semver version of the extension         |
| `worker_name`       | `str` | Human-readable name for this worker     |

### Methods

#### `register_operator(operator_id, version, handler)`

Register a handler function for an operator.

```python
worker.register_operator("resize_image", "1.0.0", resize_handler)
```

| Parameter     | Type       | Description                       |
|:--------------|:-----------|:----------------------------------|
| `operator_id` | `str`     | Matches the operator ID from the YAML definition |
| `version`     | `str`     | Semver version                    |
| `handler`     | `Callable` | Handler function (see below)     |

#### `run()`

Start the stdin/stdout JSON-RPC loop. Blocks until stdin is closed by the host.

```python
worker.run()
```

---

## 🔌 Handler Function

Every operator handler has this signature:

```python
def handler(
    inputs: dict[str, Any],
    config: dict[str, Any],
    context: ExecutionContext
) -> dict[str, Any]:
    ...
```

### Parameters

| Parameter | Type   | Description                                              |
|:----------|:-------|:---------------------------------------------------------|
| `inputs`  | `dict` | Port name -> `{"value": ...}` or `{"artifact_ref": ...}` |
| `config`  | `dict` | Operator configuration values                            |
| `context` | `ExecutionContext` | Provides progress reporting and cancellation   |

### Return Value

Return a dict with these keys:

| Key       | Type   | Description                                        |
|:----------|:-------|:---------------------------------------------------|
| `status`  | `str`  | `"completed"` or `"failed"`                        |
| `outputs` | `dict` | Port name -> `{"artifact_ref": ...}` mappings      |
| `metrics` | `dict` | Execution metrics (e.g. `duration_ms`)             |
| `error`   | `str`  | Error message (only when `status` is `"failed"`)   |

### Example

```python
def resize_handler(inputs, config, context):
    width = config.get("width", 224)
    height = config.get("height", 224)

    context.send_log("info", f"Target size: {width}x{height}")
    context.send_progress(10, "Loading image")

    image_ref = inputs["image"]["artifact_ref"]

    for i, batch in enumerate(batches):
        if context.is_cancelled:
            return {"status": "failed", "error": "Cancelled by user"}

        percent = int((i + 1) / len(batches) * 100)
        context.send_progress(percent, f"Batch {i+1}/{len(batches)}")

    return {
        "status": "completed",
        "outputs": {
            "resized": {"artifact_ref": output_ref}
        },
        "metrics": {"batches_processed": len(batches)}
    }
```

---

## 📊 ExecutionContext

Provided to every handler invocation. Manages progress notifications, logging, and cancellation state.

### Properties

| Property         | Type   | Description                          |
|:-----------------|:-------|:-------------------------------------|
| `request_id`     | `str`  | Unique ID for this execution request |
| `run_id`         | `str`  | Parent run identifier                |
| `node_id`        | `str`  | Node being executed in the workflow  |
| `output_targets` | `dict` | Write references for output ports    |
| `is_cancelled`   | `bool` | `True` if cancellation was requested |

### Methods

#### `send_progress(percent, message)`

Emit a progress notification to the host.

```python
context.send_progress(75, "Processing batch 3/4")
```

| Parameter | Type  | Description              |
|:----------|:------|:-------------------------|
| `percent` | `int` | Completion percentage (0-100) |
| `message` | `str` | Human-readable status    |

#### `send_log(level, message)`

Emit a structured log entry.

```python
context.send_log("warn", "Image has unusual aspect ratio")
```

| Parameter | Type  | Description                           |
|:----------|:------|:--------------------------------------|
| `level`   | `str` | `"debug"`, `"info"`, `"warn"`, `"error"` |
| `message` | `str` | Log message                           |

---

## 📋 Protocol Types

Low-level JSON-RPC dataclasses for advanced use cases. Available via:

```python
from nexus_sdk.protocol import RpcRequest, RpcResponse, RpcNotification, RpcError
```

| Class             | Description                                     |
|:------------------|:------------------------------------------------|
| `RpcRequest`      | Incoming method call (`jsonrpc`, `id`, `method`, `params`) |
| `RpcResponse`     | Outgoing result or error (`jsonrpc`, `id`, `result`, `error`) |
| `RpcNotification` | Fire-and-forget message (`jsonrpc`, `method`, `params`) |
| `RpcError`        | Error payload (`code`, `message`, `data`)       |

### Helper Functions

```python
from nexus_sdk.protocol import (
    parse_message,
    format_response,
    format_error,
    format_notification,
)
```

| Function              | Description                              |
|:----------------------|:-----------------------------------------|
| `parse_message(line)` | Parse a JSON line into an `RpcRequest`   |
| `format_response(id, result)` | Serialize a success response     |
| `format_error(id, code, message)` | Serialize an error response  |
| `format_notification(method, params)` | Serialize a notification  |

### Error Code Constants

```python
from nexus_sdk.protocol import (
    PARSE_ERROR,        # -32700
    INVALID_REQUEST,    # -32600
    METHOD_NOT_FOUND,   # -32601
    INVALID_PARAMS,     # -32602
    INTERNAL_ERROR,     # -32603
)
```

---

## 🔗 Related

- [Extension Guide](extension-guide.md)
- [Worker Protocol](worker-protocol.md)
