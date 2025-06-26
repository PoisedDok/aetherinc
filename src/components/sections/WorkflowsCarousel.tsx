"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Mail, Calculator, Users, Database, MessageSquare, FileText, Bot, Zap, Video } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import React from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import { FaUser, FaEnvelope, FaCalculator, FaVideo, FaMicrosoft } from "react-icons/fa";
import { SiGoogledrive, SiGoogledocs, SiNotion, SiSlack, SiZapier, SiGithub, SiTrello } from "react-icons/si";

// Enhanced Circle component with hover tooltip
const Circle = React.forwardRef<
  HTMLDivElement,
  { 
    className?: string; 
    children?: React.ReactNode;
    tooltip?: string;
    role?: string;
  }
>(({ className, children, tooltip, role }, ref) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          "z-30 flex size-20 items-center justify-center rounded-full border bg-white p-4 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] cursor-pointer relative",
          className,
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {tooltip && showTooltip && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700 whitespace-nowrap">
            <div className="font-medium">{role}</div>
            <div className="text-gray-300 text-xs">{tooltip}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
});
Circle.displayName = "Circle";

// Enhanced Icons with better representations
const Icons = {
  user: () => <FaUser className="h-8 w-8 text-gray-700" />,
  email: () => <FaEnvelope className="h-8 w-8 text-gray-700" />,
  calculator: () => <FaCalculator className="h-8 w-8 text-gray-700" />,
  meeting: () => <FaVideo className="h-8 w-8 text-gray-700" />,
  googleDrive: () => <SiGoogledrive className="h-8 w-8 text-gray-700" />,
  googleDocs: () => <SiGoogledocs className="h-8 w-8 text-gray-700" />,
  notion: () => <SiNotion className="h-8 w-8 text-gray-700" />,
  slack: () => <SiSlack className="h-8 w-8 text-gray-700" />,
  zapier: () => <SiZapier className="h-8 w-8 text-gray-700" />,
  trello: () => <SiTrello className="h-8 w-8 text-gray-700" />,
  github: () => <SiGithub className="h-8 w-8 text-gray-700" />,
  microsoft: () => <FaMicrosoft className="h-8 w-8 text-gray-700" />,
  database: () => <Database className="h-8 w-8 text-gray-700" />,
  bot: () => <Bot className="h-8 w-8 text-gray-700" />,
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
    id: "email-automation",
    name: "AI Email Agent",
    description: "Deploy an AI agent that handles customer emails, support tickets, and internal communications 24/7. Automatically categorizes, responds, and escalates based on your business rules.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const emailRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);
      const zapierRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);

      const outputs = [emailRef, slackRef, notionRef, zapierRef, driveRef] as const;

      return (
        <div
          ref={containerRef}
          className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden"
        >
          {/* Animated beams - rendered first (lower z-index) */}
          <div className="absolute inset-0 z-10">
            {/* Beams from hub to outputs */}
            {outputs.map((outRef, idx) => {
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
                  pathColor="#3b82f6"
                  pathOpacity={0.8}
                  gradientStartColor="#3b82f6"
                  gradientStopColor="#8b5cf6"
                  pathWidth={3}
                />
              );
            })}
            
            {/* Bi-directional beams between user and AI Agent */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={userRef}
              toRef={hubRef}
              curvature={25}
              pathColor="#10b981"
              pathOpacity={0.8}
              gradientStartColor="#10b981"
              gradientStopColor="#3b82f6"
              pathWidth={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={hubRef}
              toRef={userRef}
              curvature={-25}
              reverse
              pathColor="#f59e0b"
              pathOpacity={0.8}
              gradientStartColor="#f59e0b"
              gradientStopColor="#10b981"
              pathWidth={3}
            />
          </div>

          {/* Circles - rendered on top (higher z-index) */}
          <div className="relative z-30 flex w-full flex-row items-stretch justify-between gap-14">
            {/* Left: User */}
            <div className="flex flex-col justify-center">
              <Circle 
                ref={userRef}
                tooltip="Sends emails, creates tickets"
                role="Business User"
              >
                <Icons.user />
              </Circle>
            </div>

            {/* Center: AI Email Agent */}
            <div className="flex flex-col justify-center">
              <Circle 
                ref={hubRef} 
                className="size-28 p-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-none overflow-hidden z-30"
                tooltip="Processes, categorizes, and responds to emails automatically"
                role="AI Email Agent"
              >
                <Icons.aether />
              </Circle>
            </div>

            {/* Right: Integrations */}
            <div className="flex flex-col justify-center gap-4">
              <Circle 
                ref={emailRef}
                tooltip="Automated email responses and routing"
                role="Email System"
              >
                <Icons.email />
              </Circle>
              <Circle 
                ref={slackRef}
                tooltip="Team notifications and alerts"
                role="Slack"
              >
                <Icons.slack />
              </Circle>
              <Circle 
                ref={notionRef}
                tooltip="Knowledge base and documentation"
                role="Notion"
              >
                <Icons.notion />
              </Circle>
              <Circle 
                ref={zapierRef}
                tooltip="Workflow automation triggers"
                role="Zapier"
              >
                <Icons.zapier />
              </Circle>
              <Circle 
                ref={driveRef}
                tooltip="Document storage and sharing"
                role="Google Drive"
              >
                <Icons.googleDrive />
              </Circle>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "financial-intelligence",
    name: "Smart Financial Hub",
    description: "Connect to your company databases, ERP systems, and financial tools to get real-time cost estimates, invoice processing, and financial insights through a single AI-powered admin interface.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const databaseRef = useRef<HTMLDivElement>(null);
      const calculatorRef = useRef<HTMLDivElement>(null);
      const driveRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);

      const outputs = [databaseRef, calculatorRef, driveRef, notionRef, slackRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          {/* Animated beams - rendered first (lower z-index) */}
          <div className="absolute inset-0 z-10">
            {outputs.map((outRef, idx) => (
              <AnimatedBeam 
                key={idx} 
                containerRef={containerRef} 
                fromRef={hubRef} 
                toRef={outRef} 
                curvature={80 - idx*30} 
                delay={idx*0.15} 
                pathColor="#10b981" 
                pathOpacity={0.8} 
                gradientStartColor="#10b981" 
                gradientStopColor="#06b6d4" 
                pathWidth={3} 
              />
            ))}
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={userRef} 
              toRef={hubRef} 
              curvature={25} 
              pathColor="#f59e0b" 
              pathOpacity={0.8} 
              gradientStartColor="#f59e0b" 
              gradientStopColor="#10b981" 
              pathWidth={3} 
            />
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={hubRef} 
              toRef={userRef} 
              curvature={-25} 
              reverse 
              pathColor="#8b5cf6" 
              pathOpacity={0.8} 
              gradientStartColor="#8b5cf6" 
              gradientStopColor="#f59e0b" 
              pathWidth={3} 
            />
          </div>

          {/* Circles - rendered on top (higher z-index) */}
          <div className="relative z-30 flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle 
                ref={userRef}
                tooltip="Requests cost estimates, invoice processing"
                role="Finance Team"
              >
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle 
                ref={hubRef} 
                className="size-28 p-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 border-none overflow-hidden z-30"
                tooltip="Processes financial data, generates insights and reports"
                role="Smart Financial Hub"
              >
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle 
                ref={databaseRef}
                tooltip="Company ERP and financial databases"
                role="Database"
              >
                <Icons.database />
              </Circle>
              <Circle 
                ref={calculatorRef}
                tooltip="Real-time cost calculations and estimates"
                role="Cost Engine"
              >
                <Icons.calculator />
              </Circle>
              <Circle 
                ref={driveRef}
                tooltip="Invoice storage and document management"
                role="Google Drive"
              >
                <Icons.googleDrive />
              </Circle>
              <Circle 
                ref={notionRef}
                tooltip="Financial reports and documentation"
                role="Notion"
              >
                <Icons.notion />
              </Circle>
              <Circle 
                ref={slackRef}
                tooltip="Financial alerts and team notifications"
                role="Slack"
              >
                <Icons.slack />
              </Circle>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "meeting-intelligence",
    name: "Meeting Intelligence",
    description: "Transform every meeting into actionable insights. Our AI attends meetings, generates summaries, extracts action items, and automatically updates project management tools.",
    Visual: () => {
      const containerRef = useRef<HTMLDivElement>(null);
      const userRef = useRef<HTMLDivElement>(null);
      const hubRef = useRef<HTMLDivElement>(null);
      const meetingRef = useRef<HTMLDivElement>(null);
      const docsRef = useRef<HTMLDivElement>(null);
      const trelloRef = useRef<HTMLDivElement>(null);
      const slackRef = useRef<HTMLDivElement>(null);
      const notionRef = useRef<HTMLDivElement>(null);

      const outputs = [meetingRef, docsRef, trelloRef, slackRef, notionRef] as const;

      return (
        <div ref={containerRef} className="relative mx-auto flex h-[630px] w-full max-w-5xl items-center justify-center overflow-hidden">
          {/* Animated beams - rendered first (lower z-index) */}
          <div className="absolute inset-0 z-10">
            {outputs.map((outRef, idx) => (
              <AnimatedBeam 
                key={idx} 
                containerRef={containerRef} 
                fromRef={hubRef} 
                toRef={outRef} 
                curvature={80 - idx*30} 
                delay={idx*0.15} 
                pathColor="#8b5cf6" 
                pathOpacity={0.8} 
                gradientStartColor="#8b5cf6" 
                gradientStopColor="#ec4899" 
                pathWidth={3} 
              />
            ))}
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={userRef} 
              toRef={hubRef} 
              curvature={25} 
              pathColor="#06b6d4" 
              pathOpacity={0.8} 
              gradientStartColor="#06b6d4" 
              gradientStopColor="#8b5cf6" 
              pathWidth={3} 
            />
            <AnimatedBeam 
              containerRef={containerRef} 
              fromRef={hubRef} 
              toRef={userRef} 
              curvature={-25} 
              reverse 
              pathColor="#f59e0b" 
              pathOpacity={0.8} 
              gradientStartColor="#f59e0b" 
              gradientStopColor="#06b6d4" 
              pathWidth={3} 
            />
          </div>

          {/* Circles - rendered on top (higher z-index) */}
          <div className="relative z-30 flex w-full flex-row items-stretch justify-between gap-14">
            <div className="flex flex-col justify-center">
              <Circle 
                ref={userRef}
                tooltip="Participates in meetings, needs summaries"
                role="Meeting Participants"
              >
                <Icons.user />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle 
                ref={hubRef} 
                className="size-28 p-0 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 border-none overflow-hidden z-30"
                tooltip="Records, transcribes, and analyzes meeting content"
                role="Meeting Intelligence"
              >
                <Icons.aether />
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <Circle 
                ref={meetingRef}
                tooltip="Real-time meeting transcription"
                role="Meeting Bot"
              >
                <Icons.meeting />
              </Circle>
              <Circle 
                ref={docsRef}
                tooltip="Automated meeting summaries and notes"
                role="Google Docs"
              >
                <Icons.googleDocs />
              </Circle>
              <Circle 
                ref={trelloRef}
                tooltip="Action items and task assignment"
                role="Trello"
              >
                <Icons.trello />
              </Circle>
              <Circle 
                ref={slackRef}
                tooltip="Meeting summaries and follow-ups"
                role="Slack"
              >
                <Icons.slack />
              </Circle>
              <Circle 
                ref={notionRef}
                tooltip="Meeting knowledge base and documentation"
                role="Notion"
              >
                <Icons.notion />
              </Circle>
            </div>
          </div>
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
      {/* Workflow Indicator */}
      <div className="flex justify-center gap-2 mb-6">
        {workflows.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              idx === index 
                ? "bg-blue-500 scale-125" 
                : "bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to workflow ${idx + 1}`}
          />
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm font-medium text-blue-300">
              Quick Win #{index + 1}
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white">
            <TextAnimate>
              {currentWorkflow.name}
            </TextAnimate>
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl">
            {currentWorkflow.description}
          </p>
          <div className="text-sm text-gray-400 mt-2">
            💡 Hover over the workflow nodes to see detailed descriptions
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-full bg-white/5 p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            aria-label="Previous workflow"
          >
            <ArrowLeft className="h-6 w-6 text-white/80" />
          </button>
          <button
            onClick={next}
            className="rounded-full bg-white/5 p-3 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            aria-label="Next workflow"
          >
            <ArrowRight className="h-6 w-6 text-white/80" />
          </button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-8">
        <currentWorkflow.Visual />
      </div>
      
      {/* Workflow Benefits */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-green-400">
            {index === 0 ? "15-20h" : index === 1 ? "75%" : "5-8h"}
          </div>
          <div className="text-sm text-gray-300">
            {index === 0 ? "Saved per week" : index === 1 ? "Faster processing" : "Reclaimed weekly"}
          </div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-blue-400">
            {index === 0 ? "2-3 days" : index === 1 ? "1-2 weeks" : "Same day"}
          </div>
          <div className="text-sm text-gray-300">Time to deploy</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-2xl font-bold text-purple-400">24/7</div>
          <div className="text-sm text-gray-300">Automated operation</div>
        </div>
      </div>
    </div>
  );
} 