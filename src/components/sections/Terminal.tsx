"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal as TerminalIcon, Send, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypingAnimation } from "@/components/magicui/typing-animation";

// Gemini API key is now securely handled in the backend proxy

// Interface for chat messages
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface TerminalProps {
  /** When true, renders a compact layout suitable for the floating popup */
  minimal?: boolean;
}

export default function AetherArena({ minimal = false }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: "-100px" });
  
  // State for the terminal
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  
  const MAX_CONVERSATIONS = 5;

  // Terminal boot sequence
  const [bootComplete, setBootComplete] = useState(!minimal);
  const bootPhrases = [
    '# Initializing AetherArena v0.1.1',
    '# Loading core modules ████████░░',
    '# Establishing secure enclave',
    '# System ready',
    '# You have 5 questions. Ask about AetherInc.',
  ];

  const [messages, setMessages] = useState<Message[]>(
    minimal
      ? []
      : [
          {
            role: 'system',
            content: 'You have 5 questions. Ask about AetherInc.',
          },
        ]
  );

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Handle boot sequence completion
  const handleBootComplete = () => {
    setBootComplete(true);
  };

  // Handle input submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading || limitReached || !bootComplete) return;
    
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
    
    // **Enhanced System Prompt for AetherArena**
    const systemPrompt = `
You are **AetherArena**, AetherInc's agentic core — a self-improving, time- and context-aware architecture similar to JARVIS from Iron Man. 

Your purpose:
1. Provide authoritative, up-to-date information about AetherInc: mission, values, founders (Krish Dokania & Adrian Wong), products (GURU device, AI consulting services, Workflow Automation, Local AI implementations), roadmaps, and achievements.
2. Explain AetherInc technologies (privacy-first local AI, NVIDIA Jetson-powered hardware, Secure Enclave, workflow orchestration, etc.) clearly and enthusiastically.
3. Maintain a futuristic yet friendly tone — concise, helpful, inspirational.
4. Always respect privacy: emphasise that final products process data locally; this demo uses cloud APIs.
5. Encourage joining the waitlist or contacting AetherInc for services.

Limitations:
• This is a public demo with a 5-question limit.
• Politely redirect off-topic or disallowed content.

Proceed to answer the user's question below with the above context in mind.
`;

    const fullPrompt = `${systemPrompt}\nUser: ${userMessage}`;
    try {
      // Call backend Gemini proxy API
      const response = await fetch('/api/gemini-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch from Gemini proxy API');
      }
      const responseData = await response.json();
      let assistantResponse = '';
      if (responseData.text) {
        assistantResponse = responseData.text as string;
      } else if (responseData.candidates && responseData.candidates[0]?.content?.parts?.[0]) {
        assistantResponse = responseData.candidates[0].content.parts[0].text;
      } else if (responseData.error) {
        assistantResponse = `Error: ${responseData.error}`;
      } else {
        assistantResponse = "I'm having trouble processing that request. Please try another question.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
      setConversationCount(prev => prev + 1);
      if (conversationCount + 1 >= MAX_CONVERSATIONS) {
        setLimitReached(true);
        setMessages(prev => [
          ...prev,
          { role: 'system', content: 'Demo limit reached. Please join our waitlist for full access.' }
        ]);
      }
    } catch (error) {
      console.error('Error calling Gemini proxy API:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I encountered an error processing your request. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
      if (!limitReached && inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  if (minimal) {
    return (
      <div className="flex flex-col h-full bg-black">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black">
          <div className="flex items-center">
            <span className="text-white text-base font-medium">❯_ AetherArena</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>

        {/* Console */}
        <div
          className="flex-1 overflow-y-auto p-3 flex flex-col space-y-2 text-base font-normal"
          role="log"
          aria-live="polite"
          aria-atomic="false"
          aria-busy={isLoading}
        >
          {!bootComplete && (
            <div className="text-gray-400">
              <TypingAnimation 
                phrases={bootPhrases} 
                duration={30}
                delay={300}
                onComplete={handleBootComplete}
                className="text-base whitespace-pre-line"
              />
            </div>
          )}
          
          {messages.map((message, index) => {
            const prefix =
              message.role === 'user'
                ? <span className="text-green-400 font-medium">❯ </span>
                : message.role === 'assistant'
                  ? <span className="text-blue-400 font-medium">● </span>
                  : <span className="text-gray-500"># </span>;

            return (
              <div key={index} className="whitespace-pre-wrap mb-3 leading-relaxed tracking-normal">
                {prefix}
                <span className="text-white">{message.content}</span>
              </div>
            );
          })}

          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              className="text-blue-400 flex items-center"
            >
              <span className="mr-2 font-medium">●</span>
              <span className="text-gray-400">Cooking... <span className="animate-pulse">▋</span></span>
            </div>
          )}

          <div ref={consoleEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-white/10 p-2 flex items-center"
        >
          <span className="text-green-400 mr-2 font-medium">❯</span>
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              limitReached
                ? 'Demo limit reached. Join waitlist!'
                : "Ask about GURU's features, privacy, tech..."
            }
            disabled={isLoading || limitReached || !bootComplete}
            aria-disabled={isLoading || limitReached || !bootComplete}
            className="flex-grow bg-transparent border-none text-white text-base focus:ring-0 focus:outline-none placeholder:text-gray-600 font-normal"
          />
          <Button
            type="submit"
            disabled={isLoading || limitReached || !input.trim() || !bootComplete}
            aria-disabled={
              isLoading || limitReached || !input.trim() || !bootComplete
            }
            className="ml-2 bg-transparent hover:bg-blue-800/20 text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed rounded px-3 py-1.5"
          >
            <span className="text-xl">→</span>
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    );
  }

  // ---------- Original full-page layout ---------- //
  return (
    <section id="ask-guru" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/30 to-black/90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ask AetherArena
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
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black">
              <div className="flex items-center">
                <span className="text-white text-base font-medium">❯_ AetherArena</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            {/* Terminal console */}
            <div
              className="p-4 h-96 overflow-y-auto text-base bg-black font-normal"
              role="log"
              aria-live="polite"
              aria-atomic="false"
              aria-busy={isLoading}
            >
              {messages.map((message, index) => {
                const prefix =
                  message.role === 'user'
                    ? <span className="text-green-400 font-medium">❯ </span>
                    : message.role === 'assistant'
                      ? <span className="text-blue-400 font-medium">● </span>
                      : <span className="text-gray-500"># </span>;

                return (
                  <div key={index} className="whitespace-pre-wrap mb-3 leading-relaxed tracking-normal">
                    {prefix}
                    <span className="text-white">{message.content}</span>
                  </div>
                );
              })}
              
              {isLoading && (
                <div
                  className="text-blue-400 flex items-center"
                  role="status"
                  aria-live="polite"
                >
                  <span className="mr-2 font-medium">●</span>
                  <span className="text-gray-400">Cooking... <span className="animate-pulse">▋</span></span>
                </div>
              )}
              
              {/* Invisible element for auto-scrolling */}
              <div ref={consoleEndRef}></div>
            </div>
            
            {/* Terminal input */}
            <form 
              onSubmit={handleSubmit}
              className="border-t border-white/10 p-2 flex items-center bg-black"
            >
              <span className="text-green-400 mr-2 font-medium">❯</span>
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={limitReached ? "Demo limit reached. Join waitlist!" : "Ask about GURU's features, privacy, tech..."}
                disabled={isLoading || limitReached}
                aria-disabled={isLoading || limitReached}
                className="flex-grow bg-transparent border-none text-white text-base focus:ring-0 focus:outline-none placeholder:text-gray-600 font-normal"
              />
              <Button
                type="submit"
                disabled={isLoading || limitReached || !input.trim()}
                aria-disabled={isLoading || limitReached || !input.trim()}
                className="ml-2 bg-transparent hover:bg-blue-800/20 text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed rounded px-3 py-1.5"
              >
                <span className="text-xl">→</span>
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