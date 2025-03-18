"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  command: string;
  response: string;
}

interface TerminalDemoProps {
  commands: Command[];
  height?: number;
  typingSpeed?: number;
  commandPrefix?: string;
  className?: string;
}

export function TerminalDemo({
  commands,
  height = 400,
  typingSpeed = 50,
  commandPrefix = ">",
  className = "",
}: TerminalDemoProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isShowingResponse, setIsShowingResponse] = useState(false);
  const [displayCommand, setDisplayCommand] = useState("");
  const [demoComplete, setDemoComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Handle command typing animation
  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      setDemoComplete(true);
      return;
    }

    if (isTypingCommand) {
      const command = commands[currentCommandIndex].command;
      if (displayCommand.length < command.length) {
        const timeout = setTimeout(() => {
          setDisplayCommand(command.substring(0, displayCommand.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsTypingCommand(false);
        // Small delay before showing response
        setTimeout(() => {
          setIsShowingResponse(true);
        }, 500);
      }
    }
  }, [commands, currentCommandIndex, displayCommand, isTypingCommand, typingSpeed]);

  // Handle moving to next command
  useEffect(() => {
    if (isShowingResponse && !isTypingCommand) {
      // Wait for some time before moving to the next command
      const timeout = setTimeout(() => {
        if (currentCommandIndex < commands.length - 1) {
          setCurrentCommandIndex(prev => prev + 1);
          setDisplayCommand("");
          setIsTypingCommand(true);
          setIsShowingResponse(false);
        }
      }, commands[currentCommandIndex].response.length * 20 + 1500); // Longer delay for reading response
      return () => clearTimeout(timeout);
    }
  }, [commands, currentCommandIndex, isShowingResponse, isTypingCommand]);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayCommand, isShowingResponse]);

  // Restart demo after it's complete
  useEffect(() => {
    if (demoComplete) {
      const timeout = setTimeout(() => {
        setCurrentCommandIndex(0);
        setDisplayCommand("");
        setIsTypingCommand(true);
        setIsShowingResponse(false);
        setDemoComplete(false);
      }, 5000); // Restart after 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [demoComplete]);

  return (
    <div 
      className={`font-mono text-sm bg-black text-green-400 p-4 rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    >
      <div className="flex items-center justify-between border-b border-green-900/30 pb-2 mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-green-600">GURU Terminal</div>
        <div className="text-xs text-green-600">v1.0.0</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-[calc(100%-2rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black"
      >
        {/* Initial startup text */}
        <div className="text-green-600 mb-4">
          <p>AetherInc GURU Terminal v1.0.0</p>
          <p>Type 'help' for list of available commands</p>
          <p className="mb-2">------------------------------------</p>
        </div>
        
        {/* Previous commands that have completed */}
        {commands.slice(0, currentCommandIndex).map((cmd, i) => (
          <div key={i} className="mb-4">
            <div className="flex">
              <span className="text-green-600 mr-2">{commandPrefix}</span>
              <span className="text-white">{cmd.command}</span>
            </div>
            <div className="text-green-400 ml-4 mt-1 whitespace-pre-line">{cmd.response}</div>
          </div>
        ))}
        
        {/* Current command being typed */}
        {!demoComplete && (
          <div className="mb-4">
            <div className="flex">
              <span className="text-green-600 mr-2">{commandPrefix}</span>
              <span className="text-white">{displayCommand}</span>
              {isTypingCommand && (
                <span className="animate-pulse ml-0.5">█</span>
              )}
            </div>
            
            {/* Show response after command is fully typed */}
            <AnimatePresence>
              {isShowingResponse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 ml-4 mt-1 whitespace-pre-line"
                >
                  {commands[currentCommandIndex].response}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
} 