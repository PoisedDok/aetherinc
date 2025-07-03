#!/usr/bin/env node

/**
 * Script to verify build process with linting enabled
 * This helps catch and fix linting issues before deployment
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🔍 Verifying build with linting...');

// Step 1: Run ESLint to check for warnings and errors
console.log('\n📋 Running ESLint...');
const lintProcess = spawn('npx', ['next', 'lint'], { 
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env
});

lintProcess.on('exit', (lintCode) => {
  if (lintCode !== 0) {
    console.error('\n❌ ESLint found issues. You can fix them with "npm run lint:fix"');
    process.exit(1);
  } else {
    console.log('\n✅ ESLint check passed');
    
    // Step 2: Run build to ensure everything compiles correctly
    console.log('\n🏗️ Running build...');
    const buildProcess = spawn('next', ['build'], { 
      cwd: rootDir,
      stdio: 'inherit',
      env: process.env
    });

    buildProcess.on('exit', (buildCode) => {
      if (buildCode !== 0) {
        console.error('\n❌ Build failed');
        process.exit(1);
      } else {
        console.log('\n✅ Build successful with linting enabled!');
        process.exit(0);
      }
    });
  }
}); 