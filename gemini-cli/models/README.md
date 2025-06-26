# Models Directory

Place GGUF model files in this directory to use them with the llama.cpp backend for gemini-cli.

## Recommended Models

You can download any of these models and place them in this directory:

| Model | Size | Description | Link |
|-------|------|-------------|------|
| Meta-Llama-3-8B-Instruct.Q4_K_M.gguf | ~4GB | Meta's Llama-3-8B instruction model | [Download](https://huggingface.co/TheBloke/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct.Q4_K_M.gguf) |
| mistral-7b-instruct-v0.2.Q4_K_M.gguf | ~4GB | Mistral AI's 7B instruction model | [Download](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_M.gguf) |
| gemma-7b-it.Q4_K_M.gguf | ~4GB | Google's Gemma 7B instruction model | [Download](https://huggingface.co/TheBloke/Gemma-7B-it-GGUF/resolve/main/gemma-7b-it.Q4_K_M.gguf) |

## Usage

After placing a GGUF model in this directory:

1. Start the llama.cpp server:
   ```bash
   npm run start:llama
   ```

2. In a separate terminal, run gemini-cli:
   ```bash
   npm run start
   ```

3. When prompted for the authentication method, select "Local llama.cpp"

## Advanced Configuration

To use a specific model file:

```bash
LLAMA_MODEL_PATH="/path/to/your/model.gguf" npm run start:llama
```

See the [llama-cpp.md](../docs/tools/llama-cpp.md) documentation for more details. 