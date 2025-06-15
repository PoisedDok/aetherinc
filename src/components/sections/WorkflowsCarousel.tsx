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
        "z-10 flex size-20 items-center justify-center rounded-full border bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
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
  user: () => <FaUser className="h-8 w-8 text-gray-700" />,
  googleDrive: () => <SiGoogledrive className="h-8 w-8 text-gray-700" />,
  googleDocs: () => <SiGoogledocs className="h-8 w-8 text-gray-700" />,
  notion: () => <SiNotion className="h-8 w-8 text-gray-700" />,
  slack: () => <SiSlack className="h-8 w-8 text-gray-700" />,
  zapier: () => <SiZapier className="h-8 w-8 text-gray-700" />,
  trello: () => <SiTrello className="h-8 w-8 text-gray-700" />,
  github: () => <SiGithub className="h-8 w-8 text-gray-700" />,
  aether: () => (
    <Image src="/Aether.jpeg" alt="Aether Logo" width={84} height={84} className="object-contain rounded-full" />
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
          className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden"
        >
          <div className="flex w-full flex-row items-stretch justify-between gap-14">
            {/* Left: User */}
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>

            {/* Center: Aether Hub */}
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
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
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
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
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
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
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
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
  {
    id: "document-processing",
    name: "Document Processing",
    description: "Extract key data from documents, generate summaries and route to the right systems automatically.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);
      const trelloRef = useRef<HTMLDivElement>(null);

      const outputs = [driveRef, notionRef, trelloRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          <div className="flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle ref={userRef}>
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={hubRef} className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden">
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle ref={driveRef}>
                <Icons.googleDrive />
              </Circle>
              <Circle ref={notionRef}>
                <Icons.notion />
              </Circle>
              <Circle ref={trelloRef}>
                <Icons.trello />
              </Circle>
            </div>
          </div>
          {outputs.map((outRef, idx) => (
            <AnimatedBeam key={idx} containerRef={containerRef} fromRef={hubRef} toRef={outRef} curvature={40 - idx*40} delay={idx*0.15} pathColor="#d1d5db" pathOpacity={1} gradientStartColor="#d1d5db" gradientStopColor="#a855f7" pathWidth={2} />
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
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const currentWorkflow = workflows[index];

  return (
    <div className={cn("space-y-10", className)}>
      {/* Carousel Controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-white">
            <TextAnimate>
              {currentWorkflow.name}
            </TextAnimate>
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl">
            {currentWorkflow.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-full bg-white/5 p-3 hover:bg-white/10 transition"
            aria-label="Previous workflow"
          >
            <ArrowLeft className="h-6 w-6 text-white/80" />
          </button>
          <button
            onClick={next}
            className="rounded-full bg-white/5 p-3 hover:bg-white/10 transition"
            aria-label="Next workflow"
          >
            <ArrowRight className="h-6 w-6 text-white/80" />
          </button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <currentWorkflow.Visual />
      </div>
    </div>
  );
} 