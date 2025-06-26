# Llama.cpp Integration for Gemini CLI

This document explains how to use the llama.cpp integration in Gemini CLI, which allows you to run local LLMs as an alternative to the Gemini API.

## Overview

Gemini CLI now includes integration with llama.cpp using **original pre-built binaries** from the official llama.cpp releases, enabling you to:

- Run local LLMs offline without requiring an API key
- Use your own models with the same interface as Gemini
- Switch seamlessly between Gemini API and local models
- Get production-ready performance without compilation

## Implementation Details

The current implementation uses a robust, multi-layered approach:

1. **Primary**: Original pre-built `llama-server.exe` from GitHub releases
2. **Fallback**: Python llama-cpp-python server if binaries unavailable
3. **Health Proxy**: Node.js proxy providing health checks on port 8081
4. **Auto-discovery**: Automatically finds and uses the correct binary

## Requirements

- **Windows**: No additional requirements (pre-built binaries included)
- **macOS/Linux**: Download pre-built binaries from [llama.cpp releases](https://github.com/ggml-org/llama.cpp/releases)
- **Fallback only**: `pip install llama-cpp-python[server]` (if pre-built binaries unavailable)

## Getting Started

### Using the Built-in Server

Gemini CLI includes a robust script to start the llama.cpp server:

```bash
# Start the server with default settings
npm run start:llama

# Start the server on an alternative port
LLAMA_CPP_PORT=8090 npm run start:llama

# Test the integration
npm run test:llama
```

### Configuration Options

Configure the llama.cpp integration using environment variables:

- `LLAMA_CPP_HOST`: Host for the llama.cpp server (default: 0.0.0.0)
- `LLAMA_CPP_PORT`: Port for the llama.cpp server (default: 8080)
- Model path can be passed as first argument to the script

### Using Your Own Models

Place your GGUF model files in the `gemini-cli/models/` directory. The default model `llama-3.2-1b-instruct-q8_0.gguf` is already included.

## Switching Between Gemini API and Local LLM

1. Start Gemini CLI
2. Press `Ctrl+A` to open the auth dialog
3. Select "Local LLM (llama.cpp)"
4. If the server isn't running, it will be started automatically

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

### Server Won't Start

If the server fails to start:

1. Check if port 8080 is already in use
2. Try using an alternative port: `LLAMA_CPP_PORT=8090 npm run start:llama`
3. Ensure you have a compatible model file in the models directory
4. For non-Windows: Download and extract pre-built binaries

### Connection Issues

If Gemini CLI can't connect to the server:

1. Check health endpoint: `curl http://localhost:8081/health`
2. Check main API: `curl http://localhost:8080/health`
3. Verify the port matches what's configured
4. Check for any error messages in the server console

## Performance

### Current Performance Metrics

With the included Llama 3.2 1B model:
- **Prompt evaluation**: ~12 tokens/second
- **Text generation**: ~8 tokens/second
- **Memory usage**: ~1.25 GB
- **Context window**: 4096 tokens (131K max available)

### Optimization Tips

For better performance:

1. **Use appropriate model sizes**: 1B models for fast responses, 8B+ for quality
2. **Quantization**: Q8_0 (included) provides good quality, Q4_K_M for speed
3. **Hardware**: More RAM allows larger context windows
4. **Alternative models**: Try different models based on your use case

## Supported Models

Any GGUF format model supported by llama.cpp should work. Recommended models:

- **Llama 3.2 1B Instruct** (included) - Fast, good for development
- **Llama 3.2 3B Instruct** - Better quality, still fast
- **Llama 3.1 8B Instruct** - High quality, requires more resources
- **Mistral 7B Instruct** - Alternative high-quality option
- **Phi-3 Mini** - Microsoft's compact model

## Benefits of Current Implementation

- ✅ **Zero Build Time**: No compilation required
- ✅ **Production Ready**: Official, tested binaries
- ✅ **Performance Optimized**: CPU-specific optimizations included
- ✅ **Reliable**: No dependency on Python build environments
- ✅ **Maintainable**: Easy to update by downloading new releases
- ✅ **Cross-Platform**: Can be extended to Linux/macOS with respective releases

## Updating

To update to a newer version:

1. Visit https://github.com/ggml-org/llama.cpp/releases
2. Download the latest Windows CPU binary: `llama-bXXXX-bin-win-cpu-x64.zip`
3. Extract to `llama-server-original/` (replace existing)
4. Test with `npm run test:llama`

## Limitations

- GPU acceleration requires additional setup (not included in pre-built binaries)
- Some advanced Gemini features may not be available with local models
- Performance depends on your hardware and the model size
- Context window is limited by available RAM 