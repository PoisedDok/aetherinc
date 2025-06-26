/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType, getLlamaCppService } from '@google/gemini-cli-core';
import { loadEnvironment } from './config.js';

export const validateAuthMethod = async (authMethod: string): Promise<string | null> => {
  loadEnvironment();
  if (authMethod === AuthType.LOGIN_WITH_GOOGLE_PERSONAL) {
    return null;
  }

  if (authMethod === AuthType.LOGIN_WITH_GOOGLE_ENTERPRISE) {
    if (!process.env.GOOGLE_CLOUD_PROJECT) {
      return 'GOOGLE_CLOUD_PROJECT environment variable not found. Add that to your .env and try again, no reload needed!';
    }
    return null;
  }

  if (authMethod === AuthType.USE_GEMINI) {
    if (!process.env.GEMINI_API_KEY) {
      return 'GEMINI_API_KEY environment variable not found. Add that to your .env and try again, no reload needed!';
    }
    return null;
  }

  if (authMethod === AuthType.USE_VERTEX_AI) {
    const hasVertexProjectLocationConfig =
      !!process.env.GOOGLE_CLOUD_PROJECT && !!process.env.GOOGLE_CLOUD_LOCATION;
    const hasGoogleApiKey = !!process.env.GOOGLE_API_KEY;
    if (!hasVertexProjectLocationConfig && !hasGoogleApiKey) {
      return (
        'Must specify GOOGLE_GENAI_USE_VERTEXAI=true and either:\n' +
        '• GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION environment variables.\n' +
        '• GOOGLE_API_KEY environment variable (if using express mode).\n' +
        'Update your .env and try again, no reload needed!'
      );
    }
    return null;
  }

  if (authMethod === AuthType.USE_LLAMACPP) {
    // Check if llama.cpp server is running, if not, start it
    try {
      const llamaCppService = getLlamaCppService();
      llamaCppService.registerCleanupHandlers();
      
      const isRunning = await llamaCppService.isServerRunning();
      if (!isRunning) {
        console.log('llama.cpp server not detected, starting it automatically...');
        await llamaCppService.startServer();
      } else {
        console.log('Using existing llama.cpp server');
      }
      
      const endpoint = llamaCppService.getEndpointUrl();
      console.log(`Connected to llama.cpp server at ${endpoint}`);
      return null;
    } catch (error) {
      return `Failed to start llama.cpp server: ${error}. Please start it manually with 'npm run start:llama'`;
    }
  }

  return 'Invalid auth method selected.';
};
