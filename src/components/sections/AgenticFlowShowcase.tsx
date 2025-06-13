"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";

const sources = [
  {
    name: "LangChain",
    logo: "https://raw.githubusercontent.com/hwchase17/langchainjs/main/docs/static/img/logo.svg",
  },
  {
    name: "HuggingFace",
    logo: "https://avatars.githubusercontent.com/u/25720743?s=200&v=4",
  },
  {
    name: "OpenAI",
    logo: "https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png",
  },
];

export default function AgenticFlowShowcase({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  // ensure length
  itemRefs.current = [];
  const setItemRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) itemRefs.current[idx] = el;
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative py-24 md:py-32 bg-black flex flex-col items-center gap-16 overflow-hidden",
        className,
      )}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white text-center max-w-2xl">
        We weave the best of open-source into a single <span className="text-blue-400">agentic flow</span>
      </h2>

      <div className="relative flex flex-col md:flex-row items-center gap-20">
        <div className="flex flex-col gap-12">
          {sources.map((src, idx) => (
            <div
              key={src.name}
              ref={(el) => setItemRef(el, idx)}
              className="bg-white/5 border border-white/20 rounded-xl p-6 w-48 flex flex-col items-center gap-3 text-center"
            >
              <Image src={src.logo} alt={src.name} width={48} height={48} className="object-contain" />
              <span className="text-sm text-gray-300">{src.name}</span>
            </div>
          ))}
        </div>

        <div
          ref={targetRef}
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 w-64 h-64 flex flex-col items-center justify-center shadow-xl relative z-10"
        >
          <span className="text-white text-2xl font-bold text-center leading-tight">
            Aether<br />Agentic Flow
          </span>
        </div>

        {/* beams */}
        {sources.map((_, idx) => (
          <AnimatedBeam
            key={idx}
            containerRef={containerRef}
            fromRef={{ current: itemRefs.current[idx] }}
            toRef={targetRef}
            curvature={120 - idx * 20}
            gradientStartColor="#38bdf8"
            gradientStopColor="#a855f7"
            pathColor="white"
            pathOpacity={0.12}
            pathWidth={2}
            delay={idx * 0.2}
          />
        ))}
      </div>
    </section>
  );
} 