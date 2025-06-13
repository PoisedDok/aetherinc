"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import React from "react";

// Placeholder for additional workflow visuals
function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-gray-500/30 text-gray-400">
      {label} animation coming soon
    </div>
  );
}

// Circle component
const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-full border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

// Icons for workflow visuals
const Icons = {
  user: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  googleDrive: () => (
    <svg width="40" height="40" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
      <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
      <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
      <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
      <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
    </svg>
  ),
  googleDocs: () => (
    <svg width="38" height="50" viewBox="0 0 47 65" xmlns="http://www.w3.org/2000/svg">
      <rect width="47" height="65" rx="4" fill="#4285F4" />
      <rect y="50" width="35" height="3" fill="#F1F1F1" />
      <rect y="44" width="35" height="3" fill="#F1F1F1" />
      <rect y="38" width="35" height="3" fill="#F1F1F1" />
      <rect y="32" width="35" height="3" fill="#F1F1F1" />
    </svg>
  ),
  notion: () => (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="8" fill="#fff" />
      <path d="M6 4.3l55.3-4.1c6.8-.6 8.5-.2 12.8 2.9l17.7 12.4c2.9 2.1 3.9 2.7 3.9 5v68.2c0 4.3-1.6 6.8-7 7.2L24.5 100c-4.1.2-6-.4-8.2-3.1L3.3 79.9c-2.3-3.1-3.3-5.4-3.3-8.2V11.1C0 7.6 1.6 4.7 6 4.3z" fill="#000"/>
    </svg>
  ),
  slack: () => (
    <Image src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/slack.svg" alt="slack" width={42} height={42} />
  ),
  zapier: () => (
    <svg width="40" height="12" viewBox="0 0 244 66" xmlns="http://www.w3.org/2000/svg"><path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#FF4F00" /></svg>
  ),
};

const workflows = [
  {
    id: "marketing-approval",
    name: "Marketing Campaign Approval",
    Visual: () => {
      // Create a custom version that doesn't include the section wrapper
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);
      const docsRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);
      const zapierRef = useRef<HTMLDivElement>(null);

      return (
        <div
          ref={containerRef}
          className="relative mx-auto flex h-[450px] w-full max-w-5xl items-center justify-center overflow-hidden"
        >
          <div className="flex w-full flex-row items-stretch justify-between gap-10">
            {/* Left: User */}
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>

            {/* Center: Aether Hub */}
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none">
                <span className="text-center leading-tight text-sm">
                  <span className="text-white font-extrabold">A</span><span className="text-white/80 font-semibold">ether</span>
                  <br />
                  <span className="text-white font-extrabold">I</span><span className="text-white/80 font-semibold">nc</span>
                </span>
              </Circle>
            </div>

            {/* Right: Integrations */}
            <div className="flex flex-col justify-center gap-4">
              <Circle ref={driveRef}>
                <Icons.googleDrive />
              </Circle>
              <Circle ref={docsRef}>
                <Icons.googleDocs />
              </Circle>
              <Circle ref={notionRef}>
                <Icons.notion />
              </Circle>
              <Circle ref={slackRef}>
                <Icons.slack />
              </Circle>
              <Circle ref={zapierRef}>
                <Icons.zapier />
              </Circle>
            </div>
          </div>

          {/* Beams from hub to outputs */}
          {[
            driveRef,
            docsRef,
            notionRef,
            slackRef,
            zapierRef,
          ].map((outRef, idx) => {
            // custom curvature values to create a clean fan-out (top arcs up, bottom arcs down)
            const curvatureValues = [80, 40, 0, -40, -80] as const;
            const curvature = curvatureValues[idx];
            return (
              <AnimatedBeam
                key={idx}
                containerRef={containerRef}
                fromRef={hubRef}
                toRef={outRef}
                curvature={curvature}
                delay={idx * 0.15}
                pathColor="#d1d5db"
                pathOpacity={1}
                gradientStartColor="#d1d5db"
                gradientStopColor="#a855f7"
                pathWidth={2}
              />
            );
          })}
          {/* Bi-directional beams between user and AetherInc */}
          {/* Top arc (user → hub) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={userRef}
            toRef={hubRef}
            curvature={25}
            pathColor="#d1d5db"
            pathOpacity={1}
            gradientStartColor="#d1d5db"
            gradientStopColor="#d1d5db"
            pathWidth={2}
          />
          {/* Bottom arc (hub → user) */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={userRef}
            curvature={-25}
            reverse
            pathColor="#d1d5db"
            pathOpacity={1}
            gradientStartColor="#d1d5db"
            gradientStopColor="#d1d5db"
            pathWidth={2}
          />
        </div>
      );
    },
  },
  {
    id: "sales-lead-enrichment",
    name: "Sales Lead Enrichment",
    Visual: () => <Placeholder label="Sales Lead Enrichment" />,
  },
  {
    id: "support-triage",
    name: "Support Ticket Triage",
    Visual: () => <Placeholder label="Support Ticket Triage" />,
  },
  {
    id: "employee-onboarding",
    name: "Employee Onboarding",
    Visual: () => <Placeholder label="Employee Onboarding" />,
  },
] as const;

export default function WorkflowsCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const total = workflows.length;
  const current = workflows[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section className={cn("w-full py-20", className)}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6">
        {/* Tile bar */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Previous workflow"
            onClick={prev}
            className="rounded-full border border-gray-700/40 p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="whitespace-nowrap rounded-md bg-gray-800/30 px-6 py-2 text-sm font-semibold text-white shadow-inner shadow-black/40">
            {current.name}
          </div>

          <button
            aria-label="Next workflow"
            onClick={next}
            className="rounded-full border border-gray-700/40 p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Visual (borderless) */}
        <div className="w-full">
          <current.Visual />
        </div>
      </div>
    </section>
  );
} 