#!/usr/bin/env node

/**
 * Wrapper script to run the llama.cpp server from gemini-cli
 */

const { spawn } = require('child_process');
const path = require('path');

// Path to the actual llama server script
const llamaServerScript = path.join(__dirname, '..', 'gemini-cli', 'scripts', 'run_llama_server.cjs');

console.log('Starting llama.cpp server...');
console.log(`Using script: ${llamaServerScript}`);

// Pass through environment variables including LLAMA_CPP_PORT if set
const env = process.env;

// Spawn the actual script with the same arguments
const serverProcess = spawn('node', [llamaServerScript, ...process.argv.slice(2)], {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..', 'gemini-cli'),
  env
});

serverProcess.on('error', (err) => {
  console.error('Failed to start llama.cpp server:', err);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Stopping llama.cpp server...');
  serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Stopping llama.cpp server...');
  serverProcess.kill('SIGTERM');
}); 