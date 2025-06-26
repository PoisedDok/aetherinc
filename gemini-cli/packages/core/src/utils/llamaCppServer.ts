/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const LLAMA_SERVER_PORT = process.env.LLAMA_CPP_PORT || 8080;

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..', '..');

let serverProcess: ChildProcess | null = null;
let isServerStarting = false;

/**
 * Checks if the llama.cpp server is already running
 */
export async function isLlamaCppServerRunning(): Promise<boolean> {
  try {
    // Try the health check endpoint first (uses health proxy)
    const healthPort = parseInt(LLAMA_SERVER_PORT.toString()) + 1;
    const healthResponse = await fetch(`http://localhost:${healthPort}/health`);
    
    if (healthResponse.ok) {
      return true;
    }
    
    // Fallback to main server port
    const endpoint = process.env.LLAMA_CPP_ENDPOINT || `http://localhost:${LLAMA_SERVER_PORT}`;
    const response = await fetch(`${endpoint}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Finds the server script path
 */
function findServerScript(): string {
  const possiblePaths = [
    path.join(PROJECT_ROOT, 'scripts', 'run_llama_server.cjs'),
    path.join(PROJECT_ROOT, 'gemini-cli', 'scripts', 'run_llama_server.cjs'),
  ];

  for (const scriptPath of possiblePaths) {
    if (fs.existsSync(scriptPath)) {
      return scriptPath;
    }
  }

  throw new Error('Could not find run_llama_server.cjs script');
}

/**
 * Starts the llama.cpp server using the original pre-built binaries
 */
export async function startLlamaCppServer(): Promise<void> {
  if (await isLlamaCppServerRunning()) {
    console.log('llama.cpp server is already running');
    return;
  }

  if (isServerStarting) {
    console.log('llama.cpp server is already starting...');
    return;
  }

  isServerStarting = true;

  try {
    // Find the server script path
    const scriptPath = findServerScript();

    console.log('Starting llama.cpp server using original pre-built binaries...');
    console.log(`Script: ${scriptPath}`);

    // Start the server process
    serverProcess = spawn('node', [scriptPath], {
      stdio: 'inherit',
      env: {
        ...process.env,
        LLAMA_CPP_PORT: LLAMA_SERVER_PORT.toString(),
      },
    });

    serverProcess.stdout?.on('data', (data) => {
      console.log(`llama.cpp server: ${data}`);
    });

    serverProcess.stderr?.on('data', (data) => {
      console.error(`llama.cpp server error: ${data}`);
    });

    serverProcess.on('close', (code) => {
      console.log(`llama.cpp server process exited with code ${code}`);
      serverProcess = null;
      isServerStarting = false;
    });

    // Wait for the server to be ready
    const maxAttempts = 30; // 30 seconds max
    let attempts = 0;

    while (attempts < maxAttempts) {
      if (await isLlamaCppServerRunning()) {
        console.log('llama.cpp server is ready!');
        isServerStarting = false;
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
      console.log(`Waiting for llama.cpp server to start (${attempts}/${maxAttempts})...`);
    }

    throw new Error('llama.cpp server failed to start within 30 seconds');
  } catch (error) {
    isServerStarting = false;
    console.error('Error starting llama.cpp server:', error);
    throw error;
  }
}

/**
 * Stops the llama.cpp server if it's running
 */
export function stopLlamaCppServer(): void {
  if (serverProcess) {
    console.log('Stopping llama.cpp server...');
    serverProcess.kill('SIGTERM');
    serverProcess = null;
  }
}

/**
 * Register cleanup handlers to stop the server on exit
 */
process.on('exit', () => {
  stopLlamaCppServer();
});

process.on('SIGINT', () => {
  stopLlamaCppServer();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stopLlamaCppServer();
  process.exit(0);
}); 