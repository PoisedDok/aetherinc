# Using llama.cpp with gemini-cli

This guide explains how to use llama.cpp as a backend for gemini-cli, allowing you to run local LLM models instead of connecting to remote Gemini APIs.

## Prerequisites

- A GGUF model file (see [Downloading Models](#downloading-models) below)
- Windows: Pre-built binaries are included (no additional setup required)
- macOS/Linux: Download pre-built binaries from [llama.cpp releases](https://github.com/ggml-org/llama.cpp/releases)

## Setup

The llama.cpp integration uses **original pre-built binaries** from the official llama.cpp releases for maximum reliability and performance:

1. **Windows**: Pre-built binaries are already included in `llama-server-original/`
2. **Auto-fallback**: If pre-built binaries aren't available, falls back to Python llama-cpp-python server
3. **Health check proxy**: Provides reliable health checks on port 8081
4. **Models**: Place GGUF model files in the `./models` directory

## Downloading Models

First create a `models` directory in your project root if it doesn't already exist:

```bash
mkdir -p models
```

Download a GGUF model file and place it in the models directory. Some recommended models:

- [llama-3.2-1b-instruct-q8_0.gguf](https://huggingface.co/hugging-quants/Llama-3.2-1B-Instruct-Q8_0-GGUF/resolve/main/llama-3.2-1b-instruct-q8_0.gguf) (~1.3GB) - **Included**
- [Meta-Llama-3-8B-Instruct.Q4_K_M.gguf](https://huggingface.co/TheBloke/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct.Q4_K_M.gguf) (~4GB)
- [mistral-7b-instruct-v0.2.Q4_K_M.gguf](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf) (~4GB)

## Using llama.cpp in gemini-cli

Simply run gemini-cli and select the "Local llama.cpp" authentication option:

```bash
npm run start
```

Or start the server manually:

```bash
npm run start:llama
```

## Configuration

You can configure the llama.cpp integration using the following environment variables:

- `LLAMA_CPP_HOST`: Server host (default: 0.0.0.0)
- `LLAMA_CPP_PORT`: Server port (default: 8080)
- Model path can be passed as first argument to the start script

Example:

```bash
LLAMA_CPP_PORT=8090 npm run start:llama
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Gemini CLI Application                  │
├─────────────────────────────────────────────────────────────┤
│  llamaCppServer.ts  →  run_llama_server.cjs  →  Original   │
│  (TypeScript)          (Node.js Script)        llama.exe   │
├─────────────────────────────────────────────────────────────┤
│  Health Proxy         Port 8080                Port 8081   │
│  (Node.js)           (llama-server.exe)      (Health API)  │
└─────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### Server won't start

- Make sure you have a GGUF model in the `models` directory
- Check that port 8080 is available
- For non-Windows: Download pre-built binaries for your platform

### Connection issues

- Health check endpoint: http://localhost:8081/health
- Main API endpoint: http://localhost:8080
- Check if any firewall is blocking the connections

### Poor performance

- Try a smaller, quantized model (Q4_K_M variants are a good balance)
- The included Llama 3.2 1B model provides good performance for most tasks
- Ensure you have sufficient RAM (at least 4GB available for 1B models)

## Benefits of Current Implementation

- ✅ **Zero Build Time**: No compilation required
- ✅ **Production Ready**: Official, tested binaries
- ✅ **Performance Optimized**: CPU-specific optimizations included
- ✅ **Reliable**: No dependency on build environments
- ✅ **Maintainable**: Easy to update by downloading new releases
- ✅ **Cross-Platform**: Can be extended to Linux/macOS with respective releases 