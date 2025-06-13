"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Terminal from "@/components/sections/Terminal";
import { cn } from "@/lib/utils";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  
  // Remove the effect that locks the body scroll
  // This was blocking interaction with the rest of the page

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
          open ? "size-12 bg-white/90" : "size-16 bg-white/80 hover:bg-white/90",
          "dark:bg-gray-800 dark:hover:bg-gray-700"
        )}
      >
        {open ? (
          <X className="h-6 w-6 text-black dark:text-white" />
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
          className="fixed bottom-24 right-6 z-[59] w-[92vw] max-w-lg h-[70vh] rounded-2xl overflow-hidden overflow-y-auto shadow-2xl border border-white/10 bg-gradient-to-br from-black/80 via-gray-900/90 to-gray-800/90 backdrop-blur-lg transition-transform duration-200"
        >
          <Terminal minimal />
        </div>
      )}
    </>
  );
} 