#!/usr/bin/env node

/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { getLlamaCppService, AuthType, createContentGeneratorConfig, createContentGenerator } from '../packages/core/dist/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

// Setup proper paths for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Test batched processing with llama.cpp
 */
async function testBatchedProcessing(endpoint, apiType, prompt, n_parallel = 4) {
  console.log(`Testing batched processing with ${apiType} API`);
  console.log(`Prompt: "${prompt}"`);
  console.log(`Number of parallel sequences: ${n_parallel}`);
  
  try {
    // Use the appropriate API endpoint based on detected API type
    const requestBody = {
      prompt: prompt,
      max_tokens: 32,
      stream: false,
      n: n_parallel // Request multiple completions in parallel
    };
    
    const startTime = Date.now();
    
    let response;
    if (apiType === 'openai') {
      // Use OpenAI-compatible API
      response = await fetch(`${endpoint}/v1/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        timeout: 60000 // 60 second timeout for batched processing
      });
    } else {
      // Use standard llama.cpp API
      // For standard API, we need to adapt our request based on the example
      response = await fetch(`${endpoint}/completion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...requestBody,
          n_parallel: n_parallel // Add n_parallel parameter for standard API
        }),
        timeout: 60000
      });
    }
    
    if (!response.ok) {
      console.error('Error from batched API call:', await response.text());
      return null;
    }
    
    const responseData = await response.json();
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000;
    
    // Format and display results based on API type
    if (apiType === 'openai') {
      if (responseData.choices && responseData.choices.length > 0) {
        console.log('\nGenerated responses:');
        responseData.choices.forEach((choice, i) => {
          console.log(`\nSequence ${i}:\n${prompt}${choice.text}`);
        });
        
        console.log(`\nProcessed ${n_parallel} sequences in ${elapsedTime.toFixed(2)}s`);
        
        return responseData;
      }
    } else {
      if (responseData.content) {
        console.log(`\nGenerated response: ${responseData.content}`);
        return responseData;
      }
    }
    
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Error in batched processing:', error);
    return null;
  }
}

/**
 * Check if the server is responding to API requests
 */
async function testServerConnection(endpoint) {
  console.log(`Testing server connection to ${endpoint}...`);
  
  try {
    // First try health endpoint
    const healthResponse = await fetch(`${endpoint}/health`, {
      method: 'GET',
      timeout: 5000
    });
    
    if (healthResponse.ok) {
      console.log('Server is responding to health check requests');
    }
  } catch (error) {
    console.log('Health check test failed:', error.message);
  }
  
  try {
    // Try standard API endpoint
    const standardResponse = await fetch(`${endpoint}/completion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Hello',
        max_tokens: 10,
        stream: false
      }),
      timeout: 10000
    });
    
    if (standardResponse.ok) {
      console.log('Server is responding to standard API requests');
      return 'standard';
    }
  } catch (error) {
    console.log('Standard API test failed:', error.message);
  }
  
  // Try OpenAI-compatible completions endpoint
  try {
    const completionsResponse = await fetch(`${endpoint}/v1/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Hello',
        max_tokens: 10,
        stream: false
      }),
      timeout: 10000
    });
    
    if (completionsResponse.ok) {
      console.log('Server is responding to OpenAI completions API requests');
      return 'openai';
    }
  } catch (error) {
    console.log('OpenAI completions API test failed:', error.message);
  }
  
  console.log('Server is not responding to API requests');
  return null;
}

/**
 * Main function for testing batched processing
 */
async function main() {
  try {
    console.log('Testing batched llama.cpp integration...');

    // Get the service
    const llamaCppService = getLlamaCppService();
    console.log('Got LlamaCppService instance');

    // Enable debug logging
    process.env.DEBUG = '1';

    // Check if server is running on specified port
    const port = process.env.LLAMA_CPP_PORT || '8080';
    const healthPort = parseInt(port) + 1; // Use health check proxy port
    console.log(`Checking for server on port ${port} (health check on ${healthPort})...`);
    
    const isRunning = await llamaCppService.isServerRunning();
    if (!isRunning) {
      console.log('Server not running, starting...');
      await llamaCppService.startServer();
    } else {
      console.log('Server is already running');
    }

    // Get the endpoint URL
    const endpointUrl = `http://localhost:${healthPort}`;
    console.log(`Using endpoint: ${endpointUrl}`);
    
    // Test server connection
    const apiType = await testServerConnection(endpointUrl);
    if (!apiType) {
      console.error('Failed to connect to server. Please check if the server is running properly.');
      process.exit(1);
    }

    // Test batched processing with different prompts and parallel settings
    const prompts = [
      "Hello my name is",
      "The best recipe for chocolate cake is",
      "In the future, artificial intelligence will"
    ];
    
    // Test with different parallel settings (1, 2, 4)
    const parallelSettings = [1, 2, 4];
    
    for (const prompt of prompts) {
      for (const n_parallel of parallelSettings) {
        console.log('\n' + '-'.repeat(60));
        await testBatchedProcessing(endpointUrl, apiType, prompt, n_parallel);
      }
    }
    
    console.log('\nBatched processing tests completed successfully!');
    
  } catch (error) {
    console.error('Error testing batched llama.cpp integration:', error);
    process.exit(1);
  }
}

main(); 