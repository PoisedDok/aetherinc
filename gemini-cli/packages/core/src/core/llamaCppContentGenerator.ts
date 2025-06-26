/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CountTokensResponse,
  GenerateContentResponse,
  GenerateContentParameters,
  CountTokensParameters,
  EmbedContentResponse,
  EmbedContentParameters,
  Part,
  Content,
} from '@google/genai';
import { ContentGenerator } from './contentGenerator.js';
import fetch from 'node-fetch';

// Default llama.cpp API endpoint
const DEFAULT_LLAMACPP_ENDPOINT = 'http://localhost:8080';

/**
 * Configuration for LlamaCppContentGenerator
 */
export interface LlamaCppConfig {
  endpoint?: string;
  model?: string;
}

/**
 * Implementation of ContentGenerator that connects to a llama.cpp server
 */
export class LlamaCppContentGenerator implements ContentGenerator {
  private endpoint: string;
  private model: string;
  private apiVersion: 'standard' | 'openai' | null = null;

  constructor(config?: LlamaCppConfig) {
    this.endpoint = config?.endpoint || DEFAULT_LLAMACPP_ENDPOINT;
    this.model = config?.model || 'default';
  }

  /**
   * Detect the API version supported by the server
   */
  private async detectApiVersion(): Promise<'standard' | 'openai'> {
    if (this.apiVersion) {
      return this.apiVersion;
    }

    try {
      // Try OpenAI-compatible endpoint first
      const openaiResponse = await fetch(`${this.endpoint}/v1/models`, {
        method: 'GET',
      });

      if (openaiResponse.ok) {
        this.apiVersion = 'openai';
        return 'openai';
      }
    } catch (error) {
      // Continue to try standard endpoint
    }

    // Default to standard llama.cpp API
    this.apiVersion = 'standard';
    return 'standard';
  }

  /**
   * Generate content using llama.cpp server
   * @param request The generate content request
   */
  async generateContent(
    request: GenerateContentParameters,
  ): Promise<GenerateContentResponse> {
    try {
      // Convert the request to a format compatible with llama.cpp server
      const prompt = this.extractPromptFromRequest(request);
      const apiVersion = await this.detectApiVersion();
      
      if (apiVersion === 'openai') {
        return this.generateContentOpenAI(prompt, request);
      } else {
        return this.generateContentStandard(prompt, request);
      }
    } catch (error) {
      console.error('Error generating content with llama.cpp:', error);
      throw error;
    }
  }

