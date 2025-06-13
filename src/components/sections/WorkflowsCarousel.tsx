"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import React from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { FaUser } from "react-icons/fa";
import { SiGoogledrive, SiGoogledocs, SiNotion, SiSlack, SiZapier, SiGithub, SiTrello } from "react-icons/si";

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
  user: () => <FaUser className="h-6 w-6 text-gray-700" />,
  googleDrive: () => <SiGoogledrive className="h-6 w-6 text-gray-700" />,
  googleDocs: () => <SiGoogledocs className="h-6 w-6 text-gray-700" />,
  notion: () => <SiNotion className="h-6 w-6 text-gray-700" />,
  slack: () => <SiSlack className="h-6 w-6 text-gray-700" />,
  zapier: () => <SiZapier className="h-6 w-6 text-gray-700" />,
  trello: () => <SiTrello className="h-6 w-6 text-gray-700" />,
  github: () => <SiGithub className="h-6 w-6 text-gray-700" />,
  aether: () => (
    <Image src="/Aether.jpeg" alt="Aether Logo" width={60} height={60} className="object-contain rounded-full" />
  ),
};

type WorkflowItem = {
  id: string;
  name: string;
  description: string;
  Visual: () => JSX.Element;
};

const workflows: readonly WorkflowItem[] = [
  {
    id: "marketing-approval",
    name: "Marketing Campaign Approval",
    description: "Seamlessly gather approvals for assets—Aether Hub routes files and notifications across Drive, Docs, Notion, Slack & Zapier.",
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
              <Circle ref={hubRef} className="size-20 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
                <Icons.aether />
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
    description: "Auto-enrich new leads with research, notes and social context, then deliver them straight to reps in Slack and your CRM.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);
      const zapierRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);

      const outputs = [slackRef, notionRef, zapierRef, driveRef] as const;
      return (
        <div ref={containerRef} className="relative mx-auto flex h-[450px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-20 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle ref={slackRef}>
                <Icons.slack />
              </Circle>
              <Circle ref={notionRef}>
                <Icons.notion />
              </Circle>
              <Circle ref={zapierRef}>
                <Icons.zapier />
              </Circle>
              <Circle ref={driveRef}>
                <Icons.googleDrive />
              </Circle>
            </div>
          </div>
          {outputs.map((outRef, idx) => (
            <AnimatedBeam key={idx} containerRef={containerRef} fromRef={hubRef} toRef={outRef} curvature={60 - idx*30} delay={idx*0.15} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#a855f7" pathWidth={2} />
          ))}
          <AnimatedBeam containerRef={containerRef} fromRef={userRef} toRef={hubRef} curvature={25} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#d1d5db" pathWidth={2} />
          <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={userRef} curvature={-25} reverse pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#d1d5db" pathWidth={2} />
        </div>
      );
    },
  },
  {
    id: "support-triage",
    name: "Support Ticket Triage",
    description: "Classify incoming tickets, create GitHub issues, surface knowledge-base suggestions and alert the right channel instantly.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);
      const githubRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);

      const outputs = [slackRef, githubRef, notionRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[450px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-20 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle ref={slackRef}>
                <Icons.slack />
              </Circle>
              <Circle ref={githubRef}>
                <Icons.github />
              </Circle>
              <Circle ref={notionRef}>
                <Icons.notion />
              </Circle>
            </div>
          </div>
          {outputs.map((outRef, idx) => (
            <AnimatedBeam key={idx} containerRef={containerRef} fromRef={hubRef} toRef={outRef} curvature={40 - idx*30} delay={idx*0.15} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#a855f7" pathWidth={2} />
          ))}
          <AnimatedBeam containerRef={containerRef} fromRef={userRef} toRef={hubRef} curvature={25} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#d1d5db" pathWidth={2} />
          <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={userRef} curvature={-25} reverse pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#d1d5db" pathWidth={2} />
        </div>
      );
    },
  },
  {
    id: "employee-onboarding",
    name: "Employee Onboarding",
    description: "Generate personalized onboarding docs, spin up Trello boards and kick off day-one Slack intros for every new hire—automatically.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const docsRef = useRef<HTMLDivElement>(null);
      const trelloRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);

      const outputs = [docsRef, trelloRef, slackRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[450px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-20 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle ref={docsRef}>
                <Icons.googleDocs />
              </Circle>
              <Circle ref={trelloRef}>
                <Icons.trello />
              </Circle>
              <Circle ref={slackRef}>
                <Icons.slack />
              </Circle>
            </div>
          </div>
          {outputs.map((outRef, idx) => (
            <AnimatedBeam key={idx} containerRef={containerRef} fromRef={hubRef} toRef={outRef} curvature={40 - idx*30} delay={idx*0.15} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#a855f7" pathWidth={2} />
          ))}
          <AnimatedBeam containerRef={containerRef} fromRef={userRef} toRef={hubRef} curvature={25} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#d1d5db" pathWidth={2} />
          <AnimatedBeam containerRef={containerRef} fromRef={hubRef} toRef={userRef} curvature={-25} reverse pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#d1d5db" pathWidth={2} />
        </div>
      );
    },
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

          <div className="whitespace-nowrap rounded-md bg-gray-800/30 px-6 py-2 shadow-inner shadow-black/40">
            <TextAnimate
              animation="slideLeft"
              by="character"
              className="text-lg md:text-xl font-semibold text-white"
            >
            {current.name}
            </TextAnimate>
          </div>

          <button
            aria-label="Next workflow"
            onClick={next}
            className="rounded-full border border-gray-700/40 p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Description */}
        <p className="max-w-xl text-center text-gray-400 text-sm leading-relaxed -mt-2">
          {current.description}
        </p>

        {/* Visual (borderless) */}
        <div className="w-full">
          <current.Visual />
        </div>
      </div>
    </section>
  );
} 