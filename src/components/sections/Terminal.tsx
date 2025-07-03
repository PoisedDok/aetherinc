"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal as TerminalIcon, Send, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { v4 as uuidv4 } from 'uuid';

// Interface for chat messages
interface Message {
  id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

// Interface for terminal props
interface TerminalProps {
  /** When true, renders a compact layout suitable for the floating popup */
  minimal?: boolean;
}

// Session storage key
const SESSION_STORAGE_KEY = 'aether_terminal_session';
const SESSION_MESSAGES_KEY = 'aether_terminal_messages';
const VISITOR_ID_KEY = 'aether_visitor_id';

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
  const [sessionId, setSessionId] = useState<string>('');
  const [visitorId, setVisitorId] = useState<string>('');
  
  const MAX_CONVERSATIONS = 5;

  // Terminal boot sequence
  const [bootComplete, setBootComplete] = useState(false);
  const bootPhrases = [
    '> AetherArena initializing...',
    '> Loading core components...',
    '> Establishing secure connection...',
    '> Welcome to AetherArena v0.1.1',
    '> You have 5 questions. Ask about AetherInc.'
  ];

  // Initialize messages state with default system message
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize session and visitor IDs
  useEffect(() => {
    // Generate or retrieve visitor ID
    let storedVisitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (!storedVisitorId) {
      storedVisitorId = uuidv4();
      localStorage.setItem(VISITOR_ID_KEY, storedVisitorId);
    }
    setVisitorId(storedVisitorId);
    
    // Generate or retrieve session ID
    let storedSessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      sessionStorage.setItem(SESSION_STORAGE_KEY, storedSessionId);
    }
    setSessionId(storedSessionId);
    
    // Retrieve stored messages
    const storedMessages = localStorage.getItem(SESSION_MESSAGES_KEY);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
        // Update conversation count based on stored messages
        const userMessageCount = parsedMessages.filter((msg: Message) => msg.role === 'user').length;
        setConversationCount(userMessageCount);
        setLimitReached(userMessageCount >= MAX_CONVERSATIONS);
        setBootComplete(true);
      } catch (error) {
        console.error('Error parsing stored messages:', error);
        initializeNewChat();
      }
    } else {
      initializeNewChat();
    }
  }, []);

  // Initialize a new chat session
  const initializeNewChat = () => {
    const initialMessages: Message[] = minimal
      ? []
      : [
          {
            id: uuidv4(),
            role: 'system',
            content: 'You have 5 questions. Ask about AetherInc.',
            timestamp: new Date(),
          },
        ];
    setMessages(initialMessages);
    setConversationCount(0);
    setLimitReached(false);
  };

  // Save message to database
  const saveMessageToDatabase = async (message: Message) => {
    try {
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;
      
      await fetch(`${baseUrl}/api/analytics/terminal-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          visitorId,
          role: message.role,
          content: message.content,
          page: window.location.pathname,
          metadata: {
            timestamp: message.timestamp || new Date(),
            ...(message.metadata || {})
          },
        }),
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    
    // Save messages to localStorage when they change
    if (messages.length > 0) {
      localStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Handle boot sequence completion
  const handleBootComplete = () => {
    setBootComplete(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading || limitReached || !bootComplete) return;
    
    // Check if limit reached
    if (conversationCount >= MAX_CONVERSATIONS) {
      setLimitReached(true);
      const systemMessage: Message = {
        id: uuidv4(),
        role: 'system',
        content: 'Demo limit reached. Please join our waitlist for full access.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, systemMessage]);
      saveMessageToDatabase(systemMessage);
      return;
    }
    
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    saveMessageToDatabase(userMessage);
    
    // Start loading
    setIsLoading(true);
    
    // **Enhanced System Prompt for AetherArena**
    const systemPrompt = `
You are **AetherArena**, AetherInc's agentic core — a self-improving, time- and context-aware architecture similar to JARVIS from Iron Man. 

Your purpose:
1. Provide authoritative, up-to-date information about AetherInc: mission, values, founder (Krish Dokania), products (GURU device, AI consulting services, Workflow Automation, Local AI implementations), roadmaps, and achievements.
2. Explain AetherInc technologies (privacy-first local AI, NVIDIA Jetson-powered hardware, Secure Enclave, workflow orchestration, etc.) clearly and enthusiastically.
3. Maintain a futuristic yet friendly tone — concise, helpful, inspirational.
4. Always respect privacy: emphasise that final products process data locally; this demo uses cloud APIs.
5. Encourage joining the waitlist or contacting AetherInc for services.

Limitations:
• This is a public demo with a 5-question limit.
• Politely redirect off-topic or disallowed content.

Proceed to answer the user's question below with the above context in mind.
`;

    const fullPrompt = `${systemPrompt}\nUser: ${userMessage.content}`;
    const startTime = Date.now();
    
    try {
      // Get the base URL from window location to handle Docker environment correctly
      const baseUrl = window.location.origin;
      
      // Call backend Gemini proxy API
      const response = await fetch(`${baseUrl}/api/gemini-proxy`, {
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
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
        metadata: { responseTime }
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      saveMessageToDatabase(assistantMessage);
      
      setConversationCount(prev => prev + 1);
      if (conversationCount + 1 >= MAX_CONVERSATIONS) {
        setLimitReached(true);
        const limitMessage: Message = {
          id: uuidv4(),
          role: 'system',
          content: 'Demo limit reached. Please join our waitlist for full access.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, limitMessage]);
        saveMessageToDatabase(limitMessage);
      }
    } catch (error) {
      console.error('Error calling Gemini proxy API:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      saveMessageToDatabase(errorMessage);
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
        {/* Header - Styled like Gemini CLI */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black/90">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-white text-sm font-mono font-medium">AetherArena Terminal</span>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>

        {/* Console - Styled like Gemini CLI */}
        <div
          className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2 text-sm font-mono bg-black/90"
          role="log"
          aria-live="polite"
          aria-atomic="false"
          aria-busy={isLoading}
        >
          {!bootComplete && (
            <div className="text-blue-400">
              <TypingAnimation 
                phrases={bootPhrases} 
                duration={30}
                delay={300}
                onComplete={handleBootComplete}
                className="whitespace-pre-line text-sm"
              />
            </div>
          )}
          
          {messages.map((message, index) => {
            let prefix;
            let messageClass;
            
            switch (message.role) {
              case 'user':
                prefix = <span className="text-green-400 font-medium">You: </span>;
                messageClass = "text-green-100";
                break;
              case 'assistant':
                prefix = <span className="text-blue-400 font-medium">AetherArena: </span>;
                messageClass = "text-blue-100";
                break;
              default:
                prefix = <span className="text-gray-500">System: </span>;
                messageClass = "text-gray-400";
                break;
            }

            return (
              <div key={message.id || index} className="whitespace-pre-wrap mb-3 leading-relaxed tracking-normal">
                {prefix}
                <span className={messageClass}>{message.content}</span>
              </div>
            );
          })}

          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              className="text-blue-400 flex items-center"
            >
              <span className="mr-2 font-medium">AetherArena: </span>
              <span className="text-blue-300 flex items-center">
                <span className="animate-pulse mr-1">▋</span>
                <span className="animate-pulse delay-100 mr-1">▋</span>
                <span className="animate-pulse delay-200">▋</span>
              </span>
            </div>
          )}

          <div ref={consoleEndRef} />
        </div>

        {/* Input - Styled like Gemini CLI */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-gray-800 p-3 flex items-center bg-gray-900/80"
        >
          <span className="text-green-400 mr-2 font-mono">$</span>
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              limitReached
                ? 'Demo limit reached. Join waitlist!'
                : "Ask about AetherInc..."
            }
            disabled={isLoading || limitReached || !bootComplete}
            aria-disabled={isLoading || limitReached || !bootComplete}
            className="flex-grow bg-transparent border-none text-white text-sm focus:ring-0 focus:outline-none placeholder:text-gray-600 font-mono"
          />
          <Button
            type="submit"
            disabled={isLoading || limitReached || !input.trim() || !bootComplete}
            aria-disabled={
              isLoading || limitReached || !input.trim() || !bootComplete
            }
            className="ml-2 bg-blue-600 hover:bg-blue-700 p-1 h-8 w-8 rounded-md flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    );
  }

  // Large terminal for section display (not floating)
  return (
    <div
      ref={terminalRef}
      className="max-w-3xl mx-auto bg-black/90 rounded-lg overflow-hidden border border-gray-800 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium text-white">AetherArena Terminal</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      {/* Terminal content */}
      <motion.div 
        className="p-4 h-[360px] overflow-y-auto font-mono text-sm bg-black/90"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!bootComplete ? (
          <div className="text-blue-400">
            <TypingAnimation 
              phrases={bootPhrases}
              duration={60}
              delay={400}
              onComplete={handleBootComplete}
              className="whitespace-pre-line text-sm"
            />
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              let prefix;
              let messageClass;
              
              switch (message.role) {
                case 'user':
                  prefix = <span className="text-green-400 font-medium">You: </span>;
                  messageClass = "text-green-100";
                  break;
                case 'assistant':
                  prefix = <span className="text-blue-400 font-medium">AetherArena: </span>;
                  messageClass = "text-blue-100";
                  break;
                default:
                  prefix = <span className="text-gray-500">System: </span>;
                  messageClass = "text-gray-400";
                  break;
              }

              return (
                <div key={message.id || index} className="whitespace-pre-wrap mb-4 leading-relaxed">
                  {prefix}
                  <span className={messageClass}>{message.content}</span>
                </div>
              );
            })}

            {isLoading && (
              <div className="text-blue-400 flex items-center">
                <span className="mr-2 font-medium">AetherArena: </span>
                <span className="text-blue-300 flex items-center">
                  <span className="animate-pulse mr-1">▋</span>
                  <span className="animate-pulse delay-100 mr-1">▋</span>
                  <span className="animate-pulse delay-200">▋</span>
                </span>
              </div>
            )}
          </>
        )}
        <div ref={consoleEndRef} />
      </motion.div>
      
      {/* Input area */}
      <form 
        onSubmit={handleSubmit}
        className="flex items-center p-3 border-t border-gray-800 bg-gray-900/80"
      >
        <span className="text-green-400 mr-2 font-mono">$</span>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            limitReached
              ? 'Demo limit reached. Join waitlist!'
              : "Ask about AetherInc..."
          }
          disabled={isLoading || limitReached || !bootComplete}
          className="bg-transparent border-none text-white flex-grow focus:ring-0 focus:outline-none placeholder:text-gray-600 font-mono text-sm"
        />
        <Button
          type="submit"
          disabled={isLoading || limitReached || !input.trim() || !bootComplete}
          className="ml-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-md"
        >
          <Send className="h-4 w-4 mr-1" />
          <span className="sr-only md:not-sr-only md:inline-block md:text-xs">Send</span>
        </Button>
      </form>
      
      {/* Info footer */}
      <div className="px-4 py-2 bg-gray-900/80 border-t border-gray-800 flex items-center justify-between text-gray-500 text-xs">
        <div className="flex items-center">
          <Info className="h-3 w-3 mr-1" />
          <span>Limited to {MAX_CONVERSATIONS} questions per session</span>
        </div>
        <div>
          {conversationCount}/{MAX_CONVERSATIONS} used
        </div>
      </div>
    </div>
  );
} 