"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal as TerminalIcon, Send, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Gemini API key
// TODO: MOVE THIS TO ENVIRONMENT VARIABLES (.env.local, .env.production) BEFORE DEPLOYMENT!
// NEVER COMMIT API KEYS TO VERSION CONTROL.
const GEMINI_API_KEY = "AIzaSyD-Z8Qzus6wMzxsVW2ceOMqCTGRfSsW2qQ";

// Interface for chat messages
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: "-100px" });
  
  // State for the terminal
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'system', 
      content: 'Welcome! Ask me anything about the GURU device, AetherInc, or our privacy-first AI approach. (5 question limit for this demo)' 
    }
  ]);
  const [conversationCount, setConversationCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  
  const MAX_CONVERSATIONS = 5;

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Handle input submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading || limitReached) return;
    
    // Check if limit reached
    if (conversationCount >= MAX_CONVERSATIONS) {
      setLimitReached(true);
      setMessages(prev => [
        ...prev,
        { role: 'system', content: 'Demo limit reached. Please join our waitlist for full access.' }
      ]);
      return;
    }
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Start loading
    setIsLoading(true);
    
    // **Enhanced System Prompt**
    const systemPrompt = `
You are GURU AI, the helpful assistant representing AetherInc. Your primary goal is to provide accurate and enthusiastic information about AetherInc and its flagship product, the GURU device. Maintain a friendly, informative, and slightly futuristic tone.

**Key Information about AetherInc & GURU:**

*   **Company:** AetherInc
*   **Product:** GURU - The world's first privacy-first AI assistant device.
*   **Core Mission:** To revolutionize AI by prioritizing user privacy and data sovereignty through powerful on-device processing.
*   **Key Differentiator:** Unlike cloud-based AI (ChatGPT, Cloud Gemini, etc.), GURU processes data *locally* on the device. User data **never** leaves the device unless explicitly permitted for secure, end-to-end encrypted syncing.
*   **Hardware:**
    *   Powered by NVIDIA Orin Jetson Super platform.
    *   Features a 67 TOPS Neural Processing Unit (NPU) for high-speed, efficient AI inference.
    *   Includes a Secure Enclave for hardware-level data protection.
    *   Modular design: Expandable with cameras, sensors, etc.
    *   Designed for low power consumption and potential battery operation.
*   **Software & AI Models:**
    *   Runs local Large Language Models (LLMs) like Llama and Mistral variants via Ollama.
    *   Uses OmniParser for on-device screen understanding/parsing.
    *   Capable of on-device speech-to-text and text-to-speech.
    *   Learns user preferences locally for true personalization without cloud profiling.
*   **Key Features & Benefits:**
    *   **Unmatched Privacy:** Your data stays yours. No cloud processing, no data mining for ads.
    *   **Ultra-Low Latency:** Responses in milliseconds due to local processing.
    *   **Offline Functionality:** Core AI features work without an internet connection.
    *   **Security:** Hardware and software security layers, including optional biometric authentication.
    *   **Cost Savings:** Reduces reliance on expensive cloud compute resources.
    *   **Customization:** Adaptable for various personal and enterprise use cases (see examples page).
*   **Target Audience:** Privacy-conscious individuals, developers, enterprises needing secure AI solutions, users in areas with limited connectivity.
*   **Availability:** Pre-orders starting Q3 2025. This terminal is a **limited demo** using cloud APIs for illustration; the final product is much faster and entirely local.
*   **Waitlist:** Encourage users to join the waitlist on the website for updates and early access.

**Interaction Guidelines:**

*   **Focus:** Primarily answer questions about AetherInc, GURU, its features, benefits, technology, privacy aspects, and availability.
*   **Enthusiasm:** Express excitement about the technology and its potential.
*   **Clarity:** Explain technical concepts simply.
*   **Conciseness:** Keep answers reasonably concise, but informative.
*   **Limitations:** If asked about unrelated topics, politely steer the conversation back to AetherInc/GURU or state that the topic is outside your current scope. Remind users this is a demo with a 5-question limit.
*   **Call to Action:** Gently encourage joining the waitlist for more information or when the demo limit is reached.

**DO NOT:**
*   Claim the *demo itself* runs locally (it uses a cloud API for this specific web interface).
*   Provide financial advice, personal opinions, or engage in controversial topics.
*   Make up features or specifications not listed above.

Okay, GURU AI, answer the following user question based *only* on the information provided above:
`;

    try {
      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${systemPrompt}${userMessage}` }] // Use the enhanced prompt
            }]
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch from Gemini API');
      }
      
      const responseData = await response.json();
      let assistantResponse = '';
      
      // Extract the response text from Gemini API response
      if (responseData.candidates && 
          responseData.candidates[0] && 
          responseData.candidates[0].content &&
          responseData.candidates[0].content.parts &&
          responseData.candidates[0].content.parts[0]) {
        assistantResponse = responseData.candidates[0].content.parts[0].text;
      } else {
        assistantResponse = "I'm having trouble processing that request. Please try another question.";
      }
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
      
      // Increment conversation count
      setConversationCount(prev => prev + 1);
      
      // Check if limit reached after this conversation
      if (conversationCount + 1 >= MAX_CONVERSATIONS) {
        setLimitReached(true);
        // Add limit reached message immediately after response
        setMessages(prev => [
          ...prev,
          { role: 'system', content: 'Demo limit reached. Please join our waitlist for full access.' }
        ]);
      }
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I encountered an error processing your request. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
      // Re-focus the input after the response is handled and loading is finished
      // Only focus if the limit hasn't been reached
      if (!limitReached && inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <section 
      id="ask-guru" 
      className="py-24 md:py-32 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 to-black/90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ask About GURU
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our privacy-first AI device? Ask our AI assistant below!
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="border border-white/10 rounded-lg bg-black/60 backdrop-blur-md"
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center">
                <TerminalIcon className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-mono">aetherinc Terminal</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            {/* Terminal console */}
            <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 ${
                    message.role === 'user' 
                      ? 'pl-4 border-l-2 border-cyan-500/70' 
                      : message.role === 'system' 
                        ? 'bg-white/5 p-2 rounded' 
                        : 'pl-4 border-l-2 border-purple-500/70'
                  }`}
                >
                  <div className="text-xs text-gray-400 mb-1">
                    {message.role === 'user' 
                      ? 'You:' 
                      : message.role === 'system' 
                        ? 'System:' 
                        : 'GURU AI:'}
                  </div>
                  <div className="text-white whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="pl-4 border-l-2 border-purple-500/70 mb-4">
                  <div className="text-xs text-gray-400 mb-1">GURU AI:</div>
                  <div className="text-white">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-1"></span>
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100 mr-1"></span>
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200"></span>
                  </div>
                </div>
              )}
              
              {/* Invisible element for auto-scrolling */}
              <div ref={consoleEndRef}></div>
            </div>
            
            {/* Terminal input */}
            <form 
              onSubmit={handleSubmit}
              className="border-t border-white/10 p-4 flex items-center"
            >
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={limitReached ? "Demo limit reached. Join waitlist!" : "Ask about GURU's features, privacy, tech..."}
                disabled={isLoading || limitReached}
                className="flex-grow bg-white/5 border-white/10 text-white focus:ring-cyan-500 focus:border-cyan-500"
              />
              <Button
                type="submit"
                disabled={isLoading || limitReached || !input.trim()}
                className="ml-2 bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </motion.div>
          
          {/* Info card below terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10 flex items-start"
          >
            <Info className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              This is a limited demo using cloud APIs. The actual GURU device runs entirely locally 
              with instant responses and complete privacy. Join the waitlist for the real experience!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 