  /**
   * Generate content using standard llama.cpp API
   */
  private async generateContentStandard(
    prompt: string,
    request: GenerateContentParameters,
  ): Promise<GenerateContentResponse> {
    const response = await fetch(`${this.endpoint}/completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: this.model,
        temperature: request.config?.temperature || 0.7,
        max_tokens: request.config?.maxOutputTokens || 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as { content: string };

    // Convert llama.cpp response to GenerateContentResponse format
    const result: any = {
      candidates: [
        {
          content: {
            parts: [{ text: data.content }],
            role: 'model',
          },
          finishReason: 'STOP',
          index: 0,
        },
      ],
      promptFeedback: {
        blockReason: null,
      },
    };
    
    // Create a proper GenerateContentResponse-like object
    Object.defineProperty(result, 'text', {
      get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
    });
    
    return result as GenerateContentResponse;
  }

  /**
   * Generate content using OpenAI-compatible API
   */
  private async generateContentOpenAI(
    prompt: string,
    request: GenerateContentParameters,
  ): Promise<GenerateContentResponse> {
    // Format messages for OpenAI API
    const messages = this.formatMessagesForOpenAI(request);
    
    const response = await fetch(`${this.endpoint}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: request.config?.temperature || 0.7,
        max_tokens: request.config?.maxOutputTokens || 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as { 
      choices: Array<{ 
        message: { role: string; content: string };
        finish_reason: string;
        index: number;
      }> 
    };

    // Convert OpenAI response to GenerateContentResponse format
    const result: any = {
      candidates: data.choices.map(choice => ({
        content: {
          parts: [{ text: choice.message.content }],
          role: choice.message.role === 'assistant' ? 'model' : choice.message.role,
        },
        finishReason: choice.finish_reason === 'stop' ? 'STOP' : choice.finish_reason,
        index: choice.index,
      })),
      promptFeedback: {
        blockReason: null,
      },
    };
    
    // Create a proper GenerateContentResponse-like object
    Object.defineProperty(result, 'text', {
      get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
    });
    
    return result as GenerateContentResponse;
  }

  /**
   * Generate content stream using llama.cpp server
   * @param request The generate content request
   */
  async generateContentStream(
    request: GenerateContentParameters,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    try {
      // Extract prompt from request
      const prompt = this.extractPromptFromRequest(request);
      const apiVersion = await this.detectApiVersion();
      
      if (apiVersion === 'openai') {
        return this.generateContentStreamOpenAI(request);
      } else {
        return this.generateContentStreamStandard(prompt, request);
      }
    } catch (error) {
      console.error('Error generating content stream with llama.cpp:', error);
      throw error;
    }
  }

  /**
   * Generate content stream using standard llama.cpp API
   */
  private async generateContentStreamStandard(
    prompt: string,
    request: GenerateContentParameters,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // Make request to llama.cpp server with streaming enabled
    const response = await fetch(`${this.endpoint}/completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: this.model,
        temperature: request.config?.temperature || 0.7,
        max_tokens: request.config?.maxOutputTokens || 2048,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Create async generator to stream responses
    async function* streamGenerator(): AsyncGenerator<GenerateContentResponse> {
      try {
        let reader: any;
        let decoder: TextDecoder;
        
        // Check if we're in a browser environment with ReadableStream
        if (response.body && typeof (response.body as any).getReader === 'function') {
          // Browser environment
          reader = (response.body as any).getReader();
          decoder = new TextDecoder();
        } else {
          // Node.js environment - handle the response body directly
          if (!response.body) {
            throw new Error('Response body is null');
          }
          
          // Read the response as text
          const text = await response.text();
          
          // Check if it's a single JSON response (non-streaming) or SSE format
          if (text.startsWith('{')) {
            // Single JSON response
            try {
              const chunk = JSON.parse(text);
              const content = chunk.content || chunk.choices?.[0]?.message?.content || chunk.choices?.[0]?.text || '';
              
              const result: any = {
                candidates: [
                  {
                    content: {
                      parts: [{ text: content }],
                      role: 'model',
                    },
                    finishReason: 'STOP',
                    index: 0,
                  },
                ],
                promptFeedback: {
                  blockReason: null,
                },
              };
              
              Object.defineProperty(result, 'text', {
                get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
              });
              
              yield result as GenerateContentResponse;
              return;
            } catch (err) {
              console.warn('Error parsing single JSON response:', err);
            }
          }
          
          // Process SSE format (streaming response)
          const lines = text.split('\n');
          for (const line of lines) {
            if (line.trim() === '') continue;
            
            try {
              const jsonLine = line.startsWith('data: ') ? line.slice(6) : line;
              if (jsonLine === '[DONE]') continue;
              
              const chunk = JSON.parse(jsonLine);
              const content = chunk.content || chunk.choices?.[0]?.text || chunk.choices?.[0]?.delta?.content || '';
              
              if (content) {
                const result: any = {
                  candidates: [
                    {
                      content: {
                        parts: [{ text: content }],
                        role: 'model',
                      },
                      finishReason: null,
                      index: 0,
                    },
                  ],
                  promptFeedback: {
                    blockReason: null,
                  },
                };
                
                Object.defineProperty(result, 'text', {
                  get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
                });
                
                yield result as GenerateContentResponse;
              }
            } catch (err) {
              console.warn('Error parsing response line:', err, line);
            }
          }
          return;
        }
        
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          
          // Decode the response and add to buffer
          buffer += decoder.decode(value, { stream: true });
          
          // Process complete JSON objects that end with newline
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.trim() === '') continue;
            
            try {
              // Handle SSE format with "data: " prefix
              const jsonLine = line.startsWith('data: ') ? line.slice(6) : line;
              if (jsonLine === '[DONE]') continue;
              
              const chunk = JSON.parse(jsonLine);
              const content = chunk.content || chunk.choices?.[0]?.text || '';
              
              // Convert to Gemini-compatible format
              const result: any = {
                candidates: [
                  {
                    content: {
                      parts: [{ text: content }],
                      role: 'model',
                    },
                    finishReason: null,
                    index: 0,
                  },
                ],
                promptFeedback: {
                  blockReason: null,
                },
              };
              
              // Create a proper GenerateContentResponse-like object
              Object.defineProperty(result, 'text', {
                get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
              });
              
              yield result as GenerateContentResponse;
            } catch (err) {
              console.warn('Error parsing SSE:', err, line);
            }
          }
        }
      } catch (err) {
        console.error('Error in streaming response:', err);
        throw err;
      }
    }

    return streamGenerator();
  }

  /**
   * Generate content stream using OpenAI-compatible API
   */
  private async generateContentStreamOpenAI(
    request: GenerateContentParameters,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // Format messages for OpenAI API
    const messages = this.formatMessagesForOpenAI(request);
    
    const response = await fetch(`${this.endpoint}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: request.config?.temperature || 0.7,
        max_tokens: request.config?.maxOutputTokens || 2048,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    // Create async generator to stream responses
    async function* streamGenerator(): AsyncGenerator<GenerateContentResponse> {
      try {
        let reader: any;
        let decoder: TextDecoder;
        
        // Check if we're in a browser environment with ReadableStream
        if (response.body && typeof (response.body as any).getReader === 'function') {
          // Browser environment
          reader = (response.body as any).getReader();
          decoder = new TextDecoder();
        } else {
          // Node.js environment - handle the response body directly
          if (!response.body) {
            throw new Error('Response body is null');
          }
          
          // Read the response as text
          const text = await response.text();
          
          // Check if it's a single JSON response (non-streaming) or SSE format
          if (text.startsWith('{')) {
            // Single JSON response
            try {
              const chunk = JSON.parse(text);
              const content = chunk.choices?.[0]?.message?.content || chunk.choices?.[0]?.text || '';
              
              const result: any = {
                candidates: [
                  {
                    content: {
                      parts: [{ text: content }],
                      role: 'model',
                    },
                    finishReason: 'STOP',
                    index: 0,
                  },
                ],
                promptFeedback: {
                  blockReason: null,
                },
              };
              
              Object.defineProperty(result, 'text', {
                get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
              });
              
              yield result as GenerateContentResponse;
              return;
            } catch (err) {
              console.warn('Error parsing single JSON response:', err);
            }
          }
          
          // Process SSE format (streaming response)
          const lines = text.split('\n');
          let accumulatedContent = '';
          
          for (const line of lines) {
            if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;
            
            try {
              const jsonLine = line.startsWith('data: ') ? line.slice(6) : line;
              if (jsonLine === '[DONE]') continue;
              
              const chunk = JSON.parse(jsonLine);
              const content = chunk.choices?.[0]?.delta?.content || chunk.choices?.[0]?.text || '';
              accumulatedContent += content;
              
              if (content) {
                const result: any = {
                  candidates: [
                    {
                      content: {
                        parts: [{ text: content }],
                        role: 'model',
                      },
                      finishReason: null,
                      index: 0,
                    },
                  ],
                  promptFeedback: {
                    blockReason: null,
                  },
                };
                
                Object.defineProperty(result, 'text', {
                  get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
                });
                
                yield result as GenerateContentResponse;
              }
            } catch (err) {
              if (line.trim() !== '') {
                console.warn('Error parsing SSE:', err, line);
              }
            }
          }
          return;
        }
        
        let buffer = '';
        let accumulatedContent = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          
          // Decode the response and add to buffer
          buffer += decoder.decode(value, { stream: true });
          
          // Process complete lines
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          
          for (const line of lines) {
            if (line.trim() === '' || line.trim() === 'data: [DONE]') continue;
            
            try {
              // Handle SSE format with "data: " prefix
              const jsonLine = line.startsWith('data: ') ? line.slice(6) : line;
              if (jsonLine === '[DONE]') continue;
              
              const chunk = JSON.parse(jsonLine);
              
              // Extract content from OpenAI format
              const content = chunk.choices?.[0]?.delta?.content || '';
              accumulatedContent += content;
              
              // Convert to Gemini-compatible format
              const result: any = {
                candidates: [
                  {
                    content: {
                      parts: [{ text: content }],
                      role: 'model',
                    },
                    finishReason: null,
                    index: 0,
                  },
                ],
                promptFeedback: {
                  blockReason: null,
                },
              };
              
              // Create a proper GenerateContentResponse-like object
              Object.defineProperty(result, 'text', {
                get: function() { return this.candidates?.[0]?.content?.parts?.[0]?.text || ''; }
              });
              
              yield result as GenerateContentResponse;
            } catch (err) {
              // Ignore parsing errors for non-JSON lines
              if (line.trim() !== '') {
                console.warn('Error parsing SSE:', err, line);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error in streaming response:', err);
        throw err;
      }
    }

    return streamGenerator();
  }

  /**
   * Count tokens in the given content
   * @param request The count tokens request
   */
  async countTokens(request: CountTokensParameters): Promise<CountTokensResponse> {
    try {
      const prompt = this.extractPromptFromRequest(request);
      const apiVersion = await this.detectApiVersion();
      
      if (apiVersion === 'openai') {
        // OpenAI-compatible endpoint doesn't have a tokenize endpoint
        // Fall back to character-based estimation
        return {
          totalTokens: Math.ceil(prompt.length / 4),
        } as CountTokensResponse;
      }
      
      const response = await fetch(`${this.endpoint}/tokenize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as { tokens: number };
      
      // Create response compatible with Gemini API format
      return {
        totalTokens: data.tokens,
      } as CountTokensResponse;
    } catch (error) {
      console.error('Error counting tokens with llama.cpp:', error);
      // Fallback - estimate tokens as characters / 4
      const prompt = this.extractPromptFromRequest(request);
      return {
        totalTokens: Math.ceil(prompt.length / 4),
      } as CountTokensResponse;
    }
  }

  /**
   * Embed content using llama.cpp server
   * @param request The embed content request
   */
  async embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse> {
    try {
      // Use 'contents' instead of 'content' for EmbedContentParameters
      let text = '';
      if (Array.isArray(request.contents)) {
        const firstContent = request.contents[0];
        if (firstContent && typeof firstContent === 'object' && 'parts' in firstContent) {
          text = firstContent.parts?.[0]?.text || '';
        }
      } else if (typeof request.contents === 'string') {
        text = request.contents;
      }
      
      const apiVersion = await this.detectApiVersion();
      let endpoint = `${this.endpoint}/embedding`;
      let requestBody: Record<string, any> = { content: text };
      
      if (apiVersion === 'openai') {
        endpoint = `${this.endpoint}/v1/embeddings`;
        requestBody = { 
          model: this.model,
          input: text 
        };
      }
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let embedding: number[] = [];
      
      if (apiVersion === 'openai') {
        const data = await response.json() as { data: Array<{ embedding: number[] }> };
        embedding = data.data[0]?.embedding || [];
      } else {
        const data = await response.json() as { embedding: number[] };
        embedding = data.embedding;
      }
      
      // Create response compatible with Gemini API format
      return {
        embedding: {
          values: embedding,
        },
      } as EmbedContentResponse;
    } catch (error) {
      console.error('Error embedding content with llama.cpp:', error);
      throw error;
    }
  }

  /**
   * Format messages for OpenAI API
   */
  private formatMessagesForOpenAI(request: GenerateContentParameters): Array<{role: string; content: string}> {
    if (!request.contents) {
      return [{ role: 'user', content: '' }];
    }
    
    return (request.contents as Content[]).map((content) => {
      const role = content.role === 'model' ? 'assistant' : content.role || 'user';
      const text = this.extractTextFromContent(content);
      return { role, content: text };
    });
  }

  /**
   * Extract text from content
   */
  private extractTextFromContent(content: Content): string {
    if (!content.parts) {
      return '';
    }
    
    return content.parts
      .map((part: Part) => {
        if (typeof part === 'string') {
          return part;
        } else if (part && typeof part === 'object' && 'text' in part) {
          return part.text;
        } else {
          return JSON.stringify(part);
        }
      })
      .join('\n');
  }

  /**
   * Extract a prompt string from various request formats
   */
  private extractPromptFromRequest(request: GenerateContentParameters | CountTokensParameters): string {
    if ('contents' in request && request.contents) {
      // Handle different contents types properly
      if (typeof request.contents === 'string') {
        return request.contents;
      } else if (Array.isArray(request.contents)) {
        return (request.contents as Content[])
          .map((content: Content) => {
            // Handle role + parts format
            if (content && typeof content === 'object' && 'parts' in content && content.parts) {
              return content.parts
                .map((part: Part) => {
                  // Extract text from different part types
                  if (typeof part === 'string') {
                    return part;
                  } else if (part && typeof part === 'object' && 'text' in part) {
                    return part.text;
                  } else {
                    return JSON.stringify(part);
                  }
                })
                .join('\n');
            }
            return '';
          })
          .join('\n');
      } else {
        // Handle Part[] format
        const parts = request.contents as Part[];
        return parts
          .map((part: Part) => {
            if (typeof part === 'string') {
              return part;
            } else if (part && typeof part === 'object' && 'text' in part) {
              return part.text;
            } else {
              return JSON.stringify(part);
            }
          })
          .join('\n');
      }
    }
    return '';
  }
}

/**
 * Create a LlamaCpp content generator
 * @param config Optional configuration for the generator
 * @returns A new LlamaCppContentGenerator instance
 */
export function createLlamaCppContentGenerator(config?: LlamaCppConfig): ContentGenerator {
  return new LlamaCppContentGenerator(config);
}
