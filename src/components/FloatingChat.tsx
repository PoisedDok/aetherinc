"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Terminal from "@/components/sections/Terminal";
import { cn } from "@/lib/utils";

// Local storage key for chat open state
const CHAT_OPEN_KEY = 'aether_chat_open';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  // Initialize chat state from localStorage when component mounts
  useEffect(() => {
    // Only initialize once
    if (!initialized) {
      const storedState = localStorage.getItem(CHAT_OPEN_KEY);
      if (storedState) {
        try {
          const parsedState = JSON.parse(storedState);
          setOpen(parsedState === true);
        } catch (error) {
          console.error('Error parsing stored chat state:', error);
        }
      }
      setInitialized(true);
    }
  }, [initialized]);
  
  // Save chat state to localStorage when it changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem(CHAT_OPEN_KEY, JSON.stringify(open));
    }
  }, [open, initialized]);

  // Prevent clicks on the chat window from affecting the rest of the page
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-6 right-6 z-[60] flex items-center justify-center rounded-full shadow-lg transition-all focus:outline-none",
          open ? "size-12 bg-gray-800 hover:bg-gray-700" : "size-16 bg-gray-800 hover:bg-gray-700",
          "dark:bg-gray-800 dark:hover:bg-gray-700"
        )}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Image
            src="/Aether.jpeg"
            alt="Open Aether Chat"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          onClick={handleChatClick}
          className="fixed bottom-24 right-6 z-[59] w-[92vw] max-w-lg h-[70vh] rounded-2xl overflow-hidden overflow-y-auto shadow-2xl border border-gray-800 bg-black backdrop-blur-lg transition-transform duration-200"
        >
          <Terminal minimal />
        </div>
      )}
    </>
  );
} 