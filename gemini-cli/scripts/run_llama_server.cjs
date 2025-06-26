#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');

// Constants
const MODELS_DIR = path.join(__dirname, '..', 'models');
const DEFAULT_MODEL = 'Llama-3.2-3B-Instruct-Q3_K_XL';
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '0.0.0.0';

// Get host and port from environment or use defaults
const HOST = process.env.LLAMA_CPP_HOST || DEFAULT_HOST;
const PORT = parseInt(process.env.LLAMA_CPP_PORT || DEFAULT_PORT, 10);
const HEALTH_PORT = PORT + 1; // Use the next port for health check proxy

// Path to the original llama.cpp binaries (downloaded from GitHub releases)
const ORIGINAL_SERVER_DIR = path.join(__dirname, '..', '..', 'llama-server-original');
const ORIGINAL_SERVER_PATH = path.join(ORIGINAL_SERVER_DIR, 'llama-server.exe');

console.log('Starting llama.cpp server...');
console.log(`Configuration:`);
console.log(`  Host: ${HOST}`);
console.log(`  Port: ${PORT}`);
console.log(`  Health check port: ${HEALTH_PORT}`);

/**
 * Execute a command and return a promise
 */
function executeCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) console.warn(stderr);
      if (stdout) console.log(stdout);
      resolve(stdout);
    });
  });
}

/**
 * Start a simple proxy server that adds health check endpoint
 */
function startHealthCheckProxy() {
  const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    // Forward all other requests to the actual llama.cpp server
    const options = {
      hostname: HOST === '0.0.0.0' ? 'localhost' : HOST,
      port: PORT,
      path: req.url,
      method: req.method,
      headers: req.headers
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Gateway', message: err.message }));
    });

    req.pipe(proxyReq, { end: true });
  });

  server.listen(HEALTH_PORT, HOST, () => {
    console.log(`Health check proxy server running at http://${HOST}:${HEALTH_PORT}`);
  });

  return server;
}

/**
 * Try using the original pre-built llama-server.exe
 */
function tryOriginalServer(modelPath) {
  console.log('Checking for original llama-server.exe...');
  
  if (!fs.existsSync(ORIGINAL_SERVER_PATH)) {
    console.log(`Original server not found at: ${ORIGINAL_SERVER_PATH}`);
    return false;
  }

  console.log(`Found original server at: ${ORIGINAL_SERVER_PATH}`);
  console.log('Starting original llama.cpp server...');

  const healthServer = startHealthCheckProxy();

  // Run the original server
  const serverArgs = [
    '-m', modelPath,
    '--host', HOST,
    '--port', PORT.toString(),
    '-c', '4096',
    '--threads', '4'
  ];

  console.log(`Starting server: ${ORIGINAL_SERVER_PATH} ${serverArgs.join(' ')}`);

  const serverProcess = spawn(ORIGINAL_SERVER_PATH, serverArgs, {
    cwd: ORIGINAL_SERVER_DIR, // Important: run from the directory with DLLs
    stdio: 'inherit'
  });

  serverProcess.on('error', (err) => {
    console.error('Failed to start original server:', err);
    healthServer.close();
    process.exit(1);
  });

  process.on('SIGINT', () => {
    console.log('Stopping llama.cpp server...');
    serverProcess.kill('SIGINT');
    healthServer.close();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('Stopping llama.cpp server...');
    serverProcess.kill('SIGTERM');
    healthServer.close();
    process.exit(0);
  });

  return true;
}

/**
 * Fallback to Python server
 */
async function tryPythonServer(modelPath) {
  console.log('Falling back to Python llama-cpp-python server...');

  try {
    const { spawn } = require('child_process');
    console.log('Starting llama.cpp server using Python bindings...');

    // Create a simple Python server script
    const pythonScript = `
import os
import sys
from llama_cpp.server.app import create_app
from llama_cpp.server.settings import Settings

# Configuration
HOST = "${HOST}"
PORT = ${PORT}
MODEL_PATH = r"${modelPath.replace(/\\/g, '\\\\')}"

print(f"Starting Python llama-cpp server...")
print(f"Model: {MODEL_PATH}")
print(f"Host: {HOST}")
print(f"Port: {PORT}")

# Verify model exists
if not os.path.exists(MODEL_PATH):
    print(f"Error: Model file not found: {MODEL_PATH}")
    sys.exit(1)

# Create settings
settings = Settings(
    model=MODEL_PATH,
    host=HOST,
    port=PORT,
    n_ctx=4096,
    n_threads=4,
    verbose=True
)

# Create and run the app
app = create_app(settings=settings)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=HOST,
        port=PORT,
        log_level="info"
    )
`;

    // Write the script to a temporary file
    const tempScriptPath = path.join(os.tmpdir(), 'llama_server.py');
    fs.writeFileSync(tempScriptPath, pythonScript);

    const healthServer = startHealthCheckProxy();

    // Run the Python server
    const serverProcess = spawn('python', [tempScriptPath], {
      stdio: 'inherit'
    });

    process.on('SIGINT', () => {
      console.log('Stopping llama.cpp server...');
      serverProcess.kill('SIGINT');
      healthServer.close();
      // Clean up temp file
      try { fs.unlinkSync(tempScriptPath); } catch (e) {}
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('Stopping llama.cpp server...');
      serverProcess.kill('SIGTERM');
      healthServer.close();
      // Clean up temp file
      try { fs.unlinkSync(tempScriptPath); } catch (e) {}
      process.exit(0);
    });

    return true;
  } catch (error) {
    console.error('Failed to start Python server:', error);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  // Get model path from command line args or default
  let modelPath = process.argv[2] || path.join(__dirname, '..', 'models', `${DEFAULT_MODEL}.gguf`);
  
  // Resolve relative paths
  if (!path.isAbsolute(modelPath)) {
    modelPath = path.resolve(modelPath);
  }

  console.log(`Model path: ${modelPath}`);
  
  // Check if model exists
  if (!fs.existsSync(modelPath)) {
    console.error(`Error: Model file not found: ${modelPath}`);
    console.error('Please provide a valid model path as the first argument.');
    process.exit(1);
  }

  console.log(`Starting llama.cpp server on ${HOST}:${PORT}...`);

  // Try different methods to start the server
  if (tryOriginalServer(modelPath)) {
    return; // Original server started successfully
  }

  console.log('Original server not available, trying Python fallback...');
  
  if (await tryPythonServer(modelPath)) {
    return; // Python server started successfully
  }

  console.error('Failed to start llama.cpp server with any available method.');
  console.error('Please install llama-cpp-python or provide a pre-built server binary.');
  process.exit(1);
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Error starting llama.cpp server:', error);
  process.exit(1);
});

main(); 