"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";

export default function AutomationBeamDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fromRef = useRef<HTMLDivElement | null>(null);
  const toRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center py-20", className)}
    >
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div
          ref={fromRef}
          className="bg-white/10 border border-white/20 rounded-lg p-6 w-56 text-center shadow-lg"
        >
          <h3 className="font-semibold text-white mb-2">Trigger</h3>
          <p className="text-gray-400 text-sm">New ticket received</p>
        </div>

        <div
          ref={toRef}
          className="bg-white/10 border border-white/20 rounded-lg p-6 w-56 text-center shadow-lg"
        >
          <h3 className="font-semibold text-white mb-2">Action</h3>
          <p className="text-gray-400 text-sm">Route to Support AI</p>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        curvature={80}
        pathColor="white"
        pathOpacity={0.15}
        gradientStartColor="#38bdf8"
        gradientStopColor="#a855f7"
        pathWidth={3}
      />
    </div>
  );
} 