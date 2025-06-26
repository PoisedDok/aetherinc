
#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

console.log('Redirecting to actual llama.cpp server script...');
const actualScriptPath = path.join(__dirname, '..', 'gemini-cli', 'scripts', 'run_llama_server.cjs');

// Pass all environment variables and arguments
spawn('node', [actualScriptPath, ...process.argv.slice(2)], { 
  stdio: 'inherit',
  env: process.env
});
