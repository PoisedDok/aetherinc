#!/usr/bin/env node

/**
 * Script for starting the Next.js application in production mode
 * This handles the standalone output format correctly
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Check if we're in standalone mode
const standaloneDir = join(rootDir, '.next', 'standalone');
const serverPath = join(standaloneDir, 'server.js');

const isStandalone = fs.existsSync(standaloneDir) && fs.existsSync(serverPath);

console.log('Starting Next.js in production mode...');

let childProcess;

if (isStandalone) {
  console.log('Using standalone server mode');
  
  // Copy the public directory to the standalone directory if needed
  const publicDir = join(rootDir, 'public');
  const standalonePublicDir = join(standaloneDir, 'public');
  
  if (fs.existsSync(publicDir) && !fs.existsSync(standalonePublicDir)) {
    console.log('Copying public directory to standalone...');
    fs.cpSync(publicDir, standalonePublicDir, { recursive: true });
  }

  // Start the standalone server
  childProcess = spawn('node', [serverPath], { 
    cwd: standaloneDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: process.env.PORT || 3000
    }
  });
} else {
  console.log('Using next start command');
  // Fall back to regular next start
  childProcess = spawn('next', ['start'], { 
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  childProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Termination signal received, shutting down...');
  childProcess.kill('SIGTERM');
  process.exit(0);
});

// Forward child process exit
childProcess.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
}); 